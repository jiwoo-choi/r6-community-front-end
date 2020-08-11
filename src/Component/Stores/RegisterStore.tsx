import RootStore from "./RootStore";
import RootStoreP from "./RootStoreP";
import { observable, action } from "mobx";
import R6Ajax from "../../Library/R6Ajax";

export default class RegisterStore extends RootStoreP<RootStore> {
    @observable idError: boolean = false;
    @observable pwdError: boolean = false;
    @observable pwd2Error: boolean = false;
    @observable emailError: boolean = false;
    @observable isError : boolean = false;
    @observable isLoading: boolean = false;
    @observable isConfirmation : boolean = false;
    @observable errorMessage : string = "";

    private tester = new RegExp(`([A-Z]|[a-z]|[0-9]){1,}\@([A-Z]|[a-z]|[0-9]){1,}\.([A-Z]|[a-z]){1,}`);

    private MessageSet1 = {
        messageHeader:"아이디 오류",
        messageDesc:"아이디를 입력해주세요."
    }
    
    private MessageSet2 = {
        messageHeader:"비밀번호 오류",
        messageDesc:"비밀번호를 확인해주세요."
    }
    
    private MessageSet3 = {
        messageHeader:"비밀번호 오류",
        messageDesc:"비밀번호가 일치하지 않습니다."
    }
    
    private MessageSet4 = {
        messageHeader:"이메일 오류",
        messageDesc:"정상적인 이메일 포맷이 아닙니다."
    }

    @action
    registerRequest(id: string, pwd: string, pwd2: string, email: string) {

        this.isError = false;
        this.idError = false;
        this.pwdError = false;
        this.pwdError = false;
        this.emailError = false;
        this.isLoading = false;

        if (id === "") {
            this.isError = true;
            this.idError = true;
            this.errorMessage = this.MessageSet1.messageDesc
            return;
        }
 
        if (pwd === "") {
            this.isError = true;
            this.pwdError = true;
            this.errorMessage = this.MessageSet2.messageDesc
            return;
        }

        if (pwd !== pwd2) {
            this.isError = true;
            this.pwdError = true;
            this.pwd2Error = true;
            this.errorMessage = this.MessageSet3.messageDesc
            return;
        }

        if (!this.tester.test(email)){
            this.isError = true;
            this.emailError = true;
            this.errorMessage = this.MessageSet4.messageDesc
            return;
        }


        this.isLoading = true;
        
        R6Ajax.shared.post('signup', { password : pwd, username: id, email: email }, "json")
        .subscribe(
            res => {
                this.isError = false;
                this.isLoading = false;
                this.isConfirmation = true;
            },
            err => {
                this.isError = true;
                this.isLoading = false;
                this.errorMessage = err.response.message
            }
        )
    }
}