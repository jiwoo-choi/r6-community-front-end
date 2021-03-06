import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";



export default class R6Ajax {

    static instance : R6Ajax | null = null;
    
    static createInstance() {
        var object = new R6Ajax();
        return object;
    }

    static get shared() {
        if (!R6Ajax.instance) {
            R6Ajax.instance = R6Ajax.createInstance();
        }
        return R6Ajax.instance;
    }

    accessToken? : string;
    baseUrl = "https://r6-search.me"
    baseURLWithAPIVersion = this.baseUrl + "/api/c/" 

    id?: string;
    pwd?: string;

    /**
     * 세가지경우.
     * id, pwd가 메모리에 있는경우.
     * id, pwd가 메모리에 없는 경우. accessToken
     * accessToken이 없는경우, refresh Token 요청.
     */

    signIn(id: string, pwd: string) : Observable<string> {
        const {href} = new URL(`signin`, this.baseURLWithAPIVersion);
        return ajax.post(href, { password : pwd, username: id }, {
            "Content-Type": "application/json"
        }).pipe( map( value => {
            this.id = id;
            this.pwd = pwd;
            this.accessToken = value.response.jwtToken;
            return value.response.jwtToken
        }))
    }

    /** updateAccessToken */

    updateAccessToken(id: string, pwd: string): Observable<string>{
        //refreshtoke으로 다시요청한다. (id, pwd는 저장하지않는다...)
        const {href} = new URL(`/signin`, this.baseUrl);
        return ajax.post(href, { password : pwd, username: id }, {
            "Content-Type": "application/json"
        }).pipe( map( value => value.response.jwtToken ))
    }


    /** Wrapper */
    post(url: string, body? : any | HTMLFormElement, headers?:Object | "json" | "multipart", withAccessToken: boolean = false) : Observable<AjaxResponse> {
        const {href} = new URL(url, this.baseURLWithAPIVersion);
        //accessToken
        //image to binary file => 
        return ajax.post(href, body, this.getHeader(headers, withAccessToken))
        // if there is no accesstoken -> do update call..
        //access -> update JSON.
        // try to access -> 403 fail -> access token update...
    }

    delete(url: string, headers?:Object | "json" | "multipart", withAccessToken: boolean = false) : Observable<AjaxResponse> {
        const {href} = new URL(url, this.baseURLWithAPIVersion);
        return ajax.delete(href, this.getHeader(headers, withAccessToken))
    }

    put(url: string, body? : any | HTMLFormElement, headers?:Object | "json" | "multipart", withAccessToken: boolean = false) : Observable<AjaxResponse> {
        const {href} = new URL(url, this.baseURLWithAPIVersion);
        return ajax.put(href, body, this.getHeader(headers,withAccessToken))
    }

    getJson<T>(url: string, headers?: Object | "json" | "multipart", withAccessToken: boolean = false) : Observable<T> {
        const {href} = new URL(url, this.baseURLWithAPIVersion);
        return ajax.getJSON(href, this.getHeader(headers, withAccessToken))
    }

    imagePost(blob:Blob) {
        const {href} = new URL('image', this.baseURLWithAPIVersion);
        return ajax.post(href, {imageFiles: [blob]} , this.getHeader(undefined,true))
    }


    // Helper
    getHeader(headers: Object | "json" | "multipart" | undefined , withAccessToken: boolean) {
        let header = {} as any;
        switch( headers ){
            case "json":
                header = {"Content-Type": "application/json"}
                break;
            case "multipart":
                // header = {"Content-Type": "multipart/form-data"}
                break;
            default:
                if (headers) {
                } else {
                    header = headers
                }
        }
        
        if (this.accessToken && withAccessToken) {
            header["Authorization"] = `Bearer ${this.accessToken}`
            return header
        } else {
            return header
        }
    }



}