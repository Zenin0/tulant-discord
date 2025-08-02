export async function saveGuild(db, guild) {
    const collection = db.collection('guilds');

    // Check if guild exists
    const existingGuild = await collection.findOne({ id: guild.id });
    if (existingGuild) {
        // Guild exists, update it
        await collection.updateOne(
            { id: guild.id },
            { $set: guild }
        );
        return { existed: true };
    } else {
        // Guild does not exist, insert it
        await collection.insertOne(guild);
        return { existed: false };
    }
}
