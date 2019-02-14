import Translations from './types';

const translations: Translations = {
  loading: 'Téléchargement ...',
  login: {
    title: 'Se connecter',
  },
  signup: {
    title: 'Créer un compte',
  },
  general: {
    email: 'Courriel',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer mot de passe',
    changeLangage: 'Changer de langue',
    becomePremium: 'Devenir Premium',
    or: 'ou',
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    gender: 'genre',
    birthDate: {
      day: 'Jour',
      month: 'Mois',
      year: 'Année',
    },
    resetPw: 'Réinitialiser le mot de passe',
    buy: 'Acheter',
    sell: 'Vendre',
    myCars: 'Mes voitures',
    ads: 'Annonces',
    disconnect: 'Déconnexion',
  },
  errors: {
    invalidEmail: 'Mauvaise adresse courriel',
    invalidPassword: 'Mauvais mot de passe',
    authError: `Problème d'authentification`,
  },
  cars: {
    details: "Détails de l'automobile",
    title: 'Mes automobiles',
    manufacturer: 'Manufacturier',
    model: 'Modèle',
    category: 'Catégorie',
    year: 'Année',
    mileage: 'Distance',
  },
  carFeatureCategory: {
    color: 'Couleur',
    fuelType: "Type d'essence",
    doorNumber: 'Nombre de portes',
    seatNumber: 'Nombre de sièges',
    driveTrain: 'Roues motrices',
    transmission: 'Transmission',
    sunroof: 'Toit ouvrant',
    cruiseControl: 'Régulateur de vitesse',
    trailerHitch: 'Attelage pour remorque',
    airConditioning: 'Air climatisé',
    aileron: 'Aileron',
    motor: 'Moteur',
  },
  carCategory: {
    sedan: 'sedan',
  },
  carFeature: {},
};

module.exports = translations;
