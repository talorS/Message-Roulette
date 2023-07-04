declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        URL: string;
        ACCESS_TOKEN_SECRET: string;
        EXPIRY: string;
    }
}