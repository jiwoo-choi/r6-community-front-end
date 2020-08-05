import { RANKBYREGION } from "../../../../../Util/Entity";
import { Reactor } from "reactivex-redux";
import { Observable, of } from "rxjs";

export const SELECTRANK = "SELECTRANK"
export const CLICKREGISTERBUTTON = "CLICKREGISTERBUTTON"
export const CANCELREGISTERBUTTON = "CANCELREGISTERBUTTON"

export interface SELECTRANK {
    type: typeof SELECTRANK;
    data: RANKBYREGION,
}

export interface CLICKREGISTERBUTTON {
    type: typeof CLICKREGISTERBUTTON;
} //how to get text?


export type EditorAction = SELECTRANK | CLICKREGISTERBUTTON 

export const POSTUPLOAD = "POSTUPLOAD"
export const ADDRANKDATA = "ADDRANKDATA"
export const SETLOADING = "SETLOADING"
export const MODALSHOW = "MODALSHOW"

export interface POSTUPLOAD {
    type: typeof POSTUPLOAD;
}
export interface ADDRANKDATA {
    type: typeof POSTUPLOAD;
    data: RANKBYREGION,
}
export interface SETLOADING {
    type: typeof SETLOADING;
    isLoading:boolean;
}
export interface MODALSHOW {
    type: typeof MODALSHOW;
    isShow:boolean;
}

type EditorMutation = POSTUPLOAD | ADDRANKDATA | SETLOADING  

// --- state
export interface EditorState {
    isLoading: boolean,
    isError:boolean,
    data:string,
}

export const EditorinitialState: EditorState = {
    isLoading: false,
    isError:false,
    data:"",
}


export default class R6EditorReactor extends Reactor<EditorAction, EditorState, EditorMutation> {

    mutate(action: EditorAction): Observable<EditorMutation> {
        return of({type:"SETLOADING", isLoading:false});
    }

    reduce(state: EditorState, mutation: EditorMutation): EditorState {
       
        return state;
    }
    

    postUpload(content:string){
        
    }
}