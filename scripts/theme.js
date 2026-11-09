(function(){var t='dark';try{t=localStorage.getItem('ssa_theme')||'dark'}catch(e){}document.documentElement.dataset.t=t;
function lab(){document.querySelectorAll('.tg').forEach(function(b){b.textContent=t==='dark'?'☀️ Light':'🌙 Dark'})}
window.toggleTheme=function(){t=t==='dark'?'light':'dark';try{localStorage.setItem('ssa_theme',t)}catch(e){}document.documentElement.dataset.t=t;lab();window.dispatchEvent(new Event('themechange'))};
document.addEventListener('DOMContentLoaded',lab)})();
