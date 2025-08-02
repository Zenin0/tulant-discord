// logger.js
const colors = {
    INFO:  '\x1b[32m',
    WARN:  '\x1b[33m',
    ERROR: '\x1b[31m',
    DEBUG: '\x1b[34m',
    RESET: '\x1b[0m',
};

function log(message, level = 'INFO', context = '') {
    const timestamp = new Date().toISOString();
    const color = colors[level] || '';
    const reset = colors.RESET;
    const tag = `[${timestamp}] ${level.padEnd(5)}${context ? ` [${context}]` : ''}`;
    console.log(`${color}${tag}${reset} ${message}`);
}

const logger = {
    info:  (msg, ctx) => log(msg, 'INFO', ctx),
    warn:  (msg, ctx) => log(msg, 'WARN', ctx),
    error: (msg, ctx) => log(msg, 'ERROR', ctx),
    debug: (msg, ctx) => log(msg, 'DEBUG', ctx),
};

export default logger;
