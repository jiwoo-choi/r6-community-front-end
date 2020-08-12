import RootStore from "./RootStore";
import RootStoreP from "./RootStoreP";
import { observable, action } from "mobx";
import R6Ajax from "../../Library/R6Ajax";

export default class LoginStore extends RootStoreP<RootStore>{

    @observable isLoginError: boolean = false;
    @observable errorMessage: string = "";
    @observable isLoginLoading: boolean = false;

    @action
    login(id : string, pwd: string) {

        if (id === "" || pwd === "") {
            this.isLoginError = true;
            this.errorMessage = "아이디 혹은 패스워드를 입력해주세요"
            return;

        } else {

            this.isLoginLoading = true;
            R6Ajax.shared.signIn(id, pwd)
            .subscribe(
                res=> {
                    const queue = this.root.forum.queue;
                    this.root.forum.isLoginModalOpened = false;
                    this.root.forum.isLogined = true;    
                    this.root.forum.nickName = id;

                    if (queue) {
                        queue();
                        this.root.forum.queue = undefined;    
                    } 
                },
                err => {
                    this.isLoginLoading = false;
                    this.isLoginError = true;
                    this.errorMessage = err.response.message
                    
                }
            )
        }
    }

    @action
    resetState(){
        this.isLoginError = false;
        this.errorMessage = "";
        this.isLoginLoading = false;
    }

    @action
    gotoRegister(){
        this.root.router.push('/register');
    }
}
