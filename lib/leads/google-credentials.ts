import { readFileSync } from 'fs';
import { resolve } from 'path';

type ServiceAccountJson = {
  client_email?: string;
  private_key?: string;
};

export type GoogleServiceAccountCredentials = {
  email: string;
  privateKey: string;
};

function loadFromJsonFile(jsonPath: string): GoogleServiceAccountCredentials {
  const absolutePath = resolve(process.cwd(), jsonPath);
  let raw: string;

  try {
    raw = readFileSync(absolutePath, 'utf8');
  } catch {
    throw new Error(
      `Não foi possível ler o arquivo de credenciais em "${jsonPath}". Verifique GOOGLE_SERVICE_ACCOUNT_JSON_PATH.`,
    );
  }

  const json = JSON.parse(raw) as ServiceAccountJson;
  const email = json.client_email?.trim();
  const privateKey = json.private_key?.replace(/\\n/g, '\n').trim();

  if (!email || !privateKey) {
    throw new Error(
      'O JSON da service account precisa conter "client_email" e "private_key".',
    );
  }

  return { email, privateKey };
}

function loadFromEnv(): GoogleServiceAccountCredentials | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  if (!email || !privateKey) return null;

  return { email, privateKey };
}

export function getGoogleServiceAccountCredentials(): GoogleServiceAccountCredentials | null {
  const jsonPath =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH?.trim() ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();

  if (jsonPath) return loadFromJsonFile(jsonPath);

  return loadFromEnv();
}

export function isGoogleServiceAccountConfigured(): boolean {
  const jsonPath =
    process.env.GOOGLE_SERVICE_ACCOUNT_JSON_PATH?.trim() ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();

  if (jsonPath) return true;

  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_PRIVATE_KEY?.trim(),
  );
}
