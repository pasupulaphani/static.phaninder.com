"use strict";angular.module("myWebApp",["ngResource","ngCookies","ngSanitize","ngTouch","ui.router","socialsharing","csrf-cross-domain"]).constant("restEndPoint","http://localhost:3000").run(["$rootScope","$window","$location","$state","auth",function(a,b,c,d,e){a.$on("$viewContentLoaded",function(){b.$(document).foundation()}),a.$on("$stateChangeStart",function(a,b){"undefined"!=typeof b.publicAccess&&b.publicAccess===!1&&e.getLoginStatus().then(function(a){return a?void 0:(console.info("guest not allowed"),d.go("404"),c.path())})}),a.location=c,a.site={name:"phaninder.com",url:encodeURIComponent(document.URL),short_url:document.URL},a.me={image:"http://www.gravatar.com/avatar/da8ad3d7a783fda9082894427e6be2a9.png",description:"Hi there! I'm Phani. I live in London. I am a full stack developer who specializes in creating dynamic and beautiful web apps. I currently spend more time in developing new automation techniques for automating project life cycles of my mobile apps.",twt_handler:"PhaniPasupula"},e.getLoginStatus()}]).config(["$httpProvider","$urlRouterProvider","$stateProvider","$fbProvider","$twtProvider",function(a,b,c,d,e){a.interceptors.push(["$q","$injector",function(a,b){return{responseError:function(c){return 404===c.status&&b.get("$state").go("404"),a.reject(c)}}}]),b.when("/","/posts"),b.rule(function(a,b){var c=b.url();if(!("/"===c[c.length-1]||c.indexOf("/?")>-1))return c.indexOf("?")>-1?c.replace("?","/?"):c+"/"}),c.state("login",{url:"/login/",templateUrl:"views/login.html",controller:"LoginCtrl"}).state("posts",{url:"/posts/",templateUrl:"views/posts.html",controller:"PostsCtrl"}).state("posts_status_filter",{url:"/posts/status/:status/",templateUrl:"views/posts.html",controller:"PostsSearchCtrl",publicAccess:!1}).state("post",{url:"/posts/:id/",templateUrl:"views/post.html",controller:"PostCtrl"}).state("post_seo_title",{url:"/posts/:id/:seo_title/",templateUrl:"views/post.html",controller:"PostCtrl"}).state("about",{url:"/about/",templateUrl:"views/post.html",controller:"AboutCtrl"}).state("contact",{url:"/contact/",templateUrl:"views/post.html",controller:"ContactCtrl"}).state("404",{templateUrl:"views/404.html"}).state("500",{templateUrl:"views/500.html"}),b.otherwise(function(a,b){var c=a.get("$state");return c.go("404"),b.path()}),d.init(515239655250335),e.setConfig({trim_text:!0})}]),angular.module("myWebApp").provider("post",function(){this.$get=["$resource","restEndPoint",function(a,b){var c=a(b+"/posts/:id/:seo_title",{},{update:{method:"PUT"}});return c}]}).provider("about",function(){this.$get=["$resource","restEndPoint",function(a,b){var c=a(b+"/about",{},{});return c}]}).provider("contact",function(){this.$get=["$resource","restEndPoint",function(a,b){var c=a(b+"/contact",{},{});return c}]}),angular.module("myWebApp").factory("auth",["$log","$http","$q","restEndPoint",function(a,b,c,d){var e={loggedIn:!1,name:""},f=function(c,f){return b.post(d+"/login",{email:c,password:f}).then(function(){return a.info("logged in successfully"),e.loggedIn=!0,!0}).catch(function(b){return a.warn("log in failed"),a.warn(b),e.loggedIn=!1,!1})},g=function(){return b.get(d+"/login").then(function(){return e.loggedIn=!0,!0}).catch(function(){return e.loggedIn=!1,!1})},h=function(){return b.get(d+"/logout").then(function(){return e.loggedIn=!1,!0})};return{user:e,login:f,getLoginStatus:g,logout:h}}]),angular.module("myWebApp").factory("utils",["$window",function(a){var b=function(b){angular.forEach(b,function(b){b.preface=a.marked(b.preface||""),b.body=a.marked(b.body||"")})};return{markUp:b}}]),angular.module("myWebApp").controller("MainCtrl",["$rootScope","$scope","$location","auth",function(a,b,c,d){b.user=d.user,b.logout=function(){d.logout().then(function(a){a&&c.path("/")})},b.notify={show:!1},b.$on("notify",function(a,c){angular.extend(b.notify,c),b.notify.show=!0}),a.$on("$routeChangeStart",function(){b.notify.show=!1})}]),angular.module("myWebApp").controller("PostsCtrl",["$scope","post",function(a,b){a.posts=b.query()}]).controller("PostsSearchCtrl",["$scope","$stateParams","$http","restEndPoint","utils",function(a,b,c,d,e){a.posts=[],c.get(d+"/posts/",{params:{status:b.status}}).then(function(b){a.posts=b.data,e.markUp(a.posts)})}]),angular.module("myWebApp").controller("PostCtrl",["$scope","$stateParams","$state","$location","post","utils","$twt",function(a,b,c,d,e,f,g){""===b.id&&c.go("404"),a.posts=e.query({id:b.id}),a.posts.$promise.then(function(){f.markUp(a.posts),b.seo_url!==a.posts[0].seo_url&&d.path("/posts/"+a.posts[0]._id+"/"+a.posts[0].seo_url+"/")}),a.share={tpl:"social_sharing",twt:function(){g.intent("tweet",{text:"Adventures at NodeCoptor",url:"http://localhost:9000/#/posts/sdfg3/undefined",hashtags:"phaninder.com"})}}}]).controller("AboutCtrl",["$scope","utils","about",function(a,b,c){a.posts=c.query({id:"about"}),a.posts.$promise.then(function(){b.markUp(a.posts)}),a.share={tpl:"social_networking"}}]).controller("ContactCtrl",["$scope","utils","contact",function(a,b,c){a.posts=c.query({id:"contact"}),a.posts.$promise.then(function(){b.markUp(a.posts)}),a.share={tpl:"social_networking"}}]),angular.module("myWebApp").controller("LoginCtrl",["$scope","$log","$location","auth",function(a,b,c,d){var e=function(){a.$emit("notify",{type:"alert",msg:"Invalid credentials"})};a.login=function(){d.login(a.email,a.password).then(function(a){a?c.path("/"):e()})},a.authenticate=function(a){b.warn("authenticate "+a)}}]);