'use strict';
window.SS={
 $:s=>document.querySelector(s),
 esc:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 load:(key,fallback)=>{try{return JSON.parse(localStorage.getItem('streamside-'+key))??fallback;}catch{return fallback;}},
 save:(key,value)=>{try{localStorage.setItem('streamside-'+key,JSON.stringify(value));}catch{SS.toast('Browser storage is full or unavailable. Export your work.');}},
 toast:t=>{const e=SS.$('#toast');e.textContent=t;e.classList.add('visible');clearTimeout(SS.toastTimer);SS.toastTimer=setTimeout(()=>e.classList.remove('visible'),3500);},
 download:(name,text,type='text/plain')=>{const blob=text instanceof Blob?text:new Blob([text],{type});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),20000);},
 copy:async text=>{if(!text)return SS.toast('Nothing to copy yet.');try{await navigator.clipboard.writeText(text);SS.toast('Copied to clipboard.');}catch{SS.toast('Clipboard blocked. Select and copy the text manually.');}},
 clock:seconds=>{const s=Math.max(0,Math.floor(seconds));return String(Math.floor(s/3600)).padStart(2,'0')+':'+String(Math.floor(s/60)%60).padStart(2,'0')+':'+String(s%60).padStart(2,'0');},
 randomInt:(min,max)=>{if(!Number.isSafeInteger(min)||!Number.isSafeInteger(max)||max<min||max-min>4294967294)throw Error('Use whole numbers with a range below 4.29 billion.');const range=max-min+1;const n=new Uint32Array(1);const cap=Math.floor(4294967296/range)*range;do{crypto.getRandomValues(n);}while(n[0]>=cap);return min+n[0]%range;},
 pick:a=>a[SS.randomInt(0,a.length-1)],
 sessionStart:0,sessionBase:0,
 elapsed:()=>SS.sessionBase+(SS.sessionStart?(Date.now()-SS.sessionStart)/1000:0),
 caption:'',translatedCaption:'',timerRemaining:300,
 emitter:new EventTarget(),
 emit:(type,detail)=>SS.emitter.dispatchEvent(new CustomEvent(type,{detail}))
};
