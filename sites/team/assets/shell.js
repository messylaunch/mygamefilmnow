/* ============================================================
   FILM ROOM app shell — top bar (team switcher + bell),
   bottom tab bar / left rail, notification sheet, shutter
   page transitions. Mount with FRShell.mount('home'|'film'|
   'reel'|'profile'|'coach').
   ============================================================ */
const FRShell = {
  teams: [
    { id:"eagles12u", name:"Lakeland Eagles", squad:"12U", c1:"#1e8a3c", c2:"#0b3d1a", abbr:"LE", note:"3 games on film" },
    { id:"allstars",  name:"Polk All-Stars",  squad:"12U", c1:"#7c3aed", c2:"#2e1065", abbr:"PA", note:"tournament squad · 1 game in editing" }
  ],
  team(){ const id=localStorage.getItem('fr_team')||'eagles12u'; return this.teams.find(t=>t.id===id)||this.teams[0]; },
  setTeam(id){ localStorage.setItem('fr_team',id); location.reload(); },

  crest(t,size){ return `<svg viewBox="0 0 100 100" style="width:${size}px;height:${size}px"><defs><linearGradient id="sw${t.id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.c1}"/><stop offset="1" stop-color="${t.c2}"/></linearGradient></defs><path d="M50 3 L92 17 V52 C92 79 73 93 50 98 C27 93 8 79 8 52 V17 Z" fill="url(#sw${t.id})" stroke="#fff" stroke-width="4"/><text x="50" y="62" text-anchor="middle" font-family="Anton,Arial Narrow,Impact,sans-serif" font-size="32" fill="#fff">${t.abbr}</text></svg>`; },

  icons: {
    home:'<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
    film:'<svg viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M7 4.5v15M17 4.5v15M2.5 9.5H7M2.5 14.5H7M17 9.5h4.5M17 14.5h4.5"/><path d="M10.5 9.8l4 2.2-4 2.2z"/></svg>',
    reel:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="7" r="1.4"/><circle cx="12" cy="17" r="1.4"/><circle cx="7" cy="12" r="1.4"/><circle cx="17" cy="12" r="1.4"/><path d="M20 20l2.5 2.5"/></svg>',
    profile:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.5-3.8 4.2-5.5 7.5-5.5s6 1.7 7.5 5.5"/></svg>',
    coach:'<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/><path d="M7 13.5l3-3 2.5 2 4-4.5"/><circle cx="16.5" cy="8" r="0.5"/></svg>'
  },

  notifs: [
    { i:"❓", unread:1, t:"<b>Coach Mike asked on Play 14:</b> \"What hole should we hit here?\"", s:"vs Rams · 3h ago · <a href='film-room.html'>answer in the film room →</a>" },
    { i:"💬", unread:1, t:"<b>@DeShawn tagged you</b> on Play 15: \"that cut was nasty 🔥\"", s:"vs Rams · 5h ago" },
    { i:"🎞️", unread:1, t:"<b>Fresh film:</b> vs Auburndale Rams — 64 cuts ready.", s:"1d ago · parents notified too" },
    { i:"⭐", unread:1, t:"<b>John Smith</b> (your uncle) started following you.", s:"2d ago" },
    { i:"📌", unread:0, t:"<b>Coach note:</b> \"@RunningBacks watch your landmarks on 14 before Tuesday.\"", s:"2d ago" }
  ],

  mount(active){
    document.documentElement.classList.add('fr-shell');
    const t=this.team();
    const unread=this.notifs.filter(n=>n.unread).length;
    const tabs=[['home','Home','index.html'],['film','Film','film-room.html'],['reel','Reel','highlights.html'],['profile','Profile','profile.html'],['coach','Coach','coach.html']];
    const el=document.createElement('div');
    el.innerHTML=`
    <div class="demo-banner">🚧 DEMO · Film Room app template → team.mygamefilmnow.com</div>
    <header class="fr-top">
      <button class="team-pill" id="teamPill" aria-label="Switch team">
        <span class="tp-crest">${this.crest(t,30)}</span>
        <span><b>${t.name}</b><small>${t.squad} · tap to switch</small></span>
        <span class="tp-chev">▼</span>
      </button>
      <span class="fr-spacer"></span>
      <a class="fr-brand" href="index.html"><span class="rec-dot"></span>Film<small>Room</small></a>
      <span class="fr-spacer"></span>
      <button class="fr-bell" id="frBell" aria-label="Notifications">🔔${unread?`<span class="dot">${unread}</span>`:''}</button>
    </header>

    <nav class="fr-tabs" aria-label="App">
      ${tabs.map(([k,label,href])=>`<a class="fr-tab ${k===active?'on':''}" href="${href}" ${k===active?'aria-current="page"':''}>${this.icons[k]}${label}</a>`).join('')}
    </nav>

    <div class="fr-sheet-back" id="sheetBack"></div>
    <div class="fr-sheet" id="notifSheet" role="dialog" aria-label="Notifications">
      <div class="grab"></div>
      <div class="fr-sheet-head"><h3>Notifications</h3><button data-close aria-label="Close">✕</button></div>
      <div class="fr-sheet-body">
        ${this.notifs.map(n=>`<div class="notif ${n.unread?'unread':''}"><div class="notif-icon">${n.i}</div><div>${n.t}<small>${n.s}</small></div></div>`).join('')}
        <p style="padding:.9rem 1.2rem;font-size:.75rem;color:var(--muted)">🛡️ Texts &amp; emails go to your parent — you get everything right here.</p>
      </div>
    </div>
    <div class="fr-sheet" id="teamSheet" role="dialog" aria-label="Switch team">
      <div class="grab"></div>
      <div class="fr-sheet-head"><h3>Your Teams</h3><button data-close aria-label="Close">✕</button></div>
      <div class="fr-sheet-body">
        ${this.teams.map(x=>`<div class="sw-row" data-team="${x.id}"><span class="sw-crest">${this.crest(x,40)}</span><span><b>${x.name} ${x.squad}</b><small>${x.note}</small></span>${x.id===t.id?'<span class="on-badge">CURRENT</span>':''}</div>`).join('')}
        <p style="padding:.9rem 1.2rem;font-size:.75rem;color:var(--muted)">Added to a new team? It shows up here as soon as your coach adds you to the roster.</p>
      </div>
    </div>
    <div class="fr-shutter"><span class="fl"></span></div>`;
    document.body.prepend(el);

    /* sheets */
    const back=document.getElementById('sheetBack');
    const open=id=>{ back.classList.add('open'); document.getElementById(id).classList.add('open'); };
    const closeAll=()=>{ back.classList.remove('open'); document.querySelectorAll('.fr-sheet').forEach(s=>s.classList.remove('open')); };
    document.getElementById('frBell').onclick=()=>open('notifSheet');
    document.getElementById('teamPill').onclick=()=>open('teamSheet');
    back.onclick=closeAll;
    document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeAll);
    document.querySelectorAll('.sw-row').forEach(r=>r.onclick=()=>{ const id=r.dataset.team; if(id!==t.id) FRShell.setTeam(id); else closeAll(); });
    addEventListener('keydown',e=>{ if(e.key==='Escape') closeAll(); });

    /* shutter transitions between app pages */
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduced){
      if(sessionStorage.getItem('fr_nav')){
        sessionStorage.removeItem('fr_nav');
        document.documentElement.classList.add('entering');
        setTimeout(()=>document.documentElement.classList.remove('entering'),650);
      }
      document.addEventListener('click',e=>{
        const a=e.target.closest('a[href]');
        if(!a) return;
        const h=a.getAttribute('href');
        if(!h||!h.endsWith('.html')&&!h.includes('.html?')) return;
        if(h.startsWith('http')) return;
        e.preventDefault();
        sessionStorage.setItem('fr_nav','1');
        document.documentElement.classList.add('leaving');
        setTimeout(()=>{ location.href=h; },300);
      });
    }
  }
};
