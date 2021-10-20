import { combineLatest, Observable, OperatorFunction, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export function delayAtLeast<T>(dueTime?: number | Date): OperatorFunction<T, T> {
  return (source$: Observable<T>): Observable<T> => {
    return combineLatest([ timer(dueTime), source$ ]).pipe(
      map(x => x[1])
    );
  };
}
