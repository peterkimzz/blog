__NUXT_JSONP__("/vuejs%EB%A1%9C-%ED%81%AC%EB%A1%AC-%ED%99%95%EC%9E%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EA%B0%95%EC%9D%98-1%EB%B6%80", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE,aF,aG,aH,aI,aJ,aK,aL,aM){return {data:[{article:{slug:"vuejs로-크롬-확장-프로그램-만들기-강의-1부",description:"제가 최근 우연히 크롬 확장 프로그램을 개발했는데, 이게 생각보다 꽤 괜찮은 시장이라는 걸 알게 되었습니다.\n크롬 확장 프로그램은 이미 여러분들에게 익숙한 웹 기술로 쉽게 개발할 수 있고, React와 Vue같은 SPA 방식의 프레임워크에 매우매우 잘 어울립니다. 심지어 최초 한 번만 5달러를 지불하면, 평생 무료로 앱 배포가 가능합니다.",category:"tech",title:"Vue.js로 크롬 확장 프로그램 만들기 강의 - 1부",thumbnail:"https:\u002F\u002Fuser-images.githubusercontent.com\u002F20244536\u002F112748762-fd580e80-8ff8-11eb-8fcb-a36b676c7c48.png",updated:ai,created:ai,is_published:true,toc:[{id:aj,depth:E,text:ak},{id:al,depth:E,text:am},{id:an,depth:E,text:ao},{id:ap,depth:E,text:aq},{id:ar,depth:E,text:y},{id:as,depth:E,text:at}],body:{type:au,children:[{type:b,tag:g,props:{},children:[{type:a,value:av}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:aw},{type:b,tag:k,props:{href:ax,rel:[o,p,q],target:r},children:[{type:a,value:ay}]},{type:a,value:az},{type:b,tag:k,props:{href:aA,rel:[o,p,q],target:r},children:[{type:a,value:aB}]},{type:a,value:aC}]},{type:a,value:e},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"때문에 이 강의를 계기로 더욱 많은 사람들이 확장 프로그램을 만들었으면 좋겠다는 취지로 이 강의를 만들게 되었습니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"저는 이 강의에서 등장하는 모든 기술들을 최대한 기초부터 다룰 예정입니다. 이 강의를 끝까지 잘 따라하신다면 이제 막 웹 개발을 시작하시는 분들에게 굉장히 많은 도움이 될겁니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"하지만 여기서 다루는 Vue나 "},{type:b,tag:k,props:{href:"https:\u002F\u002Fwebpack.js.org\u002F",rel:[o,p,q],target:r},children:[{type:a,value:"Webpack"}]},{type:a,value:" 같은 도구들이 완전 초보자용은 아니라서 많이 어려울 수 있습니다만, 최대한 쉽게 설명해보도록 하겠습니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"아 그리고 현재는 리눅스 명령어로만 강의를 진행하므로, WindowsOS 사용자 분들은 bash 커맨드를 입력할 수 있는 환경을 구성해주세요."}]},{type:a,value:e},{type:b,tag:F,props:{id:aj},children:[{type:b,tag:k,props:{href:"#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B8%B0%ED%9A%8D%ED%95%98%EA%B8%B0",ariaHidden:G,tabIndex:H},children:[{type:b,tag:c,props:{className:[I,J]},children:[]}]},{type:a,value:ak}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"본격적으로 코드를 작성하기에 앞서, 어떤 확장 프로그램을 만들지 기획을 먼저 해보도록 하겠습니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"만들고 싶은 앱을 정한 뒤에, 필요한 내용들을 하나씩 배워나가는 게 가장 학습 효과가 좋기 때문입니다. 뭐든지 목표가 있어야 열심히 하게 되니까요."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"그래서 뭘 만들어볼지 이것저것 고민을 많이 했는데, "},{type:b,tag:S,props:{},children:[{type:a,value:"가상화폐 시세 보는 앱"}]},{type:a,value:"을 만들어볼까합니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"이유는 간단합니다. 무료로 데이터를 제공해주는 API가 있기 때문이죠. 공부할 땐 이게 최고입니다."}]},{type:a,value:e},{type:b,tag:F,props:{id:al},children:[{type:b,tag:k,props:{href:"#%EC%82%AC%EC%A0%84-%EC%A4%80%EB%B9%84",ariaHidden:G,tabIndex:H},children:[{type:b,tag:c,props:{className:[I,J]},children:[]}]},{type:a,value:am}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"프로젝트를 구성하기 전에, 몇 가지 프로그램들을 여러분의 컴퓨터에 설치해야합니다."}]},{type:a,value:e},{type:b,tag:"ol",props:{},children:[{type:a,value:e},{type:b,tag:K,props:{},children:[{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:k,props:{href:"https:\u002F\u002Fnodejs.org\u002Fko\u002F",rel:[o,p,q],target:r},children:[{type:a,value:"Node.js"}]},{type:a,value:"가 설치되어 있어야 합니다. 현재 Long Term Support (LTS)인 14 버전 이상을 권장드립니다. Node.js를 정상적으로 설치하게 되면, 터미널에서 "},{type:b,tag:h,props:{},children:[{type:a,value:"node"}]},{type:a,value:" 명령어와 "},{type:b,tag:h,props:{},children:[{type:a,value:X}]},{type:a,value:" 명령어를 사용할 수 있게 됩니다."}]},{type:a,value:e}]},{type:a,value:e},{type:b,tag:K,props:{},children:[{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"코드를 더욱 쉽게 작성하기 위한 코드 에디터가 필요합니다. 저는 "},{type:b,tag:k,props:{href:"https:\u002F\u002Fcode.visualstudio.com\u002F",rel:[o,p,q],target:r},children:[{type:a,value:"VSCode"}]},{type:a,value:"를 사용합니다."}]},{type:a,value:e}]},{type:a,value:e},{type:b,tag:K,props:{},children:[{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"확장 프로그램을 테스트 할 브라우저가 필요합니다. 저는 이 강의에서 "},{type:b,tag:k,props:{href:"https:\u002F\u002Fwww.google.com\u002Fintl\u002Fko\u002Fchrome\u002F",rel:[o,p,q],target:r},children:[{type:a,value:"Chrome"}]},{type:a,value:" 브라우저를 사용하겠습니다."}]},{type:a,value:e}]},{type:a,value:e}]},{type:a,value:e},{type:b,tag:F,props:{id:an},children:[{type:b,tag:k,props:{href:"#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0",ariaHidden:G,tabIndex:H},children:[{type:b,tag:c,props:{className:[I,J]},children:[]}]},{type:a,value:ao}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"설치가 잘 되셨다면 프로젝트를 생성하고 싶은 곳에 폴더를 생성해줍시다. 저는 "},{type:b,tag:h,props:{},children:[{type:a,value:aD}]},{type:a,value:"으로 하겠습니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:"Terminal"}]},{type:a,value:" 응용 프로그램을 켜서 아래 명령어를 입력해주세요."}]},{type:a,value:e},{type:b,tag:v,props:{className:[z]},children:[{type:b,tag:c,props:{className:[R]},children:[{type:a,value:Y}]},{type:b,tag:A,props:{className:[B,Z]},children:[{type:b,tag:h,props:{},children:[{type:a,value:aE},{type:b,tag:c,props:{className:[d,T]},children:[{type:a,value:"mkdir"}]},{type:a,value:aF},{type:b,tag:c,props:{className:[d,"builtin","class-name"]},children:[{type:a,value:"cd"}]},{type:a,value:aF},{type:b,tag:c,props:{className:[d,T]},children:[{type:a,value:X}]},{type:a,value:" init -y\n"}]}]}]},{type:a,value:e},{type:b,tag:aG,props:{},children:[{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"참고로 각 줄 맨 앞에 "},{type:b,tag:h,props:{},children:[{type:a,value:"$"}]},{type:a,value:" 기호는 실제로 입력하는 글자는 아닙니다. 그냥 해당 명령어가 bash 커맨드라는 걸 표기하기 위해 붙입니다."}]},{type:a,value:e}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"위 명령어들을 처음 보시더라도 당황하지 마세요. 설명해드리겠습니다."}]},{type:a,value:e},{type:b,tag:"ul",props:{},children:[{type:a,value:e},{type:b,tag:K,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:"mkdir [폴더명]"}]},{type:a,value:": [폴더명]으로 폴더 생성"}]},{type:a,value:e},{type:b,tag:K,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:"cd [폴더명]"}]},{type:a,value:": [폴더명]으로 디렉토리 이동"}]},{type:a,value:e},{type:b,tag:K,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:X}]},{type:a,value:": Node.js를 설치하면 자동으로 설치되는 노드 패키지 매니저입니다. 일단은 몰라도 됩니다."}]},{type:a,value:e}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"위 명령어들 모두 현재 디렉토리를 기준으로 작동하게 됩니다. 참고하세요."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"여기서 가장 마지막 "},{type:b,tag:h,props:{},children:[{type:a,value:"npm init"}]},{type:a,value:"은 Node 프로젝트를 현재 디렉토리에 만들겠다는 뜻인데, 명령어를 입력해보면 몇 가지를 귀찮게 계속 물어보게 됩니다. 하지만 -y를 같이 넣어주면 그 질문들을 모두 yes로 하겠다는 뜻입니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"이렇게 구성하면 여러분들의 폴더 구조는 이렇습니다."}]},{type:a,value:e},{type:b,tag:v,props:{className:[z]},children:[{type:b,tag:A,props:{className:[B,"language-text"]},children:[{type:b,tag:h,props:{},children:[{type:a,value:"|- vue-extension\u002F\n|-- package.json\n"}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"일단 package.json에 대해 알아보기 전에, 우리에게 UI를 보여줄 "},{type:b,tag:h,props:{},children:[{type:a,value:"HTML"}]},{type:a,value:" 파일을 먼저 만들어보겠습니다. 시작부터 뭐라도 눈에 보여야 더 재밌거든요."}]},{type:a,value:e},{type:b,tag:F,props:{id:ap},children:[{type:b,tag:k,props:{href:"#%EC%B2%AB-%ED%99%94%EB%A9%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0",ariaHidden:G,tabIndex:H},children:[{type:b,tag:c,props:{className:[I,J]},children:[]}]},{type:a,value:aq}]},{type:a,value:e},{type:b,tag:v,props:{className:[z]},children:[{type:b,tag:c,props:{className:[R]},children:[{type:a,value:Y}]},{type:b,tag:A,props:{className:[B,Z]},children:[{type:b,tag:h,props:{},children:[{type:a,value:aE},{type:b,tag:c,props:{className:[d,T]},children:[{type:a,value:U}]},{type:a,value:" index.html\n"}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:U}]},{type:a,value:"는 현재 디렉토리에 [파일명]으로 파일을 생성하겠다는 뜻입니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"자, 그러면 우리의 첫 화면을 보여줄 html 파일을 생성했습니다. 파일명을 index로 짓는 건, 우리 프로젝트 폴더를 배포할 때 컴퓨터가 index.html 이라는 파일을 가장 먼저 찾기 때문입니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"그럼 바로 "},{type:b,tag:h,props:{},children:[{type:a,value:C}]},{type:a,value:" 코드를 작성하겠습니다."}]},{type:a,value:e},{type:b,tag:v,props:{className:[z]},children:[{type:b,tag:c,props:{className:[R]},children:[{type:a,value:_}]},{type:b,tag:A,props:{className:[B,"language-html"]},children:[{type:b,tag:h,props:{},children:[{type:b,tag:c,props:{className:[d,"doctype"]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:"\u003C!"}]},{type:b,tag:c,props:{className:[d,"doctype-tag"]},children:[{type:a,value:"DOCTYPE"}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,$]},children:[{type:a,value:C}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:e},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:C}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,L]},children:[{type:a,value:"lang"}]},{type:b,tag:c,props:{className:[d,M]},children:[{type:b,tag:c,props:{className:[d,f,N]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]},{type:a,value:"ko"},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:aa}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:ab}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,L]},children:[{type:a,value:"charset"}]},{type:b,tag:c,props:{className:[d,M]},children:[{type:b,tag:c,props:{className:[d,f,N]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]},{type:a,value:"UTF-8"},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:ac}]}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:ab}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,L]},children:[{type:a,value:"http-equiv"}]},{type:b,tag:c,props:{className:[d,M]},children:[{type:b,tag:c,props:{className:[d,f,N]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]},{type:a,value:"X-UA-Compatible"},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,L]},children:[{type:a,value:aH}]},{type:b,tag:c,props:{className:[d,M]},children:[{type:b,tag:c,props:{className:[d,f,N]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]},{type:a,value:"IE=edge"},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:ac}]}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:ab}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,L]},children:[{type:a,value:$}]},{type:b,tag:c,props:{className:[d,M]},children:[{type:b,tag:c,props:{className:[d,f,N]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]},{type:a,value:"viewport"},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,L]},children:[{type:a,value:aH}]},{type:b,tag:c,props:{className:[d,M]},children:[{type:b,tag:c,props:{className:[d,f,N]},children:[{type:a,value:O}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]},{type:a,value:"width=device-width, initial-scale=1.0"},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:m}]}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:ac}]}]},{type:a,value:"\n\n    "},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:ad}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:"\n      Vue extension\n    "},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:P}]},{type:a,value:ad}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:P}]},{type:a,value:aa}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:"\n\n  "},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:aI}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:v}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:"\n      "},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:w}]},{type:a,value:aJ}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:"Hello, world!"},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:P}]},{type:a,value:aJ}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:P}]},{type:a,value:v}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:P}]},{type:a,value:aI}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:e},{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,i]},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:P}]},{type:a,value:C}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:l}]}]},{type:a,value:e}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:C}]},{type:a,value:" 별 거 없습니다. "},{type:b,tag:h,props:{},children:[{type:a,value:"\u003C\u003E"}]},{type:a,value:"으로 열어주면, "},{type:b,tag:h,props:{},children:[{type:a,value:"\u003C\u002F\u003E"}]},{type:a,value:" 으로 닫는다, 이것만 기억하세요."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"아무튼 이 파일을 찾아서 실행시켜주면, 현재 사용하고 있는 기본 브라우저가 자동으로 이 "},{type:b,tag:h,props:{},children:[{type:a,value:C}]},{type:a,value:" 파일을 읽어 화면에 보여주게 됩니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:ae,props:{alt:af,src:"https:\u002F\u002Fuser-images.githubusercontent.com\u002F20244536\u002F112429805-86b0dc00-8d80-11eb-8ae8-a1ebf622ef80.png"},children:[]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"방금 작성한 HTML 파일의 "},{type:b,tag:h,props:{},children:[{type:a,value:aa}]},{type:a,value:" 안에 "},{type:b,tag:h,props:{},children:[{type:a,value:ad}]},{type:a,value:" 부분은 페이지의 제목이 됩니다. 보통 브라우저는 해당 페이지의 제목을 위 사진처럼 탭에 표시해줍니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"그리고 이 제목은 구글이나 네이버 등 검색 엔진이 검색 결과를 보여줄 때 가장 높은 점수를 주는 항목입니다. 알아두세요."}]},{type:a,value:e},{type:b,tag:F,props:{id:ar},children:[{type:b,tag:k,props:{href:"#manifestjson",ariaHidden:G,tabIndex:H},children:[{type:b,tag:c,props:{className:[I,J]},children:[]}]},{type:a,value:y}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"우리가 만들고 싶은 건 확장 프로그램입니다. 웹사이트가 아닙니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"확장 프로그램을 만들기 위해선 프로젝트에 "},{type:b,tag:k,props:{href:"https:\u002F\u002Fdeveloper.chrome.com\u002Fdocs\u002Fextensions\u002Fmv3\u002Fgetstarted\u002F#manifest",rel:[o,p,q],target:r},children:[{type:b,tag:h,props:{},children:[{type:a,value:y}]}]},{type:a,value:" 이라는 파일이 있어야 합니다. 크롬, 웨일, 엣지 등 크로미움 기반 브라우저라면 모두 이 파일 하나로 확장 프로그램을 실행시킬 수 있습니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:ag}]},{type:a,value:" 파일은 "},{type:b,tag:h,props:{},children:[{type:a,value:"{}"}]},{type:a,value:" 안에 원하는 값들을 넣어주는 단순 데이터를 저장하는 포맷입니다. 예시를 보시죠."}]},{type:a,value:e},{type:b,tag:v,props:{className:[z]},children:[{type:b,tag:A,props:{className:[B,aK]},children:[{type:b,tag:h,props:{},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:V}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"key1\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"\"value1\""}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:Q}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"key2\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:V}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"key2-1\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"\"value2-1\""}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:Q}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"key2-2\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"\"value2-2\""}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,"comment"]},children:[{type:a,value:"\u002F\u002F ..."}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:W}]},{type:a,value:e},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:W}]},{type:a,value:e}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"왼쪽에는 키를, 오른쪽엔 값을 넣으면 됩니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"이후 어떤 값을 찾으려고 할 때, 왼쪽에 있는 "},{type:b,tag:h,props:{},children:[{type:a,value:"key"}]},{type:a,value:"를 이용해 원하는 "},{type:b,tag:h,props:{},children:[{type:a,value:"value"}]},{type:a,value:"를 찾게 됩니다. "},{type:b,tag:h,props:{},children:[{type:a,value:ag}]},{type:a,value:" 파일은 이게 다입니다. 너무 쉽죠?"}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"현재 아주 많은 곳에서 쓰이고, 데이터를 저장하는 아주 중요한 포맷이니 기억해두세요."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"json에 대해 간략히 배웠으니, 아까 배운 "},{type:b,tag:h,props:{},children:[{type:a,value:U}]},{type:a,value:"를 이용해 파일을 만들어봅시다."}]},{type:a,value:e},{type:b,tag:v,props:{className:[z]},children:[{type:b,tag:c,props:{className:[R]},children:[{type:a,value:Y}]},{type:b,tag:A,props:{className:[B,Z]},children:[{type:b,tag:h,props:{},children:[{type:b,tag:c,props:{className:[d,T]},children:[{type:a,value:U}]},{type:a,value:" manifest.json\n"}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"물론 폴더에 마우스 우클릭해서 파일을 만들어 줄 수도 있지만, 검은 화면에 리눅스 명령어를 입력하는 것에 익숙해져보세요. 나중에 큰 도움이 됩니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"아무튼 확장 프로그램을 구성하겠다는 설정 파일인 이 "},{type:b,tag:h,props:{},children:[{type:a,value:y}]},{type:a,value:" 파일은, "},{type:b,tag:S,props:{},children:[{type:a,value:"버전"}]},{type:a,value:"이라는 게 있습니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"현재 최신 버전은 "},{type:b,tag:h,props:{},children:[{type:a,value:ah}]},{type:a,value:"이고, 이 버전으로 작성된 확장 프로그램은 올해 1월부터 크롬 웹스토어에 정식 등록이 가능합니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"지금 당장 자신이 만들 프로그램이 "},{type:b,tag:k,props:{href:"https:\u002F\u002Fchrome.google.com\u002Fwebstore\u002Fcategory\u002Fextensions",rel:[o,p,q],target:r},children:[{type:a,value:"크롬 웹스토어"}]},{type:a,value:"에만 올라갈 예정이라면, 버전 "},{type:b,tag:h,props:{},children:[{type:a,value:ah}]},{type:a,value:"으로 작성해도 됩니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"하지만 웨일 등 다른 브라우저의 자체 스토어에도 올릴 예정이라면, 버전 "},{type:b,tag:h,props:{},children:[{type:a,value:"2"}]},{type:a,value:"로 작성해야합니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"이유는 "},{type:b,tag:h,props:{},children:[{type:a,value:"manifest version 3 (MV3)"}]},{type:a,value:"는 "},{type:b,tag:h,props:{},children:[{type:a,value:"Chrome 88"}]},{type:a,value:" 버전 이상에서만 동작하기 때문입니다. 최신 버전의 웨일은 현재 88 버전 아래이기 때문에 "},{type:b,tag:h,props:{},children:[{type:a,value:"MV3"}]},{type:a,value:"로 작성한 확장 프로그램은 인식하지 못합니다."}]},{type:a,value:e},{type:b,tag:aG,props:{},children:[{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Manifest V3 is available beginning with Chrome 88, and the Chrome Web Store begins accepting MV3 extensions in January 2021."}]},{type:a,value:e}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:aL}]},{type:a,value:"로 작성한다고 해서 크롬 웹스토어에 올리지 못하는 건 아닙니다. 하지만 언제까지 "},{type:b,tag:h,props:{},children:[{type:a,value:aL}]},{type:a,value:" 앱 제출을 허용해줄지 모르기 때문에, 자신의 프로젝트 상황에 맞게 버전을 선택하세요."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"어쨌든 바로 "},{type:b,tag:h,props:{},children:[{type:a,value:y}]},{type:a,value:"을 작성해보도록 하겠습니다."}]},{type:a,value:e},{type:b,tag:v,props:{className:[z]},children:[{type:b,tag:c,props:{className:[R]},children:[{type:a,value:y}]},{type:b,tag:A,props:{className:[B,aK]},children:[{type:b,tag:h,props:{},children:[{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:V}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"name\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"\"Vue extension\""}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:Q}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"description\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"\"My extension app made by Vue.js\""}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:Q}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"version\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"\"0.0.1\""}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:Q}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"manifest_version\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,"number"]},children:[{type:a,value:ah}]},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:Q}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"action\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:V}]},{type:a,value:x},{type:b,tag:c,props:{className:[d,s]},children:[{type:a,value:"\"default_popup\""}]},{type:b,tag:c,props:{className:[d,t]},children:[{type:a,value:u}]},{type:a,value:j},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"\"index.html\""}]},{type:a,value:n},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:W}]},{type:a,value:e},{type:b,tag:c,props:{className:[d,f]},children:[{type:a,value:W}]},{type:a,value:e}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:$}]},{type:a,value:"과 "},{type:b,tag:h,props:{},children:[{type:a,value:"description"}]},{type:a,value:" 부분은 이후 앱 배포시 웹 스토어에 노출, 검색되는 가장 중요한 항목이므로, 앱을 잘 소개하는 문구로 작성하세요."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:h,props:{},children:[{type:a,value:"action.default_popup"}]},{type:a,value:" 은 확장 프로그램을 눌렀을 때, 기본적으로 뜨게 될 팝업 창입니다. 우리는 아까 만들었던 "},{type:b,tag:h,props:{},children:[{type:a,value:_}]},{type:a,value:" 파일을 지정하면 됩니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"자, 여기까지 하면 끝입니다. 이제 우리 프로젝트가 확장 프로그램으로써 역할을 하는 겁니다. 별 거 없죠?"}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"테스트를 위해 브라우저에 "},{type:b,tag:h,props:{},children:[{type:a,value:"chrome:\u002F\u002Fextensions"}]},{type:a,value:"를 복사, 붙여넣기 해서 확장 프로그램 관리 페이지로 이동합니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:ae,props:{alt:af,src:"https:\u002F\u002Fuser-images.githubusercontent.com\u002F20244536\u002F112747868-0a71ff00-8ff3-11eb-8f83-1be19507a58e.png"},children:[]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"여기서 오른쪽 상단 "},{type:b,tag:S,props:{},children:[{type:a,value:"개발자 모드"}]},{type:a,value:"를 활성화 하면 3개의 버튼이 생깁니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"여기에 "},{type:b,tag:S,props:{},children:[{type:a,value:"압축해제된 확장 프로그램을 로드합니다."}]},{type:a,value:" 버튼을 눌러 우리 프로젝트인 "},{type:b,tag:h,props:{},children:[{type:a,value:aD}]},{type:a,value:"을 선택해주세요."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"그럼 테스트 가능한 상태가 되며, 확장 프로그램을 눌러보면 우리가 작성한 "},{type:b,tag:h,props:{},children:[{type:a,value:_}]},{type:a,value:" 페이지가 보입니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:b,tag:ae,props:{alt:af,src:"https:\u002F\u002Fuser-images.githubusercontent.com\u002F20244536\u002F112747952-a7349c80-8ff3-11eb-9b43-2ccfe9e37c6e.png"},children:[]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"다만 확장 프로그램은 브라우저에 띄우는 것과는 달리, 브라우저 위에 작게 뜨는 형태라 큰 사이즈로 보이진 않습니다."}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"직접 설정하더라도, 최대로 설정 가능한 폭은 "},{type:b,tag:h,props:{},children:[{type:a,value:"width: 800px"}]},{type:a,value:", 높이는 "},{type:b,tag:h,props:{},children:[{type:a,value:"height: 600px"}]},{type:a,value:" 입니다. 그 이상의 크기는 무시됩니다."}]},{type:a,value:e},{type:b,tag:F,props:{id:as},children:[{type:b,tag:k,props:{href:"#1%EB%B6%80-%EB%A7%88%EB%AC%B4%EB%A6%AC",ariaHidden:G,tabIndex:H},children:[{type:b,tag:c,props:{className:[I,J]},children:[]}]},{type:a,value:at}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"여기까지 웹 페이지를 구성하는 "},{type:b,tag:h,props:{},children:[{type:a,value:C}]},{type:a,value:", 데이터를 저장하는 포맷인 "},{type:b,tag:h,props:{},children:[{type:a,value:ag}]},{type:a,value:"과 크롬 확장 프로그램을 구성하는 설정 파일인 "},{type:b,tag:h,props:{},children:[{type:a,value:y}]},{type:a,value:" 대해 아주 간략하게 배웠습니다."}]}]},excerpt:{type:au,children:[{type:b,tag:g,props:{},children:[{type:a,value:av}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:aw},{type:b,tag:k,props:{href:ax,rel:[o,p,q],target:r},children:[{type:a,value:ay}]},{type:a,value:az},{type:b,tag:k,props:{href:aA,rel:[o,p,q],target:r},children:[{type:a,value:aB}]},{type:a,value:aC}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002Fvuejs로-크롬-확장-프로그램-만들기-강의-1부",extension:".md",createdAt:aM,updatedAt:aM}}],fetch:{},mutations:void 0}}("text","element","span","token","\n","punctuation","p","code","tag"," ","a","\u003E","\"","\n  ","nofollow","noopener","noreferrer","_blank","property","operator",":","div","\u003C","\n    ","manifest.json","nuxt-content-highlight","pre","line-numbers","html","string",2,"h2","true",-1,"icon","icon-link","li","attr-name","attr-value","attr-equals","=","\u003C\u002F",",","filename","strong","function","touch","{","}","npm","bash","language-bash","index.html","name","head","meta","\u002F\u003E","title","img","","json","3","2021-03-28T00:00:00.000Z","프로젝트-기획하기","프로젝트 기획하기","사전-준비","사전 준비","프로젝트-구성하기","프로젝트 구성하기","첫-화면-만들기","첫 화면 만들기","manifestjson","1부-마무리","1부 마무리","root","제가 최근 우연히 크롬 확장 프로그램을 개발했는데, 이게 생각보다 꽤 괜찮은 시장이라는 걸 알게 되었습니다.","크롬 확장 프로그램은 이미 여러분들에게 익숙한 웹 기술로 쉽게 개발할 수 있고, ","https:\u002F\u002Freactjs.org\u002F","React","와 ","https:\u002F\u002Fvuejs.org\u002F","Vue","같은 SPA 방식의 프레임워크에 매우매우 잘 어울립니다. 심지어 최초 한 번만 5달러를 지불하면, 평생 무료로 앱 배포가 가능합니다.","vue-extension","$ "," vue-extension\n$ ","blockquote","content","body","h1","language-json","MV2","2021-05-14T02:23:05.373Z")));