(window.webpackJsonp=window.webpackJsonp||[]).push([[13,6,7,9,10],{392:function(e,t,r){"use strict";r.r(t);var n=r(31),o=Object(n.b)({props:{icon:{types:String,required:!0}},setup:function(e){return{path:Object(n.a)((function(){return e.icon}))}}}),c=r(75),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("fa",{staticClass:"icon-container",attrs:{icon:e.path}})}),[],!1,null,null,null);t.default=component.exports},393:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(31),o=Object(n.a)((function(){return function(e,t){return t.uid===e}}))},395:function(e,t,r){"use strict";r.r(t);var n=r(31),o=Object(n.b)({props:{users:{type:Array,required:!0}},setup:function(){var e=Object(n.l)().getters.getCurrentUser;return{isCurrentUser:Object(n.a)((function(){return function(t){return e.uid===t.uid?"あなた":t.nickName}}))}}}),c=r(75),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"emoji-balloon-box"},[e._l(e.users,(function(t){return r("p",{key:t.uid,staticClass:"person"},[e._v(e._s(e.isCurrentUser(t))+"さん")])})),e._v(" "),r("p",[e._v("がリアクションしました")])],2)}),[],!1,null,null,null);t.default=component.exports},398:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(403),o=r.n(n),c=function(e){var t=e.toDate();return o()(t).format("YYYY/MM/DD　HH:mm")}},402:function(e,t,r){"use strict";r.r(t);var n=r(12),o=(r(68),r(29),r(47),r(76),r(77),r(80),r(31)),c=r(396),l=r(397),d=r(392),f=r(395),m=r(393),v=r(33),j=Object(o.b)({components:{Emoji:c.Emoji,Icon:d.default,EmojiBalloonBox:f.default},props:{selectedItem:{type:Array,default:[]},post:{type:Object,required:!0}},emits:["on-focus","on-clicked"],setup:function(e){var t=Object(o.l)().getters.getCurrentUser,r=Object(o.g)(""),c=Object(o.a)((function(){return JSON.parse(JSON.stringify(e.post.emojiItems)).filter((function(e){return 0!==e.users.length}))})),d=Object(o.a)((function(){return function(e){return 0!==e.length&&e.map((function(e){return e.uid})).includes(t.uid)}})),f=function(){var r=Object(n.a)(regeneratorRuntime.mark((function r(n,o){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!o.includes(t.uid)){r.next=6;break}if(1!==o.length){r.next=4;break}return r.next=4,v.b.collection("posts").doc(e.post.id).collection("emojiItems").doc(n.id).delete();case 4:return r.next=6,v.b.collection("posts").doc(e.post.id).collection("emojiItems").doc(n.id).collection("users").doc(t.uid).delete();case 6:case"end":return r.stop()}}),r)})));return function(e,t){return r.apply(this,arguments)}}(),j=function(){var r=Object(n.a)(regeneratorRuntime.mark((function r(n){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,v.b.collection("posts").doc(e.post.id).collection("emojiItems").doc(n.id).collection("users").doc(t.uid).delete();case 2:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return{isCurrentUser:m.a,currentUser:t,faSmile:l.b,emojiItems:c,isMyEmoji:d,isHoverd:r,mouseOverAction:function(e){r.value=e,setTimeout((function(){r.value=""}),1e3)},DeleteEmojiItem:f,DeleteSelectEmojiItem:j}}}),O=r(75),component=Object(O.a)(j,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"emoji-container"},[r("div",{staticClass:"items"},[e._l(e.emojiItems,(function(t,n){return r("div",{key:n,staticClass:"wrapper"},[e.isHoverd===t.id?r("div",[r("EmojiBalloonBox",{attrs:{users:t.users}})],1):e._e(),e._v(" "),r("div",{staticClass:"box",class:[{"-active":e.isMyEmoji(t.users)},{"-pr":e.isHoverd===t.id}],on:{mouseover:function(r){return e.mouseOverAction(t.id)},click:function(r){e.DeleteEmojiItem(t,t.users.map((function(e){return e.uid})))}}},[r("Emoji",{staticClass:"emoji-image",attrs:{emoji:t,size:20}}),e._v(" "),r("p",{staticClass:"count"},[e._v(e._s(t.users.length))])],1)])})),e._v(" "),e._l(e.selectedItem,(function(t){return r("div",{key:t.id,staticClass:"wrapper -active"},[e.isHoverd===t.item.id?r("div",[r("EmojiBalloonBox",{attrs:{users:t.users}})],1):e._e(),e._v(" "),r("div",{staticClass:"box",on:{mouseover:function(r){return e.mouseOverAction(t.item.id)},click:function(r){return e.DeleteSelectEmojiItem(t.item)}}},[r("Emoji",{staticClass:"emoji-image",attrs:{emoji:t.item,size:20}}),e._v(" "),r("p",{staticClass:"count"},[e._v(e._s(t.users.length))])],1)])})),e._v(" "),r("div",{staticClass:"wrapper"},[r("div",{staticClass:"box",on:{mouseover:function(t){return e.$emit("on-focus",!0)},click:function(t){return e.$emit("on-clicked",!0)}}},[r("Icon",{attrs:{icon:e.faSmile}})],1)])],2)])}),[],!1,null,null,null);t.default=component.exports},414:function(e,t,r){"use strict";r.r(t);var n=r(12),o=(r(68),r(31)),c=r(396),l=r(402),d=r(398),f=r(8),m=r(107),v=(r(47),r(76),r(77),r(29),r(126),r(41),r(24),r(21),r(39),r(26),r(40),r(33));function j(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function O(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?j(Object(source),!0).forEach((function(t){Object(f.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):j(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var _=function(e,t){var r=Object(o.g)([]),c=Object(o.g)(!1),l=function(){c.value=!c.value},d=function(){var o=Object(n.a)(regeneratorRuntime.mark((function n(o){var c,d,f;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,c=JSON.parse(JSON.stringify(r.value)).map((function(e){return e.item.id})),d=JSON.parse(JSON.stringify(e.post.emojiItems)).map((function(e){return e.id})),f=JSON.parse(JSON.stringify(e.post.emojiItems)).map((function(e){if(e.users.map((function(e){return e.uid})).includes(t.uid))return e.id})),r.value){n.next=9;break}return r.value=o.unified,n.abrupt("return");case 9:if(!c.includes(o.id)){n.next=16;break}return r.value=r.value.filter((function(e){return e.item.id!==o.id})),n.next=13,v.b.collection("posts").doc(e.post.id).collection("emojiItems").doc(o.id).collection("users").doc(t.uid).delete();case 13:return n.abrupt("return");case 16:if(!f.includes(o.id)){n.next=26;break}if(1!==e.post.emojiItems.find((function(e){return e.id===o.id})).users.length){n.next=21;break}return n.next=21,v.b.collection("posts").doc(e.post.id).collection("emojiItems").doc(o.id).delete();case 21:return n.next=23,v.b.collection("posts").doc(e.post.id).collection("emojiItems").doc(o.id).collection("users").doc(t.uid).delete();case 23:return n.abrupt("return");case 26:return d.includes(o.id)||(r.value=[].concat(Object(m.a)(r.value),[{item:o,users:[O(O({},t),{},{item_id:o.id,post_id:e.post.id})]}])),n.next=29,v.b.collection("posts").doc(e.post.id).collection("emojiItems").doc(o.id).set(O({},o));case 29:return n.next=31,v.b.collection("posts").doc(e.post.id).collection("emojiItems").doc(o.id).collection("users").doc(t.uid).set(O(O({},t),{},{item_id:o.id,post_id:e.post.id}));case 31:n.next=37;break;case 33:n.prev=33,n.t0=n.catch(0),r.value=r.value.filter((function(e){return e.id!==o.id})),console.error(n.t0);case 37:return n.prev=37,l(),n.finish(37);case 40:case"end":return n.stop()}}),n,null,[[0,33,37,40]])})));return function(e){return o.apply(this,arguments)}}();return{selectedItem:r,isFormVisible:c,onFocus:function(){c.value=!0},onRemoveFocus:function(){c.value=!1},selectEmoji:d,switchVisible:l}},h=r(393),y=Object(o.b)({components:{Emojifrom:l.default,Picker:c.Picker},props:{post:{type:Object,required:!0}},setup:function(e){var t=Object(o.k)(),r=Object(o.l)().getters.getCurrentUser,c=_(e,r),l=c.selectedItem,f=c.isFormVisible,m=c.onFocus,j=c.onRemoveFocus,O=c.selectEmoji,y=c.switchVisible;return{DeletePost:function(){var e=Object(n.a)(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.b.collection("posts").doc(r).delete();case 3:t.push("/"),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t){return e.apply(this,arguments)}}(),isCurrentUser:h.a,currentUser:r,useEmoji:_,formatDateToSlashWithTime:d.a,Router:t,selectEmoji:O,selectedItem:l,onFocus:m,onRemoveFocus:j,switchVisible:y,isFormVisible:f}}}),x=r(75),C=r(127),I=r.n(C),k=r(415),w=r(390),E=r(265),S=r(406),P=r(418),D=r(391),component=Object(x.a)(y,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card-container"},[r("v-card",{staticClass:"mx-auto",attrs:{width:"500"}},[r("v-card-title",[r("span",{staticClass:"text-h6 font-weight-light"},[e._v("\n        タイトル: "+e._s(e.post.title))])]),e._v(" "),r("v-card-text",{staticClass:"text-h5 font-weight-bold"},[e._v("\n      "+e._s(e.formatDateToSlashWithTime(e.post.updated_at))+"\n    ")]),e._v(" "),r("v-card-actions",[r("v-list-item",{staticClass:"grow"},[r("v-list-item-avatar",{attrs:{color:"grey darken-3"}},[r("v-img",{staticClass:"elevation-6",attrs:{alt:"",src:e.post.user.photoURL}})],1),e._v(" "),r("v-list-item-content",[r("v-list-item-title",[e._v(e._s(e.post.user.nickName?e.post.user.nickName:e.post.user.displayName))])],1),e._v(" "),e.isCurrentUser(e.post.user_id,e.currentUser)?r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(t){return e.Router.push("/posts/edit/"+e.post.id)}}},[e._v("編集")])],1):e._e(),e._v(" "),e.isCurrentUser(e.post.user_id,e.currentUser)?r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(t){return e.DeletePost(e.post.id)}}},[e._v("削除")])],1):e._e(),e._v(" "),r("v-list-item-content",[r("v-list-item-title",{staticStyle:{cursor:"pointer"},on:{click:function(t){return e.Router.push("/posts/"+e.post.id)}}},[e._v("詳細")])],1)],1)],1),e._v(" "),r("Emojifrom",{attrs:{"selected-item":e.selectedItem,post:e.post},on:{"on-focus":e.onFocus,"on-clicked":e.switchVisible}})],1),e._v(" "),e.isFormVisible?r("div",{staticClass:"form",on:{mouseleave:e.onRemoveFocus}},[r("Picker",{on:{select:e.selectEmoji}})],1):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;I()(component,{VCard:k.a,VCardActions:w.a,VCardText:w.b,VCardTitle:w.c,VImg:E.a,VListItem:S.a,VListItemAvatar:P.a,VListItemContent:D.a,VListItemTitle:D.b})},444:function(e,t,r){"use strict";r.r(t);r(24),r(21),r(39),r(40);var n=r(107),o=r(8),c=(r(26),r(47),r(76),r(77),r(126),r(29),r(154),r(41),r(31)),l=r(414),d=r(33);function f(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function m(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=Object(c.b)({components:{Card:l.default},setup:function(){var e=Object(c.l)().getters.getCurrentUser,t=Object(c.g)([]),r=null;Object(c.f)((function(){r=d.b.collection("posts").orderBy("updated_at","desc").onSnapshot((function(r){r.docChanges().forEach((function(r){if("added"===r.type){var c=r.doc.data();r.doc.ref.collection("emojiItems").get().then((function(r){var l=r.docs.map((function(r){var n=r.data(),l=[];return r.ref.collection("users").onSnapshot((function(r){r.docChanges().forEach((function(d){if("added"===d.type)r.docs.map((function(e){return l.map((function(e){return e.uid})).includes(e.data().uid)?o(n,l,c):l.push(e.data())}));else if("removed"===d.type){if(0===r.docs.length){var f=c.emojiItems.find((function(e){return e.id===n.id})),m=c.emojiItems.map((function(e){return e.id}));if(m&&f){f.users=f.users.filter((function(t){return t.uid!==e.uid}));var v=m.indexOf(n.id);return void c.emojiItems.splice(v,1,f)}}r.docs.forEach((function(r){var n=t.value.find((function(e){return e.id===r.data().post_id})),o=null==n?void 0:n.emojiItems.find((function(e){return e.id===r.data().item_id})),c=null==n?void 0:n.emojiItems.map((function(e){return e.id})),l=t.value.map((function(e){return e.id}));if(n&&c&&o){o.users=o.users.filter((function(t){return t.uid!==e.uid}));var d=c.indexOf(r.data().item_id),f=l.indexOf(r.data().post_id);t.value[f].emojiItems.splice(d,1,o)}}))}}))})),m(m({},n),{},{users:l})}));c.emojiItems=l,t.value=[].concat(Object(n.a)(t.value),[c])}))}else"removed"===r.type&&(t.value=t.value.filter((function(e){return e.id!==r.doc.data().id})))}),(function(e){console.error(e)}))}))})),Object(c.e)((function(){r()}));var o=function(e,r,o){var c=o.emojiItems.map((function(e){return e.id})),l=t.value.map((function(e){return e.id})),d=c.indexOf(e.id),f=l.indexOf(o.id);t.value[f].emojiItems.splice(d,1,m(m({},e),{},{users:Object(n.a)(r)}))};return{posts:t}}}),j=r(75),component=Object(j.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"index-container"},[r("div",{staticClass:"container"},e._l(e.posts,(function(e){return r("div",{key:e.id,staticStyle:{margin:"20px"}},[r("Card",{attrs:{post:e}})],1)})),0)])}),[],!1,null,null,null);t.default=component.exports}}]);