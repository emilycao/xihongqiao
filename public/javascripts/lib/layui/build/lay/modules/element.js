/** layui-v1.0.3 LGPL license By www.layui.com */
 ;layui.define("jquery",function(i){"use strict";var t=layui.jquery,a=(layui.hint(),layui.device()),e="element",n="layui-this",l="layui-show",s=function(){this.config={}};s.prototype.set=function(i){var a=this;return t.extend(!0,a.config,i),a},s.prototype.on=function(i,t){return layui.onevent(e,i,t)},s.prototype.init=function(i){var s={tabClick:function(i,a){var s=t(this),a=a||s.index(),o=s.parents(".layui-tab"),c=o.children(".layui-tab-content").children(".layui-tab-item"),u=o.attr("lay-filter");s.addClass(n).siblings().removeClass(n),c.eq(a).addClass(l).siblings().removeClass(l),layui.event.call(this,e,"tab("+u+")",{elem:o,index:a})},tabAuto:function(){var i="layui-tab-more",e="layui-tab-bar",l="layui-tab-close",o=this;t(".layui-tab").each(function(){var c=t(this),u=c.children(".layui-tab-title"),r=(c.children(".layui-tab-content").children(".layui-tab-item"),'lay-stope="tabmore"'),d=t('<span class="layui-unselect layui-tab-bar" '+r+"><i "+r+' class="layui-icon">&#xe61a;</i></span>');if(o===window&&8!=a.ie&&s.hideTabMore(!0),c.attr("lay-allowClose")&&!u.find("li").find("."+l)[0]){var h=t('<i class="layui-icon layui-unselect '+l+'">&#x1006;</i>');h.on("click",function(){var i=t(this).parent(),a=i.index(),e=i.parents(".layui-tab"),l=e.children(".layui-tab-content").children(".layui-tab-item");i.hasClass(n)&&(i.next()[0]?s.tabClick.call(i.next()[0],{},a+1):i.prev()[0]&&s.tabClick.call(i.prev()[0],{},a-1)),i.remove(),l.eq(a).remove()}),u.find("li").append(h)}if(u.prop("scrollWidth")>u.outerWidth()+1){if(u.find("."+e)[0])return;u.append(d),d.on("click",function(t){u[this.title?"removeClass":"addClass"](i),this.title=this.title?"":"收缩"})}else u.find("."+e).remove()})},hideTabMore:function(i){var a=t(".layui-tab-title");i!==!0&&"tabmore"===i.target.getAttribute("lay-stope")||(a.removeClass("layui-tab-more"),a.find(".layui-tab-bar").attr("title",""))}},o={tab:function(){var i=".layui-tab-title li";s.tabAuto.call({}),c.off("click",i,s.tabClick).on("click",i,s.tabClick),t(window).off("resize",s.tabAuto).on("resize",s.tabAuto),c.off("click",s.hideTabMore).on("click",s.hideTabMore)},nav:function(){var i,e,n,l=".layui-nav",s="layui-nav-item",o="layui-nav-bar",c="layui-nav-tree",u="layui-nav-child",r="layui-nav-more",d=200,h=function(a,l){var s=t(this),o=s.find("."+u);l.hasClass(c)?a.css({top:s.position().top,height:s.children("a").height(),opacity:1}):(o.addClass("layui-anim layui-anim-upbit"),a.css({left:s.position().left+parseFloat(s.css("marginLeft")),top:s.position().top+s.height()-5}),i=setTimeout(function(){a.css({width:s.width(),opacity:1})},d),clearTimeout(n),"block"===o.css("display")&&clearTimeout(e),e=setTimeout(function(){o.show(),s.find("."+r).addClass(r+"d")},300))};t(l).each(function(){var l=t(this),f=t('<span class="'+o+'"></span>'),y=l.find("."+s);l.find("."+o)[0]||a.ie&&a.ie<10||(l.append(f),y.on("mouseenter",function(){h.call(this,f,l)}).on("mouseleave",function(){l.hasClass(c)||(clearTimeout(e),e=setTimeout(function(){l.find("."+u).hide(),l.find("."+r).removeClass(r+"d")},300))}),l.on("mouseleave",function(){clearTimeout(i),n=setTimeout(function(){l.hasClass(c)?f.css({height:0,top:f.position().top+f.height()/2,opacity:0}):f.css({width:0,left:f.position().left+f.width()/2,opacity:0})},d)})),y.each(function(){var i=t(this),a=i.find("."+u);if(a[0]&&!i.find("."+r)[0]){if(i.children("a").append('<span class="'+r+'"></span>'),!l.hasClass(c))return;i.children("a").on("click",function(){t(this);"none"===a.css("display")?i.addClass(s+"ed"):i.removeClass(s+"ed")})}})})},breadcrumb:function(){var i=".layui-breadcrumb";t(i).each(function(){var i=t(this),a=i.attr("lay-separator")||">",e=i.find("a");e.each(function(i){i!==e.length-1&&t(this).append("<span>"+a+"</span>")}),i.css("visibility","visible")})}};return layui.each(o,function(i,t){t()})};var o=new s,c=t(document);o.init(),i(e,function(i){return o.set(i)})});