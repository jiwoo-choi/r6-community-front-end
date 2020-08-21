
import { Router, MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { createBrowserHistory} from "history";
import React from "react";
import RootStore from "./RootStore";
import MobxReactRouter, { syncHistoryWithStore } from "mobx-react-router";
import { when, observe, autorun } from "mobx";
import { RootReactor } from "../../ReactorKit/Provider";
import { Observable, of, throwError } from "rxjs";
import { ajax } from "rxjs/ajax";
import { R6StatAPI } from "../../Library/R6StatAPI";
import { throws } from "assert";



jest.mock('rxjs/ajax');

describe("FORUM STORE TEST" , () => {
     

    let rootStore : RootStore;
    let browserHistory;
    let history : MobxReactRouter.SynchronizedHistory;

    beforeEach( () => {
        rootStore = new RootStore();
        browserHistory = createBrowserHistory();
        history = syncHistoryWithStore(browserHistory, rootStore.router);
    })

    it('GOEDITOR WITHOUT WITHOUT LOGIN TEST', done => {
        render(
            <Router history={history}>
            </Router>
        )

        when(
            () => rootStore.forum.isLoginModalOpened === true,
            () => {
                expect(rootStore.forum.isLogined).toBeFalsy();
                expect(history.location.pathname).toBe('/');
                done();
            }
        )

        rootStore.forum.goEditor();
    })

    it('GOEDITOR WITHOUT WITH LOGIN TEST', done => {
        render(
            <Router history={history}>
            </Router>
        )
        rootStore.forum.isLogined = true;
        rootStore.forum.nickName = "hello";
        rootStore.forum.goEditor();
        expect(rootStore.router.location.pathname).toBe('/free/write')
        done();
    })


    it('GOEDITOR WITHOUT WITH LOGIN TEST', done => {
        render(
            <Router history={history}>
            </Router>
        )

        rootStore.forum.isLogined = true;
        rootStore.forum.nickName = "hello";
        rootStore.forum.goEditor();
        expect(rootStore.router.location.pathname).toBe('/free/editor');
        done();
    })
   
    it('GOPOST TEST - SUCCESS', done => {
        render(
            <Router history={history}>
            </Router>
        );
        rootStore.forum.goPost(1);
        expect(history.location.pathname).toBe("/free/post/1")
        done();
    })

    it('GETLIST WITH TOPIC', done => {

        render(
            <Router history={history}>
            </Router>
        );

        (ajax.getJSON as any).mockImplementation( () => {
            return of({
                postList : ["test"],
                meta: "meta",
            })
        });

        // rootStore.forum.getList('together',3);
        rootStore.forum.getList('together', 3);
        expect(rootStore.router.location.pathname).toBe('/together');
        expect(rootStore.router.location.search).toBe('?page=3');
        done();
    })

    it('GETLIST WITHOUT TOPIC', done => {

        render(
            <Router history={history}>
            </Router>
        );

        (ajax.getJSON as any).mockImplementation( () => {
            return of({
                postList : ["test"],
                meta: "meta",
            })
        });

        rootStore.forum.getList();
        expect(rootStore.router.location.pathname).toBe('/free');
        expect(rootStore.router.location.search).toBe('?page=1');
        done();
    })

    it('GETLIST ASYNC REQUEST SUCCESS', done => {
        render(
            <Router history={history}>
            </Router>
        );

        (ajax.getJSON as any).mockImplementation( () => {
            return of({
                postList : ["test"],
                meta: "meta",
            })
        });

        rootStore.forum.getList();
        expect(rootStore.router.location.pathname).toBe('/free');
        expect(rootStore.router.location.search).toBe('?page=1');
        done();

    })

    // it('GETLIST ASYNC REQUEST FAILURE', done => {

    // })

    // it('GETLIST ASYNC REQUEST Page 404 Error', done => {
    //     rootStore.forum.currentQuery.
    // })  

    it('INIT() TEST WITH CUSTOM PATH - SET VALID TOPIC (S) - FREE' , done => {
        history.push('/together/list/100');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.topic).toBe("together");
            expect(rootStore.forum.getQuery.mode).toBe("list");
            expect(rootStore.forum.getQuery.page).toBe(100);
            done();
        })
    })

    it('INIT() TEST WITH CUSTOM PATH - SET VALID TOPIC (S) - WRITE' , done => {
        history.push('/free/write');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.topic).toBe("free");
            expect(rootStore.forum.getQuery.mode).toBe("write");
            done();
        })
    })


    it('INIT() TEST WITH CUSTOM PATH - SET INVALID TOPIC (F)' , done => {
        render(
            <Router history={history}>
            </Router>
        );
        history.push('/HEY/list/100');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.mode).toBe("error");
            expect(history.location.pathname).toBe("/error/404")
            done();
        })
    })

    

    it('INIT() TEST WITH CUSTOM PATH - SET VALID MODE (S)' , done => {
        history.push('/free/list/100');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.topic).toBe("free");
            expect(rootStore.forum.getQuery.mode).toBe("list");
            expect(rootStore.forum.getQuery.page).toBe(100);
            done();
        })
    })

    it('INIT() TEST WITH CUSTOM PATH - SET VALID MODE (S) - FREE WITHOUT PAGE ' , done => {
        history.push('/free/list');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.topic).toBe("free");
            expect(rootStore.forum.getQuery.mode).toBe("list");
            expect(rootStore.forum.getQuery.page).toBe(1);
            done();
        })
    })

    it('INIT() TEST WITH CUSTOM PATH - SET VALID MODE (S) - WRITE ' , done => {
        history.push('/free/write');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.topic).toBe("free");
            expect(rootStore.forum.getQuery.mode).toBe("write");
            expect(rootStore.forum.getQuery.page).toBe(1);
            done();
        })
    })

    it('INIT() TEST WITH CUSTOM PATH - SET INVALID MODE (F) - INVALID MODE NAME (list -> lists)', done => {
        render(
            <Router history={history}>
            </Router>
        );
        history.push('/free/lists/100');
        rootStore.forum.init();

        autorun( () => {
            expect(rootStore.forum.getQuery.mode).toBe("error");
            expect(history.location.pathname).toBe("/error/404")
            done();
        })
    })


    it('INIT() TEST WITH CUSTOM PATH - SET VALID PAGE OR POSTID (S) - WITHOUT PAGE NO' , done => {
        history.push('/free/list');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.topic).toBe("free");
            expect(rootStore.forum.getQuery.mode).toBe("list");
            expect(rootStore.forum.getQuery.page).toBe(1);
            expect(rootStore.forum.getQuery.postId).toBe(0);

            done();
        })
    })


    it('INIT() TEST WITH CUSTOM PATH - SET VALID PAGE OR POSTID (S) - WITH PAGE NO' , done => {
        history.push('/free/list/2');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.topic).toBe("free");
            expect(rootStore.forum.getQuery.mode).toBe("list");
            expect(rootStore.forum.getQuery.page).toBe(2);
            expect(rootStore.forum.getQuery.postId).toBe(0);

            done();
        })
    })

    it('INIT() TEST WITH CUSTOM PATH - SET INVALID PAGE OR POSTID (F) - WITHOUT POSTID' , done => {
        render(
            <Router history={history}>
            </Router>
        );
        history.push('/free/post');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.mode).toBe("error");
            expect(history.location.pathname).toBe("/error/404")
            done();
        })
    })


    it('INIT() TEST WITH CUSTOM PATH - SET INVALID PAGE OR POSTID (F) - INVALID POSTID' , done => {
        render(
            <Router history={history}>
            </Router>
        );
        history.push('/free/post/abcd123');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.mode).toBe("error");
            expect(history.location.pathname).toBe("/error/404")
            done();
        })
    })

    it('INIT() TEST WITH CUSTOM PATH - SET INVALID PAGE OR POSTID (F) - EDIT without POSTID' , done => {
        render(
            <Router history={history}>
            </Router>
        );
        history.push('/free/edit');
        rootStore.forum.init();
        autorun( () => {
            expect(rootStore.forum.getQuery.mode).toBe("error");
            expect(history.location.pathname).toBe("/error/404")
            done();
        })
    })




})