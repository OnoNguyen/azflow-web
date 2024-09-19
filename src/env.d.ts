/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_ENTRA_CLIENT_ID: string;
  VITE_ENTRA_AUTHORITY: string;
  VITE_ENTRA_TENANT_ID: string;
  VITE_ENTRA_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
