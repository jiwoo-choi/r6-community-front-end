
import React from "react";
import { map, distinctUntilChanged } from "rxjs/operators";
import { Menu, MenuItemProps, Input } from 'semantic-ui-react'
import { NavigationState, ContentReactor, MenuType } from "./ContentReactor";
import { ReactorView } from "../../ReactorKit/ReactiveView";
import { DisposeBag } from "../../ReactorKit/DisposeBag";

export default class R6Navigation extends React.Component<{}, NavigationState>  {

    
    constructor(props: {}) {
        super(props);
        this.state = {
            currentMenu : "공략/팁"
        }
    }

    reactor?: ContentReactor;


    bind(reactor: ContentReactor) {

        reactor.state.pipe (
            map( state => state.currentMenu ),
            distinctUntilChanged(),
        ).subscribe(
            currentMenu=> {
                this.setState({ currentMenu })
            }
        )
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    viewAction?: import("rxjs").Subject<any> | undefined;

    componentDidMount() {

        this.reactor = new ContentReactor({ 
            contentList: [],
            currentMenu:"공략/팁",
            forumTitle:"공략/팁",
            mode:"Viewing",
         });

        // this.bind();
    }

    

    handleItemClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: MenuItemProps) {
        const { name } = data
        this.reactor?.action.next({type:"MENUCLICKACTION", menu : name as MenuType})
    }

    render() {

        const { currentMenu } = this.state ;

        return(
            <div>
                <Menu secondary>
                    <Menu.Item
                        name='공략/팁'
                        active={currentMenu === '공략/팁'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='클랜홍보'
                        active={currentMenu === "클랜홍보"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='자유게시판'
                        active={currentMenu === "자유게시판"}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                    name='같이하기'
                    active={currentMenu === "같이하기"}
                    onClick={this.handleItemClick}
                    />

                <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                </Menu.Menu>

                </Menu>

                <div style={{background:"red", height:'200px', width:'500px'}}>
                     
                </div>
            </div>
        )
    }

}
