import dotenv from 'dotenv';
dotenv.config();

import logger from './lib/log.js';
import { saveGuild } from './mongodb/saveGuild.js';
import { client } from './base/client.js';
import { loadCommands } from './base/loadCommands.js';
import { initMongo } from './base/initMongo.js';
import { registerCommands } from './base/registerCommands.js';
import { loadListeners } from './base/loadListeners.js';
import {showAscii} from "./base/showAscii.js";

const {
    DISCORD_TOKEN: TOKEN,
    CLIENT_ID,
    GUILD_ID
} = process.env;

async function main() {

    await showAscii();
    const db = await initMongo();
    const { commands, commandsMap } = await loadCommands();
    await registerCommands(commands, CLIENT_ID, GUILD_ID, TOKEN);
    await loadListeners(client, db);

    client.once('ready', async () => {
        logger.info(`🤖 Logged in as ${client.user.tag}`);
        for (const guild of client.guilds.cache.values()) {
            await saveGuild(db, {
                id: guild.id,
                name: guild.name,
                joinedAt: guild.joinedTimestamp ? new Date(guild.joinedTimestamp) : new Date(),
            });
        }
    });

    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const command = commandsMap.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, db);
        } catch (err) {
            logger.error(err);
            if (!interaction.replied) {
                await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
            }
        }
    });

    await client.login(TOKEN);
}

main().catch(console.error);
