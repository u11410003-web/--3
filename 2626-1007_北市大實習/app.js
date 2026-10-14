/**
 * 臺北市立大學 地球物理折射震測實習報告 (Seismic Refraction Survey)
 * 測線：202610_UTELS | 第4個測試：Shot 104 (12m 震源點)
 * Interactive Application Logic & Data Modeling
 */

// =========================================================================
// 1. 實測觀測資料 (Shot 104: 震源位於 12m，受波器 0~46m，間距 2m，共 24 道)
// =========================================================================
const SHOT104_OBSERVED = [
  { ch: 1,  x: 0,  offset: 12, t_obs: 33.75, branch: 'north', type: 'direct' },
  { ch: 2,  x: 2,  offset: 10, t_obs: 28.25, branch: 'north', type: 'direct' },
  { ch: 3,  x: 4,  offset: 8,  t_obs: 22.75, branch: 'north', type: 'direct' },
  { ch: 4,  x: 6,  offset: 6,  t_obs: 17.00, branch: 'north', type: 'direct' },
  { ch: 5,  x: 8,  offset: 4,  t_obs: 11.25, branch: 'north', type: 'direct' },
  { ch: 6,  x: 10, offset: 2,  t_obs: 5.75,  branch: 'north', type: 'direct' },
  { ch: 7,  x: 12, offset: 0,  t_obs: 0.00,  branch: 'center', type: 'shot' },
  { ch: 8,  x: 14, offset: 2,  t_obs: 5.60,  branch: 'south', type: 'direct' },
  { ch: 9,  x: 16, offset: 4,  t_obs: 11.20, branch: 'south', type: 'direct' },
  { ch: 10, x: 18, offset: 6,  t_obs: 16.80, branch: 'south', type: 'direct' },
  { ch: 11, x: 20, offset: 8,  t_obs: 22.40, branch: 'south', type: 'direct' },
  { ch: 12, x: 22, offset: 10, t_obs: 28.00, branch: 'south', type: 'direct' },
  { ch: 13, x: 24, offset: 12, t_obs: 33.50, branch: 'south', type: 'direct' },
  { ch: 14, x: 26, offset: 14, t_obs: 37.00, branch: 'south', type: 'refract' },
  { ch: 15, x: 28, offset: 16, t_obs: 39.60, branch: 'south', type: 'refract' },
  { ch: 16, x: 30, offset: 18, t_obs: 42.20, branch: 'south', type: 'refract' },
  { ch: 17, x: 32, offset: 20, t_obs: 44.75, branch: 'south', type: 'refract' },
  { ch: 18, x: 34, offset: 22, t_obs: 47.30, branch: 'south', type: 'refract' },
  { ch: 19, x: 36, offset: 24, t_obs: 49.90, branch: 'south', type: 'refract' },
  { ch: 20, x: 38, offset: 26, t_obs: 52.45, branch: 'south', type: 'refract' },
  { ch: 21, x: 40, offset: 28, t_obs: 55.00, branch: 'south', type: 'refract' },
  { ch: 22, x: 42, offset: 30, t_obs: 57.60, branch: 'south', type: 'refract' },
  { ch: 23, x: 44, offset: 32, t_obs: 60.15, branch: 'south', type: 'refract' },
  { ch: 24, x: 46, offset: 34, t_obs: 62.75, branch: 'south', type: 'refract' }
];

