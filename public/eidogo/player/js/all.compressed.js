Array.prototype.contains=function(_1){
if(Array.prototype.indexOf){
return this.indexOf(_1)!=-1;
}
for(var i in this){
if(this[i]==_1){
return true;
}
}
return false;
};
Array.prototype.setLength=function(_3,_4){
_4=typeof _4!="undefined"?_4:null;
for(var i=0;i<_3;i++){
this[i]=_4;
}
return this;
};
Array.prototype.addDimension=function(_6,_7){
_7=typeof _7!="undefined"?_7:null;
var _8=this.length;
for(var i=0;i<_8;i++){
this[i]=[].setLength(_6,_7);
}
return this;
};
Array.prototype.first=function(){
return this[0];
};
Array.prototype.last=function(){
return this[this.length-1];
};
Array.prototype.copy=function(){
var _a=[];
var _b=this.length;
for(var i=0;i<_b;i++){
if(this[i] instanceof Array){
_a[i]=this[i].copy();
}else{
_a[i]=this[i];
}
}
return _a;
};
if(!Array.prototype.map){
Array.prototype.map=function(_d){
var _e=this.length;
if(typeof _d!="function"){
throw new TypeError();
}
var _f=new Array(_e);
var _10=arguments[1];
for(var i=0;i<_e;i++){
if(i in this){
_f[i]=_d.call(_10,this[i],i,this);
}
}
return _f;
};
}
if(!Array.prototype.filter){
Array.prototype.filter=function(fun){
var len=this.length;
if(typeof fun!="function"){
throw new TypeError();
}
var res=new Array();
var _15=arguments[1];
for(var i=0;i<len;i++){
if(i in this){
var val=this[i];
if(fun.call(_15,val,i,this)){
res.push(val);
}
}
}
return res;
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var len=this.length;
if(typeof fun!="function"){
throw new TypeError();
}
var _1a=arguments[1];
for(var i=0;i<len;i++){
if(i in this){
fun.call(_1a,this[i],i,this);
}
}
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var len=this.length;
if(typeof fun!="function"){
throw new TypeError();
}
var _1e=arguments[1];
for(var i=0;i<len;i++){
if(i in this&&!fun.call(_1e,this[i],i,this)){
return false;
}
}
return true;
};
}
if(!Array.prototype.some){
Array.prototype.some=function(fun){
var len=this.length;
if(typeof fun!="function"){
throw new TypeError();
}
var _22=arguments[1];
for(var i=0;i<len;i++){
if(i in this&&fun.call(_22,this[i],i,this)){
return true;
}
}
return false;
};
}
if(!Array.from){
Array.from=function(it){
var arr=[];
for(var i=0;i<it.length;i++){
arr[i]=it[i];
}
return arr;
};
}
Function.prototype.bind=function(_27){
var _28=this;
var _29=Array.from(arguments).slice(1);
return function(){
return _28.apply(_27,_29.concat(Array.from(arguments)));
};
};

eidogo=window.eidogo||{};

(function(){
var ua=navigator.userAgent.toLowerCase();
var _2=(ua.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];
eidogo.browser={ua:ua,ver:_2,ie:/msie/.test(ua)&&!/opera/.test(ua),moz:/mozilla/.test(ua)&&!/(compatible|webkit)/.test(ua),safari3:/webkit/.test(ua)&&parseInt(_2,10)>=420};
eidogo.util={byId:function(id){
return document.getElementById(id);
},makeQueryString:function(_4){
var qs="";
if(_4&&typeof _4=="object"){
var _6=[];
for(var _7 in _4){
if(_4[_7]&&_4[_7].constructor==Array){
for(var i=0;i<_4[_7].length;i++){
_6.push(encodeURIComponent(_7)+"="+encodeURIComponent(_4[_7]));
}
}else{
_6.push(encodeURIComponent(_7)+"="+encodeURIComponent(_4[_7]));
}
}
qs=_6.join("&").replace(/%20/g,"+");
}
return qs;
},ajax:function(_9,_a,_b,_c,_d,_e,_f){
_9=_9.toUpperCase();
var xhr=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
var qs=(_b&&typeof _b=="object"?eidogo.util.makeQueryString(_b):null);
if(qs&&_9=="GET"){
_a+=(_a.match(/\?/)?"&":"?")+qs;
qs=null;
}
xhr.open(_9,_a,true);
if(qs){
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
var _12=false;
var _13=/webkit/.test(navigator.userAgent.toLowerCase());
function httpSuccess(r){
try{
return !r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||_13&&r.status==undefined;
}
catch(e){
}
return false;
}
function handleReadyState(_15){
if(!_12&&xhr&&(xhr.readyState==4||_15=="timeout")){
_12=true;
if(_16){
clearInterval(_16);
_16=null;
}
var _17=_15=="timeout"&&"timeout"||!httpSuccess(xhr)&&"error"||"success";
if(_17=="success"){
_c.call(_e,xhr);
}else{
_d.call(_e);
}
xhr=null;
}
}
var _16=setInterval(handleReadyState,13);
if(_f){
setTimeout(function(){
if(xhr){
xhr.abort();
if(!_12){
handleReadyState("timeout");
}
}
},_f);
}
xhr.send(qs);
return xhr;
},addEventHelper:function(_18,_19,_1a){
if(_18.addEventListener){
_18.addEventListener(_19,_1a,false);
}else{
if(!eidogo.util.addEventId){
eidogo.util.addEventId=1;
}
if(!_1a.$$guid){
_1a.$$guid=eidogo.util.addEventId++;
}
if(!_18.events){
_18.events={};
}
var _1b=_18.events[_19];
if(!_1b){
_1b=_18.events[_19]={};
if(_18["on"+_19]){
_1b[0]=_18["on"+_19];
}
}
_1b[_1a.$$guid]=_1a;
_18["on"+_19]=eidogo.util.handleEvent;
}
},handleEvent:function(_1c){
var _1d=true;
_1c=_1c||((this.ownerDocument||this.document||this).parentWindow||window).event;
var _1e=this.events[_1c.type];
for(var i in _1e){
this.$$handleEvent=_1e[i];
if(this.$$handleEvent(_1c)===false){
_1d=false;
}
}
return _1d;
},addEvent:function(el,_21,_22,arg,_24){
if(!el){
return;
}
if(_24){
_22=_22.bind(arg);
}else{
if(arg){
var _25=_22;
_22=function(e){
_25(e,arg);
};
}
}
eidogo.util.addEventHelper(el,_21,_22);
},onClick:function(el,_28,_29){
eidogo.util.addEvent(el,"click",_28,_29,true);
},getElClickXY:function(e,el,_2c){
var doc=el.ownerDocument;
if(!e.pageX){
e.pageX=e.clientX+(doc.documentElement.scrollLeft||doc.body.scrollLeft);
e.pageY=e.clientY+(doc.documentElement.scrollTop||doc.body.scrollTop);
}
var _2e=eidogo.util.getElXY(el,_2c);
return [e.pageX-_2e[0],e.pageY-_2e[1]];
},stopEvent:function(e){
if(!e){
return;
}
if(e.stopPropagation){
e.stopPropagation();
}else{
e.cancelBubble=true;
}
if(e.preventDefault){
e.preventDefault();
}else{
e.returnValue=false;
}
},getTarget:function(ev){
var t=ev.target||ev.srcElement;
return (t&&t.nodeName&&t.nodeName.toUpperCase()=="#TEXT")?t.parentNode:t;
},addClass:function(el,cls){
if(!cls){
return;
}
var ca=cls.split(/\s+/);
for(var i=0;i<ca.length;i++){
if(!eidogo.util.hasClass(el,ca[i])){
el.className+=(el.className?" ":"")+ca[i];
}
}
},removeClass:function(el,cls){
var ca=el.className.split(/\s+/);
var nc=[];
for(var i=0;i<ca.length;i++){
if(ca[i]!=cls){
nc.push(ca[i]);
}
}
el.className=nc.join(" ");
},hasClass:function(el,cls){
var ca=el.className.split(/\s+/);
for(var i=0;i<ca.length;i++){
if(ca[i]==cls){
return true;
}
}
return false;
},show:function(el,_40){
_40=_40||"block";
if(typeof el=="string"){
el=eidogo.util.byId(el);
}
if(!el){
return;
}
el.style.display=_40;
},hide:function(el){
if(typeof el=="string"){
el=eidogo.util.byId(el);
}
if(!el){
return;
}
el.style.display="none";
},getElXY:function(el,_43){
var _44=el,elX=0,elY=0,_47=el.parentNode,sx=0,sy=0,doc=el.ownerDocument;
if(el.getBoundingClientRect){
var _4b=el.getBoundingClientRect();
elX=_4b.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);
elY=_4b.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);
}else{
while(_44){
elX+=$(_44).offset().left;
elY+=$(_44).offset().top;
_44=_44.offsetParent?_44.offsetParent:null;
}
while(!_43&&_47&&_47.tagName&&!/^body|html$/i.test(_47.tagName)){
sx+=_47.scrollLeft;
sy+=_47.scrollTop;
elX-=_47.scrollLeft;
elY-=_47.scrollTop;
_47=_47.parentNode;
}
}
return [elX,elY,sx,sy];
},getElX:function(el){
return this.getElXY(el)[0];
},getElY:function(el){
return this.getElXY(el)[1];
},addStyleSheet:function(_4e){
if(document.createStyleSheet){
document.createStyleSheet(_4e);
}else{
var _4f=document.createElement("link");
_4f.rel="stylesheet";
_4f.type="text/css";
_4f.href=_4e;
document.getElementsByTagName("head")[0].appendChild(_4f);
}
},getPlayerPath:function(){
var _50=document.getElementsByTagName("script");
var _51;
var _52;
for(var i=0;_52=_50[i];i++){
if(/(all\.compressed\.js|eidogo\.js)/.test(_52.src)){
_51=_52.src.replace(/\/js\/[^\/]+$/,"");
}
}
return _51;
},numProperties:function(obj){
var _55=0;
for(var i in obj){
_55++;
}
return _55;
}};
})();

eidogo=window.eidogo||{};
eidogo.i18n=eidogo.i18n||{"move":"Move","loading":"Loading","passed":"passed","resigned":"resigned","variations":"Variations","no variations":"none","tool":"Tool","view":"Jump to Move","play":"Play","region":"Select Region","add_b":"Black Stone","add_w":"White Stone","edit comment":"Edit Comment","edit game info":"Edit Game Info","done":"Done","triangle":"Triangle","square":"Square","circle":"Circle","x":"X","letter":"Letter","number":"Number","label":"Custom Label","dim":"Dim","clear":"Clear Marker","score":"Score","score est":"Score Estimate","search":"Search","search corner":"Corner Search","search center":"Center Search","region info":"Click and drag to select a region.","two stones":"Please select at least two stones to search for.","two edges":"For corner searches, your selection must touch two adjacent edges of the board.","no search url":"No search URL provided.","close search":"close search","matches found":"matches found.","show games":"Show pro games with this position","save to server":"Save to Server","download sgf":"Download SGF","multi-game sgf":"Multi-game SGF: ","next game":"Next Game","previous game":"Previous Game","end of variation":"End of variation","white":"White","white rank":"White rank","white team":"White team","black":"Black","black rank":"Black rank","black team":"Black team","captures":"captures","time left":"time left","you":"You","game":"Game","handicap":"Handicap","komi":"Komi","result":"Result","date":"Date","info":"Info","place":"Place","event":"Event","round":"Round","overtime":"Overtime","opening":"Openning","ruleset":"Ruleset","annotator":"Annotator","copyright":"Copyright","source":"Source","time limit":"Time limit","transcriber":"Transcriber","created with":"Created with","january":"January","february":"February","march":"March","april":"April","may":"May","june":"June","july":"July","august":"August","september":"September","october":"October","november":"November","december":"December","gw":"Good for White","vgw":"Very good for White","gb":"Good for Black","vgb":"Very good for Black","dm":"Even position","dmj":"Even position (joseki)","uc":"Unclear position","te":"Tesuji","bm":"Bad move","vbm":"Very bad move","do":"Doubtful move","it":"Interesting move","black to play":"Black to play","white to play":"White to play","ho":"Hotspot","confirm delete":"You've removed all properties from this position.\n\nDelete this position and all sub-positions?","position deleted":"Position deleted","dom error":"Error finding DOM container","error retrieving":"There was a problem retrieving the game data.","invalid data":"Received invalid game data","error board":"Error loading board container","unsaved changes":"There are unsaved changes in this game. You must save before you can permalink or download.","bad path":"Don't know how to get to path: ","gnugo thinking":"GNU Go is thinking..."};

