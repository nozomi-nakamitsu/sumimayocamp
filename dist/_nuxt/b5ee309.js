(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{306:function(e,t,r){"use strict";r.r(t);var n=r(23),l=r(91),o=Object(n.a)((function(){return function(e,t){return{"-error":e||t}}})),d=Object(n.b)({components:{ValidationProvider:l.b},props:{setValue:{type:String,default:""},label:{type:String,required:!1,default:void 0},placeholder:{type:String,required:!1,default:void 0},inputName:{type:String,required:!1,default:""},required:{type:Boolean,default:!1},disabled:{type:Boolean,required:!1,default:!1},rules:{type:String,default:""}},setup:function(e,t){var form=Object(n.a)((function(){return{inputValue:e.setValue}}));return{doneOrError:o,form:form,inputFunc:function(e){e.target instanceof HTMLInputElement&&(form.value.inputValue=e.target.value,t.emit("input",form.value.inputValue))}}}}),c=r(56),component=Object(c.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"validation-wrap"},[e.label?r("label",{staticClass:"label",attrs:{for:e.inputName}},[e._v(e._s(e.label)+" ")]):e._e(),e._v(" "),e.required?r("span",{staticClass:"required-asterisk"},[e._v("*")]):e._e(),e._v(" "),r("ValidationProvider",{staticClass:"provider",attrs:{tag:"div",rules:e.rules},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.failed,l=t.errors;return[r("input",{staticClass:"app-input",class:e.doneOrError(n),attrs:{id:e.inputName,type:"text",disabled:e.disabled,placeholder:e.placeholder,name:e.inputName},domProps:{value:e.form.inputValue},on:{input:e.inputFunc}}),e._v(" "),l.length>0?r("p",{staticClass:"error"},[e._v("\n      "+e._s(l[0])+"\n    ")]):e._e()]}}])})],1)}),[],!1,null,null,null);t.default=component.exports}}]);