webpackJsonp([0],{13:function(e,t,n){var r=n(192);r.keys().forEach(function(t){var n=t.replace(/^.+\/([^\/]+)\/index\.js(x)?/,"$1");e.exports[n]=r(t).default})},176:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n(5),l=n.n(o),c=n(13),u=(n.n(c),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=function(e){function t(){r(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={curPage:3,isOn:!0},e}return i(t,e),s(t,[{key:"onClickLi",value:function(e){this.setState(u({},this.state,{curPage:e}))}},{key:"handleSwitch",value:function(){this.setState(u({},this.state,{isOn:!this.state.isOn}))}},{key:"render",value:function(){var e=this,t=this.state.curPage,n=[l.a.createElement(c.Home,{bgc:"#87b0a5"}),l.a.createElement(c.About,{bgc:"#109085"}),l.a.createElement(c.Skills,{bgc:"#4d5e8f"}),l.a.createElement(c.Exp,{bgc:"#945c4c"})].map(function(e,n){return l.a.createElement(c.PageTemplate,{active:t===n,upPage:t>n,downPage:t<n,key:n,bgi:"url(img/bg.png)"},e)});return l.a.createElement(c.SliderTemplate,{header:l.a.createElement(c.Header,{handleSwitch:function(){return e.handleSwitch()},isOn:this.state.isOn}),handleClick:function(t){return e.onClickLi(t)},defaultActive:this.state.curPage},n)}}]),t}(o.Component);t.a=d},177:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=o.a.span(['border-radius: 3px 0 0 3px;position: absolute;display: inline-block;width: 60px;left: -70px;text-align: center;background-color: rgba(0, 0, 0, .7);color: #fff;font-weight: 700;opacity: 0;&:after {content: "";position: absolute;right: -12px;width: 0;height: 0;border-top: 12px solid transparent;border-left: 12px solid rgba(0, 0, 0, 0.7);border-bottom: 12px solid transparent;}']),c=function(e){var t=e.children,n=r(e,["children"]);return i.a.createElement(l,n,t)};t.default=c},178:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=o.a.p(["width: 100%;padding: "," 0 0 0;margin: 0;font-size: ",";"],function(e){return e.top},function(e){return e.fontSize||"24px"}),c=function(e){var t=e.top,n=e.children;r(e,["top","children"]);return i.a.createElement(l,{top:t},n)};t.default=c},179:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n.i(o.b)(["from {left: -27px;}to {left: 217px;}"]),c=n.i(o.b)(["from {top: -27px;}to {top: 217px;}"]),u=o.a.ul(["list-style: none;margin: 0 auto;padding: 0;width: 242px;height: 242px;border: 4px dashed #999;border-radius: 50%;position: absolute;text-align: center;li {width: 50px;height: 50px;border-radius: 50%;position: absolute;line-height: 50px;}"]),s=o.a.li.attrs({time:function(e){return-2*(e.index+1)}})(["animation:"," 8s cubic-bezier(.36, 0, .64, 1) "," infinite alternate,"," 8s cubic-bezier(.36, 0, .64, 1) "," infinite alternate;background-color: ",";"],l,function(e){return e.time+"s"},c,function(e){return e.time+4+"s"},function(e){return e.bgc||"#000"}),d=function(e){r(e,[]);return i.a.createElement(u,null,i.a.createElement(s,{index:1,bgc:"rgba(179, 164, 140, .8)"},"es6"),i.a.createElement(s,{index:2,bgc:"rgba(171, 209, 220, .8)"},"vue"),i.a.createElement(s,{index:3,bgc:"rgba(238, 215, 163, .8)"},"ng2"),i.a.createElement(s,{index:4,bgc:"rgba(207, 184, 178, .8)"},"fp"),i.a.createElement(s,{index:5,bgc:"rgba(207, 184, 178, .8)"},"fp"),i.a.createElement(s,{index:6,bgc:"rgba(207, 184, 178, .8)"},"fp"),i.a.createElement(s,{index:7,bgc:"rgba(207, 184, 178, .8)"},"fp"),i.a.createElement(s,{index:8,bgc:"rgba(207, 184, 178, .8)"},"fp"))};t.default=d},180:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n.i(o.b)(["from {left: -22px;}to {left: 122px;}"]),c=n.i(o.b)(["from {top: 122px;}to {top: -22px;}"]),u=o.a.ul(["list-style: none;margin: 0;padding: 0;width: 142px;height: 142px;border: 4px dashed #999;border-radius: 50%;position: absolute;text-align: center;line-height: 50px;transform: translateX(50px) translateY(50px);li {width: 40px;height: 40px;border-radius: 50%;position: absolute;line-height: 40px;}"]),s=o.a.li.attrs({time:function(e){return-4*e.index}})(["animation:"," 8s cubic-bezier(.36, 0, .64, 1) "," infinite alternate,"," 8s cubic-bezier(.36, 0, .64, 1) "," infinite alternate;background-color: ",";"],l,function(e){return e.time+"s"},c,function(e){return e.time+4+"s"},function(e){return e.bgc||"#000"}),d=function(e){r(e,[]);return i.a.createElement(u,null,i.a.createElement(s,{index:1,bgc:"rgba(179, 164, 140, .8)"},"es6"),i.a.createElement(s,{index:2,bgc:"rgba(171, 209, 220, .8)"},"vue"),i.a.createElement(s,{index:3,bgc:"rgba(238, 215, 163, .8)"},"ng2"),i.a.createElement(s,{index:4,bgc:"rgba(207, 184, 178, .8)"},"fp"))};t.default=d},181:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=o.a.div(['background-color: rgba(0, 0, 0, 0.1);border-radius: 25px;position: relative;span {width: 30px;line-height: 30px;display: inline-block;text-align: center;}&:after {content: "";width: 30px;height: 30px;border-radius: 50%;background-color: rgba(0, 0, 0, 0.75);z-index: -1;position: absolute;top: 0;left: 0;transform: ',";transition: transform .3s ease;}"],function(e){return e.active?"translateX(0)":"translateX(100%)"}),c=o.a.span(["color: ",";transition: color 0.3s ease;"],function(e){return e.active?"#fff":"rgba(0, 0, 0, 0.3)"}),u=function(e){var t=e.isOn,n=e.nodes,a=e.handleSwitch,o=(r(e,["isOn","nodes","handleSwitch"]),t),u=n.map(function(e,t){var n=i.a.createElement(c,{key:t,active:o},e);return o=!o,n});return i.a.createElement(l,{active:t,onClick:function(){return a()}},u)};t.default=u},182:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n(13),c=(n.n(l),o.a.nav(["position: fixed;right: 40px;top: 50%;z-index: 999;"])),u=o.a.ul(["display: block;list-style: none;padding: 0;margin: 0;"]),s=["img/d_home.svg","img/d_info.svg","img/d_skills.svg","img/d_exp.svg"],d=function(e){var t=e.index,n=e.handleClick,a=r(e,["index","handleClick"]),o=s.map(function(e,r){return i.a.createElement(l.HoverLi,{key:r,role:"button",active:r===t,onClick:function(){return n(r)},image:e})});return i.a.createElement(c,a,i.a.createElement(u,null,o))};t.default=d},183:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n(13),c=(n.n(l),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),u=o.a.li(["font-size: 20px;width: 24px;height: 24px;position: relative;margin: 12px auto;em {position: absolute;top 50%;left: 20px;width: 12px;height: 12px;cursor: pointer;border-radius: 50%;background-color: rgba(0, 0, 0, .7);&:hover {transform: scale(3);}&:hover + span {opacity: 1;}&:hover img {opacity: 1;}img {position: absolute;width: 100%;opacity: ",";}transition: transform .3s ease;}"],function(e){return e.active?1:0}),s=function(e){var t=e.image,n=e.active,a=r(e,["image","active"]);return i.a.createElement(u,c({active:n},a),i.a.createElement("em",null,i.a.createElement("img",{alt:"home",src:t})),i.a.createElement(l.Indicator,null,"Home"))};t.default=s},184:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5),a=n.n(r),i=n(6),o=i.a.nav(["position: fixed;top: 0;left: 0;z-index: 999;width: 100%;min-height: 60px;display: flex;justify-content: space-between;align-items: center;background-color: transparent;"]),l=function(e){var t=e.children;return a.a.createElement(o,null,t)};t.default=l},185:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n(13),c=(n.n(l),o.a.div(["padding: 0 3%;"])),u=o.a.a(["text-decoration: none;background: url('./img/logo.jpg') center center no-repeat;background-size: contain;display: block;width: 40px;height: 40px;border-radius: 50%;"]),s=function(e){var t=e.isOn,n=e.handleSwitch,a=r(e,["isOn","handleSwitch"]);return i.a.createElement(l.TopNav,a,i.a.createElement(c,null,i.a.createElement(u,{href:"http://www.github.com/montagy",target:"_blank"})),i.a.createElement(c,null,i.a.createElement(l.DoubleSwitch,{isOn:t,nodes:["CN","EN"],handleSwitch:function(){return n()}})))};t.default=s},186:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n(13),c=(n.n(l),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),u=o.a.div(["color: white;background-color: ",";height: 100%;"],function(e){return e.bgc}),s=o.a.div(["position: absolute;width: 100%;top: 160px;"]),d=o.a.ul(["max-width: 60%;margin: 0 auto;padding: 0;list-style: none;display: flex;justify-content: space-around;li {width: 12.5%;margin: 0 12px;}"]),p=o.a.div(["width: 90px;height: 90px;cursor: pointer;background-color: rgba(255, 255, 255, .1);border-radius: 50%;margin: 0 auto;display: flex;align-items: center;justify-content: center;transition: transform .1s ease-out, background .2s;&:hover {transform: scale(0.93);background-color: rgba(255, 255, 255, .05);}img {width: 50%;}&+div {margin-top: 20px;}"]),f=o.a.div(["margin: 50px 0 0 0;font-size: 18px;line-height: 24px;"]),g=function(e){var t=e.bgc,n=r(e,["bgc"]),a=["img/i_age.svg","img/i_edu.svg","img/i_site.svg","img/i_status.svg"],o=["年龄/26","学历/本科","坐标/成都","状态/在职"],g=a.map(function(e,t){return i.a.createElement("li",{key:t},i.a.createElement("div",null,i.a.createElement(p,null,i.a.createElement("img",{alt:o[t],src:e})),i.a.createElement("div",null,i.a.createElement("span",null,o[t]))))});return i.a.createElement(u,c({bgc:t},n),i.a.createElement(l.Title,{top:"70px"},"关于我"),i.a.createElement(s,null,i.a.createElement(d,null,g),i.a.createElement(f,null,i.a.createElement("p",null,"三年互联网经验，两年半全职前端开发经验"),i.a.createElement("p",null,"熟悉MV*开发，掌握自动化，模块开发之道"),i.a.createElement("p",null,"高效的自学能力，具备独立分析解决问题的能力"),i.a.createElement("p",null,"强烈的自我驱动力，代码强迫症患者"))))};t.default=g},187:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n(13),c=(n.n(l),o.a.div(["height: 100%;background-color: ",";"],function(e){return e.bgc})),u=o.a.div(["position: absolute;top: 160px;width: 100%;"]),s=o.a.div(["margin: 0 auto;"]),d=function(e){var t=r(e,[]);return i.a.createElement(c,t,i.a.createElement(l.Title,{top:"70px"},"To Be Continue"),i.a.createElement(u,null,i.a.createElement(s,null,"My Card"),i.a.createElement("p",null,"2014年初，放弃网络工程师职位，开始前端自学生涯")))};t.default=d},188:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n(13),c=(n.n(l),Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}),u=o.a.div(["height: 100%;padding: 120px 0 0 0;background-color: ",";background-image: ",";"],function(e){return e.bgc||"transparent"},function(e){return e.bgi||"none"}),s=o.a.div(["border-radius: 50%;background-image: url(img/photo.jpg);background-size: contain;width: 150px;height: 150px;margin: 0 auto;"]),d=o.a.div(["max-width: 90%;margin: 0 auto;color: white;"]),p=o.a.p(['font-size: 22px;position: relative;padding: 20px 0;&:after {content: "";position: absolute;left: 10%;right: 10%;bottom: 0;height: 1px;background-color: rgba(255, 255, 255, .6);}']),f=o.a.p(["margin: 24px 0;"]),g=function(e){var t=e.bgc,n=e.bgi,a=r(e,["bgc","bgi"]);return i.a.createElement(u,c({bgc:t,bgi:n},a),i.a.createElement(s,null),i.a.createElement(d,null,i.a.createElement(p,null,"This is a resume,give me some suggest"),i.a.createElement(f,null,"我叫XXX"),i.a.createElement(f,null,"我的工作是xxx"),i.a.createElement(f,null,"联系方式是xxx")))};t.default=g},189:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n(13),c=(n.n(l),o.a.div(["height: 100%;width: 100%;background-color: ",";color: #FFF;"],function(e){return e.bgc})),u=o.a.div(["margin: 100px auto 0 auto;max-width: 800px;display: flex;justify-content: space-between;"]),s=o.a.div(["position: relative;width: 300px;"]),d=function(e){var t=r(e,[]);return i.a.createElement(c,t,i.a.createElement(l.Title,{top:"70px"},"技能栈"),i.a.createElement(u,null,i.a.createElement(s,null,i.a.createElement(l.BigCircleUl,null),i.a.createElement(l.CircleUl,null)),i.a.createElement("div",null,i.a.createElement("p",null,"熟练使用angularJs1.x及各类库的指令封装"),i.a.createElement("p",null,"常驻PC/APP/微信三平台前段开发"),i.a.createElement("p",null,"擅长组件/插件开发，能脱离库书写JS代码"),i.a.createElement("p",null,"编码常思其健壮性，扩展性，维护性"))))};t.default=d},190:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},c=n.i(o.a)("div")(["position: absolute;top: 0;left: 0;width: 100%;height: 100vh;background-image: ",";z-index: ",";text-align: center;overflow: hidden;transform: ",";transition: all 0.3s linear;"],function(e){return e.bgi||"none"},function(e){return e.active?998:-1},function(e){return e.upPage?"translateY(-100%)":e.downPage?"translateY(100%)":"translateY(0)"}),u=function(e){var t=e.bgi,n=e.children,a=r(e,["bgi","children"]);return i.a.createElement(c,l({},a,{bgi:t}),n)};t.default=u},191:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}Object.defineProperty(t,"__esModule",{value:!0});var a=n(5),i=n.n(a),o=n(6),l=n(13),c=(n.n(l),o.a.div([""])),u=o.a.div([""]),s=o.a.div(["height: 100vh;width: 100%;margin: 0 auto;overflow: hidden;position: absolute;"]),d=function(e){var t=e.header,n=e.children,a=e.handleClick,o=e.defaultActive,d=r(e,["header","children","handleClick","defaultActive"]);return i.a.createElement(c,d,i.a.createElement(u,null,t),i.a.createElement(l.FixedNav,{index:o,handleClick:a}),i.a.createElement(s,null,n))};t.default=d},192:function(e,t,n){function r(e){return n(a(e))}function a(e){var t=i[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var i={"./atoms/Indicator/index.jsx":177,"./atoms/Title/index.jsx":178,"./molecules/BigCircleUl/index.jsx":179,"./molecules/CircleUl/index.jsx":180,"./molecules/DoubleSwitch/index.jsx":181,"./molecules/FixedNav/index.jsx":182,"./molecules/HoverLi/index.jsx":183,"./molecules/TopNav/index.jsx":184,"./organisms/Header/index.jsx":185,"./pages/About/index.jsx":186,"./pages/Exp/index.jsx":187,"./pages/Home/index.jsx":188,"./pages/Skills/index.jsx":189,"./templates/PageTemplate/index.jsx":190,"./templates/SliderTemplate/index.jsx":191};r.keys=function(){return Object.keys(i)},r.resolve=a,e.exports=r,r.id=192},193:function(e,t,n){e.exports=n(78)},78:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(5),a=n.n(r),i=n(95),o=(n.n(i),n(176)),l=n(173);n.n(l);n.i(i.render)(a.a.createElement(o.a,null),document.getElementById("app"))}},[193]);