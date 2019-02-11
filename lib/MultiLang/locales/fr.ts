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
    other: "Autre",
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
  carLabel: {
    title: 'Veuillez remplir les informations conçernant la voiture',
    general: "Informations générales",
    description: "Description du véhicule",
    condition: 'Condition',
    upload: "Téléverser jusqu'à 7 photos",
    uploadBtn: "Sélectionner une image",
    year: 'Année',
    make: 'Marque',
    model: 'Modèle',
    color: 'Couleur',
    seats: "Nbr de sieges",
    doors: "Nbr de portes",
    driveTrain: "Boite à vitesse",
    type: 'Type',
    transmission: 'Transmission',
    fuel: 'Type de moteur',
    kilometers: 'Kilometrage',
    addons: 'Ajouts',
    uploadLength: 'Veuillez sélectionner 7 fichiers au maximum',
  },
  condition: {
    brandNew: 'Neuf',
    used: 'Usagé',
    lease: 'Fin de location',
  },
  transmission: {
    manual: 'Manuelle',
    automatic: 'Automatique',
  },
  fuel: {
    gas: 'Gas',
    diesel: 'Diesel',
  }
};

module.exports = translations;
