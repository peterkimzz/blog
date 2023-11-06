import{_ as we,a as Ce}from"./Card.vue.b3831718.js";import{u as Oe,_ as Le}from"./ContentDoc.ac4faeca.js";import{_ as Te}from"./nuxt-link.280cbaee.js";import{f as ce,u as Se,o as z,c as x,g as ke,h as ue,i as He,j as Ne,k as te,n as Ie,l as oe,w as ne,a as y,m as E,t as ae,b as q,q as X,F as re,r as ie,d as Ae}from"./entry.0cb8ea49.js";import{_ as Pe}from"./Container.97cfacd9.js";import{u as de,q as se}from"./query.52666a78.js";import"./ContentRenderer.1f3afad6.js";import"./ContentRendererMarkdown.vue.0fc8665b.js";import"./index.288f722b.js";import"./preview.316d83aa.js";import"./ContentQuery.1edc7a8e.js";import"./_plugin-vue_export-helper.c27b6911.js";const Me={class:"giscus"},Be=ce({__name:"Comment",setup(c){return Se({script:[{src:"https://giscus.app/client.js","data-repo":"peterkimzz/blog","data-repo-id":"MDEwOlJlcG9zaXRvcnkzMjAyNTkyMTY=","data-category":"Blog Comments","data-category-id":"DIC_kwDOExbEkM4B-8Mf","data-mapping":"title","data-strict":"0","data-reactions-enabled":"1","data-emit-metadata":"0","data-input-position":"top","data-theme":"preferred_color_scheme","data-lang":"ko","data-loading":"lazy",crossorigin:"anonymous",async:!0}]}),(t,r)=>(z(),x("div",Me))}}),J={EVENT_TRACKING:{CLICK_SWITCH_POSITION:"click_switch_position"},LOCAL_STORAGE:{CONTENT_POSITION:"contentPosition"}};function Re(){const{$gtag:c}=He(),t=ke("$aEhwlM85kA");function r(){switch(t.value){case"left":t.value="right";break;case"right":t.value="left";break;default:console.error("invalid toggle contentPosition",t.value);break}localStorage.setItem(J.LOCAL_STORAGE.CONTENT_POSITION,t.value),c.setEvent(J.EVENT_TRACKING.CLICK_SWITCH_POSITION,{changedPosition:t.value})}return ue(()=>{t.value=localStorage.getItem(J.LOCAL_STORAGE.CONTENT_POSITION)??"right"}),{contentPosition:t,toggleContentPosition:r}}/*! medium-zoom 1.0.8 | MIT License | https://github.com/francoischalifour/medium-zoom */var w=Object.assign||function(c){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var m in r)Object.prototype.hasOwnProperty.call(r,m)&&(c[m]=r[m])}return c},D=function(t){return t.tagName==="IMG"},je=function(t){return NodeList.prototype.isPrototypeOf(t)},G=function(t){return t&&t.nodeType===1},me=function(t){var r=t.currentSrc||t.src;return r.substr(-4).toLowerCase()===".svg"},le=function(t){try{return Array.isArray(t)?t.filter(D):je(t)?[].slice.call(t).filter(D):G(t)?[t].filter(D):typeof t=="string"?[].slice.call(document.querySelectorAll(t)).filter(D):[]}catch{throw new TypeError(`The provided selector is invalid.
Expects a CSS selector, a Node element, a NodeList or an array.
See: https://github.com/francoischalifour/medium-zoom`)}},$e=function(t){var r=document.createElement("div");return r.classList.add("medium-zoom-overlay"),r.style.background=t,r},qe=function(t){var r=t.getBoundingClientRect(),m=r.top,d=r.left,k=r.width,C=r.height,h=t.cloneNode(),I=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,O=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;return h.removeAttribute("id"),h.style.position="absolute",h.style.top=m+I+"px",h.style.left=d+O+"px",h.style.width=k+"px",h.style.height=C+"px",h.style.transform="",h},S=function(t,r){var m=w({bubbles:!1,cancelable:!1,detail:void 0},r);if(typeof window.CustomEvent=="function")return new CustomEvent(t,m);var d=document.createEvent("CustomEvent");return d.initCustomEvent(t,m.bubbles,m.cancelable,m.detail),d},De=function c(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},m=window.Promise||function(o){function n(){}o(n,n)},d=function(o){var n=o.target;if(n===j){v();return}l.indexOf(n)!==-1&&H({target:n})},k=function(){if(!(L||!e.original)){var o=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;Math.abs(Q-o)>i.scrollOffset&&setTimeout(v,150)}},C=function(o){var n=o.key||o.keyCode;(n==="Escape"||n==="Esc"||n===27)&&v()},h=function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=o;if(o.background&&(j.style.background=o.background),o.container&&o.container instanceof Object&&(n.container=w({},i.container,o.container)),o.template){var s=G(o.template)?o.template:document.querySelector(o.template);n.template=s}return i=w({},i,n),l.forEach(function(u){u.dispatchEvent(S("medium-zoom:update",{detail:{zoom:p}}))}),p},I=function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return c(w({},i,o))},O=function(){for(var o=arguments.length,n=Array(o),s=0;s<o;s++)n[s]=arguments[s];var u=n.reduce(function(a,f){return[].concat(a,le(f))},[]);return u.filter(function(a){return l.indexOf(a)===-1}).forEach(function(a){l.push(a),a.classList.add("medium-zoom-image")}),R.forEach(function(a){var f=a.type,_=a.listener,T=a.options;u.forEach(function(b){b.addEventListener(f,_,T)})}),p},Y=function(){for(var o=arguments.length,n=Array(o),s=0;s<o;s++)n[s]=arguments[s];e.zoomed&&v();var u=n.length>0?n.reduce(function(a,f){return[].concat(a,le(f))},[]):l;return u.forEach(function(a){a.classList.remove("medium-zoom-image"),a.dispatchEvent(S("medium-zoom:detach",{detail:{zoom:p}}))}),l=l.filter(function(a){return u.indexOf(a)===-1}),p},F=function(o,n){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return l.forEach(function(u){u.addEventListener("medium-zoom:"+o,n,s)}),R.push({type:"medium-zoom:"+o,listener:n,options:s}),p},K=function(o,n){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return l.forEach(function(u){u.removeEventListener("medium-zoom:"+o,n,s)}),R=R.filter(function(u){return!(u.type==="medium-zoom:"+o&&u.listener.toString()===n.toString())}),p},A=function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=o.target,s=function(){var a={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,left:0,top:0,right:0,bottom:0},f=void 0,_=void 0;if(i.container)if(i.container instanceof Object)a=w({},a,i.container),f=a.width-a.left-a.right-i.margin*2,_=a.height-a.top-a.bottom-i.margin*2;else{var T=G(i.container)?i.container:document.querySelector(i.container),b=T.getBoundingClientRect(),V=b.width,pe=b.height,ge=b.left,fe=b.top;a=w({},a,{width:V,height:pe,left:ge,top:fe})}f=f||a.width-i.margin*2,_=_||a.height-i.margin*2;var N=e.zoomedHd||e.original,he=me(N)?f:N.naturalWidth||f,ve=me(N)?_:N.naturalHeight||_,$=N.getBoundingClientRect(),_e=$.top,ye=$.left,W=$.width,Z=$.height,ze=Math.min(Math.max(W,he),f)/W,be=Math.min(Math.max(Z,ve),_)/Z,U=Math.min(ze,be),Ee=(-ye+(f-W)/2+i.margin+a.left)/U,xe=(-_e+(_-Z)/2+i.margin+a.top)/U,ee="scale("+U+") translate3d("+Ee+"px, "+xe+"px, 0)";e.zoomed.style.transform=ee,e.zoomedHd&&(e.zoomedHd.style.transform=ee)};return new m(function(u){if(n&&l.indexOf(n)===-1){u(p);return}var a=function V(){L=!1,e.zoomed.removeEventListener("transitionend",V),e.original.dispatchEvent(S("medium-zoom:opened",{detail:{zoom:p}})),u(p)};if(e.zoomed){u(p);return}if(n)e.original=n;else if(l.length>0){var f=l;e.original=f[0]}else{u(p);return}if(e.original.dispatchEvent(S("medium-zoom:open",{detail:{zoom:p}})),Q=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0,L=!0,e.zoomed=qe(e.original),document.body.appendChild(j),i.template){var _=G(i.template)?i.template:document.querySelector(i.template);e.template=document.createElement("div"),e.template.appendChild(_.content.cloneNode(!0)),document.body.appendChild(e.template)}if(e.original.parentElement&&e.original.parentElement.tagName==="PICTURE"&&e.original.currentSrc&&(e.zoomed.src=e.original.currentSrc),document.body.appendChild(e.zoomed),window.requestAnimationFrame(function(){document.body.classList.add("medium-zoom--opened")}),e.original.classList.add("medium-zoom-image--hidden"),e.zoomed.classList.add("medium-zoom-image--opened"),e.zoomed.addEventListener("click",v),e.zoomed.addEventListener("transitionend",a),e.original.getAttribute("data-zoom-src")){e.zoomedHd=e.zoomed.cloneNode(),e.zoomedHd.removeAttribute("srcset"),e.zoomedHd.removeAttribute("sizes"),e.zoomedHd.removeAttribute("loading"),e.zoomedHd.src=e.zoomed.getAttribute("data-zoom-src"),e.zoomedHd.onerror=function(){clearInterval(T),console.warn("Unable to reach the zoom image target "+e.zoomedHd.src),e.zoomedHd=null,s()};var T=setInterval(function(){e.zoomedHd.complete&&(clearInterval(T),e.zoomedHd.classList.add("medium-zoom-image--opened"),e.zoomedHd.addEventListener("click",v),document.body.appendChild(e.zoomedHd),s())},10)}else if(e.original.hasAttribute("srcset")){e.zoomedHd=e.zoomed.cloneNode(),e.zoomedHd.removeAttribute("sizes"),e.zoomedHd.removeAttribute("loading");var b=e.zoomedHd.addEventListener("load",function(){e.zoomedHd.removeEventListener("load",b),e.zoomedHd.classList.add("medium-zoom-image--opened"),e.zoomedHd.addEventListener("click",v),document.body.appendChild(e.zoomedHd),s()})}else s()})},v=function(){return new m(function(o){if(L||!e.original){o(p);return}var n=function s(){e.original.classList.remove("medium-zoom-image--hidden"),document.body.removeChild(e.zoomed),e.zoomedHd&&document.body.removeChild(e.zoomedHd),document.body.removeChild(j),e.zoomed.classList.remove("medium-zoom-image--opened"),e.template&&document.body.removeChild(e.template),L=!1,e.zoomed.removeEventListener("transitionend",s),e.original.dispatchEvent(S("medium-zoom:closed",{detail:{zoom:p}})),e.original=null,e.zoomed=null,e.zoomedHd=null,e.template=null,o(p)};L=!0,document.body.classList.remove("medium-zoom--opened"),e.zoomed.style.transform="",e.zoomedHd&&(e.zoomedHd.style.transform=""),e.template&&(e.template.style.transition="opacity 150ms",e.template.style.opacity=0),e.original.dispatchEvent(S("medium-zoom:close",{detail:{zoom:p}})),e.zoomed.addEventListener("transitionend",n)})},H=function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=o.target;return e.original?v():A({target:n})},P=function(){return i},M=function(){return l},B=function(){return e.original},l=[],R=[],L=!1,Q=0,i=r,e={original:null,zoomed:null,zoomedHd:null,template:null};Object.prototype.toString.call(t)==="[object Object]"?i=t:(t||typeof t=="string")&&O(t),i=w({margin:0,background:"#fff",scrollOffset:40,container:null,template:null},i);var j=$e(i.background);document.addEventListener("click",d),document.addEventListener("keyup",C),document.addEventListener("scroll",k),window.addEventListener("resize",v);var p={open:A,close:v,toggle:H,update:h,clone:I,attach:O,detach:Y,on:F,off:K,getOptions:P,getImages:M,getZoomedImage:B};return p};function Ge(c,t){t===void 0&&(t={});var r=t.insertAt;if(!(!c||typeof document>"u")){var m=document.head||document.getElementsByTagName("head")[0],d=document.createElement("style");d.type="text/css",r==="top"&&m.firstChild?m.insertBefore(d,m.firstChild):m.appendChild(d),d.styleSheet?d.styleSheet.cssText=c:d.appendChild(document.createTextNode(c))}}var Ye=".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";Ge(Ye);const Fe=De;function Ke(){ue(()=>{Fe("[data-zoomable]",{background:"#000000e6"})})}const Ve={class:"flex lg:gap-10 lg:flex-row flex-col transition-all h-full"},We={key:0,class:"max-w-prose w-full mx-auto lg:flex-[1_0_0%] overflow-y-scroll py-10 pr-4"},Ze={class:"pb-10 text-center"},Ue={class:"text-3xl max-w-md mx-auto font-bold leading-tight tracking-[-0.01em] text-black pb-3"},Xe={class:"sticky top-[53px] max-w-prose h-fit w-full mx-auto py-10"},Je={class:"hidden lg:block"},Qe=y("h4",{class:"text-gray-600 text-sm font-semibold pb-0.5"},"목차",-1),et={key:0},tt={class:"text-gray-900 font-medium"},ot={class:"py-10"},nt=y("h3",{class:"text-2xl text-black font-bold"},"같은 카테고리의 다른 글",-1),at={class:"py-10"},rt={key:0},it={class:"grid sm:grid-cols-2 lg:grid-cols-3 gap-12"},yt=ce({__name:"index",async setup(c){let t,r;Re(),Ke();const{path:m}=Ne(),{data:d,error:k}=([t,r]=te(()=>de(se().where({_path:m}).findOne,"$sSIp1FXI6A")),t=await t,r(),t),{data:C}=([t,r]=te(()=>{var h;return de(se().where({category:(h=d.value)==null?void 0:h.category,_path:{$ne:m}}).find,"$RQ8LxeSY6B")}),t=await t,r(),t);return k.value&&Ie("/error",{replace:!0}),d!=null&&d.value&&Oe(d),(h,I)=>{const O=we,Y=Le,F=Te,K=Be,A=Ce,v=Pe;return z(),oe(v,null,{default:ne(()=>{var H,P,M,B;return[y("div",Ve,[E(d)?(z(),x("main",We,[y("div",Ze,[y("h1",Ue,ae(E(d).title),1),q(O,{date:E(d).created,class:"text-lg"},null,8,["date"])]),q(Y,{class:"prose md:prose-lg max-w-full prose-headings:tracking-tight prose-p:font-medium prose-p:text-gray-600 prose-a:font-semibold prose-a:text-blue-600 prose-a:prose-headings:font-bold prose-a:prose-headings:text-gray-900 prose-a:prose-headings:no-underline prose-strong:font-bold prose-img:rounded-lg prose-img:border prose-img:shadow-sm"})])):X("",!0),y("aside",Xe,[y("section",Je,[Qe,(M=(P=(H=E(d))==null?void 0:H.body)==null?void 0:P.toc)!=null&&M.links?(z(),x("ul",et,[(z(!0),x(re,null,ie(E(d).body.toc.links,l=>(z(),x("li",tt,[q(F,{href:"#"+l.id},{default:ne(()=>[Ae(ae(l.text),1)]),_:2},1032,["href"])]))),256))])):X("",!0)]),q(K)])]),y("section",ot,[nt,y("div",at,[(B=E(C))!=null&&B.length?X("",!0):(z(),x("div",rt,"다른 글이 없습니다.")),y("ul",it,[(z(!0),x(re,null,ie(E(C),l=>(z(),oe(A,{key:l._id,path:l._path??"",title:l.title??"",description:l.description,created:l.created},null,8,["path","title","description","created"]))),128))])])])]}),_:1})}}});export{yt as default};
