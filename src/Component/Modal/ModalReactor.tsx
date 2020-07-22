import { Reactor } from "../../ReactorKit/Reactor"
import { Observable, of } from "rxjs"

export const MODALTOGGLE = 'MODALTOGGLE'

export interface ModalToggle { 
    type: typeof MODALTOGGLE
}

export interface ModalState {
    isOpened: boolean;
}

export class ModalReactor extends Reactor<ModalToggle, ModalState> {

    mutate(action: ModalToggle): Observable<ModalToggle> {        
        return of(action)
    }
    

    reduce(state: ModalState, mutation: ModalToggle): ModalState {
        let newState = state;
        switch(mutation.type) {
            case "MODALTOGGLE" :
                newState.isOpened = !newState.isOpened;
                return newState;
        }
    }
}

