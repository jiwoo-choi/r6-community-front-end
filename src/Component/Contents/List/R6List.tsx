import React from "react"
import { Placeholder, Segment } from "semantic-ui-react";
import ForumReactor, { ForumState } from "../../@Forum/ForumReactor";
import { map, debounceTime } from "rxjs/operators";
import { deepDistinctUntilChanged } from "../../../Library/RxJsExtension";
import R6Cell from "./R6Cell";
import { ListType } from "../../../Util/Entity";
import { DisposeBag } from "../../../ReactorKit/DisposeBag";
import ReactiveView, { ReactorView } from "../../../ReactorKit/ReactiveView";
import R6EditorReactor, { EditorinitialState } from "../Post/Edit/R6EditorReactor";

export class R6List extends React.PureComponent<{
    reactor?: ForumReactor
}>{

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
                <R6Cell isNotice={cellData[i].notice } key={"CELL_"+i} data={cellData[i]}/>
            )
        }
        return cell
    }


    
    render(){
        const { isLoading, list, isError, topic } = this.props.reactor?.currentState!;

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
                    <div> {topic}  출력완료 ! </div>
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

export default ReactiveView(R6List);



    // componentDidMount(){
        
    //     this.disposeBag = new DisposeBag();
    //     this.disposeBag.disposeOf = this.props.reactor?.state.pipe(
    //         map( res => {
    //             return res.list
    //         }),
    //         deepDistinctUntilChanged(),
    //     ).subscribe(
    //         list => {
    //             console.log(list);
    //             this.setState({list})
    //         }
    //     )

    //     this.disposeBag.disposeOf = this.props.reactor?.state.pipe(
    //         map( res =>  res.isError ),
    //         deepDistinctUntilChanged(),
    //     ).subscribe(
    //         isError => this.setState({isError})
    //     )

    //     this.disposeBag.disposeOf = this.props.reactor?.state.pipe(
    //         map( res =>  {
    //             // console.log("ISLOADING CALLED", res);
    //             return res.isLoading
    //         } ),
    //         deepDistinctUntilChanged(),
    //     ).subscribe(
    //         isLoading => {
    //             this.setState({isLoading})
    //         }
    //     )

    //     this.disposeBag.disposeOf = this.props.reactor?.state.pipe(
    //         map( res =>  res.topic ),
    //         deepDistinctUntilChanged(),
    //     ).subscribe(
    //         topic => this.setState({topic})
    //     )

    // }
    
    // componentWillUnmount(){
    //     this.disposeBag.unsubscribe();
    // }
