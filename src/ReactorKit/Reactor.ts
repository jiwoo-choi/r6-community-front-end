import { Observable ,Subject, Scheduler, empty, queueScheduler, Subscription } from 'rxjs'
import { flatMap, startWith, scan, catchError, shareReplay, tap,  observeOn, takeUntil, switchMap} from 'rxjs/operators'
import { Stub } from './Stub';
import { DisposeBag } from './DisposeBag';
import { ReactorHook } from './ReactorHook';




// class TestReactor {

//     private static updater = 1;
//     private static setState:any;
  
//     static use(initialState: any) {
//       TestReactor.setState = useState(1)[1];
//       const [state, setState] = useState<any>(undefined);
//       if (!state) setState(new this(initialState));
//       const currentState = (!state) ? initialState : state.currentState
//       return [state, currentState]
//     }
  
//     currentState: any;
//     constructor(initialState: any){
//       this.currentState = initialState;
//       console.log("called");
//     }
  
//     static flush(){
//       TestReactor.setState(TestReactor.updater *= -1);
//     }
//   }
  
//   class TestReactorChild extends TestReactor {
  
//       add(){
//         this.currentState = this.currentState + 1;
//         TestReactorChild.flush();
//       }
//   }
  
//   function Test1() {
//     console.log("updated!")
//     const [reactor, currentState] = TestReactorChild.use(1);
//     console.log(reactor, currentState)
//     // reactor.add()
//     return (
//       <>
//       <div> TEST 1 - {currentState} </div>
//       <button onClick={()=>{reactor.add()}}>addbutton</button>
//       </>
//     )
//   }

  
export abstract class Reactor<Action = {}, State = {}, Mutation = Action> {

    private _isGlobal: boolean;
    private dummyAction: Subject<any>;
    // public action : Subject<Action>;
    private _action : Subject<Action>;

    private _initialState! : State; // only set once, then read-only. 
    public currentState! : State; // this does not affect actual value. this value is only for test.
    private _state!: Observable<State>; // nobody cannot change state except this.
    private _stub!: Stub<Action,State,Mutation>; 
    protected scheduler : Scheduler = queueScheduler; //only subclass can change scheduler.
    private _disposeBag : DisposeBag = new DisposeBag(); //only 
    private _isStubEnabled : boolean;
    // private actionWeakMap = new WeakMap();

    public readonly REACTORID$ = "REACTORKIT_REACTOR2" 


    get initialState() {
        return this._initialState;
    }

    get state() {
        return this._state;
    }

    get stub() {
        return this._stub;
    }

    get isGlobal() {
        return this._isGlobal;
    }

    get action(){
        return this._action;
    }

    constructor(initialState : State, isStubEnabled : boolean = false, isGlobal : boolean = false){
        
        this._isGlobal = isGlobal
        this._isStubEnabled = isStubEnabled;
        this.dummyAction = new Subject<any>(); 
        this._initialState = initialState;

        if (this._isStubEnabled) {
            this._stub = new Stub(this);
            this._action = this.stub!.action;
            this._state = this.stub!.state
        } else {
            this._action = new Subject<Action>();
            this._state = this.createStream();
        }

        // this._disptach = this._disptach.bind(this)
    }

    // static get reactorName(){
    //     return this.constructor.name
    // }

    get name(){
        return this.constructor.name
    }


    abstract mutate(action : Action): Observable<Mutation>;
    abstract reduce(state: State, mutation: Mutation): State;


    public dispatch(action : Action) {
        this.action.next(action)
    }

    public _dispatch(action : Action) {
        let self = this;
        return function a() {
            self.action.next(action)
        }
    }


    public dispatchForMuation(){
        // self.transfor
    }

    protected transformAction(action: Observable<Action>): Observable<Action> {
        return action;
    }

    protected transformMutation(mutation: Observable<Mutation>): Observable<Mutation> {
        return mutation;
    }

    protected transformState(state: Observable<State>): Observable<State> {
        return state;
    }

    /// https://blog.codecentric.de/en/2018/01/different-ways-unsubscribing-rxjs-observables-angular/
    /// https://medium.com/angular-in-depth/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
    /// rxjs operator.  
    disposeOperator(){
        return takeUntil(this.dummyAction)
    }

    disposeAll2() {
        this.dummyAction.next();
        this.dummyAction.complete();
    }

    disposeAll(){
        if (this.isGlobal) {
            console.warn("1 : This Reactor is not supposed to be disposed. Please check your codes again.")
        } else {
            this.disposeBag.unsubscribe();
        }
    }
    
    set disposedBy(subscription: Subscription | undefined) {
        if (subscription) {
            
            if (this.isGlobal) {
                console.warn("2: This Reactor is not supposed to disposed bag. Please check your codes again.")
            } else {
                this.disposeBag.add(subscription)
            }
        } else {
            return;
        }
    }

    get disposeBag(){
        return this._disposeBag;
    }

    private createStream(): Observable<State> {
        //        //switchMap? wtf!
        let action = this.action.pipe(observeOn(this.scheduler))
        let transformedAction : Observable<Action> = this.transformAction(action);
        let mutation = transformedAction.pipe( 
            flatMap(
                (action) => {
                    return this.mutate(action).pipe(catchError( err => empty()))
                }
            ) 
        )

        let transformedMutation : Observable<Mutation> = this.transformMutation(mutation);

        let state = transformedMutation.pipe(
            scan((state, mutate) => {
                return this.reduce( state, mutate );
            }, this.initialState),
            catchError( () => {
                return empty()
            })
            ,startWith(this.initialState), //여기서 start 바로보냄.
        )

        //여기서 state를 바궈주는걸 받음.
        let transformedState : Observable<State> = this.transformState(state)
        .pipe(
            tap( (state) => {
                this.currentState = state
            }),
            shareReplay(1),
        )

        this.disposedBy = transformedState.subscribe();
        return transformedState;
    }

}



