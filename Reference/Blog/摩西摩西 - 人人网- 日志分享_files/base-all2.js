(function(){
var _1,_2,_3,_4,_5={},_6={},_7=/\\/g;
var _8=function(_9,_a){
if(_9==null){
return null;
}
if(_9.Slick===true){
return _9;
}
_9=(""+_9).replace(/^\s+|\s+$/g,"");
_4=!!_a;
var _b=(_4)?_6:_5;
if(_b[_9]){
return _b[_9];
}
_1={Slick:true,expressions:[],raw:_9,reverse:function(){
return _8(this.raw,true);
}};
_2=-1;
while(_9!=(_9=_9.replace(_c,parser))){
}
_1.length=_1.expressions.length;
return _b[_9]=(_4)?_d(_1):_1;
};
var _e=function(_f){
if(_f==="!"){
return " ";
}else{
if(_f===" "){
return "!";
}else{
if((/^!/).test(_f)){
return _f.replace(/^!/,"");
}else{
return "!"+_f;
}
}
}
};
var _d=function(_10){
var _11=_10.expressions;
for(var i=0;i<_11.length;i++){
var exp=_11[i];
var _14={parts:[],tag:"*",combinator:_e(exp[0].combinator)};
for(var j=0;j<exp.length;j++){
var _16=exp[j];
if(!_16.reverseCombinator){
_16.reverseCombinator=" ";
}
_16.combinator=_16.reverseCombinator;
delete _16.reverseCombinator;
}
exp.reverse().push(_14);
}
return _10;
};
var _17=function(_18){
return _18.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,"\\$&");
};
var _c=new RegExp("^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|:+(<unicode>+)(?:\\((?:(?:([\"'])([^\\12]*)\\12)|((?:\\([^)]+\\)|[^()]*)+))\\))?)".replace(/<combinator>/,"["+_17(">+~`!@$%^&={}\\;</")+"]").replace(/<unicode>/g,"(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g,"(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])"));
function parser(_19,_1a,_1b,_1c,_1d,id,_1f,_20,_21,_22,_23,_24,_25,_26,_27){
if(_1a||_2===-1){
_1.expressions[++_2]=[];
_3=-1;
if(_1a){
return "";
}
}
if(_1b||_1c||_3===-1){
_1b=_1b||" ";
var _28=_1.expressions[_2];
if(_4&&_28[_3]){
_28[_3].reverseCombinator=_e(_1b);
}
_28[++_3]={combinator:_1b,tag:"*"};
}
var _29=_1.expressions[_2][_3];
if(_1d){
_29.tag=_1d.replace(_7,"");
}else{
if(id){
_29.id=id.replace(_7,"");
}else{
if(_1f){
_1f=_1f.replace(_7,"");
if(!_29.classList){
_29.classList=[];
}
if(!_29.classes){
_29.classes=[];
}
_29.classList.push(_1f);
_29.classes.push({value:_1f,regexp:new RegExp("(^|\\s)"+_17(_1f)+"(\\s|$)")});
}else{
if(_24){
_27=_27||_26;
_27=_27?_27.replace(_7,""):null;
if(!_29.pseudos){
_29.pseudos=[];
}
_29.pseudos.push({key:_24.replace(_7,""),value:_27});
}else{
if(_20){
_20=_20.replace(_7,"");
_23=(_23||"").replace(_7,"");
var _2a,_c;
switch(_21){
case "^=":
_c=new RegExp("^"+_17(_23));
break;
case "$=":
_c=new RegExp(_17(_23)+"$");
break;
case "~=":
_c=new RegExp("(^|\\s)"+_17(_23)+"(\\s|$)");
break;
case "|=":
_c=new RegExp("^"+_17(_23)+"(-|$)");
break;
case "=":
_2a=function(_2b){
return _23==_2b;
};
break;
case "*=":
_2a=function(_2c){
return _2c&&_2c.indexOf(_23)>-1;
};
break;
case "!=":
_2a=function(_2d){
return _23!=_2d;
};
break;
default:
_2a=function(_2e){
return !!_2e;
};
}
if(_23==""&&(/^[*$^]=$/).test(_21)){
_2a=function(){
return false;
};
}
if(!_2a){
_2a=function(_2f){
return _2f&&_c.test(_2f);
};
}
if(!_29.attributes){
_29.attributes=[];
}
_29.attributes.push({key:_20,operator:_21,value:_23,test:_2a});
}
}
}
}
}
return "";
}
var _30=(this.Slick||{});
_30.parse=function(_31){
return _8(_31);
};
_30.escapeRegExp=_17;
if(!this.Slick){
this.Slick=_30;
}
}).apply((typeof exports!="undefined")?exports:this);
(function(){
var _32=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,_33=0,_34=Object.prototype.toString,_35=false,_36=true;
[0,0].sort(function(){
_36=false;
return 0;
});
var _37=function(_38,_39,_3a,_3b){
_3a=_3a||[];
_39=_39||document;
var _3c=_39;
if(_39.nodeType!==1&&_39.nodeType!==9){
return [];
}
if(!_38||typeof _38!=="string"){
return _3a;
}
var m,set,_3f,_40,ret,cur,pop,i,_45=true,_46=_37.isXML(_39),_47=[],_48=_38;
do{
_32.exec("");
m=_32.exec(_48);
if(m){
_48=m[3];
_47.push(m[1]);
if(m[2]){
_40=m[3];
break;
}
}
}while(m);
if(_47.length>1&&_49.exec(_38)){
if(_47.length===2&&_4a.relative[_47[0]]){
set=_4b(_47[0]+_47[1],_39);
}else{
set=_4a.relative[_47[0]]?[_39]:_37(_47.shift(),_39);
while(_47.length){
_38=_47.shift();
if(_4a.relative[_38]){
_38+=_47.shift();
}
set=_4b(_38,set);
}
}
}else{
if(!_3b&&_47.length>1&&_39.nodeType===9&&!_46&&_4a.match.ID.test(_47[0])&&!_4a.match.ID.test(_47[_47.length-1])){
ret=_37.find(_47.shift(),_39,_46);
_39=ret.expr?_37.filter(ret.expr,ret.set)[0]:ret.set[0];
}
if(_39){
ret=_3b?{expr:_47.pop(),set:_4c(_3b)}:_37.find(_47.pop(),_47.length===1&&(_47[0]==="~"||_47[0]==="+")&&_39.parentNode?_39.parentNode:_39,_46);
set=ret.expr?_37.filter(ret.expr,ret.set):ret.set;
if(_47.length>0){
_3f=_4c(set);
}else{
_45=false;
}
while(_47.length){
cur=_47.pop();
pop=cur;
if(!_4a.relative[cur]){
cur="";
}else{
pop=_47.pop();
}
if(pop==null){
pop=_39;
}
_4a.relative[cur](_3f,pop,_46);
}
}else{
_3f=_47=[];
}
}
if(!_3f){
_3f=set;
}
if(!_3f){
_37.error(cur||_38);
}
if(_34.call(_3f)==="[object Array]"){
if(!_45){
_3a.push.apply(_3a,_3f);
}else{
if(_39&&_39.nodeType===1){
for(i=0;_3f[i]!=null;i++){
if(_3f[i]&&(_3f[i]===true||_3f[i].nodeType===1&&_37.contains(_39,_3f[i]))){
_3a.push(set[i]);
}
}
}else{
for(i=0;_3f[i]!=null;i++){
if(_3f[i]&&_3f[i].nodeType===1){
_3a.push(set[i]);
}
}
}
}
}else{
_4c(_3f,_3a);
}
if(_40){
_37(_40,_3c,_3a,_3b);
_37.uniqueSort(_3a);
}
return _3a;
};
_37.uniqueSort=function(_4d){
if(_4e){
_35=_36;
_4d.sort(_4e);
if(_35){
for(var i=1;i<_4d.length;i++){
if(_4d[i]===_4d[i-1]){
_4d.splice(i--,1);
}
}
}
}
return _4d;
};
_37.matches=function(_50,set){
return _37(_50,null,null,set);
};
_37.matchesSelector=function(_52,_53){
return _37(_53,null,null,[_52]).length>0;
};
_37.find=function(_54,_55,_56){
var set;
if(!_54){
return [];
}
for(var i=0,l=_4a.order.length;i<l;i++){
var _5a,_5b=_4a.order[i];
if((_5a=_4a.leftMatch[_5b].exec(_54))){
var _5c=_5a[1];
_5a.splice(1,1);
if(_5c.substr(_5c.length-1)!=="\\"){
_5a[1]=(_5a[1]||"").replace(/\\/g,"");
set=_4a.find[_5b](_5a,_55,_56);
if(set!=null){
_54=_54.replace(_4a.match[_5b],"");
break;
}
}
}
}
if(!set){
set=_55.getElementsByTagName("*");
}
return {set:set,expr:_54};
};
_37.filter=function(_5d,set,_5f,not){
var _61,_62,old=_5d,_64=[],_65=set,_66=set&&set[0]&&_37.isXML(set[0]);
while(_5d&&set.length){
for(var _67 in _4a.filter){
if((_61=_4a.leftMatch[_67].exec(_5d))!=null&&_61[2]){
var _68,_69,_6a=_4a.filter[_67],_6b=_61[1];
_62=false;
_61.splice(1,1);
if(_6b.substr(_6b.length-1)==="\\"){
continue;
}
if(_65===_64){
_64=[];
}
if(_4a.preFilter[_67]){
_61=_4a.preFilter[_67](_61,_65,_5f,_64,not,_66);
if(!_61){
_62=_68=true;
}else{
if(_61===true){
continue;
}
}
}
if(_61){
for(var i=0;(_69=_65[i])!=null;i++){
if(_69){
_68=_6a(_69,_61,i,_65);
var _6d=not^!!_68;
if(_5f&&_68!=null){
if(_6d){
_62=true;
}else{
_65[i]=false;
}
}else{
if(_6d){
_64.push(_69);
_62=true;
}
}
}
}
}
if(_68!==undefined){
if(!_5f){
_65=_64;
}
_5d=_5d.replace(_4a.match[_67],"");
if(!_62){
return [];
}
break;
}
}
}
if(_5d===old){
if(_62==null){
_37.error(_5d);
}else{
break;
}
}
old=_5d;
}
return _65;
};
_37.error=function(msg){
throw "Syntax error, unrecognized expression: "+msg;
};
var _4a=_37.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(_6f){
return _6f.getAttribute("href");
}},relative:{"+":function(_70,_71){
var _72=typeof _71==="string",_73=_72&&!/\W/.test(_71),_74=_72&&!_73;
if(_73){
_71=_71.toLowerCase();
}
for(var i=0,l=_70.length,_77;i<l;i++){
if((_77=_70[i])){
while((_77=_77.previousSibling)&&_77.nodeType!==1){
}
_70[i]=_74||_77&&_77.nodeName.toLowerCase()===_71?_77||false:_77===_71;
}
}
if(_74){
_37.filter(_71,_70,true);
}
},">":function(_78,_79){
var _7a,_7b=typeof _79==="string",i=0,l=_78.length;
if(_7b&&!/\W/.test(_79)){
_79=_79.toLowerCase();
for(;i<l;i++){
_7a=_78[i];
if(_7a){
var _7e=_7a.parentNode;
_78[i]=_7e.nodeName.toLowerCase()===_79?_7e:false;
}
}
}else{
for(;i<l;i++){
_7a=_78[i];
if(_7a){
_78[i]=_7b?_7a.parentNode:_7a.parentNode===_79;
}
}
if(_7b){
_37.filter(_79,_78,true);
}
}
},"":function(_7f,_80,_81){
var _82,_83=_33++,_84=dirCheck;
if(typeof _80==="string"&&!/\W/.test(_80)){
_80=_80.toLowerCase();
_82=_80;
_84=dirNodeCheck;
}
_84("parentNode",_80,_83,_7f,_82,_81);
},"~":function(_85,_86,_87){
var _88,_89=_33++,_8a=dirCheck;
if(typeof _86==="string"&&!/\W/.test(_86)){
_86=_86.toLowerCase();
_88=_86;
_8a=dirNodeCheck;
}
_8a("previousSibling",_86,_89,_85,_88,_87);
}},find:{ID:function(_8b,_8c,_8d){
if(typeof _8c.getElementById!=="undefined"&&!_8d){
var m=_8c.getElementById(_8b[1]);
return m&&m.parentNode?[m]:[];
}
},NAME:function(_8f,_90){
if(typeof _90.getElementsByName!=="undefined"){
var ret=[],_92=_90.getElementsByName(_8f[1]);
for(var i=0,l=_92.length;i<l;i++){
if(_92[i].getAttribute("name")===_8f[1]){
ret.push(_92[i]);
}
}
return ret.length===0?null:ret;
}
},TAG:function(_95,_96){
return _96.getElementsByTagName(_95[1]);
}},preFilter:{CLASS:function(_97,_98,_99,_9a,not,_9c){
_97=" "+_97[1].replace(/\\/g,"")+" ";
if(_9c){
return _97;
}
for(var i=0,_9e;(_9e=_98[i])!=null;i++){
if(_9e){
if(not^(_9e.className&&(" "+_9e.className+" ").replace(/[\t\n\r]/g," ").indexOf(_97)>=0)){
if(!_99){
_9a.push(_9e);
}
}else{
if(_99){
_98[i]=false;
}
}
}
}
return false;
},ID:function(_9f){
return _9f[1].replace(/\\/g,"");
},TAG:function(_a0,_a1){
return _a0[1].toLowerCase();
},CHILD:function(_a2){
if(_a2[1]==="nth"){
if(!_a2[2]){
_37.error(_a2[0]);
}
_a2[2]=_a2[2].replace(/^\+|\s*/g,"");
var _a3=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(_a2[2]==="even"&&"2n"||_a2[2]==="odd"&&"2n+1"||!/\D/.test(_a2[2])&&"0n+"+_a2[2]||_a2[2]);
_a2[2]=(_a3[1]+(_a3[2]||1))-0;
_a2[3]=_a3[3]-0;
}else{
if(_a2[2]){
_37.error(_a2[0]);
}
}
_a2[0]=_33++;
return _a2;
},ATTR:function(_a4,_a5,_a6,_a7,not,_a9){
var _aa=_a4[1].replace(/\\/g,"");
if(!_a9&&_4a.attrMap[_aa]){
_a4[1]=_4a.attrMap[_aa];
}
if(_a4[2]==="~="){
_a4[4]=" "+_a4[4]+" ";
}
return _a4;
},PSEUDO:function(_ab,_ac,_ad,_ae,not){
if(_ab[1]==="not"){
if((_32.exec(_ab[3])||"").length>1||/^\w/.test(_ab[3])){
_ab[3]=_37(_ab[3],null,null,_ac);
}else{
var ret=_37.filter(_ab[3],_ac,_ad,true^not);
if(!_ad){
_ae.push.apply(_ae,ret);
}
return false;
}
}else{
if(_4a.match.POS.test(_ab[0])||_4a.match.CHILD.test(_ab[0])){
return true;
}
}
return _ab;
},POS:function(_b1){
_b1.unshift(true);
return _b1;
}},filters:{enabled:function(_b2){
return _b2.disabled===false&&_b2.type!=="hidden";
},disabled:function(_b3){
return _b3.disabled===true;
},checked:function(_b4){
return _b4.checked===true;
},selected:function(_b5){
_b5.parentNode.selectedIndex;
return _b5.selected===true;
},parent:function(_b6){
return !!_b6.firstChild;
},empty:function(_b7){
return !_b7.firstChild;
},has:function(_b8,i,_ba){
return !!_37(_ba[3],_b8).length;
},header:function(_bb){
return (/h\d/i).test(_bb.nodeName);
},text:function(_bc){
return "text"===_bc.type;
},radio:function(_bd){
return "radio"===_bd.type;
},checkbox:function(_be){
return "checkbox"===_be.type;
},file:function(_bf){
return "file"===_bf.type;
},password:function(_c0){
return "password"===_c0.type;
},submit:function(_c1){
return "submit"===_c1.type;
},image:function(_c2){
return "image"===_c2.type;
},reset:function(_c3){
return "reset"===_c3.type;
},button:function(_c4){
return "button"===_c4.type||_c4.nodeName.toLowerCase()==="button";
},input:function(_c5){
return (/input|select|textarea|button/i).test(_c5.nodeName);
}},setFilters:{first:function(_c6,i){
return i===0;
},last:function(_c8,i,_ca,_cb){
return i===_cb.length-1;
},even:function(_cc,i){
return i%2===0;
},odd:function(_ce,i){
return i%2===1;
},lt:function(_d0,i,_d2){
return i<_d2[3]-0;
},gt:function(_d3,i,_d5){
return i>_d5[3]-0;
},nth:function(_d6,i,_d8){
return _d8[3]-0===i;
},eq:function(_d9,i,_db){
return _db[3]-0===i;
}},filter:{PSEUDO:function(_dc,_dd,i,_df){
var _e0=_dd[1],_e1=_4a.filters[_e0];
if(_e1){
return _e1(_dc,i,_dd,_df);
}else{
if(_e0==="contains"){
return (_dc.textContent||_dc.innerText||_37.getText([_dc])||"").indexOf(_dd[3])>=0;
}else{
if(_e0==="not"){
var not=_dd[3];
for(var j=0,l=not.length;j<l;j++){
if(not[j]===_dc){
return false;
}
}
return true;
}else{
_37.error(_e0);
}
}
}
},CHILD:function(_e5,_e6){
var _e7=_e6[1],_e8=_e5;
switch(_e7){
case "only":
case "first":
while((_e8=_e8.previousSibling)){
if(_e8.nodeType===1){
return false;
}
}
if(_e7==="first"){
return true;
}
_e8=_e5;
case "last":
while((_e8=_e8.nextSibling)){
if(_e8.nodeType===1){
return false;
}
}
return true;
case "nth":
var _e9=_e6[2],_ea=_e6[3];
if(_e9===1&&_ea===0){
return true;
}
var _eb=_e6[0],_ec=_e5.parentNode;
if(_ec&&(_ec.sizcache!==_eb||!_e5.nodeIndex)){
var _ed=0;
for(_e8=_ec.firstChild;_e8;_e8=_e8.nextSibling){
if(_e8.nodeType===1){
_e8.nodeIndex=++_ed;
}
}
_ec.sizcache=_eb;
}
var _ee=_e5.nodeIndex-_ea;
if(_e9===0){
return _ee===0;
}else{
return (_ee%_e9===0&&_ee/_e9>=0);
}
}
},ID:function(_ef,_f0){
return _ef.nodeType===1&&_ef.getAttribute("id")===_f0;
},TAG:function(_f1,_f2){
return (_f2==="*"&&_f1.nodeType===1)||_f1.nodeName.toLowerCase()===_f2;
},CLASS:function(_f3,_f4){
return (" "+(_f3.className||_f3.getAttribute("class"))+" ").indexOf(_f4)>-1;
},ATTR:function(_f5,_f6){
var _f7=_f6[1],_f8=_4a.attrHandle[_f7]?_4a.attrHandle[_f7](_f5):_f5[_f7]!=null?_f5[_f7]:_f5.getAttribute(_f7),_f9=_f8+"",_fa=_f6[2],_fb=_f6[4];
return _f8==null?_fa==="!=":_fa==="="?_f9===_fb:_fa==="*="?_f9.indexOf(_fb)>=0:_fa==="~="?(" "+_f9+" ").indexOf(_fb)>=0:!_fb?_f9&&_f8!==false:_fa==="!="?_f9!==_fb:_fa==="^="?_f9.indexOf(_fb)===0:_fa==="$="?_f9.substr(_f9.length-_fb.length)===_fb:_fa==="|="?_f9===_fb||_f9.substr(0,_fb.length+1)===_fb+"-":false;
},POS:function(_fc,_fd,i,_ff){
var name=_fd[2],_101=_4a.setFilters[name];
if(_101){
return _101(_fc,i,_fd,_ff);
}
}}};
var _49=_4a.match.POS,_102=function(all,num){
return "\\"+(num-0+1);
};
for(var type in _4a.match){
_4a.match[type]=new RegExp(_4a.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
_4a.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+_4a.match[type].source.replace(/\\(\d+)/g,_102));
}
var _4c=function(_106,_107){
_106=Array.prototype.slice.call(_106,0);
if(_107){
_107.push.apply(_107,_106);
return _107;
}
return _106;
};
try{
Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;
}
catch(e){
_4c=function(_108,_109){
var i=0,ret=_109||[];
if(_34.call(_108)==="[object Array]"){
Array.prototype.push.apply(ret,_108);
}else{
if(typeof _108.length==="number"){
for(var l=_108.length;i<l;i++){
ret.push(_108[i]);
}
}else{
for(;_108[i];i++){
ret.push(_108[i]);
}
}
}
return ret;
};
}
var _4e,_10d;
if(document.documentElement.compareDocumentPosition){
_4e=function(a,b){
if(a===b){
_35=true;
return 0;
}
if(!a.compareDocumentPosition||!b.compareDocumentPosition){
return a.compareDocumentPosition?-1:1;
}
return a.compareDocumentPosition(b)&4?-1:1;
};
}else{
_4e=function(a,b){
var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;
if(a===b){
_35=true;
return 0;
}else{
if(aup===bup){
return _10d(a,b);
}else{
if(!aup){
return -1;
}else{
if(!bup){
return 1;
}
}
}
}
while(cur){
ap.unshift(cur);
cur=cur.parentNode;
}
cur=bup;
while(cur){
bp.unshift(cur);
cur=cur.parentNode;
}
al=ap.length;
bl=bp.length;
for(var i=0;i<al&&i<bl;i++){
if(ap[i]!==bp[i]){
return _10d(ap[i],bp[i]);
}
}
return i===al?_10d(a,bp[i],-1):_10d(ap[i],b,1);
};
_10d=function(a,b,ret){
if(a===b){
return ret;
}
var cur=a.nextSibling;
while(cur){
if(cur===b){
return -1;
}
cur=cur.nextSibling;
}
return 1;
};
}
_37.getText=function(_11e){
var ret="",elem;
for(var i=0;_11e[i];i++){
elem=_11e[i];
if(elem.nodeType===3||elem.nodeType===4){
ret+=elem.nodeValue;
}else{
if(elem.nodeType!==8){
ret+=_37.getText(elem.childNodes);
}
}
}
return ret;
};
(function(){
var form=document.createElement("div"),id="script"+(new Date()).getTime(),root=document.documentElement;
form.innerHTML="<a name='"+id+"'/>";
root.insertBefore(form,root.firstChild);
if(document.getElementById(id)){
_4a.find.ID=function(_125,_126,_127){
if(typeof _126.getElementById!=="undefined"&&!_127){
var m=_126.getElementById(_125[1]);
return m?m.id===_125[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===_125[1]?[m]:undefined:[];
}
};
_4a.filter.ID=function(elem,_12a){
var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
return elem.nodeType===1&&node&&node.nodeValue===_12a;
};
}
root.removeChild(form);
root=form=null;
})();
(function(){
var div=document.createElement("div");
div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length>0){
_4a.find.TAG=function(_12d,_12e){
var _12f=_12e.getElementsByTagName(_12d[1]);
if(_12d[1]==="*"){
var tmp=[];
for(var i=0;_12f[i];i++){
if(_12f[i].nodeType===1){
tmp.push(_12f[i]);
}
}
_12f=tmp;
}
return _12f;
};
}
div.innerHTML="<a href='#'></a>";
if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){
_4a.attrHandle.href=function(elem){
return elem.getAttribute("href",2);
};
}
div=null;
})();
if(document.querySelectorAll){
(function(){
var _133=_37,div=document.createElement("div"),id="__sizzle__";
div.innerHTML="<p class='TEST'></p>";
if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){
return;
}
_37=function(_136,_137,_138,seed){
_137=_137||document;
_136=_136.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!seed&&!_37.isXML(_137)){
if(_137.nodeType===9){
try{
return _4c(_137.querySelectorAll(_136),_138);
}
catch(qsaError){
}
}else{
if(_137.nodeType===1&&_137.nodeName.toLowerCase()!=="object"){
var old=_137.getAttribute("id"),nid=old||id,_13c=_137.parentNode,_13d=/^\s*[+~]/.test(_136);
if(!old){
_137.setAttribute("id",nid);
}else{
nid=nid.replace(/'/g,"\\$&");
}
if(_13d&&_13c){
_137=_137.parentNode;
}
try{
if(!_13d||_13c){
return _4c(_137.querySelectorAll("[id='"+nid+"'] "+_136),_138);
}
}
catch(pseudoError){
}
finally{
if(!old){
_137.removeAttribute("id");
}
}
}
}
}
return _133(_136,_137,_138,seed);
};
for(var prop in _133){
_37[prop]=_133[prop];
}
div=null;
})();
}
(function(){
var html=document.documentElement,_140=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector,_141=false;
try{
_140.call(document.documentElement,"[test!='']:sizzle");
}
catch(pseudoError){
_141=true;
}
if(_140){
_37.matchesSelector=function(node,expr){
expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!_37.isXML(node)){
try{
if(_141||!_4a.match.PSEUDO.test(expr)&&!/!=/.test(expr)){
return _140.call(node,expr);
}
}
catch(e){
}
}
return _37(expr,null,null,[node]).length>0;
};
}
})();
(function(){
var div=document.createElement("div");
div.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){
return;
}
div.lastChild.className="e";
if(div.getElementsByClassName("e").length===1){
return;
}
_4a.order.splice(1,0,"CLASS");
_4a.find.CLASS=function(_145,_146,_147){
if(typeof _146.getElementsByClassName!=="undefined"&&!_147){
return _146.getElementsByClassName(_145[1]);
}
};
div=null;
})();
function dirNodeCheck(dir,cur,_14a,_14b,_14c,_14d){
for(var i=0,l=_14b.length;i<l;i++){
var elem=_14b[i];
if(elem){
var _151=false;
elem=elem[dir];
while(elem){
if(elem.sizcache===_14a){
_151=_14b[elem.sizset];
break;
}
if(elem.nodeType===1&&!_14d){
elem.sizcache=_14a;
elem.sizset=i;
}
if(elem.nodeName.toLowerCase()===cur){
_151=elem;
break;
}
elem=elem[dir];
}
_14b[i]=_151;
}
}
}
function dirCheck(dir,cur,_154,_155,_156,_157){
for(var i=0,l=_155.length;i<l;i++){
var elem=_155[i];
if(elem){
var _15b=false;
elem=elem[dir];
while(elem){
if(elem.sizcache===_154){
_15b=_155[elem.sizset];
break;
}
if(elem.nodeType===1){
if(!_157){
elem.sizcache=_154;
elem.sizset=i;
}
if(typeof cur!=="string"){
if(elem===cur){
_15b=true;
break;
}
}else{
if(_37.filter(cur,[elem]).length>0){
_15b=elem;
break;
}
}
}
elem=elem[dir];
}
_155[i]=_15b;
}
}
}
if(document.documentElement.contains){
_37.contains=function(a,b){
return a!==b&&(a.contains?a.contains(b):true);
};
}else{
if(document.documentElement.compareDocumentPosition){
_37.contains=function(a,b){
return !!(a.compareDocumentPosition(b)&16);
};
}else{
_37.contains=function(){
return false;
};
}
}
_37.isXML=function(elem){
var _161=(elem?elem.ownerDocument||elem:0).documentElement;
return _161?_161.nodeName!=="HTML":false;
};
var _4b=function(_162,_163){
var _164,_165=[],_166="",root=_163.nodeType?[_163]:_163;
while((_164=_4a.match.PSEUDO.exec(_162))){
_166+=_164[0];
_162=_162.replace(_4a.match.PSEUDO,"");
}
_162=_4a.relative[_162]?_162+"*":_162;
for(var i=0,l=root.length;i<l;i++){
_37(_162,root[i],_165);
}
return _37.filter(_166,_165);
};
window.Sizzle=_37;
})();
var Mustache=function(){
var _16a=function(){
};
_16a.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":true},context:{},render:function(_16b,_16c,_16d,_16e){
if(!_16e){
this.context=_16c;
this.buffer=[];
}
if(!this.includes("",_16b)){
if(_16e){
return _16b;
}else{
this.send(_16b);
return;
}
}
_16b=this.render_pragmas(_16b);
var html=this.render_section(_16b,_16c,_16d);
if(_16e){
return this.render_tags(html,_16c,_16d,_16e);
}
this.render_tags(html,_16c,_16d,_16e);
},send:function(line){
if(line!=""){
this.buffer.push(line);
}
},render_pragmas:function(_171){
if(!this.includes("%",_171)){
return _171;
}
var that=this;
var _173=new RegExp(this.otag+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+this.ctag);
return _171.replace(_173,function(_174,_175,_176){
if(!that.pragmas_implemented[_175]){
throw ({message:"This implementation of mustache doesn't understand the '"+_175+"' pragma"});
}
that.pragmas[_175]={};
if(_176){
var opts=_176.split("=");
that.pragmas[_175][opts[0]]=opts[1];
}
return "";
});
},render_partial:function(name,_179,_17a){
name=this.trim(name);
if(!_17a||_17a[name]===undefined){
throw ({message:"unknown_partial '"+name+"'"});
}
if(typeof (_179[name])!="object"){
return this.render(_17a[name],_179,_17a,true);
}
return this.render(_17a[name],_179[name],_17a,true);
},render_section:function(_17b,_17c,_17d){
if(!this.includes("#",_17b)&&!this.includes("^",_17b)){
return _17b;
}
var that=this;
var _17f=new RegExp(this.otag+"(\\^|\\#)\\s*(.+)\\s*"+this.ctag+"\n*([\\s\\S]+?)"+this.otag+"\\/\\s*\\2\\s*"+this.ctag+"\\s*","mg");
return _17b.replace(_17f,function(_180,type,name,_183){
var _184=that.find(name,_17c);
if(type=="^"){
if(!_184||that.is_array(_184)&&_184.length===0){
return that.render(_183,_17c,_17d,true);
}else{
return "";
}
}else{
if(type=="#"){
if(that.is_array(_184)){
return that.map(_184,function(row){
return that.render(_183,that.create_context(row),_17d,true);
}).join("");
}else{
if(that.is_object(_184)){
return that.render(_183,that.create_context(_184),_17d,true);
}else{
if(typeof _184==="function"){
return _184.call(_17c,_183,function(text){
return that.render(text,_17c,_17d,true);
});
}else{
if(_184){
return that.render(_183,_17c,_17d,true);
}else{
return "";
}
}
}
}
}
}
});
},render_tags:function(_187,_188,_189,_18a){
var that=this;
var _18c=function(){
return new RegExp(that.otag+"(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?"+that.ctag+"+","g");
};
var _18d=_18c();
var _18e=function(_18f,_190,name){
switch(_190){
case "!":
return "";
case "=":
that.set_delimiters(name);
_18d=_18c();
return "";
case ">":
return that.render_partial(name,_188,_189);
case "{":
return that.find(name,_188);
default:
return that.escape(that.find(name,_188));
}
};
var _192=_187.split("\n");
for(var i=0;i<_192.length;i++){
_192[i]=_192[i].replace(_18d,_18e,this);
if(!_18a){
this.send(_192[i]);
}
}
if(_18a){
return _192.join("\n");
}
},set_delimiters:function(_194){
var dels=_194.split(" ");
this.otag=this.escape_regex(dels[0]);
this.ctag=this.escape_regex(dels[1]);
},escape_regex:function(text){
if(!arguments.callee.sRE){
var _197=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];
arguments.callee.sRE=new RegExp("(\\"+_197.join("|\\")+")","g");
}
return text.replace(arguments.callee.sRE,"\\$1");
},find:function(name,_199){
name=this.trim(name);
function is_kinda_truthy(bool){
return bool===false||bool===0||bool;
}
var _19b;
if(is_kinda_truthy(_199[name])){
_19b=_199[name];
}else{
if(is_kinda_truthy(this.context[name])){
_19b=this.context[name];
}
}
if(typeof _19b==="function"){
return _19b.apply(_199);
}
if(_19b!==undefined){
return _19b;
}
return "";
},includes:function(_19c,_19d){
return _19d.indexOf(this.otag+_19c)!=-1;
},escape:function(s){
s=String(s===null?"":s);
return s.replace(/&(?!\w+;)|["'<>\\]/g,function(s){
switch(s){
case "&":
return "&amp;";
case "\\":
return "\\\\";
case "\"":
return "&quot;";
case "'":
return "&#39;";
case "<":
return "&lt;";
case ">":
return "&gt;";
default:
return s;
}
});
},create_context:function(_1a0){
if(this.is_object(_1a0)){
return _1a0;
}else{
var _1a1=".";
if(this.pragmas["IMPLICIT-ITERATOR"]){
_1a1=this.pragmas["IMPLICIT-ITERATOR"].iterator;
}
var ctx={};
ctx[_1a1]=_1a0;
return ctx;
}
},is_object:function(a){
return a&&typeof a=="object";
},is_array:function(a){
return Object.prototype.toString.call(a)==="[object Array]";
},trim:function(s){
return s.replace(/^\s*|\s*$/g,"");
},map:function(_1a6,fn){
if(typeof _1a6.map=="function"){
return _1a6.map(fn);
}else{
var r=[];
var l=_1a6.length;
for(var i=0;i<l;i++){
r.push(fn(_1a6[i]));
}
return r;
}
}};
return ({name:"mustache.js",version:"0.3.1-dev",to_html:function(_1ab,view,_1ad,_1ae){
var _1af=new _16a();
if(_1ae){
_1af.send=_1ae;
}
_1af.render(_1ab,view,_1ad);
if(!_1ae){
return _1af.buffer.join("\n");
}
}});
}();
if(!this.JSON){
this.JSON={};
}
(function(){
"use strict";
function f(n){
return n<10?"0"+n:n;
}
if(typeof Date.prototype.toJSON!=="function"){
Date.prototype.toJSON=function(key){
return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null;
};
String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){
return this.valueOf();
};
}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_1b4=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,_1b6,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"},rep;
function quote(_1b9){
_1b4.lastIndex=0;
return _1b4.test(_1b9)?"\""+_1b9.replace(_1b4,function(a){
var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
})+"\"":"\""+_1b9+"\"";
}
function str(key,_1bd){
var i,k,v,_1c1,mind=gap,_1c3,_1c4=_1bd[key];
if(_1c4&&typeof _1c4==="object"&&typeof _1c4.toJSON==="function"){
_1c4=_1c4.toJSON(key);
}
if(typeof rep==="function"){
_1c4=rep.call(_1bd,key,_1c4);
}
switch(typeof _1c4){
case "string":
return quote(_1c4);
case "number":
return isFinite(_1c4)?String(_1c4):"null";
case "boolean":
case "null":
return String(_1c4);
case "object":
if(!_1c4){
return "null";
}
gap+=_1b6;
_1c3=[];
if(Object.prototype.toString.apply(_1c4)==="[object Array]"){
_1c1=_1c4.length;
for(i=0;i<_1c1;i+=1){
_1c3[i]=str(i,_1c4)||"null";
}
v=_1c3.length===0?"[]":gap?"[\n"+gap+_1c3.join(",\n"+gap)+"\n"+mind+"]":"["+_1c3.join(",")+"]";
gap=mind;
return v;
}
if(rep&&typeof rep==="object"){
_1c1=rep.length;
for(i=0;i<_1c1;i+=1){
k=rep[i];
if(typeof k==="string"){
v=str(k,_1c4);
if(v){
_1c3.push(quote(k)+(gap?": ":":")+v);
}
}
}
}else{
for(k in _1c4){
if(Object.hasOwnProperty.call(_1c4,k)){
v=str(k,_1c4);
if(v){
_1c3.push(quote(k)+(gap?": ":":")+v);
}
}
}
}
v=_1c3.length===0?"{}":gap?"{\n"+gap+_1c3.join(",\n"+gap)+"\n"+mind+"}":"{"+_1c3.join(",")+"}";
gap=mind;
return v;
}
}
if(typeof JSON.stringify!=="function"){
JSON.stringify=function(_1c5,_1c6,_1c7){
var i;
gap="";
_1b6="";
if(typeof _1c7==="number"){
for(i=0;i<_1c7;i+=1){
_1b6+=" ";
}
}else{
if(typeof _1c7==="string"){
_1b6=_1c7;
}
}
rep=_1c6;
if(_1c6&&typeof _1c6!=="function"&&(typeof _1c6!=="object"||typeof _1c6.length!=="number")){
throw new Error("JSON.stringify");
}
return str("",{"":_1c5});
};
}
if(typeof JSON.parse!=="function"){
JSON.parse=function(text,_1ca){
var j;
function walk(_1cc,key){
var k,v,_1d0=_1cc[key];
if(_1d0&&typeof _1d0==="object"){
for(k in _1d0){
if(Object.hasOwnProperty.call(_1d0,k)){
v=walk(_1d0,k);
if(v!==undefined){
_1d0[k]=v;
}else{
delete _1d0[k];
}
}
}
}
return _1ca.call(_1cc,key,_1d0);
}
text=String(text);
cx.lastIndex=0;
if(cx.test(text)){
text=text.replace(cx,function(a){
return "\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){
j=eval("("+text+")");
return typeof _1ca==="function"?walk({"":j},""):j;
}
throw new SyntaxError("JSON.parse");
};
}
}());
Object.keys=function(o){
var _1d3=[];
if(o===undefined||o===null){
return _1d3;
}
for(var name in o){
if(o.hasOwnProperty(name)){
_1d3.push(name);
}
}
if(o.call!==undefined&&o.call!==Function.prototype.call&&_1d3.indexOf("call")===-1){
_1d3.push("call");
}
return _1d3;
};
Array.isArray=Array.isArray||function(o){
return Object.prototype.toString.call(o)==="[object Array]";
};
Array.prototype.forEach=Array.prototype.forEach||function(fn,bind){
for(var i=0;i<this.length;i++){
fn.call(bind,this[i],i,this);
}
};
Array.prototype.indexOf=Array.prototype.indexOf||function(str){
for(var i=0;i<this.length;i++){
if(str===this[i]){
return i;
}
}
return -1;
};
Array.prototype.some=Array.prototype.some||function(fn,bind){
for(var i=0,l=this.length;i<l;i++){
if((i in this)&&fn.call(bind,this[i],i,this)){
return true;
}
}
return false;
};
Array.prototype.every=Array.prototype.every||function(fn,bind){
for(var i=0,l=this.length;i<l;i++){
if((i in this)&&!fn.call(bind,this[i],i,this)){
return false;
}
}
return true;
};
Array.prototype.map=Array.prototype.map||function(fn,bind){
var _1e5=[];
for(var i=0,l=this.length;i<l;i++){
if(i in this){
_1e5[i]=fn.call(bind,this[i],i,this);
}
}
return _1e5;
};
Array.prototype.filter=Array.prototype.filter||function(fn,bind){
var _1ea=[];
for(var i=0,l=this.length;i<l;i++){
if((i in this)&&fn.call(bind,this[i],i,this)){
_1ea.push(this[i]);
}
}
return _1ea;
};
Array.prototype.reduce=Array.prototype.reduce||function(fun){
"use strict";
if(this===undefined||this===null){
throw new TypeError();
}
var t=Object(this);
var len=t.length>>>0;
if(typeof fun!=="function"){
throw new TypeError();
}
if(len===0&&arguments.length==1){
throw new TypeError();
}
var k=0;
var _1f1;
if(arguments.length>=2){
_1f1=arguments[1];
}else{
do{
if(k in t){
_1f1=t[k++];
break;
}
if(++k>=len){
throw new TypeError();
}
}while(true);
}
while(k<len){
if(k in t){
_1f1=fun.call(undefined,_1f1,t[k],k,t);
}
k++;
}
return _1f1;
};
Array.prototype.reduceRight=Array.prototype.reduceRight||function(_1f2){
"use strict";
if(this===undefined||this===null){
throw new TypeError();
}
var t=Object(this);
var len=t.length>>>0;
if(typeof _1f2!=="function"){
throw new TypeError();
}
if(len===0&&arguments.length===1){
throw new TypeError();
}
var k=len-1;
var _1f6;
if(arguments.length>=2){
_1f6=arguments[1];
}else{
do{
if(k in this){
_1f6=this[k--];
break;
}
if(--k<0){
throw new TypeError();
}
}while(true);
}
while(k>=0){
if(k in t){
_1f6=_1f2.call(undefined,_1f6,t[k],k,t);
}
k--;
}
return _1f6;
};
String.prototype.trim=String.prototype.trim||function(){
return this.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
if(!Function.prototype.bind||Function.prototype.bind===window.__hualuOldBind){
Function.prototype.bind=function(_1f7){
var _1f8=this;
var args=Array.prototype.slice.call(arguments,1);
return function(){
return _1f8.apply(_1f7,args.concat(Array.prototype.slice.call(arguments)));
};
};
}
var object=(function(_1fa){
var _1fb=function(){
};
if((function TEST(){
}).name){
Function.__get_name__=function(func){
return func.name;
};
}else{
var _1fd=/(?:^|\()function ([\w$]+)/;
Function.__get_name__=function(func){
var _1ff=_1fd.exec(func.toString());
if(_1ff){
return _1ff[1];
}
return "";
};
}
var _200=function(prop,dest,src){
return !(prop in dest);
};
_1fb.extend=function(obj,_205,ov){
var _207=null;
if(typeof ov=="function"){
_207=ov;
}else{
if(ov===true||typeof ov==="undefined"){
}else{
_207=_200;
}
}
for(var _208 in _205){
if(_207&&!_207(_208,obj,_205)){
continue;
}
try{
obj[_208]=_205[_208];
}
catch(e){
}
}
if(_205&&_205.hasOwnProperty("call")&&(!_207||_207(obj,_205,"call"))){
obj.call=_205.call;
}
return obj;
};
_1fb.clone=function(obj){
var _20a={};
for(var key in obj){
_20a[key]=obj[key];
}
return _20a;
};
_1fb.bind=function(host){
_1fb.extend(host,_1fb);
};
_1fb._loader=null;
return _1fb;
})(window);
(function(_20d){
var _20e=true;
for(var i in {toString:1}){
_20e=null;
}
if(_20e){
_20e=["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];
}
var _210=function(func,_212){
return function(a,b){
if(a===null){
return this;
}
if(_212||typeof a!="string"){
for(var k in a){
func.call(this,k,a[k]);
}
if(_20e){
for(var i=_20e.length;i>0;i--){
k=_20e[i];
if(a.hasOwnProperty(k)){
func.call(this,k,a[k]);
}
}
}
}else{
func.call(this,a,b);
}
return this;
};
};
var _217=function(name,bind){
var _21a=Object.__getattribute__(this,name);
if(bind!==false&&_21b.isMethod(_21a)){
bind=bind||this;
return _21a.bind(bind);
}
return _21a;
};
var _21c=_210(function(prop,_21e){
if("__setattr__" in this){
this.__setattr__(prop,_21e);
}else{
Object.__setattr__(this,prop,_21e);
}
});
var _21f=function(name,bind){
var _222=Type.__getattribute__(this,name);
if(bind!==false&&_21b.isMethod(_222)){
bind=bind||this;
return _222.bind(bind);
}
return _222;
};
var _224=function(name){
if(name=="@mixins"){
name="__mixins__";
}
var _226=this.prototype;
var _227=_226.__properties__;
return (name in this||name in _226||(_227&&name in _227));
};
var _228=_210(function(name,_22a){
if("__metaclass__" in this){
Type.__getattribute__(this.__metaclass__,"__setattr__").call(this.__metaclass__,this,name,_22a);
}else{
Type.__setattr__(this,name,_22a);
}
});
var _22b=function(prop,_22d){
this[prop]=_22d;
};
var _22e=function(){
return this.__subclassesarray__;
};
var _22f=function(cls,name,args){
if(!name){
throw new Error("can not get function name when this.parent called");
}
var _233=cls;
while(_233&&!_233.prototype.hasOwnProperty(name)){
_233=_233.__base__;
}
var base=_233.__base__;
var _235=_233.__mixins__;
var _236,_237;
if(base&&base.get&&base.has(name)){
_237=base;
_236=Type.__getattribute__(base,name);
}else{
if(_235&&_235.length&&_235.some(function(_238){
_237=_238;
return _238.has(name);
})){
_236=Type.__getattribute__(_237,name);
}
}
if(!_236||typeof _236!="function"){
throw new Error("no such method in parent : '"+name+"'");
}else{
return _236.apply(_237,args);
}
};
function renameCheck(func,prop,_23b){
if(prop==="__name__"&&func[prop]&&func[prop]!==_23b){
if(typeof console!="undefined"&&console.warn){
console.warn("\u8bf7\u4e0d\u8981\u5c06\u540c\u4e00\u4e2a\u65b9\u6cd5\u8d4b\u503c\u7ed9\u591a\u4e2a\u7c7b\u6210\u5458\uff1a"+func[prop]+" --> "+_23b);
}
}
}
var _23c=function(func,self){
var _23f;
var _240;
if(self===false){
_23f=function(self){
return this.prototype[func.__name__].im_func.apply(this.__this__,arguments);
};
}else{
_23f=function(){
var args=[].slice.call(arguments,0);
if(self===true){
if(typeof this=="function"){
_240=this;
}else{
_240=this.__class__;
}
}else{
_240=this;
}
args.unshift(_240);
return func.apply(this.__this__,args);
};
}
_23f.im_self=self;
_23f.__class__=arguments.callee;
_23f.im_func=func;
_23f.__setattr__=function(prop,_244){
renameCheck(func,prop,_244);
this[prop]=_244;
};
return _23f;
};
var _245=this.staticmethod=function(func){
return {__class__:arguments.callee,im_func:func,__setattr__:function(prop,_248){
renameCheck(this,prop,_248);
this[prop]=_248;
}};
};
var _249=this.classmethod=function(func,_24b){
var obj={__class__:arguments.callee,im_func:func,__setattr__:function(prop,_24e){
renameCheck(this,prop,_24e);
this[prop]=_24e;
}};
return obj;
};
var _24f=this.property=function(fget,fset){
var p={};
p.__class__=arguments.callee;
p.__setattr__=function(prop,_254){
renameCheck(this,prop,_254);
this[prop]=_254;
};
p.fget=fget;
p.fset=fset;
return p;
};
var _255=function(_256,_257){
var cls=new _21b(function(){
for(var i=0,l=_257.length;i<l;i++){
this[_257[i]]=(function(name){
return function(){
return _256.prototype[name].apply(arguments[0],[].slice.call(arguments,1));
};
})(_257[i]);
}
});
return cls;
};
var _25c=(function(){
if(!Array.push){
return false;
}
var a=function(){
};
a.prototype=new Array;
var b=new a;
b.push(null);
return !!b.length;
})();
var _25f,_260;
Object.__getattribute__=function(obj,name){
var _263=obj.__properties__["prop_"+name]||obj.__properties__[name];
if(_263){
if(_263.fget){
return _263.fget.call(obj.__this__,obj);
}else{
throw new Error("get not allowed property "+name);
}
}else{
if(name in obj){
return obj[name];
}else{
if(obj.__getattr__){
return obj.__getattr__.call(obj,name);
}else{
return undefined;
}
}
}
};
Object.__setattr__=_20d.__setattr__=function(obj,prop,_266){
var _267=null;
if(obj.__properties__){
_267=obj.__properties__["prop_"+prop]||obj.__properties__[prop];
}
if(!_267){
obj[prop]=_266;
}else{
if(_267.fset){
_267.fset.call(obj.__this__,obj,_266);
}else{
throw "set not allowed property "+prop;
}
}
};
Object.__new__=function(cls){
if(cls===Array||cls===String){
return new cls;
}
cls.__prototyping__=true;
var _269=new cls();
delete cls.__prototyping__;
return _269;
};
var Type=this.Type=this.type=function(){
};
Type.__class__=Type;
Type.__new__=function(_26a,name,base,dict){
var cls=function(){
if(cls.__prototyping__){
return this;
}
if(cls.__constructs__){
return cls.__constructs__(arguments);
}else{
this.__class__=cls;
_21b.initMixins(cls,this);
var _26f=this.initialize?this.initialize.apply(this,arguments):null;
return _26f;
}
};
cls.__subclassesarray__=[];
cls.__subclasses__=_22e;
cls.__classbasedmethods__=[];
if(_20d.runtime){
cls.__module__=_20d.runtime.stack[_20d.runtime.stack.length-1].id;
}else{
cls.__module__="";
}
cls.set=cls.__mixin__=_228;
cls.get=_21f;
cls.has=_224;
cls.__metaclass__=_26a;
cls.__class__=_26a;
cls.__new__=base.__new__;
cls.__dict__=dict;
cls.__constructs__=base.__constructs__||null;
if(base!==Object&&base!==Type){
(base.__classbasedmethods__||[]).forEach(function(name){
cls[name]=base[name];
cls.__classbasedmethods__.push(name);
});
}
cls.__constructing__=true;
cls.prototype=Object.__new__(base);
cls.prototype.constructor=cls;
if(base.__subclassesarray__){
base.__subclassesarray__.push(cls);
}
var _271=cls.prototype;
var _272=_271.__properties__||{};
_271.__properties__=_20d.extend({},_272);
Type.__setattr__(cls,"__setattr__",Type.__getattribute__(base,"__setattr__"));
Type.__setattr__(cls,"__base__",base);
Type.__setattr__(cls,"__this__",{base:base,parent:function(){
return _22f(cls,arguments.callee.caller.__name__,arguments);
}});
for(var k in dict){
Type.__setattr__(cls,k,dict[k]);
}
var _274=cls.__mixins__;
if(_274){
_274.forEach(function(_275){
_21b.keys(_275).forEach(function(name){
if(cls.has(name)){
return;
}
var _277=Type.__getattribute__(_275,name);
Type.__setattr__(cls,name,_277);
});
});
}
cls.prototype.get=_217;
cls.prototype.set=_21c;
cls.prototype._set=_22b;
delete cls.__constructing__;
return cls;
};
var _278=["__mixins__","__new__","__this__","__base__"],_279=["__new__","__metaclass__","__mixins__"],_27a=["__this__","__base__"];
Type.__setattr__=function(cls,name,_27d){
if(name=="@mixins"){
name="__mixins__";
}
if(_278.indexOf(name)!=-1){
if(!_27d||(typeof _27d!="object"&&typeof _27d!="function")){
return;
}
}
var _27e=cls.prototype,_27f=_27e.__properties__,subs=cls.__subclassesarray__,_281=cls.__constructing__;
delete cls[name];
delete _27e[name];
delete _27f[name];
if(_279.indexOf(name)!=-1){
if(_27d&&(typeof _27d=="object"||typeof _27d=="function")){
cls[name]=_27d;
}
}else{
if(_27a.indexOf(name)!=-1){
cls[name]=_27e[name]=_27d;
}else{
if(_27d==null){
_27e[name]=_27d;
}else{
if(_27d.__class__===undefined&&typeof _27d=="function"){
_27e[name]=_23c(_27d);
_27e[name].__setattr__("__name__",name);
_27d.__name__=name;
if(name=="initialize"){
cls[name]=_23c(_27d,false);
}
}else{
if(_27d.__class__===_24f){
_27d.__setattr__("__name__",name);
_27f[name]=_27d;
_27e[name]=undefined;
}else{
if(_27d.__class__===_23c){
_27e[name]=_23c(_27d.im_func);
if(_27d.im_self==true){
cls[name]=_27d;
}
}else{
if(_27d.__class__===_249){
_27d.__setattr__("__name__",name);
_27d.im_func.__name__=name;
cls[name]=_27e[name]=_23c(_27d.im_func,true);
cls.__classbasedmethods__.push(name);
}else{
if(_27d.__class__===_245){
_27d.__setattr__("__name__",name);
_27d.im_func.__name__=name;
cls[name]=_27e[name]=_27d.im_func;
cls.__classbasedmethods__.push(name);
}else{
if(_21b.instanceOf(_27d,Type)){
cls[name]=_27e[name]=_27d;
}else{
_27e[name]=_27d;
}
}
}
}
}
}
}
}
}
if(!_281&&name in cls&&subs){
subs.forEach(function(sub){
if(!(name in sub)){
Type.__setattr__(sub,name,_27d);
}
});
}
};
Type.__delattr__=function(cls,name){
delete cls[name];
delete cls.prototype[name];
delete cls.prototype.__properties__[name];
};
Type.__getattribute__=function(cls,name){
if(name=="@mixins"){
name="__mixins__";
}
var _287=cls.prototype;
var _288=_287.__properties__;
var _289=cls.__metaclass__;
var _28a;
if(name in cls){
_28a=cls[name];
}else{
if(_288&&_288[name]!==undefined){
_28a=_288[name];
}else{
if(_287[name]&&_287[name].__class__==_23c){
cls[name]=_28a=_23c(_287[name].im_func,false);
}else{
if(_289&&(_28a=Type.__getattribute__(_289,name))!==undefined){
if(_28a.__class__===_23c){
_28a=_23c(_28a.im_func,true);
}
cls[name]=_28a;
}else{
_28a=_287[name];
}
}
}
}
return _28a;
};
Type.__constructs__=function(args){
var _28c=args.length;
if(_28c<1){
throw new Error("bad arguments");
}
var name=null;
var base=_28c>1?args[0]:Object;
if(typeof base!="function"&&typeof base!="object"){
throw new Error("base is not function or object");
}
if(base){
if(!_25c){
if(base===Array){
base=_25f;
}else{
if(base===String){
base=_260;
}
}
}
}
var dict=args[_28c-1],_290;
if(typeof dict!="function"&&typeof dict!="object"){
throw new Error("constructor is not function or object");
}
if(dict instanceof Function){
_290=dict;
dict={};
_290.call(dict);
}
var _291;
if(this===Object){
_291=dict.__metaclass__||base.__metaclass__||Type;
}else{
_291=this;
}
var cls=_291.__new__(_291,name,base,dict);
if(!cls||typeof cls!="function"){
throw new Error("__new__ method should return cls");
}
Type.__getattribute__(_291,"initialize").call(_291,cls,name,base,dict);
return cls;
};
Type.initialize=function(){
};
Object.__class__=Type;
var _21b=this.Class=function(){
return Type.__constructs__.call(Object,arguments);
};
_21b.initMixins=function(cls,_294){
if(!cls){
return;
}
if(cls.__base__){
_21b.initMixins(cls.__base__,_294);
}
var _295=cls.__mixins__;
if(_295){
_294.__this__.mixining=true;
for(var i=0,l=_295.length,_298;i<l;i++){
_298=_295[i];
if(_298.prototype&&typeof _298.prototype.initialize=="function"){
_298.prototype.initialize.call(_294);
}
}
delete _294.__this__.mixining;
}
};
_21b.mixin=function(dict,cls){
if(!dict||typeof dict!="object"){
return;
}
if(cls===Array){
cls=_25f;
}else{
if(cls===String){
cls=_260;
}
}
dict.__mixins__=dict.__mixins__||[];
dict.__mixins__.push(cls);
};
_21b.hasProperty=function(obj,name){
return (obj&&obj.__properties__)?(name in obj.__properties__):false;
};
_21b.hasMember=function(cls,name){
if(!cls){
return false;
}
if(name in cls.prototype){
return true;
}
return false;
};
_21b.isMethod=function(_29f){
if(typeof _29f=="function"){
if(!_29f.__class__||_29f.__class__==_23c||_29f.__class__==_245||_29f.__class__==_249){
return true;
}
}
return false;
};
_21b.getPropertyNames=function(obj){
return (obj&&obj.__properties__)?Object.keys(obj.__properties__):[];
};
_21b.inject=function(cls,host,args,_2a4){
if(typeof cls!="function"){
throw new Error("bad arguments.");
}
var _2a5=arguments.length,p,_2a7,init;
if(_2a5===2){
args=[];
_2a4=true;
}else{
if(_2a5===3){
if(Array.isArray(args)){
_2a4=true;
}else{
_2a4=args;
args=[];
}
}
}
host.__class__=cls;
_2a7=cls.prototype,init=_2a7.initialize;
host.__properties__=_2a7.__properties__;
p=Object.__new__(cls);
_20d.extend(host,p,_2a4);
_21b.initMixins(cls,host);
if(typeof init=="function"){
init.apply(host,args);
}
};
_21b.instanceOf=function(obj,func){
if(typeof func!="function"){
throw new Error("bad arguments.");
}
var cls;
if(typeof obj=="function"){
cls=obj.__class__;
if(cls){
do{
if(cls===func){
return true;
}
}while(cls=cls.__base__);
}
}else{
return obj instanceof func;
}
return false;
};
_21b.getChain=function(cls){
if(!cls){
return [];
}
var _2ad=[cls];
while(cls.__base__){
_2ad.push(cls.__base__);
cls=cls.__base__;
}
return _2ad;
};
_21b.getAllSubClasses=function(cls){
if(!cls||!cls.__subclassesarray__){
return [];
}
var _2af=cls.__subclassesarray__;
var _2b0=[].concat(_2af),ele=_2b0.shift(),subs;
while(ele!=null){
subs=ele.__subclassesarray__;
if(subs!=null){
_2b0=_2b0.concat(subs);
_2af=_2af.concat(subs);
}
ele=_2b0.shift();
}
return _2af;
};
_21b.keys=function(cls){
if(!cls||!cls.prototype){
return [];
}
var keys=[];
for(var prop in cls.prototype){
keys.push(prop);
}
keys=keys.filter(function(name){
if((name.indexOf("__")==0&&name.slice(-2)=="__")){
return false;
}
if(["get","set","_set","initialize","constructor"].indexOf(name)!=-1){
return false;
}
return true;
});
return keys;
};
_25f=_255(Array,["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","toString","unshift","valueOf","forEach","some","every","map","filter","reduce","reduceRight"]);
_25f.prototype.length=0;
_260=_255(String,["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","valueOf","trim"]);
_260.prototype.length=0;
})(object);
(function(_2b7){
var _2b8="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.";
function splitUntil(_2b9,url,_2bb,_2bc){
var min=url.length;
for(var i=0,len=url.length;i<len;i++){
if(_2bb.indexOf(url.charAt(i))!=-1){
if(i<min){
min=i;
break;
}
}
}
_2b9.got=url.substring(0,min);
_2b9.remained=(_2bc?url.substring(min):url.substring(min+1));
return _2b9;
}
function urlparse(url,_2c1){
if(typeof url!="string"){
return ["","","","","",""];
}
var _2c2="",_2c3="",path="",_2c5="",_2c6="",_2c7="",i=0;
i=url.indexOf(":");
if(i>0){
if(url.substring(0,i)=="http"){
_2c2=url.substring(0,i).toLowerCase();
url=url.substring(i+1);
}else{
for(i=0,len=url.length;i<len;i++){
if(_2b8.indexOf(url.charAt(i))==-1){
break;
}
}
_2c2=url.substring(0,i);
url=url.substring(i+1);
}
}
if(!_2c2&&_2c1){
_2c2=_2c1;
}
var _2c9={};
if(url.substring(0,2)=="//"){
splitUntil(_2c9,url.substring(2),"/?#",true);
_2c3=_2c9.got;
url=_2c9.remained;
}
if(url.indexOf("#")!=-1){
splitUntil(_2c9,url,"#");
url=_2c9.got;
_2c7=_2c9.remained;
}
if(url.indexOf("?")!=-1){
splitUntil(_2c9,url,"?");
url=_2c9.got;
_2c6=_2c9.remained;
}
if(url.indexOf(";")!=-1){
splitUntil(_2c9,url,";");
path=_2c9.got;
_2c5=_2c9.remained;
}
if(!path){
path=url;
}
return [_2c2,_2c3,path,_2c5,_2c6,_2c7];
}
function urlunparse(_2ca){
if(!_2ca){
return "";
}
var url="";
if(_2ca[0]){
url+=_2ca[0]+"://"+_2ca[1];
}
if(_2ca[1]&&_2ca[2]&&_2ca[2].indexOf("/")!=0){
url+="/";
}
url+=_2ca[2];
if(_2ca[3]){
url+=";"+_2ca[3];
}
if(_2ca[4]){
url+="?"+_2ca[4];
}
if(_2ca[5]){
url+="#"+_2ca[5];
}
return url;
}
function urljoin(base,url){
if(!base){
return url;
}
if(!url){
return base;
}
url=String(url);
base=String(base);
var _2ce=urlparse(base);
var _2cf=urlparse(url,_2ce[0]);
if(_2cf[0]!=_2ce[0]){
return url;
}
if(_2cf[1]){
return urlunparse(_2cf);
}
_2cf[1]=_2ce[1];
if(_2cf[2].charAt(0)=="/"){
return urlunparse(_2cf);
}
if(!_2cf[2]&&!_2cf[3]){
_2cf[2]=_2ce[2];
_2cf[3]=_2ce[3];
if(!_2cf[4]){
_2cf[4]=_2ce[4];
}
return urlunparse(_2cf);
}
var _2d0=_2ce[2].split("/").slice(0,-1).concat(_2cf[2].split("/"));
var i;
if(_2d0[_2d0.length-1]=="."){
_2d0[_2d0.length-1]="";
}
for(i=0,l=_2d0.length;i<l;i++){
if(_2d0[i]=="."){
_2d0.splice(i,1);
i--;
}
}
while(true){
i=1;
n=_2d0.length-1;
while(i<n){
if(_2d0[i]==".."&&["",".."].indexOf(_2d0[i-1])==-1){
_2d0.splice(i-1,2);
break;
}
i++;
}
if(i>=n){
break;
}
}
if(_2d0.length==2&&_2d0[0]==""&&_2d0[1]==".."){
_2d0[_2d0.length-1]="";
}else{
if(_2d0.length>=2&&_2d0[_2d0.length-1]==".."){
_2d0.pop();
_2d0.pop();
_2d0.push("");
}
}
_2cf[2]=_2d0.join("/");
return urlunparse(_2cf);
}
function calculatePageDir(){
var loc=window["location"];
var _2d3=loc.protocol+"//"+loc.host+(loc.pathname.charAt(0)!=="/"?"/":"")+loc.pathname;
if(_2d3.indexOf("\\")!=-1){
_2d3=_2d3.replace(/\\/g,"/");
}
var _2d4="./";
if(_2d3.indexOf("/")!=-1){
_2d4=_2d3.substring(0,_2d3.lastIndexOf("/")+1);
}
return _2d4;
}
function cleanPath(path){
path=path.replace(/([^:\/])\/+/g,"$1/");
if(path.indexOf(".")===-1){
return path;
}
var _2d6=path.split("/");
var _2d7=[];
for(var i=0,part,len=_2d6.length;i<len;i++){
part=_2d6[i];
if(part===".."){
if(_2d7.length===0){
throw new Error("invalid path: "+path);
}
_2d7.pop();
}else{
if(part!=="."){
_2d7.push(part);
}
}
}
return _2d7.join("/").replace(/#$/,"");
}
function Module(name){
this.__name__=name;
}
Module.prototype.toString=function(){
return "<module '"+this.__name__+"'>";
};
function NoModuleError(id){
this.message="no module named "+id;
}
NoModuleError.prototype=new Error();
function ModuleRequiredError(name,_2de){
this.message=_2de.id+": module "+name+" required";
}
ModuleRequiredError.prototype=new Error();
function CyclicDependencyError(_2df,pkg){
this.runStack=_2df;
var msg="";
_2df.forEach(function(m,i){
msg+=m.module.id+"-->";
});
msg+=pkg.id;
this.message=msg+" cyclic dependency.";
}
CyclicDependencyError.prototype=new Error();
function CommonJSPackage(id,_2e5,_2e6){
Package.apply(this,arguments);
}
CommonJSPackage.prototype=new Package();
CommonJSPackage.prototype.constructor=CommonJSPackage;
CommonJSPackage.prototype.make=function(name,_2e8,deps,_2ea){
var _2eb=new Module(name);
_2ea.modules[name]=_2eb;
_2ea.packages[name]=this;
var _2ec=this.createRequire(name,_2e8,deps,_2ea);
var _2ed=this.factory.call(_2eb,_2ec,_2eb,this);
if(_2ed){
_2ed.__name__=_2eb.__name__;
_2eb=_2ed;
}
_2ea.addModule(name,_2eb);
return _2eb;
};
CommonJSPackage.prototype.execute=function(name,_2ef,_2f0){
if(_2f0.getStackItem(name)){
return null;
}
var deps=_2f0.loadings[this.id].deps;
_2f0.pushStack(name,this);
var _2f2=this.make(name,_2ef,deps,_2f0);
if(name=="__main__"&&typeof _2f2.main=="function"){
_2f2.main();
}
_2f0.popStack();
return _2f2;
};
CommonJSPackage.prototype.toDep=function(i,_2f4){
var name=this.dependencies[i];
if(name.indexOf("/")==-1&&name.indexOf(".")!=-1){
return new ObjectDependency(name,this,_2f4);
}else{
return new CommonJSDependency(name,this,_2f4);
}
};
CommonJSPackage.prototype.createRequire=function(name,_2f7,deps,_2f9){
var _2fa=_2f9.loader;
var _2fb=this;
var _2fc=name;
var _2fd=_2f7;
function require(name){
var _2ff=_2fb.dependencies.indexOf(name);
if(_2ff==-1){
throw new ModuleRequiredError(name,_2fb);
}
var dep=deps[_2ff];
var _301=dep.execute(_2fc,_2fd);
if(!_301){
if(_2fb.dependencies.indexOf(name)!=-1){
throw new CyclicDependencyError(_2f9.stack,_2fa.lib[dep.id]);
}else{
console.warn("Unknown Error.");
}
}
return _301;
}
require.async=function(_302,_303){
_2f9.loader.buildFileLib();
var id=_2fb.id+"~"+new Date().getTime()+Math.floor(Math.random()*100);
_2f9.loader.defineModule(CommonJSPackage,id,_302,function(_305,_306,_307){
var args=[];
_307.dependencies.forEach(function(_309){
args.push(_305(_309));
});
_303.apply(null,args);
});
_2f9.loadModule(id,function(){
var _30a=_2f9.loader.lib[id];
_30a.execute(_30a.id,_2f7,_2f9);
});
};
return require;
};
function ObjectPackage(id,_30c,_30d){
Package.apply(this,arguments);
}
ObjectPackage.prototype=new Package();
ObjectPackage.prototype.constructor=ObjectPackage;
ObjectPackage.prototype.make=function(name,_30f,deps,_311){
var _312;
var args=[];
var _314;
deps.forEach(function(dep){
var _316=dep.execute(name,_30f);
if(args.indexOf(_316)==-1){
args.push(_316);
}
},this);
_314=_311.modules[name];
if(!_314){
_314=new Module(name);
_311.modules[name]=_314;
_311.packages[name]=this;
}
args.unshift(_314);
if(this.factory){
_312=this.factory.apply(_314,args);
}
if(_312){
if(_314.__empty_refs__){
_314.__empty_refs__.forEach(function(ref){
if(typeof console!="undefined"){
console.warn(ref+"\u65e0\u6cd5\u6b63\u786e\u83b7\u5f97"+name+"\u6a21\u5757\u7684\u5f15\u7528\u3002\u56e0\u4e3a\u8be5\u6a21\u5757\u662f\u901a\u8fc7return\u8fd4\u56de\u6a21\u5757\u5b9e\u4f8b\u7684\u3002");
}
});
}
_312.__name__=_314.__name__;
_314=_312;
}else{
delete _314.__empty_refs__;
}
_311.addModule(name,_314);
return _314;
};
ObjectPackage.prototype.execute=function(name,_319,_31a){
var _31b;
var _31c;
var deps;
if(_31a.getStackItem(name)){
if(!(name in _31a.modules)){
_31a.addModule(name,new Module(name));
_31a.packages[name]=this;
}
_31b=_31a.modules[name];
_31c=_31a.stack[_31a.stack.length-1];
if(!_31b.__empty_refs__){
_31b.__empty_refs__=[];
}
_31b.__empty_refs__.push(_31c.module.id);
}else{
deps=_31a.loadings[this.id].deps;
_31a.pushStack(name,this);
_31b=this.make(name,_319,deps,_31a);
if(name=="__main__"&&typeof _31b.main=="function"){
_31b.main();
}
_31a.popStack();
}
return _31b;
};
ObjectPackage.prototype.toDep=function(_31e,_31f){
var name=this.dependencies[_31e];
if(name.indexOf("/")!=-1){
return new CommonJSDependency(name,this,_31f);
}else{
return new ObjectDependency(name,this,_31f);
}
};
function Package(id,_322,_323){
if(!id){
return;
}
this.id=id;
this.factory=_323;
this.dependencies=this.parseDependencies(_322);
}
Package.prototype.load=function(_324,_325){
var deps=[];
var pkg=this;
var _328=-1;
function next(){
_328++;
if(_328==pkg.dependencies.length){
if(_325){
_325();
}
}
}
this.dependencies.forEach(function(_329,i){
var dep=this.toDep(i,_324);
deps.push(dep);
dep.load(next);
},this);
_324.loadings[this.id].deps=deps;
_324.loadings[this.id].callbacks.forEach(function(_32c){
_32c();
});
_324.loadings[this.id].callbacks=[];
next();
};
Package.prototype.execute=function(name,_32e,_32f){
if(_32f.getStackItem(name)){
throw new CyclicDependencyError(_32f.stack);
}
var _330=new Module(name);
if(this.id==="sys"){
_330.modules=_32f.modules;
_330.stack=_32f.stack;
_330.getModule=function(name){
return _32f.packages[name];
};
}
_32f.addModule(name,_330);
_32f.packages[name]=this;
return _330;
};
Package.prototype.parseDependencies=function(_332){
if(Array.isArray(_332)){
return _332;
}
if(!_332){
return [];
}
_332=_332.trim().replace(/^,*|,*$/g,"").split(/\s*,\s*/ig);
return _332;
};
function Dependency(name,_334,_335){
if(!name){
return;
}
this.owner=_334;
this.runtime=_335;
this.name=name;
}
function CommonJSDependency(name,_337,_338){
Dependency.apply(this,arguments);
var _339=_338.loader;
var info,id,_33c;
var _33d=_339.paths;
var type=this.getType(name);
if(type=="absolute"){
id=name;
}else{
if(type=="relative"){
info=_339.find(urljoin(urljoin(_337.id,"."),name),_33d);
id=info.id;
_33c=info.context;
}else{
if(type=="root"){
id=urljoin(Loader._pageDir,name);
}else{
info=_339.find(name,_33d);
id=info.id;
_33c=info.context;
}
}
}
this.id=id;
this.context=_33c||"";
this.type=type;
}
CommonJSDependency.prototype=new Dependency();
CommonJSDependency.prototype.getType=function(name){
if(~name.indexOf("://")||name.indexOf("//")===0){
return "absolute";
}
if(name.indexOf("./")===0||name.indexOf("../")===0){
return "relative";
}
if(name.charAt(0)==="/"&&name.charAt(1)!=="/"){
return "root";
}
return "top-level";
};
CommonJSDependency.prototype.constructor=CommonJSDependency;
CommonJSDependency.prototype.load=function(_340){
this.runtime.loadModule(this.id,_340);
};
CommonJSDependency.prototype.execute=function(_341,_342){
var _343=this.runtime;
var _344=_343.loader;
var _345;
if(this.type=="top-level"){
_345=this.name;
}else{
if(this.type=="relative"){
_345=this.id.slice(_342.length);
}else{
_345=this.id;
}
}
if(_345.slice(-3)==".js"){
_345=_345.slice(0,-3);
}
var _346=_343.modules[_345];
var pkg,deps;
if(!_346){
pkg=_344.lib[this.id];
_346=pkg.execute(_345,this.context,_343);
}
return _346;
};
function ObjectDependency(name,_34a,_34b){
Dependency.apply(this,arguments);
var _34c=_34b.loader;
var _34d=_34b.path.concat([_34b.moduleId]);
var _34e=false;
var info=_34c.find(name.replace(/\./g,"/"),_34d,_34a.id);
var id=info.id;
var _351=info.context;
if(_351==""){
_34e=true;
_351=urljoin(urljoin(_34a.id,"."),_351);
}
this.nameParts=this.name.split(".");
this.id=id;
this.context=_351;
this.isRelative=_34e;
}
ObjectDependency.prototype=new Dependency();
ObjectDependency.prototype.constructor=ObjectDependency;
ObjectDependency.prototype.load=function(_352){
var _353=this.runtime;
var _354=_353.loader;
var _355=this.nameParts;
var _356=-1;
function next(){
_356++;
if(_356==_355.length){
if(_352){
_352();
}
}
}
_355.forEach(function(part,i){
var id,info;
if(i==_355.length-1){
id=this.id;
}else{
info=_354.find(urljoin(this.context,_355.slice(0,i+1).join("/")));
id=info.id;
if(!info.found){
id=id+"/index.js";
_354.definePrefix(id);
}
}
_353.loadModule(id,next);
},this);
next();
};
ObjectDependency.prototype.execute=function(_35b,_35c){
var dep=this;
var _35e=this.runtime;
var _35f=_35e.loader;
var _360=this.context||"";
var _361=this.nameParts;
var _362,_363;
if(this.isRelative){
_363=_35b.lastIndexOf(".");
if(_363==-1){
_362="";
}else{
_362=_35b.slice(0,_363);
}
}else{
_362="";
}
var _364=_362;
var name;
var _366=(_362?_362+".":"")+_361[0];
var id,pkg,_369;
for(var i=0,l=_361.length,part;i<l;i++){
part=_361[i];
name=(_364?_364+".":"")+part;
if(!(name in _35e.modules)){
if(i==_361.length-1){
id=dep.id;
}else{
id=_35f.find(urljoin(_360,_361.slice(0,i+1).join("/"))).id;
}
pkg=_35f.lib[id];
_369=pkg.execute(name,_360,_35e);
_35e.setMemberTo(_364,part,_369);
}
_364=name;
}
return _35e.modules[_366];
};
function LoaderRuntime(_36d){
this.modules={};
this.packages={};
this.loadings={};
this.stack=[];
this.members={};
this.moduleId=_36d;
this.path=[""];
}
LoaderRuntime.prototype.addModule=function(name,_36f){
_36f=_36f||new Module(name);
this.modules[name]=_36f;
var _370=this.members[name];
if(_370){
_370.forEach(function(_371){
this.modules[name][_371.id]=_371.value;
},this);
}
return _36f;
};
LoaderRuntime.prototype.loadModule=function(id,_373){
var _374=this;
var _375=this.loader;
if(id in this.loadings){
if(this.loadings[id].deps){
_373();
}else{
this.loadings[id].callbacks.push(_373);
}
return;
}
this.loadings[id]={deps:null,callbacks:[]};
var pkg=_375.lib[id];
if(!pkg){
throw new NoModuleError(id);
}
function fileDone(){
var id=pkg.id;
var file=pkg.file;
pkg=_375.lib[id];
if(!pkg||!pkg.factory){
throw new Error(file+" do not add "+id);
}
pkg.load(_374,_373);
}
if(pkg.file){
Loader.loadScript(pkg.file,fileDone,true);
}else{
pkg.load(this,_373);
}
};
LoaderRuntime.prototype.getStackItem=function(id){
var _37a;
this.stack.some(function(m){
if(m.id==id){
_37a=m;
return true;
}
});
return _37a;
};
LoaderRuntime.prototype.pushStack=function(id,pkg){
this.stack.push({id:id,module:pkg});
};
LoaderRuntime.prototype.popStack=function(){
this.stack.pop();
};
LoaderRuntime.prototype.setMemberTo=function(host,_37f,_380){
if(host){
if(this.modules[host]){
this.modules[host][_37f]=_380;
}else{
if(!this.members[host]){
this.members[host]=[];
}
this.members[host].push({id:_37f,value:_380});
}
}
};
function Loader(base){
this.useCache=true;
this.anonymousModuleCount=0;
this.base=base||"/";
this.lib={};
this.paths=[this.base];
this.scripts=document.getElementsByTagName("script");
this.lib["sys"]=new Package("sys");
}
Loader._urlNodeMap={};
Loader._pageDir=null;
Loader.getAbsolutePath=function(src){
if(src.indexOf("://")!=-1||src.indexOf("//")===0){
return cleanPath(src);
}
if(!Loader._pageDir){
Loader._pageDir=calculatePageDir();
}
return cleanPath(Loader._pageDir+src);
};
Loader.prototype.name2id=function(name,_384){
if(typeof name!="string"){
return "";
}
var id,ext,_387;
if(name.indexOf("/")==-1){
id=name.replace(/\./g,"/");
}else{
id=name;
}
if(_384&&name.lastIndexOf("/")!=name.length-1){
_387=id.lastIndexOf(".");
if(_387!=-1){
ext=id.slice(_387);
}else{
ext="";
}
if(!ext){
id+=".js";
}
}
return id;
};
Loader.prototype.find=function(id,_389,base){
var _38b=this;
var ext=id.slice(id.lastIndexOf("."));
if(!_389){
_389=this.paths;
}
var _38d=null;
var _38e=null;
function find(id){
var pkg;
if(pkg=_38b.lib[id]||_38b.lib[id+".js"]||_38b.lib[id+"/index.js"]){
return pkg.id;
}
}
function findIn(path){
var _392=find(urljoin(urljoin(base,path),id));
if(_392){
_38d=_392;
_38e=path;
return true;
}
}
_389.some(findIn);
return {found:!!_38d,id:_38d||id,context:_38e};
};
Loader.prototype.buildFileLib=function(){
var _393=this.scripts;
for(var i=0,_395,_396,src,l=_393.length;i<l;i++){
_395=_393[i];
src=_395.getAttribute("data-src");
_396=_395.getAttribute("data-module");
if(!_396||!src){
continue;
}
_396.trim().split(/\s+/ig).forEach(function(name){
this.defineFile(urljoin(this.base,this.name2id(name,true)),src);
},this);
}
};
Loader.loadScript=function(src,_39b,_39c){
if(!src||typeof src!="string"){
throw new Error("bad arguments.");
}
src=src.trim();
var _39d=Loader.getAbsolutePath(src);
if(_39c){
var _39e=Loader._urlNodeMap,_39f=_39e[_39d];
if(_39f){
if(_39f.loading){
_39f.callbacks.push(_39b);
}else{
_39b(_39f);
}
return;
}
}
var ele=document.createElement("script");
ele.type="text/javascript";
ele.src=src;
ele.async=true;
ele.loading=true;
ele.callbacks=[];
var _3a1=function(){
ele.loading=null;
ele.callbacks.forEach(function(_3a2){
_3a2(ele);
});
for(var i=0,l=ele.callbacks.length;i<l;i++){
ele.callbacks[i]=null;
}
ele.callbacks=null;
};
ele.callbacks.push(_39b);
if(window.ActiveXObject){
ele.onreadystatechange=function(){
var rs=this.readyState;
if("loaded"===rs||"complete"===rs){
ele.onreadystatechange=null;
_3a1();
}
};
}else{
if(ele.addEventListener){
ele.addEventListener("load",_3a1,false);
ele.addEventListener("error",_3a1,false);
}else{
ele.onload=ele.onerror=_3a1;
}
}
document.getElementsByTagName("head")[0].insertBefore(ele,null);
if(_39c){
_39e[_39d]=ele;
}
};
Loader.prototype.removeScript=function(src){
if(!src||typeof src!="string"){
throw new Error("bad arguments.");
}
src=src.trim();
var _3a7=Loader.getAbsolutePath(src);
var _3a8=Loader._urlNodeMap,_3a9=_3a8[_3a7];
if(_3a9){
delete _3a8[_3a7];
if(_3a9.parentNode){
_3a9.parentNode.removeChild(_3a9);
}
_3a9=null;
}
};
Loader.prototype.createRuntime=function(id){
var _3ab=new LoaderRuntime(id);
_3ab.loader=this;
_3ab.path=_3ab.path.concat(this.paths);
return _3ab;
};
Loader.prototype.definePrefix=function(id){
if(!id||typeof id!="string"){
return;
}
if(id in this.lib){
return;
}
this.lib[id]=new Package(id);
};
Loader.prototype.defineFile=function(id,src){
if(!id||typeof id!="string"){
return;
}
if(id in this.lib&&(this.lib[id].factory||this.lib[id].file)){
return;
}
var pkg=new Package(id);
pkg.file=src;
this.lib[id]=pkg;
};
Loader.prototype.defineModule=function(_3b0,id,_3b2,_3b3){
if(arguments.length<4){
return;
}
if(id in this.lib&&this.lib[id].factory){
return;
}
var pkg=new _3b0(id,_3b2,_3b3);
this.lib[id]=pkg;
};
Loader.prototype.getModule=function(name){
var id=this.find(this.name2id(name)).id;
if(id in this.lib){
return this.lib[id];
}
return null;
};
Loader.prototype.predefine=function(_3b7,src,base){
if(!_3b7||!src){
return;
}
base=base||"";
_3b7.trim().split(/\s+/ig).forEach(function(name){
name=base+name;
this.defineFile(urljoin(this.base,this.name2id(name,true)),src);
},this);
};
Loader.prototype.define=function(name,_3bc,_3bd){
if(typeof name!="string"){
return;
}
if(typeof _3bc=="function"){
_3bd=_3bc;
_3bc=[];
}
var id=urljoin(this.base,this.name2id(name,true));
this.defineModule(CommonJSPackage,id,_3bc,_3bd);
};
Loader.prototype.add=function(name,_3c0,_3c1){
if(typeof name!="string"){
return;
}
if(typeof _3c0=="function"){
_3c1=_3c0;
_3c0=[];
}
var id=urljoin(this.base,this.name2id(name,true));
this.defineModule(ObjectPackage,id,_3c0,_3c1);
};
Loader.prototype.remove=function(name,all){
var id=urljoin(this.base,this.name2id(name,true));
delete this.lib[id];
if(all){
name=name.charAt(name.length-1)=="/"?name:name+"/";
id=urljoin(this.base,this.name2id(name));
Object.keys(this.lib).forEach(function(key){
if(key.indexOf(id)==0){
delete this.lib[key];
}
},this);
}
};
Loader.prototype.clear=function(){
for(var prop in this.lib){
if(prop!="sys"){
this.remove(prop);
}
}
};
Loader.prototype.execute=function(name){
if(!name||typeof name!="string"){
return;
}
this.buildFileLib();
var info=this.find(this.name2id(name));
var id=info.id;
var _3cb=info.context;
var _3cc=this.createRuntime(id,_3cb);
_2b7.runtime=_3cc;
_3cc.loadModule(id,function(){
var pkg=_3cc.loader.lib[id];
pkg.execute("__main__",_3cb,_3cc);
});
_2b7.runtime=null;
};
Loader.prototype.use=function(_3ce,_3cf){
if(!_3cf||typeof _3cf!="function"){
return;
}
this.buildFileLib();
var id="__anonymous_"+this.anonymousModuleCount+"__";
this.anonymousModuleCount++;
this.defineModule(CommonJSPackage,id,_3ce,function(_3d1,_3d2,_3d3){
var args=[];
_3d3.dependencies.forEach(function(_3d5){
dep=_3d1(_3d5);
if(args.indexOf(dep)==-1){
args.push(dep);
}
});
if(_3cf.length==args.length+1){
if(typeof console!="undefined"){
console.warn("object.use\u5373\u5c06\u4e0d\u518d\u652f\u6301\u7b2c\u4e00\u4e2aexports\u53c2\u6570\uff0c\u8bf7\u5c3d\u5feb\u5220\u9664\u3002");
}
args.unshift(_3d2);
}
_3cf.apply(null,args);
});
var _3d6=this.createRuntime(id);
_2b7.runtime=_3d6;
_3d6.loadModule(id,function(){
var pkg=_3d6.loader.lib[id];
pkg.execute("__main__","",_3d6);
});
_2b7.runtime=null;
};
_2b7.Loader=Loader;
_2b7.NoModuleError=NoModuleError;
_2b7.ModuleRequiredError=ModuleRequiredError;
})(object);
(function(_3d8){
var _3d9=new _3d8.Loader("http://pub.objectjs.org/object/");
_3d8._loader=_3d9;
_3d8.add=_3d9.add.bind(_3d9);
_3d8.predefine=_3d9.predefine.bind(_3d9);
_3d8.define=_3d9.define.bind(_3d9);
_3d8.remove=_3d9.remove.bind(_3d9);
_3d8.use=_3d9.use.bind(_3d9);
_3d8.execute=_3d9.execute.bind(_3d9);
_3d8.addPath=function(path){
_3d9.paths.push(path);
};
_3d8.define("./window.js","sys",function(_3db){
var sys=_3db("sys");
var dom=sys.modules["dom"];
if(dom){
dom.wrap(window);
}
return window;
});
_3d8.define("./loader.js",function(_3de,_3df){
_3df.Loader=_3d8.Loader;
});
})(object);
object.add("ua/index.js",function(_3e0){
var _3e1=this.numberify=function(s){
if(!s||typeof s!="string"){
}
var c=0;
return parseFloat(s.replace(/\./g,function(){
return (c++===0)?".":"";
}));
};
this.__detectUA=detectUA;
this.ua={};
var o=detectUA(navigator.userAgent);
object.extend(this.ua,o);
function detectUA(ua){
if(!ua&&typeof ua!="string"){
ua=navigator.userAgent;
}
var m,m2;
var o={},core,_3ea;
if(!~ua.indexOf("Opera")&&(m=ua.match(/MSIE\s([^;]*)/))&&m[1]){
if((m2=ua.match(/Trident\/([\d\.]*)/))&&m2[1]){
o[core="ie"]=document.documentMode;
o[_3ea="ieshell"]=_3e1(m2[1])+4;
}else{
o[_3ea="ieshell"]=o[core="ie"]=_3e1(m[1]);
}
}else{
if((m=ua.match(/AppleWebKit\/([\d\.]*)/))&&m[1]){
o[core="webkit"]=_3e1(m[1]);
}else{
if(!~ua.indexOf("Opera")&&(m=ua.match(/Gecko/))){
o[core="gecko"]=0;
if((m=ua.match(/rv:([\d\.]*)/))&&m[1]){
o[core]=_3e1(m[1]);
}
}else{
if((m=ua.match(/Presto\/([\d\.]*)/))&&m[1]){
o[core="presto"]=_3e1(m[1]);
}
}
}
if((m=ua.match(/Chrome\/([\d\.]*)/))&&m[1]){
o[_3ea="chrome"]=_3e1(m[1]);
}else{
if((m=ua.match(/\/([\d\.]*)( Mobile\/?[\w]*)? Safari/))&&m[1]){
o[_3ea="safari"]=_3e1(m[1]);
}else{
if(/\/[\d\.]* \(KHTML, like Gecko\) Safari/.test(ua)){
o[_3ea="safari"]=undefined;
}else{
if(!~ua.indexOf("Opera")&&(m=ua.match(/Firefox\/([\d\.]*)/))&&m[1]){
o[_3ea="firefox"]=_3e1(m[1]);
}else{
if((m=ua.match(/Opera\/([\d\.]*)/))&&m[1]){
o[_3ea="opera"]=_3e1(m[1]);
if((m=ua.match(/Opera\/.* Version\/([\d\.]*)/))&&m[1]){
o[_3ea]=_3e1(m[1]);
}
}else{
if((m=ua.match(/Opera ([\d\.]*)/))&&m[1]){
core="presto";
o[_3ea="opera"]=_3e1(m[1]);
}
}
}
}
}
}
}
o.shell=_3ea;
o.core=core;
return o;
}
});
object.add("./string.js",function(_3eb){
this.substitute=function(){
return Mustache.to_html.apply(null,arguments);
};
this.camelCase=function(str){
return str.replace(/-\D/g,function(_3ed){
return _3ed.charAt(1).toUpperCase();
});
};
this.hyphenate=function(str){
return str.replace(/[A-Z]/g,function(_3ef){
return ("-"+_3ef.charAt(0).toLowerCase());
});
};
this.capitalize=function(str){
return str.replace(/\b[a-z]/g,function(_3f1){
return _3f1.toUpperCase();
});
};
this.trim=function(str){
return (str||"").replace(/^\s+|\s+$/g,"");
};
this.ltrim=function(str){
return (str||"").replace(/^\s+/,"");
};
this.rtrim=function(str){
return (str||"").replace(/\s+$/,"");
};
this.lengthZh=function(str){
return str.length;
};
this.toQueryString=function(_3f6){
var _3f7=[];
for(var key in _3f6){
var _3f9=_3f6[key];
var _3fa;
if(_3f9&&_3f9.constructor===Array){
var qs={};
_3f9.forEach(function(val,i){
qs[i]=val;
});
_3fa=arguments.callee(qs,key);
}else{
if(typeof _3f9=="object"){
_3fa=arguments.callee(_3f9,key);
}else{
_3fa=key+"="+encodeURIComponent(_3f9);
}
}
if(_3f9!==null){
_3f7.push(_3fa);
}
}
return _3f7.join("&");
};
});
object.define("./events.js","ua",function(_3fe,_3ff){
var ua=_3fe("ua");
var _401=(function(){
if(document.createEvent){
var _402=document.createEvent("Event");
_402.initEvent(type,false,true);
if(_402.preventDefault){
_402.preventDefault();
return !(_402.getPreventDefault?_402.getPreventDefault():_402.defaultPrevented);
}else{
return true;
}
}
return false;
})();
function IEEvent(){
}
IEEvent.prototype.stopPropagation=function(){
this.cancelBubble=true;
};
IEEvent.prototype.preventDefault=function(){
this.returnValue=false;
};
IEEvent.prototype.getPreventDefault=function(){
return this.returnValue===false;
};
IEEvent.prototype.stop=function(){
this.stopPropagation();
this.preventDefault();
};
this.fireevent=function(arg1){
var name,func,_406;
var _407=function(self){
var _409=arguments.callee.__name__;
if(!name){
name=_409;
}
var _40a={};
var args=Array.prototype.slice.call(arguments,1);
if(_406){
for(var i=0;i<_406.length;i++){
_40a[_406[i]]=arguments[i+1];
}
}
_40a._args=args;
var _40d=self.fireEvent(name,_40a,self);
var _40e=self[_409+"_createEvent"];
if(_40e){
args.unshift(_40d);
_40e.apply(self,args);
}
var _40f=_40d.getPreventDefault?_40d.getPreventDefault():_40d.defaultPrevented;
if(!_40f){
return func.apply(this,arguments);
}
};
if(typeof arg1=="function"){
func=arg1;
return _407;
}else{
if(Array.isArray(arguments[0])){
_406=arguments[0];
}else{
name=arg1;
if(arguments[1]){
_406=arguments[1];
}
}
return function(_410){
func=_410;
return _407;
};
}
};
this.HOLD=2;
this.CAPTURE=1;
this.wrapEvent=function(e){
e.target=e.srcElement;
e.stopPropagation=IEEvent.prototype.stopPropagation;
e.preventDefault=IEEvent.prototype.preventDefault;
e.getPreventDefault=IEEvent.prototype.getPreventDefault;
e.stop=IEEvent.prototype.stop;
return e;
};
this.wrapPreventDefault=function(e){
if(_401){
var _413=e.preventDefault;
e.preventDefault=function(){
this.defaultPrevented=true;
_413.apply(this,arguments);
};
}
};
var _414={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,orientationchange:2,touchstart:2,touchmove:2,touchend:2,touchcancel:2,gesturestart:2,gesturechange:2,gestureend:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,paste:2,oninput:2,load:2,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1};
function isNativeEventForNode(node,type){
if(node.nativeEventNames){
return node.nativeEventNames.indexOf(type)!=-1;
}
return type in _414;
}
this.Events=new Class(function(){
function moveNativeEventsToTail(self,type){
var boss=self.__boss||self;
if(self.__nativeEvents&&self.__nativeEvents[type]){
boss.removeEventListener(type,self.__nativeEvents[type].run,false);
boss.addEventListener(type,self.__nativeEvents[type].run,false);
}
}
function handle(self,type){
var boss=self.__boss||self;
boss.attachEvent("on"+type,function(_41d){
_41d=_3ff.wrapEvent(_41d||window.event);
var _41e=self.__eventListeners?self.__eventListeners[type]:null;
if(_41e){
_41e=_41e.slice(0);
_41e.forEach(function(func){
try{
func.call(self,_41d);
}
catch(e){
handleEventErrorForIE(e);
}
});
_41e=null;
}
var _420=self.__nativeEvents?self.__nativeEvents[type]:null;
if(_420){
_420=_420.slice(0);
_420.forEach(function(func){
func.call(self,_41d);
});
_420=null;
}
});
}
function addOnHandlerAsEventListener(self,type){
if(type in _414&&self.nodeType==1){
return;
}
var _424=typeof type=="string"?type.toLowerCase():type;
var boss=self.__boss||self;
var _426=self["on"+_424],_427=boss["__on"+_424];
if(!_426&&_427){
boss.removeEventListener(type,_427,false);
boss["__on"+_424]=null;
}else{
if(_426&&_426!=_427){
boss.removeEventListener(type,_427,false);
boss.addEventListener(type,_426,false);
boss["__on"+_424]=_426;
}
}
}
function attachOnHandlerAsEventListener(self,type){
if(self.nodeType==1&&isNativeEventForNode(self,type)&&isNodeInDOMTree(self)){
return;
}
var _42a=typeof type=="string"?type.toLowerCase():type;
if(!self.__eventListeners){
self.__eventListeners={};
}
if(!self.__eventListeners[type]){
self.__eventListeners[type]=[];
}
var _42b=self.__eventListeners[type];
var l=_42b.length;
var _42d=self["on"+_42a],_42e=self["__on"+_42a];
if(!_42d&&_42e){
for(var i=0;i<l;i++){
if(_42b[i]==_42e){
_42b.splice(i,1);
break;
}
}
self["__on"+_42a]=null;
}else{
if(_42d&&_42d!=_42e){
for(var i=0;i<l;i++){
if(_42b[i]==_42e){
_42b.splice(i,1);
break;
}
}
_42b.push(_42d);
self["__on"+_42a]=_42d;
}
}
}
function isNodeInDOMTree(node){
if(!node){
return false;
}
var _431=node.parentNode;
var top=document.documentElement;
while(_431){
if(_431==top){
return true;
}
_431=_431.parentNode;
}
return false;
}
function insertWrapPreventDefaultHandler(boss,type,cap){
if(!boss["__preEventAdded_"+type]){
boss["__preEventAdded_"+type]=true;
if(boss["on"+type]){
boss["__on"+type]=boss["on"+type];
boss["on"+type]=null;
}
boss.addEventListener(type,function(_436){
_3ff.wrapPreventDefault(_436);
},cap);
if(boss["__on"+type]){
boss["on"+type]=boss["__on"+type];
boss["__on"+type]=null;
try{
delete boss["__on"+type];
}
catch(e){
}
}
}
}
var _437=typeof console!="undefined"&&console.error;
var _438=[];
function handleEventErrorForIE(e){
if(_437){
_438.length=0;
for(var prop in e){
_438.push(prop+":"+e[prop]);
_438.push(", ");
}
if(_438.length>0){
_438.pop();
}
console.error(e,_438.join(""));
}
}
this.initialize=function(self){
if(!self.addEventListener){
if(!self.__eventListeners){
self.__eventListeners={};
}
if(!self.__nativeEvents){
self.__nativeEvents={};
}
}
if(!self.addEventListener&&!self.attachEvent){
self.__boss=document.createElement("div");
}
};
this.addEvent=document.addEventListener?function(self,type,func,cap){
var boss=self.__boss||self;
if(cap===null){
cap=false;
}
cap=!!(cap&_3ff.CAPTURE);
if(!ua.ua.ie&&(type=="mouseenter"||type=="mouseleave")){
var _441=func;
func=function(_442){
if(_441.delegating){
_441.call(self,_442);
return;
}
var p=_442.relatedTarget;
while(p&&p!=self){
try{
p=p.parentNode;
}
catch(e){
p=self;
}
}
if(p!==self&&_441){
_441.call(self,_442);
}
};
func.innerFunc=_441;
type=(type=="mouseenter"?"mouseover":"mouseout");
if(!self.__eventListeners){
self.__eventListeners={};
}
if(!self.__eventListeners[type]){
self.__eventListeners[type]=[];
}
self.__eventListeners[type].push(func);
}
if(_401){
insertWrapPreventDefaultHandler(boss,type,cap);
}
addOnHandlerAsEventListener(self,type);
boss.addEventListener(type,func,cap);
moveNativeEventsToTail(self,type);
}:function(self,type,func){
var boss=self.__boss||self;
var _448;
if(!self.__eventListeners){
self.__eventListeners={};
}
if(!self.__eventListeners[type]){
_448=[];
self.__eventListeners[type]=_448;
if(!self.__nativeEvents||!self.__nativeEvents[type]){
handle(self,type);
}
}else{
_448=self.__eventListeners[type];
}
if(_448.some(function(f){
return f===func;
})){
return;
}
attachOnHandlerAsEventListener(self,type);
_448.push(func);
};
this.addNativeEvent=document.addEventListener?function(self,type,func){
var boss=self.__boss||self;
if(_401){
insertWrapPreventDefaultHandler(boss,type,false);
}
var _44e;
if(!self.__nativeEvents){
self.__nativeEvents={};
}
if(!self.__nativeEvents[type]){
_44e=[];
self.__nativeEvents[type]=_44e;
self.__nativeEvents[type].run=function(_44f){
_44e.forEach(function(func){
func.call(self,_44f);
});
};
moveNativeEventsToTail(self,type);
}else{
_44e=self.__nativeEvents[type];
}
_44e.push(func);
}:function(self,type,func){
var boss=self.__boss||self;
var _455;
if(!self.__nativeEvents){
self.__nativeEvents={};
}
if(!self.__nativeEvents[type]){
_455=[];
self.__nativeEvents[type]=_455;
if(!self.__nativeEvents||!self.__eventListeners[type]){
handle(self,type);
}
}else{
_455=self.__nativeEvents[type];
}
if(_455.some(function(f){
return f===func;
})){
return;
}
_455.push(func);
};
this.removeEvent=document.removeEventListener?function(self,type,func,cap){
var boss=self.__boss||self;
cap=!!(cap&_3ff.CAPTURE);
if(!ua.ua.ie&&type=="mouseleave"){
type="mouseout";
if(self.__eventListeners&&self.__eventListeners[type]){
var _45c=self.__eventListeners[type];
for(var i=0,_45e,l=_45c.length;i<l;i++){
_45e=_45c[i];
if(_45e.innerFunc===func){
boss.removeEventListener(type,_45e,cap);
_45c.splice(i,1);
break;
}
}
}
}else{
boss.removeEventListener(type,func,cap);
}
}:function(self,type,func,cap){
var boss=self.__boss||self;
if(!self.__eventListeners){
self.__eventListeners={};
}
var _465=self.__eventListeners[type];
if(!_465){
return;
}
for(var i=0;i<_465.length;i++){
if(_465[i]===func){
_465.splice(i,1);
break;
}
}
};
this.fireEvent=document.dispatchEvent?function(self,type,_469){
if(!ua.ua.ie){
if(type=="mouseleave"){
type="mouseout";
}else{
if(type=="mouseenter"){
type="mouseover";
}
}
}
addOnHandlerAsEventListener(self,type);
var boss=self.__boss||self;
var _46b=document.createEvent("Event");
_46b.initEvent(type,false,true);
object.extend(_46b,_469);
_3ff.wrapPreventDefault(_46b);
boss.dispatchEvent(_46b);
return _46b;
}:function(self,type,_46e){
if(!_46e){
_46e={};
}
if(self.nodeType==1&&isNativeEventForNode(self,type)){
var _46f=_3ff.wrapEvent(document.createEventObject());
object.extend(_46f,_46e);
if(isNodeInDOMTree(self)){
var _470=self["__on"+type];
var _471=self.__eventListeners[type];
if(_470&&_471){
for(var i=0,l=_471.length;i<l;i++){
if(_471[i]==_470){
_471.splice(i,1);
break;
}
}
self["__on"+type]=null;
}
if(self._oldFireEventInIE){
self._oldFireEventInIE("on"+type,_46f);
return _46f;
}else{
if(typeof console!="undefined"){
console.warn("\u8bf7\u4f7f\u7528dom.wrap\u65b9\u6cd5\u5305\u88c5\u5bf9\u8c61\u4ee5\u6dfb\u52a0\u4e8b\u4ef6\u5904\u7406\u51fd\u6570");
}
}
}
}
attachOnHandlerAsEventListener(self,type);
var _46f=_3ff.wrapEvent(_46e);
var _471=self.__eventListeners[type];
if(_471){
_471=_471.slice(0);
for(var i=0,j=_471.length;i<j;i++){
if(_471[i]){
try{
_471[i].call(self,_46f,true);
}
catch(e){
handleEventErrorForIE(e);
}
}
}
_471=null;
}
var _475=self.__nativeEvents[type];
if(_475){
_475=_475.slice(0);
_475.forEach(function(func){
func.call(self,_46f);
});
_475=null;
}
return _46f;
};
});
});
object.add("./options.js",function(_477){
var _478=true,_479=Array.prototype.slice;
for(var i in {toString:1}){
_478=null;
}
if(_478){
_478=["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];
}
this.overloadsetter=function(func){
return function(){
var a=arguments[func.length-2]||null;
var b=arguments[func.length-1];
var _47e=args=_479.call(arguments,0,func.length-2);
if(a===null){
return this;
}
if(typeof a!="string"){
for(var k in a){
args=_47e.slice(0);
args.push(k);
args.push(a[k]);
func.apply(this,args);
}
if(_478){
for(var i=_478.length;i>0;i--){
k=_478[i];
if(a.hasOwnProperty(k)){
func.call(this,k,a[k]);
}
}
}
}else{
args.push(a);
args.push(b);
func.apply(this,args);
}
return this;
};
};
this.Arguments=new Class(function(){
this.initialize=function(self,_482,opts){
if(opts==undefined){
opts={};
}
var _484={};
for(var key in _482){
_484[key]=(opts[key]!=undefined?opts[key]:_482[key]);
}
return _484;
};
});
this.Options=new Class({initialize:function(self,_487){
if(_487){
self._provider=_487;
}
self._options={};
},setOptions:function(self,_489,host){
if(!host){
host=self._options;
}
for(var i in _489){
if(i in host){
host[i]=_489[i];
}
}
},setOption:function(self,name,type,_48f){
if(_48f!==undefined){
self._options[name]=_48f;
}else{
if(self._provider&&self._provider.makeOption){
_48f=self._provider.makeOption(name,type);
if(_48f===null){
return;
}else{
self._options[name]=_48f;
}
}
}
},getOptions:function(self){
return self._options;
}});
});
object.define("dom/index.js","ua, events, string, net",function(_491,_492,_493){
var ua=_491("ua"),_495=_491("events"),_496=_491("string"),net=_491("net");
window.UID=1;
var _498={};
var get=function(uid){
return (_498[uid]||(_498[uid]={}));
};
var $uid=this.$uid=(window.ActiveXObject)?function(item){
if(item===undefined||item===null){
return null;
}
return (item.uid||(item.uid=[window.UID++]))[0];
}:function(item){
if(item===undefined||item===null){
return null;
}
return item.uid||(item.uid=window.UID++);
};
$uid(window);
$uid(document);
function doScrollLeft(){
if(window.__domLoaded){
runHooks();
return;
}
if(!document.documentElement||!document.documentElement.doScroll){
return;
}
try{
document.documentElement.doScroll("left");
}
catch(e){
setTimeout(doScrollLeft,1);
return;
}
doDomReady();
}
function doCheckReadyState(){
var _49e=null;
_49e=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
clearInterval(_49e);
doDomReady();
}
},1);
}
function doDomReady(){
if(!window.__domLoaded){
window.__domLoaded=true;
}
runHooks();
}
if(!window.__domLoaded&&!window.__domreadyAdded){
window.__domreadyAdded=true;
window.__domLoaded=false;
window.__domloadHooks=[];
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",function(){
document.removeEventListener("DOMContentLoaded",arguments.callee,false);
window.__domLoaded=true;
},false);
}else{
if(window.attachEvent){
document.attachEvent("onreadystatechange",function(){
if(document.readyState==="complete"){
document.detachEvent("onreadystatechange",arguments.callee);
doDomReady();
}
});
window.attachEvent("onload",doDomReady);
tryDomReady();
}
}
}
function tryDomReady(){
if(ua.ua.webkit&&ua.ua.webkit<525){
doCheckReadyState();
}else{
if(ua.ua.ie){
var _49f=false;
try{
_49f=window.frameElement==null;
}
catch(e){
}
if(_49f){
doScrollLeft();
}
}
}
}
function runHooks(){
var _4a0=window.__domloadHooks;
var fn;
while(_4a0[0]){
try{
fn=_4a0.shift();
fn();
}
catch(e){
if(XN&&XN.DEBUG_MODE){
throw e;
}
}
}
}
this.ready=function(_4a2){
if(typeof _4a2!="function"){
return;
}
if(window.__domLoaded==true){
_4a2();
return;
}
if(document.readyState=="complete"){
window.__domLoaded=true;
runHooks();
_4a2();
return;
}
if((ua.ua.webkit&&ua.ua.webkit<525)||!document.addEventListener){
window.__domloadHooks.push(_4a2);
}else{
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",_4a2,false);
}
}
};
var _4a3={};
var wrap=this.wrap=function(node){
if(!node){
return null;
}
if(Array.isArray(node)){
return new _492.Elements(node);
}else{
if(node._wrapped){
return node;
}
if(ua.ua.ie&&node.fireEvent){
node._oldFireEventInIE=node.fireEvent;
}
var _4a6;
if(node===window){
_4a6=_492.Window;
}else{
if(node===window.document){
_4a6=_492.Document;
}else{
if(node.nodeType===1){
_4a6=getWrapper(node.tagName);
}else{
return node;
}
}
}
node._wrapped=_4a3;
$uid(node);
Class.inject(_4a6,node,function(prop,dest,src){
if(typeof src[prop]!="function"){
return (!(prop in dest));
}else{
return true;
}
});
return node;
}
};
this.getElements=function(_4aa,_4ab){
if(!_4aa||typeof _4aa!="string"){
return null;
}
if(!_4ab){
_4ab=document;
}
var _4ac=Slick.parse(_4aa);
var eles=Sizzle(_4aa,_4ab);
var _4ae,part;
if(_4ac.expressions.length==1){
part=_4ac.expressions[0];
_4ae=getWrapper(part[part.length-1].tag);
}else{
for(var i=0,_4b1,_4b2;i<_4ac.expressions.length;i++){
part=_4ac.expressions[i];
_4ae=getWrapper(part[part.length-1].tag);
_4b1=Class.getChain(_4ae).slice(0,-1).reverse();
if(_4b2){
_4b1=getCommon(_4b1,_4b2);
}
if(_4b1.length==1){
break;
}
_4b2=_4b1;
}
_4ae=_4b1[_4b1.length-1];
}
return new _492.Elements(eles,_4ae);
};
this.getElement=function(_4b3,_4b4){
if(!_4b3||typeof _4b3!="string"){
return null;
}
if(!_4b4){
_4b4=document;
}
var ele=Sizzle(_4b3,_4b4)[0];
ele=wrap(ele);
return ele;
};
this.id=function(id){
return _492.wrap(document.getElementById(id));
};
var _4b7=this.eval_inner_JS=function(ele){
if(!ele){
return;
}
if(typeof ele=="string"){
var node=document.createElement("div");
node.innerHTML="<div>&nbsp;</div> "+ele;
ele=node;
}
var js=[];
if(ele.nodeType==11){
for(var i=0,l=ele.childNodes.length,_4bd;i<l;i++){
_4bd=ele.childNodes[i];
if(_4bd.tagName&&_4bd.tagName.toUpperCase()=="SCRIPT"){
js.push(_4bd);
}else{
if(_4bd.nodeType===1){
var _4be=_4bd.getElementsByTagName("script");
for(var j=0,_4c0=_4be.length;j<_4c0;j++){
js.push(_4be[j]);
}
}
}
}
}else{
if(ele.nodeType==1){
if(ele.tagName&&ele.tagName.toUpperCase()=="SCRIPT"){
js.push(ele);
}else{
js=ele.getElementsByTagName("script");
}
}
}
var arr=[];
for(i=0;i<js.length;i++){
arr.push(js[i]);
}
arr.forEach(function(s,i){
if(s.src){
return;
}else{
var _4c4="__inner_js_out_put = [];\n";
_4c4+=s.innerHTML.replace(/document\.write/g,"__inner_js_out_put.push");
eval(_4c4);
if(__inner_js_out_put.length!==0){
var tmp=document.createDocumentFragment();
var div=document.createElement("div");
div.innerHTML=__inner_js_out_put.join("");
while(div.firstChild){
tmp.appendChild(div.firstChild);
}
s.parentNode.insertBefore(tmp,s);
}
}
});
};
var _4c7=(function(){
var t=document.createElement("div");
t.innerHTML="<TEST_TAG></TEST_TAG>";
return !(t.firstChild===null);
})();
var _4c9=(function(){
if(ua.ua.ie<8){
return false;
}
return true;
})();
var _4ca="placeholder" in document.createElement("input");
var _4cb="naturalWidth" in document.createElement("img");
var _4cc="checkValidity" in document.createElement("input");
var _4cd="hidden" in document.createElement("div");
var _4ce="formAction" in document.createElement("input");
var _4cf="selectionStart" in document.createElement("input");
var _4d0=function(){
var prop=property(function(self){
var attr=prop.__name__;
attr=attr.replace(/^prop_/,"");
return self[attr];
},function(self,_4d5){
var attr=prop.__name__;
attr=attr.replace(/^prop_/,"");
self._set(attr,_4d5);
});
return prop;
};
var _4d7=function(_4d8,attr){
var prop=property(function(self){
if(!attr){
attr=prop.__name__.toLowerCase();
}
attr=attr.replace(/^prop_/,"");
var _4dc=self.getAttribute(attr);
return _4dc!=null&&_4dc!=="undefined"?_4dc:_4d8;
},function(self,_4de){
if(!attr){
attr=prop.__name__.toLowerCase();
}
attr=attr.replace(/^prop_/,"");
if(!_4de){
_4de="";
}
self.setAttribute(attr,_4de);
});
return prop;
};
this.getDom=function(str){
var tmp=document.createElement("div");
var _4e1=document.createDocumentFragment();
if(!_4c7){
tmp.style.display="none";
document.body.appendChild(tmp);
}
tmp.innerHTML=str;
while(tmp.firstChild){
_4e1.appendChild(wrap(tmp.firstChild));
}
if(!_4c7){
tmp.parentNode.removeChild(tmp);
}
return _4e1;
};
this.ElementClassList=new Class(Array,function(){
this.initialize=function(self,ele){
self.length=0;
self._ele=ele;
self._loadClasses();
};
this._loadClasses=function(self){
self._classes=self._ele.className.replace(/^\s+|\s+$/g,"").split(/\s+/);
};
this.toggle=function(self,_4e6){
if(!_4e6){
throw new Error("token\u4e0d\u80fd\u4e3a\u7a7a");
return;
}
if(typeof _4e6!="string"){
return;
}
if(self.contains(_4e6)){
self.remove(_4e6);
}else{
self.add(_4e6);
}
};
this.add=function(self,_4e8){
if(!_4e8){
throw new Error("token\u4e0d\u80fd\u4e3a\u7a7a");
return;
}
if(typeof _4e8!="string"){
return;
}
if(!self.contains(_4e8)){
self._ele.className=(self._ele.className+" "+_4e8).trim();
self._loadClasses();
}
};
this.remove=function(self,_4ea){
if(!_4ea){
throw new Error("token\u4e0d\u80fd\u4e3a\u7a7a");
return;
}
if(typeof _4ea!="string"){
return;
}
if(!self.contains(_4ea)){
return;
}
self._ele.className=self._ele.className.replace(new RegExp(_4ea.trim(),"i"),"").trim();
self._loadClasses();
};
this.contains=function(self,_4ec){
if(!_4ec){
throw new Error("token\u4e0d\u80fd\u4e3a\u7a7a");
return false;
}
if(typeof _4ec!="string"){
return false;
}
if(self._classes.indexOf(_4ec)!=-1){
return true;
}else{
return false;
}
};
this.item=function(self,i){
return self._classes[i]||null;
};
this.toString=function(self){
return self._ele.className;
};
});
var _4f0=["click","dblclick","mouseup","mousedown","contextmenu","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup"];
this.Element=new Class(function(){
Class.mixin(this,_495.Events);
this.nativeEventNames=_4f0;
this.initialize=function(self,_4f2){
if(_4f2){
self=document.createElement(_4f2);
wrap(self);
}else{
}
if(!self.__eventListeners){
self.__eventListeners={};
}
if(!self.__nativeEvents){
self.__nativeEvents={};
}
if(self.classList===undefined&&self!==document&&self!==window){
self.classList=new _492.ElementClassList(self);
}
self.delegates={};
};
this.prop_hidden=_4cd?_4d0():property(function(self){
return self.style.display=="none";
},function(self,_4f5){
if(_4f5==true){
if(self.style.display!=="none"){
self.__oldDisplay=self.style.display;
}
self.style.display="none";
}else{
self.style.display=self.__oldDisplay||"";
}
});
this.retrieve=function(self,_4f7,_4f8){
var _4f9=get(self.uid);
if(!(_4f7 in _4f9)&&_4f8!==undefined){
_4f9[_4f7]=_4f8;
}
return _4f9[_4f7];
};
this.store=function(self,_4fb,_4fc){
var _4fd=get(self.uid);
_4fd[_4fb]=_4fc;
return self;
};
this.delegate=function(self,_4ff,type,fn,_502){
function wrapper(e){
var ele=e.srcElement||e.target;
do{
if(ele&&_492.Element.get("matchesSelector")(ele,_4ff)){
fn.call(wrap(ele),e);
}
}while((ele=ele.parentNode));
}
var key=_4ff+"_"+type;
if(!self.delegates){
self.delegates={};
}
if(!(key in self.delegates)){
self.delegates[key]=[];
}
self.delegates[key].push({wrapper:wrapper,fn:fn});
wrapper.delegating=true;
self.addEvent(type,wrapper,_502);
};
this.undelegate=function(self,_507,type,fn,_50a){
var key=_507+"_"+type;
if(!self.delegates){
self.delegates={};
}
if(!(key in self.delegates)){
return;
}
self.delegates[key].forEach(function(item){
if(item.fn===fn){
self.removeEvent(type,item.wrapper,_50a);
return;
}
});
};
this.matchesSelector=function(self,_50e){
if(self!=document&&!self.parentNode){
return false;
}
return Sizzle.matches(_50e,[self]).length>0;
};
this.getData=function(self,name){
return self.getAttribute("data-"+name);
};
this.setData=function(self,name,_513){
return self.setAttribute("data-"+name,_513);
};
this.setHTML=function(self,str){
self.set("innerHTML",str);
};
this.setContent=function(self,str){
self.setHTML(str);
};
this.getElement=function(self,_519){
return _492.getElement(_519,self);
};
this.getElements=function(self,_51b){
return _492.getElements(_51b,self);
};
var _51c={before:function(_51d,_51e){
var _51f=_51e.parentNode;
if(_51f){
_51f.insertBefore(_51d,_51e);
}
},after:function(_520,_521){
var _522=_521.parentNode;
if(_522){
_522.insertBefore(_520,_521.nextSibling);
}
},bottom:function(_523,_524){
_524.appendChild(_523);
},top:function(_525,_526){
_526.insertBefore(_525,_526.firstChild);
}};
_51c.inside=_51c.bottom;
this.grab=function(self,el,_529){
_51c[_529||"bottom"](el,self);
return self;
};
this.inject=function(self,el,_52c){
_51c[_52c||"bottom"](self,el);
return self;
};
this.getPrevious=function(self,_52e){
var _52f=_52e?_492.Element.get("matchesSelector"):null;
var _530=self;
while(_530=_530.previousSibling){
if(_530.nodeType!=1){
continue;
}
if(!_52f||_52f(_530,_52e)){
return wrap(_530);
}
}
return null;
};
this.getAllPrevious=function(self,_532){
var _533=_532?_492.Element.get("matchesSelector"):null;
var _534=[];
var _535=self;
while(_535=_535.previousSibling){
if(_535.nodeType!=1){
continue;
}
if(!_533||_533(_535,_532)){
_534.push(wrap(_535));
}
}
return _534;
};
this.getNext=function(self,_537){
var _538=_537?_492.Element.get("matchesSelector"):null;
var _539=self;
while(_539=_539.nextSibling){
if(_539.nodeType!=1){
continue;
}
if(!_538||_538(_539,_537)){
return wrap(_539);
}
}
return null;
};
this.getAllNext=function(self,_53b){
var _53c=_53b?_492.Element.get("matchesSelector"):null;
var _53d=[];
var _53e=self;
while(_53e=_53e.nextSibling){
if(_53e.nodeType!=1){
continue;
}
if(!_53c||_53c(_53e,_53b)){
_53d.push(wrap(_53e));
}
}
return _53d;
};
this.getFirst=function(self,_540){
var _541=_540?_492.Element.get("matchesSelector"):null;
var _542=self.childNodes,l=_542.length;
for(var i=0,_545;i<l;i++){
_545=_542[i];
if(_545.nodeType!=1){
continue;
}
if(!_541||_541(_545,_540)){
return wrap(_545);
}
}
return null;
};
this.getLast=function(self,_547){
var _548=_547?_492.Element.get("matchesSelector"):null;
var _549=self.childNodes,l=_549.length;
for(var i=l-1,_54c;i>=0;i--){
_54c=_549[i];
if(_54c.nodeType!=1){
continue;
}
if(!_548||_548(_54c,_547)){
return wrap(_54c);
}
}
return null;
};
this.getParent=function(self,_54e){
if(!_54e){
return wrap(self.parentNode);
}
var _54f=_492.Element.get("matchesSelector");
var _550=self;
do{
if(_54f(_550,_54e)){
return wrap(_550);
}
}while((_550=_550.parentNode));
return null;
};
this.getParents=function(self,_552){
var _553=_552?_492.Element.get("matchesSelector"):null;
var _554=[];
var _555=self;
while(_555=_555.parentNode){
if(_555.nodeType!=1){
continue;
}
if(!_553||_553(_555,_552)){
_554.push(wrap(_555));
}
}
return _554;
};
this.getSiblings=function(self,_557){
return self.getAllPrevious(_557).concat(self.getAllNext(_557));
};
this.getChildren=function(self,_559){
var _55a=_559?_492.Element.get("matchesSelector"):null;
var _55b=self.childNodes,l=_55b.length,_55d=[];
for(var i=0,_55f;i<l;i++){
_55f=_55b[i];
if(_55f.nodeType!=1){
continue;
}
if(!_55a||_55a(_55f,_559)){
_55d.push(wrap(_55f));
}
}
return _55d;
};
this.addClass=function(self,name){
if(!name){
return;
}
self.classList.add(name);
};
this.removeClass=function(self,name){
if(!name){
return;
}
self.classList.remove(name);
};
this.toggleClass=function(self,name){
if(!name){
return;
}
self.classList.toggle(name);
};
this.hasClass=function(self,name){
if(!name){
return false;
}
return self.classList.contains(name);
};
var html=document.documentElement;
var _569=(html.style.cssFloat==null)?"styleFloat":"cssFloat",_56a=(!ua.ua.ie&&html.style.opacity!=null),_56b=(html.style.filter!=null),_56c=/alpha\(opacity=([\d.]+)\)/i;
this.prop_opacity=property(function(self){
if(_56a){
return self.style.opacity;
}else{
if(_56b){
var _56e=self.style.filter||self.currentStyle.filter;
if(_56e){
opacity=_56e.match(_56c);
}
return (opacity==null||_56e==null)?1:(opacity[1]/100);
}else{
return self.retrieve("opacity");
}
}
},function(self,_570){
if(_56a){
self.style.opacity=_570;
}else{
if(_56b){
if(!self.currentStyle||!self.currentStyle.hasLayout){
self.style.zoom=1;
}
_570=parseInt(_570*100);
if(_570>100){
_570=100;
}else{
if(_570<0){
_570=0;
}
}
var _571=_570==100?"":"alpha(opacity="+_570+")";
var _572=self.style.filter||self.currentStyle.filter||"";
self.style.filter=_56c.test(_572)?_572.replace(_56c,_571):_572+_571;
}else{
self.store("opacity",_570);
self.style.visibility=_570>0?"visible":"hidden";
}
}
});
this.setStyle=function(self,_574,_575){
switch(_574){
case "opacity":
return self.set("opacity",parseFloat(_575));
case "float":
_574=_569;
break;
default:
break;
}
_574=_496.camelCase(_574);
self.style[_574]=_575;
return null;
};
this.getStyle=function(self,_577){
if(ua.ua.ie){
_577=(_577=="float"||_577=="cssFloat")?"styleFloat":_577;
var _578=self.style[_577];
if(!_578&&self.currentStyle){
_578=self.currentStyle[_577];
}
if(_577=="opacity"){
if(_578=(self.style["filter"]||"").match(/alpha\(opacity=(.*)\)/)){
if(_578[1]){
return parseFloat(_578[1])/100;
}
}
return 1;
}
if(_578=="auto"){
if((_577=="width"||_577=="height")&&(self.getStyle("display")!="none")){
return self["offset"+(_577=="width"?"Width":"Height")]+"px";
}
return _578;
}
return _578;
}else{
_577=_577=="float"?"cssFloat":_577;
var _578=self.style[_577];
if(!_578){
var css=document.defaultView.getComputedStyle(self,null);
_578=css?css[_577]:null;
}
if(_577=="opacity"){
return _578?parseFloat(_578):1;
}
return _578;
}
};
this.dispose=function(self){
return (self.parentNode)?self.parentNode.removeChild(self):self;
};
var _57b="address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr noframes noscript ol p pre table ul center dir isindex menu".split(" ");
this.hide=function(self){
self.setData("old-display",self.getStyle("display"));
self.style.display="none";
};
this.show=function(self){
if(self.getStyle("display")!="none"){
return;
}
var _57e=self.getData("old-display");
if(_57e&&_57e!="none"){
self.style.display=_57e;
return;
}
self.style.display="";
if(self.getStyle("display")!="none"){
return;
}
if(_57b.indexOf(self.get("tagName").toLowerCase())!=-1){
self.style.display="block";
}else{
self.style.display="inline";
}
};
this.toggle=function(self){
if(self.getStyle("display")=="none"){
self.show();
}else{
self.hide();
}
};
this.prop_innerHTML=property(null,function(self,html){
if(_4c7){
self.innerHTML=html;
}else{
var _582=_492.getDom(html);
self.innerHTML="";
while(_582.firstChild){
self.appendChild(_582.firstChild);
}
}
});
this.prop_tagName=property(function(self){
return self.tagName.toUpperCase();
});
this.fromString=staticmethod(function(str){
var tmp=document.createElement("div");
if(!_4c7){
tmp.style.display="none";
document.body.appendChild(tmp);
}
tmp.innerHTML=str.trim();
var _586=wrap(tmp.firstChild);
if(!_4c7){
tmp.parentNode.removeChild(tmp);
}
return _586;
});
this.position=function(self){
if(self.parentNode===null||self.style.display=="none"){
return false;
}
var _588=null;
var pos=[];
var box;
if(self.getBoundingClientRect){
box=self.getBoundingClientRect();
var _58b=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
var _58c=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
return {x:box.left+_58c,y:box.top+_58b};
}else{
if(document.getBoxObjectFor){
box=document.getBoxObjectFor(self);
var _58d=(self.style.borderLeftWidth)?parseInt(self.style.borderLeftWidth):0;
var _58e=(self.style.borderTopWidth)?parseInt(self.style.borderTopWidth):0;
pos=[box.x-_58d,box.y-_58e];
}else{
pos=[self.offsetLeft,self.offsetTop];
_588=self.offsetParent;
if(_588!=self){
while(_588){
pos[0]+=_588.offsetLeft;
pos[1]+=_588.offsetTop;
_588=_588.offsetParent;
}
}
if(ua.ua.opera||(ua.ua.safari&&self.style.position=="absolute")){
pos[0]-=document.body.offsetLeft;
pos[1]-=document.body.offsetTop;
}
}
}
_588=self.parentNode||null;
while(_588&&_588.tagName!="BODY"&&_588.tagName!="HTML"){
pos[0]-=_588.scrollLeft;
pos[1]-=_588.scrollTop;
_588=_588.parentNode;
}
return {x:pos[0],y:pos[1]};
};
});
this.ImageElement=new Class(_492.Element,function(){
this.nativeEventNames=_4f0.concat(["error","abort"]);
function _getNaturalSize(img){
var _590=new Image();
_590.src=img.src;
return {width:_590.width,height:_590.height};
}
this.prop_naturalWidth=property(function(self){
if(_4cb){
return self.naturalWidth;
}else{
return _getNaturalSize(self).width;
}
});
this.prop_naturalHeight=property(function(self){
if(_4cb){
return self.naturalHeight;
}else{
return _getNaturalSize(self).height;
}
});
});
this.FormElement=new Class(_492.Element,function(){
this.nativeEventNames=_4f0.concat(["reset","submit"]);
this.initialize=function(self){
this.parent(self);
if(self.elements){
for(var i=0;i<self.elements.length;i++){
wrap(self.elements[i]);
}
}
if(!_4c9){
self.elements.namedItem=function(name){
return Sizzle("*[name="+name+"]",self)[0];
};
}
if(!_4ce&&!XN.browser.IE10){
self.addNativeEvent("submit",function(_596){
if(!self.__submitButton){
return;
}
var _597=self.__submitButton;
self.__submitButton=null;
var _598=self.action;
var _599=self.method;
var _59a=self.encoding||self.enctype;
var _59b=self.noValidate;
var _59c=self.target;
var _59d=_597.getAttribute("formaction");
var _59e=_597.getAttribute("formmethod");
var _59f=_597.getAttribute("formenctype");
var _5a0=_597.getAttribute("formnovalidate");
var _5a1=_597.getAttribute("formtarget");
if(_59d){
self.action=_59d;
}
if(_59e){
self.method=_59e;
}
if(_59f){
self.enctype=self.encoding=_59f;
}
if(_5a0){
self.formNoValidate=_5a0;
}
if(_5a1){
self.target=_5a1;
}
var _5a2=_596.getPreventDefault?_596.getPreventDefault():_596.defaultPrevented;
if(!_5a2){
_596.preventDefault();
self.submit();
}
if(ua.ua.webkit<=534.3){
setTimeout(function(){
self.action=_598;
self.method=_599;
self.enctype=self.encoding=_59a;
self.formNoValidate=_59b;
self.target=_59c;
},0);
}else{
self.action=_598;
self.method=_599;
self.enctype=self.encoding=_59a;
self.formNoValidate=_59b;
self.target=_59c;
}
});
}
};
this.createRequest=function(self,_5a4){
if(!_5a4){
_5a4={};
}
if(!_5a4.method){
_5a4.method=self.method;
}
if(!_5a4.url){
_5a4.url=self.action;
}
if(!_5a4.data){
_5a4.data=self.toQueryString();
}
if(!_5a4.onsuccess){
_5a4.onsuccess=function(_5a5){
self.fireEvent("requestSuccess",{request:_5a5.request});
};
}
if(!_5a4.onerror){
_5a4.onerror=function(_5a6){
self.fireEvent("requestError",{request:_5a6.request});
};
}
if(net){
xhr=new net.Request(_5a4);
}else{
throw new object.ModuleRequiredError("net",_493);
}
return xhr;
};
this.send=function(self,data){
var _5a9=self.createRequest();
_5a9.send(data);
return _5a9;
};
this.toQueryString=function(self){
var _5ab=[];
function addItem(name,_5ad){
if(typeof _5ad!="undefined"){
_5ab.push(encodeURIComponent(name)+"="+encodeURIComponent(_5ad));
}
}
self.getElements("input, select, textarea, output").forEach(function(el){
var type=el.type;
if(!el.name||el.disabled||type=="submit"||type=="reset"||type=="file"||type=="image"){
return;
}
if(el.tagName.toLowerCase()=="select"){
el.getSelected().map(function(opt){
var _5b1=wrap(opt).get("value");
addItem(el.name,_5b1);
});
}else{
if(type=="radio"||type=="checkbox"){
if(el.checked){
addItem(el.name,el.get("value"));
}
}else{
addItem(el.name,el.get("value"));
}
}
});
return _5ab.join("&");
};
this.checkValidity=function(self){
return self.getElements("input, select, textarea, output").every(function(el){
return el.checkValidity();
});
};
});
this.FormItemElement=new Class(_492.Element,function(){
this.nativeEventNames=_4f0.concat(["focus","blur","change","select","paste"]);
this.required=_4cc?_4d0():_4d7(false);
this.pattern=_4cc?_4d0():_4d7("");
this.maxlength=_4d0();
this.type=_4cc?_4d0():_4d7("text");
this.min=_4cc?_4d0():_4d7("");
this.max=_4cc?_4d0():_4d7("");
this.selectionStart=property(function(self){
try{
if(typeof self.selectionStart=="number"){
return self.selectionStart;
}
}
catch(e){
return -1;
}
if(document.selection){
var _5b5=document.selection.createRange();
if(_5b5==null||_5b5.parentElement()!=self){
if(self.__selectionPos){
return self.__selectionPos.start;
}else{
return -1;
}
}
return calculateSelectionPos(self).start;
}else{
return -1;
}
});
this.selectionEnd=property(function(self){
try{
if(typeof self.selectionEnd=="number"){
return self.selectionEnd;
}
}
catch(e){
return -1;
}
if(document.selection){
var _5b7=document.selection.createRange();
if(_5b7==null||_5b7.parentElement()!=self){
if(self.__selectionPos){
return self.__selectionPos.end;
}else{
return -1;
}
}
return calculateSelectionPos(self).end;
}else{
return -1;
}
});
this.getSelected=function(self){
self.selectedIndex;
var _5b9=[];
for(var i=0;i<self.options.length;i++){
if(self.options[i].selected){
_5b9.push(self.options[i]);
}
}
return _5b9;
};
this.prop_value=property(function(self){
if(self.classList.contains("placeholder")){
return "";
}
return self.value;
},function(self,_5bd){
if(self.classList.contains("placeholder")){
self.classList.remove("placeholder");
self.removeAttribute("autocomplete");
self.value="";
}
self.value=_5bd;
if(!_4ca&&!self.value&&self.getAttribute("placeholder")){
self.classList.add("placeholder");
self.value=self.getAttribute("placeholder");
self.setAttribute("autocomplete","off");
}
self.checkValidity();
});
this.validity=_4cc?property(function(self){
return self.validity;
}):property(function(self){
var _5c0=self.get("value");
var _5c1={valueMissing:(function(){
var _5c2=self.getAttribute("required");
if(_5c2){
return !_5c0?true:false;
}else{
return false;
}
})(),typeMismatch:(function(type){
if(type=="url"){
return !(/^\s*(?:(\w+?)\:\/\/([\w-_.]+(?::\d+)?))(.*?)?(?:;(.*?))?(?:\?(.*?))?(?:\#(\w*))?$/i).test(_5c0);
}
if(type=="tel"){
return !(/[^\r\n]/i).test(_5c0);
}
if(type=="email"){
return !(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i).test(_5c0);
}
return false;
})(self.getAttribute("type")),patternMismatch:(function(){
var _5c4=self.get("pattern");
if(_5c4){
return !(new RegExp("^"+_5c4+"$")).test(_5c0);
}else{
return false;
}
})(),tooLong:(function(){
var _5c5=self.get("maxlength");
var n=Number(_5c5);
if(n!=_5c5){
return false;
}
return _5c0.length>n;
})(),customError:!!self.__customValidity,rangeUnderflow:false,rangeOverflow:false,stepMismatch:false};
_5c1.valid=["valueMissing","typeMismatch","patternMismatch","tooLong","rangeUnderflow","rangeOverflow","stepMismatch","customError"].every(function(name){
return _5c1[name]===false;
});
self.__validationMessage=(function(){
if(_5c1.valid){
return "";
}
if(_5c1.customError){
return self.__customValidity;
}
if(_5c1.valueMissing){
return "\u8bf7\u586b\u5199\u6b64\u5b57\u6bb5\u3002";
}
if(_5c1.typeMismatch){
return "\u8bf7\u8f93\u5165\u4e00\u4e2a"+self.getAttribute("type")+"\u3002";
}
if(_5c1.patternMismatch){
return "\u8bf7\u5339\u914d\u8981\u6c42\u7684\u683c\u5f0f\u3002";
}
if(_5c1.tooLong){
return "\u8bf7\u5c06\u8be5\u6587\u672c\u51cf\u5c11\u4e3a "+self.get("maxlength")+" \u4e2a\u5b57\u7b26\u6216\u66f4\u5c11\uff08\u60a8\u5f53\u524d\u4f7f\u7528\u4e86"+self.get("value").length+"\u4e2a\u5b57\u7b26\uff09\u3002";
}
if(_5c1.rangeUnderflow){
return "\u503c\u5fc5\u987b\u5927\u4e8e\u6216\u7b49\u4e8e"+self.getAttribute("min")+"\u3002";
}
if(_5c1.rangeOverflow){
return "\u503c\u5fc5\u987b\u5c0f\u4e8e\u6216\u7b49\u4e8e"+self.getAttribute("max")+"\u3002";
}
if(_5c1.stepMismatch){
return "\u503c\u65e0\u6548\u3002";
}
})();
self._set("validationMessage",self.__validationMessage);
self._set("validity",_5c1);
return _5c1;
});
this.validationMessage=_4cc?property(function(self){
return self.validationMessage;
}):property(function(self){
self.get("validity");
return self.__validationMessage;
});
if(!_4cc){
this.setCustomValidity=function(self,_5cb){
self.__customValidity=_5cb;
self.get("validity");
};
this.checkValidity=function(self){
self.get("validity");
return self.validity.valid;
};
}
this.focusToPosition=function(self,_5ce){
if(_5ce===undefined){
_5ce=self.get("value").length;
}
if(self.setSelectionRange){
self.focus();
self.setSelectionRange(self.get("value").length,_5ce);
}else{
if(self.createTextRange){
var _5cf=self.createTextRange();
_5cf.moveStart("character",_5ce);
_5cf.collapse(true);
_5cf.select();
self.focus();
}else{
self.focus();
}
}
};
});
this.TextBaseElement=new Class(_492.FormItemElement,function(){
this.initialize=function(self){
this.parent(self);
if(!_4ca){
self.bindPlaceholder();
}
if(!_4cf){
self.addEvent("beforedeactivate",function(){
self.__selectionPos=calculateSelectionPos(self);
});
}
};
this.prop_placeholder=property(function(self){
return self.getAttribute("placeholder");
},function(self,_5d3){
self.setAttribute("placeholder",_5d3);
if(!_4ca){
self.bindPlaceholder();
if(self.get("placeholding")){
self.value=_5d3;
}
}
});
this.prop_placeholding=property(function(self){
return self.classList.contains("placeholder");
},function(self,_5d6){
if(_5d6){
self.classList.add("placeholder");
self.setAttribute("autocomplete","off");
}else{
self.classList.remove("placeholder");
self.removeAttribute("autocomplete");
}
});
this.bindPlaceholder=function(self){
if(self._binded){
return;
}
self._binded=true;
function checkEmpty(_5d8){
var _5d9=self.get("placeholder");
if(!_5d9){
return;
}
if(self.get("placeholding")){
if(_5d8.type=="focus"&&self.value===_5d9){
self.value="";
}
self.set("placeholding",false);
}else{
if(!self.value||((ua.ua.ie==6||ua.ua.ie==7)&&!_5d8&&self.value==_5d9)){
self.set("placeholding",true);
self.value=_5d9;
}
}
}
self.addNativeEvent("focus",function(_5da){
return checkEmpty(_5da);
});
self.addNativeEvent("blur",function(_5db){
return checkEmpty(_5db);
});
if(self.form){
wrap(self.form).addNativeEvent("submit",function(){
if(self.classList.contains("placeholder")){
self.set("placeholding",false);
self.value="";
setTimeout(function(){
checkEmpty();
},0);
}
});
}
checkEmpty();
};
});
this.InputElement=new Class(_492.TextBaseElement,function(){
this.prop_formAction=_4ce?_4d0():_4d7("");
this.prop_formEnctype=_4ce?_4d0():_4d7("application/x-www-form-urlencoded");
this.prop_formMethod=_4ce?_4d0():_4d7("get");
this.prop_formNoValidate=_4ce?_4d0():_4d7(false);
this.prop_formTarget=_4ce?_4d0():_4d7("");
this.initialize=function(self){
this.parent(self);
if(!_4ce&&self.type=="submit"){
self.addNativeEvent("click",function(_5dd){
var _5de=self.getAttribute("formaction");
if(_5de&&_5de!="undefined"){
self.form.__submitButton=self;
}
});
}
};
this.send=function(self,data){
if(self.type!="submit"){
return;
}
var _5e1=self.getAttribute("formaction"),_5e2=self.getAttribute("formmethod");
var _5e3=self.form.createRequest({method:_5e2||self.form.method,url:_5e1||self.form.action,onsuccess:function(_5e4){
self.fireEvent("requestSuccess",{request:_5e4.request});
},onerror:function(_5e5){
self.fireEvent("requestError",{request:_5e5.request});
}});
_5e3.send(data);
return _5e3;
};
});
this.TextAreaElement=new Class(_492.TextBaseElement,function(){
});
this.Window=new Class(_492.Element,function(){
this.nativeEventNames=_4f0.concat(["load","unload","beforeunload","resize","move","DomContentLoaded","readystatechange","scroll","mousewheel","DOMMouseScroll"]);
});
this.Document=new Class(_492.Element,function(){
this.nativeEventNames=_4f0.concat(["load","unload","beforeunload","resize","move","DomContentLoaded","readystatechange","scroll","mousewheel","DOMMouseScroll"]);
});
this.Elements=new Class(Array,function(){
this.initialize=function(self,_5e7,_5e8){
if(!_5e8){
_5e8=_492.Element;
}
for(var i=0;i<_5e7.length;i++){
self.push(wrap(_5e7[i]));
}
Class.keys(_5e8).forEach(function(name){
if(typeof _5e8.get(name)!="function"){
return;
}
self[name]=function(){
var _5eb;
for(var i=0;i<self.length;i++){
_5eb=self[i];
if(typeof _5eb[name]=="function"){
_5eb[name].apply(self[i],[].slice.call(arguments,0));
}
}
};
});
self.set=function(key,_5ee){
for(var i=0;i<self.length;i++){
self[i].set(key,_5ee);
}
};
self.get=function(key){
var _5f1=[];
for(var i=0;i<self.length;i++){
_5f1.push(self[i].get(key));
}
return _5f1;
};
};
});
var _5f3={"IMG":_492.ImageElement,"FORM":_492.FormElement,"INPUT":_492.InputElement,"TEXTAREA":_492.TextAreaElement,"OUTPUT":_492.FormItemElement,"SELECT":_492.FormItemElement,"OPTION":_492.FormItemElement,"BUTTON":_492.FormItemElement};
function getWrapper(_5f4){
var tag=_5f4.toUpperCase();
var cls=_5f3[tag];
if(cls){
return cls;
}else{
return _492.Element;
}
}
function getCommon(arr1,arr2){
var i;
for(i=0,l=arr1.length;i<l;i++){
if(!arr2[i]||arr2[i]!==arr1[i]){
break;
}
}
return arr1.slice(0,i);
}
function calculateSelectionPos(_5fa){
var _5fb=document.selection.createRange();
if(_5fb==null||_5fb.parentElement()!=_5fa){
return {start:-1,end:-1};
}
var _5fc=_5fa.createTextRange();
var _5fd=_5fc.duplicate();
_5fc.moveToBookmark(_5fb.getBookmark());
_5fd.setEndPoint("EndToStart",_5fc);
return {start:_5fd.text.length,end:_5fd.text.length+_5fb.text.length};
}
});
object.add("./net.js","dom, events",function(_5fe,dom,_600){
var _601=window.__ajaxProxies;
if(!_601){
_601=window.__ajaxProxies={};
}
this.ajaxRequest=function(url,_603){
if(!url||typeof url!="string"||url.trim().length==0){
return;
}
if(!_603||typeof _603!="function"){
_603=function(){
};
}
var tmpA=document.createElement("a");
tmpA.href=url;
var _605=tmpA.hostname;
var _606=tmpA.protocol;
if(_605&&(_605!=location.hostname)){
var xhr=null;
if(_601[_605]){
(function(){
if(!_601[_605].loaded){
setTimeout(arguments.callee,100);
}else{
_603(_601[_605].contentWindow.getTransport());
}
})();
}else{
var _608=document.createElement("iframe"),_609;
_608.style.display="none";
dom.ready(function(){
_601[_605]=_608;
_608.loaded=false;
document.body.insertBefore(_608,document.body.firstChild);
_608.src=_606+"//"+_605+"/ajaxproxy.htm";
dom.wrap(_608).addEvent("load",function(){
if(_608.contentWindow.location.href!==_608.src){
_608.contentWindow.location.href=_608.src;
}else{
_608.loaded=true;
try{
_609=_608.contentWindow.getTransport();
}
catch(e){
throw new Error("message : "+e.message+" from url : "+url);
}
_603(_609);
}
});
});
}
}else{
if(window.ActiveXObject){
try{
_603(new ActiveXObject("Msxml2.XMLHTTP"));
}
catch(e){
_603(new ActiveXObject("Microsoft.XMLHTTP"));
}
}else{
_603(new XMLHttpRequest());
}
}
};
this.ping=function(url){
var n="_net_ping_"+(new Date()).getTime();
var c=window[n]=new Image();
c.onload=(c.onerror=function(){
window[n]=null;
});
c.src=url;
c=null;
};
this.Request=new Class(function(){
this.__mixins__=[_600.Events];
this.initialize=function(self,_60e){
_60e=_60e||{};
self.url=_60e.url||"";
self.method=_60e.method||"get";
self.timeout=_60e.timeout&&_60e.timeout>0?_60e.timeout:0;
self.headers=_60e.headers||{};
self.data=_60e.data||null;
self._xhr=null;
if(self.urlMapper){
self.url=self.urlMapper(self.url,self.method)||self.url;
}
self.onSuccess=_60e.onSuccess;
self.onsuccess=_60e.onsuccess;
self.onerror=_60e.onerror;
self.oncomplete=_60e.oncomplete;
};
this.send=function(self,data){
_5fe.ajaxRequest(self.url,function(xhr){
var _612=false;
self._xhr=xhr;
var _613={request:self};
xhr.onreadystatechange=function(){
var xhr=self._xhr;
if(xhr.readyState===4){
if(_612){
return;
}else{
if(self._timer){
clearTimeout(self._timer);
self._timer=null;
}
}
self.responseText=xhr.responseText;
self.responseXML=xhr.responseXML;
if(self.requestBlocker&&self.requestBlocker.block&&self.requestBlocker.block(xhr)){
self.requestBlocker.handle(xhr);
return;
}
_613.responseText=xhr.responseText;
_613.responseXML=xhr.responseXML;
if(xhr.status===undefined||xhr.status===0||(xhr.status>=200&&xhr.status<300)){
self.fireEvent("success",_613);
if(self.onSuccess){
self.onSuccess(_613);
}
}else{
self.fireEvent("error",_613);
}
self.fireEvent("complete",_613);
}
};
var xhr=self._xhr;
var url=self.url;
if(!data){
data=self.data;
}
if(data&&self.method=="get"){
url+=(url.indexOf("?")!=-1?"&":"?")+data;
data=null;
}
xhr.open(self.method,url,true);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
for(var name in self.headers){
xhr.setRequestHeader(name,self.headers[name]);
}
if(!self.headers["X-Requested-With"]){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(self.timeout){
self._timer=setTimeout(function(){
_612=true;
self.abort();
self.fireEvent("timeout",_613);
self.fireEvent("complete",_613);
},self.timeout);
}
self._xhr.send(data);
});
};
this.abort=function(self){
if(self._xhr){
self._xhr.abort();
}
if(self._timer){
clearTimeout(self._timer);
self._timer=null;
}
};
this.getResponseHeader=function(self,key){
return self._xhr.getResponseHeader(key);
};
this.setHeader=function(self,name,_61c){
self.headers[name]=_61c;
};
});
});
object.add("./mvc.js","events",function(_61d,_61e){
this.Action=new Class(_61e.Events,function(){
this.initialize=function(self){
_61e.Events.initialize(self);
self.view=null;
};
this.execute=function(self,view){
self.view=view;
view.load(self);
};
});
});
object.add("./urlparse.js",function(_622){
var _623="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-.";
function splitUntil(_624,url,_626,_627){
var min=url.length;
for(var i=0,len=url.length;i<len;i++){
if(_626.indexOf(url.charAt(i))!=-1){
if(i<min){
min=i;
break;
}
}
}
_624.got=url.substring(0,min);
_624.remained=(_627?url.substring(min):url.substring(min+1));
return _624;
}
function urlparse(url,_62c){
if(typeof url!="string"){
return ["","","","","",""];
}
var _62d="",_62e="",path="",_630="",_631="",_632="",i=0;
i=url.indexOf(":");
if(i>0){
if(url.substring(0,i)=="http"){
_62d=url.substring(0,i).toLowerCase();
url=url.substring(i+1);
}else{
for(var i=0,len=url.length;i<len;i++){
if(_623.indexOf(url.charAt(i))==-1){
break;
}
}
_62d=url.substring(0,i);
url=url.substring(i+1);
}
}
if(!_62d&&_62c){
_62d=_62c;
}
var _635={};
if(url.substring(0,2)=="//"){
splitUntil(_635,url.substring(2),"/?#",true);
_62e=_635.got;
url=_635.remained;
}
if(url.indexOf("#")!=-1){
splitUntil(_635,url,"#");
url=_635.got;
_632=_635.remained;
}
if(url.indexOf("?")!=-1){
splitUntil(_635,url,"?");
url=_635.got;
_631=_635.remained;
}
if(url.indexOf(";")!=-1){
splitUntil(_635,url,";");
path=_635.got;
_630=_635.remained;
}
if(!path){
path=url;
}
return [_62d,_62e,path,_630,_631,_632];
}
function urlunparse(_636){
if(!_636){
return "";
}
var url="";
if(_636[0]){
url+=_636[0]+"://"+_636[1];
}
if(_636[1]&&_636[2]&&_636[2].indexOf("/")!=0){
url+="/";
}
url+=_636[2];
if(_636[3]){
url+=";"+_636[3];
}
if(_636[4]){
url+="?"+_636[4];
}
if(_636[5]){
url+="#"+_636[5];
}
return url;
}
function urljoin(base,url){
if(!base){
return url;
}
if(!url){
return base;
}
url=String(url);
base=String(base);
var _63a=urlparse(base);
var _63b=urlparse(url,_63a[0]);
if(_63b[0]!=_63a[0]){
return url;
}
if(_63b[1]){
return urlunparse(_63b);
}
_63b[1]=_63a[1];
if(_63b[2].charAt(0)=="/"){
return urlunparse(_63b);
}
if(!_63b[2]&&!_63b[3]){
_63b[2]=_63a[2];
_63b[3]=_63a[3];
if(!_63b[4]){
_63b[4]=_63a[4];
}
return urlunparse(_63b);
}
var _63c=_63a[2].split("/").slice(0,-1).concat(_63b[2].split("/"));
if(_63c[_63c.length-1]=="."){
_63c[_63c.length-1]="";
}
for(var i=0,l=_63c.length;i<l;i++){
if(_63c[i]=="."){
_63c.splice(i,1);
i--;
}
}
var i;
while(true){
i=1;
n=_63c.length-1;
while(i<n){
if(_63c[i]==".."&&["",".."].indexOf(_63c[i-1])==-1){
_63c.splice(i-1,2);
break;
}
i++;
}
if(i>=n){
break;
}
}
if(_63c.length==2&&_63c[0]==""&&_63c[1]==".."){
_63c[_63c.length-1]="";
}else{
if(_63c.length>=2&&_63c[_63c.length-1]==".."){
_63c.pop();
_63c.pop();
_63c.push("");
}
}
_63b[2]=_63c.join("/");
return urlunparse(_63b);
}
_622.urlparse=urlparse;
_622.urlunparse=urlunparse;
_622.urljoin=urljoin;
});
object.add("./validator.js",function(_63f){
this.isUrl=function(text){
return /^(?:(\w+?)\:\/\/([\w-_.]+(?::\d+)?))(.*?)?(?:;(.*?))?(?:\?(.*?))?(?:\#(\w*))?$/i.test(text);
};
this.isEmail=function(text){
return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(text);
};
this.isIP=function(text){
return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.i.test(text);
};
});
if(object.addPath){
object.addPath("http://a.xnimg.cn/");
}
object.add("ua/extra.js","sys",function(_643,sys){
var _645=sys.modules["ua"];
if(_645){
this.__detectUAExtra=detectUAExtra;
var o=detectUAExtra();
object.extend(_645.ua,o);
}
function detectUAExtra(ua){
if(!ua&&typeof ua!="string"){
ua=navigator.userAgent;
}
var m,_649,o={},_64a=_645.numberify;
var _64b=function(key){
try{
return window.external[key];
}
catch(e){
return null;
}
};
if(m=ua.match(/360SE/)||(_64b("twGetRunPath")&&window.external.twGetRunPath().indexOf("360se.exe")!=-1)){
o[_649="se360"]=3;
}else{
if(m=ua.match(/Maxthon|MAXTHON/)||_64b("max_version")){
_649="maxthon";
try{
o[_649]=_64a(window.external["max_version"]);
}
catch(ex){
o[_649]=0;
}
}else{
if(m=ua.match(/TencentTraveler\s([\d\.]*)/)){
o[_649="tt"]=m[1]?_64a(m[1]):0;
}else{
if(m=ua.match(/TheWorld/)){
o[_649="theworld"]=3;
}else{
if(m=ua.match(/SE\s([\d\.]*)/)){
o[_649="sogou"]=m[1]?_64a(m[1]):0;
}else{
if(m=ua.match(/QQBrowser.([\d\.]*)/)){
o[_649="qqbrowser"]=m[1]?_64a(m[1]):0;
}
}
}
}
}
}
_649&&(o.shell=_649);
return o;
}
});
object.add("ua/os.js","sys",function(_64d,sys){
var _64f=sys.modules["ua"];
var _650=function(s){
var c=0;
return parseFloat(s.replace(/_/g,".").replace(/\./g,function(){
return (c++===0)?".":"";
}));
};
if(_64f){
this._detectOS=detectOS;
var o=detectOS(navigator.userAgent.toLowerCase());
object.extend(_64d,o);
}
function is(obj,type){
type=type.replace(/\b[a-z]/g,function(_656){
return _656.toUpperCase();
});
return Object.prototype.toString.call(obj)=="[object "+type+"]";
}
function assertTrue(bool,msg){
if(!bool){
throw new Error(msg);
}
}
function assertNotNull(obj,msg){
if(obj==null){
throw new Error(msg);
}
}
function detectOS(ua){
ua=ua||navigator.userAgent;
ua=ua.toLowerCase();
var _65c=[{core:"windowsnt",match:function(ua){
return /windows\snt/.test(ua)&&!/xblwp7/.test(ua);
},versionRule:/windows nt\s([\.\d]*)/},{core:"windowsnt",match:/windows\sxp/,version:5.1},{core:"windowsnt",match:/windows\s2000/,version:5},{core:"windowsnt",match:/winnt/,version:4},{core:"windows",match:/windows me/,version:"me"},{core:"windows",match:/windows 98|win98/,version:"98"},{core:"windows",match:/windows 95|win95/,version:"95"},{core:"windows",match:/win16/,version:"3.1"},{core:"windows/phone",match:/windows\sphone/,versionRule:/windows phone os ([\d\.]*)/},{core:"windows/phone",match:/xblwp7/,version:7},{core:"windows/mobile",match:/windows mobile|wce|windows ce|pocket pc|wince/,versionRule:/iemobile ([\.\d]*)/},{core:"windows",match:/win/,version:"unknown"},{core:"android",match:/\sandroid/,versionRule:/android ([^\s]*);/},{core:"linux/debian",match:/debian/,versionRule:/debian[\s\/-]([\.\d]*)/},{core:"linux/redhat",match:/red\shat/,versionRule:/red hat[\s\/-]([\.\d]*)/},{core:"linux/fedora",match:/fedora/,versionRule:/fedora[\s\/-]([\.\d]*)/},{core:"linux/ubuntu",match:/ubuntu/,versionRule:/ubuntu[\s\/-]([\.\d]*)/},{core:"linux/suse",match:/suse/,versionRule:/suse[\s\/-]([\.\d]*)/},{core:"linux/mint",match:/mint/,versionRule:/mint[\s\/-]([\.\d]*)/},{core:"linux/centos",match:/centos/,versionRule:/centos[\s\/-]([\.\d]*)/},{core:"linux/gentoo",match:/gentoo/,version:"unknown"},{core:"linux",match:/linux/,version:"unknown"},{core:"chromeos",match:/cros/,version:"unknown"},{core:"unix/sunos",match:/sunos/,version:"unknown"},{core:"unix/freebsd",match:/freebsd/,version:"unknown"},{core:"unix/openbsd",match:/openbsd/,version:"unknown"},{core:"unix/aix",match:/aix/,version:"unknown"},{core:"unix/hp_ux",match:/hp-ux/,version:"unknown"},{core:"unix",match:/x11/,version:"unknown"},{core:"macos",match:/mac_powerpc|ppc/,version:"ppc"},{core:"macos",match:/intel/,version:"intel"},{core:"macos",match:/mac_68000|68k/,version:"68k"},{core:"ios",match:function(ua){
return /applewebkit/.test(ua)&&/ mobile\//.test(ua)&&/like/.test(ua);
},versionRule:/os ([\_\.\d]*)/},{core:"macos",match:/mac/,version:"unknown"},{core:"os2",match:function(ua){
return /os\/2|ibm-webexplorer/.test(ua)||navigator.appVersion.indexOf("os/2")!=-1;
},version:"unknown"},{core:"symbian",match:/symbian|s60|symbos|symbianos|series40|series60|nokian/,versionRule:/symbian(?:os)?\/([\d\.]*);/},{core:"blackberry",match:/blackberry|rim\stablet\sos/,versionRule:/(?:version\/|blackberry[\d]{4}\/)([\d\.]*)/},{core:"webos",match:/webos/,versionRule:/webos\/([^\s]*);/},{core:"palmos",match:/palmos/,version:"unknown"}];
var o={};
for(var i=0,l=_65c.length,_663,_664=false;i<l;i++){
_663=_65c[i];
var _665=_663.match;
assertTrue(is(_665,"RegExp")||is(_665,"Function"),"match rule should be regexp or function");
if(is(_665,"RegExp")){
_664=_665.test(ua);
}else{
if(is(_665,"Function")){
_664=_665(ua);
assertNotNull(_664,"match function must return true/false");
}
}
if(!_664){
continue;
}
var _666=null,_667=_663.core.split("/"),_668=_667.length;
if(_668>1){
o.oscore=_667[0];
_666=o;
for(var m=0;m<_668-1;m++){
_666=_666[_667[m]]={};
}
}else{
o.oscore=_663.core;
}
var _66a=_663.version||"unknown";
if(_663.versionRule){
assertTrue(is(_663.versionRule,"RegExp"),"version rule should be regexp");
m=ua.match(_663.versionRule);
if(m&&m[1]){
_66a=_650(m[1]);
}
}
if(_666){
_666[_667[_668-1]]=_66a;
}else{
o[o.oscore]=_66a;
}
break;
}
if(o.ios){
m=ua.match(/ipad|ipod|iphone/);
if(m&&m[0]){
o[m[0]]=o.ios;
}
}
if(navigator&&navigator.cajaVersion){
o.caja=navigator.cajaVersion;
}
if(!_664){
o.oscore="unknown";
}
if(/wow64|x64|win64|ia64|x86_64|amd64|sparc64|ppc64/.test(ua)){
o.processor=64;
}else{
o.processor=32;
}
if(window.devicePixelRatio>=2){
o.resolution={width:screen.width*window.devicePixelRatio,height:screen.height*window.devicePixelRatio};
}else{
o.resolution={width:screen.width,height:screen.height};
}
var _66b=typeof window.orientation!="undefined"?true:false;
if(_66b){
if(window.innerWidth!=undefined){
o.orientation=window.innerWidth>window.innerHeight?"landscape":"profile";
}else{
o.orientation=window.screen.width>window.screen.height?"landscape":"profile";
}
}else{
o.orientation="unknown";
}
return o;
}
});
object.add("ua/flashdetect.js",function(_66c){
this.getFlashVersion=function(){
var _ver=false;
if(navigator.plugins&&navigator.mimeTypes.length){
var x=navigator.plugins["Shockwave Flash"];
if(x&&x.description){
_ver=x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".")[0];
}
}else{
if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){
var axo=1;
var _670=3;
while(axo){
try{
_670++;
axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_670);
_ver=_670;
}
catch(e){
axo=null;
}
}
}else{
try{
var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
}
catch(e){
try{
var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
_ver=6;
axo.AllowScriptAccess="always";
}
catch(e){
if(_ver==6){
return _ver;
}
}
try{
axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
}
catch(e){
}
}
if(axo!=null){
_ver=axo.GetVariable("$version").split(" ")[1].split(",")[0];
}
}
}
return _ver;
};
});
object.define("xn.net","sys, net",function(_671,_672){
var sys=_671("sys");
var net=_671("net");
var _675=net.Request.prototype.send;
net.Request.set("send",function(self,data){
data=data||self.data||"";
if(self.method=="post"&&XN.get_check&&!/[\?|\&]requestToken=/.test(data)){
data+=(data?"&":"")+"requestToken="+XN.get_check;
}
if(self.method=="post"&&XN.get_check_x&&!/[\?|\&]_rtk=/.test(data)){
data+=(data?"&":"")+"_rtk="+XN.get_check_x;
}
_675.call(self,data);
});
this.Request=net.Request;
});
object.define("jxn","dom, string, net, xn.net, ua",function(_678,_679){
_678("xn.net");
var _67a=Object.prototype.toString,_67b=Array.prototype.slice,dom=_678("dom"),net=_678("net"),ua=_678("ua"),_67f=_678("string"),_680=/^<[\w\W]+>/,_681=/^<([\w]+)>$/,_682=function(){
},_683=false,_684=function(){
},cons=typeof console!="undefined"?console:{log:_682,error:_682,warn:_682},jxn=function(_687,_688){
var node,_68a=null,_68b,_68c,i,l,msg;
if(jxn.isJxnNode(_687)){
return _687;
}
if(jxn.isString(_687)){
_687=jxn.trim(_687);
if(jxn.isHTMLTag(_687)){
node=document.createElement(RegExp.$1);
_68a=[node];
}else{
if(jxn.isHTMLString(_687)){
_68a=dom.getDom(_687).childNodes;
_68c=[];
for(i=0,l=_68a.length;i<l;i++){
if(jxn.isDomNode(_68a[i])){
_68c[_68c.length]=_68a[i];
}
}
_68a=_68c;
}else{
if(_687.toLowerCase()=="body"||_687.toLowerCase()=="html"){
_68a=Sizzle(_687);
}else{
_688=_688||document.body;
if(jxn.isJxnNode(_688)){
_688=_688[0];
}
_68a=Sizzle(_687,_688);
}
}
}
}else{
if(jxn.isFunction(_687)){
dom.ready(_687);
return;
}else{
if(jxn.isAcceptableElement(_687)){
_68a=[_687];
}else{
if(jxn.isArray(_687)){
_68a=_687;
for(i=0,l=_68a.length;i<l;i++){
if(!jxn.isAcceptableElement(_68a[i])){
msg="array elements should be all dom nodes";
if(_68a[i].nodeType==3){
msg+=", text node(nodeType = 3) is not acceptable";
}
jxn.error(msg);
return;
}
}
}
}
}
}
_68b=new _684();
var len=_68a?_68a.length:0;
_68b.length=len;
for(i=0;i<len;i++){
_68b[i]=_68a[i];
}
return _68b;
};
jxn.extend=function(dest,src){
if(typeof src==="undefined"){
src=dest;
dest=jxn;
}
var prop;
for(prop in src){
if(src.hasOwnProperty(prop)){
dest[prop]=src[prop];
}
}
};
jxn.extend({errors:[],warns:[],logs:[],consoleClean:function(flag){
_683=flag;
},resetLogs:function(){
jxn.errors.length=0;
jxn.warns.length=0;
jxn.logs.length=0;
},error:function(){
var msg=_67b.call(arguments);
jxn.errors.push(msg.join(","));
!_683&&cons.error(msg);
},log:function(){
var msg=_67b.call(arguments);
jxn.logs.push(msg.join(","));
!_683&&cons.log(msg);
},warn:function(){
var msg=_67b.call(arguments);
jxn.warns.push(msg.join(","));
!_683&&cons.warn(msg);
},slice:_67b,isInDomTree:function(_698){
return !!dom.wrap(_698).getParent("body");
},isDomNode:function(obj){
return obj&&obj.nodeType==1;
},isAcceptableElement:function(obj){
return obj&&(obj.nodeType==1||obj.nodeType==9||obj==window);
},isFunction:function(obj){
return _67a.call(obj)=="[object Function]";
},isUndefined:function(obj){
return typeof obj==="undefined";
},isObject:function(obj){
return obj&&_67a.call(obj)=="[object Object]";
},isArray:function(obj){
return _67a.call(obj)=="[object Array]";
},isString:function(obj){
return typeof obj=="string";
},isRegExp:function(obj){
return _67a.call(obj)=="[object RegExp]";
},isBoolean:function(obj){
return obj&&_67a.call(obj)=="[object Boolean]";
},isNumber:function(obj){
return typeof obj=="number";
},trim:function(str){
if(!str){
return str;
}
return str.replace(/^\s+|\s+$/g,"");
},isHTMLString:function(obj){
return jxn.isString(obj)&&_680.test(obj);
},isHTMLTag:function(obj){
return jxn.isString(obj)&&_681.test(obj);
},isDocument:function(obj){
return obj&&obj.nodeType===9;
},isWindow:function(node){
return node&&typeof node==="object"&&"setInterval" in node&&jxn.isDocument(node.document);
},getNumber:function(str){
return parseFloat(str,10);
},getWindow:function(node){
return jxn.isWindow(node)?node:node.nodeType===9?node.defaultView||node.parentWindow:false;
},isJxnNode:function(node){
return node&&node.constructor==_684;
},forEach:function(obj,fun){
var i,l,prop;
if(jxn.isArray(obj)){
for(i=0,l=obj.length;i<l;i++){
fun.call(obj,obj[i],i);
}
}else{
if(jxn.isObject(obj)){
for(prop in obj){
if(!obj.hasOwnProperty(prop)){
continue;
}
fun.call(obj,prop,obj[prop]);
}
}
}
},registerPlugin:function(name,_6b1,_6b2){
var i,_6b4,l;
_684._plugins=_684._plugins||{};
if(_684._plugins[name]){
jxn.error("plugin "+name+" already exists!");
return;
}
_684._plugins[name]=_6b1;
jxn._extendAsPlugin(_684.prototype,_6b1,name);
if(jxn.isArray(_6b2)){
for(i=0,l=_6b2.length;i<l;i++){
_6b4=_6b2[i];
if(!jxn.isString(_6b4)){
jxn.error(_6b4+" is not string");
continue;
}
if(jxn[_6b4]){
jxn.error(_6b4+" exists in jxn");
continue;
}
jxn[_6b4]=_6b1[_6b4];
}
}
},_extendAsPlugin:function(dest,src,name){
for(var prop in src){
if(!src.hasOwnProperty(prop)){
continue;
}
pluginProp=src[prop];
if(jxn.isFunction(pluginProp)){
jxn._appendFnToDest(dest,prop,pluginProp,name);
}else{
dest[prop]=src[prop];
}
}
},_appendFnToDest:function(dest,prop,_6bc,name){
if(prop in dest){
jxn.warn(prop,name,dest[prop].__by,"\u91cd\u590d\u8bbe\u7f6e");
}
dest[prop]=function(){
var i,l,_6c0,_6c1,_6c2=this,node,_6c4=[],_6c5=false;
for(i=0,l=_6c2.length;i<l;i++){
node=_6c2[i];
_6c0=_67b.call(arguments);
_6c0.unshift(node);
_6c1=_6bc.apply(this,_6c0);
_6c4[_6c4.length]=_6c1;
if(_6c1!==undefined){
_6c5=true;
}
}
if(_6c5){
return _6c4[0];
}
return this;
};
dest[prop].__name=prop;
dest[prop].__by=name;
}});
if(!ua.ua.ie){
_684.prototype=new Array();
_684.prototype.constructor=_684;
}else{
jxn.forEach(["concat","indexOf","join","lastIndexOf","pop","push","reverse","shift","slice","sort","splice","unshift","valueOf","forEach","some","every","map","filter"],function(_6c6){
_684.prototype[_6c6]=Array.prototype[_6c6];
});
}
jxn.extend(_684.prototype,{each:function(func){
var i,l=this.length;
for(i=0;i<l;i++){
func.call(this[i],this[i]);
}
return this;
},toArray:function(){
return _67b.call(this);
},node:function(_6ca){
return jxn(this[_6ca]);
},index:function(node){
if(!node){
if(!this[0]){
return -1;
}
return this.prevAll().length;
}
if(jxn.isJxnNode(node)){
node=node[0];
}
var i,l=this.length;
for(i=0;i<l;i++){
if(node==this[i]){
return i;
}
}
return -1;
},eq:function(_6ce){
if(_6ce==-1){
return this.node(this.length-1);
}
return this.node(_6ce);
},first:function(){
return this.eq(0);
},last:function(){
return this.eq(-1);
}});
(function(jxn,_6d0){
var _6d1={},_6d2=function(_6d3){
if(_6d3.preventDefault){
_6d3.preventDefault();
}else{
_6d3.returnValue=false;
}
return false;
},_6d4=["error","unload","scroll","resize"],_6d5=["blur","change","click","dblclick","focus","select","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"];
var _6d6={load:function(_6d7,_6d8,_6d9){
if(jxn.isWindow(_6d7)){
dom.wrap(_6d7).addEvent("load",_6d8,_6d9);
}else{
jxn.loadFile.apply(_6d7,arguments);
}
},delegate:function(_6da,_6db,_6dc,_6dd,_6de){
jxn.forEach(_6dc.split(" "),function(type){
dom.wrap(_6da).delegate(_6db,type,_6dd,_6de);
});
},undelegate:function(_6e0,_6e1,_6e2,_6e3,_6e4){
jxn.forEach(_6e2.split(" "),function(type){
dom.wrap(_6e0).undelegate(_6e1,type,_6e3,_6e4);
});
},trigger:function(_6e6,_6e7,data){
dom.wrap(_6e6).fireEvent(_6e7,data);
},bind:function(_6e9,_6ea,_6eb,_6ec){
if(jxn.isObject(_6ea)){
for(var prop in _6ea){
dom.wrap(_6e9).addEvent(prop,_6ea[prop],_6ec);
}
return;
}
var _6ee=_6ea.split(" ");
for(var i=0,l=_6ee.length;i<l;i++){
dom.wrap(_6e9).addEvent(_6ee[i],_6eb,_6ec);
}
},unbind:function(_6f1,_6f2,_6f3,_6f4){
if(jxn.isObject(_6f2)){
for(var prop in _6f2){
dom.wrap(_6f1).removeEvent(prop,_6f2[prop],_6f4);
}
return;
}
var _6f6=_6f2.split(" ");
for(var i=0,l=_6f6.length;i<l;i++){
dom.wrap(_6f1).removeEvent(_6f6[i],_6f3,_6f4);
}
},on:function(_6f9,_6fa,_6fb,_6fc){
var _6fd=false;
jxn.forEach(jxn._specialEvents,function(_6fe){
if(_6fe.likes(_6fa)){
_6fd=true;
_6fe.on(_6f9,_6fa,_6fb,_6fc);
}
});
if(_6fd){
return;
}
dom.wrap(_6f9).addEvent(_6fa,_6fb,_6fc);
},off:function(_6ff,_700,_701,_702){
var _703=false;
jxn.forEach(jxn._specialEvents,function(_704){
if(_704.likes(_700)){
_703=true;
_704.off(_6ff,_700,_701,_702);
}
});
if(_703){
return;
}
dom.wrap(_6ff).removeEvent(_700,_6d1[_701]||_701,_702);
if(_6d1[_701]){
_6d1[_701]=null;
delete _6d1[_701];
}
},one:function(_705,_706,_707,_708){
function realHandler(){
_707.apply(this,arguments);
dom.wrap(_705).removeEvent(_706,realHandler,_708);
_6d1[_707]=null;
delete _6d1[_707];
}
_6d1[_707]=realHandler;
dom.wrap(_705).addEvent(_706,realHandler,_708);
},hover:function(_709,_70a,_70b){
if(!_70a){
return;
}
dom.wrap(_709).addEvent("mouseenter",_70a);
dom.wrap(_709).addEvent("mouseleave",_70b||_70a);
},ready:function(_70c,_70d){
if(_70c!=document){
jxn.error("ready should be called for jxn(document)");
return;
}
dom.ready(_70d);
},submit:function(_70e,_70f){
if(!_70e||!_70e.tagName){
jxn.error("element should have tagName");
return;
}
var _710=_70e.tagName.toLowerCase();
if(_710!="form"&&_710!="input"){
jxn.error("submit event, element should be form or input");
return;
}
if(_710=="input"&&_70e.type!="submit"){
jxn.error("submit event, type of input should be submit");
}
if(_70f===false){
_70f=_6d2;
}
dom.wrap(_70e).addEvent("submit",_70f);
},toggle:function(_711){
var _712=jxn.slice.call(arguments);
if(_712.length==1){
if(jxn.css(_711,"display")=="none"){
jxn.show(_711);
}else{
jxn.hide(_711);
}
return;
}
_712.shift();
_712.currentIndex=0;
var _713=_712.length;
if(_713<=1){
jxn.error("two event handlers for toggle at least");
return;
}
dom.wrap(_711).addEvent("click",function(){
var _714=_712.currentIndex;
_712[_714].apply(this,arguments);
_714=_714+1;
if(_714==_713){
_714=0;
}
_712.currentIndex=_714;
});
}};
function addEventToNode(_715,_716){
_6d6[_715]=function(_717,_718,_719){
if(_716&&!jxn.isWindow(_717)){
jxn.error(_715+" caller should be window");
return;
}
if(_718){
dom.wrap(_717).addEvent(_715,_718,_719);
}else{
dom.wrap(_717)[_715]();
}
};
}
for(var i=0,_71b,l=_6d4.length;i<l;i++){
_71b=_6d4[i];
addEventToNode(_71b,true);
}
for(var i=0,_71b,l=_6d5.length;i<l;i++){
_71b=_6d5[i];
addEventToNode(_71b);
}
jxn.registerPlugin("Events",_6d6,["on"]);
})(jxn);
(function(jxn,_71e){
function storeAsPrevNode(node,prev){
if(node){
node._prevJxnNode=prev;
}
return node;
}
function getPrevNode(_721){
var prev=_721._prevJxnNode;
if(prev){
_721._prevJxnNode=null;
}
return prev;
}
function handleTableInnerHTML(_723,html,_725){
if(_725=="table"){
_723.appendChild(document.createElement("tbody"));
}else{
_723=_723.parentNode;
}
var tmp=document.createElement("div");
tmp.innerHTML="<table><tbody>"+html+"</tbody></table>";
_723.replaceChild(tmp.firstChild.firstChild,_723.tBodies[0]);
tmp.removeChild(tmp.firstChild);
tmp=null;
}
function handleSelectInnerHTML(_727,html,_729){
var tmp=document.createElement("div"),_72b,_72c=_727.selectedIndex,_72d;
if(_72c==-1){
_72c=0;
}
tmp.innerHTML="<select>"+html+"</select>";
_72b=tmp.firstChild;
while(_72d=_72b.firstChild){
_727.appendChild(_72d);
}
tmp.removeChild(_72b);
_727.selectedIndex=_72c;
}
var Dom={show:function(_72f){
dom.wrap(_72f).show();
},hide:function(_730){
dom.wrap(_730).hide();
},after:function(_731,_732){
_731=dom.wrap(_731);
var node=_732;
if(jxn.isString(_732)){
node=jxn(_732)[0];
}else{
if(jxn.isFunction(_732)){
_732=_732.call(_731,null);
if(!_732){
return;
}
jxn(_731).after(_732);
return;
}else{
if(jxn.isJxnNode(_732)){
_732.each(function(node){
jxn.after(_731,node);
});
}
}
}
if(jxn.isDomNode(node)){
dom.wrap(_731).grab(node,"after");
}
},insertBefore:function(_735,_736){
if(jxn.isString(_736)){
_736=jxn(_736)[0];
}
_735.parentNode.insertBefore(_735,_736);
},append:function(_737,html){
if(!jxn.isAcceptableElement(_737)){
return;
}
if(jxn.isJxnNode(html)){
html.each(function(node){
_737.appendChild(node);
});
}else{
if(jxn.isString(html)){
html=dom.getDom(html);
}
_737.appendChild(html);
}
},appendTo:function(_73a,_73b){
if(_73b==="body"){
_73b=document.body;
}else{
if(_73b==="head"){
_73b=document.head||document.getElementsByTagName("head")[0]||document.documentElement;
}
}
if(!jxn.isAcceptableElement(_73a)){
return;
}
if(jxn.isString(_73b)){
_73b=Sizzle(_73b);
}else{
if(!jxn.isArray(_73b)&&!jxn.isJxnNode(_73b)){
_73b=[_73b];
}
}
var _73c=jxn.isInDomTree(_73a);
for(var i=0,_73e,l=_73b.length;i<l;i++){
_73e=_73b[i];
_73e.appendChild(_73a);
if(!_73c){
_73a=_73a.cloneNode(true);
}
}
},before:function(_740,_741){
_740=dom.wrap(_740);
var node=_741;
if(jxn.isString(_741)){
node=jxn(_741)[0];
}else{
if(jxn.isFunction(_741)){
_741=_741.call(_740,null);
if(!_741){
return;
}
jxn.before(_740,_741);
return;
}else{
if(jxn.isJxnNode(_741)){
_741.each(function(node){
jxn.before(_740,node);
});
}
}
}
if(jxn.isDomNode(node)){
dom.wrap(_740).grab(node,"before");
}
},clone:function(_744){
return _744.cloneNode(true);
},detach:function(){
},empty:function(_745){
if(!_745){
return;
}
if(_745.nodeType===1){
var _746=_745.getElementsByTagName("*");
for(var i=0,_748,l=_746.length;i<l;i++){
_748=_746[i];
try{
if(_748.clearAttributes){
_748.clearAttributes();
}else{
for(var p in node){
delete node[p];
}
}
}
catch(e){
}
}
}
while(_745.firstChild){
_745.removeChild(_745.firstChild);
}
},prepend:function(_74b,html){
if(!jxn.isAcceptableElement(_74b)){
return;
}
if(jxn.isJxnNode(html)){
html.each(function(node){
_74b.insertBefore(node,_74b.firstChild);
});
}else{
if(jxn.isString(html)){
html=dom.getDom(html);
}
_74b.insertBefore(html,_74b.firstChild);
}
},prependTo:function(_74e,_74f){
if(!jxn.isAcceptableElement(_74e)){
return;
}
if(jxn.isString(_74f)){
_74f=Sizzle(_74f);
}else{
if(!jxn.isArray(_74f)&&!jxn.isJxnNode(_74f)){
_74f=[_74f];
}
}
var _750=jxn.isInDomTree(_74e);
for(var i=0,_752,l=_74f.length;i<l;i++){
_752=_74f[i];
if(_752.firstChild){
_752.insertBefore(_74e,_752.firstChild);
}else{
_752.appendChild(_74e);
}
if(!_750){
_74e=_74e.cloneNode(true);
}
}
},remove:function(_754){
dom.wrap(_754).dispose();
},replaceAll:function(_755,_756){
if(!jxn.isAcceptableElement(_755)){
return;
}
if(jxn.isString(_756)){
_756=Sizzle(_756);
}else{
if(!jxn.isArray(_756)&&!jxn.isJxnNode(_756)){
_756=[_756];
}
}
var _757=jxn.isInDomTree(_755);
for(var i=0,l=_756.length;i<l;i++){
_756[i].parentNode.replaceChild(_755,_756[i]);
if(!_757){
_755=_755.cloneNode(true);
}
}
},replaceWith:function(_75a,html){
if(jxn.isString(html)){
html=dom.getDom(html);
}
_75a.parentNode.replaceChild(html,_75a);
},text:function(_75c,text){
if(text&&jxn.isString(text)){
dom.wrap(_75c).setContent(text);
}else{
return Sizzle.getText([_75c]);
}
},val:function(_75e,text){
if(!jxn.isUndefined(text)){
_75e.value=text;
}else{
return _75e.value;
}
},wrap:function(_760,html){
if(jxn.isFunction(html)){
html=html.call(_760,null);
}
var _762=_760.parentNode,_763=dom.getDom(jxn.trim(html)),_764=_763.firstChild;
_762.insertBefore(_763,_760);
_764.appendChild(_760);
},unwrap:function(_765){
var _766=_765.parentNode;
if(_766==document.body){
return;
}
var _767=_766.parentNode;
var _768=dom.wrap(_766).getChildren();
for(var i=0,l=_768.length;i<l;i++){
_767.insertBefore(_768[i],_766);
}
_767.removeChild(_766);
},wrapAll:function(){
alert("not implemented");
},wrapInner:function(){
alert("not implemented");
},html:function(_76b,html){
if(jxn.isUndefined(html)){
return _76b.innerHTML;
}
jxn.empty(_76b);
if(ua.ua.ie&&_76b.tagName){
if(/table|tbody/i.test(_76b.tagName)){
handleTableInnerHTML(_76b,html,_76b.tagName.toLowerCase());
return;
}
if(/select/i.test(_76b.tagName)){
handleSelectInnerHTML(_76b,html,_76b.tagName.toLowerCase());
return;
}
}
try{
dom.wrap(_76b).setContent(html);
}
catch(e){
jxn.error(_76b.tagName+" can not set innerHTML");
}
},prev:function(_76d,_76e){
_76e=_76e||"*";
return storeAsPrevNode(jxn(dom.wrap(_76d).getPrevious(_76e)),this);
},prevAll:function(_76f,_770){
_770=_770||"*";
return storeAsPrevNode(jxn(dom.wrap(_76f).getAllPrevious(_770)),this);
},next:function(_771,_772){
_772=_772||"*";
return storeAsPrevNode(jxn(dom.wrap(_771).getNext(_772)),this);
},nextAll:function(_773,_774){
_774=_774||"*";
return storeAsPrevNode(jxn(dom.wrap(_773).getAllNext(_774)),this);
},parent:function(_775,_776){
return storeAsPrevNode(jxn(dom.wrap(_775).getParent(_776)),this);
},parents:function(_777,_778){
return storeAsPrevNode(jxn(dom.wrap(_777).getParents(_778)),this);
},siblings:function(_779,_77a){
_77a=_77a||"*";
return storeAsPrevNode(jxn(dom.wrap(_779).getSiblings(_77a)),this);
},firstChild:function(_77b,_77c){
_77c=_77c||"*";
return storeAsPrevNode(jxn(dom.wrap(_77b).getFirst(_77c)),this);
},lastChild:function(_77d,_77e){
_77e=_77e||"*";
return storeAsPrevNode(jxn(dom.wrap(_77d).getLast(_77e)),this);
},children:function(_77f,_780){
_780=_780||"*";
return storeAsPrevNode(jxn(dom.wrap(_77f).getChildren(_780)),this);
},find:function(_781,_782){
return storeAsPrevNode(jxn(_782,_781),this);
},end:function(_783){
return getPrevNode(this);
}};
jxn.registerPlugin("Dom",Dom,["html","empty","before","after","show","hide"]);
})(jxn);
(function(jxn,_785){
var _786=/^-?\d+(?:px)?$/i;
var _787={width:function(_788){
if(_786.test(_788)){
_788=parseFloat(_788);
if(_788>=0){
_788=_788+"px";
}
}
return _788;
}};
_787.width=_787.height=_787.top=_787.left;
var Css={addClass:function(_78a,cls){
dom.wrap(_78a).addClass(cls);
},removeClass:function(_78c,name){
if(name===_785){
var _78e=jxn.trim(dom.wrap(_78c).className);
if(_78e==""){
return;
}
_78e=_78e.split(" ");
jxn.forEach(_78e,function(name){
name=jxn.trim(name);
if(name!=""){
dom.wrap(_78c).removeClass(name);
}
});
}else{
dom.wrap(_78c).removeClass(name);
}
},toggleClass:function(_790,_791){
dom.wrap(_790).toggleClass(_791);
},hasClass:function(_792,name){
return dom.wrap(_792).hasClass(name);
},css:function(_794,name,_796){
if(!jxn.isAcceptableElement(_794)){
jxn("css() should be called by dom node");
return;
}
_794=dom.wrap(_794);
if(jxn.isObject(name)){
jxn.forEach(name,function(prop,_798){
prop=_67f.camelCase(prop);
_798=_787[prop]?_787[prop](_798):_798;
_794.setStyle(prop,_798);
});
}else{
if(_796!==_785){
name=_67f.camelCase(name);
_796=_787[name]?_787[name](_796):_796;
_794.setStyle(_67f.camelCase(name),_796);
}else{
if(name){
if(name.indexOf(":")!=-1){
_794.style.cssText+=";"+name;
}else{
if((name=="width"||name=="height")&&_794.offsetWidth===0){
var _799={position:"absolute",visibility:"hidden",display:"block"},_79a={position:_794.getStyle("position"),visibility:_794.getStyle("visibility"),display:_794.getStyle("display")},_796;
for(var prop in _799){
_794.setStyle(prop,_799[prop]);
}
_796=_794.getStyle(_67f.camelCase(name));
for(var prop in _79a){
_794.setStyle(prop,_79a[prop]);
}
return _796;
}
return _794.getStyle(_67f.camelCase(name));
}
}else{
return _794.style.cssText;
}
}
}
}};
jxn.registerPlugin("Css",Css,["css"]);
})(jxn);
(function(jxn,_79d){
var Ajax={ajaxComplete:function(_79f,_7a0){
},ajaxSuccess:function(_7a1,_7a2){
},ajaxStop:function(_7a3,_7a4){
},ajaxStart:function(_7a5,_7a6){
},ajaxSend:function(_7a7,_7a8){
},ajaxError:function(_7a9,_7aa){
},loadFile:function(_7ab,url,data,_7ae){
if(jxn.isFunction(data)){
_7ae=data;
data=_79d;
}
var _7af=function(e){
jxn.html(_7ab,e.responseText||"");
_7ae&&_7ae.call(_7ab,e);
};
jxn.get(url,data,_7af);
},serialize:function(_7b1){
if(!jxn.isDomNode(_7b1)){
jxn.error("serialize should be called by form element");
return "";
}
var _7b2=_7b1.tagName.toLowerCase();
if(_7b2!="form"){
jxn.error("serialize should be called by form tag, not "+_7b2);
return "";
}
return dom.wrap(_7b1).toQueryString();
},serializeArray:function(_7b3){
}};
function assertStyleOnload(_7b4,_7b5){
if(_7b4.attachEvent){
_7b4.attachEvent("onload",function(){
_7b5.call(this,_7b4);
});
}else{
setTimeout(function(){
var _7b6=arguments.callee;
if(_7b5.isCalled){
return;
}
var _7b7=false;
if(ua.ua.webkit){
if(_7b4["sheet"]){
_7b7=true;
}
}else{
if(_7b4["sheet"]){
try{
if(_7b4["sheet"].cssRules){
_7b7=true;
}
}
catch(e){
if(e.code===1000||e.code==18){
_7b7=true;
}
}
}
}
if(_7b7){
setTimeout(function(){
_7b5.call(_7b4,_7b4);
},1);
}else{
setTimeout(_7b6,1);
}
},0);
}
}
function handleStyleAjaxRequest(url,_7b9){
var _7ba,head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;
var _7ba=document.createElement("link");
_7ba.rel="stylesheet";
_7ba.type="text/css";
_7ba.href=url;
head.appendChild(_7ba);
if(!_7b9){
return _7ba;
}
assertStyleOnload(_7ba,_7b9);
return _7ba;
}
function handleScriptAjaxRequest(url,_7bd){
var _7be,head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;
_7be=document.createElement("script");
_7be.async="async";
_7be.src=url;
_7be.onload=_7be.onreadystatechange=function(){
if(!_7be.readyState||/loaded|complete/.test(_7be.readyState)){
_7be.onload=_7be.onreadystatechange=null;
if(head&&_7be.parentNode){
jxn.empty(_7be);
head.removeChild(_7be);
}
_7be=_79d;
_7bd&&_7bd.call(this);
}
};
head.insertBefore(_7be,head.firstChild);
}
var _7c0={xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript"};
jxn.extend(jxn,{ajax:function(url,_7c2){
if(jxn.isObject(url)){
_7c2=url;
url=_7c2.url;
}
var _7c3=_7c2.dataType;
_7c2=_7c2||{};
if(_7c3=="script"){
handleScriptAjaxRequest(url,_7c2.success||_7c2.onsuccess||_7c2.onSuccess);
return;
}
var _7c4={};
if(_7c2.ifModified){
_7c4["If-Modified-Since"]=parseInt(_7c2.ifModified);
}
if(_7c2.ContentType){
_7c4["Content-Type"]=_7c2.ContentType;
}
if(_7c2.cache){
_7c4["Cache-Control"]=_7c2.cache||"no-cache";
}
if(_7c3){
if(_7c0[_7c3]){
_7c4["Accept"]=_7c0[_7c3]+", */*;q=0.01";
}else{
if(_7c3=="*"){
_7c4["Accept"]="*/*";
}
}
}
var data=jxn.isString(_7c2.data)?_7c2.data:_67f.toQueryString(_7c2.data);
var _7c6=_7c2.method||_7c2.type||"get";
var _7c7=new net.Request({url:url||_7c2.url,data:_7c6=="post"?"":data,dataType:_7c2.dataType,method:_7c6,timeout:_7c2.timeout,headers:_7c4,onsuccess:_7c2.success||_7c2.onsuccess||_7c2.onSuccess,onerror:_7c2.error||_7c2.onerror||_7c2.onError,oncomplete:_7c2.complete||_7c2.oncomplete||_7c2.onComplete});
_7c7.send(_7c6=="post"?data:"");
return _7c7;
},ajaxSetup:function(){
},get:function(url,data,_7ca,type){
if(jxn.isFunction(data)){
type=type||_7ca;
_7ca=data;
data=_79d;
}
if(type=="json"){
var _7cc=_7ca;
_7ca=function(e){
_7cc&&_7cc.call(this,JSON.parse(e.responseText||""));
};
}
return jxn.ajax({method:"get",url:url,data:data,success:_7ca,dataType:type});
},getJSON:function(url,data,_7d0){
return jxn.get(url,data,_7d0,"json");
},getScript:function(urls,_7d2){
if(jxn.isString(urls)){
return jxn.get(urls,_79d,_7d2,"script");
}
if(!jxn.isArray(urls)){
return;
}
var len=urls.length,_7d4=0,_7d5=function(){
_7d4++;
if(_7d4==len){
_7d2&&_7d2.call(this);
}
};
jxn.forEach(urls,function(url){
jxn.getScript(url,_7d5);
});
},getCSS:function(urls,_7d8){
if(jxn.isString(urls)){
return handleStyleAjaxRequest(urls,_7d8);
}
if(!jxn.isArray(urls)){
return;
}
var len=urls.length,_7da=0,_7db=[],_7dc=function(){
_7da++;
if(_7da==len){
_7d8&&_7d8.call(this,_7db);
}
};
jxn.forEach(urls,function(url){
_7db.push(jxn.getCSS(url,_7dc));
});
},post:function(url,data,_7e0,type){
if(jxn.isFunction(data)){
type=type||_7e0;
_7e0=data;
data=_79d;
}
return jxn.ajax({method:"post",url:url,data:data,success:_7e0,dataType:type});
},param:function(){
}});
jxn.registerPlugin("Ajax",Ajax,["loadFile"]);
})(jxn);
(function(jxn,_7e3){
var _7e4={linear:function(t,b,c,d){
return c*t/d+b;
},easeIn:function(t,b,c,d){
return c*(t/=d)*t+b;
},easeOut:function(t,b,c,d){
return -c*(t/=d)*(t-2)+b;
},easeBoth:function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t+b;
}
return -c/2*((--t)*(t-2)-1)+b;
},backIn:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
return c*(t/=d)*t*((s+1)*t-s)+b;
},backOut:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
},backBoth:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
if((t/=d/2)<1){
return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
},bounceIn:function(t,b,c,d){
return c-_7e4["bounceOut"](d-t,0,c,d)+b;
},bounceOut:function(t,b,c,d){
if((t/=d)<(1/2.75)){
return c*(7.5625*t*t)+b;
}else{
if(t<(2/2.75)){
return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
}else{
if(t<(2.5/2.75)){
return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
}
}
}
return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
},bounceBoth:function(t,b,c,d){
if(t<d/2){
return _7e4["bounceIn"](t*2,0,c,d)*0.5+b;
}
return _7e4["bounceOut"](t*2-d,0,c,d)*0.5+c*0.5+b;
}};
var _810=function(){
if(this.onTweening){
this.onTweening.apply(this);
}
if(this.current>=this.frames){
this.stop();
if(this.onComplete){
this.onComplete.apply(this);
}
this.tweening=false;
return;
}
this.current++;
};
var _811=function(_812,_813){
this.tween=_812||"linear";
this.duration=jxn.isNumber(_813)?_813:(_814[_813]||1000);
this.reset(_812,this.duration);
this.tweening=false;
};
_811.prototype={equation:function(from,to){
return this.tweenMethod((this.current/this.frames)*this.duration,from,to-from,this.duration);
},reset:function(_817,_818){
if(this.tweening){
this.stop();
}
this.duration=_818||400;
this.tween=_817||"linear";
this.fps=this.fps||35;
this.frames=Math.ceil((this.duration/1000)*this.fps);
if(this.frames<1){
this.frames=1;
}
this.tweenMethod=("function"==typeof this.tween)?this.tween:_7e4[this.tween]||_7e4["linear"];
this.current=1;
},start:function(){
this.tweening=true;
var _819=this,d=this.duration/this.frames;
this.timer=setInterval(function(){
_810.call(_819);
},d);
},stop:function(){
if(this.timer){
clearInterval(this.timer);
this.timer=null;
}
this.tweening=false;
},hold:function(){
this.stop();
},goon:function(){
this.start();
}};
var _81b=/[a-zA-Z]+/,_81c=/^(?:([+\-])=)([\d\.]+)/;
function getUnits(_81d,_81e){
var _81f=_81b.exec(_81d);
if(_81f){
return _81f[0];
}
_81f=_81b.exec(_81e);
if(_81f){
return _81f[0];
}
return "px";
}
function getNumber(_820){
return jxn.getNumber(_820);
}
function getTarget(_821,_822){
if(jxn.isNumber(_821)){
return _821;
}
if(_81c.test(jxn.trim(_821))){
if(RegExp.$1=="+"){
return _822+getNumber(RegExp.$2);
}else{
return _822-getNumber(RegExp.$2);
}
}
return getNumber(_821);
}
var _814={"slow":600,"fast":200};
function doEffect(_823,_824,_825,_826,_827){
var _828=[],_829={},_82a={},_82b={},_82c,_82d,step;
if(jxn.isFunction(_824)){
_824=_824.call(_823);
if(!_824||!jxn.isObject(_824)){
jxn.error("function as first param, should return an object");
_824={};
}
}
if(jxn.isFunction(_825)){
_827=_825;
_825=_824.duration;
}
if(jxn.isFunction(_826)){
_827=_826;
_826="linear";
}
if(jxn.isObject(_825)){
var _82f=_825;
_825=_82f.duration;
_826=_82f.easing;
_827=_82f.complete;
step=_82f.step;
}
_825=jxn.isNumber(_825)?_825:(_814[_825]||1000);
_82d=_823.__jxnMotion;
var _830=_82d.isNew;
_82d.isNew=false;
jxn.forEach(_824,function(name,_832){
name=_67f.camelCase(name);
_828.push(name);
_82c=getNumber(jxn.css(_823,name)||"0");
if(isNaN(_82c)){
_82c=0;
}
_829[name]=_82c;
_82a[name]=getTarget(_832,_82c);
_82b[name]=getUnits(_82c,_832);
});
var _833=_828.length;
if(_833==0){
}
_82d.onTweening=function(){
for(var i=0,prop,_836;i<_833;i++){
prop=_828[i];
_836=this.equation(_829[prop],_82a[prop]);
if(_82b[prop]){
_836=_836+_82b[prop];
}
jxn.css(_823,prop,_836);
}
jxn.isFunction(step)&&step.call(_823,this.equation(0,this.frames),this.frames,_82d);
};
_82d.onComplete=function(){
for(var i=0,prop,_839;i<_833;i++){
prop=_828[i];
_839=_82a[prop];
if(_82b[prop]){
_839=_839+_82b[prop];
}
if(jxn.css(_823,prop)!=_839){
jxn.css(_823,prop,_839);
}
}
jxn.isFunction(_827)&&_827.call(_823,this.frames,_82d);
this.tweening=false;
if(_823.__motionQueue&&_823.__motionQueue.length!=0){
var args=_823.__motionQueue.shift();
doEffect.apply(_823,args);
}
};
if(!_830){
_82d.reset(_826,_825);
}
_82d.start();
_823.__motion=_82d;
}
var _83b={animate:function(_83c,_83d,_83e,_83f,_840){
if(!_83d){
jxn.error("need params for animate");
return;
}
var _841,_842=_83f,_843=_83e;
if(jxn.isFunction(_842)){
_842="linear";
}
if(!_83c.__jxnMotion){
if(jxn.isObject(_83e)){
_842=_83e.easing;
_843=_83e.duration;
}
_83c.__jxnMotion=new _811(_842,_843);
_83c.__jxnMotion.isNew=true;
}
_841=_83c.__jxnMotion;
if(_841.tweening){
_83c.__motionQueue=_83c.__motionQueue||[];
_83c.__motionQueue.push(jxn.slice.call(arguments));
return;
}
doEffect.apply(_83c,arguments);
},clearQueue:function(_844){
var _845=_844.__motionQueue;
if(!_845){
return;
}
for(var i=0,l=_845.length;i<l;i++){
_845[i]=null;
}
_844.__motionQueue=null;
},delay:function(_848,time,_84a){
jxn.animate(_848,{},time,"linear",_84a);
},dequeue:function(){
},fadeOut:function(_84b,_84c,_84d){
jxn.animate(_84b,{"opacity":"0"},_84c,"easeIn",function(){
jxn.css(_84b,"opacity","0");
jxn.data(_84b,"display-bak",jxn.css(_84b,"display"));
jxn.css(_84b,"display","none");
_84d&&_84d.apply(_84b,arguments);
});
},fadeIn:function(_84e,_84f,_850){
var _851=function(){
jxn.css(_84e,"display",jxn.data(_84e,"display-bak")||"");
jxn.css(_84e,"opacity","0");
return {"opacity":"1"};
};
jxn.animate(_84e,_851,_84f,"easeOut",function(){
jxn.css(_84e,"opacity","1");
jxn.removeData(_84e,"display-bak");
_850&&_850.apply(_84e,arguments);
});
},fadeTo:function(_852,_853,_854,_855){
var _856=function(){
if(_854!=0){
jxn.css(_852,"display",jxn.data(_852,"display-bak")||"");
jxn.removeData(_852,"display-bak");
}
return {"opacity":_854};
};
jxn.animate(_852,_856,_853,"linear",function(){
jxn.css(_852,"opacity",_854);
_855&&_855.apply(_852,arguments);
});
},fadeToggle:function(){
},fx:{interval:function(){
},off:function(){
}},queue:function(){
},slideDown:function(_857,_858,_859){
var _85a=function(){
var _85b,_85c,_85d,node;
if(jxn.data(this,"animate-height-bak")){
_85b=jxn.data(this,"animate-height-bak");
_85c=jxn.data(this,"animate-display-bak");
_85d=jxn.data(this,"animate-opacity-bak");
}else{
node=jxn("<"+this.tagName+">").appendTo("body");
_85b=node.css("height");
_85c=node.css("display");
_85d=node.css("opacity");
node.remove();
}
jxn.css(this,"display",_85c);
jxn.css(this,"height","0px");
return {"height":_85b,"opacity":_85d};
};
jxn.animate(_857,_85a,_858,"easeIn",_859);
},slideToggle:function(){
},slideUp:function(_85f,_860,_861){
var _862=function(){
jxn.data(this,"animate-height-bak",jxn.css(this,"height"));
jxn.data(this,"animate-opacity-bak",jxn.css(this,"opacity"));
jxn.data(this,"animate-display-bak",jxn.css(this,"display"));
return {"height":"0px","opacity":0};
};
jxn.animate(_85f,_862,_860,"easeIn",function(){
jxn.css(_85f,"opacity","0");
jxn.css(_85f,"display","none");
_861&&_861.call(_85f,arguments);
});
},start:function(_863){
_863.__jxnMotion&&_863.__jxnMotion.start();
},stop:function(_864,_865,_866){
var _867=_864.__jxnMotion;
if(!_867){
return;
}
if(_865){
jxn.clearQueue(_864);
}
_867.stop();
if(_866){
_867.onComplete();
}
},hold:function(_868){
_868.__jxnMotion&&_868.__jxnMotion.hold();
},goon:function(_869){
_869.__jxnMotion&&_869.__jxnMotion.goon();
}};
jxn.registerPlugin("Effect",_83b,["animate","clearQueue"]);
})(jxn);
(function(jxn,_86b){
var _86c=/^(?:body|html)$/i;
var _86d={position:function(_86e){
if(!_86e){
return null;
}
var ele=jxn(_86e),_870=ele.offsetParent(),_871=ele.offset(),_872=_86c.test(_870[0].nodeName)?{top:0,left:0}:_870.offset();
_871.top-=parseFloat(jxn.css(_86e,"marginTop"))||0;
_871.left-=parseFloat(jxn.css(_86e,"marginLeft"))||0;
_872.top+=parseFloat(jxn.css(_870[0],"borderTopWidth"))||0;
_872.left+=parseFloat(jxn.css(_870[0],"borderLeftWidth"))||0;
return {top:_871.top-_872.top,left:_871.left-_872.left};
},scrollTop:function(_873,_874){
if(_874!==_86b){
var win=jxn.getWindow(_873);
if(win){
win.scrollTo(jxn(win).scrollLeft(),_874);
}else{
_873.scrollTop=_874;
}
return;
}
var win=jxn.getWindow(_873);
if(win){
if("pageYOffset" in win){
return win.pageYOffset;
}
var body=win.document.body;
var _877=win.document.documentElement;
_877=(_877.clientWidth)?_877:body;
return _877.scrollTop;
}else{
return _873.scrollTop;
}
},scrollLeft:function(_878,_879){
if(_879!==_86b){
var win=jxn.getWindow(_878);
if(win){
win.scrollTo(_879,jxn.scrollTop(win));
}else{
_878.scrollLeft=_879;
}
return;
}
var win=jxn.getWindow(_878);
if(win){
if("pageXOffset" in win){
return win.pageXOffset;
}
var body=win.document.body;
var _87c=win.document.documentElement;
_87c=(_87c.clientWidth)?_87c:body;
return _87c.scrollLeft;
}else{
return _878.scrollLeft;
}
}};
jxn.registerPlugin("Position",_86d,["position","scrollLeft","scrollTop"]);
})(jxn);
(function(jxn,_87e){
var _87f=/^(?:body|html)$/i;
function getDOMLeftTop(ele){
if(ele.getBoundingClientRect){
var _881=ele.getBoundingClientRect(),html=ele.ownerDocument.documentElement,_883={x:getScrollLeft(ele),y:getScrollTop(ele)},_884=(ele.style.position=="fixed");
return {left:parseInt(_881.left,10)+((_884)?0:_883.x)-html.clientLeft,top:parseInt(_881.top,10)+((_884)?0:_883.y)-html.clientTop};
}
var _885=ele,_886={left:0,top:0};
if(ele.tagName=="BODY"){
return _886;
}
while(_885&&_885.tagName!="BODY"){
_886.left+=_885.offsetLeft;
_886.top+=_885.offsetTop;
if(ua.ua.gecko){
if(!borderBox(_885)){
_886.left+=parseFloat(_885.style.borderLeftWidth);
_886.top+=parseFloat(_885.style.borderTopWidth);
}
var _887=_885.parentNode;
if(_887&&_887.style.overflow!="visible"){
_886.left+=parseFloat(_887.style.borderLeftWidth);
_886.top+=parseFloat(_887.style.borderTopWidth);
}
}else{
if(_885!=ele&&ua.ua.webket){
_886.left+=parseFloat(_885.style.borderLeftWidth);
_886.top+=parseFloat(_885.style.borderTopWidth);
}
}
_885=_885.offsetParent;
}
if(ua.ua.gecko&&ele.style.MozBoxSizing!="border-box"){
_886.left-=parseFloat(ele.style.borderLeftWidth);
_886.top-=parseFloat(ele.style.borderTopWidth);
}
return _886;
}
function getScrollTop(ele){
if(document.documentElement&&document.documentElement.scrollTop){
return document.documentElement.scrollTop;
}else{
return document.body.scrollTop;
}
}
function getScrollLeft(ele){
if(document.documentElement&&document.documentElement.scrollLeft){
return document.documentElement.scrollLeft;
}else{
return document.body.scrollLeft;
}
}
function getWidthOrHeight(_88a,name,_88c){
var prop=name.toLowerCase();
if(jxn.isWindow(_88a)){
var _88e=_88a.document.documentElement["client"+name],body=_88a.document.body;
return _88a.document.compatMode==="CSS1Compat"&&_88e||body&&body["client"+name]||_88e;
}else{
if(jxn.isDocument(_88a)){
return Math.max(_88a.documentElement["client"+name],_88a.body["client"+name],_88a.documentElement["client"+name],_88a.body["client"+name],_88a.documentElement["client"+name]);
}
}
if(_88c!==_87e){
if(jxn.isNumber(_88c)){
_88c=_88c+"px";
}
jxn.css(_88a,prop,_88c);
return;
}
return parseInt(jxn.css(_88a,prop));
}
var _890={offsetParent:function(_891){
var _892=_891.offsetParent||document.body;
while(_892&&(!_87f.test(_892.nodeName)&&jxn.css(_892,"position")==="static")){
_892=_892.offsetParent;
}
return jxn(_892);
},offset:function(_893){
return getDOMLeftTop(_893);
},width:function(_894,_895){
return getWidthOrHeight(_894,"Width",_895);
},height:function(_896,_897){
return getWidthOrHeight(_896,"Height",_897);
},innerWidth:function(_898){
return parseFloat(jxn.css(_898,"width"))+parseFloat(jxn.css(_898,"paddingLeft"))+parseFloat(jxn.css(_898,"paddingRight"));
},innerHeight:function(_899){
return parseFloat(jxn.css(_899,"height"))+parseFloat(jxn.css(_899,"paddingTop"))+parseFloat(jxn.css(_899,"paddingBottom"));
},outerWidth:function(_89a,_89b){
return jxn.innerWidth(_89a)+(parseFloat(jxn.css(_89a,"borderLeftWidth"))||0)+(parseFloat(jxn.css(_89a,"borderRightWidth"))||0)+(_89b?(parseFloat(jxn.css(_89a,"marginLeft"))+parseFloat(jxn.css(_89a,"marginRight"))):0);
},outerHeight:function(_89c,_89d){
return jxn.innerHeight(_89c)+(parseFloat(jxn.css(_89c,"borderTopWidth"))||0)+(parseFloat(jxn.css(_89c,"borderBottomWidth"))||0)+(_89d?(parseFloat(jxn.css(_89c,"marginTop"))+parseFloat(jxn.css(_89c,"marginBottom"))):0);
}};
jxn.registerPlugin("Offset",_890,["innerWidth","innerHeight"]);
})(jxn);
(function(jxn,_89f){
var _8a0={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},_8a1=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
function isBooleanValueIn(_8a2,attr){
return _8a1.test(attr)&&attr in _8a2;
}
function setAttributeToElement(_8a4,name,_8a6,_8a7){
_8a7=_8a7||"";
if(jxn.isObject(name)){
for(var prop in name){
if(!name.hasOwnProperty(prop)){
continue;
}
setAttributeToElement(_8a4,prop,name[prop],_8a7);
}
return;
}
if(_8a6===_89f){
var attr=_8a7+name,_8aa=null,tmp,_8a6;
if(isBooleanValueIn(_8a4,attr)){
_8a6=_8a4[attr];
_8a6=!!_8a6&&_8a6!="false";
return _8a6;
}else{
_8aa=_8a4.getAttribute(attr);
if(jxn.isString(_8aa)&&jxn.trim(_8aa).indexOf("{")==0){
try{
tmp=JSON.parse(_8aa);
}
catch(e){
}
}
_8a6=tmp||_8aa;
}
return _8a6;
}else{
if(jxn.isObject(_8a6)){
_8a4.setAttribute(_8a7+name,JSON.stringify(_8a6));
}else{
_8a4.setAttribute(_8a7+name,_8a6);
}
var attr=_8a7+name;
if(isBooleanValueIn(_8a4,attr)){
_8a4[attr]=_8a6;
}
}
}
var Data={attr:function(_8ad,name,_8af){
return setAttributeToElement(_8ad,name,_8af);
},data:function(_8b0,name,_8b2){
return setAttributeToElement(_8b0,name,_8b2,"data-");
},removeAttr:function(_8b3,_8b4){
if(_8b3.nodeType!=1){
return;
}
_8b4=_8a0[_8b4]||_8b4;
if(_8b3.removeAttribute){
_8b3.setAttribute(_8b4,"");
_8b3.removeAttribute(_8b4);
if(_8a1.test(_8b4)&&_8b4 in _8b3){
_8b3[_8b4]=false;
}
}
},removeData:function(_8b5,name){
name="data-"+name;
if(_8b5.removeAttribute){
_8b5.removeAttribute(name);
}else{
_8b5[name]=null;
try{
delete _8b5[name];
}
catch(e){
}
}
}};
jxn.registerPlugin("Data",Data,["attr","data","removeData"]);
})(jxn);
(function(jxn,_8b8){
var _8b9={};
for(var prop in ua.ua){
_8b9[prop]=ua.ua[prop];
}
_8b9.version=ua.ua[ua.ua.shell];
_8b9[ua.ua.shell]=true;
jxn.browser={};
jxn.extend(jxn.browser,_8b9);
})(jxn);
(function(jxn,_8bc){
var _8bd=24*60*60*1000,_8be={get:function(name){
var _8c0=document.cookie,_8c1;
if(!_8c0||_8c0==""){
return null;
}
if(!name){
return _8c0;
}
name=jxn.trim(name);
_8c1=_8c0.split(";");
for(var i=0,_8c3,_8c4,l=_8c1.length;i<l;i++){
_8c4=jxn.trim(_8c1[i]);
_8c3=_8c4.split("=");
if(jxn.trim(_8c3[0])==name){
return decodeURIComponent(jxn.trim(_8c3[1]));
}
}
return null;
},set:function(name,_8c7,_8c8){
var _8c9="",date,path,_8cc,_8cd;
_8c8=_8c8||{};
if(_8c7===null){
_8c7="";
_8c8.expires=-1;
}
if(_8c8.expires){
if(jxn.isNumber(_8c8.expires)){
date=new Date();
date.setTime(date.getTime()+_8c8.expires*_8bd);
}else{
if(_8c8.expires.toUTCString){
date=_8c8.expires;
}
}
_8c9="; expires="+date.toUTCString();
}
path=_8c8.path?"; path="+_8c8.path:"";
_8cc=_8c8.domain?"; domain="+_8c8.domain:"";
_8cd=_8c8.secure?"; secure":"";
document.cookie=[name,"=",encodeURIComponent(_8c7),_8c9,path,_8cc,_8cd].join("");
},remove:function(name){
jxn.cookie.set(name,null);
}};
jxn.cookie=function(name,_8d0,_8d1){
if(typeof _8d0!="undefined"){
jxn.cookie.set(name,_8d0,_8d1);
}else{
return jxn.cookie.get(name);
}
};
jxn.extend(jxn.cookie,_8be);
})(jxn);
(function(jxn,_8d3){
function createDOMStorageNode(_8d4,_8d5){
var _8d6=document.createElement("div");
_8d6.style.display="none";
_8d6.style.behavior="url(#default#userData)";
var _8d7=new Date();
_8d7.setDate(_8d7.getDate()+_8d5);
_8d6.expires=_8d7.toUTCString();
(document.body||document.getElementsByTagName("body")[0]).appendChild(_8d6);
return _8d6;
}
var _8d8=new Class(function(){
this.initialize=function(self,_8da,_8db){
self.__storageName=_8da||"ObjectJSLocalStorage";
self.__expires=_8db||365*100;
self.__storageHolder=createDOMStorageNode(self.__storageName,self.__expires);
};
this.setItem=function(self,key,_8de){
var _8df=self.__storageHolder,_8e0=self.__storageName;
var _8e1=self.getItem(key);
_8df.load(_8e0);
_8df.setAttribute(key,_8de);
_8df.save(_8e0);
};
this.getItem=function(self,key){
var _8e4=self.__storageHolder,_8e5=self.__storageName;
_8e4.load(_8e5);
return _8e4.getAttribute(key);
};
this.removeItem=function(self,key){
var _8e8=self.__storageHolder,_8e9=self.__storageName;
var _8ea=self.getItem(key);
_8e8.load(_8e9);
_8e8.removeAttribute(key);
_8e8.save(_8e9);
};
this.clear=function(self){
var _8ec=self.__storageHolder,_8ed=self.__storageName;
_8ec.load(_8ed);
var _8ee=new Date();
_8ee.setDate(_8ee.getDate()-1);
_8ec.expires=_8ee.toUTCString();
_8ec.save(_8ed);
document.body.removeChild(self.__storageHolder);
self.__storageHolder=createDOMStorageNode(self.__storageName,self.__expires);
};
});
var _8ef=("localStorage" in window)&&window["localStorage"]!=null,_8f0,_8f1={},_8f2=false;
function initStorageContainer(){
if(_8f2){
return;
}
_8f2=true;
jxn(function(){
_8f0=new _8d8();
jxn.forEach(_8f1,function(name,_8f4){
_8f0.setItem(name,_8f4);
delete _8f1[name];
});
_8f1=null;
});
}
if(_8ef){
_8f0=window.localStorage;
}
jxn.storage=function(name,_8f6){
if(_8f6===_8d3){
return jxn.storage.get(name);
}else{
jxn.storage.set(name,_8f6);
}
};
jxn.storage.set=function(name,_8f8){
if(jxn.isObject(_8f8)){
_8f8=JSON.stringify(_8f8);
}
if(!_8f0){
_8f1[name]=_8f8;
initStorageContainer();
return;
}
_8f0.setItem(name,_8f8);
};
jxn.storage.get=function(name){
if(!_8f0){
return _8f1[name];
}
var _8fa=_8f0.getItem(name),tmp;
if(jxn.isString(_8fa)&&jxn.trim(_8fa).indexOf("{")==0){
try{
tmp=JSON.parse(_8fa);
}
catch(e){
}
}
return tmp||_8fa;
};
jxn.storage.remove=function(name){
if(!_8f0){
delete _8f1[name];
initStorageContainer();
return;
}
_8f0.removeItem(name);
};
jxn.storage.clear=function(){
if(!_8f0){
_8f1={};
return;
}
_8f0.clear();
};
})(jxn);
(function(jxn,_8fe){
var _8ff=2;
DELAY_FACTOR={ieshell:{"6":3,"7":2.5,"8":2,"9":1.5,"10":1.3,"other":1.2},firefox:1.2,chrome:1,other:1},cache={},DELAY_GID=0;
function getDelayFactor(_900,_901){
if(!(_900 in DELAY_FACTOR)){
return DELAY_FACTOR["other"];
}
var _902=DELAY_FACTOR[_900];
if(!jxn.isObject(_902)){
return _902;
}
return _902[_901]||_902["other"];
}
jxn.delayDo=function(fn,_904){
fn._gid=fn._gid||DELAY_GID++;
var _905,_906;
if(!fn||!jxn.isFunction(fn)){
console.error("please use delayDo like \"delayDo(function, priority)\"");
return;
}
if(fn._gid in cache){
jxn.clearDelayDo(fn._gid);
}
_904=_904||_8ff;
_905=getDelayFactor(jxn.browser.shell,jxn.browser.version);
_906=setTimeout(function(){
fn();
jxn.clearDelayDo(fn);
},_904*_905*1000);
cache[fn._gid]=_906;
};
jxn._getDelayDos=function(){
return cache;
};
jxn.delayDoOrEvent=function(fn,_908,obj,_90a){
if(!jxn.isNumber(_908)){
_90a=obj;
obj=_908;
_908=_8ff;
}
if(!obj){
jxn.delayDo(fn,_908);
return;
}
var _90b=function(){
_90c&&obj.off(_90a,_90b);
jxn.clearDelayDo(_90b);
fn();
},_90c;
jxn.delayDo(_90b,_908);
if(obj=="domready"){
jxn(_90b);
}else{
obj=jxn(obj);
_90c=true;
obj.on(_90a,_90b);
}
};
jxn.clearDelayDo=function(gid){
if(jxn.isFunction(gid)){
gid=gid._gid;
}
if(gid in cache){
clearTimeout(cache[gid]);
cache[gid]=null;
delete cache[gid];
}
};
})(jxn);
(function(jxn,_90f){
var _910=jxn(document);
jxn.scrollViewportTo=function(_911,_912){
if(!_911&&_911!==0){
return;
}
_912=_912||{};
var _913=_912.delta||0,_914=_910.scrollTop(),_915=(_911===0?0:(jxn(_911).position().top))+_913,_916=_915-_914,_917=_912.noEffect||false,_918=_912.easing||"easeOut";
if(_917){
_910.stop().clearQueue().scrollTop(_915);
return;
}
_910.stop().clearQueue().animate({},{step:function(_919,_91a){
_910.scrollTop(_914+Math.floor(_916*_919/_91a));
},duration:500,easing:_918});
};
})(jxn);
(function(jxn,_91c){
var _91d,_91e=false,_91f={},_920=3;
function inViewPort(node,_922){
var min=jxn(document).scrollTop()-_922,max=min+_91d+_922*2,top=node.position().top,_926=top+node.innerHeight();
return min<top&&top<max||min<_926&&_926<max;
}
function getViewportHeight(){
var _927,_928=document.documentElement;
if(typeof window.innerHeight!="undefined"){
_927=window.innerHeight;
}else{
if(typeof _928!=="undefined"&&typeof _928.clientHeight!=="undefined"&&_928.clientHeight!=0){
_927=_928.clientHeight;
}else{
_927=document.getElementsByTagName("body")[0].clientHeight;
}
}
return _927;
}
function doConsume(prop,_92a){
var len=_92a.length,_92c=_92a.delta;
if(len==0){
return;
}
for(var i=0,_92e;i<len;i++){
_92e=jxn(_92a[i]);
if(!inViewPort(_92e,_92c)){
continue;
}
if(prop=="value"){
_92e.val(_92e.data(prop)).removeData(prop);
}else{
_92e.attr(prop,_92e.data(prop)).removeData(prop);
}
_92a.splice(i,1);
i--;
len--;
}
}
function consumeNodes(){
jxn.forEach(_91f,function(prop,_930){
doConsume(prop,_930);
});
}
jxn._lazyLoadNodes=function(){
return _91f;
};
jxn.lazyLoad=function(_931,_932){
_932=_932||{};
var prop=_932.prop||"src",fast=!!_932.fast,_935=jxn.isNumber(_932.frequency)?_932.frequency:_920,_936=_932.delta||0,_937=jxn(_932.parent||document.body),_938;
_91f[prop]=jxn(_931,_937);
_91f[prop].delta=_936;
if(_91e){
return;
}
_91e=true;
_938=(fast===true)?"scroll":("scroll/"+_935);
jxn(window).on("resize",function(){
_91d=getViewportHeight();
consumeNodes();
}).on(_938,function(){
consumeNodes();
});
_91d=getViewportHeight();
consumeNodes();
};
jxn.addLazyLoadNodes=function(_939,_93a){
_93a=_93a||{};
var prop=_93a.prop||"src",_93c=_91f[prop]=_91f[prop]||[],_93d=_93a.selector||"[data-"+prop+"]";
for(var i=0,_93f,l=_939.length;i<l;i++){
_93f=jxn(_939[i]);
if(!_93f.data(prop)){
_93f=jxn(_93d,_93f);
}
if(_93f.length!=0){
_93c.push(_93f);
}
}
doConsume(prop,_93c);
};
})(jxn);
(function(jxn,_942){
jxn._specialEvents=jxn._specialEvents||[];
var reg=/^scroll\/\d+$/,_944={},GID=0,_946={ieshell:20,firefox:1.4,chrome:1,other:1},_947={};
function buildHandler(_948,_949,_94a,gid,_94c){
return function(){
var _94d=this,_94e=arguments,_94f=_94a*100;
if(_94f>2000){
_94f=2000;
}
if(_948==0){
_949&&clearTimeout(_949);
_949=setTimeout(function(){
_94c.apply(_94d,_94e);
_948=0;
_949=null;
delete _947[gid];
},_94f);
_947[gid]=_949;
}
_948++;
if(_948>=_94a-1){
_94c.apply(_94d,_94e);
_948=0;
if(_949){
clearTimeout(_949);
_949=null;
delete _947[gid];
}
}
};
}
function onSpecialScroll(_950,_951,_952,_953){
var gid=_952._scroll_gid=GID++,_955;
_955=parseInt(_951.split("/")[1]);
if(isNaN(_955)){
jxn.error("scroll/N, N should be a number");
return;
}
times=_955*(_946[jxn.browser.shell]||_946["other"]);
var _956=0,_957=null,_958=buildHandler(_956,_957,times,gid,_952);
_944[_952._scroll_gid]=_958;
dom.wrap(_950).addEvent("scroll",_958,_953);
}
function offSpecialScroll(_959,_95a,_95b,_95c){
var gid=_95b._scroll_gid,_95e=_947[gid];
dom.wrap(_959).removeEvent("scroll",_944[_95b._scroll_gid],_95c);
if(_95e){
clearTimeout(_95e);
_95e=null;
delete _947[gid];
}
}
jxn._specialEvents.push({likes:function(_95f){
return reg.test(_95f);
},on:onSpecialScroll,off:offSpecialScroll});
})(jxn);
return jxn;
});
if(!window.jxn){
object.use("jxn",function(jxn){
window.jxn=jxn;
});
}
object.add("XN","dom, ua",function(_961,dom,ua){
this.DEBUG_MODE=false;
var _964="http://s.xnimg.cn/";
this.debug={log:function(){
},on:function(){
_961.DEBUG_MODE=true;
if(window.console&&console.log){
_961.debug.log=function(s){
console.log(s);
};
}
},off:function(){
_961.debug.log=function(){
};
}};
this.namespace=function(){
var a=arguments,o=null,i,j,d;
for(i=0;i<a.length;i++){
d=a[i].split(".");
o=_961;
for(j=(d[0]=="XN")?1:0;j<d.length;j++){
o[d[j]]=o[d[j]]||{};
o=o[d[j]];
}
}
return o;
};
this.log=function(s){
_961.debug.log(s);
};
this.isUndefined=function(_96c){
return typeof _96c=="undefined";
};
this.isString=function(_96d){
return typeof _96d=="string";
};
this.isElement=function(_96e){
return _96e&&_96e.nodeType==1;
};
this.isFunction=function(_96f){
return typeof _96f=="function";
};
this.isObject=function(_970){
return typeof _970=="object";
};
this.isArray=function(_971){
return Object.prototype.toString.call(_971)==="[object Array]";
};
this.isNumber=function(_972){
return typeof _972=="number";
};
this.$extend=function(){
var _973=arguments[0];
for(var i=1;i<arguments.length;i++){
if(typeof arguments[i]=="object"){
for(var key in arguments[i]){
_973[key]=arguments[i][key];
}
}
}
return _973;
};
this.namespace("config");
this.config.jumpOut=true;
(function(){
var _976={};
var _977={};
_961.getFileVersionNum=function(file){
return _977[file];
};
function hasLoad(file){
return !!getFile(file);
}
function getFile(file){
return _976[encodeURIComponent(file)];
}
function mark(file){
var obj={};
obj.file=file;
obj.isLoad=true;
obj.isLoaded=true;
_976[encodeURIComponent(file)]=obj;
}
function enableCustomEvent(_97d){
_97d.addEvent=function(type,func){
if(!this._customEventListeners){
this._customEventListeners={};
}
var _980=this._customEventListeners;
if(_961.isUndefined(_980[type])){
_980[type]=[];
}
_980[type].push(func);
return this;
},_97d.delEvent=function(type,func){
var _983=this._customEventListeners[type];
if(_983){
for(var i=_983.length-1;i>=0;i--){
if(_983[i]==func){
_983[i]=null;
break;
}
}
}
return this;
},_97d.fireEvent=function(type){
if(!this._customEventListeners||!this._customEventListeners[type]){
return;
}
var _986=this._customEventListeners[type],ars=buildArray(arguments);
ars.shift();
for(var i=0,j=_986.length;i<j;i++){
if(_986[i]){
try{
_986[i].apply(this,ars);
}
catch(ox){
if(_961.DEBUG_MODE){
throw ox;
}
}
}
}
};
}
function buildArray(o){
var rt=[];
for(var i=0,j=o.length;i<j;i++){
rt.push(o[i]);
}
return rt;
}
function addFile(file,_98f){
var obj={};
obj.file=file;
obj.isLoaded=false;
enableCustomEvent(obj);
obj.addEvent("load",function(){
this.isLoaded=true;
});
if(!_98f){
_976[encodeURIComponent(file)]=obj;
}
var el=document.createElement("script");
el.type="text/javascript";
el.src=file;
el.async=true;
obj.element=el;
if(ua.ua.shell=="ieshell"){
el.onreadystatechange=function(){
if((this.readyState=="loaded"||this.readyState=="complete")&&!this.hasLoad){
this.hasLoad=true;
var _992=getFile(file);
if(_992!=null){
_992.fireEvent("load");
}else{
try{
_961.loadFile(file);
}
catch(e){
}
}
}
};
}else{
el.onerror=el.onload=function(){
var tmp=getFile(file);
if(tmp){
tmp.fireEvent("load");
}
};
}
Sizzle("head")[0].insertBefore(el,null);
}
function loadFile(file,_995,_996,_997){
var isJS=false,_999=false;
if(_961.isObject(file)){
isJS=(file.type=="js");
_999=(file.type=="css");
file=file.file;
}
file=getFullName(file);
if(/\.js(\?|$)/.test(file)||isJS){
if(_996||!hasLoad(file)){
addFile(file,_997);
}
if(!_995){
return;
}
if(getFile(file).isLoaded){
_995.call(getFile(file),true);
}else{
getFile(file).addEvent("load",function(){
_995(true);
});
getFile(file).addEvent("error",function(){
_995(false);
});
}
}else{
if(/\.css(\?|$)/.test(file)||_999){
if(!_996&&hasLoad(file)){
if(_995){
_995.call(getFile(file));
}
return;
}
mark(file);
var el=document.createElement("link");
el.rel="stylesheet";
el.type="text/css";
el.href=file;
Sizzle("head")[0].insertBefore(el,null);
if(_995){
_995.call(getFile(file));
}
}
}
}
function getFullName(file){
runOnce(loadVersion);
if(!_977[file]){
return file;
}
return _977[file].file;
}
var _99c=new RegExp("("+_964+")"+"(a?\\d+)/([^?]*)");
var _99d=new RegExp("(.*)\\?ver=(d+)(..*)");
function getVersion(file){
var _99f;
if(_99f=_99c.exec(file)){
_977[_99f[1]+_99f[3]]={file:file,version:_99f[2]};
}else{
if(_99f=_99d.exec(file)){
_977[_99f[1]]={file:file,version:_99f[2]};
}
}
}
_961.getFileVersion=function(_9a0){
_9a0.forEach(function(v,i){
getVersion(v);
});
};
_961.loadFile=function(file,_9a4,_9a5){
dom.ready(function(){
loadFile(file,_9a4,_9a5);
});
};
_961.loadFileForever=function(file,_9a7,_9a8){
dom.ready(function(){
loadFile(file,_9a7,_9a8,true);
});
};
_961.unloadFile=function(node){
if(node.parentNode){
node.parentNode.removeChild(node);
_976[encodeURIComponent(node.src)]=null;
}
};
_961.clearFiles=function(){
for(var i in _976){
if(_976.hasOwnProperty(i)){
if(_976[i]&&_976[i].element){
_961.unloadFile(_976[i].element);
}
}
}
};
_961.loadFiles=function(_9ab,_9ac){
var f=_9ab.length;
function isAllLoad(){
f--;
if(f===0&&_9ac){
_9ac();
}
}
_9ab.forEach(function(v,i){
_961.loadFile(v,isAllLoad);
});
};
_961.getVersion=function(file){
getVersion(file);
};
function loadVersion(){
buildArray(document.getElementsByTagName("script")).forEach(function(v,i){
if(v.src){
mark(v.src);
getVersion(v.src);
}
if(v.getAttribute("vsrc")){
getVersion(v.getAttribute("vsrc"));
}
});
buildArray(document.getElementsByTagName("link")).forEach(function(v,i){
if(v.rel&&v.rel=="stylesheet"){
mark(v.href);
getVersion(v.href);
}
if(v.getAttribute("vhref")){
getVersion(v.getAttribute("vhref"));
}
});
_961.log("load file version:");
_961.log(_977);
}
_961.dynamicLoad=function(file){
file.funcs.forEach(function(func,i){
window[func]=function(){
var ars=arguments;
window[func]=null;
if(file.file){
file.files=[file.file];
}
_961.loadFiles(file.files,function(){
window[func].apply(null,ars);
if(file.callBack){
file.callBack.call(null);
}
});
};
});
};
_961.namespace("img");
_961.img.getVersion=function(file){
runOnce(loadVersion);
if(!_977[file]){
return "";
}
return _977[file].version;
};
_961.img.getFullName=function(file){
return getFullName(file);
};
function runOnce(func){
if(window.runOnceFunc==null){
window.runOnceFunc={};
}
if(window.runOnceFunc[func]){
return null;
}
window.runOnceFunc[func]=true;
return func();
}
})();
});
object.add("XN.array","XN",function(_9bc,XN){
this.toQueryString=function(a,key){
var rt=[],t;
for(var k in a){
t=a[k];
if(XN.isFunction(t)){
continue;
}
if(XN.isObject(t)){
rt.push(arguments.callee(t,k));
}else{
if(/^\d+$/.test(k)){
rt.push((key||k)+"="+encodeURIComponent(t));
}else{
rt.push(k+"="+encodeURIComponent(t));
}
}
}
return rt.join("&");
};
this.each=function(a,func){
if(!a){
return;
}
if(!XN.isUndefined(a.length)||!XN.isUndefined(a[0])){
for(var i=0,j=a.length;i<j;i++){
if(func.call(a,i,a[i])===false){
break;
}
}
}else{
for(var key in a){
if(!XN.isFunction(a[key])){
if(func.call(a,key,a[key])===false){
break;
}
}
}
}
};
this.include=function(a,_9c9){
var r=false;
_9bc.each(a,function(i,v){
if(v===_9c9){
r=true;
return false;
}
});
return r;
};
this.build=function(o){
var rt=[];
for(var i=0,j=o.length;i<j;i++){
rt.push(o[i]);
}
return rt;
};
});
object.add("XN.func",function(_9d1){
if(window.runOnceFunc==null){
window.runOnceFunc={};
}
this.empty=function(){
};
this.runOnce=function(func){
if(window.runOnceFunc[func]){
return null;
}
window.runOnceFunc[func]=true;
return func();
};
});
object.add("XN.string","XN",function(_9d3,XN){
this.nl2br=function(str){
return (str||"").replace(/([^>])\n/g,"$1<br />");
};
this.trim=function(str){
return (str||"").replace(/^\s+|\s+$/g,"");
};
this.ltrim=function(str){
return (str||"").replace(/^\s+/,"");
};
this.rtrim=function(str){
return (str||"").replace(/\s+$/,"");
};
this.strip=function(str){
return _9d3.trim(str);
};
this.stripTags=function(str){
return str.replace(/<\/?[^>]+>/igm,"");
};
this.escapeHTML=function(str){
return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
};
this.unescapeHTML=function(str){
return str.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ").replace(/&quot;/g,"\"").replace(/&amp;/g,"&");
};
this.include=function(str,key){
return str.indexOf(key)>-1;
};
this.startsWith=function(str,key){
return str.indexOf(key)===0;
};
this.endsWith=function(str,key){
var d=str.length-key.length;
return d>=0&&str.lastIndexOf(key)===d;
};
this.isBlank=function(str){
return /^\s*$/.test(str);
};
this.isEmail=function(str){
return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(str);
};
this.isMobile=function(str){
return /^((\(\d{2,3}\))|(\d{3}\-))?((1[345]\d{9})|(18\d{9}))$/.test(str);
};
this.isUrl=function(str){
return /^(http:|ftp:)\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/.test(str);
};
this.isIp=function(str){
return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.test(str);
};
this.isNumber=function(str){
return /^\d+$/.test(str);
};
this.isZip=function(str){
return /^[1-9]\d{5}$/.test(str);
};
this.isEN=function(str){
return /^[A-Za-z]+$/.test(str);
};
this.isJSON=function(str){
if(!XN.isString(str)||str===""){
return false;
}
str=str.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,"");
return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
};
this.getQuery=function(key,url){
url=url||window.location.href+"";
if(url.indexOf("#")!==-1){
url=url.substring(0,url.indexOf("#"));
}
var rts=[],rt;
var _9f1=new RegExp("(^|\\?|&)"+key+"=([^&]*)(?=&|#|$)","g");
while((rt=_9f1.exec(url))!=null){
rts.push(decodeURIComponent(rt[2]));
}
if(rts.length==0){
return null;
}
if(rts.length==1){
return rts[0];
}
return rts;
};
this.setQuery=function(key,_9f3,url){
url=url||window.location.href+"";
var hash="";
if(!/^http/.test(url)){
return url;
}
if(url.indexOf("#")!==-1){
hash=url.substring(url.indexOf("#"));
}
url=url.replace(hash,"");
url=url.replace(new RegExp("(^|\\?|&)"+key+"=[^&]*(?=&|#|$)","g"),"");
_9f3=XN.isArray(_9f3)?_9f3:[_9f3];
for(var i=_9f3.length-1;i>=0;i--){
_9f3[i]=encodeURIComponent(_9f3[i]);
}
var p=key+"="+_9f3.join("&"+key+"=");
return url+(/\?/.test(url)?"&":"?")+p+hash;
};
this.isNum=this.isNumber;
});
object.add("XN.json",function(_9f8){
this._PARSE_DATE=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/;
this.dateToString=function(d){
function _zeroPad(v){
return v<10?"0"+v:v;
}
return "\""+d.getUTCFullYear()+"-"+_zeroPad(d.getUTCMonth()+1)+"-"+_zeroPad(d.getUTCDate())+"T"+_zeroPad(d.getUTCHours())+":"+_zeroPad(d.getUTCMinutes())+":"+_zeroPad(d.getUTCSeconds())+"Z\"";
};
this.stringToDate=function(str){
if(_9f8._PARSE_DATE.test(str)){
var d=new Date();
d.setUTCFullYear(RegExp.$1,(RegExp.$2|0)-1,RegExp.$3);
d.setUTCHours(RegExp.$4,RegExp.$5,RegExp.$6);
return d;
}
};
this.parse=function(str){
return eval("("+str+")");
};
this.build=function(o,w,d){
return JSON.stringify(o,w,d);
};
});
object.add("XN.util","XN, XN.json, XN.array, XN.event, XN.string",function(_a01,XN){
if(!window.__timeouts==null){
window.__timeouts=[];
window.__intervals=[];
}
this.setTimeout=function(a,b){
var _a05=setTimeout(a,b);
window.__timeouts.push(_a05);
return _a05;
};
this.setInterval=function(a,b){
var _a08=setInterval(a,b);
window.__intervals.push(_a08);
return _a08;
};
this.clearTimeout=function(_a09){
for(var i=0;i<window.__timeouts.length;i++){
if(window.__timeouts[i]==_a09){
window.__timeouts.slice(i,1);
}
}
clearTimeout(_a09);
};
this.clearInterval=function(_a0b){
for(var i=0;i<window.__intervals.length;i++){
if(window.__intervals[i]==_a0b){
window.__intervals.slice(i,1);
}
}
clearInterval(_a0b);
};
this.clearAllTimer=function(){
for(var i=0;i<window.__timeouts.length;i++){
clearTimeout(window.__timeouts[i]);
}
for(var i=0;i<window.__intervals.length;i++){
clearInterval(window.__intervals[i]);
}
window.__timeouts=[];
window.__intervals=[];
};
this.cache=function(_a0e){
XN.$extend(this,_a0e);
this._cacheData=[];
};
this.cache.prototype={cacheLength:null,_cacheData:null,isExist:function(key){
return this.get(key);
},add:function(key,_a11){
if(!XN.isUndefined(this.isExist(key))){
return;
}
if(this.cacheLength&&this.cacheLength==this._cacheData.length){
this._cacheData.shift();
}
this._cacheData.push({"key":key,"value":_a11});
},get:function(key){
for(var i=this._cacheData.length-1;i>=0;i--){
if(this._cacheData[i].key==key){
return this._cacheData[i].value;
}
}
},clear:function(){
this._cacheData=[];
}};
(function(){
var _a14={};
_a01.hotKey={add:function(key,func,obj){
key=String(key).toLowerCase();
var ctrl=false;
var alt=false;
var _a1a=false;
var _a1b=null;
if(/^\d+$/.test(key)){
_a1b=parseInt(key);
}else{
ctrl=/ctrl|ctr|c/.test(key);
alt=/alt|a/.test(key);
_a1a=/shift|s/.test(key);
if(/\d+/.test(key)){
_a1b=parseInt(/\d+/.exec(key)[0]);
}else{
_a1b=false;
}
}
_a14[key]=_a14[key]||{};
_a14[key][func]=function(e){
e=e||window.event;
code=e.keyCode;
if(ctrl&&!e.ctrlKey){
return;
}
if(alt&&!e.altKey){
return;
}
if(_a1a&&!e.shiftKey){
return;
}
if(_a1b&&code!==_a1b){
return;
}
func.call(obj||null);
XN.event.stop(e);
};
XN.event.addEvent(document,"keydown",_a14[key][func]);
},del:function(key,func){
key=String(key).toLowerCase();
XN.event.delEvent(document,"keydown",_a14[key][func]);
delete _a14[key][func];
}};
})();
(function(){
var id=0;
_a01.createObjID=function(){
id++;
return id;
};
})();
});
object.add("XN.datasource","XN, XN.json, XN.net, XN.string, XN.array",function(_a20,XN){
this.DS_JSON=function(p){
XN.$extend(this,p);
};
this.DS_JSON.prototype={DS_TYPE:"JSON",url:null,queryParam:"query",attachParam:"",rootKey:null,method:"get",_request:null,query:function(v,_a24){
var This=this;
try{
this._request.abort();
}
catch(e){
}
function parseDS_JSON(r){
r=r.responseText;
var pp;
try{
var rt=XN.json.parse(r);
if(This.rootKey&&rt[This.rootKey]){
pp=rt[This.rootKey];
}else{
pp=rt;
}
}
catch(e){
pp=[];
}
_a24(pp);
}
this._request=new XN.net.xmlhttp({url:this.url,data:this.queryParam+"="+encodeURIComponent(v)+"&"+this.attachParam,method:this.method,onSuccess:parseDS_JSON});
}};
this.DS_friends=function(p){
var ds=new _a20.DS_JSON(p);
ds.queryParam="p";
ds.rootKey="candidate";
ds.net="";
ds.group="";
ds.page=XN.isUndefined(p.page)?false:p.page;
ds.param=XN.json.build(p.param||{});
var _a2b=XN.isUndefined(p.limit)?24:p.limit;
ds.query=function(name,_a2d){
XN.log("start query");
name=name.replace(/[^a-zA-Z\u0391-\uFFE5]/g,"");
if(XN.string.isBlank(name)&&this.group==""&&this.net==""){
_a2d([]);
return;
}
var p=["{\"init\":false,","\"qkey\":\""+this.qkey+"\",","\"uid\":true,","\"uname\":true,","\"uhead\":true,","\"limit\":"+_a2b+",","\"param\":"+this.param+",","\"query\":\""+name+"\",","\"group\":\""+this.group+"\",","\"net\":\""+this.net+"\",","\"page\":\""+this.page+"\"","}"].join("");
_a20.DS_JSON.prototype.query.call(this,p,_a2d);
};
return ds;
};
this.DS_Array=function(p){
XN.$extend(this,p);
this.init();
};
this.DS_Array.prototype={DS_TYPE:"array",data:null,searchKey:null,init:function(){
var key=this.searchKey,_a31=this._index=[];
XN.array.each(this.data,function(i,v){
_a31.push(v[key]);
});
},query:function(v,_a35){
_a35(this._search(v));
},_search:function(v){
var keys=this._index,data=this.data,rt=[],reg=new RegExp("^"+v,"i");
XN.array.each(keys,function(i,v){
if(reg.test(v)){
rt.push(data[i]);
}
});
return rt;
}};
this.DS_XHR=function(p){
XN.$extend(this,p);
};
this.DS_XHR.prototype={url:null,queryParam:"query",_request:null,query:function(v,_a3f){
var This=this;
try{
this._request.abort();
}
catch(e){
}
function parseDS_XML(r){
r=r.responseXML;
var rt=[];
function getResult(r){
var tmp={};
XN.array.each(r.childNodes,function(i,v){
tmp[v.tagName.toLowerCase()]=v.firstChild.nodeValue;
});
return tmp;
}
try{
var rs=r.getElementsByTagName("Result");
XN.array.each(rs,function(i,v){
rt.push(getResult(v));
});
}
catch(e){
rt=[];
}
_a3f(rt);
}
this._request=new XN.net.xmlhttp({url:this.url,data:this.queryParam+"="+encodeURIComponent(v),onSuccess:parseDS_XML});
}};
});
object.add("XN.browser","sys, XN",function(_a4a,sys,XN){
this.IE=!!(window.attachEvent&&!window.opera);
this.IE10=this.IE&&(function(){
"use strict";
return this===undefined;
}());
this.IE9=navigator.userAgent.indexOf("MSIE 9.0")>-1;
this.IE8=!this.IE9&&navigator.userAgent.indexOf("MSIE 8.0")>-1;
this.IE7=!this.IE9&&!this.IE8&&navigator.userAgent.indexOf("MSIE 7.0")>-1;
this.IE6=!this.IE9&&!this.IE8&&!this.IE7&&navigator.userAgent.indexOf("MSIE 6.0")>-1;
this.Opera=!!window.opera,this.WebKit=navigator.userAgent.indexOf("AppleWebKit/")>-1;
this.Gecko=navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")==-1;
this.copy=function(o){
function onfail(){
if(XN.isElement(o)){
o.select();
}
}
var str;
if(XN.isElement(o)){
str=o.value;
}else{
str=o;
}
var _do=sys.modules["XN.Do"];
if(window.clipboardData&&clipboardData.setData){
if(clipboardData.setData("text",str)){
return true;
}
}else{
if(_do){
_do.alert({message:"\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u811a\u672c\u590d\u5236,\u8bf7\u5c1d\u8bd5\u624b\u52a8\u590d\u5236",callBack:function(){
onfail();
}});
}else{
alert("\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u811a\u672c\u590d\u5236,\u8bf7\u5c1d\u8bd5\u624b\u52a8\u590d\u5236");
}
return false;
}
if(_do){
_do.alert({message:"\u60a8\u7684\u6d4f\u89c8\u5668\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u811a\u672c\u8bbf\u95ee\u526a\u5207\u677f",callBack:function(){
onfail();
}});
}else{
alert("\u60a8\u7684\u6d4f\u89c8\u5668\u8bbe\u7f6e\u4e0d\u5141\u8bb8\u811a\u672c\u8bbf\u95ee\u526a\u5207\u677f");
}
return false;
};
});
object.add("XN.cookie","XN",function(_a50,XN){
this.get=function(name){
var _a53=name+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_a53)==0){
return decodeURIComponent(c.substring(_a53.length,c.length));
}
}
return null;
};
this.set=function(name,_a58,days,path,_a5b,_a5c){
var _a5d;
if(XN.isNumber(days)){
var date=new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
_a5d=date.toGMTString();
}else{
if(XN.isString(days)){
_a5d=days;
}else{
_a5d=false;
}
}
document.cookie=name+"="+encodeURIComponent(_a58)+(_a5d?";expires="+_a5d:"")+(path?";path="+path:"")+(_a5b?";domain="+_a5b:"")+(_a5c?";secure":"");
};
this.del=function(name,path,_a61,_a62){
_a50.set(name,"",-1,path,_a61,_a62);
};
});
object.add("XN.net","XN, XN.form, XN.util, XN.event, XN.func, XN.browser, XN.element",function(_a63,XN){
if(!window.__ajaxProxies){
window.__ajaxProxies={};
}
this.sendForm=function(_a65){
XN.log("send form");
_a65.data=XN.form.serialize(_a65.form);
return new _a63.xmlhttp(_a65);
};
this.sendStats=function(url){
var n="log_"+(new Date()).getTime();
var c=window[n]=new Image();
c.onload=(c.onerror=function(){
window[n]=null;
});
c.src=url;
c=null;
};
this.xmlhttp=function(_a69){
var This=this;
if(!_a63.cache){
_a63.cache=new XN.util.cache();
}
if(arguments.length>1){
this.url=arguments[0]||null;
this.data=arguments[1]||"";
this.onSuccess=arguments[2];
extendObject(this,arguments[3]);
init(window);
return this;
}
extendObject(this,_a69);
var _a6b;
if(this.useCache&&(_a6b=_a63.cache.get(this.url+encodeURIComponent(this.data)))){
this.transport={};
this.transport.responseText=_a6b;
setTimeout(function(){
This._onComplete();
This._onSuccess();
},0);
return this;
}
function init(w){
This.transport=This.getTransport(w);
return This.url&&This.send(This.method);
}
var tmp=XN.element.$element("a");
tmp.href=this.url;
var _a6e=tmp.hostname;
var _a6f=tmp.protocol;
if(/^http/.test(this.url)&&location.hostname!=_a6e){
if(window.__ajaxProxies[_a6e]){
(function(){
if(window.__ajaxProxies[_a6e].loaded){
init(window.__ajaxProxies[_a6e].contentWindow);
}else{
setTimeout(arguments.callee,100);
}
})();
}else{
var _a70=XN.element.$element("iframe").hide();
document.body.insertBefore(_a70,document.body.firstChild);
var _a71=_a6f+"//"+_a6e+"/ajaxproxy.htm";
if(_a6e.indexOf("notice.")!=-1||_a6e.indexOf("music.")!=-1){
_a71=_a71+"?v=1";
}
_a70.src=_a71;
window.__ajaxProxies[_a6e]=_a70;
window.__ajaxProxies[_a6e].loaded=false;
XN.event.addEvent(_a70,"load",function(){
if(_a70.contentWindow.location.href!==_a70.src){
_a70.contentWindow.location.href=_a70.src;
}else{
try{
init(_a70.contentWindow);
window.__ajaxProxies[_a6e]=_a70;
window.__ajaxProxies[_a6e].loaded=true;
}
catch(e){
}
}
});
}
}else{
init(window);
}
return This;
};
this.xmlhttp.prototype={url:null,data:"",onStart:new Function(),onSuccess:null,onFailure:null,onError:null,fillTo:null,method:"post",asynchronous:true,transport:null,headers:null,iAmXmlhttp:true,useCache:false,requestToken:true,binary:false,formData:false,abort:function(){
this.transport.abort();
},send:function(_a72){
var _url;
if(_a72=="get"&&this.data!==""){
_url=this.url+(/\?/.test(this.url)?"&":"?")+this.data;
}else{
_url=this.url;
}
this.transport.onreadystatechange=this.onStateChange.bind(this);
this.transport.open(_a72,_url,this.asynchronous);
if(!this.formData){
this.transport.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
if(this.headers!==null){
for(var i in this.headers){
this.transport.setRequestHeader(i,this.headers[i]);
}
}
if(this.headers==null||!this.headers["X-Requested-With"]){
this.transport.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
var _a75=null;
if(_a72.toLowerCase()=="post"){
_a75=this.data;
if(this.requestToken&&XN.get_check){
_a75+=(_a75?"&":"")+"requestToken="+XN.get_check;
}
if(this.requestToken&&XN.get_check_x){
_a75+=(_a75?"&":"")+"_rtk="+XN.get_check_x;
}
}
try{
if(window.event&&document.body.id=="profile"&&_a72=="get"&&/(none|null)\b/.test(this.url)&&XN.user.id%10==0){
var temp=document.createElement("div");
var obj=event.srcElement;
temp.appendChild(obj);
if(obj){
var _a75={from:"profile",nodeHTML:temp.innerHTML};
nullOrNoneLog(_a75);
}
}
}
catch(e){
}
function nullOrNoneLog(data){
var _a79="";
for(var i in data){
_a79=_a79+"&"+i+"="+encodeURIComponent(data[i]);
}
var _a7b=new Image().src="http://123.125.44.44/r/?t="+new Date().getTime()+_a79;
}
if(this.binary){
this.transport.sendAsBinary(_a75);
}else{
this.transport.send(_a75);
}
},_onSuccess:function(obj){
var _a7d=this.transport;
if(this.fillTo!==null){
try{
this.fillTo.stopLoading();
}
catch(e){
}
this.fillTo.innerHTML=_a7d.responseText;
}
try{
if(this.onSuccess){
this.onSuccess.call(null,_a7d);
}
}
catch(e){
if(XN.DEBUG_MODE){
throw e;
}
}
},_onComplete:function(obj){
var _a7f=this.transport;
try{
if(this.onComplete){
this.onComplete.call(null,_a7f);
}
}
catch(e){
if(XN.DEBUG_MODE){
throw e;
}
}
},onStateChange:function(){
var _a80=this.transport;
if(_a80.readyState==1&&!this.hasRunStart){
this.onStart();
this.hasRunStart=true;
}else{
if(_a80.readyState==4){
if(_a80.status==undefined||_a80.status==0||(_a80.status>=200&&_a80.status<300)){
if(this.useCache){
_a63.cache.add(this.url+encodeURIComponent(this.data),this.transport.responseText);
}
this._onSuccess();
}else{
(this.onError||this.onFailure||XN.func.empty).call(null,_a80);
}
this._onComplete();
}
}
}};
this.xmlhttp.prototype.getTransport=function(w){
if(w!=window){
return w.getTransport();
}else{
if(XN.browser.IE){
try{
return new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
return new ActiveXObject("Microsoft.XMLHTTP");
}
}else{
return new XMLHttpRequest();
}
}
};
this.ajax=this.xmlhttp;
XN.$extend(this.xmlhttp.prototype,{get:function(url,data,_a84,_a85){
this.url=url;
this.data=data;
this.onSuccess=_a84;
XN.$extend(this,_a85);
this.send("get");
},post:function(url,data,_a88,_a89){
this.url=url;
this.data=data;
this.onSuccess=_a88;
XN.$extend(this,_a89);
this.send("post");
}});
if(typeof Ajax=="undefined"){
Ajax={};
Ajax.Request=function(url,o){
var p=o.parameters;
o["url"]=url;
o["data"]=p;
delete o.parameters;
return new _a63.xmlhttp(o);
};
}
});
object.add("XN.env",function(_a8d){
this.shortSiteName="\u4eba\u4eba";
this.siteName="\u4eba\u4eba\u7f51";
this.domain="renren.com";
this.domain_reg=this.domain.replace(/\./g,"\\.");
this.staticRoot="http://s.xnimg.cn/";
this.CDNstaticRoot="http://a.xnimg.cn/";
this.swfRoot="http://static.xiaonei.com/";
this.wwwRoot="http://"+this.domain+"/";
});
object.add("XN.event","XN, XN.browser, XN.array, XN.element",function(_a8e,XN){
var _a90=XN.browser;
var _a91=[];
this.ignoreEvent=false;
this.logEvents=false;
this.isCapsLockOn=function(e){
var c=e.keyCode||e.which;
var s=e.shiftKey;
if(((c>=65&&c<=90)&&!s)||((c>=97&&c<=122)&&s)){
return true;
}
return false;
};
this.element=function(e){
var n=e.target||e.srcElement;
return _a8e.resolveTextNode(n);
};
this.relatedTarget=function(e){
var t=e.relatedTarget;
if(!t){
if(e.type=="mouseout"||e.type=="mouseleave"){
t=e.toElement;
}else{
if(e.type=="mouseover"){
t=e.fromElement;
}
}
}
return _a8e.resolveTextNode(t);
};
this.resolveTextNode=function(n){
try{
if(n&&3==n.nodeType){
return n.parentNode;
}
}
catch(e){
}
return n;
};
this.pointerX=function(_a9a){
return _a9a.pageX||(_a9a.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
};
this.pointerY=function(_a9b){
return _a9b.pageY||(_a9b.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
};
this.isStrictMode=document.compatMode!="BackCompat";
this.pageHeight=function(){
return this.isStrictMode?Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight):Math.max(document.body.scrollHeight,document.body.clientHeight);
};
this.pageWidth=function(){
return this.isStrictMode?Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth):Math.max(document.body.scrollWidth,document.body.clientWidth);
};
this.winWidth=function(){
return this.isStrictMode?document.documentElement.clientWidth:document.body.clientWidth;
};
this.winHeight=function(){
return this.isStrictMode?document.documentElement.clientHeight:document.body.clientHeight;
};
this.scrollTop=function(){
if(XN.browser.WebKit){
return window.pageYOffset;
}
return this.isStrictMode?document.documentElement.scrollTop:document.body.scrollTop;
};
this.scrollLeft=function(){
if(XN.browser.WebKit){
return window.pageXOffset;
}
return this.isStrictMode?document.documentElement.scrollLeft:document.body.scrollLeft;
};
this.stop=null;
this.clearEvents=function(){
for(var _a9c,i=0;_a9c=_a91[i];i++){
_a8e.delEvent.apply(_a8e,_a9c);
}
_a91=[];
};
this.addEvent=function(el,name,func,cap){
if(_a8e.ignoreEvent){
return;
}
var els=[];
el=XN.element.$(el);
if(XN.isArray(el)){
els=el;
}else{
els.push(el);
}
if(els.length==0){
return el;
}
XN.array.each(els,function(i,v){
if(_a8e.logEvents){
_a91.push([v,name,func,cap]);
}
_a8e._addEvent(v,name,func,cap);
});
return el;
};
this.delEvent=function(el,name,func,cap){
var els=[];
el=XN.element.$(el);
if(XN.isArray(el)){
els=el;
}else{
els.push(el);
}
if(els.length==0){
return el;
}
XN.array.each(els,function(i,v){
_a8e._delEvent(v,name,func,cap);
});
return el;
};
this._addEvent=null;
this._delEvent=null;
this.enableCustomEvent=function(obj){
XN.$extend(obj,{addEvent:function(type,func){
if(!this._customEventListeners){
this._customEventListeners={};
}
var _aaf=this._customEventListeners;
if(XN.isUndefined(_aaf[type])){
_aaf[type]=[];
}
_aaf[type].push(func);
return this;
},delEvent:function(type,func){
var _ab2=this._customEventListeners[type];
if(_ab2){
for(var i=_ab2.length-1;i>=0;i--){
if(_ab2[i]==func){
_ab2[i]=null;
break;
}
}
}
return this;
},fireEvent:function(type){
if(!this._customEventListeners||!this._customEventListeners[type]){
return;
}
var _ab5=this._customEventListeners[type],ars=XN.array.build(arguments);
ars.shift();
for(var i=0,j=_ab5.length;i<j;i++){
if(_ab5[i]){
try{
_ab5[i].apply(this,ars);
}
catch(ox){
if(XN.DEBUG_MODE){
throw ox;
}
}
}
}
}});
return obj;
};
if(_a90.IE){
this.stop=function(_ab9){
_ab9.returnValue=false;
_ab9.cancelBubble=true;
};
}else{
this.stop=function(_aba){
_aba.preventDefault();
_aba.stopPropagation();
};
}
var _abb=function(_abc,_abd){
var p=_abc.relatedTarget;
while(p&&p!=_abd){
try{
p=p.parentNode;
}
catch(error){
p=_abd;
}
}
return p!==_abd;
};
if(window.attachEvent&&!_a90.Opera){
function wrapEvent(_abf){
_abf.stopPropagation=function(){
this.cancelBubble=true;
};
_abf.preventDefault=function(){
this.returnValue=false;
};
return _abf;
}
this._addEvent=function(_ac0,name,func){
_ac0=XN.element.$(_ac0);
if(name=="input"){
name="propertychange";
}
if(name=="keypress"){
name="keydown";
}
if(!_ac0._eventListeners[name]){
_ac0._eventListeners[name]=[];
}
var _ac3=function(){
var e=wrapEvent(window.event);
func.call(_ac0,e);
};
_ac3.innerFunc=func;
_ac0._eventListeners[name].push(_ac3);
_ac0.attachEvent("on"+name,_ac3);
return _ac0;
};
this._delEvent=function(_ac5,name,func){
_ac5=XN.element.$(_ac5);
if(name=="input"){
name="propertychange";
}
if(name=="keypress"){
name="keydown";
}
if(!_ac5._eventListeners[name]){
return;
}
for(var i=0,_ac9;i<_ac5._eventListeners[name].length;i++){
_ac9=_ac5._eventListeners[name][i];
if(_ac9.innerFunc===func){
break;
}
}
_ac5.detachEvent("on"+name,_ac9);
return _ac5;
};
}else{
if(window.addEventListener){
this._addEvent=function(_aca,name,func,_acd){
_aca=XN.element.$(_aca);
if(name=="mouseleave"){
_aca.onmouseleave=function(e){
e=e||window.event;
if(_abb(e,_aca)&&func){
func.call(_aca,e);
}
};
_aca.addEventListener("mouseout",_aca.onmouseleave,_acd);
return _aca;
}
if(name=="keypress"&&_a90.WebKit){
name="keydown";
}
_aca.addEventListener(name,func,_acd);
return _aca;
};
this._delEvent=function(_acf,name,func,_ad2){
_acf=XN.element.$(_acf);
if(name=="mouseleave"){
_acf.removeEventListener("mouseout",_acf.onmouseleave,_ad2);
return _acf;
}
if(name=="keypress"&&_a90.WebKit){
name="keydown";
}
_acf.removeEventListener(name,func,_ad2);
return _acf;
};
}
}
});
object.define("XN.dom","dom, ua, XN, XN.event, XN.array, XN.browser, XN.element",function(_ad3,_ad4){
_ad3("XN.event");
_ad3("XN.array");
_ad3("XN.browser");
_ad3("XN.element");
var dom=_ad3("dom");
var ua=_ad3("ua");
var XN=_ad3("XN");
var _ad8=XN.event;
var _ad9=XN.array;
var _ada=XN.browser;
var _adb=null;
function createShadow(_adc,_add){
_adc=_adc||0.3;
_add=_add||2000;
var el=XN.element.$element("div");
_adb=el;
el.style.position="absolute";
el.style.top=0;
el.style.left=0;
el.style.background="#000";
el.style.zIndex=_add;
el.style.opacity=_adc;
el.style.filter="alpha(opacity="+(_adc*100)+")";
el.innerHTML=["<iframe width=\"100%\" height=\"100%\" frameBorder=\"0\" style=\"position:absolute;top:0;left:0;z-index:1;\"></iframe>","<div style=\"position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000000;z-index:2;height:expression(this.parentNode.offsetHeight);\"></div>"].join("");
function resize(){
el.hide();
el.style.height=XN.event.pageHeight()+"px";
el.style.width=XN.event.pageWidth()+"px";
el.show();
}
resize();
XN.event.addEvent(window,"resize",function(e){
if(_adb&&_adb.style.display!="none"){
try{
resize();
}
catch(e){
}
}
});
document.body.insertBefore(el,document.body.firstChild);
}
this.disable=function(_ae0,_ae1){
if(!_adb){
createShadow(_ae0,_ae1);
}
};
this.enable=function(){
if(_adb){
_adb.remove();
_adb=null;
}
};
this.insertAfter=function(_ae2,_ae3){
_ae2=XN.element.$(_ae2);
_ae3=XN.element.$(_ae3);
var _ae4=_ae3.parentNode;
if(_ae4.lastChild==_ae3){
_ae4.appendChild(_ae2);
}else{
_ae4.insertBefore(_ae2,_ae3.nextSibling);
}
};
this.getElementsByClassName=function(_ae5,_ae6,_ae7){
var c=(XN.element.$(_ae6)||document).getElementsByTagName(_ae7||"*")||document.all;
var _ae9=[];
var _exp=new RegExp("(^|\\s)"+_ae5+"(\\s|$)");
_ad9.each(c,function(i,v){
if(_exp.test(v.className)){
_ae9.push(v);
}
});
return _ae9;
};
this.findFirstClass=function(_aed,_aee){
_aed=XN.element.$(_aed);
var els=_ad4.getElementsByClassName(_aee,_aed);
return XN.element.$(els[0])||null;
};
this.ready=function(_af0,_af1){
if(XN.isUndefined(_af1)){
_af1=false;
}
var func=_af1?function(){
setTimeout(_af0,0);
}:_af0;
dom.ready(func);
};
this.preloadImg=function(src){
src=XN.isArray(src)?src:[src];
_ad9.each(src,function(i,v){
new Image().src=v;
});
};
this.readyDo=this.ready;
});
object.add("XN.element","sys, XN, XN.browser, XN.env",function(_af6,sys,XN){
var _af9=XN.browser;
var _afa=["clear","hover","scrollTo","visible","toggleClass","toggleText","hasClassName","addClass","delClass","show","hide","remove","setStyle","getStyle","addEvent","delEvent","_eventListeners","matchesSelector","getData","delegate","addChild","delChild","setContent","setHTML","getPosition","realLeft","realTop","appendHTML","html","parent","startLoading","stopLoading","eval_inner_JS","extend","setOpacity","findFirstClass"];
var _afb=sys.modules["XN.effect"];
function getDom(str){
var tmp=document.createElement("div");
tmp.style.display="none";
document.body.appendChild(tmp);
tmp.innerHTML=str;
var dom=document.createElement("div");
while(tmp.firstChild){
dom.appendChild(tmp.firstChild);
}
tmp.parentNode.removeChild(tmp);
return dom;
}
var t=document.createElement("div");
t.innerHTML="<TEST_TAG></TEST_TAG>";
var _b00=t.firstChild===null;
this.clear=function(_b01){
_b01=_af6.$(_b01);
_b01.innerHTML="";
return _b01;
};
this.hover=function(_b02,_b03,_b04){
_b02=_af6.$(_b02);
_b04=_b04?_af6.$(_b04):_b02;
var _b05=sys.modules["XN.event"];
if(_b05){
_b05.addEvent(_b02,"mouseover",function(){
_b04.addClass(_b03);
},false);
_b05.addEvent(_b02,"mouseleave",function(){
_b04.delClass(_b03);
},false);
}else{
throw new Error("\u8bf7\u5148\u5bfc\u5165XN.event\u6a21\u5757\uff0c\u518d\u4f7f\u7528XN.event.addEvent");
}
return _b02;
};
this.scrollTo=function(_b06,_b07){
_b06=_af6.$(_b06);
if(!_afb){
_b07="normal";
}
switch(_b07){
case "slow":
XN.effect.scrollTo(_b06);
break;
default:
window.scrollTo(0,_b06.realTop());
break;
}
return _b06;
};
this.visible=function(_b08){
_b08=_af6.$(_b08);
return _b08.style.display!="none"&&_b08.style.visibility!="hidden";
};
this.toggleClass=function(_b09,_b0a,_b0b){
if(XN.isUndefined(_b0b)){
if(_af6.hasClassName(_b09,_b0a)){
_af6.delClass(_b09,_b0a);
}else{
_af6.addClass(_b09,_b0a);
}
}else{
if(_af6.hasClassName(_b09,_b0a)){
_af6.delClass(_b09,_b0a);
_af6.addClass(_b09,_b0b);
}else{
_af6.addClass(_b09,_b0a);
_af6.delClass(_b09,_b0b);
}
}
return _af6.$(_b09);
};
this.toggleText=function(_b0c,_b0d,_b0e){
if(_b0c.innerHTML==_b0d){
_b0c.innerHTML=_b0e;
}else{
_b0c.innerHTML=_b0d;
}
};
this.hasClassName=function(_b0f,_b10){
return new RegExp("(^|\\s+)"+_b10+"(\\s+|$)").test(_af6.$(_b0f).className);
};
this.addClass=function(_b11,_b12){
_b11=_af6.$(_b11);
if(_af6.hasClassName(_b11,_b12)){
return _b11;
}
_b11.className+=" "+_b12;
return _b11;
};
this.delClass=function(_b13,_b14){
_b13=_af6.$(_b13);
_b13.className=_b13.className.replace(new RegExp("(^|\\s+)"+_b14+"(\\s+|$)","g")," ");
return _b13;
};
this.show=function(_b15,_b16){
_b15=_af6.$(_b15);
if(_b15.style.display!="none"){
return;
}
if(!_afb||!_b16){
_b16="normal";
}
switch(_b16){
case "normal":
_b15.style.display="";
break;
case "fade":
XN.effect.fadeIn(_b15,function(e){
e.style.display="";
});
break;
case "slide":
XN.effect.slideOpen(_b15);
break;
case "delay":
setTimeout(function(){
_b15.style.display="";
},2000);
break;
}
return _b15;
};
this.hide=function(_b18,_b19){
_b18=_af6.$(_b18);
if(_b18.style.display=="none"){
return;
}
if(!_afb||!_b19){
_b19="normal";
}
switch(_b19){
case "normal":
_b18.style.display="none";
break;
case "fade":
XN.effect.fadeOut(_b18,function(e){
e.style.display="none";
});
break;
case "slide":
XN.effect.slideClose(_b18);
break;
case "delay":
setTimeout(function(){
_b18.style.display="none";
},2000);
break;
}
return _b18;
};
this.remove=function(_b1b){
var _b1b=_af6.$(_b1b);
_b1b.parentNode.removeChild(_b1b);
return _b1b;
};
this.setStyle=function(_b1c,_b1d){
var _b1c=_af6.$(_b1c);
_b1c.style.cssText+=";"+_b1d;
return _b1c;
};
this.getStyle=function(_b1e,_b1f){
_b1e=_af6.$(_b1e);
_b1f=_b1f=="float"?"cssFloat":_b1f;
var _b20=_b1e.style[_b1f];
if(!_b20){
var css=document.defaultView.getComputedStyle(_b1e,null);
_b20=css?css[_b1f]:null;
}
if(_b1f=="opacity"){
return _b20?parseFloat(_b20):1;
}
return _b20=="auto"?null:_b20;
};
this.addEvent=function(){
var _b22=sys.modules["XN.event"];
if(_b22){
_b22.addEvent.apply(null,arguments);
}else{
throw new Error("\u8bf7\u5148\u5bfc\u5165XN.event\u6a21\u5757\uff0c\u518d\u4f7f\u7528XN.event.addEvent");
}
return arguments[0];
};
this.delEvent=function(){
var _b23=sys.modules["XN.event"];
if(_b23){
_b23.delEvent.apply(null,arguments);
}else{
throw new Error("\u8bf7\u5148\u5bfc\u5165XN.event\u6a21\u5757\uff0c\u518d\u4f7f\u7528XN.event.delEvent");
}
return arguments[0];
};
this._eventListeners={};
this.matchesSelector=function(_b24,_b25){
return Sizzle.matches(_b25,[_b24]).length>0;
};
this.getData=function(_b26,name){
return _b26.getAttribute("data-"+name);
};
this.delegate=function(_b28,_b29,type,_b2b){
_af6.$(_b28).addEvent(type,function(e){
var ele=_af6.$(e.target||e.srcElement);
do{
if(ele&&ele.matchesSelector(_b29)){
_b2b.call(ele,e);
}
}while(ele=_af6.$(ele.parentNode));
});
};
this.addChild=function(_b2e,_b2f){
_b2e=_af6.$(_b2e);
if(XN.isString(_b2f)||XN.isNumber(_b2f)){
var _b30=String(_b2f).charAt(0)=="#"?Sizzle(_b2f)[0]:_b2f;
if(XN.isString(_b2f)||XN.isNumber(_b2f)){
_b2e.innerHTML+=_b30;
}else{
_b2e.appendChild(_b30);
}
}else{
if(XN.isElement(_b2f)){
_b2e.appendChild(_b2f);
}else{
if(_b2f.iAmUIelement){
_b2e.appendChild(_af6.$(_b2f.frame));
}else{
if(_b2f.iAmXmlhttp){
_b2f.fillTo=_b2e;
_b2e.startLoading();
}
}
}
}
return _b2e;
};
this.delChild=function(_b31,_b32){
_b32=_af6.$(_b32);
_b32.remove();
return _af6.$(_b31);
};
this.setContent=function(_b33,c){
_b33=_af6.$(_b33);
_b33.innerHTML="";
_b33.addChild(c);
return _b33;
};
this.setHTML=function(_b35,str){
if(_b00){
_b35.innerHTML="";
var _b37=getDom(str);
while(_b37.firstChild){
_b35.appendChild(_b37.firstChild);
}
}else{
_b35.innerHTML=str;
}
};
this.getPosition=function(_b38,_b39){
_b39=_af6.$(_b39)||document.body;
_b38=_af6.$(_b38);
var rl=0;
var rt=0;
var p=_b38;
try{
while(p&&p!=_b39){
rl+=p.offsetLeft;
rt+=p.offsetTop;
p=p.offsetParent;
}
}
catch(e){
}
return {"left":rl,"top":rt};
};
this.realLeft=function(_b3d,p){
return _af6.getPosition(_b3d,p||null).left;
};
this.realTop=function(_b3f,p){
return _af6.getPosition(_b3f,p||null).top;
};
this.appendHTML=function(_b41,str,_b43){
_b41=_af6.$(_b41);
var f=document.createDocumentFragment();
var t=_af6.$element("div");
t.innerHTML=str;
while(t.firstChild){
f.appendChild(t.firstChild);
}
var tmp=XN.array.build(f.childNodes);
_b41.appendChild(f);
if(_b43){
return tmp;
}
return _b41;
};
this.html=function(_b47,str){
_b47.innerHTML=str;
};
this.parent=function(_b49,_b4a){
while(_b49){
if(!_b49.parentNode){
return null;
}
_b49=_af6.$(_b49.parentNode);
if(_b49.matchesSelector(_b4a)){
return _b49;
}
}
};
this.startLoading=function(_b4b,msg){
_b4b=_af6.$(_b4b);
_b4b.innerHTML="<center><img src=\""+XN.env.staticRoot+"img/indicator.gif\" />"+(msg||"\u52a0\u8f7d\u4e2d...")+"</center>";
return _b4b;
};
this.stopLoading=function(_b4d){
_b4d=_af6.$(_b4d);
return _b4d;
};
this.eval_inner_JS=function(el){
var js=_af6.$(el).getElementsByTagName("script");
XN.array.each(js,function(i,s){
if(s.src){
XN.loadFile(s.src);
}else{
var _b52="__inner_js_out_put = [];\n";
_b52+=s.innerHTML.replace(/document\.write/g,"__inner_js_out_put.push");
eval(_b52);
if(__inner_js_out_put.length!==0){
var tmp=document.createDocumentFragment();
_af6.$(tmp).appendHTML(__inner_js_out_put.join(""));
s.parentNode.insertBefore(tmp,s);
}
}
});
};
var sign={},_b55=XN.array.build;
this.extend=function(_b56){
if(_b56._extended){
return _b56;
}
var _b57=_af6.extend.cache;
for(var i=0,m,len=_afa.length;i<len;i++){
m=_afa[i];
if(_af6[m]!=null&&!(m in _b56)){
_b56[m]=_b57.findOrStore(_af6[m]);
}
}
_b56._extended=sign;
return _b56;
};
this.extend.cache={findOrStore:function(_b5b){
if(!this[_b5b]){
this[_b5b]=function(){
var args=_b55(arguments);
args.unshift(this);
return _b5b.apply(null,args);
};
}
return this[_b5b];
}};
if(_af9.IE){
this.getStyle=function(_b5d,_b5e){
_b5d=_af6.$(_b5d);
_b5e=(_b5e=="float"||_b5e=="cssFloat")?"styleFloat":_b5e;
var _b5f=_b5d.style[_b5e];
if(!_b5f&&_b5d.currentStyle){
_b5f=_b5d.currentStyle[_b5e];
}
if(_b5e=="opacity"){
if(_b5f=(_b5d.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){
if(_b5f[1]){
return parseFloat(_b5f[1])/100;
}
}
return 1;
}
if(_b5f=="auto"){
if((_b5e=="width"||_b5e=="height")&&(_b5d.getStyle("display")!="none")){
return _b5d["offset"+(_b5e=="width"?"Width":"Height")]+"px";
}
return null;
}
return _b5f;
};
}
if(document.addEventListener){
this.setOpacity=function(_b60,_b61){
_b60=_af6.$(_b60);
_b60.style.opacity=_b61;
return _b60;
};
}else{
this.setOpacity=function(_b62,_b63){
_b62=_af6.$(_b62);
_b62.style.zoom=1;
_b62.style.filter="Alpha(opacity="+Math.ceil(_b63*100)+")";
return _b62;
};
}
this.$element=function(tag){
return _af6.$(document.createElement(tag));
};
this.$=function(id){
var _b66;
if(id==null){
_b66=null;
}else{
if(XN.isString(id)||XN.isNumber(id)){
_b66=Sizzle("#"+id)[0];
}else{
_b66=id;
}
}
if(_b66){
_af6.extend(_b66);
}
return _b66||null;
};
});
object.add("XN.template","XN.env",function(_b67,XN){
this.smediaPlayer=function(o){
return ["<object classid=\"CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95\" width=\""+(o.width||"352")+"\" height=\""+(o.height||"70")+"\" >\n","<param name=\"autostart\" value=\""+(o.autostart||"1")+"\" >\n","<param name=\"showstatusbar\" value=\""+(o.showstatusbar||"1")+"\">\n","<param name=\"filename\" value=\""+o.filename+"\">\n","<embed type=\"application/x-oleobject\" codebase=\"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701\" ","flename=\"mp\"","autostart=\""+(o.autostart||"1")+"\" showstatusbar=\""+(o.showstatusbar||"1")+"\" ","src=\""+o.filename+"\" width=\""+(o.width||"352")+"\" height=\""+(o.height||"70")+"\"></embed>"].join("");
};
this.flashPlayer=function(o){
return "<embed allowScriptAccess=\""+(o.allowScriptAccess||"none")+"\" src=\""+XN.env.staticRoot+"/swf/player.swf?url="+encodeURIComponent(o.filename)+"&Rwid="+(o.width||"450")+"&Autoplay="+(o.autostart||"1")+"\" wmode=\""+(o.wmode||"transparent")+"\" loop=\"false\" menu=\"false\" quality=\"high\" scale=\"noscale\" salign=\"lt\" bgcolor=\"#ffffff\" width=\""+(o.width||"450")+"\" height=\""+(o.height||"30")+"\" align=\"middle\"  allowFullScreen=\"false\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />";
};
this.flash=function(o){
return "&nbsp;<embed src=\""+o.filename+"\" type=\"application/x-shockwave-flash\" "+"width=\""+(o.width||"320")+"\" height=\""+(o.height||"240")+"\" allowFullScreen=\"true\" wmode=\""+(o.wmode||"transparent")+"\" allowNetworking=\""+(o.allowNetworking||"all")+"\" allowScriptAccess=\""+(o.allowScriptAccess||"sameDomain")+"\" flashvars=\""+o.flashVars+"\"></embed>";
};
});
object.add("XN.form","sys, XN, XN.event, XN.json, XN.array, XN.element, XN.string, XN.env",function(_b6c,sys,XN){
this.fillWithJSON=function(form,json){
form=XN.element.$(form);
_b6c.fillWithArray(form,XN.json.parse(json));
};
this.fillWithArray=function(form,a){
form=XN.element.$(form);
for(var p in a){
_b6c.Element.setValue(p,a[p],form);
}
};
this.setValue=function(_b74,_b75){
return _b6c.Element.setValue(_b74,_b75);
};
this.getValue=function(_b76){
return _b6c.Element.getValue(_b76);
};
this.serialize=function(form,type){
return _b6c.serializeElements(_b6c.getElements(form),type||"string");
};
this.serializeElements=function(_b79,type,_b7b){
type=type||"array";
if(XN.isUndefined(_b7b)){
_b7b=false;
}
var data=[],_key,_b7e;
XN.array.each(_b79,function(i,v){
if(!v.disabled&&v.name){
_key=v.name;
_b7e=_b7b?encodeURIComponent(_b6c.Element.getValue(v)):_b6c.Element.getValue(v);
if(_b7e!==null){
if(_key in data){
if(!XN.isArray(data[_key])){
data[_key]=[data[_key]];
}
data[_key].push(_b7e);
}else{
data[_key]=_b7e;
}
}
}
});
if(type=="array"){
return data;
}else{
if(type=="string"){
return XN.array.toQueryString(data);
}else{
if(type=="hash"){
var tmp={};
for(var p in data){
if(!XN.isFunction(data[p])){
tmp[p]=data[p];
}
}
return tmp;
}
}
}
};
this.getElements=function(form){
form=XN.element.$(form);
var _b84=[];
var all=form.getElementsByTagName("*");
XN.array.each(all,function(i,v){
if(!XN.isUndefined(_b6c.Element.Serializers[v.tagName.toLowerCase()])){
_b84.push(v);
}
});
return _b84;
};
this.Element={getValue:function(_b88){
_b88=XN.element.$(_b88);
var _b89=_b88.tagName.toLowerCase();
return _b6c.Element.Serializers[_b89](_b88);
},setValue:function(_b8a,_b8b,form){
if(form){
_b8a=form[_b8a];
if((XN.isElement(_b8a)&&_b8a.tagName.toLowerCase()=="select")){
_b6c.Element.Serializers["select"](_b8a,_b8b);
}else{
if(XN.isElement(_b8a)){
_b6c.Element.Serializers[_b8a.tagName.toLowerCase()](_b8a,_b8b);
}else{
if(_b8a[0]){
var _b8d=_b8a[0].tagName.toLowerCase();
for(var i=0,j=_b8a.length;i<j;i++){
_b6c.Element.Serializers[_b8d](_b8a[i],(_b8b[i]||_b8b||""));
}
}
}
}
return _b8a;
}else{
_b8a=XN.element.$(_b8a);
var _b8d=_b8a.tagName.toLowerCase();
_b6c.Element.Serializers[_b8d](_b8a,_b8b);
return _b8a;
}
}};
this.Element.Serializers={input:function(_b90,_b91){
switch(_b90.type.toLowerCase()){
case "checkbox":
case "radio":
return _b6c.Element.Serializers.inputSelector(_b90,_b91);
default:
return _b6c.Element.Serializers.textarea(_b90,_b91);
}
},inputSelector:function(_b92,_b93){
if(XN.isUndefined(_b93)){
return _b92.checked?_b92.value:null;
}else{
_b92.checked=!!_b93;
}
},textarea:function(_b94,_b95){
if(XN.isUndefined(_b95)){
return _b94.value;
}else{
_b94.value=_b95;
}
},select:function(_b96,_b97){
if(XN.isUndefined(_b97)){
return this[_b96.type=="select-one"?"selectOne":"selectMany"](_b96);
}else{
var opt,_b99,_b9a=!XN.isArray(_b97);
for(var i=0,_b9c=_b96.length;i<_b9c;i++){
opt=_b96.options[i];
_b99=this.optionValue(opt);
if(_b9a){
if(_b99==_b97){
opt.selected=true;
return;
}
}else{
opt.selected=XN.array.include(_b97,_b99);
}
}
}
},selectOne:function(_b9d){
var _b9e=_b9d.selectedIndex;
return _b9e>=0?this.optionValue(_b9d.options[_b9e]):null;
},selectMany:function(_b9f){
var _ba0=[],_ba1=_b9f.length;
if(!_ba1){
return null;
}
for(var i=0;i<_ba1;i++){
var opt=_b9f.options[i];
if(opt.selected){
_ba0.push(this.optionValue(opt));
}
}
return _ba0;
},optionValue:function(opt){
return opt.value||opt.text;
}};
$F=function(id,type){
var el=XN.element.$(id);
if(el.tagName.toLowerCase()=="form"){
return _b6c.serialize(el,type);
}else{
return _b6c.getValue(el);
}
};
this._helper=function(el){
el=XN.element.$(el);
try{
if(el._helper){
return el._helper;
}
}
catch(e){
console.log(arguments.callee.caller);
}
el._helper=this;
this.element=el;
};
this._helper.prototype={maxSize:9999,limit:function(max,cut){
var This=this;
this.maxLength=max;
if(XN.isUndefined(cut)){
cut=true;
}
this._limit_cut=cut;
if(this._limit){
return this;
}
this._limit=true;
var el=this.element;
XN.event.addEvent(el,"focus",check);
XN.event.addEvent(el,"keyup",check);
function check(){
This.limitCheck();
}
return this;
},limitCheck:function(){
var This=this;
var el=this.element;
setTimeout(function(){
var v=el.value;
if(v.length>This.maxLength){
if(This._limit_cut){
el.value=v.substr(0,This.maxLength);
}
This.fireEvent("overmaxLength");
}else{
This.fireEvent("normalLength");
}
This.fireEvent("checkover");
},0);
},count:function(show,_bb1){
if(this._count){
return this;
}
this._count=true;
var This=this,show=XN.element.$(show);
if(XN.isUndefined(_bb1)){
_bb1=true;
}
if(!this.maxLength){
_bb1=false;
}
var el=this.element;
this.addEvent("overmaxLength",function(){
show.addClass("full");
});
this.addEvent("normalLength",function(){
show.delClass("full");
});
this.addEvent("checkover",update);
function update(){
show.innerHTML=el.value.length+(_bb1?"/"+This.maxLength:"");
}
return this;
},countSize:function(show,max,_bb6){
return this.limit(max).count(show,_bb6);
},getRealValue:function(){
var el=this.element;
if(el.value==this._defaultValue||el.value==el.getAttribute("placeholder")){
return "";
}
return el.value;
},reloadDefaultValue:function(){
this.element.value=this._defaultValue;
this.element.style.color="#888";
},defaultValue:function(v){
var This=this;
var el=this.element;
v=v||el.value;
if(!XN.isUndefined(this._defaultValue)&&el.value==this._defaultValue){
el.value=v;
}
this._defaultValue=v;
if(this._default){
return this;
}
this._default=true;
if(document.activeElement!==el){
el.value=v;
}
el.style.color="#888";
XN.event.addEvent(el,"focus",function(){
if(el.value==This._defaultValue){
el.value="";
el.style.color="#333";
}
});
XN.event.addEvent(el,"blur",function(){
if(el.value==""){
el.value=This._defaultValue;
el.style.color="#888";
}
});
return this;
},focus:function(_bbb){
var el=this.element;
if(XN.isUndefined(_bbb)){
_bbb=el.value.length;
}
try{
if(el.setSelectionRange){
el.focus();
el.setSelectionRange(el.value.length,_bbb);
}else{
if(el.createTextRange){
var _bbd=el.createTextRange();
_bbd.moveStart("character",_bbb);
_bbd.collapse(true);
_bbd.select();
el.focus();
}else{
el.focus();
}
}
}
catch(e){
}
return this;
},onEnter:function(_bbe){
var el=this.element;
var _bc0=el.tagName.toLowerCase()=="textarea";
XN.event.addEvent(el,"keydown",function(e){
e=e||window.event;
if(e.keyCode==13){
if(_bc0&&!e.ctrlKey){
return false;
}
XN.event.stop(e);
_bbe(el);
return false;
}
},false);
return this;
},onEsc:function(_bc2){
var el=this.element;
XN.event.addEvent(el,"keydown",function(e){
e=e||window.event;
if(e.keyCode==27){
XN.event.stop(e);
_bc2(el);
return false;
}
},false);
return this;
},autoResize:function(min,max){
var This=this,el=this.element,type;
this.minSize=min||this.minSize;
this.maxSize=max||this.maxSize;
if(el.tagName.toLowerCase()=="textarea"){
this.resizeType="height";
}else{
this.resizeType="width";
}
if(!_b6c.inputShadow){
var d=XN.element.$element("div");
d.setStyle("position:absolute;left:-99999px;top:-99999px");
document.body.appendChild(d);
_b6c.inputShadow=d;
}
this.shadow=_b6c.inputShadow;
setTimeout(function(){
if(min){
return;
}
This.minSize=type=="width"?el.offsetWidth:el.offsetHeight;
},10);
el.style.overflow="hidden";
XN.event.addEvent(el,"focus",function(){
This.timer=setInterval(This._resize.bind(This),200);
});
XN.event.addEvent(el,"blur",function(){
clearInterval(This.timer);
This.timer=null;
});
return this;
},_resize:function(){
var el=this.element,sh=this.shadow,oh,type=this.resizeType;
sh.style.fontSize=el.getStyle("fontSize");
var fs=parseInt(el.getStyle("fontSize"),0);
sh.style.fontFamily=el.getStyle("fontFamily");
(type=="width")?sh.style.height=el.offsetHeight:sh.style.width=el.offsetWidth;
sh.innerHTML=XN.string.escapeHTML(el.value).replace(/\r\n/mg,"<br>").replace(/\r/mg,"<br>").replace(/\n/mg,"<br>");
(type=="width")?oh=sh.offsetWidth:oh=sh.offsetHeight+fs+3;
if(oh>this.minSize&&oh<this.maxSize){
el.style[type]=oh+"px";
}else{
if(oh<this.minSize){
el.style[type]=this.minSize+"px";
}else{
if(oh>this.maxSize){
el.style[type]=this.maxSize+"px";
}
}
}
},cursorPosition:function(){
var _bd0=this.element;
var _bd1=0,end=0;
try{
if(typeof (_bd0.selectionStart)=="number"){
_bd1=_bd0.selectionStart;
end=_bd0.selectionEnd;
}else{
if(document.selection){
var _bd3=document.selection.createRange();
if(_bd3.parentElement()==_bd0){
var _bd4=document.body.createTextRange();
_bd4.moveToElementText(_bd0);
for(_bd1=0;_bd4.compareEndPoints("StartToStart",_bd3)<0;_bd1++){
_bd4.moveStart("character",1);
}
for(var i=0;i<=_bd1;i++){
if(_bd0.value.charAt(i)=="\n"){
_bd1++;
}
}
var _bd4=document.body.createTextRange();
_bd4.moveToElementText(_bd0);
for(end=0;_bd4.compareEndPoints("StartToEnd",_bd3)<0;end++){
_bd4.moveStart("character",1);
}
for(var i=0;i<=end;i++){
if(_bd0.value.charAt(i)=="\n"){
end++;
}
}
}
}
}
}
catch(e){
}
return {"start":_bd1,"end":end,"item":[_bd1,end]};
}};
this._helper.prototype.setDefaultValue=this._helper.prototype.defaultValue;
XN.event.enableCustomEvent(this._helper.prototype);
this.help=function(id){
return new _b6c._helper(id);
};
this.inputHelper=this.textAreaHelper=this.help;
$CursorPosition=function(el){
return _b6c.help(el).cursorPosition();
};
this.userInfoAutoComplete=function(id,type){
var _ui=sys.modules["XN.ui"];
if(_ui){
return _ui.userInfoAutoComplete(id,type);
}else{
throw new Error("\u8bf7\u5728use\u4e2d\u5bfc\u5165XN.ui\u6a21\u5757\uff0c\u624d\u53ef\u4f7f\u7528XN.form\u4e0b\u7684\u6b64\u65b9\u6cd5");
}
};
});
object.add("XN.effect","XN.func, XN.element, XN.event",function(_bdb,XN){
this.fadeIn=function(_bdd,_bde){
if(_bdd.fadetimer){
return;
}
_bde=_bde||XN.func.empty;
var op=0;
_bdd.setOpacity(0);
_bdd.style.display="";
_bdd.fadetimer=setInterval(function(){
XN.element.setOpacity(_bdd,(op+=0.2));
if(op>=1){
clearInterval(_bdd.fadetimer);
_bdd.fadetimer=null;
_bde(_bdd);
}
},60);
};
this.fadeOut=function(_be0,_be1){
if(_be0.fadetimer){
return;
}
_be1=_be1||XN.func.empty;
var op=1;
_be0.setOpacity(1);
_be0.fadetimer=setInterval(function(){
XN.element.setOpacity(_be0,(op-=0.2));
if(op<=0){
clearInterval(_be0.fadetimer);
_be0.fadetimer=null;
_be1(_be0);
_be0.setOpacity(1);
}
},60);
};
this.gradient=function(_be3,r,g,b,_be7){
if(_be3.gradientTimer){
return;
}
_be7=_be7||XN.func.empty;
_be3.style.backgroundColor="#fff";
_be3.style.backgroundColor="rgb("+r+","+g+","+b+")";
_be3.gradientTimer=setInterval(function(){
b+=10;
_be3.style.backgroundColor="rgb("+r+","+g+","+(b>255?255:b)+")";
if(b>255){
clearInterval(_be3.gradientTimer);
_be3.gradientTimer=null;
_be7(_be3);
}
},60);
};
this.slideOpen=function(_be8){
if(_be8.slidetimer){
return;
}
if(!_be8.slideHeight){
var _be9=_be8.getStyle("position");
_be8.setStyle("position:absolute;left:-99999px;top:-99999px;");
_be8.show();
_be8.slideHeight=_be8.offsetHeight;
_be8.hide();
_be8.setStyle("position:"+_be9+";left:auto;top:auto;");
}
var eh=_be8.slideHeight,h=0;
var step=parseInt(eh/10);
_be8.style.height="0px";
_be8.style.display="";
_be8.style.overflow="hidden";
_be8.slidetimer=setInterval(function(){
_be8.style.height=(h+=step)+"px";
if(h>=eh){
clearInterval(_be8.slidetimer);
_be8.slidetimer=null;
_be8.style.height=eh;
_be8.style.overflow=_be8.slideOverflow;
}
},50);
};
this.slideClose=function(_bed){
if(_bed.slidetimer){
return;
}
var eh=_bed.offsetHeight,h=eh;
_bed.slideHeight=eh;
_bed.slideOverflow=_bed.getStyle("overflow");
_bed.style.overflow="hidden";
var step=parseInt(eh/10);
_bed.slidetimer=setInterval(function(){
_bed.style.height=(h-=step)+"px";
if(h<=0){
clearInterval(_bed.slidetimer);
_bed.slidetimer=null;
_bed.style.display="none";
_bed.style.height=eh;
_bed.style.overflow=_bed.slideOverflow;
}
},50);
};
this.scrollTo=function(_bf1,_bf2,_bf3){
if(_bf1.scrolltimer){
return;
}
_bf2=_bf2||10;
_bf3=_bf3||XN.func.empty;
var d=_bf1.realTop();
var i=XN.event.winHeight();
var h=document.body.scrollHeight;
var a=XN.event.scrollTop();
var _bf8=null;
if(d>a){
if(d+_bf1.offsetHeight<i+a){
return;
}
_bf1.scrolltimer=setInterval(function(){
a+=Math.ceil((d-a)/_bf2)||1;
window.scrollTo(0,a);
if(a==d){
clearInterval(_bf1.scrolltimer);
_bf1.scrolltimer=null;
}
},10);
}else{
_bf1.scrolltimer=setInterval(function(){
a+=Math.ceil((d-a)/_bf2)||-1;
window.scrollTo(0,a);
if(a==d){
clearInterval(_bf1.scrolltimer);
_bf1.scrolltimer=null;
}
},10);
}
};
(function(_bf9){
var _bfa={linear:function(t,b,c,d){
return c*t/d+b;
},easeIn:function(t,b,c,d){
return c*(t/=d)*t+b;
},easeOut:function(t,b,c,d){
return -c*(t/=d)*(t-2)+b;
},easeBoth:function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t+b;
}
return -c/2*((--t)*(t-2)-1)+b;
},easeInStrong:function(t,b,c,d){
return c*(t/=d)*t*t*t+b;
},easeOutStrong:function(t,b,c,d){
return -c*((t=t/d-1)*t*t*t-1)+b;
},easeBothStrong:function(t,b,c,d){
if((t/=d/2)<1){
return c/2*t*t*t*t+b;
}
return -c/2*((t-=2)*t*t*t-2)+b;
},backIn:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
return c*(t/=d)*t*((s+1)*t-s)+b;
},backOut:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
},backBoth:function(t,b,c,d,s){
if(typeof s=="undefined"){
s=1.70158;
}
if((t/=d/2)<1){
return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;
}
return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;
},bounceIn:function(t,b,c,d){
return c-_bfa["bounceOut"](d-t,0,c,d)+b;
},bounceOut:function(t,b,c,d){
if((t/=d)<(1/2.75)){
return c*(7.5625*t*t)+b;
}else{
if(t<(2/2.75)){
return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
}else{
if(t<(2.5/2.75)){
return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
}
}
}
return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
},bounceBoth:function(t,b,c,d){
if(t<d/2){
return _bfa["bounceIn"](t*2,0,c,d)*0.5+b;
}
return _bfa["bounceOut"](t*2-d,0,c,d)*0.5+c*0.5+b;
}};
var _c32=function(){
_c33(this.onTweening,this);
if(this.current>=this.frames){
this.stop();
_c33(this.onComplete,this);
this.tweening=false;
return;
}
this.current++;
};
var _c33=function(func,_c35){
var args=Array.prototype.slice.call(arguments);
args=args.slice(2);
if(typeof func=="function"){
try{
return func.apply(_c35||this,args);
}
catch(e){
_c35.errors=_c35.errors||[];
_c35.errors.push(e);
}
}
};
_bf9.Motion=function(_c37,_c38){
this.duration=_c38||1000;
this.tween=_c37||"linear";
};
_bf9.Motion.getTweens=function(){
return _bfa;
};
_bf9.Motion.prototype={init:function(){
_c33(this.onInit,this);
this.fps=this.fps||35;
this.frames=Math.ceil((this.duration/1000)*this.fps);
if(this.frames<1){
this.frames=1;
}
var f=("function"==typeof this.tween)?this.tween:_bfa[this.tween]||_bfa["linear"];
this.equation=function(from,to){
return f((this.current/this.frames)*this.duration,from,to-from,this.duration);
};
this.current=this.tweening=1;
},start:function(){
this.init();
_c33(this.onStart,this);
var _c3c=this,d=this.duration/this.frames;
this.timer=setInterval(function(){
_c32.call(_c3c);
},d);
},stop:function(){
if(this.timer){
clearInterval(this.timer);
}
this.tweening=false;
}};
})(_bdb);
});
object.add("XN.ui","XN, XN.array, XN.element, XN.event, XN.browser, XN.util, XN.dom, XN.func, XN.string, XN.env, XN.net, XN.json, XN.form, XN.datasource",function(_c3e,XN){
(function(){
_c3e.element={frame:null,iAmUIelement:true};
XN.array.each(["addClass","delClass","show","hide","remove"],function(i,v){
_c3e.element[v]=function(){
XN.element[v].apply(null,[this.frame].concat(XN.array.build(arguments)));
};
});
_c3e.container={container:null};
XN.array.each(["addChild","delChild","setContent"],function(i,v){
_c3e.container[v]=function(){
XN.element[v].apply(null,[this.container].concat(XN.array.build(arguments)));
};
});
XN.$extend(_c3e.container,_c3e.element);
})();
this.Element=this.element;
this.Content=this.container;
(function(ns){
var UI=_c3e;
var _c46=XN.event.addEvent;
var _c47=true;
function log(s){
if(_c47){
XN.log(XN.isString(s)?"xn.ui.button:"+s:s);
}
}
ns.button=function(_c49){
XN.$extend(this,_c49);
this.init();
};
ns.button.prototype=XN.$extend({},UI.Element);
ns.button.prototype.text=null;
ns.button.prototype.className="";
ns.button.prototype.disableClassName="gray";
ns.button.prototype.init=function(){
var This=this;
var el;
if(this.getConfig("el")){
el=XN.element.$(this.getConfig("el"));
}else{
el=XN.element.$element("input");
}
this.frame=el;
el.type="button";
this.addClass("input-submit");
this.addClass(this.getConfig("className"));
this.setText(this.getConfig("text"));
_c46(el,"click",function(){
if(This.onclick){
This.onclick();
}
},false);
};
ns.button.prototype.getConfig=function(key){
if(key=="el"){
return this.id;
}
return this[key];
};
ns.button.prototype.getEl=function(){
return this.frame;
};
ns.button.prototype.setText=function(text){
this.text=text;
this.getEl().value=text;
};
ns.button.prototype.disable=function(){
var el=this.getEl();
el.blur();
el.disabled=true;
el.addClass(this.getConfig("disableClassName"));
};
ns.button.prototype.enable=function(){
var el=this.getEl();
el.disabled=false;
el.delClass(this.getConfig("disableClassName"));
};
ns.button.prototype.focus=function(){
this.getEl().focus();
};
ns.button.prototype.blur=function(){
this.getEl().blur();
};
})(this);
(function(){
var rl="realLeft",rt="realTop",ow="offsetWidth",oh="offsetHeight";
_c3e.fixPositionMethods={"1-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+"px";
f.style.top=y+el[rt]()-p[rt]()+"px";
},"1-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+"px";
},"1-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()-f[oh]+"px";
},"1-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+"px";
f.style.top=y+el[rt]()-p[rt]()-f[oh]+"px";
},"2-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+"px";
},"2-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+"px";
},"2-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()-f[oh]+"px";
},"2-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()-f[oh]+"px";
},"3-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]+"px";
},"3-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]-f[ow]+"px";
f.style.top=y+el[rt]()+el[oh]+"px";
},"3-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]-f[oh]+"px";
},"3-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+el[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]-f[oh]+"px";
},"4-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]+"px";
},"4-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]+"px";
},"4-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()-f[ow]+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]-f[oh]+"px";
},"4-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-p[rl]()+"px";
f.style.top=y+el[rt]()-p[rt]()+el[oh]-f[oh]+"px";
}};
})();
this.fixPositionElement=function(_ca4){
var This=this;
this.config={tagName:"div",useIframeInIE6:true};
XN.$extend(this.config,_ca4);
var f,x,y;
if(this.getConfig("id")){
this.frame=f=XN.element.$(this.getConfig("id"));
x=f.realLeft();
y=f.realTop();
}else{
if(this.getConfig("tagName")){
this.frame=this.container=f=XN.element.$element(this.getConfig("tagName"));
}else{
return;
}
}
this.container=XN.element.$element("div");
this.frame.appendChild(this.container);
XN.array.each(["alignWith","alignType","offsetX","offsetY","alignParent"],function(i,v){
This[v]=This.getConfig(v)||This[v];
});
XN.element.setStyle(f,"position:absolute;z-index:10001;left:-9999px;top:-9999px");
if(!XN.element.$(this.alignParent)){
this.alignParent=XN.element.$(document.body);
}
XN.element.$(this.alignParent).appendChild(this.frame);
if((XN.browser.IE6&&this.getConfig("useIframeInIE6"))||this.getConfig("addIframe")){
var _cab;
this._iframe=_cab=XN.element.$element("iframe");
_cab.frameBorder=0;
_cab.scrolling="no";
_cab.setStyle("position:absolute;border:0px;left:0px;top:0px;z-index:-1;");
if(XN.browser.Gecko){
_cab.setAttribute("style","position:absolute;border:0px;left:0px;top:0px;z-index:-1;");
}
if(XN.browser.IE){
_cab.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";
}
this.frame.appendChild(_cab);
}
if(XN.element.visible(f)){
this.show();
}
f.style.display="block";
};
this.fixPositionElement.prototype=XN.$extend({},this.container);
XN.$extend(this.fixPositionElement.prototype,{alignWith:null,alignType:"4-1",offsetX:0,offsetY:0,alignParent:"dropmenuHolder",left:null,top:null,_isShow:false,getConfig:function(key){
return this.config[key];
},setOffsetX:function(x){
this.offsetX=x;
this.refresh();
return this;
},setOffsetY:function(y){
this.offsetY=y;
this.refresh();
return this;
},setAlignType:function(t){
this.alignType=t;
this.refresh();
return this;
},setAlignParent:function(p){
this.alignParent=p;
XN.element.$(this.alignParent).appendChild(this.frame);
this.refresh();
return this;
},refresh:function(){
if(this.visible()){
this.show();
}else{
this.hide();
}
return this;
},visible:function(){
return this._isShow;
},show:function(){
this._isShow=true;
this.frame.show();
if(this.alignWith){
this._moveToElement(this.alignWith);
}else{
var x=this.left===null?parseInt(((XN.element.$(this.alignParent).offsetWidth-this.frame.offsetWidth)/2),10):this.left;
var y=this.top===null?XN.event.scrollTop()+200:this.top;
this._moveToPosition(x,y);
}
if(this._iframe){
try{
this._iframe.style.height=this.frame.offsetHeight-2+"px";
this._iframe.style.width=this.frame.offsetWidth+"px";
}
catch(e){
}
}
return this;
},hide:function(){
this._isShow=false;
var f=this.frame;
f.style.left="-9999px";
f.style.top="-9999px";
return this;
},moveTo:function(x,y){
if(!x&&!y){
return;
}
if(XN.isNumber(x)){
this.left=x;
this.alignWith=null;
}else{
if(XN.isString(x)||XN.isElement(x)){
this.alignWith=XN.element.$(x);
}
}
if(XN.isNumber(y)){
this.top=y;
this.alignWith=null;
}
this.refresh();
return this;
},setX:function(x){
this.moveTo(x);
return this;
},setY:function(y){
this.moveTo(null,y);
return this;
},setIndex:function(i){
this.frame.style.zIndex=i;
return this;
},_moveToElement:function(el){
_c3e.fixPositionMethods[this.alignType](this.frame,XN.element.$(el),this.offsetX,this.offsetY,XN.element.$(this.alignParent));
},_moveToPosition:function(x,y){
if(x){
this.frame.style.left=x+"px";
}
if(y){
this.frame.style.top=y+"px";
}
}});
(function(){
var _cbc=_c3e.fixPositionElement.prototype;
var _cbd=XN.event;
var _cbe=null;
_c3e.clearDialog=function(){
if(_cbe&&_cbe.parent){
_cbe.remove();
}
};
_c3e.dialog=function(_cbf){
var This=this;
_cbe=this;
_c3e.fixPositionElement.call(this,_cbf);
this.container=XN.element.$element("div");
this.frame.appendChild(this.container);
if(this.getConfig("HTML")){
this.setContent(this.getConfig("HTML"));
}else{
this.setContent(this.buildHTML());
}
this.dialogContainer=XN.element.$("ui_dialog_container");
this.header=this.title=XN.element.$("ui_dialog_header");
this.body=this.msg=this.message=XN.element.$("ui_dialog_body");
this.footer=XN.element.$("ui_dialog_footer");
this.closeButton=XN.element.$("ui_dialog_close");
this.header.addChild=this.body.addChild=this.footer.addChild=function(s){
XN.element.addChild(this,s);
setTimeout(function(){
This.refresh();
},0);
};
this.dialogContainer.removeAttribute("id");
this.header.removeAttribute("id");
this.body.removeAttribute("id");
this.footer.removeAttribute("id");
this.closeButton.removeAttribute("id");
if(this.getConfig("showCloseButton")){
this.closeButton.show();
XN.event.addEvent(this.closeButton,"click",function(){
This.hide();
This.fireEvent("close");
});
}
this.frame.style.zIndex=10000;
this.setWidth(this.getConfig("width")||400);
if(this.getConfig("height")){
this.setHeight(this.getConfig("height"));
}
XN.array.each(["title","msg","message","header","body","footer"],function(i,v){
if(This.getConfig(v)){
This[v].setContent(This.getConfig(v));
}
});
if(this.getConfig("type")){
this.setType(this.getConfig("type"));
}
this._buttons=[];
XN.event.addEvent(this.footer,"click",function(e){
This._parseButtonEvent(e||window.event);
});
XN.util.hotKey.add("27",this._hotKeyEvent,this);
if(this.getConfig("modal")===true){
XN.dom.disable();
}
if(this.getConfig("noHeader")){
this.header.hide();
}
if(this.getConfig("noFooter")){
this.footer.hide();
}
if(this.getConfig("noPadding")){
this.body.addClass("no_padding");
}
};
_c3e.dialog.prototype=XN.$extend({},_cbc);
XN.$extend(_c3e.dialog.prototype,{header:null,body:null,footer:null,_iframe:null,_buttons:null,buildHTML:function(){
return ["<table id=\"ui_dialog_container\" style=\"width: 100%; height: 100%;\" class=\"pop_dialog_table\">","<tbody>","<tr>","<td class=\"pop_topleft\"></td>","<td class=\"pop_border\"></td>","<td class=\"pop_topright\"></td>","</tr>","<tr>","<td class=\"pop_border\"></td>","<td class=\"pop_content\">","<h2><span id=\"ui_dialog_header\"></span><a style=\"display:none;\" class=\"close-button\" id=\"ui_dialog_close\" href=\"#nogo\" onclick=\"return false;\">\u5173\u95ed</a></h2>","<div class=\"dialog_content\">","<div id=\"ui_dialog_body\" class=\"dialog_body\"></div>","<div id=\"ui_dialog_footer\" class=\"dialog_buttons\"></div>","</div>","</td>","<td class=\"pop_border\"></td>","</tr>","<tr>","<td class=\"pop_bottomleft\"></td>","<td class=\"pop_border\"></td>","<td class=\"pop_bottomright\"></td>","</tr>","</tbody>","</table>"].join("");
},getButton:function(text){
var _cc6=this._buttons;
for(var i=_cc6.length-1;i>=0;i--){
if(_cc6[i].text==text){
return _cc6[i];
}
}
return null;
},addButton:function(b){
var o={text:b.text,_onclickForDialog:b.onclick};
if(b.className){
o.className=b.className;
}
var _cca=new _c3e.button(o);
_cca.frame.setAttribute("dialog","1");
this._buttons.push(_cca);
this.footer.addChild(_cca);
return this;
},delButton:function(b){
if(XN.isString(b)){
b=this.getButton(b);
}
this.footer.delChild(b);
return this;
},_preventHide:false,preventHide:function(){
this._preventHide=true;
return this;
},setAutoHide:function(boo){
this._preventHide=!boo;
return this;
},_parseButtonEvent:function(e){
var el=_cbd.element(e);
if(el.tagName.toLowerCase()!=="input"||el.type!=="button"){
return;
}
if(!el.getAttribute("dialog")){
return;
}
var _ccf=this.getButton(el.value);
if(_ccf&&_ccf._onclickForDialog){
_ccf._onclickForDialog.call(this);
}
if(this._preventHide){
this._preventHide=true;
}else{
this.hide();
}
},_hotKeyEvent:function(){
this.hide();
},setType:function(t){
if(t=="normal"){
this.frame.delClass("errorDialog");
}else{
if(t=="error"){
this.frame.addClass("errorDialog");
}
}
return this;
},setWidth:function(w){
if(!w){
return this;
}
if(w=="auto"){
this.frame.style.width="auto";
this.dialogContainer.style.height="";
this.dialogContainer.style.width="";
this.width=this.frame.offsetWidth;
}else{
this.width=w;
this.frame.style.width=w+"px";
this.dialogContainer.style.height="100%";
this.dialogContainer.style.width="100%";
}
this.refresh();
return this;
},setHeight:function(h){
if(!h){
return this;
}
this.hegith=h;
this.frame.style.height=h+"px";
this.refresh();
return this;
},resizeTo:function(w,h){
this.setWidth(w);
this.setHeight(h);
return this;
},clear:function(){
this.header.setContent("");
this.body.setContent("");
this.footer.setContent("");
this._buttons=[];
return this;
},setTitle:function(s){
this.header.setContent(s);
return this;
},setBody:function(s){
this.body.setContent(s);
return this;
},remove:function(_cd7){
XN.util.hotKey.del("27",this._hotKeyEvent);
_c3e.element.remove.call(this);
if(!_cd7){
XN.dom.enable();
}
return this;
},refresh:function(){
if(this.visible()){
_cbc.show.apply(this,arguments);
}else{
this.hide();
}
return this;
},reLocate:function(){
var w=this.frame;
var s=XN.event.scrollTop();
var _cda=(XN.event.winHeight()-w.offsetHeight)/2;
_cda=(_cda<=0)?s:_cda+s;
w.style.top=_cda+"px";
},show:function(){
this._clearHideTimer();
if(this.getConfig("modal")===true){
XN.dom.disable();
}
_cbc.show.apply(this,arguments);
this.fireEvent("show");
return this;
},hide:function(){
this._clearHideTimer();
_cbc.hide.apply(this,arguments);
XN.dom.enable();
this.fireEvent("hide");
return this;
},_hideTimer:null,_clearHideTimer:function(){
if(this._hideTimer){
clearTimeout(this._hideTimer);
this._hideTimer=null;
}
},autoHide:function(t){
var This=this;
this._hideTimer=setTimeout(function(){
This.hide();
},t*1000);
return this;
}});
XN.event.enableCustomEvent(_c3e.dialog.prototype);
})();
this.panel=this.dialog;
this.dialog.prototype.setHeader=function(h){
if(h&&h!==""){
this.header.addChild(h);
}else{
this.header.innerHTML="";
}
};
this.dialog.prototype.setFooter=function(f){
if(f&&f!==""){
this.footer.addChild(f);
}else{
this.footer.innerHTML="";
}
};
this.menu=function(_cdf){
var This=this;
this.config={alignType:"4-1",barOnshowClass:"",tagName:"div",disalbeButtonClickEvent:true,fireOn:"click",keep:0.2,useIframeInIE6:true,effectTime:50};
XN.$extend(this.config,_cdf);
var _ce1;
if(this.getConfig("text")){
this.frame=_ce1=XN.element.$element(this.getConfig("tagName"));
_ce1.setContent(this.getConfig("text"));
}else{
if(this.getConfig("button")){
this.frame=_ce1=XN.element.$(this.getConfig("button"));
}else{
return false;
}
}
this._alignType=this.getConfig("alignType");
if(this.getConfig("menu")){
XN.element.$(this.getConfig("menu")).hide();
this.menu=new _c3e.fixPositionElement({id:this.getConfig("menu"),alignType:this._alignType,alignWith:this.getConfig("alignWith")||this.frame,addIframe:this.getConfig("addIframe"),useIframeInIE6:this.getConfig("useIframeInIE6")});
this.container=this.menu.frame;
this._canAddSubMenu=false;
}else{
var dt=XN.element.$element("div");
dt.hide();
this.menu=new _c3e.fixPositionElement({id:dt,alignType:this._alignType,alignWith:this.getConfig("alignWith")||this.frame,addIframe:this.getConfig("addIframe"),useIframeInIE6:this.getConfig("useIframeInIE6")});
this.container=XN.element.$element("div");
this._menu.setContent(this.container);
}
this.menu.setIndex(10001);
XN.event.addEvent(this.menu.frame,"click",function(e){
e=e||window.event;
This._frameOnClick(e);
},false);
this.menu.setOffsetX(this.getConfig("offsetX")||0);
this.menu.setOffsetY(this.getConfig("offsetY")||0);
var _ce4=this.getConfig("event");
if(_ce4=="click"){
XN.event.addEvent(this.frame,"click",function(e){
This._buttonClick(e||window.event);
});
XN.event.addEvent(document,"click",function(e){
This._documentClick(e||window.event);
});
}else{
if(_ce4=="mouseover"){
XN.event.addEvent(this.frame,"mouseover",function(e){
This._frameMouseOver(e||window.event);
});
if(this.getConfig("disalbeButtonClickEvent")){
XN.event.addEvent(this.frame,"onclick",function(e){
XN.event.stop(e||window.event);
});
}
XN.event.addEvent(this.frame,"mouseleave",function(){
This._buttonMouseLeave();
});
XN.event.addEvent(this.menu.frame,"mouseleave",function(){
This._menuMouseLeave();
});
XN.event.addEvent(this.menu.frame,"mouseover",function(){
This._mouseOverMenu=true;
});
}else{
if(_ce4=="manual"){
}
}
}
XN.event.addEvent(window,"resize",function(){
This.menu.refresh();
});
this.hide();
};
this.menu.prototype=XN.$extend({},this.container);
XN.$extend(this.menu.prototype,{isShow:true,menu:null,_alignType:null,_button:null,_canAddSubMenu:true,_delayTimer:null,_mouseOverMenu:false,_mouseOverButton:false,_clearTimer:function(){
if(this._delayTimer){
clearTimeout(this._delayTimer);
this._delayTimer=null;
}
},_buttonClick:function(e){
XN.event.stop(e);
if(this.isShow){
this.hide();
}else{
this.show();
}
},_documentClick:function(e){
this.hide();
},_frameOnClick:function(e){
var This=this;
var el=XN.event.element(e);
var tag=el.tagName.toLowerCase();
if(tag=="a"){
return true;
}
if((tag=="input"&&(el.type=="radio"||el.type=="checkbox"))||tag=="label"){
this.isShow=false;
setTimeout(function(){
This.isShow=true;
},20);
return true;
}
while(el!=this.menu.frame&&el.tagName&&el.tagName.toLowerCase()!="a"){
el=el.parentNode;
}
if(el.tagName.toLowerCase()=="a"){
return true;
}
XN.event.stop(e);
},_frameMouseOver:function(e){
var This=this;
this._mouseOverButton=true;
this._clearTimer();
var _cf1=this.getConfig("delay");
if(_cf1){
this._delayTimer=setTimeout(function(){
if(This._mouseOverButton){
This.show();
}
},_cf1*1000);
}else{
This.show();
}
if(!this.getConfig("keepDefaultEvent")){
XN.event.stop(e);
}
},_buttonMouseLeave:function(){
var This=this;
this._mouseOverButton=false;
this._clearTimer();
setTimeout(function(){
if(!This._mouseOverMenu){
This.hide();
}
},this.getConfig("effectTime"));
},_menuMouseLeave:function(){
var This=this;
this._mouseOverMenu=false;
this._clearTimer();
setTimeout(function(){
if(!This._mouseOverButton){
This.hide();
}
},this.getConfig("effectTime"));
},getConfig:function(key){
var _cf5={"hoverClass":"barOnshowClass","event":"fireOn","button":"bar","delay":"keep"};
if(_cf5[key]){
return this.config[key]||this.config[_cf5[key]];
}
return this.config[key];
},show:function(){
if(this.isShow){
return this;
}
this.menu.show();
var _cf6=this.getConfig("hoverClass");
if(_cf6!=""){
this.frame.addClass(this.getConfig("hoverClass"));
}
this.onShow();
this.isShow=true;
return this;
},setWidth:function(w){
this.menu.frame.style.width=w+"px";
this.menu.refresh();
return this;
},hide:function(){
if(!this.isShow){
return this;
}
this.menu.hide();
this.frame.delClass(this.getConfig("hoverClass"));
this.isShow=false;
this.onHide();
return this;
},refresh:function(){
if(this.isShow){
this.menu.show();
}
return this;
},onShow:XN.func.empty,onHide:XN.func.empty});
XN.event.enableCustomEvent(this.menu.prototype);
this.autoComplete=function(p){
var This=this;
this.config=this.config||{};
XN.$extend(this.config,{inputTip:null,searchDelay:0.2,DS:null,enableCache:true,maxCache:10});
XN.$extend(this.config,p);
if(this.getConfig("enableCache")){
this.cache=new XN.util.cache({cacheLength:this.getConfig("maxCache")});
}
if(this.getConfig("input")){
var _cfa=this.input=XN.element.$(this.getConfig("input"));
}else{
var _cfa=this.input=XN.element.$element("input");
_cfa.type="text";
_cfa.addClass("input-text");
}
this.frame=_cfa;
XN.event.addEvent(_cfa,"focus",function(e){
This._startCheck();
This.fireEvent("focus");
});
XN.event.addEvent(_cfa,"blur",function(e){
This._endCheck();
This.fireEvent("blur");
});
this.addEvent("focus",function(){
var v=this.input.value;
if(v==""||v==this.getConfig("inputTip")){
this.fireEvent("noinput");
}
});
this.addEvent("blur",function(){
this._lastInput=null;
});
XN.event.addEvent(_cfa,"click",function(e){
XN.event.stop(e||window.event);
});
XN.event.addEvent(_cfa,"keydown",function(e){
This._userInput=true;
e=e||window.event;
if(e.keyCode==13){
XN.event.stop(e);
}
This.fireEvent("keydown",e);
});
_cfa.setAttribute("AutoComplete","off");
this.DS=this.getConfig("DS");
};
this.autoComplete.prototype=XN.$extend({},this.element);
XN.$extend(this.autoComplete.prototype,{input:null,cache:null,_userInput:false,_lastInput:null,getConfig:function(key){
if(key=="input"){
return this.config["input"]||this.config["id"];
}
return this.config[key];
},_startCheck:function(){
var This=this;
if(this._inputTimer){
clearInterval(this._inputTimer);
}
this._inputTimer=setInterval(function(){
if(This._userInput){
This._userInput=false;
return;
}
This._checkInput();
},this.getConfig("searchDelay")*1000);
},_endCheck:function(){
clearInterval(this._inputTimer);
this._inputTimer=null;
},_checkInput:function(){
var This=this;
var cv=this.input.value;
if(XN.string.isBlank(cv)){
if(this._lastInput===""){
return;
}
this._lastInput="";
this.fireEvent("noinput");
return;
}
if(cv==this._lastInput){
return;
}
this._lastInput=cv;
this.fireEvent("searchbegin");
if(this.cache){
var _d04=this.cache.get(cv);
if(_d04){
this.fireEvent("searchover",_d04);
return;
}
}
if(!this.DS){
XN.log("no ds");
this.fireEvent("NO_DS");
return;
}
this.DS.query(cv,function(r){
if(This.cache){
This.cache.add(cv,r);
}
This.fireEvent("searchover",r);
});
}});
XN.event.enableCustomEvent(this.autoComplete.prototype);
(function(){
var _d06={};
getCompleteMenu=function(id){
return _d06[id];
};
getParentFromClass=function(_d08,_d09){
var _d0a=null;
while(_d08.parentNode){
_d08=_d08.parentNode;
if(XN.element.hasClassName(_d08,_d09)){
_d0a=_d08;
break;
}
}
return _d0a;
};
_c3e.autoCompleteMenu=function(p){
var This=this;
this._MID=XN.util.createObjID();
_d06[this._MID]=this;
this.config=this.config||{};
XN.$extend(this.config,{ulClassName:"",liClassName:"",liHoverClass:"m-autosug-hover",aClassName:"",noResult:"\u6ca1\u6709\u5339\u914d\u7ed3\u679c",dataLoading:"\u6b63\u5728\u52a0\u8f7d\u6570\u636e...",noInput:null,autoSelectFirst:false,noHighlightClass:"noHighlight"});
_c3e.autoComplete.call(this,p);
var _d0d=this.input;
var m=XN.element.$element("div");
m.innerHTML=this.getConfig("wrapper")||this._wrapper();
this._menuList=m.firstChild;
this._ul=this._menuList.getElementsByTagName("ul")[0];
this.menu=new _c3e.menu({button:_d0d,menu:this._menuList,fireOn:"manual"});
this.addEvent("keydown",this._inputOnkeydown);
XN.event.addEvent(this._ul,"mousedown",function(e){
This._menuOnclick(e||window.event);
},2);
XN.event.addEvent(_d0d,"blur",function(){
This.menu.hide();
});
this.menu.hide();
this.addEvent("noinput",function(){
var tip=this.getConfig("noInput");
if(!tip){
this.menu.hide();
return;
}
this._ul.innerHTML="<li>"+tip+"</li>";
this.menu.show();
});
this.addEvent("NO_DS",function(){
this._noDataShow();
});
this.addEvent("searchover",function(_d11){
this._buildMenu(_d11);
});
};
_c3e.autoCompleteMenu.prototype=XN.$extend({},_c3e.autoComplete.prototype);
XN.$extend(_c3e.autoCompleteMenu.prototype,{menu:null,_menuList:null,_ul:null,_currentLi:null,_highlightMenuItem:function(li){
if(li==this._currentLi){
return;
}
var _d13=this.getConfig("liHoverClass");
if(this._currentLi!==null){
XN.element.delClass(this._currentLi,_d13);
}
XN.element.addClass(li,_d13);
this._currentLi=li;
var aid=this._currentLi.getAttribute("aid");
if(aid){
this.fireEvent("highlight",this.result[parseInt(aid)]);
}
},_checkOnlyOneNoHightlightEl:function(){
return (this._ul.lastChild==this._ul.firstChild&&XN.element.hasClassName(this._ul.firstChild,this.config.noHighlightClass));
},_inputOnkeydown:function(_d15){
var li;
if(_d15.keyCode==13){
if(this.menu.isShow&&this._currentLi){
var aid=this._currentLi.getAttribute("aid");
if(aid){
this._selectMenuItem(parseInt(aid));
}
}
return false;
}
if(_d15.keyCode==38){
if(this._checkOnlyOneNoHightlightEl()){
return;
}
if(this._currentLi&&this._currentLi.previousSibling){
li=this._currentLi.previousSibling;
}else{
li=this._ul.lastChild;
}
while(XN.element.hasClassName(li,this.config.noHighlightClass)){
if(li.previousSibling){
li=li.previousSibling;
}else{
li=this._ul.lastChild;
}
}
this._highlightMenuItem(li);
return false;
}
if(_d15.keyCode==40){
if(this._checkOnlyOneNoHightlightEl()){
return;
}
if(this._currentLi&&this._currentLi.nextSibling){
li=this._currentLi.nextSibling;
}else{
li=this._ul.firstChild;
}
while(XN.element.hasClassName(li,this.config.noHighlightClass)){
if(li.nextSibling){
li=li.nextSibling;
}else{
li=this._ul.firstChild;
}
}
this._highlightMenuItem(li);
return false;
}
return true;
},_menuOnclick:function(_d18){
var el=XN.event.element(_d18);
while(el&&el.tagName&&el.tagName.toLowerCase()!=="li"){
el=el.parentNode;
}
if(!el||el.nodeType!==1||!el.getAttribute("aid")){
return false;
}
this._selectMenuItem(parseInt(el.getAttribute("aid")));
return false;
},_menuOnmouseover:function(_d1a){
var el=XN.event.element(_d1a);
if(el.parentNode==XN.element.$("dropmenuHolder")){
return;
}
while(el&&el.tagName&&el.tagName.toLowerCase()!=="li"){
el=el.parentNode;
}
if(!el||el.nodeType!==1||!el.getAttribute("aid")){
return false;
}
this._highlightMenuItem(el);
return false;
},_selectMenuItem:function(id){
this.menu.hide();
if(!getParentFromClass(this._menuList,"feed-comment-attach")){
this.input.focus();
}
this.fireEvent("select",this.result[id]);
this._lastInput=this.input.value;
},_buildMenu:function(_d1d){
var This=this;
this.result=_d1d;
if(_d1d.length>0){
this.fireEvent("hasResult");
}
if(_d1d.length==0){
this.fireEvent("noResult");
var _d1f=this.getConfig("noResult");
if(XN.isFunction(_d1f)){
_d1f=_d1f.call(this);
}
this._ul.innerHTML="<li>"+_d1f+"</li>";
this.menu.show();
this._currentLi=null;
return;
}
var lis=[];
lis.push(this.firstMenuItem());
var len=_d1d.length-1;
XN.array.each(_d1d,function(i,v){
lis.push("<li onmouseover=\"getCompleteMenu("+This._MID+")._highlightMenuItem(this);\" aid=\""+i+"\">"+This.buildMenu(v)+"</li>");
});
lis.push(this.lastMenuItem());
this._ul.innerHTML=lis.join("");
if(this.getConfig("autoSelectFirst")){
this._highlightMenuItem(this._ul.firstChild);
}
this.menu.show();
},_noDataShow:function(){
var tip=this.getConfig("dataLoading");
this._ul.innerHTML="<li>"+tip+"</li>";
this.menu.show();
},firstMenuItem:function(){
return "";
},lastMenuItem:function(){
return "";
},buildMenu:function(r){
return "<li>"+r.name+"</li>";
},setMenuWidth:function(w){
this.menu.setWidth(w);
},getCurrentItem:function(){
return this._currentLi;
},setCurrentItem:function(item){
this._currentLi=item;
}});
_c3e.autoCompleteMenu.prototype._wrapper=function(){
return ["<div class=\"m-autosug\">","<span class=\"x1\">","<span class=\"x1a\"></span>","</span>","<span class=\"x2\">","<span class=\"x2a\"></span>","</span>","<div class=\"m-autosug-minwidth\">","<div class=\"m-autosug-content\">","<ul></ul>","</div>","</div>","</div>"].join("");
};
})();
this.friendSelector=function(_d28){
var This=this;
this.config=this.config||{};
XN.$extend(this.config,{getFriendsUrl:"http://browse."+XN.env.domain+"/getfriendsajax.do?s=1",url:"http://sg."+XN.env.domain+"/s/f",aurl:"http://friend."+XN.env.domain+"/friendsSelector.do",param:{}});
if(this.config.url.indexOf("sg.renren.com/s/m")!=-1){
this.config.aurl="http://friend."+XN.env.domain+"/friendSelectorForVip";
}
XN.$extend(this.config,_d28.params);
if(XN.isUndefined(this.getConfig("page"))){
this.config["page"]=false;
}
_c3e.autoCompleteMenu.call(this,_d28);
this.addEvent("select",function(r){
this.input.value=r.name;
if(this.onSelectOne){
this.onSelectOne(r);
}
});
this.buildMenu=function(r){
return r.name;
};
this.addEvent("focus",function(){
if(this._ready){
return;
}
if(this._isLoading){
return;
}
this.loadFriends();
});
};
this.friendSelector.prototype=XN.$extend({},this.autoCompleteMenu.prototype);
XN.$extend(this.friendSelector.prototype,{_isLoading:false,_ready:false,isReady:function(){
return this._ready;
},isLoading:function(){
return this._isLoading;
},loadFriends:function(r){
if(this.isLoading()){
return;
}
this._isLoading=true;
var This=this;
var p={};
p["init"]=true;
p["uid"]=false;
p["uhead"]=false;
p["uname"]=false;
p["group"]=false;
p["net"]=false;
p["param"]=this.getConfig("param");
p["page"]=this.getConfig("page");
new XN.net.xmlhttp({useCache:true,url:this.getConfig("aurl"),method:"get",data:"p="+XN.json.build(p),onSuccess:function(r){
r=XN.json.parse(r.responseText);
This._onload(r);
}});
},_onload:function(r){
this.isLoading=false;
this._ready=true;
this.config.qkey=r.qkey;
this.DS=new XN.util.DS_friends({url:this.getConfig("url"),qkey:this.getConfig("qkey"),limit:this.getConfig("limit"),page:this.getConfig("page"),param:this.getConfig("param")});
this.DS.query=function(v,_d32){
var This=this;
try{
this._request.abort();
}
catch(e){
}
function parseDS_JSON(r){
r=r.responseText;
var pp;
try{
var rt=XN.JSON.parse(r);
if(This.rootKey&&rt[This.rootKey]){
pp=rt[This.rootKey];
}else{
pp=rt;
}
}
catch(e){
pp=[];
}
_d32(pp);
}
var _d37=XN.json.parse(this.param);
this._request=new XN.net.xmlhttp({url:this.url,data:"q="+encodeURIComponent(v)+(!!this.limit?("&l="+this.limit):"")+(!!_d37.friendId?("&friend="+_d37.friendId):""),method:this.method,onSuccess:parseDS_JSON});
};
}});
this.friendSelectorSynchronous=function(a,b){
function s(id,ac,v){
if(XN.isObject(id)){
id=id.id;
}
if(v.isReady()){
try{
v[ac](id);
}
catch(e){
}
}else{
v.addEvent("load",function(){
try{
v[ac](id);
}
catch(e){
}
});
v.loadFriends();
}
}
a.addEvent("select",function(id){
s(id,"select",b);
});
a.addEvent("deselect",function(id){
s(id,"deselect",b);
});
b.addEvent("select",function(id){
s(id,"select",a);
});
b.addEvent("deselect",function(id){
s(id,"deselect",a);
});
};
(function(){
_c3e.multiFriendSelector=function(_d41){
var This=this;
this._ID=XN.util.createObjID();
this.config=this.config||{};
XN.$extend(this.config,{inputName:"ids",nameInputName:"names",aurl:"http://friend."+XN.env.domain+"/friendsSelector.do",url:"http://sg."+XN.env.domain+"/s/f",initParam:{},param:{},noInput:false,maxNum:-1});
XN.$extend(this.config,_d41);
if(this.config.url.indexOf("sg.renren.com/s/m")!=-1){
this.config.aurl="http://friend."+XN.env.domain+"/friendSelectorForVip";
}
this.frame=XN.element.$element("div");
var div=XN.element.$element("div");
div.hide();
document.body.appendChild(div);
div.appendChild(this.frame);
this.frame.innerHTML=["<div id=\""+this.getID("friendsContainer")+"\" class=\"tokenizer friendAutoSelector\">","<span id=\""+this.getID("inputContainer")+"\" class=\"tokenizer_input\"><input id=\""+this.getID("input")+"\" type=\"text\" /></span>","</div>","<div class=\"float-right\" id=\""+this.getID("menu")+"\"></div>"].join("");
this.input=this.getEl("input");
this.menuContainer=this.getEl("menu");
XN.event.addEvent(this.getEl("friendsContainer"),"click",function(e){
This._parseClickEvent(e||window.event);
});
this.autoComplete=new _c3e.friendSelector({id:this.input,inputTip:"\u8f93\u5165\u597d\u53cb\u59d3\u540d...",autoSelectFirst:true,url:this.getConfig("url"),aurl:this.getConfig("aurl"),param:this.getConfig("param")});
this.autoComplete.loadFriends=function(r){
if(this.isLoading()){
return;
}
this._isLoading=true;
var p={};
p["init"]=true;
p["uid"]=true;
p["uhead"]=false;
p["uname"]=true;
p["group"]=false;
p["net"]=false;
XN.$extend(p,This.getConfig("initParam"));
p["param"]=this.getConfig("param");
new XN.net.xmlhttp({useCache:true,url:this.getConfig("aurl"),method:This.getConfig("loadMethod")||"get",data:"p="+XN.json.build(p),onSuccess:function(r){
r=XN.json.parse(r.responseText);
This._allFriends=r.candidate;
This.fireEvent("load");
This.autoComplete._onload(r);
}});
};
this.autoComplete.buildMenu=function(r){
return "<p>"+r.name+"</p>";
};
this.autoComplete.setMenuWidth(129);
this.autoComplete.addEvent("keydown",function(e){
This._onInputKeydown(e);
});
this.autoComplete.addEvent("select",function(r){
XN.log(this.input);
this.input.value="";
This.selectFriend(r);
});
if(this.getConfig("noInput")){
this.input.hide();
}
this.fireEvent("init");
};
var _d4b=_c3e.multiFriendSelector.prototype=XN.$extend({},_c3e.element);
XN.$extend(_d4b,{isReady:function(){
return this.autoComplete.isReady();
},isLoading:function(){
return this.autoComplete.isLoading();
},loadFriends:function(){
this.autoComplete.loadFriends();
},getUserByID:function(id){
id=String(id);
var rt=null;
XN.array.each(this._allFriends,function(i,v){
if(String(v.id)==id){
rt=v;
return false;
}
});
return rt;
},getConfig:function(key){
if(key=="inputName"){
return this.config["idInputName"]||this.config["inputName"];
}
return this.config[key];
},getID:function(id){
return "mfs_"+this._ID+id;
},getFriendID:function(id){
return this.getID("friend_"+id);
},getFriendEl:function(id){
return XN.element.$(this.getFriendID(id));
},getEl:function(id){
return XN.element.$(this.getID(id));
},getFriendsNum:function(){
return this.getEl("friendsContainer").getElementsByTagName("a").length;
},getSelectedFriends:function(){
var rt=[];
var a=XN.array.build(this.getEl("friendsContainer").getElementsByTagName("a"));
XN.array.each(a,function(i,v){
rt.push(v.getAttribute("uid")+"");
});
return rt;
},reset:function(){
this.deselectAll();
},deselectAll:function(){
var els=XN.array.build(this.getEl("friendsContainer").getElementsByTagName("a"));
XN.array.each(els,function(i,v){
XN.element.remove(v);
});
this.fireEvent("deselectAll",this.getIds());
},selectFriends:function(fs){
var This=this;
XN.array.each(fs,function(i,v){
This.select(v);
});
},deselectFriends:function(fs){
var This=this;
XN.array.each(fs,function(i,v){
This.deselect(v);
});
},select:function(o){
if(XN.isUndefined(o)){
return;
}
XN.log("mfs select:");
XN.log(o);
var _d65=this.getConfig("maxNum");
if(_d65!==-1){
if(this.getFriendsNum()==_d65){
this.fireEvent("overMaxNum",_d65);
return;
}
}
if(XN.isString(o)||XN.isNumber(o)){
o={id:o,name:this.getUserByID(o).name};
}
if(this.getFriendEl(o.id)){
return;
}
this.getEl("friendsContainer").insertBefore(this.createFriendHTML(o.id,o.name),this.getEl("inputContainer"));
this.fireEvent("select",o.id);
},deselect:function(uid){
if(!this.getFriendEl(uid)){
return;
}
this.getFriendEl(uid).remove();
this.fireEvent("deselect",uid);
},_parseClickEvent:function(e){
var el=XN.event.element(e);
XN.event.stop(e);
if(el&&el.getAttribute("action")){
this.deselectFriend(el.getAttribute("uid"));
}
},createFriendHTML:function(uid,_d6a){
var a=XN.element.$element("a");
a.id=this.getFriendID(uid);
a.setAttribute("uid",uid);
a.href="#nogo";
a.className="token";
a.tabindex="-1";
a.innerHTML=["<span>\n<span>\n<span>\n<span>\n<input type=\"hidden\" value=\"",uid,"\" name=\"",this.getConfig("inputName"),"\" />\n","<input type=\"hidden\" value=\"",_d6a,"\" name=\"",this.getConfig("nameInputName"),"\" />\n",_d6a,"<span uid=\"",uid,"\" action=\"x\" class=\"x\" onmouseout=\"this.className='x'\" onmouseover=\"this.className='x_hover'\" >\n</span>\n</span>\n</span>\n</span>\n</span>"].join("");
return a;
},_onInputKeydown:function(_d6c){
var i=this.getEl("inputContainer"),pa=i.previousSibling,na=i.nextSibling,_d70=this.input,c=this.getEl("friendsContainer");
if(_d6c.keyCode==8&&this.input.value==""){
if(pa){
this.deselectFriend(pa.getAttribute("uid"));
}
return true;
}else{
if(_d6c.keyCode==37&&this.input.value==""){
if(pa&&pa.tagName.toLowerCase()=="a"){
i.parentNode.removeChild(i);
c.insertBefore(i,pa);
setTimeout(function(){
_d70.focus();
},0);
}
return true;
}else{
if(_d6c.keyCode==39&&this.input.value==""){
if(na&&na.tagName.toLowerCase()=="a"){
i.parentNode.removeChild(i);
XN.dom.insertAfter(i,na);
setTimeout(function(){
_d70.focus();
},0);
}
return true;
}
}
}
return false;
}});
XN.event.enableCustomEvent(_d4b);
_d4b.deSelectAll=_d4b.deselectAll;
_d4b.deSelectFriend=_d4b.deselectFriend=_d4b.deselect;
_d4b.selectFriend=_d4b.select;
_d4b.getSelectedFriendsID=_d4b.getSelectedFriends;
_d4b.getIds=_d4b.getSelectedFriends;
})();
this.friendSelectorWithMenu=function(p){
var _d73=new _c3e.friendSelector(p);
var menu=new _c3e.friendSelectorMenu({url:_d73.getConfig("url"),aurl:_d73.getConfig("aurl"),param:_d73.getConfig("param"),multi:false,alignType:p.alignType,offsetX:p.offsetX,offsetY:p.offsetY,initParam:p.initParam});
var div=XN.element.$element("div");
div.addChild(_d73);
div.addChild(menu);
_d73.frame=div;
_d73.addEvent("focus",function(){
menu.menu.hide();
});
menu.addEvent("select",function(p){
var This=this;
setTimeout(function(){
This.menu.hide();
},30);
_d73.fireEvent("select",this.getUserByID(p));
});
menu.menu.menu.setOffsetY(9);
return _d73;
};
this.multiFriendSelectorWithMenu=function(p){
var _d79=new _c3e.multiFriendSelector(p);
var menu=new _c3e.friendSelectorMenu({url:_d79.getConfig("url"),aurl:_d79.getConfig("aurl"),param:_d79.getConfig("param"),multi:true,showSelectAllCheckbox:_d79.getConfig("showSelectAllCheckbox")||false});
menu.addEvent("submit",function(){
menu.menu.hide();
});
_d79.menuContainer.setContent(menu);
_c3e.friendSelectorSynchronous(_d79,menu);
return _d79;
};
(function(ns){
var _d7c=false;
var _d7d=XN.event.addEvent;
var log=function(s){
if(_d7c){
XN.log(XN.isString(s)?"ui.tabView:"+s:s);
}
return s;
};
ns.tabView=function(_d80){
this.config={selectedClass:"select",event:"click",alwaysReload:false,mouseOverDelay:0.2};
XN.$extend(this.config,_d80);
this.init();
};
ns.tabView.prototype={_tabs:null,_currentTab:null,_idPre:null,_tabIndex:0,init:function(){
this._idPre=XN.util.createObjID();
this._tabs=[];
},getConfig:function(key){
if(key=="activeClass"){
return this.config["activeClass"]||this.config["selectedClass"];
}
return this.config[key];
},_getID:function(el){
if(el.nodeType&&el.nodeType==1){
return this._setID(el).id;
}
return el;
},_setID:function(el){
if(!el.id){
this._tabIndex++;
el.setAttribute("id","tabview_"+this._idPre+"_"+this._tabIndex);
}
return XN.element.$(el);
},_getTab:function(id){
log("_getTab start");
log("param:id");
log(id);
if(!id){
return log(id);
}
if(id.label){
return log(id);
}
var key=this._getID(id);
log("key:"+key);
var tabs=this._tabs;
log("all tabs");
log(tabs);
for(var i=tabs.length-1;i>=0;i--){
if(tabs[i].key==key){
log("_getTab end");
return log(tabs[i]);
}
}
log("_getTab end");
return log(null);
},getCurrentTab:function(){
return this._getTab(this._currentTab);
},setCurrentTab:function(tab,_d89){
log("setCurrentTab start");
var oldC=this.getCurrentTab();
var nowC=this._getTab(tab);
log("old current:");
log(oldC);
log("now current:");
log(nowC);
if(oldC&&oldC.key==nowC.key&&!_d89){
return;
}
if(oldC){
this._deactiveTab(oldC);
}
this._activeTab(nowC);
this._setCurrentTab(nowC);
log("setCurrentTab end");
this.fireEvent("change",nowC);
return this;
},reset:function(){
var tab=this.getCurrentTab();
if(tab){
this._deactiveTab(tab);
}
this._setCurrentTab(null);
return this;
},_activeTab:function(tab){
log("_activeTab:");
log(tab);
tab.getEl("label").addClass(this.getConfig("activeClass"));
if(tab.content){
tab.getEl("content").show();
}
tab.onActive(tab);
log("_activeTab end");
},_deactiveTab:function(tab){
if(tab.getEl("label")){
tab.getEl("label").delClass(this.getConfig("activeClass"));
}
if(tab.content){
tab.getEl("content").hide();
}
tab.onInactive(tab);
},_setCurrentTab:function(tab){
log("_setCurrentTab start");
tab=this._getTab(tab);
log("currentTab:");
log(tab);
this._currentTab=tab?tab.key:null;
log("this._currentTab");
log(this._currentTab);
log("_setCurrentTab end");
},addTab:function(t){
log("addTab start");
log("params:");
log(t);
var This=this;
var tab={onActive:XN.func.empty,onClick:XN.func.empty,onInactive:XN.func.empty,onInit:XN.func.empty,getEl:function(key){
return XN.element.$(this[key]);
},active:false};
t.label=this._setID(XN.element.$(t.label));
t.key=t.key||t.label.id;
if(t.content){
t.content=this._getID(t.content);
log("get content id:"+t.content);
}
XN.$extend(tab,t);
this._tabs.push(tab);
log("all tabs");
log(this._tabs);
if(tab.active&&this._currentTab===null){
if(tab.content){
tab.getEl("content").show();
}
tab.label.addClass(this.getConfig("activeClass"));
this._setCurrentTab(tab);
}else{
if(tab.content){
tab.getEl("content").hide();
}
}
var ev=this.getConfig("event");
if(ev=="click"){
_d7d(tab.label,"click",function(e){
e=e||window.event;
XN.event.stop(e);
This._eventHander(e,tab.label);
},false);
}else{
if(ev=="mouseover"){
var _d96=true;
var _d97=null;
_d7d(tab.label,"mouseover",function(e){
var el=this;
_d96=true;
_d97=setTimeout(function(){
if(!_d96){
return;
}
e=e||window.event;
This._eventHander(e,tab.label);
},This.getConfig("mouseOverDelay")*1000);
},false);
_d7d(tab.label,"mouseleave",function(e){
_d96=false;
if(_d97){
clearTimeout(_d97);
}
},false);
}
}
tab.onInit(tab);
log("addTab end");
return this;
},_eventHander:function(e,el){
log("on click,el:");
log(el);
log("get tab form by el:");
var tab=this._getTab(el);
if(this.getConfig("alwaysReload")){
this.setCurrentTab(tab,true);
}else{
this.setCurrentTab(tab);
}
tab.onClick(e,tab);
},refresh:function(){
this._activeTab(this.getCurrentTab());
return this;
},showTab:function(id,_d9f){
this.setCurrentTab(id,_d9f);
},hideAll:function(){
this.reset();
}};
XN.event.enableCustomEvent(ns.tabView.prototype);
})(this);
this.refreshAll=function(){
document.body.style.zoom=1.1;
document.body.style.zoom=1;
};
this.getHiddenDiv=function(){
if(!this._hiddenDiv){
this._hiddenDiv=XN.element.$element("div").hide();
document.body.appendChild(this._hiddenDiv);
}
return this._hiddenDiv;
};
this.friendSearchBar=function(p){
var _da1=XN.element.$(p.input);
var _da2=XN.element.$(p.submit||null);
var form=XN.element.$(p.form);
var tip=p.tip||"\u627e\u4eba...";
var _da5=p.action||function(p){
if(p.type&&p.type=="PAGE"){
window.location.href="http://page."+XN.env.domain+"/"+p.id+"?from=opensearch";
}else{
window.location.href="http://www."+XN.env.domain+"/profile.do?id="+p.id+"&from=opensearch";
}
};
var _da7=false;
(new XN.form.inputHelper(_da1)).setDefaultValue(tip).onEnter(function(el){
if(_da7){
return;
}
if(!XN.string.isBlank(el.value)){
form.submit();
}
});
var _da9=16;
var _daa={id:_da1,noResult:function(){
return "\u641c\u7d22\""+this.input.value+"\"";
},limit:_da9,params:p.params};
var _dab=new _c3e.friendSelector(_daa);
_dab.lastMenuItem=function(){
if(this.result.length==_da9){
return "<li><p><a onmousedown=\"window.location.href=this.href\" href=\"http://friend."+XN.env.domain+"/myfriendlistx.do?qu="+this.input.value+"\">\u70b9\u51fb\u67e5\u770b\u66f4\u591a..</a></p></li>";
}else{
return "";
}
};
_dab.setMenuWidth(_da1.offsetWidth);
_dab.onSelectOne=function(p){
_da7=true;
_da5(p);
};
if(_da2){
_da2.onclick=function(){
if(_da7){
return false;
}
var v=_da1.value;
if(v!=tip&&!XN.string.isBlank(v)){
form.submit();
return false;
}
if(_da2.tagName.toLowerCase()=="a"){
return true;
}else{
return false;
}
};
}
};
this.navSearchBar=function(p){
var _daf=XN.element.$(p.input);
var _db0=XN.element.$(p.submit||null);
var form=XN.element.$(p.form);
var tip=p.tip||"\u627e\u4eba...";
var _db3=p.action||function(p){
if(p.type&&p.type=="PAGE"){
window.location.href="http://page."+XN.env.domain+"/"+(p.id||p.uid)+"?from=opensearch";
}else{
window.location.href="http://www."+XN.env.domain+"/profile.do?id="+(p.id||p.uid)+"&from=opensearch";
}
};
var _db5=false;
(new XN.form.inputHelper(_daf)).setDefaultValue(tip).onEnter(function(el){
if(_db5){
return;
}
if(!XN.string.isBlank(el.value)){
form.submit();
}
});
var _db7=7;
var _db8={id:_daf,noResult:function(){
return "<a onmousedown=\"window.location.href=this.href\" href=\"http://browse."+XN.env.domain+"/searchEx.do?from=opensearchclick&q="+encodeURIComponent(this.input.value)+"\" title=\"\u641c\u7d22"+this.input.value+"\">\u641c\u7d22\""+this.input.value+"\"</a>";
},limit:_db7,params:p.params,wrapper:["<div class=\"\">","<span class=\"x1\">","<span class=\"x1a\"></span>","</span>","<span class=\"x2\">","<span class=\"x2a\"></span>","</span>","<div class=\"m-autosug-minwidth\">","<div class=\"m-autosug-content\">","<ul class=\"search-Result\"></ul>","</div>","</div>","</div>"].join(""),url:"http://sg."+XN.env.domain+"/s/h"};
var _db9=new _c3e.friendSelector(_db8);
_db9.loadFriends=function(r){
if(this.isLoading()){
return;
}
this._isLoading=true;
var This=this;
this._onload();
};
_db9._onload=function(){
this.isLoading=false;
this._ready=true;
this.DS=new XN.util.DS_friends({url:this.getConfig("url"),qkey:this.getConfig("qkey"),limit:this.getConfig("limit"),page:this.getConfig("page"),param:this.getConfig("param")});
this.DS.query=function(v,_dbd){
var This=this;
try{
this._request.abort();
}
catch(e){
}
function parseDS_JSON(r){
r=r.responseText;
var pp;
try{
var rt=XN.json.parse(r);
if(This.rootKey&&rt[This.rootKey]){
pp=rt[This.rootKey];
}else{
pp=rt;
}
}
catch(e){
pp=[];
}
_dbd(pp);
}
this._request=new XN.net.xmlhttp({url:this.url,data:"q="+encodeURIComponent(v)+"&l="+this.limit,method:this.method,onSuccess:parseDS_JSON});
};
};
_db9.buildMenu=function(r){
return "<img src=\""+(r.head||r.uhead)+"\" width=\"50\" height=\"50\" alt=\""+(r.name||r.uname)+"\"/>"+"<strong>"+(r.name||r.uname)+"</strong>";
};
_db9._noDataShow=function(){
var tip=this.getConfig("dataLoading");
this._ul.innerHTML="<li class=\"lookMore\">"+tip+"</li>";
this.menu.show();
};
_db9._buildMenu=function(_dc4){
var This=this;
this.result=_dc4;
if(_dc4.length==0){
var _dc6=this.getConfig("noResult");
if(XN.isFunction(_dc6)){
_dc6=_dc6.call(this);
}
this._ul.innerHTML="<li class=\"lookMore\">"+_dc6+"</li>";
this.menu.show();
this._currentLi=null;
return;
}
var lis=[];
lis.push(this.firstMenuItem());
var len=_dc4.length-1;
XN.array.each(_dc4,function(i,v){
lis.push("<li onmouseover=\"getCompleteMenu("+This._MID+")._highlightMenuItem(this);\" aid=\""+i+"\">"+This.buildMenu(v)+"</li>");
});
lis.push(this.lastMenuItem());
this._ul.innerHTML=lis.join("");
if(this.getConfig("autoSelectFirst")){
this._highlightMenuItem(this._ul.firstChild);
}
this.menu.show();
};
_db9.lastMenuItem=function(){
if(this.result.length==_db7){
return "<li class=\"lookMore\"><a onmousedown=\"window.location.href=this.href\" href=\"http://friend."+XN.env.domain+"/myfriendlistx.do?qu="+this.input.value+"\">\u70b9\u51fb\u67e5\u770b\u66f4\u591a..</a></li>";
}else{
return "";
}
};
_db9.setMenuWidth(_daf.offsetWidth);
_db9.onSelectOne=function(p){
_db5=true;
_db3(p);
};
if(_db0){
_db0.onclick=function(){
if(_db5){
return false;
}
var v=_daf.value;
if(v!=tip&&!XN.string.isBlank(v)){
form.submit();
return false;
}
if(_db0.tagName.toLowerCase()=="a"){
return true;
}else{
return false;
}
};
}
};
this.userInfoAutoComplete=function(id,type){
var _dcf={"elementaryschool":"http://www."+XN.env.domain+"/autocomplete_elementaryschool.jsp","juniorhighschool":"http://www."+XN.env.domain+"/autocomplete_juniorhighschool.jsp","workplace":"http://www."+XN.env.domain+"/autocomplete_workplace.jsp","highschool":"http://www."+XN.env.domain+"/autocomplete_highschool.jsp","allnetwork":"http://www."+XN.env.domain+"/autocomplete_all_network.jsp","allSchool":"http://www."+XN.env.domain+"/autocomplete-school.jsp","city":"http://www."+XN.env.domain+"/autocomplete-city.jsp","college":"http://www."+XN.env.domain+"/autocomplete_college.jsp"};
var ds=new XN.datasource.DS_XHR({url:_dcf[type]});
var at=new _c3e.autoCompleteMenu({DS:ds,input:id});
at.buildMenu=function(r){
return "<p>"+(r.name||r.Name)+"</p>";
};
at.addEvent("select",function(r){
this.input.value=(r.name||r.Name);
});
return at;
};
});
object.add("XN.Do","XN, XN.func, XN.array, XN.ui",function(_dd4,XN){
this.currentAlert=null;
this.currentConfirm=null;
this.alert=function(_dd6,_dd7,type,X,Y,w,h,_ddd){
var _dde={type:"normal",width:400,button:"\u786e\u5b9a",modal:false,callBack:XN.func.empty,autoHide:0,addIframe:true,closeFire:true};
if(!XN.isString(_dd6)){
extendObject(_dde,_dd6);
}else{
if(XN.isString(_dd6)||arguments.length>1){
var ars=arguments;
XN.array.each(["message","title","type","X","Y","width","height","callBack"],function(i,v){
if(ars[i]){
_dde[v]=ars[i];
}
});
}
}
var temp=_dde.params;
delete _dde.params;
_dde=extendObject({},_dde,temp);
_dde.callback=_dde.callback||_dde.callBack;
try{
_dd4.currentAlert.remove(_dde.modal===true);
}
catch(e){
}
var _de3=new XN.ui.dialog(_dde).setType(_dde.type).setTitle(_dde.title||(_dde.type=="error"?"\u9519\u8bef\u63d0\u793a":"\u63d0\u793a")).setWidth(_dde.width).setHeight(_dde.height).setX(_dde.X).setY(_dde.Y).addButton({text:(_dde.yes||_dde.button),onclick:function(){
_de3.setAutoHide(true);
return _dde.callback.call(_de3);
}}).show();
if(_dde.closeFire===true){
_de3.addEvent("close",function(){
_dde.callback.call(_de3);
});
}
_dd4.currentAlert=_de3;
try{
_de3.getButton(_dde.button).focus();
}
catch(e){
}
if(_dde.autoHide){
_de3.autoHide(_dde.autoHide);
}
return _de3;
};
this.confirm=function(_de4,_de5,_de6,yes,no,X,Y,w,h){
var _ded={type:"normal",width:400,modal:false,yes:"\u786e\u5b9a",no:"\u53d6\u6d88",callBack:XN.func.empty,focus:null,addIframe:true,closeFire:false};
if(!XN.isString(_de4)&&!XN.isNumber(_de4)){
extendObject(_ded,_de4);
}else{
if(XN.isString(_de4)||arguments.length>1){
var ars=arguments;
XN.array.each(["message","title","callBack","yes","no","X","Y","w","h"],function(i,v){
if(ars[i]){
_ded[v]=ars[i];
}
});
}
}
var temp=_ded.params;
delete _ded.params;
_ded=extendObject({},_ded,temp);
_ded.callback=_ded.callback||_ded.callBack;
try{
_dd4.currentConfirm.remove(_ded.modal===true);
}
catch(e){
}
var _df2=new XN.ui.dialog(_ded).setType(_ded.type).setTitle(_ded.title||(_ded.type=="error"?"\u9519\u8bef\u63d0\u793a":"\u63d0\u793a")).setBody(_ded.msg||_ded.message||"").setWidth(_ded.width).setHeight(_ded.height).setX(_ded.X).setY(_ded.Y).addButton({text:(_ded.submit||_ded.yes),onclick:function(){
_df2.setAutoHide(true);
return _ded.callback.call(_df2,true);
}}).addButton({text:(_ded.cancel||_ded.no),onclick:function(){
_df2.setAutoHide(true);
return _ded.callback.call(_df2,false);
}}).show();
_df2.getButton(_ded.cancel||_ded.no).addClass("gray");
if(_ded.focus=="submit"){
_ded.focus=_ded.submit;
}else{
if(_ded.focus=="cancel"){
_ded.focus=_ded.cancel;
}
}
if(_ded.closeFire===true){
_df2.addEvent("close",function(){
_ded.callback.call(_df2,false);
});
}
_df2.getButton(_ded.focus||_ded.submit||_ded.yes).focus();
_dd4.currentConfirm=_df2;
return _df2;
};
this.showMessage=this.showMsg=function(msg,_df4,time){
var _df6=_dd4.alert({msg:msg,title:(_df4||"\u63d0\u793a"),noFooter:true,autoHide:(time||2)});
return _df6;
};
this.showError=function(msg,_df8,time){
var _dfa=_dd4.alert({msg:msg,type:"error",title:(_df8||"\u9519\u8bef\u63d0\u793a"),noFooter:true,autoHide:(time||2)});
return _dfa;
};
});
object.use(["XN","XN.array","XN.browser","XN.cookie","XN.Do","XN.dom","XN.effect","XN.element","XN.env","XN.event","XN.form","XN.func","XN.json","XN.net","XN.string","XN.template","XN.ui","XN.util","XN.datasource"],function(XN){
$extend=XN.$extend;
if(window.XN==null){
window.XN=XN;
}else{
var _dfc=window.XN;
window.XN=XN;
for(var prop in _dfc){
if(window.XN[prop]===undefined){
window.XN[prop]=_dfc[prop];
}else{
XN.$extend(window.XN[prop],_dfc[prop]);
}
}
}
isUndefined=XN.isUndefined;
isString=XN.isString;
isElement=XN.isElement;
isFunction=XN.isFunction;
isObject=XN.isObject;
isArray=XN.isArray;
isNumber=XN.isNumber;
$=XN.element.$;
$element=XN.element.$element;
XN.element.findFirstClass=XN.dom.findFirstClass;
extendObject=$extend;
xn_getEl=ge=getEl=$X=$;
$xElement=XN.element.$element;
XN.DEBUG=XN.Debug=XN.debug;
XN.debug.On=XN.debug.on;
XN.debug.Off=XN.debug.off;
XN.namespace("ui");
XN.namespace("util");
XN.namespace("app");
XN.namespace("page");
XN.APP=XN.App=XN.app;
XN.PAGE=XN.Page=XN.page;
XN.CONFIG=XN.Config=XN.config;
XN.ENV=XN.Env=XN.env=XN.env;
XN.ARRAY=XN.Array=XN.array=XN.array;
XN.String=XN.STRING=XN.string=XN.string;
XN.BROWSER=XN.Browser=XN.browser=XN.browser;
XN.COOKIE=XN.Cookie=XN.cookie=XN.cookie;
XN.EVENT=XN.Event=XN.event=XN.event;
XN.DO=XN.Do;
XN.DOM=XN.Dom=XN.dom=XN.dom;
XN.EFFECT=XN.Effect=XN.effect=XN.effect;
XN.ELEMENT=XN.Element=XN.element=XN.element;
XN.FORM=XN.Form=XN.form=XN.form;
XN.FUNC=XN.Func=XN.func=XN.func;
XN.JSON=XN.Json=XN.json=XN.json;
XN.NET=XN.Net=XN.net;
XN.Template=XN.TEMPLATE=XN.template=XN.template;
XN.UI=XN.Ui=XN.ui;
XN.UTIL=XN.Util=XN.util;
XN.ui.DS_JSON=XN.util.DS_JSON=XN.datasource.DS_JSON;
XN.ui.DS_friends=XN.util.DS_friends=XN.datasource.DS_friends;
XN.ui.DS_Array=XN.util.DS_Array=XN.datasource.DS_Array;
XN.ui.DS_XHR=XN.util.DS_XHR=XN.datasource.DS_XHR;
try{
document.domain=String(XN.env.domain);
}
catch(e){
}
if(window.isJSON==null){
window.isJSON=XN.string.isJSON;
}
if(XN.events==null){
XN.timeLog={};
XN.events={};
XN.event.enableCustomEvent(XN.events);
}
});
"abbr article aside audio canvas command details figcaption figure footer header hgroup mark meter nav output progress section summary time video".replace(/\w+/g,function(n){
document.createElement(n);
});
(function(){
function Expressions(){
}
var isIE=!!(window.attachEvent&&!window.opera);
window.Expressions=Expressions;
if(!isIE){
return;
}
Expressions.ie6=(navigator.appVersion.indexOf("MSIE 6.0")!=-1);
Expressions.ie7=(navigator.appVersion.indexOf("MSIE 7.0")!=-1);
Expressions.k=1;
Expressions.timer=function(){
Expressions.k++;
var _e00=document.getElementById("expressionsTimer");
if(_e00){
_e00.innerHTML=Expressions.k;
}
};
Expressions.ele={};
Expressions.pseudo={};
Expressions.selector={};
Expressions.style={};
Expressions.addClass=function(ele,_e02){
ele.className+=" "+_e02;
};
Expressions.removeClass=function(ele,_e04){
ele.className=ele.className.replace(new RegExp("\\b"+_e04+"(\\s+|\\b)","ig"),"");
};
Expressions.hasClass=function(ele,_e06){
return ele.className.match(new RegExp("(\\s|^)"+_e06+"(\\s|$)"));
};
Expressions.getPixelValue=function(ele,_e08){
if(!(/^\d+(px)?$/i).test(_e08)&&(/^\d/).test(_e08)){
var _e09=ele.style.left;
var _e0a=ele.runtimeStyle.left;
ele.runtimeStyle.left=ele.currentStyle.left;
ele.style.left=_e08||0;
_e08=ele.style.pixelLeft;
ele.style.left=_e09;
ele.runtimeStyle.left=_e0a;
return _e08;
}
return parseInt(_e08)||0;
};
Expressions.pseudo.hover=function(ele,_e0c){
if(Expressions.ie7){
return;
}
if(!_e0c){
_e0c="hover";
}
ele.attachEvent("onmouseover",function(){
ele.className+=" "+_e0c;
});
ele.attachEvent("onmouseout",function(){
ele.className=ele.className.replace(new RegExp("\\s"+_e0c,"ig"),"");
});
Expressions.timer();
};
Expressions.pseudo.focus=function(ele,_e0e){
if(!_e0e){
_e0e="focus";
}
ele.attachEvent("onfocus",function(){
ele.className+=" "+_e0e;
});
ele.attachEvent("onblur",function(){
ele.className=ele.className.replace(new RegExp("\\s"+_e0e,"ig"),"");
});
Expressions.timer();
};
Expressions.pseudo.disabled=function(ele,_e10){
if(!_e10){
_e10="disabled";
}
function change(){
if(ele.disabled){
if(!Expressions.hasClass(ele,_e10)){
Expressions.addClass(ele,_e10);
}
}else{
Expressions.removeClass(ele,_e10);
}
}
ele.attachEvent("onpropertychange",change);
change();
Expressions.timer();
};
Expressions.pseudo.enabled=function(ele,_e12){
if(!_e12){
_e12="enabled";
}
function change(){
if(!ele.disabled){
if(!Expressions.hasClass(ele,_e12)){
Expressions.addClass(ele,_e12);
}
}else{
Expressions.removeClass(ele,_e12);
}
}
ele.attachEvent("onpropertychange",change);
change();
Expressions.timer();
};
Expressions.pseudo.before=function(ele,id){
var _e15=document.createElement("before");
ele.insertBefore(_e15,ele.firstChild);
Expressions.timer();
};
Expressions.pseudo.after=function(ele,id){
var _e18=document.createElement("after");
var _e19=setInterval(function(){
try{
ele.appendChild(_e18);
clearInterval(_e19);
}
catch(e){
}
},200);
Expressions.timer();
};
Expressions.style.width=function(ele,_e1b){
if(_e1b>0){
ele.style.width=_e1b+"px";
}
};
Expressions.style.minWidth=function(ele,_e1d){
if(!_e1d.match(/(\d+)px/)){
return;
}
_e1d=parseInt(RegExp.$1);
function checkMinWidth(){
if(!ele.__oldWidth&&document.documentElement.clientWidth<_e1d){
ele.__oldWidth=ele.runtimeStyle.width;
ele.runtimeStyle.width=_e1d+"px";
}else{
if(ele.__oldWidth&&document.documentElement.clientWidth>=_e1d){
ele.__oldWidth=null;
ele.runtimeStyle.width=ele.__oldWidth;
}
}
}
window.attachEvent("onresize",checkMinWidth);
checkMinWidth();
Expressions.timer();
};
Expressions.style.outline=function(ele,_e1f){
if(_e1f=="0 none"){
ele.onfocus=function(){
ele.blur();
};
}
};
Expressions.style.backgroundOrigin=function(ele){
ele.style.backgroundPosition=(ele.offsetWidth-14)+"px center";
Expressions.timer();
};
Expressions.style.boxSizing={};
Expressions.style.boxSizing.borderBox=function(ele,_e22,_e23){
var _e24=function(_e25){
ele.runtimeStyle.width="";
if(!_e25){
_e25=ele.currentStyle["width"];
}
var _e26=(ele.currentStyle["bordeLeftStyle"]=="none"?0:parseInt(ele.currentStyle["borderLeftWidth"]))||0;
var _e27=(ele.currentStyle["bordeRightStyle"]=="none"?0:parseInt(ele.currentStyle["borderRightWidth"]))||0;
var _e28=parseInt(ele.currentStyle["paddingLeft"])||0;
var _e29=parseInt(ele.currentStyle["paddingRight"])||0;
var _e2a=_e26+_e27+_e28+_e29;
var _e2b=(parseInt(ele.parentNode.currentStyle["paddingLeft"])||0)+(parseInt(ele.parentNode.currentStyle["paddingRight"])||0);
_e25=Expressions.getPixelValue(ele,_e25)-_e2b;
ele.runtimeStyle.width=Math.max(0,_e25-_e2a)+"px";
};
var _e2c=function(_e2d){
ele.runtimeStyle.height="";
if(!_e2d){
_e2d=ele.currentStyle["height"];
}
var _e2e=(ele.currentStyle["bordeTopStyle"]=="none"?0:parseInt(ele.currentStyle["borderTopWidth"]))||0;
var _e2f=(ele.currentStyle["bordeBottomStyle"]=="none"?0:parseInt(ele.currentStyle["borderBottomWidth"]))||0;
var _e30=parseInt(ele.currentStyle["paddingTop"])||0;
var _e31=parseInt(ele.currentStyle["paddingBottom"])||0;
var _e32=_e2e+_e2f+_e30+_e31;
var _e33=(parseInt(ele.parentNode.currentStyle["paddingTop"])||0)+(parseInt(ele.parentNode.currentStyle["paddingBottom"])||0);
_e2d=Expressions.getPixelValue(ele,_e2d)-_e33;
ele.runtimeStyle.height=Math.max(0,_e2d-_e32)+"px";
};
_e24(_e22);
_e2c(_e23);
ele.attachEvent("ondetach",function(){
ele.runtimeStyle.width="";
ele.runtimeStyle.height="";
});
ele.attachEvent("onpropertychange",function(){
var pn=event.propertyName;
if(pn==="style.boxSizing"&&ele.style.boxSizing===""){
ele.style.removeAttribute("boxSizing");
ele.runtimeStyle.boxSizing=undefined;
}
switch(pn){
case "style.width":
case "style.borderLeftWidth":
case "style.borderLeftStyle":
case "style.borderRightWidth":
case "style.borderRightStyle":
case "style.paddingLeft":
case "style.paddingRight":
_e24(_e22);
break;
case "style.height":
case "style.borderTopWidth":
case "style.borderTopStyle":
case "style.borderBottomWidth":
case "style.borderBottomStyle":
case "style.paddingTop":
case "style.paddingBottom":
_e2c(_e23);
break;
case "className":
case "style.boxSizing":
_e24(_e22);
_e2c(_e23);
break;
default:
break;
}
});
Expressions.timer();
return;
};
Expressions.style.content=function(ele,_e36){
ele.innerText=_e36;
Expressions.timer();
};
Expressions.style.position={};
Expressions.style.position.fixed=function(ele){
var _e38;
window.attachEvent("onscroll",function(){
var _e39=500;
if(ele.hackStyle&&ele.hackStyle.IE6fixedPositionDelay){
_e39=ele.hackStyle.IE6fixedPositionDelay;
}
ele.runtimeStyle.visibility="hidden";
Expressions.addClass(ele,"IE6_SCROLLING");
clearTimeout(_e38);
_e38=setTimeout(function(){
ele.runtimeStyle.visibility="visible";
Expressions.removeClass(ele,"IE6_SCROLLING");
},_e39);
});
Expressions.timer();
};
Expressions.style.position.fixed.delay=function(ele,_e3b){
if(!ele.hackStyle){
ele.hackStyle={};
}
ele.hackStyle.IE6fixedPositionDelay=_e3b;
Expressions.timer();
};
Expressions.style.fixLineHeight=function(ele){
var _e3d=function(_e3e){
_e3e.runtimeStyle.zoom="1";
var hack=document.createElement("h");
hack.style.zoom="1";
_e3e.insertBefore(hack,_e3e.children[0]);
};
for(var i=0,tags=["IMG","SELECT","INPUT","TEXTAREA"],tag;tag=tags[i];i++){
if(ele.tagName.toUpperCase()==tag){
if(ele.parentNode.currentStyle.lineHeight!="normal"){
_e3d(ele.parentNode);
}
return;
}
}
_e3d(ele);
Expressions.timer();
};
Expressions.selector=function(_e43,_e44){
var eles=Sizzle(_e43);
for(var i=0;i<eles.length;i++){
Expressions.addClass(eles[i],_e44);
}
Expressions.timer();
};
if(isIE){
(function(){
var _e47=setInterval(function(){
try{
document.body.doScroll("left");
clearInterval(_e47);
document.getElementsByTagName("title")[0].innerHTML;
}
catch(e){
}
},20);
})();
}
Expressions.hover=Expressions.pseudo.hover;
Expressions.focus=Expressions.pseudo.focus;
Expressions.after=Expressions.pseudo.after;
Expressions.before=Expressions.pseudo.before;
})();
try{
window.onerror=function(){
if(parseInt(Math.random()*10000,10)!=5000){
return 1;
}
var a=arguments,e=encodeURIComponent,l=location,d=new Date();
if(a.length!=3||a[2]==0){
return 1;
}
new Image().src=["http://s.renren.com/speedstats/jserror/stats.php?message="+e(a[0]),"url="+e(a[1]),"lineNo="+a[2],"location="+e(l),"time="+d.toLocaleTimeString()].join("&");
return 1;
};
}
catch(e){
}
if(!window.console){
window.console={log:function(){
},warn:function(){
},error:function(){
}};
}
window.now=new Date();
XN.dom.ready(function(){
if(XN.config.parentDomain||(!XN.config.jumpOut)){
return;
}
try{
top.location.href.indexOf("x");
}
catch(e){
try{
top.location=self.location;
}
catch(e){
}
}
});
if(XN.browser.Gecko&&XN.string.getQuery("debug_mode")){
XN.debug.on();
}
(function(){
var _e4c=false;
window.load_jebe_ads=function(s,r,_e4f){
if(!s){
return;
}
if(_e4c&&!_e4f){
return;
}
_e4c=true;
XN.dom.ready(function(){
var p=XN.cookie.get("id");
if(!p||XN.string.isBlank(p)){
p="";
}
if(!r){
r=location.href;
}
var src="http://ebp.renren.com/ebpn/show?userid="+encodeURIComponent(p)+"&isvip="+XN.user.isVip+"&hideads="+XN.user.hideAds+(!XN.pageId?"":"&pageType="+XN.pageId)+"&tt="+new Date().getTime();
if(r.match(/http:\/\/www\.renren\.com\/home/ig)){
r="http://www.renren.com/Home.do";
}else{
if(r.match(/http:\/\/(www\.)?renren\.com\/?$/ig)||r.match(/http:\/\/(www\.)?renren\.com\/?SysHome(.do)?\/?/ig)||r.match(/http:\/\/(www\.)?renren.com\/pages\/syshome_newversion.jsp/)||r.match(/http:\/\/(www\.)?renren.com\/pages\/autoLogin-ads.jsp/)){
r="http://www.renren.com/SysHome.do";
if($("ad100000000068")!=null){
src="http://ebp.renren.com/ebpn/show?ref=http://www.renren.com/ad_100000000068";
}else{
if($("ad100000000108")!=null){
src="http://ebp.renren.com/ebpn/show?ref=http://www.renren.com/ad_100000000108";
}else{
src="http://ebp.renren.com/ebpn/show?ref=http://www.renren.com/ad_100000000061";
}
}
}
}
if(XN.app.share&&XN.app.share.pageInfo){
r=r.replace(/\?.*$/,"")+"?shareType="+XN.app.share.pageInfo.type;
}
if(r){
src+="&r="+encodeURIComponent(r);
}
XN.loadFile({file:src,type:"js"},function(){
var _e52="http://s.xnimg.cn/a"+jebe_json.ad_js_version+"/jebe/xn.jebe.js";
XN.loadFile({file:_e52,type:"js"});
});
});
};
})();
XN.USER=XN.user=currentUser={};
XN.USER.me=function(_e53){
};
XN.event.enableCustomEvent(currentUser);
XN.USER.addFriendAction=function(p){
this.config={commentLength:45,needComment:true,requestURI:"http://friend."+XN.env.domain+"/ajax_request_friend.do"};
$extend(this.config,p);
};
XN.user.addFriendAction.prototype={getConfig:function(key){
return this.config[key];
},send:function(id,why,from,code,_e5a){
var code=code!=1?0:1;
var _e5a=_e5a||"";
var This=this;
if(this.getConfig("needComment")){
if(XN.STRING.isBlank(why)){
this.fireEvent("checkError","\u60a8\u8f93\u5165\u7684\u4fe1\u606f\u4e0d\u80fd\u4e3a\u7a7a");
return;
}
}
if(why.length>this.getConfig("commentLength")){
this.fireEvent("checkError","\u60a8\u8f93\u5165\u7684\u4fe1\u606f\u4e0d\u80fd\u8d85\u8fc7"+this.getConfig("commentLength")+"\u4e2a\u5b57\u7b26");
return;
}
var data="id="+id+"&why="+why+"&codeFlag="+code+"&code="+_e5a;
if(this.getConfig("matchmaker")){
data=data+"&matchmaker="+this.getConfig("matchmaker");
}
this.fireEvent("beforePost");
new XN.NET.xmlhttp({url:this.getConfig("requestURI")+"?from="+from,"data":data,onSuccess:function(r){
r=r.responseText;
if(r&&isJSON(r)){
var re=XN.JSON.parse(r);
}else{
This.fireEvent("error");
return;
}
if(re.result=="-1"){
This.fireEvent("flagError");
return;
}
This.fireEvent("success",id,r,from);
if(!window.currentUser){
return;
}
if(currentUser.fireEvent){
currentUser.fireEvent("addFriendSuccess",id,r,from);
}
if(currentUser.onaddFriendSuccess){
currentUser.onaddFriendSuccess(id,r);
}
},onError:function(){
This.fireEvent("error",id,from);
if(!window.currentUser){
return;
}
currentUser.fireEvent("addFriendError",id,r,from);
}});
}};
XN.EVENT.enableCustomEvent(XN.USER.addFriendAction.prototype);
XN.dynamicLoad({file:"http://s.xnimg.cn/jspro/xn.app.addFriend.js",funcs:["showRequestFriendDialog"]});
XN.DOM.readyDo(function(){
if(XN.get_check){
var _e5f=Sizzle("form");
for(var i=0;i<_e5f.length;i++){
try{
var _e61=document.createElement("<input name=\"requestToken\" type=\"hidden\" value=\""+XN.get_check+"\"/>");
}
catch(e){
var _e61=document.createElement("input");
_e61.type="hidden";
_e61.name="requestToken";
_e61.value=XN.get_check;
}
_e5f[i].appendChild(_e61);
try{
_e61=document.createElement("<input name=\"_rtk\" type=\"hidden\" value=\""+XN.get_check_x+"\"/>");
}
catch(e){
_e61=document.createElement("input");
_e61.type="hidden";
_e61.name="_rtk";
_e61.value=XN.get_check_x;
}
_e5f[i].appendChild(_e61);
}
}
});
XN.namespace("widgets");
XN.WIDGETS=XN.Widgets=XN.widgets;
function getImageType(_e62,_e63,_e64,_e65){
var type="";
if(_e62.naturalHeight!=undefined){
if(_e62.naturalHeight*(_e63/_e62.naturalWidth)<=_e64){
type="normal";
}else{
type="too-height";
}
_e65(type);
return;
}
if(XN.browser.IE&&parseInt(_e62.height)==0){
var img=new Image();
img.onload=function(){
if(img.height<=_e64){
type="normal";
}else{
type="too-height";
}
_e65(type);
img.parentNode.removeChild(img);
};
img.width=_e62.getAttribute("width")||_e63;
img.style.cssText="position:absolute;top:-9999em;left:-9999em;";
document.body.appendChild(img);
img.src=_e62.src+"?"+new Date().getTime();
}else{
if(!_e62.getAttribute("width")){
_e62.width=_e63;
}
if(_e62.height<=_e64){
type="normal";
}else{
type="too-height";
}
_e65(type);
}
}
function fixImage(_e68,_e69,_e6a){
_e68.onload=null;
if(XN.browser.IE&&_e68.naturalHeight==undefined){
XN.dom.ready(function(){
getImageType(_e68,_e69,_e6a,function(type){
if(type=="normal"){
return;
}else{
if(type=="too-height"){
clipImage2(_e68,_e69,_e6a,"h");
}
}
});
});
}else{
getImageType(_e68,_e69,_e6a,function(type){
if(type=="normal"){
_e68.width=_e69;
return;
}else{
if(type=="too-height"){
clipImage2(_e68,_e69,_e6a,"h");
}
}
});
}
}
function clipImage2(_e6d,w,h,type){
var _e71=document.createElement("span");
var _e72=document.createElement("i");
_e72.className=_e6d.className;
var _e73=_e6d.parentNode;
if(!_e73){
return;
}
_e71.style.cssText="display:block;zoom:1;overflow:hidden;width:"+w+"px;padding:0;margin:0;background:transparent none;";
var _e74=new Image();
_e74.onload=function(){
_e74.onload=null;
if(type=="h"){
var _e75=_e74.height*(w/_e74.width);
_e74.height=_e75;
_e74.width=w;
if(_e75>h){
_e71.style.height=h+"px";
}
}else{
if(type=="w"){
_e74.width=_e74.width*(h/_e74.height);
_e74.height=h;
}
}
_e74.style.cssText="display:block;margin:0 auto;";
_e71.appendChild(_e74);
_e72.appendChild(_e71);
try{
_e73.replaceChild(_e72,_e6d);
}
catch(e){
if(window.console&&console.log){
console.log(_e6d.src);
}
}
_e72.style.cursor="pointer";
_e73.style.textDecoration="none";
if(XN.browser.IE){
_e73.style.position="relative";
var _e76=$element("div");
_e76.style.cssText="position:absolute;top:0;left:0;cursor:pointer;width:"+_e71.style.width+";height:"+(_e71.style.height?_e71.style.height:h+"px")+";background:url(about:_blank);";
_e73.insertBefore(_e76,_e73.firstChild);
}
};
_e74.src=_e6d.src;
}
function clipImage(_e77){
if(!_e77.getAttribute("width")||!_e77.getAttribute("height")){
return;
}
var _e78=parseInt(_e77.getAttribute("width"));
var _e79=parseInt(_e77.getAttribute("height"));
if(_e77.naturalWidth&&_e77.naturalHeight&&_e77.naturalWidth==_e78&&_e77.naturalHeight==_e79){
return;
}
var _e7a=new Image();
_e7a.onload=function(){
if(_e7a.width==_e78&&_e7a.height==_e79){
return;
}
var _e7b=document.createElement("i");
var _e7c=_e77.parentNode;
if(!_e7c){
return;
}
_e7c.replaceChild(_e7b,_e77);
_e7b.style.width=_e78+"px";
_e7b.style.height=_e79+"px";
if(!XN.browser.IE){
_e7b.style.display="inline-block";
_e7b.appendChild(_e7a);
_e7b.style.overflow="hidden";
if(_e7a.width>_e78){
_e7a.style.marginLeft="-"+parseInt((_e7a.width-_e78)/2)+"px";
}
if(_e7a.height>_e79){
_e7a.style.marginTop="-"+parseInt((_e7a.height-_e79)/2)+"px";
}
}else{
_e7b.style.zoom="1";
var top=parseInt((_e7a.height-_e79)/2);
_e7b.style.background="url("+_e77.src+") no-repeat -"+parseInt((_e7a.width-_e78)/2)+"px -"+(top>0?top:0)+"px";
if(_e7b.parentNode.tagName=="A"){
_e7b.style.cursor="pointer";
}
}
};
_e7a.src=_e77.src;
}
function roundify(_e7e,_e7f){
return;
}
(function(){
var _e80={getPageScroll:function(){
try{
var x,y;
if(window.pageYOffset){
y=window.pageYOffset;
x=window.pageXOffset;
}else{
if(document.documentElement&&document.documentElement.scrollTop){
y=document.documentElement.scrollTop;
x=document.documentElement.scrollLeft;
}else{
if(document.body){
y=document.body.scrollTop;
x=document.body.scrollLeft;
}
}
}
}
catch(e){
}
return {x:x,y:y};
},getWholeHeight:function(){
try{
if(document.documentElement){
return document.documentElement.scrollHeight;
}else{
if(document.body){
return document.body.scrollHeight;
}
}
}
catch(e){
}
},getClientHeight:function(){
if(document.documentElement){
return document.documentElement.clientHeight;
}
}};
var _e83;
var func=function(){
var _e85=_e80.getPageScroll().y+_e80.getClientHeight();
var _e86=_e80.getWholeHeight();
if(!func.loading&&_e85===_e86&&_e83!==_e86){
XN.events.fireEvent("scrollbottom");
}
_e83=_e85;
};
XN.event.addEvent(window,"scroll",func);
})();
XN.app.statsMaster={init:function(){
var j={ID:XN.cookie.get("id"),R:encodeURIComponent(location.href)};
var json=XN.JSON.build(j);
this.listener=function(e){
var e=e||window.event,_X=XN.event.pointerX(e),Y=XN.event.pointerY(e),U,T,el=XN.event.element(e),_e8f=$("dropmenuHolder");
xx=XN.element.realLeft(_e8f);
if(!(el&&el.tagName)){
return;
}
T=el.tagName.toLowerCase();
if(T=="a"){
U=el.href;
}
var _t=el.getAttribute("stats");
if(_t){
T=_t;
}
j.X=_X-xx;
j.Y=Y;
if(U){
j.U=encodeURIComponent(U);
}
if(T){
j.T=T;
}
json=XN.JSON.build(j);
new Image().src="http://dj."+XN.env.domain+"/click?J="+json+"&t="+Math.random();
};
XN.event.addEvent(document,"mousedown",this.listener);
if(!window.statisFocusEventAdded){
XN.event.addEvent(window,"focus",function(){
new Image().src="http://dj."+XN.env.domain+"/focus?J="+json+"&t="+Math.random();
});
window.statisFocusEventAdded=true;
}
if(!window.statisBlurEventAdded){
XN.event.addEvent(window,"blur",function(){
new Image().src="http://dj."+XN.env.domain+"/unfocus?J="+json+"&t="+Math.random();
});
window.statisBlurEventAdded=true;
}
if(!window.statisBottomEventAdded){
XN.events.addEvent("scrollbottom",function(){
new Image().src="http://dj."+XN.env.domain+"/scrollbottom?J="+json+"&t="+Math.random();
});
window.statisBottomEventAdded=true;
}
},destroy:function(){
XN.event.delEvent(document,"mousedown",this.listener);
}};
XN.dom.ready(function(){
XN.app.statsMaster.init();
});
XN.dom.ready(function(){
var _e91=false;
var _e92=true;
XN.event.addEvent(document,"mousedown",function(){
_e92=false;
});
XN.event.addEvent(window,"blur",function(){
_e92=true;
});
showConfirmDialog=function(){
var d=XN.DO.alert({title:"\u8bf7\u9886\u53d6\u60a8\u7684"+XN.env.siteName+"\u901a\u884c\u8bc1",modal:true,message:"<iframe id=\"frameactive\" width=\"410\" height=\"100%\" frameborder=\"no\" scrolling=\"no\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\" src=\"about:blank\" ></iframe>",width:454,params:{showCloseButton:true},callBack:function(){
_e91=false;
showConfirmDialog.fireEvent("close");
}});
arguments.callee.dialog=d;
d.footer.hide();
$("frameactive").src="http://channel."+XN.env.domain+"/confirm/show";
$("frameactive").contentWindow.location.href="http://channel."+XN.env.domain+"/confirm/show";
$("frameactive").addEvent("load",function(){
d.refresh();
});
};
XN.event.enableCustomEvent(showConfirmDialog);
if(!XN.cookie.get("noconfirm")){
return;
}
var _e94=setInterval(function(){
if(_e92||window.noConfirmWindow||_e91||!XN.cookie.get("noconfirm")){
return;
}
_e91=true;
XN.cookie.del("noconfirm","/",XN.env.domain);
XN.cookie.del("noconfirm","/",window.location.hostname);
showConfirmDialog();
},1000);
XN.log("\u672a\u6fc0\u6d3b\u7528\u6237\u5f15\u5bfc\u521d\u59cb\u5316over");
});
object.use("dom, ua",function(dom,ua){
dom.wrap(window);
dom.wrap(document);
dom.ready(function(){
document.delegate("a","click",function(e){
if(e.button==2){
return;
}
var href=e.target.getAttribute("href"),len;
if(!href){
return;
}
len=href.length;
if(href=="#nogo"){
e.preventDefault();
return;
}
if(len>4&&href.slice(-5)=="#nogo"){
e.preventDefault();
}
});
});
});
(function(){
var _e9a=0;
var _e9b=false;
var _e9c=0;
var _e9d="l4pager";
var _e9e=null;
if(XN.browser.IE6||window.location.host=="apps.renren.com"){
_e9b=true;
}
this.checkExpand=function(){
var cw,ch;
if(document.documentElement){
ch=document.documentElement.clientHeight;
cw=document.documentElement.clientWidth;
}
return {width:cw,height:ch,full:(cw>=1240)&&!_e9b,layout:_e9a,loading:_e9e};
};
var htag,i=0;
while(htag=document.childNodes[i]){
if(htag.tagName&&htag.tagName.toLowerCase()=="html"){
break;
}
i++;
}
this.frameLayout=function(i){
if(i==1){
htag.className=(htag.className||"")+" marginRightForPager";
}else{
if(i==0){
htag.className=htag.className.replace("marginRightForPager","");
}else{
return _e9a;
}
}
_e9a=i;
window.fireEvent("changeLayout",{layout:i});
};
this.saveStat=function(s){
var v=s?1:0;
XN.cookie.set(_e9d,v,365,"/","renren.com");
};
this.readStat=function(){
return _e9c;
};
this.noLoading=function(){
if(_e9e&&_e9e.parentNode){
document.body.removeChild(_e9e);
}
_e9e=null;
};
_e9c=XN.cookie.get(_e9d)=="1"?1:0;
if(_e9c&&this.checkExpand().full){
this.frameLayout(1);
XN.dom.ready(function(){
_e9e=document.createElement("div");
_e9e.id="wp-buddylist-placeholder";
document.body.appendChild(_e9e);
});
}
XN.smartyBuddy=this;
})();
(function(){
if(window.webpager&&window.webpager.addEvent){
return;
}
var _ea6=[];
window.webpager={addEvent:function(){
_ea6.push(XN.array.build(arguments));
}};
window.addEvent("webpagerReady",function(){
var _ea7;
while(_ea7=_ea6.shift()){
window.webpager.addEvent.apply(window.webpager,_ea7);
}
});
})();
object.use("dom",function(dom){
function initWebpager(){
var _ea9,_eaa,_eab="imengine",_eac;
if(dom.id("bottombar")==null){
return;
}
if(/\((iPhone|iPad|iPod)/i.test(navigator.userAgent)||(!window.ActiveXObject&&!window.XMLHttpRequest)){
return;
}
if(dom.id(_eab)!=null){
return;
}
if(XN.disableWebpager){
return;
}
_eac="http://wpi.renren.com/wtalk/ime.htm?v=5";
function makeImEngineIframe(){
if(dom.id(_eab)!=null){
return;
}
var _ead=document.createElement("iframe");
_ead.setAttribute("id",_eab);
_ead.setAttribute("name",_eab);
_ead.setAttribute("src",_eac);
_ead.setAttribute("frameBorder","0");
_ead.style.cssText="position:absolute;left:-1000pt;top:20pt;width:200pt;height:100pt";
document.body.appendChild(_ead);
if(_eaa){
clearTimeout(_eaa);
_eaa=null;
}
}
_ea9=(XN.browser.IE?6:3)*1000;
_eaa=null;
dom.wrap(window).addEvent("load",function(){
if(_eaa!=null){
clearTimeout(_eaa);
_eaa=null;
makeImEngineIframe();
}
});
_eaa=setTimeout(makeImEngineIframe,_ea9);
}
dom.ready(initWebpager);
});
object.use("dom",function(dom){
function initGoBackTo(){
var bt=$("toolBackTo");
if(!bt){
return;
}
dom.wrap(window);
var hl=XN.browser.WebKit?(Sizzle("body")[0]):(Sizzle("html")[0]),_eb1=window.innerWidth||document.body.clientWidth,nav=Sizzle(".navigation")[0];
if(_eb1>=1120){
bt.style.left=XN.element.getPosition(nav).left+990+"px";
}else{
bt.style.right="10px";
}
window.addEvent("changeLayout",function(e){
if(e.layout){
bt.style.left="";
bt.style.right="210px";
}else{
_eb1=window.innerWidth||document.body.clientWidth;
if(_eb1>=1120){
bt.style.right="";
bt.style.left=XN.element.getPosition(nav).left+990+"px";
}else{
bt.style.left="";
bt.style.right="10px";
}
}
});
window.addEvent("scroll",function(e){
bt.style.display=hl.scrollTop>30?"":"none";
});
window.addEvent("resize",function(e){
if(XN.smartyBuddy&&XN.smartyBuddy.frameLayout()){
bt.style.right="210px";
bt.style.left="";
}else{
_eb1=window.innerWidth||document.body.clientWidth;
if(_eb1>=1120){
setTimeout(function(){
bt.style.right="";
bt.style.left=XN.element.getPosition(nav).left+990+"px";
},0);
}else{
bt.style.left="";
bt.style.right="10px";
}
}
});
}
dom.ready(initGoBackTo);
});
function backToTop(){
var fix=Sizzle("#sidebar2 .ready-to-fix")[0];
if(fix){
fix.style.position="static";
}
window.scrollTo(0,0);
if(fix){
fix.style.position="";
}
return false;
}
XN.dom.ready(function(){
var back=Sizzle(".backtotop")[0];
if(back){
back.onclick=backToTop;
}
});
(function(){
XN.ui.positionFixedElement=function(_eb8){
this.config={ele:null,holder:"dropmenuHolder",alignWith:null,alignType:"4-1",x:0,y:0};
XN.$extend(this.config,_eb8);
this.init();
return this;
};
var dist="-9999px",unit="px",rl="realLeft",rt="realTop",ow="offsetWidth",oh="offsetHeight",ie6=XN.browser.IE6;
XN.ui.positionFixedElement.prototype={ele:null,holder:null,alignWith:null,alignType:null,x:0,y:0,init:function(){
this.ele=$(this.config.ele);
this.holder=$(this.config.holder);
this.alignWith=$(this.config.alignWith);
this.alignType=this.config.alignType;
this.x=this.config.x;
this.y=this.config.y;
this.ele.style.position=ie6?"absolute":"fixed";
this.ele.style.left=dist;
this.ele.style.top=dist;
this.holder.appendChild(this.ele);
var This=this;
XN.event.addEvent(window,"resize",function(){
This.refresh();
});
if(ie6){
XN.event.addEvent(window,"scroll",function(){
This.refresh();
});
}
},methods:{"1-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+unit;
},"1-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)-f[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+unit;
},"1-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)-f[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)-f[oh]+unit;
},"1-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)-f[oh]+unit;
},"2-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+el[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+unit;
},"2-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+el[ow]-f[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+unit;
},"2-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+el[ow]-f[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)-f[oh]+unit;
},"2-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+el[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)-f[oh]+unit;
},"3-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+el[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+el[oh]+unit;
},"3-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+el[ow]-f[ow]+unit;
f.style.top=y+el[rt]()+el[oh]+unit;
},"3-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+el[ow]-f[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+el[oh]-f[oh]+unit;
},"3-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+el[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+el[oh]-f[oh]+unit;
},"4-1":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+el[oh]+unit;
},"4-2":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)-f[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+el[oh]+unit;
},"4-3":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)-f[ow]+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+el[oh]-f[oh]+unit;
},"4-4":function(f,el,x,y,p){
f.style.left=x+el[rl]()-(ie6?p[rl]():0)+unit;
f.style.top=y+el[rt]()-(ie6?p[rt]():0)+el[oh]-f[oh]+unit;
}},show:function(){
if(this._isShow){
return;
}
this._isShow=true;
this.methods[this.alignType](this.ele,this.alignWith,this.x,this.y,this.holder);
},hide:function(){
if(!this._isShow){
return;
}
this._isShow=false;
this.ele.style.top=dist;
this.ele.style.left=dist;
},refresh:function(){
if(this._isShow){
this._isShow=false;
this.show();
}
}};
})();
XN.dom.ready(function(){
if(!$("moreWeb")){
return;
}
new XN.UI.menu({bar:"moreWeb",menu:"moredownWeb",fireOn:"click",alignType:"3-2",offsetX:1});
});
object.define("xn/site-nav/drop-menu-seed","dom",function(_f11,_f12,_f13){
var dom=_f11("dom");
dom.ready(function(){
var btn=dom.id("profileMenuActive"),_f16=dom.id("showAppMenu");
if(btn){
btn.addEvent("mouseover",function(){
btn.removeEvent("mouseover",arguments.callee);
btn.topNavhovered=true;
btn.addEvent("mouseout",function(){
btn.topNavhovered=false;
btn.removeEvent("mouseout",arguments.callee);
});
_f11.async("xn/site-nav/drop-menu-profile",function(dmp){
dmp.init();
});
});
}
if(_f16){
_f16.addEvent("mouseover",function(){
_f16.removeEvent("mouseover",arguments.callee);
_f16.topNavhovered=true;
_f16.addEvent("mouseout",function(){
_f16.topNavhovered=false;
_f16.removeEvent("mouseout",arguments.callee);
});
_f11.async("xn/site-nav/drop-menu-app",function(dma){
dma.init();
});
});
}
});
});
object.execute("xn/site-nav/drop-menu-seed");
object.use("dom, events",function(dom,_f1a){
var _f1b="v6_header_notify",_f1c=["remind","apply","notice"];
function getTypeId(type){
switch(type){
case "remind":
return 0;
break;
case "apply":
return 1;
break;
case "notice":
return 2;
break;
}
}
var _f1e={setNum:function(i,num){
var _f21=this,_f22=$("navMessage").getElementsByTagName("span");
num=num>=100?"99":num;
if(!dom.getElement("i",_f22[i])){
var el=document.createElement("i");
el.style.display="none";
el.innerHTML="<u><b>&nbsp;</b><var>0</var></u><em>&nbsp;</em>";
_f22[i].appendChild(el);
}
_f22[i].getElementsByTagName("var")[0].innerHTML=num;
if(parseInt(num,10)>0&&!XN.element.hasClassName(_f22[i],"click")){
var cur=_f22[i].getElementsByTagName("i")[0];
if(!XN.element.visible(cur)){
cur.style.display="block";
_f21.show(i);
}
}else{
_f22[i].getElementsByTagName("i")[0].style.display="none";
}
},set:function(type,num){
var id=getTypeId(type);
this.setNum(id,num);
},show:function(i){
var time,_f2a=this,tab=$("navMessage").getElementsByTagName("span")[i],obj=dom.getElement("i",tab);
setTimeout(function(){
obj.addClass("t");
},0);
},setUI:function(data){
var k=parseInt(XN.user.id/100);
if(!XN.browser.IE6&&k%100==37&&XN.user.id==453284264&&XN.user.id==453310720&&XN.user.id==453314358&&XN.user.id==453328334&&XN.user.id==453340647&&XN.user.id==261431700&&XN.user.id==200839153&&XN.user.id==6290&&XN.user.id==473295628){
}else{
this.set("remind",parseInt(data.remind,10));
}
this.set("apply",parseInt(data.apply,10));
this.set("notice",parseInt(data.notice,10));
},reset:function(type){
var id=getTypeId(type);
this.setNum(id,0);
if(!window.webpager){
return;
}
var s=XN.json.parse(webpager.getItem(_f1b));
if(s){
s[type]=0;
}
webpager.setItem(_f1b,JSON.stringify(s));
},get:function(){
new XN.net.xmlhttp({url:"http://notify.renren.com/rmessage/getunreadcount",data:"",method:"get",onSuccess:function(r){
var res=XN.json.parse(r.responseText);
res.t=XN.cookie.get("t");
XN.cookie.del("first_login_flag","/","renren.com","false");
webpager.setItem(_f1b,JSON.stringify(res));
if(typeof (isHome)=="boolean"){
isHome=null;
}
},onError:function(){
XN.DO.showError("\u7f51\u7edc\u901a\u4fe1\u5931\u8d25,\u8bf7\u91cd\u8bd5");
}});
}};
var _f34={mouseover:function(item,i){
var flag=dom.getElement("i",item),type=_f1c[i];
if(flag&&XN.element.visible(flag)){
XN.element.addClass(item,"hover");
}else{
XN.element.addClass(item,"on");
}
XN.element.addClass(item,type+"-hover");
},mouseout:function(item,i){
var type=_f1c[i];
XN.element.delClass(item,"on");
XN.element.delClass(item,"hover");
XN.element.delClass(item,type+"-hover");
},click:function(item,i){
var type=_f1c[i];
XN.loadFile("http://s.xnimg.cn/n/core/js/message-center-all.js",function(){
MessageCenter.bubble=_f1e;
if(XN.element.hasClassName(item,"click")){
XN.element.delClass(item,"click");
$("showMessage").style.display="none";
MessageCenter.setDefault();
return;
}
MessageCenter.setDefault();
XN.element.addClass(item,"click");
MessageCenter.setIframePosition(item);
MessageCenter.init(type,_f1e);
XN.element.addClass(item,type+"-click");
_f1e.reset(type);
});
}};
function bindEvent(){
Sizzle("#navMessage span").forEach(function(item,i){
XN.event.addEvent(item,"click",function(e){
_f34.click(item,i);
e.stopPropagation();
});
XN.event.addEvent(item,"mouseover",function(){
_f34.mouseover(item,i);
});
XN.event.addEvent(item,"mouseout",function(){
_f34.mouseout(item,i);
});
});
}
dom.ready(function(){
bindEvent();
dom.wrap(window);
dom.wrap(document);
var _f42,_f43=(XN.browser.IE?4:2)*1000;
function getBubbleInfo(){
_f42=setTimeout(function(){
if(_f42){
clearTimeout(_f42);
_f42=null;
}
_f1e.get();
},_f43);
}
window.addEvent("webpagerReady",function(e){
var _f45,s=webpager.getItem(_f1b),_f47=XN.cookie.get("first_login_flag");
var ts=["","remind","apply","notice"];
if(window.asyncHTMLManager){
window.asyncHTMLManager.addEvent("load",function(){
if(typeof (isHome)=="boolean"){
getBubbleInfo();
}
});
}
if(s){
s=JSON.parse(s);
if(!_f47){
_f45=s;
}
}
if(!_f45||typeof (isHome)=="boolean"){
getBubbleInfo();
}else{
_f1e.setUI(s);
}
webpager.addEvent("storage",function(e){
if(/v6_header_notify/.test(e.keys)){
var s=webpager.getItem(_f1b);
s=JSON.parse(s);
_f1e.setUI(s);
}
});
window.webpager.messager.addEvent("message",function(e){
if(e.service=="notify"&&e.source=="webpager"){
var msg=e.data;
setTimeout(function(){
if(webpager.isLocalConnect()){
window.imengine.imHelper.playSound();
}
var s=JSON.parse(webpager.getItem(_f1b));
s[ts[msg.bigtype]]++;
webpager.setItem(_f1b,JSON.stringify(s));
},1000*Math.random());
}
});
});
});
});
object.define("xn/site-nav/switch-account-seed",function(_f4e,_f4f,_f50){
window.__logEvents=false;
_f4e.async("xn/site-nav/switch-account",function(sa){
sa.accMenu.show();
sa.fetch();
window.__logEvents=true;
});
});
XN.dom.ready(function(){
var m=$("accountMenu");
if(!m){
return;
}
m.addEvent("mouseover",function(){
m.delEvent("mouseover",arguments.callee);
object.execute("xn/site-nav/switch-account-seed");
});
});
object.define("xn/site-nav/search-seed",function(_f53,_f54,_f55){
window.__logEvents=false;
_f53.async("xn/site-nav/search",function(){
var _f56=$("navSearchInput");
_f56.blur();
_f56.focus();
window.__logEvents=true;
});
});
XN.dom.ready(function(){
var _f57=$("navSearchInput"),sb=$("searchBtnAC");
if(!_f57||!sb){
return;
}
if(window.asyncHTMLManager){
sb.addEvent=function(type,_f5a,_f5b){
window.asyncHTMLManager.dom.Element.prototype.addEvent.call(sb,type,_f5a,_f5b);
};
}
if(_f57.value==""){
_f57.value=="\u627e\u4eba\u3001\u89c6\u9891\u3001\u65e5\u5fd7\u3001\u7167\u7247";
_f57.setAttribute("defaultval","\u627e\u4eba\u3001\u89c6\u9891\u3001\u65e5\u5fd7\u3001\u7167\u7247");
}
window.g_searchFromHead=function(){
var val=_f57.value;
if(val==="\u627e\u4eba\u3001\u89c6\u9891\u3001\u65e5\u5fd7\u3001\u7167\u7247"||XN.string.trim(val)===""){
val="";
}
window.location.href="http://browse.renren.com/s/all?from=opensearch&q="+encodeURIComponent(val);
};
sb.addEvent("click",function(e){
if(XN.browser.IE6){
setTimeout(function(){
window.g_searchFromHead();
},1);
}else{
window.g_searchFromHead();
}
});
_f57.addEvent("focus",function(){
var val=_f57.value;
defaultVal=_f57.getAttribute("defaultval");
if(XN.string.trim(val)===XN.string.trim(defaultVal)){
_f57.value="";
_f57.style.color="#000";
_f57.style.backgroundColor="#fff";
sb.style.backgroundColor="#fff";
}
if(!_f57.hack4guide){
object.execute("xn/site-nav/search-seed");
if(XN.user.id){
var url="http://search.renren.com/LogSystem/cache?userid="+XN.user.id+"&from=2"+"&t="+Math.random();
new Image().src=url;
}
}
_f57.hack4guide=true;
});
_f57.addEvent("blur",function(){
var val=_f57.value,_f61=_f57.getAttribute("defaultval");
if(XN.string.trim(val)===""){
_f57.value=_f61;
_f57.style.color="#999";
_f57.style.backgroundColor="#edf3f9";
sb.style.backgroundColor="#edf3f9";
}
});
});
XN.photoSeedHandler=(function(){
function photoSeedHandler(json){
var list,i,len,item;
try{
XN.getFileVersion(json.version);
}
catch(e){
}
for(list=json.preLoad,i=0,len=list.length;i<len;i+=1){
try{
if(list[i].path()){
item=new Image();
item.src=list[i].src;
}
}
catch(e){
}
}
for(list=json.exec,i=0,len=list.length;i<len;i+=1){
try{
if(list[i].path()){
XN.loadFile(list[i].src);
}
}
catch(e){
}
}
}
XN.dom.ready(function(){
var psrc="http://s.xnimg.cn/n/apps/photo/modules/seed/photoSeed.js?r="+(+new Date());
if(window.photoSeedSrc){
psrc=window.photoSeedSrc;
}
var _f68=document.createElement("script");
_f68.type="text/javascript";
_f68.async=true;
_f68.src=psrc;
document.getElementsByTagName("head")[0].appendChild(_f68);
});
return photoSeedHandler;
})();
object.add("xn","./net",function(_f69){
});
object.define("xn.net","sys, net",function(_f6a,_f6b){
var sys=_f6a("sys");
var net=_f6a("net");
var _f6e=net.Request.prototype.send;
net.Request.set("send",function(self,data){
data=data||self.data||"";
if(self.method=="post"&&XN.get_check&&!/[\?|\&]requestToken=/.test(data)){
data+=(data?"&":"")+"requestToken="+XN.get_check;
}
if(self.method=="post"&&XN.get_check_x&&!/[\?|\&]_rtk=/.test(data)){
data+=(data?"&":"")+"_rtk="+XN.get_check_x;
}
_f6e.call(self,data);
});
this.Request=net.Request;
});
(function(){
function shareDelegate(e){
var _f72=$(XN.event.element(e||window.event));
if(!_f72){
return false;
}
if(!_f72.hasClassName("share_new")){
return false;
}
if(!window.XNShareObject){
setTimeout(function(){
XN.loadFile("http://s.xnimg.cn/jspro/xn.app.share.js",function(){
XN.event.delEvent(document,"mouseover",shareDelegate);
XNShareObject._register({autoRegister:false,floatMode:true});
XNShareObject.forceShowFloat(_f72);
});
},0);
}
}
XN.event.addEvent(document,"mouseover",shareDelegate);
})();
object.define("xn.mention","dom",function(_f73,_f74,_f75){
var dom=_f73("dom");
var _f77=this.initMain=function(obj,item,cb){
if(obj.mentionInited){
return;
}
obj.mentionInited=true;
_f73.async("xn/mentionMain",function(_f7b){
_f7b.Mention.init({obj:item.obj,ugcId:item.ugcId||"",ugcType:item.ugcType||"",ownerId:item.ownerId||"",scrollable:item.scrollable,popTop:item.popTop,whisper:(item.whisper===false?false:true),button:item.button||null,limit:item.limit||10,recentLimit:item.recentLimit||6});
if(cb){
cb();
}
});
};
var _f7c=function(obj,e){
if(e){
XN.event.stop(e);
}
dom.wrap(obj);
if(XN.browser.WebKit){
obj.focus();
obj.blur();
}
obj.focusToPosition(obj.get("selectionStart"));
var _f7f=function(){
var _f80="@",_f81=XN.form.help(obj).getRealValue();
var cpos=obj.get("selectionStart");
if(_f81.slice(cpos-1,cpos)=="@"){
_f80="";
}
obj.value=_f81.slice(0,cpos)+_f80+_f81.slice(cpos);
obj.focusToPosition(cpos+_f80.length);
obj.mention.check();
};
if(XN.browser.IE){
setTimeout(_f7f,0);
}else{
_f7f();
}
};
function addMentionFor(item){
var obj=item.obj;
if(obj.mention){
return;
}
obj=$(obj);
obj.addEvent("focus",function(){
_f77(obj,item,function(){
if(item.initCallback){
item.initCallback(obj);
}
});
});
if(item.button){
XN.event.addEvent(item.button,"click",function(e){
if(obj.mention){
_f7c(obj,e);
}else{
_f77(obj,item,function(){
_f7c(obj,e);
if(item.initCallback){
item.initCallback(obj);
}
});
}
});
}
}
this.Mention={init:function(list){
if(isArray(list)){
for(var i=0,l=list.length;i<l;i++){
addMentionFor(list[i]);
}
}else{
if(isObject(list)){
addMentionFor(list);
}
}
}};
});
object.use("xn.mention",function(xn){
window.Mention=xn.mention.Mention;
});
XN.dom.ready(function(){
if(showNamecardCondition()){
object.use("xn/namecard/seed",function(seed){
seed.loadNamecardMatrix();
});
}
});
function showNamecardCondition(){
if(XN.user&&XN.user.id){
return true;
}else{
return false;
}
}
object.define("xn/namecard/seed","dom",function(_f8b,_f8c){
_f8c.loadNamecardMatrix=function(){
var dom=_f8b("dom");
window.globalNamecard={"additionalY":0,"delRcd":false};
window.globalNamecard.addFriendCallback=function(_f8e){
if(!window.globalNamecard.delRcd){
return;
}
var id=window.globalNamecard.delRcd.id.substring(16),type=window.globalNamecard.delRcd.getAttribute("data-type");
if(!_f8e){
logRcd({action:"RecFcard_addFriendEnd",guest_id:id,type:type});
window.globalNamecard.delRcd.parentNode.removeChild(window.globalNamecard.delRcd);
}else{
logRcd({action:"RecFcard_addFriend",guest_id:id,type:type});
}
};
dom.wrap(document.body).delegate("*[namecard]","mouseover",function(){
dom.wrap(document.body).undelegate("*[namecard]","mouseover",arguments.callee);
_f8b.async("xn/namecard, xn/showShareFriend",function(_f91){
window.globalNamecard.namecard=new _f91.Namecard(window.globalNamecard.additionalY);
});
});
};
});
