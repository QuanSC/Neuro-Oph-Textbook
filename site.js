/* Shared enhancements for Neuro-Ophthalmology: An Interactive Textbook
   Text size, print, deep links, progress tracking, error reports.
   © 2026 Steven C. Quan. All rights reserved. */
(function(){
  var REPO="https://github.com/quansc/Neuro-Oph-Textbook";
  var page=(location.pathname.split("/").pop()||"index.html");
  var store={get:function(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},
             set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
             del:function(k){try{localStorage.removeItem(k)}catch(e){}}};

  /* ---------- styles ---------- */
  var css=`
  .toolbar{display:flex;gap:6px;justify-content:flex-end;align-items:center;margin:0 0 8px;font-size:.82rem;color:var(--muted)}
  .toolbar button{font:inherit;font-size:.82rem;padding:5px 10px;border-radius:8px;border:1.5px solid var(--stemline);background:var(--panel);color:var(--ink);cursor:pointer;min-width:34px}
  .toolbar button:focus-visible{outline:3px solid var(--inter);outline-offset:2px}
  .badge{display:inline-block;font-size:.74rem;font-weight:600;padding:2px 8px;border-radius:999px;margin-top:6px;background:color-mix(in srgb,var(--inter) 16%,transparent);color:var(--inter)}
  .badge.done{background:color-mix(in srgb,var(--ok,#2E7D4F) 18%,transparent);color:var(--ok,#2E7D4F)}
  @media print{
    :root{--bg:#fff;--panel:#fff;--ink:#000;--muted:#333;--stem:#e5e5e5;--stemline:#999;--halo:#fff}
    body{background:#fff!important;color:#000!important}
    nav.tabs,.toolbar,.modnav,.homelink,.reveal,.next,.nav2,.ctrl,.ctrl2,.acts,.chips,.modes,input[type=search],#resetQuiz,.slider{display:none!important}
    section.tab{display:block!important;break-before:page}
    section.tab:first-of-type{break-before:auto}
    .ans{display:block!important}
    .card,.panel,.trial,.cmprow{break-inside:avoid;border:1px solid #ccc}
    a{color:#000;text-decoration:none}
    main{max-width:none}
  }`;
  var st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

  /* ---------- text size ---------- */
  var scale=store.get("nok-scale")||1;
  function applyScale(){document.documentElement.style.fontSize=(scale*100)+"%";document.body.style.fontSize=(0.9375*scale)+"rem";}
  applyScale();
  var main=document.querySelector("main");
  if(main){
    var tb=document.createElement("div"); tb.className="toolbar"; tb.setAttribute("role","group"); tb.setAttribute("aria-label","Page tools");
    tb.innerHTML='<span>Text</span><button type="button" data-s="-" aria-label="Smaller text">A−</button><button type="button" data-s="0" aria-label="Reset text size">A</button><button type="button" data-s="+" aria-label="Larger text">A+</button><button type="button" data-p="1">Print or PDF</button>';
    var anchor=main.querySelector(".modnav");
    if(anchor) anchor.insertAdjacentElement("afterend",tb); else main.insertBefore(tb,main.firstChild);
    tb.addEventListener("click",function(e){var b=e.target.closest("button"); if(!b) return;
      if(b.dataset.p){window.print();return;}
      var s=b.dataset.s; scale = s==="+"?Math.min(1.4,scale+0.1): s==="-"?Math.max(0.85,scale-0.1):1;
      scale=Math.round(scale*100)/100; store.set("nok-scale",scale); applyScale();});
  }

  /* ---------- deep links to tabs ---------- */
  var tabs=document.querySelectorAll("nav.tabs button[data-tab]");
  if(tabs.length){
    function openTab(name){var b=document.querySelector('nav.tabs button[data-tab="'+name+'"]'); if(b){b.click(); return true;} return false;}
    tabs.forEach(function(b){b.addEventListener("click",function(){ if(history.replaceState) history.replaceState(null,"","#"+b.dataset.tab); });});
    var h=decodeURIComponent(location.hash.slice(1)); if(h) openTab(h);
    window.addEventListener("hashchange",function(){openTab(decodeURIComponent(location.hash.slice(1)));});
  }

  /* ---------- progress tracking ---------- */
  var isModule=/^module_\d+/.test(page);
  if(isModule){
    var key="nok-progress-"+page, prog=store.get(key)||{};
    prog.visited=true; store.set(key,prog);
    var ql=document.getElementById("quizList");
    function tally(){
      var cards=ql.querySelectorAll(".card"), answered=0, correct=0;
      cards.forEach(function(c){ if(c.querySelector(".opt:disabled")){answered++; if(!c.querySelector(".opt.wrong")) correct++;} });
      prog=store.get(key)||{}; prog.visited=true; prog.total=cards.length; prog.last={answered:answered,correct:correct};
      if(answered===cards.length && cards.length){ prog.completed=true; if(!prog.best || correct>prog.best) prog.best=correct; }
      store.set(key,prog);
    }
    if(ql){ ql.addEventListener("click",function(e){ if(e.target.closest(".opt")) setTimeout(tally,0); }); }
    // goal checkboxes persist
    var goals=document.querySelectorAll("#tab-goals .check input[type=checkbox]");
    var g=(store.get(key)||{}).goals||[];
    goals.forEach(function(cb,i){ if(g[i]) cb.checked=true;
      cb.addEventListener("change",function(){ var p=store.get(key)||{}; p.goals=Array.from(goals).map(function(x){return x.checked}); store.set(key,p); }); });
    var foot=document.querySelector("footer.credit p:last-child");
    if(foot && goals.length) foot.insertAdjacentHTML("beforebegin","<p>Your quiz scores and checklist are saved only in this browser on this device.</p>");
  }

  /* ---------- report an error ---------- */
  var credit=document.querySelector("footer.credit");
  if(credit){
    var title=document.title, url=REPO+"/issues/new?title="+encodeURIComponent("Correction: "+title)+"&body="+encodeURIComponent("Page: "+page+"\n\nWhat needs correcting (section or tab):\n\nSuggested change and source, if any:\n");
    credit.insertAdjacentHTML("beforeend",'<p><a href="'+url+'" target="_blank" rel="noopener">Report an error or suggest an update</a></p>');
  }

  /* ---------- hub badges ---------- */
  if(page==="index.html"||page===""){
    document.querySelectorAll("a.mod[href^='module_']").forEach(function(a){
      var p=store.get("nok-progress-"+a.getAttribute("href")); if(!p) return;
      var t = p.completed ? ("Quiz best "+p.best+" of "+p.total) : (p.last && p.last.answered ? ("Quiz "+p.last.answered+" of "+p.total+" answered") : "Visited");
      var gs=(p.goals||[]).filter(Boolean).length; if(gs) t+="; goals "+gs+" of "+p.goals.length;
      var span=a.querySelector("span:last-child"); if(span) span.insertAdjacentHTML("beforeend",'<span class="badge'+(p.completed?' done':'')+'">'+(p.completed?"✓ ":"")+t+'</span>');
    });
    var reset=document.getElementById("resetProgress");
    if(reset) reset.addEventListener("click",function(){ if(!confirm("Clear your saved quiz scores and checklists on this device?")) return;
      Object.keys(localStorage).forEach(function(k){ if(k.indexOf("nok-progress-")===0) store.del(k); }); location.reload(); });
  }
})();
