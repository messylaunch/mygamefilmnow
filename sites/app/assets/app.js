/* ============================================================
   GameFilmNow store — demo data + shared behavior
   Static template: replace with real API in Phase 1.
   Purchases persist in localStorage so buy→watch feels real.
   ============================================================ */

/* ---------- GFX: auto-generated logos & matchup art ----------
   Every team gets an auto shield logo from its colors + initials.
   Game art is auto-composed from the two team logos (with an
   upload-custom option in the game editor). Swap for real logo
   uploads in Phase 1 — same slots. */
const GFX = {
  shieldGroup(abbr,c1,c2,id){
    return `<defs><linearGradient id="lg${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <path d="M50 3 L92 17 V52 C92 79 73 93 50 98 C27 93 8 79 8 52 V17 Z" fill="url(#lg${id})" stroke="#ffffff" stroke-width="3.5"/>
      <path d="M50 10 L85 22 V52 C85 74 69 86 50 91 C31 86 15 74 15 52 V22 Z" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"/>
      <text x="50" y="60" text-anchor="middle" font-family="Anton,Arial Narrow,Impact,sans-serif" font-size="34" fill="#ffffff" letter-spacing="1">${abbr}</text>`;
  },
  logo(t,cls){
    const id = 'l'+t.abbr+Math.random().toString(36).slice(2,6);
    return `<svg ${cls?`class="${cls}"`:''} viewBox="0 0 100 100" role="img" aria-label="${t.name||t.abbr} logo">${this.shieldGroup(t.abbr,t.c1,t.c2,id)}</svg>`;
  },
  /* auto-composed matchup graphic: two logos, split field, big VS */
  matchup(a,b,label){
    const id = Math.random().toString(36).slice(2,7);
    return `<svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${a.abbr} vs ${b.abbr}">
      <defs>
        <linearGradient id="ma${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a.c1}"/><stop offset="1" stop-color="${a.c2}"/></linearGradient>
        <linearGradient id="mb${id}" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b.c1}"/><stop offset="1" stop-color="${b.c2}"/></linearGradient>
      </defs>
      <rect width="640" height="320" fill="#0a0a0c"/>
      <polygon points="0,0 372,0 268,320 0,320" fill="url(#ma${id})"/>
      <polygon points="372,0 640,0 640,320 268,320" fill="url(#mb${id})"/>
      <g stroke="rgba(255,255,255,.09)" stroke-width="2">
        <line x1="60" y1="0" x2="20" y2="320"/><line x1="140" y1="0" x2="100" y2="320"/>
        <line x1="540" y1="0" x2="580" y2="320"/><line x1="460" y1="0" x2="500" y2="320"/>
      </g>
      <polygon points="384,0 396,0 292,320 280,320" fill="#0a0a0c"/>
      <polygon points="376,0 384,0 280,320 272,320" fill="#ffd200"/>
      <g transform="translate(105,88) scale(1.45)">${this.shieldGroup(a.abbr,a.c1,a.c2,'sa'+id)}</g>
      <g transform="translate(390,88) scale(1.45)">${this.shieldGroup(b.abbr,b.c1,b.c2,'sb'+id)}</g>
      <text x="320" y="70" text-anchor="middle" font-family="Anton,Arial Narrow,Impact,sans-serif" font-size="46" fill="#ffd200" stroke="#0a0a0c" stroke-width="1.5" letter-spacing="2">VS</text>
      ${label?`<rect x="205" y="272" width="230" height="32" rx="6" fill="rgba(10,10,12,.82)"/><text x="320" y="294" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="800" font-size="15" fill="#fff" letter-spacing="1">${label}</text>`:''}
    </svg>`;
  },
  /* monogram tile for sponsors/merch */
  mono(letters,c1,c2){
    const id='mn'+Math.random().toString(36).slice(2,6);
    return `<svg viewBox="0 0 100 100" role="img"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
      <rect width="100" height="100" rx="18" fill="url(#${id})"/>
      <text x="50" y="63" text-anchor="middle" font-family="Anton,Arial Narrow,Impact,sans-serif" font-size="36" fill="#fff">${letters}</text></svg>`;
  }
};

