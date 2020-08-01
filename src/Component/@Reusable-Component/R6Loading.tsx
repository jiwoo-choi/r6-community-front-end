import React from "react";
import styled, {keyframes} from 'styled-components'


const TRANSFORM = keyframes`
    100% { transform: rotate(360deg); }
`

const CIRCLEANI = keyframes`
    0% { stroke-dashoffset: 157; }
    75% { stroke-dashoffset: -147; }
    100% { stroke-dashoffset: -157; }
`

const SVG = styled.svg<{size?: number, strokeSize?: number, dasharray?: number}>`
    width: ${props => props.size? props.size : 62}px;
    height: ${props => props.size? props.size : 62}px;
    animation: ${TRANSFORM} 3s infinite;
    margin-bottom:20px;

    & circle {
        stroke: black;
        stroke-width: ${props => props.strokeSize? props.strokeSize : 6};
        /* getTotalLength()로 stroke의 길이를 얻어올 수 있음 */
        stroke-dasharray: ${props => props.dasharray ? props.dasharray : 157};
        stroke-dashoffset: 0;
        fill: transparent;
        animation: ${CIRCLEANI} 1s infinite;
    }
`

export interface R6LoadingProps {
    /** width & height 사이즈 */
    size?: number;
    /** Circle Stroke 사이즈, */
    strokeSize?: number;
    /** stroke-Dash Array의 속성. 사이즈 Height과 Width에 따라 달라집니다 */
    dasharray?: number;
}

/**
 * SVG 로딩 애니메이션 입니다.
 */
export default function R6Loading({ size, strokeSize, dasharray } :R6LoadingProps) {
    return (
        <SVG size={size} strokeSize={strokeSize} dasharray={dasharray}>
            <circle cx="50%" cy="50%" r="25"></circle>
        </SVG>
    )
}