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
          emptyError: 'La location ne peut être vide.',
        },
      },
      createAdFormFieldsErrors: {
        yearLowerBound: {
          yearLowerBoundTooLow: 'Année min trop basse',
          yearLowerBoundTooHigh:
            "Année min ne peut être plus grande que l'année courante.",
          emptyError: 'Année min ne peut être vide',
          numberNotIntegerError: 'Année min doit être un entier',
        },
        yearHigherBound: {
          yearHigherBoundTooLow: 'Année max trop basse',
          yearHigherBoundTooHigh:
            "Année max ne peut être plus grande que l'année courante.",
          emptyError: 'Année max ne peut être vide',
          numberNotIntegerError: 'Année max doit être un entier',
          yearLowerBoundHigherThanYearHigherBoundError:
            'Année max doit être supérieur à année min',
        },
        mileageLowerBound: {
          mileageLowerBoundTooLow: 'Kilométrage min doit être positif',
          mileageLowerBoundTooHigh: 'Kilométrage min trop grand',
          emptyError: 'Kilométrage min ne peut être vide',
          numberNotIntegerError: 'Kilométrage min doit être un entier',
        },
        mileageHigherBound: {
          mileageHigherBoundTooLow: 'Kilométrage max doit être positif',
          mileageHigherBoundTooHigh: 'Kilométrage max trop grand',
          emptyError: 'Kilométrage max ne peut être vide',
          numberNotIntegerError: 'Kilométrage max doit être un entier',
          mileageLowerBoundHigherThanMileageHigherBoundError:
            'Kilométrage max doit être supérieur à kilométrage min',
        },
        priceLowerBound: {
          priceLowerBoundTooLowError: 'Prix min doit être positif',
          emptyError: 'Prix min ne peut être vide',
          numberNotIntegerError: 'Prix min doit être un entier',
        },
        priceHigherBound: {
          emptyError: 'Prix max ne peut être vide',
          numberNotIntegerError: 'Prix max doit être un entier',
          priceLowerBoundHigherThanPriceHigherBoundError:
            'Prix max doit être supérieur à prix min',
        },
      },
      cadAddFormFieldsErrors: {
        year: {
          emptyError: 'Année ne peut être vide',
          numberNotIntegerError: 'Année doit être un entier',
          yearTooLowError: 'Année trop petite',
          yearTooHighError: "Année ne peut dépasser l'année courante",
        },
        mileage: {
          emptyError: 'Kilométrage ne peut être vide',
          numberNotIntegerError: 'Kilométrage doit être un entier',
          mileageLesserThanZeroError: 'Kilométrage doit être supérieur à 0',
          mileageTooHighError: 'Kilométrage trop élevé',
        },
        photos: {
          atLeastOnePhotoError: 'Voud devez ajouter au moins une photo',
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
  },
};

module.exports = translations;
