import{a8 as y,a9 as C,aa as v,ab as w,x as c,ac as i,ad as d,ae as p,f as x,L as b,af as $,o as A,l as k,w as N,Y as S,ag as j,ah as B}from"./entry.5d05ec72.js";import{_ as D}from"./_plugin-vue_export-helper.c27b6911.js";var M=y(C);function O(s,t){const a={...s};for(const e of t)delete a[e];return a}function h(s,t,a){typeof t=="string"&&(t=t.split(".").map(n=>{const o=Number(n);return isNaN(o)?n:o}));let e=s;for(const n of t){if(e==null)return a;e=e[n]}return e!==void 0?e:a}const I=(s,t,a,e,n=!1)=>{const o=v(),u=w(),g=c(()=>{var f;const r=i(t),_=i(a),l=i(e);return d((r==null?void 0:r.strategy)||((f=u.ui)==null?void 0:f.strategy),l?{wrapper:l}:{},r||{},n?h(u.ui,s,{}):{},_||{})}),m=c(()=>O(o,["class"]));return{ui:g,attrs:m}},J={base:"mx-auto",padding:"px-4 sm:px-6 lg:px-8",constrained:"max-w-7xl"},K=d(p.ui.strategy,p.ui.container,J),L=x({inheritAttrs:!1,props:{as:{type:String,default:"div"},class:{type:[String,Object,Array],default:void 0},ui:{type:Object,default:void 0}},setup(s){const{ui:t,attrs:a}=I("container",b(s,"ui"),K),e=c(()=>M($(t.value.base,t.value.padding,t.value.constrained),s.class));return{ui:t,attrs:a,containerClass:e}}});function P(s,t,a,e,n,o){return A(),k(B(s.as),j({class:s.containerClass},s.attrs),{default:N(()=>[S(s.$slots,"default")]),_:3},16,["class"])}const U=D(L,[["render",P]]);export{U as _};
