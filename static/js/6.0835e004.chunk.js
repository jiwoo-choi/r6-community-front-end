(this["webpackJsonpr6-search-community"]=this["webpackJsonpr6-search-community"]||[]).push([[6],{420:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(24),r=n(25),c=n(419),s=n(112),i=function(){function e(){Object(a.a)(this,e),this.accessToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LWFjY291bnQiLCJpYXQiOjE1OTY1ODk2ODIsImV4cCI6MTU5NjY3NjA4Mn0.ETUR_vF_LDuPk4opbrAqs5EcV8oiYVp7gqOZO0AnKHI",this.baseUrl="http://r6-search.me",this.baseURLWithAPIVersion=this.baseUrl+"/api/c/",this.id=void 0,this.pwd=void 0}return Object(r.a)(e,[{key:"signIn",value:function(e,t){var n=this,a=new URL("/signin",this.baseURLWithAPIVersion).href;return c.a.post(a,{password:t,username:e},{"Content-Type":"application/json"}).pipe(Object(s.a)((function(a){return n.id=e,n.pwd=t,n.accessToken=a.response.jwtToken,a.response.jwtToken})))}},{key:"updateAccessToken",value:function(e,t){var n=new URL("/signin",this.baseUrl).href;return c.a.post(n,{password:t,username:e},{"Content-Type":"application/json"}).pipe(Object(s.a)((function(e){return e.response.jwtToken})))}},{key:"post",value:function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=new URL(e,this.baseURLWithAPIVersion),s=r.href;return c.a.post(s,t,this.getHeader(n,a))}},{key:"getJson",value:function(e,t){var n=new URL(e,this.baseURLWithAPIVersion).href;return c.a.getJSON(n,this.getHeader(t,!1))}},{key:"getHeader",value:function(e,t){var n={};switch(e){case"json":n={"Content-Type":"application/json"};break;case"multipart":break;default:e||(n=e)}return this.accessToken&&t?(n.Authorization="Bearer ".concat(this.accessToken),n):n}}],[{key:"createInstance",value:function(){return new e}},{key:"shared",get:function(){return e.instance||(e.instance=e.createInstance()),e.instance}}]),e}();i.instance=null},447:function(e,t,n){},448:function(e,t,n){},451:function(e,t,n){"use strict";n.r(t);var a=n(38),r=n(24),c=n(25),s=n(27),i=n(26),o=n(10),l=n(0),u=n.n(l),p=n(11),m=n(422),d=n(54),h=n(4),b=n.n(h),f=n(5),O=n.n(f),j=(n(7),n(23)),v=n(116),E=n(117),g=n(6);function L(e){var t=e.active,n=e.className,a=e.children,r=e.content,c=O()(Object(j.a)(t,"active"),n),s=Object(v.a)(L,e),i=Object(E.a)(L,e);return u.a.createElement(i,b()({},s,{className:c}),g.a.isNil(a)?r:a)}L.handledProps=["active","as","children","className","content"],L.defaultProps={as:"a"},L.propTypes={};var N=L;function y(e){var t=e.className,n=e.children,a=e.content,r=O()("actions",t),c=Object(v.a)(y,e),s=Object(E.a)(y,e);return u.a.createElement(s,b()({},c,{className:r}),g.a.isNil(n)?a:n)}y.handledProps=["as","children","className","content"],y.propTypes={};var I=y;function T(e){var t=e.className,n=e.children,a=e.content,r=O()("author",t),c=Object(v.a)(T,e),s=Object(E.a)(T,e);return u.a.createElement(s,b()({},c,{className:r}),g.a.isNil(n)?a:n)}T.handledProps=["as","children","className","content"],T.propTypes={};var k=T,P=n(65),A=n.n(P),w=n(62),C=n(118);function R(e){var t=e.className,n=e.src,a=O()("avatar",t),r=Object(v.a)(R,e),c=Object(w.c)(r,{htmlProps:w.a}),s=A()(c,2),i=s[0],o=s[1],l=Object(E.a)(R,e);return u.a.createElement(l,b()({},o,{className:a}),Object(C.a)(n,{autoGenerateKey:!1,defaultProps:i}))}R.handledProps=["as","className","src"],R.propTypes={};var U=R;function S(e){var t=e.className,n=e.children,a=e.content,r=O()(t,"content"),c=Object(v.a)(S,e),s=Object(E.a)(S,e);return u.a.createElement(s,b()({},c,{className:r}),g.a.isNil(n)?a:n)}S.handledProps=["as","children","className","content"],S.propTypes={};var x=S;n(58);function Y(e){var t=e.className,n=e.children,a=e.collapsed,r=e.content,c=e.minimal,s=e.size,i=e.threaded,o=O()("ui",s,Object(j.a)(a,"collapsed"),Object(j.a)(c,"minimal"),Object(j.a)(i,"threaded"),"comments",t),l=Object(v.a)(Y,e),p=Object(E.a)(Y,e);return u.a.createElement(p,b()({},l,{className:o}),g.a.isNil(n)?r:n)}Y.handledProps=["as","children","className","collapsed","content","minimal","size","threaded"],Y.propTypes={};var D=Y;function z(e){var t=e.className,n=e.children,a=e.content,r=O()("metadata",t),c=Object(v.a)(z,e),s=Object(E.a)(z,e);return u.a.createElement(s,b()({},c,{className:r}),g.a.isNil(n)?a:n)}z.handledProps=["as","children","className","content"],z.propTypes={};var B=z;function J(e){var t=e.className,n=e.children,a=e.content,r=O()(t,"text"),c=Object(v.a)(J,e),s=Object(E.a)(J,e);return u.a.createElement(s,b()({},c,{className:r}),g.a.isNil(n)?a:n)}J.handledProps=["as","children","className","content"],J.propTypes={};var G=J;function V(e){var t=e.className,n=e.children,a=e.collapsed,r=e.content,c=O()(Object(j.a)(a,"collapsed"),"comment",t),s=Object(v.a)(V,e),i=Object(E.a)(V,e);return u.a.createElement(i,b()({},s,{className:c}),g.a.isNil(n)?r:n)}V.handledProps=["as","children","className","collapsed","content"],V.propTypes={},V.Author=k,V.Action=N,V.Actions=I,V.Avatar=U,V.Content=x,V.Group=D,V.Metadata=B,V.Text=G;var q=V,K=n(457),M=n(454),W=n(416);function H(e){var t=e.children,n=e.className,a=e.clearing,r=e.content,c=e.fitted,s=e.hidden,i=e.horizontal,o=e.inverted,l=e.section,p=e.vertical,m=O()("ui",Object(j.a)(a,"clearing"),Object(j.a)(c,"fitted"),Object(j.a)(s,"hidden"),Object(j.a)(i,"horizontal"),Object(j.a)(o,"inverted"),Object(j.a)(l,"section"),Object(j.a)(p,"vertical"),"divider",n),d=Object(v.a)(H,e),h=Object(E.a)(H,e);return u.a.createElement(h,b()({},d,{className:m}),g.a.isNil(t)?r:t)}H.handledProps=["as","children","className","clearing","content","fitted","hidden","horizontal","inverted","section","vertical"],H.propTypes={};var F=H,_=n(414),Q=n(413),X=n(399),Z=(n(447),n(448),n(421)),$=n.n(Z),ee=n(161),te=n(125),ne=n(237),ae=n(112),re=n(420),ce={commentsList:[],commentIsLoading:!1,commentIsError:!1},se=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"mutate",value:function(e){var t=this;switch(e.type){case"CLICKREPLY":return Object(ee.a)(Object(te.a)({type:"SETLOADING",loading:!0}),this.postComment(e.postId,e.content).pipe(Object(ne.a)((function(n){return t.updateComment(e.postId).pipe(Object(ae.a)((function(e){return{type:"UPLOADREPLY",commentsList:e}})))}))),Object(te.a)({type:"SETLOADING",loading:!1}));case"CLICKREPLYREPLY":return Object(ee.a)(Object(te.a)({type:"SETLOADING",loading:!0}),this.postComment(e.postId,e.content,e.parentCommentId).pipe(Object(ne.a)((function(n){return t.updateComment(e.postId).pipe(Object(ae.a)((function(e){return{type:"UPLOADREPLY",commentsList:e}})))}))),Object(te.a)({type:"SETLOADING",loading:!1}))}}},{key:"reduce",value:function(e,t){var n=e;switch(t.type){case"UPLOADREPLY":return n.commentsList=t.commentsList,n;case"SETLOADING":return n.commentIsLoading=t.loading,n}}},{key:"updateComment",value:function(e){return re.a.shared.getJson("post/".concat(e)).pipe(Object(ae.a)((function(e){return e.commentList})))}},{key:"postComment",value:function(e,t,n){return n?re.a.shared.post("comment",{content:t,postId:e,parentCommentId:n},"json",!0):re.a.shared.post("comment",{content:t,postId:e},"json",!0)}}]),n}(d.b),ie=n(407),oe=n(408),le=n(42),ue=n.n(le),pe=n(22);function me(){var e=Object(o.a)(["\n    display:flex;\n    justify-content: flex-end;\n    margin-top:10px;\n"]);return me=function(){return e},e}function de(){var e=Object(o.a)(["\n    font-size:1rem;\n    color:#A9A9A9;\n"]);return de=function(){return e},e}function he(){var e=Object(o.a)(["\n    font-weight:bold;\n    margin-right:0.8em;\n\n"]);return he=function(){return e},e}function be(){var e=Object(o.a)(["\n    display:flex;\n    flex-direction:row;\n    font-size:1.1rem;\n"]);return be=function(){return e},e}function fe(){var e=Object(o.a)(["\n    min-height:400px;\n    overflow-y:hidden;\n    word-break:break-all;\n"]);return fe=function(){return e},e}function Oe(){var e=Object(o.a)(["\n    position: relative;\n    background: #fff;\n    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);\n    margin: 1rem 0;\n    padding: 2em 2em;\n    border-radius: .28571429rem;\n    border: 1px solid rgba(34,36,38,.15);\n"]);return Oe=function(){return e},e}var je=p.a.div(Oe()),ve=p.a.div(fe()),Ee=p.a.div(be()),ge=p.a.div(he()),Le=p.a.div(de()),Ne=p.a.div(me()),ye=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(e){var c;return Object(r.a)(this,n),(c=t.call(this,e)).disposeBag=new d.a,c.reactor=void 0,c.commentInput=u.a.createRef(),c.reactor=new se(ce),c.state=Object(a.a)(Object(a.a)({},c.props.reactor.getState()),ce),c}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.disposeBag.disposeOf=this.props.reactor.state.pipe(Object(ae.a)((function(e){return e.postId})),Object(ie.a)()).subscribe((function(t){return e.props.reactor.dispatch({type:"CLICKPOST",postId:t})})),this.disposeBag.disposeOf=this.props.reactor.state.pipe(Object(ae.a)((function(e){return e.isLoading})),Object(ie.a)()).subscribe((function(t){e.setState({isLoading:t})})),this.disposeBag.disposeOf=this.props.reactor.state.pipe(Object(ae.a)((function(e){return{post:e.post}})),Object(ie.a)((function(e,t){return ue.a.isEqual(e.post,t.post)})),Object(oe.a)(1)).subscribe((function(t){return e.setState({post:t.post})})),this.disposeBag.disposeOf=this.props.reactor.state.pipe(Object(ae.a)((function(e){return{post:e.post}})),Object(ie.a)((function(e,t){return ue.a.isEqual(e.post,t.post)})),Object(oe.a)(1)).subscribe((function(t){return e.setState({post:t.post})})),this.disposeBag.disposeOf=this.reactor.state.pipe(Object(ae.a)((function(e){return e.commentIsLoading})),Object(ie.a)(ue.a.isEqual),Object(oe.a)(1)).subscribe((function(t){return e.setState({commentIsLoading:t})})),this.disposeBag.disposeOf=this.reactor.state.pipe(Object(ae.a)((function(e){return e.commentIsError})),Object(ie.a)(ue.a.isEqual),Object(oe.a)(1)).subscribe((function(t){return e.setState({commentIsError:t})})),this.disposeBag.disposeOf=this.reactor.state.pipe(Object(ae.a)((function(e){return e.commentsList})),Object(ie.a)(ue.a.isEqual),Object(oe.a)(1)).subscribe((function(t){return e.setState({commentsList:t})}))}},{key:"componentWillUnmount",value:function(){var e;null===(e=this.disposeBag)||void 0===e||e.unsubscribe(),this.disposeBag=null}},{key:"commentList",value:function(e){return e.map((function(e,t){return u.a.createElement(q,{key:"COMMENT_"+t},u.a.createElement(q.Avatar,{src:"https://react.semantic-ui.com/images/avatar/small/matt.jpg"}),u.a.createElement(q.Content,null,u.a.createElement(q.Author,{as:"a"},e.username),u.a.createElement(q.Metadata,null,u.a.createElement($.a,{fromNow:!0},e.createdTime)),u.a.createElement(q.Text,null,e.content),u.a.createElement(q.Actions,null,u.a.createElement(q.Action,null,"Reply"))))}))}},{key:"render",value:function(){var e=this,t=this.state,n=t.isLoading,a=t.post,r=this.state.commentsList;if(n||!a)return u.a.createElement(K.a,{loading:!0},u.a.createElement(M.a,null,u.a.createElement(M.a.Header,null,u.a.createElement(M.a.Line,null),u.a.createElement(M.a.Line,null)),u.a.createElement(M.a.Paragraph,null,u.a.createElement(M.a.Line,null),u.a.createElement(M.a.Line,null),u.a.createElement(M.a.Line,null),u.a.createElement(M.a.Line,null))));var c=a,s=c.author,i=c.title,o=c.content,l=c.commentList,p=c.createdTime,d=c.postId;this.state.commentIsLoading;return console.log("comments test",this.state),u.a.createElement(u.a.Fragment,null,u.a.createElement(je,{key:d+"_KEY"},u.a.createElement(W.a,{size:"huge"},i),u.a.createElement(Ee,null,u.a.createElement(ge,null,s),u.a.createElement(Le,null,u.a.createElement($.a,{fromNow:!0},p))),u.a.createElement(F,null),u.a.createElement(ve,null,u.a.createElement(m.Viewer,{initialValue:o})),u.a.createElement(W.a,{as:"h2",dividing:!0},"\ub367\uae00 ",l.length," \uac1c"),u.a.createElement(_.a,null,u.a.createElement(Q.a,{placeholder:"Tell us more",ref:this.commentInput}),u.a.createElement(Ne,null,u.a.createElement(X.a,{content:"\ub367\uae00 \ub2ec\uae30",labelPosition:"left",icon:"edit",color:"green",disabled:this.state.commentIsLoading,loading:this.state.commentIsLoading,onClick:function(){var t;null===(t=e.reactor)||void 0===t||t.dispatch({type:"CLICKREPLY",postId:d,content:e.commentInput.current.ref.current.value})}}))),u.a.createElement(u.a.Fragment,null,u.a.createElement(q.Group,null,0!==r.length?this.commentList(r):this.commentList(l)))))}}]),n}(u.a.PureComponent);t.default=Object(pe.f)(ye)}}]);
//# sourceMappingURL=6.0835e004.chunk.js.map