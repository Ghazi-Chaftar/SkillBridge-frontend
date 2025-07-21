export interface UserUpdate {
  firstName: string
  lastName: string
  phoneNumber: string
}

export type ProfileUpdateData =
  | ProfileHeaderUpdate
  | ProfileStatsUpdate
  | ProfileLanguagesUpdate
  | ProfileTeachingMethodsUpdate
  | ProfileBioUpdate
  | ProfileDegreesUpdate
  | ProfileSubjectsUpdate
  | ProfileLevelsUpdate

export interface ProfileHeaderUpdate {
  gender: string
  location: string
}

export interface ProfileStatsUpdate {
  currency: string
  hourlyRate: string
  yearsOfExperience: string
}

export interface ProfileLanguagesUpdate {
  languages: string[]
}

export interface ProfileTeachingMethodsUpdate {
  teachingMethod: string
}

export interface ProfileBioUpdate {
  bio: string
}

export interface ProfileDegreesUpdate {
  degrees: string[]
}

export interface ProfileSubjectsUpdate {
  subjects: string[]
}

export interface ProfileLevelsUpdate {
  levels: string[]
}
