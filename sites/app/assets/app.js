/* ============================================================
   GameFilmNow store — demo data + shared behavior
   Static template: replace with real API in Phase 1.
   Purchases persist in localStorage so buy→watch feels real.
   ============================================================ */

const GFN = {
  teams: {
    "eagles12u": { id:"eagles12u", name:"Lakeland Eagles", squad:"12U", league:"Mid-Florida Youth League", city:"Lakeland, FL", crest:"🦅", record:"6–1",
      sponsors:[{n:"Papa's Pizza Co.",i:"🍕"},{n:"Lakeland Auto Group",i:"🚗"},{n:"Sunshine Dental",i:"🦷"}],
      roster:[{num:22,name:"Zach Riddle",pos:"RB"},{num:7,name:"Antoine Carter",pos:"QB"},{num:55,name:"Marcus Lee",pos:"OL"},{num:11,name:"DeShawn Willis",pos:"WR"},{num:30,name:"Tommy Vega",pos:"LB"}],
      merch:[{n:"Eagles Hoodie",p:38,i:"🧥"},{n:"Game Day Tee",p:22,i:"👕"},{n:"Eagles Cap",p:25,i:"🧢"}],
      teamPass:49.99 },
    "storm12u": { id:"storm12u", name:"Winter Haven Storm", squad:"12U", league:"Mid-Florida Youth League", city:"Winter Haven, FL", crest:"⛈️", record:"5–2",
      sponsors:[{n:"Haven Hardware",i:"🔨"}], roster:[{num:4,name:"Jayden Brooks",pos:"QB"},{num:21,name:"Chris Otero",pos:"RB"}],
      merch:[{n:"Storm Tee",p:20,i:"👕"}], teamPass:49.99 },
    "rams10u": { id:"rams10u", name:"Auburndale Rams", squad:"10U", league:"Mid-Florida Youth League", city:"Auburndale, FL", crest:"🐏", record:"3–4",
      sponsors:[], roster:[{num:9,name:"Eli Turner",pos:"WR"}], merch:[], teamPass:44.99 }
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
    const price=g.status==='upcoming'?`Stream $${g.stream}`:(g.status==='recording'?`$${g.recording}`:'—');
    const d=new Date(g.date+"T12:00:00");
    return `<a class="game-card" href="game.html?id=${g.id}">
      <div class="gc-media"><span class="gc-badge ${badge}">${badgeTxt}</span>
        <div class="vs">${t.name} ${t.squad}<small>vs ${g.awayName}</small></div></div>
      <div class="gc-body">${reason?`<span class="gc-reason">Because you follow ${reason}</span>`:''}
        <b>${g.event}</b>
        <small>${d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})} · ${g.time}${g.score?` · Final ${g.score}`:''} · ${g.venue}</small>
        <div class="gc-foot"><span class="gc-price">${price}</span><span class="btn btn-primary" style="padding:.4rem .9rem;font-size:.83rem">${g.status==='recording'?'Watch':'View'} →</span></div>
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
