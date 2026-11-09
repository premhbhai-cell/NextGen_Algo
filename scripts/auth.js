var K='ssa_db',ADM={e:'premhbhai@gmail.com',p:'premjha52'};
function $(s){return document.querySelector(s)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var LV=[10,5,2,2,1,1,1,1,1,1],PAY={addr:'0x19D8A647A5b306eC8c342de2Faa464F7C868B086',net:'USDT (BEP20 · BNB Smart Chain)'};
function def(){return{users:[],reqs:[],wds:[],tix:[],cfg:{v:2,direct:10,wdl:2,lv:LV.slice(),zoom:'',kit:'',wa:'',notice:'',bonanza:'',plans:[{id:'p1',name:'15 Days Trial',days:15,price:50},{id:'p2',name:'3 Months Subscription',days:90,price:225},{id:'p3',name:'6 Months Subscription',days:180,price:329},{id:'p4',name:'1 Year Subscription',days:365,price:549},{id:'p5',name:'Lifetime VIP',days:0,price:659}]}}}
function load(){try{var d=JSON.parse(localStorage.getItem(K));if(d&&d.users&&d.cfg){var c=d.cfg;d.tix=d.tix||[];if(d.cfg.bonanza==null)d.cfg.bonanza='';
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
 if(!n||!e||!pw)return'Name, email aur password bharo';
 if(!/^\S+@\S+\.\S+$/.test(e))return'Email sahi nahi hai';
 if(pw.length<6)return'Password kam se kam 6 character ka ho';
 if(e===ADM.e||d.users.some(function(u){return u.email===e}))return'Ye email pehle se registered hai';
 var sp=null;ref=(ref||'').trim().toUpperCase();
 if(ref){sp=d.users.find(function(u){return u.code===ref});if(!sp)return'Referral code galat hai'}
 var u={id:uid('U'),code:uid('SSA'),name:n,email:e,phone:(ph||'').trim(),pw:pw,sponsor:sp?sp.id:null,status:'active',pkg:null,exp:null,wallet:0,mt5:'',srv:'',lic:'',dia:false,tx:[],earn:{direct:0,level:0,wd:0,pool:0,bonus:0},joined:Date.now()};
 d.users.push(u);save(d);setSess('user',u.id);return''}
function userLogin(e,pw){var d=load();e=(e||'').trim().toLowerCase();
 var u=d.users.find(function(x){return x.email===e&&x.pw===pw});
 if(!u)return'Email ya password galat hai';
 if(u.status==='blocked')return'Aapka account admin ne block kiya hai';
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
 return '<aside class="side"><div class="brand">'+brand+'</div>'+items.map(function(i){return'<a class="'+(i[0]===cur?'on':'')+'" onclick="goTab(\''+i[0]+'\')"><span>'+i[2]+' '+i[1]+'</span>'+(i[3]?'<em>'+i[3]+'</em>':'')+'</a>'}).join('')+'<a onclick="'+out+'">🚪 Logout</a></aside><section class="main"><div class="bar"><span>'+who+'</span><div><button class="tg" onclick="toggleTheme()">Theme</button><a href="index.html">🌐 View Website</a></div></div><div class="body"><h2>'+t[1]+'</h2>'+body+'</div></section>'}
function tabFrom(items,def){var t=(location.hash||'').slice(1);return items.some(function(i){return i[0]===t})?t:def}
function goTab(t){location.hash=t;render()}

function feats(p){var f=[p.days?p.days+' days MT5 robot license':'Lifetime MT5 robot license','100% automatic trading (Forex & Gold)','MT5 setup help & support','Live Zoom training','Referral & team income access'];if(!p.days)f.push('Lifetime VIP updates');return f}
function nextOk(n){return n&&/^[\w\-]+\.html(\?[\w=&\-%]*)?$/.test(n)?n:''}
