import locales from '../lib/locales.js';

export default {
    data: {
        name: 'ping',
        description: 'Replies with Pong!',
        description_localizations: {
            [locales.SPANISH]: '¡Responde con Pong!',
        },
    },
    async execute(interaction) {
        const locale = interaction.locale;

        // Use your locales.get() method for localization
        const reply = locales.get('PONG_REPLY', locale);

        await interaction.reply(reply);
    },
};
