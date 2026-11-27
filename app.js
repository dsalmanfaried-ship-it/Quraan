const S=[];
const INFO={
"الفاتحة":["مكية","حوار بين العبد وربه: ثناء، ثم عهد «إياك نعبد»، ثم دعاء بالهداية. تدبّر: ما أحوجك للهداية في كل ركعة."],
"الإخلاص":["مكية","تعريف بالله: أحد، صمد تقصده الخلائق في حوائجها، لا والد ولا ولد ولا نظير. تدبّر: توحيد صافٍ يُغني عن كل تعلّق."],
"الفلق":["مكية","استعاذة برب الفلق من شر المخلوقات والليل والسحر والحسد. تدبّر: الذي يفلق الظلمة بالنور قادر على كشف كل شدة."],
"الناس":["مكية","تحصين من وسوسة الخنّاس بثلاث صفات: ربّ الناس، ملك الناس، إله الناس. تدبّر: رعاية وحكم وعبادة تجتمع لله وحده."],
"الكوثر":["مكية","عطاء الله الكثير، وشكره بالصلاة والنحر، ومبغضك هو المقطوع. تدبّر: النعمة تُقابَل بالشكر العملي."],
"العصر":["مكية","الزمن رأس مالك، والنجاة بأربع: إيمان، عمل صالح، تواصٍ بالحق، تواصٍ بالصبر. تدبّر: لا نجاة فردية بلا مجتمع صالح."],
"الكافرون":["مكية","براءة من الشرك ووضوح في العقيدة مع احترام: لكم دينكم ولي دين. تدبّر: الثبات على المبدأ دون عدوان."],
"النصر":["مدنية","النصر يُقابَل بالتسبيح والاستغفار لا بالغرور. تدبّر: كلما عظمت النعمة زاد التواضع."],
"المسد":["مكية","العداوة للحق لا يغني عنها مال ولا نسب. تدبّر: القرابة لا تنفع بلا إيمان."],
"قريش":["مكية","نعمة الرزق والأمن توجب عبادة رب هذا البيت. تدبّر: اذكر نعمة الأمن والطعام كل يوم."],
"الفيل":["مكية","حماية الله لبيته وإبطال كيد المعتدين بما لا يخطر على بال. تدبّر: القوة المادية ضعيفة أمام قدرته."],
"الماعون":["مكية","الدين ليس شعائر فقط: إكرام اليتيم وإطعام المسكين والإخلاص في الصلاة. تدبّر: العبادة تظهر آثارها في السلوك."],
"الهمزة":["مكية","ذمّ الهمز واللمز وجمع المال ظنًا أنه يخلّد صاحبه. تدبّر: المال وسيلة لا خلود."]};
Object.assign(INFO,{"الشمس":["مكية",""],"الليل":["مكية",""],"الضحى":["مكية",""],"الشرح":["مكية",""],"التين":["مكية",""],"العلق":["مكية",""],"القدر":["مكية",""],"البينة":["مدنية",""],"الزلزلة":["مدنية",""],"العاديات":["مكية",""],"القارعة":["مكية",""],"التكاثر":["مكية",""]});
const LG={q:["قلقلة","#3b82f6"],m:["مدّ","#f59e0b"],g:["غنّة","#16a34a"],i:["إدغام","#8b5cf6"],b:["إقلاب","#ec4899"],z:["إظهار","#64748b"],k:["إخفاء","#0d9488"]};
const $=id=>document.getElementById(id);
const AR=n=>String(n).replace(/\d/g,d=>"٠١٢٣٤٥٦٧٨٩"[d]);
const norm=w=>w.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g,"").replace(/[أإآٱءا]/g,"").replace(/[ىئ]/g,"ي").replace(/ة/g,"ه").replace(/ؤ/g,"و");
function lev(a,b){const m=a.length,n=b.length,d=[];for(let i=0;i<=m;i++)d[i]=[i];for(let j=1;j<=n;j++)d[0][j]=j;
for(let i=1;i<=m;i++)for(let j=1;j<=n;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[m][n];}
const same=(a,b)=>{if(a===b)return true;const m=Math.min(a.length,b.length);return (m>=4&&lev(a,b)<=1)||(m>=7&&lev(a,b)<=2)};
const G=[];S.forEach((s,si)=>{let i=0;s.a.forEach((t,ai)=>t.split(" ").forEach(w=>G.push({n:norm(w),s:si,a:ai,i:i++})))});
const BSM="بسم الله الرحمن الرحيم".split(" ").map(norm);
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const dk=d=>new Date(d-d.getTimezoneOffset()*6e4).toISOString().slice(0,10),today=()=>dk(new Date());
let cfg=Object.assign({theme:"auto",fs:30,goal:100,tj:true},ld("tilawati-cfg",{})),stats=ld("tilawati-stats",{days:{},total:0}),best=ld("tilawati-best",{}),weak=ld("tilawati-weak",{});
let auto=true,locked=false,base=0,skipN=0,cur=0,ay=-1,words=[],st=[],ptr=0,mode="read",listening=false,rec=null,finals="",done=true;
document.head.insertAdjacentHTML("beforeend","<style>"+Object.entries(LG).map(([k,v])=>`.tjon .t-${k}{border-bottom:3px solid ${v[1]}}`).join("")+"</style>");
$("legend").innerHTML=Object.values(LG).map(v=>`<span style="border-bottom:3px solid ${v[1]}">${v[0]}</span>`).join("");
// أحكام التجويد المبسّطة (تُستنتج من النص نفسه)
function rules(t,nx){t=t.replace(/[\u06D6-\u06DC]+$/,"");const r=[];
 if(/[قطبجد]\u0652/.test(t)||(!nx&&/[قطبجد][\u064B-\u065F\u0670\u06D6-\u06ED]*$/.test(t)))r.push(["q","قلقلة"]);
 if(/\u0653/.test(t))r.push(["m","مدّ"]);
 if(/[نم]\u0651/.test(t))r.push(["g","غنّة"]);
 if(nx&&(/[\u064B-\u064D][\u06E2\u06ED]?[اى]?$/.test(t)||/ن\u0652?$/.test(t))){
  const c=nx.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640ٱ]/g,"")[0]||"";
  const k="يمنو".includes(c)?["i","إدغام بغنة"]:"لر".includes(c)?["i","إدغام بلا غنة"]:c==="ب"?["b","إقلاب"]:"ءأإهعحغخ".includes(c)?["z","إظهار"]:["k","إخفاء"];
  r.push([k[0],k[1]+" ("+c+")"]);}
 return r;}
