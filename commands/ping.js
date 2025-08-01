export default {
    data: {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    async execute(interaction) {
        const locale = interaction.locale;

        const replies = {
            es: '¡Pong! 🏓',
        };

        const reply = replies[locale] || replies.default;
        await interaction.reply(reply);
    },
};
