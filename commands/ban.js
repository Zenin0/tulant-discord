import { PermissionFlagsBits } from 'discord.js';

let constants = require('../lib/constants');constants

export default {
    data: {
        name: 'ban',
        description: 'Banear a un miembro del servidor',
        options: [
            {
                name: 'user',
                type: constants.USER,
                description: 'Miembro a banear',
                required: true,
            },
            {
                name: 'reason',
                type: constants.STRING,
                description: 'Razón del baneo',
                required: false,
            },
        ],
        defaultMemberPermissions: PermissionFlagsBits.BanMembers.toString(),
    },
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No se especificó una razón';

        // Obtener el miembro del guild
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: 'Ese usuario no está en el servidor.', ephemeral: true });
        }

        if (!member.bannable) {
            return interaction.reply({ content: 'No puedo banear a este usuario (rol más alto o falta de permisos).', ephemeral: true });
        }

        await member.ban({ reason });
        await interaction.reply(`Usuario baneado correctamente: ${user.tag}\nRazón: ${reason}`);
    },
};
