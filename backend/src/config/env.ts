import dotenv from "dotenv";

dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  PORT: process.env.PORT || 5000,
  SUPABASE_URL: required('SUPABASE_URL'),
  SUPABASE_KEY: required('SUPABASE_ANON_KEY'),
  JWT_SECRET: required('JWT_SECRET'),
  FRONTEND_URL: required('FRONTEND_URL'),
  SEPOLIA_RPC_URL: required('SEPOLIA_RPC_URL'),
};
