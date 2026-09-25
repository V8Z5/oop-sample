/**
 * @summary Presents directory statistics and resilient loading, error, empty, and result views.
 * @author Marlon Packard Viza Quispe
 */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UniversityDirectoryService } from '../../../application/university-directory.service';
import { UniversityCardComponent } from '../university-card/university-card.component';
import { TranslationService } from '../../../../public/application/translation.service';

@Component({
  selector: 'app-university-list',
  imports: [MatButtonModule, MatProgressSpinnerModule, UniversityCardComponent],
  templateUrl: './university-list.component.html',
  styleUrl: './university-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniversityListComponent {
  readonly directory = inject(UniversityDirectoryService);
  readonly i18n = inject(TranslationService);
}
