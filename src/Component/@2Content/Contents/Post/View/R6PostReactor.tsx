// const SUBMITREPLY = "SUBMITREPLY"
import {Reactor} from 'reactivex-redux'
import { CommentType, ContentType, PostListType } from "../../../../../Util/Entity"
import { Observable, concat, of, forkJoin } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map , concatMap, flatMap, tap } from 'rxjs/operators'
import R6Ajax from '../../../../../Library/R6Ajax'

const CLICKREPLY = "CLICKREPLY"
const CLICKREPLYREPLY = "CLICKREPLYREPLY"

interface CLICKREPLY {
    type : typeof CLICKREPLY
    content : string,
    postId: number,
}

interface CLICKREPLYREPLY {
    type : typeof CLICKREPLYREPLY
    content : string,
    postId: number,
    parentCommentId: number,
}

export type PostAction = CLICKREPLY | CLICKREPLYREPLY

const UPLOADREPLY = "UPLOADREPLY"
const SETLOADING = "SETLOADING"

interface UPLOADREPLY {
    type : typeof UPLOADREPLY
    commentsList : CommentType[],
}

interface SETLOADING {
    type : typeof SETLOADING
    loading: boolean;
}


export type PostMutation = UPLOADREPLY | SETLOADING

export interface PostState {
    commentsList: CommentType[]
    commentIsLoading: boolean;
    commentIsError:boolean;
}

export const PostInitialState : PostState = {
    commentsList: [],
    commentIsLoading: false,
    commentIsError:false,
}


export default class PostReactor extends Reactor<PostAction, PostState, PostMutation> {

    mutate(action: PostAction): Observable<PostMutation> {

        switch(action.type) {
            case "CLICKREPLY":
                return concat(
                    of<PostMutation>({type:"SETLOADING", loading: true}),
                    this.postComment(action.postId, action.content).pipe(
                        flatMap( res => this.updateComment(action.postId).pipe(
                            map<any, PostMutation>( res => ({type:"UPLOADREPLY", commentsList : res}))
                        ))
                    ),
                    of<PostMutation>({type:"SETLOADING", loading: false}),
                )
            case "CLICKREPLYREPLY":
                return concat(
                    of<PostMutation>({type:"SETLOADING", loading: true}),
                    this.postComment(action.postId, action.content, action.parentCommentId).pipe(
                        flatMap( res => this.updateComment(action.postId).pipe(
                            map<any, PostMutation>( res => ({type:"UPLOADREPLY", commentsList : res}))
                        ))
                    ),
                    of<PostMutation>({type:"SETLOADING", loading: false}),
                )
            }
    }
    reduce(state: PostState, mutation: PostMutation): PostState {
        let newState = state;
        switch(mutation.type) {

            case "UPLOADREPLY":
                newState.commentsList = mutation.commentsList;
                return newState;

            case "SETLOADING":
                newState.commentIsLoading = mutation.loading;
                return newState;
        }
    }

    updateComment(postId: number): Observable<CommentType[]> {
        return R6Ajax.shared.getJson<ContentType>(`post/${postId}`).pipe(
            map(res => res.commentList )
        )
    }

    postComment(postId: number, content: string, parentCommentId?: number){  
        if (parentCommentId) {
            return R6Ajax.shared.post('comment', {content: content, postId: postId, parentCommentId: parentCommentId}, "json", true)
        } else {
            return R6Ajax.shared.post('comment', {content: content, postId: postId}, "json", true)
        }
    }

}