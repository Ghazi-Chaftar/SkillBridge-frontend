export type LoginRequest = {
  email: string
}

export type LoginResponse = {
  hasPassword: boolean
}

export type SetPasswordRequest = {
  email: string
  password: string
  confirmPassword: string
}

export type TokenRequest = {
  email: string
  password: string
}

export type LoginResult = {
  data: {
    access: string
    refresh: string
    isVerified?: boolean
  }
}

// export type SupplierSetPasswordResult = {
//   data: {
//     message: string
//     tokens: {
//       refresh: string
//       access: string
//       user: User
//     }
//   }
// }

export type SupplierEmailLogin = {
  data: {
    message: {
      hasPassword: boolean
      email: string
    }
    statusCode: number
  }
}

export type ClientLoginRequest = {
  emailOrphone?: string
  password: string
}

export type RestPasswordRequest = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export type EmailPhoneType = {
  email: string
  phoneNumber: string
}

export type PhoneOnlyType = {
  phoneNumber: string
}

export type SupplierLoginResult = {
  hasPassword: boolean
  email: string
}

export type SupplierSetPasswordResult = {
  refresh: string
  access: string
}
