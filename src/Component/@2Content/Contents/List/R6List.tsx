import React from "react"
import { Placeholder, Segment } from "semantic-ui-react";
import { ForumReactorProps, Topic } from "../../../@0ForumReactor/ForumReactor"
import R6Cell from "./R6Cell";
import { ListType } from "../../../../Util/Entity";
import { withReactor } from "reactivex-redux";
import { withRouter } from "react-router-dom";

export class R6List extends React.PureComponent<ForumReactorProps>{

    componentDidMount(){
    }

    public getDummy( numberOfCells : number){
        let dummy = [];
        for (let i = 0 ; i < numberOfCells; i++) {
            dummy.push( 
                <Segment key={"DUMMY_"+i}>
                    <Placeholder fluid>
                    <Placeholder.Line length={"full"}/>
                    <Placeholder.Line length={"long"}/>
                    <Placeholder.Line length={"short"}/>
                    <Placeholder.Line length={"very long"}/>
                    </Placeholder>
                </Segment>
            )
        }
        return dummy
    }

    public getList( cellData : ListType[]) {
        let cell = [];
        for (let i = 0 ; i < cellData.length ; i++) {
            cell.push( 
                <R6Cell onClick={ this.props.reactor_control.dispatcher({type:"CLICKPOST", postId: cellData[i].postId})} isNotice={cellData[i].notice} key={"CELL_"+i} data={cellData[i]}/>
            )
        }
        return cell
    }
    
    render(){
        const { isLoading, list, isError } = this.props.reactor_control!.getState();
        if ( isLoading ) {
            return (
                <>  
                    {this.getDummy(5)}
                </>
                )
            } else if (list.length === 0 && isError) { 
                return <div> 에러 </div>
            } else {
                return (
                    <>
                        {this.getList(list)}
                    </>
                )
            }
    } 
}
export default withReactor(R6List, (state) => ({isLoading: state.isLoading, list: state.list, isError: state.isError}));


