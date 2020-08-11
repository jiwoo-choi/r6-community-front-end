import React from "react";
import styled from 'styled-components';
import { ListElementType } from "../../../../Util/Entity";
import Moment from 'react-moment'


const CELLSTYLE = styled.div<{isNotice: boolean}>`
    position: relative;
    background: #fff;
    box-shadow: 2px 2px 3px rgba(34,36,38,.15);
    // margin: 1.5rem 0;
    margin-bottom: 1rem;
    padding: 1em 0;
    border-radius: 0.5rem;
    border: 1px solid rgba(34,36,38,.15);
    height: 100px;
    cursor:pointer;

    transition: all 0.1s ease-in-out;

    &:hover {
        background-color:rgba(0,0,0,.05);
    }
    background: ${ props => props.isNotice ? 'rgb(254,100,111,0.2)' : 'white'};

`
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


const TITLEAREA = styled.div`
    height:100%;
    font-size:1.3rem;
    font-weight:bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width:900px;
    display:flex;
    align-items:center;
`

const CommentCnt = styled.div`
    font-size:1rem;
    font-weight:bold;
    margin-left:8px;
    color:#C4C8D4;
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
//
export default class R6Cell extends React.Component<{data : ListElementType, isNotice:boolean, onClick:()=>void}> {
    
    render(){
        return (
            <>

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
                            {this.props.data.title} &nbsp;
                            {/* <Label as='a' color='teal' tag>
                                Featured
                            </Label> */}

                            {this.props.data.hasImg && <img style={{width:'15px', height:'15px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAlhJREFUWAntVj1rFFEUvc8kmlgYSIhE0EnILiIoiGwVtEhhY2FloxIQxEoRAqKolSBY2FkLSmYiwlqJEAga9AfYWNkIgh9YqLFzPrIzxzvjzpB5e2fe7GaJhRkY9t5z7seZ++a9WaL//VLpAKxFF6m9Fb+fLowkvXdsRbOyHoM6mSrT8X75+qT/+QS2BXS8A9Ja15ewfz307pOiuYQHvRkaGL7xYV59keK7wYxLEDcPQu8d79FzAO1LbrZjLOa6aSbFGgUkT040JiSPtTmBqg4ZBWRjl2qmSyJxFTGzgIqFeg0zC+AXrrB4GVeYlCeMAuK3nVPW8mmJt9bmcpT1JGhM2e7dHFjiGAXEW23nwPBR/nI8VYq+JTfbMaZvw5rtH6EwXAGpazUbe0v6ZlSlc6Dd6HyWJRg1x6u3ouglU+NEoHXlLbB9WwjNQcYJ5KILnBkbVgtY5bNiMg1RpC7PNDGa+kW/mxYw3cRki/xVPqCsjU0AjIZ+cGUjJtmbEnBoEeOR678ioC4VpyhamG1iROTaYM8C+Bje85v8FV7vw0UNeEkmvrr+pSI+xnsS0HiB3XwML3PzRlnxvxyuN95iqCiuawH1Zez6/st/zk93vKiohh/4+d6b17DM7UrA3GsMBj/8Z7zmJ7MKFQxA3bwDiL1EUKoZF/j42XO4+WmJL8N4Rxx85ARnpJhKAriAeuwED3mrnZWKVMEU4ZYUV0nAtOM/AKKLUoGqGD/Esakl75QebxRg2e49Tr6qJ/biI0LH0dzxLdD/t/Ox3r8LdEIvZpyAnrDt93sCfwDCF8+Kx8QM0gAAAABJRU5ErkJggg=="></img>}
                            <CommentCnt>[{this.props.data.commentCnt}]</CommentCnt> 
                        </TITLEAREA>
                        <SUBTITLEAREA>
                            <AUTHOR>{this.props.data.author}</AUTHOR>
                            <TIME><Moment fromNow>{this.props.data.createdTime}</Moment></TIME>
                        </SUBTITLEAREA>
                    </GRIDTITLE>
                </GRIDOUTER>
            </CELLSTYLE>
            </>
        );
    }
}


