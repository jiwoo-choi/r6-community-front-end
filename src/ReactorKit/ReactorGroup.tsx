import React from "react";
import { Reactor } from "./Reactor";
import { R6Footer } from "../Component";


function map(children : React.ReactNode, func: (child : React.ReactElement, index?:number, total?: number)=>void) {
    let index = 0;
    return React.Children.map(children, (child) =>
      React.isValidElement(child) ? func(child, index++, React.Children.count(children)) : child,
    );
}


export interface ReactorGroupProps {
    initialState?: any,
    reactor?: any
}

export default class ReactorGroup<T,S> extends React.PureComponent<ReactorGroupProps>{
    
    render(){

        return(
            <>
                {
                    map( this.props.children, (child, index, total) => {
                        return React.cloneElement( child , {
                            reactor:this.props.reactor,
                            initialState: this.props.initialState
                        })
                    })
                }
            </>
        )
    }

}