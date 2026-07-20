import 'dotenv/config';

function required(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required env var: ${key}`);
    return value;
}

export const env = {
    port: process.env.PORT || 5000,
    databaseUrl: required('DATABASE_URL'),
};