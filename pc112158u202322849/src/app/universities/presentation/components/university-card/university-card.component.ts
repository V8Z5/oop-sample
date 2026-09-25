/**
 * @summary Presents university details, domain imagery, and safe external website links.
 * @author Marlon Packard Viza Quispe
 */
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { University } from '../../../domain/models/university.entity';
import { TranslationService } from '../../../../public/application/translation.service';

@Component({
  selector: 'app-university-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './university-card.component.html',
  styleUrl: './university-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniversityCardComponent {
  readonly university = input.required<University>();
  readonly i18n = inject(TranslationService);
  readonly logoFailed = signal(false);
  readonly primaryWebsite = computed(() => this.university().websites[0] ?? null);
  readonly logoUrl = computed(() => {
    const domain = this.university().domains[0];
    return domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128` : null;
  });
}
