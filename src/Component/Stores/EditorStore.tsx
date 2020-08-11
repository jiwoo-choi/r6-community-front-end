import { observable, action } from "mobx";
import RootStore from "./RootStore";
import RootStoreP from "./RootStoreP";
import { Topic } from "../@0ForumReactor/ForumReactor";
import R6Ajax from "../../Library/R6Ajax";
import { forEach } from "lodash";

export default class EditorStore extends RootStoreP<RootStore> {

    /** 업로드 로딩 */
    @observable isLoading : boolean = false;


    @action
    upload(title: string, content: string, images : string[]){

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

        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', topicQueue);
        images.forEach( (value) => {
            formData.append('imgSrcList',value);
        })
        return R6Ajax.shared.post(`post`, formData, "multipart", true)
        .subscribe(
            res=>{
                console.log(res)
                this.isLoading = false;
                this.root.router.history.push(`/${topicQueue}/post/${res.response.postId}`)
            },
            err=>{ 
                this.isLoading = false;
            }
        )
    }


    @action
    edit(title: string, content: string, type: Topic, images : string[]){

        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', type);
        images.forEach( (value) => {
            formData.append('imgSrcList',value);
        })

        // R6Ajax.shared.put(`post/${this.postId}`, "multipart", true)
        // .subscribe(
        //     res => {
        //         // this.root.router.push(`/${topic}`)
        //     },
        //     err => {
        //         // 
        //     } 
        // )


        
    }
}