(()=>{var Hi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Gi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},uu=0,el=1,fu=2;var Wr=1,du=2,js=3,Qn=0,zt=1,un=2,os=0,Ks=1,tl=2,nl=3,il=4,pu=5;var cs=100,mu=101,gu=102,_u=103,bu=104,xu=200,vu=201,yu=202,Su=203,sl=204,rl=205,Mu=206,Eu=207,wu=208,Tu=209,Au=210,Ru=211,Cu=212,Pu=213,Iu=214,qa=0,Xa=1,ja=2,Ls=3,Ka=4,Ya=5,Ja=6,Za=7,go=0,Du=1,Lu=2,Pn=0,al=1,ol=2,cl=3,qr=4,ll=5,Xr=6,ls=7,Gc="attached",Nu="detached",hl=300,hs=301,Ys=302,us=303,_o=304,Fi=1e3,pn=1001,Ns=1002,Lt=1003,bo=1004;var fs=1005;var _t=1006,Js=1007;var Tn=1008;var _n=1009,ul=1010,fl=1011,Zs=1012,xo=1013,kn=1014,Nt=1015,Ft=1016,vo=1017,yo=1018,ds=1020,dl=35902,pl=35899,ml=1021,gl=1022,Ut=1023,pi=1026,Mi=1027,Ei=1028,So=1029,bn=1030,Mo=1031;var Eo=1033,jr=33776,Kr=33777,Yr=33778,Jr=33779,wo=35840,To=35841,Ao=35842,Ro=35843,Co=36196,Po=37492,Io=37496,Do=37488,Lo=37489,Zr=37490,No=37491,Fo=37808,Uo=37809,Oo=37810,Bo=37811,ko=37812,zo=37813,Ho=37814,Go=37815,Vo=37816,Wo=37817,qo=37818,Xo=37819,jo=37820,Ko=37821,Yo=36492,Jo=36494,Zo=36495,$o=36283,Qo=36284,$r=36285,ec=36286;var Qi=2300,es=2301,Va=2302,Vc=2303,Wc=2400,qc=2401,Xc=2402,Fu=2500;var _l=0,Qr=1,$s=2,Uu=3200;var ea=0,Ou=1,wi="",Rt="srgb",Mt="srgb-linear",yr="linear",pt="srgb";var Wa=7680;var Bu=519,ku=512,zu=513,Hu=514,bl=515,Gu=516,Vu=517,xl=518,vl=519,yl=35044;var Sl="300 es",Cn=2e3,Fs=2001;function td(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function nd(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Wu(){let i=Us("canvas");return i.style.display="block",i}var wh={},Os=null;function Sr(...i){let e="THREE."+i.shift();Os?Os("log",e,...i):console.log(e,...i)}function qu(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Be(...i){i=qu(i);let e="THREE."+i.shift();if(Os)Os("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=qu(i);let e="THREE."+i.shift();if(Os)Os("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function $i(...i){let e=i.join(" ");e in wh||(wh[e]=!0,Be(...i))}function Xu(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var ju={[qa]:qa,[ja]:Ja,[Ka]:Ka,[Ls]:Ya,[Xa]:Xa,[Ja]:ja,[Za]:Za,[Ya]:Ls},On=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Th=1234567,xr=Math.PI/180,ts=180/Math.PI;function ei(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function Ml(i,e){return(i%e+e)%e}function id(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function sd(i,e,t){return i!==e?(t-i)/(e-i):0}function vr(i,e,t){return(1-t)*i+t*e}function rd(i,e,t,n){return vr(i,e,1-Math.exp(-t*n))}function ad(i,e=1){return e-Math.abs(Ml(i,e*2)-e)}function od(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function cd(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function ld(i,e){return i+Math.floor(Math.random()*(e-i+1))}function hd(i,e){return i+Math.random()*(e-i)}function ud(i){return i*(.5-Math.random())}function fd(i){i!==void 0&&(Th=i);let e=Th+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dd(i){return i*xr}function pd(i){return i*ts}function md(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function gd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function El(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function _d(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),f=r((e-n)/2),d=a((e-n)/2),m=r((n-e)/2),x=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*f,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*f,o*l);break;case"ZXZ":i.set(c*f,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*x,c*m,o*l);break;case"YXY":i.set(c*m,o*u,c*x,o*l);break;case"ZYZ":i.set(c*x,c*m,o*u,o*l);break;default:Be("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function tc(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function wl(i,e){if(e.constructor===Float32Array)return i;let t=tc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function Tl(i,e){if(e.constructor===Float32Array)return i;let t=tc(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var Vi={DEG2RAD:xr,RAD2DEG:ts,generateUUID:ei,clamp:st,euclideanModulo:Ml,mapLinear:id,inverseLerp:sd,lerp:vr,damp:rd,pingpong:ad,smoothstep:od,smootherstep:cd,randInt:ld,randFloat:hd,randFloatSpread:ud,seededRandom:fd,degToRad:dd,radToDeg:pd,isPowerOfTwo:md,ceilPowerOfTwo:gd,floorPowerOfTwo:El,setQuaternionFromProperEuler:_d,normalize:Tl,denormalize:wl},Xe=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],f=n[s+3],d=r[a+0],m=r[a+1],x=r[a+2],w=r[a+3];if(f!==w||c!==d||l!==m||u!==x){let b=c*d+l*m+u*x+f*w;b<0&&(d=-d,m=-m,x=-x,w=-w,b=-b);let g=1-o;if(b<.9995){let S=Math.acos(b),R=Math.sin(S);g=Math.sin(g*S)/R,o=Math.sin(o*S)/R,c=c*g+d*o,l=l*g+m*o,u=u*g+x*o,f=f*g+w*o}else{c=c*g+d*o,l=l*g+m*o,u=u*g+x*o,f=f*g+w*o;let S=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=S,l*=S,u*=S,f*=S}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],f=r[a],d=r[a+1],m=r[a+2],x=r[a+3];return e[t]=o*x+u*f+c*m-l*d,e[t+1]=c*x+u*d+l*f-o*m,e[t+2]=l*x+u*m+o*d-c*f,e[t+3]=u*x-o*f-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),f=o(r/2),d=c(n/2),m=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=d*u*f+l*m*x,this._y=l*m*f-d*u*x,this._z=l*u*x+d*m*f,this._w=l*u*f-d*m*x;break;case"YXZ":this._x=d*u*f+l*m*x,this._y=l*m*f-d*u*x,this._z=l*u*x-d*m*f,this._w=l*u*f+d*m*x;break;case"ZXY":this._x=d*u*f-l*m*x,this._y=l*m*f+d*u*x,this._z=l*u*x+d*m*f,this._w=l*u*f-d*m*x;break;case"ZYX":this._x=d*u*f-l*m*x,this._y=l*m*f+d*u*x,this._z=l*u*x-d*m*f,this._w=l*u*f+d*m*x;break;case"YZX":this._x=d*u*f+l*m*x,this._y=l*m*f+d*u*x,this._z=l*u*x-d*m*f,this._w=l*u*f-d*m*x;break;case"XZY":this._x=d*u*f-l*m*x,this._y=l*m*f-d*u*x,this._z=l*u*x+d*m*f,this._w=l*u*f+d*m*x;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=n+o+f;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>f){let m=2*Math.sqrt(1+n-o-f);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>f){let m=2*Math.sqrt(1+o-n-f);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{let m=2*Math.sqrt(1+f-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ah.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ah.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),f=2*(r*n-a*t);return this.x=t+c*l+a*f-o*u,this.y=n+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return bc.copy(this).projectOnVector(e),this.sub(bc)}reflect(e){return this.sub(bc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},bc=new V,Ah=new Qt,Ze=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],f=n[7],d=n[2],m=n[5],x=n[8],w=s[0],b=s[3],g=s[6],S=s[1],R=s[4],T=s[7],P=s[2],I=s[5],v=s[8];return r[0]=a*w+o*S+c*P,r[3]=a*b+o*R+c*I,r[6]=a*g+o*T+c*v,r[1]=l*w+u*S+f*P,r[4]=l*b+u*R+f*I,r[7]=l*g+u*T+f*v,r[2]=d*w+m*S+x*P,r[5]=d*b+m*R+x*I,r[8]=d*g+m*T+x*v,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*c-u*r,m=l*r-a*c,x=t*f+n*d+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let w=1/x;return e[0]=f*w,e[1]=(s*l-u*n)*w,e[2]=(o*n-s*a)*w,e[3]=d*w,e[4]=(u*t-s*c)*w,e[5]=(s*r-o*t)*w,e[6]=m*w,e[7]=(n*c-l*t)*w,e[8]=(a*t-n*r)*w,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return $i("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xc.makeScale(e,t)),this}rotate(e){return $i("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xc.makeRotation(-e)),this}translate(e,t){return $i("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},xc=new Ze,Rh=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ch=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bd(){let i={enabled:!0,workingColorSpace:Mt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pt&&(s.r=di(s.r),s.g=di(s.g),s.b=di(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pt&&(s.r=Ds(s.r),s.g=Ds(s.g),s.b=Ds(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wi?yr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Mt]:{primaries:e,whitePoint:n,transfer:yr,toXYZ:Rh,fromXYZ:Ch,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Rt},outputColorSpaceConfig:{drawingBufferColorSpace:Rt}},[Rt]:{primaries:e,whitePoint:n,transfer:pt,toXYZ:Rh,fromXYZ:Ch,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Rt}}}),i}var it=bd();function di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ds(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var bs,$a=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{bs===void 0&&(bs=Us("canvas")),bs.width=e.width,bs.height=e.height;let s=bs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Us("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=di(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(di(t[n]/255)*255):t[n]=di(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},xd=0,Bs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(vc(s[a].image)):r.push(vc(s[a]))}else r=vc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function vc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$a.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}var vd=0,yc=new V,Kt=class i extends On{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=pn,s=pn,r=_t,a=Tn,o=Ut,c=_n,l=i.DEFAULT_ANISOTROPY,u=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=ei(),this.name="",this.source=new Bs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(yc).x}get height(){return this.source.getSize(yc).y}get depth(){return this.source.getSize(yc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==hl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fi:e.x=e.x-Math.floor(e.x);break;case pn:e.x=e.x<0?0:1;break;case Ns:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fi:e.y=e.y-Math.floor(e.y);break;case pn:e.y=e.y<0?0:1;break;case Ns:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=hl;Kt.DEFAULT_ANISOTROPY=1;var bt=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],m=c[5],x=c[9],w=c[2],b=c[6],g=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-w)<.01&&Math.abs(x-b)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+w)<.1&&Math.abs(x+b)<.1&&Math.abs(l+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let R=(l+1)/2,T=(m+1)/2,P=(g+1)/2,I=(u+d)/4,v=(f+w)/4,E=(x+b)/4;return R>T&&R>P?R<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(R),s=I/n,r=v/n):T>P?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=I/s,r=E/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=v/r,s=E/r),this.set(n,s,r,t),this}let S=Math.sqrt((b-x)*(b-x)+(f-w)*(f-w)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(b-x)/S,this.y=(f-w)/S,this.z=(d-u)/S,this.w=Math.acos((l+m+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qa=class extends On{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_t,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Kt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:_t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Bs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mn=class extends Qa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Mr=class extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var eo=class extends Kt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Qe=class i{static{this.prototype.isMatrix4=!0}constructor(e,t,n,s,r,a,o,c,l,u,f,d,m,x,w,b){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,f,d,m,x,w,b)}set(e,t,n,s,r,a,o,c,l,u,f,d,m,x,w,b){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=c,g[2]=l,g[6]=u,g[10]=f,g[14]=d,g[3]=m,g[7]=x,g[11]=w,g[15]=b,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/xs.setFromMatrixColumn(e,0).length(),r=1/xs.setFromMatrixColumn(e,1).length(),a=1/xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let d=a*u,m=a*f,x=o*u,w=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=m+x*l,t[5]=d-w*l,t[9]=-o*c,t[2]=w-d*l,t[6]=x+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*u,m=c*f,x=l*u,w=l*f;t[0]=d+w*o,t[4]=x*o-m,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=m*o-x,t[6]=w+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*u,m=c*f,x=l*u,w=l*f;t[0]=d-w*o,t[4]=-a*f,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*u,t[9]=w-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*u,m=a*f,x=o*u,w=o*f;t[0]=c*u,t[4]=x*l-m,t[8]=d*l+w,t[1]=c*f,t[5]=w*l+d,t[9]=m*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,x=o*c,w=o*l;t[0]=c*u,t[4]=w-d*f,t[8]=x*f+m,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*f+x,t[10]=d-w*f}else if(e.order==="XZY"){let d=a*c,m=a*l,x=o*c,w=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+w,t[5]=a*u,t[9]=m*f-x,t[2]=x*f-m,t[6]=o*u,t[10]=w*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yd,e,Sd)}lookAt(e,t,n){let s=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Ri.crossVectors(n,vn),Ri.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Ri.crossVectors(n,vn)),Ri.normalize(),ba.crossVectors(vn,Ri),s[0]=Ri.x,s[4]=ba.x,s[8]=vn.x,s[1]=Ri.y,s[5]=ba.y,s[9]=vn.y,s[2]=Ri.z,s[6]=ba.z,s[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],f=n[5],d=n[9],m=n[13],x=n[2],w=n[6],b=n[10],g=n[14],S=n[3],R=n[7],T=n[11],P=n[15],I=s[0],v=s[4],E=s[8],B=s[12],F=s[1],O=s[5],q=s[9],Y=s[13],N=s[2],K=s[6],j=s[10],J=s[14],de=s[3],Z=s[7],ae=s[11],he=s[15];return r[0]=a*I+o*F+c*N+l*de,r[4]=a*v+o*O+c*K+l*Z,r[8]=a*E+o*q+c*j+l*ae,r[12]=a*B+o*Y+c*J+l*he,r[1]=u*I+f*F+d*N+m*de,r[5]=u*v+f*O+d*K+m*Z,r[9]=u*E+f*q+d*j+m*ae,r[13]=u*B+f*Y+d*J+m*he,r[2]=x*I+w*F+b*N+g*de,r[6]=x*v+w*O+b*K+g*Z,r[10]=x*E+w*q+b*j+g*ae,r[14]=x*B+w*Y+b*J+g*he,r[3]=S*I+R*F+T*N+P*de,r[7]=S*v+R*O+T*K+P*Z,r[11]=S*E+R*q+T*j+P*ae,r[15]=S*B+R*Y+T*J+P*he,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],m=e[14],x=e[3],w=e[7],b=e[11],g=e[15],S=c*m-l*d,R=o*m-l*f,T=o*d-c*f,P=a*m-l*u,I=a*d-c*u,v=a*f-o*u;return t*(w*S-b*R+g*T)-n*(x*S-b*P+g*I)+s*(x*R-w*P+g*v)-r*(x*T-w*I+b*v)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(r*u-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],m=e[11],x=e[12],w=e[13],b=e[14],g=e[15],S=t*o-n*a,R=t*c-s*a,T=t*l-r*a,P=n*c-s*o,I=n*l-r*o,v=s*l-r*c,E=u*w-f*x,B=u*b-d*x,F=u*g-m*x,O=f*b-d*w,q=f*g-m*w,Y=d*g-m*b,N=S*Y-R*q+T*O+P*F-I*B+v*E;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let K=1/N;return e[0]=(o*Y-c*q+l*O)*K,e[1]=(s*q-n*Y-r*O)*K,e[2]=(w*v-b*I+g*P)*K,e[3]=(d*I-f*v-m*P)*K,e[4]=(c*F-a*Y-l*B)*K,e[5]=(t*Y-s*F+r*B)*K,e[6]=(b*T-x*v-g*R)*K,e[7]=(u*v-d*T+m*R)*K,e[8]=(a*q-o*F+l*E)*K,e[9]=(n*F-t*q-r*E)*K,e[10]=(x*I-w*T+g*S)*K,e[11]=(f*T-u*I-m*S)*K,e[12]=(o*B-a*O-c*E)*K,e[13]=(t*O-n*B+s*E)*K,e[14]=(w*R-x*P-b*S)*K,e[15]=(u*P-f*R+d*S)*K,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,f=o+o,d=r*l,m=r*u,x=r*f,w=a*u,b=a*f,g=o*f,S=c*l,R=c*u,T=c*f,P=n.x,I=n.y,v=n.z;return s[0]=(1-(w+g))*P,s[1]=(m+T)*P,s[2]=(x-R)*P,s[3]=0,s[4]=(m-T)*I,s[5]=(1-(d+g))*I,s[6]=(b+S)*I,s[7]=0,s[8]=(x+R)*v,s[9]=(b-S)*v,s[10]=(1-(d+w))*v,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=xs.set(s[0],s[1],s[2]).length(),o=xs.set(s[4],s[5],s[6]).length(),c=xs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Ln.copy(this);let l=1/a,u=1/o,f=1/c;return Ln.elements[0]*=l,Ln.elements[1]*=l,Ln.elements[2]*=l,Ln.elements[4]*=u,Ln.elements[5]*=u,Ln.elements[6]*=u,Ln.elements[8]*=f,Ln.elements[9]*=f,Ln.elements[10]*=f,t.setFromRotationMatrix(Ln),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Cn,c=!1){let l=this.elements,u=2*r/(t-e),f=2*r/(n-s),d=(t+e)/(t-e),m=(n+s)/(n-s),x,w;if(c)x=r/(a-r),w=a*r/(a-r);else if(o===Cn)x=-(a+r)/(a-r),w=-2*a*r/(a-r);else if(o===Fs)x=-a/(a-r),w=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=w,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Cn,c=!1){let l=this.elements,u=2/(t-e),f=2/(n-s),d=-(t+e)/(t-e),m=-(n+s)/(n-s),x,w;if(c)x=1/(a-r),w=a/(a-r);else if(o===Cn)x=-2/(a-r),w=-(a+r)/(a-r);else if(o===Fs)x=-1/(a-r),w=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=w,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},xs=new V,Ln=new Qe,yd=new V(0,0,0),Sd=new V(1,1,1),Ri=new V,ba=new V,vn=new V,Ph=new Qe,Ih=new Qt,jn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],d=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-st(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ph.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ph,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ih.setFromEuler(this),this.setFromQuaternion(Ih,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};jn.DEFAULT_ORDER="XYZ";var Er=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Md=0,Dh=new V,vs=new Qt,ai=new Qe,xa=new V,hr=new V,Ed=new V,wd=new Qt,Lh=new V(1,0,0),Nh=new V(0,1,0),Fh=new V(0,0,1),Uh={type:"added"},Td={type:"removed"},ys={type:"childadded",child:null},Sc={type:"childremoved",child:null},Et=class i extends On{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new V,t=new jn,n=new Qt,s=new V(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qe},normalMatrix:{value:new Ze}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Er,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vs.setFromAxisAngle(e,t),this.quaternion.multiply(vs),this}rotateOnWorldAxis(e,t){return vs.setFromAxisAngle(e,t),this.quaternion.premultiply(vs),this}rotateX(e){return this.rotateOnAxis(Lh,e)}rotateY(e){return this.rotateOnAxis(Nh,e)}rotateZ(e){return this.rotateOnAxis(Fh,e)}translateOnAxis(e,t){return Dh.copy(e).applyQuaternion(this.quaternion),this.position.add(Dh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Lh,e)}translateY(e){return this.translateOnAxis(Nh,e)}translateZ(e){return this.translateOnAxis(Fh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xa.copy(e):xa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),hr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(hr,xa,this.up):ai.lookAt(xa,hr,this.up),this.quaternion.setFromRotationMatrix(ai),s&&(ai.extractRotation(s.matrixWorld),vs.setFromRotationMatrix(ai),this.quaternion.premultiply(vs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Uh),ys.child=e,this.dispatchEvent(ys),ys.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Td),Sc.child=e,this.dispatchEvent(Sc),Sc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Uh),ys.child=e,this.dispatchEvent(ys),ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,e,Ed),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hr,wd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Et.DEFAULT_UP=new V(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Un=class extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ad={type:"move"},ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let w of e.hand.values()){let b=t.getJointPose(w,n),g=this._getHandJoint(l,w);b!==null&&(g.matrix.fromArray(b.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=b.radius),g.visible=b!==null}let u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),m=.02,x=.005;l.inputState.pinching&&d>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ad)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Un;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Ku={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},va={h:0,s:0,l:0};function Mc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ue=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=Ml(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Mc(a,r,e+1/3),this.g=Mc(a,r,e),this.b=Mc(a,r,e-1/3)}return it.colorSpaceToWorking(this,s),this}setStyle(e,t=Rt){function n(r){r!==void 0&&parseFloat(r)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rt){let n=Ku[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=Ds(e.r),this.g=Ds(e.g),this.b=Ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rt){return it.workingToColorSpace($t.copy(this),e),Math.round(st($t.r*255,0,255))*65536+Math.round(st($t.g*255,0,255))*256+Math.round(st($t.b*255,0,255))}getHexString(e=Rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace($t.copy(this),t);let n=$t.r,s=$t.g,r=$t.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case n:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-n)/f+2;break;case r:c=(n-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Rt){it.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,s=$t.b;return e!==Rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ci),this.setHSL(Ci.h+e,Ci.s+t,Ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ci),e.getHSL(va);let n=vr(Ci.h,va.h,t),s=vr(Ci.s,va.s,t),r=vr(Ci.l,va.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ue;Ue.NAMES=Ku;var Kn=class extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jn,this.environmentIntensity=1,this.environmentRotation=new jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Nn=new V,oi=new V,Ec=new V,ci=new V,Ss=new V,Ms=new V,Oh=new V,wc=new V,Tc=new V,Ac=new V,Rc=new bt,Cc=new bt,Pc=new bt,Ni=class i{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Nn.subVectors(e,t),s.cross(Nn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Nn.subVectors(s,t),oi.subVectors(n,t),Ec.subVectors(e,t);let a=Nn.dot(Nn),o=Nn.dot(oi),c=Nn.dot(Ec),l=oi.dot(oi),u=oi.dot(Ec),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;let d=1/f,m=(l*c-o*u)*d,x=(a*u-o*c)*d;return r.set(1-m-x,x,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ci)===null?!1:ci.x>=0&&ci.y>=0&&ci.x+ci.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,ci)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ci.x),c.addScaledVector(a,ci.y),c.addScaledVector(o,ci.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Rc.setScalar(0),Cc.setScalar(0),Pc.setScalar(0),Rc.fromBufferAttribute(e,t),Cc.fromBufferAttribute(e,n),Pc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Rc,r.x),a.addScaledVector(Cc,r.y),a.addScaledVector(Pc,r.z),a}static isFrontFacing(e,t,n,s){return Nn.subVectors(n,t),oi.subVectors(e,t),Nn.cross(oi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Nn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Ss.subVectors(s,n),Ms.subVectors(r,n),wc.subVectors(e,n);let c=Ss.dot(wc),l=Ms.dot(wc);if(c<=0&&l<=0)return t.copy(n);Tc.subVectors(e,s);let u=Ss.dot(Tc),f=Ms.dot(Tc);if(u>=0&&f<=u)return t.copy(s);let d=c*f-u*l;if(d<=0&&c>=0&&u<=0&&c-u>0)return a=c/(c-u),t.copy(n).addScaledVector(Ss,a);Ac.subVectors(e,r);let m=Ss.dot(Ac),x=Ms.dot(Ac);if(x>=0&&m<=x)return t.copy(r);let w=m*l-c*x;if(w<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(Ms,o);let b=u*x-m*f;if(b<=0&&f-u>=0&&m-x>=0)return Oh.subVectors(r,s),o=(f-u)/(f-u+(m-x)),t.copy(s).addScaledVector(Oh,o);let g=1/(b+w+d);return a=w*g,o=d*g,t.copy(n).addScaledVector(Ss,a).addScaledVector(Ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Yt=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Fn):Fn.fromBufferAttribute(r,a),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ya.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ya.copy(n.boundingBox)),ya.applyMatrix4(e.matrixWorld),this.union(ya)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ur),Sa.subVectors(this.max,ur),Es.subVectors(e.a,ur),ws.subVectors(e.b,ur),Ts.subVectors(e.c,ur),Pi.subVectors(ws,Es),Ii.subVectors(Ts,ws),Ki.subVectors(Es,Ts);let t=[0,-Pi.z,Pi.y,0,-Ii.z,Ii.y,0,-Ki.z,Ki.y,Pi.z,0,-Pi.x,Ii.z,0,-Ii.x,Ki.z,0,-Ki.x,-Pi.y,Pi.x,0,-Ii.y,Ii.x,0,-Ki.y,Ki.x,0];return!Ic(t,Es,ws,Ts,Sa)||(t=[1,0,0,0,1,0,0,0,1],!Ic(t,Es,ws,Ts,Sa))?!1:(Ma.crossVectors(Pi,Ii),t=[Ma.x,Ma.y,Ma.z],Ic(t,Es,ws,Ts,Sa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},li=[new V,new V,new V,new V,new V,new V,new V,new V],Fn=new V,ya=new Yt,Es=new V,ws=new V,Ts=new V,Pi=new V,Ii=new V,Ki=new V,ur=new V,Sa=new V,Ma=new V,Yi=new V;function Ic(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Yi.fromArray(i,r);let o=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),c=e.dot(Yi),l=t.dot(Yi),u=n.dot(Yi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var fi=Rd();function Rd(){let i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[c|256]=32768,s[c]=24,s[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,s[c]=-l-1,s[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,s[c]=13,s[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,s[c]=24,s[c|256]=24):(n[c]=31744,n[c|256]=64512,s[c]=13,s[c|256]=13)}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,u=0;for(;(l&8388608)===0;)l<<=1,u-=8388608;l&=-8388609,u+=947912704,r[c]=l|u}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)a[c]=c<<23;a[31]=1199570944,a[32]=2147483648;for(let c=33;c<63;++c)a[c]=2147483648+(c-32<<23);a[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(o[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function Cd(i){Math.abs(i)>65504&&Be("DataUtils.toHalfFloat(): Value out of range."),i=st(i,-65504,65504),fi.floatView[0]=i;let e=fi.uint32View[0],t=e>>23&511;return fi.baseTable[t]+((e&8388607)>>fi.shiftTable[t])}function Pd(i){let e=i>>10;return fi.uint32View[0]=fi.mantissaTable[fi.offsetTable[e]+(i&1023)]+fi.exponentTable[e],fi.floatView[0]}var xe=class{static toHalfFloat(e){return Cd(e)}static fromHalfFloat(e){return Pd(e)}},Bt=new V,Ea=new Xe,Id=0,kt=class extends On{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Id++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=yl,this.updateRanges=[],this.gpuType=Nt,this.version=0,this._normalizationScale=e!==void 0?tc(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ea.fromBufferAttribute(this,t),Ea.applyMatrix3(e),this.setXY(t,Ea.x,Ea.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):wl(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Tl(e,this.array)}};var wr=class extends kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Tr=class extends kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var on=class extends kt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Dd=new Yt,fr=new V,Dc=new V,mn=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Dd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fr.subVectors(e,this.center);let t=fr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(fr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fr.copy(e.center).add(Dc)),this.expandByPoint(fr.copy(e.center).sub(Dc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Ld=0,Rn=new Qe,Lc=new Et,As=new V,yn=new Yt,dr=new Yt,jt=new V,en=class i extends On{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ld++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(td(e)?Tr:wr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,n){return Rn.makeTranslation(e,t,n),this.applyMatrix4(Rn),this}scale(e,t,n){return Rn.makeScale(e,t,n),this.applyMatrix4(Rn),this}lookAt(e){return Lc.lookAt(e),Lc.updateMatrix(),this.applyMatrix4(Lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new on(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){let n=this.boundingSphere.center;if(yn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];dr.setFromBufferAttribute(o),this.morphTargetsRelative?(jt.addVectors(yn.min,dr.min),yn.expandByPoint(jt),jt.addVectors(yn.max,dr.max),yn.expandByPoint(jt)):(yn.expandByPoint(dr.min),yn.expandByPoint(dr.max))}yn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(jt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)jt.fromBufferAttribute(o,l),c&&(As.fromBufferAttribute(e,l),jt.add(As)),s=Math.max(s,n.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new kt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(n.count);for(let B=0;B<n.count;B++)o[B]=new V,c[B]=new V;let u=new V,f=new V,d=new V,m=new Xe,x=new Xe,w=new Xe,b=new V,g=new V;function S(B,F,O){l[B]=l[F]=l[O]=1,u.fromBufferAttribute(n,B),f.fromBufferAttribute(n,F),d.fromBufferAttribute(n,O),m.fromBufferAttribute(r,B),x.fromBufferAttribute(r,F),w.fromBufferAttribute(r,O),f.sub(u),d.sub(u),x.sub(m),w.sub(m);let q=1/(x.x*w.y-w.x*x.y);isFinite(q)&&(b.copy(f).multiplyScalar(w.y).addScaledVector(d,-x.y).multiplyScalar(q),g.copy(d).multiplyScalar(x.x).addScaledVector(f,-w.x).multiplyScalar(q),o[B].add(b),o[F].add(b),o[O].add(b),c[B].add(g),c[F].add(g),c[O].add(g))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let B=0,F=R.length;B<F;++B){let O=R[B],q=O.start,Y=O.count;for(let N=q,K=q+Y;N<K;N+=3)S(e.getX(N+0),e.getX(N+1),e.getX(N+2))}let T=new V,P=new V,I=new V,v=new V;function E(B){I.fromBufferAttribute(s,B),v.copy(I);let F=o[B];T.copy(F),T.sub(I.multiplyScalar(I.dot(F))).normalize(),P.crossVectors(v,F);let q=P.dot(c[B])<0?-1:1;a.setXYZW(B,T.x,T.y,T.z,q)}for(let B=0,F=n.count;B<F;++B)l[B]&&E(B);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);let s=new V,r=new V,a=new V,o=new V,c=new V,l=new V,u=new V,f=new V;if(e)for(let d=0,m=e.count;d<m;d+=3){let x=e.getX(d+0),w=e.getX(d+1),b=e.getX(d+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,w),a.fromBufferAttribute(t,b),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,w),l.fromBufferAttribute(n,b),o.add(u),c.add(u),l.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(w,c.x,c.y,c.z),n.setXYZ(b,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(c.length*u),m=0,x=0;for(let w=0,b=c.length;w<b;w++){o.isInterleavedBufferAttribute?m=c[w]*o.data.stride+o.offset:m=c[w]*u;for(let g=0;g<u;g++)d[x++]=l[m++]}return new kt(d,u,f)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){let d=l[u],m=e(d,n);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){let m=l[f];u.push(m.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(t))}let r=e.morphAttributes;for(let l in r){let u=[],f=r[l];for(let d=0,m=f.length;d<m;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ui=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=yl,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Bh(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Bh(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Bh(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=ei()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var an=new V,Oi=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?tc(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyMatrix4(e),this.setXYZ(t,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.applyNormalMatrix(e),this.setXYZ(t,an.x,an.y,an.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)an.fromBufferAttribute(this,t),an.transformDirection(e),this.setXYZ(t,an.x,an.y,an.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Sr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Sr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):wl(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):Tl(e,this.data.array)}},Nc=new V,Nd=new V,Fd=new Ze,Sn=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Nc.subVectors(n,t).cross(Nd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Nc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fd.getNormalMatrix(e),s=this.coplanarPoint(Nc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ud=0,cn=class extends On{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=Ks,this.side=Qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sl,this.blendDst=rl,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Ls,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Wa,this.stencilZFail=Wa,this.stencilZPass=Wa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ue().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Sn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Xe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xe().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var hi=new V,Fc=new V,wa=new V,Ta=new V,mi=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hi.copy(this.origin).addScaledVector(this.direction,t),hi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Fc.copy(e).add(t).multiplyScalar(.5),wa.copy(t).sub(e).normalize(),Ta.copy(this.origin).sub(Fc);let r=e.distanceTo(t)*.5,a=-this.direction.dot(wa),o=Ta.dot(this.direction),c=-Ta.dot(wa),l=Ta.lengthSq(),u=Math.abs(1-a*a),f,d,m,x;if(u>0)if(f=a*c-o,d=a*o-c,x=r*u,f>=0)if(d>=-x)if(d<=x){let w=1/u;f*=w,d*=w,m=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=r,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d=-r,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;else d<=-x?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-c),r),m=-f*f+d*(d+2*c)+l):d<=x?(f=0,d=Math.min(Math.max(-r,-c),r),m=d*(d+2*c)+l):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-c),r),m=-f*f+d*(d+2*c)+l);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),m=-f*f+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Fc).addScaledVector(wa,d),m}intersectSphere(e,t){if(e.radius<0)return null;hi.subVectors(e.center,this.origin);let n=hi.dot(this.direction),s=hi.dot(hi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,hi)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,m=e.z-a.z,x=t.x-a.x,w=t.y-a.y,b=t.z-a.z,g=n.x-a.x,S=n.y-a.y,R=n.z-a.z,T=Math.abs(c),P=Math.abs(l),I=Math.abs(u),v,E,B,F,O,q,Y,N,K,j,J,de;if(T>=P&&T>=I?(B=c,q=f,K=x,de=g,c>=0?(v=l,E=u,F=d,O=m,Y=w,N=b,j=S,J=R):(v=u,E=l,F=m,O=d,Y=b,N=w,j=R,J=S)):P>=I?(B=l,q=d,K=w,de=S,l>=0?(v=u,E=c,F=m,O=f,Y=b,N=x,j=R,J=g):(v=c,E=u,F=f,O=m,Y=x,N=b,j=g,J=R)):(B=u,q=m,K=b,de=R,u>=0?(v=c,E=l,F=f,O=d,Y=x,N=w,j=g,J=S):(v=l,E=c,F=d,O=f,Y=w,N=x,j=S,J=g)),B===0)return null;let Z=v/B,ae=E/B,he=1/B,Te=F-Z*q,Fe=O-ae*q,se=Y-Z*K,we=N-ae*K,Le=j-Z*de,ke=J-ae*de,pe=Le*we-ke*se,We=Te*ke-Fe*Le,mt=se*Fe-we*Te;if(s){if(pe<0||We<0||mt<0)return null}else if((pe<0||We<0||mt<0)&&(pe>0||We>0||mt>0))return null;let Ge=pe+We+mt;if(Ge===0)return null;let ct=he*(pe*q+We*K+mt*de);return(Ge>0?ct<0:ct>0)?null:this.at(ct/Ge,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ln=class extends cn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=go,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},kh=new Qe,Ji=new mi,Aa=new mn,zh=new V,Ra=new V,Ca=new V,Pa=new V,Uc=new V,Ia=new V,Hh=new V,Da=new V,xt=class extends Et{constructor(e=new en,t=new ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ia.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],f=r[c];u!==0&&(Uc.fromBufferAttribute(f,e),a?Ia.addScaledVector(Uc,u):Ia.addScaledVector(Uc.sub(t),u))}t.add(Ia)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Aa.copy(n.boundingSphere),Aa.applyMatrix4(r),Ji.copy(e.ray).recast(e.near),!(Aa.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(Aa,zh)===null||Ji.origin.distanceToSquared(zh)>(e.far-e.near)**2))&&(kh.copy(r).invert(),Ji.copy(e.ray).applyMatrix4(kh),!(n.boundingBox!==null&&Ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ji)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,w=d.length;x<w;x++){let b=d[x],g=a[b.materialIndex],S=Math.max(b.start,m.start),R=Math.min(o.count,Math.min(b.start+b.count,m.start+m.count));for(let T=S,P=R;T<P;T+=3){let I=o.getX(T),v=o.getX(T+1),E=o.getX(T+2);s=La(this,g,e,n,l,u,f,I,v,E),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=b.materialIndex,t.push(s))}}else{let x=Math.max(0,m.start),w=Math.min(o.count,m.start+m.count);for(let b=x,g=w;b<g;b+=3){let S=o.getX(b),R=o.getX(b+1),T=o.getX(b+2);s=La(this,a,e,n,l,u,f,S,R,T),s&&(s.faceIndex=Math.floor(b/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,w=d.length;x<w;x++){let b=d[x],g=a[b.materialIndex],S=Math.max(b.start,m.start),R=Math.min(c.count,Math.min(b.start+b.count,m.start+m.count));for(let T=S,P=R;T<P;T+=3){let I=T,v=T+1,E=T+2;s=La(this,g,e,n,l,u,f,I,v,E),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=b.materialIndex,t.push(s))}}else{let x=Math.max(0,m.start),w=Math.min(c.count,m.start+m.count);for(let b=x,g=w;b<g;b+=3){let S=b,R=b+1,T=b+2;s=La(this,a,e,n,l,u,f,S,R,T),s&&(s.faceIndex=Math.floor(b/3),t.push(s))}}}};function Od(i,e,t,n,s,r,a,o){let c;if(e.side===zt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Qn,o),c===null)return null;Da.copy(o),Da.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Da);return l<t.near||l>t.far?null:{distance:l,point:Da.clone(),object:i}}function La(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Ra),i.getVertexPosition(c,Ca),i.getVertexPosition(l,Pa);let u=Od(i,e,t,n,Ra,Ca,Pa,Hh);if(u){let f=new V;Ni.getBarycoord(Hh,Ra,Ca,Pa,f),s&&(u.uv=Ni.getInterpolatedAttribute(s,o,c,l,f,new Xe)),r&&(u.uv1=Ni.getInterpolatedAttribute(r,o,c,l,f,new Xe)),a&&(u.normal=Ni.getInterpolatedAttribute(a,o,c,l,f,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new V,materialIndex:0};Ni.getNormal(Ra,Ca,Pa,d.normal),u.face=d,u.barycoord=f}return u}var pr=new bt,Gh=new bt,Vh=new bt,Bd=new bt,Wh=new Qe,Na=new V,Oc=new mn,qh=new Qe,Bc=new mi,Ar=class extends xt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Gc,this.bindMatrix=new Qe,this.bindMatrixInverse=new Qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Yt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Na),this.boundingBox.expandByPoint(Na)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Na),this.boundingSphere.expandByPoint(Na)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Oc.copy(this.boundingSphere),Oc.applyMatrix4(s),e.ray.intersectsSphere(Oc)!==!1&&(qh.copy(s).invert(),Bc.copy(e.ray).applyMatrix4(qh),!(this.boundingBox!==null&&Bc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Bc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new bt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Gc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Nu?this.bindMatrixInverse.copy(this.bindMatrix).invert():Be("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Gh.fromBufferAttribute(s.attributes.skinIndex,e),Vh.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(pr.copy(t),t.set(0,0,0,0)):(pr.set(t.x,t.y,t.z,1),t.set(0,0,0)),pr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Vh.getComponent(r);if(a!==0){let o=Gh.getComponent(r);Wh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Bd.copy(pr).applyMatrix4(Wh),a)}}return t.isVector4&&(t.w=pr.w),t.applyMatrix4(this.bindMatrixInverse)}},zs=class extends Et{constructor(){super(),this.isBone=!0,this.type="Bone"}},gi=class extends Kt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Lt,u=Lt,f,d){super(null,a,o,c,l,u,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Xh=new Qe,kd=new Qe,Rr=class i{constructor(e=[],t=[]){this.uuid=ei(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Be("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:kd;Xh.multiplyMatrices(o,t[r]),Xh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new gi(t,e,e,Ut,Nt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Be("Skeleton: No bone found with UUID:",r),a=new zs),this.bones.push(a),this.boneInverses.push(new Qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},_i=class extends kt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Rs=new Qe,jh=new Qe,Fa=[],Kh=new Yt,zd=new Qe,mr=new xt,gr=new mn,ns=class extends xt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new _i(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,zd)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Yt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rs),Kh.copy(e.boundingBox).applyMatrix4(Rs),this.boundingBox.union(Kh)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rs),gr.copy(e.boundingSphere).applyMatrix4(Rs),this.boundingSphere.union(gr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(mr.geometry=this.geometry,mr.material=this.material,mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gr.copy(this.boundingSphere),gr.applyMatrix4(n),e.ray.intersectsSphere(gr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Rs),jh.multiplyMatrices(n,Rs),mr.matrixWorld=jh,mr.raycast(e,Fa);for(let a=0,o=Fa.length;a<o;a++){let c=Fa[a];c.instanceId=r,c.object=this,t.push(c)}Fa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new _i(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new gi(new Float32Array(s*this.count),s,this.count,Ei,Nt));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Zi=new mn,Hd=new Xe(.5,.5),Ua=new V,Bi=class{constructor(e=new Sn,t=new Sn,n=new Sn,s=new Sn,r=new Sn,a=new Sn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],d=r[6],m=r[7],x=r[8],w=r[9],b=r[10],g=r[11],S=r[12],R=r[13],T=r[14],P=r[15];if(s[0].setComponents(l-a,m-u,g-x,P-S).normalize(),s[1].setComponents(l+a,m+u,g+x,P+S).normalize(),s[2].setComponents(l+o,m+f,g+w,P+R).normalize(),s[3].setComponents(l-o,m-f,g-w,P-R).normalize(),n)s[4].setComponents(c,d,b,T).normalize(),s[5].setComponents(l-c,m-d,g-b,P-T).normalize();else if(s[4].setComponents(l-c,m-d,g-b,P-T).normalize(),t===Cn)s[5].setComponents(l+c,m+d,g+b,P+T).normalize();else if(t===Fs)s[5].setComponents(c,d,b,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zi)}intersectsSprite(e){Zi.center.set(0,0,0);let t=Hd.distanceTo(e.center);return Zi.radius=.7071067811865476+t,Zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ua.x=s.normal.x>0?e.max.x:e.min.x,Ua.y=s.normal.y>0?e.max.y:e.min.y,Ua.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ua)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Yh=new Qe,to=class i{constructor(){this.coordinateSystem=Cn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Yh.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Bi),n[s].setFromProjectionMatrix(Yh,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Bi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var Hs=class extends cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},no=new V,io=new V,Jh=new Qe,_r=new mi,Oa=new mn,kc=new V,Zh=new V,is=class extends Et{constructor(e=new en,t=new Hs){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)no.fromBufferAttribute(t,s-1),io.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=no.distanceTo(io);e.setAttribute("lineDistance",new on(n,1))}else Be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oa.copy(n.boundingSphere),Oa.applyMatrix4(s),Oa.radius+=r,e.ray.intersectsSphere(Oa)===!1)return;Jh.copy(s).invert(),_r.copy(e.ray).applyMatrix4(Jh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let w=m,b=x-1;w<b;w+=l){let g=u.getX(w),S=u.getX(w+1),R=Ba(this,e,_r,c,g,S,w);R&&t.push(R)}if(this.isLineLoop){let w=u.getX(x-1),b=u.getX(m),g=Ba(this,e,_r,c,w,b,x-1);g&&t.push(g)}}else{let m=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let w=m,b=x-1;w<b;w+=l){let g=Ba(this,e,_r,c,w,w+1,w);g&&t.push(g)}if(this.isLineLoop){let w=Ba(this,e,_r,c,x-1,m,x-1);w&&t.push(w)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ba(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(no.fromBufferAttribute(o,s),io.fromBufferAttribute(o,r),t.distanceSqToSegment(no,io,kc,Zh)>n)return;kc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(kc);if(!(l<e.near||l>e.far))return{distance:l,point:Zh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var $h=new V,Qh=new V,Cr=class extends is{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)$h.fromBufferAttribute(t,s),Qh.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+$h.distanceTo(Qh);e.setAttribute("lineDistance",new on(n,1))}else Be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Pr=class extends is{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Gs=class extends cn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},eu=new Qe,jc=new mi,ka=new mn,za=new V,Ir=class extends Et{constructor(e=new en,t=new Gs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(s),ka.radius+=r,e.ray.intersectsSphere(ka)===!1)return;eu.copy(s).invert(),jc.copy(e.ray).applyMatrix4(eu);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){let d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let x=d,w=m;x<w;x++){let b=l.getX(x);za.fromBufferAttribute(f,b),tu(za,b,c,s,e,t,this)}}else{let d=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let x=d,w=m;x<w;x++)za.fromBufferAttribute(f,x),tu(za,x,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function tu(i,e,t,n,s,r,a){let o=jc.distanceSqToPoint(i);if(o<t){let c=new V;jc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Dr=class extends Kt{constructor(e=[],t=hs,n,s,r,a,o,c,l,u){super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var bi=class extends Kt{constructor(e,t,n=kn,s,r,a,o=Lt,c=Lt,l,u=pi,f=1){if(u!==pi&&u!==Mi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:f};super(d,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Lr=class extends bi{constructor(e,t=kn,n=hs,s,r,a=Lt,o=Lt,c,l=pi){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Nr=class extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Bn=class i extends en{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],f=[],d=0,m=0;x("z","y","x",-1,-1,n,t,e,a,r,0),x("z","y","x",1,-1,n,t,-e,a,r,1),x("x","z","y",1,1,e,n,t,s,a,2),x("x","z","y",1,-1,e,n,-t,s,a,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new on(l,3)),this.setAttribute("normal",new on(u,3)),this.setAttribute("uv",new on(f,2));function x(w,b,g,S,R,T,P,I,v,E,B){let F=T/v,O=P/E,q=T/2,Y=P/2,N=I/2,K=v+1,j=E+1,J=0,de=0,Z=new V;for(let ae=0;ae<j;ae++){let he=ae*O-Y;for(let Te=0;Te<K;Te++){let Fe=Te*F-q;Z[w]=Fe*S,Z[b]=he*R,Z[g]=N,l.push(Z.x,Z.y,Z.z),Z[w]=0,Z[b]=0,Z[g]=I>0?1:-1,u.push(Z.x,Z.y,Z.z),f.push(Te/v),f.push(1-ae/E),J+=1}}for(let ae=0;ae<E;ae++)for(let he=0;he<v;he++){let Te=d+he+K*ae,Fe=d+he+K*(ae+1),se=d+(he+1)+K*(ae+1),we=d+(he+1)+K*ae;c.push(Te,Fe,we),c.push(Fe,se,we),de+=6}o.addGroup(m,de,B),m+=de,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ki=class i extends en{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,f=e/o,d=t/c,m=[],x=[],w=[],b=[];for(let g=0;g<u;g++){let S=g*d-a;for(let R=0;R<l;R++){let T=R*f-r;x.push(T,-S,0),w.push(0,0,1),b.push(R/o),b.push(1-g/c)}}for(let g=0;g<c;g++)for(let S=0;S<o;S++){let R=S+l*g,T=S+l*(g+1),P=S+1+l*(g+1),I=S+1+l*g;m.push(R,T,I),m.push(T,P,I)}this.setIndex(m),this.setAttribute("position",new on(x,3)),this.setAttribute("normal",new on(w,3)),this.setAttribute("uv",new on(b,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};function ps(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(nu(s))s.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(nu(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function tn(i){let e={};for(let t=0;t<i.length;t++){let n=ps(i[t]);for(let s in n)e[s]=n[s]}return e}function nu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Gd(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Al(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}var Yu={clone:ps,merge:tn},Vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Yn=class extends cn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vd,this.fragmentShader=Wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ps(e.uniforms),this.uniformsGroups=Gd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ue().setHex(s.value);break;case"v2":this.uniforms[n].value=new Xe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new V().fromArray(s.value);break;case"v4":this.uniforms[n].value=new bt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ze().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Qe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},so=class extends Yn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Jn=class extends cn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ea,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},hn=class extends Jn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Xe(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return $i('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){$i('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Fr=class extends cn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ea,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=go,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ro=class extends cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Uu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ao=class extends cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Li(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function br(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function qd(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function iu(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Xd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var Zn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},oo=class extends Zn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wc,endingEnd:Wc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case qc:r=e,o=2*t-n;break;case Xc:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case qc:a=e,c=2*n-t;break;case Xc:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,f=this._offsetNext,d=this._weightPrev,m=this._weightNext,x=(n-t)/(s-t),w=x*x,b=w*x,g=-d*b+2*d*w-d*x,S=(1+d)*b+(-1.5-2*d)*w+(-.5+d)*x+1,R=(-1-m)*b+(1.5+m)*w+.5*x,T=m*b-m*w;for(let P=0;P!==o;++P)r[P]=g*a[u+P]+S*a[l+P]+R*a[c+P]+T*a[f+P];return r}},co=class extends Zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(s-t),f=1-u;for(let d=0;d!==o;++d)r[d]=a[l+d]*f+a[c+d]*u;return r}},lo=class extends Zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ho=class extends Zn{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,f=this.outTangents;if(!u||!f){let x=(n-t)/(s-t),w=1-x;for(let b=0;b!==o;++b)r[b]=a[l+b]*w+a[c+b]*x;return r}let d=o*2,m=e-1;for(let x=0;x!==o;++x){let w=a[l+x],b=a[c+x],g=m*d+x*2,S=f[g],R=f[g+1],T=e*d+x*2,P=u[T],I=u[T+1],v=Kd(n,t,S,P,s);r[x]=Ju(v,w,R,I,b)}return r}};function Ju(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function jd(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Kd(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Ju(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=jd(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var gn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Li(t,this.TimeBufferType),this.values=Li(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Li(e.times,Array),values:Li(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),br(e.settings)&&(n.settings={inTangents:Li(e.settings.inTangents,Array),outTangents:Li(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new co(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new oo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ho(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Qi:t=this.InterpolantFactoryMethodDiscrete;break;case es:t=this.InterpolantFactoryMethodLinear;break;case Va:t=this.InterpolantFactoryMethodSmooth;break;case Vc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Be("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Qi;case this.InterpolantFactoryMethodLinear:return es;case this.InterpolantFactoryMethodSmooth:return Va;case this.InterpolantFactoryMethodBezier:return Vc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;br(this.settings)&&(su(this.settings.inTangents,e),su(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;br(this.settings)&&(ru(this.settings.inTangents,e),ru(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ye("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ye("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){Ye("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Ye("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&nd(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){Ye("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Va,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(s)c=!0;else{let f=o*n,d=f-n,m=f+n;for(let x=0;x!==n;++x){let w=t[f+x];if(w!==t[d+x]||w!==t[m+x]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let f=o*n,d=a*n;for(let m=0;m!==n;++m)t[d+m]=t[f+m]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,br(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function su(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function ru(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=es;var xi=class extends gn{constructor(e,t,n){super(e,t,n)}};xi.prototype.ValueTypeName="bool";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=Qi;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ur=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};Ur.prototype.ValueTypeName="color";var vi=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};vi.prototype.ValueTypeName="number";var uo=class extends Zn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let u=l+o;l!==u;l+=4)Qt.slerpFlat(r,0,a,l-o,a,l,c);return r}},yi=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new uo(this.times,this.values,this.getValueSize(),e)}};yi.prototype.ValueTypeName="quaternion";yi.prototype.InterpolantFactoryMethodSmooth=void 0;var Si=class extends gn{constructor(e,t,n){super(e,t,n)}};Si.prototype.ValueTypeName="string";Si.prototype.ValueBufferType=Array;Si.prototype.DefaultInterpolation=Qi;Si.prototype.InterpolantFactoryMethodLinear=void 0;Si.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends gn{constructor(e,t,n,s){super(e,t,n,s)}};zi.prototype.ValueTypeName="vector";var Or=class{constructor(e="",t=-1,n=[],s=Fu){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=ei(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Jd(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(gn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let u=qd(c);c=iu(c,1,u),l=iu(l,1,u),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new vi(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(r);if(u&&u.length>1){let f=u[1],d=s[f];d||(s[f]=d=[]),d.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Yd(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return vi;case"vector":case"vector2":case"vector3":case"vector4":return zi;case"color":return Ur;case"quaternion":return yi;case"bool":case"boolean":return xi;case"string":return Si}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Jd(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Yd(i.type);if(i.times===void 0){let n=[],s=[];Xd(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),br(i.settings)&&(t.settings={inTangents:Li(i.settings.inTangents,Float32Array),outTangents:Li(i.settings.outTangents,Float32Array)}),t}var Xn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(au(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!au(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function au(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var fo=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){let f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=l.length;f<d;f+=2){let m=l[f],x=l[f+1];if(m.global&&(m.lastIndex=0),m.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Zu=new fo,En=class{constructor(e){this.manager=e!==void 0?e:Zu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};En.DEFAULT_MATERIAL_NAME="__DEFAULT";var ui={},Kc=class extends Error{constructor(e,t){super(e),this.response=t}},$n=class extends En{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Xn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ui[e]!==void 0){ui[e].push({onLoad:t,onProgress:n,onError:s});return}ui[e]=[],ui[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Be("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=ui[e],f=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),m=d?parseInt(d):0,x=m!==0,w=0,b=new ReadableStream({start(g){S();function S(){f.read().then(({done:R,value:T})=>{if(R)g.close();else{w+=T.byteLength;let P=new ProgressEvent("progress",{lengthComputable:x,loaded:w,total:m});for(let I=0,v=u.length;I<v;I++){let E=u[I];E.onProgress&&E.onProgress(P)}g.enqueue(T),S()}},R=>{g.error(R)})}}});return new Response(b)}else throw new Kc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let f=/charset="?([^;"\s]*)"?/i.exec(o),d=f&&f[1]?f[1].toLowerCase():void 0,m=new TextDecoder(d);return l.arrayBuffer().then(x=>m.decode(x))}}}).then(l=>{Xn.add(`file:${e}`,l);let u=ui[e];delete ui[e];for(let f=0,d=u.length;f<d;f++){let m=u[f];m.onLoad&&m.onLoad(l)}}).catch(l=>{let u=ui[e];if(u===void 0)throw this.manager.itemError(e),l;delete ui[e];for(let f=0,d=u.length;f<d;f++){let m=u[f];m.onError&&m.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Cs=new WeakMap,po=class extends En{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Xn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let f=Cs.get(a);f===void 0&&(f=[],Cs.set(a,f)),f.push({onLoad:t,onError:s})}return a}let o=Us("img");function c(){u(),t&&t(this);let f=Cs.get(this)||[];for(let d=0;d<f.length;d++){let m=f[d];m.onLoad&&m.onLoad(this)}Cs.delete(this),r.manager.itemEnd(e)}function l(f){u(),s&&s(f),Xn.remove(`image:${e}`);let d=Cs.get(this)||[];for(let m=0;m<d.length;m++){let x=d[m];x.onError&&x.onError(f)}Cs.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Xn.add(`image:${e}`,o),r.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}};var ss=class extends En{constructor(e){super(e)}load(e,t,n,s){let r=this,a=new gi,o=new $n(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(c){let l;try{l=r.parse(c)}catch(u){s!==void 0?s(u):Ye(u);return}r._applyTexData(a,l),t&&t(a,l)},n,s),a}createDataTexture(e){let t=new gi;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:pn,e.wrapT=t.wrapT!==void 0?t.wrapT:pn,e.magFilter=t.magFilter!==void 0?t.magFilter:_t,e.minFilter=t.minFilter!==void 0?t.minFilter:_t,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=Tn),t.mipmapCount===1&&(e.minFilter=_t),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},Br=class extends En{constructor(e){super(e)}load(e,t,n,s){let r=new Kt,a=new po(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Vs=class extends Et{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var zc=new Qe,ou=new V,cu=new V,Ws=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.mapType=_n,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bi,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ou.setFromMatrixPosition(e.matrixWorld),t.position.copy(ou),cu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(cu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){zc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(zc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Fs||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(zc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ha=new V,Ga=new Qt,qn=new V,kr=class extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ha,Ga,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ha,Ga,qn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ha,Ga,qn),qn.x===1&&qn.y===1&&qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ha,Ga,qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Di=new V,lu=new Xe,hu=new Xe,Ht=class extends kr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ts*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ts*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Di.x,Di.y).multiplyScalar(-e/Di.z),Di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Di.x,Di.y).multiplyScalar(-e/Di.z)}getViewSize(e,t){return this.getViewBounds(e,lu,hu),t.subVectors(hu,lu)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(xr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Yc=class extends Ws{constructor(){super(new Ht(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ts*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},zr=class extends Vs{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Yc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Jc=class extends Ws{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0}},rs=class extends Vs{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Jc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},as=class extends kr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Zc=class extends Ws{constructor(){super(new as(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hr=class extends Vs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new Zc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var wn=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Hc=new WeakMap,Gr=class extends En{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Be("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Be("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=Xn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{Hc.has(a)===!0?(s&&s(Hc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Xn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),Hc.set(c,l),Xn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Xn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Ps=-90,Is=1,qs=class extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ht(Ps,Is,e,t);s.layers=this.layers,this.add(s);let r=new Ht(Ps,Is,e,t);r.layers=this.layers,this.add(r);let a=new Ht(Ps,Is,e,t);a.layers=this.layers,this.add(a);let o=new Ht(Ps,Is,e,t);o.layers=this.layers,this.add(o);let c=new Ht(Ps,Is,e,t);c.layers=this.layers,this.add(c);let l=new Ht(Ps,Is,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let w=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let b=!1;e.isWebGLRenderer===!0?b=e.state.buffers.depth.getReversed():b=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),b&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),b&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),b&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),b&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),b&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=w,e.setRenderTarget(n,5,s),b&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,m),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},mo=class extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var Rl="\\[\\]\\.:\\/",Zd=new RegExp("["+Rl+"]","g"),Cl="[^"+Rl+"]",$d="[^"+Rl.replace("\\.","")+"]",Qd=/((?:WC+[\/:])*)/.source.replace("WC",Cl),ep=/(WCOD+)?/.source.replace("WCOD",$d),tp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Cl),np=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Cl),ip=new RegExp("^"+Qd+ep+tp+np+"$"),sp=["material","materials","bones","map"],$c=class{constructor(e,t,n){let s=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},St=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Zd,"")}static parseTrackName(e){let t=ip.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);sp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Be("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ye("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ye("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ye("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ye("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ye("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ye("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;Ye("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ye("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=$c;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ub=new Float32Array(1);var Xs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=st(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(st(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Qc=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var Vr=class extends On{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Pl(i,e,t,n){let s=rp(n);switch(t){case ml:return i*e;case Ei:return i*e/s.components*s.byteLength;case So:return i*e/s.components*s.byteLength;case bn:return i*e*2/s.components*s.byteLength;case Mo:return i*e*2/s.components*s.byteLength;case gl:return i*e*3/s.components*s.byteLength;case Ut:return i*e*4/s.components*s.byteLength;case Eo:return i*e*4/s.components*s.byteLength;case jr:case Kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Yr:case Jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case To:case Ro:return Math.max(i,16)*Math.max(e,8)/4;case wo:case Ao:return Math.max(i,8)*Math.max(e,8)/2;case Co:case Po:case Do:case Lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Io:case Zr:case No:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Uo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Oo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ko:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case zo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Go:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case qo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case jo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ko:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Yo:case Jo:case Zo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case $o:case Qo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case $r:case ec:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rp(i){switch(i){case _n:case ul:return{byteLength:1,components:1};case Zs:case fl:case Ft:return{byteLength:2,components:1};case vo:case yo:return{byteLength:2,components:4};case kn:case xo:case Nt:return{byteLength:4,components:1};case dl:case pl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function vf(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function op(i){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,f=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){let u=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,u);else{f.sort((m,x)=>m.start-x.start);let d=0;for(let m=1;m<f.length;m++){let x=f[d],w=f[m];w.start<=x.start+x.count+1?x.count=Math.max(x.count,w.start+w.count-x.start):(++d,f[d]=w)}f.length=d+1;for(let m=0,x=f.length;m<x;m++){let w=f[m];i.bufferSubData(l,w.start*u.BYTES_PER_ELEMENT,u,w.start,w.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var cp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,up=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,mp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,_p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Pp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ip=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Dp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Op="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,kp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,zp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$p=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Qp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,em=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,am=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,om=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lm=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,hm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,um=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_m=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ym=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Em=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Pm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Im=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Um=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,km=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,jm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Km=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ym=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Zm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$m=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,eg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ng=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ag=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,og=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,mg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,_g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Rg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ig=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Dg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ng=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Og=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nt={alphahash_fragment:cp,alphahash_pars_fragment:lp,alphamap_fragment:hp,alphamap_pars_fragment:up,alphatest_fragment:fp,alphatest_pars_fragment:dp,aomap_fragment:pp,aomap_pars_fragment:mp,batching_pars_vertex:gp,batching_vertex:_p,begin_vertex:bp,beginnormal_vertex:xp,bsdfs:vp,iridescence_fragment:yp,bumpmap_pars_fragment:Sp,clipping_planes_fragment:Mp,clipping_planes_pars_fragment:Ep,clipping_planes_pars_vertex:wp,clipping_planes_vertex:Tp,color_fragment:Ap,color_pars_fragment:Rp,color_pars_vertex:Cp,color_vertex:Pp,common:Ip,defaultnormal_vertex:Dp,displacementmap_pars_vertex:Lp,displacementmap_vertex:Np,emissivemap_fragment:Fp,emissivemap_pars_fragment:Up,colorspace_fragment:Op,colorspace_pars_fragment:Bp,envmap_fragment:kp,envmap_common_pars_fragment:zp,envmap_pars_fragment:Hp,envmap_pars_vertex:Gp,envmap_physical_pars_fragment:Qp,envmap_vertex:Vp,fog_vertex:Wp,fog_pars_vertex:qp,fog_fragment:Xp,fog_pars_fragment:jp,gradientmap_pars_fragment:Kp,lightmap_pars_fragment:Yp,lights_lambert_fragment:Jp,lights_lambert_pars_fragment:Zp,lights_pars_begin:$p,lights_toon_fragment:em,lights_toon_pars_fragment:tm,lights_phong_fragment:nm,lights_phong_pars_fragment:im,lights_physical_fragment:sm,lights_physical_pars_fragment:rm,lights_fragment_begin:am,lights_fragment_maps:om,lights_fragment_end:cm,lightprobes_pars_fragment:lm,logdepthbuf_fragment:hm,logdepthbuf_pars_fragment:um,logdepthbuf_pars_vertex:fm,logdepthbuf_vertex:dm,map_fragment:pm,map_pars_fragment:mm,map_particle_fragment:gm,map_particle_pars_fragment:_m,metalnessmap_fragment:bm,metalnessmap_pars_fragment:xm,morphinstance_vertex:vm,morphcolor_vertex:ym,morphnormal_vertex:Sm,morphtarget_pars_vertex:Mm,morphtarget_vertex:Em,normal_fragment_begin:wm,normal_fragment_maps:Tm,normal_pars_fragment:Am,normal_pars_vertex:Rm,normal_vertex:Cm,normalmap_pars_fragment:Pm,clearcoat_normal_fragment_begin:Im,clearcoat_normal_fragment_maps:Dm,clearcoat_pars_fragment:Lm,iridescence_pars_fragment:Nm,opaque_fragment:Fm,packing:Um,premultiplied_alpha_fragment:Om,project_vertex:Bm,dithering_fragment:km,dithering_pars_fragment:zm,roughnessmap_fragment:Hm,roughnessmap_pars_fragment:Gm,shadowmap_pars_fragment:Vm,shadowmap_pars_vertex:Wm,shadowmap_vertex:qm,shadowmask_pars_fragment:Xm,skinbase_vertex:jm,skinning_pars_vertex:Km,skinning_vertex:Ym,skinnormal_vertex:Jm,specularmap_fragment:Zm,specularmap_pars_fragment:$m,tonemapping_fragment:Qm,tonemapping_pars_fragment:eg,transmission_fragment:tg,transmission_pars_fragment:ng,uv_pars_fragment:ig,uv_pars_vertex:sg,uv_vertex:rg,worldpos_vertex:ag,background_vert:og,background_frag:cg,backgroundCube_vert:lg,backgroundCube_frag:hg,cube_vert:ug,cube_frag:fg,depth_vert:dg,depth_frag:pg,distance_vert:mg,distance_frag:gg,equirect_vert:_g,equirect_frag:bg,linedashed_vert:xg,linedashed_frag:vg,meshbasic_vert:yg,meshbasic_frag:Sg,meshlambert_vert:Mg,meshlambert_frag:Eg,meshmatcap_vert:wg,meshmatcap_frag:Tg,meshnormal_vert:Ag,meshnormal_frag:Rg,meshphong_vert:Cg,meshphong_frag:Pg,meshphysical_vert:Ig,meshphysical_frag:Dg,meshtoon_vert:Lg,meshtoon_frag:Ng,points_vert:Fg,points_frag:Ug,shadow_vert:Og,shadow_frag:Bg,sprite_vert:kg,sprite_frag:zg},De={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},ni={basic:{uniforms:tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:tn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:tn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new Ue(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:tn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:tn([De.points,De.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:tn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:tn([De.common,De.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:tn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:tn([De.sprite,De.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distance:{uniforms:tn([De.common,De.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distance_vert,fragmentShader:nt.distance_frag},shadow:{uniforms:tn([De.lights,De.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};ni.physical={uniforms:tn([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var nc={r:0,b:0,g:0},Hg=new Qe,yf=new Ze;yf.set(-1,0,0,0,1,0,0,0,1);function Gg(i,e,t,n,s,r){let a=new Ue(0),o=s===!0?0:1,c,l,u=null,f=0,d=null;function m(S){let R=S.isScene===!0?S.background:null;if(R&&R.isTexture){let T=S.backgroundBlurriness>0;R=e.get(R,T)}return R}function x(S){let R=!1,T=m(S);T===null?b(a,o):T&&T.isColor&&(b(T,1),R=!0);let P=i.xr.getEnvironmentBlendMode();P==="additive"?t.buffers.color.setClear(0,0,0,1,r):P==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function w(S,R){let T=m(R);T&&T.isCubeTexture?(l===void 0&&(l=new xt(new Bn(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:ps(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(P,I,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=T,l.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Hg.makeRotationFromEuler(R.backgroundRotation)).transpose(),T.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(yf),l.material.toneMapped=it.getTransfer(T.colorSpace)!==pt,(u!==T||f!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new xt(new ki(2,2),new Yn({name:"BackgroundMaterial",uniforms:ps(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.toneMapped=it.getTransfer(T.colorSpace)!==pt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||f!==T.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function b(S,R){S.getRGB(nc,Al(i)),t.buffers.color.setClear(nc.r,nc.g,nc.b,R,r)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,R=1){a.set(S),o=R,b(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,b(a,o)},render:x,addToRenderList:w,dispose:g}}function Vg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(O,q,Y,N,K){let j=!1,J=f(O,N,Y,q);r!==J&&(r=J,l(r.object)),j=m(O,N,Y,K),j&&x(O,N,Y,K),K!==null&&e.update(K,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,T(O,q,Y,N),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function c(){return i.createVertexArray()}function l(O){return i.bindVertexArray(O)}function u(O){return i.deleteVertexArray(O)}function f(O,q,Y,N){let K=N.wireframe===!0,j=n[q.id];j===void 0&&(j={},n[q.id]=j);let J=O.isInstancedMesh===!0?O.id:0,de=j[J];de===void 0&&(de={},j[J]=de);let Z=de[Y.id];Z===void 0&&(Z={},de[Y.id]=Z);let ae=Z[K];return ae===void 0&&(ae=d(c()),Z[K]=ae),ae}function d(O){let q=[],Y=[],N=[];for(let K=0;K<t;K++)q[K]=0,Y[K]=0,N[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:Y,attributeDivisors:N,object:O,attributes:{},index:null}}function m(O,q,Y,N){let K=r.attributes,j=q.attributes,J=0,de=Y.getAttributes();for(let Z in de)if(de[Z].location>=0){let he=K[Z],Te=j[Z];if(Te===void 0&&(Z==="instanceMatrix"&&O.instanceMatrix&&(Te=O.instanceMatrix),Z==="instanceColor"&&O.instanceColor&&(Te=O.instanceColor)),he===void 0||he.attribute!==Te||Te&&he.data!==Te.data)return!0;J++}return r.attributesNum!==J||r.index!==N}function x(O,q,Y,N){let K={},j=q.attributes,J=0,de=Y.getAttributes();for(let Z in de)if(de[Z].location>=0){let he=j[Z];he===void 0&&(Z==="instanceMatrix"&&O.instanceMatrix&&(he=O.instanceMatrix),Z==="instanceColor"&&O.instanceColor&&(he=O.instanceColor));let Te={};Te.attribute=he,he&&he.data&&(Te.data=he.data),K[Z]=Te,J++}r.attributes=K,r.attributesNum=J,r.index=N}function w(){let O=r.newAttributes;for(let q=0,Y=O.length;q<Y;q++)O[q]=0}function b(O){g(O,0)}function g(O,q){let Y=r.newAttributes,N=r.enabledAttributes,K=r.attributeDivisors;Y[O]=1,N[O]===0&&(i.enableVertexAttribArray(O),N[O]=1),K[O]!==q&&(i.vertexAttribDivisor(O,q),K[O]=q)}function S(){let O=r.newAttributes,q=r.enabledAttributes;for(let Y=0,N=q.length;Y<N;Y++)q[Y]!==O[Y]&&(i.disableVertexAttribArray(Y),q[Y]=0)}function R(O,q,Y,N,K,j,J){J===!0?i.vertexAttribIPointer(O,q,Y,K,j):i.vertexAttribPointer(O,q,Y,N,K,j)}function T(O,q,Y,N){w();let K=N.attributes,j=Y.getAttributes(),J=q.defaultAttributeValues;for(let de in j){let Z=j[de];if(Z.location>=0){let ae=K[de];if(ae===void 0&&(de==="instanceMatrix"&&O.instanceMatrix&&(ae=O.instanceMatrix),de==="instanceColor"&&O.instanceColor&&(ae=O.instanceColor)),ae!==void 0){let he=ae.normalized,Te=ae.itemSize,Fe=e.get(ae);if(Fe===void 0)continue;let se=Fe.buffer,we=Fe.type,Le=Fe.bytesPerElement,ke=we===i.INT||we===i.UNSIGNED_INT||ae.gpuType===xo;if(ae.isInterleavedBufferAttribute){let pe=ae.data,We=pe.isInterleavedBuffer===!0?pe.stride:pe.itemSize,mt=ae.offset;if(pe.isInstancedInterleavedBuffer||pe.isInstancedBufferAttribute){for(let Ge=0;Ge<Z.locationSize;Ge++)g(Z.location+Ge,pe.meshPerAttribute);O.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Ge=0;Ge<Z.locationSize;Ge++)b(Z.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,se);for(let Ge=0;Ge<Z.locationSize;Ge++)R(Z.location+Ge,Te/Z.locationSize,we,he,We*Le,(mt+Te/Z.locationSize*Ge)*Le,ke)}else{if(ae.isInstancedBufferAttribute){for(let pe=0;pe<Z.locationSize;pe++)g(Z.location+pe,ae.meshPerAttribute);O.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let pe=0;pe<Z.locationSize;pe++)b(Z.location+pe);i.bindBuffer(i.ARRAY_BUFFER,se);for(let pe=0;pe<Z.locationSize;pe++)R(Z.location+pe,Te/Z.locationSize,we,he,Te*Le,Te/Z.locationSize*pe*Le,ke)}}else if(J!==void 0){let he=J[de];if(he!==void 0)switch(he.length){case 2:i.vertexAttrib2fv(Z.location,he);break;case 3:i.vertexAttrib3fv(Z.location,he);break;case 4:i.vertexAttrib4fv(Z.location,he);break;default:i.vertexAttrib1fv(Z.location,he)}}}}S()}function P(){B();for(let O in n){let q=n[O];for(let Y in q){let N=q[Y];for(let K in N){let j=N[K];for(let J in j)u(j[J].object),delete j[J];delete N[K]}}delete n[O]}}function I(O){if(n[O.id]===void 0)return;let q=n[O.id];for(let Y in q){let N=q[Y];for(let K in N){let j=N[K];for(let J in j)u(j[J].object),delete j[J];delete N[K]}}delete n[O.id]}function v(O){for(let q in n){let Y=n[q];for(let N in Y){let K=Y[N];if(K[O.id]===void 0)continue;let j=K[O.id];for(let J in j)u(j[J].object),delete j[J];delete K[O.id]}}}function E(O){for(let q in n){let Y=n[q],N=O.isInstancedMesh===!0?O.id:0,K=Y[N];if(K!==void 0){for(let j in K){let J=K[j];for(let de in J)u(J[de].object),delete J[de];delete K[j]}delete Y[N],Object.keys(Y).length===0&&delete n[q]}}}function B(){F(),a=!0,r!==s&&(r=s,l(r.object))}function F(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:B,resetDefaultState:F,dispose:P,releaseStatesOfGeometry:I,releaseStatesOfObject:E,releaseStatesOfProgram:v,initAttributes:w,enableAttribute:b,disableUnusedAttributes:S}}function Wg(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let d=0;for(let m=0;m<u;m++)d+=l[m];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function qg(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let v=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(v){return!(v!==Ut&&n.convert(v)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(v){let E=v===Ft&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==_n&&v!==Nt&&!E&&n.convert(v)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(v){if(v==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Be("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&Be("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=i.getParameter(i.MAX_TEXTURE_SIZE),b=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),R=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=i.getParameter(i.MAX_SAMPLES),I=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:x,maxTextureSize:w,maxCubemapSize:b,maxAttributes:g,maxVertexUniforms:S,maxVaryings:R,maxFragmentUniforms:T,maxSamples:P,samples:I}}function Xg(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Sn,o=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){let m=f.length!==0||d||n!==0||s;return s=d,n=f.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,m){let x=f.clippingPlanes,w=f.clipIntersection,b=f.clipShadows,g=i.get(f);if(!s||x===null||x.length===0||r&&!b)r?u(null):l();else{let S=r?0:n,R=S*4,T=g.clippingState||null;c.value=T,T=u(x,d,R,m);for(let P=0;P!==R;++P)T[P]=t[P];g.clippingState=T,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,d,m,x){let w=f!==null?f.length:0,b=null;if(w!==0){if(b=c.value,x!==!0||b===null){let g=m+w*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(b===null||b.length<g)&&(b=new Float32Array(g));for(let R=0,T=m;R!==w;++R,T+=4)a.copy(f[R]).applyMatrix4(S,o),a.normal.toArray(b,T),b[T+3]=a.constant}c.value=b,c.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,b}}var ia=class extends Mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Dr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Bn(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zt,blending:os});r.uniforms.tEquirect.value=t;let a=new xt(s,r),o=t.minFilter;return t.minFilter===Tn&&(t.minFilter=_t),new qs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},$u=256,jg=3,Kg=20,Sf=256,Mf=16,Yg=3,Jg=new V,Zg=new Ue,ii=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new qs(1,10,null),this._boxMesh=new xt(new Bn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Jg}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);let f=c.autoClear,d=c.autoClearColor,m=c.autoClearDepth,x=c.autoClearStencil,w=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,w===null&&(e.background=c.getClearColor(Zg));let b=new qs(n,s,u);return b.position.copy(o),b.update(c,e),c.autoClear=f,c.autoClearColor=d,c.autoClearDepth=m,c.autoClearStencil=x,e.background=w,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ef(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max($u,El(e))}_fromTexture(e,t){e.mapping===hs||e.mapping===Ys?this._setSize(e.image.length===0?$u:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Qu(e,!1,!1),n=Math.log2(e)-jg;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Qu(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===hs||e.mapping===Ys?(this._cubemapMaterial===null&&(this._cubemapMaterial=tf()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ef()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=$g(),this._integrationMaterial=Qg());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Mf);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-Yg)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let c=o>0?Math.log2(t)+.5*Math.log2(6/(Sf*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=e0());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function Qu(i,e,t){return new ia(i,{minFilter:Tn,generateMipmaps:e,type:Ft,colorSpace:Mt,depthBuffer:t})}function sa(i,e,t){return new Yn({name:i,uniforms:e,vertexShader:nt.cube_vert,fragmentShader:t,side:zt,blending:os,depthTest:!1,depthWrite:!1})}function $g(){return sa("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Sf}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Qg(){return sa("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Mf}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function e0(){return sa("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Kg}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function ef(){return sa("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function tf(){return sa("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function t0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,m=!1){return d==null?null:m?a(d):r(d)}function r(d){if(d&&d.isTexture){let m=d.mapping;if(m===us||m===_o)if(e.has(d)){let x=e.get(d).texture;return o(x,d.mapping)}else{let x=d.image;if(x&&x.height>0){let w=new ia(x.height);return w.fromEquirectangularTexture(i,d),e.set(d,w),d.addEventListener("dispose",l),o(w.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let m=d.mapping,x=m===us||m===_o,w=m===hs||m===Ys;if(x||w){let b=t.get(d),g=b!==void 0?b.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new ii(i)),b=x?n.fromEquirectangular(d,b):n.fromCubemap(d,b),b.texture.pmremVersion=d.pmremVersion,t.set(d,b),b.texture;if(b!==void 0)return b.texture;{let S=d.image;return x&&S&&S.height>0||w&&S&&c(S)?(n===null&&(n=new ii(i)),b=x?n.fromEquirectangular(d):n.fromCubemap(d),b.texture.pmremVersion=d.pmremVersion,t.set(d,b),d.addEventListener("dispose",u),b.texture):null}}}return d}function o(d,m){return m===us?d.mapping=hs:m===_o&&(d.mapping=Ys),d}function c(d){let m=0,x=6;for(let w=0;w<x;w++)d[w]!==void 0&&m++;return m===x}function l(d){let m=d.target;m.removeEventListener("dispose",l);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function u(d){let m=d.target;m.removeEventListener("dispose",u);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function n0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&$i("WebGLRenderer: "+n+" extension not supported."),s}}}function i0(i,e,t,n){let s={},r=new WeakMap,a=new FinalizationRegistry(x=>delete s[x]);function o(x){c(x.target)}function c(x){x.index!==null&&e.remove(x.index);for(let b in x.attributes)e.remove(x.attributes[b]);x.removeEventListener("dispose",o),delete s[x.id],a.unregister(x);let w=r.get(x);w&&(e.remove(w),r.delete(x)),n.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function l(x,w){return s[w.id]!==void 0||(w.addEventListener("dispose",o),s[w.id]=new WeakRef(w),a.register(w,w.id,w),t.memory.geometries++),w}function u(x){let w=x.attributes;for(let b in w)e.update(w[b],i.ARRAY_BUFFER)}function f(x){let w=x.index,b=x.attributes.position,g=0;if(b===void 0)return;let S=w!==null?w.array.length:b.array.length/3-1,R=b.count>=65535?Tr:wr,T=new R(Math.ceil(S/3)*6,1),P=T.array;if(w!==null){let v=w.array;g=w.version;for(let E=0,B=0;E<S;E+=3){let F=v[E+0],O=v[E+1],q=v[E+2];P[B++]=F,P[B++]=O,P[B++]=O,P[B++]=q,P[B++]=q,P[B++]=F}}else{g=b.version;for(let v=0,E=0;v<S;v+=3){let B=v+0,F=v+1,O=v+2;P[E++]=B,P[E++]=F,P[E++]=F,P[E++]=O,P[E++]=O,P[E++]=B}}T.version=g;let I=r.get(x);I&&e.remove(I),r.set(x,T)}function d(x){let w=r.get(x);if(w){let b=x.index;b!==null&&w.version<b.version&&f(x)}else f(x);return r.get(x)}function m(){for(let x in s){let w=s[x].deref();w!==void 0&&c(w)}}return{get:l,update:u,getWireframeAttribute:d,dispose:m}}function s0(i,e,t){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*a),t.update(d,n,1)}function l(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*a,m),t.update(d,n,m))}function u(f,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let w=0;for(let b=0;b<m;b++)w+=d[b];t.update(w,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function r0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function a0(i,e,t){let n=new WeakMap,s=new bt;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0,d=n.get(o);if(d===void 0||d.count!==f){let B=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",B)};d!==void 0&&d.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,w=o.morphAttributes.color!==void 0,b=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],S=o.morphAttributes.color||[],R=0;m===!0&&(R=1),x===!0&&(R=2),w===!0&&(R=3);let T=o.attributes.position.count*R,P=1;T>e.maxTextureSize&&(P=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);let I=new Float32Array(T*P*4*f),v=new Mr(I,T,P,f);v.type=Nt,v.needsUpdate=!0;let E=R*4;for(let F=0;F<f;F++){let O=b[F],q=g[F],Y=S[F],N=T*P*4*F;for(let K=0;K<O.count;K++){let j=K*E;m===!0&&(s.fromBufferAttribute(O,K),I[N+j+0]=s.x,I[N+j+1]=s.y,I[N+j+2]=s.z,I[N+j+3]=0),x===!0&&(s.fromBufferAttribute(q,K),I[N+j+4]=s.x,I[N+j+5]=s.y,I[N+j+6]=s.z,I[N+j+7]=0),w===!0&&(s.fromBufferAttribute(Y,K),I[N+j+8]=s.x,I[N+j+9]=s.y,I[N+j+10]=s.z,I[N+j+11]=Y.itemSize===4?s.w:1)}}d={count:f,texture:v,size:new Xe(T,P)},n.set(o,d),o.addEventListener("dispose",B)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let m=0;for(let w=0;w<l.length;w++)m+=l[w];let x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function o0(i,e,t,n,s){let r=new WeakMap;function a(l){let u=s.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){let m=l.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return d}function o(){r=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var c0={[al]:"LINEAR_TONE_MAPPING",[ol]:"REINHARD_TONE_MAPPING",[cl]:"CINEON_TONE_MAPPING",[qr]:"ACES_FILMIC_TONE_MAPPING",[Xr]:"AGX_TONE_MAPPING",[ls]:"NEUTRAL_TONE_MAPPING",[ll]:"CUSTOM_TONE_MAPPING"};function l0(i,e,t,n,s,r){let a=new Mn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,u=new en;u.setAttribute("position",new on([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new on([0,2,0,0,2,0],2));let f=new so({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new xt(u,f),m=new as(-1,1,1,-1,0,1),x=null,w=null,b=!1,g,S=null,R=[],T=!1;this.setSize=function(P,I){a.setSize(P,I),o!==null&&o.setSize(P,I),c!==null&&c.setSize(P,I);for(let v=0;v<R.length;v++){let E=R[v];E.setSize&&E.setSize(P,I)}},this.setEffects=function(P){R=P,T=R.length>0&&R[0].isRenderPass===!0;let I=a.width,v=a.height;R.length>0&&o===null&&(o=new Mn(I,v,{type:Ft,depthBuffer:!1,stencilBuffer:!1}),c=new Mn(I,v,{type:Ft,depthBuffer:!1,stencilBuffer:!1}));let E=s===!0&&R.some(B=>B.needsDepthTexture===!0);E!==(a.depthTexture!==null)&&(E===!0&&l===null&&(l=new bi(I,v),r===!0&&(l.format=Mi,l.type=ds)),a.dispose(),a.depthTexture=E?l:null,a.resolveDepthBuffer=E,a.storeMultisampledDepthBuffer=E);for(let B=0;B<R.length;B++){let F=R[B];F.setSize&&F.setSize(I,v),E&&F.needsDepthTexture===!0&&F.setDepthTexture&&F.setDepthTexture(l)}},this.begin=function(P,I){if(b||P.toneMapping===Pn&&R.length===0)return!1;if(S=I,I!==null){let v=I.width,E=I.height;(a.width!==v||a.height!==E)&&this.setSize(v,E)}return T===!1&&P.setRenderTarget(a),g=P.toneMapping,P.toneMapping=Pn,!0},this.hasRenderPass=function(){return T},this.end=function(P,I){P.toneMapping=g,b=!0;let v=a,E=o;for(let B=0;B<R.length;B++){let F=R[B];F.enabled!==!1&&(F.render(P,E,v,I),F.needsSwap!==!1&&(v=E,E=E===o?c:o))}if(x!==P.outputColorSpace||w!==P.toneMapping){x=P.outputColorSpace,w=P.toneMapping,f.defines={},it.getTransfer(x)===pt&&(f.defines.SRGB_TRANSFER="");let B=c0[w];B&&(f.defines[B]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=v.texture,P.setRenderTarget(S),P.render(d,m),S=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),u.dispose(),f.dispose()}}var Ef=new Kt,wf=new bi(1,1),Tf=new Lr(1),Af=new Mr,Rf=new eo,Cf=new Dr,nf=[],sf=[],rf=new Float32Array(16),af=new Float32Array(9),of=new Float32Array(4);function er(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=nf[s];if(r===void 0&&(r=new Float32Array(s),nf[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function rc(i,e){let t=sf[e];t===void 0&&(t=new Int32Array(e),sf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function h0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function u0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function f0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function d0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function p0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;of.set(n),i.uniformMatrix2fv(this.addr,!1,of),Vt(t,n)}}function m0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;af.set(n),i.uniformMatrix3fv(this.addr,!1,af),Vt(t,n)}}function g0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Gt(t,n))return;rf.set(n),i.uniformMatrix4fv(this.addr,!1,rf),Vt(t,n)}}function _0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function b0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function x0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function v0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function y0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function S0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function M0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function E0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function ac(i){return i.version===0&&(i.compareFunction=vl,i.needsUpdate=!0),i}function w0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=ac(wf):r=Ef,t.setTexture2D(e||r,s)}function T0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Rf,s)}function A0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=ac(Tf):r=Cf,t.setTextureCube(e||r,s)}function R0(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Af,s)}function C0(i){switch(i){case 5126:return h0;case 35664:return u0;case 35665:return f0;case 35666:return d0;case 35674:return p0;case 35675:return m0;case 35676:return g0;case 5124:case 35670:return _0;case 35667:case 35671:return b0;case 35668:case 35672:return x0;case 35669:case 35673:return v0;case 5125:return y0;case 36294:return S0;case 36295:return M0;case 36296:return E0;case 35678:case 36198:case 36298:case 36306:case 35682:return w0;case 35679:case 36299:case 36307:return T0;case 35680:case 36300:case 36308:case 36293:return A0;case 36289:case 36303:case 36311:case 36292:return R0}}function P0(i,e){i.uniform1fv(this.addr,e)}function I0(i,e){let t=er(e,this.size,2);i.uniform2fv(this.addr,t)}function D0(i,e){let t=er(e,this.size,3);i.uniform3fv(this.addr,t)}function L0(i,e){let t=er(e,this.size,4);i.uniform4fv(this.addr,t)}function N0(i,e){let t=er(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function F0(i,e){let t=er(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function U0(i,e){let t=er(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function O0(i,e){i.uniform1iv(this.addr,e)}function B0(i,e){i.uniform2iv(this.addr,e)}function k0(i,e){i.uniform3iv(this.addr,e)}function z0(i,e){i.uniform4iv(this.addr,e)}function H0(i,e){i.uniform1uiv(this.addr,e)}function G0(i,e){i.uniform2uiv(this.addr,e)}function V0(i,e){i.uniform3uiv(this.addr,e)}function W0(i,e){i.uniform4uiv(this.addr,e)}function q0(i,e,t){let n=this.cache,s=e.length,r=rc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ac(wf):a=Ef;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function X0(i,e,t){let n=this.cache,s=e.length,r=rc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Rf,r[a])}function j0(i,e,t){let n=this.cache,s=e.length,r=rc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=ac(Tf):a=Cf;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function K0(i,e,t){let n=this.cache,s=e.length,r=rc(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Vt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Af,r[a])}function Y0(i){switch(i){case 5126:return P0;case 35664:return I0;case 35665:return D0;case 35666:return L0;case 35674:return N0;case 35675:return F0;case 35676:return U0;case 5124:case 35670:return O0;case 35667:case 35671:return B0;case 35668:case 35672:return k0;case 35669:case 35673:return z0;case 5125:return H0;case 36294:return G0;case 36295:return V0;case 36296:return W0;case 35678:case 36198:case 36298:case 36306:case 35682:return q0;case 35679:case 36299:case 36307:return X0;case 35680:case 36300:case 36308:case 36293:return j0;case 36289:case 36303:case 36311:case 36292:return K0}}var Ll=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=C0(t.type)}},Nl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Y0(t.type)}},Fl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},Il=/(\w+)(\])?(\[|\.)?/g;function cf(i,e){i.seq.push(e),i.map[e.id]=e}function J0(i,e,t){let n=i.name,s=n.length;for(Il.lastIndex=0;;){let r=Il.exec(n),a=Il.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){cf(t,l===void 0?new Ll(o,i,e):new Nl(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new Fl(o),cf(t,f)),t=f}}}var Qs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);J0(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function lf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Z0=37297,$0=0;function Q0(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var hf=new Ze;function e_(i){it._getMatrix(hf,it.workingColorSpace,i);let e=`mat3( ${hf.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(i)){case yr:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function uf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Q0(i.getShaderSource(e),o)}else return r}function t_(i,e){let t=e_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var n_={[al]:"Linear",[ol]:"Reinhard",[cl]:"Cineon",[qr]:"ACESFilmic",[Xr]:"AgX",[ls]:"Neutral",[ll]:"Custom"};function i_(i,e){let t=n_[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ic=new V;function s_(){it.getLuminanceCoefficients(ic);let i=ic.x.toFixed(4),e=ic.y.toFixed(4),t=ic.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function r_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(na).join(`
`)}function a_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function o_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function na(i){return i!==""}function ff(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function df(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var c_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ul(i){return i.replace(c_,l_)}function l_(i,e){let t=nt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Ul(t)}var h_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pf(i){return i.replace(h_,u_)}function u_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function mf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var f_={[Wr]:"SHADOWMAP_TYPE_PCF",[js]:"SHADOWMAP_TYPE_VSM"};function d_(i){return f_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var p_={[Ys]:"ENVMAP_MODE_REFRACTION"};function m_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":p_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var g_={[go]:"ENVMAP_BLENDING_MULTIPLY",[Du]:"ENVMAP_BLENDING_MIX",[Lu]:"ENVMAP_BLENDING_ADD"};function __(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":g_[i.combine]||"ENVMAP_BLENDING_NONE"}function b_(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=d_(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=m_(t),f=__(t),d=r_(t),m=a_(r),x=s.createProgram(),w,b,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(w=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(na).join(`
`),w.length>0&&(w+=`
`),b=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(na).join(`
`),b.length>0&&(b+=`
`)):(w=[mf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(na).join(`
`),b=[mf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?nt.tonemapping_pars_fragment:"",t.toneMapping!==Pn?i_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,t_("linearToOutputTexel",t.outputColorSpace),s_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(na).join(`
`)),a=Ul(a),a=ff(a,t),a=df(a,t),o=Ul(o),o=ff(o,t),o=df(o,t),a=pf(a),o=pf(o),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,w=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+w,b=["#define varying in",t.glslVersion===Sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);let S=g+w+a,R=g+b+o,T=lf(s,s.VERTEX_SHADER,S),P=lf(s,s.FRAGMENT_SHADER,R);s.attachShader(x,T),s.attachShader(x,P),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function I(F){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(x)||"",q=s.getShaderInfoLog(T)||"",Y=s.getShaderInfoLog(P)||"",N=O.trim(),K=q.trim(),j=Y.trim(),J=!0,de=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,P);else{let Z=uf(s,T,"vertex"),ae=uf(s,P,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+N+`
`+Z+`
`+ae)}else N!==""?Be("WebGLProgram: Program Info Log:",N):(K===""||j==="")&&(de=!1);de&&(F.diagnostics={runnable:J,programLog:N,vertexShader:{log:K,prefix:w},fragmentShader:{log:j,prefix:b}})}s.deleteShader(T),s.deleteShader(P),v=new Qs(s,x),E=o_(s,x)}let v;this.getUniforms=function(){return v===void 0&&I(this),v};let E;this.getAttributes=function(){return E===void 0&&I(this),E};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=s.getProgramParameter(x,Z0)),B},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=P,this}var x_=0,Ol=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Bl(e),t.set(e,n)),n}},Bl=class{constructor(e){this.id=x_++,this.code=e,this.usedTimes=0}};function v_(i){return i===bn||i===Zr||i===$r}function y_(i,e,t,n,s,r){let a=new Er,o=new Ol,c=new Set,l=[],u=new Map,f=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,E,B,F,O,q){let Y=F.fog,N=O.geometry,K=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?F.environment:null,j=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,J=e.get(v.envMap||K,j),de=d[v.type],Z=n.precision;v.precision!==null&&(Z=n.getMaxPrecision(v.precision),Z!==v.precision&&Be("WebGLProgram.getParameters:",v.precision,"not supported, using",Z,"instead."));let ae=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,he=ae!==void 0?ae.length:0,Te=0;N.morphAttributes.position!==void 0&&(Te=1),N.morphAttributes.normal!==void 0&&(Te=2),N.morphAttributes.color!==void 0&&(Te=3);let Fe,se,we,Le;if(de){let Pe=ni[de];Fe=Pe.vertexShader,se=Pe.fragmentShader}else{Fe=v.vertexShader,se=v.fragmentShader;let Pe=o.getVertexShaderStage(v),ut=o.getFragmentShaderStage(v);o.update(v,Pe,ut),we=Pe.id,Le=ut.id}let ke=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),We=O.isInstancedMesh===!0,mt=O.isBatchedMesh===!0,Ge=!!v.map,ct=!!v.matcap,lt=!!J,at=lt&&J.isPMREMTexture===!0,Pt=!!v.aoMap,At=!!v.lightMap,qt=!!v.bumpMap&&v.wireframe===!1,wt=!!v.normalMap,An=!!v.displacementMap,It=!!v.emissiveMap,nn=!!v.metalnessMap,sn=!!v.roughnessMap,fn=v.anisotropy>0,H=v.clearcoat>0,rn=v.diffuseRoughness>0,vt=v.dispersion>0,yt=v.retroreflectivity>0,Ae=v.iridescence>0,Dt=v.sheen>0,He=v.transmission>0,Je=fn&&!!v.anisotropyMap,L=H&&!!v.clearcoatMap,y=H&&!!v.clearcoatNormalMap,X=H&&!!v.clearcoatRoughnessMap,me=rn&&!!v.diffuseRoughnessMap,oe=Ae&&!!v.iridescenceMap,ve=Ae&&!!v.iridescenceThicknessMap,Re=Dt&&!!v.sheenColorMap,te=Dt&&!!v.sheenRoughnessMap,ie=!!v.specularMap,ye=!!v.specularColorMap,U=!!v.specularIntensityMap,ne=He&&!!v.transmissionMap,$=He&&!!v.thicknessMap,Me=!!v.gradientMap,ge=!!v.alphaMap,Se=v.alphaTest>0,Oe=!!v.alphaHash,et=!!v.extensions,_e=Pn;v.toneMapped&&(ke===null||ke.isXRRenderTarget===!0)&&(_e=i.toneMapping);let ze=at?J.isCompressedCubeTexture?J.image[0].mipmaps:J.mipmaps:null,$e={shaderID:de,shaderType:v.type,shaderName:v.name,vertexShader:Fe,fragmentShader:se,defines:v.defines,customVertexShaderID:we,customFragmentShaderID:Le,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:Z,batching:mt,batchingColor:mt&&O._colorsTexture!==null,instancing:We,instancingColor:We&&O.instanceColor!==null,instancingMorph:We&&O.morphTexture!==null,outputColorSpace:ke===null?i.outputColorSpace:ke.isXRRenderTarget===!0?ke.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Ge,matcap:ct,envMap:lt,envMapMode:lt&&J.mapping,envMapPMREM:at,envMapMaxLod:at?ze.length-1:null,envMapSize:at?ze[0].width:null,aoMap:Pt,lightMap:At,bumpMap:qt,normalMap:wt,displacementMap:An,emissiveMap:It,normalMapObjectSpace:wt&&v.normalMapType===Ou,normalMapTangentSpace:wt&&v.normalMapType===ea,packedNormalMap:wt&&v.normalMapType===ea&&v_(v.normalMap.format),metalnessMap:nn,roughnessMap:sn,anisotropy:fn,anisotropyMap:Je,clearcoat:H,clearcoatMap:L,clearcoatNormalMap:y,clearcoatRoughnessMap:X,diffuseRoughness:rn,diffuseRoughnessMap:me,dispersion:vt,retroreflection:yt,iridescence:Ae,iridescenceMap:oe,iridescenceThicknessMap:ve,sheen:Dt,sheenColorMap:Re,sheenRoughnessMap:te,specularMap:ie,specularColorMap:ye,specularIntensityMap:U,transmission:He,transmissionMap:ne,thicknessMap:$,gradientMap:Me,opaque:v.transparent===!1&&v.blending===Ks&&v.alphaToCoverage===!1,alphaMap:ge,alphaTest:Se,alphaHash:Oe,combine:v.combine,mapUv:Ge&&m(v.map.channel),aoMapUv:Pt&&m(v.aoMap.channel),lightMapUv:At&&m(v.lightMap.channel),bumpMapUv:qt&&m(v.bumpMap.channel),normalMapUv:wt&&m(v.normalMap.channel),displacementMapUv:An&&m(v.displacementMap.channel),emissiveMapUv:It&&m(v.emissiveMap.channel),metalnessMapUv:nn&&m(v.metalnessMap.channel),roughnessMapUv:sn&&m(v.roughnessMap.channel),anisotropyMapUv:Je&&m(v.anisotropyMap.channel),clearcoatMapUv:L&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:y&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&m(v.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:me&&m(v.diffuseRoughnessMap.channel),iridescenceMapUv:oe&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:te&&m(v.sheenRoughnessMap.channel),specularMapUv:ie&&m(v.specularMap.channel),specularColorMapUv:ye&&m(v.specularColorMap.channel),specularIntensityMapUv:U&&m(v.specularIntensityMap.channel),transmissionMapUv:ne&&m(v.transmissionMap.channel),thicknessMapUv:$&&m(v.thicknessMap.channel),alphaMapUv:ge&&m(v.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(wt||fn),vertexNormals:!!N.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!N.attributes.uv&&(Ge||ge),fog:!!Y,useFog:v.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||N.attributes.normal===void 0&&wt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:pe,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:Te,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:q.filter(Pe=>Pe.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&B.length>0,shadowMapType:i.shadowMap.type,toneMapping:_e,decodeVideoTexture:Ge&&v.map.isVideoTexture===!0&&it.getTransfer(v.map.colorSpace)===pt,decodeVideoTextureEmissive:It&&v.emissiveMap.isVideoTexture===!0&&it.getTransfer(v.emissiveMap.colorSpace)===pt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===un,flipSided:v.side===zt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:et&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(et&&v.extensions.multiDraw===!0||mt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return $e.vertexUv1s=c.has(1),$e.vertexUv2s=c.has(2),$e.vertexUv3s=c.has(3),c.clear(),$e}function w(v){let E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(let B in v.defines)E.push(B),E.push(v.defines[B]);return v.isRawShaderMaterial===!1&&(b(E,v),g(E,v),E.push(i.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function b(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapPMREM),v.push(E.envMapMaxLod),v.push(E.envMapSize),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.diffuseRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.numSunLights),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numSunLightShadows),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.numLightProbeGrids),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function g(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.diffuseRoughness&&a.enable(25),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function S(v){let E=d[v.type],B;if(E){let F=ni[E];B=Yu.clone(F.uniforms)}else B=v.uniforms;return B}function R(v,E){let B=u.get(E);return B!==void 0?++B.usedTimes:(B=new b_(i,E,v,s),l.push(B),u.set(E,B)),B}function T(v){if(--v.usedTimes===0){let E=l.indexOf(v);l[E]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function P(v){o.remove(v)}function I(){o.dispose()}return{getParameters:x,getProgramCacheKey:w,getUniforms:S,acquireProgram:R,releaseProgram:T,releaseShaderCache:P,programs:l,dispose:I}}function S_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function M_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function gf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function _f(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,x,w,b,g){let S=i[e];return S===void 0?(S={id:d.id,object:d,geometry:m,material:x,materialVariant:a(d),groupOrder:w,renderOrder:d.renderOrder,z:b,group:g},i[e]=S):(S.id=d.id,S.object=d,S.geometry=m,S.material=x,S.materialVariant=a(d),S.groupOrder=w,S.renderOrder=d.renderOrder,S.z=b,S.group=g),e++,S}function c(d,m,x,w,b,g,S){S.reversedDepth===!0&&(b=-b);let R=o(d,m,x,w,b,g);x.transmission>0?n.push(R):x.transparent===!0?s.push(R):t.push(R)}function l(d,m,x,w,b,g){let S=o(d,m,x,w,b,g);x.transmission>0?n.unshift(S):x.transparent===!0?s.unshift(S):t.unshift(S)}function u(d,m){t.length>1&&t.sort(d||M_),n.length>1&&n.sort(m||gf),s.length>1&&s.sort(m||gf)}function f(){for(let d=e,m=i.length;d<m;d++){let x=i[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function E_(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new _f,i.set(n,[a])):s>=r.length?(a=new _f,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function w_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new Ue};break;case"SpotLight":t={position:new V,direction:new V,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new V,halfWidth:new V,halfHeight:new V};break}return i[e.id]=t,t}}}function T_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var A_=0;function R_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function C_(i){let e=new w_,t=T_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);let s=new V,r=new Qe,a=new Qe;function o(l){let u=0,f=0,d=0;for(let q=0;q<9;q++)n.probe[q].set(0,0,0);let m=0,x=0,w=0,b=0,g=0,S=0,R=0,T=0,P=0,I=0,v=0,E=0,B=0,F=0;l.sort(R_);for(let q=0,Y=l.length;q<Y;q++){let N=l[q],K=N.color,j=N.intensity,J=N.distance,de=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===bn?de=N.shadow.map.texture:de=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=K.r*j,f+=K.g*j,d+=K.b*j;else if(N.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(N.sh.coefficients[Z],j);F++}else if(N.isSunLight){let Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let ae=N.shadow,he=t.get(N);he.shadowIntensity=ae.intensity,he.shadowBias=ae.bias,he.shadowNormalBias=ae.normalBias,he.shadowRadius=ae.radius,he.shadowMapSize.copy(ae.mapSize).multiply(ae.getFrameExtents()),n.sunShadow[x]=he,n.sunShadowMap[x]=de;let Te=ae.getViewportCount();for(let Fe=0;Fe<Te;Fe++)n.sunShadowMatrix[w+Fe]=ae.getMatrix(Fe),n.sunShadowCascade[w+Fe]=ae._cascadeData[Fe];w+=Te,x++}n.sun[m]=Z,m++}else if(N.isDirectionalLight){let Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let ae=N.shadow,he=t.get(N);he.shadowIntensity=ae.intensity,he.shadowBias=ae.bias,he.shadowNormalBias=ae.normalBias,he.shadowRadius=ae.radius,he.shadowMapSize=ae.mapSize,n.directionalShadow[b]=he,n.directionalShadowMap[b]=de,n.directionalShadowMatrix[b]=N.shadow.matrix,P++}n.directional[b]=Z,b++}else if(N.isSpotLight){let Z=e.get(N);Z.position.setFromMatrixPosition(N.matrixWorld),Z.color.copy(K).multiplyScalar(j),Z.distance=J,Z.coneCos=Math.cos(N.angle),Z.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Z.decay=N.decay,n.spot[S]=Z;let ae=N.shadow;if(N.map&&(n.spotLightMap[E]=N.map,E++,ae.updateMatrices(N),N.castShadow&&B++),n.spotLightMatrix[S]=ae.matrix,N.castShadow){let he=t.get(N);he.shadowIntensity=ae.intensity,he.shadowBias=ae.bias,he.shadowNormalBias=ae.normalBias,he.shadowRadius=ae.radius,he.shadowMapSize=ae.mapSize,n.spotShadow[S]=he,n.spotShadowMap[S]=de,v++}S++}else if(N.isRectAreaLight){let Z=e.get(N);Z.color.copy(K).multiplyScalar(j),Z.halfWidth.set(N.width*.5,0,0),Z.halfHeight.set(0,N.height*.5,0),n.rectArea[R]=Z,R++}else if(N.isPointLight){let Z=e.get(N);if(Z.color.copy(N.color).multiplyScalar(N.intensity),Z.distance=N.distance,Z.decay=N.decay,N.castShadow){let ae=N.shadow,he=t.get(N);he.shadowIntensity=ae.intensity,he.shadowBias=ae.bias,he.shadowNormalBias=ae.normalBias,he.shadowRadius=ae.radius,he.shadowMapSize=ae.mapSize,he.shadowCameraNear=ae.camera.near,he.shadowCameraFar=ae.camera.far,n.pointShadow[g]=he,n.pointShadowMap[g]=de,n.pointShadowMatrix[g]=N.shadow.matrix,I++}n.point[g]=Z,g++}else if(N.isHemisphereLight){let Z=e.get(N);Z.skyColor.copy(N.color).multiplyScalar(j),Z.groundColor.copy(N.groundColor).multiplyScalar(j),n.hemi[T]=Z,T++}}R>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=De.LTC_FLOAT_1,n.rectAreaLTC2=De.LTC_FLOAT_2):(n.rectAreaLTC1=De.LTC_HALF_1,n.rectAreaLTC2=De.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=d;let O=n.hash;(O.sunLength!==m||O.directionalLength!==b||O.pointLength!==g||O.spotLength!==S||O.rectAreaLength!==R||O.hemiLength!==T||O.numSunShadows!==x||O.numDirectionalShadows!==P||O.numPointShadows!==I||O.numSpotShadows!==v||O.numSpotMaps!==E||O.numLightProbes!==F)&&(n.sun.length=m,n.directional.length=b,n.spot.length=S,n.rectArea.length=R,n.point.length=g,n.hemi.length=T,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=w,n.sunShadowCascade.length=w,n.directionalShadow.length=P,n.directionalShadowMap.length=P,n.directionalShadowMatrix.length=P,n.pointShadow.length=I,n.pointShadowMap.length=I,n.pointShadowMatrix.length=I,n.spotShadow.length=v,n.spotShadowMap.length=v,n.spotLightMatrix.length=v+E-B,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=B,n.numLightProbes=F,O.sunLength=m,O.directionalLength=b,O.pointLength=g,O.spotLength=S,O.rectAreaLength=R,O.hemiLength=T,O.numSunShadows=x,O.numDirectionalShadows=P,O.numPointShadows=I,O.numSpotShadows=v,O.numSpotMaps=E,O.numLightProbes=F,n.version=A_++)}function c(l,u){let f=0,d=0,m=0,x=0,w=0,b=0,g=u.matrixWorldInverse;for(let S=0,R=l.length;S<R;S++){let T=l[S];if(T.isSunLight){let P=n.sun[f];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(g),f++}else if(T.isDirectionalLight){let P=n.directional[d];P.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),d++}else if(T.isSpotLight){let P=n.spot[x];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(g),P.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),x++}else if(T.isRectAreaLight){let P=n.rectArea[w];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(g),a.identity(),r.copy(T.matrixWorld),r.premultiply(g),a.extractRotation(r),P.halfWidth.set(T.width*.5,0,0),P.halfHeight.set(0,T.height*.5,0),P.halfWidth.applyMatrix4(a),P.halfHeight.applyMatrix4(a),w++}else if(T.isPointLight){let P=n.point[m];P.position.setFromMatrixPosition(T.matrixWorld),P.position.applyMatrix4(g),m++}else if(T.isHemisphereLight){let P=n.hemi[b];P.direction.setFromMatrixPosition(T.matrixWorld),P.direction.transformDirection(g),b++}}}return{setup:o,setupView:c,state:n}}function bf(i){let e=new C_(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):t.push(f)}function o(f){n.push(f)}function c(){e.setup(t),s.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function l(f){e.setupView(t,f)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function P_(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new bf(i),e.set(s,[o])):r>=a.length?(o=new bf(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var I_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,L_=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],N_=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],xf=new Qe,ta=new V,Dl=new V;function F_(i,e,t){let n=new Bi,s=new Xe,r=new Xe,a=new bt,o=new ro,c=new ao,l={},u=t.maxTextureSize,f={[Qn]:zt,[zt]:Qn,[un]:un},d=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:I_,fragmentShader:D_}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let x=new en;x.setAttribute("position",new kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let w=new xt(x,d),b=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wr;let g=this.type;this.render=function(I,v,E){if(b.enabled===!1||b.autoUpdate===!1&&b.needsUpdate===!1||I.length===0)return;this.type===du&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Wr);let B=i.getRenderTarget(),F=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),q=i.state;q.setBlending(os),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let Y=g!==this.type;Y&&v.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(K=>K.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,K=I.length;N<K;N++){let j=I[N],J=j.shadow;if(J===void 0){Be("WebGLShadowMap:",j,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);let de=J.getFrameExtents();s.multiply(de),r.copy(J.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/de.x),s.x=r.x*de.x,J.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/de.y),s.y=r.y*de.y,J.mapSize.y=r.y));let Z=i.state.buffers.depth.getReversed();if(J.camera._reversedDepth=Z,J.map===null||Y===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===js){if(j.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new Mn(s.x,s.y,{format:bn,type:Ft,minFilter:_t,magFilter:_t,generateMipmaps:!1}),J.map.texture.name=j.name+".shadowMap",J.map.depthTexture=new bi(s.x,s.y,Nt),J.map.depthTexture.name=j.name+".shadowMapDepth",J.map.depthTexture.format=pi,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Lt,J.map.depthTexture.magFilter=Lt}else j.isPointLight?(J.map=new ia(s.x),J.map.depthTexture=new Lr(s.x,kn)):(J.map=new Mn(s.x,s.y),J.map.depthTexture=new bi(s.x,s.y,kn)),J.map.depthTexture.name=j.name+".shadowMap",J.map.depthTexture.format=pi,this.type===Wr?(J.map.depthTexture.compareFunction=Z?xl:bl,J.map.depthTexture.minFilter=_t,J.map.depthTexture.magFilter=_t):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Lt,J.map.depthTexture.magFilter=Lt);J.camera.updateProjectionMatrix()}J.map.isWebGLCubeRenderTarget!==!0&&(J.map.width!==s.x||J.map.height!==s.y)&&J.map.setSize(s.x,s.y);let ae=J.map.isWebGLCubeRenderTarget?6:J.getViewportCount();j.isPointLight!==!0&&J.updateMatrices(j,E);let he=(J.camera.layers.mask&4294967294)!==0?J.camera.layers:E.layers;for(let Te=0;Te<ae;Te++){let Fe=J.getCamera(Te);if(j.isPointLight){let se=J.camera,we=J.matrix,Le=j.distance||se.far;Le!==se.far&&(se.far=Le,se.updateProjectionMatrix()),ta.setFromMatrixPosition(j.matrixWorld),se.position.copy(ta),Dl.copy(se.position),Dl.add(L_[Te]),se.up.copy(N_[Te]),se.lookAt(Dl),se.updateMatrixWorld(),we.makeTranslation(-ta.x,-ta.y,-ta.z),xf.multiplyMatrices(se.projectionMatrix,se.matrixWorldInverse),J._frustum.setFromProjectionMatrix(xf,se.coordinateSystem,se.reversedDepth)}if(J.map.isWebGLCubeRenderTarget)i.setRenderTarget(J.map,Te),i.clear();else{Te===0&&(i.setRenderTarget(J.map),i.clear());let se=J.getViewport(Te);a.set(r.x*se.x,r.y*se.y,r.x*se.z,r.y*se.w),q.viewport(a)}n=J.getFrustum(Te),T(v,E,Fe,j,he,this.type)}J.isPointLightShadow!==!0&&this.type===js&&S(J,E),J.needsUpdate=!1}g=this.type,b.needsUpdate=!1,i.setRenderTarget(B,F,O)};function S(I,v){let E=e.update(w);d.defines.VSM_SAMPLES!==I.blurSamples&&(d.defines.VSM_SAMPLES=I.blurSamples,m.defines.VSM_SAMPLES=I.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),I.mapPass===null?I.mapPass=new Mn(s.x,s.y,{format:bn,type:Ft}):(I.mapPass.width!==I.map.width||I.mapPass.height!==I.map.height)&&I.mapPass.setSize(I.map.width,I.map.height),d.uniforms.shadow_pass.value=I.map.depthTexture,d.uniforms.resolution.value.set(I.map.width,I.map.height),d.uniforms.radius.value=I.radius,i.setRenderTarget(I.mapPass),i.clear(),i.renderBufferDirect(v,null,E,d,w,null),m.uniforms.shadow_pass.value=I.mapPass.texture,m.uniforms.resolution.value.set(I.map.width,I.map.height),m.uniforms.radius.value=I.radius,i.setRenderTarget(I.map),i.clear(),i.renderBufferDirect(v,null,E,m,w,null)}function R(I,v,E,B){let F=null,O=E.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(O!==void 0)F=O;else if(F=E.isPointLight===!0?c:o,i.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){let q=F.uuid,Y=v.uuid,N=l[q];N===void 0&&(N={},l[q]=N);let K=N[Y];K===void 0&&(K=F.clone(),N[Y]=K,v.addEventListener("dispose",P)),F=K}if(F.visible=v.visible,F.wireframe=v.wireframe,B===js?F.side=v.shadowSide!==null?v.shadowSide:v.side:F.side=v.shadowSide!==null?v.shadowSide:f[v.side],F.alphaMap=v.alphaMap,F.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,F.map=v.map,F.clipShadows=v.clipShadows,F.clippingPlanes=v.clippingPlanes,F.clipIntersection=v.clipIntersection,F.displacementMap=v.displacementMap,F.displacementScale=v.displacementScale,F.displacementBias=v.displacementBias,F.wireframeLinewidth=v.wireframeLinewidth,F.linewidth=v.linewidth,E.isPointLight===!0&&F.isMeshDistanceMaterial===!0){let q=i.properties.get(F);q.light=E}return F}function T(I,v,E,B,F,O){if(I.visible===!1)return;if(I.layers.test(F)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&O===js)&&(!I.frustumCulled||I.intersectsFrustum(n))){I.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,I.matrixWorld);let N=e.update(I),K=I.material;if(Array.isArray(K)){let j=N.groups;for(let J=0,de=j.length;J<de;J++){let Z=j[J],ae=K[Z.materialIndex];if(ae&&ae.visible){let he=R(I,ae,B,O);I.onBeforeShadow(i,I,v,E,N,he,Z),i.renderBufferDirect(E,null,N,he,I,Z),I.onAfterShadow(i,I,v,E,N,he,Z)}}}else if(K.visible){let j=R(I,K,B,O);I.onBeforeShadow(i,I,v,E,N,j,null),i.renderBufferDirect(E,null,N,j,I,null),I.onAfterShadow(i,I,v,E,N,j,null)}}let Y=I.children;for(let N=0,K=Y.length;N<K;N++)T(Y[N],v,E,B,F,O)}function P(I){I.target.removeEventListener("dispose",P);for(let E in l){let B=l[E],F=I.target.uuid;F in B&&(B[F].dispose(),delete B[F])}}}function U_(i,e){function t(){let U=!1,ne=new bt,$=null,Me=new bt(0,0,0,0);return{setMask:function(ge){$!==ge&&!U&&(i.colorMask(ge,ge,ge,ge),$=ge)},setLocked:function(ge){U=ge},setClear:function(ge,Se,Oe,et,_e){_e===!0&&(ge*=et,Se*=et,Oe*=et),ne.set(ge,Se,Oe,et),Me.equals(ne)===!1&&(i.clearColor(ge,Se,Oe,et),Me.copy(ne))},reset:function(){U=!1,$=null,Me.set(-1,0,0,0)}}}function n(){let U=!1,ne=!1,$=null,Me=null,ge=null;return{setReversed:function(Se){if(ne!==Se){let Oe=e.get("EXT_clip_control");Se?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),ne=Se;let et=ge;ge=null,this.setClear(et)}},getReversed:function(){return ne},setTest:function(Se){Se?pe(i.DEPTH_TEST):We(i.DEPTH_TEST)},setMask:function(Se){$!==Se&&!U&&(i.depthMask(Se),$=Se)},setFunc:function(Se){if(ne&&(Se=ju[Se]),Me!==Se){switch(Se){case qa:i.depthFunc(i.NEVER);break;case Xa:i.depthFunc(i.ALWAYS);break;case ja:i.depthFunc(i.LESS);break;case Ls:i.depthFunc(i.LEQUAL);break;case Ka:i.depthFunc(i.EQUAL);break;case Ya:i.depthFunc(i.GEQUAL);break;case Ja:i.depthFunc(i.GREATER);break;case Za:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Me=Se}},setLocked:function(Se){U=Se},setClear:function(Se){ge!==Se&&(ge=Se,ne&&(Se=1-Se),i.clearDepth(Se))},reset:function(){U=!1,$=null,Me=null,ge=null,ne=!1}}}function s(){let U=!1,ne=null,$=null,Me=null,ge=null,Se=null,Oe=null,et=null,_e=null;return{setTest:function(ze){U||(ze?pe(i.STENCIL_TEST):We(i.STENCIL_TEST))},setMask:function(ze){ne!==ze&&!U&&(i.stencilMask(ze),ne=ze)},setFunc:function(ze,$e,Pe){($!==ze||Me!==$e||ge!==Pe)&&(i.stencilFunc(ze,$e,Pe),$=ze,Me=$e,ge=Pe)},setOp:function(ze,$e,Pe){(Se!==ze||Oe!==$e||et!==Pe)&&(i.stencilOp(ze,$e,Pe),Se=ze,Oe=$e,et=Pe)},setLocked:function(ze){U=ze},setClear:function(ze){_e!==ze&&(i.clearStencil(ze),_e=ze)},reset:function(){U=!1,ne=null,$=null,Me=null,ge=null,Se=null,Oe=null,et=null,_e=null}}}let r=new t,a=new n,o=new s,c={},l=new WeakMap,u={},f={},d={},m=new WeakMap,x=[],w=null,b=!1,g=null,S=null,R=null,T=null,P=null,I=null,v=null,E=new Ue(0,0,0),B=0,F=!1,O=null,q=null,Y=null,N=null,K=null,j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,de=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(de=parseFloat(/^WebGL (\d)/.exec(Z)[1]),J=de>=1):Z.indexOf("OpenGL ES")!==-1&&(de=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),J=de>=2);let ae=null,he={},Te=i.getParameter(i.SCISSOR_BOX),Fe=i.getParameter(i.VIEWPORT),se=new bt().fromArray(Te),we=new bt().fromArray(Fe);function Le(U,ne,$,Me){let ge=new Uint8Array(4),Se=i.createTexture();i.bindTexture(U,Se),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<$;Oe++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,Me,0,i.RGBA,i.UNSIGNED_BYTE,ge):i.texImage2D(ne+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ge);return Se}let ke={};ke[i.TEXTURE_2D]=Le(i.TEXTURE_2D,i.TEXTURE_2D,1),ke[i.TEXTURE_CUBE_MAP]=Le(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ke[i.TEXTURE_2D_ARRAY]=Le(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ke[i.TEXTURE_3D]=Le(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),pe(i.DEPTH_TEST),a.setFunc(Ls),qt(!1),wt(el),pe(i.CULL_FACE),Pt(os);function pe(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function We(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function mt(U,ne){return d[U]!==ne?(i.bindFramebuffer(U,ne),d[U]=ne,U===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ne),U===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ge(U,ne){let $=x,Me=!1;if(U){$=m.get(ne),$===void 0&&($=[],m.set(ne,$));let ge=U.textures;if($.length!==ge.length||$[0]!==i.COLOR_ATTACHMENT0){for(let Se=0,Oe=ge.length;Se<Oe;Se++)$[Se]=i.COLOR_ATTACHMENT0+Se;$.length=ge.length,Me=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,Me=!0);Me&&i.drawBuffers($)}function ct(U){return w!==U?(i.useProgram(U),w=U,!0):!1}let lt={[cs]:i.FUNC_ADD,[mu]:i.FUNC_SUBTRACT,[gu]:i.FUNC_REVERSE_SUBTRACT};lt[_u]=i.MIN,lt[bu]=i.MAX;let at={[xu]:i.ZERO,[vu]:i.ONE,[yu]:i.SRC_COLOR,[sl]:i.SRC_ALPHA,[Au]:i.SRC_ALPHA_SATURATE,[wu]:i.DST_COLOR,[Mu]:i.DST_ALPHA,[Su]:i.ONE_MINUS_SRC_COLOR,[rl]:i.ONE_MINUS_SRC_ALPHA,[Tu]:i.ONE_MINUS_DST_COLOR,[Eu]:i.ONE_MINUS_DST_ALPHA,[Ru]:i.CONSTANT_COLOR,[Cu]:i.ONE_MINUS_CONSTANT_COLOR,[Pu]:i.CONSTANT_ALPHA,[Iu]:i.ONE_MINUS_CONSTANT_ALPHA};function Pt(U,ne,$,Me,ge,Se,Oe,et,_e,ze){if(U===os){b===!0&&(We(i.BLEND),b=!1);return}if(b===!1&&(pe(i.BLEND),b=!0),U!==pu){if(U!==g||ze!==F){if((S!==cs||P!==cs)&&(i.blendEquation(i.FUNC_ADD),S=cs,P=cs),ze)switch(U){case Ks:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tl:i.blendFunc(i.ONE,i.ONE);break;case nl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case il:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye("WebGLState: Invalid blending: ",U);break}else switch(U){case Ks:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case tl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case nl:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case il:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",U);break}R=null,T=null,I=null,v=null,E.set(0,0,0),B=0,g=U,F=ze}return}ge=ge||ne,Se=Se||$,Oe=Oe||Me,(ne!==S||ge!==P)&&(i.blendEquationSeparate(lt[ne],lt[ge]),S=ne,P=ge),($!==R||Me!==T||Se!==I||Oe!==v)&&(i.blendFuncSeparate(at[$],at[Me],at[Se],at[Oe]),R=$,T=Me,I=Se,v=Oe),(et.equals(E)===!1||_e!==B)&&(i.blendColor(et.r,et.g,et.b,_e),E.copy(et),B=_e),g=U,F=!1}function At(U,ne){U.side===un?We(i.CULL_FACE):pe(i.CULL_FACE);let $=U.side===zt;ne&&($=!$),qt($),U.blending===Ks&&U.transparent===!1?Pt(os):Pt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);let Me=U.stencilWrite;o.setTest(Me),Me&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),It(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?pe(i.SAMPLE_ALPHA_TO_COVERAGE):We(i.SAMPLE_ALPHA_TO_COVERAGE)}function qt(U){O!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),O=U)}function wt(U){U!==uu?(pe(i.CULL_FACE),U!==q&&(U===el?i.cullFace(i.BACK):U===fu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):We(i.CULL_FACE),q=U}function An(U){U!==Y&&(J&&i.lineWidth(U),Y=U)}function It(U,ne,$){U?(pe(i.POLYGON_OFFSET_FILL),(N!==ne||K!==$)&&(N=ne,K=$,a.getReversed()&&(ne=-ne,$=-$),i.polygonOffset(ne,$))):We(i.POLYGON_OFFSET_FILL)}function nn(U){U?pe(i.SCISSOR_TEST):We(i.SCISSOR_TEST)}function sn(U){U===void 0&&(U=i.TEXTURE0+j-1),ae!==U&&(i.activeTexture(U),ae=U)}function fn(U,ne,$){$===void 0&&(ae===null?$=i.TEXTURE0+j-1:$=ae);let Me=he[$];Me===void 0&&(Me={type:void 0,texture:void 0},he[$]=Me),(Me.type!==U||Me.texture!==ne)&&(ae!==$&&(i.activeTexture($),ae=$),i.bindTexture(U,ne||ke[U]),Me.type=U,Me.texture=ne)}function H(){let U=he[ae];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function rn(){try{i.compressedTexImage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function vt(){try{i.compressedTexImage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function yt(){try{i.texSubImage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function Ae(){try{i.texSubImage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function Dt(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function He(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function Je(){try{i.texStorage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function L(){try{i.texStorage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function y(){try{i.texImage2D(...arguments)}catch(U){Ye("WebGLState:",U)}}function X(){try{i.texImage3D(...arguments)}catch(U){Ye("WebGLState:",U)}}function me(U){return f[U]!==void 0?f[U]:i.getParameter(U)}function oe(U,ne){f[U]!==ne&&(i.pixelStorei(U,ne),f[U]=ne)}function ve(U){se.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),se.copy(U))}function Re(U){we.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),we.copy(U))}function te(U,ne){let $=l.get(ne);$===void 0&&($=new WeakMap,l.set(ne,$));let Me=$.get(U);Me===void 0&&(Me=i.getUniformBlockIndex(ne,U.name),i.uniformBlockBinding(ne,Me,Me),$.set(U,Me))}function ie(U,ne,$){let ge=l.get(ne).get(U);c[ge]!==$&&(i.bindBufferBase(i.UNIFORM_BUFFER,ge,$),c[ge]=$)}function ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},ae=null,he={},d={},c={},m=new WeakMap,x=[],w=null,b=!1,g=null,S=null,R=null,T=null,P=null,I=null,v=null,E=new Ue(0,0,0),B=0,F=!1,O=null,q=null,Y=null,N=null,K=null,se.set(0,0,i.canvas.width,i.canvas.height),we.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:pe,disable:We,bindFramebuffer:mt,drawBuffers:Ge,useProgram:ct,setBlending:Pt,setMaterial:At,setFlipSided:qt,setCullFace:wt,setLineWidth:An,setPolygonOffset:It,setScissorTest:nn,activeTexture:sn,bindTexture:fn,unbindTexture:H,compressedTexImage2D:rn,compressedTexImage3D:vt,texImage2D:y,texImage3D:X,pixelStorei:oe,getParameter:me,updateUBOMapping:te,uniformBlockBinding:ie,texStorage2D:Je,texStorage3D:L,texSubImage2D:yt,texSubImage3D:Ae,compressedTexSubImage2D:Dt,compressedTexSubImage3D:He,scissor:ve,viewport:Re,reset:ye}}function O_(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xe,u=new WeakMap,f=new Set,d,m=new WeakMap,x=new Set,w=new FinalizationRegistry(L=>x.delete(L)),b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,y){return b?new OffscreenCanvas(L,y):Us("canvas")}function S(L,y,X){let me=1,oe=Je(L);if((oe.width>X||oe.height>X)&&(me=X/Math.max(oe.width,oe.height)),me<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let ve=Math.floor(me*oe.width),Re=Math.floor(me*oe.height);d===void 0&&(d=g(ve,Re));let te=y?g(ve,Re):d;return te.width=ve,te.height=Re,te.getContext("2d").drawImage(L,0,0,ve,Re),Be("WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+ve+"x"+Re+")."),te}else return"data"in L&&Be("WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),L;return L}function R(L){return L.generateMipmaps}function T(L){i.generateMipmap(L)}function P(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function I(L,y,X,me,oe,ve=!1){if(L!==null){if(i[L]!==void 0)return i[L];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Re;me&&(Re=e.get("EXT_texture_norm16"),Re||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let te=y;if(y===i.RED&&(X===i.FLOAT&&(te=i.R32F),X===i.HALF_FLOAT&&(te=i.R16F),X===i.UNSIGNED_BYTE&&(te=i.R8),X===i.UNSIGNED_SHORT&&Re&&(te=Re.R16_EXT),X===i.SHORT&&Re&&(te=Re.R16_SNORM_EXT)),y===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.R8UI),X===i.UNSIGNED_SHORT&&(te=i.R16UI),X===i.UNSIGNED_INT&&(te=i.R32UI),X===i.BYTE&&(te=i.R8I),X===i.SHORT&&(te=i.R16I),X===i.INT&&(te=i.R32I)),y===i.RG&&(X===i.FLOAT&&(te=i.RG32F),X===i.HALF_FLOAT&&(te=i.RG16F),X===i.UNSIGNED_BYTE&&(te=i.RG8),X===i.UNSIGNED_SHORT&&Re&&(te=Re.RG16_EXT),X===i.SHORT&&Re&&(te=Re.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RG8UI),X===i.UNSIGNED_SHORT&&(te=i.RG16UI),X===i.UNSIGNED_INT&&(te=i.RG32UI),X===i.BYTE&&(te=i.RG8I),X===i.SHORT&&(te=i.RG16I),X===i.INT&&(te=i.RG32I)),y===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RGB8UI),X===i.UNSIGNED_SHORT&&(te=i.RGB16UI),X===i.UNSIGNED_INT&&(te=i.RGB32UI),X===i.BYTE&&(te=i.RGB8I),X===i.SHORT&&(te=i.RGB16I),X===i.INT&&(te=i.RGB32I)),y===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),X===i.UNSIGNED_INT&&(te=i.RGBA32UI),X===i.BYTE&&(te=i.RGBA8I),X===i.SHORT&&(te=i.RGBA16I),X===i.INT&&(te=i.RGBA32I)),y===i.RGB&&(X===i.UNSIGNED_SHORT&&Re&&(te=Re.RGB16_EXT),X===i.SHORT&&Re&&(te=Re.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(te=i.R11F_G11F_B10F)),y===i.RGBA){let ie=ve?yr:it.getTransfer(oe);X===i.FLOAT&&(te=i.RGBA32F),X===i.HALF_FLOAT&&(te=i.RGBA16F),X===i.UNSIGNED_BYTE&&(te=ie===pt?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&Re&&(te=Re.RGBA16_EXT),X===i.SHORT&&Re&&(te=Re.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function v(L,y){let X;return L?y===null||y===kn||y===ds?X=i.DEPTH24_STENCIL8:y===Nt?X=i.DEPTH32F_STENCIL8:y===Zs&&(X=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===kn||y===ds?X=i.DEPTH_COMPONENT24:y===Nt?X=i.DEPTH_COMPONENT32F:y===Zs&&(X=i.DEPTH_COMPONENT16),X}function E(L,y){return R(L)===!0||L.isFramebufferTexture&&L.minFilter!==Lt&&L.minFilter!==_t?Math.log2(Math.max(y.width,y.height))+1:L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?y.mipmaps.length:1}function B(L){let y=new WeakRef(L);n.get(L).__ref=y,x.add(y),w.register(L,y,y)}function F(L){let y=n.get(L).__ref;y!==void 0&&(x.delete(y),w.unregister(y))}function O(L){Y(L.target)}function q(L){N(L.target)}function Y(L){L.removeEventListener("dispose",O),F(L),j(L),L.isVideoTexture&&u.delete(L),L.isHTMLTexture&&f.delete(L)}function N(L){L.removeEventListener("dispose",q),F(L),de(L)}function K(){for(let L of x){let y=L.deref();y!==void 0&&(y.isRenderTarget===!0?N(y):Y(y))}x.clear(),f.clear()}function j(L){let y=n.get(L);if(y.__webglInit===void 0)return;let X=L.source,me=m.get(X);if(me){let oe=me[y.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&J(L),Object.keys(me).length===0&&m.delete(X)}n.remove(L)}function J(L){let y=n.get(L);i.deleteTexture(y.__webglTexture);let X=L.source,me=m.get(X);delete me[y.__cacheKey],a.memory.textures--}function de(L){let y=n.get(L);y.__depthDisposeCallback&&y.__depthDisposeCallback();let X=L.depthTexture;if(X&&X.renderTarget===L&&Y(X),L.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(y.__webglFramebuffer[oe]))for(let ve=0;ve<y.__webglFramebuffer[oe].length;ve++)i.deleteFramebuffer(y.__webglFramebuffer[oe][ve]);else i.deleteFramebuffer(y.__webglFramebuffer[oe]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[oe])}else{if(Array.isArray(y.__webglFramebuffer))for(let oe=0;oe<y.__webglFramebuffer.length;oe++)i.deleteFramebuffer(y.__webglFramebuffer[oe]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let oe=0;oe<y.__webglColorRenderbuffer.length;oe++)y.__webglColorRenderbuffer[oe]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[oe]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let me=L.textures;for(let oe=0,ve=me.length;oe<ve;oe++){let Re=n.get(me[oe]);Re.__webglTexture&&(i.deleteTexture(Re.__webglTexture),a.memory.textures--),n.remove(me[oe])}n.remove(L)}let Z=0;function ae(){Z=0}function he(){return Z}function Te(L){Z=L}function Fe(){let L=Z;return L>=s.maxTextures&&Be("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),Z+=1,L}function se(L){let y=[];return y.push(L.wrapS),y.push(L.wrapT),y.push(L.wrapR||0),y.push(L.magFilter),y.push(L.minFilter),y.push(L.anisotropy),y.push(L.internalFormat),y.push(L.format),y.push(L.type),y.push(L.generateMipmaps),y.push(L.mipmapsAutoUpdate),y.push(L.premultiplyAlpha),y.push(L.flipY),y.push(L.unpackAlignment),y.push(L.colorSpace),y.join()}function we(L,y){let X=n.get(L);if(L.isVideoTexture&&Dt(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&X.__version!==L.version){let me=L.image;if(me===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(me.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{At(X,L,y);return}}else L.isExternalTexture&&(X.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+y)}function Le(L,y){let X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){At(X,L,y);return}else L.isExternalTexture&&(X.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+y)}function ke(L,y){let X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){At(X,L,y);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+y)}function pe(L,y){let X=n.get(L);if(L.version>0&&X.__version!==L.version){qt(X,L,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+y)}let We={[Fi]:i.REPEAT,[pn]:i.CLAMP_TO_EDGE,[Ns]:i.MIRRORED_REPEAT},mt={[Lt]:i.NEAREST,[bo]:i.NEAREST_MIPMAP_NEAREST,[fs]:i.NEAREST_MIPMAP_LINEAR,[_t]:i.LINEAR,[Js]:i.LINEAR_MIPMAP_NEAREST,[Tn]:i.LINEAR_MIPMAP_LINEAR},Ge={[ku]:i.NEVER,[vl]:i.ALWAYS,[zu]:i.LESS,[bl]:i.LEQUAL,[Hu]:i.EQUAL,[xl]:i.GEQUAL,[Gu]:i.GREATER,[Vu]:i.NOTEQUAL};function ct(L,y){if(y.type===Nt&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===_t||y.magFilter===Js||y.magFilter===fs||y.magFilter===Tn||y.minFilter===_t||y.minFilter===Js||y.minFilter===fs||y.minFilter===Tn)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,We[y.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,We[y.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,We[y.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,mt[y.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,mt[y.minFilter]),y.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Ge[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Lt||y.minFilter!==fs&&y.minFilter!==Tn||y.type===Nt&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function lt(L,y){let X=!1;L.__webglInit===void 0&&(L.__webglInit=!0,y.addEventListener("dispose",O),B(y));let me=y.source,oe=m.get(me);oe===void 0&&(oe={},m.set(me,oe));let ve=se(y);if(ve!==L.__cacheKey){oe[ve]===void 0&&(oe[ve]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),oe[ve].usedTimes++;let Re=oe[L.__cacheKey];Re!==void 0&&(oe[L.__cacheKey].usedTimes--,Re.usedTimes===0&&J(y)),L.__cacheKey=ve,L.__webglTexture=oe[ve].texture}return X}function at(L,y,X){return Math.floor(Math.floor(L/X)/y)}function Pt(L,y,X,me){let ve=L.updateRanges;if(ve.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,X,me,y.data);else{ve.sort((U,ne)=>U.start-ne.start);let Re=0;for(let U=1;U<ve.length;U++){let ne=ve[Re],$=ve[U],Me=ne.start+ne.count,ge=at($.start,y.width,4),Se=at(ne.start,y.width,4);$.start<=Me+1&&ge===Se&&at($.start+$.count-1,y.width,4)===ge?ne.count=Math.max(ne.count,$.start+$.count-ne.start):(++Re,ve[Re]=$)}ve.length=Re+1;let te=t.getParameter(i.UNPACK_ROW_LENGTH),ie=t.getParameter(i.UNPACK_SKIP_PIXELS),ye=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let U=0,ne=ve.length;U<ne;U++){let $=ve[U],Me=Math.floor($.start/4),ge=Math.ceil($.count/4),Se=Me%y.width,Oe=Math.floor(Me/y.width),et=ge,_e=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Se),t.pixelStorei(i.UNPACK_SKIP_ROWS,Oe),t.texSubImage2D(i.TEXTURE_2D,0,Se,Oe,et,_e,X,me,y.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,te),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function At(L,y,X){let me=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(me=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(me=i.TEXTURE_3D);let oe=lt(L,y),ve=y.source;t.bindTexture(me,L.__webglTexture,i.TEXTURE0+X);let Re=n.get(ve);if(ve.version!==Re.__version||oe===!0){if(t.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let _e=it.getPrimaries(it.workingColorSpace),ze=y.colorSpace===wi?null:it.getPrimaries(y.colorSpace),$e=y.colorSpace===wi||_e===ze?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let ie=S(y.image,!1,s.maxTextureSize);ie=He(y,ie);let ye=r.convert(y.format,y.colorSpace),U=r.convert(y.type),ne=I(y.internalFormat,ye,U,y.normalized,y.colorSpace,y.isVideoTexture);ct(me,y);let $,Me=y.mipmaps,ge=y.isVideoTexture!==!0,Se=Re.__version===void 0||oe===!0,Oe=ve.dataReady,et=E(y,ie);if(y.isDepthTexture)ne=v(y.format===Mi,y.type),Se&&(ge?t.texStorage2D(i.TEXTURE_2D,1,ne,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,ne,ie.width,ie.height,0,ye,U,null));else if(y.isDataTexture)if(Me.length>0){ge&&Se&&t.texStorage2D(i.TEXTURE_2D,et,ne,Me[0].width,Me[0].height);for(let _e=0,ze=Me.length;_e<ze;_e++)$=Me[_e],ge?Oe&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,$.width,$.height,ye,U,$.data):t.texImage2D(i.TEXTURE_2D,_e,ne,$.width,$.height,0,ye,U,$.data);y.generateMipmaps=!1}else ge?(Se&&t.texStorage2D(i.TEXTURE_2D,et,ne,ie.width,ie.height),Oe&&Pt(y,ie,ye,U)):t.texImage2D(i.TEXTURE_2D,0,ne,ie.width,ie.height,0,ye,U,ie.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ge&&Se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,et,ne,Me[0].width,Me[0].height,ie.depth);for(let _e=0,ze=Me.length;_e<ze;_e++)if($=Me[_e],y.format!==Ut)if(ye!==null)if(ge){if(Oe)if(y.layerUpdates.size>0){let $e=Pl($.width,$.height,y.format,y.type);for(let Pe of y.layerUpdates){let ut=$.data.subarray(Pe*$e/$.data.BYTES_PER_ELEMENT,(Pe+1)*$e/$.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,Pe,$.width,$.height,1,ye,ut)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,$.width,$.height,ie.depth,ye,$.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,_e,ne,$.width,$.height,ie.depth,0,$.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ge?Oe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,_e,0,0,0,$.width,$.height,ie.depth,ye,U,$.data):t.texImage3D(i.TEXTURE_2D_ARRAY,_e,ne,$.width,$.height,ie.depth,0,ye,U,$.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ge&&Se&&t.texStorage2D(i.TEXTURE_2D,et,ne,Me[0].width,Me[0].height);for(let _e=0,ze=Me.length;_e<ze;_e++)$=Me[_e],y.format!==Ut?ye!==null?ge?Oe&&t.compressedTexSubImage2D(i.TEXTURE_2D,_e,0,0,$.width,$.height,ye,$.data):t.compressedTexImage2D(i.TEXTURE_2D,_e,ne,$.width,$.height,0,$.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ge?Oe&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,$.width,$.height,ye,U,$.data):t.texImage2D(i.TEXTURE_2D,_e,ne,$.width,$.height,0,ye,U,$.data)}else if(y.isDataArrayTexture)if(ge){if(Se&&t.texStorage3D(i.TEXTURE_2D_ARRAY,et,ne,ie.width,ie.height,ie.depth),Oe)if(y.layerUpdates.size>0){let _e=Pl(ie.width,ie.height,y.format,y.type);for(let ze of y.layerUpdates){let $e=ie.data.subarray(ze*_e/ie.data.BYTES_PER_ELEMENT,(ze+1)*_e/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ze,ie.width,ie.height,1,ye,U,$e)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ye,U,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ne,ie.width,ie.height,ie.depth,0,ye,U,ie.data);else if(y.isData3DTexture)ge?(Se&&t.texStorage3D(i.TEXTURE_3D,et,ne,ie.width,ie.height,ie.depth),Oe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ye,U,ie.data)):t.texImage3D(i.TEXTURE_3D,0,ne,ie.width,ie.height,ie.depth,0,ye,U,ie.data);else if(y.isFramebufferTexture){if(Se)if(ge)t.texStorage2D(i.TEXTURE_2D,et,ne,ie.width,ie.height);else{let _e=ie.width,ze=ie.height;for(let $e=0;$e<et;$e++)t.texImage2D(i.TEXTURE_2D,$e,ne,_e,ze,0,ye,U,null),_e>>=1,ze>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){let _e=i.canvas;if(_e.hasAttribute("layoutsubtree")||_e.setAttribute("layoutsubtree","true"),ie.parentNode!==_e){_e.appendChild(ie),f.add(y),_e.onpaint=ze=>{let $e=ze.changedElements;for(let Pe of f)$e.includes(Pe.image)&&(Pe.needsUpdate=!0)},_e.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ie);else{let $e=i.RGBA,Pe=i.RGBA,ut=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,$e,Pe,ut,ie)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Me.length>0){if(ge&&Se){let _e=Je(Me[0]);t.texStorage2D(i.TEXTURE_2D,et,ne,_e.width,_e.height)}for(let _e=0,ze=Me.length;_e<ze;_e++)$=Me[_e],ge?Oe&&t.texSubImage2D(i.TEXTURE_2D,_e,0,0,ye,U,$):t.texImage2D(i.TEXTURE_2D,_e,ne,ye,U,$);y.generateMipmaps=!1}else if(ge){if(Se){let _e=Je(ie);t.texStorage2D(i.TEXTURE_2D,et,ne,_e.width,_e.height)}Oe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ye,U,ie)}else t.texImage2D(i.TEXTURE_2D,0,ne,ye,U,ie);R(y)&&y.mipmapsAutoUpdate===!0&&T(me),Re.__version=ve.version,y.onUpdate&&y.onUpdate(y)}L.__version=y.version}function qt(L,y,X){if(y.image.length!==6)return;let me=lt(L,y),oe=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+X);let ve=n.get(oe);if(oe.version!==ve.__version||me===!0){t.activeTexture(i.TEXTURE0+X);let Re=it.getPrimaries(it.workingColorSpace),te=y.colorSpace===wi?null:it.getPrimaries(y.colorSpace),ie=y.colorSpace===wi||Re===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let ye=y.isCompressedTexture||y.image[0].isCompressedTexture,U=y.image[0]&&y.image[0].isDataTexture,ne=[];for(let Pe=0;Pe<6;Pe++)!ye&&!U?ne[Pe]=S(y.image[Pe],!0,s.maxCubemapSize):ne[Pe]=U?y.image[Pe].image:y.image[Pe],ne[Pe]=He(y,ne[Pe]);let $=ne[0],Me=r.convert(y.format,y.colorSpace),ge=r.convert(y.type),Se=I(y.internalFormat,Me,ge,y.normalized,y.colorSpace),Oe=y.isVideoTexture!==!0,et=ve.__version===void 0||me===!0,_e=oe.dataReady,ze=E(y,$);ct(i.TEXTURE_CUBE_MAP,y);let $e;if(y.isDepthTexture){if(Se=v(y.format===Mi,y.type),et)if(Oe)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,Se,$.width,$.height);else for(let Pe=0;Pe<6;Pe++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Se,$.width,$.height,0,Me,ge,null)}else if(ye){Oe&&et&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ze,Se,$.width,$.height);for(let Pe=0;Pe<6;Pe++){$e=ne[Pe].mipmaps;for(let ut=0;ut<$e.length;ut++){let Ot=$e[ut];y.format!==Ut?Me!==null?Oe?_e&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,ut,0,0,Ot.width,Ot.height,Me,Ot.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,ut,Se,Ot.width,Ot.height,0,Ot.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,ut,0,0,Ot.width,Ot.height,Me,ge,Ot.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,ut,Se,Ot.width,Ot.height,0,Me,ge,Ot.data)}}}else{if($e=y.mipmaps,Oe&&et){$e.length>0&&ze++;let Pe=Je(ne[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ze,Se,Pe.width,Pe.height)}for(let Pe=0;Pe<6;Pe++)if(U){Oe?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,0,0,ne[Pe].width,ne[Pe].height,Me,ge,ne[Pe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Se,ne[Pe].width,ne[Pe].height,0,Me,ge,ne[Pe].data);for(let ut=0;ut<$e.length;ut++){let Gn=$e[ut].image[Pe].image;Oe?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,ut+1,0,0,Gn.width,Gn.height,Me,ge,Gn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,ut+1,Se,Gn.width,Gn.height,0,Me,ge,Gn.data)}}else{Oe?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,0,0,Me,ge,ne[Pe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,Se,Me,ge,ne[Pe]);for(let ut=0;ut<$e.length;ut++){let Ot=$e[ut];Oe?_e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,ut+1,0,0,Me,ge,Ot.image[Pe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,ut+1,Se,Me,ge,Ot.image[Pe])}}}R(y)&&y.mipmapsAutoUpdate===!0&&T(i.TEXTURE_CUBE_MAP),ve.__version=oe.version,y.onUpdate&&y.onUpdate(y)}L.__version=y.version}function wt(L,y,X,me,oe,ve){let Re=r.convert(X.format,X.colorSpace),te=r.convert(X.type),ie=I(X.internalFormat,Re,te,X.normalized,X.colorSpace),ye=n.get(y),U=n.get(X);if(U.__renderTarget=y,!ye.__hasExternalTextures){let ne=Math.max(1,y.width>>ve),$=Math.max(1,y.height>>ve);oe===i.TEXTURE_3D||oe===i.TEXTURE_2D_ARRAY?t.texImage3D(oe,ve,ie,ne,$,y.depth,0,Re,te,null):t.texImage2D(oe,ve,ie,ne,$,0,Re,te,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),Ae(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,me,oe,U.__webglTexture,0,yt(y)):(oe===i.TEXTURE_2D||oe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,me,oe,U.__webglTexture,ve),t.bindFramebuffer(i.FRAMEBUFFER,null)}function An(L,y,X){if(i.bindRenderbuffer(i.RENDERBUFFER,L),y.depthBuffer){let me=y.depthTexture,oe=me&&me.isDepthTexture?me.type:null,ve=v(y.stencilBuffer,oe),Re=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ae(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(y),ve,y.width,y.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(y),ve,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ve,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,L)}else{let me=y.textures;for(let oe=0;oe<me.length;oe++){let ve=me[oe],Re=r.convert(ve.format,ve.colorSpace),te=r.convert(ve.type),ie=I(ve.internalFormat,Re,te,ve.normalized,ve.colorSpace);Ae(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(y),ie,y.width,y.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(y),ie,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ie,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function It(L,y,X){let me=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let oe=n.get(y.depthTexture);oe.__renderTarget=y;let ve=me?y.depthTexture.image[0]:y.depthTexture.image;(!oe.__webglTexture||ve.width!==y.width||ve.height!==y.height)&&(ve.width=y.width,ve.height=y.height,y.depthTexture.needsUpdate=!0),me?pe(y.depthTexture,0):we(y.depthTexture,0);let Re=oe.__webglTexture,te=yt(y),ie=me?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,ye=y.depthTexture.format===Mi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===pi)Ae(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ye,ie,Re,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,ye,ie,Re,0);else if(y.depthTexture.format===Mi)Ae(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ye,ie,Re,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,ye,ie,Re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function nn(L){let y=n.get(L),X=L.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==L.depthTexture){let me=L.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),me){let oe=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,me.removeEventListener("dispose",oe)};me.addEventListener("dispose",oe),y.__depthDisposeCallback=oe}y.__boundDepthTexture=me}if(L.depthTexture&&!y.__autoAllocateDepthBuffer)if(X)for(let me=0;me<6;me++)It(y.__webglFramebuffer[me],L,me);else L.texture.mipmaps.length>0?It(y.__webglFramebuffer[0],L,0):It(y.__webglFramebuffer,L,0);else if(X){y.__webglDepthbuffer=[];for(let me=0;me<6;me++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[me]),y.__webglDepthbuffer[me]===void 0)y.__webglDepthbuffer[me]=i.createRenderbuffer(),An(y.__webglDepthbuffer[me],L,!1);else{let oe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=y.__webglDepthbuffer[me];i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,ve)}}else if(L.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),An(y.__webglDepthbuffer,L,!1);else{let oe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ve),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,ve)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function sn(L,y,X){let me=n.get(L);y!==void 0&&wt(me.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&nn(L)}function fn(L){let y=L.texture,X=n.get(L),me=n.get(y);L.addEventListener("dispose",q),B(L);let oe=L.textures,ve=L.isWebGLCubeRenderTarget===!0,Re=oe.length>1;if(Re||(me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture()),me.__version=y.version,a.memory.textures++),ve){X.__webglFramebuffer=[];for(let te=0;te<6;te++)if(y.mipmaps.length>0){X.__webglFramebuffer[te]=[];for(let ie=0;ie<y.mipmaps.length;ie++)X.__webglFramebuffer[te][ie]=i.createFramebuffer()}else X.__webglFramebuffer[te]=i.createFramebuffer()}else{if(y.mipmaps.length>0){X.__webglFramebuffer=[];for(let te=0;te<y.mipmaps.length;te++)X.__webglFramebuffer[te]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Re)for(let te=0,ie=oe.length;te<ie;te++){let ye=n.get(oe[te]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&Ae(L)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let te=0;te<oe.length;te++){let ie=oe[te];X.__webglColorRenderbuffer[te]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[te]);let ye=r.convert(ie.format,ie.colorSpace),U=r.convert(ie.type),ne=I(ie.internalFormat,ye,U,ie.normalized,ie.colorSpace,L.isXRRenderTarget===!0),$=yt(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,$,ne,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+te,i.RENDERBUFFER,X.__webglColorRenderbuffer[te])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),An(X.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ve){t.bindTexture(i.TEXTURE_CUBE_MAP,me.__webglTexture),ct(i.TEXTURE_CUBE_MAP,y);for(let te=0;te<6;te++)if(y.mipmaps.length>0)for(let ie=0;ie<y.mipmaps.length;ie++)wt(X.__webglFramebuffer[te][ie],L,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ie);else wt(X.__webglFramebuffer[te],L,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);R(y)?T(i.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),t.unbindTexture()}else if(Re){for(let te=0,ie=oe.length;te<ie;te++){let ye=oe[te],U=n.get(ye),ne=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ne=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,U.__webglTexture),ct(ne,ye),wt(X.__webglFramebuffer,L,ye,i.COLOR_ATTACHMENT0+te,ne,0),R(ye)&&T(ne)}t.unbindTexture()}else{let te=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(te=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,me.__webglTexture),ct(te,y),y.mipmaps.length>0)for(let ie=0;ie<y.mipmaps.length;ie++)wt(X.__webglFramebuffer[ie],L,y,i.COLOR_ATTACHMENT0,te,ie);else wt(X.__webglFramebuffer,L,y,i.COLOR_ATTACHMENT0,te,0);R(y)?T(te):y.mipmaps.length>0&&i.texParameteri(te,i.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),t.unbindTexture()}L.depthBuffer&&nn(L)}function H(L){let y=L.textures;for(let X=0,me=y.length;X<me;X++){let oe=y[X];if(R(oe)&&oe.mipmapsAutoUpdate===!0){let ve=P(L),Re=n.get(oe).__webglTexture;t.bindTexture(ve,Re),T(ve),t.unbindTexture()}}}let rn=[];function vt(L){if(L.samples>0){if(Ae(L)===!1){let y=L.textures,X=L.width,me=L.height,oe=i.COLOR_BUFFER_BIT,ve=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(L),te=y.length>1;if(te)for(let ye=0;ye<y.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),L.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let ye=0;ye<y.length;ye++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(oe|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(oe|=i.STENCIL_BUFFER_BIT)),te){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[ye]);let U=n.get(y[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,U,0)}i.blitFramebuffer(0,0,X,me,0,0,X,me,oe,i.NEAREST),c===!0&&(rn.length=0,rn.push(i.COLOR_ATTACHMENT0+ye),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&rn.push(ve),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rn))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),te)for(let ye=0;ye<y.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,Re.__webglColorRenderbuffer[ye]);let U=n.get(y[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,U,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){let y=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function yt(L){return Math.min(s.maxSamples,L.samples)}function Ae(L){let y=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Dt(L){let y=a.render.frame;u.get(L)!==y&&(u.set(L,y),L.update())}function He(L,y){let X=L.colorSpace,me=L.format,oe=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||X!==Mt&&X!==wi&&(it.getTransfer(X)===pt?(me!==Ut||oe!==_n)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",X)),y}function Je(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=Fe,this.resetTextureUnits=ae,this.getTextureUnits=he,this.setTextureUnits=Te,this.setTexture2D=we,this.setTexture2DArray=Le,this.setTexture3D=ke,this.setTextureCube=pe,this.rebindTextures=sn,this.setupRenderTarget=fn,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=nn,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=Ae,this.dispose=K}function B_(i,e){function t(n,s=wi){let r,a=it.getTransfer(s);if(n===_n)return i.UNSIGNED_BYTE;if(n===vo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===dl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ul)return i.BYTE;if(n===fl)return i.SHORT;if(n===Zs)return i.UNSIGNED_SHORT;if(n===xo)return i.INT;if(n===kn)return i.UNSIGNED_INT;if(n===Nt)return i.FLOAT;if(n===Ft)return i.HALF_FLOAT;if(n===ml)return i.ALPHA;if(n===gl)return i.RGB;if(n===Ut)return i.RGBA;if(n===pi)return i.DEPTH_COMPONENT;if(n===Mi)return i.DEPTH_STENCIL;if(n===Ei)return i.RED;if(n===So)return i.RED_INTEGER;if(n===bn)return i.RG;if(n===Mo)return i.RG_INTEGER;if(n===Eo)return i.RGBA_INTEGER;if(n===jr||n===Kr||n===Yr||n===Jr)if(a===pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wo||n===To||n===Ao||n===Ro)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===To)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ao)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ro)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Co||n===Po||n===Io||n===Do||n===Lo||n===Zr||n===No)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Co||n===Po)return a===pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Io)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Do)return r.COMPRESSED_R11_EAC;if(n===Lo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Zr)return r.COMPRESSED_RG11_EAC;if(n===No)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Fo||n===Uo||n===Oo||n===Bo||n===ko||n===zo||n===Ho||n===Go||n===Vo||n===Wo||n===qo||n===Xo||n===jo||n===Ko)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Fo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Uo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Oo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Bo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ko)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ho)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Go)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Vo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===jo)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ko)return a===pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Yo||n===Jo||n===Zo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Yo)return a===pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Jo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Zo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===$o||n===Qo||n===$r||n===ec)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===$o)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Qo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$r)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ec)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var k_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,z_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,kl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Nr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Yn({vertexShader:k_,fragmentShader:z_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xt(new ki(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},zl=class extends On{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,d=null,m=null,x=null,w=typeof XRWebGLBinding<"u",b=new kl,g={},S=t.getContextAttributes(),R=null,T=null,P=[],I=[],v=new Xe,E=null,B=null,F=new Ht;F.viewport=new bt;let O=new Ht;O.viewport=new bt;let q=[F,O],Y=new mo,N=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let we=P[se];return we===void 0&&(we=new ks,P[se]=we),we.getTargetRaySpace()},this.getControllerGrip=function(se){let we=P[se];return we===void 0&&(we=new ks,P[se]=we),we.getGripSpace()},this.getHand=function(se){let we=P[se];return we===void 0&&(we=new ks,P[se]=we),we.getHandSpace()};function j(se){let we=I.indexOf(se.inputSource);if(we===-1)return;let Le=P[we];Le!==void 0&&(Le.update(se.inputSource,se.frame,l||a),Le.dispatchEvent({type:se.type,data:se.inputSource}))}function J(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",de);for(let se=0;se<P.length;se++){let we=I[se];we!==null&&(I[se]=null,P[se].disconnect(we))}N=null,K=null,b.reset();for(let se in g)delete g[se];if(e.setRenderTarget(R),m=null,d=null,f=null,s=null,T=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(v.width,v.height,!1),B!==null){let se=B.camera;se.fov=B.fov,se.zoom=B.zoom,se.updateProjectionMatrix(),B=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){o=se,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(se){l=se},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return f===null&&w&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",J),s.addEventListener("inputsourceschange",de),S.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(v),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let Le=null,ke=null,pe=null;S.depth&&(pe=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Le=S.stencil?Mi:pi,ke=S.stencil?ds:kn);let We={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(We),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),T=new Mn(d.textureWidth,d.textureHeight,{format:Ut,type:_n,depthTexture:new bi(d.textureWidth,d.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,Le),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Le={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Le),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new Mn(m.framebufferWidth,m.framebufferHeight,{format:Ut,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return b.getDepthTexture()};function de(se){for(let we=0;we<se.removed.length;we++){let Le=se.removed[we],ke=I.indexOf(Le);ke>=0&&(I[ke]=null,P[ke].disconnect(Le))}for(let we=0;we<se.added.length;we++){let Le=se.added[we],ke=I.indexOf(Le);if(ke===-1){for(let We=0;We<P.length;We++)if(We>=I.length){I.push(Le),ke=We;break}else if(I[We]===null){I[We]=Le,ke=We;break}if(ke===-1)break}let pe=P[ke];pe&&pe.connect(Le)}}function Z(se,we){we===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(we.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let we=se.near,Le=se.far;b.texture!==null&&(b.depthNear>0&&(we=b.depthNear),b.depthFar>0&&(Le=b.depthFar)),Y.near=O.near=F.near=we,Y.far=O.far=F.far=Le,(N!==Y.near||K!==Y.far)&&(s.updateRenderState({depthNear:Y.near,depthFar:Y.far}),N=Y.near,K=Y.far),Y.layers.mask=se.layers.mask|6,F.layers.mask=Y.layers.mask&-5,O.layers.mask=Y.layers.mask&-3;let ke=se.parent,pe=Y.cameras;Z(Y,ke);for(let We=0;We<pe.length;We++)Z(pe[We],ke);Y.projectionMatrix.copy(F.projectionMatrix),Y.projectionMatrixInverse.copy(F.projectionMatrixInverse),B===null&&se.isPerspectiveCamera&&(B={camera:se,fov:se.fov,zoom:se.zoom}),ae(se,Y,ke)};function ae(se,we,Le){Le===null?se.matrix.copy(we.matrixWorld):(se.matrix.copy(Le.matrixWorld),se.matrix.invert(),se.matrix.multiply(we.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(we.projectionMatrix),se.projectionMatrixInverse.copy(we.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=ts*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(se){c=se,d!==null&&(d.fixedFoveation=se),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=se)},this.hasDepthSensing=function(){return b.texture!==null},this.getDepthSensingMesh=function(){return b.getMesh(Y)},this.getCameraTexture=function(se){return g[se]};let he=null;function Te(se,we){if(u=we.getViewerPose(l||a),x=we,u!==null){let Le=u.views;m!==null&&(e.setRenderTargetFramebuffer(T,m.framebuffer),e.setRenderTarget(T));let ke=!1;Le.length!==Y.cameras.length&&(Y.cameras.length=0,ke=!0);for(let Ge=0;Ge<Le.length;Ge++){let ct=Le[Ge],lt=null;if(m!==null)lt=m.getViewport(ct);else{let Pt=f.getViewSubImage(d,ct);lt=Pt.viewport,Ge===0&&(e.setRenderTargetTextures(T,Pt.colorTexture,Pt.depthStencilTexture),e.setRenderTarget(T))}let at=q[Ge];at===void 0&&(at=new Ht,at.layers.enable(Ge),at.viewport=new bt,q[Ge]=at),at.matrix.fromArray(ct.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(ct.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(lt.x,lt.y,lt.width,lt.height),Ge===0&&(Y.matrix.copy(at.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),ke===!0&&Y.cameras.push(at)}let pe=s.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&w){f=n.getBinding();let Ge=f.getDepthInformation(Le[0]);Ge&&Ge.isValid&&Ge.texture&&b.init(Ge,s.renderState)}if(pe&&pe.includes("camera-access")&&w){e.state.unbindTexture(),f=n.getBinding();for(let Ge=0;Ge<Le.length;Ge++){let ct=Le[Ge].camera;if(ct){let lt=g[ct];lt||(lt=new Nr,g[ct]=lt);let at=f.getCameraImage(ct);lt.sourceTexture=at}}}}for(let Le=0;Le<P.length;Le++){let ke=I[Le],pe=P[Le];ke!==null&&pe!==void 0&&pe.update(ke,we,l||a)}he&&he(se,we),we.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:we}),x=null}let Fe=new vf;Fe.setAnimationLoop(Te),this.setAnimationLoop=function(se){he=se},this.dispose=function(){}}},H_=new Qe,Pf=new Ze;Pf.set(-1,0,0,0,1,0,0,0,1);function G_(i,e){function t(b,g){b.matrixAutoUpdate===!0&&b.updateMatrix(),g.value.copy(b.matrix)}function n(b,g){g.color.getRGB(b.fogColor.value,Al(i)),g.isFog?(b.fogNear.value=g.near,b.fogFar.value=g.far):g.isFogExp2&&(b.fogDensity.value=g.density)}function s(b,g,S,R,T){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(b,g):g.isMeshLambertMaterial?(r(b,g),g.envMap&&(b.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(b,g),f(b,g)):g.isMeshPhongMaterial?(r(b,g),u(b,g),g.envMap&&(b.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(b,g),d(b,g),g.isMeshPhysicalMaterial&&m(b,g,T)):g.isMeshMatcapMaterial?(r(b,g),x(b,g)):g.isMeshDepthMaterial?r(b,g):g.isMeshDistanceMaterial?(r(b,g),w(b,g)):g.isMeshNormalMaterial?r(b,g):g.isLineBasicMaterial?(a(b,g),g.isLineDashedMaterial&&o(b,g)):g.isPointsMaterial?c(b,g,S,R):g.isSpriteMaterial?l(b,g):g.isShadowMaterial?(b.color.value.copy(g.color),b.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(b,g){b.opacity.value=g.opacity,g.color&&b.diffuse.value.copy(g.color),g.emissive&&b.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(b.map.value=g.map,t(g.map,b.mapTransform)),g.alphaMap&&(b.alphaMap.value=g.alphaMap,t(g.alphaMap,b.alphaMapTransform)),g.bumpMap&&(b.bumpMap.value=g.bumpMap,t(g.bumpMap,b.bumpMapTransform),b.bumpScale.value=g.bumpScale,g.side===zt&&(b.bumpScale.value*=-1)),g.normalMap&&(b.normalMap.value=g.normalMap,t(g.normalMap,b.normalMapTransform),b.normalScale.value.copy(g.normalScale),g.side===zt&&b.normalScale.value.negate()),g.displacementMap&&(b.displacementMap.value=g.displacementMap,t(g.displacementMap,b.displacementMapTransform),b.displacementScale.value=g.displacementScale,b.displacementBias.value=g.displacementBias),g.emissiveMap&&(b.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,b.emissiveMapTransform)),g.specularMap&&(b.specularMap.value=g.specularMap,t(g.specularMap,b.specularMapTransform)),g.alphaTest>0&&(b.alphaTest.value=g.alphaTest);let S=e.get(g),R=S.envMap,T=S.envMapRotation;R&&(b.envMap.value=R,b.envMapRotation.value.setFromMatrix4(H_.makeRotationFromEuler(T)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&b.envMapRotation.value.premultiply(Pf),b.reflectivity.value=g.reflectivity,b.ior.value=g.ior,b.refractionRatio.value=g.refractionRatio),g.lightMap&&(b.lightMap.value=g.lightMap,b.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,b.lightMapTransform)),g.aoMap&&(b.aoMap.value=g.aoMap,b.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,b.aoMapTransform))}function a(b,g){b.diffuse.value.copy(g.color),b.opacity.value=g.opacity,g.map&&(b.map.value=g.map,t(g.map,b.mapTransform))}function o(b,g){b.dashSize.value=g.dashSize,b.totalSize.value=g.dashSize+g.gapSize,b.scale.value=g.scale}function c(b,g,S,R){b.diffuse.value.copy(g.color),b.opacity.value=g.opacity,b.size.value=g.size*S,b.scale.value=R*.5,g.map&&(b.map.value=g.map,t(g.map,b.uvTransform)),g.alphaMap&&(b.alphaMap.value=g.alphaMap,t(g.alphaMap,b.alphaMapTransform)),g.alphaTest>0&&(b.alphaTest.value=g.alphaTest)}function l(b,g){b.diffuse.value.copy(g.color),b.opacity.value=g.opacity,b.rotation.value=g.rotation,g.map&&(b.map.value=g.map,t(g.map,b.mapTransform)),g.alphaMap&&(b.alphaMap.value=g.alphaMap,t(g.alphaMap,b.alphaMapTransform)),g.alphaTest>0&&(b.alphaTest.value=g.alphaTest)}function u(b,g){b.specular.value.copy(g.specular),b.shininess.value=Math.max(g.shininess,1e-4)}function f(b,g){g.gradientMap&&(b.gradientMap.value=g.gradientMap)}function d(b,g){b.metalness.value=g.metalness,g.metalnessMap&&(b.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,b.metalnessMapTransform)),b.roughness.value=g.roughness,g.roughnessMap&&(b.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,b.roughnessMapTransform)),g.envMap&&(b.envMapIntensity.value=g.envMapIntensity)}function m(b,g,S){b.ior.value=g.ior,g.diffuseRoughness>0&&(b.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(b.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,b.diffuseRoughnessMapTransform))),g.sheen>0&&(b.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),b.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(b.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,b.sheenColorMapTransform)),g.sheenRoughnessMap&&(b.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,b.sheenRoughnessMapTransform))),g.clearcoat>0&&(b.clearcoat.value=g.clearcoat,b.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(b.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,b.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(b.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,b.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(b.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,b.clearcoatNormalMapTransform),b.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===zt&&b.clearcoatNormalScale.value.negate())),g.dispersion>0&&(b.dispersion.value=g.dispersion),g.retroreflectivity>0&&(b.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(b.iridescence.value=g.iridescence,b.iridescenceIOR.value=g.iridescenceIOR,b.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,b.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(b.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,b.iridescenceMapTransform)),g.iridescenceThicknessMap&&(b.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,b.iridescenceThicknessMapTransform))),g.transmission>0&&(b.transmission.value=g.transmission,b.transmissionSamplerMap.value=S.texture,b.transmissionSamplerSize.value.set(S.width,S.height),g.transmissionMap&&(b.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,b.transmissionMapTransform)),b.thickness.value=g.thickness,g.thicknessMap&&(b.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,b.thicknessMapTransform)),b.attenuationDistance.value=g.attenuationDistance,b.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(b.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(b.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,b.anisotropyMapTransform))),b.specularIntensity.value=g.specularIntensity,b.specularColor.value.copy(g.specularColor),g.specularColorMap&&(b.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,b.specularColorMapTransform)),g.specularIntensityMap&&(b.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,b.specularIntensityMapTransform))}function x(b,g){g.matcap&&(b.matcap.value=g.matcap)}function w(b,g){let S=e.get(g).light;b.referencePosition.value.setFromMatrixPosition(S.matrixWorld),b.nearDistance.value=S.shadow.camera.near,b.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function V_(i,e,t,n){let s={},r={};function a(S,R){let T=R.program;n.uniformBlockBinding(S,T,s[S.id])}function o(S,R){let T=s[S.id];T===void 0&&(x(S),T=c(S),s[S.id]=T,S.addEventListener("dispose",b));let P=R.program;n.updateUBOMapping(S,P);let I=e.render.frame;r[S.id]!==I&&(l(S),r[S.id]=I)}function c(S){let R=i.createBuffer(),T=S.__size,P=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,R),i.bufferData(i.UNIFORM_BUFFER,T,P),i.bindBuffer(i.UNIFORM_BUFFER,null),R}function l(S){let R=s[S.id],T=S.uniforms,P=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,R);for(let I=0,v=T.length;I<v;I++){let E=T[I];if(Array.isArray(E))for(let B=0,F=E.length;B<F;B++)u(E[B],I,B,P);else u(E,I,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(S,R,T,P){if(d(S,R,T,P)===!0){let I=S.__offset,v=S.value;if(Array.isArray(v)){let E=0;for(let B=0;B<v.length;B++){let F=v[B],O=w(F,!0);f(F,S.__data,E),E+=O.storage/Float32Array.BYTES_PER_ELEMENT}}else f(v,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,I,S.__data)}}function f(S,R,T){typeof S=="number"||typeof S=="boolean"?R[T]=S:S.isMatrix3?(R[T]=S.elements[0],R[T+1]=S.elements[1],R[T+2]=S.elements[2],R[T+3]=0,R[T+4]=S.elements[3],R[T+5]=S.elements[4],R[T+6]=S.elements[5],R[T+7]=0,R[T+8]=S.elements[6],R[T+9]=S.elements[7],R[T+10]=S.elements[8],R[T+11]=0):ArrayBuffer.isView(S)?R.set(S.subarray(0,R.length-T),T):S.toArray(R,T)}function d(S,R,T,P){let I=S.value,v=R+"_"+T;if(Array.isArray(I)){P[v]===void 0&&(P[v]=[]);let E=P[v],B=!1;for(let F=0;F<I.length;F++)m(I[F],E,F)===!0&&(B=!0);return B}return m(I,P,v)}function m(S,R,T){if(R[T]===void 0)return typeof S=="number"||typeof S=="boolean"?R[T]=S:ArrayBuffer.isView(S)?R[T]=S.slice():R[T]=S.clone(),!0;{let P=R[T];if(typeof S=="number"||typeof S=="boolean"){if(P!==S)return R[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(P.equals(S)===!1)return P.copy(S),!0}}return!1}function x(S){let R=S.uniforms,T=0,P=16;for(let v=0,E=R.length;v<E;v++){let B=Array.isArray(R[v])?R[v]:[R[v]];for(let F=0,O=B.length;F<O;F++){let q=B[F],Y=Array.isArray(q.value)?q.value:[q.value],N=Array.isArray(R[v])||Array.isArray(q.value),K=T;for(let J=0,de=Y.length;J<de;J++){let Z=Y[J],ae=w(Z,N),he=T%P,Te=he%ae.boundary,Fe=he+Te;T+=Te,Fe!==0&&P-Fe<ae.storage&&(T+=P-Fe),J===0&&(K=T),T+=ae.storage}let j=q.type==="int"?Int32Array:q.type==="uint"?Uint32Array:Float32Array;q.__data=new j((T-K)/Float32Array.BYTES_PER_ELEMENT),q.__offset=K}}let I=T%P;return I>0&&(T+=P-I),S.__size=T,S.__cache={},this}function w(S,R){let T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=16,T.storage=48):S.isMatrix4?(T.boundary=16,T.storage=64):S.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",S),R===!0&&(T.boundary=16,T.storage=Math.ceil(T.storage/16)*16),T}function b(S){let R=S.target;R.removeEventListener("dispose",b),i.deleteBuffer(s[R.id]),delete s[R.id],delete r[R.id]}function g(){for(let S in s)i.deleteBuffer(s[S]);s={},r={}}return{bind:a,update:o,dispose:g}}var W_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ti=null;function q_(){return ti===null&&(ti=new gi(W_,16,16,bn,Ft),ti.name="DFG_LUT",ti.minFilter=_t,ti.magFilter=_t,ti.wrapS=pn,ti.wrapT=pn,ti.generateMipmaps=!1,ti.needsUpdate=!0),ti}var sc=class{constructor(e={}){let{canvas:t=Wu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:m=_n}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;let w=m,b=new Set([Eo,Mo,So]),g=new Set([_n,kn,Zs,ds,vo,yo]),S=new Uint32Array(4),R=new Int32Array(4),T={textures:[],min:[],max:[],resolution:[]},P=null,I=null,v=[],E=[],B=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let F=this,O=!1,q=null,Y=null,N=null,K=null;this._outputColorSpace=Rt;let j=0,J=0,de=null,Z=-1,ae=null,he=new bt,Te=new bt,Fe=null,se=new Ue(0),we=0,Le=t.width,ke=t.height,pe=1,We=null,mt=null,Ge=new bt(0,0,Le,ke),ct=new bt(0,0,Le,ke),lt=!1,at=new Bi,Pt=new to,At=!1,qt=!1,wt=new Qe,An=new V,It=new bt,nn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},sn=!1;function fn(){return de===null?pe:1}let H=n;function rn(h,_){return t.getContext(h,_)}let vt,yt,Ae,Dt,He,Je,L,y,X,me,oe,ve,Re,te,ie,ye,U,ne,$,Me,ge,Se,Oe;try{let h={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",$e,!1),t.addEventListener("webglcontextcreationerror",Pe,!1),H===null){let _="webgl2";if(H=rn(_,h),H===null)throw rn(_)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}et()}catch(h){throw t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),Ye("WebGLRenderer: "+h.message),h}function et(){vt=new n0(H),vt.init(),ge=new B_(H,vt),yt=new qg(H,vt,e,ge),Ae=new U_(H,vt),yt.reversedDepthBuffer&&d&&Ae.buffers.depth.setReversed(!0),Y=H.createFramebuffer(),N=H.createFramebuffer(),K=H.createFramebuffer(),Dt=new r0(H),He=new S_,Je=new O_(H,vt,Ae,He,yt,ge,Dt),L=new t0(F),y=new op(H),Se=new Vg(H,y),X=new i0(H,y,Dt,Se),me=new o0(H,X,y,Se,Dt),ne=new a0(H,yt,Je),ie=new Xg(He),oe=new y_(F,L,vt,yt,Se,ie),ve=new G_(F,He),Re=new E_,te=new P_(vt),U=new Gg(F,L,Ae,me,x,c),ye=new F_(F,me,yt),Oe=new V_(H,Dt,yt,Ae),$=new Wg(H,vt,Dt),Me=new s0(H,vt,Dt),Dt.programs=oe.programs,F.capabilities=yt,F.extensions=vt,F.properties=He,F.renderLists=Re,F.shadowMap=ye,F.state=Ae,F.info=Dt}w!==_n&&(B=new l0(w,t.width,t.height,o,s,r));let _e=new zl(F,H);this.xr=_e,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){let h=vt.get("WEBGL_lose_context");h&&h.loseContext()},this.forceContextRestore=function(){let h=vt.get("WEBGL_lose_context");h&&h.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(h){h!==void 0&&(pe=h,this.setSize(Le,ke,!1))},this.getSize=function(h){return h.set(Le,ke)},this.setSize=function(h,_,M=!0){if(_e.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}Le=h,ke=_,t.width=Math.floor(h*pe),t.height=Math.floor(_*pe),M===!0&&(t.style.width=h+"px",t.style.height=_+"px"),B!==null&&B.setSize(t.width,t.height),this.setViewport(0,0,h,_)},this.getDrawingBufferSize=function(h){return h.set(Le*pe,ke*pe).floor()},this.setDrawingBufferSize=function(h,_,M){Le=h,ke=_,pe=M,t.width=Math.floor(h*M),t.height=Math.floor(_*M),this.setViewport(0,0,h,_)},this.setEffects=function(h){if(w===_n){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(h){for(let _=0;_<h.length;_++)if(h[_].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(h||[])},this.getCurrentViewport=function(h){return h.copy(he)},this.getViewport=function(h){return h.copy(Ge)},this.setViewport=function(h,_,M,A){h.isVector4?Ge.set(h.x,h.y,h.z,h.w):Ge.set(h,_,M,A),Ae.viewport(he.copy(Ge).multiplyScalar(fn()).round())},this.getScissor=function(h){return h.copy(ct)},this.setScissor=function(h,_,M,A){h.isVector4?ct.set(h.x,h.y,h.z,h.w):ct.set(h,_,M,A),Ae.scissor(Te.copy(ct).multiplyScalar(fn()).round())},this.getScissorTest=function(){return lt},this.setScissorTest=function(h){Ae.setScissorTest(lt=h)},this.setOpaqueSort=function(h){We=h},this.setTransparentSort=function(h){mt=h},this.getClearColor=function(h){return h.copy(U.getClearColor())},this.setClearColor=function(){U.setClearColor(...arguments)},this.getClearAlpha=function(){return U.getClearAlpha()},this.setClearAlpha=function(){U.setClearAlpha(...arguments)},this.clear=function(h=!0,_=!0,M=!0){let A=0;if(h){let D=!1;if(de!==null){let C=de.texture.format;D=b.has(C)}if(D){let C=de.texture.type,G=g.has(C),k=U.getClearColor(),z=U.getClearAlpha(),W=k.r,re=k.g,Q=k.b;G?(S[0]=W,S[1]=re,S[2]=Q,S[3]=z,H.clearBufferuiv(H.COLOR,0,S)):(R[0]=W,R[1]=re,R[2]=Q,R[3]=z,H.clearBufferiv(H.COLOR,0,R))}else A|=H.COLOR_BUFFER_BIT}_&&(A|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),M&&(A|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A!==0&&H.clear(A)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(h){h.setRenderer(this),q=h},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",$e,!1),t.removeEventListener("webglcontextcreationerror",Pe,!1),U.dispose(),Re.dispose(),te.dispose(),Je.dispose(),He.dispose(),L.dispose(),me.dispose(),X.dispose(),Se.dispose(),Oe.dispose(),oe.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",ar),_e.removeEventListener("sessionend",la),ri.stop()};function ze(h){h.preventDefault(),Sr("WebGLRenderer: Context Lost."),O=!0}function $e(){Sr("WebGLRenderer: Context Restored."),O=!1;let h=Dt.autoReset,_=ye.enabled,M=ye.autoUpdate,A=ye.needsUpdate,D=ye.type;et(),Dt.autoReset=h,ye.enabled=_,ye.autoUpdate=M,ye.needsUpdate=A,ye.type=D}function Pe(h){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",h.statusMessage)}function ut(h){let _=h.target;_.removeEventListener("dispose",ut),Ot(_)}function Ot(h){Gn(h),He.remove(h)}function Gn(h){let _=He.get(h).programs;_!==void 0&&(_.forEach(function(M){oe.releaseProgram(M)}),h.isShaderMaterial&&oe.releaseShaderCache(h))}this.renderBufferDirect=function(h,_,M,A,D,C){_===null&&(_=nn);let G=D.isMesh&&D.matrixWorld.determinantAffine()<0,k=pa(h,_,M,A,D);Ae.setMaterial(A,G);let z=M.index,W=1;if(A.wireframe===!0){if(z=X.getWireframeAttribute(M),z===void 0)return;W=2}let re=M.drawRange,Q=M.attributes.position,ee=re.start*W,le=(re.start+re.count)*W;C!==null&&(ee=Math.max(ee,C.start*W),le=Math.min(le,(C.start+C.count)*W)),z!==null?(ee=Math.max(ee,0),le=Math.min(le,z.count)):Q!=null&&(ee=Math.max(ee,0),le=Math.min(le,Q.count));let ue=le-ee;if(ue<0||ue===1/0)return;Se.setup(D,A,k,M,z);let fe,Ee=$;if(z!==null&&(fe=y.get(z),Ee=Me,Ee.setIndex(fe)),D.isMesh)A.wireframe===!0?(Ae.setLineWidth(A.wireframeLinewidth*fn()),Ee.setMode(H.LINES)):Ee.setMode(H.TRIANGLES);else if(D.isLine){let Ve=A.linewidth;Ve===void 0&&(Ve=1),Ae.setLineWidth(Ve*fn()),D.isLineSegments?Ee.setMode(H.LINES):D.isLineLoop?Ee.setMode(H.LINE_LOOP):Ee.setMode(H.LINE_STRIP)}else D.isPoints?Ee.setMode(H.POINTS):D.isSprite&&Ee.setMode(H.TRIANGLES);if(D.isBatchedMesh)if(vt.get("WEBGL_multi_draw"))Ee.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{let Ve=D._multiDrawStarts,ce=D._multiDrawCounts,je=D._multiDrawCount,be=z?y.get(z).bytesPerElement:1,Ce=He.get(A).currentProgram.getUniforms();for(let Ie=0;Ie<je;Ie++)Ce.setValue(H,"_gl_DrawID",Ie),Ee.render(Ve[Ie]/be,ce[Ie])}else if(D.isInstancedMesh)Ee.renderInstances(ee,ue,D.count);else if(M.isInstancedBufferGeometry){let Ve=M._maxInstanceCount!==void 0?M._maxInstanceCount:1/0,ce=Math.min(M.instanceCount,Ve);Ee.renderInstances(ee,ue,ce)}else Ee.render(ee,ue)};function ca(h,_,M,A){q!==null&&h.isNodeMaterial&&q.setObject(A,h),At===!0&&ie.setState(h,M,!1),h.transparent===!0&&h.side===un&&h.forceSinglePass===!1?(h.side=zt,h.needsUpdate=!0,Vn(h,_,A),h.side=Qn,h.needsUpdate=!0,Vn(h,_,A),h.side=un):Vn(h,_,A)}this.compile=function(h,_,M=null){M===null&&(M=h),q!==null&&q.renderStart(h,_,M),I=te.get(M),I.init(_),E.push(I),M.traverseVisible(function(D){D.isLight&&D.layers.test(_.layers)&&(I.pushLight(D),D.castShadow&&I.pushShadow(D))}),h!==M&&h.traverseVisible(function(D){D.isLight&&D.layers.test(_.layers)&&(I.pushLight(D),D.castShadow&&I.pushShadow(D))}),I.setupLights(),q!==null&&q.updateLights(I.state.lightsArray),qt=this.localClippingEnabled,At=ie.init(this.clippingPlanes,qt),At===!0&&ie.setGlobalState(this.clippingPlanes,_),q!==null&&ye.render(I.state.shadowsArray,M,_);let A=new Set;return h.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;let C=D.material;if(C)if(Array.isArray(C))for(let G=0;G<C.length;G++){let k=C[G];ca(k,M,_,D),A.add(k)}else ca(C,M,_,D),A.add(C)}),I=E.pop(),q!==null&&q.renderEnd(),A},this.compileAsync=function(h,_,M=null){let A=this.compile(h,_,M);return new Promise(D=>{function C(){if(A.forEach(function(G){let z=He.get(G).currentProgram;(z===void 0||z.isReady())&&A.delete(G)}),A.size===0){D(h);return}setTimeout(C,10)}vt.get("KHR_parallel_shader_compile")!==null?C():setTimeout(C,10)})};let rr=null;function _c(h){rr&&rr(h)}function ar(){ri.stop()}function la(){ri.start()}let ri=new vf;ri.setAnimationLoop(_c),typeof self<"u"&&ri.setContext(self),this.setAnimationLoop=function(h){rr=h,_e.setAnimationLoop(h),h===null?ri.stop():ri.start()},_e.addEventListener("sessionstart",ar),_e.addEventListener("sessionend",la),this.render=function(h,_){if(_!==void 0&&_.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;q!==null&&q.renderStart(h,_);let M=_e.enabled===!0&&_e.isPresenting===!0,A=B!==null&&(de===null||M)&&B.begin(F,de);if(h.matrixWorldAutoUpdate===!0&&h.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(_),_=_e.getCamera()),h.isScene===!0&&h.onBeforeRender(F,h,_,de),I=te.get(h,E.length),I.init(_),I.state.textureUnits=Je.getTextureUnits(),E.push(I),wt.multiplyMatrices(_.projectionMatrix,_.matrixWorldInverse),_.isArrayCamera?Pt.setFromArrayCamera(_):at.setFromProjectionMatrix(wt,Cn,_.reversedDepth),qt=this.localClippingEnabled,At=ie.init(this.clippingPlanes,qt),P=Re.get(h,v.length),P.init(),v.push(P),this.info.render.frame++,_e.enabled===!0&&_e.isPresenting===!0){let G=F.xr.getDepthSensingMesh();G!==null&&or(G,_,-1/0,F.sortObjects)}or(h,_,0,F.sortObjects),P.finish(),q!==null&&q.updateLights(I.state.lightsArray),F.sortObjects===!0&&P.sort(We,mt),sn=_e.enabled===!1||_e.isPresenting===!1||_e.hasDepthSensing()===!1,sn&&U.addToRenderList(P,h),this.info.autoReset===!0&&this.info.reset(),At===!0&&ie.beginShadows();let D=I.state.shadowsArray;if(ye.render(D,h,_),At===!0&&ie.endShadows(),(A&&B.hasRenderPass())===!1){let G=P.opaque,k=P.transmissive;if(I.setupLights(),_.isArrayCamera){let z=_.cameras;if(k.length>0)for(let W=0,re=z.length;W<re;W++){let Q=z[W];ha(G,k,h,Q)}sn&&U.render(h);for(let W=0,re=z.length;W<re;W++){let Q=z[W];cr(P,h,Q,Q.viewport)}}else k.length>0&&ha(G,k,h,_),sn&&U.render(h),cr(P,h,_)}de!==null&&J===0&&(Je.updateMultisampleRenderTarget(de),Je.updateRenderTargetMipmap(de)),A&&B.end(F),h.isScene===!0&&h.onAfterRender(F,h,_),Se.resetDefaultState(),Z=-1,ae=null,E.pop(),E.length>0?(I=E[E.length-1],Je.setTextureUnits(I.state.textureUnits),At===!0&&ie.setGlobalState(F.clippingPlanes,I.state.camera)):I=null,v.pop(),v.length>0?P=v[v.length-1]:P=null,q!==null&&q.renderEnd()};function or(h,_,M,A){if(h.visible===!1)return;if(h.layers.test(_.layers)){if(h.isGroup)M=h.renderOrder;else if(h.isLOD)h.autoUpdate===!0&&h.update(_);else if(h.isLight)I.pushLight(h),h.castShadow&&I.pushShadow(h);else if(h.isSprite){let G=_.isArrayCamera?Pt:at;if(!h.frustumCulled||h.intersectsFrustum(G)){A&&It.setFromMatrixPosition(h.matrixWorld).applyMatrix4(wt);let k=me.update(h),z=h.material;z.visible&&P.push(h,k,z,M,It.z,null,_)}}else if(h.isMesh||h.isLine||h.isPoints){let G=_.isArrayCamera?Pt:at;if(!h.frustumCulled||h.intersectsFrustum(G)){let k=me.update(h),z=h.material;if(A&&(h.boundingSphere!==void 0?(h.boundingSphere===null&&h.computeBoundingSphere(),It.copy(h.boundingSphere.center)):(k.boundingSphere===null&&k.computeBoundingSphere(),It.copy(k.boundingSphere.center)),It.applyMatrix4(h.matrixWorld).applyMatrix4(wt)),Array.isArray(z)){let W=k.groups;for(let re=0,Q=W.length;re<Q;re++){let ee=W[re],le=z[ee.materialIndex];le&&le.visible&&P.push(h,k,le,M,It.z,ee,_)}}else z.visible&&P.push(h,k,z,M,It.z,null,_)}}}let C=h.children;for(let G=0,k=C.length;G<k;G++)or(C[G],_,M,A)}function cr(h,_,M,A){let{opaque:D,transmissive:C,transparent:G}=h;I.setupLightsView(M),At===!0&&ie.setGlobalState(F.clippingPlanes,M),A&&Ae.viewport(he.copy(A)),D.length>0&&qi(D,_,M),C.length>0&&qi(C,_,M),G.length>0&&qi(G,_,M),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function ha(h,_,M,A){if((M.isScene===!0?M.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[A.id]===void 0){let ee=vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[A.id]=new Mn(1,1,{generateMipmaps:!0,type:ee?Ft:_n,minFilter:Tn,samples:Math.max(4,yt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}let C=I.state.transmissionRenderTarget[A.id],G=A.viewport||he;C.setSize(G.z*F.transmissionResolutionScale,G.w*F.transmissionResolutionScale);let k=F.getRenderTarget(),z=F.getActiveCubeFace(),W=F.getActiveMipmapLevel();F.setRenderTarget(C),F.getClearColor(se),we=F.getClearAlpha(),we<1&&F.setClearColor(16777215,.5),F.clear(),sn&&U.render(M);let re=F.toneMapping;F.toneMapping=Pn;let Q=A.viewport;if(A.viewport!==void 0&&(A.viewport=void 0),I.setupLightsView(A),At===!0&&ie.setGlobalState(F.clippingPlanes,A),qi(h,M,A),Je.updateMultisampleRenderTarget(C),Je.updateRenderTargetMipmap(C),vt.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let le=0,ue=_.length;le<ue;le++){let fe=_[le],{object:Ee,geometry:Ve,material:ce,group:je}=fe;if(ce.side===un&&Ee.layers.test(A.layers)){let be=ce.side;ce.side=zt,ce.needsUpdate=!0,ua(Ee,M,A,Ve,ce,je),ce.side=be,ce.needsUpdate=!0,ee=!0}}ee===!0&&(Je.updateMultisampleRenderTarget(C),Je.updateRenderTargetMipmap(C))}F.setRenderTarget(k,z,W),F.setClearColor(se,we),Q!==void 0&&(A.viewport=Q),F.toneMapping=re}function qi(h,_,M){let A=_.isScene===!0?_.overrideMaterial:null;for(let D=0,C=h.length;D<C;D++){let G=h[D],{object:k,geometry:z,group:W}=G,re=G.material;re.allowOverride===!0&&A!==null&&(re=A),k.layers.test(M.layers)&&ua(k,_,M,z,re,W)}}function ua(h,_,M,A,D,C){q!==null&&D.isNodeMaterial&&q.setObject(h,D),h.onBeforeRender(F,_,M,A,D,C),h.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,h.matrixWorld),h.normalMatrix.getNormalMatrix(h.modelViewMatrix),D.onBeforeRender(F,_,M,A,h,C),D.transparent===!0&&D.side===un&&D.forceSinglePass===!1?(D.side=zt,D.needsUpdate=!0,F.renderBufferDirect(M,_,A,D,h,C),D.side=Qn,D.needsUpdate=!0,F.renderBufferDirect(M,_,A,D,h,C),D.side=un):F.renderBufferDirect(M,_,A,D,h,C),h.onAfterRender(F,_,M,A,D,C)}function fa(h){let _=0;for(let M of h)M.texture!==null&&_++;return _}function Vn(h,_,M){_.isScene!==!0&&(_=nn);let A=He.get(h),D=I.state.lights,C=I.state.shadowsArray,G=D.state.version,k=oe.getParameters(h,D.state,C,_,M,I.state.lightProbeGridArray),z=oe.getProgramCacheKey(k),W=A.programs;A.environment=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?_.environment:null,A.fog=_.fog;let re=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap;A.envMap=L.get(h.envMap||A.environment,re),A.envMapRotation=A.environment!==null&&h.envMap===null?_.environmentRotation:h.envMapRotation,W===void 0&&(h.addEventListener("dispose",ut),W=new Map,A.programs=W,A.programVariants=new Map);let Q=W.get(z);if(Q!==void 0){if(A.currentProgram===Q&&A.lightsStateVersion===G)return Xi(h,k),Q}else k.uniforms=oe.getUniforms(h),q!==null&&h.isNodeMaterial&&q.build(h,M,k),h.onBeforeCompile(k,F),Q=oe.acquireProgram(k,z),W.set(z,Q),A.uniforms=k.uniforms;let ee=A.uniforms;return(!h.isShaderMaterial&&!h.isRawShaderMaterial||h.clipping===!0)&&(ee.clippingPlanes=ie.uniform),Xi(h,k),A.needsLights=dn(h),A.lightsStateVersion=G,A.needsLights&&(ee.ambientLightColor.value=D.state.ambient,ee.lightProbe.value=D.state.probe,ee.sunLights.value=D.state.sun,ee.sunLightShadows.value=D.state.sunShadow,ee.directionalLights.value=D.state.directional,ee.directionalLightShadows.value=D.state.directionalShadow,ee.spotLights.value=D.state.spot,ee.spotLightShadows.value=D.state.spotShadow,ee.rectAreaLights.value=D.state.rectArea,ee.ltc_1.value=D.state.rectAreaLTC1,ee.ltc_2.value=D.state.rectAreaLTC2,ee.pointLights.value=D.state.point,ee.pointLightShadows.value=D.state.pointShadow,ee.hemisphereLights.value=D.state.hemi,ee.sunShadowMatrix.value=D.state.sunShadowMatrix,ee.sunShadowCascade.value=D.state.sunShadowCascade,ee.directionalShadowMatrix.value=D.state.directionalShadowMatrix,ee.spotLightMatrix.value=D.state.spotLightMatrix,ee.spotLightMap.value=D.state.spotLightMap,ee.pointShadowMatrix.value=D.state.pointShadowMatrix),A.numLightProbeGrids=fa(I.state.lightProbeGridArray),A.currentProgram=Q,A.uniformsList=null,Q}function gs(h,_,M,A,D){let C=He.get(h),G=C.currentProgram.id+","+A+","+D,k=C.programVariants.get(G);return k===void 0?(k=Vn(h,_,M),C.programVariants.set(G,k)):(C.currentProgram=k,C.uniformsList=null,C.outputColorSpace=A,C.toneMapping=D),k}function da(h){if(h.uniformsList===null){let _=h.currentProgram.getUniforms();h.uniformsList=Qs.seqWithValue(_.seq,h.uniforms)}return h.uniformsList}function Xi(h,_){let M=He.get(h);M.outputColorSpace=_.outputColorSpace,M.batching=_.batching,M.batchingColor=_.batchingColor,M.instancing=_.instancing,M.instancingColor=_.instancingColor,M.instancingMorph=_.instancingMorph,M.skinning=_.skinning,M.morphTargets=_.morphTargets,M.morphNormals=_.morphNormals,M.morphColors=_.morphColors,M.morphTargetsCount=_.morphTargetsCount,M.numClippingPlanes=_.numClippingPlanes,M.numIntersection=_.numClipIntersection,M.vertexAlphas=_.vertexAlphas,M.vertexTangents=_.vertexTangents,M.toneMapping=_.toneMapping}function pa(h,_,M,A,D){_.isScene!==!0&&(_=nn),Je.resetTextureUnits();let C=_.fog,G=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?_.environment:null,k=de===null?F.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:it.workingColorSpace,z=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,W=L.get(A.envMap||G,z),re=A.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,Q=!!M.attributes.tangent&&(!!A.normalMap||A.anisotropy>0),ee=!!M.morphAttributes.position,le=!!M.morphAttributes.normal,ue=!!M.morphAttributes.color,fe=Pn;A.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(fe=F.toneMapping);let Ee=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,Ve=Ee!==void 0?Ee.length:0,ce=He.get(A),je=I.state.lights;if(At===!0&&(qt===!0||h!==ae)){let Ke=h===ae&&A.id===Z;ie.setState(A,h,Ke)}let be=!1,Ce=!1;A.version===ce.__version?ce.needsLights&&ce.lightsStateVersion!==je.state.version||D.isBatchedMesh&&ce.batching===!1||!D.isBatchedMesh&&ce.batching===!0||D.isBatchedMesh&&ce.batchingColor===!0&&D._colorsTexture===null||D.isBatchedMesh&&ce.batchingColor===!1&&D._colorsTexture!==null||D.isInstancedMesh&&ce.instancing===!1||!D.isInstancedMesh&&ce.instancing===!0||D.isSkinnedMesh&&ce.skinning===!1||!D.isSkinnedMesh&&ce.skinning===!0||D.isInstancedMesh&&ce.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&ce.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&ce.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&ce.instancingMorph===!1&&D.morphTexture!==null||ce.envMap!==W||A.fog===!0&&ce.fog!==C||ce.numClippingPlanes!==void 0&&(ce.numClippingPlanes!==ie.numPlanes||ce.numIntersection!==ie.numIntersection)||ce.vertexAlphas!==re||ce.vertexTangents!==Q||ce.morphTargets!==ee||ce.morphNormals!==le||ce.morphColors!==ue||ce.morphTargetsCount!==Ve||ce.numLightProbeGrids!==fa(I.state.lightProbeGridArray)?be=!0:(ce.outputColorSpace!==k||ce.toneMapping!==fe)&&(Ce=!0):(be=!0,ce.__version=A.version);let Ie=ce.currentProgram;(be===!0||Ce===!0)&&(Ie=Ce===!0?gs(A,_,D,k,fe):Vn(A,_,D),q&&A.isNodeMaterial&&q.onUpdateProgram(A,Ie,ce));let ht=!1,tt=!1,qe=!1,Ne=Ie.getUniforms(),ot=ce.uniforms;if(Ae.useProgram(Ie.program)&&(ht=!0,tt=!0,qe=!0),A.id!==Z&&(Z=A.id,tt=!0),ht||ae!==h){Ae.buffers.depth.getReversed()&&h.reversedDepth!==!0&&(h._reversedDepth=!0,h.updateProjectionMatrix()),Ne.setValue(H,"projectionMatrix",h.projectionMatrix),Ne.setValue(H,"viewMatrix",h.matrixWorldInverse);let gt=Ne.map.cameraPosition;gt!==void 0&&gt.setValue(H,An.setFromMatrixPosition(h.matrixWorld)),yt.logarithmicDepthBuffer&&Ne.setValue(H,"logDepthBufFC",2/(Math.log(h.far+1)/Math.LN2)),(A.isMeshPhongMaterial||A.isMeshToonMaterial||A.isMeshLambertMaterial||A.isMeshBasicMaterial||A.isMeshStandardMaterial||A.isShaderMaterial)&&Ne.setValue(H,"isOrthographic",h.isOrthographicCamera===!0),ae!==h&&(ae=h,tt=!0,qe=!0)}if(ce.needsLights&&(je.state.sunShadowMap.length>0&&Ne.setValue(H,"sunShadowMap",je.state.sunShadowMap,Je),je.state.directionalShadowMap.length>0&&Ne.setValue(H,"directionalShadowMap",je.state.directionalShadowMap,Je),je.state.spotShadowMap.length>0&&Ne.setValue(H,"spotShadowMap",je.state.spotShadowMap,Je),je.state.pointShadowMap.length>0&&Ne.setValue(H,"pointShadowMap",je.state.pointShadowMap,Je)),D.isSkinnedMesh){Ne.setOptional(H,D,"bindMatrix"),Ne.setOptional(H,D,"bindMatrixInverse");let Ke=D.skeleton;Ke&&(Ke.boneTexture===null&&Ke.computeBoneTexture(),Ne.setValue(H,"boneTexture",Ke.boneTexture,Je))}D.isBatchedMesh&&(Ne.setOptional(H,D,"batchingTexture"),Ne.setValue(H,"batchingTexture",D._matricesTexture,Je),Ne.setOptional(H,D,"batchingIdTexture"),Ne.setValue(H,"batchingIdTexture",D._indirectTexture,Je),Ne.setOptional(H,D,"batchingColorTexture"),D._colorsTexture!==null&&Ne.setValue(H,"batchingColorTexture",D._colorsTexture,Je));let Tt=M.morphAttributes;if((Tt.position!==void 0||Tt.normal!==void 0||Tt.color!==void 0)&&ne.update(D,M,Ie),(tt||ce.receiveShadow!==D.receiveShadow)&&(ce.receiveShadow=D.receiveShadow,Ne.setValue(H,"receiveShadow",D.receiveShadow)),(A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial)&&A.envMap===null&&_.environment!==null&&(ot.envMapIntensity.value=_.environmentIntensity),ot.dfgLUT!==void 0&&(ot.dfgLUT.value=q_()),tt){if(Ne.setValue(H,"toneMappingExposure",F.toneMappingExposure),ce.needsLights&&Xt(ot,qe),C&&A.fog===!0&&ve.refreshFogUniforms(ot,C),ve.refreshMaterialUniforms(ot,A,pe,ke,I.state.transmissionRenderTarget[h.id]),ce.needsLights&&ce.numLightProbeGrids>0){let Ke=T,gt=0;for(let Jt of I.state.lightProbeGridArray)Jt.texture!==null&&(Ke.textures[gt]=Jt.texture,Ke.min[gt]=Jt.boundingBox.min,Ke.max[gt]=Jt.boundingBox.max,Ke.resolution[gt]=Jt.resolution,gt++);for(let Jt in Ke)Ke[Jt].length=gt;ot.probesSH.value=Ke.textures,ot.probesMin.value=Ke.min,ot.probesMax.value=Ke.max,ot.probesResolution.value=Ke.resolution}Qs.upload(H,da(ce),ot,Je)}if(A.isShaderMaterial&&A.uniformsNeedUpdate===!0&&(Qs.upload(H,da(ce),ot,Je),A.uniformsNeedUpdate=!1),A.isSpriteMaterial&&Ne.setValue(H,"center",D.center),Ne.setValue(H,"modelViewMatrix",D.modelViewMatrix),Ne.setValue(H,"normalMatrix",D.normalMatrix),Ne.setValue(H,"modelMatrix",D.matrixWorld),A.uniformsGroups!==void 0){let Ke=A.uniformsGroups;for(let gt=0,Jt=Ke.length;gt<Jt;gt++){let Ai=Ke[gt];Oe.update(Ai,Ie),Oe.bind(Ai,Ie)}}return Ie}function Xt(h,_){h.ambientLightColor.needsUpdate=_,h.lightProbe.needsUpdate=_,h.sunLights.needsUpdate=_,h.sunLightShadows.needsUpdate=_,h.directionalLights.needsUpdate=_,h.directionalLightShadows.needsUpdate=_,h.pointLights.needsUpdate=_,h.pointLightShadows.needsUpdate=_,h.spotLights.needsUpdate=_,h.spotLightShadows.needsUpdate=_,h.rectAreaLights.needsUpdate=_,h.hemisphereLights.needsUpdate=_}function dn(h){return h.isMeshLambertMaterial||h.isMeshToonMaterial||h.isMeshPhongMaterial||h.isMeshStandardMaterial||h.isShadowMaterial||h.isShaderMaterial&&h.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return de},this.setRenderTargetTextures=function(h,_,M){let A=He.get(h);A.__autoAllocateDepthBuffer=h.resolveDepthBuffer===!1,A.__autoAllocateDepthBuffer===!1&&(A.__useRenderToTexture=!1),He.get(h.texture).__webglTexture=_,He.get(h.depthTexture).__webglTexture=A.__autoAllocateDepthBuffer?void 0:M,A.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(h,_){let M=He.get(h);M.__webglFramebuffer=_,M.__useDefaultFramebuffer=_===void 0},this.setRenderTarget=function(h,_=0,M=0){de=h,j=_,J=M;let A=null,D=!1,C=!1;if(h){let k=He.get(h);if(k.__useDefaultFramebuffer!==void 0){Ae.bindFramebuffer(H.FRAMEBUFFER,k.__webglFramebuffer),he.copy(h.viewport),Te.copy(h.scissor),Fe=h.scissorTest,Ae.viewport(he),Ae.scissor(Te),Ae.setScissorTest(Fe),Z=-1;return}else if(k.__webglFramebuffer===void 0)Je.setupRenderTarget(h);else if(k.__hasExternalTextures)Je.rebindTextures(h,He.get(h.texture).__webglTexture,He.get(h.depthTexture).__webglTexture);else if(h.depthBuffer){let re=h.depthTexture;if(k.__boundDepthTexture!==re){if(re!==null&&He.has(re)&&(h.width!==re.image.width||h.height!==re.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Je.setupDepthRenderbuffer(h)}}let z=h.texture;(z.isData3DTexture||z.isDataArrayTexture||z.isCompressedArrayTexture)&&(C=!0);let W=He.get(h).__webglFramebuffer;h.isWebGLCubeRenderTarget?(Array.isArray(W[_])?A=W[_][M]:A=W[_],D=!0):h.samples>0&&Je.useMultisampledRTT(h)===!1?A=He.get(h).__webglMultisampledFramebuffer:Array.isArray(W)?A=W[M]:A=W,he.copy(h.viewport),Te.copy(h.scissor),Fe=h.scissorTest}else he.copy(Ge).multiplyScalar(pe).floor(),Te.copy(ct).multiplyScalar(pe).floor(),Fe=lt;if(M!==0&&(A=Y),Ae.bindFramebuffer(H.FRAMEBUFFER,A)&&Ae.drawBuffers(h,A),Ae.viewport(he),Ae.scissor(Te),Ae.setScissorTest(Fe),D){let k=He.get(h.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+_,k.__webglTexture,M)}else if(C){let k=_;for(let z=0;z<h.textures.length;z++){let W=He.get(h.textures[z]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+z,W.__webglTexture,M,k)}}else if(h!==null&&M!==0){let k=He.get(h.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,k.__webglTexture,M)}Z=-1};function p(h){let _=He.get(h);return(_.__readFormat!==h.format||_.__readType!==h.type)&&(_.__readFormat=h.format,_.__readType=h.type,_.__formatReadable=yt.textureFormatReadable(h.format),_.__typeReadable=yt.textureTypeReadable(h.type)),_}this.readRenderTargetPixels=function(h,_,M,A,D,C,G,k=0){if(!(h&&h.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let z=He.get(h).__webglFramebuffer;if(h.isWebGLCubeRenderTarget&&G!==void 0&&(z=z[G],Array.isArray(z)&&(z=z[0])),z){Ae.bindFramebuffer(H.FRAMEBUFFER,z);try{let W=h.textures[k],re=W.format,Q=W.type;h.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+k);let ee=p(W);if(ee.__formatReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ee.__typeReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}_>=0&&_<=h.width-A&&M>=0&&M<=h.height-D&&H.readPixels(_,M,A,D,ge.convert(re),ge.convert(Q),C)}finally{let W=de!==null?He.get(de).__webglFramebuffer:null;Ae.bindFramebuffer(H.FRAMEBUFFER,W)}}},this.readRenderTargetPixelsAsync=async function(h,_,M,A,D,C,G,k=0){if(!(h&&h.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let z=He.get(h).__webglFramebuffer;if(h.isWebGLCubeRenderTarget&&G!==void 0&&(z=z[G],Array.isArray(z)&&(z=z[0])),z)if(_>=0&&_<=h.width-A&&M>=0&&M<=h.height-D){Ae.bindFramebuffer(H.FRAMEBUFFER,z);let W=h.textures[k],re=W.format,Q=W.type;h.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+k);let ee=p(W);if(ee.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ee.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let le=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,le),H.bufferData(H.PIXEL_PACK_BUFFER,C.byteLength,H.STREAM_READ),H.readPixels(_,M,A,D,ge.convert(re),ge.convert(Q),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);let ue=de!==null?He.get(de).__webglFramebuffer:null;Ae.bindFramebuffer(H.FRAMEBUFFER,ue);let fe=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await Xu(H,fe,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,le),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,C),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(le),H.deleteSync(fe),C}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(h,_=null,M=0){let A=Math.pow(2,-M),D=Math.floor(h.image.width*A),C=Math.floor(h.image.height*A),G=_!==null?_.x:0,k=_!==null?_.y:0;Je.setTexture2D(h,0),H.copyTexSubImage2D(H.TEXTURE_2D,M,0,0,G,k,D,C),Ae.unbindTexture()},this.copyTextureToTexture=function(h,_,M=null,A=null,D=0,C=0){let G,k,z,W,re,Q,ee,le,ue,fe=h.isCompressedTexture?h.mipmaps[C]:h.image;if(M!==null)G=M.max.x-M.min.x,k=M.max.y-M.min.y,z=M.isBox3?M.max.z-M.min.z:1,W=M.min.x,re=M.min.y,Q=M.isBox3?M.min.z:0;else{let Ne=Math.pow(2,-D);G=Math.floor(fe.width*Ne),k=Math.floor(fe.height*Ne),h.isDataArrayTexture?z=fe.depth:h.isData3DTexture?z=Math.floor(fe.depth*Ne):z=1,W=0,re=0,Q=0}A!==null?(ee=A.x,le=A.y,ue=A.z):(ee=0,le=0,ue=0);let Ee=ge.convert(_.format),Ve=ge.convert(_.type),ce;_.isData3DTexture?(Je.setTexture3D(_,0),ce=H.TEXTURE_3D):_.isDataArrayTexture||_.isCompressedArrayTexture?(Je.setTexture2DArray(_,0),ce=H.TEXTURE_2D_ARRAY):(Je.setTexture2D(_,0),ce=H.TEXTURE_2D),Ae.activeTexture(H.TEXTURE0),Ae.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,_.flipY),Ae.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),Ae.pixelStorei(H.UNPACK_ALIGNMENT,_.unpackAlignment);let je=Ae.getParameter(H.UNPACK_ROW_LENGTH),be=Ae.getParameter(H.UNPACK_IMAGE_HEIGHT),Ce=Ae.getParameter(H.UNPACK_SKIP_PIXELS),Ie=Ae.getParameter(H.UNPACK_SKIP_ROWS),ht=Ae.getParameter(H.UNPACK_SKIP_IMAGES);Ae.pixelStorei(H.UNPACK_ROW_LENGTH,fe.width),Ae.pixelStorei(H.UNPACK_IMAGE_HEIGHT,fe.height),Ae.pixelStorei(H.UNPACK_SKIP_PIXELS,W),Ae.pixelStorei(H.UNPACK_SKIP_ROWS,re),Ae.pixelStorei(H.UNPACK_SKIP_IMAGES,Q);let tt=h.isDataArrayTexture||h.isData3DTexture,qe=_.isDataArrayTexture||_.isData3DTexture;if(h.isDepthTexture){let Ne=He.get(h),ot=He.get(_),Tt=He.get(Ne.__renderTarget),Ke=He.get(ot.__renderTarget);Ae.bindFramebuffer(H.READ_FRAMEBUFFER,Tt.__webglFramebuffer),Ae.bindFramebuffer(H.DRAW_FRAMEBUFFER,Ke.__webglFramebuffer);for(let gt=0;gt<z;gt++)tt&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,He.get(h).__webglTexture,D,Q+gt),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,He.get(_).__webglTexture,C,ue+gt)),H.blitFramebuffer(W,re,W+G,re+k,ee,le,ee+G,le+k,H.DEPTH_BUFFER_BIT,H.NEAREST);Ae.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(D!==0||h.isRenderTargetTexture||He.has(h)){let Ne=He.get(h),ot=He.get(_);Ae.bindFramebuffer(H.READ_FRAMEBUFFER,N),Ae.bindFramebuffer(H.DRAW_FRAMEBUFFER,K);for(let Tt=0;Tt<z;Tt++)tt?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ne.__webglTexture,D,Q+Tt):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Ne.__webglTexture,D),qe?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ot.__webglTexture,C,ue+Tt):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,ot.__webglTexture,C),D!==0?H.blitFramebuffer(W,re,W+G,re+k,ee,le,ee+G,le+k,H.COLOR_BUFFER_BIT,H.NEAREST):qe?H.copyTexSubImage3D(ce,C,ee,le,ue+Tt,W,re,G,k):H.copyTexSubImage2D(ce,C,ee,le,W,re,G,k);Ae.bindFramebuffer(H.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else qe?h.isDataTexture||h.isData3DTexture?H.texSubImage3D(ce,C,ee,le,ue,G,k,z,Ee,Ve,fe.data):_.isCompressedArrayTexture?H.compressedTexSubImage3D(ce,C,ee,le,ue,G,k,z,Ee,fe.data):H.texSubImage3D(ce,C,ee,le,ue,G,k,z,Ee,Ve,fe):h.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,C,ee,le,G,k,Ee,Ve,fe.data):h.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,C,ee,le,fe.width,fe.height,Ee,fe.data):H.texSubImage2D(H.TEXTURE_2D,C,ee,le,G,k,Ee,Ve,fe);Ae.pixelStorei(H.UNPACK_ROW_LENGTH,je),Ae.pixelStorei(H.UNPACK_IMAGE_HEIGHT,be),Ae.pixelStorei(H.UNPACK_SKIP_PIXELS,Ce),Ae.pixelStorei(H.UNPACK_SKIP_ROWS,Ie),Ae.pixelStorei(H.UNPACK_SKIP_IMAGES,ht),C===0&&_.generateMipmaps===!0&&_.mipmapsAutoUpdate===!0&&H.generateMipmap(ce),Ae.unbindTexture()},this.initRenderTarget=function(h){He.get(h).__webglFramebuffer===void 0&&Je.setupRenderTarget(h)},this.initTexture=function(h){h.isCubeTexture?Je.setTextureCube(h,0):h.isData3DTexture?Je.setTexture3D(h,0):h.isDataArrayTexture||h.isCompressedArrayTexture?Je.setTexture2DArray(h,0):Je.setTexture2D(h,0),Ae.unbindTexture()},this.resetState=function(){j=0,J=0,de=null,Ae.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}};var Df={type:"change"},Gl={type:"start"},Nf={type:"end"},oc=new mi,Lf=new Sn,X_=Math.cos(70*Vi.DEG2RAD),Wt=new V,xn=2*Math.PI,ft={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Hl=1e-6,cc=class extends Vr{constructor(e,t=null){super(e,t),this.state=ft.NONE,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hi.ROTATE,MIDDLE:Hi.DOLLY,RIGHT:Hi.PAN},this.touches={ONE:Gi.ROTATE,TWO:Gi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new V,this._lastQuaternion=new Qt,this._lastTargetPosition=new V,this._quat=new Qt().setFromUnitVectors(e.up,new V(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xs,this._sphericalDelta=new Xs,this._scale=1,this._panOffset=new V,this._rotateStart=new Xe,this._rotateEnd=new Xe,this._rotateDelta=new Xe,this._panStart=new Xe,this._panEnd=new Xe,this._panDelta=new Xe,this._dollyStart=new Xe,this._dollyEnd=new Xe,this._dollyDelta=new Xe,this._dollyDirection=new V,this._mouse=new Xe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=K_.bind(this),this._onPointerDown=j_.bind(this),this._onPointerUp=Y_.bind(this),this._onContextMenu=nb.bind(this),this._onMouseWheel=$_.bind(this),this._onKeyDown=Q_.bind(this),this._onTouchStart=eb.bind(this),this._onTouchMove=tb.bind(this),this._onMouseDown=J_.bind(this),this._onMouseMove=Z_.bind(this),this._interceptControlDown=ib.bind(this),this._interceptControlUp=sb.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ft.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Df),this.update(),this.state=ft.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Wt.copy(t).sub(this.target),Wt.applyQuaternion(this._quat),this._spherical.setFromVector3(Wt),this.autoRotate&&this.state===ft.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=xn:n>Math.PI&&(n-=xn),s<-Math.PI?s+=xn:s>Math.PI&&(s-=xn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Wt.setFromSpherical(this._spherical),Wt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Wt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Wt.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new V(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new V(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Wt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(oc.origin.copy(this.object.position),oc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(oc.direction))<X_?this.object.lookAt(this.target):(Lf.setFromNormalAndCoplanarPoint(this.object.up,this.target),oc.intersectPlane(Lf,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Hl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Hl||this._lastTargetPosition.distanceToSquared(this.target)>Hl?(this.dispatchEvent(Df),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?xn/60*this.autoRotateSpeed*e:xn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Wt.setFromMatrixColumn(t,0),Wt.multiplyScalar(-e),this._panOffset.add(Wt)}_panUp(e,t){this.screenSpacePanning===!0?Wt.setFromMatrixColumn(t,1):(Wt.setFromMatrixColumn(t,0),Wt.crossVectors(this.object.up,Wt)),Wt.multiplyScalar(e),this._panOffset.add(Wt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Wt.copy(s).sub(this.target);let r=Wt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/t.clientHeight),this._rotateUp(xn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-xn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/t.clientHeight),this._rotateUp(xn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Xe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function j_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function K_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Y_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Nf),this.state=ft.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function J_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Hi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ft.DOLLY;break;case Hi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ft.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ft.ROTATE}break;case Hi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ft.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ft.PAN}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(Gl)}function Z_(i){switch(this.state){case ft.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ft.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ft.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function $_(i){this.enabled===!1||this.enableZoom===!1||this.state!==ft.NONE||(i.preventDefault(),this.dispatchEvent(Gl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Nf))}function Q_(i){this.enabled!==!1&&this._handleKeyDown(i)}function eb(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Gi.ROTATE:if(this.enableRotate===!1){this.state=ft.NONE;break}this._handleTouchStartRotate(i),this.state=ft.TOUCH_ROTATE;break;case Gi.PAN:if(this.enablePan===!1){this.state=ft.NONE;break}this._handleTouchStartPan(i),this.state=ft.TOUCH_PAN;break;default:this.state=ft.NONE}break;case 2:switch(this.touches.TWO){case Gi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ft.TOUCH_DOLLY_PAN;break;case Gi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ft.TOUCH_DOLLY_ROTATE;break;default:this.state=ft.NONE}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(Gl)}function tb(i){switch(this._trackPointer(i),this.state){case ft.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ft.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ft.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ft.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ft.NONE}}function nb(i){this.enabled!==!1&&i.preventDefault()}function ib(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function sb(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Vl(i,e){if(e===_l)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===$s||e===Qr){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===$s)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Ff(i){let e=new Map,t=new Map,n=i.clone();return Uf(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Uf(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Uf(i.children[n],e.children[n],t)}var lc=class extends En{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Jl(t)}),this.register(function(t){return new Zl(t)}),this.register(function(t){return new $l(t)}),this.register(function(t){return new oh(t)}),this.register(function(t){return new ch(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new eh(t)}),this.register(function(t){return new th(t)}),this.register(function(t){return new nh(t)}),this.register(function(t){return new ih(t)}),this.register(function(t){return new Yl(t)}),this.register(function(t){return new sh(t)}),this.register(function(t){return new Ql(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new rh(t)}),this.register(function(t){return new jl(t)}),this.register(function(t){return new hc(t,rt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new hc(t,rt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new hh(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=wn.extractUrlBase(e);a=wn.resolveURL(l,this.path)}else a=wn.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new $n(this.manager);c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Hf){try{a[rt.KHR_BINARY_GLTF]=new uh(e)}catch(f){s&&s(f);return}r=JSON.parse(a[rt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new bh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let f=this.pluginCallbacks[u](l);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[f.name]=f,a[f.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let f=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(f){case rt.KHR_MATERIALS_UNLIT:a[f]=new Kl;break;case rt.KHR_DRACO_MESH_COMPRESSION:a[f]=new fh(r,this.dracoLoader);break;case rt.KHR_TEXTURE_TRANSFORM:a[f]=new dh;break;case rt.KHR_MESH_QUANTIZATION:a[f]=new ph;break;default:d.indexOf(f)>=0&&o[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function rb(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Ct(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var rt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},jl=class{constructor(e){this.parser=e,this.name=rt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,u=new Ue(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Mt);let f=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Hr(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new rs(u),l.distance=f;break;case"spot":l=new zr(u),l.distance=f,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),si(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},Kl=class{constructor(){this.name=rt.KHR_MATERIALS_UNLIT}getMaterialType(){return ln}extendParams(e,t,n){let s=[];e.color=new Ue(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Mt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Rt))}return Promise.all(s)}},Yl=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Jl=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Xe(r,r)}return Promise.all(s)}},Zl=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(s)}},$l=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Ql=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},eh=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SHEEN}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Ue(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Mt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Rt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},th=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},nh=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_VOLUME}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ue().setRGB(r[0],r[1],r[2],Mt),Promise.all(s)}},ih=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_IOR}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},sh=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ue().setRGB(r[0],r[1],r[2],Mt),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Rt)),Promise.all(s)}},rh=class{constructor(e){this.parser=e,this.name=rt.EXT_MATERIALS_BUMP}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},ah=class{constructor(e){this.parser=e,this.name=rt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Ct(this.parser,e,this.name)!==null?hn:null}extendMaterialParams(e,t){let n=Ct(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},oh=class{constructor(e){this.parser=e,this.name=rt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},ch=class{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},lh=class{constructor(e){this.parser=e,this.name=rt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},hc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,u=s.count,f=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,f,d,s.mode,s.filter).then(function(m){return m.buffer}):a.ready.then(function(){let m=new ArrayBuffer(u*f);return a.decodeGltfBuffer(new Uint8Array(m),u,f,d,s.mode,s.filter),m})})}else return null}},hh=class{constructor(e){this.name=rt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==In.TRIANGLES&&l.mode!==In.TRIANGLE_STRIP&&l.mode!==In.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),f=u.isGroup?u.children:[u],d=l[0].count,m=[];for(let x of f){let w=new Qe,b=new V,g=new Qt,S=new V(1,1,1),R=new ns(x.geometry,x.material,d);for(let P=0;P<d;P++)c.TRANSLATION&&b.fromBufferAttribute(c.TRANSLATION,P),c.ROTATION&&g.fromBufferAttribute(c.ROTATION,P),c.SCALE&&S.fromBufferAttribute(c.SCALE,P),R.setMatrixAt(P,w.compose(b,g,S));let T=null;for(let P in c)if(P==="_COLOR_0"){let I=c[P];R.instanceColor=new _i(I.array,I.itemSize,I.normalized)}else if(P!=="TRANSLATION"&&P!=="ROTATION"&&P!=="SCALE"){if(T===null){let v=R.geometry;T=new en,T.name=v.name;for(let E in v.attributes)T.setAttribute(E,v.attributes[E]);for(let E in v.morphAttributes)T.morphAttributes[E]=v.morphAttributes[E];v.index!==null&&T.setIndex(v.index),T.morphTargetsRelative=v.morphTargetsRelative;for(let E of v.groups)T.addGroup(E.start,E.count,E.materialIndex);v.boundingBox!==null&&(T.boundingBox=v.boundingBox.clone()),v.boundingSphere!==null&&(T.boundingSphere=v.boundingSphere.clone()),T.drawRange.start=v.drawRange.start,T.drawRange.count=v.drawRange.count,T.userData=Object.assign({},v.userData),R.geometry=T}let I=c[P];T.setAttribute(P,new _i(I.array,I.itemSize,I.normalized))}Et.prototype.copy.call(R,x),this.parser.assignFinalMaterial(R),m.push(R)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}},Hf="glTF",ra=12,Of={JSON:1313821514,BIN:5130562},uh=class{constructor(e){this.name=rt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ra),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Hf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ra,r=new DataView(e,ra),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Of.JSON){let l=new Uint8Array(e,ra+a,o);this.content=n.decode(l)}else if(c===Of.BIN){let l=ra+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},fh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=rt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let f=gh[u]||u.toLowerCase();o[f]=a[u]}for(let u in e.attributes){let f=gh[u]||u.toLowerCase();if(a[u]!==void 0){let d=n.accessors[e.attributes[u]],m=tr[d.componentType];l[f]=m.name,c[f]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(f,d){s.decodeDracoFile(u,function(m){for(let x in m.attributes){let w=m.attributes[x],b=c[x];b!==void 0&&(w.normalized=b)}f(m)},o,l,Mt,d)})})}},dh=class{constructor(){this.name=rt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},ph=class{constructor(){this.name=rt.KHR_MESH_QUANTIZATION}},uc=class extends Zn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=s-t,f=(n-t)/u,d=f*f,m=d*f,x=e*l,w=x-l,b=-2*m+3*d,g=m-d,S=1-b,R=g-d+f;for(let T=0;T!==o;T++){let P=a[w+T+o],I=a[w+T+c]*u,v=a[x+T+o],E=a[x+T]*u;r[T]=S*P+R*I+b*v+g*E}return r}},ab=new Qt,mh=class extends uc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return ab.fromArray(r).normalize().toArray(r),r}},In={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},tr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Bf={9728:Lt,9729:_t,9984:bo,9985:Js,9986:fs,9987:Tn},kf={33071:pn,33648:Ns,10497:Fi},Wl={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},gh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Wi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ob={CUBICSPLINE:void 0,LINEAR:es,STEP:Qi},ql={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function cb(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Jn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Qn})),i.DefaultMaterial}function ms(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function si(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function lb(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,u=e.length;l<u;l++){let f=e[l];if(f.POSITION!==void 0&&(n=!0),f.NORMAL!==void 0&&(s=!0),f.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let f=e[l];if(n){let d=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):i.attributes.position;a.push(d)}if(s){let d=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],f=l[1],d=l[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=f),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function hb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ub(i){let e,t=i.extensions&&i.extensions[rt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Xl(t.attributes):e=i.indices+":"+Xl(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Xl(i.targets[n]);return e}function Xl(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function _h(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function fb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var db=new Qe,bh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new rb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?(this.textureLoader=new Br(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new Gr(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new $n(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return ms(r,o,s),si(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())r(u,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[rt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(wn.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Wl[s.type],o=tr[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new kt(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=Wl[s.type],l=tr[s.componentType],u=l.BYTES_PER_ELEMENT,f=u*c,d=s.byteOffset||0,m=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,x=s.normalized===!0,w,b;if(m&&m!==f){let g=Math.floor(d/m),S="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+g+":"+s.count,R=t.cache.get(S);R||(w=new l(o,g*m,s.count*m/u),R=new Ui(w,m/u),t.cache.add(S,R)),b=new Oi(R,c,d%m/u,x)}else o===null?w=new l(s.count*c):w=new l(o,d,s.count*c),b=new kt(w,c,x);if(s.sparse!==void 0){let g=Wl.SCALAR,S=tr[s.sparse.indices.componentType],R=s.sparse.indices.byteOffset||0,T=s.sparse.values.byteOffset||0,P=new S(a[1],R,s.sparse.count*g),I=new l(a[2],T,s.sparse.count*c);o!==null&&(b=new kt(b.array.slice(),b.itemSize,b.normalized)),b.normalized=!1;for(let v=0,E=P.length;v<E;v++){let B=P[v];if(b.setX(B,I[v*c]),c>=2&&b.setY(B,I[v*c+1]),c>=3&&b.setZ(B,I[v*c+2]),c>=4&&b.setW(B,I[v*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}b.normalized=x}return b})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return u.magFilter=Bf[d.magFilter]||_t,u.minFilter=Bf[d.minFilter]||Tn,u.wrapS=kf[d.wrapS]||Fi,u.wrapT=kf[d.wrapT]||Fi,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Lt&&u.minFilter!==_t,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1,u;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)u=n.getDependency("bufferView",a.bufferView).then(function(d){return new Promise(function(m,x){t.parse(d,m,x)})});else{if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;let m=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(m),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");u=Promise.resolve(c).then(function(d){return new Promise(function(m,x){let w=m;t.isImageBitmapLoader===!0&&(w=function(b){let g=new Kt(b);g.needsUpdate=!0,m(g)}),t.load(wn.resolveURL(d,r.path),w,void 0,x)})})}let f=u.then(function(d){return l===!0&&o.revokeObjectURL(c),si(d,a),d.userData.mimeType=a.mimeType||fb(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=f,f}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[rt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[rt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[rt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Gs,cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new Hs,cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Jn}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[rt.KHR_MATERIALS_UNLIT]){let f=s[rt.KHR_MATERIALS_UNLIT];a=f.getMaterialType(),l.push(f.extendParams(o,r,t))}else{let f=r.pbrMetallicRoughness||{};if(o.color=new Ue(1,1,1),o.opacity=1,Array.isArray(f.baseColorFactor)){let d=f.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Mt),o.opacity=d[3]}f.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",f.baseColorTexture,Rt)),o.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,o.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",f.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",f.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=un);let u=r.alphaMode||ql.OPAQUE;if(u===ql.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===ql.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ln&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Xe(1,1),r.normalTexture.scale!==void 0)){let f=r.normalTexture.scale;o.normalScale.set(f,f)}if(r.occlusionTexture!==void 0&&a!==ln&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ln){let f=r.emissiveFactor;o.emissive=new Ue().setRGB(f[0],f[1],f[2],Mt)}return r.emissiveTexture!==void 0&&a!==ln&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Rt)),Promise.all(l).then(function(){let f=new a(o);return r.name&&(f.name=r.name),si(f,r),t.associations.set(f,{materials:e}),r.extensions&&ms(s,f,r),f})}createUniqueName(e){let t=St.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[rt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return zf(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=ub(l),f=s[u];if(f)a.push(f.promise);else{let d;l.extensions&&l.extensions[rt.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=zf(new en,l,t),l.mode===In.TRIANGLE_STRIP?d=d.then(m=>Vl(m,Qr)):l.mode===In.TRIANGLE_FAN&&(d=d.then(m=>Vl(m,$s))),s[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?cb(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],f=[];for(let m=0,x=u.length;m<x;m++){let w=u[m],b=a[m],g,S=l[m];if(b.mode===In.TRIANGLES||b.mode===In.TRIANGLE_STRIP||b.mode===In.TRIANGLE_FAN||b.mode===void 0){let R=r.isSkinnedMesh===!0,T=w.hasAttribute("skinIndex")&&w.hasAttribute("skinWeight");R&&T===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),g=R&&T?new Ar(w,S):new xt(w,S),g.isSkinnedMesh===!0&&g.normalizeSkinWeights()}else if(b.mode===In.LINES)g=new Cr(w,S);else if(b.mode===In.LINE_STRIP)g=new is(w,S);else if(b.mode===In.LINE_LOOP)g=new Pr(w,S);else if(b.mode===In.POINTS)g=new Ir(w,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+b.mode);Object.keys(g.geometry.morphAttributes).length>0&&hb(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),si(g,r),b.extensions&&ms(s,g,b),t.assignFinalMaterial(g),f.push(g)}for(let m=0,x=f.length;m<x;m++)t.associations.set(f[m],{meshes:e,primitives:m});if(f.length===1)return r.extensions&&ms(s,f[0],r),f[0];let d=new Un;r.extensions&&ms(s,d,r),t.associations.set(d,{meshes:e});for(let m=0,x=f.length;m<x;m++)d.add(f[m]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ht(Vi.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new as(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),si(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let f=a[l];if(f){o.push(f);let d=new Qe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Rr(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let f=0,d=s.channels.length;f<d;f++){let m=s.channels[f],x=s.samplers[m.sampler],w=m.target,b=w.node,g=s.parameters!==void 0?s.parameters[x.input]:x.input,S=s.parameters!==void 0?s.parameters[x.output]:x.output;w.node!==void 0&&(a.push(this.getDependency("node",b)),o.push(this.getDependency("accessor",g)),c.push(this.getDependency("accessor",S)),l.push(x),u.push(w))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(f){let d=f[0],m=f[1],x=f[2],w=f[3],b=f[4],g=[];for(let R=0,T=d.length;R<T;R++){let P=d[R],I=m[R],v=x[R],E=w[R],B=b[R];if(P===void 0)continue;P.updateMatrix&&P.updateMatrix();let F=n._createAnimationTracks(P,I,v,E,B);if(F)for(let O=0;O<F.length;O++)g.push(F[O])}let S=new Or(r,void 0,g);return si(S,s),S})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let u=l[0],f=l[1],d=l[2];d!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(d,db)});for(let m=0,x=f.length;m<x;m++)u.add(f[m]);if(u.userData.pivot!==void 0&&f.length>0){let m=u.userData.pivot,x=f[0];u.pivot=new V().fromArray(m),u.position.x-=m[0],u.position.y-=m[1],u.position.z-=m[2],x.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(r.isBone===!0?u=new zs:l.length>1?u=new Un:l.length===1?u=l[0]:u=new Et,u!==l[0])for(let f=0,d=l.length;f<d;f++)u.add(l[f]);if(r.name&&(u.userData.name=r.name,u.name=a),si(u,r),r.extensions&&ms(n,u,r),r.matrix!==void 0){let f=new Qe;f.fromArray(r.matrix),u.applyMatrix4(f)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!s.associations.has(u))s.associations.set(u,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let f=s.associations.get(u);s.associations.set(u,{...f})}return s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Un;n.name&&(r.name=s.createUniqueName(n.name)),si(r,n),n.extensions&&ms(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,f=c.length;u<f;u++){let d=c[u];d.parent!==null?r.add(Ff(d)):r.add(d)}let l=u=>{let f=new Map;for(let[d,m]of s.associations)(d instanceof cn||d instanceof Kt)&&f.set(d,m);return u.traverse(d=>{let m=s.associations.get(d);m!=null&&f.set(d,m)}),f};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(m){m.morphTargetInfluences&&c.push(m.name?m.name:m.uuid)}Wi[r.path]===Wi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(Wi[r.path]){case Wi.weights:u=vi;break;case Wi.rotation:u=yi;break;case Wi.translation:case Wi.scale:u=zi;break;default:n.itemSize===1?u=vi:u=zi;break}let f=s.interpolation!==void 0?ob[s.interpolation]:es,d=this._getArrayFromAccessor(n);for(let m=0,x=c.length;m<x;m++){let w=new u(c[m]+"."+Wi[r.path],t.array,d,f);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(w),a.push(w)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=_h(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof yi?mh:uc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function pb(i,e,t){let n=e.attributes,s=new Yt;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new V(c[0],c[1],c[2]),new V(l[0],l[1],l[2])),o.normalized){let u=_h(tr[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new V,c=new V;for(let l=0,u=r.length;l<u;l++){let f=r[l];if(f.POSITION!==void 0){let d=t.json.accessors[f.POSITION],m=d.min,x=d.max;if(m!==void 0&&x!==void 0){if(c.setX(Math.max(Math.abs(m[0]),Math.abs(x[0]))),c.setY(Math.max(Math.abs(m[1]),Math.abs(x[1]))),c.setZ(Math.max(Math.abs(m[2]),Math.abs(x[2]))),d.normalized){let w=_h(tr[d.componentType]);c.multiplyScalar(w)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new mn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function zf(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=gh[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return it.workingColorSpace!==Mt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${it.workingColorSpace}" not supported.`),si(i,e),pb(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?lb(i,e.targets,t):i})}var xh=new WeakMap,mb=new URL("../libs/draco/draco_decoder.wasm","https://localhost/").toString(),gb=new URL("../libs/draco/draco_wasm_wrapper.js","https://localhost/").toString(),_b=new URL("../libs/draco/draco_decoder.js","https://localhost/").toString(),Yy={js:new URL("../libs/draco/gltf/draco_wasm_wrapper.js","https://localhost/").toString(),wasm:new URL("../libs/draco/gltf/draco_decoder.wasm","https://localhost/").toString()},fc=class extends En{constructor(e){super(e),this.decoderPaths={js:gb,wasm:mb,dep_js:_b},this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){let{decoderPaths:t}=this;return typeof e=="object"?(t.js=e.js,t.wasm=e.wasm,t.dep_js=null):(t.js=wn.resolveURL("draco_wasm_wrapper.js",e),t.wasm=wn.resolveURL("draco_decoder.wasm",e),t.dep_js=wn.resolveURL("draco_decoder.js",e)),this}setDecoderConfig(e){return console.warn("THREE.DRACOLoader: setDecoderConfig to has been deprecated and will be removed in r194."),this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,s){let r=new $n(this.manager);r.setPriority(this.priority),r.setCache(this.cache),r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},n,s)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,Rt,n).catch(n)}decodeDracoFile(e,t,n,s,r=Mt,a=()=>{}){let o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){let n=JSON.stringify(t);if(xh.has(e)){let c=xh.get(e);if(c.key===n)return c.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s,r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(c=>(s=c,new Promise((l,u)=>{s._callbacks[r]={resolve:l,reject:u},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(c=>this._createGeometry(c.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),xh.set(e,{key:n,promise:o}),o}_createGeometry(e){let t=new en;e.index&&t.setIndex(new kt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let{name:s,array:r,itemSize:a,stride:o,vertexColorSpace:c}=e.attributes[n],l;if(a===o)l=new kt(r,a);else{let u=new Ui(r,o);l=new Oi(u,a,0)}s==="color"&&(this._assignVertexColorSpace(l,c),l.normalized=!(r instanceof Float32Array)),t.setAttribute(s,l)}return t}_assignVertexColorSpace(e,t){if(t!==Rt)return;let n=new Ue;for(let s=0,r=e.count;s<r;s++)n.fromBufferAttribute(e,s),it.colorSpaceToWorking(n,Rt),e.setXYZ(s,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new $n(this.manager);return n.setPriority(this.priority),n.setCache(this.cache),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((s,r)=>{n.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[],{decoderPaths:n}=this;if(e){if(n.dep_js===null)throw new Error("THREE.DRACOLoader: WebAssembly is required when using a custom decoder paths.");t.push(this._loadLibrary(n.dep_js,"text"))}else t.push(this._loadLibrary(n.js,"text")),t.push(this._loadLibrary(n.wasm,"arraybuffer"));return this.decoderPending=Promise.all(t).then(s=>{let r=s[0];e||(this.decoderConfig.wasmBinary=s[1]);let a=bb.toString(),o=["/* draco decoder */",r,"","/* worker */",a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){let a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function bb(){let i,e;onmessage=function(a){let o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(f){u({draco:f})},DracoDecoderModule(i)});break;case"decode":let c=o.buffer,l=o.taskConfig;e.then(u=>{let f=u.draco,d=new f.Decoder;try{let m=t(f,d,new Int8Array(c),l),x=m.attributes.map(w=>w.array.buffer);m.index&&x.push(m.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:m},x)}catch(m){console.error(m),self.postMessage({type:"error",id:o.id,error:m.message})}finally{f.destroy(d)}});break}};function t(a,o,c,l){let u=l.attributeIDs,f=l.attributeTypes,d,m,x=o.GetEncodedGeometryType(c);if(x===a.TRIANGULAR_MESH)d=new a.Mesh,m=o.DecodeArrayToMesh(c,c.byteLength,d);else if(x===a.POINT_CLOUD)d=new a.PointCloud,m=o.DecodeArrayToPointCloud(c,c.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!m.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+m.error_msg());let w={index:null,attributes:[]};for(let b in u){let g=self[f[b]],S,R;if(l.useUniqueIDs)R=u[b],S=o.GetAttributeByUniqueId(d,R);else{if(R=o.GetAttributeId(d,a[u[b]]),R===-1)continue;S=o.GetAttribute(d,R)}let T=s(a,o,d,b,g,S);b==="color"&&(T.vertexColorSpace=l.vertexColorSpace),w.attributes.push(T)}return x===a.TRIANGULAR_MESH&&(w.index=n(a,o,d)),a.destroy(d),w}function n(a,o,c){let u=c.num_faces()*3,f=u*4,d=a._malloc(f);o.GetTrianglesUInt32Array(c,f,d);let m=new Uint32Array(a.HEAPF32.buffer,d,u).slice();return a._free(d),{array:m,itemSize:1}}function s(a,o,c,l,u,f){let d=c.num_points(),m=f.num_components(),x=r(a,u),w=m*u.BYTES_PER_ELEMENT,b=Math.ceil(w/4)*4,g=b/u.BYTES_PER_ELEMENT,S=d*w,R=d*b,T=a._malloc(S);o.GetAttributeDataArrayForAllPoints(c,f,x,S,T);let P=new u(a.HEAPF32.buffer,T,S/u.BYTES_PER_ELEMENT),I;if(w===b)I=P.slice();else{I=new u(R/u.BYTES_PER_ELEMENT);let v=0;for(let E=0;E<d;E++){for(let B=0;B<m;B++)I[v+B]=P[E*m+B];v+=g}}return a._free(T),{name:l,count:d,itemSize:m,array:I,stride:g}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}var Gf=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?o(e):o(i),r,a=WebAssembly.instantiate(s,{}).then(function(g){r=g.instance,r.exports.__wasm_call_ctors()});function o(g){for(var S=new Uint8Array(g.length),R=0;R<g.length;++R){var T=g.charCodeAt(R);S[R]=T>96?T-97:T>64?T-39:T+4}for(var P=0,R=0;R<g.length;++R)S[P++]=S[R]<60?n[S[R]]:(S[R]-60)*64+S[++R];return S.buffer.slice(0,P)}function c(g,S,R,T,P,I,v){var E=g.exports.sbrk,B=T+3&-4,F=E(B*P),O=E(I.length),q=new Uint8Array(g.exports.memory.buffer);q.set(I,O);var Y=S(F,T,P,O,I.length);if(Y==0&&v&&v(F,B,P),R.set(q.subarray(F,F+T*P)),E(F-E(0)),Y!=0)throw new Error("Malformed buffer data: "+Y)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},f=[],d=0;function m(g){var S={object:new Worker(g),pending:0,requests:{}};return S.object.onmessage=function(R){var T=R.data;S.pending-=T.count,S.requests[T.id][T.action](T.value),delete S.requests[T.id]},S}function x(g){for(var S="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(s)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+b.name+";"+c.toString()+b.toString(),R=new Blob([S],{type:"text/javascript"}),T=URL.createObjectURL(R),P=f.length;P<g;++P)f[P]=m(T);for(var P=g;P<f.length;++P)f[P].object.postMessage({});f.length=g,URL.revokeObjectURL(T)}function w(g,S,R,T,P){for(var I=f[0],v=1;v<f.length;++v)f[v].pending<I.pending&&(I=f[v]);return new Promise(function(E,B){var F=new Uint8Array(R),O=++d;I.pending+=g,I.requests[O]={resolve:E,reject:B},I.object.postMessage({id:O,count:g,size:S,source:F,mode:T,filter:P},[F.buffer])})}function b(g){var S=g.data;self.ready.then(function(R){if(!S.id)return self.close();try{var T=new Uint8Array(S.count*S.size);c(R,R.exports[S.mode],T,S.count,S.size,S.source,R.exports[S.filter]),self.postMessage({id:S.id,count:S.count,action:"resolve",value:T},[T.buffer])}catch(P){self.postMessage({id:S.id,count:S.count,action:"reject",value:P})}})}return{ready:a,supported:!0,useWorkers:function(g){x(g)},decodeVertexBuffer:function(g,S,R,T,P){c(r,r.exports.meshopt_decodeVertexBuffer,g,S,R,T,r.exports[l[P]])},decodeIndexBuffer:function(g,S,R,T){c(r,r.exports.meshopt_decodeIndexBuffer,g,S,R,T)},decodeIndexSequence:function(g,S,R,T){c(r,r.exports.meshopt_decodeIndexSequence,g,S,R,T)},decodeGltfBuffer:function(g,S,R,T,P,I){c(r,r.exports[u[P]],g,S,R,T,r.exports[l[I]])},decodeGltfBufferAsync:function(g,S,R,T,P){return f.length>0?w(g,S,R,u[T],l[P]):a.then(function(){var I=new Uint8Array(g*S);return c(r,r.exports[u[T]],I,g,S,R,r.exports[l[P]]),I})}}})();var Dn=Uint8Array,nr=Uint16Array,xb=Int32Array,Vf=new Dn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Wf=new Dn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),vb=new Dn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),qf=function(i,e){for(var t=new nr(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var s=new xb(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)s[r]=r-t[n]<<5|n;return{b:t,r:s}},Xf=qf(Vf,2),jf=Xf.b,yb=Xf.r;jf[28]=258,yb[258]=28;var Kf=qf(Wf,0),Sb=Kf.b,$y=Kf.r,Sh=new nr(32768);for(dt=0;dt<32768;++dt)Ti=(dt&43690)>>1|(dt&21845)<<1,Ti=(Ti&52428)>>2|(Ti&13107)<<2,Ti=(Ti&61680)>>4|(Ti&3855)<<4,Sh[dt]=((Ti&65280)>>8|(Ti&255)<<8)>>1;var Ti,dt,aa=(function(i,e,t){for(var n=i.length,s=0,r=new nr(e);s<n;++s)i[s]&&++r[i[s]-1];var a=new nr(e);for(s=1;s<e;++s)a[s]=a[s-1]+r[s-1]<<1;var o;if(t){o=new nr(1<<e);var c=15-e;for(s=0;s<n;++s)if(i[s])for(var l=s<<4|i[s],u=e-i[s],f=a[i[s]-1]++<<u,d=f|(1<<u)-1;f<=d;++f)o[Sh[f]>>c]=l}else for(o=new nr(n),s=0;s<n;++s)i[s]&&(o[s]=Sh[a[i[s]-1]++]>>15-i[s]);return o}),oa=new Dn(288);for(dt=0;dt<144;++dt)oa[dt]=8;var dt;for(dt=144;dt<256;++dt)oa[dt]=9;var dt;for(dt=256;dt<280;++dt)oa[dt]=7;var dt;for(dt=280;dt<288;++dt)oa[dt]=8;var dt,Yf=new Dn(32);for(dt=0;dt<32;++dt)Yf[dt]=5;var dt;var Mb=aa(oa,9,1);var Eb=aa(Yf,5,1),vh=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},zn=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},yh=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},wb=function(i){return(i+7)/8|0},Tb=function(i,e,t){return(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length),new Dn(i.subarray(e,t))};var Ab=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Hn=function(i,e,t){var n=new Error(e||Ab[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Hn),!t)throw n;return n},Rb=function(i,e,t,n){var s=i.length,r=n?n.length:0;if(!s||e.f&&!e.l)return t||new Dn(0);var a=!t,o=a||e.i!=2,c=e.i;a&&(t=new Dn(s*3));var l=function(Ge){var ct=t.length;if(Ge>ct){var lt=new Dn(Math.max(ct*2,Ge));lt.set(t),t=lt}},u=e.f||0,f=e.p||0,d=e.b||0,m=e.l,x=e.d,w=e.m,b=e.n,g=s*8;do{if(!m){u=zn(i,f,1);var S=zn(i,f+1,3);if(f+=3,S)if(S==1)m=Mb,x=Eb,w=9,b=5;else if(S==2){var I=zn(i,f,31)+257,v=zn(i,f+10,15)+4,E=I+zn(i,f+5,31)+1;f+=14;for(var B=new Dn(E),F=new Dn(19),O=0;O<v;++O)F[vb[O]]=zn(i,f+O*3,7);f+=v*3;for(var q=vh(F),Y=(1<<q)-1,N=aa(F,q,1),O=0;O<E;){var K=N[zn(i,f,Y)];f+=K&15;var R=K>>4;if(R<16)B[O++]=R;else{var j=0,J=0;for(R==16?(J=3+zn(i,f,3),f+=2,j=B[O-1]):R==17?(J=3+zn(i,f,7),f+=3):R==18&&(J=11+zn(i,f,127),f+=7);J--;)B[O++]=j}}var de=B.subarray(0,I),Z=B.subarray(I);w=vh(de),b=vh(Z),m=aa(de,w,1),x=aa(Z,b,1)}else Hn(1);else{var R=wb(f)+4,T=i[R-4]|i[R-3]<<8,P=R+T;if(P>s){c&&Hn(0);break}o&&l(d+T),t.set(i.subarray(R,P),d),e.b=d+=T,e.p=f=P*8,e.f=u;continue}if(f>g){c&&Hn(0);break}}o&&l(d+131072);for(var ae=(1<<w)-1,he=(1<<b)-1,Te=f;;Te=f){var j=m[yh(i,f)&ae],Fe=j>>4;if(f+=j&15,f>g){c&&Hn(0);break}if(j||Hn(2),Fe<256)t[d++]=Fe;else if(Fe==256){Te=f,m=null;break}else{var se=Fe-254;if(Fe>264){var O=Fe-257,we=Vf[O];se=zn(i,f,(1<<we)-1)+jf[O],f+=we}var Le=x[yh(i,f)&he],ke=Le>>4;Le||Hn(3),f+=Le&15;var Z=Sb[ke];if(ke>3){var we=Wf[ke];Z+=yh(i,f)&(1<<we)-1,f+=we}if(f>g){c&&Hn(0);break}o&&l(d+131072);var pe=d+se;if(d<Z){var We=r-Z,mt=Math.min(Z,pe);for(We+d<0&&Hn(3);d<mt;++d)t[d]=n[We+d]}for(;d<pe;++d)t[d]=t[d-Z]}}e.l=m,e.p=Te,e.b=d,e.f=u,m&&(u=1,e.m=w,e.d=x,e.n=b)}while(!u);return d!=t.length&&a?Tb(t,0,d):t.subarray(0,d)};var Cb=new Dn(0);var Pb=function(i,e){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&Hn(6,"invalid zlib data"),(i[1]>>5&1)==+!e&&Hn(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function ir(i,e){return Rb(i.subarray(Pb(i,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}var Ib=typeof TextDecoder<"u"&&new TextDecoder,Db=0;try{Ib.decode(Cb,{stream:!0}),Db=1}catch{}var dc=class extends ss{constructor(e){super(e),this.type=Ft,this.outputFormat=Ut,this.part=0}parse(e){let B=Math.pow(2.7182818,2.2),F=null,O=null;function q(p,h){let _=0;for(let A=0;A<65536;++A)(A==0||p[A>>3]&1<<(A&7))&&(h[_++]=A);let M=_-1;for(;_<65536;)h[_++]=0;return M}function Y(p){for(let h=0;h<16384;h++)p[h]={},p[h].len=0,p[h].lit=0,p[h].p=null}let N={l:0,c:0,lc:0};function K(p,h,_,M,A){for(;_<p;)h=h<<8|ye(M,A),_+=8;_-=p,N.l=h>>_&(1<<p)-1,N.c=h,N.lc=_}let j=new Array(59);function J(p){for(let _=0;_<=58;++_)j[_]=0;for(let _=0;_<65537;++_)j[p[_]]+=1;let h=0;for(let _=58;_>0;--_){let M=h+j[_]>>1;j[_]=h,h=M}for(let _=0;_<65537;++_){let M=p[_];M>0&&(p[_]=M|j[M]++<<6)}}function de(p,h,_,M,A,D){let C=h,G=0,k=0;for(;M<=A;M++){if(C.value-h.value>_)return!1;K(6,G,k,p,C);let z=N.l;if(G=N.c,k=N.lc,D[M]=z,z==63){if(C.value-h.value>_)throw new Error("THREE.EXRLoader: Something wrong with hufUnpackEncTable");K(8,G,k,p,C);let W=N.l+6;if(G=N.c,k=N.lc,M+W>A+1)throw new Error("THREE.EXRLoader: Something wrong with hufUnpackEncTable");for(;W--;)D[M++]=0;M--}else if(z>=59){let W=z-59+2;if(M+W>A+1)throw new Error("THREE.EXRLoader: Something wrong with hufUnpackEncTable");for(;W--;)D[M++]=0;M--}}J(D)}function Z(p){return p&63}function ae(p){return p>>6}function he(p,h,_,M){for(;h<=_;h++){let A=ae(p[h]),D=Z(p[h]);if(A>>D)throw new Error("THREE.EXRLoader: Invalid table entry");if(D>14){let C=M[A>>D-14];if(C.len)throw new Error("THREE.EXRLoader: Invalid table entry");if(C.lit++,C.p){let G=C.p;C.p=new Array(C.lit);for(let k=0;k<C.lit-1;++k)C.p[k]=G[k]}else C.p=new Array(1);C.p[C.lit-1]=h}else if(D){let C=0;for(let G=1<<14-D;G>0;G--){let k=M[(A<<14-D)+C];if(k.len||k.p)throw new Error("THREE.EXRLoader: Invalid table entry");k.len=D,k.lit=h,C++}}}return!0}let Te={c:0,lc:0};function Fe(p,h,_,M){p=p<<8|ye(_,M),h+=8,Te.c=p,Te.lc=h}let se={c:0,lc:0};function we(p,h,_,M,A,D,C,G,k){if(p==h){M<8&&(Fe(_,M,A,D),_=Te.c,M=Te.lc),M-=8;let z=_>>M;if(z=new Uint8Array([z])[0],G.value+z>k)return!1;let W=C[G.value-1];for(;z-- >0;)C[G.value++]=W}else if(G.value<k)C[G.value++]=p;else return!1;se.c=_,se.lc=M}function Le(p){return p&65535}function ke(p){let h=Le(p);return h>32767?h-65536:h}let pe={a:0,b:0};function We(p,h){let _=ke(p),A=ke(h),D=_+(A&1)+(A>>1),C=D,G=D-A;pe.a=C,pe.b=G}function mt(p,h){let _=Le(p),M=Le(h),A=_-(M>>1)&65535,D=M+A-32768&65535;pe.a=D,pe.b=A}function Ge(p,h,_,M,A,D,C){let G=C<16384,k=_>A?A:_,z=1,W,re;for(;z<=k;)z<<=1;for(z>>=1,W=z,z>>=1;z>=1;){re=0;let Q=re+D*(A-W),ee=D*z,le=D*W,ue=M*z,fe=M*W,Ee,Ve,ce,je;for(;re<=Q;re+=le){let be=re,Ce=re+M*(_-W);for(;be<=Ce;be+=fe){let Ie=be+ue,ht=be+ee,tt=ht+ue;G?(We(p[be+h],p[ht+h]),Ee=pe.a,ce=pe.b,We(p[Ie+h],p[tt+h]),Ve=pe.a,je=pe.b,We(Ee,Ve),p[be+h]=pe.a,p[Ie+h]=pe.b,We(ce,je),p[ht+h]=pe.a,p[tt+h]=pe.b):(mt(p[be+h],p[ht+h]),Ee=pe.a,ce=pe.b,mt(p[Ie+h],p[tt+h]),Ve=pe.a,je=pe.b,mt(Ee,Ve),p[be+h]=pe.a,p[Ie+h]=pe.b,mt(ce,je),p[ht+h]=pe.a,p[tt+h]=pe.b)}if(_&z){let Ie=be+ee;G?We(p[be+h],p[Ie+h]):mt(p[be+h],p[Ie+h]),Ee=pe.a,p[Ie+h]=pe.b,p[be+h]=Ee}}if(A&z){let be=re,Ce=re+M*(_-W);for(;be<=Ce;be+=fe){let Ie=be+ue;G?We(p[be+h],p[Ie+h]):mt(p[be+h],p[Ie+h]),Ee=pe.a,p[Ie+h]=pe.b,p[be+h]=Ee}}W=z,z>>=1}return re}function ct(p,h,_,M,A,D,C,G,k){let z=0,W=0,re=C,Q=Math.trunc(M.value+(A+7)/8);for(;M.value<Q;)for(Fe(z,W,_,M),z=Te.c,W=Te.lc;W>=14;){let le=z>>W-14&16383,ue=h[le];if(ue.len)W-=ue.len,we(ue.lit,D,z,W,_,M,G,k,re),z=se.c,W=se.lc;else{if(!ue.p)throw new Error("THREE.EXRLoader: hufDecode issues");let fe;for(fe=0;fe<ue.lit;fe++){let Ee=Z(p[ue.p[fe]]);for(;W<Ee&&M.value<Q;)Fe(z,W,_,M),z=Te.c,W=Te.lc;if(W>=Ee&&ae(p[ue.p[fe]])==(z>>W-Ee&(1<<Ee)-1)){W-=Ee,we(ue.p[fe],D,z,W,_,M,G,k,re),z=se.c,W=se.lc;break}}if(fe==ue.lit)throw new Error("THREE.EXRLoader: hufDecode issues")}}let ee=8-A&7;for(z>>=ee,W-=ee;W>0;){let le=h[z<<14-W&16383];if(le.len)W-=le.len,we(le.lit,D,z,W,_,M,G,k,re),z=se.c,W=se.lc;else throw new Error("THREE.EXRLoader: hufDecode issues")}return!0}function lt(p,h,_,M,A,D){let C={value:0},G=_.value,k=ie(h,_),z=ie(h,_);_.value+=4;let W=ie(h,_);if(_.value+=4,k<0||k>=65537||z<0||z>=65537)throw new Error("THREE.EXRLoader: Something wrong with HUF_ENCSIZE");let re=new Array(65537),Q=new Array(16384);Y(Q);let ee=M-(_.value-G);if(de(p,_,ee,k,z,re),W>8*(M-(_.value-G)))throw new Error("THREE.EXRLoader: Something wrong with hufUncompress");he(re,k,z,Q),ct(re,Q,p,_,W,z,D,A,C)}function at(p,h,_){for(let M=0;M<_;++M)h[M]=p[h[M]]}function Pt(p){for(let h=1;h<p.length;h++){let _=p[h-1]+p[h]-128;p[h]=_}}function At(p,h){let _=0,M=Math.floor((p.length+1)/2),A=0,D=p.length-1;for(;!(A>D||(h[A++]=p[_++],A>D));)h[A++]=p[M++]}function qt(p){let h=p.byteLength,_=new Array,M=0,A=new DataView(p);for(;h>0;){let D=A.getInt8(M++);if(D<0){let C=-D;h-=C+1;for(let G=0;G<C;G++)_.push(A.getUint8(M++))}else{let C=D;h-=2;let G=A.getUint8(M++);for(let k=0;k<C+1;k++)_.push(G)}}return _}function wt(p,h,_,M,A,D){let C=new DataView(D.buffer),G=_[p.idx[0]].width,k=_[p.idx[0]].height,z=3,W=Math.floor(G/8),re=Math.ceil(G/8),Q=Math.ceil(k/8),ee=G-(re-1)*8,le=k-(Q-1)*8,ue={value:0},fe=new Array(z),Ee=new Array(z),Ve=new Array(z),ce=new Array(z),je=new Array(z);for(let Ce=0;Ce<z;++Ce)je[Ce]=h[p.idx[Ce]],fe[Ce]=Ce<1?0:fe[Ce-1]+re*Q,Ee[Ce]=new Float32Array(64),Ve[Ce]=new Uint16Array(64),ce[Ce]=new Uint16Array(re*64);for(let Ce=0;Ce<Q;++Ce){let Ie=8;Ce==Q-1&&(Ie=le);let ht=8;for(let qe=0;qe<re;++qe){qe==re-1&&(ht=ee);for(let Ne=0;Ne<z;++Ne)Ve[Ne].fill(0),Ve[Ne][0]=A[fe[Ne]++],It(ue,M,Ve[Ne]),nn(Ve[Ne],Ee[Ne]),sn(Ee[Ne]);z==3&&fn(Ee);for(let Ne=0;Ne<z;++Ne)yt(Ee[Ne],ce[Ne],qe*64)}let tt=0;for(let qe=0;qe<z;++qe){let Ne=_[p.idx[qe]].type;for(let ot=8*Ce;ot<8*Ce+Ie;++ot){tt=je[qe][ot];for(let Tt=0;Tt<W;++Tt){let Ke=Tt*64+(ot&7)*8;C.setUint16(tt+0*Ne,ce[qe][Ke+0],!0),C.setUint16(tt+2*Ne,ce[qe][Ke+1],!0),C.setUint16(tt+4*Ne,ce[qe][Ke+2],!0),C.setUint16(tt+6*Ne,ce[qe][Ke+3],!0),C.setUint16(tt+8*Ne,ce[qe][Ke+4],!0),C.setUint16(tt+10*Ne,ce[qe][Ke+5],!0),C.setUint16(tt+12*Ne,ce[qe][Ke+6],!0),C.setUint16(tt+14*Ne,ce[qe][Ke+7],!0),tt+=16*Ne}}if(W!=re)for(let ot=8*Ce;ot<8*Ce+Ie;++ot){let Tt=je[qe][ot]+8*W*2*Ne,Ke=W*64+(ot&7)*8;for(let gt=0;gt<ht;++gt)C.setUint16(Tt+gt*2*Ne,ce[qe][Ke+gt],!0)}}}let be=new Uint16Array(G);C=new DataView(D.buffer);for(let Ce=0;Ce<z;++Ce){_[p.idx[Ce]].decoded=!0;let Ie=_[p.idx[Ce]].type;if(_[Ce].type==2)for(let ht=0;ht<k;++ht){let tt=je[Ce][ht];for(let qe=0;qe<G;++qe)be[qe]=C.getUint16(tt+qe*2*Ie,!0);for(let qe=0;qe<G;++qe)C.setFloat32(tt+qe*2*Ie,xe.fromHalfFloat(be[qe]),!0)}}}function An(p,h,_,M,A,D){let C=new DataView(D.buffer),G=_[p],k=G.width,z=G.height,W=Math.ceil(k/8),re=Math.ceil(z/8),Q=Math.floor(k/8),ee=k-(W-1)*8,le=z-(re-1)*8,ue={value:0},fe=0,Ee=new Float32Array(64),Ve=new Uint16Array(64),ce=new Uint16Array(W*64);for(let je=0;je<re;++je){let be=8;je==re-1&&(be=le);for(let Ce=0;Ce<W;++Ce)Ve.fill(0),Ve[0]=A[fe++],It(ue,M,Ve),nn(Ve,Ee),sn(Ee),yt(Ee,ce,Ce*64);for(let Ce=8*je;Ce<8*je+be;++Ce){let Ie=h[p][Ce];for(let ht=0;ht<Q;++ht){let tt=ht*64+(Ce&7)*8;for(let qe=0;qe<8;++qe)C.setUint16(Ie+qe*2*G.type,ce[tt+qe],!0);Ie+=16*G.type}if(W!=Q){let ht=Q*64+(Ce&7)*8;for(let tt=0;tt<ee;++tt)C.setUint16(Ie+tt*2*G.type,ce[ht+tt],!0)}}}G.decoded=!0}function It(p,h,_){let M,A=1;for(;A<64;)M=h[p.value],M==65280?A=64:M>>8==255?A+=M&255:(_[A]=M,A++),p.value++}function nn(p,h){h[0]=xe.fromHalfFloat(p[0]),h[1]=xe.fromHalfFloat(p[1]),h[2]=xe.fromHalfFloat(p[5]),h[3]=xe.fromHalfFloat(p[6]),h[4]=xe.fromHalfFloat(p[14]),h[5]=xe.fromHalfFloat(p[15]),h[6]=xe.fromHalfFloat(p[27]),h[7]=xe.fromHalfFloat(p[28]),h[8]=xe.fromHalfFloat(p[2]),h[9]=xe.fromHalfFloat(p[4]),h[10]=xe.fromHalfFloat(p[7]),h[11]=xe.fromHalfFloat(p[13]),h[12]=xe.fromHalfFloat(p[16]),h[13]=xe.fromHalfFloat(p[26]),h[14]=xe.fromHalfFloat(p[29]),h[15]=xe.fromHalfFloat(p[42]),h[16]=xe.fromHalfFloat(p[3]),h[17]=xe.fromHalfFloat(p[8]),h[18]=xe.fromHalfFloat(p[12]),h[19]=xe.fromHalfFloat(p[17]),h[20]=xe.fromHalfFloat(p[25]),h[21]=xe.fromHalfFloat(p[30]),h[22]=xe.fromHalfFloat(p[41]),h[23]=xe.fromHalfFloat(p[43]),h[24]=xe.fromHalfFloat(p[9]),h[25]=xe.fromHalfFloat(p[11]),h[26]=xe.fromHalfFloat(p[18]),h[27]=xe.fromHalfFloat(p[24]),h[28]=xe.fromHalfFloat(p[31]),h[29]=xe.fromHalfFloat(p[40]),h[30]=xe.fromHalfFloat(p[44]),h[31]=xe.fromHalfFloat(p[53]),h[32]=xe.fromHalfFloat(p[10]),h[33]=xe.fromHalfFloat(p[19]),h[34]=xe.fromHalfFloat(p[23]),h[35]=xe.fromHalfFloat(p[32]),h[36]=xe.fromHalfFloat(p[39]),h[37]=xe.fromHalfFloat(p[45]),h[38]=xe.fromHalfFloat(p[52]),h[39]=xe.fromHalfFloat(p[54]),h[40]=xe.fromHalfFloat(p[20]),h[41]=xe.fromHalfFloat(p[22]),h[42]=xe.fromHalfFloat(p[33]),h[43]=xe.fromHalfFloat(p[38]),h[44]=xe.fromHalfFloat(p[46]),h[45]=xe.fromHalfFloat(p[51]),h[46]=xe.fromHalfFloat(p[55]),h[47]=xe.fromHalfFloat(p[60]),h[48]=xe.fromHalfFloat(p[21]),h[49]=xe.fromHalfFloat(p[34]),h[50]=xe.fromHalfFloat(p[37]),h[51]=xe.fromHalfFloat(p[47]),h[52]=xe.fromHalfFloat(p[50]),h[53]=xe.fromHalfFloat(p[56]),h[54]=xe.fromHalfFloat(p[59]),h[55]=xe.fromHalfFloat(p[61]),h[56]=xe.fromHalfFloat(p[35]),h[57]=xe.fromHalfFloat(p[36]),h[58]=xe.fromHalfFloat(p[48]),h[59]=xe.fromHalfFloat(p[49]),h[60]=xe.fromHalfFloat(p[57]),h[61]=xe.fromHalfFloat(p[58]),h[62]=xe.fromHalfFloat(p[62]),h[63]=xe.fromHalfFloat(p[63])}function sn(p){let h=.5*Math.cos(.7853975),_=.5*Math.cos(3.14159/16),M=.5*Math.cos(3.14159/8),A=.5*Math.cos(3*3.14159/16),D=.5*Math.cos(5*3.14159/16),C=.5*Math.cos(3*3.14159/8),G=.5*Math.cos(7*3.14159/16),k=new Array(4),z=new Array(4),W=new Array(4),re=new Array(4);for(let Q=0;Q<8;++Q){let ee=Q*8;k[0]=M*p[ee+2],k[1]=C*p[ee+2],k[2]=M*p[ee+6],k[3]=C*p[ee+6],z[0]=_*p[ee+1]+A*p[ee+3]+D*p[ee+5]+G*p[ee+7],z[1]=A*p[ee+1]-G*p[ee+3]-_*p[ee+5]-D*p[ee+7],z[2]=D*p[ee+1]-_*p[ee+3]+G*p[ee+5]+A*p[ee+7],z[3]=G*p[ee+1]-D*p[ee+3]+A*p[ee+5]-_*p[ee+7],W[0]=h*(p[ee+0]+p[ee+4]),W[3]=h*(p[ee+0]-p[ee+4]),W[1]=k[0]+k[3],W[2]=k[1]-k[2],re[0]=W[0]+W[1],re[1]=W[3]+W[2],re[2]=W[3]-W[2],re[3]=W[0]-W[1],p[ee+0]=re[0]+z[0],p[ee+1]=re[1]+z[1],p[ee+2]=re[2]+z[2],p[ee+3]=re[3]+z[3],p[ee+4]=re[3]-z[3],p[ee+5]=re[2]-z[2],p[ee+6]=re[1]-z[1],p[ee+7]=re[0]-z[0]}for(let Q=0;Q<8;++Q)k[0]=M*p[16+Q],k[1]=C*p[16+Q],k[2]=M*p[48+Q],k[3]=C*p[48+Q],z[0]=_*p[8+Q]+A*p[24+Q]+D*p[40+Q]+G*p[56+Q],z[1]=A*p[8+Q]-G*p[24+Q]-_*p[40+Q]-D*p[56+Q],z[2]=D*p[8+Q]-_*p[24+Q]+G*p[40+Q]+A*p[56+Q],z[3]=G*p[8+Q]-D*p[24+Q]+A*p[40+Q]-_*p[56+Q],W[0]=h*(p[Q]+p[32+Q]),W[3]=h*(p[Q]-p[32+Q]),W[1]=k[0]+k[3],W[2]=k[1]-k[2],re[0]=W[0]+W[1],re[1]=W[3]+W[2],re[2]=W[3]-W[2],re[3]=W[0]-W[1],p[0+Q]=re[0]+z[0],p[8+Q]=re[1]+z[1],p[16+Q]=re[2]+z[2],p[24+Q]=re[3]+z[3],p[32+Q]=re[3]-z[3],p[40+Q]=re[2]-z[2],p[48+Q]=re[1]-z[1],p[56+Q]=re[0]-z[0]}function fn(p){for(let h=0;h<64;++h){let _=p[0][h],M=p[1][h],A=p[2][h];p[0][h]=_+1.5747*A,p[1][h]=_-.1873*M-.4682*A,p[2][h]=_+1.8556*M}}let H=new Float32Array(1),rn=new Uint32Array(H.buffer);function vt(p){H[0]=p;let h=rn[0],_=h>>>16&32768,M=h&2147483647;if(M>=1199570944)return _|(M>2139095040?32256:31744);if(M<947912704)return H[0]=Math.abs(p)+.5,_|rn[0]-1056964608;let A=M+4095+(M>>>13&1);return _|A-939524096>>>13}function yt(p,h,_){if(O===null){O=new Uint16Array(65536);for(let M=1;M<65536;++M){if((M&31744)===31744)continue;let A=xe.fromHalfFloat(M),D=Math.abs(A),C=D<=1?Math.pow(D,2.2):Math.pow(B,D-1);O[M]=vt(A<0?-C:C)}}for(let M=0;M<64;++M)h[_+M]=O[vt(p[M])]}function Ae(p){return new DataView(p.array.buffer,p.offset.value,p.size)}function Dt(p){let h=p.viewer.buffer.slice(p.offset.value,p.offset.value+p.size),_=new Uint8Array(qt(h)),M=new Uint8Array(_.length);return Pt(_),At(_,M),new DataView(M.buffer)}function He(p){let h=p.array.slice(p.offset.value,p.offset.value+p.size),_=ir(h),M=new Uint8Array(_.length);return Pt(_),At(_,M),new DataView(M.buffer)}function Je(p){let h=p.viewer,_={value:p.offset.value},M=new Uint16Array(p.columns*p.lines*(p.inputChannels.length*p.type)),A=new Uint8Array(8192),D=0,C=new Array(p.inputChannels.length);for(let le=0,ue=p.inputChannels.length;le<ue;le++)C[le]={},C[le].start=D,C[le].end=C[le].start,C[le].nx=p.columns,C[le].ny=p.lines,C[le].size=p.type,D+=C[le].nx*C[le].ny*C[le].size;let G=ge(h,_),k=ge(h,_);if(k>=8192)throw new Error("THREE.EXRLoader: Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(G<=k)for(let le=0;le<k-G+1;le++)A[le+G]=U(h,_);let z=new Uint16Array(65536),W=q(A,z),re=ie(h,_);lt(p.array,h,_,re,M,D);for(let le=0;le<p.inputChannels.length;++le){let ue=C[le];for(let fe=0;fe<C[le].size;++fe)Ge(M,ue.start+fe,ue.nx,ue.size,ue.ny,ue.nx*ue.size,W)}at(z,M,D);let Q=0,ee=new Uint8Array(M.buffer.byteLength);for(let le=0;le<p.lines;le++)for(let ue=0;ue<p.inputChannels.length;ue++){let fe=C[ue],Ee=fe.nx*fe.size,Ve=new Uint8Array(M.buffer,fe.end*2,Ee*2);ee.set(Ve,Q),Q+=Ee*2,fe.end+=Ee}return new DataView(ee.buffer)}function L(p){let h=p.array.slice(p.offset.value,p.offset.value+p.size),_=ir(h),M=p.inputChannels.length*p.lines*p.columns*p.totalBytes,A=new ArrayBuffer(M),D=new DataView(A),C=0,G=0,k=new Array(4);for(let z=0;z<p.lines;z++)for(let W=0;W<p.inputChannels.length;W++){let re=0;switch(p.inputChannels[W].pixelType){case 1:k[0]=C,k[1]=k[0]+p.columns,C=k[1]+p.columns;for(let ee=0;ee<p.columns;++ee){let le=_[k[0]++]<<8|_[k[1]++];re+=le,D.setUint16(G,re,!0),G+=2}break;case 2:k[0]=C,k[1]=k[0]+p.columns,k[2]=k[1]+p.columns,C=k[2]+p.columns;for(let ee=0;ee<p.columns;++ee){let le=_[k[0]++]<<24|_[k[1]++]<<16|_[k[2]++]<<8;re+=le,D.setUint32(G,re,!0),G+=4}break}}return D}function y(p){let h=p.array,_=p.offset.value,M=p.columns,A=p.lines,D=p.inputChannels,C=p.totalBytes,G=Xt.compression==="B44A_COMPRESSION",k=new Uint8Array(A*M*C),z=new Uint16Array(16),W=0;for(let re=0;re<D.length;re++){let Q=D[re],ee=Q.pixelType*2,le=Math.ceil(M/Q.xSampling),ue=Math.ceil(A/Q.ySampling),fe=Q.xSampling===1&&Q.ySampling===1;if(Q.pixelType!==1){for(let ce=0;ce<ue;ce++)if(fe){let je=ce*M*C+W*M;for(let be=0;be<le*ee;be++)k[je+be]=h[_++]}else _+=le*ee;W+=ee;continue}let Ee=Math.ceil(le/4),Ve=Math.ceil(ue/4);for(let ce=0;ce<Ve;ce++)for(let je=0;je<Ee;je++){if(G&&h[_+2]>=52){let be=h[_]<<8|h[_+1],Ce=be&32768?be&32767:~be&65535;z.fill(Ce),_+=3}else{let be=h[_]<<8|h[_+1],Ce=h[_+2]>>2,Ie=32<<Ce,ht=be+((h[_+2]<<4|h[_+3]>>4)&63)*(1<<Ce)-Ie&65535,tt=ht+((h[_+3]<<2|h[_+4]>>6)&63)*(1<<Ce)-Ie&65535,qe=tt+(h[_+4]&63)*(1<<Ce)-Ie&65535,Ne=be+(h[_+5]>>2&63)*(1<<Ce)-Ie&65535,ot=ht+((h[_+5]<<4|h[_+6]>>4)&63)*(1<<Ce)-Ie&65535,Tt=tt+((h[_+6]<<2|h[_+7]>>6)&63)*(1<<Ce)-Ie&65535,Ke=qe+(h[_+7]&63)*(1<<Ce)-Ie&65535,gt=Ne+(h[_+8]>>2&63)*(1<<Ce)-Ie&65535,Jt=ot+((h[_+8]<<4|h[_+9]>>4)&63)*(1<<Ce)-Ie&65535,Ai=Tt+((h[_+9]<<2|h[_+10]>>6)&63)*(1<<Ce)-Ie&65535,Wn=Ke+(h[_+10]&63)*(1<<Ce)-Ie&65535,ji=gt+(h[_+11]>>2&63)*(1<<Ce)-Ie&65535,ma=Jt+((h[_+11]<<4|h[_+12]>>4)&63)*(1<<Ce)-Ie&65535,ga=Ai+((h[_+12]<<2|h[_+13]>>6)&63)*(1<<Ce)-Ie&65535,_a=Wn+(h[_+13]&63)*(1<<Ce)-Ie&65535,lr=[be,Ne,gt,ji,ht,ot,Jt,ma,tt,Tt,Ai,ga,qe,Ke,Wn,_a];for(let _s=0;_s<16;_s++)z[_s]=lr[_s]&32768?lr[_s]&32767:~lr[_s]&65535;_+=14}if(Q.pLinear){if(F===null){F=new Uint16Array(65536);for(let be=0;be<65536;be++)if((be&31744)===31744||be>32768)F[be]=0;else{let Ce=xe.fromHalfFloat(be);F[be]=Ce<=0?0:xe.toHalfFloat(8*Math.log(Ce))}}for(let be=0;be<16;be++)z[be]=F[z[be]]}for(let be=0;be<4;be++){let Ce=ce*4+be;if(!(Ce>=ue))for(let Ie=0;Ie<4;Ie++){let ht=je*4+Ie;if(ht>=le)continue;let tt=z[be*4+Ie];for(let qe=0;qe<Q.ySampling;qe++){let Ne=Ce*Q.ySampling+qe;if(!(Ne>=A))for(let ot=0;ot<Q.xSampling;ot++){let Tt=ht*Q.xSampling+ot;if(Tt>=M)continue;let Ke=Ne*M*C+W*M+Tt*2;k[Ke]=tt&255,k[Ke+1]=tt>>8&255}}}}}W+=2}return new DataView(k.buffer)}function X(p){let h=p.viewer,_={value:p.offset.value},M=new Uint8Array(p.columns*p.lines*(p.inputChannels.length*p.type*2)),A={version:ne(h,_),unknownUncompressedSize:ne(h,_),unknownCompressedSize:ne(h,_),acCompressedSize:ne(h,_),dcCompressedSize:ne(h,_),rleCompressedSize:ne(h,_),rleUncompressedSize:ne(h,_),rleRawSize:ne(h,_),totalAcUncompressedCount:ne(h,_),totalDcUncompressedCount:ne(h,_),acCompression:ne(h,_)};if(A.version<2)throw new Error("THREE.EXRLoader: "+Xt.compression+" version "+A.version+" is unsupported");let D=new Array,C=ge(h,_)-2;for(;C>0;){let ue=me(h.buffer,_),fe=U(h,_),Ee=fe>>2&3,Ve=(fe>>4)-1,ce=new Int8Array([Ve])[0],je=U(h,_);D.push({name:ue,index:ce,type:je,compression:Ee}),C-=ue.length+3}let G=Xt.channels,k=new Array(p.inputChannels.length);for(let ue=0;ue<p.inputChannels.length;++ue){let fe=k[ue]={},Ee=G[ue];fe.name=Ee.name,fe.compression=0,fe.decoded=!1,fe.type=Ee.pixelType,fe.pLinear=Ee.pLinear,fe.width=p.columns,fe.height=p.lines}let z={idx:new Array(3)};for(let ue=0;ue<p.inputChannels.length;++ue){let fe=k[ue],Ee=fe.name.lastIndexOf("."),Ve=Ee>=0?fe.name.substring(Ee+1):fe.name;for(let ce=0;ce<D.length;++ce){let je=D[ce];Ve===je.name&&fe.type===je.type&&(fe.compression=je.compression,je.index>=0&&(z.idx[je.index]=ue),fe.offset=ue)}}let W,re,Q;if(A.acCompressedSize>0)switch(A.acCompression){case 0:W=new Uint16Array(A.totalAcUncompressedCount),lt(p.array,h,_,A.acCompressedSize,W,A.totalAcUncompressedCount);break;case 1:let ue=p.array.slice(_.value,_.value+A.totalAcUncompressedCount),fe=ir(ue);W=new Uint16Array(fe.buffer),_.value+=A.totalAcUncompressedCount;break}if(A.dcCompressedSize>0){let ue={array:p.array,offset:_,size:A.dcCompressedSize};re=new Uint16Array(He(ue).buffer),_.value+=A.dcCompressedSize}if(A.rleRawSize>0){let ue=p.array.slice(_.value,_.value+A.rleCompressedSize),fe=ir(ue);Q=qt(fe.buffer),_.value+=A.rleCompressedSize}let ee=0,le=new Array(k.length);for(let ue=0;ue<le.length;++ue)le[ue]=new Array;for(let ue=0;ue<p.lines;++ue)for(let fe=0;fe<k.length;++fe)le[fe].push(ee),ee+=k[fe].width*p.type*2;z.idx[0]!==void 0&&k[z.idx[0]]&&wt(z,le,k,W,re,M);for(let ue=0;ue<k.length;++ue){let fe=k[ue];if(!fe.decoded)switch(fe.compression){case 2:let Ee=0,Ve=0;for(let ce=0;ce<p.lines;++ce){let je=le[ue][Ee];for(let be=0;be<fe.width;++be){for(let Ce=0;Ce<2*fe.type;++Ce)M[je++]=Q[Ve+Ce*fe.width*fe.height];Ve++}Ee++}break;case 1:An(ue,le,k,W,re,M);break;default:throw new Error("THREE.EXRLoader: unsupported channel compression")}}return new DataView(M.buffer)}function me(p,h){let _=new Uint8Array(p),M=0;for(;_[h.value+M]!=0;)M+=1;let A=new TextDecoder().decode(_.slice(h.value,h.value+M));return h.value=h.value+M+1,A}function oe(p,h,_){let M=new TextDecoder().decode(new Uint8Array(p).slice(h.value,h.value+_));return h.value=h.value+_,M}function ve(p,h){let _=te(p,h),M=ie(p,h);return[_,M]}function Re(p,h){let _=ie(p,h),M=ie(p,h);return[_,M]}function te(p,h){let _=p.getInt32(h.value,!0);return h.value=h.value+4,_}function ie(p,h){let _=p.getUint32(h.value,!0);return h.value=h.value+4,_}function ye(p,h){let _=p[h.value];return h.value=h.value+1,_}function U(p,h){let _=p.getUint8(h.value);return h.value=h.value+1,_}let ne=function(p,h){let _=Number(p.getBigInt64(h.value,!0));return h.value+=8,_};function $(p,h){let _=p.getFloat32(h.value,!0);return h.value+=4,_}function Me(p,h){return xe.toHalfFloat($(p,h))}function ge(p,h){let _=p.getUint16(h.value,!0);return h.value+=2,_}function Se(p,h){return xe.fromHalfFloat(ge(p,h))}function Oe(p,h,_,M){let A=_.value,D=[];for(;_.value<A+M-1;){let C=me(h,_),G=te(p,_),k=U(p,_);_.value+=3;let z=te(p,_),W=te(p,_);D.push({name:C,pixelType:G,pLinear:k,xSampling:z,ySampling:W})}return _.value+=1,D}function et(p,h){let _=$(p,h),M=$(p,h),A=$(p,h),D=$(p,h),C=$(p,h),G=$(p,h),k=$(p,h),z=$(p,h);return{redX:_,redY:M,greenX:A,greenY:D,blueX:C,blueY:G,whiteX:k,whiteY:z}}function _e(p,h){let _=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],M=U(p,h);return _[M]}function ze(p,h){let _=te(p,h),M=te(p,h),A=te(p,h),D=te(p,h);return{xMin:_,yMin:M,xMax:A,yMax:D}}function $e(p,h){let _=["INCREASING_Y","DECREASING_Y","RANDOM_Y"],M=U(p,h);return _[M]}function Pe(p,h){let _=["ENVMAP_LATLONG","ENVMAP_CUBE"],M=U(p,h);return _[M]}function ut(p,h){let _=["ONE_LEVEL","MIPMAP_LEVELS","RIPMAP_LEVELS"],M=["ROUND_DOWN","ROUND_UP"],A=ie(p,h),D=ie(p,h),C=U(p,h);return{xSize:A,ySize:D,levelMode:_[C&15],roundingMode:M[C>>4]}}function Ot(p,h){let _=$(p,h),M=$(p,h);return[_,M]}function Gn(p,h){let _=$(p,h),M=$(p,h),A=$(p,h);return[_,M,A]}function ca(p,h,_,M,A){if(M==="string"||M==="stringvector"||M==="iccProfile")return oe(h,_,A);if(M==="chlist")return Oe(p,h,_,A);if(M==="chromaticities")return et(p,_);if(M==="compression")return _e(p,_);if(M==="box2i")return ze(p,_);if(M==="envmap")return Pe(p,_);if(M==="tiledesc")return ut(p,_);if(M==="lineOrder")return $e(p,_);if(M==="float")return $(p,_);if(M==="v2f")return Ot(p,_);if(M==="v3f")return Gn(p,_);if(M==="int")return te(p,_);if(M==="rational")return ve(p,_);if(M==="timecode")return Re(p,_);if(M==="preview"||M==="deepImageState"||M==="idmanifest")return _.value+=A,"skipped";_.value+=A}function rr(p,h){let _=Math.log2(p);return h=="ROUND_DOWN"?Math.floor(_):Math.ceil(_)}function _c(p,h,_){let M=0;switch(p.levelMode){case"ONE_LEVEL":M=1;break;case"MIPMAP_LEVELS":M=rr(Math.max(h,_),p.roundingMode)+1;break;case"RIPMAP_LEVELS":throw new Error("THREE.EXRLoader: RIPMAP_LEVELS tiles currently unsupported.")}return M}function ar(p,h,_,M){let A=new Array(p);for(let D=0;D<p;D++){let C=1<<D,G=h/C|0;M=="ROUND_UP"&&G*C<h&&(G+=1);let k=Math.max(G,1);A[D]=(k+_-1)/_|0}return A}function la(){let p=this,h=p.offset,_={value:0};for(let M=0;M<p.tileCount;M++){let A=te(p.viewer,h),D=te(p.viewer,h);h.value+=8,p.size=ie(p.viewer,h);let C=A*p.blockWidth,G=D*p.blockHeight;p.columns=C+p.blockWidth>p.width?p.width-C:p.blockWidth,p.lines=G+p.blockHeight>p.height?p.height-G:p.blockHeight;let k=p.columns*p.totalBytes,W=p.size<p.lines*k?p.uncompress(p):Ae(p);h.value+=p.size;for(let re=0;re<p.lines;re++){let Q=re*p.columns*p.totalBytes;for(let ee=0;ee<p.inputChannels.length;ee++){let le=Xt.channels[ee].name,ue=p.channelByteOffsets[le]*p.columns,fe=p.decodeChannels[le];if(fe===void 0)continue;_.value=Q+ue;let Ee=(p.height-(1+G+re))*p.outLineWidth;for(let Ve=0;Ve<p.columns;Ve++){let ce=Ee+(Ve+C)*p.outputChannels+fe;p.byteArray[ce]=p.getter(W,_)}}}}}function ri(){let p=this,h=p.offset,_={value:0};for(let M=0;M<p.height/p.blockHeight;M++){let A=te(p.viewer,h)-Xt.dataWindow.yMin;p.size=ie(p.viewer,h),p.lines=A+p.blockHeight>p.height?p.height-A:p.blockHeight;let D=p.columns*p.totalBytes,G=p.size<p.lines*D?p.uncompress(p):Ae(p);h.value+=p.size;for(let k=0;k<p.lines;k++){let z=A+k,W=k*D,re=(p.height-1-z)*p.outLineWidth;for(let Q=0;Q<p.inputChannels.length;Q++){let ee=Xt.channels[Q].name,le=p.channelByteOffsets[ee]*p.columns,ue=p.decodeChannels[ee];if(ue!==void 0){_.value=W+le;for(let fe=0;fe<p.columns;fe++){let Ee=re+fe*p.outputChannels+ue;p.byteArray[Ee]=p.getter(G,_)}}}}}}function or(){let p=this,h=p.chunkOffsets,_={value:0};for(let M=0;M<h.length;M++){let A={value:h[M]};A.value+=4;let D=te(p.viewer,A)-Xt.dataWindow.yMin;p.size=ie(p.viewer,A),p.lines=D+p.blockHeight>p.height?p.height-D:p.blockHeight;let C=p.columns*p.totalBytes,G=p.size<p.lines*C,k=p.offset;p.offset=A;let z=G?p.uncompress(p):Ae(p);p.offset=k;for(let W=0;W<p.lines;W++){let re=D+W,Q=W*C,ee=(p.height-1-re)*p.outLineWidth;for(let le=0;le<p.inputChannels.length;le++){let ue=Xt.channels[le].name,fe=p.channelByteOffsets[ue]*p.columns,Ee=p.decodeChannels[ue];if(Ee!==void 0){_.value=Q+fe;for(let Ve=0;Ve<p.columns;Ve++){let ce=ee+Ve*p.outputChannels+Ee;p.byteArray[ce]=p.getter(z,_)}}}}}}function cr(p,h,_,M){if(_===0)return null;let A=p.slice(h,h+_);switch(M){case"NO_COMPRESSION":return new DataView(A.buffer,A.byteOffset,A.byteLength);case"RLE_COMPRESSION":{let D=new Uint8Array(qt(A.buffer.slice(A.byteOffset,A.byteOffset+A.byteLength))),C=new Uint8Array(D.length);return Pt(D),At(D,C),new DataView(C.buffer)}case"ZIPS_COMPRESSION":{let D=ir(A),C=new Uint8Array(D.length);return Pt(D),At(D,C),new DataView(C.buffer)}default:throw new Error("THREE.EXRLoader: "+M+" is unsupported for deep data")}}function ha(){let p=this,h=p.chunkOffsets,_=p.width,M=p.height,A=p.deepChannels,D=Xt.compression,C=p.multiPart,G=p.decodeChannels,k=p.outputChannels,z=p.byteArray instanceof Uint16Array,W=-1;for(let re=0;re<A.length;re++)if(A[re].name==="A"){W=re;break}for(let re=0;re<h.length;re++){let Q={value:h[re]};C&&(Q.value+=4);let ee=te(p.viewer,Q)-Xt.dataWindow.yMin,le=ne(p.viewer,Q),ue=ne(p.viewer,Q);ne(p.viewer,Q);let fe=cr(p.array,Q.value,le,D);if(Q.value+=le,fe===null)continue;let Ee=new Uint32Array(_);for(let Ie=0;Ie<_;Ie++)Ee[Ie]=fe.getUint32(Ie*4,!0);let Ve=Ee[_-1];if(Ve===0){Q.value+=ue;continue}let ce=cr(p.array,Q.value,ue,D),je=[],be=0;for(let Ie=0;Ie<A.length;Ie++)je.push(be),be+=Ve*A[Ie].bytesPerSample;let Ce=(M-1-ee)*p.outLineWidth;for(let Ie=0;Ie<_;Ie++){let ht=Ie===0?0:Ee[Ie-1],qe=Ee[Ie]-ht;if(qe===0)continue;let Ne=new Float32Array(k),ot=0;for(let Ke=0;Ke<qe;Ke++){let gt=ht+Ke,Jt=1-ot;if(Jt<=0)break;let Ai=1;if(W>=0){let Wn=A[W].bytesPerSample,ji=je[W]+gt*Wn;Ai=Wn===2?xe.fromHalfFloat(ce.getUint16(ji,!0)):ce.getFloat32(ji,!0)}for(let Wn=0;Wn<A.length;Wn++){let ji=A[Wn],ma=G[ji.name];if(ma===void 0)continue;let ga=ji.bytesPerSample,_a=je[Wn]+gt*ga,lr=ga===2?xe.fromHalfFloat(ce.getUint16(_a,!0)):ce.getFloat32(_a,!0);Ne[ma]+=lr*Jt}ot+=Ai*Jt}G.A!==void 0&&(Ne[G.A]=ot);let Tt=Ce+Ie*k;for(let Ke=0;Ke<k;Ke++)p.byteArray[Tt+Ke]=z?xe.toHalfFloat(Ne[Ke]):Ne[Ke]}}}function qi(p,h,_){let M={},A=!1;for(;;){let D=me(h,_);if(D==="")break;A=!0;let C=me(h,_),G=ie(p,_),k=ca(p,h,_,C,G);k===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${C}'.`):M[D]=k}return A?M:null}function ua(p,h,_){if(p.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");let M=p.getUint8(4),A=p.getUint8(5),D={singleTile:!!(A&2),longName:!!(A&4),deepFormat:!!(A&8),multiPart:!!(A&16)};_.value=8;let C=[];if(D.multiPart){for(;;){let G=qi(p,h,_);if(G===null)break;G.version=M,G.spec=D,C.push(G)}if(C.length===0)throw new Error("THREE.EXRLoader: No valid part headers found.")}else{let G=qi(p,h,_);G.version=M,G.spec=D,C.push(G)}return C}function fa(p,h,_,M,A,D){let C={size:0,viewer:h,array:_,offset:M,width:p.dataWindow.xMax-p.dataWindow.xMin+1,height:p.dataWindow.yMax-p.dataWindow.yMin+1,inputChannels:p.channels,channelByteOffsets:{},shouldExpand:!1,yCbCr:!1,totalBytes:null,columns:null,lines:null,type:null,uncompress:null,getter:null,format:null,colorSpace:Mt};switch(p.compression){case"NO_COMPRESSION":C.blockHeight=1,C.uncompress=Ae;break;case"RLE_COMPRESSION":C.blockHeight=1,C.uncompress=Dt;break;case"ZIPS_COMPRESSION":C.blockHeight=1,C.uncompress=He;break;case"ZIP_COMPRESSION":C.blockHeight=16,C.uncompress=He;break;case"PIZ_COMPRESSION":C.blockHeight=32,C.uncompress=Je;break;case"PXR24_COMPRESSION":C.blockHeight=16,C.uncompress=L;break;case"B44_COMPRESSION":case"B44A_COMPRESSION":C.blockHeight=32,C.uncompress=y;break;case"DWAA_COMPRESSION":C.blockHeight=32,C.uncompress=X;break;case"DWAB_COMPRESSION":C.blockHeight=256,C.uncompress=X;break;default:throw new Error("THREE.EXRLoader: "+p.compression+" is unsupported")}let G={};for(let Q of p.channels)switch(Q.name){case"BY":case"RY":case"Y":case"R":case"G":case"B":case"A":G[Q.name]=!0,C.type=Q.pixelType}let k=!1,z=!1;if(G.Y&&G.RY&&G.BY)C.outputChannels=4,C.yCbCr=!0;else if(G.R&&G.G&&G.B)C.outputChannels=4;else if(G.Y)C.outputChannels=1;else throw new Error("THREE.EXRLoader: file contains unsupported data channels.");switch(C.outputChannels){case 4:D==Ut?(k=!G.A,C.format=Ut,C.colorSpace=Mt,C.outputChannels=4,C.decodeChannels={R:0,G:1,B:2,A:3}):D==bn?(C.format=bn,C.colorSpace=Mt,C.outputChannels=2,C.decodeChannels={R:0,G:1}):D==Ei?(C.format=Ei,C.colorSpace=Mt,C.outputChannels=1,C.decodeChannels={R:0}):z=!0;break;case 1:D==Ut?(k=!0,C.format=Ut,C.colorSpace=Mt,C.outputChannels=4,C.shouldExpand=!0,C.decodeChannels={Y:0}):D==bn?(C.format=bn,C.colorSpace=Mt,C.outputChannels=2,C.shouldExpand=!0,C.decodeChannels={Y:0}):D==Ei?(C.format=Ei,C.colorSpace=Mt,C.outputChannels=1,C.decodeChannels={Y:0}):z=!0;break;default:z=!0}if(z)throw new Error("THREE.EXRLoader: invalid output format for specified file.");if(C.yCbCr&&(C.format=Ut,C.outputChannels=4,C.decodeChannels={Y:0,RY:1,BY:2},k=!0),C.type==1)switch(A){case Nt:C.getter=Se;break;case Ft:C.getter=ge;break}else if(C.type==2)switch(A){case Nt:C.getter=$;break;case Ft:C.getter=Me}else throw new Error("THREE.EXRLoader: unsupported pixelType "+C.type+" for "+p.compression+".");C.columns=C.width;let W=C.width*C.height*C.outputChannels;switch(A){case Nt:C.byteArray=new Float32Array(W),k&&C.byteArray.fill(1,0,W);break;case Ft:C.byteArray=new Uint16Array(W),k&&C.byteArray.fill(15360,0,W);break;default:console.error("THREE.EXRLoader: unsupported type: ",A);break}let re=0;for(let Q of p.channels)C.decodeChannels[Q.name]!==void 0&&(C.channelByteOffsets[Q.name]=re),re+=Q.pixelType*2;if(C.totalBytes=re,C.outLineWidth=C.width*C.outputChannels,p.spec.deepFormat){C.deepChannels=[];let Q=0;for(let ee of p.channels){let le=ee.pixelType===0?4:ee.pixelType*2;C.deepChannels.push({name:ee.name,pixelType:ee.pixelType,bytesPerSample:le}),Q+=le}C.deepBytesPerSample=Q,C.chunkOffsets=p._chunkOffsets,C.multiPart=p.spec.multiPart,C.decode=ha.bind(C)}else if(p.spec.singleTile){C.blockHeight=p.tiles.ySize,C.blockWidth=p.tiles.xSize;let Q=_c(p.tiles,C.width,C.height),ee=ar(Q,C.width,p.tiles.xSize,p.tiles.roundingMode),le=ar(Q,C.height,p.tiles.ySize,p.tiles.roundingMode);C.tileCount=ee[0]*le[0];for(let ue=0;ue<Q;ue++)for(let fe=0;fe<le[ue];fe++)for(let Ee=0;Ee<ee[ue];Ee++)ne(h,M);C.decode=la.bind(C)}else if(p.spec.multiPart)C.blockWidth=C.width,C.chunkOffsets=p._chunkOffsets,C.decode=or.bind(C);else{C.blockWidth=C.width;let Q=Math.ceil(C.height/C.blockHeight);for(let ee=0;ee<Q;ee++)ne(h,M);C.decode=ri.bind(C)}return C}let Vn={value:0},gs=new DataView(e),da=new Uint8Array(e),Xi=ua(gs,e,Vn),pa=Math.max(0,Math.min(this.part,Xi.length-1)),Xt=Xi[pa];if(Xt.spec.multiPart||Xt.spec.deepFormat)for(let p=0;p<Xi.length;p++){let h=Xi[p].chunkCount;if(p===pa){Xt._chunkOffsets=[];for(let _=0;_<h;_++)Xt._chunkOffsets.push(ne(gs,Vn))}else for(let _=0;_<h;_++)ne(gs,Vn)}let dn=fa(Xt,gs,da,Vn,this.type,this.outputFormat);if(dn.decode(),dn.shouldExpand){let p=dn.byteArray;if(this.outputFormat==Ut)for(let h=0;h<p.length;h+=4)p[h+2]=p[h+1]=p[h];else if(this.outputFormat==bn)for(let h=0;h<p.length;h+=2)p[h+1]=p[h]}if(dn.yCbCr){let p=dn.byteArray,h=dn.width*dn.height;if(this.type===Ft)for(let _=0;_<h;_++){let M=_*4,A=xe.fromHalfFloat(p[M]),D=xe.fromHalfFloat(p[M+1]),C=xe.fromHalfFloat(p[M+2]),G=(1+D)*A,k=(1+C)*A,z=(A-G*.2126-k*.0722)/.7152;p[M]=xe.toHalfFloat(Math.max(0,G)),p[M+1]=xe.toHalfFloat(Math.max(0,z)),p[M+2]=xe.toHalfFloat(Math.max(0,k))}else for(let _=0;_<h;_++){let M=_*4,A=p[M],D=p[M+1],C=p[M+2],G=(1+D)*A,k=(1+C)*A;p[M]=Math.max(0,G),p[M+1]=Math.max(0,(A-G*.2126-k*.0722)/.7152),p[M+2]=Math.max(0,k)}}return{header:Xt,width:dn.width,height:dn.height,data:dn.byteArray,format:dn.format,colorSpace:dn.colorSpace,type:this.type,minFilter:_t,magFilter:_t,generateMipmaps:!1,flipY:!1}}setDataType(e){return this.type=e,this}setOutputFormat(e){return this.outputFormat=e,this}setPart(e){return this.part=e,this}};var pc=class extends ss{constructor(e){super(e),this.type=Ft}parse(e){let a=function(E,B){switch(E){case 1:throw new Error("THREE.HDRLoader: Read Error: "+(B||""));case 2:throw new Error("THREE.HDRLoader: Write Error: "+(B||""));case 3:throw new Error("THREE.HDRLoader: Bad File Format: "+(B||""));default:case 4:throw new Error("THREE.HDRLoader: Memory Error: "+(B||""))}},f=function(E,B,F){B=B||1024;let q=E.pos,Y=-1,N=0,K="",j=String.fromCharCode.apply(null,new Uint16Array(E.subarray(q,q+128)));for(;0>(Y=j.indexOf(`
`))&&N<B&&q<E.byteLength;)K+=j,N+=j.length,q+=128,j=String.fromCharCode.apply(null,new Uint16Array(E.subarray(q,q+128)));return-1<Y?(F!==!1&&(E.pos+=N+Y+1),K+j.slice(0,Y)):!1},d=function(E){let B=/^#\?(\S+)/,F=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,O=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,q=/^\s*FORMAT=(\S+)\s*$/,Y=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,N={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},K,j;for((E.pos>=E.byteLength||!(K=f(E)))&&a(1,"no header found"),(j=K.match(B))||a(3,"bad initial token"),N.valid|=1,N.programtype=j[1],N.string+=K+`
`;K=f(E),K!==!1;){if(N.string+=K+`
`,K.charAt(0)==="#"){N.comments+=K+`
`;continue}if((j=K.match(F))&&(N.gamma=parseFloat(j[1])),(j=K.match(O))&&(N.exposure=parseFloat(j[1])),(j=K.match(q))&&(N.valid|=2,N.format=j[1]),(j=K.match(Y))&&(N.valid|=4,N.height=parseInt(j[1],10),N.width=parseInt(j[2],10)),N.valid&2&&N.valid&4)break}return N.valid&2||a(3,"missing format specifier"),N.valid&4||a(3,"missing image size specifier"),N},m=function(E,B,F){let O=B;if(O<8||O>32767||E[0]!==2||E[1]!==2||E[2]&128)return new Uint8Array(E);O!==(E[2]<<8|E[3])&&a(3,"wrong scanline width");let q=new Uint8Array(4*B*F);q.length||a(4,"unable to allocate buffer space");let Y=0,N=0,K=4*O,j=new Uint8Array(4),J=new Uint8Array(K),de=F;for(;de>0&&N<E.byteLength;){N+4>E.byteLength&&a(1),j[0]=E[N++],j[1]=E[N++],j[2]=E[N++],j[3]=E[N++],(j[0]!=2||j[1]!=2||(j[2]<<8|j[3])!=O)&&a(3,"bad rgbe scanline format");let Z=0,ae;for(;Z<K&&N<E.byteLength;){ae=E[N++];let Te=ae>128;if(Te&&(ae-=128),(ae===0||Z+ae>K)&&a(3,"bad scanline data"),Te){let Fe=E[N++];for(let se=0;se<ae;se++)J[Z++]=Fe}else J.set(E.subarray(N,N+ae),Z),Z+=ae,N+=ae}let he=O;for(let Te=0;Te<he;Te++){let Fe=0;q[Y]=J[Te+Fe],Fe+=O,q[Y+1]=J[Te+Fe],Fe+=O,q[Y+2]=J[Te+Fe],Fe+=O,q[Y+3]=J[Te+Fe],Y+=4}de--}return q},x=function(E,B,F,O){let q=E[B+3],Y=Math.pow(2,q-128)/255;F[O+0]=E[B+0]*Y,F[O+1]=E[B+1]*Y,F[O+2]=E[B+2]*Y,F[O+3]=1},w=function(E,B,F,O){let q=E[B+3],Y=Math.pow(2,q-128)/255;F[O+0]=xe.toHalfFloat(Math.min(E[B+0]*Y,65504)),F[O+1]=xe.toHalfFloat(Math.min(E[B+1]*Y,65504)),F[O+2]=xe.toHalfFloat(Math.min(E[B+2]*Y,65504)),F[O+3]=xe.toHalfFloat(1)},b=new Uint8Array(e);b.pos=0;let g=d(b),S=g.width,R=g.height,T=m(b.subarray(b.pos),S,R),P,I,v;switch(this.type){case Nt:v=T.length/4;let E=new Float32Array(v*4);for(let F=0;F<v;F++)x(T,F*4,E,F*4);P=E,I=Nt;break;case Ft:v=T.length/4;let B=new Uint16Array(v*4);for(let F=0;F<v;F++)w(T,F*4,B,F*4);P=B,I=Ft;break;default:throw new Error("THREE.HDRLoader: Unsupported type: "+this.type)}return{width:S,height:R,data:P,header:g.string,gamma:g.gamma,exposure:g.exposure,type:I,colorSpace:Mt,minFilter:_t,magFilter:_t,generateMipmaps:!1,flipY:!0}}setDataType(e){return this.type=e,this}};var mc=class extends pc{constructor(e){console.warn("RGBELoader has been deprecated. Please use HDRLoader instead."),super(e)}};var gc=class extends Kn{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new Bn;e.deleteAttribute("uv");let t=new Jn({side:zt}),n=new Jn,s=new rs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new xt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new ns(e,n,6),o=new Et;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let c=new xt(e,sr(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);let l=new xt(e,sr(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new xt(e,sr(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let f=new xt(e,sr(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let d=new xt(e,sr(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let m=new xt(e,sr(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function sr(i){return new Fr({color:0,emissive:16777215,emissiveIntensity:i})}var Eh={Neutral:ls,ACES:qr,AgX:Xr,None:Pn};function Lb(i){return i==="water"?0:i==="plastic"?1:i==="glass"?2:0}function Jf(i){i.updateMatrixWorld(!0);let e=new Map;i.traverse(t=>{if(!t.isMesh)return;let n=Array.isArray(t.material)?t.material:[t.material],s=0;n.forEach(r=>{if(!(!r||!r.userData||!r.userData.rvKind)&&(s=Math.max(s,Lb(r.userData.rvKind)),r.userData.rvKind==="water"&&(r.userData.rvChord>0||r.userData.rvBlur>0))){Nb(r,{chord:r.userData.rvChord,blur:r.userData.rvBlur});let a=e.get(r)||new Yt;a.union(new Yt().setFromObject(t)),e.set(r,a)}}),t.renderOrder=s}),e.forEach((t,n)=>Fb(n,t,n.userData.rvRef))}var Mh=new WeakMap;function Nb(i,e){let t=Mh.get(i),n=e.chord||0,s=e.blur||0;if(!t){if(!(n>0||s>0))return;t={uChord:{value:0},uBlur:{value:0},uRef:{value:0},uMin:{value:new V},uMax:{value:new V}},Mh.set(i,t),i.onBeforeCompile=r=>{let a=nt.transmission_fragment,o="vec3 n = inverseTransformDirection( normal, viewMatrix );";if(!a||a.indexOf(o)<0)return;r.uniforms.uRvChord=t.uChord,r.uniforms.uRvBlur=t.uBlur,r.uniforms.uRvRef=t.uRef,r.uniforms.uRvMin=t.uMin,r.uniforms.uRvMax=t.uMax;let c=o+`
	vec3 rvD = -v;
	vec3 rvInv = 1.0 / (rvD + vec3(1e-6));
	vec3 rvT0 = (uRvMin - pos) * rvInv;
	vec3 rvT1 = (uRvMax - pos) * rvInv;
	vec3 rvTm = max(rvT0, rvT1);
	float rvPath = max(min(min(rvTm.x, rvTm.y), rvTm.z), 0.0);
	float rvNdv = clamp(abs(dot(n, v)), 0.4, 1.0);
	float rvF = uRvRef > 0.0 ? clamp((rvPath / uRvRef) * rvNdv, 0.25, 4.0) : 1.0;
	material.thickness *= mix(1.0, rvF, uRvChord);
	material.roughness = clamp(material.roughness + uRvBlur * rvF, 0.0, 1.0);`,l=`uniform float uRvChord; uniform float uRvBlur; uniform float uRvRef; uniform vec3 uRvMin; uniform vec3 uRvMax;
`;r.fragmentShader=l+r.fragmentShader.replace("#include <transmission_fragment>",a.replace(o,c))},i.customProgramCacheKey=()=>"rvliquid2",i.needsUpdate=!0}t.uChord.value=n,t.uBlur.value=s}function Fb(i,e,t){let n=Mh.get(i);!n||!e||e.isEmpty()||(n.uMin.value.copy(e.min),n.uMax.value.copy(e.max),n.uRef.value=t>0?t:1)}function Zf(i){let e=new ii(i),t=new Kn,n=new xt(new Bn(40,20,40),new ln({color:new Ue(.16,.165,.18),side:zt}));n.position.y=8,t.add(n);let s=(a,o,c,l,u,f,d)=>{let m=new Ue(f,f,f);d&&m.multiply(new Ue(d));let x=new xt(new ki(a,o),new ln({color:m,side:un}));x.position.set(c,l,u),x.lookAt(0,3,0),t.add(x)};s(14,14,0,17,2,7),s(2.4,14,-10,6,4,16),s(2.4,14,10,6,4,16),s(10,5,0,5,-14,5),s(14,4,0,1.5,13,2.2);let r=e.fromScene(t,.02).texture;return e.dispose(),r}function rvGround(x,w,b){let N=512,c=document.createElement("canvas");c.width=c.height=N;let g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,N,N);let ring=(r,a)=>{let q=g.createRadialGradient(N/2,N/2,0,N/2,N/2,r);q.addColorStop(0,`rgba(0,0,0,${a})`);q.addColorStop(.3,`rgba(0,0,0,${a*.72})`);q.addColorStop(.62,`rgba(0,0,0,${a*.24})`);q.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=q;g.fillRect(0,0,N,N)};ring(N*.46,.2);ring(N*.2,.34);ring(N*.1,.4);let t=new Kt(c);t.colorSpace=Rt;t.anisotropy=4;t.needsUpdate=!0;let R=Math.max(w.x,w.z)/2,P=R*8,m=new xt(new ki(P,P),new ln({map:t,toneMapped:!1}));m.rotation.x=-Math.PI/2;m.position.set(b.x,x.min.y-w.y*.002,b.z);m.renderOrder=-1;m.name="rvGround";return m}function rvSoftTex(e){let n=128,cv=document.createElement("canvas");cv.width=cv.height=n;let cx=cv.getContext("2d"),im=cx.createImageData(n,n),c=im.data,sm=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};for(let y=0;y<n;y++)for(let x=0;x<n;x++){let u=(x+.5)/n,v=(y+.5)/n,k=sm(0,e,Math.min(u,1-u))*sm(0,e,Math.min(v,1-v)),b=Math.round(k*255),o=(y*n+x)*4;c[o]=c[o+1]=c[o+2]=b;c[o+3]=255}cx.putImageData(im,0,0);let t=new Kt(cv);t.needsUpdate=!0;return t}function $f(i,g=1){let e=new ii(i),t=new Kn,n=new xt(new Bn(60,30,60),new ln({color:new Ue(.035,.037,.042),side:zt}));n.position.y=10,t.add(n);let fl=new xt(new ki(60,60),new ln({color:new Ue(.42*g,.425*g,.44*g),side:un}));fl.rotation.x=-Math.PI/2,fl.position.y=-4.6,t.add(fl);let tx=[rvSoftTex(.1),rvSoftTex(.28)];let s=(a,o,c,l,u,f,d,q)=>{let m=new Ue(f*g,f*g,f*g);d&&m.multiply(new Ue(d));let x=new xt(new ki(a,o),new ln({color:m,map:tx[q||0],side:un}));x.position.set(c,l,u),x.lookAt(0,3,0),t.add(x)};s(26,18,0,8,-18,7,0,1),s(22,16,0,20,2,9,0,1),s(2.2,20,-11,7,5,40),s(2.2,20,11,7,5,40),s(12,14,-10,6,11,8,0,1),s(1.6,18,-7,7,-13,30),s(1.6,18,7,7,-13,30),s(30,8,0,-3,4,1.6,16773600,1),s(8,22,0,8,12.5,5.5,0,1);let r=e.fromScene(t,.012,.1,100,{size:512}).texture;return tx.forEach(a=>a.dispose()),e.dispose(),r}
async function ed(i,e){let rvDiff=null,t=e.config||{},n=t.scene||{},s=new sc({antialias:!0,alpha:!0,powerPreference:"high-performance"});let rvDpr=window.devicePixelRatio||1,rvRatio=q=>q==="light"?Math.min(rvDpr,1.25):Math.min(Math.max(rvDpr,1.5),2);s.setPixelRatio(e.pixelRatio||rvRatio(n.quality)),s.toneMapping=Eh[n.tone]!==void 0?Eh[n.tone]:ls,s.toneMappingExposure=n.exposure!=null?n.exposure:1,"transmissionResolutionScale"in s&&(s.transmissionResolutionScale=1);let r=s.domElement;r.style.cssText="display:block;width:100%;height:100%;outline:none;touch-action:none",i.appendChild(r);let a=new Kn,o=new Ht(t.camera&&t.camera.fov||30,1,.01,1e3);a.add(o);let c=new cc(o,r);c.enableDamping=!0,c.dampingFactor=.08,c.autoRotate=!!n.autoRotate,c.autoRotateSpeed=2;let l=null;if(n.env==="hdri"&&e.hdri)try{l=await((e.hdriType||"hdr")==="exr"?new dc:new mc).loadAsync(e.hdri),l.mapping=us;let B=new ii(s);a.environment=B.fromEquirectangular(l).texture}catch(E){console.warn("HDRI l\u1ED7i, d\xF9ng studio",E)}if(!a.environment)if(n.env==="room"){let E=new ii(s);a.environment=E.fromScene(new gc,.04).texture}else n.env==="studio"?a.environment=Zf(s):(a.environment=$f(s),rvDiff=$f(s,n.diffEnv!=null?n.diffEnv:.45));if(a.environmentIntensity=n.envGain!=null?n.envGain:1,n.hdriBg&&l)a.background=l,a.backgroundBlurriness=.25;else if(n.bgMode==="transparent")a.background=null,s.setClearColor(0,0);else{let E=new Ue(n.bg||"#e9e9ec");a.background=E,s.setClearColor(E,1)}let u=new lc,f=new fc;f.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),u.setDRACOLoader(f),u.setMeshoptDecoder(Gf);let m=(await u.loadAsync(e.glb)).scene;Jf(m),a.add(m);let rvA=s.capabilities.getMaxAnisotropy();m.traverse(q=>{q.isMesh&&q.material&&(Array.isArray(q.material)?q.material:[q.material]).forEach(mt=>{if(mt){mt.dithering=!0;rvDiff&&mt.isMeshStandardMaterial&&!(mt.transmission>0)&&(mt.envMap=rvDiff,mt.envMapIntensity=a.environmentIntensity);for(let k in mt){let tx=mt[k];tx&&tx.isTexture&&(tx.anisotropy=rvA)}}})});let x=new Yt().setFromObject(m),w=x.getSize(new V),b=x.getCenter(new V),S=w.length()/2/Math.sin(Vi.degToRad(o.fov/2))*1.05;o.near=S/200,o.far=S*200;let rvGr=rvGround(x,w,b);a.add(rvGr),a.onBeforeRender=()=>{let q=a.background;rvGr.visible=!!(q&&q.isColor),rvGr.visible&&rvGr.material.color.copy(q)};t.camera&&t.camera.position?(o.position.fromArray(t.camera.position),c.target.fromArray(t.camera.target)):(o.position.copy(b).add(new V(S*.35,w.y*.1,S*.93)),c.target.copy(b)),o.updateProjectionMatrix(),c.update();let rvDummy=0,R=()=>{let E=Math.max(10,i.clientWidth),B=Math.max(10,i.clientHeight);s.setSize(E,B,!1),o.aspect=E/B,o.updateProjectionMatrix()},T=new ResizeObserver(R);T.observe(i),R();let P=0,I=!0,v=()=>{I&&(P=requestAnimationFrame(v),c.update(),s.render(a,o))};return v(),{renderer:s,scene:a,camera:o,controls:c,root:m,setQuality(q){s.setPixelRatio(rvRatio(q)),R()},dispose(){rvDiff&&rvDiff.dispose(),I=!1,cancelAnimationFrame(P),T.disconnect(),s.dispose(),r.remove()}}}window.MaterialViewer={mount:ed,Texture:Kt};var Qf=()=>{if(!window.VIEWER_GLB)return;let i=document.getElementById("stage");i&&ed(i,{glb:window.VIEWER_GLB,config:window.VIEWER_CONFIG,hdri:window.VIEWER_HDRI,hdriType:window.VIEWER_HDRI_TYPE}).then(()=>{let e=document.getElementById("loading");e&&e.remove()}).catch(e=>{console.error(e);let t=document.getElementById("loading");t&&(t.textContent="Kh\xF4ng t\u1EA3i \u0111\u01B0\u1EE3c model: "+(e&&e.message?e.message:e))})};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Qf):Qf();})();
