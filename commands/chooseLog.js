import { PermissionFlagsBits } from 'discord.js';
import constants from '../lib/constants.js';
import locales from "../lib/locales.js";
import {saveChannelAndType} from "../mongodb/saveChannelAndType.js";

export default {
    data: {
        name: 'channel-select',
        description: 'Chose channel type for Guild',
        description_localizations: {
            [locales.SPANISH]: 'Seleccionar el canal de mensaje para distintas cosas',
        },
        options:[
            {
                name: 'channel',
                type: constants.CHANNEL,  // or 'CHANNEL' depending on your constants
                description: 'Select a channel',
                description_localizations: {
                    [locales.SPANISH]: 'Selecciona un canal',
                },
                required: true,
            },
            {
                name: 'type',
                type: constants.STRING,
                description: 'Choose the type of the channel ',
                description_localizations: {
                    [locales.SPANISH]: 'Elige el tipo del canal',
                },
                required: true,
                choices: [
                    {
                        name: 'Log',
                        value: 'log',
                    }
                ],
            }
        ],
    },
    async execute(interaction, db) {

        await saveChannelAndType(db, interaction.options.getChannel('channel'), interaction.options.get('type').value, interaction.guild);

        return interaction.reply({
            content: locales.get('CHANNEL_SELECTED', interaction.locale),
            flags: 64
        });

    },
};
