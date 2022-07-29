import{_ as m,r as a,o as _,c as v,b as n,a as e,t as b,e as s,d as i}from"./app.243f5748.js";var g="/BiliTools/assets/win_create_link.3d6cd87c.png",k="/BiliTools/assets/win_setting_args.2c335c34.png",f="/BiliTools/assets/win_start.8f1ec8de.png";const w=n("h2",{id:"\u672C\u5730\u76F4\u63A5\u8FD0\u884C\u6587\u6863",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u672C\u5730\u76F4\u63A5\u8FD0\u884C\u6587\u6863","aria-hidden":"true"},"#"),s(" \u672C\u5730\u76F4\u63A5\u8FD0\u884C\u6587\u6863")],-1),x=n("p",null,"Node.js \u9996\u5148\u9700\u8981\u672C\u5730\u7684\u8FD0\u884C\u73AF\u5883\uFF1A",-1),B={href:"https://nodejs.org/zh-cn/",target:"_blank",rel:"noopener noreferrer"},T=s("\u4E0B\u8F7D Node.js \u957F\u671F\u7EF4\u62A4\u7248"),j={href:"https://www.runoob.com/nodejs/nodejs-install-setup.html",target:"_blank",rel:"noopener noreferrer"},V=s("\u5B89\u88C5\u5230\u7CFB\u7EDF"),y=n("div",{class:"custom-container tip"},[n("p",{class:"custom-container-title"},"\u63D0\u793A"),n("p",null,"\u5982\u679C\u5DF2\u7ECF\u5B89\u88C5\u4E86 node14 \u53CA\u4EE5\u4E0A\u53EF\u4EE5\u8DF3\u8FC7\u6B64\u6B65\u9AA4\u3002")],-1),N={id:"_1-npm-\u5305",tabindex:"-1"},S=n("a",{class:"header-anchor",href:"#_1-npm-\u5305","aria-hidden":"true"},"#",-1),L=s(" 1. npm \u5305 "),M=s(),C=i(`<p>\u5728 cmd \u6216\u8005 terminal \u4E2D\u8FD0\u884C\u4EE5\u4E0B\u547D\u4EE4</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5B89\u88C5</span>
<span class="token function">npm</span> <span class="token function">install</span> -g @catlair/bilitools
<span class="token comment"># \u67E5\u770B\u5E2E\u52A9</span>
bilitools -h
<span class="token comment"># \u6307\u5B9A\u914D\u7F6E\u8DEF\u5F84\u8FD0\u884C</span>
bilitools -c ./config.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u66F4\u65B0\u4EE3\u7801\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g @catlair/bilitools
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5E2E\u52A9\u8BE6\u60C5\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Usage:
  bilitools <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>value<span class="token punctuation">]</span>
  bilitools <span class="token punctuation">[</span>options<span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">[</span>value<span class="token punctuation">]</span>

Options:
  --version, -v             \u8F93\u51FA\u7248\u672C\u53F7
  --help, -h                \u8F93\u51FA\u5E2E\u52A9\u4FE1\u606F
  --config, -c <span class="token operator">&lt;</span>path<span class="token operator">&gt;</span>       \u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84
    eg: --config<span class="token operator">=</span>./config.json
  --once, -o                \u6BCF\u65E5\u4EFB\u52A1\u53EA\u6267\u884C\u4E00\u6B21
  --task, -t <span class="token operator">&lt;</span>taskString<span class="token operator">&gt;</span>   \u6267\u884C\u6307\u5B9A\u7684 task\uFF0C\u4F7F\u7528\u82F1\u6587\u9017\u53F7\uFF08,\uFF09\u5206\u9694
    eg: --task<span class="token operator">=</span>loginTask,judgement
  --item, -i <span class="token operator">&lt;</span>item<span class="token operator">&gt;</span>         \u591A\u7528\u6237\u914D\u7F6E\u6267\u884C\u6307\u5B9A\u7684\u914D\u7F6E\uFF0C\u4E0B\u6807 <span class="token number">1</span> \u5F00\u59CB\uFF08\u5012\u6570 -1 \u5F00\u59CB\uFF09\uFF0C\u4F7F\u7528\u82F1\u6587\u9017\u53F7\uFF08,\uFF09\u5206\u9694
    eg: --item<span class="token operator">=</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF1A\u5F88\u591A\u4EFB\u52A1\uFF08\u7279\u522B\u662F\u9700\u8981\u5224\u65AD\u5927\u4F1A\u5458\u72B6\u6001\u7684\u4EFB\u52A1\uFF09\u9700\u8981\u5148\u6267\u884C <code>loginTask</code> \u4EFB\u52A1\u3002</p>`,7),E=s("\u8BA8\u8BBA\uFF1A"),P={href:"https://github.com/KudouRan/BiliTools/issues/90#issuecomment-1190364619",target:"_blank",rel:"noopener noreferrer"},R=s("https://github.com/KudouRan/BiliTools/issues/90#issuecomment-1190364619"),z=n("h2",{id:"windows-\u4E0B\u5B9A\u65F6\u8FD0\u884C",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#windows-\u4E0B\u5B9A\u65F6\u8FD0\u884C","aria-hidden":"true"},"#"),s(" windows \u4E0B\u5B9A\u65F6\u8FD0\u884C")],-1),D=n("p",null,"linux \u8FD8\u662F\u63A8\u8350\u7528 crontab \u6765\u5B9A\u65F6\u8FD0\u884C\uFF0Cwindows \u4E0B\u4E5F\u53EF\u4EE5\u4F7F\u7528\u7CFB\u7EDF\u4EFB\u52A1\uFF0C\u8FD9\u91CC\u63D0\u4F9B\u53E6\u4E00\u79CD\u65B9\u5F0F\uFF08\u4F9D\u8D56 npm \u65B9\u5F0F\uFF0C\u8BF7\u786E\u8BA4\u4E0A\u9762\u7684\u65B9\u5F0F\u80FD\u591F\u8FD0\u884C\uFF09\u3002",-1),I=n("p",null,[s("\u4E0B\u8F7D "),n("code",null,"cron_bilitools.exe")],-1),K={href:"https://github.com/catlair/cron/releases",target:"_blank",rel:"noopener noreferrer"},U=s("https://github.com/catlair/cron/releases"),W=i('<p>\u9996\u5148\u628A\u6587\u4EF6\u79FB\u52A8\u5230\u5408\u9002\u7684\u5730\u65B9\uFF0C\u4E4B\u540E\u5C31\u4E0D\u8981\u518D\u79FB\u52A8\u4E86\uFF08\u79FB\u52A8\u540E\u91CD\u65B0\u64CD\u4F5C\uFF09\uFF0C\u6240\u4EE5\u4E0D\u63A8\u8350\u653E\u5728\u684C\u9762\u3002</p><ul><li>\u521B\u5EFA\u4E00\u4E2A\u5FEB\u6377\u65B9\u5F0F</li></ul><p><img src="'+g+'" alt="win_create_link"></p><ul><li>\u53F3\u952E\u5C5E\u6027\uFF0C\u7ED9\u5FEB\u6377\u65B9\u5F0F\u8DEF\u5F84\u540E\u9762\u6DFB\u52A0\u4E00\u4E9B\u53C2\u6570</li></ul><p><code>-config=./config/config.json</code> \uFF08\u5FC5\u987B\uFF09\u914D\u7F6E\u6587\u4EF6\u7684\u8DEF\u5F84<br><code>-time=08:08:08</code> \uFF08\u53EF\u9009\uFF09\u6BCF\u5929\u8FD0\u884C\u65F6\u95F4\uFF0C\u9ED8\u8BA4\u4E3A 08:08:00<br><code>-start=false</code> \uFF08\u53EF\u9009\uFF09\u662F\u5426\u7ACB\u5373\u6267\u884C\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8BBE\u7F6E <code>true</code> \u7535\u8111\u5F00\u673A\u7ACB\u5373\u542F\u52A8<br><code>-once=false</code> \uFF08\u53EF\u9009\uFF09\u6BCF\u5929\u53EA\u6267\u884C\u4E00\u6B21\uFF0C\u9ED8\u8BA4\u4E3A false\uFF0C\u8BBE\u7F6E <code>true</code> \u53EA\u6267\u884C\u4E00\u6B21\uFF08\u907F\u514D\u591A\u6B21\u5F00\u5173\u673A\u591A\u6B21\u8FD0\u884C\uFF09</p><p><img src="'+k+`" alt="win_setting_args"></p><ul><li>\u5C06\u5FEB\u6377\u65B9\u5F0F\u79FB\u52A8\u5230\u5F00\u673A\u542F\u52A8\u9879<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>%systemdrive%%homepath%<span class="token punctuation">\\</span>AppData<span class="token punctuation">\\</span>Roaming<span class="token punctuation">\\</span>Microsoft<span class="token punctuation">\\</span>Windows<span class="token punctuation">\\</span>Start Menu<span class="token punctuation">\\</span>Programs<span class="token punctuation">\\</span>Startup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><p><img src="`+f+'" alt="win_start"></p><h2 id="\u53C2\u8003\u89C6\u9891" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u89C6\u9891" aria-hidden="true">#</a> \u53C2\u8003\u89C6\u9891</h2><p>windows \u4E0B\u7684\u5B9A\u65F6\u8FD0\u884C\u65B9\u5F0F\uFF0C\u53EF\u4EE5\u53C2\u8003\u8FD9\u4E2A\u89C6\u9891\uFF1A</p>',10),$=n("h2",{id:"\u914D\u7F6E\u6587\u4EF6",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u914D\u7F6E\u6587\u4EF6","aria-hidden":"true"},"#"),s(" \u914D\u7F6E\u6587\u4EF6")],-1),A={__name:"local.html",setup(O){const l="ghproxy.com",t="v0.0.2",c=`https://${l}/https://github.com/catlair/cron/releases/download/${t}/cron_windows_amd64.tar.gz`;return(q,F)=>{const o=a("ExternalLinkIcon"),r=a("Badge"),p=a("TestedVersion"),d=a("MyLink"),u=a("BilibiliVideo"),h=a("ConfigPath");return _(),v("div",null,[w,x,n("ul",null,[n("li",null,[n("a",B,[T,e(o)])]),n("li",null,[n("a",j,[V,e(o)])])]),y,n("h2",N,[S,L,e(r,{type:"tip",text:"\u63A8\u8350",vertical:"top"}),M,e(p,{type:"npm"})]),C,n("p",null,[E,n("a",P,[R,e(o)])]),z,D,I,e(d,{href:c}),n("p",null,"\u628A "+b(t)+" \u66FF\u6362\u6210\u6700\u65B0\u7684 tag \u540D\u79F0\uFF0C\u4E14\u53EA\u6F14\u793A\u4E86 windows amd64\uFF08x64\uFF09 \u7684\u7248\u672C\uFF0C\u5176\u4ED6\u5E73\u53F0\u8BF7\u81EA\u884C\u4E0B\u8F7D\u3002"),n("p",null,[n("a",K,[U,e(o)])]),W,e(u,{bv:"BV1Na411W7nk"}),$,e(h)])}}};var H=m(A,[["__file","local.html.vue"]]);export{H as default};
