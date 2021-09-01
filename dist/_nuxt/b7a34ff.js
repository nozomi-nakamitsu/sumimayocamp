(window.webpackJsonp=window.webpackJsonp||[]).push([[16,7,11],{391:function(t,e,r){"use strict";r.r(e);var n=r(31),o=r(107),l=Object(n.a)((function(){return function(t,e){return{"-error":t||e}}})),c=Object(n.b)({components:{ValidationProvider:o.b},props:{setValue:{type:String,default:""},label:{type:String,required:!1,default:void 0},placeholder:{type:String,required:!1,default:void 0},inputName:{type:String,required:!1,default:""},required:{type:Boolean,default:!1},disabled:{type:Boolean,required:!1,default:!1},rules:{type:String,default:""}},setup:function(t,e){var form=Object(n.a)((function(){return{inputValue:t.setValue}}));return{doneOrError:l,form:form,inputFunc:function(t){t.target instanceof HTMLInputElement&&(form.value.inputValue=t.target.value,e.emit("input",form.value.inputValue))}}}}),d=r(75),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"validation-wrap"},[t.label?r("label",{staticClass:"label",attrs:{for:t.inputName}},[t._v(t._s(t.label)+" ")]):t._e(),t._v(" "),t.required?r("span",{staticClass:"required-asterisk"},[t._v("*")]):t._e(),t._v(" "),r("ValidationProvider",{staticClass:"provider",attrs:{tag:"div",rules:t.rules},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.failed,o=e.errors;return[r("input",{staticClass:"app-input",class:t.doneOrError(n),attrs:{id:t.inputName,type:"text",disabled:t.disabled,placeholder:t.placeholder,name:t.inputName},domProps:{value:t.form.inputValue},on:{input:t.inputFunc}}),t._v(" "),o.length>0?r("p",{staticClass:"error"},[t._v("\n      "+t._s(o[0])+"\n    ")]):t._e()]}}])})],1)}),[],!1,null,null,null);e.default=component.exports},396:function(t,e,r){"use strict";r.r(e);var n=r(31),o=r(391),l={bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,fullscreen:!1,htmlcode:!0},c=Object(n.b)({components:{ValidationInput:o.default},props:{propsform:{type:Object,required:!0},title:{types:String,default:""}},emits:["on-submit"],setup:function(t,e){var r=Object(n.k)().getters.getCurrentUser,form=Object(n.a)((function(){return{id:t.propsform.id,title:t.propsform.title,user_id:r.uid,content:t.propsform.content,created_at:"新規作成"===t.title?new Date:t.propsform.created_at,updated_at:new Date,user:t.propsform.user}})),o=Object(n.f)(null);return{currentUser:r,form:form,fileUploadEvent:o,onSubmit:function(){e.emit("on-submit",{formData:form.value,types:t.title})},selectFile:function(t){o.value=t},markdownOption:l,change:function(t){form.value.title=t}}}}),d=r(75),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"form-container"},[r("div",[t._v(t._s(t.title))]),t._v(" "),r("ValidationObserver",{ref:"obs",scopedSlots:t._u([{key:"default",fn:function(e){var n=e.handleSubmit,o=e.invalid;return[r("form",{on:{submit:function(e){return e.preventDefault(),n(t.onSubmit)}}},[r("ValidationInput",{staticClass:"nameinput",attrs:{label:"タイトル","input-name":"title",rules:"required","set-value":t.form.title},on:{input:function(e){return t.change(e,"nickName")}}}),t._v(" "),[r("ValidationProvider",{staticClass:"provider",attrs:{tag:"div",rules:"required",name:"内容"}},[r("div",{staticClass:"markdown-editor"},[r("no-ssr",[r("mavon-editor",{attrs:{toolbars:t.markdownOption,language:"ja"},model:{value:t.form.content,callback:function(e){t.$set(t.form,"content",e)},expression:"form.content"}})],1)],1)])],t._v(" "),r("input",{staticClass:"common-button",class:o,attrs:{type:"submit",title:"投稿する",disabled:o}})],2)]}}])})],1)}),[],!1,null,null,null);e.default=component.exports},441:function(t,e,r){"use strict";r.r(e);r(24),r(21),r(28),r(38),r(26),r(39);var n=r(12),o=r(8),l=(r(68),r(31)),c=r(396),d=r(46);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=Object(l.b)({components:{ThePostForm:c.default},setup:function(){var t=Object(l.k)(),e=Object(l.j)(),r=Object(l.i)(),o=t.getters.getCurrentUser,form=Object(l.f)({id:"",user_id:o.uid,title:"",content:"",created_at:new Date,updated_at:new Date,user:m({},o)});Object(l.h)((function(){var e=r.value.params.id;try{t.dispatch("getPostData",{id:e}).then((function(t){form.value=m({},t)}))}catch(t){console.error("投稿内容を取得できませんでした",t)}}),"TOXuN8QMAeLt2c16ZDPRqw==");var c=function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(data){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,form.value=data.formData,t.next=4,d.b.collection("posts").doc(form.value.id).update(form.value);case 4:e.push("/"),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}();return{currentUser:o,form:form,onSubmit:c}}}),O=r(75),component=Object(O.a)(v,(function(){var t=this,e=t.$createElement;return(t._self._c||e)("ThePostForm",{attrs:{propsform:t.form,title:"編集"},on:{"on-submit":t.onSubmit}})}),[],!1,null,null,null);e.default=component.exports}}]);