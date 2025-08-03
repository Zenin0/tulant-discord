import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import logger from '../lib/log.js';

export async function loadListeners(client, db) {
    const listenersPath = path.resolve('./listeners');
    const files = fs.readdirSync(listenersPath).filter(file => file.endsWith('.js'));
    logger.info(`Loading ${files.length} listeners...`);

    for (const file of files) {
        const fullPath = path.join(listenersPath, file);
        const { default: listener } = await import(pathToFileURL(fullPath).href);

        if (listener.once) {
            client.once(listener.name, (...args) => listener.execute(db, ...args));
        } else {
            client.on(listener.name, (...args) => listener.execute(db, ...args));
        }
    }

    logger.info('✅ Listeners loaded.');
}
