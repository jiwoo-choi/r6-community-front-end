import React from "react";
import { Subject } from "rxjs";


interface ClickEvent {
    variable : (subject: Subject<any>) => void; //ref방식따라하기.
    //rx.tap //onTabp
}//onChange? //any?



function map(children : React.ReactNode, func: (child : React.ReactElement, index?:number, total?: number)=>void) {
    let index = 0;
    return React.Children.map(children, (child) =>
      React.isValidElement(child) ? func(child, index++, React.Children.count(children)) : child,
    );
}

//React.HTMLProps<HTMLElement> 

export default class Rx extends React.PureComponent<ClickEvent> {
    
    trigger?: Subject<any>;
    componentWillMount(){
        this.trigger = new Subject<any>();
        this.props.variable(this.trigger)
    }//https://wisc-hci-curriculum.github.io/cs639-f19/lectures/Week-05-Build-React-2.pdf

    render(){
        return(
            <>
                {
                    map( this.props.children, (child, index, total) => {
                        const handler = (e? : React.MouseEvent<HTMLElement>) => { this.trigger?.next(index) }
                        return React.cloneElement<React.HTMLProps<HTMLElement>>( child, {
                            onClick : handler
                        })
                    })
                }
            </>
        )
    }

}