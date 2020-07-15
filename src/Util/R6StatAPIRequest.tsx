
import axios from 'axios';
import { Observable } from 'rxjs';



export function APIRequest<T>(url: string) {
    //url & query.
    //https://medium.com/@enetoOlveda/how-to-use-axios-typescript-like-a-pro-7c882f71e34a
    /**
     * let url = "https://www.googleapis.com/youtube/v3/search?";
        for(let [key, value] of Object.entries(optionParams)) {
            url+=key+"="+ value+"&";
        }
        //https://github.com/heejongahn/tinkerbell-template/blob/public/src/remotes/index.ts
    url=url.substr(0, url.length-1);
    //https://github.com/jiwoo-choi/coin-karaoke/blob/master/src/KaraokeUtils/YoutubeDataApi.tsx
     */
    //
        // const query: { [key: string]: any } = {
        //     filter: constructFilterQueryParam(candidate),
        //     pageSize: 100,
        //     pageIndex: 1,
        // };

    return new Observable<T>( (observer) => {
        axios.get<T>(url, {
            headers: { 'content-type': 'application/json' },
        }).then(
            response=> {
                observer.next(response.data);
                observer.complete();
            }
        ).catch(
            err=>observer.error(err)
        )
    
    })
}