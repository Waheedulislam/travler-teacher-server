export interface IUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  age?: string;
  homeCountry?: string;
  languages?: string[];
  travelInterests?: string[];
  targetLanguages?: string[];
  languageLevel?: string;
  learningGoals?: string[];
  preferredDestinations?: string[];
  travelStyle?: string;
  accommodationPreference?: string;
  hobbies?: string[];
  foodPreferences?: string[];
  socialStyle?: number[];
  adventurousness?: number[];
  createdAt?: Date;
  updatedAt?: Date;
}
