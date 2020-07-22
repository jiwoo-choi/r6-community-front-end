/**
 * Observable도 sendAction하게 해주는 클래스입니다.
 * 테스트용을 위해서 만듭니다
 */

import { Observable, Subject, merge } from "rxjs";
import { FromEventTarget, fromEvent } from "rxjs/internal/observable/fromEvent";
import { random } from "lodash";

export type HTMLElementSubject = { next: ()=>void, asObservable: ()=> Observable<any>, key: number }

export function fromEventWithEmitter(target: FromEventTarget<Event>, eventName: string, isJustFromEvent: boolean = true ) : HTMLElementSubject {
    const emitter = new Subject<any>();
    const observable = fromEvent(target, eventName);
    const newObservable = merge(emitter, observable);
    let randomVal = random(true);
    return {
        next: () => { emitter.next('emit!') },
        asObservable: () => newObservable,
        key: randomVal,        
    }    
 }


 