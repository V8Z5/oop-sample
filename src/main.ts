/**
 * @summary Bootstraps the standalone UniversityFinder application.
 * @author Marlon Packard Viza Quispe
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => console.error(error));
