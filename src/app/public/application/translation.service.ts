/**
 * @summary Provides typed, reactive English and Spanish translations; English is the initial language.
 * @author Marlon Packard Viza Quispe
 */
import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Language } from '../domain/models/language.type';

const ENGLISH = {
  skip: 'Skip to university directory',
  language: 'Interface language',
  eyebrow: 'KNOWLEDGE WITHOUT BORDERS',
  heroFirst: 'A world of science.',
  heroSecond: 'A place to begin.',
  introduction: 'Discover universities with “ciencias” in their name. Explore their origins, connect with their communities, and find your next source of inspiration.',
  directory: 'University directory',
  directoryDescription: 'Academic institutions, connected to the world.',
  universities: 'Universities',
  countries: 'Countries',
  source: 'Source: Hipo Labs',
  searchLabel: 'Name contains',
  results: 'universities found',
  country: 'Country',
  code: 'Country code',
  region: 'State / province',
  domains: 'Domain',
  websites: 'Website URL',
  readMore: 'Read more',
  visit: 'Read more about',
  newTab: 'opens in a new tab',
  logo: 'Domain logo for',
  logoUnavailable: 'Domain logo unavailable for',
  unavailable: 'Not available',
  noWebsite: 'Website unavailable',
  loading: 'Finding science-focused universities…',
  loadingDetail: 'Retrieving the latest university information from Hipo Labs.',
  error: 'We could not load the universities.',
  errorDetail: 'The university service may be temporarily unavailable. Check your connection and try again.',
  retry: 'Try again',
  empty: 'No universities found',
  emptyDetail: 'The service returned no universities with “ciencias” in their name.',
  refresh: 'Refresh directory',
  copyright: 'Copyright © 2024 EduGlobal Tech LLC. All rights reserved.',
  developedBy: 'Developed by',
} as const;

type Translations = { readonly [Key in keyof typeof ENGLISH]: string };
const SPANISH: Translations = {
  skip: 'Ir al directorio de universidades',
  language: 'Idioma de la interfaz',
  eyebrow: 'CONOCIMIENTO SIN FRONTERAS',
  heroFirst: 'Un mundo de ciencia.',
  heroSecond: 'Un lugar para empezar.',
  introduction: 'Descubre universidades que incluyen “ciencias” en su nombre. Explora sus orígenes, conecta con sus comunidades y encuentra tu próxima fuente de inspiración.',
  directory: 'Directorio de universidades',
  directoryDescription: 'Instituciones académicas conectadas con el mundo.',
  universities: 'Universidades',
  countries: 'Países',
  source: 'Fuente: Hipo Labs',
  searchLabel: 'El nombre contiene',
  results: 'universidades encontradas',
  country: 'País',
  code: 'Código del país',
  region: 'Estado / provincia',
  domains: 'Dominio',
  websites: 'URL del sitio web',
  readMore: 'Ver más',
  visit: 'Ver más sobre',
  newTab: 'se abre en una pestaña nueva',
  logo: 'Logo del dominio de',
  logoUnavailable: 'Logo del dominio no disponible para',
  unavailable: 'No disponible',
  noWebsite: 'Sitio web no disponible',
  loading: 'Buscando universidades enfocadas en ciencias…',
  loadingDetail: 'Obteniendo la información más reciente de Hipo Labs.',
  error: 'No pudimos cargar las universidades.',
  errorDetail: 'El servicio puede no estar disponible temporalmente. Revisa tu conexión e inténtalo de nuevo.',
  retry: 'Intentar de nuevo',
  empty: 'No se encontraron universidades',
  emptyDetail: 'El servicio no devolvió universidades que incluyan “ciencias” en su nombre.',
  refresh: 'Actualizar directorio',
  copyright: 'Copyright © 2024 EduGlobal Tech LLC. Todos los derechos reservados.',
  developedBy: 'Desarrollado por',
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly document = inject(DOCUMENT);
  private readonly currentLanguage = signal<Language>('en');
  readonly language = this.currentLanguage.asReadonly();
  readonly text = computed<Translations>(() => this.language() === 'en' ? ENGLISH : SPANISH);

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
    this.document.documentElement.lang = language;
  }
}
