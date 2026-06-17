(function () {
  // ---- Song pool, grouped by genre --------------------------------------
  // Curated well-known tracks so the iTunes Search API resolves them reliably.
  // The game's genre labels are our own; we match on title + artist.
  const SONGS = {
    'Pop': [
      { title: 'Billie Jean', artist: 'Michael Jackson' },
      { title: 'Shake It Off', artist: 'Taylor Swift' },
      { title: 'Bad Romance', artist: 'Lady Gaga' },
      { title: 'Rolling in the Deep', artist: 'Adele' },
      { title: 'Firework', artist: 'Katy Perry' },
      { title: 'Shape of You', artist: 'Ed Sheeran' },
      { title: '...Baby One More Time', artist: 'Britney Spears' },
    ],
    'Rock': [
      { title: 'Bohemian Rhapsody', artist: 'Queen' },
      { title: 'Smells Like Teen Spirit', artist: 'Nirvana' },
      { title: 'Back in Black', artist: 'AC/DC' },
      { title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
      { title: 'Hotel California', artist: 'Eagles' },
      { title: 'Seven Nation Army', artist: 'The White Stripes' },
    ],
    'Hip-Hop': [
      { title: 'Lose Yourself', artist: 'Eminem' },
      { title: 'HUMBLE.', artist: 'Kendrick Lamar' },
      { title: 'In Da Club', artist: '50 Cent' },
      { title: 'SICKO MODE', artist: 'Travis Scott' },
      { title: "God's Plan", artist: 'Drake' },
      { title: 'Juicy', artist: 'The Notorious B.I.G.' },
    ],
    'Country': [
      { title: 'Jolene', artist: 'Dolly Parton' },
      { title: 'Friends in Low Places', artist: 'Garth Brooks' },
      { title: 'Take Me Home, Country Roads', artist: 'John Denver' },
      { title: 'Cruise', artist: 'Florida Georgia Line' },
      { title: 'Before He Cheats', artist: 'Carrie Underwood' },
      { title: 'The Gambler', artist: 'Kenny Rogers' },
    ],
    'Electronic': [
      { title: 'One More Time', artist: 'Daft Punk' },
      { title: 'Wake Me Up', artist: 'Avicii' },
      { title: 'Titanium', artist: 'David Guetta' },
      { title: 'Clarity', artist: 'Zedd' },
      { title: 'Animals', artist: 'Martin Garrix' },
      { title: 'Strobe', artist: 'deadmau5' },
    ],
    'R&B': [
      { title: 'No Scrubs', artist: 'TLC' },
      { title: 'Crazy in Love', artist: 'Beyoncé' },
      { title: 'Adorn', artist: 'Miguel' },
      { title: 'Say My Name', artist: "Destiny's Child" },
      { title: 'Best Part', artist: 'Daniel Caesar' },
      { title: "That's What I Like", artist: 'Bruno Mars' },
    ],
  };

  const GENRES = Object.keys(SONGS);
  const INTRO_MS = 5000;     // how long the intro plays
  const NUM_OPTIONS = 4;     // genre choices per round
  const MAX_REROLLS = 6;     // attempts to find a track with a preview
  const FETCH_TIMEOUT = 7000;

  // ---- DOM ----------------------------------------------------------------
  const hintEl = document.getElementById('hint');
  const startPanel = document.getElementById('startPanel');
  const loadingPanel = document.getElementById('loadingPanel');
  const errorPanel = document.getElementById('errorPanel');
  const errorText = document.getElementById('errorText');
  const roundPanel = document.getElementById('roundPanel');
  const startBtn = document.getElementById('startBtn');
  const retryBtn = document.getElementById('retryBtn');
  const replayBtn = document.getElementById('replayBtn');
  const nextBtn = document.getElementById('nextBtn');
  const optionsEl = document.getElementById('options');
  const eqEl = document.getElementById('eq');
  const playStateEl = document.getElementById('playState');
  const revealEl = document.getElementById('reveal');
  const artEl = document.getElementById('art');
  const trackTitleEl = document.getElementById('trackTitle');
  const trackArtistEl = document.getElementById('trackArtist');
  const bestEl = document.getElementById('bestScore');
  const footerStreak = document.getElementById('footerStreak');
  const player = document.getElementById('player');

  // ---- State --------------------------------------------------------------
  let best = parseInt(localStorage.getItem('gg_best') || '0', 10);
  let streak = parseInt(localStorage.getItem('gg_streak') || '0', 10);
  let audioCtx = null;
  let introTimer = null;
  let current = null;        // { genre, title, artist }
  let answered = false;
  let recent = [];           // recently used "genre|title" keys

  if (best > 0) bestEl.textContent = best;
  footerStreak.textContent = streak;

  // ---- Helpers ------------------------------------------------------------
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showPanel(panel) {
    [startPanel, loadingPanel, errorPanel, roundPanel].forEach((p) => {
      p.hidden = p !== panel;
    });
  }

  // iTunes Search API via JSONP (sidesteps unreliable CORS on the endpoint).
  function jsonpSearch(term) {
    return new Promise((resolve, reject) => {
      const cb = 'itunescb_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      let settled = false;
      const cleanup = () => {
        delete window[cb];
        script.remove();
        clearTimeout(timer);
      };
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true; cleanup(); reject(new Error('timeout'));
      }, FETCH_TIMEOUT);
      window[cb] = (data) => {
        if (settled) return;
        settled = true; cleanup(); resolve(data);
      };
      script.onerror = () => {
        if (settled) return;
        settled = true; cleanup(); reject(new Error('network'));
      };
      script.src = 'https://itunes.apple.com/search?term=' +
        encodeURIComponent(term) +
        '&entity=song&limit=5&callback=' + cb;
      document.body.appendChild(script);
    });
  }

  // ---- Sound effects (ported from the Perfect Circle game) ---------------
  function ensureAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playBuzz() {
    try {
      ensureAudioCtx();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.32);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch (_) {}
  }

  function playChime() {
    try {
      ensureAudioCtx();
      const now = audioCtx.currentTime;
      const notes = [880, 1320, 1760];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = freq;
        osc.type = 'sine';
        const start = now + i * 0.06;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.22, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.55);
      });
    } catch (_) {}
  }

  // ---- Audio (preview) playback ------------------------------------------
  function stopIntro() {
    clearTimeout(introTimer);
    introTimer = null;
    try { player.pause(); } catch (_) {}
    eqEl.classList.add('paused');
  }

  function playIntro() {
    clearTimeout(introTimer);
    try {
      player.currentTime = 0;
      const p = player.play();
      if (p && p.catch) p.catch(() => {});
    } catch (_) {}
    eqEl.classList.remove('paused');
    if (!answered) playStateEl.textContent = 'Playing intro…';
    introTimer = setTimeout(() => {
      stopIntro();
      if (!answered) playStateEl.textContent = 'Make your guess';
    }, INTRO_MS);
  }

  // ---- Round flow ---------------------------------------------------------
  function chooseSong() {
    // Pick a genre + song combo not used too recently.
    for (let i = 0; i < 25; i++) {
      const genre = pick(GENRES);
      const song = pick(SONGS[genre]);
      const key = genre + '|' + song.title;
      if (!recent.includes(key)) {
        recent.push(key);
        if (recent.length > 8) recent.shift();
        return { genre, title: song.title, artist: song.artist };
      }
    }
    const genre = pick(GENRES);
    const song = pick(SONGS[genre]);
    return { genre, title: song.title, artist: song.artist };
  }

  async function loadRound() {
    showPanel(loadingPanel);
    answered = false;

    let chosen = null;
    let meta = null;
    for (let attempt = 0; attempt < MAX_REROLLS; attempt++) {
      chosen = chooseSong();
      try {
        const data = await jsonpSearch(chosen.artist + ' ' + chosen.title);
        const hit = (data.results || []).find((r) => r.previewUrl);
        if (hit) { meta = hit; break; }
      } catch (e) {
        // network/timeout — try another track
      }
    }

    if (!meta) {
      errorText.textContent = 'Couldn’t load a track. Check your connection and try again.';
      showPanel(errorPanel);
      return;
    }

    current = chosen;
    player.src = meta.previewUrl;
    artEl.src = (meta.artworkUrl100 || '').replace('100x100', '300x300');
    artEl.alt = meta.trackName ? meta.trackName + ' artwork' : '';
    trackTitleEl.textContent = meta.trackName || chosen.title;
    trackArtistEl.textContent = meta.artistName || chosen.artist;

    renderOptions(chosen.genre);
    revealEl.hidden = true;
    nextBtn.hidden = true;
    replayBtn.hidden = false;
    hintEl.textContent = 'Listen to the intro, then pick the genre';
    showPanel(roundPanel);
    playIntro();
  }

  function renderOptions(correctGenre) {
    const distractors = shuffle(GENRES.filter((g) => g !== correctGenre))
      .slice(0, NUM_OPTIONS - 1);
    const choices = shuffle([correctGenre, ...distractors]);

    optionsEl.innerHTML = '';
    choices.forEach((genre) => {
      const btn = document.createElement('button');
      btn.className = 'option';
      btn.type = 'button';
      btn.textContent = genre;
      btn.addEventListener('click', () => handleGuess(genre, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleGuess(genre, btn) {
    if (answered) return;
    answered = true;
    stopIntro();

    const correct = genre === current.genre;
    const buttons = Array.from(optionsEl.querySelectorAll('.option'));
    buttons.forEach((b) => {
      b.disabled = true;
      if (b.textContent === current.genre) b.classList.add('correct');
      else if (b === btn) b.classList.add('wrong');
      else b.classList.add('dim');
    });

    if (correct) {
      streak += 1;
      if (streak > best) {
        best = streak;
        localStorage.setItem('gg_best', String(best));
        bestEl.textContent = best;
      }
      playChime();
      playStateEl.textContent = 'Correct! 🎉';
    } else {
      streak = 0;
      playBuzz();
      playStateEl.textContent = 'It was ' + current.genre;
    }
    localStorage.setItem('gg_streak', String(streak));
    footerStreak.textContent = streak;

    revealEl.hidden = false;
    replayBtn.hidden = true;
    nextBtn.hidden = false;
    hintEl.textContent = correct ? 'Nice ear!' : 'Tough one — try the next';
  }

  // ---- Events -------------------------------------------------------------
  startBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  retryBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  nextBtn.addEventListener('click', () => { ensureAudioCtx(); loadRound(); });
  replayBtn.addEventListener('click', () => { ensureAudioCtx(); playIntro(); });

  // Keep the equalizer in sync with actual playback.
  player.addEventListener('playing', () => eqEl.classList.remove('paused'));
  player.addEventListener('pause', () => eqEl.classList.add('paused'));
  player.addEventListener('ended', () => eqEl.classList.add('paused'));

  showPanel(startPanel);
})();
