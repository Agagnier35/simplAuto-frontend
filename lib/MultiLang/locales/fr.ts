import Translations from './types';

const translations: Translations = {
  loading: 'Téléchargement ...',
  login: {
    title: 'Se connecter',
    loginWithFacebook: 'Se connecter avec Facebook',
    loginWithGoogle: 'Se connecter avec Google',
  },
  signup: {
    title: 'Créer un compte',
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
    contactInfo: 'Informations de mise en contact',
    genrealInfo: 'Informations générales',
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
    lastName: 'Nom',
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
    formFieldsErrors: {
      signupFormFieldsErrors: {
        firstNameError: {
          emptyError: 'Prénom ne peut être vide.',
          containsNumberError: 'Prénom ne peut contenir un chiffre.',
        },
        lastNameError: {
          emptyError: 'Nom de famille ne peut être vide.',
          containsNumberError: 'Nom de famille ne peut contenir un chiffre.',
        },
        emailError: {
          invalidEmailError: 'Adresse courriel invalide.',
        },
        passwordError: {
          emptyError: 'Mot de passe ne peut être vide.',
        },
        confirmPasswordError: {
          emptyError: 'Mot de passe de confirmation ne peut être vide.',
          matchingError: 'Mots de passe différents.',
        },
        locationError: {
          emptyError: 'La localisation ne peut être vide.',
        },
        birthDateError: {
          invalidYearError: "L'année saisie est invalide.",
        },
      },
      createAdFormFieldsErrors: {
        yearLowerBound: {
          yearLowerBoundTooLow: "L'année minimale trop basse",
          yearLowerBoundTooHigh:
            "L'année minimale ne peut être plus grande que l'année courante.",
          emptyError: "L'année minimale ne peut être vide",
          numberNotIntegerError:
            "L'année minimale doit être un entier (chiffre sans virgule)",
        },
        yearHigherBound: {
          yearHigherBoundTooLow: "L'année maximale trop basse",
          yearHigherBoundTooHigh:
            "L'année maximale ne peut être plus grande que l'année courante.",
          emptyError: "L'année maximale ne peut être vide",
          numberNotIntegerError:
            "L'année maximale doit être un entier (chiffre sans virgule)",
          yearLowerBoundHigherThanYearHigherBoundError:
            "L'année maximale doit être supérieur à l'année minimale",
        },
        mileageLowerBound: {
          mileageLowerBoundTooLow: 'Kilométrage min doit être positif',
          mileageLowerBoundTooHigh: 'Kilométrage min trop grand',
          emptyError: 'Kilométrage min ne peut être vide',
          numberNotIntegerError:
            'Kilométrage min doit être un entier (chiffre sans virgule)',
        },
        mileageHigherBound: {
          mileageHigherBoundTooLow: 'Kilométrage max doit être positif',
          mileageHigherBoundTooHigh: 'Kilométrage max trop grand',
          emptyError: 'Kilométrage max ne peut être vide',
          numberNotIntegerError:
            'Kilométrage max doit être un entier (chiffre sans virgule)',
          mileageLowerBoundHigherThanMileageHigherBoundError:
            'Kilométrage max doit être supérieur à kilométrage min',
        },
        priceLowerBound: {
          priceLowerBoundTooLowError: 'Prix min doit être positif',
          emptyError: 'Prix min ne peut être vide',
          numberNotIntegerError:
            'Prix min doit être un entier (chiffre sans virgule)',
        },
        priceHigherBound: {
          emptyError: 'Prix max ne peut être vide',
          numberNotIntegerError:
            'Prix max doit être un entier (chiffre sans virgule)',
          priceLowerBoundHigherThanPriceHigherBoundError:
            'Prix max doit être supérieur à prix min',
        },
      },
      cadAddFormFieldsErrors: {
        year: {
          emptyError: "L'année ne peut être vide",
          numberNotIntegerError:
            "L'année doit être un entier (chiffre sans virgule)",
          yearTooLowError: "L'année est trop petite",
          yearTooHighError: "L'année ne peut dépasser l'année courante",
        },
        mileage: {
          emptyError: 'Kilométrage ne peut être vide',
          numberNotIntegerError:
            'Kilométrage doit être un entier (chiffre sans virgule)',
          mileageLesserThanZeroError: 'Kilométrage doit être supérieur à 0',
          mileageTooHighError: 'Kilométrage trop élevé',
        },
        photos: {
          atLeastOnePhotoError: 'Vous devez ajouter au moins une photo',
        },
      },
    },
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
    LandingTitle: 'Laisser les vendeurs se battrent',
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
};

module.exports = translations;
