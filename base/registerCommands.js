import { REST, Routes } from 'discord.js';
import logger from '../lib/log.js';

export async function registerCommands(commands, clientId, guildId, token) {
    const rest = new REST({ version: '10' }).setToken(token);
    try {
        logger.info('Registering slash commands...');
        await rest.put(
            guildId
                ? Routes.applicationGuildCommands(clientId, guildId)
                : Routes.applicationCommands(clientId),
            { body: commands }
        );
        logger.info(`✅ Registered ${commands.length} commands`);
    } catch (err) {
        logger.error('❌ Failed to register commands:', err);
    }
}
