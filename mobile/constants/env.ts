import "dotenv/config";

export const env = {
  ENVIRONMENT: process.env?.ENVIRONMENT || "development",
  HOST_URL: process.env?.HOST_URL || "localhost",
  HOST_PORT: process.env?.HOST_PORT || 3000,
};
