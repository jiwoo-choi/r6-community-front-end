import React from "react"
import { Placeholder, Segment } from "semantic-ui-react";
import R6Cell from "./R6Cell";
import { ListElementType } from "../../../../Util/Entity";
import R6ListFooter from "./R6ListFooter";
import { inject, observer } from "mobx-react";
import ForumStore from "../../../Stores/ForumStore";


interface Props { 
    forum? : ForumStore
}

@inject('forum')
@observer
export class R6List extends React.PureComponent<Props>{

    componentDidMount(){
        this.props.forum?.getList();
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
    
    handleCell(postId: number){
        this.props.forum?.goPost(postId)
    }
    
    public getList( cellData : ListElementType[]) {
        let cell = [];
        for (let i = 0 ; i < cellData.length ; i++) {
            cell.push( 
                <R6Cell onClick={ ()=>{ this.handleCell(cellData[i].postId)}} isNotice={cellData[i].notice} key={this.props.forum?.topic +"_CELL_"+i} data={cellData[i]}/>
            )
        }
        return cell
    }
    
    render(){

        const { list, isLoading, isError } = this.props.forum!;

        if ( isLoading  ) {
        return (
            <>  
                {this.getDummy(5)}
            </>
            )
        } else if (isError) {
            return <div>에러</div>
        } else {
            return (
                <>
                    {this.getList(list)}
                    <R6ListFooter ></R6ListFooter>
                </>
            )
 
        }

    }
}

export default R6List;