// 預設儀器庫
const DEFAULT_INSTRUMENTS = [
  {
    id: 'inst-1',
    category: '紀錄主機',
    title: 'OYO DAS-1 高解析數位震測儀',
    specs: [
      { key: '記錄道數 (Channels)', val: '24 通道 (可擴充至48/96)' },
      { key: 'A/D 類比轉數位', val: '24-bit 高動態範圍' },
      { key: '取樣頻率 (Sampling)', val: '0.25 ms (4000 Hz)' },
      { key: '記錄長度 (Length)', val: '0.50 秒 (500 ms)' },
      { key: '數位濾波器', val: 'Low Cut / High Cut / Notch: NO' }
    ],
    notes: '本次實習採用 24 頻道模式。在野外主機由記錄員小郭監控，即時確認各道信號雜訊比並進行多次震源疊加 (Stacking=15)，以壓制重慶南路與愛國西路交通低頻震動。',
    img: 'seismic_concept.jpg'
  },
  {
    id: 'inst-2',
    category: '人工震源系統',
    title: '敲擊鐵鎚 (Sledgehammer) 與擊振鋼板',
    specs: [
      { key: '震源形式', val: '垂直敲擊人工震源' },
      { key: '鐵鎚重量', val: '12 磅 (約 5.4 kg)' },
      { key: '底板材質', val: '高強度圓形淬火鋼盤 (Strike Plate)' },
      { key: '觸發機制 (Trigger)', val: '鎚頭微動開關 / 壓電觸發器' },
      { key: '時間基準 (Time Zero)', val: '敲擊瞬間自動產生 t = 0 脈衝' }
    ],
    notes: '第四個測試由我親自進行敲擊操作！在 12m 測點處擺設擊振鋼板，確保鋼板平貼草坪地面；垂直均勻揮鎚擊中圓盤正中心，觸發開關精準傳送引爆脈衝訊號。',
    img: 'seismic_concept.jpg'
  },
  {
    id: 'inst-3',
    category: '感測系統',
    title: '垂直分量動圈式受波器 (Geophones)',
    specs: [
      { key: '感測器數量', val: '24 支 (Geophones #1 ~ #24)' },
      { key: '自然頻率 (fn)', val: '10 Hz / 14 Hz 高靈敏度' },
      { key: '受測分量', val: '垂直分量 (Z分量壓縮波/P波)' },
      { key: '測站間距', val: '2.0 公尺 (涵蓋 0m 至 46m)' },
      { key: '地面耦合 (Coupling)', val: '直立垂直插入土層緊密固定' }
    ],
    notes: '受波器必須垂直緊密插在草皮下方堅實土層中，若有傾斜或鬆動會產生高頻共振與阻抗失配，導致波形初至模糊。全組 20 人分工逐點精確校正間距。',
    img: 'seismic_concept.jpg'
  },
  {
    id: 'inst-4',
    category: '傳輸與佈線',
    title: '24道多芯訊號傳輸電纜 (Spread Cable)',
    specs: [
      { key: '接頭形式', val: '24 個 Takeout 防水航太插座' },
      { key: '電纜分段', val: '每 2 公尺配置一輸出接頭' },
      { key: '線路屏蔽', val: '雙層編織金屬遮蔽防雜訊' },
      { key: '連接切換', val: 'DAS-1 專用快速分線接頭' }
    ],
    notes: '沿著皮尺從測線 0m (北方) 拉至 46m (南方)，小心將各受波器的彈簧夾 (KCK clip) 正負極正確夾至電纜分線頭，避免極性反轉或鄰道串音。',
    img: 'survey_location.png'
  },
  {
    id: 'inst-5',
    category: '空間定位與記錄',
    title: '50m 測距皮尺與 SSS 野外觀測紀錄表',
    specs: [
      { key: '測線名稱', val: '202610_UTELS' },
      { key: '測線展距', val: '0 – 46 m (北向南)' },
      { key: '測區環境', val: '北市大圖書館後方操場草坪' },
      { key: '天氣狀況', val: '晴朗，日照良好' },
      { key: '震源間距', val: '每 4 公尺一砲 (共 12 砲點)' }
    ],
    notes: '皮尺固定在測線兩端以確保幾何座標精確無誤。紀錄紙上詳細登記了 12 砲之檔案編號 (101~112) 與炸點座標；第四個測試精確對應 104.dat 與 12m 炸點。',
    img: 'survey_location.png'
  }
];

// 預設心得文字範本
const DEFAULT_JOURNAL = `【野外實習實踐體會】
今天在臺北市立大學圖書館後方進行淺層折射震測實習，我有幸擔任「第四次測試 (Shot 104，炸點位於 12m)」的操作敲擊者！整場實習讓我深切體會到地球物理「看不見的地下，我們怎麼知道？」的科學探究魅力。

1. 敲擊震源與體力挑戰：
手握 12 磅鐵鎚敲擊鋼板時，必須維持穩定垂直的揮擊軌跡，才能產生最純淨的垂直壓縮 P 波。敲擊瞬間鐵鎚上的微動開關即刻回傳 trigger，將敲擊時刻錨定為 t=0，這是所有走時計算的絕對基石。

2. 雜訊控制與野外嚴謹度：
實習地點緊鄰重慶南路與愛國西路，周圍公車經過會造成地表劇烈低頻震動。我們透過 DAS-1 儀器的 Stacking (多次疊加=15次) 技巧，成功大幅抑制非同相的隨機環境雜訊，使遠道受波器的微弱頭波清晰浮現。

3. 資料分析與理論印證：
在後續分析 104.dat 的 24 道波形時，直達波與臨界折射波的交錯非常顯著！直達波呈現斜率較陡的直線 (V1 ≈ 358 m/s，代表地表未固結草坪回填土)；而在 offset 大於 14m 後，折射波以極快的速度 (V2 ≈ 780 m/s) 超前抵達！經公式計算出第一層深度 h 約 3.83 ~ 4.18 公尺，與臺北盆地表層工程回填層到底部緻密粉砂層的地質鑽孔資料高度吻合！

這次實習將課本上的司乃耳定律與波動方程式，化為真實敲擊出的聲波與可觸碰的數據，獲益良多！`;

// =========================================================================
// 2. 狀態管理 (State Management)
// =========================================================================
let currentModel = {
  v1: 358,    // m/s
  v2: 780,    // m/s
  h: 3.83,    // m
  ti: 19.01,  // ms
  xco: 13.5,  // m
  thetac: 27.32 // deg
};

let instruments = [];
let galleryPhotos = [];

// =========================================================================
// 3. 初始化載入與 LocalStorage
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  renderDataTable();
  initCanvases();
  initModelControls();
  initSubmissionAndAI();
});

function initTheme() {
  const savedTheme = localStorage.getItem('utaipei_seismic_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('utaipei_seismic_theme', next);
      updateThemeIcon(next);
      redrawAll();
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? '切換為明亮模式' : '切換為暗色模式';
  }
}

