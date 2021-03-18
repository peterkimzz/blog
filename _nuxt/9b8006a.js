(window.webpackJsonp=window.webpackJsonp||[]).push([[22,10,15,16],{300:function(t,e,l){"use strict";l.r(e);var n="peterkimzz",r={props:{title:{type:String,default:"기술과 예술을 담은 블로그"},titleTemplate:{type:String,default:n},titleTemplateVisible:{type:Boolean,default:!0},description:{type:String,default:""},thumbnail:{type:String,default:""}},head:function(){return{htmlAttrs:{lang:this.seoLang,dir:"ltr"},title:this.seoTitle,meta:[{hid:"description",name:"description",content:this.seoDescription},{hid:"keywords",name:"keywords",content:"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},{hid:"author",name:"author",content:n},{property:"og:type",content:"website"},{property:"og:url",content:this.seoURL},{property:"og:title",content:this.seoTitle},{property:"og:image",content:this.seoImage},{property:"og:description",content:this.seoDescription},{property:"og:site_name",content:n},{property:"og:locale",content:this.seoLang},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:"@peterkimzz"},{name:"twitter:creator",content:"@peterkimzz"},{name:"twitter:title",content:this.seoTitle},{name:"twitter:description",content:this.seoDescription},{name:"twitter:image",content:this.seoImage}],link:[{rel:"canonical",href:this.seoURL},{rel:"icon",href:this.seoFavicon},{rel:"shortcut icon",href:this.seoFavicon},{rel:"apple-touch-icon",href:this.seoFavicon}]}},computed:{seoTitle:function(){return this.titleTemplateVisible?"".concat(this.title," - ").concat(this.titleTemplate):this.title},seoDescription:function(){return this.description?this.$cheerio.load(this.description).text().substring(0,150):"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},seoURL:function(){return"https://www.peterkimzz.com"+this.$route.path},seoLang:function(){return"ko"},seoImage:function(){return this.thumbnail||"https://www.peterkimzz.com/thumbnail.png"},seoFavicon:function(){return"https://www.peterkimzz.com/favicon.png"}}},o=l(2),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement;t._self._c;return t._e()}),[],!1,null,null,null);e.default=component.exports},306:function(t,e,l){"use strict";l.r(e);var n={props:["subLabel","label"]},r=l(2),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("dl",{staticClass:"flex items-end"},[l("dt",{staticClass:"flex flex-col uppercase font-semibold w-28"},[l("span",{staticClass:"text-xs text-gray-500"},[t._v(t._s(t.subLabel))]),t._v(" "),l("span",{staticClass:"text-gray-300"},[t._v(t._s(t.label))])]),t._v(" "),l("dd",{staticClass:"flex-1"},[t._t("default")],2)])}),[],!1,null,null,null);e.default=component.exports},307:function(t,e,l){"use strict";l.r(e);var n={props:["src","label"]},r=l(2),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[t.src?l("img",{staticClass:"inline-block mb-3 w-16 h-16 rounded-3xl bg-gray-700 p-1.5 shadow-sm",attrs:{src:t.src}}):t._e(),t._v(" "),t.label?l("div",{staticClass:"text-sm text-gray-500"},[t._v(t._s(t.label))]):t._e(),t._v(" "),l("div",{staticClass:"font-semibold mb-3"},[t._t("title")],2),t._v(" "),l("div",{staticClass:"leading-7"},[t._t("default")],2)])}),[],!1,null,null,null);e.default=component.exports},328:function(t,e,l){"use strict";l.r(e);var n={layout:"article"},r=l(2),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"pb-20"},[l("vue-s-e-o",{attrs:{title:"이력서","title-template-visible":!1}}),t._v(" "),t._m(0),t._v(" "),l("main",{staticClass:"mt-16 space-y-28"},[l("section",[t._m(1),t._v(" "),l("div",{staticClass:"md:flex"},[l("img",{staticClass:"w-24 h-24 rounded-3xl shadow-sm",attrs:{src:"/profile.jpg"}}),t._v(" "),l("div",{staticClass:"space-y-6 mt-6 md:mt-0 md:ml-10"},[l("vue-definition",{attrs:{"sub-label":"Name",label:"이름"}},[t._v("김동현")]),t._v(" "),l("vue-definition",{attrs:{"sub-label":"Birthday",label:"생년월일"}},[t._v("1993년 2월 25일")]),t._v(" "),l("vue-definition",{attrs:{"sub-label":"Phone",label:"연락처"}},[l("a",{staticClass:"hover:underline",attrs:{target:"_blank",href:"tel:+82-10-4273-5480"}},[t._v("+82-10-4273-5480")])]),t._v(" "),l("vue-definition",{attrs:{"sub-label":"Email",label:"이메일"}},[l("a",{staticClass:"hover:underline break-all",attrs:{target:"_blank",href:"mailto:peterkimzz69@gmail.com"}},[t._v("peterkimzz69@gmail.com")])]),t._v(" "),l("vue-definition",{staticClass:"block",attrs:{"sub-label":"Intro",label:"소개"}},[l("p",{staticClass:"mt-4 leading-7"},[t._v("\n              안녕하세요, 소프트웨어 개발자 김동현입니다."),l("br"),l("br"),t._v("\n\n              저는 플랫폼 개발에 자신있습니다. 또한 저의 최대 강점은 개발\n              속도가 빠르다는 것입니다. 지금까지 소규모 인원의 스타트업에서\n              오랫동안 개발자로 일을 해왔기 때문에, 누구보다 빠르게 MVP를\n              만들어내는 법을 잘 알고 있습니다."),l("br"),l("br"),t._v("\n\n              보통 개발이 빠르면 유지보수하기 어려운 코드를 작성할거라고\n              생각십니다. 하지만 제가 개발이 빠른 이유는 Vue.js와 Node.js\n              프레임워크를 오랫동안 사용했기 때문입니다. 결코 유지보수가\n              어려운 코드는 작성하지 않습니다. "),l("br"),l("br"),t._v("\n\n              또한 스스로 웹 디자인에 대한 감각이 있다고 생각해서 프론트엔드\n              개발을 좋아합니다. 웹의 장점인 프론트엔드에 대한 소스코드가\n              개방되어 있다는 점을 이용해 다른 웹사이트의 디자인을 참고하여\n              해당 서비스에게 맞는 새로운 디자인을 잘 창조해냅니다.\n            ")])])],1)])]),t._v(" "),l("section",[t._m(2),t._v(" "),l("div",{staticClass:"space-y-10"},[l("vue-definition",{staticClass:"items-start",attrs:{"sub-label":"Front-end",label:"프론트엔드"}},[l("ul",{staticClass:"list-disc pl-12 space-y-2"},[l("li",[t._v("Vue.js (Nuxt.js)")]),t._v(" "),l("li",[t._v("Chrome Extension")])])]),t._v(" "),l("vue-definition",{staticClass:"items-start",attrs:{"sub-label":"Back-end",label:"백엔드"}},[l("ul",{staticClass:"list-disc pl-12 space-y-2"},[l("li",[t._v("Node.js")]),t._v(" "),l("li",[t._v("NginX")])])]),t._v(" "),l("vue-definition",{staticClass:"items-start",attrs:{"sub-label":"Database",label:"데이터베이스"}},[l("ul",{staticClass:"list-disc pl-12 space-y-2"},[l("li",[t._v("MySQL")]),t._v(" "),l("li",[t._v("Elasticsearch")])])]),t._v(" "),l("vue-definition",{staticClass:"items-start",attrs:{"sub-label":"Cloud platform",label:"클라우드"}},[l("ul",{staticClass:"list-disc pl-12 space-y-2"},[l("li",[t._v("AWS")]),t._v(" "),l("li",[t._v("GCP, Firebase")])])])],1)]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),l("section",[t._m(5),t._v(" "),l("div",[l("vue-resume-item",{attrs:{src:"/imgs/gachon.png",label:"2012년 03월 - 2018년 03월"}},[l("div",{staticClass:"flex items-center",attrs:{slot:"title"},slot:"title"},[l("span",[t._v("\n              가천대학교 전자공학과\n            ")]),t._v(" "),l("svg",{staticClass:"w-4 h-4 ml-1.5 text-cyan-400",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"}},[l("path",{attrs:{"fill-rule":"evenodd",d:"M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"}})])]),t._v(" "),l("p",[t._v('\n            미국 엑셀러레이터 Y Combinator의 Startup School 1기 10주 과정을\n            성공적으로 수료했습니다. 이 때 지원했던 프로젝트는 "Hoopee" 모바일\n            앱이었습니다. '),l("br"),l("br"),t._v("\n\n            지금은 스타트업 스쿨이 상시 공개되어있는 YC의 무료 강의\n            프로그램으로 바뀌었지만, 제가 지원했을 때는 기존 YC 메인 배치의\n            온라인 버전이었습니다.\n          ")])])],1)]),t._v(" "),l("section",[t._m(6),t._v(" "),l("div",[l("vue-resume-item",{attrs:{src:"/imgs/startup_school_logo.png",label:"2017년 4월 - 6월"}},[l("div",{staticClass:"flex items-center",attrs:{slot:"title"},slot:"title"},[l("span",[t._v("\n              Y Combinator Startup School\n            ")]),t._v(" "),l("svg",{staticClass:"w-4 h-4 ml-1.5 text-cyan-400",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"}},[l("path",{attrs:{"fill-rule":"evenodd",d:"M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z","clip-rule":"evenodd"}})])]),t._v(" "),l("p",[t._v('\n            미국 엑셀러레이터 Y Combinator의 Startup School 1기 10주 과정을\n            성공적으로 수료했습니다. 이 때 지원했던 프로젝트는 "Hoopee" 모바일\n            앱이었습니다. '),l("br"),l("br"),t._v("\n\n            지금은 스타트업 스쿨이 상시 공개되어있는 YC의 무료 강의\n            프로그램으로 바뀌었지만, 제가 지원했을 때는 기존 YC 메인 배치의\n            온라인 버전이었습니다.\n          ")])])],1)]),t._v(" "),l("section",[t._m(7),t._v(" "),l("div",[l("vue-definition",{attrs:{"sub-label":"English",label:"영어"}},[t._v("기초 회화")])],1)])])],1)}),[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("header",[l("p",{staticClass:"text-gray-500 font-medium uppercase"},[t._v("Résumé")]),t._v(" "),l("h1",{staticClass:"text-3xl font-bold bg-gradient-to-b bg-clip-text text-transparent from-white to-gray-300"},[t._v("\n      개발자 김동현 이력서\n    ")]),t._v(" "),l("p",{staticClass:"text-gray-600 text-xs mt-4"},[t._v("\n      2021년 3월 16일에 마지막으로 업데이트 됨.\n    ")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"mb-10"},[l("h3",{staticClass:"text-sm font-medium text-gray-500 uppercase"},[t._v("Profile")]),t._v(" "),l("h2",{staticClass:"text-2xl text-gray-200 font-semibold"},[t._v("프로필")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"mb-10"},[l("h3",{staticClass:"text-sm font-medium text-gray-500 uppercase"},[t._v("Skills")]),t._v(" "),l("h2",{staticClass:"text-2xl text-gray-200 font-semibold"},[t._v("기술")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",[l("div",{staticClass:"mb-10"},[l("h3",{staticClass:"text-sm font-medium text-gray-500 uppercase"},[t._v("\n          Expreiences\n        ")]),t._v(" "),l("h2",{staticClass:"text-2xl text-gray-200 font-semibold"},[t._v("경력")])])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("section",[l("div",{staticClass:"mb-10"},[l("h3",{staticClass:"text-sm font-medium text-gray-500 uppercase"},[t._v("Projects")]),t._v(" "),l("h2",{staticClass:"text-2xl text-gray-200 font-semibold"},[t._v("프로젝트")])])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"mb-10"},[l("h3",{staticClass:"text-sm font-medium text-gray-500 uppercase"},[t._v("Education")]),t._v(" "),l("h2",{staticClass:"text-2xl text-gray-200 font-semibold"},[t._v("학력")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"mb-10"},[l("h3",{staticClass:"text-sm font-medium text-gray-500 uppercase"},[t._v("Awards")]),t._v(" "),l("h2",{staticClass:"text-2xl text-gray-200 font-semibold"},[t._v("수상")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"mb-10"},[l("h3",{staticClass:"text-sm font-medium text-gray-500 uppercase"},[t._v("Languages")]),t._v(" "),l("h2",{staticClass:"text-2xl text-gray-200 font-semibold"},[t._v("언어")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{VueSEO:l(300).default,VueDefinition:l(306).default,VueResumeItem:l(307).default})}}]);