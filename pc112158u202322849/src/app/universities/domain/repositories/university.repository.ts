/**
 * @summary Repository port for searching universities without coupling the use case to HTTP.
 * @author Marlon Packard Viza Quispe
 */
import { Observable } from 'rxjs';
import { University } from '../models/university.entity';

export abstract class UniversityRepository {
  abstract findByName(name: string): Observable<readonly University[]>;
}