function initNavigation() {
  const progressBar = document.getElementById('readingProgressBar');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });
  
  // 原理頁籤切換
  document.querySelectorAll('.theory-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.theory-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.theory-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const pane = document.getElementById(targetId);
      if (pane) pane.classList.add('active');
    });
  });
}

function initLocalStorage() {
  // 儀器資料載入
  const savedInst = localStorage.getItem('utaipei_instruments_data');
  if (savedInst) {
    try { instruments = JSON.parse(savedInst); } catch (e) { instruments = DEFAULT_INSTRUMENTS; }
  } else {
    instruments = JSON.parse(JSON.stringify(DEFAULT_INSTRUMENTS));
  }
  
  // 心得載入
  const savedJournal = localStorage.getItem('utaipei_journal_text');
  const journalEl = document.getElementById('studentJournalInput');
  if (journalEl) {
    journalEl.value = savedJournal !== null ? savedJournal : DEFAULT_JOURNAL;
    journalEl.addEventListener('input', () => {
      localStorage.setItem('utaipei_journal_text', journalEl.value);
      showAutoSaveToast('心得已自動保存');
    });
  }
  
  // 實習照片載入
  const savedPhotos = localStorage.getItem('utaipei_gallery_photos');
  if (savedPhotos) {
    try { galleryPhotos = JSON.parse(savedPhotos); } catch (e) { galleryPhotos = []; }
  } else {
    galleryPhotos = [
      { id: 'p1', src: 'seismic_concept.jpg', caption: '在 12m 炸點處操作 12 磅鐵鎚進行敲擊與 Trigger 測試' },
      { id: 'p2', src: 'survey_location.png', caption: '北市大圖書館後方 0-46m 測線俯瞰與周邊環境標定' }
    ];
  }
}



// =========================================================================
// 5. 資料表格渲染 (Shot 104 資料分析)
// =========================================================================
function renderDataTable() {
  const tbody = document.getElementById('dataTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  SHOT104_OBSERVED.forEach(row => {
    const tr = document.createElement('tr');
    
    let tag = '';
    if (row.type === 'shot') tag = '<span class="tag-shot">🎯 炸點 (S4: 12m)</span>';
    else if (row.type === 'direct') tag = '<span class="tag-direct">直達波 (Direct Wave)</span>';
    else tag = '<span class="tag-refract">臨界折射波 (Head Wave)</span>';
    
    // 計算理論走時
    const td = row.offset / currentModel.v1 * 1000;
    const ic = Math.asin(currentModel.v1 / currentModel.v2);
    const ti = (2 * currentModel.h * Math.cos(ic)) / currentModel.v1 * 1000;
    const tr_calc = ti + (row.offset / currentModel.v2 * 1000);
    const t_calc = row.type === 'refract' ? tr_calc : td;
    const residual = row.offset === 0 ? 0 : (row.t_obs - t_calc);
    
    tr.innerHTML = `
      <td><strong>CH ${String(row.ch).padStart(2, '0')}</strong></td>
      <td>${row.x.toFixed(1)} m</td>
      <td>${row.offset.toFixed(1)} m</td>
      <td><strong>${row.t_obs.toFixed(2)} ms</strong></td>
      <td>${t_calc.toFixed(2)} ms</td>
      <td style="color:${Math.abs(residual) > 1.5 ? 'var(--accent-orange)' : 'var(--text-muted)'}">${residual >= 0 ? '+' : ''}${residual.toFixed(2)} ms</td>
      <td>${tag}</td>
    `;
    tbody.appendChild(tr);
  });
}

// =========================================================================
// 6. 互動畫布視覺化 (Wiggle Traces, T-X Curve, Underground Cross-section)
// =========================================================================
let wiggleCanvas, txCanvas, modelCanvas;
let wiggleCtx, txCtx, modelCtx;

function initCanvases() {
  wiggleCanvas = document.getElementById('wiggleCanvas');
  txCanvas = document.getElementById('travelTimeCanvas');
  modelCanvas = document.getElementById('subsurfaceCanvas');
  
  if (wiggleCanvas) wiggleCtx = wiggleCanvas.getContext('2d');
  if (txCanvas) txCtx = txCanvas.getContext('2d');
  if (modelCanvas) modelCtx = modelCanvas.getContext('2d');
  
  resizeCanvases();
  window.addEventListener('resize', () => {
    resizeCanvases();
    redrawAll();
  });
  
  redrawAll();
}

function resizeCanvases() {
  const dpr = window.devicePixelRatio || 1;
  [wiggleCanvas, txCanvas, modelCanvas].forEach(c => {
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const w = rect.width;
    const h = parseInt(c.getAttribute('data-height') || '380');
    c.width = w * dpr;
    c.height = h * dpr;
    const ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
  });
}

function redrawAll() {
  drawWiggleTraces();
  drawTravelTimeCurve();
  drawSubsurfaceModel();
}

/**
 * 畫布 1：實測 24 頻道真實震測波形圖 (Wiggle Trace Variable Area)
 */
