import React from "react";
import { Reactor } from "./Reactor";
import { R6Footer } from "../Component";


function map(children : React.ReactNode, func: (child : React.ReactElement, index?:number, total?: number)=>void) {
    let index = 0;
    return React.Children.map(children, (child) =>
      React.isValidElement(child) ? func(child, index++, React.Children.count(children)) : child,
    );
}


export interface ReactorGroupProps<T = any> {
    reactor?: T
}

//router?
//ReactRouter
//ReactorRouter
//https://www.bsidesoft.com/830
export default class ReactorGroup extends React.PureComponent<ReactorGroupProps>{
    
    render(){
        return(
            <>
                {
                    map( this.props.children, (child, index, total) => {
                        // console.log(child.type)
                        return React.cloneElement( child , {
                            ...child.props,
                            reactor:this.props.reactor,
                            // initialState: this.props.initialState
                        })
                    })
                }
            </>
        )
    }

}