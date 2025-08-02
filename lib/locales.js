export default {
    SPANISH: 'es-ES',
    ENGLISH: 'en-EN',
    strings: {
        'en-EN': {
            // PONG COMMAND
            PONG_REPLY: 'Pong! 🏓',
            // KICK COMMAND
            USER_NOT_IN_GUILD: 'That user is not in the server.',
            CANNOT_KICK_USER: 'I cannot kick that user (higher role or missing permissions).',
            USER_KICKED: 'User kicked successfully: {userTag}\nReason: {reason}',
            // BAN COMMAND
            NO_REASON_SPECIFIED: 'No reason specified',
            CANNOT_BAN_USER: 'I cannot ban that user (higher role or missing permissions).',
            USER_BANNED: 'User banned successfully: {userTag}\nReason: {reason}',
            // GIF COMMAND
            GIF_NOT_FOUND: 'No GIFs found for that search.',
            GIF_SEARCH_ERROR: 'An error occurred while searching for the GIF.',
            // CLEAR COMMAND
            CLEAR_SUCCESS: '{count} messages deleted successfully.',
            CLEAR_FAILED: 'An error occurred while trying to delete messages.',
            CLEAR_NOT_SUPPORTED: 'This channel does not support bulk message deletion.',
        },
        'es-ES': {
            // PONG COMMAND
            PONG_REPLY: '¡Pong! 🏓',
            // KICK COMMAND
            USER_NOT_IN_GUILD: 'Ese usuario no está en el servidor.',
            CANNOT_KICK_USER: 'No puedo expulsar a ese usuario (rol más alto o falta de permisos).',
            USER_KICKED: 'Usuario expulsado correctamente: {userTag}\nRazón: {reason}',
            // BAN COMMAND
            NO_REASON_SPECIFIED: 'No se especificó una razón',
            CANNOT_BAN_USER: 'No puedo banear a este usuario (rol más alto o falta de permisos).',
            USER_BANNED: 'Usuario baneado correctamente: {userTag}\nRazón: {reason}',
            // GIF COMMAND
            GIF_NOT_FOUND: 'No se encontraron GIFs para esa búsqueda.',
            GIF_SEARCH_ERROR: 'Ocurrió un error buscando el GIF.',
            // CLEAR COMMAND
            CLEAR_SUCCESS: 'Se eliminaron correctamente {count} mensajes.',
            CLEAR_FAILED: 'Ocurrió un error al intentar eliminar los mensajes.',
            CLEAR_NOT_SUPPORTED: 'Este canal no permite eliminar mensajes en masa.',
        }
    },
    get(key, locale, params) {
        // fallback locale to 'en-EN'
        const lang = this.strings[locale] ? locale : 'en-EN';
        let text = this.strings[lang][key] || key;
        if (params) {
            for (const [k, v] of Object.entries(params)) {
                text = text.replace(`{${k}}`, v);
            }
        }
        return text;
    }
};
