(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{427:function(e,t,n){"use strict";n.r(t);var r=n(18),c=(n(79),n(26)),o=n(41),l=Object(c.b)({setup:function(){Object(c.e)(Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.auth().onAuthStateChanged((function(t){t?(e.commit("setIsLogined",!0),e.commit("setCurrentUser",t)):console.log("ログインしてないよ")}));case 2:case"end":return t.stop()}}),t)}))));var e=Object(c.k)();return{login:function(){var t=Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.dispatch("setPersistence");case 3:return t.next=5,e.dispatch("auth");case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.dispatch("onRejectted",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),store:e}}}),f=n(70),component=Object(f.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("button",{on:{click:e.login}},[e._v("ログイン")])])}),[],!1,null,null,null);t.default=component.exports}}]);