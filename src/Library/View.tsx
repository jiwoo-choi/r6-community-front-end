// 이 뷰입니다.
// component class

import React, {Component, ComponentClass} from 'react';
import { CommentAction } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import hoistNonReactStatic from "hoist-non-react-statics";
// import testReactor from './testReactor';

//react cloneElement.
//react cloneElement. 
//리액트 클론 한다. props에 새거추가해서.
//혹은 클래스 어떻게?


/**
 * 
 * WithRouter같이합니다.
 * View는 상태관리를 합니다.
 */

// export interface BinderProps<Action> {
//     loadBinder: (action : Action, ...args: any) => void,
//     clickBinder: (action : Action, ...args: any) => void,
//     changedBinder: (action : Action, ...args: any) => void,
//     binder: (action: Action, fn: Function) => void;
// }

export interface BinderProps<Action> {
    //     loadBinder: (action : Action, ...args: any) => void,
    //     clickBinder: (action : Action, ...args: any) => void,
    //     changedBinder: (action : Action, ...args: any) => void,
    //     binder: (action: Action, fn: Function) => void;
    // }
    binder: (a : Action) => void
}

  
// function View<Action, P extends BinderProps<Action>, C extends React.ComponentType<P>>(
//     WrappedComponent: C & React.ComponentType<P>
//     ) {

//     // const WithWrapper = (props : BinderProps) => {
//     //     { test , ...reamingProps } = props 
//     // }

//     class A extends React.Component<C> {

//         componentDidMount(){
//             this.setState()

//             // 전달만해주면되는거임.
//         }

//         render(){
//             return(
//                 <></>
//                 // <WrappedComponent {...this.props} />
//             )

//         }

//     }

//     hoistNonReactStatic(A, WrappedComponent);
//     return A
// }


// interface myAction {
//     isClicked: boolean
// }

// interface MyState {
//     isLoading: boolean
// }

// interface CUSTOMPRPS { 
//     hello:string
// }


// class A extends React.Component<BinderProps<myAction>> {

//     componentDidMount() {
//         const a = this.props.binder;
//     }
// }

// <View(A)>


/**
 * 
 */

  
// const withWrapper = <BinderProps<Action>></BinderProps> extends {}>(
//     WrappedComponent: React.ComponentType<TProps>,
// ) => {
//     const WithWrapper: React.FC<TProps> = (props: TProps) => (
//     <div>
//         <WrappedComponent {...props} />
//     </div>
//     )

//     WithWrapper.displayName = `WithWrapper(${
//     WrappedComponent.displayName || WrappedComponent.name || 'Component'
//     })`

//     return hoistNonReactStatic(WithWrapper, WrappedComponent)
// }




// export function withRouter<P extends RouteComponentProps<any>, C extends React.ComponentType<P>>(
//     component: C & React.ComponentType<P>,
// ): React.ComponentClass<Omit<P, keyof RouteComponentProps<any>> & WithRouterProps<C>> & WithRouterStatics<C>;

// function View<Action, State>(Component: ComponentClass<Action & State & BinderProps<Action>>, reactor: Reactor): React.componentClass  {
// function View(component: React.ComponentType): React.ComponentClass {
// function View(component: React.ComponentClass): React.ComponentClass {

    
    // return 

    

    // return class extends React.Component<Action & State & BinderProps<Action>> {
        
    //     componentDidMount(){
    //         //여기서 loadBinder를 실행시켜줍니다.
            
    //     }

    //     render(){
    //         return(
                
    //         )
    //     }
    // }

// }

// class ABC extends React.Component {

// }

// View(ABC, new Reactor())
//이는 바로 리액터를 해줍니다.



// export default View;

