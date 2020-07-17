import { Observable ,Subject, bindCallback, of , asyncScheduler, Scheduler, empty, ConnectableObservable, interval, defer, from, queueScheduler, queue} from 'rxjs'
import { flatMap, startWith, scan, share, map , observeOn, catchError, shareReplay, tap, publish, publishReplay, first, distinctUntilChanged} from 'rxjs/operators'
import React from 'react';
import { Stub } from './Stub';
import { DisposeBag } from './DisposeBag';
import { Action } from 'rxjs/internal/scheduler/Action';


export abstract class Reactor<Action = {}, State = {}, Mutation = Action> {

    action : Subject<Action>;
    // action!: ActionSubject<Action>;
    initialState! : State;
    currentState! : State;
    state!: Observable<State>;
    stub: Stub<Action,State,Mutation>;
    protected scheduler : Scheduler = queueScheduler;

    constructor(initialState : State, isStubEnabled : boolean = false){

        this.initialState = initialState;
        this.stub = new Stub(this, new DisposeBag());

        if (isStubEnabled) {
            this.action = this.stub.action;
            this.state = this.stub.state
        } else {
            this.action = new Subject<Action>();
            this.state = this.createStream();
        }
    }


    abstract mutate(action : Action): Observable<Mutation>;
    abstract reduce(state: State, mutation: Mutation): State;
    abstract transformAction(action: Observable<Action>): Observable<Action>;
    abstract transformMutation(mutation: Observable<Mutation>): Observable<Mutation>;
    abstract transformState(state: Observable<State>): Observable<State>;

    private createStream(): Observable<State> {

        let transformedAction : Observable<Action> = this.transformAction(this.action);
        let mutation = transformedAction.pipe( 
            flatMap(
                (action) => {
                    return this.mutate(action).pipe(catchError( err => empty()))
                }
            )
        )
        //action subject... you ne
        let transformedMutation : Observable<Mutation> = this.transformMutation(mutation);
        let state = transformedMutation.pipe(
            scan((state, mutate) => {
                return this.reduce( state, mutate );
            }, this.initialState),
            catchError( () => {
                return empty()
            })
            ,startWith(this.initialState),
        )

        let transformedState : Observable<State> = this.transformState(state)

        .pipe(
            tap( (state) => {
                this.currentState = state
            }),
            shareReplay(1)
        )

        transformedState.subscribe();

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
  
export class TestReactor extends Reactor<ActionType,State> {

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



export class View extends React.PureComponent<{},State> {

    //lazy & defer
    viewAction? : Subject<ActionType>;
    reactor?: TestReactor;
    constructor(props: {}){
        super(props);
        this.state = {
            value : 0
        }
    }

    componentDidMount(){
        this.viewAction = new Subject<ActionType>();
        this.reactor = new TestReactor(this.state);
    }

    bind(){
        this.viewAction?.subscribe(this.reactor?.action)
        this.reactor?.state.pipe( 
            distinctUntilChanged(),
            map( state => state.value))
        .subscribe(
            value=>{
                this.setState({value})
            }
        ) 
    }
    

    render(){

        return(
            <>
                <div>
                    Counter
                </div>
                <div>
                    {this.state.value}
                </div>
                <button onClick={()=>{this.viewAction?.next({type:"INCREASE"})}}>
                    +
                </button>
                <button onClick={()=>{this.viewAction?.next({type:"DECREASE"})}}>
                    -
                </button>

            </>
        )

    }
}


