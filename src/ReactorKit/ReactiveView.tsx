import { Reactor } from "./Reactor";
import { ComponentClass } from "react";
import { DisposeBag } from "./DisposeBag";
import React from "react";
import { GlobalReactor } from "./GlobalStore";
import { Subject } from "rxjs";


export interface reactorTesterKit {
    childProps:any;
    childState:any;
    childRef:any;
}

export interface reactorAccessible<P extends Reactor<any,any,any>> {
    reactor?:P;
}

export interface ReactorView<P extends Reactor<any,any,any>> extends reactorAccessible<P> {
    bind(reactor:P):DisposeBag; 
    //componentdidmouunt
    //onComponentDidMount:any;
}



export default function ReactiveView<
R extends Reactor<any,any,any>,
State = any,
P = {},  
>(
    Component: ComponentClass<P,State>
) : React.ComponentClass<P> {

    class A extends React.PureComponent<P> implements reactorAccessible<R>, reactorTesterKit {

        static contextType = GlobalReactor;
        static displayName = 'REACTORKIT_REACTIVE_VIEW';

        private _childRef: any ;
        disposeBag?: DisposeBag;
        private _reactor?: R;

        get childProps(){
            let a = this.childRef as React.Component<P,State>;
            return a.props
        }

        get childState(){
            let a = this.childRef as React.Component<P, State>;
            return a.state;
        }

        get childRef(){
            return this._childRef;
        }

        set childRef(ref: any){
            this._childRef = ref;
        }
        
        set reactor(newR : R) {       
            this._reactor = newR;
            this.disposeBag?.unsubscribe();
            let a = this.childRef as ReactorView<R> 
            this.disposeBag = a.bind(newR);
        } 

        get reactor(){
            return this._reactor!;
        }

        constructor(props:P) {
            super(props)
            if (Component.displayName === "REACTORKIT_GLOBAL") {
                console.error("ERROR : GLOBAL SHOULD BE MOST OUTSIDE OF COMPONENT")
            }
        }

        componentWillMount(){
            console.log("parent will mount")
        }

        componentDidMount(){
            console.log("parent didmount mount")

            let view = this.childRef as ReactorView<R> 
            this._reactor = view.reactor;
            if (this._reactor) {
                this.disposeBag = view.bind(this._reactor);
            } else {
                console.warn("NO REACTOR BINDED");
            }
        }

        componentWillUnmount(){
            if(this.disposeBag) {
                this.disposeBag.unsubscribe();
            }
            this._reactor?.disposeAll();
        }

        render(){
            console.log("parent redner")
            return( <Component {...this.props} ref={ref => this.childRef = ref}></Component>)
        }
    }
    return A;
} 