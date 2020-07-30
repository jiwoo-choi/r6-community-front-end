import { Observable , concat, of  } from "rxjs";
import { ajax } from "rxjs/ajax";

import { takeUntil, map,  filter, delay, tap  } from "rxjs/operators";
import { R6StatAPI } from "../../Library/R6StatAPI";
import { ListType, ContentType, PostListType } from "../../Util/Entity";
import { flatAxiosResultAndCast, catchErrorJustReturn } from "../../Library/RxJsExtension";
import { Reactor, ReactorControlProps,  ReactorControlType } from "reactivex-redux";

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

export const CLICKTOPIC = "CLICKTOPIC" as const
export const CLICKWRITE = "CLICKWRITE" as const
export const CLICKPAGE = "CLICKPAGE" as const
export const CLICKPOST = "CLICKPOST" as const 
export const CLICKBACK = "CLICKBACK" as const


export interface CLICKTOPIC {
    type: typeof CLICKTOPIC;
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

export type ForumAction = CLICKTOPIC | CLICKWRITE | CLICKPAGE | CLICKPOST | CLICKBACK 


export const SETLOADING = "SETLOADING"
export const FETCHLIST = "FETCHLIST"
export const FETCHPOST = "FETCHPOST"
export const MODECHANGE = "MODECHANGE"
export const TOPICCHANGE = "TOPICCHANGE"

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

type ForumMutation = SETLOADING | FETCHLIST | FETCHPOST | MODECHANGE | TOPICCHANGE 
// --- state

export interface ForumState {
    topic : Topic,
    mode: Mode,
    page: number,
    list: ListType[],
    isLoading:boolean,
    isError:boolean,
    post?: ContentType,
    isLogined: boolean,
}

export const ForumStateInitialState : ForumState = {
    isError: false,
    isLoading: true,
    page: 1,
    mode:"list",
    topic:"tips",
    post: undefined,
    list:[],
    isLogined: false,
}

export interface ForumReactorProps extends ReactorControlProps<ForumAction, ForumState> { 
    reactor_control: ReactorControlType<ForumAction, ForumState>;
} ;


export default class ForumReactor extends Reactor<ForumAction, ForumState, ForumMutation> {

    mutate(action: ForumAction): Observable<ForumMutation> {
        switch(action.type) {
            case "CLICKTOPIC":
                return concat(
                    //topic change
                    of<ForumMutation>({type:"TOPICCHANGE", topic: action.newTopic}),
                    of<MODECHANGE>({type:"MODECHANGE", mode: "list"}),
                    //is Loading
                    of<ForumMutation>({type:"SETLOADING", isLoading: true}),
                    //WebRequest
                    this.fetchList(action.newTopic).pipe(
                        // takeUntil(of(1)),
                        takeUntil(this.action.pipe(filter((value)=> {
                            return value.type === action.type
                        }))),
                        map<PostListType, ForumMutation>( res => {
                            return {type:"FETCHLIST", list: res.postList, page: 1 } 
                        }),
                    ),
                    // of<ForumMutation>({type:"SETLOADING", isLoading: false}).pipe( tap (value => console.log("VALUE OUT")))

                    // of<ForumMutation>({type:"FETCHLIST", isLoading: true}),
                    //is Loading
                    // of<ForumMutation>({type:"SETLOADING", isLoading: false})
                        //결과값 전달=> 결과값이 다르지않으면 그대로전달.
                )

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
            of<MODECHANGE>({type: "MODECHANGE", mode:"view"}),
            of<ForumMutation>({type:"SETLOADING", isLoading: true}),
            //WebRequest
            this.fetchPost(action.postId).pipe(
                tap( value => console.log(value)),
                // takeUntil(this.action.pipe(filter(value => value === action))),
                map<ContentType, ForumMutation>( res => ({type:"FETCHPOST", post : res}))
            ),
            // of<ForumMutation>({type:"FETCHLIST", isLoading: true}),
            //is Loading
            of<ForumMutation>({type:"SETLOADING", isLoading: false}),
            )
        }
        
    }

    reduce(state: ForumState, mutation: ForumMutation): ForumState {

        let newState = state;
        switch(mutation.type) {
            case "TOPICCHANGE":
                newState.topic = mutation.topic
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
                    return newState;
                }
        }
    }
   
    fetchList(topic: Topic, page: number = 1) : Observable<PostListType> {

        return ajax.getJSON<PostListType>(`https://www.r6-search.me/api/c/topic/${topic}?page=${page}`)
        .pipe(
            catchErrorJustReturn({} as PostListType)
        )
    }

    fetchPost(postId: number) : Observable<ContentType> {
        return ajax.getJSON<ContentType>(`https://www.r6-search.me/api/c/post/${postId}`).pipe( delay(10))
    }

 }