(window.webpackJsonp=window.webpackJsonp||[]).push([[20,8,14,16,18],{298:function(t,e,n){"use strict";n.r(e);var r="peterkimzz",o={props:{title:{type:String,default:"기술과 예술을 담은 블로그"},titleTemplate:{type:String,default:r},titleTemplateVisible:{type:Boolean,default:!0},description:{type:String,default:""},thumbnail:{type:String,default:""}},head:function(){return{htmlAttrs:{lang:this.seoLang,dir:"ltr"},title:this.seoTitle,meta:[{hid:"description",name:"description",content:this.seoDescription},{hid:"keywords",name:"keywords",content:"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},{hid:"author",name:"author",content:r},{property:"og:type",content:"website"},{property:"og:url",content:this.seoURL},{property:"og:title",content:this.seoTitle},{property:"og:image",content:this.seoImage},{property:"og:description",content:this.seoDescription},{property:"og:site_name",content:r},{property:"og:locale",content:this.seoLang},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:"@peterkimzz"},{name:"twitter:creator",content:"@peterkimzz"},{name:"twitter:title",content:this.seoTitle},{name:"twitter:description",content:this.seoDescription},{name:"twitter:image",content:this.seoImage}],link:[{rel:"canonical",href:this.seoURL},{rel:"icon",href:this.seoFavicon},{rel:"shortcut icon",href:this.seoFavicon},{rel:"apple-touch-icon",href:this.seoFavicon}]}},computed:{seoTitle:function(){return this.titleTemplateVisible?"".concat(this.title," - ").concat(this.titleTemplate):this.title},seoDescription:function(){return this.description?this.$cheerio.load(this.description).text().substring(0,150):"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},seoURL:function(){return"https://www.peterkimzz.com"+this.$route.path},seoLang:function(){return"ko"},seoImage:function(){return this.thumbnail||"https://www.peterkimzz.com/thumbnail.png"},seoFavicon:function(){return"https://www.peterkimzz.com/favicon.png"}}},l=n(2),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement;t._self._c;return t._e()}),[],!1,null,null,null);e.default=component.exports},301:function(t,e,n){var content=n(311);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(47).default)("664d7810",content,!0,{sourceMap:!1})},307:function(t,e,n){"use strict";n.r(e);var r={props:{prev:{type:Object,default:function(){return null}},next:{type:Object,default:function(){return null}}}},o=n(2),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex justify-between text-xs md:text-sm font-medium"},[t.prev?n("div",{staticClass:"flex-1 mr-0.5"},[t._m(0),t._v(" "),n("vue-link",{staticClass:"link",attrs:{as:"a",href:"/"+t.prev.slug}},[t._v("\n      "+t._s(t.prev.title)+"\n    ")])],1):t._e(),t._v(" "),t.next?n("div",{staticClass:"flex-1 ml-0.5 text-right"},[t._m(1),t._v(" "),n("vue-link",{staticClass:"link",staticStyle:{"word-break":"keep-all"},attrs:{as:"a",href:"/"+t.next.slug}},[t._v("\n      "+t._s(t.next.title)+"\n    ")])],1):t._e()])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"font-semibold text-gray-500 mb-0.5"},[n("span",{staticClass:"align-middle"},[t._v("이전 글")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"font-semibold text-gray-500 mb-0.5"},[n("span",{staticClass:"align-middle"},[t._v("다음 글")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{VueLink:n(82).default})},308:function(t,e,n){"use strict";n.r(e);var r={methods:{InsertScript:function(){var script=document.createElement("script");script.type="application/javascript",script.src="https://utteranc.es/client.js",script.crossOrigin="anonymous",script.async=!0,this.$el.appendChild(script)}}},o=n(2),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("script",{attrs:{type:"application/javascript",src:"https://utteranc.es/client.js",repo:"peterkimzz/blog","issue-term":"title",label:"Comment",theme:"github-dark",crossorigin:"anonymous",async:""}})])}],!1,null,null,null);e.default=component.exports},309:function(t,e,n){"use strict";n.r(e);var r=n(2),component=Object(r.a)({},(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-xs md:text-sm shadow-sm text-gray-400 font-medium bg-gray-900 rounded-lg p-4"},[n("div",{staticClass:"flex"},[n("div",{staticClass:"mr-2"},[t._v("☕")]),t._v(" "),n("div",[n("p",[t._v("\n        제 포스팅이 도움이 되셨다면, 아래 버튼을 눌러\n        "),n("b",{staticClass:"text-gray-100"},[t._v("커피 한 잔")]),t._v("을 후원해주세요! 더 좋은 글을\n        발행하는데 큰 도움이 됩니다.\n      ")]),t._v(" "),n("a",{staticClass:"inline-block mt-4 bg-gray-300 shadow-sm overflow-hidden rounded-lg",attrs:{href:"https://ko-fi.com/U7U22YFKV",target:"_blank"}},[n("img",{staticClass:"w-36",attrs:{src:"/ko-fi.png",alt:"Buy Me a Coffee at ko-fi.com"}})])])])])}],!1,null,null,null);e.default=component.exports},310:function(t,e,n){"use strict";n(301)},311:function(t,e,n){var r=n(46)((function(i){return i[1]}));r.push([t.i,".nuxt-content img{margin-left:auto;margin-right:auto}.nuxt-content img+em{margin-top:-1rem;display:block;text-align:center;font-size:0.875rem;line-height:1.5rem;--tw-text-opacity:1;color:rgba(163, 163, 163, var(--tw-text-opacity))}.nuxt-content-highlight .filename{pointer-events:none;position:absolute;right:0px;z-index:10;margin-right:0.625rem;margin-top:0.25rem;font-size:0.75rem;line-height:1rem;font-weight:300;--tw-text-opacity:1;color:rgba(163, 163, 163, var(--tw-text-opacity))}@media (min-width: 768px){.nuxt-content-highlight .filename{font-size:0.875rem;line-height:1.5rem}}",""]),t.exports=r},330:function(t,e,n){"use strict";n.r(e);var r=n(11),o=n(3),l=(n(36),{layout:"article",asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,article,l,c,m,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,o=t.params,e.next=3,n("articles",o.slug).fetch();case 3:return article=e.sent,e.next=6,n("articles").only(["title","slug"]).sortBy("createdAt","asc").surround(o.slug).fetch();case 6:return l=e.sent,c=Object(r.a)(l,2),m=c[0],d=c[1],e.abrupt("return",{article:article,prev:m,next:d});case 11:case"end":return e.stop()}}),e)})))()}}),c=(n(310),n(2)),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("main",{staticClass:"pb-10"},[n("vue-s-e-o",{attrs:{title:t.article.title,description:t.article.description,thumbnail:t.article.thumbnail}}),t._v(" "),n("article",[n("header",{staticClass:"mt-10"},[n("h1",{staticClass:"flex flex-col items-center"},[n("span",{staticClass:"text-cyan-500 font-semibold tracking-wider uppercase"},[t._v(t._s(t.article.category))]),t._v(" "),n("span",{staticClass:"mt-2 text-center text-3xl md:text-3xl font-extrabold tracking-tight text-gray-100"},[t._v(t._s(t.article.title))])]),t._v(" "),n("p",{staticClass:"mt-6 text-center text-sm text-gray-500 font-semibold"},[t._v("\n        "+t._s(t.$dayjs(t.article.updated).format("YYYY년 MM월 DD일"))+"\n      ")]),t._v(" "),n("hr",{staticClass:"my-8 border-t-2 border-gray-700 w-20 mx-auto"})]),t._v(" "),n("nuxt-content",{staticClass:"md:hidden prose prose-sm prose-cyan",attrs:{document:t.article}}),t._v(" "),n("nuxt-content",{staticClass:"hidden md:block prose prose-cyan",attrs:{document:t.article}}),t._v(" "),n("vue-divider",{staticClass:"my-10"}),t._v(" "),n("vue-prev-next",{staticClass:"mb-14",attrs:{prev:t.prev,next:t.next}}),t._v(" "),n("vue-divider",{staticClass:"my-10"}),t._v(" "),n("client-only",[n("vue-comment")],1),t._v(" "),n("vue-divider",{staticClass:"my-10"}),t._v(" "),n("vue-sponsor-button")],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{VueSEO:n(298).default,VueDivider:n(194).default,VuePrevNext:n(307).default,VueComment:n(308).default,VueSponsorButton:n(309).default})}}]);