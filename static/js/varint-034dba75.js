var v=w,M=128,c=127,p=~c,E=Math.pow(2,31);function w(r,e,a){if(Number.MAX_SAFE_INTEGER&&r>Number.MAX_SAFE_INTEGER)throw w.bytes=0,new RangeError("Could not encode varint");e=e||[],a=a||0;for(var t=a;r>=E;)e[a++]=r&255|M,r/=128;for(;r&p;)e[a++]=r&255|M,r>>>=7;return e[a]=r|0,w.bytes=a-t+1,e}var F=d,x=128,N=127;function d(r,t){var a=0,t=t||0,o=0,h=t,n,i=r.length;do{if(h>=i||o>49)throw d.bytes=0,new RangeError("Could not decode varint");n=r[h++],a+=o<28?(n&N)<<o:(n&N)*Math.pow(2,o),o+=7}while(n>=x);return d.bytes=h-t,a}var S=Math.pow(2,7),b=Math.pow(2,14),g=Math.pow(2,21),R=Math.pow(2,28),A=Math.pow(2,35),T=Math.pow(2,42),_=Math.pow(2,49),s=Math.pow(2,56),y=Math.pow(2,63),B=function(r){return r<S?1:r<b?2:r<g?3:r<R?4:r<A?5:r<T?6:r<_?7:r<s?8:r<y?9:10},I={encode:v,decode:F,encodingLength:B};export{I as v};