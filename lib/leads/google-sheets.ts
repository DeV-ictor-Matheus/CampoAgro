import { google } from 'googleapis';

import type { ExpositorLeadPayload } from './types';
import { ingressoLabel, interesseLabel, patrocinioLabel } from './types';

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY,
  );
}

function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!email || !privateKey) {
    throw new Error('Credenciais do Google Sheets não configuradas.');
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: [SHEETS_SCOPE],
  });

  return google.sheets({ version: 'v4', auth });
}

function leadToRow(lead: ExpositorLeadPayload): string[] {
  const savedAt = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  return [
    savedAt,
    interesseLabel(lead.interesse),
    lead.nome,
    lead.email,
    lead.telefone,
    lead.empresa ?? '',
    lead.tipoPatrocinio ? patrocinioLabel(lead.tipoPatrocinio) : '',
    lead.tipoIngresso ? ingressoLabel(lead.tipoIngresso) : '',
    lead.mensagem ?? '',
    'site-campoagro',
    'novo',
  ];
}

export async function appendLeadToGoogleSheets(lead: ExpositorLeadPayload): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const tabName = process.env.GOOGLE_SHEETS_TAB_NAME ?? 'Leads';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID não configurado.');
  }

  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tabName}!A:K`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [leadToRow(lead)],
    },
  });
}
