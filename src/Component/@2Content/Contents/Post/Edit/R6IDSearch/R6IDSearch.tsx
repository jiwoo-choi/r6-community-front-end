import React from "react";
import './R6IDSearch.css'
import {  from, Subscription, } from "rxjs";
import {R6RankIcon} from "../../../../../@Reusable-Component";
import styled from "styled-components";
import { ReactComponent as EmptyBox } from './empty-box.svg'
import { RANKBYREGION, RANKAPI } from "../../../../../../Util/Entity";
import { Icon } from "semantic-ui-react";
import IDSearchStore from "./IDSearchStore";
import { toStream } from 'mobx-utils';
import { observer } from "mobx-react";

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

interface Props {
    dataClicked: (data: RANKAPI, platform: string, id : string) => void;
    store: IDSearchStore;
}
  

@observer
class R6IDSearch extends React.PureComponent<Props> {

    subscription! : Subscription;

    componentDidMount() {
        this.subscription = from(toStream(() => this.props.store.searchText))
        .subscribe(this.props.store.search)
    }

    componentWillUnmount(){
        this.props.store.unsubscribe();
        this.subscription.unsubscribe();
    }

    getCell(list : RANKBYREGION[][]) {   
        let lists = ["PC","PS4","XBOX"];
        return list.map( (value, index) => {
            if (value.length > 0) {
                return (
                    <div className="autocomplete-cell" key={"CELL_"+index} onMouseDown={()=>{ 
                        this.props.dataClicked(value[0].rankStat, lists[index], this.props.store.resultQuery);
                        }}> 
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
        this.props.store.setText(event.target.value);
    }

    handleFoucs(){
        this.props.store.setActive(true);
    }

    handleBlur(){
        this.props.store.setActive(false);
    }

    
    render(){
        const { searchText, isActive, result, isLoading, resultQuery } = this.props.store;
            return(
                <>
                    <div className="search-input">
                        <Icon name={"search"} size={"big"} className={"search-input-icon"} color={"green"}></Icon>
                        <input 
                            className="r6idsearch"
                            placeholder="전적을 바로 검색해보세요."
                            onFocus={this.handleFoucs.bind(this)}
                            onBlur={this.handleBlur.bind(this)}
                            value={searchText}
                            onChange={this.handleChange.bind(this)}
                            />
                            { isActive && 
                                <div className="cellContainer">
                                    {
                                        this.getList(result, searchText, isLoading, resultQuery)
                                    }
                                </div> 
                            } 
                    </div>
    
                </>
            )
    }
    
}
export default R6IDSearch
