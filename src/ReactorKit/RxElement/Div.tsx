import React from 'react';
import { Subject } from 'rxjs';

interface ClickEvent {
    variable : Subject<any>;
    //rx.tap //onTabp
}


class Div extends React.PureComponent<React.HTMLProps<HTMLDivElement> & ClickEvent> {

    //mount!
    //creatRef?
    //ㅏ됴ㅐㄹ?
    //reference.../
    trigger!:Subject<any>; // clickevent
    //stateless
    
    componentWillMount() {
        this.trigger = new Subject<any>();
    }

    render(){
        return(
            <div {...this.props} onClick={()=>{this.trigger.next(0)}}>
                {this.props.children}
            </div>
        )
    }

}

//  PureComponent
// Stateless COmponent
// Stateless + and what else? + functional
// HMTL Props?

