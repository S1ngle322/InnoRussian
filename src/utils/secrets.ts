import log from "./winston";

export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PROD = ENVIRONMENT === "NODE_ENV";

export const SERVER_PORT = parseInt(process.env.SERVER_PORT, 3000);

export const DB_URL = process.env.DB_URL;

if (!DB_URL) {
    log.info("No mongo connection string. Set the DB_URL environment variable.");
}

export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_REFRESH_SECRET) {
    log.info("No refresh token secret. Set the JWT_REFRESH_SECRET environment variable.");
}

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

if (!JWT_ACCESS_SECRET) {
    log.info("No access token secret. Set the JWT_ACCESS_SECRET environment variable.");
}

export const JWT_ACCESS_LIFETIME = process.env.JWT_ACCESS_LIFETIME || 999999;
export const JWT_REFRESH_LIFETIME = process.env.JWT_REFRESH_LIFETIME || 999999;
