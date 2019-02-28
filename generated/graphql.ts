export type Maybe<T> = T | null;

export interface UserSignupInput {
  email: string;

  firstName: string;

  lastName: string;

  password: string;

  location: string;

  birthDate: DateInput;

  gender: Gender;

  permissions?: Maybe<Permission[]>;

  facebookID?: Maybe<string>;

  googleID?: Maybe<string>;
}

export interface DateInput {
  day: number;

  month: number;

  year: number;
}

export interface UserUpdateInput {
  id: string;

  email?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  password?: Maybe<string>;

  location?: Maybe<string>;

  birthDate?: Maybe<DateInput>;

  gender?: Maybe<Gender>;

  permissions?: Maybe<Permission[]>;
}

export interface CarCreateInput {
  manufacturerID: string;

  modelID: string;

  categoryID: string;

  year: number;

  mileage: number;

  photos: string[];

  featuresIDs?: Maybe<string[]>;
}

export interface AdCreateInput {
  priceLowerBound?: Maybe<number>;

  priceHigherBound?: Maybe<number>;

  manufacturerID?: Maybe<string>;

  modelID?: Maybe<string>;

  categoryID?: Maybe<string>;

  mileageLowerBound?: Maybe<number>;

  mileageHigherBound?: Maybe<number>;

  yearLowerBound?: Maybe<number>;

  yearHigherBound?: Maybe<number>;

  features?: Maybe<string[]>;
}

export interface AdUpdateInput {
  id: string;

  priceLowerBound?: Maybe<number>;

  priceHigherBound?: Maybe<number>;

  manufacturerID?: Maybe<string>;

  modelID?: Maybe<string>;

  categoryID?: Maybe<string>;
<<<<<<< Updated upstream

  mileageLowerBound?: Maybe<number>;

=======

  mileageLowerBound?: Maybe<number>;

>>>>>>> Stashed changes
  mileageHigherBound?: Maybe<number>;

  yearLowerBound?: Maybe<number>;

  yearHigherBound?: Maybe<number>;

  features?: Maybe<string[]>;
}

export interface OfferCreateInput {
  adID: string;

  carID: string;

  price: number;

  addons?: Maybe<OfferAddonInput[]>;
}

export interface OfferAddonInput {
  id?: Maybe<string>;

  name?: Maybe<string>;

  rankValue?: Maybe<number>;
}

export interface OfferUpdateInput {
  id: string;

  price?: Maybe<number>;

  addons?: Maybe<OfferAddonInput[]>;
}

export interface SendMessageInput {
  conversationID: string;

  text: string;

  image?: Maybe<string>;
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export enum Permission {
  User = 'USER',
  Premium = 'PREMIUM',
  Admin = 'ADMIN',
}

export enum CarFeatureType {
  TrueFalse = 'TRUE_FALSE',
  MultipleChoice = 'MULTIPLE_CHOICE',
}

export enum AdStatus {
  Published = 'PUBLISHED',
  Accepted = 'ACCEPTED',
  Deleted = 'DELETED',
}

export enum CarStatus {
  Published = 'PUBLISHED',
  Sold = 'SOLD',
  Deleted = 'DELETED',
}

export enum OfferStatus {
  Published = 'PUBLISHED',
  Accepted = 'ACCEPTED',
  Deleted = 'DELETED',
}

export enum AdFeatureImportance {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

// ====================================================
// Types
// ====================================================

export interface Query {
  feed: Post[];

  drafts: Post[];

  post?: Maybe<Post>;

  me?: Maybe<User>;

  ads?: Maybe<Ad[]>;

  ad?: Maybe<Ad>;

  car?: Maybe<Car>;

  carCategories?: Maybe<(Maybe<CarCategory>)[]>;

  carFeatureCategory?: Maybe<CarFeatureCategory>;

  carFeatureCategories?: Maybe<(Maybe<CarFeatureCategory>)[]>;

  manufacturers?: Maybe<(Maybe<Manufacturer>)[]>;

  offer?: Maybe<Offer>;

  offerAddons?: Maybe<OfferAddon[]>;
}

export interface Post {
  id: string;

  published: boolean;

  title: string;

  content: string;

  author: User;
}

export interface User {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  password: string;

  location: string;

  birthDate: Date;

  gender: Gender;

  permissions: Permission[];

  facebookID?: Maybe<string>;

  googleID?: Maybe<string>;

  offers: Offer[];

  ads: Ad[];

  cars: Car[];

  conversations?: Maybe<Conversation[]>;
}

export interface Date {
  day: number;

  month: number;

  year: number;
}

export interface Offer {
  id: string;

  creator?: Maybe<User>;

  ad: Ad;

  car: Car;

