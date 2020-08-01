
import { RANKBYREGION } from '../Util/Entity';
import { API } from './API';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { forkJoin, Observable, from, Subscriber } from 'rxjs';
import {  map, tap, delay } from 'rxjs/operators';
import { catchErrorJustReturn, flatAxiosResultAndCast } from './RxJsExtension';
import moxios from 'moxios';
import { listResultMockup, rankbyregionMockup } from '../Data/mockup';
import { Reactor } from 'jsreactorkit'




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
        // moxios.install(this.api);
        // moxios.stubRequest(new RegExp("([0-9]|[a-z]).*"), {
        //     status: 200,
        //     responseText: JSON.stringify(listResultMockup)
        //     // response: {
        //     //     data: listResultMockup
        //     // } 
        // })
        // this middleware is been called right before the http request is made.
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
                // map(this.success),
                delay(5000),
                // catchErrorReturnEmpty(),
                flatAxiosResultAndCast(),
                catchErrorJustReturn([] as RANKBYREGION[]),
            )   
        })
        
        return forkJoin(requests)
        
    }

}


/**
 *
 */