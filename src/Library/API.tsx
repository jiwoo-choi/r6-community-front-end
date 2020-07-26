import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError, } from "axios";
import { Observable, from, Subscriber } from "rxjs";




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
        // let cancelToken = axios.CancelToken;
        // let source = cancelToken.source();
        //기존에 누가 요청했으면 그걸취소할것<div className="!"></div>
        return from(this.api.get<T,R>(url, config))
        //누군가 이걸 unsubscrbie한다면
        // return new Observable<R>( (observer) => {
        //     this.api.get<T,R>(url, config)
        //     .then( response => {
        //         observer.next(response)
        //         observer.complete()
        //     })
        //     .catch( err => {
        //         observer.error(err)
        //     }) //err.response
        // })
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

