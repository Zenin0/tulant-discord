export default {
    data: {
        name: 'randomgif',
        nameLocalizations: {
            es: 'gifaleatorio',
        },
        description: 'Genera un GIF aleatorio!',
        descriptionLocalizations: {
            es: 'Genera un GIF aleatorio',
        },
    },
    async execute(interaction) {
        // List of random GIF URLs (add as many as you want)
        const gifs = [
            'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',  // anime happy
            'https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif',      // excited anime
            'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',   // anime surprised
            'https://media.giphy.com/media/3oEjHP8ELRNNlnlLGM/giphy.gif',  // anime fight scene
            'https://media.giphy.com/media/1kq3vsvdsW1pLxfrKw/giphy.gif',  // anime running
            'https://media.giphy.com/media/10VJ7yjZLgqOQw/giphy.gif',      // anime intense
        ];


        // Pick a random GIF URL
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        await interaction.reply({ content: randomGif });
    },
};
