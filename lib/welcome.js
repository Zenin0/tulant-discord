import constants from "./constants.js";
import fetch from "node-fetch";

export async function getWelcome(member, type) {
    const memberCount = member.guild.members.cache.filter(member => !member.user.bot).size
    const baseUrl = constants.POPCAT_API;
    const backgroundUrlImage = constants.WELCOME_BACKGROUND_IMAGE;
    const text1 = member.user.tag
    const text2 = type === constants.WELCOME_TYPE ? constants.WELCOME_TXT_1 : constants.LOOSE_TXT_1
    const text3 = `Miembro num ${memberCount}`

    const url = `${baseUrl}/?background=${encodeURIComponent(backgroundUrlImage)}&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&text3=${text3}&avatar=${encodeURIComponent(member.user.displayAvatarURL({ extension: 'png', size: 256 }))}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch welcome image: ${response.statusText} with url: ${url}`);
    }

    return await response.buffer();
}
