import { observable, computed, action, toJS} from "mobx";
import { RANKBYREGION, RANKAPI } from "../../Util/Entity";
import { R6StatAPI } from "../../Library/R6StatAPI";
import { SearchResultProps } from "semantic-ui-react";

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

export default class R6IDSearchStore {

    @observable results : (RANKBYREGION[])[]= []
    @observable searchText = ""
    @observable searchLoading = false;

    API = new R6StatAPI();
    
    @computed get resultParsed() {

        let lists = ["PC","PS4","XBOX"];
        return toJS(this.results).reduce((prev, curr, index) => {
            if (curr.length > 0) {
                const rankapi = curr[0].rankStat; 
                const data : SearchResultFormat = { 
                    title : "RESULT_" + index.toString(),
                    platform : lists[index],
                    rankstring : rankapi.rankString,
                    mmr: rankapi.mmr.toString(),
                    rankdata: rankapi,
                }
                prev.push(data)
                return prev;
            } else {
                return prev;
            }
        }, [] as SearchResultFormat[])
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
        .subscribe( res =>  {
            this.results = res
            this.searchLoading = false;
        })
        

    }

}