export async function getChannelByGuildAndType(db, type, guildId) {
    const collection = db.collection('channels');

    // Check if guildId exists with the given type
    const existingGuild = await collection.findOne({ guildId: guildId, type: type });
    if (existingGuild) {
        return { existed: true, channelId: existingGuild.channelId };
    }

    return { existed: false, channelId: null };
}
