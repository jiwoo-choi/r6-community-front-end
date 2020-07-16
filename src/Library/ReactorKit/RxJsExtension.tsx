import { Observable } from "rxjs";

export function catchErrorJustReturn<T>(value: T) {
    return function(source: Observable<T>): Observable<T>{
        return new Observable( subscriber => {
            source.subscribe({
                next(value) {
                    subscriber.next(value)
                }, 
                error(error) {
                    subscriber.next(value);
                },
                complete() {
                    subscriber.complete();
                }
            })
        })
    }
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