// التعرّف على السورة من أول كلمات التلاوة
function fillSel(){$("sel").innerHTML=S.map((s,i)=>`<option value="${i}">${s.n}</option>`).join("");$("sel").value=cur;
$("ay").innerHTML='<option value="-1">السورة كاملة</option>'+S[cur].a.map((_,i)=>`<option value="${i}">الآية ${AR(i+1)}</option>`).join("");$("ay").value=ay;}
function load(i,keepAy,keepRec){if(!keepRec){endSession();stop()}cur=i;if(!keepAy)ay=-1;base=0;skipN=0;words=[];
 S[i].a.forEach((t,ai)=>{if(ay>=0&&ai!==ay)return;const p=t.split(" ");p.forEach((w,k)=>words.push({t:w,n:norm(w),a:ai,r:rules(w,p[k+1]||"")}));});
 fillSel();st=words.map(()=>"");ptr=0;finals="";$("res").textContent="";$("msg").textContent="";$("mis").innerHTML="";draw();}
function start(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){$("msg").textContent="المتصفح لا يدعم التعرف على الصوت. افتح الرابط في Chrome أو Edge أو Safari.";return}
 if(auto){locked=false;words=[];skipN=0}base=auto?0:base;st=words.map(()=>"");ptr=base;finals="";done=false;$("res").textContent="";$("mis").innerHTML="";
 rec=new SR();rec.lang="ar-SA";rec.continuous=true;rec.interimResults=true;
 rec.onresult=e=>{let it="";for(let i=e.resultIndex;i<e.results.length;i++){const t=e.results[i][0].transcript;if(e.results[i].isFinal)finals+=" "+t;else it+=" "+t}
  handle((finals+" "+it).trim().split(/\s+/))};
 rec.onerror=e=>{if(e.error==="not-allowed"||e.error==="service-not-allowed"){$("msg").textContent="لازم تسمح للمتصفح باستخدام الميكروفون، وافتح الصفحة في تبويب مستقل.";stop()}};
 rec.onend=()=>{if(listening){try{rec.start()}catch(e){}}};
 try{rec.start();listening=true;$("mic").textContent="⏹️ إيقاف";$("mic").className="btn rec";$("msg").textContent=auto?"أنا أسمعك… ابدأ التلاوة من أي سورة.":"جارٍ الاستماع… ابدأ التلاوة.";draw()}catch(e){$("msg").textContent="تعذر تشغيل الميكروفون."}}
