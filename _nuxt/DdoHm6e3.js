import{_ as m}from"./CAEiLrbi.js";import{f as h,j as f,h as y,i as x,o as s,c as o,a as r,t as i,l as c,F as g,r as w,b,w as k,d as C}from"./BMa2X6rq.js";import{u as N,q as B}from"./DEXUlX7U.js";import"./BnRcOun6.js";const $={class:"border bg-gray-100/60 p-4 rounded-lg mb-8"},q={class:"!text-gray-900 !font-semibold !m-0"},v={class:"!m-0"},L=h({__name:"Serieis",props:{type:{}},async setup(_){let t,a;const p=_,n=f(()=>{switch(p.type){case"in-n-minutes":return{title:"다른 N분만에 시리즈",conditions:"분만에"};case"forever":default:return{title:"다른 평생 무료 시리즈",conditions:"평생"}}}),d=y(),{data:l}=([t,a]=x(()=>N(()=>B().where({$and:[{title:{$contains:[n.value.conditions]}},{_path:{$ne:d.path}}]}).only(["title","_path"]).find(),"$ABpc7jqkEC")),t=await t,a(),t);return(A,V)=>{const u=m;return s(),o("div",$,[r("p",q,i(c(n).title),1),r("ul",v,[(s(!0),o(g,null,w(c(l),e=>(s(),o("li",{key:"series-"+e._path},[b(u,{to:e._path},{default:k(()=>[C(i(e.title),1)]),_:2},1032,["to"])]))),128))])])}}});export{L as default};
