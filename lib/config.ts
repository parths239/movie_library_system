const config = {
// i fixed the error yay
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
    resendToken: process.env.RESEND_TOKEN!,
  },
};

export default config;

// const getEnvVar = (key: string): string => {
//   const value = process.env[key];
//   if (!value) {
//     throw new Error(`Missing environment variable: ${key}`);
//   }
//   return value;
// };

// const config = {
//   env: {
//     apiEndpoint: getEnvVar("NEXT_PUBLIC_API_ENDPOINT"),
//     prodApiEndpoint: getEnvVar("NEXT_PUBLIC_PROD_API_ENDPOINT"),
//     imagekit: {
//       publicKey: getEnvVar("NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY"),
//       urlEndpoint: getEnvVar("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT"),
//       privateKey: getEnvVar("IMAGEKIT_PRIVATE_KEY"),
//     },
//     databaseUrl: getEnvVar("DATABASE_URL"),
//     upstash: {
//       redisUrl: getEnvVar("UPSTASH_REDIS_URL"),
//       redisToken: getEnvVar("UPSTASH_REDIS_TOKEN"),
//       qstashUrl: getEnvVar("QSTASH_URL"),
//       qstashToken: getEnvVar("QSTASH_TOKEN"),
//     },
//     resendToken: getEnvVar("RESEND_TOKEN"),
//   },
// };

// export default config;
