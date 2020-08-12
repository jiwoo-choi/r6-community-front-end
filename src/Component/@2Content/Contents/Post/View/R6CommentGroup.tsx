import React from "react";

function map(children : React.ReactNode, func: (child : React.ReactElement, index?:number, total?: number)=>void) {
    let index = 0;
    return React.Children.map(children, (child) =>
      React.isValidElement(child) ? func(child, index++, React.Children.count(children)) : child,
    );
}


interface Props {
    onChange?:(inputVal: any)=>void;
}

interface State {
    currentValue: number;
}

export default class R6CommentGroup extends React.PureComponent<Props, State> {
    
    constructor(props: any){
        super(props);
        this.state = { currentValue : -1 }
    }
    handleClick(current: number){
        // if (this.props.onChange) {
        //     this.props.onChange(inputVal);
        // }

        if (this.state.currentValue === current) {
            this.setState({currentValue : -1})
        } else {
            this.setState({currentValue: current})
        }
    }

    handleCancel(){
        this.setState({currentValue: -1})
    }

    render(){
        return(
            <>
            {
                map( this.props.children, (child, index, total) => {
                    return React.cloneElement( child , {
                        ...child.props,
                        onClick : this.handleClick.bind(this),
                        onCancel: this.handleCancel.bind(this),
                        selected: (this.state.currentValue > -1) && this.state.currentValue === index,
                        value: index,
                    })
                })
            }
            </>
        ) 
    }
}
