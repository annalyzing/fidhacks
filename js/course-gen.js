// Course generation and dashboard interactions
// Moved out of inline HTML for clarity and maintainability.
(function () {
  // ============ DATA ============
  const TOPICS = [
    {
      id: 'budget', title: 'Budgeting & Saving',
      sub: 'Make your money go further',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="#2A1B2D" stroke-width="1.8"/><path d="M3 10h18" stroke="#2A1B2D" stroke-width="1.8"/><circle cx="17" cy="15" r="1.5" fill="#E8624A"/></svg>`,
      items: [
        { name: 'Build your first budget', time: '8 min' },
        { name: 'The 50/30/20 rule, explained', time: '5 min' },
        { name: 'High-yield savings accounts', time: '6 min' },
        { name: 'Emergency fund basics', time: '7 min' }
      ]
    },
    {
      id: 'invest', title: 'Investing',
      sub: 'Start while time is still on your side',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 18 L9 13 L13 16 L20 8" stroke="#2A1B2D" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 8 L20 8 L20 13" stroke="#E8624A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      items: [
        { name: 'What is a Roth IRA, really', time: '9 min' },
        { name: 'Index funds vs. picking stocks', time: '8 min' },
        { name: 'The magic of compound interest', time: '6 min' },
        { name: 'Opening your first brokerage', time: '10 min' }
      ]
    },
    {
      id: 'earn', title: 'Earning More',
      sub: "Get paid what you're worth",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2A1B2D" stroke-width="1.8"/><path d="M12 7v10M9 9.5c0-1.4 1.3-2 3-2s3 .6 3 2-1 2-3 2-3 .6-3 2 1.3 2 3 2 3-.6 3-2" stroke="#E8624A" stroke-width="1.6" stroke-linecap="round"/></svg>`,
      items: [
        { name: 'Negotiating your first salary', time: '12 min' },
        { name: 'How to ask for a raise', time: '8 min' },
        { name: 'Side hustles that fit college', time: '7 min' },
        { name: 'Freelancing 101', time: '9 min' }
      ]
    },
    {
      id: 'credit', title: 'Credit & Debt',
      sub: 'Build a score, avoid the trap',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke="#2A1B2D" stroke-width="1.8"/><path d="M3 10h18M7 15h3" stroke="#2A1B2D" stroke-width="1.8" stroke-linecap="round"/><circle cx="17" cy="15" r="1.2" fill="#E8624A"/></svg>`,
      items: [
        { name: 'Your first credit card', time: '8 min' },
        { name: 'Building credit from scratch', time: '7 min' },
        { name: 'Student loans, demystified', time: '11 min' },
        { name: 'Avoiding common credit traps', time: '6 min' }
      ]
    },
    {
      id: 'career', title: 'Career Money',
      sub: 'The paycheck is just the start',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 8h16v12H4z" stroke="#2A1B2D" stroke-width="1.8"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="#2A1B2D" stroke-width="1.8"/><circle cx="12" cy="14" r="1.5" fill="#E8624A"/></svg>`,
      items: [
        { name: 'Decoding your job benefits', time: '10 min' },
        { name: '401(k) matching basics', time: '7 min' },
        { name: 'Health insurance choices', time: '9 min' },
        { name: 'Negotiating your offer', time: '11 min' }
      ]
    },
    {
      id: 'adult', title: 'Adulting Money',
      sub: 'The boring stuff that matters most',
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12 L12 4 L21 12 V20 H3 Z" stroke="#2A1B2D" stroke-width="1.8" stroke-linejoin="round"/><rect x="10" y="14" width="4" height="6" fill="#E8624A"/></svg>`,
      items: [
        { name: 'First apartment, real costs', time: '8 min' },
        { name: 'Filing taxes for the first time', time: '12 min' },
        { name: 'Renters insurance, do you need it', time: '5 min' },
        { name: 'Understanding your paystub', time: '6 min' }
      ]
    }
  ];

  const GOALS = [
    {
      tag: 'save', tagLabel: 'Save',
      title: 'Build a $1,000 emergency fund',
      desc: 'Three months of small disasters covered.',
      current: 620, target: 1000,
      reward: 'Sunday brunch with the girls', rewardDetail: '$30 budget you\'ve pre-funded'
    },
    {
      tag: 'invest', tagLabel: 'Invest',
      title: 'Open & fund a Roth IRA',
      desc: 'Future you will compound her way to thanks.',
      current: 175, target: 500,
      reward: 'A Sephora spree', rewardDetail: '$20 set aside for the win'
    },
    {
      tag: 'debt', tagLabel: 'Debt',
      title: 'Pay off the $300 credit balance',
      desc: 'Free yourself from the 22% APR drag.',
      current: 220, target: 300,
      reward: 'New running shoes', rewardDetail: '$50 toward the splurge'
    },
    {
      tag: 'fun', tagLabel: 'Spend on Purpose',
      title: 'Save $500 for spring break',
      desc: 'Beach trip with zero financial hangover.',
      current: 145, target: 500,
      reward: 'Spring break excursion', rewardDetail: 'Snorkeling pre-paid by you'
    }
  ];

  const HURDLES = {
    0: { stage: 'Hurdle 0 of 8 · start', title: 'Welcome — get started', desc: 'Begin here to learn the basics and earn your first coins.', tasks: [['Watch the quick intro', false], ['Set one small goal', false]], reward: '10 welcome coins', detail: 'A tiny starter to celebrate starting.', amount: '10¢' },
    1: { stage: 'Hurdle 1 of 8 · cleared', title: 'Your <em>first lesson.</em>', desc: 'Just by showing up and clicking play, you joined the 12% of college first-years who proactively learn personal finance. That\'s the hardest hurdle there is — and you cleared it.', tasks: [['Watch the intro lesson', true], ['Set your first weekly goal', true]], reward: '50 starter coins', detail: 'Your welcome bonus, banked.', amount: '50¢', isCoin: true },
    2: { stage: 'Hurdle 2 of 8 · cleared', title: 'A <em>savings account,</em> for real.', desc: 'Most college students still keep all their money in one checking account. By opening a real savings account — ideally HYSA — you separated emotional spending money from your future.', tasks: [['Pick a high-yield bank', true], ['Open the account', true], ['Set up first auto-transfer', true]], reward: '$5 starter deposit', detail: 'We seeded your savings.', amount: '$5.00' },
    3: { stage: 'Hurdle 3 of 8 · cleared', title: 'Your $500 <em>buffer fund.</em>', desc: 'Half of Americans can\'t cover a $400 emergency. You — at 19 — already can. This is the line between financially fragile and financially secure.', tasks: [['Save first $100', true], ['Save first $250', true], ['Save first $500', true]], reward: '$25 Target gift card', detail: 'Use it on dorm essentials or treat yourself.', amount: '$25.00' },
    4: { stage: 'Hurdle 4 of 8 · in progress', title: 'Open your first <em>Roth IRA.</em>', desc: 'Future you wants to thank present you for this one. A Roth IRA at 19 means decades of tax-free compound growth — even with just $25/month, this single move could be worth $80,000+ at retirement.', tasks: [['Complete the "Roth IRA basics" lesson', true], ['Compare Fidelity, Vanguard, and Schwab', true], ['Open an account and link your bank', false], ['Make your first contribution ($25+)', false]], reward: 'A little Sephora spree', detail: 'A gift to celebrate, matched to a goal you set in your dashboard.', amount: '$20.00' },
    5: { stage: 'Hurdle 5 of 8 · locked', title: 'Make your <em>first investment.</em>', desc: 'Your Roth is open — now actually buy something in it. Most first-time investors freeze here. The simplest move (an S&P 500 index fund) is also the move most billionaires recommend.', tasks: [['Choose a target-date or index fund', false], ['Place your first buy order', false], ['Set up automatic monthly investing', false]], reward: '$30 Amazon credit', detail: 'A treat to mark the moment.', amount: '$30.00' },
    6: { stage: 'Hurdle 6 of 8 · locked', title: 'Negotiate a <em>raise</em> or rate.', desc: 'Women who negotiate their first job offer earn $500K+ more over their lifetime. We\'ll script the email, rehearse the conversation, and celebrate the win.', tasks: [['Research market rate for your role', false], ['Draft your negotiation script', false], ['Have the conversation', false], ['Get the yes (or counter)', false]], reward: '$50 shopping spree', detail: 'A real reward for a hard ask.', amount: '$50.00' },
    7: { stage: 'Hurdle 7 of 8 · locked', title: 'Master your <em>credit card.</em>', desc: 'Get a card, use it, pay it off in full every month for six months straight. This is how you build a 750+ credit score before graduation — and unlock cheaper everything for life.', tasks: [['Get your first credit card', false], ['Use it on planned expenses only', false], ['Pay in full 6 months running', false]], reward: '$25 reward', detail: 'A milestone gift on us.', amount: '$25.00' },
    8: { stage: 'Hurdle 8 of 8 · the big one', title: '<em>$5,000 saved</em> — you graduated.', desc: 'When you cross this line, you\'ll be in the top 10% of your age group financially. You\'ll have an emergency fund, retirement started, debt managed, credit built, and a real career money mindset.', tasks: [['Build $5K total across accounts', false], ['Maintain 12-month streak', false], ['Complete the capstone lesson', false]], reward: '$100 shopping spree', detail: 'You earned every dollar of this. Spend it on whatever future-you would high-five present-you for.', amount: '$100.00' }
  };

  // ============ STATE ============
  let coins = 240;
  const STORAGE_KEY = 'compound_selected_keys_v1';
  let selected = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  const HURDLE_STORAGE_KEY = 'compound_hurdle_tasks_v1';

  // load persisted hurdle task state (object: { id: [bool,...] })
  function loadHurdleProgress() {
    try {
      const raw = localStorage.getItem(HURDLE_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  function saveHurdleProgress(obj) {
    try { localStorage.setItem(HURDLE_STORAGE_KEY, JSON.stringify(obj)); } catch (e) { /* ignore */ }
  }

  // ============ HELPERS ============
  function qs(sel, parent = document) { return parent.querySelector(sel); }
  function qsa(sel, parent = document) { return Array.from(parent.querySelectorAll(sel)); }
  function parseMinutes(str) {
    if (!str) return 0;
    const m = parseInt(str, 10);
    return isNaN(m) ? 0 : m;
  }
  function saveSelected() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(selected))); } catch (e) { /* ignore */ }
  }

  // ============ RENDER TOPICS ============
  function renderTopics() {
    const grid = qs('#topicGrid');
    if (!grid) return;
    grid.innerHTML = ''; // reset
    TOPICS.forEach(t => {
      const el = document.createElement('div');
      el.className = 'topic';
      el.dataset.id = t.id;
      el.innerHTML = `
        <div class="topic-head">
          <div class="topic-head-left">
            <div class="topic-icon">${t.icon}</div>
            <div>
              <div class="topic-title">${t.title}</div>
              <div class="topic-sub">${t.sub}</div>
            </div>
          </div>
          <div class="topic-chevron">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
        </div>
        <div class="topic-body">
          <div class="topic-body-inner">
            ${t.items.map((it, i) => `
              <div class="subtopic ${selected.has(t.id + '-' + i) ? 'selected' : ''}" data-key="${t.id}-${i}" role="button" tabindex="0">
                <div class="check">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div class="subtopic-label">${it.name}</div>
                <div class="subtopic-time">${it.time}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      grid.appendChild(el);
    });

    // Attach interactions after injecting
    qsa('.topic').forEach(topic => {
      const head = topic.querySelector('.topic-head');
      head.addEventListener('click', () => topic.classList.toggle('open'));
    });

    // Subtopic click/keyboard
    qsa('.subtopic').forEach(sub => {
      sub.addEventListener('click', onSubtopicClick);
      sub.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onSubtopicClick.call(sub, ev); }
      });
    });

    updateGenerateBar();
  }

  function onSubtopicClick(e) {
    // `this` is the element when called from keyboard handler; otherwise use event target closest
    const el = (this && this.dataset && this.dataset.key) ? this : e.currentTarget.closest('.subtopic') || e.currentTarget;
    const key = el.dataset.key;
    if (!key) return;

    if (selected.has(key)) {
      selected.delete(key);
      el.classList.remove('selected');
    } else {
      selected.add(key);
      el.classList.add('selected');
    }
    saveSelected();
    updateGenerateBar();
  }

  function updateGenerateBar() {
    const bar = qs('#generateBar');
    const count = qs('#selectCount');
    if (!count) return;
    count.textContent = selected.size;
    if (selected.size > 0) bar.classList.add('show');
    else bar.classList.remove('show');
  }

  // ============ AI GENERATE FLOW ============
  const modal = qs('#modalBg');
  const loadingState = qs('#aiLoadingState');
  const resultState = qs('#aiResultState');
  const statusEl = qs('#aiStatus');
  const dotsEl = qs('#dots');

  const STATUSES = [
    'Reading what you picked…',
    'Mapping your starting point…',
    'Sequencing modules for the best flow…',
    'Calibrating reward coins…',
    'Almost there — adding a few surprises…'
  ];

  qs('#generateBtn') && qs('#generateBtn').addEventListener('click', () => {
    if (selected.size === 0) return; // safety
    modal.classList.add('show');
    loadingState.style.display = 'block';
    resultState.style.display = 'none';

    // Animate status changes
    let i = 0;
    statusEl.textContent = STATUSES[0];
    const interval = setInterval(() => {
      i++;
      if (i < STATUSES.length) {
        statusEl.style.animation = 'none';
        void statusEl.offsetWidth;
        statusEl.textContent = STATUSES[i];
        statusEl.style.animation = 'fadeIn 0.4s ease';
      }
    }, 700);

    // After delay, show result
    setTimeout(() => {
      clearInterval(interval);
      buildCourseResult();
      loadingState.style.display = 'none';
      resultState.style.display = 'block';
    }, 3600);
  });

  function buildCourseResult() {
    // Get selected items
    const picks = [];
    selected.forEach(k => {
      const [topicId, idx] = k.split('-');
      const topic = TOPICS.find(t => t.id === topicId);
      const index = parseInt(idx, 10);
      if (topic && Number.isFinite(index) && topic.items[index]) picks.push({ topic, item: topic.items[index] });
    });

    // Cap modules to 8 (keep order of selection)
    const modules = picks.slice(0, 8);

    // Calc totals (times are strings like '8 min')
    const totalMin = modules.reduce((a, m) => a + parseMinutes(m.item.time), 0);
    const coinPerModule = 25; // default
    const totalCoins = modules.length * coinPerModule;

    qs('#moduleCount').textContent = modules.length;
    qs('#totalTime').textContent = totalMin;
    qs('#totalCoins').textContent = totalCoins;

    // Title based on which topics dominate (safe fallback)
    const counts = {};
    picks.forEach(p => counts[p.topic.id] = (counts[p.topic.id] || 0) + 1);
    let titleKey = null;
    const entries = Object.entries(counts);
    if (entries.length > 0) {
      titleKey = entries.sort((a,b) => b[1]-a[1])[0][0];
    }
    const titleMap = {
      budget: 'Your <em>budget basics</em> primer',
      invest: 'Your <em>start investing</em> primer',
      earn: 'Your <em>earn more</em> playbook',
      credit: 'Your <em>credit confidence</em> course',
      career: 'Your <em>career money</em> primer',
      adult: 'Your <em>adulting</em> survival kit'
    };
    qs('#courseTitle').innerHTML = titleMap[titleKey] || 'Your <em>money primer</em>';

    // Build modules list; if none selected show a helpful message
    const list = qs('#modulesList');
    if (!list) return;
    if (modules.length === 0) {
      list.innerHTML = `<div style="padding:20px;color:var(--ink-muted);">No modules selected. Close this dialog and pick a few subtopics to generate a course tailored to you.</div>`;
      return;
    }

    list.innerHTML = modules.map((m, i) => `
      <div class="module">
        <div class="module-num">${i + 1}</div>
        <div class="module-body">
          <div class="module-title">${m.item.name}</div>
          <div class="module-desc">A focused lesson from <strong>${m.topic.title}</strong> — clear, fast, and built for someone exactly where you are.</div>
          <div class="module-meta">
            <span>⏱ ${m.item.time}</span>
            <span class="coin-mini">+${coinPerModule}¢</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  qs('#modalClose') && qs('#modalClose').addEventListener('click', () => {
    modal.classList.remove('show');
  });
  modal && modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  qs('#startCourseBtn') && qs('#startCourseBtn').addEventListener('click', () => {
    // Award coins equal to totalCoins shown in result (fallback 50)
    const modulesCount = parseInt(qs('#moduleCount').textContent || '0', 10);
    const award = Math.max(50, modulesCount * 25);
    addCoins(award);
    modal.classList.remove('show');
    switchView('dashboard');
  });

  // ============ DASHBOARD: RENDER GOALS ============
  function renderGoals() {
    const goalsList = qs('#goalsList');
    if (!goalsList) return;
    goalsList.innerHTML = '';
    GOALS.forEach(g => {
      const pct = Math.round((g.current / g.target) * 100);
      const el = document.createElement('div');
      el.className = 'goal-card';
      el.innerHTML = `
        <div class="goal-info">
          <span class="goal-tag ${g.tag}">${g.tagLabel}</span>
          <div class="goal-title">${g.title}</div>
          <div class="goal-desc">${g.desc}</div>
        </div>
        <div class="goal-progress-wrap">
          <div class="goal-progress-nums">
            <span class="goal-current">$${g.current.toLocaleString()}</span>
            <span class="goal-target">of $${g.target.toLocaleString()} · ${pct}%</span>
          </div>
          <div class="pbar"><div class="pbar-fill ${g.tag}" style="width: 0%"></div></div>
        </div>
        <div class="goal-reward">
          <div class="goal-reward-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Reward at finish
          </div>
          <div class="goal-reward-name">${g.reward}</div>
          <div class="goal-reward-detail">${g.rewardDetail}</div>
        </div>
      `;
      goalsList.appendChild(el);
      // animate progress bar after a tick
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.querySelector('.pbar-fill').style.width = pct + '%';
        }, 200 + (Array.from(goalsList.children).indexOf(el) * 120));
      });
    });

    // After rendering, check for any completed goals and handle them
    setTimeout(() => checkGoalsForCompletion(), 220);
  }

  // ============ GOAL COMPLETION: CONFETTI, POPUP, DELETE ============
  function createConfettiBurst() {
    // Simple DOM confetti: many small colored divs with animation
    const container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.position = 'fixed';
    container.style.left = 0;
    container.style.top = 0;
    container.style.right = 0;
    container.style.bottom = 0;
    container.style.pointerEvents = 'none';
    container.style.zIndex = 2000;
    document.body.appendChild(container);

    const colors = ['#F472B6', '#8B1E5C', '#60A5FA', '#10B981', '#FCD34D'];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('div');
      const size = Math.floor(Math.random() * 10) + 6;
      c.style.width = size + 'px';
      c.style.height = size + 'px';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.position = 'absolute';
      c.style.left = (Math.random() * 100) + '%';
      c.style.top = '-10%';
      c.style.opacity = '' + (0.9 - Math.random() * 0.5);
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      c.style.borderRadius = Math.random() > 0.5 ? '3px' : '50%';
      c.style.transition = 'transform 1.6s linear, top 1.6s cubic-bezier(.2,.9,.2,1), opacity 1.6s ease';
      container.appendChild(c);
      // Trigger fall after tiny delay
      setTimeout(() => {
        c.style.top = (60 + Math.random() * 40) + '%';
        c.style.transform = `translateY(${200 + Math.random() * 200}px) rotate(${Math.random() * 720}deg)`;
        c.style.opacity = '0.95';
      }, Math.random() * 120);
    }

    // remove after animation
    setTimeout(() => container.remove(), 2200);
  }

  function showRewardPopup(goal) {
    // create a small popup in bottom-right with reward info and an action button
    const id = 'reward-popup-' + Date.now();
    const popup = document.createElement('div');
    popup.id = id;
    popup.className = 'reward-popup';
  popup.style.position = 'fixed';
  popup.style.left = '50%';
  popup.style.top = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.zIndex = 2200;
    popup.style.background = 'white';
    popup.style.border = '1px solid rgba(0,0,0,0.06)';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = '0 8px 24px rgba(18,18,18,0.08)';
    popup.style.padding = '14px 16px';
    popup.style.maxWidth = '320px';
    popup.innerHTML = `
      <div style="display:flex;gap:12px;align-items:center">
        <div style="width:46px;height:46px;border-radius:10px;background:linear-gradient(135deg,#F472B6,#8B1E5C);display:flex;align-items:center;justify-content:center;color:white;font-weight:700">🎉</div>
        <div style="flex:1">
          <div style="font-weight:600">Goal reached</div>
          <div style="font-size:13px;color:#6b6b6b;margin-top:4px">${goal.title}</div>
          <div style="margin-top:8px;font-weight:700">${goal.reward}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
        <button class="reward-dismiss" style="background:transparent;padding:8px;border-radius:8px">Close</button>
        <button class="reward-claim" style="background:linear-gradient(135deg,#8B1E5C,#F472B6);color:white;padding:8px 12px;border-radius:8px;font-weight:700">Claim</button>
      </div>
    `;
    document.body.appendChild(popup);

    popup.querySelector('.reward-dismiss').addEventListener('click', () => popup.remove());
    popup.querySelector('.reward-claim').addEventListener('click', () => {
      // Award a small bonus (10 coins) when claiming reward, then remove popup
      addCoins(10);
      popup.remove();
    });

    // auto-remove after 12s
    setTimeout(() => { if (document.getElementById(id)) document.getElementById(id).remove(); }, 12000);
  }

  function deleteGoal(index) {
    // remove from GOALS array and re-render
    if (index < 0 || index >= GOALS.length) return;
    GOALS.splice(index, 1);
    renderGoals();
  }

  function checkGoalsForCompletion() {
    // Scan GOALS for any that have current >= target and handle once
    for (let i = GOALS.length - 1; i >= 0; i--) {
      const g = GOALS[i];
      if (!g) continue;
      if (Number(g.current) >= Number(g.target)) {
        // Trigger confetti and reward popup, then delete the goal
        try { createConfettiBurst(); } catch (e) { /* ignore */ }
        try { showRewardPopup(g); } catch (e) { /* ignore */ }
        // slight delay so user sees confetti before removal
        setTimeout(() => deleteGoal(i), 900);
      }
    }
  }

  // ============ NAV ============
  const navItems = qsa('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => switchView(item.dataset.view));
  });

  function switchView(view) {
    navItems.forEach(n => n.classList.toggle('active', n.dataset.view === view));
    document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // re-animate progress bars when entering dashboard
    if (view === 'dashboard') {
      document.querySelectorAll('.pbar-fill').forEach((bar, i) => {
        const w = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => bar.style.width = w, 100 + (i * 120));
      });
    }
  }

  // ============ COIN HELPERS ============
  function addCoins(n) {
    coins += n;
    const coinCountEl = qs('#coinCount');
    if (coinCountEl) coinCountEl.textContent = coins;

    // Float coin indicator from header
    const pill = qs('.coin-pill');
    if (!pill) return;
    const r = pill.getBoundingClientRect();
    const fc = document.createElement('div');
    fc.className = 'floating-coin';
    fc.textContent = '+' + n + '¢';
    fc.style.left = (r.left + r.width / 2 - 30) + 'px';
    fc.style.top = (r.top + r.height + 8) + 'px';
    document.body.appendChild(fc);
    setTimeout(() => fc.remove(), 1300);
  }

  // ============ JOURNEY: HURDLE CLICKS ============
  function renderHurdle(id) {
    const h = HURDLES[id];
    if (!h) return;
    const detail = qs('#hurdleDetail');
    if (!detail) return;
    // Build tasks using persisted state when available
    const persisted = loadHurdleProgress();
    const state = (persisted && persisted[id]) ? persisted[id] : h.tasks.map(([t, d]) => !!d);

    detail.innerHTML = `
      <div class="hurdle-detail-info">
        <span class="hurdle-stage-label">${h.stage}</span>
        <h3>${h.title}</h3>
        <p>${h.desc}</p>
        <div class="hurdle-tasks">
          ${h.tasks.map(([text, done], i) => `
            <label class="hurdle-task ${state[i] ? 'done' : ''}" style="display:flex;align-items:center;gap:10px;cursor:pointer;">
              <input type="checkbox" data-task-index="${i}" ${state[i] ? 'checked' : ''} />
              <span style="flex:1">${text}</span>
            </label>
          `).join('')}
        </div>
      </div>
      <div class="reward-card">
        <div class="reward-card-label">${id < 4 ? 'Reward earned' : 'Reward unlocked at finish'}</div>
        <div class="reward-card-title">${h.reward}</div>
        <div class="reward-card-detail">${h.detail}</div>
        <div class="reward-amount">${h.amount}</div>
      </div>
    `;

    // Attach checkbox listeners
    const detailElem = detail.querySelector('.hurdle-tasks');
    if (detailElem) {
      const checkboxes = Array.from(detailElem.querySelectorAll('input[type="checkbox"]'));
      checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
          const idx = parseInt(cb.dataset.taskIndex, 10);
          const persistedAll = loadHurdleProgress();
          const arr = persistedAll[id] ? persistedAll[id].slice() : h.tasks.map(([t,d]) => !!d);
          arr[idx] = !!cb.checked;
          persistedAll[id] = arr;
          saveHurdleProgress(persistedAll);

          // toggle visual done class for task label
          const label = cb.closest('.hurdle-task');
          if (label) label.classList.toggle('done', !!cb.checked);

          // check if hurdle is complete
          checkHurdleCompletion(id);
        });
      });
    }
    detail.style.animation = 'none';
    void detail.offsetWidth;
    detail.style.animation = 'fadeUp 0.4s ease both';
  }

  // Check if all tasks for a hurdle are complete; if so mark done, award coins and unlock next
  function checkHurdleCompletion(id) {
    const persisted = loadHurdleProgress();
    const arr = persisted[id] ? persisted[id] : HURDLES[id].tasks.map(([t,d]) => !!d);
    const all = arr.every(Boolean);
    const group = document.querySelector(`.hurdle[data-id="${id}"]`);
    if (all && group && !group.classList.contains('done')) {
      // mark done visually
      group.classList.add('done');
      const c = group.querySelector('circle');
      if (c) { c.setAttribute('fill', '#8FA67E'); c.setAttribute('stroke', '#2A1B2D'); }

      // award reward coins if specified
      const h = HURDLES[id];
      const cents = parseCoinAmount(h.amount);
      if (cents > 0) addCoins(cents);

      // unlock next
      const next = document.querySelector(`.hurdle[data-id="${parseInt(id,10)+1}"]`);
      if (next && next.classList.contains('locked')) next.classList.remove('locked');

      updateJourneyProgress();
    }
  }

  // Enhanced hurdle behavior: award coins, mark done, unlock next
  function parseCoinAmount(amountStr) {
    if (!amountStr) return 0;
    const s = String(amountStr).trim();
    if (s.includes('¢')) {
      const n = parseInt(s.replace(/[^0-9-]/g, ''), 10);
      return isNaN(n) ? 0 : n;
    }
    if (s.includes('$')) {
      const n = parseFloat(s.replace(/[^0-9.\-]/g, ''));
      return isNaN(n) ? 0 : Math.round(n * 100);
    }
    return 0;
  }

  function updateJourneyProgress() {
    const total = qsa('.hurdle').length;
    const done = qsa('.hurdle.done').length;

    // Update journey stat: cleared
    const statNums = document.querySelectorAll('.journey-stat .journey-stat-num');
    if (statNums && statNums.length >= 1) {
      statNums[0].innerHTML = `<em>${done}</em>/${total}`;
    }

    // Update coins banked stat (3rd stat index 2)
    if (statNums && statNums.length >= 3) {
      statNums[2].innerHTML = `${coins}<span style="color: #B58A2A;">¢</span>`;
    }

    // Animate the colored progress overlay along the road path
    const overlay = document.getElementById('progressOverlay');
    if (overlay && typeof overlay.getTotalLength === 'function') {
      try {
        const pathLen = overlay.getTotalLength();
        const fraction = Math.min(1, Math.max(0, done / total));
        const offset = Math.round(pathLen * (1 - fraction));
        overlay.style.transition = 'stroke-dashoffset 900ms ease';
        overlay.style.strokeDashoffset = offset;
      } catch (e) {
        // ignore failures
      }
    }
  }

  function onHurdleClick(groupEl) {
    if (!groupEl) return;
    const id = groupEl.dataset.id;
    renderHurdle(id);

    const h = HURDLES[id];
    if (!h) return;

    // If locked, briefly pulse to show it's not available
    if (groupEl.classList.contains('locked')) {
      groupEl.style.opacity = '0.9';
      setTimeout(() => { groupEl.style.opacity = ''; }, 250);
      return;
    }

    // If not already done, mark done and award any coin reward
    if (!groupEl.classList.contains('done')) {
      groupEl.classList.remove('current');
      groupEl.classList.add('done');
      // visually update circle if present
      const c = groupEl.querySelector('circle');
      if (c) {
        c.setAttribute('fill', '#8FA67E');
        c.setAttribute('stroke', '#2A1B2D');
      }

      // Award coins if the reward contains cents or explicit coin amount
      const cents = parseCoinAmount(h.amount);
      if (cents > 0) {
        addCoins(cents);
      }

      // unlock next hurdle if present
      const next = document.querySelector(`.hurdle[data-id="${parseInt(id,10)+1}"]`);
      if (next && next.classList.contains('locked')) {
        next.classList.remove('locked');
      }

      updateJourneyProgress();
    }
  }

  function attachHurdleHandlers() {
    qsa('.hurdle').forEach(h => {
      h.style.cursor = 'pointer';
      h.addEventListener('click', function () { onHurdleClick(this); });
    });
  }

  // dots animation for loading
  setInterval(() => {
    if (!dotsEl) return;
    const t = dotsEl.textContent || '';
    dotsEl.textContent = t.length >= 3 ? '' : t + '.';
  }, 350);

  // ============ INIT ============
  document.addEventListener('DOMContentLoaded', () => {
    renderTopics();
    renderGoals();
    attachHurdleHandlers();

    // Render the first unlocked/current hurdle detail on load so users start at Hurdle 0
    setTimeout(() => {
      try {
        const current = document.querySelector('.hurdle.current') || document.querySelector('.hurdle:not(.locked)') || document.querySelector('.hurdle');
        if (current && current.dataset && typeof current.dataset.id !== 'undefined') {
          renderHurdle(current.dataset.id);
          // Re-check completion state (this will mark visuals and award coins if persisted as complete)
          const persisted = loadHurdleProgress();
          if (persisted && persisted[current.dataset.id]) {
            checkHurdleCompletion(current.dataset.id);
          }
        }
      } catch (e) { /* ignore */ }
    }, 80);

    // Initialize progress overlay stroke-dasharray/strokeDashoffset for correct animation
    const overlay = document.getElementById('progressOverlay');
    if (overlay && typeof overlay.getTotalLength === 'function') {
      try {
        const L = overlay.getTotalLength();
        overlay.style.strokeDasharray = L;
        // initial dashed offset comes from the SVG default; compute based on current done count
        setTimeout(updateJourneyProgress, 50);
      } catch (e) { /* ignore */ }
    }
  });

})();