eidogo.gameNodeIdCounter=100000;
eidogo.GameNode=function(){
this.init.apply(this,arguments);
};
eidogo.GameNode.prototype={_id:null,_parent:null,_children:null,_preferredChild:null,_externalCommentCount:null,_isoNodes:null,init:function(_1,_2,id){
this.depth={};
this._id=(typeof id!="undefined"?id:eidogo.gameNodeIdCounter++);
this._children=[];
this._preferredChild=0;
this._externalCommentCount=0;
this._isoNodes=[];
this.setParent(_1||null);
if(_2){
this.loadJson(_2);
}
},pushProperty:function(_4,_5){
if(this[_4]){
if(!(this[_4] instanceof Array)){
this[_4]=[this[_4]];
}
if(!this[_4].contains(_5)){
this[_4].push(_5);
}
}else{
this[_4]=_5;
}
},hasPropertyValue:function(_6,_7){
if(!this[_6]){
return false;
}
var _8=(this[_6] instanceof Array?this[_6]:[this[_6]]);
return _8.contains(_7);
},deletePropertyValue:function(_9,_a){
var _b=(_a instanceof RegExp)?function(v){
return _a.test(v);
}:function(v){
return _a==v;
};
var _e=(_9 instanceof Array?_9:[_9]);
for(var i=0;_9=_e[i];i++){
if(this[_9] instanceof Array){
this[_9]=this[_9].filter(function(v){
return !_b(v);
});
if(!this[_9].length){
delete this[_9];
}
}else{
if(_b(this.prop)){
delete this[_9];
}
}
}
},loadJson:function(_11,_12){
var _13=[_11],_14=[this];
var _15,_16;
var i,len;
while(_13.length){
_15=_13.pop();
_16=_14.pop();
_16.loadJsonNode(_15);
len=(_15._children?_15._children.length:0);
for(i=0;i<len;i++){
_13.push(_15._children[i]);
if(!_16._children[i]){
_16._children[i]=new eidogo.GameNode(_16);
}
_14.push(_16._children[i]);
}
}
},loadJsonNode:function(_19){
for(var _1a in _19){
if(_1a=="_id"){
this[_1a]=_19[_1a].toString();
eidogo.gameNodeIdCounter=Math.max(eidogo.gameNodeIdCounter,parseInt(_19[_1a],10));
continue;
}
if(_1a.charAt(0)!="_"){
this[_1a]=_19[_1a];
}
}
if(this.W){
this.color="white";
}else{
if(this.B){
this.color="black";
}
}
if(this.color&&this._parent&&!this._parent.color){
this._parent.color=this.color==="black"?"white":"black";
}
},setParent:function(_1b){
this._parent=_1b;
if(this._parent&&!isNaN(parseFloat(this._parent.depth.x))&&isFinite(this._parent.depth.x)){
this.depth.x=this._parent.depth.x+1;
}
if(this._parent){
this.lookForIsos();
}
},getParent:function(){
return this._parent;
},getChildren:function(){
return this._children;
},appendChild:function(_1c){
_1c.setParent(this);
this._children.push(_1c);
},getProperties:function(){
var _1d={},_1e,_1f,_20,_21;
for(_1e in this){
isPrivate=(_1e.charAt(0)=="_");
_20=(typeof this[_1e]=="string");
_21=(this[_1e] instanceof Array);
if(!isPrivate&&(_20||_21)){
_1d[_1e]=this[_1e];
}
}
return _1d;
},walk:function(fn,_23){
var _24=[this];
var _25;
var i,len;
while(_24.length){
_25=_24.pop();
var _28=fn.call(_23||this,_25);
if(_28===false){
break;
}
len=(_25._children?_25._children.length:0);
for(i=0;i<len;i++){
_24.push(_25._children[i]);
}
}
},walkFirstChildren:function(fn,_2a){
var _2b=[this];
var _2c;
var i,len;
while(_2b.length){
_2c=_2b.pop();
var _2f=fn.call(_2a||this,_2c);
if(_2f===false){
break;
}
len=(_2c._children?_2c._children.length:0);
if(len>0){
_2b.push(_2c._children[0]);
}
}
},walkUp:function(fn){
var _31=this;
var _32=fn.call(_31,_31);
while(_31._parent&&_32){
_31=_31._parent;
var _32=fn.call(_31,_31);
}
},getMove:function(){
if(typeof this.W!="undefined"){
return this.W;
}else{
if(typeof this.B!="undefined"){
return this.B;
}else{
if(typeof this.color!="undefined"){
return "";
}else{
return null;
}
}
}
},emptyPoint:function(_33){
var _34=this.getProperties();
var _35=null;
for(var _36 in _34){
if(_36=="AW"||_36=="AB"||_36=="AE"){
if(!(this[_36] instanceof Array)){
this[_36]=[this[_36]];
}
this[_36]=this[_36].filter(function(val){
if(val==_33){
_35=val;
return false;
}
return true;
});
if(!this[_36].length){
delete this[_36];
}
}else{
if((_36=="B"||_36=="W")&&this[_36]==_33){
_35=this[_36];
delete this[_36];
}
}
}
return _35;
},getPosition:function(){
if(!this._parent){
return null;
}
var _38=this._parent._children;
for(var i=0;i<_38.length;i++){
if(_38[i]._id==this._id){
return i;
}
}
return null;
},toSgf:function(){
var sgf=(this._parent?"(":"");
var _3b=this;
function propsToSgf(_3c){
if(!_3c){
return "";
}
var sgf=";",key,val;
for(key in _3c){
if(_3c[key] instanceof Array){
val=_3c[key].map(function(val){
return val.toString().replace(/\]/g,"\\]");
}).join("][");
}else{
val=_3c[key].toString().replace(/\]/g,"\\]");
}
sgf+=key+"["+val+"]";
}
return sgf;
}
sgf+=propsToSgf(_3b.getProperties());
while(_3b._children.length==1){
_3b=_3b._children[0];
sgf+=propsToSgf(_3b.getProperties());
}
for(var i=0;i<_3b._children.length;i++){
sgf+=_3b._children[i].toSgf();
}
sgf+=(this._parent?")":"");
return sgf;
},getLeafs:function(_42){
var _43=_42||this;
var _44=_43._children;
var _45=[];
for(var i=0,len=_44.length;i<len;i++){
if(_44[i]._children.length===0){
_45.push(_44[i]);
}else{
var _48=this.getLeafs(_44[i]);
_45=_45.concat(_48);
}
}
return _45;
},getOwnColorByChildrens:function(_49){
var _4a=_49||this;
var _4b;
if(!_4a._children||_4a._children.length===0){
_4b="x";
}else{
if(_4a._children[0].W){
return "b";
}else{
if(_4a._children[0].B){
return "w";
}else{
return "x";
}
}
}
},setOffPath:function(_4c){
this.offPath=_4c;
},isOffPath:function(){
return this.offPath;
},hasComments:function(){
return !!this.commentType;
},getPathMoves:function(){
if(this._pathMoves){
return this._pathMoves;
}
var _4d=[];
var cur=new eidogo.GameCursor(this);
_4d.push(cur.node.getMove());
while(cur.previous()){
var _4f=cur.node.getMove();
if(_4f){
_4d.push(_4f);
}
}
this._pathMoves=_4d.reverse();
return this._pathMoves;
},_getColorPathMoves:function(){
if(this._colorPathMoves){
return this._colorPathMoves.slice(0);
}
var _50=[];
var cur=new eidogo.GameCursor(this);
var _52=cur.node.color=="black"?"B":"W";
var _53=cur.node.getMove();
if(_53==null){
return [];
}
_50.push(_52+_53);
while(cur.previous()){
_53=cur.node.getMove();
if(_53){
_52=cur.node.color=="black"?"B":"W";
_50.push(_52+_53);
}
}
this._colorPathMoves=_50.reverse();
return this._colorPathMoves.slice(0);
},getPath:function(){
if(this._path){
return this._path;
}
var _54=new eidogo.GameCursor(this);
this._path=_54.getPath();
return this._path;
},onSamePath:function(_55){
var _56=this.getPathMoves().join("");
var _57=_55.getPathMoves().join("");
return _57.indexOf(_56)===0;
},onFirstVariationPath:function(_58){
var _59=this.getPathMoves().join("");
var _5a=false;
_58.walkFirstChildren(function(_5b){
var _5c=_5b.getPathMoves().join("");
if(_5c===_59){
_5a=true;
return false;
}
return true;
});
return _5a;
},equals:function(_5d){
var _5e=this.getPathMoves().join("");
var _5f=_5d.getPathMoves().join("");
return _5e===_5f;
},increaseExternalCommentCount:function(_60){
this._externalCommentCount+=_60;
},getExternalCommentCount:function(){
return this._externalCommentCount;
},isRoot:function(){
return this._parent&&!this._parent._parent;
},getIsoNodes:function(){
return this._isoNodes;
},_addIsoNode:function(_61){
var _62=_61.getIsoNodes();
for(var i=0,len=_62.length;i<len;i++){
if(_62[i]._id===this._id){
return;
}
}
this._isoNodes.push(_61);
},lookForIsos:function(){
if(!this.color){
return;
}
var _65=new eidogo.GameCursor(this).getGameRoot();
var _66=this._getColorPathMoves().sort();
var _67=_66.length;
var _68=_66.join("");
var _69=this.getMove();
_65.walk($.proxy(function(_6a){
if(_6a._id==this._id){
return true;
}
var _6b=_6a._getColorPathMoves();
if(_6b.length===_67&&_6b.sort().join("")==_68){
this._getColorPathMoves();
this._addIsoNode(_6a);
}
},this));
}};
eidogo.GameCursor=function(){
this.init.apply(this,arguments);
};
eidogo.GameCursor.prototype={init:function(_6c){
this.node=_6c;
},next:function(_6d){
if(!this.hasNext()){
return false;
}
_6d=(typeof _6d=="undefined"||_6d==null?this.node._preferredChild:_6d);
this.node=this.node._children[_6d];
return true;
},previous:function(){
if(!this.hasPrevious()){
return false;
}
this.node=this.node._parent;
return true;
},getNext:function(_6e){
if(!this.hasNext()){
return null;
}
_6e=(typeof _6e=="undefined"||_6e==null?this.node._preferredChild:_6e);
return this.node._children[_6e];
},hasNext:function(_6f){
if(!_6f){
return this.node&&this.node._children.length>0;
}else{
if(this.node&&this.node._children.length>0){
for(var i=0,len=this.node._children.length;i<len;i++){
if(!this.node._children[i].commentType){
return true;
}
}
return false;
}else{
return false;
}
}
},hasPrevious:function(){
return this.node&&this.node._parent&&this.node._parent._parent;
},getNextMoves:function(){
if(!this.hasNext()){
return null;
}
var _72={};
var i,_74;
for(i=0;_74=this.node._children[i];i++){
_72[_74.getMove()]=i;
}
return _72;
},getNextColor:function(){
var _75=this.getColor();
if(_75){
return _75==="W"?"B":"W";
}
return null;
},getNextNodeWithVariations:function(){
var _76=this.node;
while(_76._children.length==1){
_76=_76._children[0];
}
return _76;
},getPath:function(){
var n=this.node,_78=[],mn=0;
while(n&&n._parent&&n._parent._children.length==1&&n._parent._parent){
mn++;
n=n._parent;
}
_78.push(mn);
while(n){
if(n._parent&&(n._parent._children.length>1||!n._parent._parent)){
_78.push(n.getPosition()||0);
}
n=n._parent;
}
return _78.reverse();
},getPathMoves:function(){
var _7a=[];
var cur=new eidogo.GameCursor(this.node);
_7a.push(cur.node.getMove());
while(cur.previous()){
var _7c=cur.node.getMove();
if(_7c){
_7a.push(_7c);
}
}
return _7a.reverse();
},getMoveNumber:function(){
var num=0,_7e=this.node;
while(_7e){
if(_7e.W||_7e.B){
num++;
}
_7e=_7e._parent;
}
return num;
},getColor:function(){
if(this.node.W||this.node.B){
return this.node.W?"W":"B";
}
for(var i=0,_80;_80=this.node._children[i];i++){
if(_80.W||_80.B){
return _80.W?"B":"W";
}
}
if(this.node._parent&&(this.node._parent.W||this.node._parent.B)){
return this.node._parent.W?"B":"W";
}
return null;
},getGameRoot:function(){
if(!this.node){
return null;
}
var cur=new eidogo.GameCursor(this.node);
if(!this.node._parent&&this.node._children.length){
return this.node._children[0];
}
while(cur.previous()){
}
return cur.node;
},lookForIsosFromRoot:function(){
var _82=this.getGameRoot();
_82.walk(function(_83){
_83.lookForIsos();
});
}};

