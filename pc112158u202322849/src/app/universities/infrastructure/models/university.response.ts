/**
 * @summary Defines the external Hipo Labs response contract at the API boundary.
 * @author Marlon Packard Viza Quispe
 */
export interface UniversityResponse {
  name: string;
  country?: string;
  alpha_two_code?: string;
  'state-province'?: string | null;
  domains?: unknown[];
  web_pages?: unknown[];
}
