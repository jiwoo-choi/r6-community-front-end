import React from "react"
import { Placeholder, Segment } from "semantic-ui-react";
import ForumReactor, { ForumReactorProps } from "../../@Forum/ForumReactor";
import R6Cell from "./R6Cell";
import { ListType } from "../../../Util/Entity";
import { DisposeBag } from "../../../ReactorKit/DisposeBag";
import ReactiveView  from "../../../ReactorKit/withReactor";
import withReactor from "../../../ReactorKit/withReactor";

export class R6List extends React.PureComponent<ForumReactorProps>{

    // constructor(props: {
    //     reactor?: ForumReactor
    //     initialState?: ForumState
    // }) {
    //     super(props);
    //     // this.state = this.props.reactor?.currentState!;
    // }

    disposeBag!: DisposeBag;

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

    public getList( cellData : ListType[]){
        let cell = [];
        for (let i = 0 ; i < cellData.length ; i++) {
            cell.push( 
                <R6Cell onClick={this.props.dispatcher!({type:"CLICKPOST",postId: cellData[i].postId})} isNotice={cellData[i].notice} key={"CELL_"+i} data={cellData[i]}/>
            )
        }
        return cell
    }
    
    render(){
        const { isLoading, list, isError } = this.props.getState!();

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
    //     if (this.state.isLoading) {
            // return(
            //     <>  
            //     <div> {this.state.topic} 로딩 </div>
            //     {this.getDummy(5)}
            //     </>
            // )   
    //     } else if (this.state.list.length === 0 && this.state.isError === true) {
    //         return(
    //             <>
    //             에러
    //             {/* <R6Cell > 에러 </R6Cell> */}
    //             </>
    //         )
    //     }
    //     else {
    //         return (
    //             <>
    //             <div> {this.state.topic}  출력완료 ! </div>
    //             {this.getList(this.state.list)}
    //             </>
    //         )
    //     }
    // }
        
}
//height : 125px;

export default withReactor(R6List);

