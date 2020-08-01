import R6LottieLoader from "./Component/@Reusable-Component/R6LottieLoader";
import React from "react";
import styled from "styled-components";
import { R6Loading } from "./Component/@Reusable-Component";


const CENTER = styled.div`
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`
export default function GlobalLoading() {
    return  <CENTER> 
                <R6Loading/>
            </CENTER>
}