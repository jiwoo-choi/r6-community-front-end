import { ReactorControlType , DisposeBag, deepDistinctUntilChanged} from "reactivex-redux";
import { ComponentClass } from "react";
import React from "react";
import { debounceTime,  map, skip } from "rxjs/operators";
import { Observable } from "rxjs";


export default function withReactor<
Action = any, 
State = any,
P = {}, // original props
>(
    Component: ComponentClass<P & ReactorControlType<Action,State>>, parentFilterMapper?:(state: State) => Partial<State>, transfromStateStreamFromThisComponent : boolean = true, skipSync : boolean = true
) : React.ComponentClass<P & ReactorControlType<Action,State>> {
    class A extends React.PureComponent<P & ReactorControlType<Action,State>, {updatar:number}> {

        static displayName = 'REACTORKIT_REACTIVE_VIEW';

        disposeBag: DisposeBag | null = null;
        private _parentStateStream?: Observable<State>; 
        private nextControls? : ReactorControlType<Action, State>;

        constructor(props:P & ReactorControlType<Action,State>) {
            super(props)
            if (Component.displayName === "REACTORKIT_GLOBAL") {
                console.error("ERROR : GLOBAL SHOULD BE MOST OUTSIDE OF COMPONENT")
            }
            this.state = { updatar : 1 }
        }


        UNSAFE_componentWillMount(){       

            this.disposeBag = new DisposeBag();
            function customMapper(filterMapper?: (state: State) => any) {
                if (filterMapper) {
                    return map(filterMapper)
                } else {
                    return map<State,State>( value => value )
                }
            }

            if (this.props.stateStream) {
                this._parentStateStream = this.props.stateStream
                if (transfromStateStreamFromThisComponent && parentFilterMapper) {
                    this.nextControls = { stateStream: this.props.stateStream.pipe(customMapper(parentFilterMapper)), getState: this.props.getState, dispatcher: this.props.dispatcher }
                    // this.nextControls.stateStream = this.props.stateStream.pipe(customMapper(parentFilterMapper))
                } else {
                    this.nextControls = this.props
                }
            }

            if (this._parentStateStream) {

                this.disposeBag!.disposeOf = this._parentStateStream!.pipe(
                    customMapper(parentFilterMapper),
                    deepDistinctUntilChanged(), 
                    skip((skipSync? 1 : 0)),
                    debounceTime(50), 
                ).subscribe( 
                    res => {
                        this.setState({updatar : this.state.updatar * -1})  
                    }
                )
            }

            if (!this._parentStateStream) {
                this.disposeBag = null;
            }
        }


        componentWillUnmount(){
            /** unsubscribe and release localReactor */
            this.disposeBag?.unsubscribe();
            this.disposeBag = null;

        }

        render(){
            return( <Component {...this.props} reactor_control={this.nextControls} updatar$updatar$updatar={this.state.updatar}></Component>)
        }
    }
    return A;
} 
