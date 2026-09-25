/**
 * @summary Implements the university repository using Angular HttpClient and a same-origin proxy.
 * @author Marlon Packard Viza Quispe
 */
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
import { University } from '../../domain/models/university.entity';
import { UniversityRepository } from '../../domain/repositories/university.repository';
import { UniversityMapper } from '../mappers/university.mapper';

@Injectable()
export class UniversityApiRepository extends UniversityRepository {
  private readonly http = inject(HttpClient);

  override findByName(name: string): Observable<readonly University[]> {
    return this.http.get<unknown>('/api/universities/search', { params: { name } }).pipe(
      timeout(25000),
      map((response) => UniversityMapper.fromResponse(response)),
    );
  }
}