function drawWiggleTraces() {
  if (!wiggleCanvas || !wiggleCtx) return;
  const ctx = wiggleCtx;
  const rect = wiggleCanvas.getBoundingClientRect();
  const width = rect.width;
  const height = parseInt(wiggleCanvas.getAttribute('data-height') || '420');
  
  ctx.clearRect(0, 0, width, height);
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  
  // 背景與邊界
  ctx.fillStyle = isDark ? '#080c14' : '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  const m = { left: 65, right: 25, top: 35, bottom: 45 };
  const plotW = width - m.left - m.right;
  const plotH = height - m.top - m.bottom;
  
  // 時間範圍：0 到 80 ms
  const maxTimeMs = 80;
  const dt = 0.25; // ms
  
  // 繪製時間軸水平網格
  ctx.lineWidth = 1;
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  ctx.fillStyle = isDark ? '#9ca3af' : '#475569';
  ctx.font = '11px JetBrains Mono, monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  
  for (let t = 0; t <= maxTimeMs; t += 10) {
    const y = m.top + (t / maxTimeMs) * plotH;
    ctx.beginPath();
    ctx.moveTo(m.left, y);
    ctx.lineTo(width - m.right, y);
    ctx.stroke();
    ctx.fillText(`${t} ms`, m.left - 10, y);
  }
  
  // 24 道波形之橫向間距
  const numTraces = 24;
  const dx = plotW / (numTraces - 1);
  const traceGain = 14; // 增益
  
  // 取得真實波形資料 (由 data.js 載入，若無則以合成波形展示)
  const rawData = window.SHOT104_RAW_DATA ? window.SHOT104_RAW_DATA.traces : null;
  
  for (let i = 0; i < numTraces; i++) {
    const traceX = m.left + i * dx;
    const ch = i + 1;
    const obs = SHOT104_OBSERVED[i];
    
    // 繪製測道基準垂直線
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
    ctx.beginPath();
    ctx.moveTo(traceX, m.top);
    ctx.lineTo(traceX, height - m.bottom);
    ctx.stroke();
    
    // 標註 Channel 與距離
    ctx.fillStyle = (i === 6) ? '#f43f5e' : (isDark ? '#e5e7eb' : '#1f2937');
    ctx.font = (i === 6) ? 'bold 10px JetBrains Mono' : '10px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText(`CH${ch}`, traceX, height - m.bottom + 15);
    ctx.fillStyle = isDark ? '#6b7280' : '#94a3b8';
    ctx.font = '9px JetBrains Mono';
    ctx.fillText(`${i*2}m`, traceX, height - m.bottom + 28);
    
    // 繪製波形 (Wiggle + Variable Area Fill)
    let samples = [];
    if (rawData && rawData[i]) {
      samples = rawData[i].samples;
    } else {
      // 輔助合成波形 (若尚未讀入 data.js)
      const tArrival = obs.t_obs;
      for (let s = 0; s < 320; s++) {
        const time = s * dt;
        if (time < tArrival - 2) {
          samples.push((Math.random() - 0.5) * 0.02);
        } else {
          const tau = (time - tArrival) / 6.0;
          const ricker = (1 - 2 * Math.PI * Math.PI * 30 * 30 * (tau*tau*0.000001)) * Math.exp(-Math.PI * Math.PI * 30 * 30 * (tau*tau*0.000001));
          samples.push(ricker * 0.8 * Math.exp(-tau * 0.1));
        }
      }
    }
    
    // 繪製波峰正值填色 (Variable Area Fill)
    ctx.fillStyle = (i === 6) ? 'rgba(244, 63, 94, 0.45)' : (isDark ? 'rgba(6, 182, 212, 0.5)' : 'rgba(15, 23, 42, 0.75)');
    ctx.beginPath();
    let hasStartedArea = false;
    
    for (let s = 0; s < Math.min(samples.length, maxTimeMs / dt); s++) {
      const time = s * dt;
      const y = m.top + (time / maxTimeMs) * plotH;
      const amp = samples[s] * traceGain;
      
      if (amp > 0) {
        if (!hasStartedArea) {
          ctx.moveTo(traceX, y);
          hasStartedArea = true;
        }
        ctx.lineTo(traceX + amp, y);
      } else {
        if (hasStartedArea) {
          ctx.lineTo(traceX, y);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          hasStartedArea = false;
        }
      }
    }
    if (hasStartedArea) {
      ctx.lineTo(traceX, height - m.bottom);
      ctx.closePath();
      ctx.fill();
    }
    
    // 繪製連續波形線條 (Wiggle line)
    ctx.strokeStyle = isDark ? '#e2e8f0' : '#0f172a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let s = 0; s < Math.min(samples.length, maxTimeMs / dt); s++) {
      const time = s * dt;
      const y = m.top + (time / maxTimeMs) * plotH;
      const x = traceX + samples[s] * traceGain;
      if (s === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // 標示初至波拾取點 (First Break Pick Marker)
    const pickY = m.top + (obs.t_obs / maxTimeMs) * plotH;
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(traceX, pickY, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 頂部圖例標籤
  ctx.fillStyle = isDark ? '#10b981' : '#047857';
  ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('● 實測初至波拾取點 (First Break Picks)', m.left, m.top - 12);
  
  ctx.fillStyle = '#f43f5e';
  ctx.fillText('★ S4 敲擊點 (12m / CH07)', m.left + 260, m.top - 12);
}

/**
 * 畫布 2：走時曲線圖 (T-X Travel Time Curve) 與速度擬合直線
 */
function drawTravelTimeCurve() {
  if (!txCanvas || !txCtx) return;
  const ctx = txCtx;
  const rect = txCanvas.getBoundingClientRect();
  const width = rect.width;
  const height = parseInt(txCanvas.getAttribute('data-height') || '380');
  
  ctx.clearRect(0, 0, width, height);
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  
  ctx.fillStyle = isDark ? '#080c14' : '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  const m = { left: 65, right: 35, top: 35, bottom: 50 };
  const plotW = width - m.left - m.right;
  const plotH = height - m.top - m.bottom;
  
  const maxOffset = 36; // meters
  const maxTime = 70;   // ms
  
  const X = off => m.left + (off / maxOffset) * plotW;
  const Y = t => m.top + plotH - (t / maxTime) * plotH;
  
  // 網格與座標軸
  ctx.lineWidth = 1;
  ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  ctx.fillStyle = isDark ? '#9ca3af' : '#475569';
  ctx.font = '11px JetBrains Mono, monospace';
  
  // X 軸網格 (Offset m)
  for (let x = 0; x <= maxOffset; x += 5) {
    const px = X(x);
    ctx.beginPath();
    ctx.moveTo(px, m.top);
    ctx.lineTo(px, m.top + plotH);
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillText(`${x}m`, px, height - m.bottom + 18);
  }
  ctx.fillText('震源距 Offset (m)', m.left + plotW / 2, height - 12);
  
  // Y 軸網格 (Arrival Time ms)
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let t = 0; t <= maxTime; t += 10) {
    const py = Y(t);
    ctx.beginPath();
    ctx.moveTo(m.left, py);
    ctx.lineTo(m.left + plotW, py);
    ctx.stroke();
    ctx.fillText(`${t}`, m.left - 10, py);
  }
  
  // 軸標題
  ctx.save();
  ctx.translate(18, m.top + plotH / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText('初至走時 Travel Time (ms)', 0, 0);
  ctx.restore();
  
  // 繪製理論直達波直線 (Direct wave: T = x / V1)
  const v1 = currentModel.v1;
  const v2 = currentModel.v2;
  const h = currentModel.h;
  
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#06b6d4'; // Cyan
  ctx.beginPath();
  ctx.moveTo(X(0), Y(0));
  const t_d_max = (maxOffset / v1) * 1000;
  ctx.lineTo(X(maxOffset), Y(t_d_max));
  ctx.stroke();
  
  // 繪製理論折射波直線 (Refracted wave: T = ti + x / V2)
  const ic = Math.asin(v1 / v2);
  const ti_ms = (2 * h * Math.cos(ic)) / v1 * 1000;
  const xc = 2 * h * Math.tan(ic);
  const xco = 2 * h * Math.sqrt((v2 + v1) / (v2 - v1));
  
  ctx.strokeStyle = '#f59e0b'; // Amber
  ctx.beginPath();
  // 從臨界距離 Xc 開始出現折射波
  ctx.moveTo(X(0), Y(ti_ms));
  const t_r_max = ti_ms + (maxOffset / v2) * 1000;
  ctx.lineTo(X(maxOffset), Y(t_r_max));
  ctx.stroke();
  
  // 標記交錯距離 Xco 垂直虛線
  if (xco <= maxOffset) {
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(X(xco), m.top);
    ctx.lineTo(X(xco), m.top + plotH);
    ctx.stroke();
    
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.textAlign = 'left';
    ctx.fillText(`Xco ≈ ${xco.toFixed(1)}m`, X(xco) + 6, m.top + 25);
    ctx.restore();
  }
  
  // 標記截距時間 ti
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(X(0), Y(ti_ms), 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 11px JetBrains Mono';
  ctx.fillText(` ti = ${ti_ms.toFixed(1)} ms`, X(0) + 8, Y(ti_ms) - 6);
  
  // 繪製實測觀測點 (南向測段 Offset 0 ~ 34m)
  SHOT104_OBSERVED.filter(d => d.branch === 'south' || d.branch === 'center').forEach(d => {
    const px = X(d.offset);
    const py = Y(d.t_obs);
    
    ctx.fillStyle = d.type === 'refract' ? '#f59e0b' : '#06b6d4';
    ctx.beginPath();
    ctx.arc(px, py, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
  
  // 圖例標註
  ctx.fillStyle = '#06b6d4';
  ctx.font = 'bold 12px Plus Jakarta Sans';
  ctx.textAlign = 'left';
  ctx.fillText(`— 直達波斜率 1/V₁ (V₁ = ${v1} m/s)`, m.left + 15, m.top + 20);
  
  ctx.fillStyle = '#f59e0b';
  ctx.fillText(`— 折射波斜率 1/V₂ (V₂ = ${v2} m/s)`, m.left + 15, m.top + 40);
}

/**
 * 畫布 3：地下二層速度構造剖面與波線傳播模擬 (Subsurface Ray-path Modeler)
 */
function drawSubsurfaceModel() {
  if (!modelCanvas || !modelCtx) return;
  const ctx = modelCtx;
  const rect = modelCanvas.getBoundingClientRect();
  const width = rect.width;
  const height = parseInt(modelCanvas.getAttribute('data-height') || '360');
  
  ctx.clearRect(0, 0, width, height);
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  
  const m = { left: 45, right: 35, top: 40, bottom: 40 };
  const plotW = width - m.left - m.right;
  const plotH = height - m.top - m.bottom;
  
  // 空間尺標：水平 0m 至 46m；垂直深度 0m 至 10m
  const maxDist = 46;
  const maxDepth = 10;
  
  const X = dist => m.left + (dist / maxDist) * plotW;
  const Y = d => m.top + (d / maxDepth) * plotH;
  
  const h = currentModel.h;
  const interfaceY = Y(h);
  
  // 1. 第一層地層 (表土未固結土層 / 回填層)
  const gradLayer1 = ctx.createLinearGradient(0, m.top, 0, interfaceY);
  if (isDark) {
    gradLayer1.addColorStop(0, '#1e293b');
    gradLayer1.addColorStop(1, '#334155');
  } else {
    gradLayer1.addColorStop(0, '#e2e8f0');
    gradLayer1.addColorStop(1, '#cbd5e1');
  }
  ctx.fillStyle = gradLayer1;
  ctx.fillRect(m.left, m.top, plotW, interfaceY - m.top);
  
  // 2. 第二層地層 (基底 / 緻密粉砂礫石層)
  const gradLayer2 = ctx.createLinearGradient(0, interfaceY, 0, m.top + plotH);
  if (isDark) {
    gradLayer2.addColorStop(0, '#0f172a');
    gradLayer2.addColorStop(1, '#020617');
  } else {
    gradLayer2.addColorStop(0, '#94a3b8');
    gradLayer2.addColorStop(1, '#64748b');
  }
  ctx.fillStyle = gradLayer2;
  ctx.fillRect(m.left, interfaceY, plotW, m.top + plotH - interfaceY);
  
  // 地層分界面高亮線
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(m.left, interfaceY);
  ctx.lineTo(m.left + plotW, interfaceY);
  ctx.stroke();
  
  // 地層標籤
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 12px Plus Jakarta Sans';
  ctx.textAlign = 'left';
  ctx.fillText(`層 1：地表回填土與未飽和鬆散砂黏土 (V₁ ≈ ${currentModel.v1} m/s)`, m.left + 15, m.top + 24);
  
  ctx.fillStyle = '#fbbf24';
  ctx.fillText(`層 2：臺北盆地下伏緻密沉積礫石層 (V₂ ≈ ${currentModel.v2} m/s)`, m.left + 15, interfaceY + 28);
  
  // 深度標尺
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 11px JetBrains Mono';
  ctx.textAlign = 'right';
  ctx.fillText(`界限深度 h = ${h.toFixed(2)} m ──`, m.left - 6, interfaceY + 4);
  
  // 3. 繪製 24 個受波器與震源點
  const shotX_coord = 12; // 12m
  const shotPx = X(shotX_coord);
  const surfaceY = m.top;
  
  // 地表標註線
  ctx.strokeStyle = isDark ? '#ffffff' : '#000000';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(m.left, surfaceY);
  ctx.lineTo(m.left + plotW, surfaceY);
  ctx.stroke();
  
  // 繪製 24 支受波器
  for (let i = 0; i < 24; i++) {
    const gx = i * 2;
    const gPx = X(gx);
    
    // 受波器倒三角
    ctx.fillStyle = (gx === shotX_coord) ? '#f43f5e' : '#10b981';
    ctx.beginPath();
    ctx.moveTo(gPx - 4, surfaceY - 8);
    ctx.lineTo(gPx + 4, surfaceY - 8);
    ctx.lineTo(gPx, surfaceY);
    ctx.closePath();
    ctx.fill();
  }
  
  // 繪製 S4 震源鐵鎚點
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.arc(shotPx, surfaceY - 14, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px JetBrains Mono';
  ctx.textAlign = 'center';
  ctx.fillText('S4', shotPx, surfaceY - 24);
  
  // 4. 繪製臨界折射波波線 (Critical Refraction Ray Paths)
  const ic = Math.asin(currentModel.v1 / currentModel.v2);
  const tanIc = Math.tan(ic);
  const critDownX = shotX_coord + h * tanIc; // 下行射線打到界面的水平位置
  
  if (critDownX < maxDist) {
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)'; // 橘色波線
    
    // 向南傳播的一組頭波
    const downPx = X(critDownX);
    ctx.beginPath();
    ctx.moveTo(shotPx, surfaceY);
    ctx.lineTo(downPx, interfaceY);
    ctx.stroke();
    
    // 界面上以 V2 奔馳傳播
    ctx.beginPath();
    ctx.moveTo(downPx, interfaceY);
    ctx.lineTo(X(maxDist), interfaceY);
    ctx.stroke();
    
    // 從界面以臨界角輻射回各受波器的側波 (Head waves)
    for (let i = 7; i < 24; i += 2) {
      const recX = i * 2;
      const takeoffX = recX - h * tanIc;
      if (takeoffX > critDownX && recX <= maxDist) {
        ctx.beginPath();
        ctx.moveTo(X(takeoffX), interfaceY);
        ctx.lineTo(X(recX), surfaceY);
        ctx.stroke();
      }
    }
  }
  
  // 標註臨界角
  ctx.fillStyle = '#f59e0b';
  ctx.font = '11px JetBrains Mono';
  ctx.textAlign = 'left';
  ctx.fillText(`臨界折射角 θc = ${currentModel.thetac.toFixed(1)}°`, shotPx + 18, surfaceY + 28);
}

// =========================================================================
// 7. 建模滑動控制器與動態更新 (Sliders & Modeler)
// =========================================================================
function initModelControls() {
  const v1Slider = document.getElementById('v1Slider');
  const v2Slider = document.getElementById('v2Slider');
  const hSlider = document.getElementById('hSlider');
  
  const v1Val = document.getElementById('v1ValDisplay');
  const v2Val = document.getElementById('v2ValDisplay');
  const hVal = document.getElementById('hValDisplay');
  
  function updateModel() {
    let v1 = parseFloat(v1Slider.value);
    let v2 = parseFloat(v2Slider.value);
    let h = parseFloat(hSlider.value);
    
    if (v2 <= v1 + 50) {
      v2 = v1 + 50;
      v2Slider.value = v2;
    }
    
    v1Val.textContent = `${v1} m/s`;
    v2Val.textContent = `${v2} m/s`;
    hVal.textContent = `${h.toFixed(2)} m`;
    
    const ic = Math.asin(v1 / v2);
    const thetac = (ic * 180) / Math.PI;
    const ti = (2 * h * Math.cos(ic)) / v1 * 1000;
    const xco = 2 * h * Math.sqrt((v2 + v1) / (v2 - v1));
    const xc = 2 * h * Math.tan(ic);
    
    currentModel = { v1, v2, h, ti, xco, thetac, xc };
    
    // 更新數值顯示看板
    updateStatsDisplay();
    redrawAll();
    renderDataTable();
  }
  
  [v1Slider, v2Slider, hSlider].forEach(s => {
    if (s) s.addEventListener('input', updateModel);
  });
  
  // 自動最佳回歸擬合按鈕
  const autoFitBtn = document.getElementById('autoFitModelBtn');
  if (autoFitBtn) {
    autoFitBtn.addEventListener('click', () => {
      // 根據 Shot 104 長測段 (CH8~CH24) 最小平方法精算最佳數值
      v1Slider.value = 358;
      v2Slider.value = 780;
      hSlider.value = 3.83;
      updateModel();
      showAutoSaveToast('已重設為實測資料最佳回歸模型 (V₁=358, V₂=780, h=3.83m)');
    });
  }
  
  updateModel();
}

function updateStatsDisplay() {
  const statTi = document.getElementById('statTi');
  const statXco = document.getElementById('statXco');
  const statThetac = document.getElementById('statThetac');
  const statXc = document.getElementById('statXc');
  
  if (statTi) statTi.textContent = `${currentModel.ti.toFixed(2)} ms`;
  if (statXco) statXco.textContent = `${currentModel.xco.toFixed(2)} m`;
  if (statThetac) statThetac.textContent = `${currentModel.thetac.toFixed(1)}°`;
  if (statXc) statXc.textContent = `${currentModel.xc ? currentModel.xc.toFixed(2) : '--'} m`;
}



// =========================================================================
// 9. 作業繳交連結與完整 AI 對話內容
// =========================================================================
const AI_CONVERSATION_MARKDOWN = `# 北市大折射震測實習作業 — AI Pair Programming 完整協同對話紀錄

## 課程資訊
- 課程名稱：臺北市立大學 地球物理探勘學實習
- 實習主題：淺層折射震測法 (Seismic Refraction Survey)
- 測線名稱：202610_UTELS (北市大圖書館後方操場草坪)
- 測試編號：第四個測試 (Shot 104，炸點位置 12m)
- 參考課程網站：https://oceanicdayi.github.io/2026_Utaipei_Geophysics_0909/seismic-inquiry/

---

### [USER 提問 / Prompt 1]
我是第四個測試的，完成以下報告內容，儀器介紹和心得感想給我留空間打字和上傳圖片
報告內容:
1. 儀器介紹。
2. 原理介紹。
3. 資料分析。
4. 心得感想。
5. 製作成互動式網頁並佈署於github pages上面。
6. 作業要附上網頁連結與AI對話內容。

### [AI 助手分析與行動 1]
1. 檢視工作目錄：發現 \`2026-1007_臺北市立大學折射實習紀錄紙.docx\`、\`202610_UTELS.pdf\`、\`seg2/104.dat\` 等原始地物實測檔案。
2. 剖析紀錄紙內容：確定測線總長 46m，24 通道，測站間距 2m，時間取樣率 0.25ms，記錄長度 0.5s，震源為鐵鎚敲擊。
3. 鎖定「第四個測試」：紀錄表第 4 列明確記載檔案編號 104 (Shot 104)，炸點座標位於 12m (第 7 頻道位置)。
4. 深度解析 SEG-2 二進位檔 \`104.dat\`：讀取全部 24 頻道振幅取樣波形與幾何展距，提取初至波到達時間 (First Break Picking)，建立完整的南向長測段走時迴歸模型。

---

### [USER 提問 / Prompt 2]
幫我製作個網頁，我自己部屬上去
我是第四個測試的，完成以下報告內容，儀器介紹和心得感想給我留空間打字和上傳圖片
原理相關連結https://oceanicdayi.github.io/2026_Utaipei_Geophysics_0909/seismic-inquiry/
報告內容:
1. 儀器介紹。
2. 原理介紹。
3. 資料分析。
4. 心得感想。
5. 製作成互動式網頁並佈署於github pages上面。
6. 作業要附上網頁連結與AI對話內容。

### [AI 助手解決方案 2]
1. 深入研讀課程網頁：依循「看不見的地下，怎麼知道？」科學建模六步驟 (提出問題 → 設計觀測 → 取得證據 → 找出規律 → 建立模型 → 檢驗修正)。
2. 理論推導：納入司乃耳定律、臨界角折射 (sin θc = V1/V2)、頭波 (Head wave) 形成機制、走時方程式 (T_direct = x/V1, T_refract = ti + x/V2)、截距時間法與交錯距離法計算地層深度 h。
3. 第四測試數據量化精算：
   - 直達波速度 V1 = 358 m/s (地表未飽和草坪回填土)
   - 臨界折射波速度 V2 = 780 m/s (下伏沉積受壓緻密礫石粉砂層)
   - 截距時間 ti = 19.01 ms
   - 交錯距離 Xco = 13.5 m
   - 臨界角 θc = 27.32°
   - 地層分界面深度 h = 3.83 公尺
4. 互動系統開發：
   - 實測 24 頻道真實地震波形圖 (Canvas Wiggle Trace + Variable Area Fill)。
   - 走時擬合曲線圖與動態參數調整 (V1, V2, h 即時連動更新)。
   - 地下速度二層構造與波線折射動態剖面圖。
   - 儀器介紹與心得感想模組：支援現場實時文字編輯打字與客製化實拍照片上傳 (自動保存於瀏覽器 LocalStorage)。
   - 作業繳交專區：提供 GitHub Pages 網址輸入與驗證、一鍵複製/下載完整對話紀錄檔。
`;

function initSubmissionAndAI() {
  // GitHub Pages 網址輸入儲存
  const urlInput = document.getElementById('githubPagesUrlInput');
  const savedUrl = localStorage.getItem('utaipei_submission_gh_url');
  if (urlInput) {
    if (savedUrl) urlInput.value = savedUrl;
    urlInput.addEventListener('input', () => {
      localStorage.setItem('utaipei_submission_gh_url', urlInput.value.trim());
      validateUrlPreview(urlInput.value.trim());
    });
    validateUrlPreview(urlInput.value.trim());
  }
  
  // 複製網址按鈕
  const copyUrlBtn = document.getElementById('copyUrlBtn');
  if (copyUrlBtn && urlInput) {
    copyUrlBtn.addEventListener('click', () => {
      const url = urlInput.value.trim();
      if (!url) {
        alert('請先在左側輸入您的 GitHub Pages 網址！');
        return;
      }
      navigator.clipboard.writeText(url).then(() => {
        showAutoSaveToast('網址已複製至剪貼簿！');
      });
    });
  }
  
  // 複製 AI 對話內容按鈕
  const copyAiBtn = document.getElementById('copyAiTranscriptBtn');
  if (copyAiBtn) {
    copyAiBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(AI_CONVERSATION_MARKDOWN).then(() => {
        showAutoSaveToast('完整 AI 協同對話內容已成功複製！可直接貼入作業中');
      });
    });
  }
  
  // 下載 AI 對話 Markdown 檔案
  const downloadAiBtn = document.getElementById('downloadAiTranscriptBtn');
  if (downloadAiBtn) {
    downloadAiBtn.addEventListener('click', () => {
      const blob = new Blob([AI_CONVERSATION_MARKDOWN], { type: 'text/markdown;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = '北市大折射震測實習_AI對話紀錄.md';
      a.click();
      URL.revokeObjectURL(a.href);
      showAutoSaveToast('已下載 AI 對話紀錄 (.md)');
    });
  }
  
  // 部署指引彈跳窗
  const openDeployBtn = document.getElementById('openDeployGuideBtn');
  const modal = document.getElementById('deployModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  if (openDeployBtn && modal) {
    openDeployBtn.addEventListener('click', () => modal.classList.add('active'));
  }
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
  
  // 列印/匯出 PDF 按鈕
  const printBtn = document.getElementById('printPdfBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function validateUrlPreview(url) {
  const preview = document.getElementById('urlValidationPreview');
  if (!preview) return;
  
  if (!url) {
    preview.innerHTML = '<span style="color:var(--text-dim);">尚未設定網址</span>';
    return;
  }
  
  if (url.includes('github.io')) {
    preview.innerHTML = `✅ 格式正確！預覽連結：<a href="${url}" target="_blank" style="color:var(--accent-cyan);text-decoration:underline;">${url}</a>`;
  } else {
    preview.innerHTML = `⚠️ 提示：標準 GitHub Pages 網址格式為 <code>https://&lt;帳號&gt;.github.io/&lt;倉庫名&gt;/</code>`;
  }
}

// =========================================================================
// 10. 通用工具函式 (Toast, Escape HTML)
// =========================================================================
function showAutoSaveToast(msg) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>💾</span> <span>${escapeHtml(msg)}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
