(this["webpackJsonpr6-search-community"]=this["webpackJsonpr6-search-community"]||[]).push([[9],{445:function(t,e,n){},451:function(t,e,n){"use strict";n.r(e);var a=n(21),r=n(22),i=n(27),c=n(26),o=n(10),s=n(0),l=n.n(s),u=n(11),d=n(421),p=n(400),h=n(413),f=(n(443),n(444),n(54)),v=n(162),m=n(123),b=n(164),g=n(79),O=n(410),E={isLoading:!1,isError:!1,data:void 0,platform:"",id:""},y=function(t){Object(i.a)(n,t);var e=Object(c.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"mutate",value:function(t){switch(t.type){case"CLICKREGISTERBUTTON":return Object(v.a)(Object(m.a)({type:"SETLOADING",isLoading:!0}),this.postUpload(t.title,t.content,t.topic).pipe(Object(g.a)((function(t){return{type:"SUCCESS",postId:t.response.postId}})),Object(O.a)((function(t){return Object(m.a)({type:"FAILRUE"})}))));case"SELECTRANK":return Object(m.a)({type:"ADDRANKDATA",data:t.data,id:t.id,platform:t.platform})}}},{key:"reduce",value:function(t,e){var n=t;switch(e.type){case"SETLOADING":return n.isLoading=e.isLoading,n;case"ADDRANKDATA":return n.data=e.data,n;case"POSTUPLOAD":default:return n}}},{key:"postUpload",value:function(t,e,n){var a=new FormData;return a.append("title",t),a.append("content",e),a.append("type",n),b.a.shared.post("post",a,"multipart",!0)}}]),n}(f.b),j=(n(445),n(56)),S=n(408),I=n(419),T=n(418),A=n(409),C=n(449),L=n(412),R=n(411),k={isActive:!1,isLoading:!1,isError:!1,result:[],resultQuery:"",value:""},w=function(t){Object(i.a)(n,t);var e=Object(c.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"mutate",value:function(t){switch(t.type){case"WRITETEXT":return Object(m.a)({type:"UPDATETEXT",text:t.text});case"INVIS_SEARCHLIST":return Object(v.a)(Object(m.a)({type:"SETLOADING",isLoading:!0}),this.fetchID(t.text).pipe(Object(L.a)(this.action.pipe(Object(R.a)((function(t){return"CANCELSEARCH"===t.type||"INVIS_SEARCHLIST"===t.type||"WRITETEXT"===t.type})))),Object(g.a)((function(e){return{type:"FETCHLIST",list:e,query:t.text}}))));case"CANCELSEARCH":return Object(v.a)(Object(m.a)({type:"SETLOADING",isLoading:!1}),Object(m.a)({type:"SUGGESTIONACTIVE",isActive:!1}));case"CLICKSEARCH":return Object(v.a)(Object(m.a)({type:"SUGGESTIONACTIVE",isActive:!0}))}}},{key:"reduce",value:function(t,e){var n=t;switch(e.type){case"FETCHLIST":return n.result=e.list,n.resultQuery=e.query,n.isLoading=!1,0===e.list.length&&(n.isError=!0),n;case"SETLOADING":return n.isLoading=e.isLoading,n;case"SUGGESTIONACTIVE":return n.isActive=e.isActive,n;case"UPDATETEXT":return n.value=e.text,n}}},{key:"fetchID",value:function(t){return Object(C.a)(b.a.shared.getJson("http://r6-search.me/api/stat/rank/uplay/".concat(t)).pipe(Object(f.d)([])),b.a.shared.getJson("http://r6-search.me/api/stat/rank/xbl/".concat(t)).pipe(Object(f.d)([])),b.a.shared.getJson("http://r6-search.me/api/stat/rank/psn/".concat(t)).pipe(Object(f.d)([])))}}]),n}(f.b);n(150);function N(){return(N=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t}).apply(this,arguments)}function x(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var D=l.a.createElement("path",{d:"m72 8.5-64 168h128c0 61.855469 50.144531 112 112 112s112-50.144531 112-112h128l-64-168zm0 0",fill:"#acabb1"}),H=l.a.createElement("path",{d:"m248 288.5c-61.855469 0-112-50.144531-112-112h-128v192h480v-192h-128c0 61.855469-50.144531 112-112 112zm-160 48",fill:"#414042"}),G=l.a.createElement("g",{fill:"#231f20"},l.a.createElement("path",{d:"m495.480469 173.652344-64-168c-1.183594-3.105469-4.160157-5.152344-7.480469-5.152344h-352c-3.320312 0-6.296875 2.046875-7.480469 5.152344l-64 168c-.292969.824218-.4492185 1.6875-.4648435 2.558594 0 .105468-.0546875.183593-.0546875.289062v192c0 4.417969 3.582031 8 8 8h480c4.417969 0 8-3.582031 8-8v-192c0-.105469-.054688-.183594-.054688-.289062-.015624-.871094-.171874-1.734376-.464843-2.558594zm-417.96875-157.152344h340.976562l57.902344 152h-116.390625c-4.417969 0-8 3.582031-8 8 0 57.4375-46.5625 104-104 104s-104-46.5625-104-104c0-4.417969-3.582031-8-8-8h-116.390625zm402.488281 344h-464v-176h112.265625c4.1875 63.046875 56.546875 112.042969 119.734375 112.042969s115.546875-48.996094 119.734375-112.042969h112.265625zm0 0"}),l.a.createElement("path",{d:"m56 328.5h-8v-24c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v32c0 4.417969 3.582031 8 8 8h16c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8zm0 0"}),l.a.createElement("path",{d:"m104 328.5h-16c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8h16c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8zm0 0"})),U=function(t){var e=t.svgRef,n=t.title,a=x(t,["svgRef","title"]);return l.a.createElement("svg",N({height:"496pt",viewBox:"0 -59 496 495",width:"496pt",ref:e},a),n?l.a.createElement("title",null,n):null,D,H,G)},z=l.a.forwardRef((function(t,e){return l.a.createElement(U,N({svgRef:e},t))})),P=(n.p,n(71));function K(){var t=Object(o.a)(["\n\n    display:flex;\n    flex-direction:column;\n    justify-content:center;\n\n    #rank {\n        font-size:1.5rem;\n        color:black;\n        margin-bottom:7px;\n    }\n\n    #mmr .mmr-tag {\n        font-weight:bolder;\n        color:black;\n    }\n\n    #mmr .mmr-value {\n        font-weight:normal;\n        color:darkgray;\n    }\n    \n"]);return K=function(){return t},t}function M(){var t=Object(o.a)(["\n    display:flex;\n    flex-direction:row;\n"]);return M=function(){return t},t}function F(){var t=Object(o.a)(["\n    display:flex;\n    flex-direction:row;\n"]);return F=function(){return t},t}u.a.div(F()),u.a.div(M()),u.a.div(K());var B=function(t){Object(i.a)(n,t);var e=Object(c.a)(n);function n(t){var r;return Object(a.a)(this,n),(r=e.call(this,t)).reactor=void 0,r.subject=void 0,r.state=k,r}return Object(r.a)(n,[{key:"componentWillMount",value:function(){var t,e=this;this.reactor=new w(k),this.subject=new j.a,this.subject.pipe(Object(S.a)(),Object(I.a)((function(t){var n;return null===(n=e.reactor)||void 0===n?void 0:n.dispatch({type:"WRITETEXT",text:t})})),Object(T.a)(500),Object(g.a)((function(t){return{type:"INVIS_SEARCHLIST",text:t}}))).subscribe(null===(t=this.reactor)||void 0===t?void 0:t.action)}},{key:"componentDidMount",value:function(){var t,e,n,a,r,i,c=this;null===(t=this.reactor)||void 0===t||t.state.pipe(Object(g.a)((function(t){return t.isLoading})),Object(f.e)(),Object(A.a)(1)).subscribe((function(t){return c.setState({isLoading:t})})),null===(e=this.reactor)||void 0===e||e.state.pipe(Object(g.a)((function(t){return t.result})),Object(f.e)(),Object(A.a)(1)).subscribe((function(t){return c.setState({result:t})})),null===(n=this.reactor)||void 0===n||n.state.pipe(Object(g.a)((function(t){return t.isError})),Object(f.e)(),Object(A.a)(1)).subscribe((function(t){return c.setState({isError:t})})),null===(a=this.reactor)||void 0===a||a.state.pipe(Object(g.a)((function(t){return t.isActive})),Object(f.e)(),Object(A.a)(1)).subscribe((function(t){return c.setState({isActive:t})})),null===(r=this.reactor)||void 0===r||r.state.pipe(Object(g.a)((function(t){return t.value})),Object(f.e)(),Object(A.a)(1)).subscribe((function(t){return c.setState({value:t})})),null===(i=this.reactor)||void 0===i||i.state.pipe(Object(g.a)((function(t){return t.resultQuery})),Object(f.e)(),Object(A.a)(1)).subscribe((function(t){return c.setState({resultQuery:t})}))}},{key:"getCell",value:function(t){return t.map((function(t,e){return t.length>0?void 0:[]}))}},{key:"getList",value:function(t,e,n,a){return!e||e&&!a&&!n?l.a.createElement("div",{className:"search-result"},l.a.createElement("span",{role:"img","aria-labelledby":"hello"}," \ud83d\udc4b \ub808\uc778\ubcf4\uc6b0 \uc2dd\uc2a4 \uc2dc\uc988 \uc804\uc801\uac80\uc0c9\ucc3d \uc785\ub2c8\ub2e4. "),l.a.createElement("div",null," \ubc14\ub85c \uac80\uc0c9\ud558\uc5ec \ubcf8\uc778\uc758 \uc804\uc801\ub0b4\uc6a9\uc744 \ucd94\uac00\ud574\ubcf4\uc138\uc694. "),l.a.createElement("div",null," Powered by R6-search.me ")):n?l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"loading-container"},l.a.createElement("svg",{className:"loading-circle"},l.a.createElement("circle",{cx:"50%",cy:"50%",r:"25"})),l.a.createElement("div",{className:"search-loading"},' "',e,'" \ub97c R6-Search\uc5d0\uc11c \uac80\uc0c9\uc911...'))):3===t.filter((function(t){return 0===t.length})).length&&a?l.a.createElement("div",{className:"search-empty"},l.a.createElement(z,{style:{height:"120px",width:"100%"}}),l.a.createElement("div",null,' "',a,'" \ub2d8\uc758 \uac80\uc0c9\uacb0\uacfc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4! '),l.a.createElement("div",null," \uac80\uc0c9\uc5b4\ub97c \ud655\uc778\ud574\uc8fc\uc138\uc694. ")):l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"search-result"},l.a.createElement("div",null,' "',a,'" \ub2d8\uc758 \uac80\uc0c9\uacb0\uacfc \uc785\ub2c8\ub2e4. '),l.a.createElement("div",null," \ud074\ub9ad\ud558\uc5ec \uc804\uc801\uc744 \ucd94\uac00\ud558\uc138\uc694.  "),l.a.createElement("div",null," Powered by R6-search.me ")),this.getCell(t))}},{key:"handleChange",value:function(t){this.subject.next(t.target.value)}},{key:"render",value:function(){if(this.props){var t=this.reactor,e=t.currentState,n=e.value,a=e.result,r=e.isLoading,i=e.resultQuery,c=e.isActive;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"search-input"},l.a.createElement(P.a,{name:"search",size:"big",className:"search-input-icon",color:"green"}),l.a.createElement("input",{className:"r6idsearch",placeholder:"\uc804\uc801\uc744 \ubc14\ub85c \uac80\uc0c9\ud574\ubcf4\uc138\uc694.",onFocus:function(){t.dispatch({type:"CLICKSEARCH"})},onBlur:function(){t.dispatch({type:"CANCELSEARCH"})},value:n,onChange:this.handleChange.bind(this)}),c&&l.a.createElement("div",{className:"cellContainer"},this.getList(a,n,r,i))))}return console.warn("R6IDSEARCH NOT LOADED"),null}}]),n}(l.a.PureComponent),V=n(24);function J(){var t=Object(o.a)(["\n    font-size:1.2rem;\n"]);return J=function(){return t},t}function Q(){var t=Object(o.a)(["\n    display:flex\n    flex-direction:column;\n    align-items:flex-start;\n    width:100%;\n"]);return Q=function(){return t},t}function X(){var t=Object(o.a)(["\n    display:flex;\n    justify-content: flex-end;\n"]);return X=function(){return t},t}function W(){var t=Object(o.a)(["\n    width:50%;\n    margin-bottom:10px;\n"]);return W=function(){return t},t}function _(){var t=Object(o.a)(["\n    width:100%;\n    margin-bottom:10px;\n"]);return _=function(){return t},t}var q=u.a.div(_()),Y=(u.a.div(W()),u.a.div(X())),Z=u.a.div(Q()),$=u.a.div(J()),tt=function(t){Object(i.a)(n,t);var e=Object(c.a)(n);function n(t){var r;return Object(a.a)(this,n),(r=e.call(this,t)).editorRef=l.a.createRef(),r.titleRef=l.a.createRef(),r.reactor=void 0,r.state=E,r.reactor=new y(E),r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t,e,n,a=this;null===(t=this.reactor)||void 0===t||t.state.pipe(Object(g.a)((function(t){return t.isLoading})),Object(S.a)(),Object(A.a)(1)).subscribe((function(t){return a.setState({isLoading:t})})),null===(e=this.reactor)||void 0===e||e.fireImmediately((function(t){return"ADDRANKDATA"===t.type}),(function(t){a.insertTable(t.data,t.platform,t.id)})),null===(n=this.reactor)||void 0===n||n.fireImmediately((function(t){return"SUCCESS"===t.type}),(function(t){a.props.reactor.dispatch({type:"SETPAGENO",pageId:t.postId}),a.props.history.push("post/".concat(t.postId))}))}},{key:"onAddImageBlob",value:function(t,e){}},{key:"uploadImage",value:function(t){new FormData}},{key:"getInstanceofEditor",value:function(){var t;return null===(t=this.editorRef.current)||void 0===t?void 0:t.getInstance()}},{key:"getHtml",value:function(){var t;return null===(t=this.getInstanceofEditor())||void 0===t?void 0:t.getHtml()}},{key:"insertTable",value:function(t,e,n){var a,r=t.wins+t.losses>0?Math.floor(t.wins/(t.wins+t.losses)*100):0,i=t.kills+t.death>0?Math.floor(t.kills/(t.kills+t.death)*100):0,c=this.getHtml()+"\n        <table>\n        <thead>\n        <tr>\n        <th><strong>\uc544\uc774\ub514</strong></th>\n        <th><strong>\ud50c\ub7ab\ud3fc</strong></th>\n        <th><strong>\ub7ad\ud06c</strong></th>\n        <th><strong>MMR</strong></th>\n        <th><strong>\uc2dc\uc98c \ucd5c\ub300 \ub7ad\ud06c</strong></th>\n        <th><strong>\uc2dc\uc98c \ucd5c\ub300 MMR</strong></th>\n        <th><strong>\uc2b9\ub960</strong></th>\n        <th><strong>K/D</strong></th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr>\n        <td>".concat(n,"</td>\n        <td>").concat(e,"</td>\n        <td>").concat(t.rankString,"</td>\n        <td>").concat(t.mmr,"</td>\n        <td>").concat(t.maxRankString,"</td>\n        <td>").concat(t.maxMmr,"</td>\n        <td>").concat(r," % </td>\n        <td>").concat(i," %</td>\n        </tr>\n        </tbody>\n        </table>\n        ");null===(a=this.getInstanceofEditor())||void 0===a||a.setHtml(c,!0)}},{key:"render",value:function(){var t=this,e=this.props.reactor.getState().topic;this.state.isLoading;return l.a.createElement(Z,null,l.a.createElement(q,null,l.a.createElement(h.a,{size:"large",style:{width:"100%"},placeholder:"\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694",ref:this.titleRef})),l.a.createElement(q,null,"together"===e&&l.a.createElement(B,{reactor:this.reactor})),l.a.createElement(q,null,l.a.createElement($,null,l.a.createElement(d.Editor,{height:"600px",initialEditType:"wysiwyg",ref:this.editorRef}))),l.a.createElement(q,null,l.a.createElement(Y,null,l.a.createElement(p.a,{size:"big",disabled:this.state.isLoading,onClick:function(){t.props.history.goBack()}}," \ucde8\uc18c\ud558\uae30 "),l.a.createElement(p.a,{size:"big",loading:this.state.isLoading,disabled:this.state.isLoading,positive:!0,onClick:function(){if(t.props.reactor.getState().isLogined){var n,a=t.getHtml()?t.getHtml():"";null===(n=t.reactor)||void 0===n||n.dispatch({type:"CLICKREGISTERBUTTON",title:t.titleRef.current.inputRef.current.value,content:a,topic:e})}else{var r;null===(r=t.props.reactor)||void 0===r||r.dispatch({type:"CLICKLOGINBUTTON"})}}}," \ub4f1\ub85d\ud558\uae30 "))))}}]),n}(l.a.Component),et=Object(V.f)(tt);function nt(){var t=Object(o.a)(["\n    width:100%;\n    margin-bottom:10px;\n"]);return nt=function(){return t},t}u.a.div(nt());var at=function(t){Object(i.a)(n,t);var e=Object(c.a)(n);function n(){return Object(a.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return l.a.createElement(et,{reactor:this.props.reactor})}}]),n}(l.a.PureComponent);e.default=at}}]);
//# sourceMappingURL=9.fe2c96a2.chunk.js.map