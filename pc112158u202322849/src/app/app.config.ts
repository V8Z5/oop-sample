/**
 * @summary Configures HTTP, zoneless rendering, and the repository dependency.
 * @author Marlon Packard Viza Quispe
 */
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { UniversityRepository } from './universities/domain/repositories/university.repository';
import { UniversityApiRepository } from './universities/infrastructure/repositories/university-api.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    { provide: UniversityRepository, useClass: UniversityApiRepository },
  ],
};
