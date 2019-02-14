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
  priceLowerBoundFeature?: Maybe<PriceBoundFeatureInput>;

  priceHigherBoundFeature?: Maybe<PriceBoundFeatureInput>;

  manufacturerFeature?: Maybe<ManufacturerFeatureInput>;

  modelFeature?: Maybe<ModelFeatureInput>;

  categoryFeature?: Maybe<CategoryFeatureInput>;

  mileageLowerBoundFeature?: Maybe<MileageBoundFeatureInput>;

  mileageHigherBoundFeature?: Maybe<MileageBoundFeatureInput>;

  yearLowerBoundFeature?: Maybe<YearBoundFeatureInput>;

  yearHigherBoundFeature?: Maybe<YearBoundFeatureInput>;

  features?: Maybe<AdCarFeatureInput[]>;
}

export interface PriceBoundFeatureInput {
  price: number;

  importance?: Maybe<AdFeatureImportance>;
}

export interface ManufacturerFeatureInput {
  manufacturerID: string;

  importance?: Maybe<AdFeatureImportance>;
}

export interface ModelFeatureInput {
  modelID: string;

  importance?: Maybe<AdFeatureImportance>;
}

export interface CategoryFeatureInput {
  categoryID: string;

  importance?: Maybe<AdFeatureImportance>;
}

export interface MileageBoundFeatureInput {
  mileage: number;

  importance?: Maybe<AdFeatureImportance>;
}

export interface YearBoundFeatureInput {
  year: number;

  importance?: Maybe<AdFeatureImportance>;
}

export interface AdCarFeatureInput {
  featureID: string;

  importance?: Maybe<AdFeatureImportance>;
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

export enum CarFeatureType {
  TrueFalse = 'TRUE_FALSE',
  MultipleChoice = 'MULTIPLE_CHOICE',
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

  car?: Maybe<Car>;

  carCategories?: Maybe<(Maybe<CarCategory>)[]>;

  carFeatureCategory?: Maybe<CarFeatureCategory>;

  carFeatureCategories?: Maybe<(Maybe<CarFeatureCategory>)[]>;

  manufacturers?: Maybe<(Maybe<Manufacturer>)[]>;
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

  offers: Offer[];

  ads: Ad[];

  cars: Car[];
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
}

export interface Ad {
  id: string;

  creator?: Maybe<User>;

  offers?: Maybe<Offer[]>;

  priceLowerBoundFeature?: Maybe<PriceBoundFeature>;

  priceHigherBoundFeature?: Maybe<PriceBoundFeature>;

  manufacturerFeature?: Maybe<ManufacturerFeature>;

  modelFeature?: Maybe<ModelFeature>;

  categoryFeature?: Maybe<CategoryFeature>;

  mileageLowerBoundFeature?: Maybe<MileageBoundFeature>;

  mileageHigherBoundFeature?: Maybe<MileageBoundFeature>;

  yearLowerBoundFeature?: Maybe<YearBoundFeature>;

  yearHigherBoundFeature?: Maybe<YearBoundFeature>;

  features?: Maybe<AdCarFeature[]>;

  isUrgent: boolean;

  isFirst: boolean;

  status: AdStatus;
}

export interface PriceBoundFeature {
  price: number;

  importance?: Maybe<AdFeatureImportance>;
}

export interface ManufacturerFeature {
  manufacturer: Manufacturer;

  importance?: Maybe<AdFeatureImportance>;
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

export interface ModelFeature {
  model: CarModel;

  importance?: Maybe<AdFeatureImportance>;
}

export interface CategoryFeature {
  category: CarCategory;

  importance?: Maybe<AdFeatureImportance>;
}

export interface CarCategory {
  id: string;

  name: string;
}

export interface MileageBoundFeature {
  mileage: number;

  importance?: Maybe<AdFeatureImportance>;
}

export interface YearBoundFeature {
  year: number;

  importance?: Maybe<AdFeatureImportance>;
}

export interface AdCarFeature {
  id: string;

  feature: CarFeature;

  importance?: Maybe<AdFeatureImportance>;
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
}

export interface Mutation {
  signup: User;

  login: User;

  logout: string;

  updateUser: User;

  createDraft: Post;

  createCar?: Maybe<Car>;

  createAd?: Maybe<Ad>;

  publish: Post;

  deletePost: Post;

  resetPasswordRequest: string;

  resetPassword: User;
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
export interface CarQueryArgs {
  id: string;
}
export interface CarFeatureCategoryQueryArgs {
  name: string;
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
export interface ResetPasswordRequestMutationArgs {
  email: string;
}
export interface ResetPasswordMutationArgs {
  resetToken: string;

  password: string;
}
