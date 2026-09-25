/**
 * @summary Renders the translated copyright and developer attribution.
 * @author Marlon Packard Viza Quispe
 */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DEVELOPER } from '../../../application/developer.config';
import { TranslationService } from '../../../application/translation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly developer = DEVELOPER;
  readonly i18n = inject(TranslationService);
}
