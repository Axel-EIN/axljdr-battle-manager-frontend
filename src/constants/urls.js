const BACK_URL = import.meta.env.VITE_APP_API_URL;

export const URLS = {
    // BASE
    BACK_URL: `${BACK_URL}`,

    // UTILISATEUR
    USER_REGISTER: `${BACK_URL}/api/user/register`,
    USER_ALL: `${BACK_URL}/api/user/all`,
    USER_ONE: `${BACK_URL}/api/user/one`,
    USER_CREATE: `${BACK_URL}/api/user/add`,
    USER_EDIT: `${BACK_URL}/api/user/edit`,
    USER_DELETE: `${BACK_URL}/api/user/delete`,
    USER_LOGIN: `${BACK_URL}/api/user/login`,
    USER_LOGOUT: `${BACK_URL}/api/user/logout`,
    USER_CURRENT: `${BACK_URL}/api/user/current`,

    // PERSONNAGE
    CHAR_ALL: `${BACK_URL}/api/character/all`,
    CHAR_ONE: `${BACK_URL}/api/character/one`,
    CHAR_ADD: `${BACK_URL}/api/character/add`,
    CHAR_EDIT: `${BACK_URL}/api/character/edit`,
    CHAR_DELETE: `${BACK_URL}/api/character/delete`,

    // COMBAT
    BATTLE_ALL: `${BACK_URL}/api/battle/all`,
    BATTLE_ONE: `${BACK_URL}/api/battle/one`,
    BATTLE_LASTACTIVE: `${BACK_URL}/api/battle/lastactive`,
    BATTLE_ADD: `${BACK_URL}/api/battle/add`,
    BATTLE_EDIT: `${BACK_URL}/api/battle/edit`,
    BATTLE_DELETE: `${BACK_URL}/api/battle/delete`,
    BATTLE_START: `${BACK_URL}/api/battle/start`,
    BATTLE_STOP: `${BACK_URL}/api/battle/stop`,
    BATTLE_RESTART: `${BACK_URL}/api/battle/restart`,
    BATTLE_PLAYTURN: `${BACK_URL}/api/battle/turn`,
    BATTLE_RESTORE: `${BACK_URL}/api/battle/restore`,

    // VERIFY
    VERIFY_EMAIL: `${BACK_URL}/api/user/verify/email`,
}
