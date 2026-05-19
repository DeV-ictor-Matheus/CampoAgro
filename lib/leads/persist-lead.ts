import { appendLeadDemo } from './demo-store';
import { appendLeadToGoogleSheets, isGoogleSheetsConfigured } from './google-sheets';
import type { ExpositorLeadPayload } from './types';

export type LeadStorageResult = {
  demo: boolean;
  sheets: boolean;
  path?: string;
};

export async function persistLead(lead: ExpositorLeadPayload): Promise<LeadStorageResult> {
  if (isGoogleSheetsConfigured()) {
    await appendLeadToGoogleSheets(lead);
    return { demo: false, sheets: true };
  }

  const path = await appendLeadDemo(lead);
  return { demo: true, sheets: false, path };
}
