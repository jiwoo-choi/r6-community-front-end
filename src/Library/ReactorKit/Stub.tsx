import {Reactor} from './Reactor'
import {BehaviorSubject, Subject} from 'rxjs'
import { DisposeBag } from './DisposeBag';

export class Stub<SAction, SState, SMutate> {
    // private disposeBag: DisposeBag
  
    //replay
    //behavior
    //pushlish?
    // public let action: ActionSubject<SAction>

    // private reactor: Reactor<SAction, SState, SMutate>;
    public state: BehaviorSubject<SState>;
    public action: Subject<SAction>;
    public actions : SAction[] = [];
    
    constructor(reactor: Reactor<SAction, SState, SMutate>, disposeBag: DisposeBag) {
        // this.reactor = reactor;
        this.state = new BehaviorSubject<SState>(reactor.initialState);
        this.action = new Subject<SAction>();

        const stateSubscription = this.state.asObservable()
        .subscribe(
            state=> { 
                reactor.currentState =  state
            }
        )

        disposeBag.add(stateSubscription);

        const actionSubscription = this.action.subscribe(
            action=>{
                this.actions.push(action)
            }
        )

        disposeBag.add(actionSubscription);
    }
}