(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{296:function(t,e,n){"use strict";n.r(e);var o="peterkimzz",r={props:{title:{type:String,default:"기술과 예술을 담은 블로그"},titleTemplate:{type:String,default:o},titleTemplateVisible:{type:Boolean,default:!0},description:{type:String,default:""},thumbnail:{type:String,default:""}},head:function(){return{htmlAttrs:{lang:this.seoLang,dir:"ltr"},title:this.seoTitle,meta:[{hid:"description",name:"description",content:this.seoDescription},{hid:"keywords",name:"keywords",content:"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},{hid:"author",name:"author",content:o},{property:"og:type",content:"website"},{property:"og:url",content:this.seoURL},{property:"og:title",content:this.seoTitle},{property:"og:image",content:this.seoImage},{property:"og:description",content:this.seoDescription},{property:"og:site_name",content:o},{property:"og:locale",content:this.seoLang},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:site",content:"@peterkimzz"},{name:"twitter:creator",content:"@peterkimzz"},{name:"twitter:title",content:this.seoTitle},{name:"twitter:description",content:this.seoDescription},{name:"twitter:image",content:this.seoImage}],link:[{rel:"canonical",href:this.seoURL},{rel:"icon",href:this.seoFavicon},{rel:"shortcut icon",href:this.seoFavicon},{rel:"apple-touch-icon",href:this.seoFavicon}]}},computed:{seoTitle:function(){return this.titleTemplateVisible?"".concat(this.title," - ").concat(this.titleTemplate):this.title},seoDescription:function(){return this.description?this.$cheerio.load(this.description).text().substring(0,150):"개발자 peterkimzz의 개발과 예술, 그리고 일상을 정리하는 공간입니다."},seoURL:function(){return"https://www.peterkimzz.com"+this.$route.path},seoLang:function(){return"ko"},seoImage:function(){return this.thumbnail||"https://user-images.githubusercontent.com/20244536/132115770-59711547-4cb3-4a3a-abfe-12740b985441.png"},seoFavicon:function(){return"https://user-images.githubusercontent.com/20244536/132115763-2a9011f1-0336-4cb6-9a57-5e44def5c131.png"}}},c=n(2),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement;t._self._c;return t._e()}),[],!1,null,null,null);e.default=component.exports}}]);