eidogo.SgfParser=function(){
this.init.apply(this,arguments);
};
eidogo.SgfParser.prototype={STONE_ADDED_PROPERTIES:["B","W","AB","AW"],firstNode:null,init:function(_1,_2){
_2=(typeof _2=="function")?_2:null;
this.sgf=_1;
this.index=0;
this.firstNode=true;
this.root={_children:[]};
this.parseTree(this.root);
_2&&_2.call(this);
},parseTree:function(_3){
while(this.index<this.sgf.length){
var c=this.curChar();
this.index++;
switch(c){
case ";":
_3=this.parseNode(_3);
break;
case "(":
this.parseTree(_3);
break;
case ")":
return;
break;
}
}
},parseNode:function(_5){
var _6={_children:[]};
if(_5){
_5._children.push(_6);
}else{
this.root=_6;
}
_6=this.parseProperties(_6);
return _6;
},parseProperties:function(_7){
var _8="";
var _9=[];
var i=0;
var _b=false;
var _c=!this.firstNode;
while(this.index<this.sgf.length){
var c=this.curChar();
if(c==";"||c=="("||c==")"){
if(c==";"&&((this.firstNode&&!_c)||(!this.firstNode&&!_b))){
this.index++;
continue;
}
this.firstNode=false;
break;
}
if(this.curChar()=="["){
if(this.firstNode&&$.inArray(_8,this.STONE_ADDED_PROPERTIES)!==-1){
_c=true;
}
if(_8==="B"||_8=="W"){
_b=true;
}
while(this.curChar()=="["){
this.index++;
_9[i]="";
while(this.curChar()!="]"&&this.index<this.sgf.length){
if(this.curChar()=="\\"){
this.index++;
while(this.curChar()=="\r"||this.curChar()=="\n"){
this.index++;
}
}
_9[i]+=this.curChar();
this.index++;
}
i++;
while(this.curChar()=="]"||this.curChar()=="\n"||this.curChar()=="\r"){
this.index++;
}
}
if(_7[_8]){
if(!(_7[_8] instanceof Array)){
_7[_8]=[_7[_8]];
}
_7[_8]=_7[_8].concat(_9);
}else{
_7[_8]=_9.length>1?_9:_9[0];
}
_8="";
_9=[];
i=0;
continue;
}
if(c!=" "&&c!="\n"&&c!="\r"&&c!="\t"){
_8+=c;
}
this.index++;
}
_7.goproblems={};
if(_7.C){
if(!(_7.C instanceof Array)){
_7.C=[_7.C];
}
for(var i=0,_e=_7.C.length;i<_e;i++){
if(/RIGHT/.test(_7.C[i])){
_7.C[i]=_7.C[i].replace(/RIGHT/,"");
_7.goproblems.right=true;
}
if(/CHOICE/.test(_7.C[i])){
_7.C[i]=_7.C[i].replace(/CHOICE/,"");
_7.goproblems.choice=true;
}
if(/NOTTHIS/.test(_7.C[i])){
_7.C[i]=_7.C[i].replace(/NOTTHIS/,"");
_7.goproblems.notThis=true;
}
if(/FORCE/.test(_7.C[i])){
_7.C[i]=_7.C[i].replace(/FORCE/,"");
_7.goproblems.force=true;
}
_7.C[i]=$.trim(_7.C[i]);
if(!_7.C[i]){
_7.C.splice(i,1);
}
if(_7.C.length===0){
delete _7.C;
}
}
}
return _7;
},curChar:function(){
return this.sgf.charAt(this.index);
}};

eidogo.Board=function(){
this.init.apply(this,arguments);
};
eidogo.Board.prototype={WHITE:1,BLACK:-1,EMPTY:0,cache:null,init:function(_1,_2){
this.boardSize=_2||19;
this.stones=this.makeBoardArray(this.EMPTY);
this.markers=this.makeBoardArray(this.EMPTY);
this.captures={};
this.captures.W=0;
this.captures.B=0;
this.cache=[];
this.renderer=_1||new eidogo.BoardRendererHtml();
this.lastRender={stones:this.makeBoardArray(null),markers:this.makeBoardArray(null)};
},reset:function(){
this.init(this.renderer,this.boardSize);
},clear:function(){
this.clearStones();
this.clearMarkers();
this.clearCaptures();
},clearStones:function(){
for(var i=0;i<this.stones.length;i++){
this.stones[i]=this.EMPTY;
}
},clearMarkers:function(){
for(var i=0;i<this.markers.length;i++){
this.markers[i]=this.EMPTY;
}
},clearCaptures:function(){
this.captures.W=0;
this.captures.B=0;
},makeBoardArray:function(_5){
return [].setLength(this.boardSize*this.boardSize,_5);
},commit:function(){
var _6=true;
var _7=this.cache.last();
if(_7){
_6=(this.captures.W===_7.captures.W&&this.captures.B===_7.captures.B);
for(var i=0,_9=_7.stones.length;i<_9&&_6;i++){
if(this.stones[i]!==_7.stones[i]){
_6=false;
}
}
}else{
_6=false;
}
if(!_6){
this.cache.push({stones:this.stones.concat(),captures:{W:this.captures.W,B:this.captures.B}});
}
},rollback:function(){
if(this.cache.length>2){
var _a=this.cache[this.cache.length-2];
this.stones=_a.stones.concat();
this.captures.W=_a.captures.W;
this.captures.B=_a.captures.B;
}else{
this.clear();
}
},revert:function(_b){
_b=_b||1;
for(var i=0;i<_b;i++){
this.rollback();
this.cache.pop();
}
},addStone:function(pt,_e){
this.stones[pt.y*this.boardSize+pt.x]=_e;
},getStone:function(pt){
return this.stones[pt.y*this.boardSize+pt.x];
},getRegion:function(t,l,w,h){
var _14=[].setLength(w*h,this.EMPTY);
var _15;
for(var y=t;y<t+h;y++){
for(var x=l;x<l+w;x++){
_15=(y-t)*w+(x-l);
_14[_15]=this.getStone({x:x,y:y});
}
}
return _14;
},addMarker:function(pt,_19){
this.markers[pt.y*this.boardSize+pt.x]=_19;
},getMarker:function(pt){
return this.markers[pt.y*this.boardSize+pt.x];
},render:function(_1b){
var _1c=this.makeBoardArray(null);
var _1d=this.makeBoardArray(null);
var _1e,_1f;
var len;
if(!_1b&&this.cache.last()){
var _21=this.cache.last();
len=this.stones.length;
for(var i=0;i<len;i++){
if(_21.stones[i]!=this.lastRender.stones[i]||(_21.stones[i]!=0&&this.markers[i]!=0)){
_1c[i]=_21.stones[i];
}
}
_1d=this.markers;
}else{
_1c=this.stones;
_1d=this.markers;
}
var _23;
for(var x=0;x<this.boardSize;x++){
for(var y=0;y<this.boardSize;y++){
_23=y*this.boardSize+x;
if(_1c[_23]!=null){
if(_1c[_23]==this.EMPTY){
_1e="empty";
}else{
_1e=(_1c[_23]==this.WHITE?"white":"black");
}
this.renderer.renderStone({x:x,y:y},_1e);
this.lastRender.stones[_23]=_1c[_23];
}
if(_1d[_23]!=null){
var _26=(this.lastRender.stones[_23]!=this.EMPTY);
_1e=(_1c[_23]==this.WHITE?"white":"black");
this.renderer.renderMarker({x:x,y:y},_1d[_23],_26,_26?_1e:null);
this.lastRender.markers[_23]=_1d[_23];
}
}
}
}};

eidogo.Rules=function(_1){
this.init(_1);
};
eidogo.Rules.prototype={init:function(_2){
this.board=_2;
this.pendingCaptures=[];
},check:function(pt,_4){
if(this.board.getStone(pt)!=this.board.EMPTY){
return false;
}
return true;
},apply:function(pt,_6){
this.doCaptures(pt,_6);
},doCaptures:function(pt,_8){
var _9=0;
_9+=this.doCapture({x:pt.x-1,y:pt.y},_8);
_9+=this.doCapture({x:pt.x+1,y:pt.y},_8);
_9+=this.doCapture({x:pt.x,y:pt.y-1},_8);
_9+=this.doCapture({x:pt.x,y:pt.y+1},_8);
_9-=this.doCapture(pt,-_8);
if(_9<0){
_8=-_8;
_9=-_9;
}
_8=_8==this.board.WHITE?"W":"B";
this.board.captures[_8]+=_9;
},doCapture:function(pt,_b){
this.pendingCaptures=[];
if(this.findCaptures(pt,_b)){
return 0;
}
var _c=this.pendingCaptures.length;
while(this.pendingCaptures.length){
this.board.addStone(this.pendingCaptures.pop(),this.board.EMPTY);
}
return _c;
},findCaptures:function(pt,_e){
if(typeof pt.x=="undefined"||typeof pt.y=="undefined"||Number.isNaN(pt.x)||Number.isNaN(pt.y)){
console.log("Invalid data fed to Eidogo:",pt,_e);
return false;
}
if(pt.x<0||pt.y<0||pt.x>=this.board.boardSize||pt.y>=this.board.boardSize){
return false;
}
if(this.board.getStone(pt)==_e){
return false;
}
if(this.board.getStone(pt)==this.board.EMPTY){
return true;
}
for(var i=0;i<this.pendingCaptures.length;i++){
if(this.pendingCaptures[i].x==pt.x&&this.pendingCaptures[i].y==pt.y){
return false;
}
}
this.pendingCaptures.push(pt);
if(this.findCaptures({x:pt.x-1,y:pt.y},_e)){
return true;
}
if(this.findCaptures({x:pt.x+1,y:pt.y},_e)){
return true;
}
if(this.findCaptures({x:pt.x,y:pt.y-1},_e)){
return true;
}
if(this.findCaptures({x:pt.x,y:pt.y+1},_e)){
return true;
}
return false;
}};

