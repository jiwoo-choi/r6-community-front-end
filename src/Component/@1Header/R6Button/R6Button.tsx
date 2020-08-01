import styled from "styled-components";
import React from "react";


const Button = styled.div`

    font-weight:500;
    cursor:pointer;
    transition: 0.2s;
    color: #BABECC;
    
    margin-right: 25px;

    & p {
        margin: 0;
        padding:0;
    }

    & div {
        height:5px;
        flex:1;
        background: #BABECC;
        border-radius:20px;
        opacity:0;
        margin-left: -10px;
        transition: 0.2s ease-out;
    }

    &:hover p {
        font-weight:700;
        margin-top:-6px;
    }

    &:hover div {
        margin-left:0px;
        opacity:1;
    }
`


const SelectedButton = styled.div`

    font-weight:700;
    color: black;
    cursor:pointer;

    margin-right: 25px;

    & p {
        margin: 0;
        padding:0;
        margin-top:-6px;
    }

    & div {
        flex:1;
        background:black;
        height:5px;
        border-radius:20px;
        margin : auto 5px;
        margin-top:3px;
        background:black;
    }
`

interface ButtonProps {
    selected?: boolean;
    onClick?:()=>void;
    value: string;
    children: React.ReactNode
}

export default function R6Button({children, selected, onClick, value}:ButtonProps) {

    if (selected) {
        return (
        <SelectedButton onClick={onClick}>
            <p>{children}</p>
            <div></div>
        </SelectedButton>)
    } else {
        return (
        <Button onClick={onClick}>
            <p>{children}</p>
            <div></div>
        </Button>
        )
    }
}