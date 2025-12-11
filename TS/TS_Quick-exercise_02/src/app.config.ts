export type Environment = "development" | "staging" | "production";

export type AppConfig = Record<
  Environment,
  {
    apiUrl: string;
    debug: boolean;
    timeout: number;
  }
>;

export const CONFIG: AppConfig = {
  development: { apiUrl: "http://localhost:3000", debug: true, timeout: 30000 },
  staging: { apiUrl: "https://staging.api.com", debug: false, timeout: 10000 },
  production: { apiUrl: "https://api.com", debug: false, timeout: 5000 },
};
