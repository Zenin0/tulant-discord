const constants = Object.freeze({
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
    MENTIONABLE: 9,
    NUMBER: 10,
    ATTACHMENT: 11,
    POPCAT_API: "https://api.popcat.xyz/v2/welcomecard",
    WELCOME_BACKGROUND_IMAGE: "https://cdn.popcat.xyz/welcome-bg.png",
    WELCOME_TXT_1 : "¡Bienvenido!",
    LOOSE_TXT_1 : "¡Hasta luego!",
    WELCOME_TYPE: 1,
    LOOSE_TYPE: 2,
    CHANNEL_TYPE_LOG: 1,
    CHANNEL_TYPE_WELCOME: 2,
});

export default constants;
