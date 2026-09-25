/**
 * @summary Coordinates the science-university use case and exposes reactive loading, success, and error states.
 * @author Marlon Packard Viza Quispe
 */
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, concat, map, of, startWith, Subject, switchMap } from 'rxjs';
import { University } from '../domain/models/university.entity';
import { UniversityRepository } from '../domain/repositories/university.repository';

type DirectoryState =
  | { status: 'loading'; universities: readonly University[] }
  | { status: 'success'; universities: readonly University[] }
  | { status: 'error'; universities: readonly University[] };

@Injectable({ providedIn: 'root' })
export class UniversityDirectoryService {
  private readonly repository = inject(UniversityRepository);
  private readonly refreshRequests = new Subject<void>();
  private readonly loadingState: DirectoryState = { status: 'loading', universities: [] };

  readonly state = toSignal(this.refreshRequests.pipe(
    startWith(undefined),
    switchMap(() => concat(
      of(this.loadingState),
      this.repository.findByName('ciencias').pipe(
        map((universities): DirectoryState => ({
          status: 'success',
          universities: universities
            .filter((university) => university.name.toLocaleLowerCase().includes('ciencias'))
            .sort((first, second) => first.name.localeCompare(second.name)),
        })),
        catchError(() => of<DirectoryState>({ status: 'error', universities: [] })),
      ),
    )),
  ), { initialValue: this.loadingState });

  readonly countriesCount = computed(() => new Set(this.state().universities
    .map((university) => university.country).filter(Boolean)).size);

  reload(): void {
    this.refreshRequests.next();
  }
}
