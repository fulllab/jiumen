import{A as R,C as B}from"./caip-9ca4a743.js";import"./uint8arrays-1b95a8ae.js";import"./@stablelib-91de8d10.js";import"./inherits-c31b4f37.js";import"./bignumber.js-377fbb8c.js";import"./elliptic-51a3863c.js";import{v as x}from"./@ethersproject-f45bd042.js";import{d as _}from"./@ipld-6280708d.js";import{a as N,e as j,s as P}from"./multiformats-1a570ced.js";import{a as K,n as l}from"./apg-js-41118b20.js";const H=`
sign-in-with-ethereum =
    domain %s" wants you to sign in with your Ethereum account:" LF
    address LF
    LF
    [ statement LF ]
    LF
    %s"URI: " URI LF
    %s"Version: " version LF
    %s"Chain ID: " chain-id LF
    %s"Nonce: " nonce LF
    %s"Issued At: " issued-at
    [ LF %s"Expiration Time: " expiration-time ]
    [ LF %s"Not Before: " not-before ]
    [ LF %s"Request ID: " request-id ]
    [ LF %s"Resources:"
    resources ]

domain = dnsauthority

address = "0x" 40*40HEXDIG
    ; Must also conform to captilization
    ; checksum encoding specified in EIP-55
    ; where applicable (EOAs).

statement = *( reserved / unreserved / " " )
    ; The purpose is to exclude LF (line breaks).

version = "1"

nonce = 8*( ALPHA / DIGIT )

issued-at = date-time
expiration-time = date-time
not-before = date-time

request-id = *pchar

chain-id = 1*DIGIT
    ; See EIP-155 for valid CHAIN_IDs.

resources = *( LF resource )

resource = "- " URI

; ------------------------------------------------------------------------------
; RFC 3986

URI           = scheme ":" hier-part [ "?" query ] [ "#" fragment ]

hier-part     = "//" authority path-abempty
              / path-absolute
              / path-rootless
              / path-empty

scheme        = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )

authority     = [ userinfo "@" ] host [ ":" port ]
userinfo      = *( unreserved / pct-encoded / sub-delims / ":" )
host          = IP-literal / IPv4address / reg-name
port          = *DIGIT

IP-literal    = "[" ( IPv6address / IPvFuture  ) "]"

IPvFuture     = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )

IPv6address   =                            6( h16 ":" ) ls32
              /                       "::" 5( h16 ":" ) ls32
              / [               h16 ] "::" 4( h16 ":" ) ls32
              / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
              / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
              / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
              / [ *4( h16 ":" ) h16 ] "::"              ls32
              / [ *5( h16 ":" ) h16 ] "::"              h16
              / [ *6( h16 ":" ) h16 ] "::"

h16           = 1*4HEXDIG
ls32          = ( h16 ":" h16 ) / IPv4address
IPv4address   = dec-octet "." dec-octet "." dec-octet "." dec-octet
dec-octet     = DIGIT                 ; 0-9
                 / %x31-39 DIGIT         ; 10-99
                 / "1" 2DIGIT            ; 100-199
                 / "2" %x30-34 DIGIT     ; 200-249
                 / "25" %x30-35          ; 250-255

reg-name      = *( unreserved / pct-encoded / sub-delims )

path-abempty  = *( "/" segment )
path-absolute = "/" [ segment-nz *( "/" segment ) ]
path-rootless = segment-nz *( "/" segment )
path-empty    = 0pchar

segment       = *pchar
segment-nz    = 1*pchar

pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"

query         = *( pchar / "/" / "?" )

fragment      = *( pchar / "/" / "?" )

pct-encoded   = "%" HEXDIG HEXDIG

unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
reserved      = gen-delims / sub-delims
gen-delims    = ":" / "/" / "?" / "#" / "[" / "]" / "@"
sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
              / "*" / "+" / "," / ";" / "="

; ------------------------------------------------------------------------------
; RFC 4501

dnsauthority    = host [ ":" port ]
                             ; See RFC 3986 for the
                             ; definition of "host" and "port".

; ------------------------------------------------------------------------------
; RFC 3339

date-fullyear   = 4DIGIT
date-month      = 2DIGIT  ; 01-12
date-mday       = 2DIGIT  ; 01-28, 01-29, 01-30, 01-31 based on
                          ; month/year
time-hour       = 2DIGIT  ; 00-23
time-minute     = 2DIGIT  ; 00-59
time-second     = 2DIGIT  ; 00-58, 00-59, 00-60 based on leap second
                          ; rules
time-secfrac    = "." 1*DIGIT
time-numoffset  = ("+" / "-") time-hour ":" time-minute
time-offset     = "Z" / time-numoffset

partial-time    = time-hour ":" time-minute ":" time-second
                  [time-secfrac]
full-date       = date-fullyear "-" date-month "-" date-mday
full-time       = partial-time time-offset

date-time       = full-date "T" full-time

; ------------------------------------------------------------------------------
; RFC 5234

ALPHA          =  %x41-5A / %x61-7A   ; A-Z / a-z
LF             =  %x0A
                  ; linefeed
DIGIT          =  %x30-39
                  ; 0-9
HEXDIG         =  DIGIT / "A" / "B" / "C" / "D" / "E" / "F"
`;class U{constructor(n){const i=new K(H);if(i.generate(),i.errors.length)throw console.error(i.errorsToAscii()),console.error(i.linesToAscii()),console.log(i.displayAttributeErrors()),new Error("ABNF grammar has errors");const u=i.toObject(),s=new l.parser;s.ast=new l.ast;const o=l.ids,e=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.domain=l.utils.charsToString(c,f,h)),p};s.ast.callbacks.domain=e;const r=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.address=l.utils.charsToString(c,f,h)),p};s.ast.callbacks.address=r;const I=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.statement=l.utils.charsToString(c,f,h)),p};s.ast.callbacks.statement=I;const m=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.uri||(a.uri=l.utils.charsToString(c,f,h))),p};s.ast.callbacks.uri=m;const E=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.version=l.utils.charsToString(c,f,h)),p};s.ast.callbacks.version=E;const O=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.chainId=l.utils.charsToString(c,f,h)),p};s.ast.callbacks["chain-id"]=O;const F=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.nonce=l.utils.charsToString(c,f,h)),p};s.ast.callbacks.nonce=F;const k=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.issuedAt=l.utils.charsToString(c,f,h)),p};s.ast.callbacks["issued-at"]=k;const L=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.expirationTime=l.utils.charsToString(c,f,h)),p};s.ast.callbacks["expiration-time"]=L;const G=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.notBefore=l.utils.charsToString(c,f,h)),p};s.ast.callbacks["not-before"]=G;const $=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.requestId=l.utils.charsToString(c,f,h)),p};s.ast.callbacks["request-id"]=$;const q=function(d,c,f,h,a){const p=o.SEM_OK;return d===o.SEM_PRE&&(a.resources=l.utils.charsToString(c,f,h).slice(3).split(`
- `)),p};s.ast.callbacks.resources=q;const A=s.parse(u,"sign-in-with-ethereum",n);if(!A.success)throw new Error(`Invalid message: ${JSON.stringify(A)}`);const v={};s.ast.translate(v);for(const[d,c]of Object.entries(v))this[d]=c}}var b;(function(t){t.INVALID_SIGNATURE="Invalid signature.",t.EXPIRED_MESSAGE="Expired message.",t.MALFORMED_SESSION="Malformed session."})(b||(b={}));var S;(function(t){t.PERSONAL_SIGNATURE="Personal signature"})(S||(S={}));class X{static fromCacao(n){const i=R.parse(n.p.iss.replace("did:pkh:","")),u=new this({domain:n.p.domain,address:i.address,uri:n.p.aud,version:n.p.version,chainId:new B(i.chainId).reference});return n.p.statement&&(u.statement=n.p.statement),n.p.nonce&&(u.nonce=n.p.nonce),n.p.iat&&(u.issuedAt=n.p.iat),n.p.exp&&(u.expirationTime=n.p.exp),n.p.nbf&&(u.notBefore=n.p.nbf),n.p.requestId&&(u.requestId=n.p.requestId),n.p.resources&&(u.resources=n.p.resources),n.s&&(n.s.s&&(u.signature=n.s.s),n.s.t==="eip191"&&(u.type=S.PERSONAL_SIGNATURE)),u}toMessage(n){return Z(this,n)}constructor(n){if(this.statement=void 0,this.nonce=void 0,this.issuedAt=void 0,this.expirationTime=void 0,this.notBefore=void 0,this.requestId=void 0,this.resources=void 0,this.signature=void 0,typeof n=="string"){const i=new U(n);this.domain=i.domain,this.address=i.address,this.statement=i.statement,this.uri=i.uri,this.version=i.version,this.nonce=i.nonce,this.issuedAt=i.issuedAt,this.expirationTime=i.expirationTime,this.notBefore=i.notBefore,this.requestId=i.requestId,this.chainId=i.chainId,this.resources=i.resources}else Object.assign(this,n)}}function V(t,n){const i=`${t.domain} wants you to sign in with your ${n} account:`,u=`URI: ${t.uri}`;let s=[i,t.address].join(`
`);const o=`Version: ${t.version}`;t.nonce||(t.nonce=(Math.random()+1).toString(36).substring(4));const e=`Nonce: ${t.nonce}`,r=[u,o,e];if(t.issuedAt&&Date.parse(t.issuedAt),t.issuedAt=t.issuedAt?t.issuedAt:new Date().toISOString(),r.push(`Issued At: ${t.issuedAt}`),t.expirationTime){const m=`Expiration Time: ${t.expirationTime}`;r.push(m)}t.notBefore&&r.push(`Not Before: ${t.notBefore}`),t.requestId&&r.push(`Request ID: ${t.requestId}`),t.chainId&&r.push(`Chain ID: ${t.chainId}`),t.resources&&r.push(["Resources:",...t.resources.map(m=>`- ${m}`)].join(`
`));const I=r.join(`
`);return t.statement&&(s=[s,t.statement].join(`

`)),[s,I].join(`

`)}function Z(t,n){const i=`${t.domain} wants you to sign in with your ${n} account:`,u=`URI: ${t.uri}`;let s=[i,t.address].join(`
`);const o=`Version: ${t.version}`;t.nonce||(t.nonce=(Math.random()+1).toString(36).substring(4));const e=`Nonce: ${t.nonce}`,r=`Chain ID: ${t.chainId}`,I=[u,o,r,e];if(t.issuedAt&&Date.parse(t.issuedAt),t.issuedAt=t.issuedAt?t.issuedAt:new Date().toISOString(),I.push(`Issued At: ${t.issuedAt}`),t.expirationTime){const E=`Expiration Time: ${t.expirationTime}`;I.push(E)}t.notBefore&&I.push(`Not Before: ${t.notBefore}`),t.requestId&&I.push(`Request ID: ${t.requestId}`),t.resources&&t.resources.length>=1&&I.push(["Resources:",...t.resources.map(E=>`- ${E}`)].join(`
`));const m=I.join(`
`);return t.statement&&(s=[s,t.statement].join(`

`)),[s,m].join(`

`)}class D extends X{toMessage(){return super.toMessage("Ethereum")}signMessage(){let n;switch(this.type){case S.PERSONAL_SIGNATURE:{n=this.toMessage();break}default:{n=this.toMessage();break}}return n}}const J=5*60;new Date("2022-09-20").valueOf();var T;(function(t){function n(e){const r={h:{t:"eip4361"},p:{domain:e.domain,iat:e.issuedAt,iss:`did:pkh:eip155:${e.chainId}:${e.address}`,aud:e.uri,version:e.version,nonce:e.nonce}};return e.signature&&(r.s={t:"eip191",s:e.signature}),e.notBefore&&(r.p.nbf=e.notBefore),e.expirationTime&&(r.p.exp=e.expirationTime),e.statement&&(r.p.statement=e.statement),e.requestId&&(r.p.requestId=e.requestId),e.resources&&(r.p.resources=e.resources),r}t.fromSiweMessage=n;function i(e){const r={h:{t:"caip122"},p:{domain:e.domain,iat:e.issuedAt,iss:`did:pkh:solana:${e.chainId}:${e.address}`,aud:e.uri,version:e.version,nonce:e.nonce}};return e.signature&&(r.s={t:"solana:ed25519",s:e.signature}),e.notBefore&&(r.p.nbf=e.notBefore),e.expirationTime&&(r.p.exp=e.expirationTime),e.statement&&(r.p.statement=e.statement),e.requestId&&(r.p.requestId=e.requestId),e.resources&&(r.p.resources=e.resources),r}t.fromSiwsMessage=i;function u(e){const r={h:{t:"caip122"},p:{domain:e.domain,iat:e.issuedAt,iss:`did:pkh:tezos:${e.chainId}:${e.address}`,aud:e.uri,version:e.version,nonce:e.nonce}};return e.signature&&(r.s={t:"tezos:ed25519",s:e.signature}),e.notBefore&&(r.p.nbf=e.notBefore),e.expirationTime&&(r.p.exp=e.expirationTime),e.statement&&(r.p.statement=e.statement),e.requestId&&(r.p.requestId=e.requestId),e.resources&&(r.p.resources=e.resources),r}t.fromSiwTezosMessage=u;async function s(e){return(await N({bytes:e,codec:_,hasher:P})).value}t.fromBlockBytes=s;async function o(e,r={}){C(e);const I=r.verifiers[e.s.t];if(!I)throw new Error("Unsupported CACAO signature type, register the needed verifier");return I(e,r)}t.verify=o})(T||(T={}));var y;(function(t){function n(i){return j({value:i,codec:_,hasher:P})}t.fromCacao=n})(y||(y={}));function C(t){if(t.s===null||t.s===void 0)throw new Error("CACAO does not have a signature")}function W(t,n){const i=n.atTime?n.atTime.getTime():Date.now(),u=(n.clockSkewSecs??J)*1e3;if(Date.parse(t.p.iat)>i+u||Date.parse(t.p.nbf)>i+u)throw new Error("CACAO is not valid yet");const s=n.revocationPhaseOutSecs?n.revocationPhaseOutSecs*1e3:0;if(!n.disableExpirationCheck&&Date.parse(t.p.exp)+s+u<i)throw new Error("CACAO has expired")}function st(){return{eip191:async(t,n)=>{Q(t,n)}}}const Y=new Date("2022-09-20").valueOf();function Q(t,n){C(t),W(t,n);const u=[x(D.fromCacao(t).toMessage(),t.s.s).toLowerCase()];if(Date.parse(t.p.iat)<=Y){const o=x(V(D.fromCacao(t),"Ethereum"),t.s.s).toLowerCase();u.push(o)}const s=R.parse(t.p.iss.replace("did:pkh:","")).address.toLowerCase();if(!u.includes(s))throw new Error("Signature does not belong to issuer")}export{T as C,D as S,y as a,st as g};
