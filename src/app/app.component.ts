/**
 * @summary Composes the application shell without routing or a sidebar.
 * @author Marlon Packard Viza Quispe
 */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToolbarComponent } from './public/presentation/components/toolbar/toolbar.component';
import { FooterComponent } from './public/presentation/components/footer/footer.component';
import { UniversityListComponent } from './universities/presentation/components/university-list/university-list.component';
import { TranslationService } from './public/application/translation.service';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, FooterComponent, UniversityListComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly i18n = inject(TranslationService);
}
