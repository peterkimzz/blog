(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{316:function(t,e,n){"use strict";n.r(e);var l={props:{slug:{type:String,default:"/",required:!0},category:{type:String,default:null,validator:function(t){return-1!==["tech","design","life"].indexOf(t)}},title:{type:String,default:"Title",required:!0},description:{type:String,default:null},updated:{type:String,default:null}},computed:{GetCategoryColor:function(){switch(this.category){case"tech":return"bg-purple-800 text-purple-200";case"design":return"bg-pink-800 text-pink-200";case"life":return"bg-indigo-800 text-indigo-200"}}}},r=n(2),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("n-link",{staticClass:"group",attrs:{to:"/"+t.slug+"/"}},[n("span",{staticClass:"inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase",class:t.GetCategoryColor},[t._v("\n      "+t._s(t.category)+"\n    ")]),t._v(" "),n("h2",{staticClass:"text-base md:text-lg mt-2 font-semibold text-gray-100 group-hover:underline"},[t._v("\n      "+t._s(t.title)+"\n    ")]),t._v(" "),n("p",{staticClass:"text-sm md:text-base mt-3 md:mt-4 text-gray-400 leading-7 line-clamp-3"},[t._v("\n      "+t._s(t.description)+"\n    ")]),t._v(" "),n("div",{staticClass:"text-sm mt-2"},[t._v("\n      "+t._s(t.$dayjs(t.updated).format("YYYY년 MM월 DD일"))+"\n    ")])])],1)}),[],!1,null,null,null);e.default=component.exports}}]);