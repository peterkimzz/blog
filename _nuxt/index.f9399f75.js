import{_ as x}from"./Date.vue.34126e5c.js";import w from"./ContentDoc.749e8aa4.js";import{f as d,u as y,o as s,c as n,a as e,g as v,h as b,r as k,b as o,w as C,i as a,t as z,j as D,d as M,n as A}from"./entry.30958e0c.js";import{_ as B}from"./index.f7999178.js";import{_ as $}from"./index.9d2c9b58.js";import{u as N,q as E}from"./query.1667bac6.js";import"./ContentRenderer.aaeb2196.js";import"./ContentRendererMarkdown.16ae3e36.js";import"./index.a6ef77ff.js";import"./preview.b51571fb.js";import"./ContentQuery.709b24f2.js";import"./nuxt-link.9746348b.js";import"./_plugin-vue_export-helper.c27b6911.js";import"./utils.2f44f28b.js";const H={class:"giscus"},V=d({__name:"Comment",setup(c){return y({script:[{src:"https://giscus.app/client.js","data-repo":"peterkimzz/blog","data-repo-id":"MDEwOlJlcG9zaXRvcnkzMjAyNTkyMTY=","data-category":"Blog Comments","data-category-id":"DIC_kwDOExbEkM4B-8Mf","data-mapping":"title","data-strict":"0","data-reactions-enabled":"1","data-emit-metadata":"0","data-input-position":"top","data-theme":"preferred_color_scheme","data-lang":"ko","data-loading":"lazy",crossorigin:"anonymous",async:!0}]}),(t,r)=>(s(),n("div",H))}});function j(c,t){return s(),n("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},[e("path",{"fill-rule":"evenodd",d:"M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z","clip-rule":"evenodd"})])}const I={class:"lg:h-[calc(100dvh-53px)] lg:overflow-hidden break-keep"},O={key:0,class:"max-w-prose w-full mx-auto lg:flex-[1_0_0%] overflow-y-scroll py-10"},T={class:"pb-10 text-center"},q={class:"text-3xl max-w-md mx-auto font-bold leading-tight tracking-[-0.01em] text-black pb-3"},F={class:"max-w-prose w-full mx-auto lg:flex-1 lg:overflow-y-scroll py-10"},P=e("h4",{class:"font-medium pb-2 text-sm"},"부가 기능",-1),R=e("hr",{class:"my-10"},null,-1),S={class:"pt-5"},re=d({__name:"index",async setup(c){let t,r;const{path:p}=v(),{data:l}=([t,r]=b(()=>N(()=>E().where({_path:p}).findOne(),"$sSIp1FXI6A")),t=await t,r(),t),i=k(!1);function _(){i.value=!i.value}return(X,G)=>{const m=x,u=w,g=V,f=B,h=$;return s(),n("div",I,[o(h,{class:"h-full"},{default:C(()=>[e("div",{class:A(["flex gap-10 flex-col transition-all h-full",a(i)?"lg:flex-row-reverse":"lg:flex-row"])},[a(l)?(s(),n("section",O,[e("div",T,[e("h1",q,z(a(l).title),1),o(m,{date:a(l).created,class:"text-lg"},null,8,["date"])]),o(u,{class:"prose md:prose-lg max-w-full prose-headings:tracking-tight prose-p:font-medium prose-p:text-gray-600 prose-a:font-semibold prose-a:text-blue-600 prose-a:prose-headings:font-bold prose-a:prose-headings:text-gray-900 prose-a:prose-headings:no-underline prose-strong:font-bold prose-img:rounded-lg prose-img:border prose-img:shadow-sm"})])):D("",!0),e("section",F,[e("div",null,[P,e("div",null,[e("button",{class:"py-1 px-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition border inline-flex items-center gap-1.5",onClick:_},[o(a(j),{class:"w-4 h-4"}),M(" 좌우 반전 ")])])]),R,e("div",null,[o(g)]),e("div",S,[o(f)])])],2)]),_:1})])}}});export{re as default};
