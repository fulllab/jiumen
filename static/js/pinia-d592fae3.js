import{i as K}from"./vue-demi-fbade89c.js";import{a1 as V,j as A,a2 as O,E as H,G as Q,k as Z,z as $,W as I,a3 as W,Y as M,D as T,n as tt,X as et,p as st}from"./@vue-19cc1a0c.js";/*!
  * pinia v2.0.13
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */let z;const R=t=>z=t,B=Symbol();function x(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var E;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(E||(E={}));function ft(){const t=V(!0),u=t.run(()=>A({}));let s=[],e=[];const o=O({install(r){R(o),o._a=r,r.provide(B,o),r.config.globalProperties.$pinia=o,e.forEach(i=>s.push(i)),e=[]},use(r){return!this._a&&!K?e.push(r):s.push(r),this},_p:s,_a:null,_e:t,_s:new Map,state:u});return o}const D=()=>{};function F(t,u,s,e=D){t.push(u);const o=()=>{const r=t.indexOf(u);r>-1&&(t.splice(r,1),e())};return!s&&H()&&T(o),o}function _(t,...u){t.slice().forEach(s=>{s(...u)})}function C(t,u){for(const s in u){if(!u.hasOwnProperty(s))continue;const e=u[s],o=t[s];x(o)&&x(e)&&t.hasOwnProperty(s)&&!I(e)&&!W(e)?t[s]=C(o,e):t[s]=e}return t}const nt=Symbol();function ot(t){return!x(t)||!t.hasOwnProperty(nt)}const{assign:h}=Object;function ct(t){return!!(I(t)&&t.effect)}function rt(t,u,s,e){const{state:o,actions:r,getters:i}=u,a=s.state.value[t];let S;function b(){a||(s.state.value[t]=o?o():{});const y=et(s.state.value[t]);return h(y,r,Object.keys(i||{}).reduce((p,v)=>(p[v]=O(st(()=>{R(s);const d=s._s.get(t);return i[v].call(d,d)})),p),{}))}return S=J(t,b,u,s),S.$reset=function(){const p=o?o():{};this.$patch(v=>{h(v,p)})},S}function J(t,u,s={},e,o){let r;const i=s.state,a=h({actions:{}},s),S={deep:!0};let b,y,p=O([]),v=O([]),d;const m=e.state.value[t];!i&&!m&&(e.state.value[t]={}),A({});function L(c){let n;b=y=!1,typeof c=="function"?(c(e.state.value[t]),n={type:E.patchFunction,storeId:t,events:d}):(C(e.state.value[t],c),n={type:E.patchObject,payload:c,storeId:t,events:d}),tt().then(()=>{b=!0}),y=!0,_(p,n,e.state.value[t])}const N=D;function U(){r.stop(),p=[],v=[],e._s.delete(t)}function X(c,n){return function(){R(e);const g=Array.from(arguments),P=[],w=[];function q(f){P.push(f)}function G(f){w.push(f)}_(v,{args:g,name:c,store:l,after:q,onError:G});let k;try{k=n.apply(this&&this.$id===t?this:l,g)}catch(f){throw _(w,f),f}return k instanceof Promise?k.then(f=>(_(P,f),f)).catch(f=>(_(w,f),Promise.reject(f))):(_(P,k),k)}}const Y={_p:e,$id:t,$onAction:F.bind(null,v),$patch:L,$reset:N,$subscribe(c,n={}){const g=F(p,c,n.detached,()=>P()),P=r.run(()=>Z(()=>e.state.value[t],w=>{(n.flush==="sync"?y:b)&&c({storeId:t,type:E.direct,events:d},w)},h({},S,n)));return g},$dispose:U},l=$(h({},Y));e._s.set(t,l);const j=e._e.run(()=>(r=V(),r.run(()=>u())));for(const c in j){const n=j[c];if(I(n)&&!ct(n)||W(n))i||(m&&ot(n)&&(I(n)?n.value=m[c]:C(n,m[c])),e.state.value[t][c]=n);else if(typeof n=="function"){const g=X(c,n);j[c]=g,a.actions[c]=n}}return h(l,j),h(M(l),j),Object.defineProperty(l,"$state",{get:()=>e.state.value[t],set:c=>{L(n=>{h(n,c)})}}),e._p.forEach(c=>{h(l,r.run(()=>c({store:l,app:e._a,pinia:e,options:a})))}),m&&i&&s.hydrate&&s.hydrate(l.$state,m),b=!0,y=!0,l}function it(t,u,s){let e,o;const r=typeof u=="function";typeof t=="string"?(e=t,o=r?s:u):(o=t,e=t.id);function i(a,S){const b=H();return a=a||b&&Q(B),a&&R(a),a=z,a._s.has(e)||(r?J(e,u,o,a):rt(e,o,a)),a._s.get(e)}return i.$id=e,i}export{ft as c,it as d};