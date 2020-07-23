import React from "react";
import styled from 'styled-components';
import { Placeholder, Segment } from "semantic-ui-react";


const ABC = styled.div`
    height:80px;
    margin-bottom:10px;
    background-color:white;
    width:100%;
    border:black 1px solid;
    border: 1px solid rgba(34,36,38,.15);
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    cursor:pointer;
    &:hover {
         background-color:rgba(0,0,0,.05);
    }
`

export default class R6Cell extends React.Component {

    componentDidMount(){

    }

    render() {
        return(
            <div>
                <Segment>
                    <Placeholder>
                    <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    </Placeholder.Header>
                    </Placeholder>
                </Segment>
            </div>
        )
    }
}