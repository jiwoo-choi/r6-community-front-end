import { Reactor } from "reactivex-redux"
import { Observable, concat, of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { map, catchError } from "rxjs/operators"

const LOGIN = "LOGIN"
const CLOSELOGIN = "CLOSELOGIN"


interface LOGIN {
    type : typeof LOGIN,
    id : string,
    pwd: string,
}

interface CLOSELOGIN {
    type : typeof CLOSELOGIN,
}

export type LoginAction = LOGIN | CLOSELOGIN 


const LOGINCHECKLOADING = "LOGINCHECKLOADING"
const LOGINSUCCESS = "LOGINSUCCESS"
const LOGINFAILURE = "LOGINFAILURE"
const CLOSE = "CLOSE"


interface LOGINCHECKLOADING {
    type : typeof LOGINCHECKLOADING,
}

interface LOGINSUCCESS {
    type : typeof LOGINSUCCESS,
}

interface LOGINFAILURE {
    type : typeof LOGINFAILURE,
    message: string
}

interface CLOSE {
    type : typeof CLOSE,
}

type LoginMutation = LOGINCHECKLOADING | LOGINSUCCESS | LOGINFAILURE | CLOSE

export interface LoginState {
    isLoading: boolean,
    isError:boolean,
    isSuccess: boolean,
    message:string,
}

export const LoginInitialState : LoginState = {
    isLoading : false,
    isError: false,
    isSuccess : false,
    message:"",
}

export default class LoginReactor extends Reactor<LoginAction, LoginState, LoginMutation> {

    mutate(action: LoginAction): Observable<LoginMutation> {

        switch(action.type) {

            case "LOGIN":

                if (action.id === "" || action.pwd === "") {
                    return of<LoginMutation>({type:"LOGINFAILURE", message: "아이디 & 패스워드를 입력해주세요."})
                }

                return concat( 
                    of<LoginMutation>({type:"LOGINCHECKLOADING"}),
                    this.login(action.id, action.pwd)
                )

            case "CLOSELOGIN":
                return of({type:"CLOSE"})
        }
    }

    reduce(state: LoginState, mutation: LoginMutation): LoginState {

        let newState = {...this.initialState};

        switch(mutation.type) {

            case "LOGINCHECKLOADING":
                newState.isLoading = true;
                return newState;

            case "LOGINFAILURE":
                newState.message = mutation.message;
                newState.isError = true;
                return newState;

            case "LOGINSUCCESS" :
                newState.isSuccess = true;
                return newState;

            case "CLOSE":
                return newState;
        }
    }
    
    login(id : string, pwd: string){
        return ajax.post(`https://www.r6-search.me/api/c/signin`, { password : pwd, username: id }, {
            "Content-Type": "application/json"
        }).pipe( 
            map( value => ({type: "LOGINSUCCESS"} as LoginMutation)),
            catchError( err =>{
                return of<LoginMutation>({type:"LOGINFAILURE", message: err.response.message})
            } )
        )
    }
}

