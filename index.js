import {Client, GatewayIntentBits, REST, Routes, Events} from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {MongoClient} from 'mongodb';
import {saveGuild} from "./mongodb/saveGuild.js";
import logger from './lib/log.js';

dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const MONGO_USER = process.env.MONGO_ROOT_USER;
const MONGO_PASS = process.env.MONGO_ROOT_PASSWORD;
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_DB = process.env.MONGO_DB || 'mydb';

async function main() {
    // Load commands dynamically
    const commands = [];
    const commandsPath = path.resolve('./commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    const commandsMap = new Map();

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandModule = await import(filePath);
        const command = commandModule.default;
        commands.push(command.data.toJSON ? command.data.toJSON() : command.data); // safer toJSON call
        commandsMap.set(command.data.name, command);
    }

    // Connect to MongoDB
    const mongoUri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`;
    const mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
    logger.info("Connected to MongoDB")
    const db = mongoClient.db(MONGO_DB);

    // Register commands
    const rest = new REST({version: '10'}).setToken(TOKEN);

    try {
        logger.info('Started refreshing application (/) commands.');

        await rest.put(
            GUILD_ID
                ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
                : Routes.applicationCommands(CLIENT_ID),
            {body: commands}
        );

        logger.info('Successfully reloaded application (/) commands: ' + commands.length);
    } catch (error) {
        logger.error('Failed to register commands:', error);
    }

    // Create Discord bot client
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,    // To receive message events
            GatewayIntentBits.MessageContent,    // To access message content (required in v14+)
        ],
    });

    client.once(Events.ClientReady, async () => {
        logger.info(`🤖 Logged in as ${client.user.tag}`);

        for (const guild of client.guilds.cache.values()) {
            await saveGuild(db, {
                id: guild.id,
                name: guild.name,
                joinedAt: guild.joinedTimestamp ? new Date(guild.joinedTimestamp) : new Date(),
            });
        }
    });

    const listenersPath = path.resolve('./listeners');
    const listenerFiles = fs.readdirSync(listenersPath).filter(file => file.endsWith('.js'));
    for (const file of listenerFiles) {
        const filePath = path.join(listenersPath, file);
        const listenerModule = await import(filePath);
        const listener = listenerModule.default;

        if (listener.once) {
            client.once(listener.name, (...args) => listener.execute(db, ...args));
        } else {
            client.on(listener.name, (...args) => listener.execute(db, ...args));
        }

    }

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = commandsMap.get(interaction.commandName);
        if (!command) return;

        // Pass db if you want commands to access Mongo (optional)
        try {
            await command.execute(interaction, db);
        } catch (error) {
            logger.error(error);
            if (!interaction.replied) {
                await interaction.reply({content: 'There was an error executing this command!', ephemeral: true});
            }
        }
    });

    await client.login(TOKEN);
}

main().catch(console.error);
