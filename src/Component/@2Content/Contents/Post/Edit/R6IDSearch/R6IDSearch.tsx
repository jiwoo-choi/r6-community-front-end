import React from "react";
import './R6IDSearch.css'
import {  Subject, } from "rxjs";
import { debounceTime, map, tap, distinctUntilChanged, skip } from "rxjs/operators";
import {  deepDistinctUntilChanged } from "reactivex-redux";
import R6IDSearchReactor, { R6SearchinitialState, SearchState, SearchAction } from "./R6IDSearchReactor";
import { isError } from "lodash";
import {R6RankIcon} from "../../../../../@Reusable-Component";
import styled from "styled-components";
import { ReactComponent as EmptyBox } from './empty-box.svg'
import { RANKBYREGION, GENERALAPI } from "../../../../../../Util/Entity";
import { Icon } from "semantic-ui-react";
import R6EditorReactor from "../R6EditorReactor";

const RANK_CONTAINER = styled.div`
    display:flex;
    flex-direction:row;
`;

const RANK_PART = styled.div`
    display:flex;
    flex-direction:row;
`;

const CONTENT_PART = styled.div`

    display:flex;
    flex-direction:column;
    justify-content:center;

    #rank {
        font-size:1.5rem;
        color:black;
        margin-bottom:7px;
    }

    #mmr .mmr-tag {
        font-weight:bolder;
        color:black;
    }

    #mmr .mmr-value {
        font-weight:normal;
        color:darkgray;
    }
    
`;



class R6IDSearch extends React.PureComponent<{}, SearchState> {


    reactor?: R6IDSearchReactor;
    subject!: Subject<any>;

    constructor(props:{}) {
        super(props)
        this.state = R6SearchinitialState;
    }

    componentWillMount(){
        this.reactor = new R6IDSearchReactor(R6SearchinitialState);
        this.subject = new Subject();

        this.subject.pipe( 
            distinctUntilChanged(),
            tap ( value => this.reactor?.dispatch({type: "WRITETEXT", text:value })),
            debounceTime(500),
            map( value => ({type:"INVIS_SEARCHLIST", text: value } as SearchAction ))
        ).subscribe(this.reactor?.action)
    }

    componentDidMount(){

        this.reactor?.fetchID("piliot").subscribe(res => console.log(res));

        this.reactor?.state.pipe(
            map((value) => value.isLoading ),
            deepDistinctUntilChanged(),
            skip(1),
        ).subscribe(
            isLoading => this.setState({isLoading})
        )

        this.reactor?.state.pipe(
            map((value) => value.result ),
            deepDistinctUntilChanged(),
            skip(1),
        ).subscribe(
            result => this.setState({result})
        )

        this.reactor?.state.pipe(
            map((value) => value.isError ),
            deepDistinctUntilChanged(),
            skip(1),
        ).subscribe(
            isError => this.setState({isError})
        )

        this.reactor?.state.pipe(
            map((value) => value.isActive ),
            deepDistinctUntilChanged(),
            skip(1),
        ).subscribe(
            isActive => this.setState({isActive})
        )

        this.reactor?.state.pipe(
            map((value) => value.value ),
            deepDistinctUntilChanged(),
            skip(1),
        ).subscribe(
            value => this.setState({value})
        )

        this.reactor?.state.pipe(
            map((value) => value.resultQuery ),
            deepDistinctUntilChanged(),
            skip(1),
        ).subscribe(
            resultQuery => this.setState({resultQuery})
        )


    }

    getCell(list : RANKBYREGION[][]) {   
        let lists = ["PC","PS4","XBOX"];
        return list.map( (value, index) => {
            if (value.length > 0) {
                return (
                    //this.props.reactor?.dispatch({type:"SELECTRANK", data: value[0]})
                    <div className="autocomplete-cell" key={"CELL_"+index} onMouseDown={()=>{}}> 
                        <div className="tag">
                            {lists[index]} 서버 
                        </div>
                        <div className="rank-description">
                        <RANK_CONTAINER>
                            <RANK_PART>
                                <R6RankIcon rank={value[0].rankStat.rankString} size={70}></R6RankIcon>
                            </RANK_PART>
                            <CONTENT_PART>
                                <div id="rank">{value[0].rankStat.rankString}</div> 
                                <div id="mmr">
                                    <span className="mmr-tag"> MMR : </span>
                                    <span className="mmr-value" style={{marginRight:'5px'}}>{value[0].rankStat.mmr}</span>
                                    <span className="mmr-tag"> W - </span>
                                    <span className="mmr-value" style={{marginRight:'5px'}}>{value[0].rankStat.wins}</span>
                                    <span className="mmr-tag"> L - </span>
                                    <span className="mmr-value">{value[0].rankStat.death}</span>
                                </div> 
                            </CONTENT_PART>
                        </RANK_CONTAINER>
                        </div>
                    </div>
                    )
            } else {
                return []
            }
         })
    }

