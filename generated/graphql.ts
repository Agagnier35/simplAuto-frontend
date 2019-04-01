type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Ad = {
  id: Scalars['ID'];
  creator?: Maybe<User>;
  offers: Array<Offer>;
  offerCount: Scalars['Int'];
  priceLowerBound?: Maybe<Scalars['Float']>;
  priceHigherBound?: Maybe<Scalars['Float']>;
  manufacturer?: Maybe<Manufacturer>;
  model?: Maybe<CarModel>;
  category?: Maybe<CarCategory>;
  mileageLowerBound?: Maybe<Scalars['Int']>;
  mileageHigherBound?: Maybe<Scalars['Int']>;
  yearLowerBound?: Maybe<Scalars['Int']>;
  yearHigherBound?: Maybe<Scalars['Int']>;
  features?: Maybe<Array<CarFeature>>;
  urgentExpiry?: Maybe<Scalars['String']>;
  topExpiry?: Maybe<Scalars['String']>;
  status: AdStatus;
};

export type AdOffersArgs = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type AdCreateInput = {
  priceLowerBound?: Maybe<Scalars['Float']>;
  priceHigherBound?: Maybe<Scalars['Float']>;
  manufacturerID?: Maybe<Scalars['ID']>;
  modelID?: Maybe<Scalars['ID']>;
  categoryID?: Maybe<Scalars['ID']>;
  mileageLowerBound?: Maybe<Scalars['Int']>;
  mileageHigherBound?: Maybe<Scalars['Int']>;
  yearLowerBound?: Maybe<Scalars['Int']>;
  yearHigherBound?: Maybe<Scalars['Int']>;
  features?: Maybe<Array<Scalars['ID']>>;
};

