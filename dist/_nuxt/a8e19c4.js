(window.webpackJsonp=window.webpackJsonp||[]).push([[14,4,10],{390:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(31),o=Object(n.a)((function(){return function(t,e){return e.uid===t}}))},395:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(399),o=r.n(n),c=function(t){var e=t.toDate();return o()(e).format("YYYY/MM/DD　HH:mm")}},410:function(t,e,r){"use strict";r.r(e);var n=r(31),o=Object(n.b)({props:{content:{type:String,required:!0}},setup:function(){return{}}}),c=r(75),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"markdown-editor"},[r("no-ssr",[r("mavon-editor",{attrs:{language:"ja",subfield:!1,editable:!1,"toolbars-flag":!1,"box-shadow":!1,"default-open":"preview","preview-background":"#fff"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1)],1)}),[],!1,null,null,null);e.default=component.exports},411:function(t,e,r){"use strict";r.r(e);var n=r(12),o=(r(68),r(47),r(31)),c=r(46),l=Object(o.b)({props:{postId:{type:String,required:!0}},setup:function(t){var e=Object(o.k)(),r=Object(o.f)(""),l=Object(o.f)([]),d=e.getters.getCurrentUser,v=null;Object(o.e)((function(){v=c.b.collection("posts").doc(t.postId).collection("messages").orderBy("createdAt").onSnapshot((function(t){l.value=t.docs.map((function(t){return t.data()}))}))}));var f=function(){var e=Object(n.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={uid:d.uid,nickName:d.nickName,photoURL:d.photoURL,text:r.value,postId:t.postId,createdAt:Date.now()},e.next=3,c.b.collection("posts").doc(t.postId).collection("messages").add(n);case 3:r.value="";case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(o.d)((function(){v()}));var m=Object(o.a)((function(){return function(t){return t===d.uid?"sent":"received"}}));return{currentUser:d,message:r,messages:l,sendMessage:f,sentOrReceived:m}}}),d=r(75),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"base-comment-container"},[r("h1",[t._v("チャット")]),t._v(" "),r("section",[r("main",[t._l(t.messages,(function(e,n){return r("div",{key:"index-"+n,staticClass:"message",class:[{"-sent":"sent"===t.sentOrReceived(e.uid)},{"-received":"received"===t.sentOrReceived(e.uid)}]},[r("img",{attrs:{src:e.photoURL,alt:e.nickName}}),t._v(" "),r("p",[t._v(t._s(e.text))])])})),t._v(" "),r("div",{ref:"scrollable"})],2),t._v(" "),r("form",{on:{submit:function(e){return e.preventDefault(),t.sendMessage.apply(null,arguments)}}},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],attrs:{type:"text",placeholder:"Enter your message!"},domProps:{value:t.message},on:{input:function(e){e.target.composing||(t.message=e.target.value)}}}),t._v(" "),r("button",{attrs:{disabled:!t.message,type:"submit"}},[t._v("📩")])])])])}),[],!1,null,null,null);e.default=component.exports},442:function(t,e,r){"use strict";r.r(e);r(24),r(21),r(28),r(38),r(26),r(39);var n=r(8),o=r(12),c=(r(68),r(31)),l=r(410),d=r(395),v=r(390),f=r(46),m=r(411);function O(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var j=Object(c.b)({components:{MarkdownViewCard:l.default,BaseComment:m.default},setup:function(){var t=Object(c.k)(),e=Object(c.i)(),r=Object(c.j)(),n=t.getters.getCurrentUser,l=Object(c.f)(t.getters.getPost),m=Object(c.f)({}),O=e.value.params.id;Object(c.h)(Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.dispatch("getPostData",{id:O}).then((function(t){l.value=_({},t)}));case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.error("投稿内容を取得できませんでした",e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])}))),"IQppEUwqiX/KqRblFDxwgA==");var j=Object(c.a)((function(){if(l.value.updated_at)return Object(d.a)(l.value.updated_at)})),h=function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f.b.collection("posts").doc(e).delete();case 3:r.push("/"),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.error(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}();return{currentUser:n,isCurrentUser:v.a,post:l,updated_at:j,postUser:m,id:O,formatDateToSlashWithTime:d.a,Router:r,DeletePost:h}}}),h=r(75),w=r(128),y=r.n(w),k=r(409),x=r(388),C=r(264),U=r(401),R=r(412),D=r(389),component=Object(h.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-card",{staticClass:"mx-auto",attrs:{width:"100%"}},[r("v-card-title",[r("span",{staticClass:"text-h6 font-weight-light"},[t._v("\n        タイトル: "+t._s(t.post.title))])]),t._v(" "),r("MarkdownViewCard",{attrs:{content:t.post.content}}),t._v(" "),r("v-card-text",{staticClass:"text-h5 font-weight-bold"},[t._v("\n      "+t._s(t.updated_at)+"\n    ")]),t._v(" "),r("v-card-actions",[r("v-list-item",{staticClass:"grow"},[r("v-list-item-avatar",{attrs:{color:"grey darken-3"}},[r("v-img",{staticClass:"elevation-6",attrs:{alt:"",src:t.postUser.photoURL}})],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(t.postUser.nickName?t.postUser.nickName:t.postUser.displayName))])],1),t._v(" "),t.isCurrentUser(t.post.user_id,t.currentUser)?r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(e){return t.Router.push("/posts/edit/"+t.post.id)}}},[t._v("編集")])],1):t._e(),t._v(" "),t.isCurrentUser(t.post.user_id,t.currentUser)?r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(e){return t.DeletePost(t.post.id)}}},[t._v("削除")])],1):t._e()],1)],1)],1),t._v(" "),r("BaseComment",{attrs:{"post-id":t.id}}),t._v(" "),r("p",{staticStyle:{cursor:"pointer","font-size":"12px"},on:{click:function(e){return t.Router.push("/")}}},[t._v("\n    ホームに戻る\n  ")])],1)}),[],!1,null,null,null);e.default=component.exports;y()(component,{VCard:k.a,VCardActions:x.a,VCardText:x.b,VCardTitle:x.c,VImg:C.a,VListItem:U.a,VListItemAvatar:R.a,VListItemContent:D.a,VListItemTitle:D.b})}}]);