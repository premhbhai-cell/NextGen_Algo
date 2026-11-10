var K='ssa_db',ADM={e:'premhbhai@gmail.com',p:'premjha52'};
function $(s){return document.querySelector(s)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var LV=[10,5,2,2,1,1,1,1,1,1],PAY={addr:'0x19D8A647A5b306eC8c342de2Faa464F7C868B086',net:'USDT (BEP20 · BNB Smart Chain)'};
function def(){return{users:[],reqs:[],wds:[],tix:[],cfg:{v:2,direct:10,wdl:2,lv:LV.slice(),zoom:'',kit:'',wa:'',notice:'',bonanza:'',referralCodes:[],plans:[{id:'p1',name:'15 Days Trial Package',days:15,price:50},{id:'p2',name:'3 Months Subscription',days:90,price:225},{id:'p3',name:'6 Months Subscription',days:180,price:329},{id:'p4',name:'1 Year Subscription',days:365,price:549},{id:'p5',name:'Lifetime VIP Access',days:0,price:659}]}}}
function load(){try{var d=JSON.parse(localStorage.getItem(K));if(d&&d.users&&d.cfg){var c=d.cfg;d.tix=d.tix||[];d.cfg.referralCodes=d.cfg.referralCodes||[];if(d.cfg.bonanza==null)d.cfg.bonanza='';
 var names={'p1':'15 Days Trial Package','p2':'3 Months Subscription','p3':'6 Months Subscription','p4':'1 Year Subscription','p5':'Lifetime VIP Access'};
 c.plans.forEach(function(p){if(names[p.id])p.name=names[p.id]});
 if(!c.v){c.v=2;c.lv=LV.slice();c.wdl=2;c.zoom=c.kit=c.wa=c.notice=c.bonanza='';var t=c.plans[0];if(t&&t.price===0)t.price=50}
 d.users.forEach(function(u){if(!u.tx)u.tx=[];if(u.mt5==null){u.mt5='';u.srv='';u.lic='';u.dia=false}});return d}}catch(e){}return def()}
function save(d){localStorage.setItem(K,JSON.stringify(d))}
function sess(r){try{var s=JSON.parse(localStorage.getItem('ssa_s_'+r));return s&&s.role===r?s:null}catch(e){return null}}
function setSess(r,id){localStorage.setItem('ssa_s_'+r,JSON.stringify({role:r,id:id}))}
function logout(r,to){localStorage.removeItem('ssa_s_'+r);location.href=to}
function uid(p){return p+Math.random().toString(36).slice(2,8).toUpperCase()}
function money(n){return '$'+(Math.round(n*100)/100).toFixed(2)}
function dt(t){return t?new Date(t).toLocaleDateString('en-IN'):'-'}
function pkgInfo(u){if(!u.pkg)return'No package';if(u.exp===null)return u.pkg+' (Lifetime)';return u.exp>Date.now()?u.pkg+' (till '+dt(u.exp)+')':u.pkg+' (Expired '+dt(u.exp)+')'}
function signup(n,e,ph,pw,ref){var d=load();e=(e||'').trim().toLowerCase();n=(n||'').trim();
 if(!n||!e||!pw)return'Please enter your name, email, and password.';
 if(!/^\S+@\S+\.\S+$/.test(e))return'Please enter a valid email address.';
 if(pw.length<6)return'Password must contain at least 6 characters.';
 if(e===ADM.e||d.users.some(function(u){return u.email===e}))return'This email address is already registered.';
 var sp=null;ref=(ref||'').trim().toUpperCase();
 var adminCode=null;
 if(ref){sp=d.users.find(function(u){return u.code===ref});adminCode=d.cfg.referralCodes.find(function(x){return x.code===ref&&x.active!==false});
 if(!sp&&!adminCode)return'The referral code is invalid.'}
 var u={id:uid('U'),code:uid('SSA'),name:n,email:e,phone:(ph||'').trim(),pw:pw,sponsor:sp?sp.id:null,adminReferral:adminCode?adminCode.code:'',status:'active',pkg:null,exp:null,wallet:0,mt5:'',srv:'',lic:'',dia:false,tx:[],earn:{direct:0,level:0,wd:0,pool:0,bonus:0},joined:Date.now()};
 d.users.push(u);save(d);setSess('user',u.id);return''}
function userLogin(e,pw){var d=load();e=(e||'').trim().toLowerCase();
 var u=d.users.find(function(x){return x.email===e&&x.pw===pw});
 if(!u)return'Incorrect email address or password.';
 if(u.status==='blocked')return'Your account has been blocked. Please contact support.';
 setSess('user',u.id);return''}
function adminLogin(e,pw){if((e||'').trim().toLowerCase()===ADM.e&&pw===ADM.p){setSess('admin','admin');return true}return false}
function pay(u,type,amt,note){amt=Math.round(amt*100)/100;if(!amt)return;u.wallet+=amt;if(type!=='adj')u.earn[type]+=amt;u.tx.push({t:Date.now(),type:type,amt:amt,note:note||''})}
function up(d,u){var a=u.sponsor&&d.users.find(function(x){return x.id===u.sponsor});return a||null}
function activate(d,u,plan){var base=(u.exp&&u.exp>Date.now())?u.exp:Date.now();
 u.pkg=plan.name;u.exp=plan.days>0?base+plan.days*864e5:null;u.status='active';
 if(plan.price<=0)return;var a=up(d,u),i=0;
 while(a&&i<10){if(i===0)pay(a,'direct',plan.price*d.cfg.direct/100,'Direct: '+u.name);pay(a,'level',plan.price*(d.cfg.lv[i]||0)/100,'Level '+(i+1)+': '+u.name);a=up(d,a);i++}}
function wdIncome(d,u,amt){var a=up(d,u),i=0;while(a&&i<10){pay(a,'wd',amt*d.cfg.wdl/100,'Withdrawal L'+(i+1)+': '+u.name);a=up(d,a);i++}}
function levels(d,u){var out=[],cur=[u.id];for(var i=0;i<10;i++){cur=d.users.filter(function(x){return cur.indexOf(x.sponsor)>-1}).map(function(x){return x.id});out.push(cur.length)}return out}
function shell(brand,items,cur,who,out,body){var t=items.filter(function(i){return i[0]===cur})[0];
 return '<button class="menu-scrim" id="menuScrim" aria-label="Close navigation" onclick="closePanelMenu()"></button><aside class="side" id="panelSide"><div class="brand">'+brand+'</div><div class="mobile-side-head">'+brand+'<button class="menu-close" onclick="closePanelMenu()" aria-label="Close menu">×</button></div>'+items.map(function(i){return'<a class="'+(i[0]===cur?'on':'')+'" onclick="goTab(\''+i[0]+'\')"><span>'+i[2]+' '+i[1]+'</span>'+(i[3]?'<em>'+i[3]+'</em>':'')+'</a>'}).join('')+'<a onclick="'+out+'">🚪 Logout</a></aside><section class="main"><div class="bar"><div class="bar-left"><button class="menu-toggle" onclick="togglePanelMenu()" aria-label="Open navigation" aria-expanded="false">☰ <span>Menu</span></button><span>'+who+'</span></div><div><button class="tg" onclick="toggleTheme()">Theme</button><a href="index.html">🌐 View Website</a></div></div><div class="body"><h2>'+t[1]+'</h2>'+body+'</div></section>'}
function togglePanelMenu(){var s=$('#panelSide'),b=$('.menu-toggle'),o=$('#menuScrim');if(!s)return;var open=!s.classList.contains('open');s.classList.toggle('open',open);if(o)o.classList.toggle('show',open);if(b)b.setAttribute('aria-expanded',open?'true':'false');document.body.classList.toggle('menu-open',open)}
function closePanelMenu(){var s=$('#panelSide'),b=$('.menu-toggle'),o=$('#menuScrim');if(s)s.classList.remove('open');if(o)o.classList.remove('show');if(b)b.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}
function tabFrom(items,def){var t=(location.hash||'').slice(1);return items.some(function(i){return i[0]===t})?t:def}
function goTab(t){closePanelMenu();location.hash=t;render()}

function feats(p){var f=[p.days?p.days+' days of MT5 Gold (XAUUSD) robot access':'Lifetime MT5 Gold (XAUUSD) robot access','Automated execution focused exclusively on Gold (XAUUSD)','Step-by-step MT5 installation assistance','Guided onboarding and technical support','Referral and team income access'];if(p.id==='p3'||p.id==='p4'||p.id==='p5')f.push('Performance monitoring guidance');if(p.id==='p4'||p.id==='p5')f.push('Access to upcoming algorithm updates');if(!p.days)f.push('Priority 1-on-1 installation, live Zoom sessions, and 24/5 VIP support');return f}
function packageWelcome(p){var intro={
p1:'Welcome to your 15-day trial access. Your MT5 Trading Robot is designed exclusively for automated execution on Gold (XAUUSD).',
p2:'Your 3-month subscription provides access to our MT5 Trading Robot, engineered specifically for automated Gold (XAUUSD) trading, with onboarding and technical support.',
p3:'Your 6-month subscription includes the automated MT5 Gold (XAUUSD) robot, setup assistance, performance monitoring guidance, and dedicated technical support.',
p4:'Your 1-year license includes the MT5 Gold (XAUUSD) robot, hands-on setup support, technical assistance, upcoming algorithm updates, and strategy review sessions.',
p5:'Your Lifetime VIP membership includes permanent access to the flagship MT5 Gold (XAUUSD) robot, priority 1-on-1 installation, future algorithm upgrades, live Zoom sessions, and dedicated 24/5 VIP support.'
};
return (intro[p.id]||'Your subscription includes access to the MT5 Gold (XAUUSD) Trading Robot.')+' Installation: In MT5, select File > Open Data Folder, open MQL5 > Experts, and copy the robot file into that folder. In Navigator, right-click Expert Advisors and select Refresh. Open an XAUUSD chart and attach the robot. In the robot settings, open Common and enable Allow algorithmic trading. Then enable Algo Trading on the MT5 toolbar. Contact support to arrange your guided setup session.'}
function requestPasswordRecovery(email){email=(email||'').trim().toLowerCase();if(!/^\\S+@\\S+\\.\\S+$/.test(email))return'Please enter the email address registered to your account.';var d=load(),u=d.users.find(function(x){return x.email===email});if(!u)return'No account was found for that email address.';return 'A password recovery request can be sent to support for '+email+'. This website currently uses browser storage, so secure automatic email reset requires a connected server and email service.'}

function waLink(v,msg){v=(v||'').trim();if(!v)return'';var digits=v.replace(/\D/g,'');if(digits.length===10)digits='91'+digits;var u=/^https?:\/\//i.test(v)?v:'https://wa.me/'+digits;return u+(u.indexOf('?')>=0?'&':'?')+'text='+encodeURIComponent(msg||'')}
function nextOk(n){return n&&/^[\w\-]+\.html(\?[\w=&\-%]*)?$/.test(n)?n:''}

function validateReferralCode(code){code=(code||'').trim().toUpperCase();if(!code)return{valid:false,message:'Enter a referral code to check.'};var d=load();var member=d.users.find(function(u){return u.code===code});var admin=(d.cfg.referralCodes||[]).find(function(x){return x.code===code&&x.active!==false});if(member)return{valid:true,message:'Valid referral code. Referred by '+member.name+'.'};if(admin)return{valid:true,message:'Valid promotional referral code.'};return{valid:false,message:'This referral code was not found. Please check it and try again.'}}
