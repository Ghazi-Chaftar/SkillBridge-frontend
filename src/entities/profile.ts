export interface Currency {
  code: string
  name: string
  symbol?: string
}

export interface Profile {
  id: string
  user_id: string
  bio: string
  profilePicture: string
  location: string
  hourlyRate: string
  subjects: string[]
  languages: string[]
  yearsOfExperience: string

  teachingMethod: string
  levels: string[]

  degrees: string[]
  gender?: string
  currency?: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}
