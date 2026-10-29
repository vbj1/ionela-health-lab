(() => {
  const T = {
    ro: {},
    en: {
      'nav.about':'About','nav.gym':'Gym','nav.programs':'Programs','nav.results':'Results','nav.pricing':'Packages','nav.faq':'FAQ','nav.cta':'Book now',
      'dock.home':'Home','dock.gym':'Gym','dock.pricing':'Packages','dock.contact':'Contact',
      'hero.chip':'Brașov · Gym · Online',
      'hero.title':'Love your body <em>while you</em> transform it.',
      'hero.lead':'Gym strength training and nutrition without extremes, built around your life. Together, step by step, with results that last.',
      'hero.cta1':'Start your transformation','hero.cta2':'See programs',
      'stats.1':'Instagram followers','stats.2':'trainer + nutritionist','stats.3':'personalised plan',
      'tk.1':'Strength','tk.2':'Toning','tk.3':'Mobility','tk.4':'Nutrition','tk.5':'Consistency',
      'f.1t':'Strength training','f.1s':'proper technique, real progress','f.2t':'Online or Brașov','f.2s':'wherever suits you',
      'about.eyebrow':'About me','about.title':"Hi, I'm Ionela.",
      'about.p1':"I'm a personal trainer and nutritionist, and the gym is my second home. My mission is simple: help you feel good in your own skin. I believe in a gentle but consistent approach: no shame, no restrictions, no miracle fixes.",
      'about.p2':'At Ionela Health Lab I combine nutrition science with strength training and enjoyable movement, in a plan made just for you and your lifestyle.',
      'about.t1':'Approach centred on women','about.t2':'Measurable progress, not pressure','about.t3':'Constant support between sessions',
      'prog.eyebrow':'Programs','prog.title':'Choose the path that fits you',
      'gym.eyebrow':'In the gym','gym.title':'Strength is built in the gym.','gym.lead':"Strength training for women, with proper technique and clear progression. You learn the basics, squats, deadlifts, presses, without the intimidation and without feeling shy around weights.",
      'gym.1t':'Strength','gym.1p':'Lift heavy, safely','gym.2t':'Toning','gym.2p':'A defined shape, not just weight loss','gym.3t':'Technique','gym.3p':'Every exercise explained in plain words','gym.4t':'Progression','gym.4p':'A little more, week after week','gym.cta':'Book your first session',
      'prog.1t':'Personal training at the gym','prog.1p':'Face-to-face sessions in Brașov, at the gym: proper technique, progressive loading and real motivation.',
      'prog.2t':'Online coaching','prog.2p':'Training plan in an app, video feedback and weekly check-ins, from anywhere.',
      'prog.3t':'Personalised nutrition','prog.3p':'Balanced, flexible meal plans explained simply. No hunger, no guilt.',
      'prog.4t':'12-week transformation','prog.4p':'The complete programme: training + nutrition + mindset, with daily support throughout.',
      'res.eyebrow':'Results','res.title':'Progress shows, year after year','res.p':'A client, the same exercise, a year of consistency. Steadier execution, better posture and more confidence in every rep.',
      'fuel.eyebrow':'Nutrition','fuel.title':'Food that fuels your training','fuel.lead':'No forbidden foods. Simple, colourful, protein-rich meals you actually want to eat.',
      'pr.eyebrow':'Packages','pr.title':'Pick the package that suits you','pr.note':'Prices are agreed together with Ionela.','pr.ask':'On request','pr.pop':'Most popular','pr.cta':'Choose',
      'pr.1t':'Start','pr.1a':'Initial consultation','pr.1b':'Training plan','pr.1c':'Nutrition guidelines',
      'pr.2t':'Transformation','pr.2a':'Training + custom meal plan','pr.2b':'Weekly check-in','pr.2c':'Daily chat support','pr.2d':'Continuous adjustments',
      'pr.3t':'1:1 Sessions','pr.3a':'Face-to-face gym training, Brașov','pr.3b':'Technique and progression','pr.3c':'Flexible schedule',
      'pc.eyebrow':'How it works','pc.title':'3 simple steps',
      'pc.1t':"We get to know each other",'pc.1p':'We talk goals, lifestyle and what has worked for you so far.',
      'pc.2t':'You get your plan','pc.2p':'Training and nutrition tailored to you, explained clearly.',
      'pc.3t':'We progress together','pc.3p':'We adjust weekly and celebrate every win.',
      'faq.eyebrow':'FAQ','faq.title':'Any questions?',
      'faq.1q':"Can I start if I've never exercised?",'faq.1a':'Absolutely. The plan starts from your current level and builds up gradually and safely.',
      'faq.2q':'How does the online option work?','faq.2a':'You get the plan in an app, send feedback and videos, and I adjust weekly.',
      'faq.3q':'Do I have to follow a strict diet?','faq.3a':'No. We build flexible, sustainable habits with no forbidden foods.',
      'faq.4q':'Where are in-person sessions held?','faq.4a':'In Brașov. We agree the exact location at the first meeting.',
      'ct.eyebrow':"Let's talk",'ct.title':'Ready to start?','ct.p':"Message me and we'll book an intro call. I reply as soon as I can.",
      'ct.name':'Name','ct.contact':'Phone or email','ct.goal':'Your goal','ct.send':'Send'
    }
  };
  const ro = {};
  document.querySelectorAll('[data-i18n],[data-i18n-html]').forEach(el => {
    const k = el.dataset.i18n || el.dataset.i18nHtml;
    ro[k] = el.dataset.i18nHtml ? el.innerHTML : el.textContent;
  });
  T.ro = ro;

  const msgs = {
    ro: { ok: 'Mulțumesc! Revin cu un răspuns în curând (demo, nu se trimite încă).', err: 'Completează numele și un contact.' },
    en: { ok: "Thank you! I'll reply soon (demo, not actually sent yet).", err: 'Please fill in your name and a contact.' }
  };
  let lang = 'ro';
  try { const s = localStorage.getItem('ihl-lang'); if (s) lang = s; } catch (e) {}

  function apply(l) {
    lang = l;
    document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = T[l][el.dataset.i18n]; if (v != null) el.textContent = v; });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = T[l][el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
    try { localStorage.setItem('ihl-lang', l); } catch (e) {}
  }
  apply(lang);
  document.querySelectorAll('.lang').forEach(b => b.addEventListener('click', () => apply(lang === 'ro' ? 'en' : 'ro')));

  // pointer-follow specular highlight on glass
  document.addEventListener('pointermove', e => {
    const g = e.target.closest && e.target.closest('.glass');
    if (!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    g.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  // reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .12 });
  document.querySelectorAll('.card,.ba,.plan,.steps li,details,.about>*,.contact,.sec-head').forEach(el => { el.classList.add('rv'); io.observe(el); });

  // count-up
  const c = document.querySelector('[data-count]');
  if (c) {
    const target = +c.dataset.count, t0 = performance.now();
    const tick = t => { const p = Math.min((t - t0) / 1400, 1); c.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('ro-RO'); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  // demo form
  const f = document.getElementById('form'), m = document.getElementById('msg');
  f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    m.textContent = d.get('name').trim() && d.get('contact').trim() ? msgs[lang].ok : msgs[lang].err;
    if (d.get('name').trim() && d.get('contact').trim()) f.reset();
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
