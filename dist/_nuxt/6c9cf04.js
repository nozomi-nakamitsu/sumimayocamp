(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{382:function(t,e,o){"use strict";o.r(e);var l=o(32),n=Object(l.b)({props:{post:{type:Object,required:!0}},setup:function(){return{}}}),r=o(67),v=o(119),c=o.n(v),d=o(383),_=o(364),m=o(237),h=o(379),x=o(384),w=o(365),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{staticClass:"mx-auto",attrs:{color:"#26c6da",dark:"","max-width":"400"}},[o("v-card-title",[o("span",{staticClass:"text-h6 font-weight-light"},[t._v(" タイトル: "+t._s(t.post.title))])]),t._v(" "),o("v-card-text",{staticClass:"text-h5 font-weight-bold"},[t._v("\n    内容: "+t._s(t.post.content)+"\n  ")]),t._v(" "),o("v-card-text",{staticClass:"text-h5 font-weight-bold"},[t._v("\n    url: "+t._s(t.post.url)+"\n  ")]),t._v(" "),o("v-card-text",{staticClass:"text-h5 font-weight-bold"},[t._v("\n    movieurl: "+t._s(t.post.movieUrl)+"\n    "),t.post.movieUrl?o("video",{attrs:{controls:"controls",width:"200px",height:"133px"}},[o("source",{attrs:{src:t.post.movieUrl}})]):t._e()]),t._v(" "),o("v-card-text",{staticClass:"text-h5 font-weight-bold"},[t._v("\n    id: "+t._s(t.post.id)+"\n  ")]),t._v(" "),o("v-card-actions",[o("v-list-item",{staticClass:"grow"},[o("v-list-item-avatar",{attrs:{color:"grey darken-3"}},[o("v-img",{staticClass:"elevation-6",attrs:{alt:"",src:t.post.user.photoURL}})],1),t._v(" "),o("v-list-item-content",[o("v-list-item-title",[t._v(t._s(t.post.user.nickName))])],1),t._v(" "),o("v-list-item-content",[o("v-list-item-title",[t._v("編集")])],1),t._v(" "),o("v-list-item-content",[o("v-list-item-title",[t._v("削除")])],1),t._v(" "),o("v-list-item-content",[o("v-list-item-title",[t._v("詳細")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VCard:d.a,VCardActions:_.a,VCardText:_.b,VCardTitle:_.c,VImg:m.a,VListItem:h.a,VListItemAvatar:x.a,VListItemContent:w.a,VListItemTitle:w.b})}}]);