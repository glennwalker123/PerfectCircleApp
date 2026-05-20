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
  let points = [];
  let drawing = false;
  let activePointerId = null;
  let best = parseInt(localStorage.getItem('pc_best') || '0', 10);
  if (best > 0) bestEl.textContent = best;

  function resizeCanvas() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  }

  function clearStage() {
    points = [];
    scoreCard.hidden = true;
    hintEl.textContent = 'Draw a circle in one stroke';
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
  }

  function redraw(strokeColor) {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    if (points.length < 2) return;
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

  function onDown(e) {
    if (activePointerId !== null) return;
    activePointerId = e.pointerId;
    canvas.setPointerCapture(e.pointerId);
    drawing = true;
    points = [getPos(e)];
    scoreCard.hidden = true;
    hintEl.textContent = 'Keep going…';
    redraw();
    e.preventDefault();
  }

  const SMOOTH = 0.35;
  function onMove(e) {
    if (!drawing || e.pointerId !== activePointerId) return;
    const raw = getPos(e);
    const last = points[points.length - 1];
    const p = {
      x: last.x + (raw.x - last.x) * SMOOTH,
      y: last.y + (raw.y - last.y) * SMOOTH,
    };
    const dx = p.x - last.x;
    const dy = p.y - last.y;
    if (dx * dx + dy * dy >= 1) {
      points.push(p);
      redraw();
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
    if (points.length < 8) {
      hintEl.textContent = 'Too short — try drawing a full circle';
      return;
    }
    const result = scoreCircle(points);
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

  function scoreCircle(pts) {
    let sx = 0, sy = 0;
    for (const p of pts) { sx += p.x; sy += p.y; }
    const cx = sx / pts.length;
    const cy = sy / pts.length;

    const radii = pts.map(p => Math.hypot(p.x - cx, p.y - cy));
    const meanR = radii.reduce((a, b) => a + b, 0) / radii.length;

    if (meanR < 20) {
      return { valid: false, reason: 'Too small — draw a bigger circle' };
    }

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
    if (sweep < Math.PI * 1.5) {
      return { valid: false, reason: 'Not a full loop — keep going around' };
    }
    const sweepFactor = Math.min(1, sweep / (2 * Math.PI));

    let sumSq = 0;
    for (const r of radii) {
      const d = (r - meanR) / meanR;
      sumSq += d * d;
    }
    const rmsDev = Math.sqrt(sumSq / radii.length);

    let roundness = 1 - rmsDev * 4;
    roundness = Math.max(0, Math.min(1, roundness));

    const raw = roundness * 0.82 + closure * 0.10 + sweepFactor * 0.08;
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
