/* GitHub Pages visual layer. Kept separate from the app bundle so Pages can
   receive a design refresh without changing wallet or contract behaviour. */
(() => {
  const css = `
    .topbar{position:relative!important;min-height:95px!important;padding:16px 28px!important;background:rgba(5,9,18,.88)!important}
    .brand-mark{width:45px!important;height:45px!important;border-radius:12px!important}.brand-name{font-size:19px!important}.brand-badge{padding:4px 12px!important}.topbar-right{gap:18px!important}
    .network-pill{min-height:45px!important;padding:0 20px!important;font-family:Inter,system-ui,sans-serif!important;font-size:14px!important;color:#f5f7fb!important;background:rgba(10,14,24,.75)!important;border-color:rgba(167,181,210,.28)!important}.network-pill .pill-dot{width:8px!important;height:8px!important;background:#3b76ff!important}
    .topbar .connect-btn,.topbar .btn-primary{min-height:45px!important;height:45px!important;padding:0 24px!important;border-radius:999px!important}.connect-btn .wallet-icon{width:auto!important;height:auto!important;background:none!important;border:0!important;box-shadow:none!important}
    .app{max-width:1390px!important;padding:13px 28px 24px!important}.hero{margin-bottom:33px!important}.hero-sub{max-width:none!important;margin:0 auto 22px!important;font-size:18px!important;line-height:1.85!important;color:#b7c0d4!important}.hero-badges{gap:10px!important}.hero-badge{min-height:44px!important;padding:0 18px!important;font-size:16px!important;color:#c5ccdb!important;background:rgba(8,12,21,.72)!important;border-color:rgba(164,178,208,.18)!important}.hero-badge svg{width:18px!important;height:18px!important;color:#b7c0d4!important}
    .grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:23px!important}.card{border-radius:29px!important;padding:29px 30px!important;background:linear-gradient(140deg,rgba(31,37,51,.78),rgba(12,16,25,.9))!important;border-color:rgba(161,176,207,.2)!important}.card:hover{transform:none!important}.card--hero{min-height:620px!important;padding-top:31px!important;background:radial-gradient(75% 75% at 17% 47%,rgba(0,82,255,.16),transparent 58%),linear-gradient(140deg,rgba(27,33,46,.84),rgba(11,15,24,.94))!important}.side{gap:17px!important}.side .card:first-child{min-height:389px!important}.side .card:nth-child(2){min-height:262px!important}.card-label{margin-bottom:25px!important;font-size:14px!important;letter-spacing:.13em!important;color:#e4e7ee!important}.card-dot{width:12px!important;height:12px!important}
    .board-quote{margin-top:74px!important;margin-bottom:16px!important;font-size:61px!important}.board-message{font-size:43px!important;margin-bottom:23px!important;line-height:1.16!important}.board-meta{display:block!important;margin-bottom:0!important}.addr-chip{min-height:37px!important;padding:7px 14px!important;border-radius:999px!important;font-size:14px!important}.board-updates{display:flex!important;width:185px!important;padding-top:10px!important;margin-top:10px!important;border-top:1px solid rgba(255,255,255,.08)!important;font-family:Inter,system-ui,sans-serif!important;font-size:16px!important}.stats{margin-top:26px!important;gap:14px!important}.stat{min-height:101px!important;padding:19px 10px!important;border-radius:14px!important}.stat-value,.stat-writer{font-size:22px!important}.stat-label{margin-top:9px!important;font-size:12px!important}.board-actions{margin-top:21px!important;padding-top:27px!important}.board-hint{font-size:16px!important;color:#bdc6d8!important}.board-hint svg{display:none!important}.board-hint:before{content:""!important;width:11px!important;height:11px!important;border-radius:50%!important;background:#2bd9a8!important;box-shadow:0 0 12px rgba(43,217,168,.75)!important}.refresh-btn{min-height:47px!important;padding:0 27px!important;border-radius:999px!important;color:#f5f7fb!important;border-color:rgba(70,123,255,.85)!important}
    .write-hint{margin-bottom:17px!important;font-size:17px!important;line-height:1.7!important;color:#c0c8d9!important}.input-wrap textarea,.card textarea{min-height:138px!important;height:138px!important;padding:12px 13px 43px!important;border-radius:11px!important;font-size:17px!important;line-height:1.5!important;resize:none!important}.char-progress{display:none!important}.char-count{bottom:11px!important;right:12px!important;padding:7px 11px!important;font-size:14px!important;background:rgba(10,16,29,.86)!important;border:0!important}.write-btn,.card .btn-full{min-height:51px!important;height:51px!important;margin-top:21px!important;border-radius:999px!important}.btn-primary:disabled{color:#e8eeff!important;background:linear-gradient(105deg,#2457d7,#28419c 60%,#1d2b62)!important;border-color:#3a7bff!important;filter:none!important;opacity:1!important}.history-empty{min-height:151px!important;padding:22px 20px!important;font-size:16px!important;border-radius:16px!important}.history-empty svg{width:39px!important;height:39px!important;margin-bottom:7px!important}.footer{display:none!important}
    @media(max-width:900px){.topbar{min-height:76px!important}.app{padding:22px 16px 48px!important}.hero{margin-bottom:28px!important}.grid{grid-template-columns:1fr!important}.card--hero,.side .card:first-child,.side .card:nth-child(2){min-height:auto!important}.board-quote{margin-top:35px!important}}
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const apply = () => {
    const hero = document.querySelector('.hero');
    if (!hero || hero.dataset.referenceUi) return false;
    hero.dataset.referenceUi = 'true';
    hero.querySelector('.hero-eyebrow')?.remove();
    hero.querySelector('.hero-title')?.remove();
    const sub = hero.querySelector('.hero-sub');
    if (sub) sub.innerHTML = 'Leave your mark on Base.<br>Every message is public and permanent.';
    const writeButton = document.querySelector('.write-btn');
    if (writeButton && writeButton.textContent?.trim() === 'Save to blockchain') writeButton.textContent = 'Publish on-chain';
    return true;
  };
  if (!apply()) new MutationObserver(() => apply()).observe(document.getElementById('root'), { childList: true, subtree: true });
})();
