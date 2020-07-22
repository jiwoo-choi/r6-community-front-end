import { Observable, of, empty , MonoTypeOperatorFunction, OperatorFunction, fromEvent, ObservableInput } from "rxjs";
import { catchError, switchMap, map, distinctUntilChanged, takeUntil, filter } from "rxjs/operators";
import { AxiosResponse } from "axios";
import { createRef } from "react";
import _ from 'lodash'

export function catchErrorJustReturn<T>(value: T): MonoTypeOperatorFunction<T> {
    return catchError( err => of(value) )
}


export function catchErrorReturnEmpty<T>() {
    return catchError( err => empty() )
}


export function flatAxiosResultAndCast<T>() : OperatorFunction<AxiosResponse<T>,T> {
    return function(source: Observable<AxiosResponse<T>>) {
        return source.pipe( 
            map( (value : AxiosResponse<T>) => {
                return value.data
            })
        )
    }
}

export function deepDistinctUntilChanged() {
    return distinctUntilChanged(_.isEqual)
}



export function distinctUntilActionChanged<T>( target: Observable<any>, source: any ) : MonoTypeOperatorFunction<T> {
    return takeUntil( target.pipe( filter ( res => _.isEqual(res,source))))
}


//array
//object
//if it is array
//if it is object.


//liveSearch는??
//switchMap은 rkqtd
//
// export function fromEvent2( ref : React.RefObject<HTMLElement>,  eventName: string) {
//     return fromEvent( ref.current.el , eventName)
// }
//여기서 subscribe //이벤트에서 들어온걸 구독가능합니다.
//이벤트에서 들어온걸 구독할 숭 ㅣㅆ죠ㅣ.



// export function Axoisjson<T, R = AxiosResponse<T>>() : OperatorFunction<T, R>{
//     return input$ => input$.pipe( 
//         map( (value: AxiosResponse<T>) => value.data ),
//         //if something is not..?
//         //catchError?
//     )
//     //catch Error.
//     /*
//     return function(source: Observable<T>) {
//         return map( (source:any) => { 
//             return source.data
//         })
//     }*/
// }

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