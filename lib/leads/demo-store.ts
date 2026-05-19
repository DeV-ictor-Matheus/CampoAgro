import fs from 'fs/promises';
import path from 'path';

import type { ExpositorLeadPayload } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads-demo.json');
const EMAIL_PREVIEW_DIR = path.join(DATA_DIR, 'email-previews');

export async function appendLeadDemo(lead: ExpositorLeadPayload): Promise<string> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  let leads: Array<ExpositorLeadPayload & { savedAt: string }> = [];

  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf8');
    leads = JSON.parse(raw) as Array<ExpositorLeadPayload & { savedAt: string }>;
  } catch {
    leads = [];
  }

  leads.push({ ...lead, savedAt: new Date().toISOString() });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');

  return 'data/leads-demo.json';
}

export async function saveEmailPreview(to: string, subject: string, html: string): Promise<string> {
  await fs.mkdir(EMAIL_PREVIEW_DIR, { recursive: true });
  const stamp = `${Date.now()}`;
  const base = path.join(EMAIL_PREVIEW_DIR, stamp);
  await fs.writeFile(`${base}.html`, html, 'utf8');
  await fs.writeFile(`${base}.txt`, `To: ${to}\nSubject: ${subject}\n`, 'utf8');
  return `data/email-previews/${stamp}.html`;
}
