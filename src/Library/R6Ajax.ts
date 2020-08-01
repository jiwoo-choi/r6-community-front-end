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
    baseUrl = "http://r6-search.me"
    baseURLWithAPIVersion = this.baseUrl + "/api/c/" 

    id?: string;
    pwd?: string;

    signIn(id: string, pwd: string) {
        const {href} = new URL(`/signin`, this.baseURLWithAPIVersion);
        //if it is failed?
        //catchError? how?
        return ajax.post(href, { password : pwd, username: id }, {
            "Content-Type": "application/json"
        }).pipe( map( value => {
            this.id = id;
            this.pwd = pwd;
            this.accessToken = value.response.jwtToken;
            return value.response.jwtToken
        }))
    }

    post(url: string, body? : any, headers?: Object | "json" | "accessToken") : Observable<AjaxResponse> {
        const {href} = new URL(url, this.baseURLWithAPIVersion);
        //accessToken
        console.log("abc")
        return ajax.post(href, body, this.getHeader(headers))
        // if there is no accesstoken -> do update call..
        //access -> update JSON.
        // try to access -> 403 fail -> access token update...
    }

    getJson<T>(url: string, headers?: Object | "json" | "accessToken"): Observable<T> {
        const {href} = new URL(url, this.baseUrl);
        return ajax.getJSON(href, this.getHeader(headers))
    }

    
    getJsonWithAuthorization<T>(url: string, headers: Object ){
        // return ajax.getJSON<T>()
        // if this is not valid try to update access token.
    }

    getAccessToken(id: string, pwd: string): Observable<string>{
        const {href} = new URL(`/signin`, this.baseUrl);
        return ajax.post(href, { password : pwd, username: id }, {
            "Content-Type": "application/json"
        }).pipe( map( value => value.response.jwtToken ))
    }

    //updateAccesToken

    getHeader(headers?: Object | "json" | "accessToken") {
        if (this.accessToken) {
            return {"Authorization" : `Bearer ${this.accessToken}`, "Content-Type": "application/json"}
        } else {
            return {"Content-Type": "application/json"}
        }
    }

}