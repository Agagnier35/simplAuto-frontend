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
    changeLangage: 'Changer de langue',
    becomePremium: 'Devenir Premium',
    or: 'ou',
    defaultDropdown: 'Sélectionnez',
    other: 'Autre',
    none: 'Non-spécifié',
    features: 'Caractéristiques',
    submit: 'Sousmettre',
    images: 'Images',
    max: 'max',
    min: 'min',
  },
  errors: {
    invalidEmail: 'Mauvaise adresse courriel',
    invalidPassword: 'Mauvais mot de passe',
    authError: `Problème d'authentification`,
    carLimitReached: 'Vous avez atteint la limite 2 véhicules permis',
  },
  cars: {
    details: "Détails de l'automobile",
    title: 'Mes automobiles',
    manufacturer: 'Manufacturier',
    model: 'Modèle',
    category: 'Catégorie',
    year: 'Année',
    mileage: 'Kilométrage',
    price: 'Prix',
  },
  carFeatureCategory: {
    color: 'Couleur',
    fuelType: "Type d'essence",
    doorNumber: 'Nombre de portes',
    seatNumber: 'Nombre de sièges',
    drivetrain: 'Roues motrices',
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
  carLabel: {
    title: 'Veuillez remplir les informations conçernant la voiture',
    general: 'Informations générales',
    carAddSumbit: 'Ajouter un véhicule',
    condition: 'Condition',
    upload: "Téléverser jusqu'à 7 photos",
    uploadBtn: 'Sélectionner une image',
    addons: 'Ajouts',
    uploadLength: 'Veuillez sélectionner 7 fichiers au maximum',
  },
  ad: {
    createAdTitle: 'Veuillez remplir les informations conçernant votre annonce',
    createAdAction: 'Publier votre annonce',
  },
};

module.exports = translations;
