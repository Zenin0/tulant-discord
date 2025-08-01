export default {
    data: {
        name: 'ping',
        nameLocalizations: {
            fr: 'pinguer',
            es: 'pinguear',
            de: 'pingen',
        },
        description: 'Replies with Pong!',
        descriptionLocalizations: {
            fr: 'Répond avec Pong !',
            es: 'Responde con ¡Pong!',
            de: 'Antwortet mit Pong!',
        },
    },
    async execute(interaction) {
        const locale = interaction.locale;

        const replies = {
            fr: 'Pong ! 🏓',
            es: '¡Pong! 🏓',
            de: 'Pong! 🏓',
            default: 'Pong! 🏓',
        };

        const reply = replies[locale] || replies.default;
        await interaction.reply(reply);
    },
};
