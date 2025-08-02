import { PermissionFlagsBits } from 'discord.js';
import constants from '../lib/constants.js';
import locales from "../lib/locales.js";

export default {
    data: {
        name: 'kick',
        description: 'Kick a server member',
        description_localizations: {
            [locales.SPANISH]: 'Expulsar un usuario del servidor',
        },
        options: [
            {
                name: 'user',
                type: constants.USER,
                description: 'User to kick',
                description_localizations: {
                    [locales.SPANISH]: 'Usuario a expulsar',
                },
                required: true,
            },
            {
                name: 'reason',
                type: constants.STRING,
                description: 'Reason of kick',
                description_localizations: {
                    [locales.SPANISH]: 'Razón de expulsión',
                },
                required: false,
            },
        ],
        defaultMemberPermissions: PermissionFlagsBits.KickMembers.toString(),
    },
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || locales.get('NO_REASON_SPECIFIED', interaction.locale);

        // Obtener el miembro del guild
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({
                content: locales.get('USER_NOT_IN_GUILD', interaction.locale),
                ephemeral: true,
            });
        }

        if (!member.kickable) {
            return interaction.reply({
                content: locales.get('CANNOT_KICK_USER', interaction.locale),
                ephemeral: true,
            });
        }

        await member.kick(reason);

        return interaction.reply({
            content: locales.get('USER_NOT_IN_GUILD', interaction.locale),
            flags: 64
        });

    },
};
