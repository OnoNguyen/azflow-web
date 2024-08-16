/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

//
// export const PORT = import.meta.env.PORT || 3000;
// export const API_URL = import.meta.env.API_URL || "http://localhost:3000";
