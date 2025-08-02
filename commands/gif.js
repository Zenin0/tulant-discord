import locales from '../lib/locales.js';

import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();

const GIPHY_API_KEY = process.env.GIPHY_KEY;

export default {
    data: {
        name: 'gif',
        description: 'Busca un GIF usando una palabra clave',
        description_localizations: {
            [locales.SPANISH]: 'Busca un GIF usando una palabra clave',
        },
        options: [
            {
                name: 'query',
                type: 3, // STRING type in Discord API
                description: 'Palabra clave para buscar el GIF',
                description_localizations: {
                    [locales.SPANISH]: 'Palabra clave para buscar el GIF',
                },
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const query = interaction.options.getString('query');

        const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=1&rating=pg`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();

            if (data.data.length === 0) {
                return interaction.reply({
                    content: locales.get('GIF_NOT_FOUND', interaction.locale),
                    flags: 64,
                });
            }

            const gifUrl = data.data[0].images.downsized_medium.url;

            await interaction.reply({ content: gifUrl });
        } catch (error) {
            console.error('Error fetching GIF:', error);
            await interaction.reply({
                content: locales.get('GIF_SEARCH_ERROR', interaction.locale),
                flags: 64,
            });
        }
    },
};
