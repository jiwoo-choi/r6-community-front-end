
import { observable, action } from 'mobx';
import RootStore from './RootStore';
import RootStoreP from './RootStoreP';
import { ListElementType, ListType, Meta } from '../../Util/Entity';
import R6Ajax from '../../Library/R6Ajax';

export type Topic = "tips"| "free" | "together"| "clan"

/**
 * 현재 사용자가 보고있는 게시판의 상태에 대한 상태 저장소.
 */
export default class ForumStore extends RootStoreP<RootStore>{


    queue? : Function;
    queueArgs : any[] = [];

    @observable meta : Meta = { currentPage : 0, totalPage : 0 }; 
    /** 현재 페이지 */
    @observable page : number = 1;
    /** 현재 게시판 주제 */
    @observable topic : Topic = "free"
    /** 현재 게시판 주제에 따른 List */
    @observable list : ListElementType[] = [];
    /** 현재 보고있는 Post Id */
    postId : number = 0;

    /** 로딩중인가? */
    @observable isLoading : boolean = false;
    /** 에러가 나왔는가? */
    @observable isError : boolean = false;
    /** 현재 에러의 메세지 */
    @observable errorMessage: string = "";

    /** 로그인 되었는가? */
    @observable isLogined : boolean = false;
    /** 닉네임 : 로그인완료시에만 노출 */
    @observable nickName : string = "";

    /** 로그인 창 open */
    @observable isLoginModalOpened : boolean = false;

    /** 현재 Topic으로 리스트 받아오기 */
    @action
    getList(topic?: Topic, page: number = 1){

        let topicQueue : Topic = "free";

        if (!topic) {
            let regexp = new RegExp(`\/[a-z]{1,}|\/`);
            let pathname = this.root.router.location.pathname;
            let progressed = regexp.exec(pathname);
            let excuted = progressed ? progressed[0] : "/null";
    
            if (pathname === "/") {
                this.topic = "free";
            } else if ( !["free", "clan", "together", "tips"].includes(excuted.substr(1))) {
                this.root.router.push('/404/error')
            } else {
                topicQueue = excuted.substr(1) as Topic
            }    
        } else {
             topicQueue = topic;
        }
        // const splittedPathname = this.root.router.location.pathname.split('/');
        // if (splittedPathname.length === 4) {
        //     if (splittedPathname[2] === "post") {
        //         ForumStateInitialState.postId = parseInt(splittedPathname[3]);
        //     }
        // }

        this.isLoading = true;
        this.topic = topicQueue;
        this.root.router.push(`/${topicQueue}?page=${page}`)
        //page

        R6Ajax.shared.getJson<ListType>(`topic/${topicQueue}?page=${page}`)
        .pipe(
        ).subscribe(
            res => {
                this.meta = res.meta
                this.page = page;
                this.list = res.postList;
                this.isLoading = false;
            },
            
            err => {
                this.isError = true
                this.isLoading = false
            }
        )
    }

    @action
    openLoginModal(open: boolean){
        this.isLoginModalOpened = open;
    }

    /** 에디터 페이지로 이동 */
    @action
    goEditor(){
        if (this.isLogined) {
            let regexp = new RegExp(`\/[a-z]{1,}|\/`);
            let pathname = this.root.router.location.pathname;
            let progressed = regexp.exec(pathname);
            let excuted = progressed ? progressed[0] : "/null";
            if (excuted === "/") {
                excuted = "/free"
            }
            this.root.router.history.push(`${excuted}/editor`)
        } else {
            this.queue = this.goEditor.bind(this);
            this.openLoginModal(true);
        }
    }

    /** 포스트 페이지로 이동 */
    @action
    goPost(postId: number){
        let pathname = this.root.router.location.pathname === "/" ? "/free" : this.root.router.location.pathname;
        this.root.router.history.push(`${pathname}/post/${postId}`)
    }
}
