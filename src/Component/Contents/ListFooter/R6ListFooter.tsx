import { Input, Button } from "semantic-ui-react";
import React from "react";
import styled from 'styled-components'
import ForumReactor, { ForumState } from "../../@Forum/ForumReactor";
import { withReactor } from "../../../ReactorKit/withReactor";
import ReactiveView from "../../../ReactorKit/ReactiveView";



const BUTTONAREA = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    height:45px;
    margin-bottom:10px;
`


const SEARCHAREA = styled.div`
    display:flex;
    justify-content: flex-end;
    align-items:center;
    height:45px;
    margin-bottom:10px;
   
`


class R6ListFooter extends React.PureComponent<{
    reactor?: ForumReactor
}>{

    render() {
        if(!this.props.reactor) {
            return null;
        } else {
            const reactor = this.props.reactor;
            return(
                <>
                    <BUTTONAREA>
                        <Button basic fluid content='이전' icon='left arrow' labelPosition='left'/>
                        <Button basic fluid content='다음' icon='right arrow' labelPosition='right' />
                    </BUTTONAREA>
                    <SEARCHAREA>
                        <Input style={{marginRight:'10px'}} icon='search' placeholder='Search...' />
                        <Button color={"black"} onClick={()=>{reactor.dispatch({type:"CLICKWRITE"})}}> 글쓰기 </Button>
                    </SEARCHAREA>
                </>
            );
        }
    }
}
export default ReactiveView(R6ListFooter);

// 다음.. 이전.. 

//            ellipsisItem={showEllipsis ? undefined : null}
// firstItem={showFirstAndLastNav ? undefined : null}
// lastItem={showFirstAndLastNav ? undefined : null}
// prevItem={showPreviousAndNextNav ? undefined : null}
// nextItem={showPreviousAndNextNav ? undefined : null}

//            // onPageChange={ _ => console.log("abc") }

//renderer prosp?
//renderer props={<>}
//this.props.render
//HOC
//https://reactjs.org/docs/render-props.html
//미리로딩
