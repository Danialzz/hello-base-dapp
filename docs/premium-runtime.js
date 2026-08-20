(()=>{
  const style=document.createElement('style');
  style.textContent=`
  .hb-wallet{min-height:46px!important;padding:0 10px 0 9px!important;display:inline-flex!important;align-items:center!important;gap:9px!important;border-radius:15px!important;border:1px solid rgba(112,158,255,.65)!important;background:linear-gradient(180deg,#4b86ff 0%,#1761f5 45%,#0048df 100%)!important;box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 -5px 12px rgba(0,0,0,.24) inset,0 10px 28px rgba(0,82,255,.32)!important;color:#fff!important;font-weight:700!important;letter-spacing:-.02em!important;transition:transform .18s ease,filter .18s ease,box-shadow .18s ease!important}
  .hb-wallet:hover{transform:translateY(-1px)!important;filter:brightness(1.07)!important;box-shadow:0 1px 0 rgba(255,255,255,.58) inset,0 -5px 12px rgba(0,0,0,.24) inset,0 16px 38px rgba(0,82,255,.42)!important}
  .hb-wallet .hb-ico{width:29px;height:29px;display:inline-flex;align-items:center;justify-content:center;border-radius:9px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25)}
  .hb-wallet .hb-arr{width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;border-radius:7px;background:rgba(255,255,255,.11);transition:transform .18s ease}
  .hb-wallet:hover .hb-arr{transform:translate(2px,-2px)}
  .hb-write-area{position:relative!important}
  .hb-write-area textarea{width:100%!important;min-height:132px!important;height:132px!important;box-sizing:border-box!important;padding:18px 92px 18px 18px!important;border-radius:16px!important;border:1px solid rgba(111,145,211,.32)!important;background:linear-gradient(145deg,rgba(31,43,67,.62),rgba(10,15,25,.86))!important;color:#eef4ff!important;resize:vertical!important;outline:0!important;box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 10px 32px rgba(0,0,0,.14),0 0 0 1px rgba(0,82,255,.04)!important}
  .hb-write-area textarea:focus{border-color:rgba(72,130,255,.75)!important;box-shadow:0 0 0 3px rgba(0,82,255,.13),0 12px 34px rgba(0,0,0,.18)!important}
  .hb-write-area textarea:disabled{opacity:1!important;color:#aebbd2!important;cursor:pointer!important}
  .hb-write-btn{width:100%!important;min-height:54px!important;margin-top:14px!important;border-radius:15px!important;border:1px solid rgba(105,151,255,.35)!important;background:linear-gradient(180deg,rgba(58,104,202,.34),rgba(24,45,86,.48))!important;box-shadow:0 1px 0 rgba(255,255,255,.12) inset,0 12px 28px rgba(0,0,0,.18)!important;color:#dce8ff!important;font-weight:700!important;letter-spacing:-.015em!important;transition:transform .18s ease,filter .18s ease,box-shadow .18s ease!important}
  .hb-write-btn:hover{transform:translateY(-1px)!important;filter:brightness(1.08)!important;box-shadow:0 16px 34px rgba(0,82,255,.28)!important}
  .hb-refresh{min-height:44px!important;padding:0 15px!important;display:inline-flex!important;align-items:center!important;gap:8px!important;border-radius:12px!important;border:1px solid rgba(112,145,211,.3)!important;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.025))!important;color:#c4d1e7!important;font-weight:650!important;transition:transform .18s ease,border-color .18s ease,background .18s ease!important}
  .hb-refresh:hover{transform:translateY(-1px)!important;border-color:rgba(92,143,255,.58)!important;background:rgba(0,82,255,.10)!important}
  .hb-refresh svg{transition:transform .35s ease}.hb-refresh:hover svg{transform:rotate(-25deg)}
  @media(max-width:700px){.hb-wallet .hb-label{display:none}.hb-write-area textarea{min-height:120px!important;height:120px!important}}
  `;
  document.head.appendChild(style);

  const walletSvg='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15v4"/><path d="M5 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7"/><path d="M17 13h.01"/></svg>';
  const arrowSvg='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
  const refreshSvg='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"/></svg>';

  function clean(t){return (t||'').replace(/\s+/g,' ').trim().toLowerCase()}
  function decorate(){
    document.querySelectorAll('button').forEach(btn=>{
      const text=clean(btn.textContent);
      if(text.includes('connect wallet') && btn.closest('.topbar')){
        btn.classList.add('hb-wallet');
        if(!btn.querySelector('.hb-ico')){
          btn.innerHTML='<span class="hb-ico" aria-hidden="true">'+walletSvg+'</span><span class="hb-label">Connect wallet</span><span class="hb-arr" aria-hidden="true">'+arrowSvg+'</span>';
        }
      }
      if(text==='save to blockchain' || text==='connect wallet to write' || text==='publish on-chain' || text.includes('confirming on-chain')){
        btn.classList.add('hb-write-btn');
        const card=btn.closest('.card');
        if(card) card.classList.add('hb-write-card');
        if(text==='save to blockchain' && btn.disabled){
          btn.disabled=false;
          btn.textContent='Connect wallet to write';
          btn.prepend(Object.assign(document.createElement('span'),{className:'hb-ico',innerHTML:walletSvg}));
          btn.insertAdjacentHTML('beforeend','<span class="hb-arr" aria-hidden="true">'+arrowSvg+'</span>');
          btn.addEventListener('click',()=>{
            const connect=[...document.querySelectorAll('button')].find(b=>clean(b.textContent).includes('connect wallet') && b.closest('.topbar'));
            if(connect) connect.click();
          },{once:false});
        }
      }
      if(text==='refresh board' || text==='refreshing…' || text==='refreshing...'){
        btn.classList.add('hb-refresh');
        if(!btn.querySelector('svg')) btn.insertAdjacentHTML('afterbegin',refreshSvg);
      }
    });
    document.querySelectorAll('textarea').forEach(t=>{
      const card=t.closest('.card');
      if(card){card.classList.add('hb-write-area')}
    });
  }
  decorate();
  new MutationObserver(decorate).observe(document.body,{subtree:true,childList:true,characterData:true});
})();