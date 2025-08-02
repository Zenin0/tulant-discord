import { PermissionFlagsBits } from 'discord.js';
import constants from '../lib/constants.js';
import locales from "../lib/locales.js";

export default {
    data: {
        name: 'ban',
        description: 'Ban a server member',
        description_localizations: {
            [locales.SPANISH]: 'Banear un usuario del servidor',
        },
        options: [
            {
                name: 'user',
                type: constants.USER,
                description: 'Member to ban',
                description_localizations: {
                    [locales.SPANISH]: 'Miembro a banear',
                },
                required: true,
            },
            {
                name: 'reason',
                type: constants.STRING,
                description: 'Ban reason',
                description_localizations: {
                    [locales.SPANISH]: 'Razón del baneo',
                },
                required: false,
            },
        ],
        defaultMemberPermissions: PermissionFlagsBits.BanMembers.toString(),
    },
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || locales.get('NO_REASON_SPECIFIED', interaction.locale);

        // Obtener el miembro del guild
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({
                content: locales.get('USER_NOT_IN_GUILD', interaction.locale),
                flags: 64,  // ephemeral
            });
        }

        if (!member.bannable) {
            return interaction.reply({
                content: locales.get('CANNOT_BAN_USER', interaction.locale),
                flags: 64,
            });
        }

        await member.ban({ reason });

        return interaction.reply(
            locales.get('USER_BANNED', interaction.locale, { userTag: user.tag, reason })
        );
    },
};
