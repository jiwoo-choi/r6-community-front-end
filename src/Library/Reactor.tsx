import { Observable, Subject, bindCallback, of } from 'rxjs'
import { flatMap, startWith, scan, share, map} from 'rxjs/operators'
import React from 'react';


abstract class Reactor<Action, State = {}, Mutation = Action> {

    action : Subject<Action> = new Subject<Action>();
    initialState! : State
    currentState! : State
    state!: Observable<State>

    constructor(initialState : State){

        this.initialState = initialState;
        let mutation = this.action.pipe( 
            flatMap(
                (action) => {
                    return this.mutate(action);
                }
            )
        )

        this.state = mutation.pipe(
            scan(( state, mutate) => {
                return this.reduce( state, mutate );
            }, this.initialState)
            ,startWith(this.initialState),
            share()
        )

        this.state.subscribe(
            res=> {
                this.currentState = res;
                console.log(res);
            }
        )
          
    }

    abstract mutate(action : Action): Observable<Mutation>;
    abstract reduce(state: State, mutation: Mutation): State;

}




interface State {
    isLoading: boolean
}

export const TOGGLE = 'TOGGLE'

interface ToggleAction {
    type: typeof TOGGLE
    value: boolean
}

export type ActionType = ToggleAction
  
class TestReactor extends Reactor<ActionType,State> {

    mutate(action: ToggleAction): Observable<ToggleAction> {
        switch(action.type){
            case "TOGGLE":
                return of(action)
        }
    }

    reduce(state: State, mutation: ToggleAction): State {
        let newState = state;
        switch(mutation.type) {
            case "TOGGLE" :
                newState.isLoading = !newState.isLoading;
                return newState;
        }
    }
}

export class View extends React.Component<{},State> {

    private reactor! : TestReactor;
    private viewAction : Subject<ActionType> = new Subject<ActionType>();

    constructor(props: {}){
        super(props);
        this.state = {
            isLoading : false
        }

        this.reactor = new TestReactor(this.state);
        this.viewAction.subscribe(this.reactor.action);

        this.reactor.state.pipe(
            map( value => value.isLoading )
        ).subscribe(
            res=>this.setState({isLoading: res})
        )
    }


    render(){

        //subject
        // subject maker.
        //여기서 어떤 버튼 클릭하면 subject로 연결되게합니다.
        //클릭하게되면 합니다..

        return(
            <>
                <div onClick={()=> {this.viewAction.next({ type:"TOGGLE", value: this.state.isLoading})}}> {(this.state.isLoading)? "abc" : "def"} </div>
            </>
        )

    }
}