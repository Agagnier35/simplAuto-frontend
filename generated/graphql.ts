export type Maybe<T> = T | null;

export interface UserSignupInput {
  email: string;

  firstName: string;

  lastName: string;

  password: string;

  location: string;

  age: number;

  gender: Gender;
}

export interface UserUpdateInput {
  id: string;

  email?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  password?: Maybe<string>;

  location?: Maybe<string>;

  age?: Maybe<number>;

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
  adFeatures?: Maybe<(Maybe<AdFeatureInput>)[]>;

  priceLowerBound?: Maybe<number>;

  priceHigherBound?: Maybe<number>;

  manufacturerID?: Maybe<string>;

  modelID?: Maybe<string>;

  categoryID?: Maybe<string>;

  mileageLowerBound?: Maybe<number>;

  mileageHigherBound?: Maybe<number>;

  yearLowerBound?: Maybe<number>;

  yearHigherBound?: Maybe<number>;

  isUrgent?: Maybe<boolean>;

  isFirst?: Maybe<boolean>;
}

export interface AdFeatureInput {
  featureID: string;

  importance: AdFeatureImportance;
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

export enum AdFeatureImportance {
  Low = 'LOW',
  Medium = 'MEDIUM',
  High = 'HIGH',
}

export enum AdStatus {
  Published = 'PUBLISHED',
  Accepted = 'ACCEPTED',
  Deleted = 'DELETED',
}

export enum OfferStatus {
  Published = 'PUBLISHED',
  Accepted = 'ACCEPTED',
  Deleted = 'DELETED',
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

  age: number;

  gender: Gender;

  permissions: Permission[];

  offers: Offer[];

  ads: Ad[];

  cars: Car[];
}

export interface Offer {
  id: string;

  creator: User;

  ad: Ad;

  car: Car;

  price: number;

  status: OfferStatus;

  finalRank?: Maybe<number>;
}

export interface Ad {
  id: string;

  creator: User;

  offers?: Maybe<Offer[]>;

  features?: Maybe<AdFeature[]>;

  priceLowerBound?: Maybe<number>;

  priceHigherBound?: Maybe<number>;

  manufacturer?: Maybe<Manufacturer>;

  model?: Maybe<CarModel>;

  category?: Maybe<CarCategory>;

  mileageLowerBound?: Maybe<number>;

  mileageHigherBound?: Maybe<number>;

  yearLowerBound?: Maybe<number>;

  yearHigherBound?: Maybe<number>;

  isUrgent: boolean;

  isFirst: boolean;

  status: AdStatus;
}

export interface AdFeature {
  id: string;

  feature: CarFeature;

  importance: AdFeatureImportance;
}

export interface CarFeature {
  id: string;

  name: string;

  category: CarFeatureCategory;
}

export interface CarFeatureCategory {
  id: string;

  name: string;

  features: CarFeature[];
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

export interface Car {
  id: string;

  owner: User;

  manufacturer: Manufacturer;

  model: CarModel;

  category: CarCategory;

  year: number;

  mileage: number;

  photos: string[];

  features: CarFeature[];
}

export interface Mutation {
  signup: User;

  login: User;

  updateUser: User;

  createDraft: Post;

  createCar?: Maybe<Car>;

  createAd?: Maybe<Ad>;

  publish: Post;

  deletePost: Post;
}

export interface Subscription {
  feedSubscription?: Maybe<Post>;
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
export interface SignupMutationArgs {
  data: UserSignupInput;
}
export interface LoginMutationArgs {
  email: string;

  password: string;
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
export interface CreateAdMutationArgs {
  data: AdCreateInput;
}
export interface PublishMutationArgs {
  id: string;
}
export interface DeletePostMutationArgs {
  id: string;
}
