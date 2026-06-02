import { useState, useEffect, useRef, useCallback } from "react";

const HERO_IMG = "/images/vrutik1.jpeg";

const GALLERY_IMGS = [
  { src: "/images/vrutik1.jpeg", label: "Photo 1" },
  { src: "/images/vrutik2.jpeg", label: "Photo 2" },
  { src: "/images/vrutik8.jpeg", label: "Photo 3" },
  { src: "/images/vrutik4.jpeg", label: "Photo 4" },
  { src: "/images/vrutik5.jpeg", label: "Photo 5" },
  { src: "/images/vrutik6.jpeg", label: "Photo 6" },
  { src: "/images/vrutik7.jpeg", label: "Photo 7" },
  { src: "/images/vrutik3.jpeg", label: "Photo 8" },
  { src: "/images/vrutik9.jpeg", label: "Photo 9" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream:#FAF7F2; --cream2:#F3EDE3; --gold:#C9A84C; --gold-lt:#E8D5A0; --gold-dk:#9A7A30;
    --maroon:#7B2D42; --maroon-lt:#A85070; --brown:#4A3728; --text:#2C1810;
    --text-mid:#5C4033; --text-lt:#8C7060; --white:#FFFFFF;
    --shadow:rgba(122,60,48,0.12); --shadow-dk:rgba(44,24,16,0.22);
  }
  html{scroll-behavior:smooth;}
  body{background:var(--cream);font-family:'DM Sans',sans-serif;color:var(--text);overflow-x:hidden;}
  ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:var(--cream2);}::-webkit-scrollbar-thumb{background:var(--gold);border-radius:10px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  @keyframes spinSlow{to{transform:rotate(360deg)}}
  @keyframes borderPulse{0%,100%{opacity:1}50%{opacity:.65}}
  .nav{position:fixed;top:0;left:0;right:0;z-index:300;background:rgba(250,247,242,0.94);backdrop-filter:blur(18px);border-bottom:1px solid var(--gold-lt);padding:10px 20px;display:flex;align-items:center;justify-content:space-between;transition:box-shadow .3s;}
  .nav.scrolled{box-shadow:0 4px 28px var(--shadow-dk);}
  .nav-logo{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:var(--maroon);letter-spacing:.05em;}
  .nav-links{display:flex;gap:22px;list-style:none;}
  .nav-links a{font-size:12px;font-weight:500;color:var(--text-mid);text-decoration:none;letter-spacing:.08em;text-transform:uppercase;transition:color .2s;}
  .nav-links a:hover{color:var(--gold-dk);}
  @media(max-width:680px){.nav-links{display:none;}}
  .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:96px 20px 56px;position:relative;overflow:hidden;
    background:radial-gradient(ellipse at 15% 20%,rgba(201,168,76,.14) 0%,transparent 55%),radial-gradient(ellipse at 85% 80%,rgba(123,45,66,.1) 0%,transparent 50%),var(--cream);}
  .hero-ornament{position:absolute;font-size:280px;opacity:.025;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;font-family:'Cormorant Garamond',serif;color:var(--gold);animation:spinSlow 90s linear infinite;}
  .hero-ring{width:200px;height:200px;border-radius:50%;padding:4px;background:linear-gradient(135deg,var(--gold),var(--maroon),var(--gold-lt));margin-bottom:26px;position:relative;box-shadow:0 18px 50px var(--shadow-dk);animation:borderPulse 3s ease-in-out infinite;}
  .hero-ring img{width:100%;height:100%;border-radius:50%;object-fit:cover;border:4px solid var(--cream);}
  .hero-ring::after{content:'';position:absolute;inset:-10px;border-radius:50%;border:1px dashed var(--gold-lt);animation:spinSlow 22s linear infinite;}
  .hero-tag{font-size:10px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--gold-dk);margin-bottom:10px;text-align:center;}
  .hero-name{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,7vw,70px);font-weight:700;color:var(--maroon);letter-spacing:-.01em;line-height:1;text-align:center;margin-bottom:8px;}
  .hero-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(15px,2.4vw,20px);color:var(--text-mid);text-align:center;margin-bottom:20px;}
  .divider-line{width:110px;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:14px auto;}
  .pills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:28px;}
  .pill{padding:5px 14px;border-radius:100px;font-size:12px;font-weight:500;background:var(--white);border:1px solid var(--gold-lt);color:var(--text-mid);box-shadow:0 2px 8px var(--shadow);}
  .cta-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
  .btn-p{padding:12px 28px;border-radius:6px;font-size:12px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;background:linear-gradient(135deg,var(--maroon),var(--maroon-lt));color:var(--white);border:none;cursor:pointer;transition:all .3s;box-shadow:0 6px 20px rgba(123,45,66,.28);}
  .btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(123,45,66,.38);}
  .btn-o{padding:12px 28px;border-radius:6px;font-size:12px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;background:transparent;color:var(--maroon);border:1.5px solid var(--maroon);cursor:pointer;transition:all .3s;}
  .btn-o:hover{background:var(--maroon);color:var(--white);transform:translateY(-2px);}
  .scroll-hint{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;opacity:.45;}
  .scroll-hint span:first-child{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--text-lt);}
  .scroll-hint span:last-child{font-size:18px;color:var(--gold);animation:floatY 2s ease-in-out infinite;}
  .quote-strip{background:linear-gradient(90deg,transparent,var(--cream2),transparent);border-top:1px solid var(--gold-lt);border-bottom:1px solid var(--gold-lt);padding:16px 24px;text-align:center;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:var(--text-mid);}
  .section{padding:72px 20px;max-width:1080px;margin:0 auto;}
  .eyebrow{font-size:10px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--gold-dk);text-align:center;margin-bottom:8px;}
  .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,46px);font-weight:700;color:var(--maroon);text-align:center;margin-bottom:6px;}
  .sec-sub{font-size:13px;color:var(--text-lt);text-align:center;margin-bottom:40px;}
  .orn{display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:40px;}
  .orn::before,.orn::after{content:'';flex:1;max-width:100px;height:1px;background:linear-gradient(90deg,transparent,var(--gold));}
  .orn::after{background:linear-gradient(90deg,var(--gold),transparent);}
  .orn span{font-size:16px;color:var(--gold);}
  .card{background:var(--white);border-radius:14px;border:1px solid rgba(201,168,76,.22);box-shadow:0 4px 20px var(--shadow);padding:28px;transition:transform .3s,box-shadow .3s;}
  .card:hover{transform:translateY(-4px);box-shadow:0 12px 36px var(--shadow-dk);}
  .c-icon{width:40px;height:40px;border-radius:9px;background:linear-gradient(135deg,var(--gold-lt),var(--cream2));display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:14px;border:1px solid var(--gold-lt);}
  .c-title{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:700;color:var(--maroon);margin-bottom:16px;}
  .drow{display:flex;padding:10px 0;border-bottom:1px solid var(--cream2);gap:14px;align-items:flex-start;}
  .drow:last-child{border-bottom:none;}
  .dlabel{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:var(--text-lt);width:120px;flex-shrink:0;padding-top:2px;}
  .dval{font-size:13.5px;color:var(--text);line-height:1.6;}
  .dval strong{color:var(--maroon);font-weight:600;}
  .badge{display:inline-block;padding:2px 9px;border-radius:100px;font-size:10px;font-weight:500;background:var(--cream2);border:1px solid var(--gold-lt);color:var(--gold-dk);margin-top:3px;}
  .grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;}
  @media(max-width:760px){.grid2{grid-template-columns:1fr;}}
  .prop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
  @media(max-width:740px){.prop-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:460px){.prop-grid{grid-template-columns:1fr;}}
  .prop-card{background:var(--white);border-radius:13px;padding:22px;border:1px solid rgba(201,168,76,.22);box-shadow:0 4px 14px var(--shadow);text-align:center;transition:transform .3s,box-shadow .3s;}
  .prop-card:hover{transform:translateY(-4px);box-shadow:0 10px 28px var(--shadow-dk);}
  .prop-ic{font-size:30px;margin-bottom:10px;}
  .prop-t{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;color:var(--maroon);margin-bottom:5px;}
  .prop-d{font-size:12.5px;color:var(--text-lt);line-height:1.5;}
  .gal-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
  @media(max-width:600px){.gal-grid{grid-template-columns:repeat(2,1fr);}}
  .gal-item{aspect-ratio:3/4;border-radius:12px;overflow:hidden;cursor:pointer;position:relative;border:1px solid var(--gold-lt);box-shadow:0 4px 14px var(--shadow);transition:transform .3s,box-shadow .3s;}
  .gal-item:hover{transform:scale(1.03);box-shadow:0 10px 28px var(--shadow-dk);}
  .gal-item img{width:100%;height:100%;object-fit:content;object-position:center;transition:transform .5s;}
  .gal-item:hover img{transform:scale(1.07);}
  .gal-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(44,24,16,.6) 0%,transparent 55%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:12px;}
  .gal-item:hover .gal-ov{opacity:1;}
  .gal-ov span{font-size:11px;color:var(--white);font-weight:500;}
  .modal-bg{position:fixed;inset:0;z-index:500;background:rgba(10,5,2,.93);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;animation:fadeIn .22s ease;}
  .modal-wrap{position:relative;display:flex;flex-direction:column;align-items:center;animation:scaleIn .28s ease;}
  .modal-img-box{position:relative;overflow:hidden;border-radius:12px;border:2px solid var(--gold-lt);box-shadow:0 24px 72px rgba(0,0,0,.6);width:min(82vw,600px);height:min(80vh,720px);cursor:zoom-in;}
  .modal-img-box img{width:100%;height:100%;object-fit:contain;object-position:top center;transition:transform .25s;pointer-events:none;}
  .m-close{position:absolute;top:-46px;right:0;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.12);border:1.5px solid var(--gold-lt);color:var(--gold-lt);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(8px);}
  .m-close:hover{background:var(--maroon);border-color:var(--maroon);color:var(--white);}
  .m-nav{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.13);border:1.5px solid var(--gold-lt);color:var(--white);font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(8px);}
  .m-nav:hover{background:var(--gold);border-color:var(--gold);}
  .m-nav.prev{left:-52px;}.m-nav.next{right:-52px;}
  @media(max-width:580px){.m-nav.prev{left:-40px;}.m-nav.next{right:-40px;}}
  .m-ctrl{display:flex;gap:8px;align-items:center;margin-top:14px;}
  .m-btn{width:38px;height:38px;border-radius:50%;border:1.5px solid var(--gold-lt);background:rgba(255,255,255,.1);color:var(--gold-lt);font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;backdrop-filter:blur(8px);}
  .m-btn:hover{background:var(--gold);color:var(--white);border-color:var(--gold);}
  .m-info{margin-top:10px;text-align:center;}
  .m-info-label{font-size:13px;color:var(--white);font-weight:600;}
  .m-info-loc{font-size:11px;color:rgba(255,255,255,.5);letter-spacing:.08em;margin-top:2px;}
  .m-hint{font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.1em;text-transform:uppercase;margin-top:8px;}
  .contact-card{background:linear-gradient(135deg,#7B2D42 0%,#A0384E 100%);border-radius:18px;padding:44px 36px;text-align:center;box-shadow:0 16px 48px rgba(123,45,66,.32);position:relative;overflow:hidden;}
  .contact-card::before,.contact-card::after{content:'';position:absolute;border-radius:50%;}
  .contact-card::before{width:380px;height:380px;border:1px solid rgba(255,255,255,.07);top:-150px;right:-90px;}
  .contact-card::after{width:280px;height:280px;border:1px solid rgba(255,255,255,.05);bottom:-100px;left:-70px;}
  .ct-title{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;color:var(--white);margin-bottom:6px;}
  .ct-sub{font-size:13px;color:rgba(255,255,255,.65);margin-bottom:28px;}
  .ct-items{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:28px;}
  .ct-item{background:rgba(255,255,255,.12);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:14px 20px;display:flex;align-items:center;gap:10px;transition:background .2s;}
  .ct-item:hover{background:rgba(255,255,255,.18);}
  .ct-ic{font-size:20px;}
  .ct-lbl{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.55);}
  .ct-val{font-size:14px;font-weight:600;color:var(--white);}
  footer{background:#2C1810;color:rgba(255,255,255,.45);text-align:center;padding:22px;font-size:11px;letter-spacing:.05em;}
  footer strong{color:var(--gold-lt);}
  .afu{animation:fadeUp .75s ease both;}
  .d1{animation-delay:.08s;}.d2{animation-delay:.16s;}.d3{animation-delay:.24s;}.d4{animation-delay:.32s;}.d5{animation-delay:.4s;}
`;

function PhotoModal({ idx, onClose, onNav }) {
  const [zoom, setZoom] = useState(1);
  const [pos, setPos]   = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);
  const photo  = GALLERY_IMGS[idx];

  useEffect(() => { setZoom(1); setPos({ x:0, y:0 }); }, [idx]);

  useEffect(() => {
    const fn = e => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onNav(-1);
      if (e.key === "ArrowRight")  onNav(1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onNav]);

  const handleWheel = useCallback(e => {
    e.preventDefault();
    setZoom(z => Math.min(4, Math.max(0.8, z - e.deltaY * 0.002)));
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-wrap" onClick={e => e.stopPropagation()}>
        <button className="m-close" onClick={onClose}>✕</button>
        <button className="m-nav prev" onClick={() => onNav(-1)}>‹</button>
        <button className="m-nav next" onClick={() => onNav(1)}>›</button>

        <div ref={boxRef} className="modal-img-box"
          style={{ cursor: zoom > 1 ? (drag ? "grabbing" : "grab") : "zoom-in" }}
          onMouseDown={e => { if (zoom > 1) { setDrag(true); setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y }); } }}
          onMouseMove={e => { if (drag && zoom > 1) setPos({ x: e.clientX - start.x, y: e.clientY - start.y }); }}
          onMouseUp={() => setDrag(false)}
          onMouseLeave={() => setDrag(false)}
          onClick={() => zoom === 1 && setZoom(2)}
        >
          <img src={photo.src} alt={photo.label}
            style={{ transform: `scale(${zoom}) translate(${pos.x/zoom}px,${pos.y/zoom}px)`,
              transition: drag ? "none" : "transform .25s ease" }} />
        </div>

        <div className="m-ctrl">
          <button className="m-btn" onClick={() => setZoom(z => Math.max(.8, z - .3))}>−</button>
          <button className="m-btn" onClick={() => { setZoom(1); setPos({ x:0,y:0 }); }}>⟳</button>
          <button className="m-btn" onClick={() => setZoom(z => Math.min(4, z + .3))}>+</button>
          <span style={{ fontSize:10, color:"rgba(255,255,255,.4)", minWidth:32, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
        </div>

        <div className="m-info">
          <div className="m-info-label">{photo.label}</div>
          <div className="m-info-loc">📍 {photo.loc}</div>
          <div className="m-hint">{idx+1} of {GALLERY_IMGS.length} · Click to zoom · Drag to pan · ← → navigate</div>
        </div>
      </div>
    </div>
  );
}

function downloadBiodata() {
  const txt = `
╔═══════════════════════════════════════════════════════════════╗
║             MATRIMONIAL BIODATA — VRUTIK PATEL               ║
╚═══════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━  PERSONAL DETAILS  ━━━━━━━━━━━━━━━━━━━━━━━━

  Full Name          :  Vrutik Patel
  Age                :  23 Years
  Height             :  5 Feet 5 Inches
  Religion           :  Hindu
  Caste              :  Patel (Kadva patel)
  Mother Tongue      :  Gujarati
  Marital Status     :  Unmarried

  Education          :  • B.Sc. in Chemistry  (Completed)
                        • MCA — Master of Computer Applications (Completed)
  Occupation         :  Software Developer / MCA Graduate
  Address            :  Patidar Society, Berna Road, Himatnagar, Gujarat

━━━━━━━━━━━━━━━━━━  FAMILY DETAILS  ━━━━━━━━━━━━━━━━━━━━━━━━━━

  Father             :  Patel Vijaybhai Narsinhbhai  (Teacher — Govt.)
  Mother             :  Patel Chetna Ben  (Home Maker)
  Siblings           :  1 Sister  (Pursuing BVSc — Veterinary Doctor)
  Family Type        :  Traditional · Well-Settled
  Family Values      :  Religious, Educated, Progressive
  Native             :  Himatnagar, Sabarkantha, Gujarat

━━━━━━━━━━━━━━━━━━  PROPERTY DETAILS  ━━━━━━━━━━━━━━━━━━━━━━━━

  • Own Residential House — Himatnagar
  • One Plot in Himatnagar (shared between two brothers)
  • 5.5 Vigha Agricultural Land (Ancestral Jamin)

━━━━━━━━━━━━━━━━━━  CONTACT  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Phone              :  —
  Email              :  —
  Location           :  Himatnagar, Gujarat

═══════════════════════════════════════════════════════════════
`;
  const b = new Blob([txt], { type:"text/plain" });
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u; a.download = "Vrutik_Patel_Biodata.txt";
  a.click(); URL.revokeObjectURL(u);
}

export default function App() {
  const [modalIdx, setModalIdx] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openModal  = i  => { setModalIdx(i); document.body.style.overflow = "hidden"; };
  const closeModal = () => { setModalIdx(null); document.body.style.overflow = ""; };
  const navModal   = useCallback(dir => setModalIdx(i => (i+dir+GALLERY_IMGS.length)%GALLERY_IMGS.length), []);
  const go         = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      <style>{css}</style>

      {modalIdx !== null && <PhotoModal idx={modalIdx} onClose={closeModal} onNav={navModal} />}

      {/* NAV */}
      <nav className={`nav${scrolled?" scrolled":""}`}>
        <div className="nav-logo">VP ✦</div>
        <ul className="nav-links">
          {[["About","personal"],["Family","family"],["Property","property"],["Gallery","gallery"],["Contact","contact"]].map(([l,id])=>(
            <li key={id}><a href={`#${id}`} onClick={e=>{e.preventDefault();go(id);}}>{l}</a></li>
          ))}
        </ul>
        <button className="btn-p" style={{fontSize:11,padding:"7px 16px"}} onClick={downloadBiodata}>↓ Biodata</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-ornament">✦</div>
        <p className="hero-tag afu d1">✦ Matrimonial Biodata ✦</p>
        <div className="hero-ring afu d2" style={{animationName:"scaleIn"}}>
          <img src={HERO_IMG} alt="Vrutik Patel" />
        </div>
        <div className="afu d3" style={{textAlign:"center"}}>
          <h1 className="hero-name">Vrutik Patel</h1>
          <p className="hero-sub">Software Developer · MCA Graduate</p>
          <div className="divider-line"/>
        </div>
        <div className="pills afu d4">
          {["Age: 23","Height: 5′5″","Hindu · Patidar (Kadva Patel)","Himatnagar, Gujarat"].map(t=>(
            <span className="pill" key={t}>{t}</span>
          ))}
        </div>
        <div className="cta-row afu d5">
          <button className="btn-p" onClick={()=>go("contact")}>Get in Touch</button>
          <button className="btn-o" onClick={downloadBiodata}>↓ Download Biodata</button>
        </div>
        <div className="scroll-hint">
          <span>scroll</span><span>↓</span>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-strip">
        "A well-settled, educated young man from a traditional Patidar family — seeking a life partner to build a beautiful future together."
      </div>

      {/* PERSONAL */}
      <section className="section" id="personal">
        <p className="eyebrow">About Me</p>
        <h2 className="sec-title">Personal Details</h2>
        <div className="orn"><span>❧</span></div>
        <div className="grid2">
          <div className="card afu d1">
            <div className="c-icon">👤</div>
            <h3 className="c-title">Basic Information</h3>
            {[
              ["Full Name", <strong>Vrutik Patel</strong>],
              ["Age",       "23 Years"],
              ["Height",    "5 Feet 5 Inches"],
              ["Religion",  <><strong>Hindu</strong></>],
              ["Caste",     "Patidar (Kadva patel)"],
              ["Marital",   "Unmarried"],
              // ["Language",  "Gujarati · Hindi · English"],
            ].map(([l,v])=>(
              <div className="drow" key={l}>
                <span className="dlabel">{l}</span>
                <span className="dval">{v}</span>
              </div>
            ))}
          </div>
          <div className="card afu d2">
            <div className="c-icon">🎓</div>
            <h3 className="c-title">Education & Career</h3>
            {[
              ["Education", <>
                <div style={{marginBottom:8}}>
                  <span className="badge">Completed</span>
                  <div style={{marginTop:4}}>B.Sc. in Chemistry</div>
                </div>
                <div>
                  <span className="badge">Completed</span>
                  <div style={{marginTop:4}}>MCA — Master of Computer Applications</div>
                </div>
              </>],
              ["Occupation",<><strong>Software Developer</strong> / MCA Graduate</>],
              ["Address",   "Patidar Society, Berna Road, Himatnagar, Gujarat"],
              // ["Hobbies",   "Travelling · Coding · Photography"],
            ].map(([l,v])=>(
              <div className="drow" key={l}>
                <span className="dlabel">{l}</span>
                <span className="dval">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{background:"var(--cream2)",padding:"72px 0"}} id="family">
        <div style={{maxWidth:1080,margin:"0 auto",padding:"0 20px"}}>
          <p className="eyebrow">Our Family</p>
          <h2 className="sec-title">Family Details</h2>
          <div className="orn"><span>❧</span></div>
          <div className="grid2">
            <div className="card afu d1">
              <div className="c-icon">👨‍👩‍👧‍👦</div>
              <h3 className="c-title">Family Members</h3>
              {[
                ["Father",        "Patel Vijaybhai Narsinhbhai"],
                ["Father's Occ.", "Teacher (Government)"],
                ["Mother",        "Patel ChetnaBen"],
                ["Mother's Occ.", "House Wife"],
                ["Siblings",      "1 Sister"],
                ["Sister",        "Pursuing BVSc — Veterinary Doctor"],
              ].map(([l,v])=>(
                <div className="drow" key={l}>
                  <span className="dlabel">{l}</span>
                  <span className="dval">{v}</span>
                </div>
              ))}
            </div>
            <div className="card afu d2">
              <div className="c-icon">🏡</div>
              <h3 className="c-title">Family Background</h3>
              {[
                ["Family Type",  "Traditional · Well-Settled"],
                ["Values",       "Religious, Educated, Progressive"],
                ["Native Place", "Himatnagar, Sabarkantha, Gujarat"],
                ["Community",    "Kadva Patidar Samaj"],
                ["Village" , "Berna (Himatnagar)"],
                // ["About",        "A warm, culturally rich family that values traditions while embracing modern education and values."],
              ].map(([l,v])=>(
                <div className="drow" key={l}>
                  <span className="dlabel">{l}</span>
                  <span className="dval">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY */}
      <section className="section" id="property">
        <p className="eyebrow">Assets & Property</p>
        <h2 className="sec-title">Property Details</h2>
        <div className="orn"><span>❧</span></div>
        <div className="prop-grid">
          {[
            {ic:"🏠",t:"Residential House (પોતાનું ઘર Himatnagar માં)",d:"Own residential house in Himatnagar — fully owned by the family."},
            {ic:"📐",t:"Plot in Himatnagar (એક પ્લોટ Himatnagar માં  બે ભાઈ વચ્ચે)",d:"One plot in Himatnagar, shared between two brothers — prime location."},
            {ic:"🌾",t:"Agricultural Land (જમીન:- 5.5 વીઘા)",d:"5.5 Vigha fertile agricultural land — family's ancestral jamin."},
          ].map((p,i)=>(
            <div className={`prop-card afu d${i+1}`} key={i}>
              <div className="prop-ic">{p.ic}</div>
              <div className="prop-t">{p.t}</div>
              <div className="prop-d">{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section style={{background:"var(--cream2)",padding:"72px 0"}} id="gallery">
        <div style={{maxWidth:1080,margin:"0 auto",padding:"0 20px"}}>
          <p className="eyebrow">Photo Gallery</p>
          <h2 className="sec-title">My Photos</h2>
          <p className="sec-sub">Click any photo to view fullscreen · Scroll to zoom · Drag to pan</p>
          <div className="orn"><span>❧</span></div>
          <div className="gal-grid">
            {GALLERY_IMGS.map((p,i)=>(
              <div className={`gal-item afu d${(i%5)+1}`} key={i} onClick={()=>openModal(i)}>
                <img src={p.src} alt={p.label} loading="lazy" />
                <div className="gal-ov">
                  <span>🔍 {p.label}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{textAlign:"center",marginTop:16,fontSize:11,color:"var(--text-lt)",letterSpacing:".08em"}}>
            ← Arrow keys to navigate in fullscreen →
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <p className="eyebrow">Reach Out</p>
        <h2 className="sec-title">Contact Information</h2>
        <div className="orn"><span>❧</span></div>
        <div className="contact-card">
          <h3 className="ct-title">Let's Connect</h3>
          <p className="ct-sub">We would be happy to hear from you. Please feel free to reach out anytime.</p>
          <div className="ct-items">
            {[
              {ic:"📞",l:"Phone",v:"—"},
              {ic:"✉️",l:"Email",v:"—"},
              {ic:"📍",l:"Location",v:"Himatnagar, Gujarat"},
              // {ic:"🕐",l:"Best Time",v:"Evenings 6–9 PM"},
            ].map((c,i)=>(
              <div className="ct-item" key={i}>
                <span className="ct-ic">{c.ic}</span>
                <div>
                  <div className="ct-lbl">{c.l}</div>
                  <div className="ct-val">{c.v}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-p" style={{background:"rgba(255,255,255,.18)",border:"1.5px solid rgba(255,255,255,.4)",backdropFilter:"blur(8px)"}}
            onClick={downloadBiodata}>↓ Download Full Biodata</button>
        </div>
      </section>

      <footer>
        <p>Matrimonial Biodata of <strong>Vrutik Patel</strong> · Himatnagar, Gujarat</p>
        <p style={{marginTop:5,opacity:.5,fontSize:10}}>Crafted with ♥ for a beautiful future together</p>
      </footer>
    </>
  );
}
