import { RANKBYREGION, RANKAPI } from "../../../../../Util/Entity";
import { Reactor } from "reactivex-redux";
import { Observable, of, concat } from "rxjs";
import { Topic } from "../../../../@0ForumReactor/ForumReactor";
import R6Ajax from "../../../../../Library/R6Ajax";
import { map, catchError } from "rxjs/operators";
import { AjaxResponse } from "rxjs/ajax";

export const SELECTRANK = "SELECTRANK"
export const CLICKREGISTERBUTTON = "CLICKREGISTERBUTTON"
export const CANCELREGISTERBUTTON = "CANCELREGISTERBUTTON"

export interface SELECTRANK {
    type: typeof SELECTRANK;
    data: RANKAPI,
    platform: string,
    id: string,
}

export interface CLICKREGISTERBUTTON {
    type: typeof CLICKREGISTERBUTTON;
    content: string,
    title: string,
    topic:Topic,
}


export type EditorAction = SELECTRANK | CLICKREGISTERBUTTON 

export const POSTUPLOAD = "POSTUPLOAD"
export const SUCCESS = "SUCCESS"
export const FAILRUE = "FAILRUE"
export const ADDRANKDATA = "ADDRANKDATA"
export const SETLOADING = "SETLOADING"

export interface POSTUPLOAD {
    type: typeof POSTUPLOAD;
    postId: number;
}

export interface ADDRANKDATA {
    type: typeof ADDRANKDATA;
    data: RANKAPI,
    platform: string,
    id: string,
}

export interface SETLOADING {
    type: typeof SETLOADING;
    isLoading:boolean;
}

export interface SUCCESS {
    type: typeof SUCCESS;
    postId: number;
}

export interface FAILRUE {
    type: typeof FAILRUE;
}

type EditorMutation = POSTUPLOAD | ADDRANKDATA | SETLOADING | SUCCESS | FAILRUE

// --- state
export interface EditorState {
    isLoading: boolean,
    isError:boolean,
    data?:RANKAPI,
    platform: string,
    id: string,
}

export const EditorinitialState: EditorState = {
    isLoading: false,
    isError:false,
    data:undefined,
    platform: "",
    id: "",
}


export default class R6EditorReactor extends Reactor<EditorAction, EditorState, EditorMutation> {

    mutate(action: EditorAction): Observable<EditorMutation> {
        switch( action.type ){
            case "CLICKREGISTERBUTTON" : 
                return concat(
                    of<EditorMutation>({type:"SETLOADING", isLoading:true}),
                    this.postUpload(action.title, action.content, action.topic)
                    .pipe(
                        map<AjaxResponse, EditorMutation>( value => ({type:"SUCCESS", postId: value.response.postId})),
                        catchError( err => of<EditorMutation>({type:"FAILRUE"}))
                    )
                )
            case "SELECTRANK":
                return of<EditorMutation>({type:"ADDRANKDATA", data: action.data, id: action.id, platform: action.platform})
        }
    }

    reduce(state: EditorState, mutation: EditorMutation): EditorState {
        let newState = state;

        switch(mutation.type) {
            case "SETLOADING":
                newState.isLoading = mutation.isLoading;
                return newState;
            case "ADDRANKDATA":
                newState.data = mutation.data;
                return newState;
            case "POSTUPLOAD":
                //postupload
                return newState;
            default:
                return newState;
        }
    }
    
    postUpload(title: string, content:string, type: Topic){
        let formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', type);
        return R6Ajax.shared.post(`post`, formData, "multipart", true)
    }
}