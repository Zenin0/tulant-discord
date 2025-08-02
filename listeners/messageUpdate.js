import {EmbedBuilder, Events} from 'discord.js';
import {getChannelByGuildAndType} from "../mongodb/getChannelByGuildAndType.js";
import logger from "../lib/log.js";

export default {
    name: Events.MessageUpdate,
    once: false,
    async execute(db, oldMessage, newMessage) {
        // Fetch the log channel ID for this guild and type
        const response = await getChannelByGuildAndType(db, 1, oldMessage.guildId);
        const channelId = response?.channelId;
        if (!channelId) {
            logger.warn('No log channel found for this guild and type');
            return;
        }

        // Fetch the log channel
        const logChannel = oldMessage.client.channels.cache.get(channelId)
            || await oldMessage.client.channels.fetch(channelId).catch(() => null);
        if (!logChannel || !logChannel.isTextBased()) {
            logger.warn('Log channel not found or not a text channel');
            return;
        }

        // Build the embed with details about the deleted message
        const embed = new EmbedBuilder()
            .setTitle("Message Edited")
            .setColor(0xffa500) // red color
            .addFields(
            { name: "", value: `> **Channel**: <#${oldMessage.channel.id}> \n> **Message **: ${oldMessage.id} \n> **Author**: <@${oldMessage.author.id}>\n> **Message created**: <t:${Math.floor(oldMessage.createdTimestamp / 1000)}:R>`, inline: false },
                  { name: "Before", value: `${oldMessage.content}`, inline: false },
                  { name: "After", value: `${newMessage.content}`, inline: false },
            )
            .setTimestamp();

        // Send the embed
        await logChannel.send({ embeds: [embed] });
    }
};
