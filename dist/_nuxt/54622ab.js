(window.webpackJsonp=window.webpackJsonp||[]).push([[10,4,6,7],{383:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(26),o=Object(n.a)((function(){return function(t,e){return e.uid===t}}))},385:function(t,e,r){"use strict";r.r(e);var n=r(26),o=Object(n.b)({props:{icon:{types:String,required:!0}},setup:function(t){return{path:Object(n.a)((function(){return t.icon}))}}}),c=r(70),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("fa",{staticClass:"icon-container",attrs:{icon:t.path}})}),[],!1,null,null,null);e.default=component.exports},386:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(390),o=r.n(n),c=function(t){var e=t.toDate();return o()(e).format("YYYY/MM/DD　HH:mm")}},389:function(t,e,r){"use strict";r.r(e);var n=r(26),o=r(383),c=r(387),l=r(392),d=r(385),v=Object(n.b)({components:{Emoji:c.Emoji,Icon:d.default},props:{selectedItem:{type:Array,default:[]}},emits:["on-focus","on-clicked"],setup:function(t){var e=Object(n.k)().getters.getCurrentUser;return{isCurrentUser:o.a,currentUser:e,faSmile:l.a}}}),m=r(70),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"emoji-container"},[r("div",{staticClass:"items"},[t._l(t.selectedItem,(function(t,e){return r("div",{key:e,staticClass:"wrapper"},[r("div",{staticClass:"box"},[r("Emoji",{staticClass:"emoji-image",attrs:{emoji:t,size:20}})],1)])})),t._v(" "),r("div",{staticClass:"wrapper"},[r("div",{staticClass:"box",on:{mouseover:function(e){return t.$emit("on-focus",!0)},click:function(e){return t.$emit("on-clicked",!0)}}},[r("Icon",{attrs:{icon:t.faSmile}})],1)])],2)])}),[],!1,null,null,null);e.default=component.exports},400:function(t,e,r){"use strict";r.r(e);var n=r(18),o=(r(79),r(26)),c=r(386),l=r(147),d=(r(53),r(94),r(95),r(35),r(48),r(41)),v=function(t,e){var r=Object(o.f)([]),c=Object(o.f)(!1),v=function(){c.value=!c.value},m=function(){var o=Object(n.a)(regeneratorRuntime.mark((function n(o,c){var m;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,m=JSON.parse(JSON.stringify(r.value)).map((function(t){return t.id})),r.value){n.next=7;break}return r.value=o.unified,n.abrupt("return");case 7:if(!m.includes(o.id)){n.next=14;break}return r.value=r.value.filter((function(t){return t.id!==o.id})),n.next=11,d.b.collection("posts").doc(t.post.id).update({"emojiItems.users":d.a.firestore.FieldValue.arrayRemove(e.uid)});case 11:return n.abrupt("return");case 14:r.value=[].concat(Object(l.a)(r.value),[o]);case 15:return n.next=17,d.b.collection("posts").doc(t.post.id).update({"emojiItems.item":o,"emojiItems.users":d.a.firestore.FieldValue.arrayUnion(e.uid)});case 17:n.next=23;break;case 19:n.prev=19,n.t0=n.catch(0),r.value=r.value.filter((function(t){return t.id!==o.id})),console.error(n.t0);case 23:return n.prev=23,v(),n.finish(23);case 26:case"end":return n.stop()}}),n,null,[[0,19,23,26]])})));return function(t,e){return o.apply(this,arguments)}}();return{selectedItem:r,isFormVisible:c,onFocus:function(){c.value=!0},onRemoveFocus:function(){c.value=!1},selectEmoji:m,switchVisible:v}},m=r(383),f=r(389),j=r(387),h=Object(o.b)({components:{Emojifrom:f.default,Picker:j.Picker},props:{post:{type:Object,required:!0}},setup:function(t){var e=Object(o.j)(),r=Object(o.k)().getters.getCurrentUser,l=v(t,r),f=l.selectedItem,j=l.isFormVisible,h=l.onFocus,_=l.onRemoveFocus,C=l.selectEmoji,k=l.switchVisible;return{DeletePost:function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d.b.collection("posts").doc(r).delete();case 3:e.push("/"),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.error(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}(),isCurrentUser:m.a,currentUser:r,useEmoji:v,formatDateToSlashWithTime:c.a,Router:e,selectEmoji:C,selectedItem:f,onFocus:h,onRemoveFocus:_,switchVisible:k,isFormVisible:j}}}),_=r(70),C=r(121),k=r.n(C),O=r(401),x=r(381),w=r(244),y=r(393),V=r(403),I=r(382),component=Object(_.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"card-container"},[r("v-card",{staticClass:"mx-auto",attrs:{width:"500"}},[r("v-card-title",[r("span",{staticClass:"text-h6 font-weight-light"},[t._v("\n        タイトル: "+t._s(t.post.title))])]),t._v(" "),r("v-card-text",{staticClass:"text-h5 font-weight-bold"},[t._v("\n      "+t._s(t.formatDateToSlashWithTime(t.post.updated_at))+"\n    ")]),t._v(" "),r("v-card-actions",[r("v-list-item",{staticClass:"grow"},[r("v-list-item-avatar",{attrs:{color:"grey darken-3"}},[r("v-img",{staticClass:"elevation-6",attrs:{alt:"",src:t.post.user.photoURL}})],1),t._v(" "),r("v-list-item-content",[r("v-list-item-title",[t._v(t._s(t.post.user.nickName?t.post.user.nickName:t.post.user.displayName))])],1),t._v(" "),t.isCurrentUser(t.post.user_id,t.currentUser)?r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(e){return t.Router.push("/posts/edit/"+t.post.id)}}},[t._v("編集")])],1):t._e(),t._v(" "),t.isCurrentUser(t.post.user_id,t.currentUser)?r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(e){return t.DeletePost(t.post.id)}}},[t._v("削除")])],1):t._e(),t._v(" "),r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(e){return t.Router.push("/posts/"+t.post.id)}}},[t._v("詳細")])],1)],1)],1),t._v(" "),r("Emojifrom",{attrs:{selectedItem:t.selectedItem},on:{"on-focus":t.onFocus,"on-clicked":t.switchVisible}})],1),t._v(" "),t.isFormVisible?r("div",{staticClass:"form",on:{mouseleave:t.onRemoveFocus}},[r("Picker",{on:{select:t.selectEmoji}})],1):t._e()],1)}),[],!1,null,null,null);e.default=component.exports;k()(component,{VCard:O.a,VCardActions:x.a,VCardText:x.b,VCardTitle:x.c,VImg:w.a,VListItem:y.a,VListItemAvatar:V.a,VListItemContent:I.a,VListItemTitle:I.b})},432:function(t,e,r){"use strict";r.r(e);var n=r(147),o=(r(27),r(48),r(35),r(26)),c=r(400),l=r(41),d=Object(o.b)({components:{Card:c.default},setup:function(){var t=Object(o.f)([]),e=null;return Object(o.e)((function(){e=l.b.collection("posts").orderBy("updated_at","desc").onSnapshot((function(e){e.docChanges().forEach((function(e){"added"===e.type?t.value=[].concat(Object(n.a)(t.value),[e.doc.data()]):"removed"===e.type&&(t.value=t.value.filter((function(t){return t.id!==e.doc.data().id})))}),(function(t){console.error(t)}))}))})),Object(o.d)((function(){e()})),{posts:t}}}),v=r(70),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"index-container"},[r("div",{staticClass:"container"},t._l(t.posts,(function(t){return r("div",{key:t.id,staticStyle:{margin:"20px"}},[r("Card",{attrs:{post:t}})],1)})),0)])}),[],!1,null,null,null);e.default=component.exports}}]);