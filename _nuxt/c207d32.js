(window.webpackJsonp=window.webpackJsonp||[]).push([[20,9,15,17],{303:function(t,e,n){"use strict";n.r(e);var r=n(304),o=n.n(r);for(var l in r)["default"].indexOf(l)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(l);e.default=o.a},304:function(t,e){},305:function(t,e,n){"use strict";n.r(e);var r="peterkimzz",o={props:{title:{type:String,default:"기술과 예술을 담은 블로그"},titleTemplate:{type:String,default:r},titleTemplateVisible:{type:Boolean,default:!0},description:{type:String,default:""},thumbnail:{type:String,default:""}},head:function(){return{htmlAttrs:{lang:this.seoLang,dir:"ltr"},title:this.seoTitle,meta:[{hid:"description",name:"description",content:this.seoDescription},{hid:"keywords",name:"keywords",content:"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},{hid:"author",name:"author",content:r},{property:"og:type",content:"website"},{property:"og:url",content:this.seoURL},{property:"og:title",content:this.seoTitle},{property:"og:image",content:this.seoImage},{property:"og:description",content:this.seoDescription},{property:"og:site_name",content:r},{property:"og:locale",content:this.seoLang},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:"@peterkimzz"},{name:"twitter:creator",content:"@peterkimzz"},{name:"twitter:title",content:this.seoTitle},{name:"twitter:description",content:this.seoDescription},{name:"twitter:image",content:this.seoImage}],link:[{rel:"canonical",href:this.seoURL},{rel:"icon",href:this.seoFavicon},{rel:"shortcut icon",href:this.seoFavicon},{rel:"apple-touch-icon",href:this.seoFavicon}]}},computed:{seoTitle:function(){return this.titleTemplateVisible?"".concat(this.title," - ").concat(this.titleTemplate):this.title},seoDescription:function(){return this.description?this.$cheerio.load(this.description).text().substring(0,150):"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},seoURL:function(){return"https://www.peterkimzz.com"+this.$route.path},seoLang:function(){return"ko"},seoImage:function(){return this.thumbnail||"https://www.peterkimzz.com/thumbnail.png"},seoFavicon:function(){return"https://www.peterkimzz.com/favicon.png"}}},l=n(2),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;t._self._c;return t._e()}),[],!1,null,null,null);e.default=component.exports},306:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}));var r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("script",{attrs:{type:"application/javascript",src:"https://utteranc.es/client.js",repo:"peterkimzz/blog","issue-term":"title",theme:"github-dark",crossorigin:"anonymous",async:""}})])}]},307:function(t,e,n){var content=n(316);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(51).default)("664d7810",content,!0,{sourceMap:!1})},308:function(t,e,n){"use strict";n.r(e);var r=n(306),o=n(303);for(var l in o)["default"].indexOf(l)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(l);var c=n(2),component=Object(c.a)(o.default,r.a,r.b,!1,null,null,null);e.default=component.exports},314:function(t,e,n){"use strict";n.r(e);var r={props:{prev:{type:Object,default:function(){return null}},next:{type:Object,default:function(){return null}}}},o=n(2),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex justify-between text-xs md:text-sm font-medium"},[t.prev?n("div",{staticClass:"flex-1 mr-0.5"},[t._m(0),t._v(" "),n("n-link",{staticClass:"hover:underline",attrs:{to:"/"+t.prev.slug}},[t._v("\n      "+t._s(t.prev.title)+"\n    ")])],1):t._e(),t._v(" "),t.next?n("div",{staticClass:"flex-1 ml-0.5 text-right"},[t._m(1),t._v(" "),n("n-link",{staticClass:"hover:underline",attrs:{to:"/"+t.next.slug}},[t._v("\n      "+t._s(t.next.title)+"\n    ")])],1):t._e()])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"font-semibold text-gray-500 mb-0.5"},[n("span",{staticClass:"align-middle"},[t._v("이전 글")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"font-semibold text-gray-500 mb-0.5"},[n("span",{staticClass:"align-middle"},[t._v("다음 글")])])}],!1,null,null,null);e.default=component.exports},315:function(t,e,n){"use strict";n(307)},316:function(t,e,n){var r=n(50)((function(i){return i[1]}));r.push([t.i,".nuxt-content img{margin-left:auto;margin-right:auto}.nuxt-content img+em{display:block;--tw-text-opacity:1;color:rgba(163, 163, 163, var(--tw-text-opacity));font-size:0.875rem;line-height:1.5rem;text-align:center;margin-top:-1rem}.nuxt-content-highlight{position:relative}.nuxt-content-highlight .filename{position:absolute;right:0px;z-index:10;font-weight:300;--tw-text-opacity:1;color:rgba(163, 163, 163, var(--tw-text-opacity));font-size:0.75rem;line-height:1rem}@media (min-width: 768px){.nuxt-content-highlight .filename{font-size:0.875rem;line-height:1.5rem}}.nuxt-content-highlight .filename{margin-right:0.625rem;margin-top:0.25rem;pointer-events:none}",""]),t.exports=r},337:function(t,e,n){"use strict";n.r(e);var r=n(13),o=n(3),l=(n(30),{layout:"article",asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,article,l,c,m,f;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,o=t.params,e.next=3,n("articles",o.slug).fetch();case 3:return article=e.sent,e.next=6,n("articles").sortBy("created","asc").where({published:!0}).surround(o.slug).fetch();case 6:return l=e.sent,c=Object(r.a)(l,2),m=c[0],f=c[1],e.abrupt("return",{article:article,prev:m,next:f});case 11:case"end":return e.stop()}}),e)})))()},computed:{PageURL:function(){return"https://www.peterkimzz.com/"+this.article.slug+"/"}}}),c=(n(315),n(2)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"pb-10"},[n("vue-s-e-o",{attrs:{title:t.article.title,description:t.article.description,thumbnail:t.article.thumbnail}}),t._v(" "),n("article",{staticClass:"relative"},[n("header",{staticClass:"mt-10 mb-10"},[n("div",{staticClass:"flex flex-col items-center"},[n("span",{staticClass:"text-cyan-500 font-semibold tracking-wider uppercase"},[t._v(t._s(t.article.category))]),t._v(" "),n("h1",{staticClass:"mt-2 text-center text-2xl md:text-3xl font-extrabold tracking-tight text-gray-100"},[t._v("\n          "+t._s(t.article.title)+"\n        ")])]),t._v(" "),n("p",{staticClass:"mt-6 text-center text-sm md:text-sm text-gray-500 font-semibold"},[t._v("\n        "+t._s(t.$dayjs(t.article.updated).format("YYYY년 MM월 DD일"))+"\n      ")]),t._v(" "),n("vue-share",{attrs:{title:t.article.title,description:t.article.description,url:t.PageURL}})],1),t._v(" "),n("nuxt-content",{staticClass:"w-full max-w-full prose prose-sm md:prose-lg prose-cyan md:prose-cyan",attrs:{document:t.article}}),t._v(" "),n("vue-divider",{staticClass:"my-10"}),t._v(" "),n("vue-prev-next",{staticClass:"mb-14",attrs:{prev:t.prev,next:t.next}}),t._v(" "),n("vue-divider",{staticClass:"my-10"}),t._v(" "),n("vue-comment")],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{VueSEO:n(305).default,VueShare:n(333).default,VueDivider:n(195).default,VuePrevNext:n(314).default,VueComment:n(308).default})}}]);