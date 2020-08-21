import { observable, action } from "mobx";
import RootStore from "./RootStore";
import RootStoreP from "./RootStoreP";
import R6Ajax from "../../Library/R6Ajax";
import { forEach, values } from "lodash";
import { PostContentType } from "../../Util/Entity";
import { Topic } from "./ForumStore";

export default class EditorStore extends RootStoreP<RootStore> {

    /** 업로드 로딩 */
    @observable isLoading : boolean = false;
    @observable isEditMode : boolean = false;
    @observable isError: boolean = false;
    postId : string = '0';

    @action
    upload(title: string, content: string, images : string[]){

        if (title === "" || content === "") {
            return; 
        }
        let topicQueue : Topic = "free";

        let regexp = new RegExp(`\/[a-z]{1,}|\/`);
        let pathname = this.root.router.location.pathname;
        let progressed = regexp.exec(pathname);
        let excuted = progressed ? progressed[0] : "/null";

        if (pathname === "/") {
            this.root.router.push('/404/error')
        } else if ( !["free", "clan", "together", "tips"].includes(excuted.substr(1))) {
            this.root.router.push('/404/error')
        } else {
            topicQueue = excuted.substr(1) as Topic
        }    
        
        this.isLoading = true;

        // let formData = new FormData();
        // formData.append('title', title);
        // formData.append('content', content);
        // formData.append('type', topicQueue);
        // images.forEach( (value) => {
        //     formData.append('imgSrcList',value);
        // })

  
    
        
        
        return R6Ajax.shared.post(`post`, { 
            'title' : title,
            'content' : content,
            'type' : topicQueue,
            'imgSrcList' : images
        }, "json", true)
        .subscribe(
            res=>{
                this.isLoading = false;
                this.root.router.history.push(`/${topicQueue}/post/${res.response.postId}`)
            },
            err=>{ 
                this.isLoading = false;
            }
        )
    }


    @action
    edit(title: string, content: string, images : string[]){

        if (title === "" || content === "") {
            return; 
        }
        
        let topicQueue : Topic = "free";
        let regexp = new RegExp(`\/[a-z]{1,}|\/`);
        let pathname = this.root.router.location.pathname;
        let progressed = regexp.exec(pathname);
        let excuted = progressed ? progressed[0] : "/null";

        if (pathname === "/") {
            this.root.router.push('/404/error')
        } else if ( !["free", "clan", "together", "tips"].includes(excuted.substr(1))) {
            this.root.router.push('/404/error')
        } else {
            topicQueue = excuted.substr(1) as Topic
        }    
        
        this.isLoading = true;

        // let formData = new FormData();
        // formData.append('title', title);
        // formData.append('content', content);
        // images.forEach( (value) => {
        //     formData.append('imgSrcList',value);
        // })

        return R6Ajax.shared.put(`post/${this.postId}`, { 
            'title' : title,
            'content' : content,
            'imgSrcList' : images
        }, "json", true)
        .subscribe(
            res=>{
                this.isLoading = false;
                this.isEditMode = false;
                this.root.router.history.push(`/${topicQueue}/post/${res.response.postId}`)
            },
            err=>{ 
                this.isLoading = false;
            }
        )
    }

    /**
     * 에디터 모드를 체크하고, 필요한 변수들을 업데이트합니다.
     * - 수정모드 : 글을 수정하는 모드 (로그인 체크.)
     * - 글쓰기모드 : 글을 쓰는 모드
     * @param insertHandler 
     */
    @action
    editSetUp(insertHandler: (title:string, content:string) => void){
        
        //1. 로그인체크 + 에디터모드 체크.
        if (!this.root.forum.isLogined) {
            alert('로그인해주세요')
            this.root.router.goBack()
            return;
        }

        // 2. url체크.
        let pathname = this.root.router.location.pathname;
        const regex = /\/editor\/edit\/[0-9]+/g;

        let m;
        if ((m = regex.exec(pathname)) === null) {
            this.isEditMode = false;
        } else {
            this.isEditMode = true;
        }

        if (this.isEditMode && m) {
            const postId = (m[0].substr(13));
            this.postId = postId;
            return R6Ajax.shared.getJson<PostContentType>(`post/${postId}`)
            .subscribe(
                res => {
                    if (res.author === this.root.forum.nickName){
                        insertHandler(res.title, res.content);
                    } else {
                        alert('본인이 쓴글이 아니군요.')
                    }
                },
                err => {
                    alert('에러입니다.')
                }
            )
        } 
        

        // check it is editor mode.

        //3. 로그인 validation //subscription 메모리 관리?
        //
        // return R6Ajax.shared.getJson<PostContentType>(`post/${postId}`)
        // .subscribe(
        //     res => {
        //         if (res.author === this.root.forum.nickName){
        //             insertHandler(res.title, res.content);
        //             this.isEditMode = true;
        //         } else {
        //             alert('에러났습니다.')
        //         }
        //     },
        //     err => {
        //         alert('에러났습니다.')
        //     }
        // )
    }
}