import { Observable , concat, of  } from "rxjs";
import { ajax } from "rxjs/ajax";

import { takeUntil, map,  filter, tap  } from "rxjs/operators";
import { ListType, CommentType, PostContentType } from "../../Util/Entity";
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
export const CLICKPAGE = "CLICKPAGE" as const

export const CLICKLOGINOFFBUTTON = "CLICKLOGINOFFBUTTON" as const
export const CLICKLOGINBUTTON = "CLICKLOGINBUTTON" as const

export const INVIS_LOGINSUCCESS = "INVIS_LOGINSUCCESS" as const


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

export interface CLICKPAGE {
    type: typeof CLICKPAGE;
    newPage: number,
}

export interface CLICKPOST {
    type: typeof CLICKPOST;
    postId: number,
}

export interface CLICKLOGINBUTTON {
    type: typeof CLICKLOGINBUTTON;
}
export interface CLICKLOGINOFFBUTTON {
    type: typeof CLICKLOGINOFFBUTTON;
}

export interface INVIS_LOGINSUCCESS {
    type: typeof INVIS_LOGINSUCCESS;
    nickName: string;
}


export type ForumAction = SETTOPIC | SETPAGENO |  CLICKPAGE  | CLICKLOGINBUTTON | CLICKLOGINOFFBUTTON | TOPICLISTREQUSET | CLICKPOST | INVIS_LOGINSUCCESS


export const SETLOADING = "SETLOADING"
export const FETCHLIST = "FETCHLIST"
export const FETCHPOST = "FETCHPOST"
export const MODECHANGE = "MODECHANGE"
export const TOPICCHANGE = "TOPICCHANGE"
export const PAGENOCHANGE = "PAGENOCHANGE"
export const LOGINMODALSTATE = "LOGINMODALSTATE"
export const LOGINSUCCESS = "LOGINSUCCESS"
export const SETNICKNAME = "SETNICKNAME"

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
    post: PostContentType,
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

export interface LOGINSUCCESS {
    type: typeof LOGINSUCCESS
}


export interface SETNICKNAME {
    type: typeof SETNICKNAME,
    nickName : string,
}

type ForumMutation = SETLOADING | FETCHLIST | FETCHPOST  | TOPICCHANGE | LOGINMODALSTATE | PAGENOCHANGE | LOGINSUCCESS | SETNICKNAME
// --- state

export interface ForumState {
    topic : Topic,
    page: number,
    postList?: ListType;
    list: ListType[],
    isLoading:boolean,
    isError:boolean,
    post?: PostContentType,
    postId: number,
    isLogined: boolean,
    isLoginModal: boolean;
    nickName: string;
}

export const ForumStateInitialState : ForumState = {
    isError: false,
    isLoading: true,
    page: 1,
    postList: undefined,
    topic:"free",
    post: undefined,
    postId: 0,
    list:[],
    isLoginModal: false,
    isLogined: false,
    nickName: "",
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
                // of<ForumMutation>({type:"SETLOADING", isLoading: true}),
                // this.fetchList(action.newTopic).pipe(
                //     takeUntil(this.action.pipe(filter((value)=> {
                //         return value.type === action.type
                //     }))),
                    // map<PostListType, ForumMutation>( res => {
                    //     return {type:"FETCHLIST", list: res.postList, page: 1 } 
                    // }),
                )
        case "CLICKPAGE":
            return concat(
                //is Loading
                of<ForumMutation>({type:"SETLOADING", isLoading: true}),
                //fetching List
                // this.fetchList(this.currentState.topic, action.newPage).pipe(
                //     takeUntil(this.action.pipe(filter(value => value === action))),
                //     map<PostListType, ForumMutation>( res => {
                //         return {type:"FETCHLIST", list: res.postList, page: action.newPage } 
                //     })
                // ),
                of<ForumMutation>({type:"SETLOADING", isLoading: false}),
            )

        case "CLICKPOST":
            return concat(
            of<ForumMutation>({type:"SETLOADING", isLoading: true}),
            // this.fetchPost(action.postId).pipe(
            //     map<ContentType, ForumMutation>( res => ({type:"FETCHPOST", post : res}))
            // ),
            )

        case "CLICKLOGINBUTTON":
            return of<ForumMutation>({type:"LOGINMODALSTATE", on: true})

        case "CLICKLOGINOFFBUTTON":
            return of<ForumMutation>({type:"LOGINMODALSTATE", on: false})

        case "INVIS_LOGINSUCCESS":
            return concat(
                of<ForumMutation>({type:"LOGINMODALSTATE", on: false}),
                of<ForumMutation>({type:"LOGINSUCCESS"}),
                of<ForumMutation>({type:"SETNICKNAME", nickName: action.nickName })

            )
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

            case "LOGINSUCCESS":
                newState.isLogined = true;
                return newState;

            case "SETNICKNAME":
                newState.nickName = mutation.nickName;
                return newState;
        }
    }
   
    fetchList(topic: Topic, page: number = 1) : Observable<ListType> {
        return ajax.getJSON<ListType>(`https://www.r6-search.me/api/c/topic/${topic}?page=${page}`)
    }

    fetchPost(postId: number) : Observable<PostContentType> {
        return ajax.getJSON<PostContentType>(`https://www.r6-search.me/api/c/post/${postId}`)
    }

 }