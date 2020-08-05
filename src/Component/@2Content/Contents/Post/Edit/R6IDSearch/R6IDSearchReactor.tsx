import { RANKAPI, RANKBYREGION } from "../../../../../../Util/Entity"
import { Reactor } from "reactivex-redux"
import { Observable, of, concat, forkJoin } from "rxjs"
import {  catchErrorJustReturn } from "reactivex-redux"
import { filter, takeUntil, map,  } from "rxjs/operators"
import R6Ajax from "../../../../../../Library/R6Ajax"

export const WRITETEXT = "WRITETEXT" as const
export const INVIS_SEARCHLIST = "INVIS_SEARCHLIST" as const
export const CANCELSEARCH = "CANCELSEARCH" as const
export const CLICKSEARCH = "CLICKSEARCH" as const

export interface WRITETEXT {
    type: typeof WRITETEXT;
    text: string,
}

/** 이 Action은 존재하지만 유저가 볼 순 없습니다. 시간으로 인해 Trigger됩니다. */
export interface INVIS_SEARCHLIST {
    type: typeof INVIS_SEARCHLIST;
    text: string,
}

export interface CLICKSEARCH {
    type: typeof CLICKSEARCH;
}

export interface CANCELSEARCH {
    type: typeof CANCELSEARCH;
}


export type SearchAction = WRITETEXT | INVIS_SEARCHLIST | CANCELSEARCH | CLICKSEARCH

export const FETCHLIST = "FETCHLIST"
export const SUGGESTIONACTIVE = "SUGGESTIONACTIVE"
export const SETLOADING = "SETLOADING"
export const UPDATETEXT = "UPDATETEXT"

export interface SETLOADING {
    type: typeof SETLOADING,
    isLoading: boolean,
}

export interface FETCHLIST {
    type: typeof FETCHLIST,
    list: RANKBYREGION[][],
    query:string,
}

export interface SUGGESTIONACTIVE {
    type: typeof SUGGESTIONACTIVE,
    isActive:boolean,
}

export interface UPDATETEXT {
    type: typeof UPDATETEXT,
    text:string,
}

type SearchMutation = SETLOADING | FETCHLIST | SUGGESTIONACTIVE | UPDATETEXT 
// --- state

export interface SearchState {
    isActive: boolean,
    isLoading:boolean,
    isError:boolean,
    result: RANKBYREGION[][],
    resultQuery:string,
    value:string,
}

export const R6SearchinitialState: SearchState = {
    isActive: false,
    isLoading: false,
    isError: false,
    result: [],
    resultQuery:"",
    value: "",
}

      // return concat(
                //     // of<SearchMutation>({type:"CHANGETEXT", text: action.text}),
                //     // of<SearchMutation>({type:"SETLOADING", isLoading: true}),
                //     this.fetchID(action.text).pipe(
                //       takeUntil( this.action.pipe(filter( value => { 
                //           return value.type === "CANCELSEARCH" || value.type === "WRITETEXT" 
                //         }))),
                //       map<RANKBYREGION[][], SearchMutation>( res => ({type:"FETCHLIST", list : res})),
                //     ),
                // )


export default class R6IDSearchReactor extends Reactor<SearchAction, SearchState, SearchMutation> {
    
    mutate(action: SearchAction): Observable<SearchMutation> {
        switch(action.type) {

            case "WRITETEXT":
                return of({type: "UPDATETEXT", text: action.text})
          
            case "INVIS_SEARCHLIST":
                return  concat(
                        of<SearchMutation>({type:"SETLOADING", isLoading: true}),
                        this.fetchID(action.text).pipe(
                          takeUntil( this.action.pipe(filter( value => { 
                              return value.type === "CANCELSEARCH" || value.type === "INVIS_SEARCHLIST" || value.type === "WRITETEXT"
                            }))),
                          map<RANKBYREGION[][], SearchMutation>( res => ({type:"FETCHLIST", list : res, query:action.text})),
                        ),
                    )

            case "CANCELSEARCH":
                return concat(
                    of<SearchMutation>({type:"SETLOADING", isLoading: false}),
                    of<SearchMutation>({type:"SUGGESTIONACTIVE", isActive: false}),
                )

            case "CLICKSEARCH":
                return concat(
                    of<SearchMutation>({type:"SUGGESTIONACTIVE", isActive: true}),
                )
            }
            
    }

    reduce(state: SearchState, mutation: SearchMutation): SearchState {

        let newState = state;
 
        switch(mutation.type) {

            case "FETCHLIST":
                newState.result = mutation.list
                newState.resultQuery = mutation.query;
                newState.isLoading = false;
                if (mutation.list.length === 0) {
                    newState.isError = true; 
                }
                return newState;

            case "SETLOADING":
                newState.isLoading = mutation.isLoading
                return newState;

            case "SUGGESTIONACTIVE":
                newState.isActive = mutation.isActive
                return newState;

            case "UPDATETEXT":
                newState.value = mutation.text
                return newState;
        }
    }

    fetchID(id: string) {

        return forkJoin(
            R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/uplay/${id}`).pipe(
                catchErrorJustReturn([] as any)
            ),
            R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/xbl/${id}`).pipe(
                catchErrorJustReturn([] as any)
            ),
            R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/psn/${id}`).pipe(
                catchErrorJustReturn([] as any)
            ),
        )
        //: Observable<RANKBYREGION[][]> 
        // return R6StatAPI.shared.getGeneralAPI(id)
        // .pipe(
        //     // delay(500),
        //     // flatAxiosResultAndCast(),
        //     // catchErrorJustReturn([] as any)
        // )
    }

}