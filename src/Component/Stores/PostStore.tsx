import RootStore from "./RootStore";
import RootStoreP from "./RootStoreP";
import { observable, action, toJS, computed } from "mobx";
import { PostContentType, CommentType } from "../../Util/Entity";
import R6Ajax from "../../Library/R6Ajax";
import axios from "axios";
import {flatMap} from 'rxjs/operators'
import { Topic } from "../@0ForumReactor/ForumReactor";

export default class PostStore extends RootStoreP<RootStore> {

    @observable isLoading: boolean = false;
    @observable isError: boolean = false;
    @observable isCommentLoading: boolean = false;
    @observable isCommentError: boolean = false;
    @observable postContent? : PostContentType;
    @observable isConfirmOpened: boolean = false;

    @computed get commentsList(){
        if (this.postContent) {
            return this.postContent.commentList;
        } else {
            return []
        }
    } 

    @computed get countOfComments(){
        if (this.postContent) {
            return this.postContent.commentList.length
        } else {
            return 0
        }   
    }


    postId : string = '0';
    // @observable post?: PostListType; = undefined;
    // @observable comments: CommentType[] = [];
    
    @action
    getPost(){

        const pathNames = this.root.router.location.pathname.split('/');
        const postId = pathNames[3];
        this.postId = postId;
        this.isLoading = true;

        return R6Ajax.shared.getJson<PostContentType>(`post/${postId}`)
        .subscribe(
            res => {
                this.isLoading = false;
                this.postContent = res;
            },
            err => {
                this.isError = true;
            }
        )
    }

    @action
    postComment(content: string, parentCommentId?: number){  

        this.isCommentLoading = true;

        if (parentCommentId) {
            return R6Ajax.shared.post('comment', {content: content, postId: this.postId, parentCommentId: parentCommentId}, "json", true)
            .pipe(
                flatMap( res => {
                    return R6Ajax.shared.getJson<PostContentType>(`post/${this.postId}`)
                })
            )
            .subscribe(
                res => { 
                    this.postContent = res;
                    this.isCommentLoading = false;
                } ,
                err => {
                    this.isCommentError = true;
                    this.isCommentLoading = false;
                }
            )
        } else {
            return R6Ajax.shared.post('comment', {content: content, postId: this.postId}, "json", true)
            .pipe(
                flatMap( res => {
                    return R6Ajax.shared.getJson<PostContentType>(`post/${this.postId}`)
                })
            )
            .subscribe(
                res => { 
                    this.postContent = res;
                    this.isCommentLoading = false;
                } ,
                err => {
                    this.isCommentError = true;
                    this.isCommentLoading = false;
                }
            )
        }
    }

    @action
    setConfirmOpen(open:boolean) {
        this.isConfirmOpened = open;
    }
  
    @action
    delete(){

        // fetch('http://r6-search.me/api/c/post/63', 
        // { 
        //     method: "DELETE",
        //     headers : {
        //         "Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LWFjY291bnQiLCJpYXQiOjE1OTcwNjkxNjYsImV4cCI6MTU5NzE1NTU2Nn0.wFwRZjqXi4AM4WqsJvxp0zYYtHFoiv20djNZMuNIkuk",
        //         "Content-Type" : "application/json",
        //     }
        // })
        // .then( res => {
        //     console.log(res)
        // })
        const topic = this.root.forum.topic;
        R6Ajax.shared.delete(`post/${this.postId}`, "json", true)
        .subscribe(
            res => {
                this.root.router.push(`/${topic}`)
            },
            err => {

            } 
        )
    }



}
