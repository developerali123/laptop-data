import Redis from 'ioredis';

export async function generateAndStoreOtp(
  redisClient: Redis,
  key: string,
  expirySeconds = 300, // default 5 minutes
): Promise<string> {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redisClient.set(key, otp, 'EX', expirySeconds);
  return otp;
}
