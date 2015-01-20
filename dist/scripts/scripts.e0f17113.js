"use strict";angular.module("myWebApp",["ngResource","ngCookies","ngSanitize","ngTouch","ui.router","ui.date","socialsharing","csrf-cross-domain","config","gist-embed"]).constant("postTypes",{U:"Under construction",P:"Published",T:"Trashed",M:"MiscPublished"}).constant("FBAppId",0xba1488bd49b6).run(["$log","$window","$rootScope","$location","$state","auth","RESTapi","FBAppId",function(a,b,c,d,e,f,g,h){g.url=d.protocol()+"://"+g.host,c.$on("$viewContentLoaded",function(){angular.element(document).ready(function(){angular.element(document).foundation()})}),c.$on("$stateChangeStart",function(b,c){"undefined"!=typeof c.publicAccess&&c.publicAccess===!1&&f.getLoginStatus().then(function(b){return b?void 0:(a.info("guest not allowed"),e.go("404"),d.path())})}),c.location=d,c.me={image:"http://www.gravatar.com/avatar/da8ad3d7a783fda9082894427e6be2a9.png",description:"Hi there! I'm Phani. I live in London. I am a full stack developer who specializes in creating dynamic and beautiful web apps. I currently spend more time in developing new automation techniques for automating project life cycles of my mobile apps.",twt_handler:"PhaniPasupula"},c.page={title:"phaninder.com",url:encodeURIComponent(document.URL),short_url:document.URL,FBAppId:h,post:{title:"to_set_title",short_desc:"to_set_short_desc"}},f.getLoginStatus()}]).config(["$httpProvider","$urlRouterProvider","$locationProvider","$stateProvider","$fbProvider","$twtProvider","FBAppId",function(a,b,c,d,e,f,g){c.html5Mode(!0).hashPrefix("!"),a.interceptors.push(["$q","$injector",function(a,b){return{responseError:function(c){return 404===c.status&&b.get("$state").go("404"),a.reject(c)}}}]),b.when("/","/posts"),b.rule(function(a,b){var c=b.url();if(!("/"===c[c.length-1]||c.indexOf("/?")>-1))return c.indexOf("?")>-1?c.replace("?","/?"):c+"/"}),d.state("login",{url:"/login/",templateUrl:"views/login.html",controller:"LoginCtrl"}).state("posts",{url:"/posts/",templateUrl:"views/posts.html",controller:"PostsCtrl"}).state("posts_status_filter",{url:"/posts/status/:status/",templateUrl:"views/posts.html",controller:"PostsSearchCtrl",publicAccess:!1}).state("post_new",{url:"/posts/new/",templateUrl:"views/post_edit.html",controller:"PostNewCtrl",publicAccess:!1}).state("post_edit",{url:"/posts/{id}{seo_title:(?:/[^/]+)?}/edit/",templateUrl:"views/post_edit.html",controller:"PostEditCtrl",publicAccess:!1}).state("post",{url:"/posts/{id}{seo_title:(?:/[^/]+)?}/",templateUrl:"views/post.html",controller:"PostCtrl",resolve:{id:["$stateParams",function(a){return a.id}]}}).state("about",{url:"/about/",templateUrl:"views/post.html",controller:"PostCtrl",resolve:{id:function(){return"about"}}}).state("contact",{url:"/contact/",templateUrl:"views/post.html",controller:"PostCtrl",resolve:{id:function(){return"contact"}}}).state("404",{templateUrl:"views/404.html"}).state("500",{templateUrl:"views/500.html"}),b.otherwise(function(a,b){var c=a.get("$state");return c.go("404"),b.path()}),e.init(g),f.init().trimText(!0)}]),angular.module("myWebApp").provider("post",function(){this.$get=["$resource","RESTapi",function(a,b){var c=a(b.url+"/posts/:id/:seo_title",{id:"@id"},{update:{method:"PUT"},setStatus:{method:"PATCH",params:{status:"@status"}}});return c}]}),angular.module("myWebApp").factory("auth",["$log","$http","$q","RESTapi",function(a,b,c,d){var e={loggedIn:!1,name:""},f=function(c,f){return b.post(d.url+"/login",{email:c,password:f}).then(function(){return a.info("logged in successfully"),e.loggedIn=!0,!0}).catch(function(b){return a.warn("log in failed"),a.warn(b),e.loggedIn=!1,!1})},g=function(){return b.get(d.url+"/login").then(function(){return e.loggedIn=!0,!0}).catch(function(){return e.loggedIn=!1,!1})},h=function(){return b.get(d.url+"/logout").then(function(){return e.loggedIn=!1,!0})};return{user:e,login:f,getLoginStatus:g,logout:h}}]),angular.module("myWebApp").factory("utils",["$window",function(a){function b(){}return b.markUp=function(b){angular.forEach(b,function(b){b.preface=a.marked(b.preface||""),b.body=a.marked(b.body||"")})},b.urlSeoEsc=function(b){return b?(b=b.replace(/[^a-zA-Z0-9-_\s]/g,"").trim().replace(/[\s_-]+/g,"-"),b=a.escape(b),angular.lowercase(b)):""},b}]),angular.module("myWebApp").controller("MainCtrl",["$rootScope","$scope","$location","postTypes","auth",function(a,b,c,d,e){b.user=e.user,b.postTypes=d,b.logout=function(){e.logout().then(function(a){a&&c.path("/")})},b.notify={show:!1},b.$on("notify",function(a,c){angular.extend(b.notify,c),b.notify.show=!0}),a.$on("$stateChangeStart",function(){b.notify.show=!1})}]),angular.module("myWebApp").controller("PostsCtrl",["$scope","utils","post",function(a,b,c){a.posts=[],c.query().$promise.then(function(c){a.posts=c,b.markUp(a.posts)})}]).controller("PostsSearchCtrl",["$scope","$stateParams","$http","RESTapi","utils",function(a,b,c,d,e){a.posts=[],c.get(d.url+"/posts/",{params:{status:b.status}}).then(function(b){a.posts=b.data,e.markUp(a.posts)})}]),angular.module("myWebApp").controller("PostCtrl",["$scope","$stateParams","$state","$location","utils","post","id",function(a,b,c,d,e,f,g){return""===g?void c.go("404"):(a.posts=[],f.query({id:g}).$promise.then(function(c){a.posts=c,a.posts[0].full_path="/posts/"+a.posts[0]._id+"/",a.posts[0].seo_url&&""!==a.posts[0].seo_url&&(a.posts[0].full_path=a.posts[0].full_path+a.posts[0].seo_url+"/"),a.posts[0].fq_url=d.protocol()+"://"+d.host()+(80===d.port()?"":":"+d.port())+"/#"+a.posts[0].full_path,b.seo_url!==a.posts[0].seo_url&&""!==a.posts[0].seo_url&&d.path(a.posts[0].full_path),e.markUp(a.posts)}),a.setStatus=function(b){f.setStatus({id:g,status:b}).$promise.then(function(){a.posts[0].status=b})},void(a.share_tpl=-1===["about","contact"].indexOf(g)?"social_sharing":"social_networking"))}]).controller("PostEditCtrl",["$scope","$log","$stateParams","$state","$location","utils","post",function(a,b,c,d,e,f,g){if(""===c.id)return void d.go("404");var h={id:c.id},i=function(b){a.$emit("notify",{type:"alert",msg:b})};a.posts=[],g.query(h).$promise.then(function(b){a.posts=b}),a.save=function(){angular.element("#post-preface").trigger("input"),angular.element("#post-body").trigger("input"),g.update(h,a.posts[0]).$promise.then(function(){e.path("/posts/"+a.posts[0]._id)},function(a){a&&a.data&&(b.error(a.data),i(a.data.error))})},a.urlSeoEsc=f.urlSeoEsc}]).controller("PostNewCtrl",["$scope","$log","$state","$location","utils","post",function(a,b,c,d,e,f){var g=function(b){a.$emit("notify",{type:"alert",msg:b})};a.posts=[{created:(new Date).toISOString()}],a.create=function(){angular.element("#post-preface").trigger("input"),angular.element("#post-body").trigger("input"),f.save(a.posts[0]).$promise.then(function(a){d.path("/posts/"+a._id)},function(a){a&&a.data&&(b.error(a.data),g(a.data.error))})},a.urlSeoEsc=e.urlSeoEsc}]).controller("PostShare",["$scope","$log","$twt","$fb",function(a,b,c,d){a.share={twt:function(a,b,d,e){b=b||"",e=e||"",e=e.concat(""===e?"phaninderdotcom":",phaninderdotcom"),c.intent("tweet",{text:a.concat(b),url:d,hashtags:e})},fb:function(a){d.feed({name:a.title,description:a.short_desc,caption:"phaninder blog",link:a.fq_url,picture:a.banner})}}}]),angular.module("myWebApp").controller("LoginCtrl",["$scope","$log","$location","auth",function(a,b,c,d){var e=function(){a.$emit("notify",{type:"alert",msg:"Invalid credentials"})};a.login=function(){d.login(a.email,a.password).then(function(a){a?c.path("/"):e()})},a.authenticate=function(a){b.warn("authenticate "+a)}}]);