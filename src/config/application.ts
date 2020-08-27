export default (): any => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    auth:{
      salt: 8,
      privateKey: process.env.AUTH_PRIVATE_KEY,
      publicKey: process.env.AUTH_PUBLIC_KEY,
      options: {
        algorithm: 'HS256',
        expiresIn: '2h',
        issuer: 'demoapp - airtek',
        audience: 'demoapp - frontend',
      },
    }
  }
}