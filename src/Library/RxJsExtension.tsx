import { Observable, of, defer, MonoTypeOperatorFunction } from "rxjs";
import { catchError } from "rxjs/operators";


//        //catchEr
// function filterSuccessfulStatusCodes() {
//     return function<T extends AxiosResponse>(source: Observable<T>): Observable<T> {
//         return new Observable( subscriber => {
//             source.subscribe({
//                 next(value) {
//                     if ( value.status >= 200 && value.status <= 299 ) {
//                         subscriber.next(value);
//                     } else {
//                         subscriber.error()//New Error
//                     }
//                 }, 
//                 error(error) {
//                     subscriber.error(error);
//                 },
//                 complete() {
//                     subscriber.complete();
//                 }
//             })
//         })
//     }
// }
//        //catchErrorNil
 
// Rx Mapper.



export function catchErrorJustReturn<T>(returnedValue: T): MonoTypeOperatorFunction<T> {
    return catchError( err => {
        return of(returnedValue as T)
    })
    // return catchError( err => {
    //     return of(returnedValue as T)
    // })

    // return function(source: Observable<T>): Observable<T>{
    //     return defer( () => { return new Observable<T>( subscriber => {
    //         console.log("Hey")
    //         source.subscribe({
    //             next(value) {
    //                 subscriber.next(value)
    //             }, 
    //             error(error) {
    //                 console.log(error);
    //                 subscriber.next(returnedValue);
    //             },
    //             complete() {
    //                 subscriber.complete();
    //             }
    //         })
    //     })}
    //     )
    // }
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
