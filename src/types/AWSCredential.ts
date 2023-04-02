type AWSCredential = {
  Credentials: {
    AccessKeyId: string
    Expiration: string
    SecretKey: string
    SessionToken: string
  }
  IdentityId: string
  email: string
  username: string
}

export default AWSCredential
