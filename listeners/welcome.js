import logger from "../lib/log.js";
import {AttachmentBuilder, EmbedBuilder, Events} from "discord.js";
import {getChannelByGuildAndType} from "../mongodb/getChannelByGuildAndType.js";
import constants from "../lib/constants.js";
import {client} from "../base/client.js";
import {getWelcome} from "../lib/welcome.js";

export default {
    name: Events.GuildMemberAdd,
    once: false,

    async execute(db, member) {

        const response = await getChannelByGuildAndType(db, constants.CHANNEL_TYPE_WELCOME, member.guild.id);

        if (!response) {
            logger.error("Error finding channel");
            return;
        }

        const channel = await client.channels.fetch(response.channelId);

        const imageBuffer = await getWelcome(member, constants.WELCOME_TYPE);
        const attachment = new AttachmentBuilder(imageBuffer, { name: 'welcome.png' });

        await channel.send({
            files: [attachment],
        });
    }
}