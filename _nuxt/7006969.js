(window.webpackJsonp=window.webpackJsonp||[]).push([[17,3,13],{296:function(t,e,n){"use strict";n.r(e);var r="peterkimzz",o={props:{title:{type:String,default:"기술과 예술을 담은 블로그"},titleTemplate:{type:String,default:r},titleTemplateVisible:{type:Boolean,default:!0},description:{type:String,default:""},thumbnail:{type:String,default:""}},head:function(){return{htmlAttrs:{lang:this.seoLang,dir:"ltr"},title:this.seoTitle,meta:[{hid:"description",name:"description",content:this.seoDescription},{hid:"keywords",name:"keywords",content:"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},{hid:"author",name:"author",content:r},{property:"og:type",content:"website"},{property:"og:url",content:this.seoURL},{property:"og:title",content:this.seoTitle},{property:"og:image",content:this.seoImage},{property:"og:description",content:this.seoDescription},{property:"og:site_name",content:r},{property:"og:locale",content:this.seoLang},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:"@peterkimzz"},{name:"twitter:creator",content:"@peterkimzz"},{name:"twitter:title",content:this.seoTitle},{name:"twitter:description",content:this.seoDescription},{name:"twitter:image",content:this.seoImage}],link:[{rel:"canonical",href:this.seoURL},{rel:"icon",href:this.seoFavicon},{rel:"shortcut icon",href:this.seoFavicon},{rel:"apple-touch-icon",href:this.seoFavicon}]}},computed:{seoTitle:function(){return this.titleTemplateVisible?"".concat(this.title," - ").concat(this.titleTemplate):this.title},seoDescription:function(){return this.description?this.$cheerio.load(this.description).text().substring(0,150):"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},seoURL:function(){return"https://www.peterkimzz.com"+this.$route.path},seoLang:function(){return"ko"},seoImage:function(){return this.thumbnail||"https://user-images.githubusercontent.com/20244536/132115770-59711547-4cb3-4a3a-abfe-12740b985441.png"},seoFavicon:function(){return"https://user-images.githubusercontent.com/20244536/132115763-2a9011f1-0336-4cb6-9a57-5e44def5c131.png"}}},c=n(2),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement;t._self._c;return t._e()}),[],!1,null,null,null);e.default=component.exports},304:function(t,e,n){"use strict";n.r(e);var r={props:{slug:{type:String,default:"/",required:!0},category:{type:String,default:null},title:{type:String,default:"Title",required:!0},description:{type:String,default:null},updated:{type:String,default:null},published:{type:Boolean,default:!1}},computed:{GetCategoryColor:function(){switch(this.category){case"tech":return"bg-purple-800 text-purple-200";case"design":return"bg-pink-800 text-pink-200";case"life":return"bg-blue-800 text-blue-200";case"review":return"bg-cyan-800 text-cyan-200";default:return"bg-gray-700 text-gray-200"}}}},o=n(2),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",[n("n-link",{staticClass:"group",attrs:{to:"/"+t.slug+"/"}},[n("span",{staticClass:"\n        inline-flex\n        items-center\n        px-3\n        py-1\n        rounded-full\n        text-xs\n        font-semibold\n        uppercase\n      ",class:t.GetCategoryColor},[t._v("\n      "+t._s(t.category)+"\n    ")]),t._v(" "),n("h2",{staticClass:"\n        text-base\n        md:text-lg\n        mt-2\n        font-semibold\n        text-gray-100\n        group-hover:underline\n      "},[t._v("\n      "+t._s(t.title)+"\n    ")]),t._v(" "),n("p",{staticClass:"\n        text-sm\n        md:text-base\n        mt-3\n        md:mt-4\n        text-gray-400\n        leading-7\n        line-clamp-3\n      "},[t._v("\n      "+t._s(t.description)+"\n    ")]),t._v(" "),n("div",{staticClass:"text-sm mt-2"},[n("span",[t._v("\n        "+t._s(t.$dayjs(t.updated).format("YYYY년 MM월 DD일"))+"\n      ")]),t._v(" "),t.published?t._e():n("svg",{staticClass:"h-4 w-4 text-gray-500 inline-block align-middle",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z","clip-rule":"evenodd"}})])])])],1)}),[],!1,null,null,null);e.default=component.exports},329:function(t,e,n){"use strict";n.r(e);var r=n(3),o=(n(30),n(123),{data:function(){return{q:"",articles:[]}},asyncData:function(t){return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,q,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.query,q=r.q||"",e.next=4,n("articles").sortBy("created","desc").where({published:!0}).search(q).fetch();case 4:return o=e.sent,e.abrupt("return",{articles:o,q:q});case 6:case"end":return e.stop()}}),e)})))()},computed:{IsMac:function(){return window.navigator.platform.indexOf("Mac")>-1}},watch:{"$route.query.q":function(q){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$content("articles").sortBy("created","desc").where({published:!0}).search(q).fetch();case 2:t.articles=e.sent;case 3:case"end":return e.stop()}}),e)})))()}},methods:{Search:function(q){this.$router.push({query:{q:q}})}},mounted:function(){window.addEventListener("keydown",(function(t){(t.ctrlKey&&"k"===t.key||t.metaKey&&"k"===t.key)&&(t.preventDefault(),document.getElementById("search-input").focus())}))},destroyed:function(){window.removeEventListener("keydown",(function(){}))}}),c=n(2),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("vue-s-e-o"),t._v(" "),n("vue-container",[n("div",{staticClass:"py-10"},[t.articles.length?n("ul",{staticClass:"flex flex-wrap sm:-mx-4"},t._l(t.articles,(function(article){return n("VueArticlePreview",{key:article.slug,staticClass:"w-full sm:w-1/2 sm:px-4 pb-14 md:pb-20 md:w-1/3",attrs:{published:article.published,slug:article.slug,category:article.category,title:article.title,description:article.description,thumbnail:article.thumbnail,updated:article.created}})})),1):n("div",{staticClass:"text-center md:max-w-md md:mx-auto"},[n("p",{staticClass:"mt-6 font-semibold text-gray-300"},[t._v("검색 결과가 없습니다.")])])])])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{VueSEO:n(296).default,VueArticlePreview:n(304).default,VueContainer:n(124).default})}}]);