function stop(){listening=false;try{rec&&rec.stop()}catch(e){}rec=null;$("mic").textContent="🎙️ ابدأ التلاوة";$("mic").className="btn main"}
function endSession(){if(done)return;done=true;stop();const at=ptr-base;if(at<=0)return;
 const ok=st.filter(x=>x==="ok").length,acc=Math.round(ok/at*100),full=ptr>=words.length;
 stats.days[today()]=(stats.days[today()]||0)+ok;stats.total+=ok;sv("tilawati-stats",stats);
 words.forEach((w,i)=>{if(st[i]==="miss")weak[w.t]=(weak[w.t]||0)+1});sv("tilawati-weak",weak);
 $("res").textContent=full&&acc===100?`ما شاء الله! تلاوة كاملة بدقة ${AR(acc)}٪ 🌟`:`${full?"انتهت التلاوة":"توقفت"} – الدقة ${AR(acc)}٪`;
 if(full&&ay<0&&base===0&&(best[S[cur].n]==null||acc>best[S[cur].n])){best[S[cur].n]=acc;sv("tilawati-best",best)}
 const m=words.filter((w,i)=>st[i]==="miss");$("mis").innerHTML=m.length?"<div>كلمات تحتاج مراجعة:</div>"+m.map(w=>`<span class="mw">${w.t}</span>`).join(""):"";showStreak();}
function streakN(){let s=0,d=new Date();if(!stats.days[dk(d)])d.setDate(d.getDate()-1);while(stats.days[dk(d)]){s++;d.setDate(d.getDate()-1)}return s}
function renderProg(){const g=cfg.goal,t=stats.days[today()]||0,ds=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);ds.push([dk(d),d.getDay()])}
 const mx=Math.max(g,...ds.map(d=>stats.days[d[0]]||0)),W=Object.entries(weak).sort((a,b)=>b[1]-a[1]).slice(0,10);
 $("prog").innerHTML=`<div class="card"><div class="kpis"><div><b>${AR(streakN())}</b>🔥 يوم متواصل</div><div><b>${AR(stats.total)}</b>كلمة إجمالًا</div><div><b>${AR(Object.keys(best).length)}</b>سور مكتملة</div></div>
 <h3>هدف اليوم</h3><div class="prog"><i style="width:${Math.min(100,t/g*100)}%"></i></div><div class="msg" style="margin:0">${AR(t)} / ${AR(g)} كلمة</div></div>
 <div class="card"><h3>آخر ٧ أيام</h3><div class="wk">${ds.map(d=>{const v=stats.days[d[0]]||0;return `<div><i style="height:${Math.round(v/mx*90)+4}px" class="${v>=g?"hit":""}"></i><small>${"حنثرخجس"[d[1]]}</small></div>`}).join("")}</div></div>
 <div class="card"><h3>كلمات تحتاج مراجعة</h3>${W.length?W.map(w=>`<span class="mw">${w[0]} <small>×${AR(w[1])}</small></span>`).join(""):'<p class="msg">لا أخطاء مسجّلة بعد.</p>'}</div>`}
