import Translations from './types';

const translations: Translations = {
  login: {
    title: 'Se connecter',
  },
  signup: {
    title: 'Créer un compte',
  },
  general: {
    email: 'Courriel',
    password: 'Mot de passe',
    confirmPassword: "Confirmer mot de passe",
    changeLangage: 'Changer de langue',
    becomePremium: 'Devenir Premium',
    or: 'ou',
    firstName: "Prénom",
    lastName: "Nom de famille"
  },
  errors: {
    invalidEmail: 'Mauvaise adresse courriel',
    invalidPassword: 'Mauvais mot de passe',
    authError: `Problème d'authentification`,
  },
};

module.exports = translations;
