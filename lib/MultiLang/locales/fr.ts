import Translations from './types';

const translations: Translations = {
  loading: 'Téléchargement ...',
  login: {
    title: 'Se connecter',
    loginWithFacebook: 'Se connecter avec Facebook',
    loginWithGoogle: 'Se connecter avec Google',
    forgotPassword: 'Mot de passe oublié ?',
  },
  signup: {
    title: 'Créer un compte',
    clientType: 'Type de compte',
    facebookLogin: 'Connexion avec Facebook',
    googleLogin: 'Connexion avec Google',
  },
  profile: {
    profilePage: 'Mon profile',
    firstName: 'Prénom',
    lastName: 'Nom',
    location: 'Votre position',
    sex: 'Sexe',
    save: 'Enregistrer',
    search: 'Rechercher',
    birth: 'Date de naissance',
    male: 'Homme',
    female: 'Femme',
    other: 'Autre',
    address: 'Entrée votre adresse',
    changePassword: 'Nouveau mot de passe',
    confirmationChangePassword: 'Confirmer mot de passe',
    contactInfo: 'Information de mise en contact',
    genrealInfo: 'Information générale',
    newPWSection: 'Nouveau mot de passe',
  },
  general: {
    email: 'Courriel',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer mot de passe',
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
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    companyName: 'Nom de la compagnie',
    gender: 'genre',
    birthDate: {
      day: 'Jour',
      month: 'Mois',
      year: 'Année',
    },
    options: {
      delete: 'Supprimer',
      modify: 'Modifier',
    },
    resetPw: 'Réinitialiser le mot de passe',
    buy: 'Acheter',
    sell: 'Vendre',
    myCars: 'Mes voitures',
    myAds: 'Mes annonces',
    disconnect: 'Déconnexion',
    Ad: 'Annonce',
    offers: 'Offres',
    cancel: 'Annuler',
    create: 'Créer',
    update: 'Modifier',
    delete: 'Supprimer',
    print: 'Imprimer',
    offered: 'Offert le',
  },
  errors: {
    invalidEmail: 'Mauvaise adresse courriel',
    invalidPassword: 'Mauvais mot de passe',
    authError: `Problème d'authentification`,
    carLimitReached: 'Vous avez atteint la limite 2 véhicules permis',
  },
  cars: {
    addCar: 'Ajouter un automobile',
    details: "Détails de l'automobile",
    title: 'Mes automobiles',
    manufacturer: 'Manufacturier',
    model: 'Modèle',
    category: 'Catégorie',
    year: 'Année',
    mileage: 'Kilométrage',
    price: 'Prix',
    descriptionPlaceholder: 'Entrez une courte description de la voiture',
    noCars: `Vous n'avez pas de véhicule`,
  },
  clientType: {
    company: 'Compagnie',
    individual: 'Particulier',
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
  Ads: {
    lowerPrice: 'prix minimum',
    higherPrice: 'prix maximum',
    manufacturer: 'manufacturier',
    model: 'modèle',
    category: 'catégorie',
    lowerMileage: 'kilométrage minimum',
    higherMileage: 'kilométrage maximum',
    lowerYear: 'année minimum',
    higherYear: 'année maximum',
    features: 'fonctionalités',
    addAds: 'Ajouter un annonce',
    title: 'Annonces',
    noAds: `Vous n'avez pas d'annonce`,
  },
  GeneralModalContent: {
    title: 'Boite de confirmation',
    content:
      'Êtes vous certain de vouloir exécuter cette action?\nCette action ne sera pas réversible.',
    btnCancel: 'Annuler',
    btnConfirm: 'Confirmer',
    car: ' de voiture',
    ad: " d'annonce",
    offer: " d'offre",
    create: 'Création',
    delete: 'Suppression',
    save: 'Sauvegarde',
    edit: 'Modification',
  },
  offers: {
    createOffer: 'Faire une offre',
    modifyOffer: 'Modifier mon offre',
    addons: 'Ajouts',
    otherAddons: 'Autre ajout',
    specify: 'Spécifiez',
    title: 'Offre',
    price: 'Prix',
    chat: 'Contacter le vendeur',
    reject: "rejetter l'offre",
    receivedOffers: 'Offres reçues',
  },
  Chat: {
    title: 'Messagerie',
    send: 'Envoyer',
    sendPlaceholder: 'Envoyer un message',
  },
  Home: {
    BannerTitle: 'Trop facile',
    BannerSubtitle: `Acheter ou vendre votre auto dès aujourd'hui`,
    LandingTitle: 'Laisser les vendeurs se battre',
    LandingSubtitle: 'Une nouvelle façon de magasiner',
    LandingAdsButton: 'Voir les annonces',
    LandingSignupButton: 'Créer un compte',
    HowToBuy: 'Comment acheter',
    HowToBuyFirst: 'Demander pour un véhicule',
    HowToBuySecond: 'Recevez des offres',
    HowToBuyThird: 'Accepter la meilleure',
    HowToSell: 'Comment vendre',
    HowToSellFirst: 'Ajouter un véhicule',
    HowToSellSecond: 'Trouver une demande correspondante',
    HowToSellThird: 'Faites une offre',
  },
  Notifications: {
    newOffer: 'Vous avez une nouvelle offre !',
    newOfferMessage: (x: number) =>
      `Vous avez ${x} ${
        x > 1 ? 'nouveaux messages' : 'nouveau message'
      } sur une offre`,
  },
  Stripe: {
    PremiumName: 'SimplAuto Premium',
    PremiumDescription: 'Abonnement mensuel',
  },
  offerAddons: {
    subtitle: 'Le vendeur vous offre aussi',
    mags: 'Jantes',
    tires: 'Pneus',
  },
  carFeature: {
    color: {
      black: 'Noir',
      blue: 'Bleu',
      brown: 'Brun',
      gold: 'Or',
      green: 'Vert',
      grey: 'Gris',
      orange: 'Orange',
      pink: 'Rose',
      purple: 'Mauve',
      red: 'Rouge',
      silver: 'Argent',
      tan: 'Beige',
      teal: 'Turquoise',
      white: 'Blanc',
      yellow: 'Jaune',
      other: 'Autre',
    },
    fuelType: {
      diesel: 'Diesel',
      electric: 'Électrique',
      gasoline: 'Essence',
      hybrid: 'Hybride',
      other: 'Autre',
    },
    doorNumber: {
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      other: 'Autre',
    },
    seatNumber: {
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      other: 'Autre',
    },
    drivetrain: {
      '4x4': '4x4',
      awd: 'Traction intégrale',
      fwd: 'Traction avant',
      rwd: 'Traction arrière',
      other: 'Autre',
    },
    transmission: {
      manual: 'Manuelle',
      automatic: 'Automatique',
      other: 'Autre',
    },
    true: 'Oui',
    false: 'Non',
  },
};

module.exports = translations;