function applyCfg(){const r=document.documentElement;cfg.theme==="auto"?r.removeAttribute("data-theme"):r.dataset.theme=cfg.theme;
 [...$("th").children].forEach(b=>b.classList.toggle("on",b.dataset.t===cfg.theme));$("fsr").value=cfg.fs;$("gr").value=cfg.goal;$("fv").textContent=AR(cfg.fs);$("gv").textContent=AR(cfg.goal)+" كلمة";$("tjc").checked=cfg.tj;sv("tilawati-cfg",cfg);showStreak();if(words.length||!auto)draw()}
$("mic").onclick=()=>listening?(endSession(),draw()):start();
$("reset").onclick=()=>{endSession();stop();if(auto){locked=false;words=[];$("msg").textContent=""}else load(cur,true);draw();$("res").textContent="";$("mis").innerHTML=""};
$("nav").onclick=e=>{const b=e.target.closest("button");if(b)show(b.dataset.v)};
$("am").onclick=e=>{const b=e.target.closest("button");if(!b)return;endSession();stop();auto=b.dataset.a==="1";[...$("am").children].forEach(x=>x.classList.toggle("on",x===b));$("manual").hidden=auto;locked=false;
 if(auto){words=[];st=[];ptr=0;base=0;$("res").textContent=$("msg").textContent=$("mis").innerHTML="";draw()}else load(cur)};
$("mode").onclick=e=>{const b=e.target.closest("button");if(!b)return;mode=b.dataset.m;[...$("mode").children].forEach(x=>x.classList.toggle("on",x===b));draw()};
$("text").onclick=e=>{const w=e.target.closest(".w");if(w&&mode==="hide")w.classList.add("peek")};
$("sel").onchange=e=>load(+e.target.value);$("ay").onchange=e=>{ay=+e.target.value;load(cur,true)};
$("q").oninput=e=>renderLib(e.target.value);
$("lib").onclick=e=>{const b=e.target.closest(".li");if(!b)return;auto=false;[...$("am").children].forEach(x=>x.classList.toggle("on",x.dataset.a==="0"));$("manual").hidden=false;load(+b.dataset.i);show("rec")};
$("th").onclick=e=>{const b=e.target.closest("button");if(b){cfg.theme=b.dataset.t;applyCfg()}};
$("fsr").oninput=e=>{cfg.fs=+e.target.value;applyCfg()};$("gr").oninput=e=>{cfg.goal=+e.target.value;applyCfg()};$("tjc").onchange=e=>{cfg.tj=e.target.checked;applyCfg()};
let wp=0;$("wipe").onclick=()=>{if(!wp){wp=1;$("wipe").textContent="اضغط مرة أخرى للتأكيد";return}
 stats={days:{},total:0};best={};weak={};["tilawati-stats","tilawati-best","tilawati-weak"].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}});wp=0;$("wipe").textContent="تم المسح ✓";showStreak()};
