const dev = process.enc.NODE_ENV != "production";

export const server = dev ? "http://localhost:3000" : "https://tkcorp.dev";
