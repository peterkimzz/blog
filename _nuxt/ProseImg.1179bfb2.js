import{f as r,s as n,v as c,x as o,y as h,z as l,o as u,c as d,k as f}from"./entry.5ab68868.js";const m=["src","alt","width","height"],p=r({__name:"ProseImg",props:{src:{type:String,default:""},alt:{type:String,default:""},width:{type:[String,Number],default:void 0},height:{type:[String,Number],default:void 0}},setup(e){const t=e,i=n(()=>{var a;if((a=t.src)!=null&&a.startsWith("/")&&!t.src.startsWith("//")){const s=c(o(h().app.baseURL));if(s!=="/"&&!t.src.startsWith(s))return l(s,t.src)}return t.src});return(a,s)=>(u(),d("img",{"data-zoomable":"",src:f(i),alt:e.alt,width:e.width,height:e.height,class:"mx-auto"},null,8,m))}});export{p as default};