// ===== v3: كل السور، مساعد التجويد، واجهة =====
const NAMES="الفاتحة البقرة آل_عمران النساء المائدة الأنعام الأعراف الأنفال التوبة يونس هود يوسف الرعد إبراهيم الحجر النحل الإسراء الكهف مريم طه الأنبياء الحج المؤمنون النور الفرقان الشعراء النمل القصص العنكبوت الروم لقمان السجدة الأحزاب سبأ فاطر يس الصافات ص الزمر غافر فصلت الشورى الزخرف الدخان الجاثية الأحقاف محمد الفتح الحجرات ق الذاريات الطور النجم القمر الرحمن الواقعة الحديد المجادلة الحشر الممتحنة الصف الجمعة المنافقون التغابن الطلاق التحريم الملك القلم الحاقة المعارج نوح الجن المزمل المدثر القيامة الإنسان المرسلات النبأ النازعات عبس التكوير الانفطار المطففين الانشقاق البروج الطارق الأعلى الغاشية الفجر البلد الشمس الليل الضحى الشرح التين العلق القدر البينة الزلزلة العاديات القارعة التكاثر العصر الهمزة الفيل قريش الماعون الكوثر الكافرون النصر المسد الإخلاص الفلق الناس".split(" ").map(s=>s.replace("_"," "));
const RD={
q:{n:"قلقلة",l:"ق ط ب ج د",d:"اضطراب خفيف في الحرف الساكن من حروف «قطب جد» حتى يُسمع له نبرة.",t:"انبر الحرف بلا حركة واضحة؛ وتقوى عند الوقف."},
m:{n:"مدّ",l:"",d:"إطالة الصوت بحرف المد، ويختلف مقداره بحسب سببه: طبيعي حركتان، متصل ومنفصل ٤–٥، لازم ٦ حركات.",t:"أطِل الصوت ولا تقطعه قبل مقداره."},
g:{n:"غنّة",l:"ن م (مشددتان)",d:"صوت لطيف يخرج من الخيشوم في النون والميم المشددتين، ومقدارها حركتان.",t:"أمسك الصوت في الأنف مقدار حركتين."},
i:{n:"إدغام",l:"ي ر م ل و ن",d:"إدخال النون الساكنة أو التنوين فيما بعدهما من حروف «يرملون»؛ بغنة في «ينمو» وبلا غنة في اللام والراء.",t:"لا تُظهر النون؛ اندمج في الحرف التالي."},
b:{n:"إقلاب",l:"ب",d:"قلب النون الساكنة أو التنوين ميمًا مخفاة عند الباء مع غنة.",t:"أطبق الشفتين بلطف مع غنة حركتين."},
z:{n:"إظهار",l:"ء ه ع ح غ خ",d:"نطق النون الساكنة أو التنوين واضحة عند حروف الحلق بلا غنة.",t:"انطق النون صافية بلا غنة."},
k:{n:"إخفاء",l:"ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك",d:"نطق النون الساكنة أو التنوين بصفة بين الإظهار والإدغام، مع غنة.",t:"أخفِ النون بغنة قريبة من مخرج الحرف التالي."}};
const IDX=new Map();
function rebuildG(){G.length=0;IDX.clear();S.forEach((s,si)=>{let i=0;s.a.forEach((t,ai)=>t.split(" ").forEach(w=>{const n=norm(w);G.push({n,s:si,a:ai,i:i++});const l=IDX.get(n);l?l.push(G.length-1):IDX.set(n,[G.length-1])}))})}
function applyQ(A){S.length=0;A.forEach((a,i)=>S.push({n:NAMES[i],a}));rebuildG();cur=0;ay=-1}
let lockSc=0,lockP=-1,prev=[],lh="";
function hint(){const H=$("hint");let r=null,w;
 if(listening&&words.length)for(let j=ptr;j<Math.min(ptr+3,words.length);j++)if(words[j].r[0]){w=words[j];r=w.r[0];break}
 if(!r){H.hidden=true;lh="";return}const k=w.t+r[0];if(k===lh)return;lh=k;H.hidden=false;H.style.borderColor=LG[r[0]][1];H.innerHTML=`<b>${w.t}</b> · ${RD[r[0]].n}: ${RD[r[0]].t}`}
function panel(){const P=$("panel");
 if(auto&&!locked){P.innerHTML=`<h3>🧠 كيف يعمل التعرّف التلقائي؟</h3><p class="msg" style="margin-top:0">يطابق التطبيق ما تتلوه مع ${S.length===114?"نص المصحف كاملًا":AR(S.length)+" سورة فقط (أضف الباقي من تبويب السور)"} ثم يتابعك كلمة بكلمة. اضغط أي كلمة لشرح حكمها.</p>`;return}
 const a=words[Math.min(ptr,words.length-1)].a,s=S[cur],inf=INFO[s.n],rl=[];
 words.forEach(w=>{if(w.a===a)w.r.forEach(x=>rl.push(`<span class="rl" style="border-color:${LG[x[0]][1]}"><b>${w.t}</b> ${x[1]}</span>`))});
 P.innerHTML=`<h3>سورة ${s.n} · ${inf?inf[0]+" · ":""}${AR(s.a.length)} آيات</h3>${inf&&inf[1]?`<div class="tad">💡 ${inf[1]}</div>`:""}<h3>التجويد في الآية ${AR(a+1)}</h3>${rl.join("")||'<p class="msg">لا أحكام بارزة في هذه الآية.</p>'}`}
