import {Events, EmbedBuilder} from "discord.js";
import {getChannelByGuildAndType} from "../mongodb/getChannelByGuildAndType.js";
import logger from "../lib/log.js";
import constants from "../lib/constants.js";

export default {
    name: Events.MessageDelete,
    once: false,
    async execute(db, message) {
        // Fetch the log channel ID for this guild and type
        const response = await getChannelByGuildAndType(db, constants.CHANNEL_TYPE_LOG, message.guildId);
        const channelId = response?.channelId;
        if (!channelId) {
            logger.warn('No log channel found for this guild and type');
            return;
        }

        // Fetch the log channel
        const logChannel = message.client.channels.cache.get(channelId)
            || await message.client.channels.fetch(channelId).catch(() => null);
        if (!logChannel || !logChannel.isTextBased()) {
            logger.warn('Log channel not found or not a text channel');
            return;
        }

        // Build the embed with details about the deleted message
        const embed = new EmbedBuilder()
            .setTitle("Message deleted")
            .setColor(0xff0000) // red color
            .addFields(
                {
                    name: "",
                    value: `> **Channel**: ${message.channel.name} <#${message.channel.id}>\n> **Message ID**: ${message.id}\n> **Message author**: @${message.author.tag} (<@${message.author.id}>)\n> **Message created**: <t:${Math.floor(message.createdTimestamp / 1000)}:R>`,
                    inline: false
                },
                {name: "Message", value: `${message.content}`, inline: false},
            )
            .setTimestamp();

        // Send the embed
        await logChannel.send({embeds: [embed]});
    }
};
