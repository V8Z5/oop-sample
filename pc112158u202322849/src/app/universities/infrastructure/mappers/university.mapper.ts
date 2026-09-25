/**
 * @summary Validates external data and maps API names into safe domain entities.
 * @author Marlon Packard Viza Quispe
 */
import { University } from '../../domain/models/university.entity';
import { UniversityResponse } from '../models/university.response';

export class UniversityMapper {
  static fromResponse(response: unknown): readonly University[] {
    if (!Array.isArray(response)) {
      throw new Error('The university API returned an invalid response.');
    }

    const universities = new Map<string, University>();
    for (const item of response) {
      if (!this.isUniversityResponse(item)) continue;
      const domains = this.uniqueStrings(item.domains)
        .map((domain) => domain.toLowerCase())
        .filter((domain) => /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain));
      const websites = this.uniqueStrings(item.web_pages).filter((website) => {
        try {
          return ['http:', 'https:'].includes(new URL(website).protocol);
        } catch {
          return false;
        }
      });
      const name = item.name.trim();
      const country = typeof item.country === 'string' ? item.country.trim() : '';
      const countryCode = typeof item.alpha_two_code === 'string' ? item.alpha_two_code.trim().toUpperCase() : '';
      const stateProvince = typeof item['state-province'] === 'string' ? item['state-province'].trim() || null : null;
      const id = JSON.stringify([name, country, stateProvince, domains]);
      universities.set(id, { id, name, country, countryCode, stateProvince, domains, websites });
    }
    return [...universities.values()];
  }

  private static isUniversityResponse(value: unknown): value is UniversityResponse {
    return typeof value === 'object' && value !== null && 'name' in value
      && typeof value.name === 'string' && value.name.trim().length > 0;
  }

  private static uniqueStrings(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim()).filter(Boolean))];
  }
}
