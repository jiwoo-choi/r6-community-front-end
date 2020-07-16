import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError, } from "axios";
import { Observable, zip, forkJoin, of } from "rxjs";
import { RANKAPI } from "../Util/Entity";
import { take, tap } from "rxjs/operators";



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

export function tapOnce<T>(fn: (value:any)=> void) {
    return function(source: Observable<T>) {
        source
            .pipe(
                take(1),
                tap(value => fn(value))
            )
            .subscribe();

        return source;
    };
}


export function filterNull<T>(justReturn:T) {
    return function(source: Observable<T>): Observable<T>{
        return new Observable( subscriber => {
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
export class API {

    [x:string]: any;

    api!: AxiosInstance

    public constructor (config?: AxiosRequestConfig, baseUrl : string = "http://r6-search.me/api/v1") {

        this.api = axios.create(config);
        
        this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
            baseUrl: baseUrl,
            ...param
        }));

        this.getUri = this.getUri.bind(this);
        this.get = this.get.bind(this);
        this.delete = this.delete.bind(this);
        this.post = this.post.bind(this);
    }

    public success<T> (response: AxiosResponse<T>): T {
        return response.data;
    }

    public error (error: AxiosError<Error>) {
        throw error;
    }


    public getUri (config?: AxiosRequestConfig): string {
        return this.api.getUri(config);
    }


    public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) : Observable<R> {
        return new Observable<R>( (observer) => {
            this.api.get<T,R>(url, config)
            .then( response => {
                observer.next(response)
                observer.complete()
            })
            .catch( err => {
                observer.error(err)
            }) //err.response
        })
    }

    public delete<T, R = AxiosResponse<T>> (url: string, config?: AxiosRequestConfig): Observable<R> {
        return new Observable<R>( (observer) => {
            this.api.delete<T, R>(url, config)
            .then( response => {
                observer.next(response)
                observer.complete()
            })
            .catch( err => {
                observer.error(err)
            })
        })
    }


    public post<T, B, R = AxiosResponse<T>> (url: string, data?: B, config?: AxiosRequestConfig): Observable<R> {

        return new Observable<R>( (observer) => {
            this.api.post<T,R>(url, data, config)
            .then( response => {
                observer.next(response)
                observer.complete()
            })
            .catch( err => {
                observer.error(err)
            })
        })

    }


}

