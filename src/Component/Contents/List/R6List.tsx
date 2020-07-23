import React from "react"
import { Placeholder, Segment } from "semantic-ui-react";
import ForumReactor, { ForumState } from "../../@Forum/ForumReactor";
import { map } from "rxjs/operators";
import { deepDistinctUntilChanged } from "../../../Library/RxJsExtension";

export class R6List extends React.PureComponent<{
    reactor?: ForumReactor
    initialState?: ForumState
}, ForumState> {


    constructor(props: {
        reactor?: ForumReactor
        initialState?: ForumState
    }) {
        super(props);
        this.state = this.props.initialState!;
    }

    componentDidMount(){

        this.props.reactor?.state.pipe(
            map( res =>  res.list),
            deepDistinctUntilChanged(),
        ).subscribe(
            list => this.setState({list})
        )

        this.props.reactor?.state.pipe(
            map( res =>  res.isError ),
            deepDistinctUntilChanged(),
        ).subscribe(
            isError => this.setState({isError})
        )
    }
    
    public getDummy( numberOfCells : number){

        let dummy = [];
        for (let i = 0 ; i < numberOfCells; i++) {
            dummy.push( 
                <Segment key={"DUMMY_"+i}>
                    <Placeholder fluid>
                    <Placeholder.Line length={"full"}/>
                    <Placeholder.Line length={"short"}/>
                    <Placeholder.Line length={"long"}/>
                    <Placeholder.Line length={"short"}/>
                    <Placeholder.Line length={"very long"}/>
                    </Placeholder>
                </Segment>
            )
        }

        return dummy
    }

    
    render(){

        if (this.state.list.length === 0 && this.state.isError === false) {
            return(
                <>  
                <div> 로딩 </div>
                {this.getDummy(5)}
                </>
            )   
        } else if (this.state.list.length === 0 && this.state.isError === true) {
            return(
                <div> 에러났습니다! </div>
            )
        }
        else {
            return (
                <div> 출력! </div>
            )
        }
    }
        
}
//height : 125px;

export default R6List;