function showStreak(){const t=stats.days[today()]||0,p=Math.min(1,t/cfg.goal),C=2*Math.PI*18;
 $("streak").innerHTML=`<svg width="54" height="54" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" class="rb"/><circle cx="22" cy="22" r="18" class="rf" style="stroke-dasharray:${C*p} ${C}"/></svg><div><b>🔥 ${AR(streakN())} يوم متواصل</b><small>اليوم ${AR(t)} / ${AR(cfg.goal)} كلمة · الإجمالي ${AR(stats.total)}</small></div>`}
function renderLib(q){q=norm(q||"");const full=S.length===114;
 $("lib").innerHTML=S.map((s,i)=>[s,i]).filter(o=>!q||norm(o[0].n).includes(q)).map(([s,i])=>`<button class="li" data-i="${i}"><span class="bd"><b>${AR(NAMES.indexOf(s.n)+1)}</b></span><span><b>${s.n}</b><small>${INFO[s.n]?INFO[s.n][0]+" · ":""}${AR(s.a.length)} آيات${best[s.n]!=null?" · أفضل نتيجة "+AR(best[s.n])+"٪":""}</small></span></button>`).join("")||'<p class="msg">لا نتائج.</p>'}
function renderTj(){const ex={};
 outer:for(const s of S)for(const t of s.a){const p=t.split(" ");for(let k=0;k<p.length;k++){rules(p[k],p[k+1]||"").forEach(x=>{if(!ex[x[0]])ex[x[0]]=[p[k],s.n]});if(Object.keys(ex).length===7)break outer}}
 $("tj").innerHTML='<p class="msg" style="margin:6px 4px">الأحكام التي يلوّنها التطبيق، مع مثال من النص الموجود عندك:</p>'+Object.entries(RD).map(([k,r],i)=>`<div class="card tjc" style="border-right:6px solid ${LG[k][1]};animation-delay:${i*60}ms"><h3 style="margin-top:0">${r.n}</h3><p style="margin:4px 0">${r.d}</p>${r.l?`<p class="msg" style="margin:4px 0">الحروف: <b>${r.l}</b></p>`:""}<div class="tad">🎯 ${r.t}</div>${ex[k]?`<div class="exm"><span class="mw" style="color:var(--ink)">${ex[k][0]}</span><small class="msg">سورة ${ex[k][1]}</small></div>`:""}</div>`).join("")}
function openSheet(i){const w=words[i];if(!w)return;
 $("shc").innerHTML=`<div class="shw">${w.t}</div>`+(w.r.length?w.r.map(x=>{const d=RD[x[0]];return `<div class="rb2" style="border-color:${LG[x[0]][1]}"><b>${d.n}</b> <small>${x[1]}</small><p>${d.d}</p><div class="tad">🎯 ${d.t}</div></div>`}).join(""):'<p class="msg">لا حكم بارز في هذه الكلمة؛ اقرأ حروفها من مخارجها الصحيحة.</p>');$("sheet").hidden=false}
$("sheet").onclick=e=>{if(e.target.id==="sheet"||e.target.closest(".x"))$("sheet").hidden=true};
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("sheet").hidden=true});
$("text").onclick=e=>{const w=e.target.closest(".w");if(!w)return;
 if(mode==="hide"&&!/\b(peek|ok|miss)\b/.test(w.className)){w.classList.add("peek");return}openSheet(+w.dataset.i)};
