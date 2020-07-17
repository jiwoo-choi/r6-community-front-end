import R6IDSearchStore from "./R6IDSearchStore";
import moxios from 'moxios'
import {API} from '../Library/API'
import { stringify } from "querystring";
import {RANKBYREGION} from '../Util/Entity'
import { when } from "mobx";
import { doesNotReject } from "assert";
import { R6StatAPI } from "../Util/R6StatAPI";
import { map } from "rxjs/operators";
import { catchErrorJustReturn } from "../Library/RxJsExtension";
import { forkJoin } from "rxjs";

describe('R6IDSearchStore Test', () => {

    let store : R6IDSearchStore;
    let api : R6StatAPI;

    let mockdata : string = JSON.stringify(
        [
            {
                region: "global",
                rankStat: {
                    "maxMmr": 0,
                    "death": 0,
                    "rank": 0,
                    "maxRank": 0,
                    "kills": 0,
                    "abandons": 0,
                    "mmr": 2500,
                    "wins": 0,
                    "region": "ncsa",
                    "season": 17,
                    "losses": 0,
                    "createdTime": "2020-05-19T18:19:30.0502837",
                    "maxRankString": "UNRANK",
                    "rankString": "UNRANK",
                    nextRankMmr : 100,
                    nextRankString : "ABC",                
                }
            }
        ] as RANKBYREGION[]
    )




    // let mockdataStringfied = stringify(mockdata);

    beforeEach( () => {
        store = new R6IDSearchStore();
        api = new R6StatAPI();
        store.API = api;
        moxios.install(api.api);
    })

    afterEach( () => {
        moxios.uninstall(api.api);
    })

    it('TEST 1 : store search input change test', () => {
        store.changeSearchText('123')
        expect(store.searchText).toBe("123")
    })

    it('TEST 2 : action test', done => {
    
        moxios.stubRequest("http://r6-search.me/api/v1/rank/uplay/piliot",{ status:200, responseText: mockdata})
        moxios.stubRequest("http://r6-search.me/api/v1/rank/psn/piliot",{ status:400, responseText: mockdata})
        moxios.stubRequest("http://r6-search.me/api/v1/rank/xbl/piliot",{ status:400, responseText: mockdata})
        store.search("piliot");
        when( () => store.results.length === 3 , 
            () => {
                expect(store.resultParsed.length).toBe(1)
                done();
            }
        )

        // const requests = ["uplay","psn","xbl"].map( (value) => {
        //     let url = "http://r6-search.me/api/v1/rank/" + value + "/" + "piliot"
        //     return api.get<RANKBYREGION[]>(url)
        //     .pipe(
        //         map(api.success),
        //         catchErrorJustReturn([] as RANKBYREGION[]),
        //     )   
        // })
        
        // forkJoin(requests).subscribe( res => {
        //     console.log(res)
        // })
        // store.search('piliot')

        // setTimeout( () => {
        //     console.log(store.results);
        // }, 400);
        // when( 
        //     ()=> store.results !== [],
        //     () => {
        //         console.log(store.results);
        //         expect(store.results).toBe("123");
        //     })
        // store.search('123')
        // expect(action).toBe("123")
    })

    //searchloadingtest
    // it('INTEGRATED TEST : action test', () => {
    //     expect(store.searchText).toBe("123")
    // })


    // it('test1', () => {
    //     moxios.stubRequest("http://www.somesite.com/awesome-url",{ status:200, responseText: "adf"})
    //     api.get('http://www.somesite.com/awesome-url')
    //     .subscribe( res => console.log(res));

        
    // })
  

})


// describe("TodoStore", () => {
//     it("creates new todos", () => {
//         store.changeSearchText("123")
//         expect(store.searchText).toBe("123")
//     })
// })