import React from "react";
import styled from 'styled-components';
import { Placeholder, Segment } from "semantic-ui-react";
import { ListType } from "../../../Util/Entity";
import Moment from 'react-moment'

const CELLSTYLE = styled.div<{isNotice: boolean}>`
    position: relative;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    margin: 1rem 0;
    padding: 1em 0;
    border-radius: .28571429rem;
    border: 1px solid rgba(34,36,38,.15);
    height: 100px;
    cursor:pointer;
    &:hover {
         background-color:rgba(0,0,0,.05);
    }

    background: ${ props => props.isNotice ? 'rgba(254, 100, 111, 0.1)' : 'white'};

`

//table?
//grid?

const GRIDOUTER = styled.div`
    overflow:hidden;
    display:grid;
    grid-template-columns:80px 1fr;
    width:100%;
    height:100%;
`;

const GRIDTITLE = styled.div`
    display:grid;
    align-items:center;
    grid-template-rows:1fr 1fr;
  `
//    
//    width:100%;
//height:100%;
//    // 


const TITLEAREA = styled.div`
    font-size:1.5rem;
    font-weight:bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width:900px;
`
//overflow-hidden
 

const SUBTITLEAREA = styled.div`
    display:flex;
    flex-direction:row;
    font-size:1.1rem;
`

const AUTHOR = styled.div`
    font-weight:bold;
    margin-right:0.8em;

`

const TIME = styled.div`
    font-size:1rem;
    color:#A9A9A9;
`

const RECOMMENDEDFLEX = styled.div<{isNotice: boolean}>`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-evenly;

    img {
        width: ${ props => props.isNotice ? '30px' : '20px'};
        height: ${ props => props.isNotice ? '30px' : '20px'};
    }
`

export default class R6Cell extends React.Component<{data : ListType, isNotice:boolean, onClick:()=>void}> {
    
    render(){
        return(
            <CELLSTYLE onClick={this.props.onClick} isNotice={this.props.isNotice}>
                <GRIDOUTER>
                    <RECOMMENDEDFLEX isNotice={this.props.isNotice}>
                        { (!this.props.isNotice) ?
                         (
                            <>
                                <img src={require('./icon-vote-up.png')}></img>
                                <div> {this.props.data.recommendCnt} </div>
                            </>
                        ) : 
                        (
                            <>
                            <img src={require('./tack.png')}></img>
                            </>
                        )
                        }

                    </RECOMMENDEDFLEX>
                    <GRIDTITLE>
                        <TITLEAREA>
                            {this.props.data.title} 
                        </TITLEAREA>
                        <SUBTITLEAREA>
                            <AUTHOR>{this.props.data.author}</AUTHOR>
                            <TIME><Moment fromNow>{this.props.data.createdTime}</Moment></TIME>
                        </SUBTITLEAREA>
                    </GRIDTITLE>
                </GRIDOUTER>
            </CELLSTYLE>
        )
    }
}


/**
 * 
 *     height:80px;
    margin-bottom:10px;
    background-color:white;
    width:100%;
    border:black 1px solid;
    border: 1px solid rgba(34,36,38,.15);
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    cursor:pointer;
    &:hover {
         background-color:rgba(0,0,0,.05);
    }

 */