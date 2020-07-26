import { Observable, Subject, bindCallback, of , asyncScheduler, Scheduler, empty} from 'rxjs'
import { flatMap, startWith, scan, share, map , observeOn, catchError, shareReplay, tap} from 'rxjs/operators'
import React from 'react';


abstract class Reactor<Action, State = {}, Mutation = Action> {

    action : Subject<Action> = new Subject<Action>();
    initialState! : State
    currentState! : State
    state!: Observable<State>

    public readonly REACTORID$ = "REACTORKIT_REACTOR" 

    protected scheduler : Scheduler = asyncScheduler;

    constructor(initialState : State){
        //Diff<Mutation,Action>
        //type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>
        //https://rinae.dev/posts/helper-types-in-typescript
        this.initialState = initialState;
        this.state = this.createStream();
    }
    

    abstract mutate(action : Action): Observable<Mutation>;
    abstract reduce(state: State, mutation: Mutation): State;
    abstract transformAction(action: Observable<Action>): Observable<Action>;
    abstract transformMutation(mutation: Observable<Mutation>): Observable<Mutation>;
    abstract transformState(state: Observable<State>): Observable<State>;


    private createStream(): Observable<State> {

        let action = this.action.pipe( observeOn(this.scheduler))
        let transformedAction : Observable<Action> = this.transformAction(action);
        let mutation = transformedAction.pipe( 
            flatMap(
                (action) => {
                    return this.mutate(action);
                }
            )
        )
        let transformedMutation : Observable<Mutation> = this.transformMutation(mutation);
        let state = transformedMutation.pipe(
            scan((state, mutate) => {
                return this.reduce( state, mutate );
            }, this.initialState),
            catchError( (err, caught) => {
                return empty()
            })
            ,startWith(this.initialState),
        )

        let transformedState : Observable<State> = this.transformState(state)
        .pipe(
            tap((state) => {
                this.currentState = state
            }),
            shareReplay(1)
        )

        return transformedState;
    }

}


interface State {
    value: number
}

export const INCREASE = 'INCREASE'
export const DECREASE = 'DECREASE'

interface INCREASEACTION { 
    type: typeof INCREASE
}
interface DECREASEACTION { 
    type: typeof DECREASE
}

export type ActionType = INCREASEACTION | DECREASEACTION
  

class TestReactor extends Reactor<ActionType,State> {

    mutate(action: ActionType): Observable<ActionType> {
        return of(action);
    }

    reduce(state: State, mutation: ActionType): State {
        let newState = state;
        switch(mutation.type) {
            case "DECREASE":
                newState.value = newState.value - 1; 
                return newState;
            case "INCREASE":
                newState.value = newState.value + 1; 
                return newState;
        }
    }

    transformAction(action: Observable<ActionType>): Observable<ActionType> {
        return action
    }
    transformMutation(mutation: Observable<ActionType>): Observable<ActionType> {
        return mutation
    }
    transformState(state: Observable<State>): Observable<State> {
        return state
    }
}

export class View extends React.Component<{},State> {

    private reactor! : TestReactor;
    private viewAction : Subject<ActionType> = new Subject<ActionType>();

    constructor(props: {}){
        super(props);
        this.state = {
            value : 0
        }

        this.reactor = new TestReactor(this.state);
        this.viewAction.subscribe(this.reactor.action);

        this.reactor.state.pipe(
            map( state => state.value )
        ).subscribe(
            value=>this.setState({ value })
        )
    }

    render(){

        //subject
        // subject maker.
        //여기서 어떤 버튼 클릭하면 subject로 연결되게합니다.
        //클릭하게되면 합니다..

        return(
            <>
                <div>
                    Counter
                </div>
                <div>
                    {this.state.value}
                </div>
                <button onClick={()=>{this.viewAction.next({type:"INCREASE"})}}>
                    +
                </button>
                <button onClick={()=>{this.viewAction.next({type:"DECREASE"})}}>
                    -
                </button>

            </>
        )

    }
}