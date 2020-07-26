import { Reactor } from "./Reactor";
import { ComponentClass } from "react";
import { DisposeBag } from "./DisposeBag";
import React from "react";
import { GlobalReactor } from "./GlobalStore";
import { debounceTime } from "rxjs/operators";


export interface reactorTesterKit {
    childProps:any;
    childState:any;
    childRef:any;
}

export interface reactorAccessible<P extends Reactor<any,any,any>> {
    reactor?:P;
}

export interface ReactorView<P extends Reactor<any,any,any>> extends reactorAccessible<P> {
    // bind(reactor:P):DisposeBag; 
    //componentdidmouunt
    //onComponentDidMount:any;
    //disposeBag:DisposeBag 포함.
    parentReactor?:any;
    localReactor?:any;
}
/**
 * 
 * @param Component implements reactorAccessible<R
 */


export default function ReactiveView<
R extends Reactor<any,any,any>,
State = any,
P = {},  
>(
    Component: ComponentClass<P,State>
) : React.ComponentClass<P> {

    class A extends React.PureComponent<P, {updatar:number}> {

        static contextType = GlobalReactor;
        static displayName = 'REACTORKIT_REACTIVE_VIEW';

        private _childRef: any ;
        disposeBag?: DisposeBag;
        private _reactor?: R | null;
        private _parentReactor?: Reactor<any,any,any>;
        private _localReactor?: Reactor<any,any,any>;

        // set reactor(newR : R) {       
        //     this._reactor = newR;
        //     this.disposeBag?.unsubscribe();
        //     let a = this._childRef as ReactorView<R> 
        //     // this.disposeBag = a.bind(newR);
        // } 

        // get reactor(){
        //     return this._reactor!;
        // }

        constructor(props:P) {
            super(props)
            if (Component.displayName === "REACTORKIT_GLOBAL") {
                console.error("ERROR : GLOBAL SHOULD BE MOST OUTSIDE OF COMPONENT")
            }
            this.state = { updatar : 1 }
        }

        UNSAFE_componentWillMount(){
            
            // 외부로부터 리액터킷을 받아오는 부분.
            for (const [key, value] of Object.entries(this.props)) {
                if( value ) {
                    if ((value as any).REACTORID$) {
                        this._parentReactor = (value as Reactor<any,any,any>);
                    }
                }
            }
            
            //if it has reactor, then it is parent keys.
            //if it is following something.. there would be some kinds of like...
        }


        componentDidMount(){

            this.disposeBag = new DisposeBag();

            //we can notice the localreactor here.
            //and then we can do some 
            // let view = this._childRef as React.Component 

            for (const [key, value] of Object.entries(this._childRef)) {
                if (value) {
                    if ((value as any).REACTORID$) {
                        this._localReactor = (value as Reactor<any,any,any>);
                    }
                }
            }

            this.disposeBag.disposeOf = this._parentReactor?.state
            .pipe(
                debounceTime(100),
            ).subscribe( 
                res => {
                    this.setState({updatar : this.state.updatar * -1})  
                    // this.forceUpdate();
                    // this.setState({updatar : this.state.updatar * -1}, () => {
                    //     console.log(this.state.updatar)
                    // })
                }
            )

            this.disposeBag.disposeOf = this._localReactor?.state.pipe(
                // debounceTime(100),
            ).subscribe( 
                res => this.setState({updatar : this.state.updatar * -1})
            )

            // this._reactor = view.reactor;
            // if (this._reactor) {
            //     // this.disposeBag = view.bind(this._reactor);
            // } else {
            //     console.warn("NO REACTOR BINDED");
            // }

            // 아래뷰를 강제로 업데이트시킵니다.
            // 만약 state가 강제로 업데이트되어야하는 state라면, debounced는 하지않습니다.
            // state의 변화가 만약 그거라면 업데이트하지않죠!

            //부모로부터 받아오는 props라면?


            // this._reactor?.state.pipe(
            //     debounceTime(50)
            // ).subscribe( res => this.setState({ updatar : this.state.updatar * - 1}))

        }

        //증분렌더링을 최대한 막는거중에 debounced를 해준다.
        //isloading이 나오면 isloading부분업데이트해주고.
        //직렬로 넘어올경우 한번에 처리해준다.
        //state를 업데이트해준다?
        //state업데이트가 나오면 state를 업데이트해주는기능추가?
        //근데 얘는 리액터를 무조건 해야한다느걸 강제해야해. 그럼 리액터를 받아줘야할까?
        //parentReactor
        //localReactor 둘중에하나는 반드시 연결시켜놔야해.


        componentWillUnmount(){
            
            this.disposeBag?.unsubscribe();
            this._localReactor?.disposeAll();
            this._localReactor = undefined;
            //parent will not located.
            //null
            // if(this.disposeBag) {
            //     this.disposeBag.unsubscribe();
            // }
            // this._reactor?.disposeAll(); //자체리액터만 disposeAll()
            // this._reactor = null;
        }

        render(){
            return( <Component {...this.props} ref={ref => this._childRef = ref} updatar={this.state.updatar}></Component>)
        }
    }
    return A;
} 

/**
 * 
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
        
 */