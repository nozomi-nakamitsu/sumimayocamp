(window.webpackJsonp=window.webpackJsonp||[]).push([[16,8,12],{398:function(e,t,r){"use strict";r.r(t);var n=r(32),o=r(108),l=Object(n.a)((function(){return function(e,t){return{"-error":e||t}}})),c=Object(n.b)({components:{ValidationProvider:o.b},props:{setValue:{type:String,default:""},label:{type:String,required:!1,default:void 0},placeholder:{type:String,required:!1,default:void 0},inputName:{type:String,required:!1,default:""},required:{type:Boolean,default:!1},disabled:{type:Boolean,required:!1,default:!1},rules:{type:String,default:""}},setup:function(e,t){var form=Object(n.a)((function(){return{inputValue:e.setValue}}));return{doneOrError:l,form:form,inputFunc:function(e){e.target instanceof HTMLInputElement&&(form.value.inputValue=e.target.value,t.emit("input",form.value.inputValue))}}}}),d=r(75),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"validation-wrap"},[e.label?r("label",{staticClass:"label",attrs:{for:e.inputName}},[e._v(e._s(e.label)+" ")]):e._e(),e._v(" "),e.required?r("span",{staticClass:"required-asterisk"},[e._v("*")]):e._e(),e._v(" "),r("ValidationProvider",{staticClass:"provider",attrs:{tag:"div",rules:e.rules},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.failed,o=t.errors;return[r("input",{staticClass:"app-input",class:e.doneOrError(n),attrs:{id:e.inputName,type:"text",disabled:e.disabled,placeholder:e.placeholder,name:e.inputName},domProps:{value:e.form.inputValue},on:{input:e.inputFunc}}),e._v(" "),o.length>0?r("p",{staticClass:"error"},[e._v("\n      "+e._s(o[0])+"\n    ")]):e._e()]}}])})],1)}),[],!1,null,null,null);t.default=component.exports},403:function(e,t,r){var content=r(404);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(65).default)("e003f1f8",content,!0,{sourceMap:!1})},404:function(e,t,r){var n=r(64)(!1);n.push([e.i,".v-progress-circular{position:relative;display:inline-flex;vertical-align:middle;justify-content:center;align-items:center}.v-progress-circular>svg{width:100%;height:100%;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;z-index:0}.v-progress-circular--indeterminate>svg{-webkit-animation:progress-circular-rotate 1.4s linear infinite;animation:progress-circular-rotate 1.4s linear infinite;transform-origin:center center;transition:all .2s ease-in-out}.v-progress-circular--indeterminate .v-progress-circular__overlay{-webkit-animation:progress-circular-dash 1.4s ease-in-out infinite;animation:progress-circular-dash 1.4s ease-in-out infinite;stroke-linecap:round;stroke-dasharray:80,200;stroke-dashoffset:0px}.v-progress-circular--indeterminate:not(.v-progress-circular--visible) .v-progress-circular__overlay,.v-progress-circular--indeterminate:not(.v-progress-circular--visible)>svg{-webkit-animation-play-state:paused!important;animation-play-state:paused!important}.v-progress-circular__info{align-items:center;display:flex;justify-content:center}.v-progress-circular__underlay{stroke:hsla(0,0%,62%,.4);z-index:1}.v-progress-circular__overlay{stroke:currentColor;z-index:2;transition:all .6s ease-in-out}@-webkit-keyframes progress-circular-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0px}50%{stroke-dasharray:100,200;stroke-dashoffset:-15px}to{stroke-dasharray:100,200;stroke-dashoffset:-124px}}@keyframes progress-circular-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0px}50%{stroke-dasharray:100,200;stroke-dashoffset:-15px}to{stroke-dasharray:100,200;stroke-dashoffset:-124px}}@-webkit-keyframes progress-circular-rotate{to{transform:rotate(1turn)}}@keyframes progress-circular-rotate{to{transform:rotate(1turn)}}",""]),e.exports=n},405:function(e,t,r){"use strict";r.r(t);r(28);var n=r(32),o=r(398),l={bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,fullscreen:!1,htmlcode:!0},c=Object(n.b)({components:{ValidationInput:o.default},props:{propsform:{type:Object,required:!0},title:{types:String,default:""},propLoading:{types:Boolean,default:!1}},emits:["on-submit","img-add"],setup:function(e,t){var r=Object(n.l)().getters.getCurrentUser,form=Object(n.a)((function(){return{id:e.propsform.id,title:e.propsform.title,user_id:r.uid,content:e.propsform.content,created_at:"新規作成"===e.title?new Date:e.propsform.created_at,updated_at:new Date,user:e.propsform.user}})),o=Object(n.g)(null),c=Object(n.g)(!1);Object(n.m)((function(){return e.propLoading}),(function(){c.value=e.propLoading}));return{currentUser:r,form:form,fileUploadEvent:o,onSubmit:function(){t.emit("on-submit",{formData:form.value,types:e.title})},selectFile:function(e){o.value=e},markdownOption:l,change:function(e){form.value.title=e},imgAdd:function(e,r){var n,o;null===(n=document.querySelector(".auto-textarea-input"))||void 0===n||n.classList.add("-hidden"),null===(o=document.querySelector(".v-note-show"))||void 0===o||o.classList.add("-hidden"),c.value=!0,form.value.content=t.emit("img-add",{file:r,fileName:r.name,content:form.value.content})},isLoading:c}}}),d=r(75),f=r(127),v=r.n(f),m=(r(84),r(40),r(403),r(192)),h=r(191),y=r(9),w=h.a.extend({name:"v-progress-circular",directives:{intersect:m.a},props:{button:Boolean,indeterminate:Boolean,rotate:{type:[Number,String],default:0},size:{type:[Number,String],default:32},width:{type:[Number,String],default:4},value:{type:[Number,String],default:0}},data:function(){return{radius:20,isVisible:!0}},computed:{calculatedSize:function(){return Number(this.size)+(this.button?8:0)},circumference:function(){return 2*Math.PI*this.radius},classes:function(){return{"v-progress-circular--visible":this.isVisible,"v-progress-circular--indeterminate":this.indeterminate,"v-progress-circular--button":this.button}},normalizedValue:function(){return this.value<0?0:this.value>100?100:parseFloat(this.value)},strokeDashArray:function(){return Math.round(1e3*this.circumference)/1e3},strokeDashOffset:function(){return(100-this.normalizedValue)/100*this.circumference+"px"},strokeWidth:function(){return Number(this.width)/+this.size*this.viewBoxSize*2},styles:function(){return{height:Object(y.d)(this.calculatedSize),width:Object(y.d)(this.calculatedSize)}},svgStyles:function(){return{transform:"rotate(".concat(Number(this.rotate),"deg)")}},viewBoxSize:function(){return this.radius/(1-Number(this.width)/+this.size)}},methods:{genCircle:function(e,t){return this.$createElement("circle",{class:"v-progress-circular__".concat(e),attrs:{fill:"transparent",cx:2*this.viewBoxSize,cy:2*this.viewBoxSize,r:this.radius,"stroke-width":this.strokeWidth,"stroke-dasharray":this.strokeDashArray,"stroke-dashoffset":t}})},genSvg:function(){var e=[this.indeterminate||this.genCircle("underlay",0),this.genCircle("overlay",this.strokeDashOffset)];return this.$createElement("svg",{style:this.svgStyles,attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"".concat(this.viewBoxSize," ").concat(this.viewBoxSize," ").concat(2*this.viewBoxSize," ").concat(2*this.viewBoxSize)}},e)},genInfo:function(){return this.$createElement("div",{staticClass:"v-progress-circular__info"},this.$slots.default)},onObserve:function(e,t,r){this.isVisible=r}},render:function(e){return e("div",this.setTextColor(this.color,{staticClass:"v-progress-circular",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:this.styles,on:this.$listeners}),[this.genSvg(),this.genInfo()])}}),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"form-container"},[r("div",[e._v(e._s(e.title))]),e._v(" "),r("ValidationObserver",{ref:"obs",scopedSlots:e._u([{key:"default",fn:function(t){var n=t.handleSubmit,o=t.invalid;return[r("form",{staticClass:"form-area",on:{submit:function(t){return t.preventDefault(),n(e.onSubmit)}}},[r("ValidationInput",{staticClass:"nameinput",attrs:{label:"タイトル","input-name":"title",rules:"required","set-value":e.form.title},on:{input:function(t){return e.change(t,"nickName")}}}),e._v(" "),[r("ValidationProvider",{staticClass:"provider",attrs:{tag:"div",rules:"required",name:"内容"}},[r("div",{staticClass:"drop_area",on:{dragover:function(e){e.preventDefault()}}},[r("div",{staticClass:"markdown-editor"},[r("no-ssr",[r("mavon-editor",{attrs:{toolbars:e.markdownOption,language:"ja"},on:{imgAdd:e.imgAdd},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1)],1)])])],e._v(" "),r("div",[r("input",{staticClass:"common-button",class:o,attrs:{type:"submit",title:"投稿する",disabled:o}})])],2)]}}])}),e._v(" "),e.isLoading?r("v-progress-circular",{staticStyle:{position:"absolute",top:"40%",left:"25%","z-index":"5"},attrs:{indeterminate:"",color:"amber"}}):e._e(),e._v(" "),e.isLoading?r("v-progress-circular",{staticStyle:{position:"absolute",top:"40%",left:"75%","z-index":"5"},attrs:{indeterminate:"",color:"amber"}}):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;v()(component,{VProgressCircular:w})},409:function(e,t,r){"use strict";r.d(t,"a",(function(){return S}));r(25),r(21),r(30),r(38),r(27),r(39);var n,o=r(11),l=r(107),c=r(8),d=(r(63),r(128),r(29),r(69),r(66),r(40),r(47),r(32)),f=new Uint8Array(16);function v(){if(!n&&!(n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return n(f)}var m=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var h=function(e){return"string"==typeof e&&m.test(e)},y=[],w=0;w<256;++w)y.push((w+256).toString(16).substr(1));var O=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=(y[e[t+0]]+y[e[t+1]]+y[e[t+2]]+y[e[t+3]]+"-"+y[e[t+4]]+y[e[t+5]]+"-"+y[e[t+6]]+y[e[t+7]]+"-"+y[e[t+8]]+y[e[t+9]]+"-"+y[e[t+10]]+y[e[t+11]]+y[e[t+12]]+y[e[t+13]]+y[e[t+14]]+y[e[t+15]]).toLowerCase();if(!h(r))throw TypeError("Stringified UUID is invalid");return r};var k=function(e,t,r){var n=(e=e||{}).random||(e.rng||v)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0;for(var i=0;i<16;++i)t[r+i]=n[i];return t}return O(n)};function _(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function x(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var S=function(e){var t=Object(d.l)(),r=Object(d.g)(!1),form=Object(d.g)({id:"",user_id:e.uid,title:"",content:"",created_at:new Date,updated_at:new Date,user:x({},e),files:[]}),n=Object(d.g)(form.value.files);Object(d.m)((function(){return form.value.files}),(function(){n.value=Object(l.a)(form.value.files)}));var c=function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(o){var c,d,f,v,m;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.value=!0,f=k(),e.prev=2,e.next=5,t.dispatch("uploadFile",{file:o,id:f});case 5:v=e.sent,m=new RegExp("\\([.\\d]+?\\)","g"),form.value.content=o.content.replace(m,"(".concat(v,"})")),null===(c=document.querySelector(".auto-textarea-input"))||void 0===c||c.classList.remove("-hidden"),null===(d=document.querySelector(".v-note-show"))||void 0===d||d.classList.remove("-hidden"),n.value=[].concat(Object(l.a)(n.value),[{id:f,url:v}]),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(2),console.error("file upload",e.t0);case 16:return e.prev=16,r.value=!1,e.finish(16);case 19:case"end":return e.stop()}}),e,null,[[2,13,16,19]])})));return function(t){return e.apply(this,arguments)}}();return{isLoading:r,fileChanged:c,files:n,form:form,currentUser:e,deleteUnNecessaryFiles:function(){n.value.map((function(e){var r=e.id;t.dispatch("deleteFile",{id:r})}))}}}},450:function(e,t,r){"use strict";r.r(t);var n=r(11),o=(r(63),r(30),r(47),r(76),r(77),r(32)),l=r(405),c=r(24),d=r(409),f=Object(o.b)({components:{ThePostForm:l.default},setup:function(){var e=Object(o.l)(),t=e.getters.getCurrentUser,r=Object(o.k)(),l=Object(d.a)(t),f=l.fileChanged,v=l.deleteUnNecessaryFiles,m=l.isLoading,h=l.files,form=l.form,y=function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(data){var n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,form.value=data.formData,!(n=JSON.parse(JSON.stringify(h.value)).filter((function(e){return-1===form.value.content.indexOf(e.url)}))).length){t.next=6;break}return t.next=6,n.map((function(t){var r=t.id;e.dispatch("deleteFile",{id:r})}));case 6:form.value.files=h.value.filter((function(e){return form.value.content.includes(e.url)})),o=c.b.collection("posts").doc().id,form.value.id=o,c.b.collection("posts").doc(o).set(form.value),r.push("/"),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),console.error(t.t0);case 16:case"end":return t.stop()}}),t,null,[[0,13]])})));return function(e){return t.apply(this,arguments)}}();return window.onbeforeunload=function(){h.value.length&&v()},{currentUser:t,form:form,isLoading:m,onSubmit:y,fileChanged:f,useUploadFile:d.a}}}),v=r(75),component=Object(v.a)(f,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("ThePostForm",{attrs:{propsform:e.form,title:"新規作成",propLoading:e.isLoading},on:{"on-submit":e.onSubmit,"img-add":e.fileChanged}})}),[],!1,null,null,null);t.default=component.exports}}]);