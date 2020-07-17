import { Observable, of, empty } from "rxjs";
import { catchError } from "rxjs/operators";

export function catchErrorJustReturn<T>(value: T) {
    return catchError( err => empty() )
}

export function filterNull<T>(justReturn:T) {
    return function(source: Observable<T>): Observable<T>{
        return new Observable<T>( subscriber => {
            source.subscribe({
                next(value) {
                    if (value) {
                        subscriber.next(value)
                    } else {
                        subscriber.next(justReturn)
                    }
                }, 
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                }
            })
        })
    }
}