function show(v){if(listening&&v!=="rec")endSession();["rec","lib","tj","prog","set"].forEach(x=>$("v-"+x).hidden=x!==v);
 [...$("nav").children].forEach(b=>b.classList.toggle("on",b.dataset.v===v));
 if(v==="lib"){renderLib($("q").value)}if(v==="prog")renderProg();if(v==="tj")renderTj();window.scrollTo(0,0)}
function importQ(txt){const A=[];let c=0;
 txt.split(/\r?\n/).forEach(l=>{const m=l.match(/^(\d+)\|(\d+)\|(.+)$/);if(!m||+m[1]>114)return;const s=m[1]-1,a=m[2]-1,tk=[];
  m[3].replace(/[\u06DE\u06E9]/g,"").split(/\s+/).forEach(w=>{if(!w)return;
   if(/^[\u06D6-\u06DC]+$/.test(w)){if(tk.length)tk[tk.length-1]+=w}else if(/[\u0621-\u063A\u0641-\u064A\u0671]/.test(w))tk.push(w)});
  (A[s]=A[s]||[])[a]=tk.join(" ");c++});
 if(c<6200||A.length!==114)return false;
 A.forEach((ar,s)=>{if(s&&s!==8){const w=ar[0].split(" ");if(w.length>4&&BSM.every((b,i)=>norm(w[i])===b))ar[0]=w.slice(4).join(" ")}});
 applyQ(A);return true}
const ban=new Set();let lastRw=[],foundUntil=0;
function detect(rw){const cs=[{c:rw,lead:0}];
 if(rw.length>4&&BSM.every((b,i)=>same(rw[i],b)))cs.push({c:rw.slice(4),lead:4});
 let b1={sc:0},b2={sc:0};
 for(const o of cs){const q=o.c.slice(0,24),seen=new Set();
  for(let a=0;a<4&&a<q.length;a++)for(const p0 of IDX.get(q[a])||[])for(let d=-1;d<=1;d++){const p=p0-a+d;if(p<0||seen.has(p)||ban.has(G[p].s))continue;seen.add(p);
   let k=p,m=0,x=0,fs=0;
   for(let i=0;i<q.length;i++){const r=q[i];
    if(k<G.length&&same(r,G[k].n)){m++;k++;if(!i)fs=.05}
    else if(i+1<q.length&&k<G.length&&same(r+q[i+1],G[k].n)){m+=2;k++;i++;if(i===1)fs=.05}
    else if(k+1<G.length&&same(r,G[k+1].n)){m++;k+=2}
    else if(k+1<G.length&&same(r,G[k].n+G[k+1].n)){m++;k+=2}
    else x++}
   const sc=m-x*.6+fs,far=Math.abs(p-b1.p)>3;if(sc>b1.sc){if(far)b2=b1;b1={sc,p,lead:o.lead}}else if(far&&sc>b2.sc)b2={sc,p}}}
 if(b1.sc<2.4)return null;
 if(b2.sc>=b1.sc-.01&&rw.length<24)return null;
 return b1}
function handle(rw){rw=rw.map(norm).filter(Boolean);lastRw=rw;
 if(auto&&(!locked||rw.length-skipN<=24)){const d=detect(rw);
  if(!d&&!locked){$("msg").textContent=rw.length<3?"أنا أسمعك…":"جارٍ التعرّف على السورة…";return}
  if(d&&(!locked||(d.p!==lockP&&d.sc>lockSc+.7))){const g=G[d.p],k=finals;load(g.s,false,true);finals=k;locked=true;base=g.i;ptr=base;skipN=d.lead;lockSc=d.sc;lockP=d.p;foundUntil=Date.now()+1100;
   $("msg").innerHTML=`✅ ${S[g.s].n} – الآية ${AR(g.a+1)} <button class="lk" id="wrong">ليست هذه؟</button>`}}
 align(rw.slice(skipN))}
