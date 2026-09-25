/**
 * @summary Immutable university data independent of HTTP and presentation.
 * @author Marlon Packard Viza Quispe
 */
export interface University {
  readonly id: string;
  readonly name: string;
  readonly country: string;
  readonly countryCode: string;
  readonly stateProvince: string | null;
  readonly domains: readonly string[];
  readonly websites: readonly string[];
}