(function(){
var t=eidogo.i18n,_2=eidogo.util.byId,_3=eidogo.util.ajax,_4=eidogo.util.addEvent,_5=eidogo.util.onClick,_6=eidogo.util.getElClickXY,_7=eidogo.util.stopEvent,_8=eidogo.util.addClass,_9=eidogo.util.removeClass,_a=eidogo.util.show,_b=eidogo.util.hide,_c=eidogo.browser.moz,_d=eidogo.util.getPlayerPath();
eidogo.players=eidogo.players||{};
eidogo.delegate=function(_e,fn){
var _10=eidogo.players[_e];
_10[fn].apply(_10,Array.from(arguments).slice(2));
};
eidogo.Player=function(){
this.init.apply(this,arguments);
};
eidogo.Player.prototype={navTree:null,_targetLeaf:null,init:function(cfg){
cfg=cfg||{};
this.stoneSize=cfg.stoneSize;
this.mode=cfg.mode?cfg.mode:"play";
this.dom={};
this.dom.container=(typeof cfg.container=="string"?_2(cfg.container):cfg.container);
if(!this.dom.container){
alert(t["dom error"]);
return;
}
this.uniq=(new Date()).getTime();
eidogo.players[this.uniq]=this;
this.sgfPath=cfg.sgfPath;
this.searchUrl=cfg.searchUrl;
this.showingSearch=false;
this.saveUrl=cfg.saveUrl;
this.downloadUrl=cfg.downloadUrl;
this.scoreEstUrl=cfg.scoreEstUrl;
this.hooks=cfg.hooks||{};
this.permalinkable=!!this.hooks.setPermalink;
this.propertyHandlers={W:this.playMove,B:this.playMove,KO:this.playMove,MN:this.setMoveNumber,AW:this.addStone,AB:this.addStone,AE:this.addStone,CR:this.addMarker,LB:this.addMarker,TR:this.addMarker,MA:this.addMarker,SQ:this.addMarker,TW:this.addMarker,TB:this.addMarker,DD:this.addMarker,PL:this.setColor,C:this.showComments,N:this.showAnnotation,GB:this.showAnnotation,GW:this.showAnnotation,DM:this.showAnnotation,HO:this.showAnnotation,UC:this.showAnnotation,V:this.showAnnotation,BM:this.showAnnotation,DO:this.showAnnotation,IT:this.showAnnotation,TE:this.showAnnotation,BL:this.showTime,OB:this.showTime,WL:this.showTime,OW:this.showTime};
this.infoLabels={GN:t["game"],PW:t["white"],WR:t["white rank"],WT:t["white team"],PB:t["black"],BR:t["black rank"],BT:t["black team"],HA:t["handicap"],KM:t["komi"],RE:t["result"],DT:t["date"],GC:t["info"],PC:t["place"],EV:t["event"],RO:t["round"],OT:t["overtime"],ON:t["opening"],RU:t["ruleset"],AN:t["annotator"],CP:t["copyright"],SO:t["source"],TM:t["time limit"],US:t["transcriber"],AP:t["created with"]};
this.months=[t["january"],t["february"],t["march"],t["april"],t["may"],t["june"],t["july"],t["august"],t["september"],t["october"],t["november"],t["december"]];
this.theme=cfg.theme;
this.reset(cfg);
this.renderer=cfg.renderer||"raphael";
this.cropParams=null;
this.shrinkToFit=cfg.shrinkToFit;
this.shrinkBoard=cfg.shrinkBoard;
if(this.shrinkToFit||cfg.cropWidth||cfg.cropHeight){
this.cropParams={};
this.cropParams.width=cfg.cropWidth;
this.cropParams.height=cfg.cropHeight;
this.cropParams.left=cfg.cropLeft;
this.cropParams.top=cfg.cropTop;
this.cropParams.padding=cfg.cropPadding||1;
}
this.constructDom();
this.navTree=new eidogo.RaphaelNavTree(this.dom.navTreeContainer,this.cursor,{beforeShowNavTreeCurrent:this.hooks["beforeShowNavTreeCurrent"],onClick:$.proxy(this.onNavTreeClick,this),onTargetLeafChange:$.proxy(this.onTargetLeafChange,this)},{showIsoLines:cfg.showIsoLines});
if(cfg.enableShortcuts){
_4(document,_c?"keypress":"keydown",this.handleKeypress,this,true);
}
_4(document,"mouseup",this.handleDocMouseUp,this,true);
if(cfg.sgf||cfg.sgfUrl||(cfg.sgfPath&&cfg.gameName)){
this.loadSgf(cfg);
}
this.hook("initDone");
},hook:function(_12,_13){
if(_12 in this.hooks){
return this.hooks[_12].bind(this)(_13);
}
},reset:function(cfg){
this.gameName="";
this.collectionRoot=new eidogo.GameNode();
this.cursor=new eidogo.GameCursor();
this.progressiveLoad=cfg.progressiveLoad?true:false;
this.progressiveLoads=null;
this.progressiveUrl=null;
this.progressiveMode=cfg.progressiveLoad&&cfg.progressiveMode||"id";
this.opponentUrl=null;
this.opponentColor=null;
this.opponentLevel=null;
this.board=null;
this.rules=null;
this.currentColor=null;
this.moveNumber=null;
this.totalMoves=null;
this.variations=null;
this.timeB="";
this.timeW="";
this.regionTop=null;
this.regionLeft=null;
this.regionWidth=null;
this.regionHeight=null;
this.regionBegun=null;
this.regionClickSelect=null;
this.mouseDown=null;
this.mouseDownX=null;
this.mouseDownY=null;
this.mouseDownClickX=null;
this.mouseDownClickY=null;
this.labelLastLetter=null;
this.labelLastNumber=null;
this.resetLastLabels();
this.unsavedChanges=false;
if(this.navTree){
this.navTree.updateNavTree();
this.navTree.setCursor(this.cursor);
}
this.searching=false;
this.editingText=false;
this.goingBack=false;
this.problemMode=cfg.problemMode;
this.showProblemComments=cfg.showProblemComments;
this.problemColor=cfg.problemColor;
this.prefs={};
this.prefs.markCurrent=typeof cfg.markCurrent!="undefined"?!!cfg.markCurrent:true;
this.prefs.markNext=typeof cfg.markNext!="undefined"?cfg.markNext:false;
this.prefs.markVariations=typeof cfg.markVariations!="undefined"?!!cfg.markVariations:true;
this.prefs.showGameInfo=!!cfg.showGameInfo;
this.prefs.showPlayerInfo=!!cfg.showPlayerInfo;
this.prefs.showTools=!!cfg.showTools;
this.prefs.showComments=typeof cfg.showComments!="undefined"?!!cfg.showComments:true;
this.prefs.showOptions=!!cfg.showOptions;
this.prefs.showNavTree=!this.progressiveLoad&&typeof cfg.showNavTree!="undefined"?!!cfg.showNavTree:false;
},loadSgf:function(cfg,_16){
cfg=cfg||{};
this.nowLoading();
this.reset(cfg);
this.sgfPath=cfg.sgfPath||this.sgfPath;
this.loadPath=cfg.loadPath&&cfg.loadPath.length>1?cfg.loadPath:[0,0];
this.gameName=cfg.gameName||"";
var _17=false;
if(typeof cfg.sgf=="string"){
var sgf=new eidogo.SgfParser(cfg.sgf);
this.load(sgf.root);
}else{
if(typeof cfg.sgf=="object"){
this.load(cfg.sgf);
}else{
if(cfg.progressiveLoad&&cfg.progressiveUrl){
this.progressiveLoads=0;
this.progressiveUrl=cfg.progressiveUrl;
this.fetchProgressiveData(_16);
_17=true;
}else{
if(typeof cfg.sgfUrl=="string"||this.gameName){
if(!cfg.sgfUrl){
cfg.sgfUrl=this.sgfPath+this.gameName+".sgf";
}
this.remoteLoad(cfg.sgfUrl,null,false,null,_16);
_17=true;
if(cfg.progressiveLoad){
this.progressiveLoads=0;
this.progressiveUrl=cfg.progressiveUrl||cfg.sgfUrl.replace(/\?.+$/,"");
}
}else{
var _19=cfg.boardSize||"19";
var _1a={19:6.5,13:4.5,9:3.5,7:2.5};
var _1b={_children:[{SZ:_19,KM:cfg.komi||_1a[_19]||6.5,_children:[]}]};
if(cfg.opponentUrl){
this.gameName="gnugo";
this.opponentUrl=cfg.opponentUrl;
this.opponentColor=cfg.opponentColor=="B"?cfg.opponentColor:"W";
this.opponentLevel=cfg.opponentLevel||7;
var _1c=_1b._children[0];
_1c.PW=this.opponentColor=="B"?t["you"]:"GNU Go";
_1c.PB=this.opponentColor=="B"?"GNU Go":t["you"];
_1c.HA=parseInt(cfg.handicap,10)||0;
if(_1c.HA){
var _1d={19:[["pd","dp"],["pd","dp","pp"],["pd","dp","pp","dd"],["pd","dp","pp","dd","jj"],["pd","dp","pp","dd","dj","pj"],["pd","dp","pp","dd","dj","pj","jj"],["pd","dp","pp","dd","dj","pj","jd","jp"],["pd","dp","pp","dd","dj","pj","jd","jp","jj"]],13:[["jd","dj"],["jd","dj","jj"],["jd","dj","jj","dd"],["jd","dj","jj","dd","gg"],["jd","dj","jj","dd","dg","jg"],["jd","dj","jj","dd","dg","jg","gg"],["jd","dj","jj","dd","dg","jg","gd","gj"],["jd","dj","jj","dd","dg","jg","gd","gj","gg"]],9:[["cg","gc"],["cg","gc","gg"],["cg","gc","gg","cc"],["cg","gc","gg","cc","ee"],["cg","gc","gg","cc","ce","ge"],["cg","gc","gg","cc","ce","ge","ee"],["cg","gc","gg","cc","ce","ge","ec","eg"],["cg","gc","gg","cc","ce","ge","ec","eg","ee"]]};
_1c.KM=0.5;
if(_1c.HA>1){
_1c.AB=_1d[_19][_1c.HA-2];
}
}
}
this.load(_1b);
}
}
}
}
if(!_17&&typeof _16=="function"){
_16();
}
this.navTree.updateNavTree();
},load:function(_1e,_1f){
var _20=false;
if(!_1f){
_1f=new eidogo.GameNode();
this.collectionRoot=_1f;
}
_1f.depth.x=-1;
_1f.depth.y=-1;
_1f.loadJson(_1e);
this.hook("afterGameParse",{rootNode:_1f});
_1f._cached=true;
this.doneLoading();
this.progressiveLoads--;
if(!_1f._parent){
var _21=this.loadPath.length?parseInt(this.loadPath[0],10):0;
var _22=new eidogo.GameCursor(_1f._children[_21]);
this.problemColor=_22.getNextColor();
this.initGame(_1f._children[_21||0]);
_20=true;
}
if(this.loadPath.length){
this.goTo(this.loadPath,_20);
if(!this.progressiveLoad){
this.loadPath=[0,0];
}
}else{
this.refresh();
}
if(_20&&this.problemMode){
if(!this.problemColor){
this.currentColor=this.problemColor=(this.cursor.getNextColor()||"B");
}else{
this.currentColor=this.problemColor;
}
}
this.cursor.lookForIsosFromRoot();
},remoteLoad:function(url,_24,_25,_26,_27){
_25=_25=="undefined"?true:_25;
_27=(typeof _27=="function")?_27:null;
if(_25){
if(!_24){
this.gameName=url;
}
url=this.sgfPath+url+".sgf";
}
if(_26){
this.loadPath=_26;
}
var _28=function(req){
var _2a=req.responseText.replace(/^( |\t|\r|\n)*/,"");
if(_2a.charAt(0)=="("){
var me=this;
var sgf=new eidogo.SgfParser(_2a,function(){
me.load(this.root,_24);
_27&&_27();
});
}else{
if(_2a.charAt(0)=="{"){
_2a=eval("("+_2a+")");
this.load(_2a,_24);
_27&&_27();
}else{
this.croak(t["invalid data"]);
}
}
};
var _2d=function(req){
this.croak(t["error retrieving"]);
};
_3("get",url,null,_28,_2d,this,30000);
},initGame:function(_2f){
_2f=_2f||{};
this.handleDisplayPrefs();
var _30=_2f.SZ||19;
if(this.shrinkToFit){
this.calcShrinkToFit(_2f,_30);
}
if(!this.board){
this.createBoard(_30,this.stoneSize);
this.rules=new eidogo.Rules(this.board);
}
this.unsavedChanges=false;
this.resetCursor(true);
this.totalMoves=0;
var _31=new eidogo.GameCursor(this.cursor.node);
while(_31.next()){
this.totalMoves++;
}
this.totalMoves--;
this.showGameInfo(_2f);
this.enableNavSlider();
this.selectTool(this.mode=="view"?"view":"play");
this.hook("initGame");
},handleDisplayPrefs:function(){
(this.prefs.showGameInfo||this.prefs.showPlayerInfo?_a:_b)(this.dom.info);
(this.prefs.showGameInfo?_a:_b)(this.dom.infoGame);
(this.prefs.showPlayerInfo?_a:_b)(this.dom.infoPlayers);
(this.prefs.showTools?_a:_b)(this.dom.toolsContainer);
if(!this.showingSearch){
(this.prefs.showComments?_a:_b)(this.dom.comments);
}
(this.prefs.showOptions?_a:_b)(this.dom.options);
if(this.prefs.showNavTree){
this.navTree.show();
}else{
this.navTree.hide();
}
},createBoard:function(_32,_33){
_32=_32||19;
if(this.board&&this.board.renderer&&this.board.boardSize==_32){
return;
}
try{
this.dom.boardContainer.innerHTML="";
var _34=(this.renderer=="raphael"?eidogo.BoardRendererRaphael:eidogo.BoardRendererHtml);
var _35=new _34(this.dom.boardContainer,_32,this,this.cropParams,this.shrinkBoard,_33);
this.board=new eidogo.Board(_35,_32);
}
catch(e){
if(e=="No DOM container"){
this.croak(t["error board"]);
return;
}else{
throw e;
}
}
},calcShrinkToFit:function(_36,_37){
var l=null,t=null,r=null,b=null;
var _3b={};
var me=this;
_36.walk(function(_3d){
var _3e,i,_40;
for(_3e in _3d){
if(/^(W|B|AW|AB|LB)$/.test(_3e)){
_40=_3d[_3e];
if(!(_40 instanceof Array)){
_40=[_40];
}
if(_3e!="LB"){
_40=me.expandCompressedPoints(_40);
}else{
_40=[_40[0].split(/:/)[0]];
}
for(i=0;i<_40.length;i++){
_3b[_40[i]]="";
}
}
}
});
for(var key in _3b){
var pt=this.sgfCoordToPoint(key);
if(l==null||pt.x<l){
l=pt.x;
}
if(r==null||pt.x>r){
r=pt.x;
}
if(t==null||pt.y<t){
t=pt.y;
}
if(b==null||pt.y>b){
b=pt.y;
}
}
this.cropParams.width=r-l+1;
this.cropParams.height=b-t+1;
this.cropParams.left=l;
this.cropParams.top=t;
var pad=this.cropParams.padding;
for(var _44=pad;l-_44<0;_44--){
}
if(_44){
this.cropParams.width+=_44;
this.cropParams.left-=_44;
}
for(var _45=pad;t-_45<0;_45--){
}
if(_45){
this.cropParams.height+=_45;
this.cropParams.top-=_45;
}
for(var _46=pad;r+_46>_37;_46--){
}
if(_46){
this.cropParams.width+=_46;
}
for(var _47=pad;b+_47>_37;_47--){
}
if(_47){
this.cropParams.height+=_47;
}
},fetchOpponentMove:function(){
this.nowLoading(t["gnugo thinking"]);
var _48=function(req){
this.doneLoading();
this.createMove(req.responseText);
};
var _4a=function(req){
this.croak(t["error retrieving"]);
};
var _4c=this.cursor.getGameRoot();
var _4d={sgf:_4c.toSgf(),move:this.currentColor,size:_4c.SZ,level:this.opponentLevel};
_3("post",this.opponentUrl,_4d,_48,_4a,this,45000);
},fetchScoreEstimate:function(){
this.nowLoading(t["gnugo thinking"]);
var _4e=function(req){
this.doneLoading();
var _50=req.responseText.split("\n");
var _51,_52=_50[1].split(" ");
for(var i=0;i<_52.length;i++){
_51=_52[i].split(":");
if(_51[1]){
this.addMarker(_51[1],_51[0]);
}
}
this.board.render();
this.prependComment(_50[0]);
};
var _54=function(req){
this.croak(t["error retrieving"]);
};
var _56=this.cursor.getGameRoot();
var _57={sgf:_56.toSgf(),move:"est",size:_56.SZ||19,komi:_56.KM||0,mn:this.moveNumber+1};
_3("post",this.scoreEstUrl,_57,_4e,_54,this,45000);
},playProblemResponse:function(_58){
if(this.cursor.hasNext()&&this.cursor.getNext().commentType){
return;
}
var _59=this.cursor.node._children;
var _5a=[];
for(var i=0,_5c=_59.length;i<_5c;i++){
if(_59[i].choice){
_5a.push(i);
}
}
var _5d=0;
if(_5a.length>0){
_5d=_5a[Math.floor(Math.random()*_5a.length)];
}
setTimeout(function(){
this.variation(_5d,_58);
}.bind(this),200);
},doShowProblemComments:function(){
if(this.hooks.playProblemResponse){
this.hook("playProblemResponse");
}else{
if(!this.cursor.hasNext()){
this.prependComment(t["end of variation"]);
}
}
},goTo:function(_5e,_5f){
_5f=typeof _5f!="undefined"?_5f:true;
if(_5f&&_5e.length>1&&_5e[0]!=this.cursor.getGameRoot().getPosition()){
this.navTree.updateNavTree();
}
if(_5f){
this.resetCursor(true);
}
var _60=parseInt(_5e,10);
if(!(_5e instanceof Array)&&!isNaN(_60)){
if(_5f){
_60++;
}
for(var i=0;i<_60;i++){
this.variation(null,true);
}
this.refresh();
return;
}
if(!(_5e instanceof Array)){
alert(t["bad path"]+" "+_5e);
return;
}
var _62;
var _63;
if(isNaN(parseInt(_5e[0],10))){
if(!this.cursor.node._parent){
this.variation(0,true);
}
while(_5e.length){
if(this.progressiveLoads>0){
this.loadPath.push(_62);
return;
}
_62=_5e.shift();
_63=this.getVariations();
for(var i=0;i<_63.length;i++){
if(_63[i].move==_62){
this.variation(_63[i].varNum,true);
break;
}
}
}
this.refresh();
return;
}
var _64=true;
while(_5e.length){
_62=parseInt(_5e.shift(),10);
if(!_5e.length){
for(var i=0;i<_62;i++){
this.variation(0,true);
}
}else{
if(_5e.length){
if(!_64&&_5f){
while(this.cursor.node._children.length==1){
this.variation(0,true);
}
}
this.variation(_62,true);
}
}
_64=false;
}
this.refresh();
},resetCursor:function(_65,_66){
this.board.reset();
this.resetCurrentColor();
if(_66){
this.cursor.node=this.cursor.getGameRoot();
}else{
this.cursor.node=this.collectionRoot;
}
this.refresh(_65);
},resetCurrentColor:function(){
this.currentColor=(this.problemMode?this.problemColor:"B");
var _67=this.cursor.getGameRoot();
if(_67&&_67.HA>1){
this.currentColor="W";
}
},refresh:function(_68){
if(this.progressiveLoads>0){
var me=this;
setTimeout(function(){
me.refresh.call(me);
},10);
return;
}
this.execNode(_68);
},variation:function(_6a,_6b){
if(this.cursor.next(_6a)){
this.hook("beforeVariation");
this.execNode(_6b);
this.resetLastLabels();
if(this.progressiveLoads>0){
return false;
}
return true;
}
return false;
},execNode:function(_6c,_6d){
if(!_6d&&this.progressiveLoads>0){
var me=this;
setTimeout(function(){
me.execNode.call(me,_6c);
},10);
return;
}
if(!this.cursor.node){
return;
}
if(!_6c){
this.dom.comments.innerHTML="";
this.board.clearMarkers();
this.moveNumber=this.cursor.getMoveNumber();
}
if(this.moveNumber<1){
this.resetCurrentColor();
}
if(this.showProblemComments){
this.doShowProblemComments();
}
var _6f=this.cursor.node.getProperties();
for(var _70 in _6f){
if(this.propertyHandlers[_70]){
(this.propertyHandlers[_70]).apply(this,[this.cursor.node[_70],_70,_6c]);
}
}
if(_6c){
this.board.commit();
}else{
if(this.navTree.isVisible()){
var _71=this.cursor.node.getChildren();
for(var i=0,len=_71.length;i<len;i++){
var _74=_71[i];
var _75="next-"+(_74.success?"right":"wrong");
if(this._targetLeaf&&_74.onSamePath(this._targetLeaf)){
_75+="-target";
}
this.addMarker(_74.getMove(),_75);
}
}
if(this.opponentUrl&&this.opponentColor==this.currentColor&&this.moveNumber==this.totalMoves){
this.fetchOpponentMove();
}
this.findVariations();
this.updateControls();
this.board.commit();
this.board.render();
}
if(!_6d&&this.progressiveUrl){
this.fetchProgressiveData();
}
if(this.problemMode&&this.currentColor&&this.currentColor!=this.problemColor&&!this.goingBack){
this.playProblemResponse(_6c);
}
this.goingBack=false;
},fetchProgressiveData:function(_76){
var _77=this.cursor.node||null;
if(_77&&_77._cached){
return;
}
if(this.progressiveMode=="pattern"){
if(_77&&!_77._parent._parent){
return;
}
this.fetchProgressiveContinuations(_76);
}else{
var _78=(_77&&_77._id)||0;
this.nowLoading();
this.progressiveLoads++;
var _79=function(){
var _7a=this.cursor.getMoveNumber();
if(_7a>1){
this.cursor.node.C="<a id='cont-search' href='#'>"+t["show games"]+"</a>"+(this.cursor.node.C||"");
}
this.refresh();
if(_76&&typeof _76=="function"){
_76();
}
_4(_2("cont-search"),"click",function(e){
var _7c=8;
var _7d=this.board.getRegion(0,19-_7c,_7c,_7c);
var _7e=this.convertRegionPattern(_7d);
this.loadSearch("ne",_7c+"x"+_7c,this.compressPattern(_7e));
_7(e);
}.bind(this));
}.bind(this);
var url=this.progressiveUrl+"?"+eidogo.util.makeQueryString({id:_78,pid:this.uniq});
this.remoteLoad(url,_77,false,null,_79);
}
},fetchProgressiveContinuations:function(_80){
this.nowLoading();
this.progressiveLoads++;
var _81=this.cursor.getMoveNumber();
var _82=(_81>1?11:7);
var _83=19-_82-1;
var _84=this.board?this.convertRegionPattern(this.board.getRegion(0,_83+1,_82,_82)):".................................................";
var _85={q:"ne",w:_82,h:_82,p:_84,a:"continuations",t:(new Date()).getTime()};
var _86=function(req){
this.croak(t["error retrieving"]);
};
var _88=function(req){
if(!req.responseText||req.responseText=="NONE"){
this.progressiveLoads--;
this.doneLoading();
this.cursor.node._cached=true;
this.refresh();
return;
}
var _8a={LB:[],_children:[]},_8b;
_8a.C=_81>1?"<a id='cont-search' href='#'>"+t["show games"]+"</a>":"";
var _8c,_8d=eval("("+req.responseText+")");
if(_8d.length){
_8d.sort(function(a,b){
return parseInt(b.count,10)-parseInt(a.count,10);
});
var _90=parseInt(_8d[0].count,10);
var x,y,_93,_94;
_8a.C+="<div class='continuations'>";
for(var i=0;_8c=_8d[i];i++){
_94=parseInt(_8c.count/_90*150);
if(_90>20&&parseInt(_8c.count,10)<10){
continue;
}
_8b={};
x=_83+parseInt(_8c.x,10)+1;
y=parseInt(_8c.y,10);
_93=this.pointToSgfCoord({x:x,y:y});
_8b[this.currentColor||"B"]=_93;
_8a.LB.push(_93+":"+_8c.label);
if(_94){
_8a.C+="<div class='continuation'>"+"<div class='cont-label'>"+_8c.label+"</div>"+"<div class='cont-bar' style='width: "+_94+"px'></div>"+"<div class='cont-count'>"+_8c.count+"</div>"+"</div>";
}
_8a._children.push(_8b);
}
_8a.C+="</div>";
if(!this.cursor.node){
_8a={_children:[_8a]};
}
}
this.load(_8a,this.cursor.node);
_4(_2("cont-search"),"click",function(e){
this.loadSearch("ne",_82+"x"+_82,this.compressPattern(_84));
_7(e);
}.bind(this));
if(_80&&typeof _80=="function"){
_80();
}
}.bind(this);
_3("get",this.progressiveUrl,_85,_88,_86,this,45000);
},findVariations:function(){
this.variations=this.getVariations();
},getVariations:function(){
var _97=[],_98=this.cursor.node._children;
for(var i=0;i<_98.length;i++){
_97.push({move:_98[i].getMove(),varNum:i});
}
return _97;
},back:function(e,obj,_9c){
var _9d=this.cursor.getColor();
if(this.problemMode&&_9d!==this.problemColor){
this.doGoBack();
}
this.doGoBack();
},doGoBack:function(e,obj,_a0){
if(this.cursor.previous()){
this.board.revert(1);
this.goingBack=true;
this.refresh(_a0);
this.resetLastLabels();
}
},forward:function(e,obj,_a3){
this.variation(null,_a3);
},first:function(){
if(!this.cursor.hasPrevious()){
return;
}
this.resetCursor(false,true);
},last:function(){
if(!this.cursor.hasNext()){
return;
}
while(this.variation(null,true)){
}
this.refresh();
},pass:function(){
if(!this.variations){
return;
}
for(var i=0;i<this.variations.length;i++){
if(!this.variations[i].move||this.variations[i].move=="tt"){
this.variation(this.variations[i].varNum);
return;
}
}
this.createMove("tt");
},handleBoardMouseDown:function(x,y,cx,cy,e){
if(this.domLoading){
return;
}
if(!this.boundsCheck(x,y,[0,this.board.boardSize-1])){
return;
}
this.mouseDown=true;
this.mouseDownX=x;
this.mouseDownY=y;
this.mouseDownClickX=cx;
this.mouseDownClickY=cy;
if(this.mode=="region"&&x>=0&&y>=0&&!this.regionBegun){
this.regionTop=y;
this.regionLeft=x;
this.regionBegun=true;
}
},handleBoardHover:function(x,y,cx,cy,e){
if(this.domLoading){
return;
}
if(this.mouseDown||this.regionBegun){
if(!this.boundsCheck(x,y,[0,this.board.boardSize-1])){
return;
}
var _af=(x!=this.mouseDownX||y!=this.mouseDownY);
var _b0=Math.abs(this.mouseDownClickX-cx)>=19||Math.abs(this.mouseDownClickY-cy)>=19;
if(this.searchUrl&&!this.regionBegun&&_af&&_b0){
this.selectTool("region");
this.regionBegun=true;
this.regionTop=this.mouseDownY;
this.regionLeft=this.mouseDownX;
}
if(this.regionBegun){
this.regionRight=x+(x>=this.regionLeft?1:0);
this.regionBottom=y+(y>=this.regionTop?1:0);
this.showRegion();
}
_7(e);
}
this.handlerHoverStones(x,y);
},moveAllowed:function(pt){
var _b2=true;
var _b3=this.cursor.node._children;
var _b4=this.pointToSgfCoord(pt);
var _b5=this.cursor.hasNext(true)?this.cursor.getNextMoves()[_b4]:null;
for(var i=0,_b7=_b3.length;i<_b7;i++){
if(_b3[i].goproblems&&_b3[i].goproblems.notThis){
if(i===_b5){
_b2=false;
break;
}
}
if(this.cursor.node.goproblems&&this.cursor.node.goproblems.force){
if(i===_b5){
_b2=true;
break;
}else{
_b2=false;
}
}
}
return _b2;
},handlerHoverStones:function(x,y){
if(!this.boundsCheck(x,y,[0,this.board.boardSize-1])){
return;
}
if(this.problemMode&&this.cursor.hasNext(true)&&this.cursor.getNextColor()!==this.problemColor){
return;
}
if(!this.moveAllowed({x:x,y:y})){
return;
}
var _ba=this.cursor.getNextColor()==="B"?"black":"white";
this.board.renderer.renderHoverStone({x:x,y:y},_ba);
},handleBoardMouseUp:function(x,y,e){
if(this.domLoading){
return;
}
if(!this.moveAllowed({x:x,y:y})){
return;
}
this.mouseDown=false;
var _be=this.pointToSgfCoord({x:x,y:y});
if(this.mode=="view"||this.mode=="play"){
for(var i=0;i<this.variations.length;i++){
var _c0=this.sgfCoordToPoint(this.variations[i].move);
if(_c0.x==x&&_c0.y==y){
this.variation(this.variations[i].varNum);
_7(e);
return;
}
}
}
if(this.mode=="view"){
var _c1=this.cursor.getGameRoot(),_c2=[0,_c1.getPosition()],mn=0,_c4=_c1._children[0];
while(_c4){
if(_c4.getMove()==_be){
_c2.push(mn);
this.goTo(_c2);
break;
}
mn++;
_c4=_c4._children[0];
}
return;
}
if(this.mode=="play"){
if(!this.rules.check({x:x,y:y},this.currentColor)){
return;
}
if(_be){
var _c5=this.cursor.getNextMoves();
if(_c5&&_be in _c5){
this.variation(_c5[_be]);
}else{
this.createMove(_be);
}
}
}else{
if(this.mode=="region"&&x>=-1&&y>=-1&&this.regionBegun){
if(this.regionTop==y&&this.regionLeft==x&&!this.regionClickSelect){
this.regionClickSelect=true;
this.regionRight=x+1;
this.regionBottom=y+1;
this.showRegion();
}else{
this.regionBegun=false;
this.regionClickSelect=false;
this.regionBottom=(y<0?0:(y>=this.board.boardSize)?y:y+(y>this.regionTop?1:0));
this.regionRight=(x<0?0:(x>=this.board.boardSize)?x:x+(x>this.regionLeft?1:0));
this.showRegion();
_a(this.dom.searchButton,"inline");
_7(e);
}
}else{
var _c6;
var _c7=this.board.getStone({x:x,y:y});
if(this.mode=="add_b"||this.mode=="add_w"){
var _c8=this.cursor.node.emptyPoint(this.pointToSgfCoord({x:x,y:y}));
if(_c7!=this.board.BLACK&&this.mode=="add_b"){
_c6="AB";
}else{
if(_c7!=this.board.WHITE&&this.mode=="add_w"){
_c6="AW";
}else{
if(this.board.getStone({x:x,y:y})!=this.board.EMPTY&&!_c8){
_c6="AE";
}
}
}
}else{
switch(this.mode){
case "tr":
_c6="TR";
break;
case "sq":
_c6="SQ";
break;
case "cr":
_c6="CR";
break;
case "x":
_c6="MA";
break;
case "dim":
_c6="DD";
break;
case "number":
_c6="LB";
_be=_be+":"+this.labelLastNumber;
this.labelLastNumber++;
break;
case "letter":
_c6="LB";
_be=_be+":"+this.labelLastLetter;
this.labelLastLetter=String.fromCharCode(this.labelLastLetter.charCodeAt(0)+1);
break;
case "label":
_c6="LB";
_be=_be+":"+this.dom.labelInput.value;
break;
case "clear":
this.cursor.node.deletePropertyValue(["TR","SQ","CR","MA","DD","LB"],new RegExp("^"+_be));
break;
}
if(this.cursor.node.hasPropertyValue(_c6,_be)){
this.cursor.node.deletePropertyValue(_c6,_be);
_c6=null;
}
}
if(_c6){
this.cursor.node.pushProperty(_c6,_be);
}
this.unsavedChanges=true;
var _c8=this.checkForEmptyNode();
this.refresh();
if(_c8){
this.prependComment(t["position deleted"]);
}
}
}
},checkForEmptyNode:function(){
if(!eidogo.util.numProperties(this.cursor.node.getProperties())){
var _c9=window.confirm(t["confirm delete"]);
if(_c9){
var id=this.cursor.node._id;
var _cb=0;
this.back();
this.cursor.node._children=this.cursor.node._children.filter(function(_cc,i){
if(_cc._id==id){
_cb=i;
return false;
}else{
return true;
}
});
if(_cb&&this.cursor.node._preferredChild==_cb){
this.cursor.node._preferredChild--;
}
return true;
}
}
return false;
},handleDocMouseUp:function(evt){
if(this.domLoading){
return true;
}
if(this.mode=="region"&&this.regionBegun&&!this.regionClickSelect){
this.mouseDown=false;
this.regionBegun=false;
_a(this.dom.searchButton,"inline");
}
return true;
},boundsCheck:function(x,y,_d1){
if(_d1.length==2){
_d1[3]=_d1[2]=_d1[1];
_d1[1]=_d1[0];
}
return (x>=_d1[0]&&y>=_d1[1]&&x<=_d1[2]&&y<=_d1[3]);
},getRegionBounds:function(){
var l=this.regionLeft;
var w=this.regionRight-this.regionLeft;
if(w<0){
l=this.regionRight;
w=-w+1;
}
var t=this.regionTop;
var h=this.regionBottom-this.regionTop;
if(h<0){
t=this.regionBottom;
h=-h+1;
}
return [t,l,w,h];
},showRegion:function(){
var _d6=this.getRegionBounds();
this.board.renderer.showRegion(_d6);
},hideRegion:function(){
this.board.renderer.hideRegion();
},convertRegionPattern:function(_d7){
return _d7.join("").replace(new RegExp(this.board.EMPTY,"g"),".").replace(new RegExp(this.board.BLACK,"g"),"x").replace(new RegExp(this.board.WHITE,"g"),"o");
},loadSearch:function(q,dim,p,a,o){
var _dd={_children:[{SZ:this.board.boardSize,_children:[]}]};
this.load(_dd);
a=a||"corner";
this.dom.searchAlgo.value=a;
p=this.uncompressPattern(p);
dim=dim.split("x");
var w=dim[0];
var h=dim[1];
var bs=this.board.boardSize;
var l;
var t;
switch(q){
case "nw":
l=0;
t=0;
break;
case "ne":
l=bs-w;
t=0;
break;
case "se":
l=bs-w;
t=bs-h;
break;
case "sw":
l=0;
t=bs-h;
break;
}
var c;
var x;
var y;
for(y=0;y<h;y++){
for(x=0;x<w;x++){
c=p.charAt(y*w+x);
if(c=="o"){
c="AW";
}else{
if(c=="x"){
c="AB";
}else{
c="";
}
}
this.cursor.node.pushProperty(c,this.pointToSgfCoord({x:l+x,y:t+y}));
}
}
this.refresh();
this.regionLeft=l;
this.regionTop=t;
this.regionRight=l+x;
this.regionBottom=t+y;
var b=this.getRegionBounds();
var r=[b[1],b[0],b[1]+b[2],b[0]+b[3]-1];
for(y=0;y<this.board.boardSize;y++){
for(x=0;x<this.board.boardSize;x++){
if(!this.boundsCheck(x,y,r)){
this.board.renderer.renderMarker({x:x,y:y},"dim");
}
}
}
this.searchRegion(o);
},searchRegion:function(_e8){
if(this.searching){
return;
}
this.searching=true;
if(!this.searchUrl){
_a(this.dom.comments);
_b(this.dom.searchContainer);
this.prependComment(t["no search url"]);
return;
}
var _e8=parseInt(_e8,10)||0;
var _e9=this.dom.searchAlgo.value;
var _ea=this.getRegionBounds();
var _eb=this.board.getRegion(_ea[0],_ea[1],_ea[2],_ea[3]);
var _ec=this.convertRegionPattern(_eb);
var _ed=/^\.*$/.test(_ec);
var _ee=/^\.*o\.*$/.test(_ec);
var _ef=/^\.*x\.*$/.test(_ec);
if(_ed||_ee||_ef){
this.searching=false;
_a(this.dom.comments);
_b(this.dom.searchContainer);
this.prependComment(t["two stones"]);
return;
}
var _f0=[];
if(_ea[0]==0){
_f0.push("n");
}
if(_ea[1]==0){
_f0.push("w");
}
if(_ea[0]+_ea[3]==this.board.boardSize){
_f0.push("s");
}
if(_ea[1]+_ea[2]==this.board.boardSize){
_f0.push("e");
}
if(_e9=="corner"&&!(_f0.length==2&&((_f0.contains("n")&&_f0.contains("e"))||(_f0.contains("n")&&_f0.contains("w"))||(_f0.contains("s")&&_f0.contains("e"))||(_f0.contains("s")&&_f0.contains("w"))))){
this.searching=false;
_a(this.dom.comments);
_b(this.dom.searchContainer);
this.prependComment(t["two edges"]);
return;
}
var _f1=(_f0.contains("n")?"n":"s");
_f1+=(_f0.contains("w")?"w":"e");
this.showComments("");
this.gameName="search";
var _f2=function(req){
this.searching=false;
this.doneLoading();
_b(this.dom.comments);
_a(this.dom.searchContainer);
this.showingSearch=true;
if(req.responseText=="ERROR"){
this.croak(t["error retrieving"]);
return;
}else{
if(req.responseText=="NONE"){
_b(this.dom.searchResultsContainer);
this.dom.searchCount.innerHTML="No";
return;
}
}
var ret=eval("("+req.responseText+")");
var _f5=ret.results,_f6,_f7="",odd,_f9=parseInt(ret.total,10),_fa=parseInt(ret.offset,10)+1,_fb=parseInt(ret.offset,10)+50;
for(var i=0;_f6=_f5[i];i++){
odd=odd?false:true;
_f7+="<a class='search-result"+(odd?" odd":"")+"' href='#'>                    <span class='id'>"+_f6.id+"</span>                    <span class='mv'>"+_f6.mv+"</span>                    <span class='pw'>"+_f6.pw+" "+_f6.wr+"</span>                    <span class='pb'>"+_f6.pb+" "+_f6.br+"</span>                    <span class='re'>"+_f6.re+"</span>                    <span class='dt'>"+_f6.dt+"</span>                    <div class='clear'>&nbsp;</div>                    </a>";
}
if(_f9>_fb){
_f7+="<div class='search-more'><a href='#' id='search-more'>Show more...</a></div>";
}
_a(this.dom.searchResultsContainer);
this.dom.searchResults.innerHTML=_f7+"<br>";
this.dom.searchCount.innerHTML=_f9;
this.dom.searchOffsetStart.innerHTML=_fa;
this.dom.searchOffsetEnd.innerHTML=(_f9<_fb?_f9:_fb);
this.dom.searchContainer.scrollTop=0;
if(_f9>_fb){
setTimeout(function(){
_4(_2("search-more"),"click",function(e){
this.loadSearch(_f1,_ea[2]+"x"+_ea[3],_ec,"corner",ret.offset+51);
_7(e);
}.bind(this));
}.bind(this),0);
}
};
var _fe=function(req){
this.croak(t["error retrieving"]);
};
var _100={q:_f1,w:_ea[2],h:_ea[3],p:_ec,a:_e9,o:_e8,t:(new Date()).getTime()};
this.progressiveLoad=false;
this.progressiveUrl=null;
this.prefs.markNext=false;
this.prefs.showPlayerInfo=true;
this.hook("searchRegion",_100);
this.nowLoading();
_3("get",this.searchUrl,_100,_f2,_fe,this,45000);
},loadSearchResult:function(e){
this.nowLoading();
var _102=e.target||e.srcElement;
if(_102.nodeName=="SPAN"){
_102=_102.parentNode;
}
if(_102.nodeName=="A"){
var span;
var id;
var mv;
for(var i=0;span=_102.childNodes[i];i++){
if(span.className=="id"){
id=span.innerHTML;
}
if(span.className=="mv"){
mv=parseInt(span.innerHTML,10);
}
}
}
this.remoteLoad(id,null,true,[0,mv],function(){
this.doneLoading();
this.setPermalink();
this.prefs.showOptions=true;
this.handleDisplayPrefs();
}.bind(this));
_7(e);
},closeSearch:function(){
this.showingSearch=false;
_b(this.dom.searchContainer);
_a(this.dom.comments);
},compressPattern:function(_107){
var c=null;
var pc="";
var n=1;
var ret="";
for(var i=0;i<_107.length;i++){
c=_107.charAt(i);
if(c==pc){
n++;
}else{
ret=ret+pc+(n>1?n:"");
n=1;
pc=c;
}
}
ret=ret+pc+(n>1?n:"");
return ret;
},uncompressPattern:function(_10d){
var c=null;
var s=null;
var n="";
var ret="";
for(var i=0;i<_10d.length;i++){
c=_10d.charAt(i);
if(c=="."||c=="x"||c=="o"){
if(s!=null){
n=parseInt(n,10);
n=isNaN(n)?1:n;
for(var j=0;j<n;j++){
ret+=s;
}
n="";
}
s=c;
}else{
n+=c;
}
}
n=parseInt(n,10);
n=isNaN(n)?1:n;
for(var j=0;j<n;j++){
ret+=s;
}
return ret;
},createMove:function(_114){
var _115={};
_115[this.currentColor]=_114;
var _116=new eidogo.GameNode(null,_115);
_116._cached=true;
_116.setOffPath(true);
this.totalMoves++;
this.cursor.node.appendChild(_116);
this.unsavedChanges=[this.cursor.node._children.last(),this.cursor.node];
this.navTree.updateNavTree();
this.variation(this.cursor.node._children.length-1);
},handleKeypress:function(e){
if(this.editingText){
return true;
}
var _118=e.keyCode||e.charCode;
if(!_118||e.ctrlKey||e.altKey||e.metaKey){
return true;
}
var _119=String.fromCharCode(_118).toLowerCase();
var _11a=[];
for(var i=0;i<this.variations.length;i++){
var _11c=this.variations[i].move;
var _11d=this.sgfCoordToPoint(_11c);
var _11e=""+(i+1);
var _11f=this.board.getMarker(_11d);
if(_11d.x!=null&&_11f!=this.board.EMPTY&&typeof _11f=="string"&&!_11a.contains(_11c)){
_11e=_11f.toLowerCase();
}
_11e=_11e.replace(/^var:/,"");
if(_119==_11e.charAt(0)){
this.variation(this.variations[i].varNum);
_7(e);
return;
}
_11a.push(_11c);
}
if(_118==112||_118==27){
this.selectTool("play");
}
var stop=true;
switch(_118){
case 39:
if(e.shiftKey){
var _121=this.totalMoves-this.moveNumber;
var _122=(_121>9?9:_121-1);
for(var i=0;i<_122;i++){
this.forward(null,null,true);
}
}
this.forward();
break;
case 37:
if(e.shiftKey){
var _122=(this.moveNumber>9?9:this.moveNumber-1);
for(var i=0;i<_122;i++){
this.back(null,null,true);
}
}
this.back();
break;
case 40:
this.last();
break;
case 38:
this.first();
break;
case 192:
this.pass();
break;
default:
stop=false;
break;
}
if(stop){
_7(e);
}
},showGameInfo:function(_123){
this.hook("showGameInfo",_123);
if(!_123){
return;
}
this.dom.infoGame.innerHTML="";
this.dom.whiteName.innerHTML="";
this.dom.blackName.innerHTML="";
var dl=document.createElement("dl"),val;
for(var _126 in this.infoLabels){
if(_123[_126] instanceof Array){
_123[_126]=_123[_126][0];
}
if(_123[_126]){
if(_126=="PW"){
this.dom.whiteName.innerHTML=_123[_126]+(_123["WR"]?", "+_123["WR"]:"");
continue;
}else{
if(_126=="PB"){
this.dom.blackName.innerHTML=_123[_126]+(_123["BR"]?", "+_123["BR"]:"");
continue;
}
}
if(_126=="WR"||_126=="BR"){
continue;
}
val=_123[_126];
if(_126=="DT"){
var _127=_123[_126].split(/[\.-]/);
if(_127.length==3){
val=_127[2].replace(/^0+/,"")+" "+this.months[_127[1]-1]+" "+_127[0];
}
}
var dt=document.createElement("dt");
dt.innerHTML=this.infoLabels[_126]+":";
var dd=document.createElement("dd");
dd.innerHTML=val;
dl.appendChild(dt);
dl.appendChild(dd);
}
}
this.dom.infoGame.appendChild(dl);
},selectTool:function(tool){
var _12b;
_b(this.dom.scoreEst);
_b(this.dom.labelInput);
if(tool=="region"){
_12b="crosshair";
}else{
if(tool=="comment"){
this.startEditComment();
}else{
if(tool=="gameinfo"){
this.startEditGameInfo();
}else{
if(tool=="label"){
_a(this.dom.labelInput,"inline");
this.dom.labelInput.focus();
}else{
_12b="default";
this.regionBegun=false;
this.hideRegion();
_b(this.dom.searchButton);
_b(this.dom.searchAlgo);
if(this.searchUrl){
_a(this.dom.scoreEst,"inline");
}
}
}
}
}
this.board.renderer.setCursor(_12b);
this.mode=tool;
this.dom.toolsSelect.value=tool;
},startEditComment:function(){
this.closeSearch();
var div=this.dom.commentsEdit;
div.style.position="absolute";
div.style.top=this.dom.comments.offsetTop+"px";
div.style.left=this.dom.comments.offsetLeft+"px";
_a(this.dom.shade);
this.dom.comments.innerHTML="";
_a(div);
_a(this.dom.commentsEditDone);
this.dom.commentsEditTa.value=this.cursor.node.C||"";
this.dom.commentsEditTa.focus();
this.editingText=true;
},finishEditComment:function(){
this.editingText=false;
var oldC=this.cursor.node.C;
var newC=this.dom.commentsEditTa.value;
if(oldC!=newC){
this.unsavedChanges=true;
this.cursor.node.C=newC;
}
if(!this.cursor.node.C){
delete this.cursor.node.C;
}
_b(this.dom.shade);
_b(this.dom.commentsEdit);
_a(this.dom.comments);
this.selectTool("play");
var _12f=this.checkForEmptyNode();
this.refresh();
if(_12f){
this.prependComment(t["position deleted"]);
}
},startEditGameInfo:function(){
this.closeSearch();
var div=this.dom.gameInfoEdit;
div.style.position="absolute";
div.style.top=this.dom.comments.offsetTop+"px";
div.style.left=this.dom.comments.offsetLeft+"px";
_a(this.dom.shade);
this.dom.comments.innerHTML="";
_a(div);
_a(this.dom.gameInfoEditDone);
var root=this.cursor.getGameRoot();
var html=["<table>"];
for(var prop in this.infoLabels){
html.push("<tr><td>"+this.infoLabels[prop]+":"+"</td><td>"+"<input type=\"text\" id=\"game-info-edit-field-"+prop+"\""+" value=\""+(root[prop]||"")+"\">"+"</td></tr>");
}
html.push("</table>");
this.dom.gameInfoEditForm.innerHTML=html.join("");
setTimeout(function(){
_2("game-info-edit-field-GN").focus();
},0);
this.editingText=true;
},finishEditGameInfo:function(){
this.editingText=false;
_b(this.dom.shade);
_b(this.dom.gameInfoEdit);
_a(this.dom.comments);
var root=this.cursor.getGameRoot();
var _135=null;
for(var prop in this.infoLabels){
_135=_2("game-info-edit-field-"+prop).value;
if((root[prop]||"")!=_135){
root[prop]=_135;
this.unsavedChanges=true;
}
}
this.showGameInfo(root);
this.dom.gameInfoEditForm.innerHTML="";
this.selectTool("play");
this.refresh();
},updateControls:function(){
this.dom.moveNumber.innerHTML=(this.moveNumber?(t["move"]+" "+this.moveNumber):(this.permalinkable?"permalink":""));
this.dom.whiteCaptures.innerHTML=t["captures"]+": <span>"+this.board.captures.W+"</span>";
this.dom.blackCaptures.innerHTML=t["captures"]+": <span>"+this.board.captures.B+"</span>";
this.dom.whiteTime.innerHTML=t["time left"]+": <span>"+(this.timeW?this.timeW:"--")+"</span>";
this.dom.blackTime.innerHTML=t["time left"]+": <span>"+(this.timeB?this.timeB:"--")+"</span>";
_9(this.dom.controlPass,"pass-on");
this.dom.variations.innerHTML="";
for(var i=0;i<this.variations.length;i++){
var _138=i+1;
var _139=false;
if(!this.variations[i].move||this.variations[i].move=="tt"){
_8(this.dom.controlPass,"pass-on");
}else{
if(this.prefs.markNext||this.variations.length>1){
var _13a=this.sgfCoordToPoint(this.variations[i].move);
if(this.board.getMarker(_13a)!=this.board.EMPTY){
var _13b=this.board.getMarker(_13a);
if(_13b.indexOf("var:")!==0){
_138=_13b;
}else{
_139=true;
}
}
if(this.prefs.markVariations&&!_139){
this.board.addMarker(_13a,"var:"+_138);
}
}
}
var _13c=document.createElement("div");
_13c.className="variation-nav";
_13c.innerHTML=_138;
_4(_13c,"click",function(e,arg){
arg.me.variation(arg.varNum);
},{me:this,varNum:this.variations[i].varNum});
this.dom.variations.appendChild(_13c);
}
if(this.variations.length<2){
this.dom.variations.innerHTML="<div class='variation-nav none'>"+t["no variations"]+"</div>";
}
if(this.cursor.hasNext()){
_8(this.dom.controlForward,"forward-on");
_8(this.dom.controlLast,"last-on");
}else{
_9(this.dom.controlForward,"forward-on");
_9(this.dom.controlLast,"last-on");
}
if(this.cursor.hasPrevious()){
_8(this.dom.controlBack,"back-on");
_8(this.dom.controlFirst,"first-on");
}else{
_9(this.dom.controlBack,"back-on");
_9(this.dom.controlFirst,"first-on");
var info="";
if(!this.prefs.showPlayerInfo){
info+=this.getGameDescription(true);
}
if(this.prefs.showGameInfo){
info+=this.dom.infoGame.innerHTML;
}
if(info.length&&this.theme!="problem"){
this.prependComment(info,"comment-info");
}
}
if(!this.progressiveLoad){
this.updateNavSlider();
}
if(this.prefs.showNavTree){
this.navTree.updateNavTree();
}
var node=this.cursor.node,pos,html,js;
if(node._parent&&!node._parent._parent&&node._parent._children.length>1){
pos=node.getPosition();
html=t["multi-game sgf"];
js="javascript:eidogo.delegate("+this.uniq+", \"goTo\", [";
if(pos){
html+="<a href='"+js+(pos-1)+",0])'>"+t["previous game"]+"</a>";
}
if(node._parent._children[pos+1]){
html+=(pos?" | ":"")+"<a href='"+js+(pos+1)+",0])'>"+t["next game"]+"</a>";
}
this.prependComment(html,"comment-info");
}
},setColor:function(_144){
var _145=_144;
if(_145=="1"||_145=="2"){
_145=_145=="1"?"B":"W";
}else{
if(_145!="B"&&_145!="W"){
throw "Unrecognized PL value: ("+_145+")";
}
}
this.prependComment(_145=="B"?t["black to play"]:t["white to play"]);
this.currentColor=this.problemColor=_145;
},setMoveNumber:function(num){
this.moveNumber=num;
},playMove:function(_147,_148,_149){
if(this.hooks.beforePlayMove){
this.hook("beforePlayMove",{noRender:_149});
}
_148=_148||this.currentColor;
this.currentColor=(_148=="B"?"W":"B");
_148=_148=="W"?this.board.WHITE:this.board.BLACK;
var pt=this.sgfCoordToPoint(_147);
if((!_147||_147=="tt"||_147=="")&&!_149){
this.prependComment((_148==this.board.WHITE?t["white"]:t["black"])+" "+t["passed"],"comment-pass");
}else{
if(_147=="resign"){
this.prependComment((_148==this.board.WHITE?t["white"]:t["black"])+" "+t["resigned"],"comment-resign");
}else{
if(_147&&_147!="tt"){
this.board.addStone(pt,_148);
this.rules.apply(pt,_148);
if(this.prefs.markCurrent&&!_149){
this.addMarker(_147,"current");
}
}
}
}
},addStone:function(_14b,_14c){
if(!(_14b instanceof Array)){
_14b=[_14b];
}
_14b=this.expandCompressedPoints(_14b);
for(var i=0;i<_14b.length;i++){
this.board.addStone(this.sgfCoordToPoint(_14b[i]),_14c=="AW"?this.board.WHITE:_14c=="AB"?this.board.BLACK:this.board.EMPTY);
}
},addMarker:function(_14e,type){
if(!(_14e instanceof Array)){
_14e=[_14e];
}
_14e=this.expandCompressedPoints(_14e);
var _150;
for(var i=0;i<_14e.length;i++){
switch(type){
case "TR":
_150="triangle";
break;
case "SQ":
_150="square";
break;
case "CR":
_150="circle";
break;
case "MA":
_150="ex";
break;
case "TW":
_150="territory-white";
break;
case "TB":
_150="territory-black";
break;
case "DD":
_150="dim";
break;
case "LB":
_150=(_14e[i].split(":"))[1];
break;
default:
_150=type;
break;
}
this.board.addMarker(this.sgfCoordToPoint((_14e[i].split(":"))[0]),_150);
}
},showTime:function(_152,type){
var tp=(type=="BL"||type=="OB"?"timeB":"timeW");
if(type=="BL"||type=="WL"){
var mins=Math.floor(_152/60);
var secs=(_152%60).toFixed(0);
secs=(secs<10?"0":"")+secs;
this[tp]=mins+":"+secs;
}else{
this[tp]+=" ("+_152+")";
}
},showAnnotation:function(_157,type){
var msg;
switch(type){
case "N":
msg=_157;
break;
case "GB":
msg=(_157>1?t["vgb"]:t["gb"]);
break;
case "GW":
msg=(_157>1?t["vgw"]:t["gw"]);
break;
case "DM":
msg=(_157>1?t["dmj"]:t["dm"]);
break;
case "UC":
msg=t["uc"];
break;
case "TE":
msg=t["te"];
break;
case "BM":
msg=(_157>1?t["vbm"]:t["bm"]);
break;
case "DO":
msg=t["do"];
break;
case "IT":
msg=t["it"];
break;
case "HO":
msg=t["ho"];
break;
}
this.prependComment(msg);
},showComments:function(_15a,junk,_15c){
if(_15c||!_15a){
return;
}
if(this.hooks.showComments){
this.hook("showComments",{comments:_15a});
}else{
this.dom.comments.innerHTML+=_15a.replace(/^(\n|\r|\t|\s)+/,"").replace(/\n/g,"<br />");
}
},prependComment:function(_15d,cls){
cls=cls||"comment-status";
this.dom.comments.innerHTML="<div class='"+cls+"'>"+_15d+"</div>"+this.dom.comments.innerHTML;
},downloadSgf:function(evt){
_7(evt);
if(this.downloadUrl){
if(this.unsavedChanges){
alert(t["unsaved changes"]);
return;
}
location.href=this.downloadUrl+this.gameName;
}else{
if(_c){
location.href="data:text/plain,"+encodeURIComponent(this.cursor.getGameRoot().toSgf());
}
}
},save:function(evt){
_7(evt);
var _161=function(req){
this.hook("saved",[req.responseText]);
};
var _163=function(req){
this.croak(t["error retrieving"]);
};
var sgf=this.cursor.getGameRoot().toSgf();
_3("POST",this.saveUrl,{sgf:sgf},_161,_163,this,30000);
},show:function(){
eidogo.util.show(this.dom.container);
$(this.dom.container).append(this.dom.player);
this.navTree.setNavTreeMaxWidth();
},constructDom:function(){
this.dom.player=$("<div>");
this.dom.player.attr({"class":"eidogo-player"+(this.theme?" theme-"+this.theme:""),id:"player-"+this.uniq});
this.dom.container.innerHTML="";
var _166="            <div class='column'>              <div id='board-container' class='board-container'></div>              <div id='game-info-edit' class='game-info-edit'>                  <div id='game-info-edit-form' class='game-info-edit-form'></div>                  <div id='game-info-edit-done' class='game-info-edit-done'>"+t["done"]+"</div>              </div>              <div id='info' class='info'>                  <div id='info-players' class='players'>                      <div id='white' class='player white'>                          <div id='white-name' class='name'></div>                          <div id='white-captures' class='captures'></div>                          <div id='white-time' class='time'></div>                      </div>                      <div id='black' class='player black'>                          <div id='black-name' class='name'></div>                          <div id='black-captures' class='captures'></div>                          <div id='black-time' class='time'></div>                      </div>                  </div>                  <div id='info-game' class='game'></div>              </div>            </div>            <div class='column column-margin'>              <div id='controls-container' class='controls-container'>                  <ul id='controls' class='controls'>                      <li id='control-first' class='control first'>First</li>                      <li id='control-back' class='control back'>Back</li>                      <li id='control-forward' class='control forward'>Forward</li>                      <li id='control-last' class='control last'>Last</li>                      <li id='control-pass' class='control pass'>Pass</li>                  </ul>                  <div id='move-number' class='move-number"+(this.permalinkable?" permalink":"")+"'></div>                  <div id='nav-slider' class='nav-slider'>                      <div id='nav-slider-thumb' class='nav-slider-thumb'></div>                  </div>                  <div id='variations-container' class='variations-container'>                      <div id='variations-label' class='variations-label'>"+t["variations"]+":</div>                      <div id='variations' class='variations'></div>                  </div>                  <div class='controls-stop'></div>              </div>              <div id='tools-container' class='tools-container'"+(this.prefs.showTools?"":" style='display: none'")+">                  <div id='tools-label' class='tools-label'>"+t["tool"]+":</div>                  <select id='tools-select' class='tools-select'>                      <option value='play'>&#9658; "+t["play"]+"</option>                      <option value='view'>&#8594; "+t["view"]+"</option>                      <option value='add_b'>&#9679; "+t["add_b"]+"</option>                      <option value='add_w'>&#9675; "+t["add_w"]+"</option>                      "+(this.searchUrl?("<option value='region'>&#9618; "+t["region"]+"</option>"):"")+"                      "+(this.saveUrl&&!this.progressiveLoad?("<option value='comment'>&para; "+t["edit comment"]+"</option>"):"")+"                      "+(this.saveUrl?("<option value='gameinfo'>&#8962; "+t["edit game info"]+"</option>"):"")+"                      <option value='tr'>&#9650; "+t["triangle"]+"</option>                      <option value='sq'>&#9632; "+t["square"]+"</option>                      <option value='cr'>&#9679; "+t["circle"]+"</option>                      <option value='x'>&times; "+t["x"]+"</option>                      <option value='letter'>A "+t["letter"]+"</option>                      <option value='number'>5 "+t["number"]+"</option>                      <option value='label'>&Ccedil; "+t["label"]+"</option>                      <option value='dim'>&#9619; "+t["dim"]+"</option>                      <option value='clear'>&#9617; "+t["clear"]+"</option>                  </select>                  <input type='button' id='score-est' class='score-est-button' value='"+t["score est"]+"' />                  <select id='search-algo' class='search-algo'>                      <option value='corner'>"+t["search corner"]+"</option>                      <option value='center'>"+t["search center"]+"</option>                  </select>                  <input type='button' id='search-button' class='search-button' value='"+t["search"]+"' />                  <input type='text' id='label-input' class='label-input' />              </div>              <div id='comments' class='comments'></div>              <div id='comments-edit' class='comments-edit'>                  <textarea id='comments-edit-ta' class='comments-edit-ta'></textarea>                  <div id='comments-edit-done' class='comments-edit-done'>"+t["done"]+"</div>              </div>              <div id='search-container' class='search-container'>                  <div id='search-close' class='search-close'>"+t["close search"]+"</div>                  <p class='search-count'><span id='search-count'></span>&nbsp;"+t["matches found"]+"                      Showing <span id='search-offset-start'></span>-<span id='search-offset-end'></span></p>                  <div id='search-results-container' class='search-results-container'>                      <div class='search-result'>                          <span class='pw'><b>"+t["white"]+"</b></span>                          <span class='pb'><b>"+t["black"]+"</b></span>                          <span class='re'><b>"+t["result"]+"</b></span>                          <span class='dt'><b>"+t["date"]+"</b></span>                          <div class='clear'></div>                      </div>                      <div id='search-results' class='search-results'></div>                  </div>              </div>              <div id='options' class='options'>                  "+(this.saveUrl?"<a id='option-save' class='option-save' href='#'>"+t["save to server"]+"</a>":"")+"                  "+(this.downloadUrl||_c?"<a id='option-download' class='option-download' href='#'>"+t["download sgf"]+"</a>":"")+"                  <div class='options-stop'></div>              </div>              <div id='preferences' class='preferences'>                  <div><input type='checkbox'> Show variations on board</div>                  <div><input type='checkbox'> Mark current move</div>              </div>            </div>            <div class='column column-margin'>              <div id='nav-tree-container' class='nav-tree-container'>              </div>            </div>            <div id='footer' class='footer'></div>            <div id='shade' class='shade'></div>        ";
_166=_166.replace(/ id='([^']+)'/g," id='$1-"+this.uniq+"'");
this.dom.player.html(_166);
var re=/ id='([^']+)-\d+'/g;
var _168;
var id;
var _16a;
while(_168=re.exec(_166)){
id=_168[0].replace(/'/g,"").replace(/ id=/,"");
_16a="";
_168[1].split("-").forEach(function(word,i){
word=i?word.charAt(0).toUpperCase()+word.substring(1):word;
_16a+=word;
});
this.dom[_16a]=this.dom.player.find("#"+id)[0];
}
[["moveNumber","setPermalink"],["controlFirst","first"],["controlBack","back"],["controlForward","forward"],["controlLast","last"],["controlPass","pass"],["scoreEst","fetchScoreEstimate"],["searchButton","searchRegion"],["searchResults","loadSearchResult"],["searchClose","closeSearch"],["optionDownload","downloadSgf"],["optionSave","save"],["commentsEditDone","finishEditComment"],["gameInfoEditDone","finishEditGameInfo"]].forEach(function(eh){
if(this.dom[eh[0]]){
_5(this.dom[eh[0]],this[eh[1]],this);
}
}.bind(this));
_4(this.dom.toolsSelect,"change",function(e){
this.selectTool.apply(this,[(e.target||e.srcElement).value]);
},this,true);
},enableNavSlider:function(){
if(this.progressiveLoad){
_b(this.dom.navSliderThumb);
return;
}
this.dom.navSlider.style.cursor="pointer";
var _16f=false;
var _170=null;
_4(this.dom.navSlider,"mousedown",function(e){
_16f=true;
_7(e);
},this,true);
_4(document,"mousemove",function(e){
if(!_16f){
return;
}
var xy=_6(e,this.dom.navSlider);
clearTimeout(_170);
_170=setTimeout(function(){
this.updateNavSlider(xy[0]);
}.bind(this),10);
_7(e);
},this,true);
_4(document,"mouseup",function(e){
if(!_16f){
return true;
}
_16f=false;
var xy=_6(e,this.dom.navSlider);
this.updateNavSlider(xy[0]);
return true;
},this,true);
},updateNavSlider:function(_176){
var _177=this.dom.navSlider.offsetWidth-this.dom.navSliderThumb.offsetHeight;
var _178=this.totalMoves;
var _179=!!_176;
_176=_176||(this.moveNumber/_178*_177);
_176=_176>_177?_177:_176;
_176=_176<0?0:_176;
var _17a=parseInt(_176/_177*_178,10);
if(_179){
this.nowLoading();
var _17b=_17a-this.cursor.getMoveNumber();
for(var i=0;i<Math.abs(_17b);i++){
if(_17b>0){
this.variation(null,true);
}else{
if(_17b<0){
this.cursor.previous();
}
}
}
if(_17b<0){
this.board.revert(Math.abs(_17b));
}
this.doneLoading();
this.refresh();
}
_176=parseInt(_17a/_178*_177,10)||0;
this.dom.navSliderThumb.style.left=_176+"px";
},onNavTreeClick:function(path){
this.goTo(path,true);
},onTargetLeafChange:function(_17e){
this._targetLeaf=_17e;
this.execNode();
},resetLastLabels:function(){
this.labelLastNumber=1;
this.labelLastLetter="A";
},getGameDescription:function(_17f){
var root=this.cursor.getGameRoot();
if(!root){
return;
}
var desc=(_17f?"":root.GN||this.gameName);
if(root.PW&&root.PB){
var wr=root.WR?" "+root.WR:"";
var br=root.BR?" "+root.BR:"";
desc+=(desc.length?" - ":"")+root.PW+wr+" vs "+root.PB+br;
}
return desc;
},sgfCoordToPoint:function(_184){
if(!_184||_184=="tt"){
return {x:null,y:null};
}
var _185={a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9,k:10,l:11,m:12,n:13,o:14,p:15,q:16,r:17,s:18};
return {x:_185[_184.charAt(0)],y:_185[_184.charAt(1)]};
},pointToSgfCoord:function(pt){
if(!pt||(this.board&&!this.boundsCheck(pt.x,pt.y,[0,this.board.boardSize-1]))){
return null;
}
var pts={0:"a",1:"b",2:"c",3:"d",4:"e",5:"f",6:"g",7:"h",8:"i",9:"j",10:"k",11:"l",12:"m",13:"n",14:"o",15:"p",16:"q",17:"r",18:"s"};
return pts[pt.x]+pts[pt.y];
},expandCompressedPoints:function(_188){
var _189;
var ul,lr,_18c;
var x,y;
var _18f=[];
var hits=[];
for(var i=0;i<_188.length;i++){
_189=_188[i].split(/:/);
if(_189.length>2){
ul=this.sgfCoordToPoint(_189[0]);
lr=this.sgfCoordToPoint(_189[1]);
_18c=this.sgfCoordToPoint(_189[2]);
for(x=ul.x;x<=lr.x;x++){
for(y=ul.y;y<=lr.y;y++){
_18f.push(this.pointToSgfCoord({x:x,y:y})+":"+_18c);
}
}
hits.push(i);
}
}
_188=_188.concat(_18f);
return _188;
},setPermalink:function(){
if(!this.permalinkable){
return true;
}
if(this.unsavedChanges){
alert(t["unsaved changes"]);
return;
}
this.hook("setPermalink");
},nowLoading:function(msg){
if(this.croaked||this.problemMode){
return;
}
msg=msg||t["loading"]+"...";
if(_2("eidogo-loading-"+this.uniq)){
return;
}
this.domLoading=$("<div>");
this.domLoading.attr({id:"eidogo-loading-"+this.uniq,"class":"eidogo-loading"+(this.theme?" theme-"+this.theme:"")});
this.domLoading.html(msg);
this.dom.player.append(this.domLoading);
},doneLoading:function(){
if(this.domLoading){
this.domLoading.remove();
this.domLoading=null;
}
},croak:function(msg){
this.doneLoading();
if(this.board){
alert(msg);
}else{
if(this.problemMode){
this.prependComment(msg);
}else{
this.dom.player.append($("<div class='eidogo-error "+(this.theme?" theme-"+this.theme:"")+"'>"+msg.replace(/\n/g,"<br />")+"</div>"));
this.croaked=true;
}
}
}};
})();

