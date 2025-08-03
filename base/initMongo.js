import { MongoClient } from 'mongodb';
import logger from '../lib/log.js';

const {
    MONGO_ROOT_USER,
    MONGO_ROOT_PASSWORD,
    MONGO_PORT = 27017,
    MONGO_HOST = 'localhost',
    MONGO_DB = 'mydb'
} = process.env;

export async function initMongo() {
    logger.info('Connecting to MongoBD...');
    const uri = `mongodb://${MONGO_ROOT_USER}:${MONGO_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
    const client = new MongoClient(uri);
    await client.connect();
    logger.info('✅ Connected to MongoDB');
    return client.db(MONGO_DB);
}
