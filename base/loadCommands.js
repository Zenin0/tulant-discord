import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export async function loadCommands() {
    const commands = [];
    const commandsMap = new Map();
    const commandsPath = path.resolve('./commands');
    const files = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

    for (const file of files) {
        const fullPath = path.join(commandsPath, file);
        const { default: command } = await import(pathToFileURL(fullPath).href);
        commands.push(command.data.toJSON ? command.data.toJSON() : command.data);
        commandsMap.set(command.data.name, command);
    }

    return { commands, commandsMap };
}
