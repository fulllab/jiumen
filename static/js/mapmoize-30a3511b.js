var c;(function(e){e.WEAKMAP="weakmap",e.REPLACE="replace"})(c||(c={}));function b(e){return Boolean(e.get)}function m(e,o,u){const h=e.get;switch(u){case c.WEAKMAP:{const s=new WeakMap;e.get=function(){let i=s.get(this);return i||(i=h.apply(this),s.set(this,i)),i};break}case c.REPLACE:{e.get=function(){const s=h.apply(this);return Object.defineProperty(this,o,{configurable:!1,enumerable:!1,value:s}),s};break}default:throw new Error(`Unsupported strategy: ${u}`)}}function g(e){return Boolean(e.value)}function w(e,o,u,h,s){const i=e.value;switch(i.length){case 0:{switch(u){case c.REPLACE:{e.value=function(){const t=i.apply(this);Object.defineProperty(this,o,{enumerable:e.enumerable,configurable:e.configurable,writable:e.writable,value:function(){return t}})};return}case c.WEAKMAP:{const t=new WeakMap;e.value=function(){if(t.has(this))return t.get(this);let a=i.apply(this);return t.set(this,a),a};break}}break}case 1:{switch(u){case c.WEAKMAP:{const t=new WeakMap;e.value=function(a){let l=t.get(this);if(l||(l=s(),t.set(this,l)),l.has(a))return l.get(a);const n=i.call(this,a);return l.set(a,n),n};break}case c.REPLACE:{e.value=function(t){const a=s();function l(n){if(a.has(n))return a.get(n);{const r=i.call(this,n);return a.set(n,r),r}}return Object.defineProperty(this,o,{configurable:e.configurable,enumerable:e.enumerable,writable:e.writable,value:l}),l.call(this,t)};break}}break}default:switch(u){case c.REPLACE:{e.value=function(...t){const a=s();function l(...n){const r=h.apply(this,n);if(a.has(r))return a.get(r);{const f=i.apply(this,n);return a.set(r,f),f}}return Object.defineProperty(this,o,{configurable:e.configurable,enumerable:e.enumerable,writable:e.writable,value:l}),l.apply(this,t)};break}case c.WEAKMAP:{const t=new WeakMap;e.value=function(...l){let n=t.get(this);const r=h.apply(this,l);if(n?.has(r))return n.get(r);n||(n=s(),t.set(this,n));const f=i.apply(this,l);return n.set(r,f),f}}}}}function E(...e){let o="";for(let u=0,h=e.length;u<h;u++)o+=`${e[u]}$!$`;return o}function A(e){const o=e?.hashFunction||E,u=e?.strategy||c.WEAKMAP,h=e?.argsCacheBuilder||(()=>new Map);return(s,i,t)=>{if(g(t)){w(t,i,u,o,h);return}if(b(t)){m(t,i,u);return}throw new Error("Decorate only a method or get accessor")}}const M=A;export{M};