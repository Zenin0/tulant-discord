import { PermissionFlagsBits } from 'discord.js';
import constants from '../lib/constants.js';
import locales from '../lib/locales.js';
import logger from "../lib/log.js";

export default {
    data: {
        name: 'clear',
        description: 'Delete messages from the current channel',
        description_localizations: {
            [locales.SPANISH]: 'Eliminar mensajes del canal actual',
        },
        options: [
            {
                name: 'amount',
                type: constants.INTEGER,
                description: 'Number of messages to delete (1-100)',
                description_localizations: {
                    [locales.SPANISH]: 'Cantidad de mensajes a eliminar (1-100)',
                },
                required: true,
                min_value: 1,
                max_value: 100,
            },
        ],
        defaultMemberPermissions: PermissionFlagsBits.ManageMessages.toString(),
    },

    async execute(interaction) {
        const locale = interaction.locale;
        const amount = interaction.options.getInteger('amount');

        // Only allow TextBasedChannels (text, announcement, thread)
        if (!interaction.channel?.bulkDelete) {
            return interaction.reply({
                content: locales.get('CLEAR_NOT_SUPPORTED', locale),
                flags: 64,
            });
        }

        try {
            const deleted = await interaction.channel.bulkDelete(amount, true);
            await interaction.reply({
                content: locales.get('CLEAR_SUCCESS', locale, { count: deleted.size }),
                flags: 64,
            });
        } catch (error) {
            logger.error('Error during clear command:', error);
            await interaction.reply({
                content: locales.get('CLEAR_FAILED', locale),
                flags: 64,
            });
        }
    },
};
