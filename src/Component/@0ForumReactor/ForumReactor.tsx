import { Observable , concat, of  } from "rxjs";
import { ajax } from "rxjs/ajax";

import { takeUntil, map,  filter, tap  } from "rxjs/operators";
import { ListType, ContentType, PostListType, CommentType } from "../../Util/Entity";
import { catchErrorJustReturn } from "../../Library/RxJsExtension";
import { Reactor, ReactorControlProps,  ReactorControlType } from "reactivex-redux";
import { listResultMockup } from "../../Data/mockup";
import R6Ajax from "../../Library/R6Ajax";

export function TopicToString( topicType: Topic) {
    switch(topicType) {
        case "clan":
            return "클랜홍보"
        case "free":
            return "자유게시판"
        case "tips":
            return "공략/팁"
        case "together":
            return "같이하기"
    }
}

export type Topic = "tips"|"free"| "together"| "clan"
type Mode = "list" | "edit" | "view"

export const SETTOPIC = "SETTOPIC" as const
export const SETPAGENO = "SETPAGENO" as const

export const TOPICLISTREQUSET = "TOPICLISTREQUSET" as const
export const CLICKPOST = "CLICKPOST" as const 


export const CLICKWRITE = "CLICKWRITE" as const
export const CLICKPAGE = "CLICKPAGE" as const
export const CLICKBACK = "CLICKBACK" as const
export const CLICKLOGINOFFBUTTON = "CLICKLOGINOFFBUTTON" as const
export const CLICKLOGINBUTTON = "CLICKLOGINBUTTON" as const


export interface SETTOPIC {
    type: typeof SETTOPIC;
    newTopic: Topic,
}

export interface SETPAGENO {
    type: typeof SETPAGENO;
    pageId: number,
}

export interface TOPICLISTREQUSET {
    type: typeof TOPICLISTREQUSET;
    newTopic: Topic,
}

export interface CLICKWRITE {
    type: typeof CLICKWRITE;
}
export interface CLICKPAGE {
    type: typeof CLICKPAGE;
    newPage: number,
}

export interface CLICKPOST {
    type: typeof CLICKPOST;
    postId: number,
}
export interface CLICKBACK {
    type: typeof CLICKBACK;
}

export interface CLICKLOGINBUTTON {
    type: typeof CLICKLOGINBUTTON;
}
export interface CLICKLOGINOFFBUTTON {
    type: typeof CLICKLOGINOFFBUTTON;
}

export type ForumAction = SETTOPIC | SETPAGENO | CLICKWRITE | CLICKPAGE | CLICKBACK | CLICKLOGINBUTTON | CLICKLOGINOFFBUTTON | TOPICLISTREQUSET | CLICKPOST


export const SETLOADING = "SETLOADING"
export const FETCHLIST = "FETCHLIST"
export const FETCHPOST = "FETCHPOST"
export const MODECHANGE = "MODECHANGE"
export const TOPICCHANGE = "TOPICCHANGE"
export const PAGENOCHANGE = "PAGENOCHANGE"

export const LOGINMODALSTATE = "LOGINMODALSTATE"


// 상태에 대한 힌트.
export interface SETLOADING {
    type: typeof SETLOADING,
    isLoading: boolean,
}

export interface FETCHLIST {
    type: typeof FETCHLIST,
    list: ListType[],
    page: number
}

export interface FETCHPOST {
    type: typeof FETCHPOST,
    post: ContentType,
}

export interface MODECHANGE {
    type: typeof MODECHANGE,
    mode : Mode,
}

export interface TOPICCHANGE {
    type: typeof TOPICCHANGE,
    topic: Topic,
} 

export interface PAGENOCHANGE {
    type: typeof PAGENOCHANGE,
    pageId: number,
} 



export interface LOGINMODALSTATE {
    type: typeof LOGINMODALSTATE,
    on: boolean;
}

type ForumMutation = SETLOADING | FETCHLIST | FETCHPOST | MODECHANGE | TOPICCHANGE | LOGINMODALSTATE | PAGENOCHANGE
// --- state

export interface ForumState {
    topic : Topic,
    mode: Mode,
    page: number,
    list: ListType[],
    isLoading:boolean,
    isError:boolean,
    post?: ContentType,
    postId: number,
    isLogined: boolean,
    isLoginModal: boolean;
}