function align(rw){st=words.map(()=>"");ptr=base;let lost=[];
 for(let x=0;x<rw.length&&ptr<words.length;x++){const r=rw[x];let f=-1,s0=0,adv=0;const hi=Math.min(ptr+4,words.length-1);
  for(let j=ptr;j<=hi&&f<0;j++){const w=words[j],nx=words[j+1];
   if(same(r,w.n)){f=j;s0=j}
   else if(x+1<rw.length&&same(r+rw[x+1],w.n)){f=j;s0=j;adv=1}
   else if(nx&&same(r,w.n+nx.n)){f=j+1;s0=j}}
  if(f>=0){for(let k=ptr;k<s0;k++)st[k]="miss";for(let k=s0;k<=f;k++)st[k]="ok";ptr=f+1;x+=adv;lost=[]}
  else{lost.push(r);if(lost.length>=3){const a=lost.slice(-2);
   for(let j=ptr+5;j<Math.min(ptr+60,words.length-1);j++)if(same(a[0],words[j].n)&&same(a[1],words[j+1].n)){for(let k=ptr;k<j;k++)st[k]="miss";st[j]=st[j+1]="ok";ptr=j+2;lost=[];break}}}}
 draw();if(ptr>=words.length)endSession()}
function draw(){const T=$("text"),sh=$("shd");
 if(auto&&!locked){sh.hidden=true;T.className="text";T.innerHTML='<div class="empty">🎧<br>ابدأ التلاوة من أي سورة (حتى من منتصفها، مع البسملة أو بدونها) وسأتعرّف عليها تلقائيًا.</div>';
  $("sOk").textContent=$("sMiss").textContent=$("sAll").textContent="٠";$("pb").style.width="0";prev=[];panel();hint();return}
 sh.hidden=false;sh.textContent="سورة "+S[cur].n;
 let lo=0,hi=words.length-1;
 if(words.length>120){const a=words[Math.min(ptr,words.length-1)].a;lo=-1;hi=0;words.forEach((w,i)=>{if(lo<0&&w.a>=a-1)lo=i;if(w.a<=a+3)hi=i})}
 let h=lo>0?'<div class="more">⋯</div>':"",last=-1;
 for(let i=lo;i<=hi;i++){const w=words[i];if(w.a!==last&&last>=0)h+=`<span class="num">${AR(last+1)}</span> `;last=w.a;
  h+=`<span class="w ${st[i]} ${st[i]&&prev[i]!==st[i]?"fx":""} ${w.r.length?"t-"+w.r[0][0]:""} ${i===ptr&&listening?"cur":""}" data-i="${i}">${w.t}</span> `}
 h+=`<span class="num">${AR(last+1)}</span>`+(hi<words.length-1?'<div class="more">⋯</div>':"");
 T.innerHTML=h;T.className="text"+(mode==="hide"?" hide":"")+(cfg.tj?" tjon":"")+(Date.now()<foundUntil?" found":"");T.style.fontSize=cfg.fs+"px";prev=st.slice();
 const n=words.length-base;$("sOk").textContent=AR(st.filter(x=>x==="ok").length);$("sMiss").textContent=AR(st.filter(x=>x==="miss").length);$("sAll").textContent=AR(n);
 $("pb").style.width=Math.max(0,(ptr-base)/n*100)+"%";panel();hint()}
$("mic").onclick=()=>{if(listening){endSession();draw()}else{ban.clear();start()}};
$("msg").onclick=e=>{if(e.target.id!=="wrong")return;ban.add(G[lockP].s);locked=false;words=[];st=[];ptr=0;base=0;$("msg").textContent="حسنًا، أبحث من جديد…";draw();handle(lastRw)};
applyCfg();
fetch("data/quran-uthmani.txt").then(r=>{if(!r.ok)throw 0;return r.text()}).then(t=>{if(!importQ(t))throw 0;$("mic").disabled=false;fillSel();draw();if($("v-lib").hidden===false)renderLib($("q").value)})
 .catch(()=>{$("text").innerHTML='<div class="empty">تعذّر تحميل نص المصحف. شغّل الصفحة من خادم ويب (وليس بفتح الملف مباشرة) وتأكد من وجود data/quran-uthmani.txt.</div>'});
if("serviceWorker"in navigator&&location.protocol.startsWith("http"))addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
