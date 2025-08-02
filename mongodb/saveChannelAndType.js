export async function saveChannelAndType(db, channel, type, guild) {
    const collection = db.collection('channels');

    const typeNumber = getTypeByValue(type);

    // Check if guild exists with the given type
    const existingGuild = await collection.findOne({ guildId: guild.id, type: typeNumber });
    if (existingGuild) {
        // Guild exists, update the channelId
        await collection.updateOne(
            { guildId: guild.id, type: typeNumber },
            { $set: { channelId: channel.id } }
        );
        return { existed: true };
    } else {
        // Guild does not exist, insert it
        await collection.insertOne({
            guildId: guild.id,
            channelId: channel.id,
            type: typeNumber,
        });
        return { existed: false };
    }
}

function getTypeByValue(value) {
    switch (value) {
        case 'log':
            return 1
    }
}
