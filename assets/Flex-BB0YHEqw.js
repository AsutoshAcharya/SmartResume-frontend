import{l as i,k as o,j as a,m as l}from"./index-BxkOV122.js";import{A as f,m as n}from"./proxy-BnSQQ4U-.js";/**
 * @license lucide-react v0.507.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],j=i("eye",y);/**
 * @license lucide-react v0.507.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],k=i("x",p),w=({open:e,onClose:t,className:d,children:m,closeOnOutsideClick:c=!0,...u})=>{const s=o.useRef(null);return o.useEffect(()=>{const r=x=>{s.current&&!s.current.contains(x.target)&&t()};return e&&c&&document.addEventListener("mousedown",r),()=>{document.removeEventListener("mousedown",r)}},[e,t,c]),a.jsx(f,{children:e&&a.jsx(n.div,{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto",role:"dialog","aria-modal":"true",...u,children:a.jsx(n.div,{ref:s,initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:0},transition:{duration:.3},className:l("bg-white max-w-4xl w-full rounded-xl shadow-lg p-6 relative",d),children:m})})})},E=({className:e,...t})=>a.jsx("div",{className:l("flex flex-col justify-start ",e),...t});export{j as E,E as F,w as M,k as X};
