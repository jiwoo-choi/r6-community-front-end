
import { observable, action, computed, toJS } from 'mobx';
import RootStore from './RootStore';
import RootStoreP from './RootStoreP';
import { ListElementType, ListType, Meta } from '../../Util/Entity';
import R6Ajax from '../../Library/R6Ajax';

export type Topic = "tips"| "free" | "together"| "clan"
export type Mode =  'edit' | 'list' | 'post' | 'write' | 'error'

/** 현재 쿼리 상태 정보 (라우팅 상태) */
export type QueryState = {
    /** 현재 보고있는 뷰 모드 */
    mode :  Mode;
    /** 현재 보고있는 PostID */
    postId : number;
    /** 현재 저장되어있는 작업 큐  */
    // queue?: 'GOEDITOR' | 'REPLYCOMMENT' | 'RECOMMEND' | 'WRTIE';
    /** 현재 열려있는 토픽  */
    topic: Topic;
    /** 현재 페이지 */
    page: number;
}

/**
 * 전체 게시판의 상태에 대한 상태 저장소.
 */
export default class ForumStore extends RootStoreP<RootStore>{

    /** Meta 정보 (페이지 수) */
    @observable meta : Meta = { currentPage : 0, totalPage : 0 }; 
    /** 현재 게시판 주제에 따른 List */
    @observable list : ListElementType[] = [];

    /** 로딩중인가? */
    @observable isLoading : boolean = false;
    /** httpRequest중 에러가 나왔는가? */
    @observable isError : boolean = false;
    /** 현재 에러의 메세지 */
    @observable errorMessage: string = "";

    /** 로그인 되었는가? */
    @observable isLogined : boolean = false;
    /** 닉네임 : 로그인완료시에만 노출 */
    @observable nickName : string = "";

    /** 로그인 창 open 여부 */
    @observable isLoginModalOpened : boolean = false;

    /** 현재 창 모드 */
    @observable mode : Mode = "list"
    /** 현재 페이지 */
    @observable page : number = 1;
    /** 현재 게시판 주제 */
    @observable topic : Topic = "free"
    /** 현재 postID */
    @observable postId : number = 0;


    @computed get getQuery() : QueryState {
        const mode = this.mode
        const page = this.page
        const topic = this.topic
        const postId = this.postId
        return { mode, page, topic, postId }
    }

    @action setQuery(query: QueryState){
        this.mode = query.mode
        this.page = query.page
        this.topic = query.topic
        this.postId = query.postId
    }
    /** "최초" 접속시 Url을  */
    @action
    init(){
        /** 만약 currentQuery */

        /** topic을 읽어야함 모든 게시판엔 topic 정보가 있음 */
        const pathname = this.root.router.location.pathname;

        // 의미있는 단위만 포함한다. (정규식으로 읽는가?)
        const splited : string[] = pathname.split("/")
        const validated = splited.reduce( (prev, curr) => {
            if (curr) { 
                prev.push(curr)
            }
            return prev;
        }, [] as string[])
        
        if (validated.length === 0) {
            this.topic = "free"
        } else {
            if (["free", "clan", "together", "tips"].includes(validated[0])){
                this.topic = validated[0] as Topic
            } else {
                // this url is not valid.
                this.mode = 'error';
                this.root.router.push('/error/404')
                return;
            }
        }
        
        if (validated.length > 1) {

            if (["list", "post", "editor", "write"].includes(validated[1])){
                this.mode = validated[1] as Mode
                // list, editor일경우, 두개도 허용
                switch(this.mode) {

                    case "post" :
                    
                        if(validated.length < 3) {
                            this.mode = 'error';
                            this.root.router.push('/error/404')
                            return;
                        } 

                        const postId = parseInt(validated[2]);
                        if (postId) {
                            this.postId = postId;
                        } else {
                            // 유효한 번호가 아니므로 not valid page.
                            this.mode = 'error';
                            this.root.router.push('/error/404')
                            return;
                        }
                        break;

                    case "list" :

                        if (validated.length === 2) {
                            this.page = 1;
                        } else {

                            const page = parseInt(validated[2]);
                            if (page) {
                                this.page = page;
                            } else {
                                // 유효한 번호가 아니므로 not valid page.
                                this.mode = 'error';
                                this.root.router.push('/error/404')
                                return;
                            }
                        }

                        break;

                    case "write" :

                        this.mode = "write";
                        break;

                    case "edit" :

                        if(validated.length < 3) {
                            this.mode = 'error';
                            this.root.router.push('/error/404')
                            return;
                        } 

                        const postIdForEdit = parseInt(validated[2]);
                        if (postIdForEdit) {
                            this.postId = postIdForEdit;
                        } else {
                            // 유효한 번호가 아니므로 not valid page.
                            this.mode = 'error';
                            this.root.router.push('/error/404')
                            return;
                        }
                        break;
                    
                    default :
                        this.mode = 'error';
                        this.root.router.push('/error/404')
                        return;
                }
            } else {
                this.mode = 'error';
                this.root.router.push('/error/404')
                return;
            }
        }

    }
    
    /** 현재 Topic으로 리스트 받아오기 */
    @action
    getList(topic?: Topic, page: number = 1){

        if (topic) {
            this.topic = topic;
        } else {
            this.topic = this.getQuery.topic;
        }

        this.isLoading = true;
        this.root.router.push(`/${this.topic}?page=${page}`)

        R6Ajax.shared.getJson<ListType>(`topic/${this.topic}?page=${page}`)
       .subscribe(
            res => {
                this.meta = res.meta
                this.page = page;
                this.list = res.postList;
                this.isLoading = false;
            },
            err => {
                this.isError = true
                this.isLoading = false;
            },
            () =>{
            }
        )
    }

    @action
    openLoginModal(open: boolean){
        this.isLoginModalOpened = open;
    }

    /** 글을 쓰기 위해 에디터로 이동한다 */
    @action
    goEditor(){
        if (this.isLogined) {
            this.root.router.history.push(`${this.topic}/write`)
        } else {
            this.openLoginModal(true);
        }

        // if (this.isLogined) {
        //     let regexp = new RegExp(`\/[a-z]{1,}|\/`);
        //     let pathname = this.root.router.location.pathname;
        //     let progressed = regexp.exec(pathname);
        //     let excuted = progressed ? progressed[0] : "/null";
        //     if (excuted === "/") {
        //         excuted = "/free"
        //     }
        //     this.root.router.history.push(`${excuted}/editor`)
        // } else {
        //     this.openLoginModal(true);
        // }
    }

    /** 글을 읽기 위해 이동한다. */
    @action
    goPost(postId: number){
        this.root.router.history.push(`/${this.topic}/post/${postId}`)
    }

}
