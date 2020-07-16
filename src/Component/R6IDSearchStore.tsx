import { observable, computed, action, values, entries, toJS} from "mobx";
import { toStream, fromStream } from "mobx-utils";

import * as Rx from 'rxjs'
import { GENERALAPI, BasicErrorFormat, SearchResultCategoryType, RANKAPI, RANKBYREGION, SearchResultType } from "../Util/Entity";
import { R6StatAPI } from "../Util/R6StatAPI";
import { flatMap, finalize, catchError, map, retry, switchMap } from "rxjs/operators";
import { of } from "rxjs";

export default class R6IDSearchStore {
    
    @observable results : (RANKBYREGION[]|BasicErrorFormat)[]= []
    @observable searchText = ""
    @observable searchLoading = false;

    API = new R6StatAPI();
    
    @computed get resultParsed() {

        let lists = ["PC","플레이스테이션","엑스박스"];
        return toJS(this.results).reduce((prev, curr, index) => {
            if ((curr as BasicErrorFormat).status) {
                return prev;
            } else {
                const rankapi = (curr as RANKBYREGION[])[0] 
                const data = {"title" : "SEARCH_"+index.toString() , "description": lists[index], "rankstring" : rankapi.rankStat.rankString, "rankdata": rankapi.rankStat}
                prev.push(data)
                return prev;
            }
        }, [] as any[])
    }

    @action changeSearchText(text: string | undefined) {
        if (text) {
            this.searchText = text;
            
        } else {
            this.searchText = "";
        }
    }

    @action search(id: string) {

        this.searchLoading = true;
        this.API.getGeneralAPI(id)
        .pipe(
            retry(1),
            switchMap( (value) => {
                if(value) {
                    return of(value)
                } else {
                    return of([])
                }
            })
        )
        .subscribe( res =>  {
            this.results = res
            this.searchLoading = false;
        })
    }

}