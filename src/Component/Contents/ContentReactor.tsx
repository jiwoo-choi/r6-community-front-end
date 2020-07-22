import { Reactor } from "../../ReactorKit/Reactor";
import { Observable, of } from "rxjs";


export type MenuType = "공략/팁" | "클랜홍보" | "같이하기" | "자유게시판"

export interface NavigationState {
    currentMenu: MenuType;
}

export interface ListType {
    numberOfComments:number,
    id:string,
    meta: string,
    numberOfLikes: number,
    contentTitle: string,
}

export type ListMode = "Editing" | "Viewing" | "Listing"

export interface ListState {
    contentList: ListType[];
    mode: ListMode;
}

export interface ForumTitleState { 
    forumTitle: MenuType,
}

export const MENUCLICKACTION = 'MENUCLICKACTION'

export interface MenuClickAction { 
    type: typeof MENUCLICKACTION
    menu : MenuType
}

export const MODECHANGE = 'MODECHANGE'

export interface ModeChange { 
    type: typeof MODECHANGE
    mode: ListMode
}

type R6NavigationAction = MenuClickAction | ModeChange
type ContentState = NavigationState & ListState & ForumTitleState

export class ContentReactor extends Reactor<R6NavigationAction, ContentState> {

    mutate(action: R6NavigationAction): Observable<R6NavigationAction> {
        return of(action)
    }

    reduce(state: ContentState, mutation: R6NavigationAction): ContentState {
        let newState = state;
        switch(mutation.type) {
            case "MENUCLICKACTION":
                newState.currentMenu = mutation.menu;
                return newState;
            case "MODECHANGE":
                newState.mode = mutation.mode;
                return newState;
        }
    }

    transformAction(action: Observable<R6NavigationAction>): Observable<R6NavigationAction> {
        return action;
    }
    transformMutation(mutation: Observable<R6NavigationAction>): Observable<R6NavigationAction> {
        return mutation;
    }
    transformState(state: Observable<ContentState>): Observable<ContentState> {
        return state;
    }

}