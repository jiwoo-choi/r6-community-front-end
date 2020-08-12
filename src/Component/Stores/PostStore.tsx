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
    @observable thumbsLoading: boolean = false;
    
    queue? : Function;
    queueArgs : any[] = [];

    // @computed get commentsList(){
    //     if (this.postContent) {
    //         return this.postContent.commentList;
    //     } else {
    //         return []
    //     }
    // } 

    // @computed get commentList(): CommentType[] {
    //     if (!this.postContent) {
    //         return [];
    //     } else {
    //         return this.getFlattenCommentList(this.commentList)
    //     }
    // }

    @computed get flattenCommentList(): CommentType[] {

        if (!this.postContent) {
            return []
        } else {
            console.log(this.getFlattenCommentList(toJS(this.postContent.commentList)))
            return this.getFlattenCommentList(toJS(this.postContent.commentList))
        }
    }

    // get commentList() : CommentType[] {
    //     if (!this.postContent) {
    //         return [];
    //     } else {
    //         return this.getFlattenCommentList(this.commentList)
    //     }
    // }

    @computed get countOfComments(){
        if (this.postContent) {
            return this.flattenCommentList.length
        } else {
            return 0
        }   
    }


    // flatten(array : CommentType[], parentId?: number, parentNickname?: string, mutable: boolean = true) {
    //     var toString = Object.prototype.toString;
    //     var arrayTypeStr = '[object Array]';

    //     var result : CommentType[] = [];
    //     var nodes : (CommentType | undefined)[] = (mutable && array) || arrayslice();
    //     var node: CommentType | undefined;
    
    //     if (!array.length) {
    //         return result;
    //     }

    //     node = nodes.pop();

    //     do {
    //         if (toString.call(node) === arrayTypeStr) {
    //             // nodes.push.apply(nodes, node);
    //             nodes.push(node);
    //         } else {
    //             if (node) {
    //                 result.push(node);
    //             }
    //         }
    //     } while (nodes.length && (node = nodes.pop()) !== undefined);

    //     result.reverse(); // we reverse result to restore the original order
    //     return result;
    // }

    
    getFlattenCommentList(comment : CommentType[], parentId?: number, parentNickname?: string): CommentType[]{

        if (comment.length === 0) {
            return [];
        }

        let array: CommentType[] = []; 

        for( const element of comment) {  
            let elementArray : CommentType[];
            if (parentId) {
                elementArray = [{...element, parentId: parentId, parentNickname: parentNickname, isChild: true}]
            } else {
                elementArray = [element]
            }
            elementArray = elementArray.concat(this.getFlattenCommentList(element.childComment, element.commentId, element.username))
            array = array.concat(elementArray);
        }
        
        return array;
    }





    

    postId : string = '0';
    // @observable post?: PostListType; = undefined;
    // @observable comments: CommentType[] = [];
    

    @action
    resetState(){
        this.isLoading = false;
        this.isError = false;
        this.isCommentLoading = false;
        this.isCommentError = false;
        this.postContent = undefined;
        this.isConfirmOpened = false;
        this.thumbsLoading = false;
    }

    
    @action
    getPost(){

        let regexp = new RegExp(`\/[a-z]{1,}|\/`);
        let pathname = this.root.router.location.pathname;
        let progressed = regexp.exec(pathname);
        let excuted = progressed ? progressed[0] : "/null";

        if (pathname === "/") {
            this.root.router.push('/404/error')
        } else if ( !["free", "clan", "together", "tips"].includes(excuted.substr(1))) {
            this.root.router.push('/404/error')
        } else {
            this.root.forum.topic = excuted.substr(1) as Topic
        }    

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
    thumbsUp(){

        this.thumbsLoading = true;
        
        return R6Ajax.shared.post('comment', {postId: this.postId}, "json", true)
        .pipe(
            flatMap( res => {
                return R6Ajax.shared.getJson<PostContentType>(`post/${this.postId}/recommend`)
            })
        )
        .subscribe(
            res => { 
            } ,
            err => {
            },
            () => {
                this.thumbsLoading = false;
            }
        )
    }

    @action
    postComment(content: string, parentCommentId?: number){  

        if (!this.root.forum.isLogined) {
            this.root.forum.openLoginModal(true);
            return;
        }

        if (content === "") {
            return;
        }

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
                this.resetState();
                this.root.router.push(`/${topic}`)
            },
            err => {

            } 
        )
    }



}
