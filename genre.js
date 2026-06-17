(function () {
  'use strict';

  // ====================================================================
  //  Content — themed chapters. Each chapter is a scene/lineage; each
  //  round inside it is a niche sub-genre with a couple of example tracks.
  //  You guess the sub-genre; distractors are drawn from siblings first.
  // ====================================================================
  const CHAPTERS = [
    {
      id: 'hcc', title: 'The Hardcore Continuum', scene: 'London · 1991–2020',
      intro: 'One unbroken thread of British dance music — built on pirate radio, sound systems and sped-up breakbeats, each style mutating into the next.',
      outro: 'From rave hardcore to drill, the same sub-bass and pirate-radio DNA runs through thirty years of London.',
      rounds: [
        { genre: 'Breakbeat Hardcore', note: 'Early-’90s UK rave: chopped funk breaks, ravey stabs and helium vocals — the big bang of the continuum.',
          tracks: [ { title: 'Charly', artist: 'The Prodigy' }, { title: 'On a Ragga Tip', artist: 'SL2' } ] },
        { genre: 'Jungle', note: 'Hardcore’s breakbeats chopped faster and fused with reggae basslines and ragga vocals.',
          tracks: [ { title: 'Original Nuttah', artist: 'UK Apache & Shy FX' }, { title: 'Incredible', artist: 'M-Beat' } ] },
        { genre: 'UK Garage', note: 'Smoother, swung 2-step with soulful vocal chops — champagne raves and pirate sets.',
          tracks: [ { title: 'Re-Rewind (The Crowd Say Bo Selecta)', artist: 'Artful Dodger' }, { title: 'Crazy Love', artist: 'MJ Cole' } ] },
        { genre: 'Grime', note: 'Garage gone dark and aggressive at 140bpm, with rapid-fire MCs over icy synths.',
          tracks: [ { title: 'I Luv U', artist: 'Dizzee Rascal' }, { title: 'Eskimo', artist: 'Wiley' } ] },
        { genre: 'Dubstep', note: 'Half-time, sub-bass wobble and cavernous space carved out of garage’s skip.',
          tracks: [ { title: 'Midnight Request Line', artist: 'Skream' }, { title: 'Scary Monsters and Nice Sprites', artist: 'Skrillex' } ] },
        { genre: 'UK Drill', note: 'Sliding 808s and grime cadence over Chicago drill’s menace — late-2010s London.',
          tracks: [ { title: 'Know Better', artist: 'Headie One' }, { title: 'Day in the Life', artist: 'Central Cee' } ] },
      ],
    },
    {
      id: 'midwest', title: 'Machine Soul', scene: 'Chicago & Detroit · 1985–2010',
      intro: 'Where dance music was rebuilt from drum machines — the warehouse, the TB-303 and the assembly-line city turned into pure rhythm.',
      outro: 'House, techno and footwork all came out of these two cities — Black American electronic music that reshaped the planet.',
      rounds: [
        { genre: 'Chicago House', note: 'Disco rebuilt on a drum machine at the Warehouse club — the 4/4 pulse that started it all.',
          tracks: [ { title: 'Your Love', artist: 'Frankie Knuckles' }, { title: 'Move Your Body', artist: 'Marshall Jefferson' } ] },
        { genre: 'Acid House', note: 'The squelch of the Roland TB-303 turned house psychedelic.',
          tracks: [ { title: 'Acid Tracks', artist: 'Phuture' }, { title: 'Pacific State', artist: '808 State' } ] },
        { genre: 'Detroit Techno', note: 'House’s pulse made colder and futurist — robotic machine-funk from the Motor City.',
          tracks: [ { title: 'Strings of Life', artist: 'Derrick May' }, { title: 'No UFO\'s', artist: 'Model 500' } ] },
        { genre: 'Ghetto House', note: 'Raw, fast, filthy Chicago house — minimal drum tracks and chanted, X-rated hooks.',
          tracks: [ { title: 'Percolator', artist: 'Cajmere' }, { title: 'Run', artist: 'DJ Funk' } ] },
        { genre: 'Footwork', note: 'Chicago’s 160bpm dance-battle music — stuttering, syncopated chopped samples.',
          tracks: [ { title: 'Feelin\'', artist: 'DJ Rashad' }, { title: 'Baby Come On', artist: 'RP Boo' } ] },
      ],
    },
    {
      id: 'sa', title: 'Township Frequencies', scene: 'South Africa · 1994–2022',
      intro: 'Post-apartheid South Africa built its own electronic lineage — house slowed, deepened and reinvented for the townships.',
      outro: 'From kwaito to amapiano, South Africa keeps bending imported house into something unmistakably local — and now globally dominant.',
      rounds: [
        { genre: 'Kwaito', note: 'Post-apartheid house slowed down and toasted over in township slang.',
          tracks: [ { title: 'Nkalakatha', artist: 'Mandoza' }, { title: 'Shibobo', artist: 'TKZee' } ] },
        { genre: 'Gqom', note: 'Durban’s dark, broken, minimal house — raw drums and ominous space.',
          tracks: [ { title: 'Omunye', artist: 'Distruction Boyz' }, { title: 'Ice Drop', artist: 'DJ Lag' } ] },
        { genre: 'Amapiano', note: 'Jazzy keys, airy pads and deep log-drum basslines — the 2020s global dance sound.',
          tracks: [ { title: 'Ke Star', artist: 'Focalistic' }, { title: 'Mnike', artist: 'Tyler ICU' } ] },
        { genre: 'Shangaan Electro', note: 'Limpopo’s hyper-fast (180bpm) marimba-synth dance music.',
          tracks: [ { title: 'Nwampfundla', artist: 'Tshetsha Boys' }, { title: 'Vomaseven', artist: 'Nozinja' } ] },
      ],
    },
    {
      id: 'usclub', title: 'Regional Bounce', scene: 'USA · 1986–2015',
      intro: 'Across American cities, hyper-local club scenes each built their own bass-heavy dance dialect — made for sweaty rooms and block parties.',
      outro: 'Miami, Baltimore, Jersey and New Orleans never went fully mainstream — but their breakbeats and chants seeded club music everywhere.',
      rounds: [
        { genre: 'Miami Bass', note: 'Booming 808 sub-bass and call-and-response chants — Florida’s electro party sound.',
          tracks: [ { title: 'Me So Horny', artist: '2 Live Crew' }, { title: 'Drop the Bass', artist: 'DJ Magic Mike' } ] },
        { genre: 'Baltimore Club', note: 'Breakneck 8-bar house with chopped vocal loops and the Think break.',
          tracks: [ { title: 'I\'m the Ish', artist: 'DJ Class' }, { title: 'Dance My Pain Away', artist: 'Rod Lee' } ] },
        { genre: 'Jersey Club', note: 'Baltimore club’s offspring — bed-squeak kicks and chopped, triplet vocal edits.',
          tracks: [ { title: 'Throw That Ass', artist: 'DJ Sliink' }, { title: 'Body Bag', artist: 'UNIIQU3' } ] },
        { genre: 'Bounce', note: 'New Orleans’ call-and-response party rap built on the Triggerman beat.',
          tracks: [ { title: 'Explode', artist: 'Big Freedia' }, { title: 'Back That Thang Up', artist: 'DJ Jubilee' } ] },
      ],
    },
    {
      id: 'emo', title: 'Loud & Confessional', scene: 'USA · 1985–2008',
      intro: 'When hardcore punk turned its aggression inward — a family of emotional, intricate and cathartic guitar music.',
      outro: 'Emo and post-hardcore stayed underground for years before exploding into the pop-punk mainstream of the 2000s.',
      rounds: [
        { genre: 'Emo', note: '"Emotional hardcore" from D.C. — raw, personal catharsis over punk dynamics.',
          tracks: [ { title: 'Seven', artist: 'Sunny Day Real Estate' }, { title: 'For Want Of', artist: 'Rites of Spring' } ] },
        { genre: 'Midwest Emo', note: 'Twinkly, intricate guitar tapping and unguarded, conversational lyrics.',
          tracks: [ { title: 'Never Meant', artist: 'American Football' }, { title: 'Little League', artist: 'Cap\'n Jazz' } ] },
        { genre: 'Post-Hardcore', note: 'Hardcore’s intensity made angular and dynamic — quiet tension into explosive release.',
          tracks: [ { title: 'Waiting Room', artist: 'Fugazi' }, { title: 'One Armed Scissor', artist: 'At the Drive-In' } ] },
        { genre: 'Pop-Punk', note: 'Punk’s three chords made bright, fast and catchy — radio-ready and bratty.',
          tracks: [ { title: 'Basket Case', artist: 'Green Day' }, { title: 'All the Small Things', artist: 'blink-182' } ] },
      ],
    },
    {
      id: 'afterpunk', title: 'After Punk', scene: 'UK & USA · 1978–1991',
      intro: 'When punk’s energy fractured into art, atmosphere and synthesizers — the alternative underground that shaped everything indie.',
      outro: 'Post-punk’s experiments — drum machines, dub bass, gothic gloom and walls of guitar — became the backbone of alternative music.',
      rounds: [
        { genre: 'Post-Punk', note: 'Punk turned inward and experimental — angular guitars, dub-deep bass and cold, searching atmosphere.',
          tracks: [ { title: 'Love Will Tear Us Apart', artist: 'Joy Division' }, { title: 'Damaged Goods', artist: 'Gang of Four' } ] },
        { genre: 'New Wave', note: 'Punk’s energy channelled into art-school hooks, synths and style — quirky, danceable and radio-ready.',
          tracks: [ { title: 'Once in a Lifetime', artist: 'Talking Heads' }, { title: 'Heart of Glass', artist: 'Blondie' } ] },
        { genre: 'Goth Rock', note: 'Post-punk gone dark and theatrical — chorused guitars, doom-laden bass and graveyard romance.',
          tracks: [ { title: 'Bela Lugosi\'s Dead', artist: 'Bauhaus' }, { title: 'This Corrosion', artist: 'The Sisters of Mercy' } ] },
        { genre: 'Synth-Pop', note: 'New wave with the guitars swapped for synthesizers — sleek, melodic electronic pop.',
          tracks: [ { title: 'Just Can\'t Get Enough', artist: 'Depeche Mode' }, { title: 'Cars', artist: 'Gary Numan' } ] },
        { genre: 'Shoegaze', note: 'Walls of blurred, effect-drenched guitar over dreamy melodies — overwhelming and gorgeous, eyes on the pedals.',
          tracks: [ { title: 'Only Shallow', artist: 'My Bloody Valentine' }, { title: 'Alison', artist: 'Slowdive' } ] },
      ],
    },
    {
      id: 'metal', title: 'The Metal Tree', scene: 'Worldwide · 1980–2005',
      intro: 'Heavy metal split into a dense thicket of extremes — faster, heavier, darker, each subgenre pushing a different limit.',
      outro: 'Thrash bred death and black metal; doom slowed it all down; nu metal and metalcore dragged it into the mainstream.',
      rounds: [
        { genre: 'Thrash Metal', note: 'Punk speed welded to metal riffing — tight, fast, aggressive.',
          tracks: [ { title: 'Master of Puppets', artist: 'Metallica' }, { title: 'Raining Blood', artist: 'Slayer' } ] },
        { genre: 'Death Metal', note: 'Guttural growls, blast beats and brutal, downtuned riffing.',
          tracks: [ { title: 'Pull the Plug', artist: 'Death' }, { title: 'God of Emptiness', artist: 'Morbid Angel' } ] },
        { genre: 'Black Metal', note: 'Tremolo-picked guitars, shrieked vocals and lo-fi, freezing atmosphere.',
          tracks: [ { title: 'Freezing Moon', artist: 'Mayhem' }, { title: 'I Am the Black Wizards', artist: 'Emperor' } ] },
        { genre: 'Doom Metal', note: 'Slow, crushing, blues-heavy riffs and a sense of dread — metal at half speed.',
          tracks: [ { title: 'Black Sabbath', artist: 'Black Sabbath' }, { title: 'Solitude', artist: 'Candlemass' } ] },
        { genre: 'Nu Metal', note: 'Downtuned riffs fused with hip-hop rhythm and rapped vocals — turn-of-the-millennium angst.',
          tracks: [ { title: 'Freak on a Leash', artist: 'Korn' }, { title: 'Chop Suey!', artist: 'System of a Down' } ] },
        { genre: 'Metalcore', note: 'Hardcore breakdowns spliced with melodic death-metal riffing.',
          tracks: [ { title: 'My Curse', artist: 'Killswitch Engage' }, { title: 'Nothing Left', artist: 'As I Lay Dying' } ] },
      ],
    },
    {
      id: 'internet', title: 'Born Online', scene: 'The Internet · 2009–2022',
      intro: 'Genres that grew up on the web — built from samples, irony, blown-out speakers and Discord servers more than any one city.',
      outro: 'Microgenres now form and mutate online in months, not decades — the family tree has gone fully digital.',
      rounds: [
        { genre: 'Vaporwave', note: 'Slowed, chopped ’80s muzak and mall ambience — nostalgic, ironic and woozy.',
          tracks: [ { title: 'リサフランク420 // 現代のコンピュー', artist: 'Macintosh Plus' }, { title: 'Teen Pregnancy', artist: 'Blank Banshee' } ] },
        { genre: 'Hyperpop', note: 'Pop maximised to cartoonish extremes — pitched vocals, blown-out bass and sugar-rush hooks.',
          tracks: [ { title: 'money machine', artist: '100 gecs' }, { title: 'Immaterial', artist: 'SOPHIE' } ] },
        { genre: 'Phonk', note: 'Memphis rap samples, cowbells and distortion — drift-video soundtrack music.',
          tracks: [ { title: 'Close Eyes', artist: 'DVRST' }, { title: 'Murder in My Mind', artist: 'Kordhell' } ] },
        { genre: 'Breakcore', note: 'Frantic, chopped amen breaks at extreme tempos — chaos as a genre.',
          tracks: [ { title: 'Hajnal', artist: 'Venetian Snares' }, { title: 'Come to Daddy', artist: 'Aphex Twin' } ] },
      ],
    },
    {
      id: 'afro', title: 'Afro Diaspora', scene: 'Africa & beyond · 1971–2020',
      intro: 'African scenes fusing local rhythm with funk, house and hip-hop — and exporting the results back across the world.',
      outro: 'From Fela’s afrobeat to today’s afrobeats, West and Central African pop has become one of the dominant sounds on Earth.',
      rounds: [
        { genre: 'Afrobeat', note: 'Fela Kuti’s fusion of Yoruba rhythm, highlife horns, funk and jazz into long political grooves.',
          tracks: [ { title: 'Zombie', artist: 'Fela Kuti' }, { title: 'Secret Agent', artist: 'Tony Allen' } ] },
        { genre: 'Kuduro', note: 'Angola’s frantic, percussive electronic dance music.',
          tracks: [ { title: 'Kalemba (Wegue Wegue)', artist: 'Buraka Som Sistema' }, { title: 'Windeck', artist: 'Cabo Snoop' } ] },
        { genre: 'Azonto', note: 'Ghana’s bouncy, danceable hiplife offshoot of the early 2010s.',
          tracks: [ { title: 'Azonto', artist: 'Fuse ODG' }, { title: 'U Go Kill Me', artist: 'Sarkodie' } ] },
        { genre: 'Afrobeats', note: 'West Africa’s slick modern pop — afrobeat’s descendant blended with dancehall, R&B and hip-hop.',
          tracks: [ { title: 'Essence', artist: 'Wizkid' }, { title: 'Ye', artist: 'Burna Boy' } ] },
      ],
    },
    {
      id: 'latin', title: 'Baile & Perreo', scene: 'Latin America · 1989–2020',
      intro: 'From Rio favelas to San Juan and Santo Domingo — bass-heavy street music built for sweaty dancefloors.',
      outro: 'Reggaeton’s dembow riddim and Brazil’s funk now top charts worldwide — Latin club music become global pop.',
      rounds: [
        { genre: 'Reggaeton', note: 'Jamaican dancehall’s dembow riddim crossed with rap in Spanish — the heartbeat of modern Latin pop.',
          tracks: [ { title: 'Gasolina', artist: 'Daddy Yankee' }, { title: 'Danza Kuduro', artist: 'Don Omar' } ] },
        { genre: 'Dembow', note: 'Dominican street music built on a relentless, stripped-down dembow loop.',
          tracks: [ { title: 'Suave', artist: 'El Alfa' }, { title: 'La Mamá de la Mamá', artist: 'El Alfa' } ] },
        { genre: 'Baile Funk', note: 'Rio’s favela party music — Miami-bass beats and chanted vocals, raw and relentless.',
          tracks: [ { title: 'Bum Bum Tam Tam', artist: 'MC Fioti' }, { title: 'Olha a Explosão', artist: 'MC Kevinho' } ] },
        { genre: 'Funk Ostentação', note: 'São Paulo’s flashy funk — luxury-flexing lyrics over heavy, melodic beats.',
          tracks: [ { title: 'Plaque de 100', artist: 'MC Guimê' }, { title: 'País do Futebol', artist: 'MC Guimê' } ] },
        { genre: 'Brega Funk', note: 'Recife’s melodic, brega-tinged take on funk — slower, catchy and romantic.',
          tracks: [ { title: 'Envolvimento', artist: 'MC Loma e As Gêmeas Lacração' }, { title: 'Tubarão Te Amo', artist: 'Shevchenko e Elloco' } ] },
      ],
    },
  ];

  // Global pool of every sub-genre label (for distractors).
  const ALL_GENRES = [];
  CHAPTERS.forEach((ch) => ch.rounds.forEach((r) => { if (ALL_GENRES.indexOf(r.genre) < 0) ALL_GENRES.push(r.genre); }));

  const INTRO_MS = 12000;
  const MAX_REROLLS = 6;
  const FETCH_TIMEOUT = 7000;

  // ====================================================================
  //  DOM
  // ====================================================================
  const views = {
    start: document.getElementById('vStart'),
    chapter: document.getElementById('vChapter'),
    loading: document.getElementById('vLoading'),
    error: document.getElementById('vError'),
    round: document.getElementById('vRound'),
    reveal: document.getElementById('vReveal'),
    chapterEnd: document.getElementById('vChapterEnd'),
    end: document.getElementById('vEnd'),
  };
  const startBtn = document.getElementById('startBtn');
  const chBeginBtn = document.getElementById('chBeginBtn');
  const retryBtn = document.getElementById('retryBtn');
  const skipBtn = document.getElementById('skipBtn');
  const replayBtn = document.getElementById('replayBtn');
  const anotherBtn = document.getElementById('anotherBtn');
  const nextBtn = document.getElementById('nextBtn');
  const ceNextBtn = document.getElementById('ceNextBtn');
  const replayAllBtn = document.getElementById('replayAllBtn');

  const chKicker = document.getElementById('chKicker');
  const chTitle = document.getElementById('chTitle');
  const chScene = document.getElementById('chScene');
  const chIntro = document.getElementById('chIntro');
  const roundTag = document.getElementById('roundTag');
  const playStateEl = document.getElementById('playState');
  const eqEl = document.getElementById('eq');
  const optionsEl = document.getElementById('options');
  const errorText = document.getElementById('errorText');

  const verdictEl = document.getElementById('verdict');
  const revName = document.getElementById('revName');
  const revMeta = document.getElementById('revMeta');
  const revTrack = document.getElementById('revTrack');
  const revNote = document.getElementById('revNote');

  const ceTitle = document.getElementById('ceTitle');
  const ceOutro = document.getElementById('ceOutro');
  const ceScore = document.getElementById('ceScore');
  const endText = document.getElementById('endText');

  const chapterStat = document.getElementById('chapterStat');
  const footerStreak = document.getElementById('footerStreak');
  const bestEl = document.getElementById('bestScore');
  const player = document.getElementById('player');

  // ====================================================================
  //  State
  // ====================================================================
  let best = parseInt(localStorage.getItem('rt_best') || '0', 10);
  let streak = 0;
  let chapterIdx = parseInt(localStorage.getItem('rt_ch') || '0', 10);
  let roundIdx = parseInt(localStorage.getItem('rt_rd') || '0', 10);
  let chapterCorrect = 0;
  let answered = false;
  let audioCtx = null;
  let introTimer = null;
  let pool = null;       // example tracks for the active round
  let usedIdx = -1;
  let currentMeta = null;

  bestEl.textContent = best;

  // ====================================================================
  //  Helpers
  // ====================================================================
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function show(view) { Object.keys(views).forEach((k) => { views[k].hidden = k !== view; }); }

  function updateFooter() {
    chapterStat.textContent = 'Chapter ' + (chapterIdx + 1) + '/' + CHAPTERS.length;
    footerStreak.textContent = streak;
    bestEl.textContent = best;
  }

  // iTunes preview lookup via JSONP (sidesteps the endpoint's CORS).
  function jsonpSearch(term) {
    return new Promise((resolve, reject) => {
      const cb = 'itunescb_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      let settled = false;
      const cleanup = () => { delete window[cb]; script.remove(); clearTimeout(timer); };
      const timer = setTimeout(() => { if (settled) return; settled = true; cleanup(); reject(new Error('timeout')); }, FETCH_TIMEOUT);
      window[cb] = (data) => { if (settled) return; settled = true; cleanup(); resolve(data); };
      script.onerror = () => { if (settled) return; settled = true; cleanup(); reject(new Error('network')); };
      script.src = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) + '&entity=song&limit=5&callback=' + cb;
      document.body.appendChild(script);
    });
  }

  async function resolvePreview(list, fromIdx) {
    for (let i = fromIdx; i < list.length && i < fromIdx + MAX_REROLLS; i++) {
      try {
        const data = await jsonpSearch(list[i].artist + ' ' + list[i].title);
        const hit = (data.results || []).find((r) => r.previewUrl);
        if (hit) return { meta: hit, idx: i };
      } catch (e) { /* next */ }
    }
    return null;
  }

  // ====================================================================
  //  Sound effects
  // ====================================================================
  function ensureAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }
  function playBuzz() {
    try {
      ensureAudioCtx();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.32);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.42);
    } catch (_) {}
  }
  function playChime() {
    try {
      ensureAudioCtx();
      const now = audioCtx.currentTime;
      [880, 1320, 1760].forEach((freq, i) => {
        const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
        osc.frequency.value = freq; osc.type = 'sine';
        const start = now + i * 0.06;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.22, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(start); osc.stop(start + 0.55);
      });
    } catch (_) {}
  }

  // ====================================================================
  //  Playback
  // ====================================================================
  function stopIntro() {
    clearTimeout(introTimer); introTimer = null;
    try { player.pause(); } catch (_) {}
    eqEl.classList.add('paused');
  }
  function playIntro() {
    clearTimeout(introTimer);
    try { player.currentTime = 0; const p = player.play(); if (p && p.catch) p.catch(() => {}); } catch (_) {}
    eqEl.classList.remove('paused');
    if (!answered) playStateEl.textContent = 'Playing…';
    introTimer = setTimeout(() => {
      stopIntro();
      if (!answered) playStateEl.textContent = 'Name the sub-genre';
    }, INTRO_MS);
  }

  // ====================================================================
  //  Flow
  // ====================================================================
  function startChapter() {
    if (chapterIdx >= CHAPTERS.length) { showEnd(); return; }
    const ch = CHAPTERS[chapterIdx];
    chapterCorrect = 0;
    chKicker.textContent = 'Chapter ' + (chapterIdx + 1) + ' / ' + CHAPTERS.length;
    chTitle.textContent = ch.title;
    chScene.textContent = ch.scene;
    chIntro.textContent = ch.intro;
    updateFooter();
    show('chapter');
  }

  async function loadRound() {
    const ch = CHAPTERS[chapterIdx];
    if (!ch || roundIdx >= ch.rounds.length) { showChapterEnd(); return; }
    answered = false;
    show('loading');
    const round = ch.rounds[roundIdx];

    pool = shuffle(round.tracks);
    const first = await resolvePreview(pool, 0);
    if (!first) {
      errorText.textContent = 'Couldn’t load a track for this one (it may not be on Apple Music). Skip it?';
      show('error');
      return;
    }
    usedIdx = first.idx;
    currentMeta = first.meta;
    player.src = first.meta.previewUrl;

    anotherBtn.hidden = pool.length < 2;
    anotherBtn.disabled = false;
    anotherBtn.textContent = 'Hear another track ↻';

    roundTag.textContent = 'Track ' + (roundIdx + 1) + ' of ' + ch.rounds.length;
    renderOptions(round, ch);
    updateFooter();
    show('round');
    playStateEl.textContent = 'Playing…';
    playIntro();
  }

  async function playAnotherTrack() {
    if (!pool) return;
    anotherBtn.disabled = true;
    anotherBtn.textContent = 'Loading…';
    const next = await resolvePreview(pool, usedIdx + 1);
    if (next) {
      usedIdx = next.idx; currentMeta = next.meta;
      player.src = next.meta.previewUrl; playIntro();
    }
    const more = pool.length - 1 - usedIdx > 0;
    anotherBtn.disabled = !more;
    anotherBtn.textContent = more ? 'Hear another track ↻' : 'No other track';
  }

  function renderOptions(round, ch) {
    const siblings = shuffle(ch.rounds.map((r) => r.genre).filter((g) => g !== round.genre));
    const outside = shuffle(ALL_GENRES.filter((g) => g !== round.genre && siblings.indexOf(g) < 0));
    const distractors = siblings.concat(outside).slice(0, 3);
    const choices = shuffle([round.genre].concat(distractors));

    optionsEl.innerHTML = '';
    choices.forEach((g) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.textContent = g;
      btn.addEventListener('click', () => handleGuess(g, round, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleGuess(choice, round, btn) {
    if (answered) return;
    answered = true;
    stopIntro();
    anotherBtn.disabled = true;

    const correct = choice === round.genre;
    Array.from(optionsEl.querySelectorAll('.option')).forEach((b) => {
      b.disabled = true;
      if (b.textContent === round.genre) b.classList.add('correct');
      else if (b === btn) b.classList.add('wrong');
      else b.classList.add('dim');
    });

    if (correct) {
      streak += 1; chapterCorrect += 1;
      if (streak > best) { best = streak; localStorage.setItem('rt_best', String(best)); }
      playChime();
    } else {
      streak = 0;
      playBuzz();
    }
    updateFooter();
    setTimeout(() => showReveal(round, correct), 600);
  }

  function showReveal(round, correct) {
    verdictEl.textContent = correct ? 'Correct' : 'Not quite';
    verdictEl.className = 'verdict ' + (correct ? 'good' : 'bad');
    revName.textContent = round.genre;
    revMeta.textContent = CHAPTERS[chapterIdx].scene;
    if (currentMeta) {
      revTrack.innerHTML = 'You heard <b>' + escapeHtml(currentMeta.trackName || '') + '</b> — ' + escapeHtml(currentMeta.artistName || '');
      revTrack.hidden = false;
    } else { revTrack.hidden = true; }
    revNote.textContent = round.note || '';
    const ch = CHAPTERS[chapterIdx];
    nextBtn.textContent = (roundIdx >= ch.rounds.length - 1) ? 'Finish chapter' : 'Next track';
    show('reveal');
  }

  function nextRound() {
    roundIdx += 1;
    localStorage.setItem('rt_rd', String(roundIdx));
    const ch = CHAPTERS[chapterIdx];
    if (roundIdx >= ch.rounds.length) showChapterEnd();
    else loadRound();
  }

  function showChapterEnd() {
    const ch = CHAPTERS[chapterIdx];
    ceTitle.textContent = ch.title;
    ceOutro.textContent = ch.outro;
    ceScore.textContent = 'You named ' + chapterCorrect + ' of ' + ch.rounds.length + ' in this chapter.';
    ceNextBtn.textContent = (chapterIdx >= CHAPTERS.length - 1) ? 'See your results' : 'Next chapter';
    show('chapterEnd');
  }

  function nextChapter() {
    chapterIdx += 1; roundIdx = 0;
    localStorage.setItem('rt_ch', String(chapterIdx));
    localStorage.setItem('rt_rd', '0');
    if (chapterIdx >= CHAPTERS.length) showEnd();
    else startChapter();
  }

  function showEnd() {
    endText.innerHTML = 'You travelled <b>' + CHAPTERS.length + '</b> scenes — from the hardcore continuum to the internet underground. Best streak: <b>' + best + '</b>.';
    show('end');
  }

  function resetAll() {
    chapterIdx = 0; roundIdx = 0; streak = 0; chapterCorrect = 0;
    localStorage.setItem('rt_ch', '0'); localStorage.setItem('rt_rd', '0');
    updateFooter();
  }

  // ====================================================================
  //  Events
  // ====================================================================
  startBtn.addEventListener('click', () => { ensureAudioCtx(); startChapter(); });
  chBeginBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  retryBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  skipBtn.addEventListener('click', () => { ensureAudioCtx(); nextRound(); });
  anotherBtn.addEventListener('click', () => { ensureAudioCtx(); playAnotherTrack(); });
  replayBtn.addEventListener('click', () => { ensureAudioCtx(); playIntro(); });
  nextBtn.addEventListener('click', () => { ensureAudioCtx(); nextRound(); });
  ceNextBtn.addEventListener('click', () => { ensureAudioCtx(); nextChapter(); });
  replayAllBtn.addEventListener('click', () => { ensureAudioCtx(); resetAll(); startChapter(); });

  player.addEventListener('playing', () => eqEl.classList.remove('paused'));
  player.addEventListener('pause', () => eqEl.classList.add('paused'));
  player.addEventListener('ended', () => eqEl.classList.add('paused'));

  // ---- Init ----
  if (chapterIdx >= CHAPTERS.length) { chapterIdx = 0; roundIdx = 0; }
  updateFooter();
  if (chapterIdx > 0 || roundIdx > 0) {
    const lead = views.start.querySelector('.lead');
    if (lead) lead.textContent = 'Welcome back — pick up in chapter ' + (chapterIdx + 1) + ' of ' + CHAPTERS.length + '.';
    startBtn.textContent = 'Continue';
  }
  show('start');
})();
