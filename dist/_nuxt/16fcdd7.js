(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{376:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(392),o=r.n(n),c=function(t){var e=t.toDate();return o()(e).format("YYYY/MM/DD　HH:mm")}},377:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(25),o=Object(n.a)((function(){return function(t,e){return e.uid===t}}))},378:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(38),o=function(t){try{n.b.collection("posts").doc(t).delete().then((function(t){location.href="/"}))}catch(t){console.error(t)}}},399:function(t,e,r){"use strict";r.r(e);var n=r(25),o=r(378),c=r(376),l=r(377),v=Object(n.b)({props:{post:{type:Object,required:!0}},setup:function(t){var e=Object(n.i)(),r=Object(n.j)().getters.getCurrentUser;return{DeletePost:o.a,isCurrentUser:l.a,currentUser:r,formatDateToSlashWithTime:c.a,Router:e}}}),d=r(65),m=r(116),f=r.n(m),_=r(400),h=r(373),C=r(238),w=r(393),V=r(401),k=r(374),component=Object(d.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"mx-auto",attrs:{width:"500"}},[r("v-card-title",[r("span",{staticClass:"text-h6 font-weight-light"},[t._v(" タイトル: "+t._s(t.post.title))])]),t._v(" "),r("v-card-text",{staticClass:"text-h5 font-weight-bold"},[t._v("\n    "+t._s(t.formatDateToSlashWithTime(t.post.updated_at))+"\n  ")]),t._v(" "),r("v-card-actions",[r("v-list-item",{staticClass:"grow"},[r("v-list-item-avatar",{attrs:{color:"grey darken-3"}},[r("v-img",{staticClass:"elevation-6",attrs:{alt:"",src:t.post.user.photoURL}})],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(t.post.user.nickName?t.post.user.nickName:t.post.user.displayName))])],1),t._v(" "),t.isCurrentUser(t.post.user_id,t.currentUser)?r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(e){return t.Router.push("/posts/edit/"+t.post.id)}}},[t._v("編集")])],1):t._e(),t._v(" "),t.isCurrentUser(t.post.user_id,t.currentUser)?r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(e){return t.DeletePost(t.post.id)}}},[t._v("削除")])],1):t._e(),t._v(" "),r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(e){return t.Router.push("/posts/"+t.post.id)}}},[t._v("詳細")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VCard:_.a,VCardActions:h.a,VCardText:h.b,VCardTitle:h.c,VImg:C.a,VListItem:w.a,VListItemAvatar:V.a,VListItemContent:k.a,VListItemTitle:k.b})}}]);