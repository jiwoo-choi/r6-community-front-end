import { observable, computed, action, toJS} from "mobx";
import { SearchResultProps } from "semantic-ui-react";
import { RANKBYREGION, RANKAPI } from "../../../../../../Util/Entity";
import R6Ajax from "../../../../../../Library/R6Ajax";
import { forkJoin, Subject, Observable, of, ConnectableObservable, Subscription } from "rxjs";
import { catchError, switchMap, publishReplay, publish, refCount, share, distinctUntilChanged, debounceTime, tap, filter } from "rxjs/operators";

export interface SearchResultFormat extends SearchResultProps {
    /// 키
    title : string;
    /// rankTitle : 
    rankstring : string;
    /// platform : 
    platform : string;
    /// mmr : 
    mmr: string;

    rankdata: RANKAPI
}

export default class IDSearchStore {

    @observable results : (RANKBYREGION[])[]= []
    @observable searchText = ""
    @observable isLoading :boolean = false;    
    @observable resultQuery : string = "";
    @observable result : RANKBYREGION[][] = [];
    @observable isActive : boolean = false;

    search: Subject<string> = new Subject<string>();
    private _searchStream : Subscription;

    constructor(){
        this._searchStream = this.searchStream();
    }

    @action setText(text: string | undefined) {
        if (text) {
            this.searchText = text;
        } else {
            this.searchText = "";
        }
    }

    

    @action setActive(on:boolean){
        this.isActive = on;
    }

    unsubscribe(){
        this._searchStream.unsubscribe();
    }

    private searchStream() {
        return this.search.pipe(
            filter((value) => value !== ""),
            distinctUntilChanged(),
            debounceTime(500),
            tap( () => {
                this.isLoading = true;
                this.resultQuery = this.searchText;
            }),
            switchMap( id => 
                forkJoin(
                    R6Ajax.shared.getJson<RANKBYREGION[]>(`http://r6-search.me/api/stat/rank/uplay/${id}`)
                    .pipe(
                        catchError(err => of<RANKBYREGION[]>([]))
                    ),
                    R6Ajax.shared.getJson<RANKBYREGION[]>(`http://r6-search.me/api/stat/rank/psn/${id}`)
                    .pipe(
                        catchError(err => of<RANKBYREGION[]>([]))
                    ),
                    R6Ajax.shared.getJson<RANKBYREGION[]>(`http://r6-search.me/api/stat/rank/xbl/${id}`)
                    .pipe(
                        catchError(err => of<RANKBYREGION[]>([]))
                    ),
                )
            ),
        ).subscribe(
            res => {
                this.result = res
                this.isLoading = false;
            }
        )
    }


    // @action search(id: string) : Observable<string> {
    //     this.searchLoading = true;
    //     // this.subject.subscribe(
    //     //     res => console.log(res)
    //     // )

    //     return forkJoin()
    //         switchMap(
    //             id => forkJoin(
    //                 R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/uplay/${id}`).pipe(
    //                     catchError(err => [] as any)
    //                 ),
    //                 R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/xbl/${id}`).pipe(
    //                     catchError(err => [] as any)
    //                 ),
    //                 R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/psn/${id}`).pipe(
    //                     catchError(err => [] as any)
    //                 )
    //             )
    //         )
    //     )



    //     // forkJoin(
    //     //     R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/uplay/${id}`).pipe(
    //     //         catchError(err => [] as any)
    //     //     ),
    //     //     R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/xbl/${id}`).pipe(
    //     //         catchError(err => [] as any)
    //     //     ),
    //     //     R6Ajax.shared.getJson(`http://r6-search.me/api/stat/rank/psn/${id}`).pipe(
    //     //         catchError(err => [] as any)
    //     //     )
    //     // ).pipe(
    //     //     //takeUntil..
    //     //     switchMap( res => )
    //     // )
    //     // this.API.getGeneralAPI(id)
    //     // .subscribe( res =>  {
    //     //     this.results = res
    //     //     this.searchLoading = false;
    //     // })
        

    // }

}
