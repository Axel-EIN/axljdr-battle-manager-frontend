// const BASE_URL = 'http://localhost:8080';
const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const URLS = {
    // BASE
    BASE_URL: `${BASE_URL}`,

    // UTILISATEUR
    USER_REGISTER: `${BASE_URL}/api/user/register`,
    USER_ALL: `${BASE_URL}/api/user/all`,
    USER_ONE: `${BASE_URL}/api/user/one`,
    USER_CREATE: `${BASE_URL}/api/user/add`,
    USER_EDIT: `${BASE_URL}/api/user/edit`,
    USER_DELETE: `${BASE_URL}/api/user/delete`,
    USER_LOGIN: `${BASE_URL}/api/user/login`,
    USER_LOGOUT: `${BASE_URL}/api/user/logout`,
    USER_CURRENT: `${BASE_URL}/api/user/current`,

    // PERSONNAGE
    CHAR_ALL: `${BASE_URL}/api/character/all`,
    CHAR_ONE: `${BASE_URL}/api/character/one`,
    CHAR_ADD: `${BASE_URL}/api/character/add`,
    CHAR_EDIT: `${BASE_URL}/api/character/edit`,
    CHAR_DELETE: `${BASE_URL}/api/character/delete`,

    // COMBAT
    BATTLE_ALL: `${BASE_URL}/api/battle/all`,
    BATTLE_ONE: `${BASE_URL}/api/battle/one`,
    BATTLE_LASTACTIVE: `${BASE_URL}/api/battle/lastactive`,
    BATTLE_ADD: `${BASE_URL}/api/battle/add`,
    BATTLE_EDIT: `${BASE_URL}/api/battle/edit`,
    BATTLE_DELETE: `${BASE_URL}/api/battle/delete`,
    BATTLE_START: `${BASE_URL}/api/battle/start`,
    BATTLE_STOP: `${BASE_URL}/api/battle/stop`,
    BATTLE_RESTART: `${BASE_URL}/api/battle/restart`,
    BATTLE_PLAYTURN: `${BASE_URL}/api/battle/turn`,
    BATTLE_RESTORE: `${BASE_URL}/api/battle/restore`,
}
