!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){b.exports={oauthd_url:"https://oauth.io",oauthd_api:"https://oauth.io/api",version:"web-0.2.4",options:{}}},{}],2:[function(a,b){"use strict";var c,d,e,f,g;e=a("../config"),f=a("../tools/cookies"),d=a("../tools/cache"),c=a("../tools/url"),g=a("../tools/sha1"),b.exports=function(b,h,i,j){var k,l,m,n,o,p,q,r;return k=i,c=c(h),f.init(e,h),d.init(f,e),n={request:{}},r={},q={},p={execProvidersCb:function(a,b,c){var d,e;if(q[a]){d=q[a],delete q[a];for(e in d)d[e](b,c)}},getDescription:function(a,b,c){return b=b||{},"object"==typeof r[a]?c(null,r[a]):(r[a]||p.fetchDescription(a),b.wait?(q[a]=q[a]||[],void q[a].push(c)):c(null,{}))}},e.oauthd_base=c.getAbsUrl(e.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0],l=[],m=void 0,(o=function(){var a,b;b=/[\\#&]oauthio=([^&]*)/.exec(h.location.hash),b&&(h.location.hash=h.location.hash.replace(/&?oauthio=[^&]*/,""),m=decodeURIComponent(b[1].replace(/\+/g," ")),a=f.readCookie("oauthio_state"),a&&(l.push(a),f.eraseCookie("oauthio_state")))})(),b.location_operations={reload:function(){return h.location.reload()},getHash:function(){return h.location.hash},setHash:function(a){return h.location.hash=a},changeHref:function(a){return h.location.href=a}},function(i){var k,o,q,s;k=function(b){n.request=a("./oauthio_requests")(b,e,l,d,p),p.fetchDescription=function(a){r[a]||(r[a]=!0,b.ajax({url:e.oauthd_api+"/providers/"+a,data:{extend:!0},dataType:"json"}).done(function(b){r[a]=b.data,p.execProvidersCb(a,null,b.data)}).always(function(){"object"!=typeof r[a]&&(delete r[a],p.execProvidersCb(a,new Error("Unable to fetch request description")))}))}},null==i.OAuth&&(i.OAuth={initialize:function(a,b){var c;if(e.key=a,b)for(c in b)e.options[c]=b[c]},setOAuthdURL:function(a){e.oauthd_url=a,e.oauthd_base=c.getAbsUrl(e.oauthd_url).match(/^.{2,5}:\/\/[^/]+/)[0]},getVersion:function(){return e.version},create:function(a,b,c){var e,f,g,h;if(!b)return d.tryCache(i.OAuth,a,!0);"object"!=typeof c&&p.fetchDescription(a),f=function(d){return n.request.mkHttp(a,b,c,d)},g=function(d,e){return n.request.mkHttpEndpoint(a,b,c,d,e)},h={};for(e in b)h[e]=b[e];return h.get=f("GET"),h.post=f("POST"),h.put=f("PUT"),h.patch=f("PATCH"),h.del=f("DELETE"),h.me=n.request.mkHttpMe(a,b,c,"GET"),h},popup:function(a,f,k){var m,o,p,q,r,s,t,u,v,w,x,y;return q=!1,p=function(a){if(a.origin===e.oauthd_base){try{u.close()}catch(b){}return f.data=a.data,n.request.sendCallback(f,m),q=!0}},u=void 0,o=void 0,v=void 0,m=null!=(y=b.jQuery)?y.Deferred():void 0,f=f||{},e.key?(2===arguments.length&&"function"==typeof f&&(k=f,f={}),d.cacheEnabled(f.cache)&&(s=d.tryCache(i.OAuth,a,f.cache))?(null!=m&&m.resolve(s),k?k(null,s):m.promise()):(f.state||(f.state=g.create_hash(),f.state_type="client"),l.push(f.state),t=e.oauthd_url+"/auth/"+a+"?k="+e.key,t+="&d="+encodeURIComponent(c.getAbsUrl("/")),f&&(t+="&opts="+encodeURIComponent(JSON.stringify(f))),f.wnd_settings?(x=f.wnd_settings,delete f.wnd_settings):x={width:Math.floor(.8*b.outerWidth),height:Math.floor(.5*b.outerHeight)},null==x.height&&(x.height=x.height<350?350:void 0),null==x.width&&(x.width=x.width<800?800:void 0),null==x.left&&(x.left=b.screenX+(b.outerWidth-x.width)/2),null==x.top&&(x.top=b.screenY+(b.outerHeight-x.height)/8),w="width="+x.width+",height="+x.height,w+=",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0",w+=",left="+x.left+",top="+x.top,f={provider:a,cache:f.cache},f.callback=function(a,c){return b.removeEventListener?b.removeEventListener("message",p,!1):b.detachEvent?b.detachEvent("onmessage",p):h.detachEvent&&h.detachEvent("onmessage",p),f.callback=function(){},v&&(clearTimeout(v),v=void 0),k?k(a,c):void 0},b.attachEvent?b.attachEvent("onmessage",p):h.attachEvent?h.attachEvent("onmessage",p):b.addEventListener&&b.addEventListener("message",p,!1),"undefined"!=typeof chrome&&chrome.runtime&&chrome.runtime.onMessageExternal&&chrome.runtime.onMessageExternal.addListener(function(a,b){return a.origin=b.url.match(/^.{2,5}:\/\/[^/]+/)[0],null!=m&&m.resolve(),p(a)}),!o&&(-1!==j.userAgent.indexOf("MSIE")||j.appVersion.indexOf("Trident/")>0)&&(o=h.createElement("iframe"),o.src=e.oauthd_url+"/auth/iframe?d="+encodeURIComponent(c.getAbsUrl("/")),o.width=0,o.height=0,o.frameBorder=0,o.style.visibility="hidden",h.body.appendChild(o)),v=setTimeout(function(){null!=m&&m.reject(new Error("Authorization timed out")),f.callback&&"function"==typeof f.callback&&f.callback(new Error("Authorization timed out"));try{u.close()}catch(a){}},12e5),u=b.open(t,"Authorization",w),u?(u.focus(),r=b.setInterval(function(){return null!==u&&!u.closed||(b.clearInterval(r),q||(null!=m&&m.reject(new Error("The popup was closed")),!f.callback||"function"!=typeof f.callback))?void 0:f.callback(new Error("The popup was closed"))},500)):(null!=m&&m.reject(new Error("Could not open a popup")),f.callback&&"function"==typeof f.callback&&f.callback(new Error("Could not open a popup"))),null!=m?m.promise():void 0)):(null!=m&&m.reject(new Error("OAuth object must be initialized")),null==k?m.promise():k(new Error("OAuth object must be initialized")))},redirect:function(a,h,j){var k,l;return 2===arguments.length&&(j=h,h={}),d.cacheEnabled(h.cache)&&(l=d.tryCache(i.OAuth,a,h.cache))?(j=c.getAbsUrl(j)+(-1===j.indexOf("#")?"#":"&")+"oauthio=cache",b.location_operations.changeHref(j),void b.location_operations.reload()):(h.state||(h.state=g.create_hash(),h.state_type="client"),f.createCookie("oauthio_state",h.state),k=encodeURIComponent(c.getAbsUrl(j)),j=e.oauthd_url+"/auth/"+a+"?k="+e.key,j+="&redirect_uri="+k,h&&(j+="&opts="+encodeURIComponent(JSON.stringify(h))),void b.location_operations.changeHref(j))},callback:function(a,c,e){var f,g,h;if(f=null!=(h=b.jQuery)?h.Deferred():void 0,1===arguments.length&&"function"==typeof a&&(e=a,a=void 0,c={}),1===arguments.length&&"string"==typeof a&&(c={}),2===arguments.length&&"function"==typeof c&&(e=c,c={}),d.cacheEnabled(c.cache)||"cache"===m){if(g=d.tryCache(i.OAuth,a,c.cache),"cache"===m&&("string"!=typeof a||!a))return null!=f&&f.reject(new Error("You must set a provider when using the cache")),e?e(new Error("You must set a provider when using the cache")):null!=f?f.promise():void 0;if(g){if(!e)return null!=f&&f.resolve(g),null!=f?f.promise():void 0;if(g)return e(null,g)}}return m?(n.request.sendCallback({data:m,provider:a,cache:c.cache,callback:e},f),null!=f?f.promise():void 0):void 0},clearCache:function(a){f.eraseCookie("oauthio_provider_"+a)},http_me:function(a){n.request.http_me&&n.request.http_me(a)},http:function(a){n.request.http&&n.request.http(a)}},"undefined"==typeof b.jQuery?(s=[],o=void 0,"undefined"!=typeof chrome&&chrome.extension?o=function(){return function(){throw new Error("Please include jQuery before oauth.js")}}:(q=h.createElement("script"),q.src="//code.jquery.com/jquery.min.js",q.type="text/javascript",q.onload=function(){var a;k(b.jQuery);for(a in s)s[a].fn.apply(null,s[a].args)},h.getElementsByTagName("head")[0].appendChild(q),o=function(a){return function(){var b,c;c=[];for(b in arguments)c[b]=arguments[b];s.push({fn:a,args:c})}}),n.request.http=o(function(){n.request.http.apply(i.OAuth,arguments)}),p.fetchDescription=o(function(){p.fetchDescription.apply(p,arguments)}),n.request=a("./oauthio_requests")(b.jQuery,e,l,d,p)):k(b.jQuery))}}},{"../config":1,"../tools/cache":5,"../tools/cookies":6,"../tools/sha1":7,"../tools/url":8,"./oauthio_requests":3}],3:[function(a,b){var c,d=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};c=a("../tools/url")(),b.exports=function(a,b,e,f,g){return{http:function(e){var f,h,i,j,k;i=function(){var e,f,g,h;if(h=k.oauthio.request||{},!h.cors){k.url=encodeURIComponent(k.url),"/"!==k.url[0]&&(k.url="/"+k.url),k.url=b.oauthd_url+"/request/"+k.oauthio.provider+k.url,k.headers=k.headers||{},k.headers.oauthio="k="+b.key,k.oauthio.tokens.oauth_token&&k.oauthio.tokens.oauth_token_secret&&(k.headers.oauthio+="&oauthv=1");for(f in k.oauthio.tokens)k.headers.oauthio+="&"+encodeURIComponent(f)+"="+encodeURIComponent(k.oauthio.tokens[f]);return delete k.oauthio,a.ajax(k)}if(k.oauthio.tokens){if(k.oauthio.tokens.access_token&&(k.oauthio.tokens.token=k.oauthio.tokens.access_token),k.url.match(/^[a-z]{2,16}:\/\//)||("/"!==k.url[0]&&(k.url="/"+k.url),k.url=h.url+k.url),k.url=c.replaceParam(k.url,k.oauthio.tokens,h.parameters),h.query){g=[];for(e in h.query)g.push(encodeURIComponent(e)+"="+encodeURIComponent(c.replaceParam(h.query[e],k.oauthio.tokens,h.parameters)));k.url+=d.call(k.url,"?")>=0?"&"+g:"?"+g}if(h.headers){k.headers=k.headers||{};for(e in h.headers)k.headers[e]=c.replaceParam(h.headers[e],k.oauthio.tokens,h.parameters)}return delete k.oauthio,a.ajax(k)}},k={},j=void 0;for(j in e)k[j]=e[j];return k.oauthio.request&&k.oauthio.request!==!0?i():(h={wait:!!k.oauthio.request},f=null!=a?a.Deferred():void 0,g.getDescription(k.oauthio.provider,h,function(a,b){return a?null!=f?f.reject(a):void 0:(k.oauthio.request=k.oauthio.tokens.oauth_token&&k.oauthio.tokens.oauth_token_secret?b.oauth1&&b.oauth1.request:b.oauth2&&b.oauth2.request,void(null!=f&&f.resolve()))}),null!=f?f.then(i):void 0)},http_me:function(c){var d,e,f,h,i;f=function(){var c,d,e,f;c=null!=a?a.Deferred():void 0,f=i.oauthio.request||{},i.url=b.oauthd_url+"/auth/"+i.oauthio.provider+"/me",i.headers=i.headers||{},i.headers.oauthio="k="+b.key,i.oauthio.tokens.oauth_token&&i.oauthio.tokens.oauth_token_secret&&(i.headers.oauthio+="&oauthv=1");for(d in i.oauthio.tokens)i.headers.oauthio+="&"+encodeURIComponent(d)+"="+encodeURIComponent(i.oauthio.tokens[d]);return delete i.oauthio,e=a.ajax(i),a.when(e).done(function(a){null!=c&&c.resolve(a.data)}).fail(function(a){a.responseJSON?null!=c&&c.reject(a.responseJSON.data):null!=c&&c.reject(new Error("An error occured while trying to access the resource"))}),null!=c?c.promise():void 0},i={};for(h in c)i[h]=c[h];return i.oauthio.request&&i.oauthio.request!==!0?f():(e={wait:!!i.oauthio.request},d=null!=a?a.Deferred():void 0,g.getDescription(i.oauthio.provider,e,function(a,b){return a?null!=d?d.reject(a):void 0:(i.oauthio.request=i.oauthio.tokens.oauth_token&&i.oauthio.tokens.oauth_token_secret?b.oauth1&&b.oauth1.request:b.oauth2&&b.oauth2.request,void(null!=d&&d.resolve()))}),null!=d?d.then(f):void 0)},mkHttp:function(a,b,c,d){var e;return e=this,function(f,g){var h,i;if(i={},"string"==typeof f){if("object"==typeof g)for(h in g)i[h]=g[h];i.url=f}else if("object"==typeof f)for(h in f)i[h]=f[h];return i.type=i.type||d,i.oauthio={provider:a,tokens:b,request:c},e.http(i)}},mkHttpMe:function(a,b,c,d){var e;return e=this,function(f){var g;return g={},g.type=g.type||d,g.oauthio={provider:a,tokens:b,request:c},g.data=g.data||{},g.data.filter=f?f.join(","):void 0,e.http_me(g)}},sendCallback:function(a,b){var c,d,g,h,i,j,k,l,m,n,o;c=this,d=void 0,h=void 0;try{d=JSON.parse(a.data)}catch(p){return g=p,null!=b&&b.reject(new Error("Error while parsing result")),a.callback(new Error("Error while parsing result"))}if(d&&d.provider){if(a.provider&&d.provider.toLowerCase()!==a.provider.toLowerCase())return h=new Error("Returned provider name does not match asked provider"),null!=b&&b.reject(h),a.callback&&"function"==typeof a.callback?a.callback(h):void 0;if("error"===d.status||"fail"===d.status)return h=new Error(d.message),h.body=d.data,null!=b&&b.reject(h),a.callback&&"function"==typeof a.callback?a.callback(h):void 0;if("success"!==d.status||!d.data)return h=new Error,h.body=d.data,null!=b&&b.reject(h),a.callback&&"function"==typeof a.callback?a.callback(h):void 0;d.state=d.state.replace(/\s+/g,"");for(j in e)o=e[j],e[j]=o.replace(/\s+/g,"");if(!d.state||-1===e.indexOf(d.state))return null!=b&&b.reject(new Error("State is not matching")),a.callback&&"function"==typeof a.callback?a.callback(new Error("State is not matching")):void 0;if(a.provider||(d.data.provider=d.provider),m=d.data,f.cacheEnabled(a.cache)&&m&&f.storeCache(d.provider,m),l=m.request,delete m.request,n=void 0,m.access_token?n={access_token:m.access_token}:m.oauth_token&&m.oauth_token_secret&&(n={oauth_token:m.oauth_token,oauth_token_secret:m.oauth_token_secret}),!l)return null!=b&&b.resolve(m),a.callback&&"function"==typeof a.callback?a.callback(null,m):void 0;if(l.required)for(i in l.required)n[l.required[i]]=m[l.required[i]];return k=function(a){return c.mkHttp(d.provider,n,l,a)},m.get=k("GET"),m.post=k("POST"),m.put=k("PUT"),m.patch=k("PATCH"),m.del=k("DELETE"),m.me=c.mkHttpMe(d.provider,n,l,"GET"),null!=b&&b.resolve(m),a.callback&&"function"==typeof a.callback?a.callback(null,m):void 0}}}}},{"../tools/url":8}],4:[function(a){var b,c;c="undefined"!=typeof jQuery&&null!==jQuery?jQuery:void 0,(b=a("./lib/oauth")(window,document,c,navigator))(window||this)},{"./lib/oauth":2}],5:[function(a,b){b.exports={init:function(a,b){return this.config=b,this.cookies=a},tryCache:function(a,b,c){var d,e,f;if(this.cacheEnabled(c)){if(c=this.cookies.readCookie("oauthio_provider_"+b),!c)return!1;c=decodeURIComponent(c)}if("string"==typeof c)try{c=JSON.parse(c)}catch(g){return d=g,!1}if("object"==typeof c){f={};for(e in c)"request"!==e&&"function"!=typeof c[e]&&(f[e]=c[e]);return a.create(b,f,c.request)}return!1},storeCache:function(a,b){this.cookies.createCookie("oauthio_provider_"+a,encodeURIComponent(JSON.stringify(b)),b.expires_in-10||3600)},cacheEnabled:function(a){return"undefined"==typeof a?this.config.options.cache:a}}},{}],6:[function(a,b){b.exports={init:function(a,b){return this.config=a,this.document=b},createCookie:function(a,b,c){var d;this.eraseCookie(a),d=new Date,d.setTime(d.getTime()+1e3*(c||1200)),c="; expires="+d.toGMTString(),this.document.cookie=a+"="+b+c+"; path=/"},readCookie:function(a){var b,c,d,e;for(e=a+"=",c=this.document.cookie.split(";"),d=0;d<c.length;){for(b=c[d];" "===b.charAt(0);)b=b.substring(1,b.length);if(0===b.indexOf(e))return b.substring(e.length,b.length);d++}return null},eraseCookie:function(a){var b;b=new Date,b.setTime(b.getTime()-864e5),this.document.cookie=a+"=; expires="+b.toGMTString()+"; path=/"}}},{}],7:[function(a,b){var c,d;d=0,c="",b.exports={hex_sha1:function(a){return this.rstr2hex(this.rstr_sha1(this.str2rstr_utf8(a)))},b64_sha1:function(a){return this.rstr2b64(this.rstr_sha1(this.str2rstr_utf8(a)))},any_sha1:function(a,b){return this.rstr2any(this.rstr_sha1(this.str2rstr_utf8(a)),b)},hex_hmac_sha1:function(a,b){return this.rstr2hex(this.rstr_hmac_sha1(this.str2rstr_utf8(a),this.str2rstr_utf8(b)))},b64_hmac_sha1:function(a,b){return this.rstr2b64(this.rstr_hmac_sha1(this.str2rstr_utf8(a),this.str2rstr_utf8(b)))},any_hmac_sha1:function(a,b,c){return this.rstr2any(this.rstr_hmac_sha1(this.str2rstr_utf8(a),this.str2rstr_utf8(b)),c)},sha1_vm_test:function(){return"a9993e364706816aba3e25717850c26c9cd0d89d"===thishex_sha1("abc").toLowerCase()},rstr_sha1:function(a){return this.binb2rstr(this.binb_sha1(this.rstr2binb(a),8*a.length))},rstr_hmac_sha1:function(a,b){var c,d,e,f,g;for(c=this.rstr2binb(a),c.length>16&&(c=this.binb_sha1(c,8*a.length)),f=Array(16),g=Array(16),e=0;16>e;)f[e]=909522486^c[e],g[e]=1549556828^c[e],e++;return d=this.binb_sha1(f.concat(this.rstr2binb(b)),512+8*b.length),this.binb2rstr(this.binb_sha1(g.concat(d),672))},rstr2hex:function(a){var b,c,e,f,g;try{}catch(h){b=h,d=0}for(c=d?"0123456789ABCDEF":"0123456789abcdef",f="",g=void 0,e=0;e<a.length;)g=a.charCodeAt(e),f+=c.charAt(g>>>4&15)+c.charAt(15&g),e++;return f},rstr2b64:function(a){var b,d,e,f,g,h,i;try{}catch(j){b=j,c=""}for(h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",g="",f=a.length,d=0;f>d;){for(i=a.charCodeAt(d)<<16|(f>d+1?a.charCodeAt(d+1)<<8:0)|(f>d+2?a.charCodeAt(d+2):0),e=0;4>e;)g+=8*d+6*e>8*a.length?c:h.charAt(i>>>6*(3-e)&63),e++;d+=3}return g},rstr2any:function(a,b){var c,d,e,f,g,h,i,j,k;for(d=b.length,j=Array(),f=void 0,h=void 0,k=void 0,i=void 0,c=Array(Math.ceil(a.length/2)),f=0;f<c.length;)c[f]=a.charCodeAt(2*f)<<8|a.charCodeAt(2*f+1),f++;for(;c.length>0;){for(i=Array(),k=0,f=0;f<c.length;)k=(k<<16)+c[f],h=Math.floor(k/d),k-=h*d,(i.length>0||h>0)&&(i[i.length]=h),f++;j[j.length]=k,c=i}for(g="",f=j.length-1;f>=0;)g+=b.charAt(j[f]),f--;for(e=Math.ceil(8*a.length/(Math.log(b.length)/Math.log(2))),f=g.length;e>f;)g=b[0]+g,f++;return g},str2rstr_utf8:function(a){var b,c,d,e;for(c="",b=-1,d=void 0,e=void 0;++b<a.length;)d=a.charCodeAt(b),e=b+1<a.length?a.charCodeAt(b+1):0,d>=55296&&56319>=d&&e>=56320&&57343>=e&&(d=65536+((1023&d)<<10)+(1023&e),b++),127>=d?c+=String.fromCharCode(d):2047>=d?c+=String.fromCharCode(192|d>>>6&31,128|63&d):65535>=d?c+=String.fromCharCode(224|d>>>12&15,128|d>>>6&63,128|63&d):2097151>=d&&(c+=String.fromCharCode(240|d>>>18&7,128|d>>>12&63,128|d>>>6&63,128|63&d));return c},str2rstr_utf16le:function(a){var b,c;for(c="",b=0;b<a.length;)c+=String.fromCharCode(255&a.charCodeAt(b),a.charCodeAt(b)>>>8&255),b++;return c},str2rstr_utf16be:function(a){var b,c;for(c="",b=0;b<a.length;)c+=String.fromCharCode(a.charCodeAt(b)>>>8&255,255&a.charCodeAt(b)),b++;return c},rstr2binb:function(a){var b,c;for(c=Array(a.length>>2),b=0;b<c.length;)c[b]=0,b++;for(b=0;b<8*a.length;)c[b>>5]|=(255&a.charCodeAt(b/8))<<24-b%32,b+=8;return c},binb2rstr:function(a){var b,c;for(c="",b=0;b<32*a.length;)c+=String.fromCharCode(a[b>>5]>>>24-b%32&255),b+=8;return c},binb_sha1:function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;for(a[b>>5]|=128<<24-b%32,a[(b+64>>9<<4)+15]=b,p=Array(80),c=1732584193,d=-271733879,e=-1732584194,f=271733878,g=-1009589776,h=0;h<a.length;){for(j=c,k=d,l=e,m=f,n=g,i=0;80>i;)p[i]=16>i?a[h+i]:this.bit_rol(p[i-3]^p[i-8]^p[i-14]^p[i-16],1),o=this.safe_add(this.safe_add(this.bit_rol(c,5),this.sha1_ft(i,d,e,f)),this.safe_add(this.safe_add(g,p[i]),this.sha1_kt(i))),g=f,f=e,e=this.bit_rol(d,30),d=c,c=o,i++;c=this.safe_add(c,j),d=this.safe_add(d,k),e=this.safe_add(e,l),f=this.safe_add(f,m),g=this.safe_add(g,n),h+=16}return Array(c,d,e,f,g)},sha1_ft:function(a,b,c,d){return 20>a?b&c|~b&d:40>a?b^c^d:60>a?b&c|b&d|c&d:b^c^d},sha1_kt:function(a){return 20>a?1518500249:40>a?1859775393:60>a?-1894007588:-899497514},safe_add:function(a,b){var c,d;return c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16),d<<16|65535&c},bit_rol:function(a,b){return a<<b|a>>>32-b},create_hash:function(){var a;return a=this.b64_sha1((new Date).getTime()+":"+Math.floor(9999999*Math.random())),a.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,"")}}},{}],8:[function(a,b){b.exports=function(a){return{getAbsUrl:function(b){var c;return b.match(/^.{2,5}:\/\//)?b:"/"===b[0]?a.location.protocol+"//"+a.location.host+b:(c=a.location.protocol+"//"+a.location.host+a.location.pathname,"/"!==c[c.length-1]&&"#"!==b[0]?c+"/"+b:c+b)},replaceParam:function(a,b,c){return a=a.replace(/\{\{(.*?)\}\}/g,function(a,c){return b[c]||""}),c&&(a=a.replace(/\{(.*?)\}/g,function(a,b){return c[b]||""})),a}}}},{}]},{},[4]);;var ClientState, ClientStateRedis,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ClientState = (function() {
  function ClientState(serviceid, address) {
    this.serviceid = serviceid;
    this.address = address != null ? address : "http://api.clientstate.io";
  }

  ClientState.prototype.auth_popup = function(provider, clientid, cb) {
    var self;
    this.provider = provider;
    this.clientid = clientid;
    if (arguments.length === 2) {
      cb = function(err, provider_data) {
        return console.log(arguments);
      };
    }
    OAuth.initialize(this.clientid);
    OAuth.setOAuthdURL(this.address);
    self = this;
    OAuth.popup(provider, function(err, provider_data) {
      if (err != null) {
        cb(err);
        return;
      }
      self.access_token = provider_data.access_token;
      return cb(null, provider_data);
    });
  };

  return ClientState;

})();

ClientStateRedis = (function(_super) {
  __extends(ClientStateRedis, _super);

  function ClientStateRedis() {
    return ClientStateRedis.__super__.constructor.apply(this, arguments);
  }

  ClientStateRedis.prototype.make_request = function() {
    var request;
    request = new XMLHttpRequest();
    request.setRequestHeader("access_token", this.access_token);
    request.setRequestHeader("provider", this.provider);
    request.setRequestHeader("serviceid", this.serviceid);
    return request;
  };

  ClientStateRedis.prototype.get = function() {
    var args, cb, command, key, request, url;
    if (arguments.length === 3) {
      command = arguments[0], key = arguments[1], cb = arguments[2];
    }
    if (arguments.length === 4) {
      command = arguments[0], key = arguments[1], args = arguments[2], cb = arguments[3];
    }
    request = this.make_request();
    url = "" + this.address + "/" + command + "/" + key;
    if (args !== void 0) {
      url += "?args=" + (args.join(','));
    }
    request.open('GET', url, true);
    request.onload = function(e) {
      return cb(null, request);
    };
    return request.send();
  };

  ClientStateRedis.prototype.post = function() {
    var args, cb, command, key, request, url, value;
    if (arguments.length === 5) {
      command = arguments[0], key = arguments[1], value = arguments[2], args = arguments[3], cb = arguments[4];
    }
    if (arguments.length === 4) {
      command = arguments[0], key = arguments[1], value = arguments[2], cb = arguments[3];
    }
    request = this.make_request();
    url = "" + this.address + "/" + command + "/" + key;
    if (args !== void 0) {
      url += "?args=" + (args.join(','));
    }
    request.open('POST', url, true);
    request.onload = function(e) {
      return cb(null, request);
    };
    return request.send(value);
  };

  return ClientStateRedis;

})(ClientState);

window.ClientStateRedis = ClientStateRedis;
