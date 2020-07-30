
import {Reactor} from 'reactivex-redux'
import { Observable, of, concat } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, catchError } from 'rxjs/operators'

const SUBMIT = "SUBMIT" 

interface SUBMIT {
    type : typeof SUBMIT,
    id : string,
    pwd: string,
    pwd2: string,
    email: string,
}

export type RegisterAction = SUBMIT

const IDERROR = "IDERROR"
const PWDERROR = "PWDERROR"
const PWD2ERROR = "PWD2ERROR"
const EMAILERROR = "EMAILERROR"
const VALIDATEDPASS = "VALIDATEDPASS"
const SUCCESS = "SUCCESS"
const REGISTERERROR = "REGISTERERROR"

interface IDERROR {
    type: typeof IDERROR
    messageHeader:string;
    messageDesc: string;
}

interface PWDERROR {
    type: typeof PWDERROR
    messageHeader:string;
    messageDesc: string;
}

interface PWD2ERROR {
    type: typeof PWD2ERROR
    messageHeader:string;
    messageDesc: string;
}

interface EMAILERROR {
    type: typeof EMAILERROR
    messageHeader:string;
    messageDesc: string;
}
interface VALIDATEDPASS {
    type: typeof VALIDATEDPASS
}

interface SUCCESS {
    type: typeof SUCCESS
}

interface REGISTERERROR {
    type : typeof REGISTERERROR
    messageHeader:string;
    messageDesc: string;
}

export type RegisterMutation = IDERROR | PWDERROR | PWD2ERROR | EMAILERROR | VALIDATEDPASS | SUCCESS | REGISTERERROR

export const RegisterInitialState : RegisterState = {
     isError : false,
     isIdError: false,
     isPwd2Error: false,
     isPwdError: false,
     isEmailError: false,
     isValidated:false,
     isSuccess: false,
     messageHeader:"",
     messageDesc:""
}

export interface RegisterState {
    isError: boolean;
    isIdError:boolean;
    isPwdError:boolean;
    isPwd2Error:boolean;
    isEmailError:boolean;
    isValidated:boolean;
    isSuccess:boolean;
    messageHeader:string;
    messageDesc:string;
}

const MessageSet1 = {
    messageHeader:"아이디 오류",
    messageDesc:"아이디를 입력해주세요."
}

const MessageSet2 = {
    messageHeader:"비밀번호 오류",
    messageDesc:"비밀번호를 확인해주세요."
}

const MessageSet3 = {
    messageHeader:"비밀번호 오류",
    messageDesc:"비밀번호가 일치하지 않습니다."
}

const MessageSet4 = {
    messageHeader:"이메일 오류",
    messageDesc:"정상적인 이메일 포맷이 아닙니다."
}

const tester = new RegExp(`([A-Z]|[a-z]|[0-9]){1,}\@([A-Z]|[a-z]|[0-9]){1,}\.([A-Z]|[a-z]){1,}`);

export default class R6RegisterReactor extends Reactor<RegisterAction, RegisterState, RegisterMutation> {


    mutate(action: SUBMIT): Observable<RegisterMutation> {
        switch(action.type) {
            case "SUBMIT":
                if (!action.id) {
                    return of<RegisterMutation>({type:"IDERROR", ...MessageSet1})
                }

                if (!action.pwd) {
                    return of<RegisterMutation>({type:"PWDERROR", ...MessageSet2})
                }

                if (action.pwd !== action.pwd2) {
                    return of<RegisterMutation>({type:"PWD2ERROR", ...MessageSet3})
                }

                if (!tester.test(action.email)) {
                    return of<RegisterMutation>({type:"EMAILERROR", ...MessageSet4})
                }

                return concat( 
                    of<RegisterMutation>({type:"VALIDATEDPASS"}),
                    this.registerRequest(action.id, action.pwd, action.pwd2, action.email)
                    // of<RegisterMutation>({type:"REGISTERERROR", messageDesc : "아이디 중복", messageHeader:"아이디가 중복되었습니다. 아이디를 변경해주세요"}),
                    // //if this is pass, send them pass here.
                    // this.registerRequest(action.id, action.pwd)
                )
               
        }
    }

    reduce(state: RegisterState, mutation: RegisterMutation): RegisterState {
        let newState = state

        newState = {...this.initialState}

        switch(mutation.type){
            case "IDERROR":
                newState.isError = true;
                newState.isIdError = true;
                newState.messageDesc = mutation.messageDesc;
                newState.messageHeader = mutation.messageDesc;
                return newState;
            case "PWDERROR":
                newState.isError = true;
                newState.isPwdError = true;
                newState.messageDesc = mutation.messageDesc;
                newState.messageHeader = mutation.messageDesc;
                return newState;
            case "PWD2ERROR":
                newState.isError = true;
                newState.isPwdError = true;
                newState.isPwd2Error = true;
                newState.messageDesc = mutation.messageDesc;
                newState.messageHeader = mutation.messageDesc;
                return newState;
            case "EMAILERROR":
                newState.isError = true;
                newState.isEmailError = true;
                newState.messageDesc = mutation.messageDesc;
                newState.messageHeader = mutation.messageDesc;
                return newState;

            case "VALIDATEDPASS" :
                newState.isError = false;
                newState.isValidated = true;
                return newState;

            case "REGISTERERROR":
                newState.isError = true;
                newState.messageDesc = mutation.messageDesc;
                newState.messageHeader = mutation.messageHeader;
                return newState;

            case "SUCCESS":
                newState.isSuccess = true;
                return newState;
        }
    }

    registerRequest(id: string, pwd: string, pwd2: string, email: string) : Observable<RegisterMutation> {

       return ajax.post('http://www.r6-search.me/api/c/signup', { password : pwd, username: id, password2: pwd2, email: email}, {
        "Content-Type": "application/json"
       }).pipe(
            map( value => ({type: "SUCCESS"} as RegisterMutation)),
            catchError( err =>{
                return of<RegisterMutation>({type:"REGISTERERROR", messageHeader: "서버쪽 오류", messageDesc: "서버에서 오류가 있었습니다."})
            } )
        )
    }


    

}
