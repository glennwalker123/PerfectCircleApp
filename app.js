(function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const scoreCard = document.getElementById('scoreCard');
  const scoreNumber = document.getElementById('scoreNumber');
  const scoreGrade = document.getElementById('scoreGrade');
  const bestEl = document.getElementById('bestScore');
  const hintEl = document.getElementById('hint');
  const clearBtn = document.getElementById('clearBtn');

  let dpr = Math.max(1, window.devicePixelRatio || 1);
  let rawPoints = [];
  let points = [];
  let drawing = false;
  let activePointerId = null;
  let best = parseInt(localStorage.getItem('pc_best') || '0', 10);
  if (best > 0) bestEl.textContent = best;

  let particles = [];
  let celebrated = false;
  let animActive = false;
  let audioCtx = null;

  function resizeCanvas() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  }

  function clearStage() {
    rawPoints = [];
    points = [];
    particles = [];
    celebrated = false;
    scoreCard.hidden = true;
    hintEl.textContent = 'Draw a circle in one stroke';
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
  }

  function redraw(strokeColor) {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    if (points.length >= 2) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 4;
      ctx.strokeStyle = strokeColor || '#7aa2ff';
      ctx.beginPath();
      if (points.length < 3) {
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
      } else {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const mx = (points[i].x + points[i + 1].x) / 2;
          const my = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
        }
        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);
      }
      ctx.stroke();
    }
    if (points.length > 0) {
      const s = points[0];
      ctx.save();
      ctx.shadowColor = 'rgba(255, 220, 130, 0.9)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = 'rgba(255, 235, 150, 0.95)';
      ctx.beginPath();
      ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 235, 150, 0.7)';
      ctx.beginPath();
      ctx.arc(s.x, s.y, 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    drawParticles();
  }

  function drawParticles() {
    for (const p of particles) {
      ctx.save();
      if (p.star) {
        drawStar(p.x, p.y, p.size * Math.min(1, p.life * 1.6), p.life);
      } else {
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawStar(cx, cy, r, alpha) {
    const spikes = 5;
    ctx.fillStyle = `rgba(255, 235, 150, ${alpha})`;
    ctx.shadowColor = `rgba(255, 220, 120, ${alpha})`;
    ctx.shadowBlur = 18 * alpha;
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const ang = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.42;
      const px = cx + Math.cos(ang) * rad;
      const py = cy + Math.sin(ang) * rad;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }

  function spawnCelebrate(x, y) {
    playChime();
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 90 + Math.random() * 110;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 1.4 + Math.random() * 0.8,
        size: 3 + Math.random() * 2,
        hue: 45 + Math.random() * 35,
      });
    }
    particles.push({ x, y, star: true, life: 1, decay: 2.2, size: 28 });
    startAnim();
  }

  function startAnim() {
    if (animActive) return;
    animActive = true;
    let lastT = performance.now();
    function step(t) {
      const dt = Math.min(0.05, (t - lastT) / 1000);
      lastT = t;
      for (const p of particles) {
        if (!p.star) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.9;
          p.vy *= 0.9;
        }
        p.life -= dt * p.decay;
      }
      particles = particles.filter(p => p.life > 0);
      redraw();
      if (particles.length > 0) {
        requestAnimationFrame(step);
      } else {
        animActive = false;
      }
    }
    requestAnimationFrame(step);
  }

  function playChime() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
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

  function drawIdealCircle(cx, cy, r, color) {
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function fitCircle(pts) {
    let sx = 0, sy = 0;
    for (const p of pts) { sx += p.x; sy += p.y; }
    const cx = sx / pts.length;
    const cy = sy / pts.length;
    let sumR = 0;
    for (const p of pts) sumR += Math.hypot(p.x - cx, p.y - cy);
    return { cx, cy, r: sumR / pts.length };
  }

  const ASSIST_MAX = 0.55;
  const DISPLAY_SMOOTH = 0.4;

  function onDown(e) {
    if (activePointerId !== null) return;
    activePointerId = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
    drawing = true;
    const p = getPos(e);
    rawPoints = [p];
    points = [p];
    particles = [];
    celebrated = false;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch (_) {}
    scoreCard.hidden = true;
    hintEl.textContent = 'Keep going…';
    redraw();
    e.preventDefault();
  }

  function onMove(e) {
    if (!drawing || e.pointerId !== activePointerId) return;
    const raw = getPos(e);
    const lastRaw = rawPoints[rawPoints.length - 1];
    const rdx = raw.x - lastRaw.x;
    const rdy = raw.y - lastRaw.y;
    if (rdx * rdx + rdy * rdy < 1) { e.preventDefault(); return; }
    rawPoints.push(raw);

    let target = raw;
    if (rawPoints.length > 20) {
      const fit = fitCircle(rawPoints);
      const ang = Math.atan2(raw.y - fit.cy, raw.x - fit.cx);
      const onCircle = {
        x: fit.cx + Math.cos(ang) * fit.r,
        y: fit.cy + Math.sin(ang) * fit.r,
      };
      const confidence = Math.min(1, (rawPoints.length - 20) / 30);
      const assist = ASSIST_MAX * confidence;
      target = {
        x: raw.x + (onCircle.x - raw.x) * assist,
        y: raw.y + (onCircle.y - raw.y) * assist,
      };
    }

    const lastDisplay = points[points.length - 1];
    const display = {
      x: lastDisplay.x + (target.x - lastDisplay.x) * DISPLAY_SMOOTH,
      y: lastDisplay.y + (target.y - lastDisplay.y) * DISPLAY_SMOOTH,
    };
    const dx = display.x - lastDisplay.x;
    const dy = display.y - lastDisplay.y;
    if (dx * dx + dy * dy >= 1) {
      points.push(display);
      redraw();
    }

    if (!celebrated && rawPoints.length > 30) {
      const fit = fitCircle(rawPoints);
      let totalAngle = 0;
      for (let i = 1; i < rawPoints.length; i++) {
        const a1 = Math.atan2(rawPoints[i - 1].y - fit.cy, rawPoints[i - 1].x - fit.cx);
        const a2 = Math.atan2(rawPoints[i].y - fit.cy, rawPoints[i].x - fit.cx);
        let d = a2 - a1;
        if (d > Math.PI) d -= 2 * Math.PI;
        if (d < -Math.PI) d += 2 * Math.PI;
        totalAngle += d;
      }
      const sweep = Math.abs(totalAngle);
      const start = rawPoints[0];
      const closeDist = Math.hypot(raw.x - start.x, raw.y - start.y);
      const tol = Math.max(5, Math.min(11, fit.r * 0.046));
      if (sweep > Math.PI * 1.94 && closeDist < tol) {
        celebrated = true;
        rawPoints.push({ x: start.x, y: start.y });
        points.push({ x: start.x, y: start.y });
        redraw();
        spawnCelebrate(start.x, start.y);
        drawing = false;
        const pid = activePointerId;
        activePointerId = null;
        try { canvas.releasePointerCapture(pid); } catch (_) {}
        finishStroke();
        e.preventDefault();
        return;
      }
    }
    e.preventDefault();
  }

  function onUp(e) {
    if (e.pointerId !== activePointerId) return;
    drawing = false;
    activePointerId = null;
    try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    finishStroke();
    e.preventDefault();
  }

  function finishStroke() {
    if (rawPoints.length < 8) {
      hintEl.textContent = 'Too short — try drawing a full circle';
      return;
    }
    const result = scoreCircle(rawPoints);
    if (!result.valid) {
      hintEl.textContent = result.reason;
      redraw('#ff7a7a');
      return;
    }
    const score = result.score;
    redraw(strokeColorForScore(score));
    drawIdealCircle(result.cx, result.cy, result.r, 'rgba(255,255,255,0.35)');
    scoreNumber.textContent = score;
    scoreGrade.textContent = gradeText(score);
    scoreCard.hidden = false;
    hintEl.textContent = 'Tap "Try again" to retry';
    if (score > best) {
      best = score;
      localStorage.setItem('pc_best', String(best));
      bestEl.textContent = best;
    }
  }

  function strokeColorForScore(s) {
    if (s >= 90) return '#7CFFB2';
    if (s >= 75) return '#9DE07A';
    if (s >= 60) return '#F2D45C';
    if (s >= 40) return '#F2A35C';
    return '#FF7A7A';
  }

  function gradeText(s) {
    if (s >= 95) return 'Almost perfect!';
    if (s >= 85) return 'Excellent';
    if (s >= 70) return 'Pretty good';
    if (s >= 50) return 'Not bad';
    if (s >= 30) return 'Keep practicing';
    return 'Give it another go';
  }

  function smoothPath(pts) {
    if (pts.length < 5) return pts.slice();
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
      const a = pts[i - 1], b = pts[i], c = pts[i + 1];
      out.push({ x: (a.x + 2 * b.x + c.x) / 4, y: (a.y + 2 * b.y + c.y) / 4 });
    }
    out.push(pts[pts.length - 1]);
    return out;
  }

  function scoreCircle(rawPts) {
    let pts = rawPts;
    for (let i = 0; i < 2; i++) pts = smoothPath(pts);

    const { cx, cy, r: meanR } = fitCircle(pts);

    if (meanR < 20) {
      return { valid: false, reason: 'Too small — draw a bigger circle' };
    }

    const radii = pts.map(p => Math.hypot(p.x - cx, p.y - cy));

    const start = pts[0];
    const end = pts[pts.length - 1];
    const closeDist = Math.hypot(end.x - start.x, end.y - start.y);
    const closure = Math.max(0, 1 - closeDist / meanR);

    let totalAngle = 0;
    for (let i = 1; i < pts.length; i++) {
      const a1 = Math.atan2(pts[i - 1].y - cy, pts[i - 1].x - cx);
      const a2 = Math.atan2(pts[i].y - cy, pts[i].x - cx);
      let d = a2 - a1;
      if (d > Math.PI) d -= 2 * Math.PI;
      if (d < -Math.PI) d += 2 * Math.PI;
      totalAngle += d;
    }
    const sweep = Math.abs(totalAngle);
    if (sweep < Math.PI * 1.3) {
      return { valid: false, reason: 'Not a full loop — keep going around' };
    }
    const sweepFactor = Math.min(1, sweep / (2 * Math.PI));

    let sumSq = 0;
    let maxDev = 0;
    for (const r of radii) {
      const d = (r - meanR) / meanR;
      sumSq += d * d;
      const ad = Math.abs(d);
      if (ad > maxDev) maxDev = ad;
    }
    const rmsDev = Math.sqrt(sumSq / radii.length);

    const closed = pts.concat([pts[0]]);
    let area = 0;
    let perim = 0;
    for (let i = 0; i < closed.length - 1; i++) {
      const a = closed[i], b = closed[i + 1];
      area += a.x * b.y - b.x * a.y;
      perim += Math.hypot(b.x - a.x, b.y - a.y);
    }
    area = Math.abs(area) / 2;
    const isoQ = perim > 0 ? (4 * Math.PI * area) / (perim * perim) : 0;

    const wobbleScore = Math.max(0, 1 - rmsDev * 3.5);
    const outlierScore = Math.max(0, 1 - maxDev * 2);
    const shapeScore = Math.max(0, Math.min(1, (isoQ - 0.78) / 0.2));
    const radial = (wobbleScore + outlierScore) / 2;
    const roundness = Math.sqrt(Math.max(0, radial) * Math.max(0, shapeScore));

    const raw = roundness * 0.88 + closure * 0.06 + sweepFactor * 0.06;
    const score = Math.round(Math.max(0, Math.min(1, raw)) * 100);

    return { valid: true, score, cx, cy, r: meanR };
  }

  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);

  document.addEventListener('touchmove', (e) => {
    if (e.target === canvas) e.preventDefault();
  }, { passive: false });

  clearBtn.addEventListener('click', clearStage);
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', resizeCanvas);
  resizeCanvas();
})();
