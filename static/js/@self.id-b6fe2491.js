import{e as D,f as b,g as I}from"./@ceramicnetwork-abcc253c.js";import{E as Yt}from"./@ceramicnetwork-abcc253c.js";import{i as P,T as S,D as z,a as A}from"./@glazed-7e01f8ad.js";import{R as E}from"./did-resolver-55098980.js";import{g as x}from"./key-did-resolver-e34e002c.js";import{A as j}from"./caip-9ca4a743.js";import{D as C}from"./dids-22529382.js";import{T as $}from"./@3id-12b821ad.js";import{D as w}from"./did-session-61d81edc.js";import"./uint8arrays-499feafe.js";import"./@antv-806868f3.js";import"./vue-94711728.js";import"./@vue-19cc1a0c.js";import"./multiformats-412ad19c.js";import"./@stablelib-7cabded6.js";import"./@ethersproject-c84a39ae.js";import"./js-sha3-c0715a7a.js";import"./hash.js-da0ce07b.js";import"./minimalistic-assert-c1ce1705.js";import"./inherits-c31b4f37.js";import"./bech32-9a81277b.js";import"./@didtools-2547104e.js";import"./bignumber.js-377fbb8c.js";import"./elliptic-464a2e13.js";import"./bn.js-6b0ab283.js";import"./minimalistic-crypto-utils-eddaa20e.js";import"./brorand-04b430f9.js";import"./hmac-drbg-0855abe5.js";import"./@ipld-966a175d.js";import"./cborg-03b6df65.js";import"./apg-js-648c7dea.js";import"./rxjs-39c6337d.js";import"./tslib-f4dc1f8d.js";import"./rpc-utils-50b1abf6.js";import"./nanoid-86c80500.js";import"./cross-fetch-aa52e6a1.js";import"./lru_map-1b96baad.js";import"./varint-034dba75.js";import"./mapmoize-30a3511b.js";import"./lodash.clonedeep-ad7d3f3b.js";import"./multihashes-a1289479.js";import"./multibase-7005923f.js";import"./@multiformats-95f6f35f.js";import"./fast-json-patch-58abc6e9.js";import"./dataloader-a32e8ed0.js";import"./nist-weierstrauss-42cd2be5.js";import"./bigint-mod-arith-b3f31a89.js";import"./did-jwt-64712d40.js";import"./canonicalize-8293648e.js";import"./dag-jose-utils-1a428406.js";import"./key-did-provider-ed25519-f246feaa.js";import"./fast-json-stable-stringify-ec71e3ec.js";const q={definitions:{cryptoAccounts:"kjzl6cwe1jw149z4rvwzi56mjjukafta30kojzktd9dsrgqdgz4wlnceu59f95f",alsoKnownAs:"kjzl6cwe1jw146zfmqa10a5x1vry6au3t362p44uttz4l0k4hi88o41zplhmxnf",basicProfile:"kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic"},schemas:{CryptoAccounts:"ceramic://k3y52l7qbv1frypussjburqg4fykyyycfu0p9znc75lv2t5cg4xaslhagkd7h7mkg",AlsoKnownAs:"ceramic://k3y52l7qbv1fryojt8n8cw2k04p9wp67ly59iwqs65dejso566fij5wsdrb871yio",BasicProfile:"ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio"},tiles:{}};function T(e){try{return j.parse(e),!0}catch{return!1}}function F(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function R(e,t){return t.get?t.get.call(e):t.value}function W(e,t,i){if(t.set)t.set.call(e,i);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=i}}function y(e,t,i){if(!t.has(e))throw new TypeError("attempted to "+i+" private field on non-instance");return t.get(e)}function s(e,t){var i=y(e,t,"get");return R(e,i)}function u(e,t,i){F(e,t),t.set(e,i)}function d(e,t,i){var r=y(e,t,"set");return W(e,r,i),i}const G={local:"http://localhost:7007","mainnet-gateway":"https://gateway.ceramic.network","testnet-clay":"https://ceramic-clay.3boxlabs.com","testnet-clay-gateway":"https://gateway-clay.ceramic.network"};var c=new WeakMap,h=new WeakMap,m=new WeakMap;class g{get ceramic(){return this._ceramic}get dataModel(){return s(this,c)}get dataStore(){return this._dataStore}get resolver(){return s(this,h)}get tileLoader(){return s(this,m)}async getAccountDID(t){const i=await D.fromAccount(this._ceramic,t);if(i.did==null)throw new Error(`No DID found for ${t}`);return i.did}async toDID(t){return P(t)?t:T(t)?await this.getAccountDID(t):t}async get(t,i){const r=await this.toDID(i);return await this._dataStore.get(t,r)}constructor(t){u(this,c,{writable:!0,value:void 0}),u(this,h,{writable:!0,value:void 0}),u(this,m,{writable:!0,value:void 0});const i=new b(G[t.ceramic]??t.ceramic),r=t.loader??new S({ceramic:i,cache:t.cache});this._ceramic=i,d(this,c,new z({loader:r,aliases:t.aliases??q})),this._dataStore=new A({ceramic:i,loader:r,model:s(this,c)}),d(this,h,new E({...x(),...I(this._ceramic)})),d(this,m,r)}}class L extends g{get threeId(){return this._threeId}async authenticate(t,i=!0){const r=await this.connect(t);return await r.authenticate(),i&&(this.ceramic.did=r),r}async connect(t){return await this._threeId.connect(t),new C({provider:this._threeId.getDidProvider(),resolver:this.resolver})}constructor(t){super(t),this._threeId=new $(t.connectNetwork??t.ceramic)}}function M(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function K(e,t){return t.get?t.get.call(e):t.value}function N(e,t,i){if(t.set)t.set.call(e,i);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=i}}function v(e,t,i){if(!t.has(e))throw new TypeError("attempted to "+i+" private field on non-instance");return t.get(e)}function f(e,t){var i=v(e,t,"get");return K(e,i)}function B(e,t,i){M(e,t),t.set(e,i)}function U(e,t,i){var r=v(e,t,"set");return N(e,r,i),i}var l=new WeakMap;class H extends g{async authenticate(t,i=!0,r){U(this,l,r?await w.fromSession(r):await w.authorize(t,{resources:["ceramic://*"]}));const n=f(this,l).did;return i&&(this.ceramic.did=n),n}get session(){return f(this,l)}constructor(...t){super(...t),B(this,l,{writable:!0,value:void 0})}}function J(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Q(e,t){return t.get?t.get.call(e):t.value}function V(e,t,i){if(t.set)t.set.call(e,i);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=i}}function _(e,t,i){if(!t.has(e))throw new TypeError("attempted to "+i+" private field on non-instance");return t.get(e)}function o(e,t){var i=_(e,t,"get");return Q(e,i)}function X(e,t,i){J(e,t),t.set(e,i)}function Y(e,t,i){var r=_(e,t,"set");return V(e,r,i),i}var a=new WeakMap;class k{static async authenticate(t){const{authProvider:i,threeidConnect:r,...n}=t,p=r?new L(n):new H(n);return await p.authenticate(i,!0,n.sessionStr),new k({client:p})}get client(){return o(this,a)}get did(){const t=o(this,a).ceramic.did;if(t==null||!t.authenticated)throw new Error("Expected authenticated DID instance to be attached to Ceramic");return t}get id(){return this.did.hasParent?this.did.parent:this.did.id}async get(t){return await o(this,a).dataStore.get(t,this.id)}async set(t,i){return await o(this,a).dataStore.set(t,i)}async merge(t,i){return await o(this,a).dataStore.merge(t,i)}constructor(t){if(X(this,a,{writable:!0,value:void 0}),!t.client.ceramic.did?.authenticated)throw new Error("Input DID must be authenticated, use SelfID.authenticate() instead of new SelfID()");Y(this,a,t.client)}}export{Yt as EthereumAuthProvider,k as SelfID,L as WebClient,H as WebClientSession};