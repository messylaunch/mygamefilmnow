/* ============================================================
   GameFilmNow film room — demo data + shared behavior
   Logged-in demo user: Zach Riddle (#22 RB, Eagles 12U)
   ============================================================ */
const FR = {
  me: { name:"Zach Riddle", num:22, pos:"RB", team:"Lakeland Eagles 12U", initials:"ZR" },

  games: [
    { id:"g2", label:"vs Auburndale Rams 12U", date:"Jul 4", event:"Fall Season 2026", score:"W 21–14", plays:64, status:"ready", myTags:6 },
    { id:"g3", label:"vs Plant City Raiders 12U", date:"Jun 28", event:"WH Classic — Rd 2", score:"W 28–7", plays:71, status:"ready", myTags:9 },
    { id:"g7", label:"vs Kathleen Chiefs 12U", date:"Jun 27", event:"WH Classic — Rd 1", score:"W 20–13", plays:58, status:"ready", myTags:4 },
    { id:"g5", label:"vs Mulberry Panthers 12U", date:"Jul 5", event:"Fall Season 2026", score:"W 14–6", plays:0, status:"editing", myTags:0 }
  ],

  plays: [
    { n:12, label:"1st & 10 — Inside run", likes:4, comments:1, coachQ:false, taggedMe:false },
    { n:13, label:"2nd & 7 — Screen left", likes:7, comments:2, coachQ:false, taggedMe:true },
    { n:14, label:"2nd & 6 — 44 Lead", likes:8, comments:3, coachQ:true, taggedMe:false },
    { n:15, label:"44 Sweep — TD! 🏈", likes:22, comments:9, coachQ:false, taggedMe:true },
    { n:16, label:"Kickoff coverage", likes:2, comments:1, coachQ:false, taggedMe:false },
    { n:17, label:"1st & 10 — Play action", likes:5, comments:0, coachQ:false, taggedMe:false }
  ],

  state(k,d){ try{ return JSON.parse(localStorage.getItem('fr_'+k)) ?? d; }catch(e){ return d; } },
  save(k,v){ localStorage.setItem('fr_'+k, JSON.stringify(v)); },

  header(active){
    return `<div class="demo-banner">🚧 DEMO TEMPLATE — sample film room, demo data. This becomes team.mygamefilmnow.com.</div>
    <header class="site-header"><div class="container nav">
      <a class="logo" href="index.html"><span class="logo-mark">▶</span>GameFilm<small style="color:var(--gold)">Now</small>&nbsp;<span style="font-weight:600;color:var(--muted);font-size:.8rem">FILM ROOM</span></a>
      <button class="nav-toggle" aria-label="Menu" style="color:var(--ink)" onclick="document.querySelector('.nav-links').classList.toggle('open')">☰</button>
      <nav class="nav-links">
        <a href="index.html" class="${active==='home'?'active':''}">My Team</a>
        <a href="film-room.html" class="${active==='film'?'active':''}">Film Room</a>
        <a href="highlights.html" class="${active==='highlights'?'active':''}">My Highlights</a>
        <a href="profile.html" class="${active==='profile'?'active':''}">My Profile</a>
        <a href="coach.html" class="${active==='coach'?'active':''}">Coach View</a>
        <a href="scout.html" class="${active==='scout'?'active':''}">Scout View</a>
      </nav>
      <div class="nav-account">
        <a class="nav-bell" href="index.html#notifications" title="Notifications">🔔<span class="dot">4</span></a>
        <a class="nav-avatar" href="profile.html" title="${this.me.name}">${this.me.initials}</a>
      </div>
    </div></header>`;
  },

  paywallCheckout(title, sub, price, key, onDone){
    let back=document.getElementById('frModal');
    if(!back){ back=document.createElement('div'); back.id='frModal'; back.className='modal-back'; document.body.appendChild(back); }
    back.innerHTML=`<div class="modal">
      <div class="modal-head"><div><h3>${title}</h3><small>${sub}</small></div><button class="modal-x" onclick="document.getElementById('frModal').classList.remove('open')">✕</button></div>
      <div class="modal-body">
        <div class="summary-line"><span>${title}</span><span>$${price.toFixed(2)}</span></div>
        <div class="summary-line total"><span>Total</span><span>$${price.toFixed(2)}</span></div>
        <div class="field" style="margin-top:1rem"><label>Card number</label><input placeholder="4242 4242 4242 4242"></div>
        <div class="field-row"><div class="field"><label>Expiry</label><input placeholder="MM / YY"></div><div class="field"><label>CVC</label><input placeholder="123"></div></div>
        <button class="btn btn-primary btn-block btn-lg" id="frPay">Pay $${price.toFixed(2)}</button>
        <p class="stripe-note">🔒 Demo checkout — Stripe in the real build. Purchases bill the PARENT account on file.</p>
      </div></div>`;
    back.classList.add('open');
    back.querySelector('#frPay').onclick=()=>{
      FR.save(key,true);
      back.querySelector('.modal-body').innerHTML=`<div style="text-align:center;padding:1rem 0">
        <div class="success-check">✓</div><h3>Unlocked!</h3>
        <p style="color:var(--muted);font-size:.92rem;margin:.5rem 0 1.2rem">Receipt sent to your parent's email.</p>
        <button class="btn btn-primary btn-block" id="frDone">Let's go ▶</button></div>`;
      back.querySelector('#frDone').onclick=()=>{ back.classList.remove('open'); if(onDone) onDone(); };
    };
  }
};
