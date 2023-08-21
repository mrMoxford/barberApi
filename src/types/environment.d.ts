export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        MONGO_SECRETKEY : string;
        MONGO_PASSWORD: string;
        JWT_SECRETKEY: string;
        PORT: number;
    }
  }
}