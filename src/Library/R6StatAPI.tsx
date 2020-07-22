
import { GENERALAPI, BasicErrorFormat, RANKAPI, RANKBYREGION } from '../Util/Entity';
import { API } from './API';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { forkJoin, zip, concat, Observable, of } from 'rxjs';
import { retry, map, catchError, concatAll, switchMap } from 'rxjs/operators';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { catchErrorJustReturn, catchErrorReturnEmpty } from './RxJsExtension';





export class R6StatAPI extends API {


    static instance : R6StatAPI | null = null;

    static createInstance() {
        var object = new R6StatAPI();
        return object;
    }

    static get shared() {
        if (!R6StatAPI.instance) {
            R6StatAPI.instance = R6StatAPI.createInstance();
        }
        return R6StatAPI.instance;
    }

    static set abc(value: number) {
        this.abc = this.abc + 1;
    }

    static get abc(){
        return this.abc;
    }

    abc : number = 0;

    public constructor (config?: AxiosRequestConfig) {
        super(config);
        
        // // this middleware is been called right before the http request is made.
        // this.interceptors.request.use((param: AxiosRequestConfig) => ({
        //     ...param,
        // }));

        // // this middleware is been called right before the response is get it by the method that triggers the request
        // this.interceptors.response.use((param: AxiosResponse) => ({
        //     ...param
        // }));

        // this.userLogin = this.userLogin.bind(this);
        // this.userRegister = this.userRegister.bind(this);
        // this.getAllUsers = this.getAllUsers.bind(this);
        // this.getById = this.getById.bind(this);
    }


    public getGeneralAPI(id : string) {
        // const requests = ["uplay","psn","xbl"].map( (value)=>{
            // let url = "http://r6-search.me/api/v1/generalpvp/" + value + "/" + id
            
            // let a = this.get<GENERALAPI>(url)
            // .pipe(
            //     map( this.success ),
            //     catchError( (err : AxiosError<Error>) => {return err.response?.data as BasicErrorFormat})
            // )


            // // .pipe( 
            // //     map( this.success ),
            // //     catchError( (err) => { return err })
            // // )}
            // return a;
        // })

        const requests = ["uplay","psn","xbl"].map( (value) => {
            let url = "http://r6-search.me/api/v1/rank/" + value + "/" + id
            return this.get<RANKBYREGION[]>(url)
            .pipe(
                map(this.success),
                // catchErrorReturnEmpty(),
                catchErrorJustReturn([] as RANKBYREGION[])
            )   
        })
        
        return forkJoin(requests)
        
    }
}


/**
 *
 */