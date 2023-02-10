(()=>{"use strict";var e,r,n={160:()=>{function e(e,n){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,n){if(e){if("string"==typeof e)return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?r(e,n):void 0}}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,d=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return c=e.done,e},e:function(e){d=!0,a=e},f:function(){try{c||null==t.return||t.return()}finally{if(d)throw a}}}}function r(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}var n=document.querySelector("#flash-card-page"),t=document.querySelector("#landing-page"),o=document.querySelector("#apple-signin-btn"),a=document.querySelector("#submit-btn"),c=document.querySelector(".filter-list"),d=Array.from(document.getElementsByClassName("qty")),l=document.querySelector(".images-container"),u=[];function s(){CloudKit.getDefaultContainer().publicCloudDatabase.performQuery({recordType:"Albums",filterBy:[{fieldName:"parent",comparator:"EQUALS",fieldValue:{value:"VB-MAPP-FC"}}]}).then((function(e){if(e.hasErrors)console.error(e.errors[0]);else{for(var r=e.records,n=0;n<r.length;n++){var t=r[n].fields.name.value;u.push(t)}f(u)}}))}console.log("production"),CloudKit.configure({containers:[{containerId:process.env.ICLOUD_CONTAINER,apiTokenAuth:{apiToken:process.env.ICLOUD_API_KEY,persist:!0,useAuth:!0},environment:"production"}]}),console.log("production"),CloudKit.on("error",(function(e){console.error(e)})),CloudKit.getAuthStatus().then((function(e){"AUTHORIZED"===e.status?(console.log("User is already signed in"),t.classList.add("hide"),n.classList.remove("hide"),s()):(console.log("User is not signed in"),o.addEventListener("click",(function(){CloudKit.signIn({scope:"email",redirectURI:process.env.ICLOUD_REDIRECT_URI}).then((function(e){console.log(e),e.isSuccess?(t.classList.add("hide"),n.classList.remove("hide"),e.userIdentity,s()):console.error("Error signing in:",e.error)}))})))}));var f=function(r){r.sort();var n,t=e(r);try{for(t.s();!(n=t.n()).done;){var o=n.value,i=document.createElement("div");i.classList.add("filter-item","center");var a=document.createElement("label");a.classList.add("name","center"),a.htmlFor=o,a.innerText=o;var d=document.createElement("input");d.classList.add("qty","center"),d.type="text",d.id=fileName,d.placeholder=0,i.appendChild(a),i.appendChild(d),c.appendChild(i)}}catch(e){t.e(e)}finally{t.f()}};function p(e){for(var r=e.length-1;r>0;r--){var n=Math.floor(Math.random()*(r+1)),t=[e[n],e[r]];e[r]=t[0],e[n]=t[1]}return e}f(u),a.addEventListener("click",(function(){var r=[],n=[];d.forEach((function(e){e.value&&(r.push(e.id),n.push(e.value))})),function(r,n){for(var t=CloudKit.getDefaultContainer().publicCloudDatabase,o=[],a=0;a<r.length;a++){var c={recordType:"Photos",filterBy:[{fieldName:"album",comparator:"EQUALS",fieldValue:{value:r[a]}}]};o.push(t.performQuery(c))}Promise.all(o).then((function(r){var t,o=[],a=e(r);try{for(a.s();!(t=a.n()).done;){var c,d=t.value.records,u=[],s=e(d);try{for(s.s();!(c=s.n()).done;){var f=c.value.fields.image.value;u.push(f)}}catch(e){s.e(e)}finally{s.f()}p(u),u=u.slice(0,n[i]),o=o.concat(u)}}catch(e){a.e(e)}finally{a.f()}p(o),function(e){l.innerHTML="";for(var r=0;r<e.length;r++){var n=document.createElement("img");n.src=e[r],l.appendChild(n)}}(o)}))}(r,n),s()}))}},t={};function o(e){var r=t[e];if(void 0!==r){if(void 0!==r.error)throw r.error;return r.exports}var i=t[e]={exports:{}};try{var a={id:e,module:i,factory:n[e],require:o};o.i.forEach((function(e){e(a)})),i=a.module,a.factory.call(i.exports,i,i.exports,a.require)}catch(e){throw i.error=e,e}return i.exports}o.m=n,o.c=t,o.i=[],o.hu=e=>e+"."+o.h()+".hot-update.js",o.hmrF=()=>"main."+o.h()+".hot-update.json",o.h=()=>"fb0018645ab2b6a01d43",o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="flash-cards:",o.l=(n,t,i,a)=>{if(e[n])e[n].push(t);else{var c,d;if(void 0!==i)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var s=l[u];if(s.getAttribute("src")==n||s.getAttribute("data-webpack")==r+i){c=s;break}}c||(d=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.setAttribute("data-webpack",r+i),c.src=n),e[n]=[t];var f=(r,t)=>{c.onerror=c.onload=null,clearTimeout(p);var o=e[n];if(delete e[n],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((e=>e(t))),r)return r(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=f.bind(null,c.onerror),c.onload=f.bind(null,c.onload),d&&document.head.appendChild(c)}},(()=>{var e,r,n,t={},i=o.c,a=[],c=[],d="idle",l=0,u=[];function s(e){d=e;for(var r=[],n=0;n<c.length;n++)r[n]=c[n].call(null,e);return Promise.all(r)}function f(){0==--l&&s("ready").then((function(){if(0===l){var e=u;u=[];for(var r=0;r<e.length;r++)e[r]()}}))}function p(e){if("idle"!==d)throw new Error("check() is only allowed in idle status");return s("check").then(o.hmrM).then((function(n){return n?s("prepare").then((function(){var t=[];return r=[],Promise.all(Object.keys(o.hmrC).reduce((function(e,i){return o.hmrC[i](n.c,n.r,n.m,e,r,t),e}),[])).then((function(){return r=function(){return e?v(e):s("ready").then((function(){return t}))},0===l?r():new Promise((function(e){u.push((function(){e(r())}))}));var r}))})):s(m()?"ready":"idle").then((function(){return null}))}))}function h(e){return"ready"!==d?Promise.resolve().then((function(){throw new Error("apply() is only allowed in ready status (state: "+d+")")})):v(e)}function v(e){e=e||{},m();var t=r.map((function(r){return r(e)}));r=void 0;var o=t.map((function(e){return e.error})).filter(Boolean);if(o.length>0)return s("abort").then((function(){throw o[0]}));var i=s("dispose");t.forEach((function(e){e.dispose&&e.dispose()}));var a,c=s("apply"),d=function(e){a||(a=e)},l=[];return t.forEach((function(e){if(e.apply){var r=e.apply(d);if(r)for(var n=0;n<r.length;n++)l.push(r[n])}})),Promise.all([i,c]).then((function(){return a?s("fail").then((function(){throw a})):n?v(e).then((function(e){return l.forEach((function(r){e.indexOf(r)<0&&e.push(r)})),e})):s("idle").then((function(){return l}))}))}function m(){if(n)return r||(r=[]),Object.keys(o.hmrI).forEach((function(e){n.forEach((function(n){o.hmrI[e](n,r)}))})),n=void 0,!0}o.hmrD=t,o.i.push((function(u){var v,m,y,g,b=u.module,E=function(r,n){var t=i[n];if(!t)return r;var o=function(o){if(t.hot.active){if(i[o]){var c=i[o].parents;-1===c.indexOf(n)&&c.push(n)}else a=[n],e=o;-1===t.children.indexOf(o)&&t.children.push(o)}else console.warn("[HMR] unexpected require("+o+") from disposed module "+n),a=[];return r(o)},c=function(e){return{configurable:!0,enumerable:!0,get:function(){return r[e]},set:function(n){r[e]=n}}};for(var u in r)Object.prototype.hasOwnProperty.call(r,u)&&"e"!==u&&Object.defineProperty(o,u,c(u));return o.e=function(e){return function(e){switch(d){case"ready":s("prepare");case"prepare":return l++,e.then(f,f),e;default:return e}}(r.e(e))},o}(u.require,u.id);b.hot=(v=u.id,m=b,g={_acceptedDependencies:{},_acceptedErrorHandlers:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:y=e!==v,_requireSelf:function(){a=m.parents.slice(),e=y?void 0:v,o(v)},active:!0,accept:function(e,r,n){if(void 0===e)g._selfAccepted=!0;else if("function"==typeof e)g._selfAccepted=e;else if("object"==typeof e&&null!==e)for(var t=0;t<e.length;t++)g._acceptedDependencies[e[t]]=r||function(){},g._acceptedErrorHandlers[e[t]]=n;else g._acceptedDependencies[e]=r||function(){},g._acceptedErrorHandlers[e]=n},decline:function(e){if(void 0===e)g._selfDeclined=!0;else if("object"==typeof e&&null!==e)for(var r=0;r<e.length;r++)g._declinedDependencies[e[r]]=!0;else g._declinedDependencies[e]=!0},dispose:function(e){g._disposeHandlers.push(e)},addDisposeHandler:function(e){g._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=g._disposeHandlers.indexOf(e);r>=0&&g._disposeHandlers.splice(r,1)},invalidate:function(){switch(this._selfInvalidated=!0,d){case"idle":r=[],Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](v,r)})),s("ready");break;case"ready":Object.keys(o.hmrI).forEach((function(e){o.hmrI[e](v,r)}));break;case"prepare":case"check":case"dispose":case"apply":(n=n||[]).push(v)}},check:p,apply:h,status:function(e){if(!e)return d;c.push(e)},addStatusHandler:function(e){c.push(e)},removeStatusHandler:function(e){var r=c.indexOf(e);r>=0&&c.splice(r,1)},data:t[v]},e=void 0,g),b.parents=a,b.children=[],a=[],u.require=E})),o.hmrC={},o.hmrI={}})(),o.p="/",(()=>{var e,r,n,t,i,a=o.hmrS_jsonp=o.hmrS_jsonp||{179:0},c={};function d(r,n){return e=n,new Promise(((e,n)=>{c[r]=e;var t=o.p+o.hu(r),i=new Error;o.l(t,(e=>{if(c[r]){c[r]=void 0;var t=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;i.message="Loading hot update chunk "+r+" failed.\n("+t+": "+o+")",i.name="ChunkLoadError",i.type=t,i.request=o,n(i)}}))}))}function l(e){function c(e){for(var r=[e],n={},t=r.map((function(e){return{chain:[e],id:e}}));t.length>0;){var i=t.pop(),a=i.id,c=i.chain,l=o.c[a];if(l&&(!l.hot._selfAccepted||l.hot._selfInvalidated)){if(l.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:a};if(l.hot._main)return{type:"unaccepted",chain:c,moduleId:a};for(var u=0;u<l.parents.length;u++){var s=l.parents[u],f=o.c[s];if(f){if(f.hot._declinedDependencies[a])return{type:"declined",chain:c.concat([s]),moduleId:a,parentId:s};-1===r.indexOf(s)&&(f.hot._acceptedDependencies[a]?(n[s]||(n[s]=[]),d(n[s],[a])):(delete n[s],r.push(s),t.push({chain:c.concat([s]),id:s})))}}}}return{type:"accepted",moduleId:e,outdatedModules:r,outdatedDependencies:n}}function d(e,r){for(var n=0;n<r.length;n++){var t=r[n];-1===e.indexOf(t)&&e.push(t)}}o.f&&delete o.f.jsonpHmr,r=void 0;var l={},u=[],s={},f=function(e){console.warn("[HMR] unexpected require("+e.id+") to disposed module")};for(var p in n)if(o.o(n,p)){var h,v=n[p],m=!1,y=!1,g=!1,b="";switch((h=v?c(p):{type:"disposed",moduleId:p}).chain&&(b="\nUpdate propagation: "+h.chain.join(" -> ")),h.type){case"self-declined":e.onDeclined&&e.onDeclined(h),e.ignoreDeclined||(m=new Error("Aborted because of self decline: "+h.moduleId+b));break;case"declined":e.onDeclined&&e.onDeclined(h),e.ignoreDeclined||(m=new Error("Aborted because of declined dependency: "+h.moduleId+" in "+h.parentId+b));break;case"unaccepted":e.onUnaccepted&&e.onUnaccepted(h),e.ignoreUnaccepted||(m=new Error("Aborted because "+p+" is not accepted"+b));break;case"accepted":e.onAccepted&&e.onAccepted(h),y=!0;break;case"disposed":e.onDisposed&&e.onDisposed(h),g=!0;break;default:throw new Error("Unexception type "+h.type)}if(m)return{error:m};if(y)for(p in s[p]=v,d(u,h.outdatedModules),h.outdatedDependencies)o.o(h.outdatedDependencies,p)&&(l[p]||(l[p]=[]),d(l[p],h.outdatedDependencies[p]));g&&(d(u,[h.moduleId]),s[p]=f)}n=void 0;for(var E,I=[],_=0;_<u.length;_++){var w=u[_],D=o.c[w];D&&(D.hot._selfAccepted||D.hot._main)&&s[w]!==f&&!D.hot._selfInvalidated&&I.push({module:w,require:D.hot._requireSelf,errorHandler:D.hot._selfAccepted})}return{dispose:function(){var e;t.forEach((function(e){delete a[e]})),t=void 0;for(var r,n=u.slice();n.length>0;){var i=n.pop(),c=o.c[i];if(c){var d={},s=c.hot._disposeHandlers;for(_=0;_<s.length;_++)s[_].call(null,d);for(o.hmrD[i]=d,c.hot.active=!1,delete o.c[i],delete l[i],_=0;_<c.children.length;_++){var f=o.c[c.children[_]];f&&(e=f.parents.indexOf(i))>=0&&f.parents.splice(e,1)}}}for(var p in l)if(o.o(l,p)&&(c=o.c[p]))for(E=l[p],_=0;_<E.length;_++)r=E[_],(e=c.children.indexOf(r))>=0&&c.children.splice(e,1)},apply:function(r){for(var n in s)o.o(s,n)&&(o.m[n]=s[n]);for(var t=0;t<i.length;t++)i[t](o);for(var a in l)if(o.o(l,a)){var c=o.c[a];if(c){E=l[a];for(var d=[],f=[],p=[],h=0;h<E.length;h++){var v=E[h],m=c.hot._acceptedDependencies[v],y=c.hot._acceptedErrorHandlers[v];if(m){if(-1!==d.indexOf(m))continue;d.push(m),f.push(y),p.push(v)}}for(var g=0;g<d.length;g++)try{d[g].call(null,E)}catch(n){if("function"==typeof f[g])try{f[g](n,{moduleId:a,dependencyId:p[g]})}catch(t){e.onErrored&&e.onErrored({type:"accept-error-handler-errored",moduleId:a,dependencyId:p[g],error:t,originalError:n}),e.ignoreErrored||(r(t),r(n))}else e.onErrored&&e.onErrored({type:"accept-errored",moduleId:a,dependencyId:p[g],error:n}),e.ignoreErrored||r(n)}}}for(var b=0;b<I.length;b++){var _=I[b],w=_.module;try{_.require(w)}catch(n){if("function"==typeof _.errorHandler)try{_.errorHandler(n,{moduleId:w,module:o.c[w]})}catch(t){e.onErrored&&e.onErrored({type:"self-accept-error-handler-errored",moduleId:w,error:t,originalError:n}),e.ignoreErrored||(r(t),r(n))}else e.onErrored&&e.onErrored({type:"self-accept-errored",moduleId:w,error:n}),e.ignoreErrored||r(n)}}return u}}}self.webpackHotUpdateflash_cards=(r,t,a)=>{for(var d in t)o.o(t,d)&&(n[d]=t[d],e&&e.push(d));a&&i.push(a),c[r]&&(c[r](),c[r]=void 0)},o.hmrI.jsonp=function(e,r){n||(n={},i=[],t=[],r.push(l)),o.o(n,e)||(n[e]=o.m[e])},o.hmrC.jsonp=function(e,c,u,s,f,p){f.push(l),r={},t=c,n=u.reduce((function(e,r){return e[r]=!1,e}),{}),i=[],e.forEach((function(e){o.o(a,e)&&void 0!==a[e]?(s.push(d(e,p)),r[e]=!0):r[e]=!1})),o.f&&(o.f.jsonpHmr=function(e,n){r&&o.o(r,e)&&!r[e]&&(n.push(d(e)),r[e]=!0)})},o.hmrM=()=>{if("undefined"==typeof fetch)throw new Error("No browser support: need fetch API");return fetch(o.p+o.hmrF()).then((e=>{if(404!==e.status){if(!e.ok)throw new Error("Failed to fetch update manifest "+e.statusText);return e.json()}}))}})(),o(160)})();
//# sourceMappingURL=bundle.js.map