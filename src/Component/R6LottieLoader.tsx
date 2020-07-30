import React from "react";
import lottie, { AnimationConfigWithPath } from 'lottie-web';

interface R6AnimationProperty {
    speed? : number;
    height: number;
    width: number;
    path: string;
}

export default class R6LottieLoader extends React.Component<R6AnimationProperty> {
    
    private element! : HTMLElement; 

    shouldComponentUpdate(nextProps:R6AnimationProperty) {
        return this.props.path !== nextProps.path || this.props.height !== nextProps.height || this.props.width !== nextProps.width
    }

    componentDidMount(){
        let option : AnimationConfigWithPath = {
            path : this.props.path,
            container:this.element,
            renderer:'svg',
            loop:true,
            autoplay:true
        }

        this.element.style.height = `${this.props.height}px`
        this.element.style.width = `${this.props.width}px`

        let anim = lottie.loadAnimation(option);
        anim.setSpeed((this.props.speed)? this.props.speed : 1);
        anim.play();
    }

    componentWillUnmount() {
        clearTimeout();
    }

    render(){

        return(
                <div ref={ (ref) => this.element = ref!}/>
        )
    }
    
}