const GFN = {
  teams: {
    "eagles12u": { id:"eagles12u", name:"Lakeland Eagles", abbr:"LE", c1:"#1e8a3c", c2:"#0b3d1a", squad:"12U", league:"Mid-Florida Youth League", city:"Lakeland, FL", record:"6–1",
      sponsors:[{n:"Papa's Pizza Co.",m:"PP",c1:"#c2410c",c2:"#7c2d12"},{n:"Lakeland Auto Group",m:"LA",c1:"#334155",c2:"#0f172a"},{n:"Sunshine Dental",m:"SD",c1:"#0284c7",c2:"#075985"}],
      roster:[{num:22,name:"Zach Riddle",pos:"RB"},{num:7,name:"Antoine Carter",pos:"QB"},{num:55,name:"Marcus Lee",pos:"OL"},{num:11,name:"DeShawn Willis",pos:"WR"},{num:30,name:"Tommy Vega",pos:"LB"}],
      merch:[{n:"Eagles Hoodie",p:38,m:"HD"},{n:"Game Day Tee",p:22,m:"TE"},{n:"Eagles Cap",p:25,m:"CP"}],
      teamPass:49.99 },
    "storm12u": { id:"storm12u", name:"Winter Haven Storm", abbr:"WS", c1:"#2563eb", c2:"#101d4d", squad:"12U", league:"Mid-Florida Youth League", city:"Winter Haven, FL", record:"5–2",
      sponsors:[{n:"Haven Hardware",m:"HH",c1:"#b45309",c2:"#713f12"}], roster:[{num:4,name:"Jayden Brooks",pos:"QB"},{num:21,name:"Chris Otero",pos:"RB"}],
      merch:[{n:"Storm Tee",p:20,m:"TE"}], teamPass:49.99 },
    "rams10u": { id:"rams10u", name:"Auburndale Rams", abbr:"AR", c1:"#dc2626", c2:"#5f1111", squad:"10U", league:"Mid-Florida Youth League", city:"Auburndale, FL", record:"3–4",
      sponsors:[], roster:[{num:9,name:"Eli Turner",pos:"WR"}], merch:[], teamPass:44.99 }
  },

  /* opponents without a GFN account get an auto gray badge */
  oppTeam(name){
    const abbr = name.split(' ').filter(w=>/^[A-Z]/.test(w)).map(w=>w[0]).slice(0,2).join('') || name.slice(0,2).toUpperCase();
    return { name, abbr, c1:"#4b5563", c2:"#1f2937" };
  },
  matchupFor(g){
    const home=this.teams[g.home];
    const away=g.awayId?this.teams[g.awayId]:this.oppTeam(g.awayName);
    return GFX.matchup(home,away,g.customImg?null:undefined);
  },

  // status: upcoming | live | processing (game over, recording being edited) | recording (on sale)
  games: {
    "g1": { id:"g1", home:"eagles12u", awayName:"Winter Haven Storm 12U", awayId:"storm12u", event:"Fall Season 2026",
            date:"2026-07-10", time:"7:00 PM", status:"upcoming", stream:9.99, recording:7.99, bundle:14.99,
            streamStart:"2026-07-10T19:00", streamEnd:"2026-07-10T21:30", venue:"Bryant Stadium Field 2" },
    "g2": { id:"g2", home:"eagles12u", awayName:"Auburndale Rams 12U", awayId:null, event:"Fall Season 2026",
            date:"2026-07-04", time:"6:00 PM", status:"recording", stream:null, recording:7.99, bundle:null,
            score:"W 21–14", venue:"Bryant Stadium Field 1" },
    "g3": { id:"g3", home:"eagles12u", awayName:"Plant City Raiders 12U", awayId:null, event:"Winter Haven Classic — Round 2",
            date:"2026-06-28", time:"1:00 PM", status:"recording", stream:null, recording:7.99, bundle:null,
            score:"W 28–7", venue:"Chain O' Lakes Complex" },
    "g4": { id:"g4", home:"storm12u", awayName:"Bartow Bulldogs 12U", awayId:null, event:"Fall Season 2026",
            date:"2026-07-11", time:"11:00 AM", status:"upcoming", stream:9.99, recording:7.99, bundle:14.99,
            streamStart:"2026-07-11T11:00", streamEnd:"2026-07-11T13:30", venue:"Denison Stadium" },
    "g5": { id:"g5", home:"eagles12u", awayName:"Mulberry Panthers 12U", awayId:null, event:"Fall Season 2026",
            date:"2026-07-05", time:"9:00 AM", status:"processing", stream:null, recording:7.99, bundle:null,
            score:"W 14–6", venue:"Bryant Stadium Field 2" },
    "g6": { id:"g6", home:"rams10u", awayName:"Lake Wales Hornets 10U", awayId:null, event:"Fall Season 2026",
            date:"2026-07-12", time:"2:00 PM", status:"upcoming", stream:9.99, recording:7.99, bundle:14.99,
            streamStart:"2026-07-12T14:00", streamEnd:"2026-07-12T16:30", venue:"Auburndale City Park" },
    "g7": { id:"g7", home:"eagles12u", awayName:"Kathleen Chiefs 12U", awayId:null, event:"Winter Haven Classic — Round 1",
            date:"2026-06-27", time:"9:00 AM", status:"recording", stream:null, recording:7.99, bundle:null,
            score:"W 20–13", venue:"Chain O' Lakes Complex" }
  },

  tournament: {
    id:"whc2026", name:"Winter Haven Classic 2026", dates:"Jun 27–29, 2026", venue:"Chain O' Lakes Complex",
    rounds:[ {label:"Round 1 · Sat Jun 27", games:["g7"]}, {label:"Round 2 · Sun Jun 28", games:["g3"]}, {label:"Championship · Mon Jun 29", games:[]} ],
    passes:[ {team:"eagles12u", price:19.99}, {team:"storm12u", price:19.99} ]
  },

  /* ---- purchases (demo persistence) ---- */
  owned(key){ return (JSON.parse(localStorage.getItem("gfn_owned")||"[]")).includes(key); },
  buy(key){ const o=JSON.parse(localStorage.getItem("gfn_owned")||"[]"); if(!o.includes(key)){o.push(key);localStorage.setItem("gfn_owned",JSON.stringify(o));} },
  ownedList(){ return JSON.parse(localStorage.getItem("gfn_owned")||"[]"); },

  statusTag(g){
    const map={ live:['st-live','● LIVE'], upcoming:['st-up','Upcoming'], processing:['st-proc','Editing — recording in ~72h'], recording:['st-rec','Recording available'] };
    const m=map[g.status]; return `<span class="status-tag ${m[0]}">${m[1]}</span>`;
  },

  gameCard(g, reason){
    const t=this.teams[g.home];
    const badge={live:'live',upcoming:'upcoming',processing:'processing',recording:'recording'}[g.status];
    const badgeTxt={live:'● LIVE',upcoming:'UPCOMING',processing:'EDITING',recording:'RECORDING'}[g.status];
    const price=g.status==='upcoming'?`$${g.stream}`:(g.status==='recording'?`$${g.recording}`:'—');
    const d=new Date(g.date+"T12:00:00");
    return `<a class="game-card" href="game.html?id=${g.id}">
      <div class="gc-media"><span class="gc-badge ${badge}">${badgeTxt}</span>${this.matchupFor(g)}</div>
      <div class="gc-body">${reason?`<span class="gc-reason">Because you follow ${reason}</span>`:''}
        <b>${t.name} ${t.squad} vs ${g.awayName}</b>
        <small>${g.event} · ${d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})} · ${g.time}${g.score?` · Final ${g.score}`:''}</small>
        <div class="gc-foot"><span class="gc-price">${price}</span><span class="btn btn-primary" style="padding:.4rem .9rem;font-size:.8rem">${g.status==='recording'?'Watch':'View'} →</span></div>
      </div></a>`;
  },

  /* ---- checkout modal ---- */
  openCheckout(title, sub, price, key, onDone){
    let back=document.getElementById('gfnModal');
    if(!back){ back=document.createElement('div'); back.id='gfnModal'; back.className='modal-back'; document.body.appendChild(back); }
    back.innerHTML=`<div class="modal">
      <div class="modal-head"><div><h3>${title}</h3><small>${sub}</small></div><button class="modal-x" onclick="document.getElementById('gfnModal').classList.remove('open')">✕</button></div>
      <div class="modal-body">
        <div class="summary-line"><span>${title}</span><span>$${price.toFixed(2)}</span></div>
        <div class="summary-line total"><span>Total</span><span>$${price.toFixed(2)}</span></div>
        <div class="field" style="margin-top:1rem"><label>Card number</label><input placeholder="4242 4242 4242 4242" inputmode="numeric"></div>
        <div class="field-row"><div class="field"><label>Expiry</label><input placeholder="MM / YY"></div><div class="field"><label>CVC</label><input placeholder="123"></div></div>
        <button class="btn btn-primary btn-block btn-lg" id="gfnPay">Pay $${price.toFixed(2)} &amp; Watch Now</button>
        <p class="stripe-note">🔒 Demo checkout. Phase 1 swaps this for Stripe — payment and video unlock stay on this page.</p>
      </div></div>`;
    back.classList.add('open');
    back.querySelector('#gfnPay').onclick=()=>{
      GFN.buy(key);
      back.querySelector('.modal-body').innerHTML=`<div style="text-align:center;padding:1rem 0">
        <div class="success-check">✓</div><h3>You're in!</h3>
        <p style="color:var(--muted);font-size:.92rem;margin:.5rem 0 1.2rem">Your video is unlocked on this page, saved in <b>My Games</b>, and we texted you the link so you can't lose it.</p>
        <button class="btn btn-primary btn-block" id="gfnDone">Start Watching ▶</button></div>`;
      back.querySelector('#gfnDone').onclick=()=>{ back.classList.remove('open'); if(onDone) onDone(); };
    };
  },

  /* ---- combobox: search-as-you-type with division filter + create ----
     attach to any input. getOptions() → [{id,label,sub,division,logoTeam}] */
  combo(input, getOptions, {divisions=['ALL','12U','10U','8U'], allowCreate=true, onPick=null, onCreate=null}={}){
    const wrap=document.createElement('div'); wrap.className='combo';
    input.parentNode.insertBefore(wrap,input); wrap.appendChild(input);
    const list=document.createElement('div'); list.className='combo-list'; list.style.display='none'; wrap.appendChild(list);
    let div='ALL';
    const render=()=>{
      const q=input.value.trim().toLowerCase();
      let opts=getOptions().filter(o=>div==='ALL'||o.division===div);
      if(q) opts=opts.filter(o=>(o.label+' '+(o.sub||'')).toLowerCase().includes(q));
      list.innerHTML =
        `<div class="combo-filters">${divisions.map(d=>`<button type="button" data-d="${d}" class="${d===div?'on':''}">${d==='ALL'?'All divisions':d}</button>`).join('')}</div>`
        + (opts.length? opts.map((o,i)=>`<div class="combo-item" data-i="${i}">
            ${o.logoTeam?`<span class="ci-logo">${GFX.logo(o.logoTeam)}</span>`:''}
            <span><b>${o.label}</b>${o.sub?`<small>${o.sub}</small>`:''}</span>
            ${o.division?`<span class="ci-div">${o.division}</span>`:''}</div>`).join('')
          : `<div class="combo-empty">No matches${q?` for “${input.value}”`:''}</div>`)
        + (allowCreate && q ? `<div class="combo-item create"><span class="ci-plus">＋</span><span><b>Create “${input.value}”</b><small>new team — opens quick setup</small></span></div>` : '');
      list.querySelectorAll('.combo-filters button').forEach(b=>b.onclick=e=>{e.stopPropagation();div=b.dataset.d;render();});
      list.querySelectorAll('.combo-item:not(.create)').forEach(el=>el.onmousedown=e=>{
        e.preventDefault(); const o=opts[+el.dataset.i];
        input.value=o.label; list.style.display='none';
        if(onPick) onPick(o);
      });
      const cr=list.querySelector('.combo-item.create');
      if(cr) cr.onmousedown=e=>{ e.preventDefault(); list.style.display='none';
        if(onCreate) onCreate(input.value);
        else alert(`Demo: quick-create opens — "${input.value}" gets a squad (division), league, city, and an auto-generated logo, then it's immediately pickable everywhere.`); };
    };
    input.addEventListener('focus',()=>{list.style.display='';render();});
    input.addEventListener('input',render);
    input.addEventListener('blur',()=>setTimeout(()=>list.style.display='none',150));
  },
  squadOptions(){
    return Object.values(this.teams).map(t=>({id:t.id,label:`${t.name} ${t.squad}`,sub:`${t.league} · ${t.city}`,division:t.squad,logoTeam:t}));
  },

  header(active){
    const owned=this.ownedList().length;
    return `<div class="demo-banner">🚧 DEMO TEMPLATE — sample data, demo checkout. This becomes app.mygamefilmnow.com.</div>
    <header class="site-header app-nav"><div class="container nav">
      <a class="logo" href="index.html"><span class="logo-mark">▶</span>GameFilm<small>Now</small></a>
      <button class="nav-toggle" aria-label="Menu" onclick="document.querySelector('.nav-links').classList.toggle('open')">☰</button>
      <nav class="nav-links">
        <a href="index.html" class="${active==='browse'?'active':''}">Browse Games</a>
        <a href="tournament.html" class="${active==='tournaments'?'active':''}">Tournaments</a>
        <a href="account.html" class="${active==='account'?'active':''}">My Games${owned?` (${owned})`:''}</a>
        <a href="coach.html" class="${active==='coach'?'active':''}">Coach Tools</a>
        <a href="admin.html" class="${active==='admin'?'active':''}">Admin</a>
      </nav>
      <div class="nav-account">
        <a class="nav-bell" href="account.html#notifications" title="Notifications">🔔<span class="dot">3</span></a>
        <a class="nav-avatar" href="account.html" title="My Account">JS</a>
      </div>
    </div></header>`;
  }
};
