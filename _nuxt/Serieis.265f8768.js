import{_ as m}from"./nuxt-link.b0e7175a.js";import{u as f,q as h}from"./query.b1c414c4.js";import{f as y,x,j as g,k,o as s,c as o,a as r,t as i,m as c,F as w,r as b,b as C,w as N,d as B}from"./entry.5d05ec72.js";import"./preview.f8323216.js";const $={class:"border bg-gray-100/60 p-4 rounded-lg mb-8"},q={class:"!text-gray-900 !font-semibold !m-0"},v={class:"!m-0"},L=y({__name:"Serieis",props:{type:{}},async setup(_){let t,a;const p=_,n=x(()=>{switch(p.type){case"in-n-minutes":return{title:"다른 N분만에 시리즈",conditions:"분만에"};case"forever":default:return{title:"다른 평생 무료 시리즈",conditions:"평생"}}}),d=g(),{data:u}=([t,a]=k(()=>f(()=>h().where({$and:[{title:{$contains:[n.value.conditions]}},{_path:{$ne:d.path}}]}).only(["title","_path"]).find(),"$ABpc7jqkEC")),t=await t,a(),t);return(A,V)=>{const l=m;return s(),o("div",$,[r("p",q,i(c(n).title),1),r("ul",v,[(s(!0),o(w,null,b(c(u),e=>(s(),o("li",{key:"series-"+e._path},[C(l,{to:e._path},{default:N(()=>[B(i(e.title),1)]),_:2},1032,["to"])]))),128))])])}}});export{L as default};
