// const SUBMITREPLY = "SUBMITREPLY"
import {Reactor} from 'reactivex-redux'
import { CommentType, ContentType } from "../../../../../Util/Entity"
import { Observable, concat, of, forkJoin } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map , concatMap, flatMap, tap } from 'rxjs/operators'

const REPLY = "REPLY"
const REPLYREPLY = "REPLYREPLY"

interface REPLY {
    type : typeof REPLY
    content : string,
    postId: number,
}

interface REPLYREPLY {
    type : typeof REPLYREPLY
    content : string,
    postId: number,
    parentCommentId: number,
}

export type PostAction = REPLY | REPLYREPLY


const SETRELOADING = "SETRELOADING"
const FETCHLIST = "FETCHLIST"
const GETERROR = "GETERROR"

interface SETRELOADING {
    type : typeof SETRELOADING
    loading : boolean
}

interface FETCHLIST {
    type : typeof FETCHLIST
    commentsList : CommentType[]
}

interface GETERROR {
    type : typeof GETERROR
    message : string
}


export type PostMutation = SETRELOADING | FETCHLIST | GETERROR

export interface PostState {
    isLoading : boolean,
    isError :boolean,
    // isReply: boolean,
    commentsList: CommentType[]
}

export const PostInitialState : PostState= {
    isLoading : false,
    isError:false,
    commentsList: [],
}


export default class PostReactor extends Reactor<PostAction, PostState, PostMutation> {

    mutate(action: PostAction): Observable<PostMutation> {

        switch(action.type) {
            case "REPLY":

                return concat(
                    of<PostMutation>({type:"SETRELOADING", loading: true}),
                    // this.postComment(action.postId, action.content).pipe(
                    //         flatMap( value => this.updateComment(action.postId))
                    //     ).pipe( 
                    //         flatMap( value => concat( 
                    //             of<PostMutation>({type:"FETCHLIST", commentsList: value.commentList }),
                    //             of<PostMutation>({type:"SETRELOADING", loading: false})
                    //         ))
                    //     ),
                    
                )
            case "REPLYREPLY":
                return concat(
                    of<PostMutation>({type:"SETRELOADING", loading: true}),
                    // this.postComment(action.postId, action.content).pipe(
                    //     flatMap( value => this.updateComment(action.postId))
                    //     ).pipe( map( value => ({type:"FETCHLIST", commentsList: value.commentList } as PostMutation))
                    // ),
                    of<PostMutation>({type:"SETRELOADING", loading: false})   
                )
            }
    }
    reduce(state: PostState, mutation: PostMutation): PostState {

        let newState = state;

        switch(mutation.type) {
            case "SETRELOADING":
                newState.isLoading = mutation.loading;
                return newState;

            case "FETCHLIST":
                newState.commentsList = mutation.commentsList;
                return newState;

            case "GETERROR":
                newState.isError = true;
                return newState;
        }
    }


    // updateComment(postId: number) : Observable<ContentType> {
    //     // return R6Ajax.shared.getJson<ContentType>(`post/${postId}`)

    //     return R6StatAPI.shared.post("http://r6-search.me/api/c/comment", { poseId: postId, content: content, parentCommentId: parentCommentId }).pipe( 
    //         tap( value => console.log(value))
    //         map( value => of<ContentType>(value.data))
    //     )

    // }

    postComment(postId: number, content: string, parentCommentId?: number){  

        // return ajax({
        //     url: `http://r6-search.me/api/c/comment`,
        //     method: "POST",
        //     body: { poseId: postId, content: content },
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     crossDomain: true,
        //     withCredentials: true
        // })
        
        // return ajax.post(`http://r6-search.me/api/c/comment`, { poseId: postId, content: content },{ "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXBvc3QiLCJpYXQiOjE1OTYxNjUyNzcsImV4cCI6MTU5NjI1MTY3N30.5Ym7zA6Y9kcVKtG4zn9seElNjgD4ohoyeyiM2AXNPI8", "Content-Type": "application/json"} )
        // return R6StatAPI.shared.post("http://r6-search.me/api/c/comment", { poseId: postId, content: content, parentCommentId: parentCommentId }).pipe( 
        //     tap( value => console.log(value))
        // )
        // return ajax.post("http://r6-search.me/api/c/comment", { poseId: postId, content: content, parentCommentId: parentCommentId })
        // if (parentCommentId) {
        //     return R6Ajax.shared.post('comment', { poseId: postId, content: content, parentCommentId: parentCommentId }, )
        // } else {
        //     return R6Ajax.shared.post('comment', { poseId: postId, content: content }, { "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXBvc3QiLCJpYXQiOjE1OTYxMjA3MzIsImV4cCI6MTU5NjIwNzEzMn0.YSY7_Yxdoll13tFchwFi6NY3kD_L_zGMU-gcXv5YG3s"})
        //     .pipe( map( value => value.response))
        // }

    }

}