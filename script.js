const yesBtn = document.getElementById("yesBtn");
const maybeBtn = document.getElementById("maybeBtn");
const success = document.getElementById("success");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let pieces = [];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
addEventListener("resize",resize); resize();

function burst(){
  pieces = Array.from({length:150},()=>({
    x:innerWidth/2,y:innerHeight*.45,
    vx:(Math.random()-.5)*11,vy:(Math.random()-1)*12,
    r:Math.random()*4+2,a:1,rot:Math.random()*6.28,
    text:["💗","✨","₹","🎉"][Math.floor(Math.random()*4)]
  }));
  requestAnimationFrame(tick);
}
function tick(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  pieces.forEach(p=>{
    p.x+=p.vx;p.vy+=.25;p.y+=p.vy;p.a-=.008;p.rot+=.08;
    ctx.save();ctx.globalAlpha=Math.max(0,p.a);
    ctx.translate(p.x,p.y);ctx.rotate(p.rot);
    ctx.font=`${p.r*4}px system-ui`;ctx.fillText(p.text,-p.r,-p.r);ctx.restore();
  });
  pieces=pieces.filter(p=>p.a>0 && p.y<innerHeight+30);
  if(pieces.length)requestAnimationFrame(tick);
}
yesBtn.addEventListener("click",()=>{
  success.classList.remove("hidden");
  yesBtn.textContent="🎉 Thank You Maya! ₹20 = Happiness";
  yesBtn.disabled=true;
  yesBtn.style.opacity=".82";
  burst();
});
let clicks=0;
maybeBtn.addEventListener("click",()=>{
  clicks++;
  const msgs=[
    "🥺 Ek baar soch lo...",
    "😭 ₹20 hi toh hai...",
    "🫶 Sister discount please?",
    "💗 Maya, aapka dil bahut bada hai...",
    "😂 Last chance... promise!"
  ];
  maybeBtn.textContent=msgs[Math.min(clicks-1,msgs.length-1)];
  if(clicks>=5){ maybeBtn.textContent="💖 Theek hai, ₹20 de do 😭"; }
});
