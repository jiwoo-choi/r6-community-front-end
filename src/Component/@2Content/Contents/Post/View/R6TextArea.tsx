import styled from "styled-components"
import React, { useRef, useEffect } from "react"

const TEXTAREA = styled.textarea`
resize: none;
margin-bottom: 1rem;
width: 100%;
min-height: 6.125rem;
font-size: 1rem;
color: rgb(33, 37, 41);
line-height: 1.75;
padding: 1rem 1rem 1.5rem;
outline: none;
border-width: 1px;
border-style: solid;
border-color: rgb(233, 236, 239);
border-image: initial;
border-radius: 4px;
`

interface Props {
    placeholder? : string
    textRef?: (ref : React.RefObject<HTMLTextAreaElement> ) => void | (React.RefObject<HTMLTextAreaElement>);
    onKeyDown?: ((event: React.KeyboardEvent<HTMLTextAreaElement>) => void) | undefined;
}

export default function R6TextArea({placeholder, textRef, onKeyDown} : Props) {
    const thisTextRef = useRef<HTMLTextAreaElement>(null);
    useEffect( () => {
        if (textRef) {
            if (typeof textRef === "function") {
                textRef(thisTextRef)
            } else {   
                (textRef as React.RefObject<HTMLTextAreaElement>) = thisTextRef;
            }
        }
    }, [])
    return <TEXTAREA ref={thisTextRef} placeholder={placeholder} onKeyDown={onKeyDown}></TEXTAREA>

}