export const ForumStateInitialState : ForumState = {
    isError: false,
    isLoading: true,
    page: 1,
    mode:"list",
    topic:"free",
    post: undefined,
    postId: 0,
    list:[],
    isLoginModal: false,
    isLogined: false,
}

export interface ForumReactorProps extends ReactorControlProps<ForumAction, ForumState> { 
    reactor_control: ReactorControlType<ForumAction, ForumState>;
} ;

export interface ForumReactorProp {
    reactor : ForumReactor;
}

export default class ForumReactor extends Reactor<ForumAction, ForumState, ForumMutation> {

    mutate(action: ForumAction): Observable<ForumMutation> {
        switch(action.type) {
        
        case "SETTOPIC":
            return of<ForumMutation>({type:"TOPICCHANGE", topic: action.newTopic})
        
        case "SETPAGENO":
            return of<ForumMutation>({type:"PAGENOCHANGE", pageId: action.pageId})

        case "TOPICLISTREQUSET":
            return concat( 
                of<ForumMutation>({type:"SETLOADING", isLoading: true}),
                this.fetchList(action.newTopic).pipe(
                    takeUntil(this.action.pipe(filter((value)=> {
                        return value.type === action.type
                    }))),
                    map<PostListType, ForumMutation>( res => {
                        return {type:"FETCHLIST", list: res.postList, page: 1 } 
                    }),
                ))

        case "CLICKBACK":
            return of<MODECHANGE>({type:"MODECHANGE", mode: "list"})
        
        case "CLICKWRITE":
            return of<MODECHANGE>({type: "MODECHANGE", mode:"edit"})

        case "CLICKPAGE":
            return concat(
                //is Loading
                of<ForumMutation>({type:"SETLOADING", isLoading: true}),
                //fetching List
                this.fetchList(this.currentState.topic, action.newPage).pipe(
                    takeUntil(this.action.pipe(filter(value => value === action))),
                    map<PostListType, ForumMutation>( res => {
                        return {type:"FETCHLIST", list: res.postList, page: 1 } 
                    })
                ),
                of<ForumMutation>({type:"SETLOADING", isLoading: false}),
            )

        case "CLICKPOST":
            return concat(
            of<ForumMutation>({type:"SETLOADING", isLoading: true}),
            this.fetchPost(action.postId).pipe(
                map<ContentType, ForumMutation>( res => ({type:"FETCHPOST", post : res}))
            ),
            )

        case "CLICKLOGINBUTTON":
            return of<ForumMutation>({type:"LOGINMODALSTATE", on: true})

        case "CLICKLOGINOFFBUTTON":
            return of<ForumMutation>({type:"LOGINMODALSTATE", on: false})
        }

    }

    reduce(state: ForumState, mutation: ForumMutation): ForumState {

        let newState = state;
        switch(mutation.type) {

            case "TOPICCHANGE":
                newState.topic = mutation.topic;
                return newState;

            case "PAGENOCHANGE":
                newState.postId = mutation.pageId;
                return newState;

            case "MODECHANGE":
                newState.mode = mutation.mode
                return newState;
            case "SETLOADING":
                newState.isLoading = mutation.isLoading
                return newState
            case "FETCHLIST":
                newState.isLoading = false;
                newState.list = mutation.list;
                newState.page = mutation.page;
                return newState
                // if (mutation.list.length === 0){
                //     newState.isError = true;
                //     return newState
                // } else {
            case "FETCHPOST":
                if (Object.keys(mutation.post).length === 0) {
                    newState.isError = true;
                    return newState;
                } else {
                    newState.post = mutation.post;
                    newState.isLoading = false;
                    return newState;
                }
            case "LOGINMODALSTATE":
                newState.isLoginModal = mutation.on;
                return newState;
        }
    }
   
    fetchList(topic: Topic, page: number = 1) : Observable<PostListType> {
        return ajax.getJSON<PostListType>(`https://www.r6-search.me/api/c/topic/${topic}?page=${page}`)
    }

    fetchPost(postId: number) : Observable<ContentType> {
        return ajax.getJSON<ContentType>(`https://www.r6-search.me/api/c/post/${postId}`)
    }

    postUpload(title: string, content:string, type: Topic) {
        // let formData = new FormData();
        // formData.append('title', title);
        // formData.append('content', content);
        // formData.append('type', type);
        // return R6Ajax.shared.post(`/post`, formData, "multipart", true)
        // .map( res => ({type:""}))
    }

    // fetchPost(postId: number) : 

 }