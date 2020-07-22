import React from "react"
import R6Cell from "./R6Cell"
import { fromEventWithEmitter, HTMLElementSubject } from "../../ReactorKit/sendAction"
import ReactiveView, { ReactorView } from "../../ReactorKit/ReactiveView"
import { DisposeBag } from "../../ReactorKit/DisposeBag"
import { Reactor } from "../../ReactorKit/Reactor"
import { map, distinctUntilChanged } from "rxjs/operators"
import { deepDistinctUntilChanged } from "../../Library/RxJsExtension"
import { R6StatAPI } from "../../Library/R6StatAPI"
import ForumReactor, { ForumState, ForumAction } from "./ForumReactor"

type CellType = "cell" | "grid"
type TableType = "grid" | "list"
type ForumType = "tips" | "free" | "together" | "clan"

    
interface ListData {
    /// post number
    postId: number,
    /// 추천수
    recommendCnt: number,
    /// 조회수
    viewCnt: number, 
    /// 올린시간
    createdTime: Date,
    /// 제목
    title: string, 
    /// 글쓴이
    author: string, 
    /// 이미지 존재 여부
    hasImg: boolean,
    /// 공지 여부
    notice: boolean,
}


interface TableProps {
    cellType: CellType,
    tableType: TableType,
}

export class R6Table extends React.Component<{}, ForumState> implements ReactorView<ForumReactor> {

    button?: HTMLElementSubject;
    reactor?: ForumReactor | undefined

    constructor(props:{}){
        super(props);
        this.state = {
            isError: false,
            isLoading: false,
            page: 1,
            mode:"list",
            topic:"clan",
            post: undefined,
            list:[],
        }
    }

    componentDidMount(){
        this.reactor =  new ForumReactor(this.state);
    }

    bind(reactor: ForumReactor): DisposeBag {
        console.log("bind");
        let disposeBag = new DisposeBag();

        disposeBag.disposeOf = reactor?.state.pipe(
            map(res => res.mode),
            deepDistinctUntilChanged()
        ).subscribe( mode => this.setState({mode}))

        return disposeBag;
    }

  
    render(){
        //r6 editor.. rx select!
        return(
            <>
            <button onClick={()=>{this.reactor?.action.next({type:"CLICKBACK"})}}></button>
            </>
        )
    }
        
}

export default ReactiveView(R6Table);