  price: number;

  status: OfferStatus;

  finalRank?: Maybe<number>;

  addons?: Maybe<OfferAddon[]>;

  conversation?: Maybe<Conversation>;
}

export interface Ad {
  id: string;

  creator?: Maybe<User>;

  offers: Offer[];

  priceLowerBound?: Maybe<number>;

  priceHigherBound?: Maybe<number>;

  manufacturer?: Maybe<Manufacturer>;

  model?: Maybe<CarModel>;

  category?: Maybe<CarCategory>;

  mileageLowerBound?: Maybe<number>;

  mileageHigherBound?: Maybe<number>;

  yearLowerBound?: Maybe<number>;

  yearHigherBound?: Maybe<number>;

  features?: Maybe<CarFeature[]>;

  isUrgent: boolean;

  isFirst: boolean;

  status: AdStatus;
}

export interface Manufacturer {
  id: string;

  name: string;

  models: CarModel[];
}

export interface CarModel {
  id: string;

  name: string;
}

export interface CarCategory {
  id: string;

  name: string;
}

export interface CarFeature {
  id: string;

  name: string;

  category: CarFeatureCategory;
}

export interface CarFeatureCategory {
  id: string;

  name: string;

  type: CarFeatureType;

  features: CarFeature[];
}

export interface Car {
  id: string;

  owner?: Maybe<User>;

  manufacturer: Manufacturer;

  model: CarModel;

  category: CarCategory;

  year: number;

  mileage: number;

  photos: string[];

  features: CarFeature[];

  status: CarStatus;

  offers?: Maybe<Offer[]>;
}

export interface OfferAddon {
  id: string;

  name: string;

  rankValue: number;
}

export interface Conversation {
  id: string;

  buyer?: Maybe<User>;

  seller?: Maybe<User>;

  offer: Offer;

  messages: Message[];
}

export interface Message {
  id: string;

  sender: User;

  text: string;

  image?: Maybe<string>;

  conversation: Conversation;
}

export interface Mutation {
  signup: User;

  login: User;

  facebookLogin: User;

  googleLogin: User;

  logout: string;

  updateUser: User;

  createDraft: Post;

  createCar?: Maybe<Car>;

  deleteCar?: Maybe<Car>;

  createAd?: Maybe<Ad>;

  updateAd?: Maybe<Ad>;

  deleteAd?: Maybe<Ad>;

  publish: Post;

  deletePost: Post;

  resetPasswordRequest: string;

  resetPassword: User;

  createOffer?: Maybe<Offer>;

  updateOffer?: Maybe<Offer>;

  deleteOffer?: Maybe<Offer>;

  createConversation: Conversation;

  sendMessage: Message;
}

export interface Subscription {
  messageSubscription?: Maybe<Message>;
}

// ====================================================
// Arguments
// ====================================================

export interface PostQueryArgs {
  id: string;
}
export interface AdsQueryArgs {
  adFeaturesIDs?: Maybe<(Maybe<string>)[]>;
}
export interface AdQueryArgs {
  id: string;
}
export interface CarQueryArgs {
  id: string;
}
export interface CarFeatureCategoryQueryArgs {
  name: string;
}
export interface OfferQueryArgs {
  id: string;
}
export interface SignupMutationArgs {
  data: UserSignupInput;
}
export interface LoginMutationArgs {
  email: string;

  password: string;
}
export interface FacebookLoginMutationArgs {
  data: UserSignupInput;
}
export interface GoogleLoginMutationArgs {
  data: UserSignupInput;
}
export interface UpdateUserMutationArgs {
  data: UserUpdateInput;
}
export interface CreateDraftMutationArgs {
  title: string;

  content: string;
}
export interface CreateCarMutationArgs {
  data: CarCreateInput;
}
export interface DeleteCarMutationArgs {
  id: string;
}
export interface CreateAdMutationArgs {
  data: AdCreateInput;
}
export interface UpdateAdMutationArgs {
  data: AdUpdateInput;
}
export interface DeleteAdMutationArgs {
  id: string;
}
export interface PublishMutationArgs {
  id: string;
}
export interface DeletePostMutationArgs {
  id: string;
}
export interface ResetPasswordRequestMutationArgs {
  email: string;
}
export interface ResetPasswordMutationArgs {
  resetToken: string;

  password: string;
}
export interface CreateOfferMutationArgs {
  data: OfferCreateInput;
}
export interface UpdateOfferMutationArgs {
  data: OfferUpdateInput;
}
export interface DeleteOfferMutationArgs {
  id: string;
}
export interface CreateConversationMutationArgs {
  offerID: string;
}
export interface SendMessageMutationArgs {
  data?: Maybe<SendMessageInput>;
}
