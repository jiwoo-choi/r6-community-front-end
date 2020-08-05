import React from "react";
import { Reactor, ReactorControlType } from "./Reactor";
import { R6Footer } from "../Component";


function map(children : React.ReactNode, func: (child : React.ReactElement, index?:number, total?: number)=>void) {
    let index = 0;
    return React.Children.map(children, (child) =>
      React.isValidElement(child) ? func(child, index++, React.Children.count(children)) : child,
    );
}


//router?
//ReactRouter
//ReactorRouter
//https://www.bsidesoft.com/830
export default class ReactorGroup extends React.PureComponent<ReactorControlType<any,any>>{
    
    render(){
        return(
            <>
                {
                    map( this.props.children, (child, index, total) => {
                        return React.cloneElement( child , {
                            ...this.props,
                            ...child.props,
                        })
                    })
                }
            </>
        )
    }

}