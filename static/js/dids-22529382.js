import{R as C}from"./did-resolver-55098980.js";import{v as I,r as S,c as k}from"./did-jwt-64712d40.js";import{e as J,p as T,d as W}from"./dag-jose-utils-1a428406.js";import{C as p}from"./multiformats-412ad19c.js";import{t as u,f as b}from"./uint8arrays-499feafe.js";import{r as O}from"./@stablelib-7cabded6.js";import{a as y,C as v,g as R}from"./@didtools-2547104e.js";import{R as m}from"./rpc-utils-50b1abf6.js";function x(){return u(O.randomBytes(16),"base64")}const _="base64pad",D="base64url";function $(a){return u(a,_)}function B(a){return u(a,D)}function P(a){return b(a,_)}function w(a){return JSON.parse(u(b(a,D)))}function M(a){if(a.signatures.length>1)throw new Error("Cant convert to compact jws");return`${a.signatures[0].protected}.${a.payload}.${a.signatures[0].signature}`}function N(a,t){if(t){const e=t.toISOString().split(".")[0]+"Z";return`${a}?versionTime=${e}`}else return a}function A(a){return a?Array.isArray(a)?a:[a]:[]}const q={...R()};function U(a){return"registry"in a&&"cache"in a}class g{get capability(){if(!this._capability)throw new Error("DID has no capability attached");return this._capability}get hasCapability(){return this._capability!=null}get parent(){if(!this._parentId)throw new Error("DID has no parent DID");return this._parentId}get hasParent(){return this._parentId!=null}get id(){if(this._id==null)throw new Error("DID is not authenticated");return this._id}get authenticated(){return this._id!=null}withCapability(t){return new g({provider:this._client?.connection,resolver:this._resolver,capability:t,parent:this._parentId})}setProvider(t){if(this._client==null)this._client=new m(t);else if(this._client.connection!==t)throw new Error("A different provider is already set, create a new DID instance to use another provider")}setResolver(t,e){this._resolver=U(t)?t:new C(t,e)}async authenticate({provider:t,paths:e=[],aud:i}={}){if(t!=null&&this.setProvider(t),this._client==null)throw new Error("No provider available");const r=x(),n=await this._client.request("did_authenticate",{nonce:r,aud:i,paths:e}),{kid:s}=await this.verifyJWS(n),c=w(n.payload);if(!s.includes(c.did))throw new Error("Invalid authencation response, kid mismatch");if(c.nonce!==r)throw new Error("Invalid authencation response, wrong nonce");if(c.aud!==i)throw new Error("Invalid authencation response, wrong aud");if(c.exp<Date.now()/1e3)throw new Error("Invalid authencation response, expired");return this._id=c.did,this._id}async createJWS(t,e={}){if(this._client==null)throw new Error("No provider available");if(this._id==null)throw new Error("DID is not authenticated");if(this._capability){const r=this._capability.p.exp;if(r&&Date.parse(r)<Date.now())throw new Error("Capability is expired, cannot create a valid signature");const n=await y.fromCacao(this._capability),s=p.asCID(n.cid);if(!s)throw new Error("Capability CID of the JWS cannot be set to the capability payload cid as they are incompatible");e.protected=e.protected||{},e.protected.cap=`ipfs://${s?.toString()}`}const{jws:i}=await this._client.request("did_createJWS",{did:this._id,...e,payload:t});return i}async createDagJWS(t,e={}){const{cid:i,linkedBlock:r}=await J(t),n=B(i.bytes);Object.assign(e,{linkedBlock:$(r)});const s=await this.createJWS(n,e),c=p.asCID(i);if(!c)throw new Error("CID of the JWS cannot be set to the encoded payload cid as they are incompatible");if(s.link=c,this._capability){const l=await y.fromCacao(this._capability);return{jws:s,linkedBlock:r,cacaoBlock:l.bytes}}return{jws:s,linkedBlock:r}}async verifyJWS(t,e={}){e=Object.assign({verifiers:q},e),typeof t!="string"&&(t=M(t));const i=w(t.split(".")[0]).kid;if(!i)throw new Error('No "kid" found in jws');const r=await this.resolve(i);if(!e.disableTimecheck){const o=r.didDocumentMetadata?.nextUpdate;if(o){const f=e.revocationPhaseOutSecs?e.revocationPhaseOutSecs*1e3:0,d=new Date(o).valueOf()+f;if(!(e.atTime&&e.atTime.getTime()<d))throw new Error(`invalid_jws: signature authored with a revoked DID version: ${i}`)}const h=r.didDocumentMetadata?.updated;if(h&&e.atTime&&e.atTime.getTime()<new Date(h).valueOf())throw new Error(`invalid_jws: signature authored before creation of DID version: ${i}`)}const s=r.didDocument?.id;if(e.issuer&&e.issuer===e.capability?.p.iss&&s===e.capability.p.aud){if(!e.verifiers)throw new Error("Registered verifiers needed for CACAO");await v.verify(e.capability,{disableExpirationCheck:e.disableTimecheck,atTime:e.atTime?e.atTime:void 0,revocationPhaseOutSecs:e.revocationPhaseOutSecs,verifiers:e.verifiers??{}})}else if(e.issuer&&e.issuer!==s){const o=N(e.issuer,e.atTime),f=(await this.resolve(o)).didDocument?.controller,d=A(f);if(e.capability?.s&&e.capability.p.aud===s&&d.includes(e.capability.p.iss))await v.verify(e.capability,{atTime:e.atTime?e.atTime:void 0,revocationPhaseOutSecs:e.revocationPhaseOutSecs,verifiers:e.verifiers??{}});else if(!(s?d.includes(s):!1))throw new Error(`invalid_jws: not a valid verificationMethod for issuer: ${i}`)}const c=r.didDocument?.verificationMethod||[];I(t,c);let l;try{l=w(t.split(".")[1])}catch{}return{kid:i,payload:l,didResolutionResult:r}}async createJWE(t,e,i={}){const r=await S(e,this._resolver);return k(t,r,i.protectedHeader,i.aad)}async createDagJWE(t,e,i={}){const r=await T(t);return this.createJWE(r,e,i)}async decryptJWE(t,e={}){if(this._client==null)throw new Error("No provider available");if(this._id==null)throw new Error("DID is not authenticated");const{cleartext:i}=await this._client.request("did_decryptJWE",{did:this._id,...e,jwe:t});return P(i)}async decryptDagJWE(t){const e=await this.decryptJWE(t);return W(e)}async resolve(t){const e=await this._resolver.resolve(t);if(e.didResolutionMetadata.error){const{error:i,message:r}=e.didResolutionMetadata,n=r?`, ${r}`:"";throw new Error(`Failed to resolve ${t}: ${i}${n}`)}return e}constructor({provider:t,resolver:e={},resolverOptions:i,capability:r,parent:n}={}){if(t!=null&&(this._client=new m(t)),r){if(this._capability=r,this._parentId=this._capability.p.iss,n&&this._parentId!==n)throw new Error("Capability issuer and parent not equal")}else n&&(this._parentId=n);this.setResolver(e,i)}}export{g as D};