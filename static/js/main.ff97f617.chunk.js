(this["webpackJsonpr6-search-community"]=this["webpackJsonpr6-search-community"]||[]).push([[2],{178:function(e,n,t){e.exports=t(308)},184:function(e,n,t){},185:function(e,n,t){},307:function(e,n,t){e.exports=t.p+"static/media/error.96fe8c20.png"},308:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),i=t(44),o=t.n(i),c=(t(183),t(184),t(29)),u=t(30),l=t(32),s=t(31),m=t(13),p=(t(185),t(14));function d(){var e=Object(m.a)(["\n    font-family: 'Anton',sans-serif;\n    font-size: 2.8rem;\n    cursor: none;\n    text-decoration: unset;\n    color: white;\n    opacity:0.3;\n"]);return d=function(){return e},e}function h(){var e=Object(m.a)(["\n    margin: 0 auto;\n    max-width: 1200px;\n    padding: 50px 1rem;\n"]);return h=function(){return e},e}function f(){var e=Object(m.a)(["\n    background-color:#2C3031;\n    height:300px;\n    width:100%;\n"]);return f=function(){return e},e}var g=p.a.footer(f()),v=p.a.div(h()),b=p.a.div(d()),C=(r.a.Component,t(317)),O=t(54),E=t(15);function x(){var e=Object(m.a)(["\n\n    font-weight:700;\n    color: black;\n    cursor:pointer;\n\n    margin-right: 25px;\n\n    & p {\n        margin: 0;\n        padding:0;\n        margin-top:-6px;\n    }\n\n    & div {\n        flex:1;\n        background:black;\n        height:5px;\n        border-radius:20px;\n        margin : auto 5px;\n        margin-top:3px;\n        background:black;\n    }\n"]);return x=function(){return e},e}function j(){var e=Object(m.a)(["\n\n    font-weight:500;\n    cursor:pointer;\n    transition: 0.2s;\n    color: #BABECC;\n    \n    margin-right: 25px;\n\n    & p {\n        margin: 0;\n        padding:0;\n    }\n\n    & div {\n        height:5px;\n        flex:1;\n        background: #BABECC;\n        border-radius:20px;\n        opacity:0;\n        margin-left: -10px;\n        transition: 0.2s ease-out;\n    }\n\n    &:hover p {\n        font-weight:700;\n        margin-top:-6px;\n    }\n\n    &:hover div {\n        margin-left:0px;\n        opacity:1;\n    }\n"]);return j=function(){return e},e}var w=p.a.div(j()),y=p.a.div(x());function T(e){var n=e.children,t=e.selected,a=e.onClick;e.value;return t?r.a.createElement(y,{onClick:a},r.a.createElement("p",null,n),r.a.createElement("div",null)):r.a.createElement(w,{onClick:a},r.a.createElement("p",null,n),r.a.createElement("div",null))}function I(){var e=Object(m.a)(["\n\n    display: flex;\n    text-align: center;\n    font-size:2.3rem;\n    \n \n    \n    @media screen and (max-width:820px) {\n        & div {\n            font-size:1.8rem;\n        }\n    }\n\n    @media screen and (max-width:620px) {\n        & div {\n            font-size:1.5rem;\n        }\n    }\n\n\n    @media screen and (max-width:500px) {\n        & div {\n            font-size:1.3rem;\n        }\n    }   \n\n    @media screen and (max-width:400px) {\n        & div {\n            font-size:1rem;\n        }\n    }   \n"]);return I=function(){return e},e}var L=p.a.div(I());function k(e){var n=e.onChange,t=e.currentValue,a=e.children;return r.a.createElement(L,null,function(e,n){var t=0;return r.a.Children.map(e,(function(a){return r.a.isValidElement(a)?n(a,t++,r.a.Children.count(e)):a}))}(a,(function(e,a,i){var o=e.props.value;return r.a.cloneElement(e,{onClick:function(){var e;e=o,n&&n(e)},selected:null!==t&&t===o,value:o})})))}function A(){var e=Object(m.a)(["\n  max-width: 1200px;\n  margin: 0 auto;\n  padding-top: 5rem;\n  padding-left: 1rem;\n"]);return A=function(){return e},e}function S(){var e=Object(m.a)(["\n    font-family: 'Anton', sans-serif;\n    font-size: 2.8rem;\n    color:black;\n    cursor: pointer;\n    text-decoration: unset;\n    margin-right:auto;\n\n    &:hover {\n        color: black;\n    }\n\n    @media only screen and (max-width: 380px) {\n      & {\n        font-size: 1.5rem;\n        }\n\n        & button {\n            font-size: 3.0rem;\n        }\n    }\n\n    @media only screen and (max-width: 600px) {\n\n      & {\n        font-size: 2.0rem;\n      }\n\n        & button {\n            font-size: 1.5rem;\n        }\n\n    }\n"]);return S=function(){return e},e}function P(){var e=Object(m.a)(["\n  display: flex;\n  align-items: center;\n  max-width: 1200px;\n  height: 100%;\n  margin: 0 auto;\n  padding: 0 1rem;\n\n"]);return P=function(){return e},e}function z(){var e=Object(m.a)(["\n\tposition: relative;\n\ttop: 0;\n\tleft: 0;\n\tz-index: 10;\n\twidth: 100%;\n\theight: 70px;\n"]);return z=function(){return e},e}function N(){var e=Object(m.a)(["\n    max-width:1200px;\n    height:70px;\n"]);return N=function(){return e},e}p.a.nav(N());var G=p.a.nav(z()),D=p.a.div(P()),H=p.a.a(S()),K=p.a.div(A()),B=function(e){Object(l.a)(t,e);var n=Object(s.a)(t);function t(){return Object(c.a)(this,t),n.apply(this,arguments)}return Object(u.a)(t,[{key:"componentDidMount",value:function(){}},{key:"handleToggle",value:function(e,n){(0,this.props.reactor_control.dispatcher)({type:"CLICKTOPIC",newTopic:e})(),n?this.props.history.push("".concat(n)):this.props.history.push("/".concat(e))}},{key:"render",value:function(){var e=this,n=this.props.reactor_control.getState().topic;return r.a.createElement(r.a.Fragment,null,r.a.createElement(G,null,r.a.createElement(D,null,r.a.createElement(H,{onClick:function(){e.handleToggle("free","/")}}," R6 Search - TALK "),r.a.createElement(C.a,{secondary:!0,compact:!0},"\ub85c\uadf8\uc778\ud558\uae30"))),r.a.createElement(K,null,r.a.createElement(k,{onChange:this.handleToggle.bind(this),currentValue:n},r.a.createElement(T,{value:"free"}," \uc790\uc720\uac8c\uc2dc\ud310 "),r.a.createElement(T,{value:"tips"}," \uacf5\ub7b5/\ud301 "),r.a.createElement(T,{value:"together"}," \uac19\uc774\ud574\uc694 "),r.a.createElement(T,{value:"clan"}," \ud074\ub79c\ubaa8\uc9d1 "))))}}]),t}(r.a.Component),F=Object(E.f)(Object(O.e)(B,(function(e){return{topic:e.topic}})));function M(){var e=Object(m.a)(["\n    height: calc(100vh - 70px);\n    display:flex;\n    justify-content:space-evenly;\n    align-items:center;\n    flex-direction: column;\n\n    & img {\n        height : 180px;\n        width: 180px;\n    }\n\n    & div {\n        font-size:1.2rem;\n        font-weight:bold;\n    }\n  \n    @media screen and (max-width: 700px) {\n\n        & img {\n            height:100px;\n            width:100px;\n        }\n\n      }\n\n"]);return M=function(){return e},e}var _=p.a.div(M());var J=Object(E.f)((function(e){var n=e.history;return r.a.createElement(_,null,r.a.createElement("img",{src:t(307)}),r.a.createElement("div",null," \uc874\uc7ac\ud558\uc9c0 \uc54a\ub294 \ud398\uc774\uc9c0 \uc785\ub2c8\ub2e4."),r.a.createElement(C.a,{color:"black",size:"medium",onClick:n.goBack}," \ub3cc\uc544\uac00\uae30 "))})),R=t(119),V=t(86),W=t(319),$=t(316),q=t(315),Q=t(88),U=t(318),X=(t(158),t(8),t(313));t(314),t(45);function Y(e){return Object(X.a)((function(n){return Object(V.a)(e)}))}var Z={meta:{currentPage:1,totalPage:10},postList:[{postId:1,recommendCnt:0,viewCnt:2,createdTime:"2020-01-01T00:00:00",title:"\uacf5\uc9c0\uc785\ub2c8\ub2e4",author:"test1",hasImg:!0,notice:!0},{postId:2,recommendCnt:0,viewCnt:0,createdTime:"2020-01-01T00:00:00",title:"title1",author:"test1",hasImg:!0,notice:!1},{postId:2,recommendCnt:0,viewCnt:0,createdTime:"2020-01-01T00:00:00",title:"title1",author:"test1",hasImg:!0,notice:!1},{postId:2,recommendCnt:0,viewCnt:0,createdTime:"2020-01-01T00:00:00",title:"title1",author:"test1",hasImg:!0,notice:!1},{postId:2,recommendCnt:0,viewCnt:0,createdTime:"2020-01-01T00:00:00",title:"title1",author:"test1",hasImg:!0,notice:!1},{postId:2,recommendCnt:0,viewCnt:0,createdTime:"2020-01-01T00:00:00",title:"title1",author:"test1",hasImg:!0,notice:!1},{postId:2,recommendCnt:0,viewCnt:0,createdTime:"2020-01-01T00:00:00",title:"title1",author:"test1",hasImg:!0,notice:!1},{postId:2,recommendCnt:0,viewCnt:0,createdTime:"2020-01-01T00:00:00",title:"title1",author:"test1",hasImg:!0,notice:!1}]};var ee={isError:!1,isLoading:!0,page:1,mode:"list",topic:"free",post:void 0,list:[],isLogined:!1},ne=function(e){Object(l.a)(t,e);var n=Object(s.a)(t);function t(){return Object(c.a)(this,t),n.apply(this,arguments)}return Object(u.a)(t,[{key:"mutate",value:function(e){switch(e.type){case"CLICKTOPIC":return Object(R.a)(Object(V.a)({type:"TOPICCHANGE",topic:e.newTopic}),Object(V.a)({type:"MODECHANGE",mode:"list"}),Object(V.a)({type:"SETLOADING",isLoading:!0}),this.fetchList(e.newTopic).pipe(Object($.a)(this.action.pipe(Object(q.a)((function(n){return n.type===e.type})))),Object(Q.a)((function(e){return{type:"FETCHLIST",list:e.postList,page:1}}))));case"CLICKBACK":return Object(V.a)({type:"MODECHANGE",mode:"list"});case"CLICKWRITE":return Object(V.a)({type:"MODECHANGE",mode:"edit"});case"CLICKPAGE":return Object(R.a)(Object(V.a)({type:"SETLOADING",isLoading:!0}),this.fetchList(this.currentState.topic,e.newPage).pipe(Object($.a)(this.action.pipe(Object(q.a)((function(n){return n===e})))),Object(Q.a)((function(e){return{type:"FETCHLIST",list:e.postList,page:1}}))),Object(V.a)({type:"SETLOADING",isLoading:!1}));case"CLICKPOST":return Object(R.a)(Object(V.a)({type:"MODECHANGE",mode:"view"}),Object(V.a)({type:"SETLOADING",isLoading:!0}),this.fetchPost(e.postId).pipe(Object(U.a)((function(e){return console.log(e)})),Object(Q.a)((function(e){return{type:"FETCHPOST",post:e}}))),Object(V.a)({type:"SETLOADING",isLoading:!1}))}}},{key:"reduce",value:function(e,n){var t=e;switch(n.type){case"TOPICCHANGE":return t.topic=n.topic,t;case"MODECHANGE":return t.mode=n.mode,t;case"SETLOADING":return t.isLoading=n.isLoading,t;case"FETCHLIST":return t.isLoading=!1,t.list=n.list,t.page=n.page,t;case"FETCHPOST":return 0===Object.keys(n.post).length?(t.isError=!0,t):(t.post=n.post,t)}}},{key:"fetchList",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return W.a.getJSON("https://www.r6-search.me/api/c/topic/".concat(e,"?page=").concat(n)).pipe(Y(Z))}},{key:"fetchPost",value:function(e){return W.a.getJSON("https://www.r6-search.me/api/c/post/".concat(e)).pipe(Y({postId:33,author:"test-account",title:"\uc218\uc815\ub41c \uc81c\ubaa9\uc785\ub2c8\ub2e4",content:"\uc218\uc815\ub41c \ub0b4\uc6a9\uc785\ub2c8\ub2e4",viewCnt:7,recommendCnt:0,commentList:[{commentId:7,username:"test-account",content:"\uc218\uc815\ub367\uae00",childComment:[],createdTime:"2020-08-01T03:20:48"},{commentId:8,username:"test-account",content:"\ud14c\uc2a4\ud2b8 \ub367\uae00\uc785\ub2c8\ub2e4",childComment:[],createdTime:"2020-08-01T03:25:19"}],createdTime:"2020-08-01T03:08:23",recommend:!1}))}}]),t}(O.b);function te(){var e=Object(m.a)(["\n    margin: 0 auto;\n    max-width: 1200px;\n    margin-top:90px;\n    padding: 0 1rem;\n"]);return te=function(){return e},e}var ae=p.a.div(te());r.a.Component;function re(){var e=Object(m.a)(["\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 1.5rem 1rem;\n"]);return re=function(){return e},e}function ie(){var e=Object(m.a)(["\n  min-height:90vh;\n"]);return ie=function(){return e},e}var oe=Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,326))})),ce=(Object(a.lazy)((function(){return Promise.all([t.e(0),t.e(1)]).then(t.bind(null,326))})),p.a.div(ie()),p.a.div(re())),ue=function(e){Object(l.a)(t,e);var n=Object(s.a)(t);function t(e){var a;return Object(c.a)(this,t),(a=n.call(this,e)).reactor=void 0,a.reactorControl=void 0,a.reactor=new ne(ee),a.reactorControl=a.reactor.getReactorControl(),a.state={currentTopic:ee.topic},a}return Object(u.a)(t,[{key:"componentDidMount",value:function(){this.reactor.dispatch({type:"CLICKTOPIC",newTopic:"free"})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(F,{reactor_control:this.reactorControl}),r.a.createElement(ce,null,r.a.createElement(E.c,null,r.a.createElement(E.a,{path:["/","/free"],exact:!0,key:"free"},r.a.createElement(oe,{reactor_control:this.reactorControl})),r.a.createElement(E.a,{path:"/tips",exact:!0},r.a.createElement(oe,{reactor_control:this.reactorControl})),r.a.createElement(E.a,{path:"/together",exact:!0},r.a.createElement(oe,{reactor_control:this.reactorControl})),r.a.createElement(E.a,{path:"/clan",exact:!0},r.a.createElement(oe,{reactor_control:this.reactorControl})),r.a.createElement(E.a,null,r.a.createElement(J,null)))))}}]),t}(r.a.PureComponent),le=Object(E.f)(ue);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var se=t(67);o.a.render(r.a.createElement(r.a.Fragment,null,r.a.createElement(se.a,null,r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",null,"loading...")},r.a.createElement(le,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[178,3,4]]]);
//# sourceMappingURL=main.ff97f617.chunk.js.map