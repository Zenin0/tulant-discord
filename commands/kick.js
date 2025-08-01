import { PermissionFlagsBits } from 'discord.js';
import constants from '../lib/constants.js';

export default {
    data: {
        name: 'kick',
        description: 'Expulsar un usuario del servidor',
        options: [
            {
                name: 'user',
                type: constants.USER,
                description: 'Miembro a expulsar',
                required: true,
            },
            {
                name: 'reason',
                type: constants.STRING,
                description: 'Razón de la expulsión',
                required: false,
            },
        ],
        defaultMemberPermissions: PermissionFlagsBits.KickMembers.toString(),
    },
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No se especificó una razón';

        // Obtener el miembro del guild
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: 'Ese usuario no está en el servidor.', ephemeral: true });
        }

        if (!member.kickable) {
            return interaction.reply({ content: 'No puedo expulsar a ese usuario (rol más alto o falta de permisos).', ephemeral: true });
        }

        await member.kick(reason);
        await interaction.reply(`Usuario expulsado correctamente: ${user.tag}\nRazón: ${reason}`);
    },
};
