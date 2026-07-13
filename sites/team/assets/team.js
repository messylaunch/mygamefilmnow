/* ============================================================
   GameFilmNow film room — demo data + shared behavior
   Logged-in demo user: Zach Riddle (#22 RB, Eagles 12U)
   ============================================================ */
const FR = {
  me: { name:"Zach Riddle", num:22, pos:"RB", team:"Lakeland Eagles 12U", initials:"ZR" },

  /* roster powers @mention search — every pick links to a profile */
  roster: [
    { name:"Zach Riddle",    num:22, pos:"RB" },
    { name:"Antoine Carter", num:7,  pos:"QB" },
    { name:"DeShawn Willis", num:11, pos:"WR" },
    { name:"Marcus Lee",     num:55, pos:"OL" },
    { name:"Tommy Vega",     num:30, pos:"LB" },
    { name:"Coach Mike",     num:0,  pos:"COACH" }
  ],
  handle(p){ return '@'+p.name.replace(/\s+/g,''); },

  /* turn @Handles into clickable profile links */
  linkMentions(text){
    return text.replace(/@([A-Za-z][\w]*)/g, (m,h)=>{
      const p=this.roster.find(r=>r.name.replace(/\s+/g,'').toLowerCase()===h.toLowerCase());
      return p? `<a class="mention" href="profile.html" title="${p.name}${p.num?' #'+p.num:''} · ${p.pos}">@${h}</a>` : `<span class="mention">@${h}</span>`;
    });
  },

  /* @mention popover: type @ in an input → live player search with
     position filter chips; click to insert, linked to their profile */
  attachMentions(input){
    const box=input.closest('.comment-box')||input.parentNode;
    let pop=null, posFilter='ALL';
    const positions=['ALL','QB','RB','WR','OL','LB','COACH'];
    const close=()=>{ if(pop){pop.remove();pop=null;} };
    const token=()=>{ const m=input.value.slice(0,input.selectionStart??input.value.length).match(/@([\w]*)$/); return m?m[1]:null; };
    const render=()=>{
      const q=token();
      if(q===null){ close(); return; }
      const opts=FR.roster.filter(p=>(posFilter==='ALL'||p.pos===posFilter) && p.name.toLowerCase().includes(q.toLowerCase()));
      if(!pop){ pop=document.createElement('div'); pop.className='mention-pop'; box.appendChild(pop); }
      pop.innerHTML=
        `<div class="combo-filters">${positions.map(x=>`<button type="button" data-p="${x}" class="${x===posFilter?'on':''}">${x}</button>`).join('')}</div>`
        + (opts.length? opts.map((p,i)=>`<div class="mention-item" data-i="${i}">
            <span class="mi-num">${p.num||'C'}</span><span><b>${p.name}</b></span><small>${p.pos}</small></div>`).join('')
          : `<div class="combo-empty" style="padding:.8rem;color:var(--muted);font-size:.82rem;text-align:center">No players match</div>`);
      pop.querySelectorAll('.combo-filters button').forEach(b=>b.onmousedown=e=>{e.preventDefault();posFilter=b.dataset.p;render();});
      pop.querySelectorAll('.mention-item').forEach(el=>el.onmousedown=e=>{
        e.preventDefault(); const p=opts[+el.dataset.i];
        input.value=input.value.replace(/@[\w]*$/, FR.handle(p)+' ');
        close(); input.focus();
      });
    };
    input.addEventListener('input',render);
    input.addEventListener('keyup',e=>{ if(e.key==='Escape') close(); });
    input.addEventListener('blur',()=>setTimeout(close,180));
  },

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

  /* per-game play sets so film-room.html?g=<id> opens the RIGHT film */
  playsFor(gid){
    if(!gid || gid==='g2') return this.plays;
    const g=this.games.find(x=>x.id===gid);
    if(!g || g.status!=='ready') return this.plays;
    const labels=['Inside run','Toss sweep','Play action','Screen right','Kick return +18','QB keeper','Counter left','Jet sweep TD 🏈','Goal line stand','44 Lead'];
    const seed=gid.charCodeAt(1)+gid.length;
    return Array.from({length:6},(_,i)=>({
      n:i+seed+6,
      label:`${i%2?'2nd':'1st'} & ${(i*3+seed)%9+1} — ${labels[(i+seed)%labels.length]}`,
      likes:(i*seed*7)%23+1, comments:(i+seed)%6, coachQ:i===2, taggedMe:(i+seed)%3===0
    }));
  },

  state(k,d){ try{ return JSON.parse(localStorage.getItem('fr_'+k)) ?? d; }catch(e){ return d; } },
  save(k,v){ localStorage.setItem('fr_'+k, JSON.stringify(v)); },

  header(active, who){
    who = who || { initials:this.me.initials, name:this.me.name, bell:4 };
    return `<div class="demo-banner">🚧 DEMO TEMPLATE — sample film room; player, coach &amp; scout views all shown in one nav (real app scopes by login). This becomes team.mygamefilmnow.com.</div>
    <header class="site-header"><div class="container nav">
      <a class="logo" href="index.html"><span class="logo-mark">▶</span>GameFilm<small style="color:var(--gold)">Now</small>&nbsp;<span class="logo-suffix" style="font-weight:600;color:var(--muted);font-size:.8rem">FILM ROOM</span></a>
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
        <a class="nav-bell" href="index.html#notifications" title="Notifications">🔔<span class="dot">${who.bell}</span></a>
        <a class="nav-avatar" href="profile.html" title="${who.name}">${who.initials}</a>
      </div>
    </div></header>`;
  },

  /* Kid-safe paywall: kids never enter a card. The purchase request goes to
     the PARENT, who approves on their own account/phone — then it unlocks. */
  paywallCheckout(title, sub, price, key, onDone){
    let back=document.getElementById('frModal');
    if(!back){ back=document.createElement('div'); back.id='frModal'; back.className='modal-back'; document.body.appendChild(back); }
    back.innerHTML=`<div class="modal">
      <div class="modal-head"><div><h3>${title}</h3><small>${sub}</small></div><button class="modal-x" onclick="document.getElementById('frModal').classList.remove('open')">✕</button></div>
      <div class="modal-body">
        <div class="summary-line"><span>${title}</span><span>$${price.toFixed(2)}</span></div>
        <div class="summary-line total"><span>Total</span><span>$${price.toFixed(2)}</span></div>
        <p style="font-size:.9rem;color:var(--muted);margin:1rem 0">You're signed in as a player, so this goes to your parent first — <b style="color:var(--ink)">Maria Riddle (mom)</b> gets a text + email to approve it. The moment she says yes, it unlocks right here.</p>
        <button class="btn btn-primary btn-block btn-lg" id="frAsk">Send request to Mom 📲</button>
        <p class="stripe-note">🛡️ Kids never enter card details on GameFilmNow. Parents approve and pay from their own account.</p>
      </div></div>`;
    back.classList.add('open');
    back.querySelector('#frAsk').onclick=()=>{
      back.querySelector('.modal-body').innerHTML=`<div style="text-align:center;padding:1rem 0">
        <div class="success-check">📲</div><h3>Request sent!</h3>
        <p style="color:var(--muted);font-size:.92rem;margin:.5rem 0 1.2rem">Mom just got the approval link. You'll get a notification the second she approves.</p>
        <button class="btn btn-primary btn-block" id="frApprove">Demo: simulate parent approving ✓</button></div>`;
      back.querySelector('#frApprove').onclick=()=>{
        FR.save(key,true);
        back.classList.remove('open'); if(onDone) onDone();
      };
    };
  }
};