    getList(list: RANKBYREGION[][], text: string, isLoading: boolean, resultQuery:string) {

        if (!text || (text && !resultQuery && !isLoading)) {
            return( 
                <div className="search-result">
                    <span role="img" aria-labelledby="hello"> 👋 레인보우 식스 시즈 전적검색창 입니다. </span>
                    <div> 바로 검색하여 본인의 전적내용을 추가해보세요. </div>
                    <div> Powered by R6-search.me </div>
                </div>                    
            )
        }

        if (isLoading) {
            return(
                <React.Fragment>
                    <div className="loading-container">
                        <svg className="loading-circle">
                            <circle cx="50%" cy="50%" r="25"></circle>
                        </svg>
                        <div className="search-loading"> "{text}" 를 R6-Search에서 검색중...</div>
                    </div>
                </React.Fragment>
            )
        }

        if ( (list.filter( value => value.length === 0 ).length === 3) && resultQuery) {
            return (
                <div className="search-empty">
                    <EmptyBox style={{height:"120px", width:"100%"}}></EmptyBox>
                    <div> "{resultQuery}" 님의 검색결과가 없습니다! </div>
                    <div> 검색어를 확인해주세요. </div>
                </div> 
            )
        }

        return (
            <>  
                <div className="search-result">
                    <div> "{resultQuery}" 님의 검색결과 입니다. </div>
                    <div> 클릭하여 전적을 추가하세요.  </div>
                    <div> Powered by R6-search.me </div>
                </div>
                {this.getCell(list)}
            </>
        )
        
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.subject.next(event.target.value)
    }

    render(){
        if (!this.props) {
            console.warn('R6IDSEARCH NOT LOADED')
            return null
        } else {

            const localReactor = this.reactor!;
            const { value , result, isLoading, resultQuery, isActive } = localReactor.currentState;

            return(
                <>
                    <div className="search-input">
                        <Icon name={"search"} size={"big"} className={"search-input-icon"} color={"green"}></Icon>
                        <input 
                            className="r6idsearch"
                            placeholder="전적을 바로 검색해보세요."
                            // onChange
                            onFocus={()=>{localReactor.dispatch({type:"CLICKSEARCH"})}}
                            onBlur={()=>{localReactor.dispatch({type:"CANCELSEARCH"})}}
                            value={value}
                            onChange={this.handleChange.bind(this)}
                            />
                            { isActive && 
                                <div className="cellContainer">
                                    {
                                        this.getList(result, value, isLoading, resultQuery)
                                    }
                                </div> 
                            } 
                    </div>
    
                </>
            )
        }
    }
}
export default R6IDSearch

        // this.reactor?.state.pipe(
        //     map((value) => value.isLoading ),
        //     deepDistinctUntilChanged(),
        // ).subscribe(
        //     isLoading => this.setState({isLoading})
        // )

        // this.reactor?.state.pipe(
        //     map((value) => value.result ),
        //     deepDistinctUntilChanged(),
        // ).subscribe(
        //     result => this.setState({result})
        // )

        // this.reactor?.state.pipe(
        //     map((value) => value.isError ),
        //     deepDistinctUntilChanged(),
        // ).subscribe(
        //     isError => this.setState({isError})
        // )

        // this.reactor?.state.pipe(
        //     map((value) => value.isActive ),
        //     deepDistinctUntilChanged(),
        // ).subscribe(
        //     isActive => this.setState({isActive})
        // )

        // this.reactor?.state.pipe(
        //     map((value) => value.value ),
        //     deepDistinctUntilChanged(),
        // ).subscribe(
        //     value => this.setState({value})
        // )

        // this.reactor?.state.pipe(
        //     map((value) => value.resultQuery ),
        //     deepDistinctUntilChanged(),
        // ).subscribe(
        //     resultQuery => this.setState({resultQuery})
        // )


// this.getList([], this.state.value , this.state.isLoading, this.state.isActive)


  
 