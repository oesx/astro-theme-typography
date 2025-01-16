export interface AuthConfig {
  webauthn: {
    rpID: string
    rpName: string
    origin: string
  }
  admin: {
    username: string
    password: string
  }
}
