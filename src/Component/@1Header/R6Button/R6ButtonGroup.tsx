import React from "react";
import styled from 'styled-components'

const ButtonGroup = styled.div`

    display: flex;
    text-align: center;
    font-size:2.3rem;
    
    @media screen and (max-width:820px) {
        & div {
            font-size:1.8rem;
        }
    }

    @media screen and (max-width:620px) {
        & div {
            font-size:1.5rem;
        }
    }


    @media screen and (max-width:500px) {
        & div {
            font-size:1.3rem;
        }
    }   

    @media screen and (max-width:400px) {
        & div {
            font-size:1rem;
        }
    }   
`


function map(children : React.ReactNode, func: (child : React.ReactElement, index?:number, total?: number)=>void) {
    let index = 0;
    return React.Children.map(children, (child) =>
      React.isValidElement(child) ? func(child, index++, React.Children.count(children)) : child,
    );
}

interface ButtonGroupProps {
    onChange?: (inputVal: any) => void;
    children: React.ReactNode;
    currentValue: any;
}

export default function R6ButtonGroup({onChange, currentValue, children}: ButtonGroupProps) {

    const handleToggles = (inputVal: any) => {
        if (onChange) {
            onChange(inputVal)
        }
    }

    return(
            <ButtonGroup>
                { 
                        map( children, (child, index, total) => {
                        const { value : childVal } = (child.props)
                        return React.cloneElement( child , {
                            onClick : ()=>{handleToggles(childVal)},
                            selected: currentValue !== null && currentValue === childVal,
                            value: childVal,
                        })
                    })
                }
            </ButtonGroup>
    )
    
}



//withReactor(R6CommunityNavigation, (state) => ({topic: state.topic}))
/**
 *     dispatcher = this.props.reactor_control.dispatcher;

    render() {
            const {topic} = this.props.reactor_control.getState();

            return(
                <div style={{marginBottom:'20px'}}>
                    <Menu size={"large"} compact pointing secondary>
                        <Menu.Item  
                            active={topic === "tips"}
                            onClick={this.dispatcher({type:"CLICKTOPIC", newTopic:"tips"})}
                        >
                        <Icon name='gamepad' disabled={topic !== "tips"} />
                        공략/팁 게시판
                        </Menu.Item>
                        <Menu.Item  
                            active={topic === "clan"}
                            onClick={this.dispatcher({type:"CLICKTOPIC", newTopic:"clan"})}
                        >
                        <Icon name='signup' disabled={topic !== "clan"} />
                        클랜 정보 게시판
                        </Menu.Item>
                        <Menu.Item
                            active={topic === "together"}
                            onClick={this.dispatcher({type:"CLICKTOPIC", newTopic:"together"})}
                        >
                        <Icon name='users' disabled={topic !== "together"}/>
                        같이하기
                        </Menu.Item>
                        <Menu.Item
                            active={topic === "free"}
                            onClick={this.dispatcher({type:"CLICKTOPIC", newTopic:"free"})}
                        >
                        <Icon name='list alternate' disabled={topic !== "free"} />
                        자유게시판
                        </Menu.Item>
                    </Menu>
                
                </div>
            )
        }

 */