import React from "react";
import lottie, { AnimationConfigWithPath , AnimationItem} from 'lottie-web';

export interface R6AnimationProperty {
    /** 애니메이션 스피드 */
    speed? : number;
    /** 애니메이션 높이 */
    height: number;
    /** 애니메이션 너비 */
    width: number;
    /** 애니메이션 json path (url) */
    path: string;
}

/**
 * Lottie 애니메이션을 간단하게 플레이할 수 있도록 감싼 wrapper입니다.
 * https://github.com/chenqingspring/react-lottie/blob/master/src/index.js#L118
 */
export default class R6LottieLoader extends React.PureComponent<R6AnimationProperty> {
    
    /** element ref */
    private element! : HTMLElement; 
    private anim?: AnimationItem;
 
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

        this.anim = lottie.loadAnimation(option);
        this.anim?.setSpeed((this.props.speed)? this.props.speed : 1);
        this.anim?.play();
    }

    componentWillUnmount() {
        this.anim?.destroy();
    }

    render(){
        return(
                <div ref={ (ref) => this.element = ref!}/>
        )
    }
    
}

