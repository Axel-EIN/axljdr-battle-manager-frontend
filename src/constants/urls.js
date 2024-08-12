const BASE_URL = 'http://localhost:8080';

export const URLS = {
    // UTILISATEUR
    USER_REGISTER: `${BASE_URL}/api/utilisateur/inscrire`,
    USER_CREATE: `${BASE_URL}/api/utilisateur/creer`,
    USER_ALL: `${BASE_URL}/api/utilisateur/tous`,
    USER_ONE: `${BASE_URL}/api/utilisateur/un`,
    USER_EDIT: `${BASE_URL}/api/utilisateur/modifier`,
    USER_DELETE: `${BASE_URL}/api/utilisateur/supprimer`,
    USER_LOGIN: `${BASE_URL}/api/utilisateur/connecter`,
    USER_LOGOUT: `${BASE_URL}/api/utilisateur/deconnecter`,
    USER_CURRENT: `${BASE_URL}/api/utilisateur/courant`,

    // PERSONNAGE
    CHAR_ADD: `${BASE_URL}/api/personnage/ajouter`,
    CHAR_ALL: `${BASE_URL}/api/personnage/tous`,
    CHAR_ONE: `${BASE_URL}/api/personnage/un`,
    CHAR_EDIT: `${BASE_URL}/api/personnage/modifier`,
    CHAR_DELETE: `${BASE_URL}/api/personnage/supprimer`,

    // COMBAT
    BATTLE_ADD: `${BASE_URL}/api/combat/ajouter`,
    BATTLE_ALL: `${BASE_URL}/api/combat/tous`,
    BATTLE_ONE: `${BASE_URL}/api/combat/un`,
    BATTLE_EDIT: `${BASE_URL}/api/combat/modifier`,
    BATTLE_DELETE: `${BASE_URL}/api/combat/supprimer`,
}