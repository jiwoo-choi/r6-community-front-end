import { Reactor } from "reactivex-redux"
import { Observable, concat, of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { map, catchError } from "rxjs/operators"

const LOGIN = "LOGIN"
const GOTOREGISTER = "GOTOREGISTER"

interface LOGIN {
    type : typeof LOGIN,
    id : string,
    pwd: string,
}

interface GOTOREGISTER {
    type: typeof GOTOREGISTER
}

export type LoginAction = LOGIN | GOTOREGISTER


const LOGINCHECKLOADING = "LOGINCHECKLOADING"
const LOGINSUCCESS = "LOGINSUCCESS"
const LOGINFAILURE = "LOGINFAILURE"
const GOTO = "GOTO"

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

interface GOTO {
    type : typeof GOTO,
}


type LoginMutation = LOGINCHECKLOADING | LOGINSUCCESS | LOGINFAILURE | GOTO


export interface LoginState {
    isLoading: boolean,
    isError:boolean,
    isSuccess: boolean,
    goto: boolean,
    message:string,
}

export const LoginInitialState : LoginState = {
    isLoading : false,
    isError: false,
    isSuccess : false,
    goto: false,
    message:"",
}

export default class LoginReactor extends Reactor<LoginAction, LoginState, LoginMutation> {

    mutate(action: LoginAction): Observable<LoginMutation> {

        switch(action.type) {
            case "GOTOREGISTER":
                return of<LoginMutation>({type:"GOTO"})
                
            case "LOGIN":

                if (action.id === "" || action.pwd === "") {
                    return of<LoginMutation>({type:"LOGINFAILURE", message: "아이디 & 패스워드를 입력해주세요."})
                }

                return concat( 
                    of<LoginMutation>({type:"LOGINCHECKLOADING"}),
                    this.login(action.id, action.pwd)
                )
        }
    }

    reduce(state: LoginState, mutation: LoginMutation): LoginState {

        let newState = {...this.initialState};

        switch(mutation.type) {
            case "GOTO":
                newState.goto = true;
                return newState;

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
        }
    }
    
    login(id : string, pwd: string){
        return ajax.post(`http://www.r6-search.me/api/c/signin`, { password : pwd, username: id }, {
            "Content-Type": "application/json"
        }).pipe( 
            map( value => ({type: "LOGINSUCCESS"} as LoginMutation)),
            catchError( err =>{
                return of<LoginMutation>({type:"LOGINFAILURE", message: err.response.message})
            } )
        )
    }
}