export enum AdFeatureImportance {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export type AdPosition = {
  ad?: Maybe<Ad>;
  position?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
  totalLength?: Maybe<Scalars['Int']>;
};

export enum AdStatus {
  Published = 'PUBLISHED',
  Accepted = 'ACCEPTED',
  Deleted = 'DELETED',
}

export type AdUpdateInput = {
  id: Scalars['ID'];
  priceLowerBound?: Maybe<Scalars['Float']>;
  priceHigherBound?: Maybe<Scalars['Float']>;
  manufacturerID?: Maybe<Scalars['ID']>;
  modelID?: Maybe<Scalars['ID']>;
  categoryID?: Maybe<Scalars['ID']>;
  mileageLowerBound?: Maybe<Scalars['Int']>;
  mileageHigherBound?: Maybe<Scalars['Int']>;
  yearLowerBound?: Maybe<Scalars['Int']>;
  yearHigherBound?: Maybe<Scalars['Int']>;
  features?: Maybe<Array<Scalars['ID']>>;
};

export type Car = {
  id: Scalars['ID'];
  owner?: Maybe<User>;
  manufacturer: Manufacturer;
  model: CarModel;
  category: CarCategory;
  description?: Maybe<Scalars['String']>;
  year: Scalars['Int'];
  mileage: Scalars['Int'];
  photos: Array<Scalars['String']>;
  photoCount: Scalars['Int'];
  features: Array<CarFeature>;
  status: CarStatus;
  offers?: Maybe<Array<Offer>>;
  offerCount: Scalars['Int'];
};

export type CarOffersArgs = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type CarCategory = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CarCreateInput = {
  manufacturerID: Scalars['String'];
  modelID: Scalars['String'];
  categoryID: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  year: Scalars['Int'];
  mileage: Scalars['Int'];
  photos: Array<Scalars['String']>;
  featuresIDs?: Maybe<Array<Scalars['String']>>;
};

export type CarFeature = {
  id: Scalars['ID'];
  name: Scalars['String'];
  category: CarFeatureCategory;
};

export type CarFeatureCategory = {
  id: Scalars['ID'];
  name: Scalars['String'];
  type: CarFeatureType;
  features: Array<CarFeature>;
};

export enum CarFeatureType {
  True_False = 'TRUE_FALSE',
  Multiple_Choice = 'MULTIPLE_CHOICE',
}

export type CarModel = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum CarStatus {
  Published = 'PUBLISHED',
  Sold = 'SOLD',
  Deleted = 'DELETED',
}

export enum ClientType {
  Company = 'COMPANY',
  Individual = 'INDIVIDUAL',
}

export type Conversation = {
  id: Scalars['ID'];
  buyer: User;
  seller: User;
  offer: Offer;
  messages: Array<Message>;
  messageCount: Scalars['Int'];
  status?: Maybe<ConversationStatus>;
};

export enum ConversationStatus {
  Opened = 'OPENED',
  Deleted = 'DELETED',
}

export type Date = {
  day: Scalars['Int'];
  month: Scalars['Int'];
  year: Scalars['Int'];
};

export type DateInput = {
  day: Scalars['Int'];
  month: Scalars['Int'];
  year: Scalars['Int'];
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export type Location = {
  name: Scalars['String'];
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type LocationInput = {
  name: Scalars['String'];
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type Manufacturer = {
  id: Scalars['ID'];
  name: Scalars['String'];
  models: Array<CarModel>;
};

export type Message = {
  id: Scalars['ID'];
  sender: User;
  text: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  conversation: Conversation;
};

export type Mutation = {
  signup: User;
  login: User;
  facebookLogin: User;
  googleLogin: User;
  logout: Scalars['String'];
  updateUser: User;
  createCar?: Maybe<Car>;
  deleteCar?: Maybe<Car>;
  createAd?: Maybe<Ad>;
  updateAd?: Maybe<Ad>;
  deleteAd?: Maybe<Ad>;
  resetPasswordRequest: Scalars['String'];
  resetPassword: User;
  createOffer?: Maybe<Offer>;
  updateOffer?: Maybe<Offer>;
  deleteOffer?: Maybe<Offer>;
  createConversation: Conversation;
  sendMessage: Message;
  deleteNotification?: Maybe<Notification>;
  goPremium: User;
  acceptOffer?: Maybe<Offer>;
  sendNotificationEmail?: Maybe<Scalars['String']>;
  buyCarSpot: User;
  buyUrgentAd: Ad;
  buyTopAd: Ad;
};

export type MutationSignupArgs = {
  data: UserSignupInput;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationFacebookLoginArgs = {
  data: UserSignupInput;
};

export type MutationGoogleLoginArgs = {
  data: UserSignupInput;
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
};

export type MutationCreateCarArgs = {
  data: CarCreateInput;
};

export type MutationDeleteCarArgs = {
  id: Scalars['ID'];
};

export type MutationCreateAdArgs = {
  data: AdCreateInput;
};

export type MutationUpdateAdArgs = {
  data: AdUpdateInput;
};

export type MutationDeleteAdArgs = {
  id: Scalars['ID'];
};

export type MutationResetPasswordRequestArgs = {
  email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  resetToken: Scalars['String'];
  password: Scalars['String'];
};

export type MutationCreateOfferArgs = {
  data: OfferCreateInput;
};

export type MutationUpdateOfferArgs = {
  data: OfferUpdateInput;
};

export type MutationDeleteOfferArgs = {
  id: Scalars['ID'];
};

export type MutationCreateConversationArgs = {
  offerID: Scalars['ID'];
};

export type MutationSendMessageArgs = {
  data?: Maybe<SendMessageInput>;
};

export type MutationDeleteNotificationArgs = {
  id: Scalars['ID'];
};

export type MutationGoPremiumArgs = {
  stripeToken: Scalars['String'];
};

export type MutationAcceptOfferArgs = {
  id: Scalars['ID'];
};

export type MutationSendNotificationEmailArgs = {
  id: Scalars['ID'];
};

export type MutationBuyCarSpotArgs = {
  stripeToken: Scalars['String'];
  amount: Scalars['Int'];
};

export type MutationBuyUrgentAdArgs = {
  stripeToken: Scalars['String'];
  id: Scalars['ID'];
};

export type MutationBuyTopAdArgs = {
  stripeToken: Scalars['String'];
  id: Scalars['ID'];
};

export type Notification = {
  id: Scalars['ID'];
  owner: User;
  type: NotificationType;
  objectID?: Maybe<Scalars['ID']>;
  count: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export enum NotificationType {
  General = 'GENERAL',
  Offer_Message = 'OFFER_MESSAGE',
  New_Offer = 'NEW_OFFER',
}

export type Offer = {
  id: Scalars['ID'];
  creator?: Maybe<User>;
  ad: Ad;
  car: Car;
  price: Scalars['Float'];
  status: OfferStatus;
  finalRank?: Maybe<Scalars['Int']>;
  addons?: Maybe<Array<OfferAddon>>;
  conversation?: Maybe<Conversation>;
  createdAt: Scalars['String'];
};

export type OfferAddon = {
  id: Scalars['ID'];
  name: Scalars['String'];
  rankValue: Scalars['Int'];
};

export type OfferAddonInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  rankValue?: Maybe<Scalars['Int']>;
};

export type OfferCreateInput = {
  adID: Scalars['String'];
  carID: Scalars['String'];
  price: Scalars['Float'];
  addons?: Maybe<Array<OfferAddonInput>>;
};

export type OfferPosition = {
  offer?: Maybe<Offer>;
  position?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['Int']>;
  totalLength?: Maybe<Scalars['Int']>;
};

export enum OfferStatus {
  Published = 'PUBLISHED',
  Accepted = 'ACCEPTED',
  Deleted = 'DELETED',
}

export type OfferUpdateInput = {
  id: Scalars['ID'];
  price?: Maybe<Scalars['Float']>;
  addons?: Maybe<Array<OfferAddonInput>>;
};

export enum Permission {
  User = 'USER',
  Premium = 'PREMIUM',
  Admin = 'ADMIN',
}

export type Prices = {
  premiumAccount: Scalars['Int'];
  carSpot: Scalars['Int'];
  urgentAd: Scalars['Int'];
  topAd: Scalars['Int'];
};

export type Query = {
  me?: Maybe<User>;
  ads?: Maybe<Array<Ad>>;
  ad?: Maybe<Ad>;
  suggestions?: Maybe<Array<Maybe<OfferPosition>>>;
  adSuggestion?: Maybe<Array<Maybe<AdPosition>>>;
  car?: Maybe<Car>;
  carCategories?: Maybe<Array<Maybe<CarCategory>>>;
  carFeatureCategory?: Maybe<CarFeatureCategory>;
  carFeatureCategories?: Maybe<Array<Maybe<CarFeatureCategory>>>;
  manufacturers?: Maybe<Array<Maybe<Manufacturer>>>;
  offer?: Maybe<Offer>;
  offerAddons?: Maybe<Array<OfferAddon>>;
  allAdsCount: Scalars['Int'];
  statsForAds?: Maybe<Statistics>;
  statsForOffer?: Maybe<Statistics>;
  getPrices: Prices;
};

export type QueryAdsArgs = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type QueryAdArgs = {
  id: Scalars['ID'];
};

export type QuerySuggestionsArgs = {
  id: Scalars['ID'];
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type QueryAdSuggestionArgs = {
  id: Scalars['ID'];
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type QueryCarArgs = {
  id: Scalars['ID'];
};

export type QueryCarFeatureCategoryArgs = {
  name: Scalars['String'];
};

export type QueryOfferArgs = {
  id: Scalars['ID'];
};

export type QueryStatsForAdsArgs = {
  id: Scalars['ID'];
};

export type QueryStatsForOfferArgs = {
  id: Scalars['ID'];
};

export type SendMessageInput = {
  conversationID: Scalars['ID'];
  text: Scalars['String'];
  image?: Maybe<Scalars['String']>;
};

export type Statistics = {
  averagePriceAPI: Scalars['Float'];
  averageTimeOnMarketAPI: Scalars['Float'];
  averagePriceApp: Scalars['Float'];
  averageTimeOnMarketApp: Scalars['Float'];
};

export type Subscription = {
  messageSubscription?: Maybe<Message>;
};

export type SubscriptionMessageSubscriptionArgs = {
  conversationID: Scalars['ID'];
};

export type User = {
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  location: Location;
  radius: Scalars['Int'];
  birthDate?: Maybe<Date>;
  gender?: Maybe<Gender>;
  permissions: Array<Permission>;
  facebookID?: Maybe<Scalars['String']>;
  googleID?: Maybe<Scalars['String']>;
  ads: Array<Ad>;
  cars: Array<Car>;
  conversations?: Maybe<Array<Conversation>>;
  conversationCount: Scalars['Int'];
  adCount: Scalars['Int'];
  carCount: Scalars['Int'];
  clientType: ClientType;
  language?: Maybe<UserLanguage>;
  offers: Array<Offer>;
  offerCount: Scalars['Int'];
  notifications: Array<Notification>;
  notificationCount: Scalars['Int'];
  notificationEmailOffer: Scalars['Boolean'];
  notificationEmailMessage: Scalars['Boolean'];
  notificationInAppOffer: Scalars['Boolean'];
  notificationInAppMessage: Scalars['Boolean'];
  carLimit: Scalars['Int'];
  createdAt: Scalars['String'];
};

export type UserAdsArgs = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type UserCarsArgs = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export enum UserLanguage {
  French = 'FRENCH',
  English = 'ENGLISH',
}

export type UserSignupInput = {
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  location: LocationInput;
  radius: Scalars['Int'];
  birthDate?: Maybe<DateInput>;
  gender?: Maybe<Gender>;
  permissions?: Maybe<Array<Permission>>;
  facebookID?: Maybe<Scalars['String']>;
  googleID?: Maybe<Scalars['String']>;
  clientType: ClientType;
  language?: Maybe<UserLanguage>;
};

export type UserUpdateInput = {
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  location?: Maybe<LocationInput>;
  radius?: Maybe<Scalars['Int']>;
  birthDate?: Maybe<DateInput>;
  gender?: Maybe<Gender>;
  permissions?: Maybe<Array<Permission>>;
  clientType?: Maybe<ClientType>;
  language?: Maybe<UserLanguage>;
  notificationEmailOffer?: Maybe<Scalars['Boolean']>;
  notificationEmailMessage?: Maybe<Scalars['Boolean']>;
  notificationInAppOffer?: Maybe<Scalars['Boolean']>;
  notificationInAppMessage?: Maybe<Scalars['Boolean']>;
};
