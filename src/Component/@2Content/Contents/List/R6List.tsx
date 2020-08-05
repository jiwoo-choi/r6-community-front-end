import React from "react"
import { Placeholder, Segment } from "semantic-ui-react";
import { ForumReactorProps, Topic, ForumState, ForumReactorProp, ForumStateInitialState } from "../../../@0ForumReactor/ForumReactor"
import R6Cell from "./R6Cell";
import { ListType } from "../../../../Util/Entity";
import { withReactor, DisposeBag } from "reactivex-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { map, distinctUntilChanged, skip } from "rxjs/operators";
import R6ListFooter from "./R6ListFooter";

export class R6List extends React.PureComponent<ForumReactorProp & RouteComponentProps, ForumState>{

    disposeBag : DisposeBag | null = new DisposeBag();
    
    constructor(props:any) {
        super(props);
        this.state = this.props.reactor.getState();
    }

    componentDidMount(){

        this.disposeBag!.disposeOf = this.props.reactor.state.pipe(
            map( res=> res.topic ),
            distinctUntilChanged()
        ).subscribe(
            res => this.props.reactor.dispatch({type:"TOPICLISTREQUSET", newTopic : res})
        )
        
        this.disposeBag!.disposeOf = this.props.reactor.state.pipe(
            map( res => res.isLoading) ,
            distinctUntilChanged(),
        ).subscribe(
            isLoading => this.setState({isLoading})
        )

        this.disposeBag!.disposeOf = this.props.reactor.state.pipe(
            map( res => res.list) ,
            distinctUntilChanged(),
            skip(1),
        ).subscribe(
            list => this.setState({list})
        )

        this.disposeBag!.disposeOf = this.props.reactor.state.pipe(
            map( res => res.isError) ,
            distinctUntilChanged(),
            skip(1),
        ).subscribe(
            isError => this.setState({isError})
        )
    }

    componentWillUnmount(){
        this.disposeBag!.unsubscribe();
        this.disposeBag = null;
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

        let pathname = this.props.location.pathname === "/" ? "/free" : this.props.location.pathname

        let cell = [];
        for (let i = 0 ; i < cellData.length ; i++) {
            cell.push( 
                <R6Cell onClick={ ()=>{
                    this.props.reactor.dispatch({type:"SETPAGENO", pageId: cellData[i].postId})
                    this.props.history.push(`${pathname}/post/${cellData[i].postId}`)
                }} isNotice={cellData[i].notice} key={this.state.topic+"_CELL_"+i} data={cellData[i]}/>
            )
        }
        return cell
    }
    
    render(){

        const { isLoading, list, isError } = this.state;

        if ( isLoading  ) {
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
                    <R6ListFooter></R6ListFooter>
                </>
            )
        }
    }
}

export default withRouter(R6List);
// export default withRouter(withReactor(R6List, (state) => ({isLoading: state.isLoading, list: state.list, isError: state.isError})));