(function(){
var _1=window.eidogoConfig||{};
var _2={theme:"problem",problemMode:true,markVariations:false,markNext:false,shrinkToFit:true};
var _3=eidogo.util.getPlayerPath();
var _4=eidogo.playerPath=(_1.playerPath||_3||"player").replace(/\/$/,"");
if(!_1.skipCss){
eidogo.util.addStyleSheet(_4+"/css/player.css");
if(eidogo.browser.ie&&parseInt(eidogo.browser.ver,10)<=6){
eidogo.util.addStyleSheet(_4+"/css/player-ie6.css");
}
}
eidogo.util.addEvent(window,"load",function(){
eidogo.autoPlayers=[];
var _5=[];
var _6=document.getElementsByTagName("div");
var _7=_6.length;
for(var i=0;i<_7;i++){
if(eidogo.util.hasClass(_6[i],"eidogo-player-auto")||eidogo.util.hasClass(_6[i],"eidogo-player-problem")){
_5.push(_6[i]);
}
}
var el;
for(var i=0;el=_5[i];i++){
var _a={container:el,enableShortcuts:false,theme:"compact"};
if(eidogo.util.hasClass(el,"eidogo-player-problem")){
for(var _b in _2){
_a[_b]=_2[_b];
}
}
for(var _b in _1){
_a[_b]=_1[_b];
}
var _c=el.getAttribute("sgf");
if(_c){
_a.sgfUrl=_c;
}else{
if(el.innerHTML){
_a.sgf=el.innerHTML;
}
}
var _d=el.getAttribute("shrink");
if(_d){
_a.shrinkToFit=(_d=="no"?false:true);
}
el.innerHTML="";
eidogo.util.show(el);
var _e=new eidogo.Player(_a);
eidogo.autoPlayers.push(_e);
}
});
})();

