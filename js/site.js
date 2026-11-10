/* Shatha Alreshoodi — portfolio behaviour.
   Projects are rendered from content/projects.js; static sections live in index.html.
   Content stays readable without this file or without motion. */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const DATA = window.PORTFOLIO || { categories: [], projects: [] };
  const SIZES = window.MEDIA_SIZES || {};
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const motionOK = hasGSAP && !mqReduce.matches;
  const hasFlip = motionOK && typeof window.Flip !== 'undefined';
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const dir = () => (root.dir === 'rtl' ? -1 : 1);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };

  root.classList.toggle('motion', motionOK);
  // Without motion there is no opening curtain.
  if (!motionOK) { root.classList.remove('intro-on'); const o = document.querySelector('.intro'); if (o) o.remove(); }
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger, ...(hasFlip ? [Flip] : []));

  /* ------------------------------------------------------------------
     Language
     ------------------------------------------------------------------ */
  const STR = {
    en: {
      title: 'Shatha Alreshoodi — IT & Software Development Professional',
      lang: 'عربي', all: 'All', open: 'Open the case study', featured: 'Featured',
      client: 'Client', role: 'Role', year: 'Year', tools: 'Tools', results: 'Results', next: 'Next project', close: 'Close',
      work: 'Work', showGrid: 'Show the layout grid',
      copyOk: 'Email copied to the clipboard.', copyFail: 'Copy didn’t work here. The address is shathaalrshoudi@gmail.com.',
      viewer: { label: 'Image viewer', close: 'Close', prev: 'Previous', next: 'Next' },
      pm: {
        title: 'How permissions shape each account', sub: 'Set each page to hidden, view only or edit, and watch the account change. This follows the platform’s documented permission system; no real data.',
        account: 'Example account', sees: 'What this account sees', levels: { hidden: 'Hidden', view: 'View', edit: 'Edit' },
        viewOnly: 'View only', canEdit: 'Can edit', homeTitle: 'Home', homeDesc: 'Cards and shortcuts for the modules this account can use.',
        loads: n => `Home loads data for ${n} module${n === 1 ? '' : 's'}.`, skipped: list => ` Skipped: ${list}.`, none: 'Nothing to show. Every page is hidden.',
      },
      rf: {
        title: 'What happens to a request', sub: 'A simplified model of the platform’s access flow.',
        allow: 'Send a permitted request', deny: 'Send a request without permission', idle: 'Choose a request to watch its path.',
        nodes: ['Employee’s browser', 'Flask app', 'Sign-in check', 'Permission check', 'Database'],
        browser: 'The browser sends a request over HTTPS.', app: 'Flask routes it to the right page.', auth: 'Sign-in check: an active session was found.',
        permOk: 'Permission check: this role is allowed.', db: 'The record is read from SQLite.', done200: 'Response returned: 200 OK.',
        permNo: 'Permission check: this role isn’t allowed, so the request stops here.', done403: 'Response returned: 403 Forbidden. No data left the database.',
      },
      ss: {
        title: 'A scan, start to finish', sub: 'Real screens from a recording of the tool.',
        steps: [
          ['Configure the scan', 'Enter a target, choose Safe, Fast or Full, and keep Safe Mode on for non-intrusive checks.'],
          ['Run it', 'The scan runs as a background job with live progress.'],
          ['Read the risk', 'Status code, a 0–100 risk score, the profile used and Safe Mode state, with PDF and JSON export.'],
          ['Understand each finding', 'Every check has a plain-language summary, a severity and a recommended fix.'],
          ['See the spread', 'A dashboard shows how findings split across high, medium and low severity.'],
          ['Share the report', 'A downloadable PDF report carries the evidence for each finding.'],
          ['Keep a history', 'Every scan is stored and can be filtered by URL and severity.'],
          ['Compare scans', 'Two scans of the same target, compared, show what changed.'],
          ['Schedule it', 'Recurring daily, weekly or monthly scans run on their own.'],
        ],
        prev: 'Previous screen', next: 'Next screen',
      },
      sp: {
        title: 'What each scan profile runs', profiles: { safe: 'Safe', fast: 'Fast', full: 'Full' },
        checks: ['Security headers (CSP, X-Frame-Options, HSTS and others)', 'Server information disclosure', 'Inline scripts and event handlers', 'SQL error disclosure', 'Reflected XSS test', 'Response similarity test', 'Page stability across repeated requests'],
        notes: { safe: 'Passive analysis of headers and page content.', fast: 'Adds a reflected XSS test and a response similarity test.', full: 'Adds a page stability check across repeated requests.' },
        safeMode: 'With Safe Mode on, the reflected XSS test is skipped.',
      },
      ar: {
        title: 'How it’s put together', sub: 'The architecture from the project poster.',
        nodes: { user: 'User', ui: 'Website UI', api: 'Flask backend', engine: 'Scan engine', db: 'Database' },
        steps: ['User enters a URL', 'Website UI submits it', 'Backend sends a scan request', 'Engine returns its findings', 'Results are stored', 'History is fetched for comparison', 'Backend builds the report', 'Results are shown to the user'],
      },
      hf: {
        title: 'Hosting path', sub: 'The hosting setup configured and tested with AWS Lightsail, Nginx and Cloudflare.',
        nodes: ['Visitor', 'Cloudflare DNS', 'Nginx', 'App on AWS Lightsail'],
        steps: ['A visitor requests the site', 'Cloudflare resolves the domain', 'Nginx receives the request on the Lightsail server', 'The application responds', 'The response returns to the visitor'],
      },
    },
    ar: {
      title: 'شذى الرشودي — متخصصة في تقنية المعلومات وتطوير البرمجيات',
      lang: 'English', all: 'الكل', open: 'افتح دراسة الحالة', featured: 'مختار',
      client: 'الجهة', role: 'الدور', year: 'السنة', tools: 'الأدوات', results: 'النتائج', next: 'المشروع التالي', close: 'إغلاق',
      work: 'الأعمال', showGrid: 'إظهار شبكة التصميم',
      copyOk: 'تم نسخ البريد الإلكتروني.', copyFail: 'تعذّر النسخ هنا. العنوان هو shathaalrshoudi@gmail.com',
      viewer: { label: 'عارض الصور', close: 'إغلاق', prev: 'السابق', next: 'التالي' },
      pm: {
        title: 'كيف تشكّل الصلاحيات كل حساب', sub: 'اضبط كل صفحة على مخفي أو اطلاع أو تعديل، وشاهد الحساب يتغيّر. النموذج يتبع نظام الصلاحيات الموثّق في المنصة دون أي بيانات حقيقية.',
        account: 'حساب تجريبي', sees: 'ما يراه هذا الحساب', levels: { hidden: 'مخفي', view: 'اطلاع', edit: 'تعديل' },
        viewOnly: 'اطلاع فقط', canEdit: 'يمكنه التعديل', homeTitle: 'الرئيسية', homeDesc: 'بطاقات واختصارات للأقسام التي يستطيع هذا الحساب استخدامها.',
        loads: n => `تحمّل الرئيسية بيانات ${n} ${n === 1 ? 'قسم' : 'أقسام'}.`, skipped: list => ` تم تخطّي: ${list}.`, none: 'لا يوجد ما يُعرض؛ كل الصفحات مخفية.',
      },
      rf: {
        title: 'ماذا يحدث للطلب', sub: 'نموذج مبسّط لمسار الوصول في المنصة.',
        allow: 'أرسل طلبًا مسموحًا', deny: 'أرسل طلبًا بلا صلاحية', idle: 'اختر طلبًا لترى مساره.',
        nodes: ['متصفح الموظف', 'تطبيق Flask', 'التحقق من الدخول', 'التحقق من الصلاحية', 'قاعدة البيانات'],
        browser: 'يرسل المتصفح طلبًا عبر HTTPS.', app: 'يوجّه Flask الطلب إلى الصفحة المناسبة.', auth: 'التحقق من الدخول: توجد جلسة نشطة.',
        permOk: 'التحقق من الصلاحية: هذا الدور مسموح له.', db: 'تُقرأ البيانات من SQLite.', done200: 'أُعيدت الاستجابة: 200 OK.',
        permNo: 'التحقق من الصلاحية: هذا الدور غير مسموح له، فيتوقف الطلب هنا.', done403: 'أُعيدت الاستجابة: 403 Forbidden. لم تخرج أي بيانات من قاعدة البيانات.',
      },
      ss: {
        title: 'فحص من البداية إلى النهاية', sub: 'شاشات حقيقية من تسجيل للأداة.',
        steps: [
          ['تهيئة الفحص', 'أدخل الرابط، واختر ملف الفحص (آمن أو سريع أو شامل)، وأبقِ الوضع الآمن مفعّلًا للفحص غير التدميري.'],
          ['تشغيل الفحص', 'يعمل الفحص كمهمة في الخلفية مع شريط تقدّم مباشر.'],
          ['ملخص الخطورة', 'رمز الاستجابة، ودرجة خطورة من 0 إلى 100، وملف الفحص، وحالة الوضع الآمن، مع تصدير PDF وJSON.'],
          ['فهم النتائج', 'لكل فحص شرح مبسّط، ومستوى خطورة، وتوصية بالإصلاح.'],
          ['لوحة الخطورة', 'توزيع النتائج بين خطورة عالية ومتوسطة ومنخفضة.'],
          ['التقرير', 'تقرير PDF قابل للتنزيل مع الأدلة لكل نتيجة.'],
          ['السجل', 'تُحفظ كل عملية فحص ويمكن تصفيتها حسب الرابط والخطورة.'],
          ['المقارنة', 'مقارنة فحصين للهدف نفسه تُظهر ما تغيّر.'],
          ['الجدولة', 'فحوصات دورية يومية أو أسبوعية أو شهرية تعمل تلقائيًا.'],
        ],
        prev: 'الشاشة السابقة', next: 'الشاشة التالية',
      },
      sp: {
        title: 'ما الذي يشغّله كل ملف فحص', profiles: { safe: 'آمن', fast: 'سريع', full: 'شامل' },
        checks: ['ترويسات الأمان (CSP وX-Frame-Options وHSTS وغيرها)', 'كشف معلومات الخادم', 'السكربتات المضمّنة ومعالجات الأحداث', 'كشف أخطاء SQL', 'اختبار XSS المنعكس', 'اختبار تشابه الاستجابات', 'ثبات الصفحة عبر طلبات متكررة'],
        notes: { safe: 'تحليل سلبي للترويسات ومحتوى الصفحة.', fast: 'يضيف اختبار XSS المنعكس واختبار تشابه الاستجابات.', full: 'يضيف فحص ثبات الصفحة عبر طلبات متكررة.' },
        safeMode: 'عند تفعيل الوضع الآمن يُتخطّى اختبار XSS المنعكس.',
      },
      ar: {
        title: 'بنية النظام', sub: 'البنية كما وردت في ملصق المشروع.',
        nodes: { user: 'المستخدم', ui: 'واجهة الموقع', api: 'الخادم (Flask)', engine: 'محرك الفحص', db: 'قاعدة البيانات' },
        steps: ['يُدخل المستخدم الرابط', 'ترسله واجهة الموقع', 'يرسل الخادم طلب الفحص', 'يعيد المحرك النتائج', 'تُحفظ النتائج', 'يُسترجع السجل للمقارنة', 'يبني الخادم التقرير', 'تُعرض النتائج للمستخدم'],
      },
      hf: {
        title: 'مسار الاستضافة', sub: 'إعداد الاستضافة الذي جرى ضبطه واختباره باستخدام AWS Lightsail وNginx وCloudflare.',
        nodes: ['الزائر', 'Cloudflare DNS', 'Nginx', 'التطبيق على AWS Lightsail'],
        steps: ['يطلب الزائر الموقع', 'يحلّ Cloudflare اسم النطاق', 'يستقبل Nginx الطلب على خادم Lightsail', 'يستجيب التطبيق', 'تعود الاستجابة إلى الزائر'],
      },
    },
  };
  let lang = 'en';
  const t = () => STR[lang];
  const L = v => (v == null ? '' : typeof v === 'string' ? v : (v[lang] ?? v.en ?? ''));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Static text (index.html) swaps via data-ar; captured before anything renders.
  const i18nEls = $$('[data-ar]');
  i18nEls.forEach(el => { el.dataset.en = el.innerHTML; });
  const labelEls = $$('[data-ar-label]');
  labelEls.forEach(el => { el.dataset.enLabel = el.getAttribute('aria-label') || ''; });

  function applyStatic() {
    const ar = lang === 'ar';
    i18nEls.forEach(el => { el.innerHTML = ar ? el.dataset.ar : el.dataset.en; });
    labelEls.forEach(el => el.setAttribute('aria-label', ar ? el.dataset.arLabel : el.dataset.enLabel));
    root.lang = lang;
    root.dir = ar ? 'rtl' : 'ltr';
    document.title = t().title;
    const btn = $('#langToggle');
    btn.textContent = t().lang;
    btn.lang = ar ? 'en' : 'ar';
    const v = t().viewer;
    $('#viewer').setAttribute('aria-label', v.label);
    $('.viewer-close').setAttribute('aria-label', v.close);
    $('.viewer-prev').setAttribute('aria-label', ar ? v.next : v.prev);
    $('.viewer-next').setAttribute('aria-label', ar ? v.prev : v.next);
  }

  /* ------------------------------------------------------------------
     Data helpers
     ------------------------------------------------------------------ */
  const projects = DATA.projects.slice();
  const bySlug = Object.fromEntries(projects.map(p => [p.slug, p]));
  const featured = projects.filter(p => p.featured > 0).sort((a, b) => a.featured - b.featured);
  const ordered = [...featured, ...projects.filter(p => !(p.featured > 0)).sort((a, b) => (String(b.year || '').localeCompare(String(a.year || ''))))];
  const catName = id => L(DATA.categories.find(c => c.id === id) || id);
  const catList = p => (p.categories || []).map(catName).join(', ');

  function img(src, alt = '', { lazy = true, cls = '' } = {}) {
    const s = SIZES[src];
    const wh = s ? ` width="${s[0]}" height="${s[1]}"` : '';
    return `<img src="${esc(src)}" alt="${esc(L(alt))}"${wh}${lazy ? ' loading="lazy"' : ''} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
  }
  function coverHTML(p, lazy = true) {
    const c = p.cover || {};
    if (!c.src) return `<span class="type-cover"><b>${esc(L(c.text || p.title))}</b></span>`;
    return img(c.src, c.alt || p.title, { lazy });
  }

  /* ------------------------------------------------------------------
     Hero wall
     ------------------------------------------------------------------ */
  // Curated in content/projects.js (`hero`); falls back to featured covers.
  function renderWall() {
    const wall = $('#wall');
    const list = (DATA.hero && DATA.hero.length ? DATA.hero : featured.map(p => ({ src: p.cover.src, slug: p.slug })))
      .filter(it => bySlug[it.slug]);
    const cols = [[], []];
    list.forEach((it, i) => cols[i % 2].push(it));
    wall.innerHTML = cols.map((col, ci) => {
      // The first two tiles per column load straight away; the rest wait until needed.
      const tile = (it, k, dup) => `<a class="wall-item" href="#/work/${it.slug}"${dup ? ' tabindex="-1"' : ''}>${img(it.src, bySlug[it.slug].title, { lazy: dup || k > 1 })}<span>${esc(L(bySlug[it.slug].title))}</span></a>`;
      const tiles = col.map((it, k) => tile(it, k, false)).join('');
      const dup = motionOK ? `<div class="wall-dup" aria-hidden="true" style="display:contents">${col.map((it, k) => tile(it, k, true)).join('')}</div>` : '';
      // Doubled so the drift loops seamlessly; the copy is hidden from assistive tech.
      return `<div class="wall-col" style="--dur:${110 + ci * 20}s">${tiles}${dup}</div>`;
    }).join('');
  }

  /* ------------------------------------------------------------------
     Selected work showcases
     ------------------------------------------------------------------ */
  // Shared header and footer for every showcase, technical or identity.
  function scHead(p) {
    return `<header class="sc-head">
        <div>
          <p class="sc-meta"><b>${esc(catList(p))}</b>${p.year ? `<span>${esc(p.year)}</span>` : ''}</p>
          <h3 class="sc-title">${esc(L(p.title))}</h3>
        </div>
        <div class="sc-side">
          <p class="sc-client">${esc(L(p.client))}</p>
          <p class="sc-role">${esc(L(p.role))}</p>
          <p class="sc-summary">${esc(L(p.summary))}</p>
        </div>
      </header>`;
  }
  function scFoot(p, extra = '') {
    const outs = (p.outcomes || []).map(o => `<li>${esc(L(o))}</li>`).join('');
    return `<footer class="sc-foot">
        <div>${outs ? `<ul class="sc-outcomes">${outs}</ul>` : extra}</div>
        <ul class="tags">${(p.tools || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        <a class="btn btn-accent" href="#/work/${p.slug}">${t().open}</a>
      </footer>`;
  }
  function rackHTML(items, group) {
    const n = items.length;
    return `<div class="rack">${items.map((it, i) => {
      const r = n > 1 ? (-12 + (24 * i) / (n - 1)) : 0;
      const z = 10 - Math.abs(i - (n - 1) / 2);
      return `<button class="rack-item" type="button" style="--r:${r.toFixed(1)}deg;--z:${Math.round(z)}" data-view-src="${esc(it.src)}" data-view-group="${group}" data-view-caption="${esc(L(it.alt))}">${img(it.src, it.alt)}</button>`;
    }).join('')}</div>`;
  }
  function showcaseHTML(p) {
    const s = p.showcase || {};
    if (s.kind === 'identity') {
      const tone = p.tone || { bg: '#10263F' };
      const pal = (p.palette || []).map(c => `<i style="--sw:${c}"></i>`).join('');
      const first = s.logo
        ? `<div class="id-logo" data-logo="${esc(s.logo)}">${img(p.cover.src, p.cover.alt)}</div>`
        : `<div class="id-hero"><button class="gal-item" type="button" data-view-src="${esc(s.hero.src)}" data-view-group="sc-${p.slug}" data-view-caption="${esc(L(s.hero.alt))}">${img(s.hero.src, s.hero.alt)}</button></div>`;
      return `<article class="sc sc-identity" data-slug="${p.slug}">
        <div class="sc-wash tone-dark" data-tone="dark" style="--wbg:${tone.bg}">
          ${scHead(p)}
          <div class="id-visual">${first}${rackHTML(s.rack || [], 'sc-' + p.slug)}</div>
          ${scFoot(p, pal ? `<div class="id-palette" aria-hidden="true">${pal}</div>` : '')}
        </div></article>`;
    }
    return `<article class="sc sc-interface" data-slug="${p.slug}">
      ${scHead(p)}
      <div class="stage">${demoHTML(s.demo)}</div>
      ${scFoot(p)}
    </article>`;
  }
  let showcaseCleanups = [];
  function renderShowcases() {
    showcaseCleanups.forEach(fn => fn && fn());
    const box = $('#showcases');
    box.innerHTML = featured.map(showcaseHTML).join('');
    showcaseCleanups = mountAll(box);
    if (!motionOK) $$('.rack', box).forEach(r => r.classList.add('ready'));
  }

  /* ------------------------------------------------------------------
     Library
     ------------------------------------------------------------------ */
  let activeFilter = 'all';
  const arrowSVG = '<svg class="lib-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  function renderLibrary() {
    const counts = { all: projects.length };
    projects.forEach(p => (p.categories || []).forEach(c => { counts[c] = (counts[c] || 0) + 1; }));
    $('#filters').innerHTML = [{ id: 'all', label: t().all }, ...DATA.categories.filter(c => counts[c.id]).map(c => ({ id: c.id, label: L(c) }))]
      .map(f => `<button type="button" data-filter="${f.id}" aria-pressed="${f.id === activeFilter}">${esc(f.label)}<sup>${counts[f.id]}</sup></button>`).join('');
    $('#library').innerHTML = ordered.map(p => `
      <li class="lib-item" data-cats="${(p.categories || []).join(' ')}" data-slug="${p.slug}">
        <a class="lib-link" href="#/work/${p.slug}" data-cover="${esc((p.cover && p.cover.src) || '')}">
          <span class="lib-thumb">${coverHTML(p)}</span>
          <span class="lib-year">${esc(p.year || '—')}</span>
          <span class="lib-title">${esc(L(p.title))}${p.featured > 0 ? `<span class="lib-feat">${t().featured}</span>` : ''}</span>
          <span class="lib-client">${esc(L(p.client))}</span>
          <span class="lib-cats">${esc(catList(p))}</span>
          ${arrowSVG}
        </a>
      </li>`).join('');
    applyFilter(activeFilter, false);
  }
  function applyFilter(f, animate = true) {
    activeFilter = f;
    const items = $$('.lib-item');
    const state = animate && hasFlip ? Flip.getState(items) : null;
    $$('#filters button').forEach(b => b.setAttribute('aria-pressed', b.dataset.filter === f ? 'true' : 'false'));
    items.forEach(li => { li.hidden = !(f === 'all' || li.dataset.cats.split(' ').includes(f)); });
    if (state) Flip.from(state, { duration: 0.6, ease: 'power3.inOut', absolute: true, onEnter: els => gsap.fromTo(els, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }), onLeave: els => gsap.to(els, { opacity: 0, duration: 0.25 }) });
  }
  $('#filters').addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (b) applyFilter(b.dataset.filter); });
  $$('.views button').forEach(b => b.addEventListener('click', () => {
    const lib = $('#library');
    const state = hasFlip ? Flip.getState($$('.lib-item:not([hidden]), .lib-item:not([hidden]) .lib-thumb, .lib-item:not([hidden]) .lib-title')) : null;
    lib.dataset.view = b.dataset.view;
    $$('.views button').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    store.set('libView', b.dataset.view);
    if (state) Flip.from(state, { duration: 0.7, ease: 'power3.inOut', nested: true, scale: false });
    if (hasGSAP) ScrollTrigger.refresh();
  }));

  /* ------------------------------------------------------------------
     Blocks (project pages)
     ------------------------------------------------------------------ */
  const GRID_BANDS = '<i style="--t:0%;--h:10%"></i><i style="--t:10.5%;--h:19%"></i><i style="--t:31%;--h:28%"></i><i style="--t:60%;--h:7%"></i><i style="--t:68%;--h:24%"></i><i style="--t:93%;--h:7%"></i>';
  function galleryItem(it, group, withGrid) {
    if (it.type === 'video') {
      return `<div class="gal-item is-video"><video src="${esc(it.src)}" poster="${esc(it.poster || '')}" muted loop playsinline preload="none" data-autoplay aria-label="${esc(L(it.alt))}"></video></div>`;
    }
    const btn = `<button class="gal-item" type="button" data-view-src="${esc(it.src)}" data-view-group="${group}" data-view-caption="${esc(L(it.caption || it.alt))}">${img(it.src, it.alt)}${withGrid ? `<span class="gal-gridlines" aria-hidden="true">${GRID_BANDS}</span>` : ''}</button>`;
    // Items with their own caption show it under the image (used for document pages).
    return it.caption ? `<figure class="gal-fig">${btn}<figcaption>${esc(L(it.caption))}</figcaption></figure>` : btn;
  }
  function blockHTML(b, p, i) {
    const cap = b.caption ? `<p class="block-cap">${esc(L(b.caption))}</p>` : '';
    const group = `${p.slug}-${i}`;
    switch (b.type) {
      case 'text':
        return `<section class="block block-text"><h3>${esc(L(b.title))}</h3><p>${esc(L(b.body))}</p></section>`;
      case 'list':
        return `<section class="block block-list"><h3>${esc(L(b.title))}</h3><ul>${b.items.map(x => `<li><span>${esc(L(x))}</span></li>`).join('')}</ul></section>`;
      case 'gallery': {
        const layout = b.layout || 'row';
        if (layout === 'rack') {
          const n = b.items.length;
          return `<section class="block"><div class="gal gal-rack">${b.items.map((it, k) => galleryItem(it, group).replace('class="gal-item"', `class="gal-item" style="--r:${n > 1 ? (-8 + (16 * k) / (n - 1)).toFixed(1) : 0}deg"`)).join('')}</div>${cap}</section>`;
        }
        const toggle = b.grid ? `<label class="grid-toggle"><input type="checkbox" data-grid-toggle><span>${t().showGrid}</span></label>` : '';
        return `<section class="block block-gallery"><div class="gal gal-${layout}" style="--n:${Math.min(b.items.length, 4)}">${b.items.map(it => galleryItem(it, group, b.grid)).join('')}</div>${cap}${toggle}</section>`;
      }
      case 'zoom':
        return `<section class="block"><div class="zoom" data-zoom>${img(b.src, b.alt)}</div>${cap}</section>`;
      case 'video':
        return `<section class="block block-video"><video src="${esc(b.src)}" poster="${esc(b.poster || '')}" controls playsinline preload="none"></video>${cap}</section>`;
      case 'logo':
        return `<section class="block block-logo"><div class="logo-stage" data-logo="${esc(b.src)}" style="--cbg:${(p.cover && p.cover.bg) || '#F1F6F7'}">${img(p.cover.src, p.cover.alt)}</div>${cap}</section>`;
      case 'palette':
        return `<section class="block"><div class="palette" style="--n:${b.colors.length}">${b.colors.map(c => `<span style="--sw:${c};--tx:${textOn(c)}">${c}</span>`).join('')}</div>${cap}</section>`;
      case 'demo':
        return `<section class="block">${demoHTML(b.name)}</section>`;
      case 'note':
        return `<section class="block block-note"><p>${esc(L(b.body))}</p></section>`;
      default:
        return '';
    }
  }
  function textOn(hex) {
    const n = parseInt(hex.slice(1), 16);
    const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
    return lum > 0.6 ? '#141414' : '#FFFFFF';
  }

  /* ------------------------------------------------------------------
     Project page (route: #/work/<slug>)
     ------------------------------------------------------------------ */
  const pv = $('#projectView');
  const pvBody = $('#pvBody');
  let pvSlug = null, pvCleanups = [], pvTrigger = null;
  function projectHTML(p) {
    const meta = [
      [t().client, esc(L(p.client))], [t().role, esc(L(p.role))], [t().year, esc(p.year || '')],
      [t().tools, esc((p.tools || []).join(', '))],
      [t().results, (p.outcomes || []).map(o => esc(L(o))).join('<br>')],
    ].filter(([, v]) => v).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('');
    const c = p.cover || {};
    const cover = `<figure class="pv-cover${c.fit === 'contain' ? ' fit-contain' : ''}" style="--cbg:${c.bg || ''}">${coverHTML(p, false)}</figure>`;
    const idx = ordered.indexOf(p);
    const next = ordered[(idx + 1) % ordered.length];
    return `
      <div class="pv-hero tone-dark">
        <header class="pv-head">
          <div>
            <p class="pv-kicker">${esc(catList(p))}</p>
            <h2 class="pv-title" id="pvTitle">${esc(L(p.title))}</h2>
            <p class="pv-summary">${esc(L(p.summary))}</p>
          </div>
          <dl class="pv-meta">${meta}</dl>
        </header>
      </div>
      <div class="pv-wrap">
        ${cover}
        <div class="pv-blocks">${(p.blocks || []).map((b, i) => blockHTML(b, p, i)).join('')}</div>
        <a class="pv-next" href="#/work/${next.slug}"><span>${t().next}</span><b>${esc(L(next.title))}</b></a>
      </div>`;
  }
  function renderProject(p) {
    pvCleanups.forEach(fn => fn && fn());
    pvBody.innerHTML = projectHTML(p);
    $('#pvCrumb').textContent = `${t().work} / ${L(p.title)}`;
    pvCleanups = mountAll(pvBody);
    if (motionOK) {
      $$('.gal-item img, .zoom img, .pv-cover img', pvBody).forEach(im => {
        gsap.fromTo(im.parentElement, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath',
          scrollTrigger: { trigger: im.parentElement, scroller: pv, start: 'top 92%', once: true } });
      });
    }
  }
  async function openProject(slug, fromEl) {
    const p = bySlug[slug];
    if (!p) return;
    const wasOpen = !pv.hidden;
    pvSlug = slug;
    renderProject(p);
    pv.hidden = false;
    pv.scrollTop = 0;
    root.style.overflow = 'hidden';
    $('.pv-close').focus({ preventScroll: true });
    if (motionOK && !wasOpen) {
      const cover = $('.pv-cover', pvBody);
      // Grow from the clicked image when there is one (text links simply fade in).
      const src = fromEl && fromEl.querySelector && fromEl.querySelector('img');
      gsap.fromTo(pv, { opacity: 0 }, { opacity: 1, duration: 0.35 });
      if (src && src.getBoundingClientRect && src.getBoundingClientRect().width) {
        const a = src.getBoundingClientRect(), b = cover.getBoundingClientRect();
        gsap.from(cover, { x: a.left - b.left, y: a.top - b.top, scaleX: a.width / b.width, scaleY: a.height / b.height, transformOrigin: '0 0', duration: 0.9, ease: 'expo.out', clearProps: 'transform' });
      }
      gsap.from('.pv-head > *', { y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out', delay: 0.1 });
      gsap.fromTo('.pv-title', { fontStretch: '78%' }, { fontStretch: '104%', duration: 1.2, ease: 'expo.out', clearProps: 'fontStretch' });
    }
    if (hasGSAP) requestAnimationFrame(() => ScrollTrigger.refresh());
  }
  async function closeProject() {
    if (pv.hidden) return;
    if (motionOK) { await gsap.to(pv, { opacity: 0, duration: 0.3 }); gsap.set(pv, { clearProps: 'opacity' }); }
    pvCleanups.forEach(fn => fn && fn());
    pvCleanups = [];
    pv.hidden = true;
    pvBody.innerHTML = '';
    pvSlug = null;
    root.style.overflow = '';
    if (pvTrigger) pvTrigger.focus({ preventScroll: true });
    if (hasGSAP) ScrollTrigger.getAll().forEach(st => { if (st.scroller === pv) st.kill(); });
  }
  function route(fromEl) {
    const m = location.hash.match(/^#\/work\/([\w-]+)/);
    if (m) openProject(m[1], fromEl);
    else closeProject();
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#/work/"]');
    if (!a) return;
    e.preventDefault();
    pvTrigger = a;
    const slug = a.getAttribute('href').slice(7);
    if (pv.hidden) history.pushState(null, '', '#/work/' + slug);
    else history.replaceState(null, '', '#/work/' + slug);
    openProject(slug, a);
  });
  addEventListener('popstate', () => route());
  // Close always closes; the browser's Back button also closes because opening pushed an entry.
  $('.pv-close').addEventListener('click', () => {
    history.replaceState(null, '', location.pathname + location.search);
    closeProject();
  });
  document.addEventListener('keydown', e => {
    if (pv.hidden || !$('#viewer').hidden) return;
    if (e.key === 'Escape') { $('.pv-close').click(); return; }
    if (e.key !== 'Tab') return;
    // Keep keyboard focus inside the open project page.
    const f = $$('a[href], button:not([disabled]), input, video[controls], [tabindex]:not([tabindex="-1"])', pv).filter(el => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (!pv.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ------------------------------------------------------------------
     Interactive pieces mounted inside rendered HTML
     ------------------------------------------------------------------ */
  function mountAll(scope) {
    const cleanups = [];
    $$('[data-demo]', scope).forEach(el => { const d = DEMOS[el.dataset.demo]; if (d) cleanups.push(d.mount(el)); });
    $$('[data-logo]', scope).forEach(el => cleanups.push(mountLogo(el)));
    $$('[data-zoom]', scope).forEach(el => mountZoom(el));
    $$('[data-grid-toggle]', scope).forEach(inp => inp.addEventListener('change', () => inp.closest('.block').classList.toggle('show-grid', inp.checked)));
    $$('video[data-autoplay]', scope).forEach(v => cleanups.push(autoplay(v)));
    return cleanups;
  }
  function autoplay(v) {
    if (mqReduce.matches) { v.preload = 'metadata'; v.controls = true; return null; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }
  function mountZoom(el) {
    const set = e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--zx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      el.style.setProperty('--zy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    };
    el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { set(e); el.classList.add('on'); } });
    el.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') set(e); });
    el.addEventListener('pointerleave', () => el.classList.remove('on'));
    el.addEventListener('click', e => { if (e.pointerType !== 'mouse') openViewerFor($('img', el), [$('img', el).getAttribute('src')]); });
  }
  // Logo: inline the SVG (unique ids per copy), then wipe the symbol in and set the lettering glyph by glyph.
  let logoSeq = 0;
  const svgCache = {};
  function mountLogo(el) {
    const src = el.dataset.logo;
    let alive = true;
    (svgCache[src] ||= fetch(src).then(r => (r.ok ? r.text() : Promise.reject())).catch(() => null)).then(text => {
      if (!alive || !text) return;
      const pre = `lg${++logoSeq}_`;
      const svg = text.replace(/\bid="([^"]+)"/g, `id="${pre}$1"`).replace(/url\(#([^)]+)\)/g, `url(#${pre}$1)`).replace(/href="#([^"]+)"/g, `href="#${pre}$1"`);
      el.innerHTML = svg.replace('<svg ', '<svg role="img" aria-label="Logo" ');
      if (!motionOK) return;
      ScrollTrigger.refresh();
      const node = $('svg', el);
      const glyphs = $$('use', node);
      const shapes = $$('image, path:not(clipPath path)', node).filter(s => !s.closest('clipPath'));
      const st = { trigger: el, start: 'top 80%', once: true };
      gsap.set(glyphs, { opacity: 0 });
      gsap.timeline({ scrollTrigger: st })
        .fromTo(node, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power3.inOut' })
        .fromTo(shapes, { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.02 }, 0)
        .to(glyphs, { opacity: 1, duration: 0.25, stagger: { each: 0.025, from: 'end' } }, 0.6);
    });
    return () => { alive = false; };
  }

  /* ------------------------------------------------------------------
     Demos
     ------------------------------------------------------------------ */
  function demoHTML(name) { return DEMOS[name] ? `<div class="demo" data-demo="${name}">${DEMOS[name].html()}</div>` : ''; }

  // Shared flow diagram engine: nodes, dashed wires, a travelling packet.
  function makeFlow(el, wiresSpec) {
    const svg = $('.flow-wires', el), packet = $('.flow-packet', el), tag = $('.flow-tag', el);
    const node = name => $(`[data-node="${name}"]`, el);
    const center = name => {
      const r = node(name).getBoundingClientRect(), b = el.getBoundingClientRect();
      return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 };
    };
    const wire = () => { if (!el.isConnected) return; svg.innerHTML = wiresSpec.map(([a, b]) => { const p = center(a), q = center(b); return `<path d="M${p.x.toFixed(1)} ${p.y.toFixed(1)}L${q.x.toFixed(1)} ${q.y.toFixed(1)}"/>`; }).join(''); };
    const place = (name, d) => {
      const c = center(name);
      packet.style.transition = d ? `transform ${d}s cubic-bezier(.65,0,.35,1), opacity .2s` : 'opacity .2s';
      packet.style.transform = `translate(${c.x}px, ${c.y}px)`;
      return wait(d * 1000 + 30);
    };
    const showTag = (name, text) => { if (!tag) return; const c = center(name); tag.textContent = text; tag.style.transform = `translate(calc(${c.x}px - 50%), calc(${c.y}px - 220%))`; tag.style.opacity = 1; };
    const reset = () => { $$('.flow-node', el).forEach(n => n.classList.remove('is-hot', 'is-ok', 'is-denied')); if (tag) tag.style.opacity = 0; };
    const ro = new ResizeObserver(wire);
    ro.observe(el);
    return { el, wire, place, node, reset, packet, showTag, stop: () => ro.disconnect() };
  }
  // Loop a packet along a path while the diagram is visible.
  function loopFlow(f, path, labels, statusEl) {
    let on = false, running = false, alive = true;
    const run = async () => {
      if (running) return;
      running = true;
      await f.place(path[0], 0);
      f.packet.style.opacity = 1;
      while (on && alive) {
        for (let i = 1; i < path.length && on && alive; i++) {
          $$('.flow-node', f.el).forEach(n => n.classList.remove('is-hot'));
          await f.place(path[i], 0.7);
          f.node(path[i]).classList.add('is-hot');
          statusEl.textContent = labels()[i - 1] || '';
          await wait(750);
        }
        await wait(600);
      }
      f.packet.style.opacity = 0;
      $$('.flow-node', f.el).forEach(n => n.classList.remove('is-hot'));
      running = false;
    };
    if (!motionOK) { statusEl.textContent = ''; return () => f.stop(); }
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) run(); }, { threshold: 0.4 });
    io.observe(f.el);
    return () => { alive = false; on = false; io.disconnect(); f.stop(); };
  }

  const PM_MODULES = [
    { id: 'tasks', en: 'Tasks', ar: 'المهام', d: { en: 'Add tasks, link them to a course or daily work, set priority and follow up status.', ar: 'إضافة المهام وربطها بدورة أو بعمل يومي، وتحديد الأولوية ومتابعة الحالة.' }, tools: { en: ['Add task', 'Assign', 'Update status'], ar: ['إضافة مهمة', 'إسناد', 'تحديث الحالة'] }, def: 'edit' },
    { id: 'courses', en: 'Courses & products', ar: 'الدورات والمنتجات', d: { en: 'Training courses with recurring runs and accreditation.', ar: 'الدورات التدريبية بنسخ تنفيذ متكررة واعتمادات.' }, tools: { en: ['Add course', 'Schedule runs'], ar: ['إضافة دورة', 'جدولة النسخ'] }, def: 'edit' },
    { id: 'library', en: 'Content library', ar: 'مكتبة المحتوى', d: { en: 'Course files and attachments, stored per program.', ar: 'ملفات الدورات ومرفقاتها محفوظة لكل برنامج.' }, tools: { en: ['Upload file'], ar: ['رفع ملف'] }, def: 'view' },
    { id: 'marketing', en: 'Marketing', ar: 'التسويق', d: { en: 'Events, visits, leads, registrations and revenue.', ar: 'الفعاليات والزيارات والعملاء المحتملون والتسجيلات والعائد.' }, tools: { en: ['Add visit', 'Add lead'], ar: ['إضافة زيارة', 'إضافة عميل'] }, def: 'view' },
    { id: 'relations', en: 'Relations', ar: 'العلاقات', d: { en: 'Speakers, marketers and partners linked to courses.', ar: 'المتحدثون والمسوقون والشركاء المرتبطون بالدورات.' }, tools: { en: ['Add speaker'], ar: ['إضافة متحدث'] }, def: 'view' },
    { id: 'finance', en: 'Finance', ar: 'الحسابات والمالية', d: { en: 'Revenue, costs and margin per course, with finer permissions inside the page.', ar: 'الإيرادات والتكاليف والهامش لكل دورة، مع صلاحيات أدق داخل الصفحة.' }, tools: { en: ['Add entry'], ar: ['إضافة قيد'] }, def: 'hidden' },
    { id: 'hr', en: 'HR', ar: 'الموارد البشرية', d: { en: 'Leave, attendance, requests, contracts and payroll.', ar: 'الإجازات والحضور والطلبات والعقود والرواتب.' }, tools: { en: ['Review request'], ar: ['مراجعة طلب'] }, def: 'hidden' },
    { id: 'users', en: 'Users & permissions', ar: 'المستخدمون والصلاحيات', d: { en: 'Accounts, roles and the permission control centre.', ar: 'الحسابات والأدوار ومركز التحكم بالصلاحيات.' }, tools: { en: ['Add user', 'Set permissions'], ar: ['إضافة مستخدم', 'ضبط الصلاحيات'] }, def: 'hidden' },
  ];

  const DEMOS = {
    'permission-model': {
      html() {
        const s = t().pm;
        const rows = PM_MODULES.map(m => `<div class="pm-row" data-mod="${m.id}"><b>${esc(L(m))}</b><span class="pm-seg" role="radiogroup" aria-label="${esc(L(m))}">${['hidden', 'view', 'edit'].map(l => `<button type="button" role="radio" data-level="${l}" aria-checked="${m.def === l}">${s.levels[l]}</button>`).join('')}</span></div>`).join('');
        return `<h4>${s.title}</h4><p class="demo-sub">${s.sub}</p>
          <div class="pm">
            <div class="pm-table" role="group" aria-label="${esc(s.account)}">${rows}</div>
            <div>
              <div class="pm-app" aria-live="polite">
                <div class="pm-side"><span class="pm-side-title">${s.sees}</span><div class="pm-navs"></div></div>
                <div class="pm-main"></div>
              </div>
              <p class="pm-log"></p>
            </div>
          </div>`;
      },
      mount(el) {
        const levels = Object.fromEntries(PM_MODULES.map(m => [m.id, m.def]));
        let current = 'home';
        const navs = $('.pm-navs', el), main = $('.pm-main', el), log = $('.pm-log', el);
        const s = () => t().pm;
        function renderMain() {
          if (current === 'home' || levels[current] === 'hidden') current = 'home';
          const vis = PM_MODULES.filter(m => levels[m.id] !== 'hidden');
          if (current === 'home') {
            main.innerHTML = `<h5>${s().homeTitle}</h5><p>${s().homeDesc}</p>${vis.length ? `<div class="pm-tools">${vis.map(m => `<span class="on">${esc(L(m))}</span>`).join('')}</div>` : `<p class="pm-empty">${s().none}</p>`}`;
          } else {
            const m = PM_MODULES.find(x => x.id === current);
            const edit = levels[m.id] === 'edit';
            main.innerHTML = `<h5>${esc(L(m))}</h5><span class="pm-badge ${edit ? 'edit' : 'view'}">${edit ? s().canEdit : s().viewOnly}</span><p>${esc(L(m.d))}</p><div class="pm-lines" aria-hidden="true"><i></i><i></i><i></i></div><div class="pm-tools">${L(m.tools).map(x => `<span class="${edit ? 'on' : 'off'}">${esc(x)}</span>`).join('')}</div>`;
          }
          const skipped = PM_MODULES.filter(m => levels[m.id] === 'hidden').map(m => L(m));
          log.textContent = s().loads(vis.length) + (skipped.length ? s().skipped(skipped.join(', ')) : '');
          if (motionOK) gsap.fromTo(main.children, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.04 });
        }
        function renderNav(animate) {
          const state = animate && hasFlip ? Flip.getState($$('.pm-nav', navs)) : null;
          const vis = PM_MODULES.filter(m => levels[m.id] !== 'hidden');
          navs.innerHTML = [`<button class="pm-nav${current === 'home' ? ' is-on' : ''}" type="button" data-go="home" data-flip-id="home">${s().homeTitle}</button>`,
            ...vis.map(m => `<button class="pm-nav${current === m.id ? ' is-on' : ''}" type="button" data-go="${m.id}" data-flip-id="${m.id}">${esc(L(m))}<small>${levels[m.id] === 'edit' ? s().levels.edit : s().levels.view}</small></button>`)].join('');
          if (state) Flip.from(state, { duration: 0.5, ease: 'power3.inOut', onEnter: e => gsap.fromTo(e, { opacity: 0, x: -10 * dir() }, { opacity: 1, x: 0, duration: 0.4 }), onLeave: e => gsap.to(e, { opacity: 0, duration: 0.2 }) });
        }
        el.addEventListener('click', e => {
          const lv = e.target.closest('[data-level]');
          if (lv) {
            const row = lv.closest('[data-mod]');
            levels[row.dataset.mod] = lv.dataset.level;
            $$('[data-level]', row).forEach(b => b.setAttribute('aria-checked', b === lv ? 'true' : 'false'));
            if (lv.dataset.level !== 'hidden') current = row.dataset.mod;
            renderNav(true);
            renderMain();
            return;
          }
          const go = e.target.closest('[data-go]');
          if (go) { current = go.dataset.go; renderNav(false); renderMain(); }
        });
        renderNav(false);
        renderMain();
        return null;
      },
    },

    'request-flow': {
      html() {
        const s = t().rf;
        const names = ['browser', 'app', 'auth', 'perm', 'db'];
        const mono = ['HTTPS', 'route', 'session', 'role', 'SQLite'];
        return `<h4>${s.title}</h4><p class="demo-sub">${s.sub}</p>
          <div class="flow-actions"><button class="chip-btn" type="button" data-sim="allow">${s.allow}</button><button class="chip-btn" type="button" data-sim="deny">${s.deny}</button></div>
          <div class="flow flow-line" style="--n:5"><svg class="flow-wires" aria-hidden="true"></svg>
            <ol class="flow-nodes">${names.map((n, i) => `<li class="flow-node" data-node="${n}"><b>${s.nodes[i]}</b><span class="mono">${mono[i]}</span></li>`).join('')}</ol>
            <span class="flow-packet" aria-hidden="true"></span><span class="flow-tag" aria-hidden="true"></span></div>
          <p class="flow-status" aria-live="polite">${s.idle}</p>`;
      },
      mount(el) {
        const f = makeFlow($('.flow', el), [['browser', 'app'], ['app', 'auth'], ['auth', 'perm'], ['perm', 'db']]);
        const status = $('.flow-status', el);
        let busy = false;
        el.addEventListener('click', async e => {
          const b = e.target.closest('[data-sim]');
          if (!b || busy) return;
          busy = true;
          $$('[data-sim]', el).forEach(x => { x.disabled = true; });
          const S = () => t().rf, d = motionOK ? 0.55 : 0, hold = motionOK ? 520 : 0;
          const say = s => { status.textContent = s; };
          f.reset();
          await f.place('browser', 0);
          f.packet.style.opacity = 1;
          const visit = async (n, txt, cls = 'is-hot') => { await f.place(n, d); f.node(n).classList.add(cls); say(txt); await wait(hold); };
          await visit('browser', S().browser);
          await visit('app', S().app);
          await visit('auth', S().auth, 'is-ok');
          if (b.dataset.sim === 'allow') {
            await visit('perm', S().permOk, 'is-ok');
            await visit('db', S().db);
            await f.place('browser', d * 1.6);
            f.showTag('browser', '200 OK');
            say(S().done200);
          } else {
            await f.place('perm', d);
            f.node('perm').classList.add('is-denied');
            f.showTag('perm', '403');
            say(S().permNo);
            await wait(hold * 1.6);
            await f.place('browser', d * 1.4);
            f.showTag('browser', '403 Forbidden');
            say(S().done403);
          }
          await wait(motionOK ? 900 : 0);
          f.packet.style.opacity = 0;
          $$('[data-sim]', el).forEach(x => { x.disabled = false; });
          busy = false;
        });
        return () => f.stop();
      },
    },

    'scan-steps': {
      shots: ['01-configure', '02-scanning', '03-results', '04-findings', '05-dashboard', '06-report', '07-history', '08-compare', '09-schedule'],
      routes: ['/index', '/scan-progress', '/result-view', '/result-view#findings', '/result-view#dashboard', '/report-pdf-html', '/history', '/compare', '/auto-scan'],
      html() {
        const s = t().ss, D = DEMOS['scan-steps'];
        return `<h4>${s.title}</h4><p class="demo-sub">${s.sub}</p>
          <div class="steps">
            <div class="steps-list" role="tablist">${s.steps.map(([h, p], i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-step="${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><b>${h}</b><p>${p}</p></button>`).join('')}</div>
            <div>
              <div class="browser" aria-hidden="true">
                <div class="browser-bar"><i></i><i></i><i></i><span class="browser-url">autopent<b>/index</b></span><span class="browser-count">1 / 9</span></div>
                <div class="browser-view">${D.shots.map((n, i) => img(`assets/projects/autopent/${n}.webp`, s.steps[i][0], { lazy: i > 0, cls: i === 0 ? 'is-on' : '' })).join('')}<span class="scanline"></span></div>
              </div>
              <div class="steps-nav"><button type="button" data-move="-1" aria-label="${s.prev}"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button><button type="button" data-move="1" aria-label="${s.next}"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button></div>
            </div>
          </div>`;
      },
      mount(el) {
        const D = DEMOS['scan-steps'];
        const tabs = $$('[data-step]', el), shots = $$('.browser-view img', el), line = $('.scanline', el);
        let idx = 0, timer = null, userTook = false, visible = false;
        function show(i, back) {
          if (i === idx) return;
          const prev = shots[idx];
          idx = (i + shots.length) % shots.length;
          tabs.forEach((b, k) => b.setAttribute('aria-selected', k === idx ? 'true' : 'false'));
          $('.browser-url b', el).textContent = D.routes[idx];
          $('.browser-count', el).textContent = `${idx + 1} / ${shots.length}`;
          const im = shots[idx];
          shots.forEach(s => s.classList.toggle('is-on', s === im || s === prev));
          prev.style.zIndex = 1; im.style.zIndex = 2;
          if (!motionOK) { shots.forEach(s => s.classList.toggle('is-on', s === im)); return; }
          const h = im.parentElement.offsetHeight;
          gsap.killTweensOf([im, line]);
          gsap.fromTo(im, { clipPath: back ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 0.8, ease: 'power3.inOut', onComplete: () => { if (shots[idx] !== prev) prev.classList.remove('is-on'); gsap.set(im, { clearProps: 'clipPath' }); } });
          gsap.fromTo(line, { y: back ? h : 0, opacity: 1 }, { y: back ? 0 : h, duration: 0.8, ease: 'power3.inOut' });
          gsap.to(line, { opacity: 0, duration: 0.2, delay: 0.75 });
        }
        const tick = () => { if (!userTook && visible) show(idx + 1); };
        const takeOver = () => { userTook = true; clearInterval(timer); };
        el.addEventListener('click', e => {
          const s = e.target.closest('[data-step]'), m = e.target.closest('[data-move]');
          if (s) { takeOver(); show(+s.dataset.step, +s.dataset.step < idx); }
          if (m) { takeOver(); const dlt = +m.dataset.move; show(idx + dlt, dlt < 0); }
        });
        el.addEventListener('keydown', e => {
          if (!e.target.closest('[data-step]') || !['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
          e.preventDefault(); takeOver();
          const dlt = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1;
          show(idx + dlt, dlt < 0);
          tabs[idx].focus();
        });
        let io = null;
        if (motionOK) {
          io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.5 });
          io.observe(el);
          timer = setInterval(tick, 3600);
        }
        return () => { clearInterval(timer); io && io.disconnect(); };
      },
    },

    'scan-profiles': {
      html() {
        const s = t().sp;
        const inProfiles = ['safe fast full', 'safe fast full', 'safe fast full', 'safe fast full', 'fast full', 'fast full', 'full'];
        return `<h4>${s.title}</h4>
          <div class="seg" role="radiogroup" aria-label="${s.title}"><span class="seg-thumb"></span>${['safe', 'fast', 'full'].map(p => `<button type="button" role="radio" aria-checked="${p === 'safe'}" data-profile="${p}">${s.profiles[p]}</button>`).join('')}</div>
          <ul class="checks">${s.checks.map((c, i) => `<li data-in="${inProfiles[i]}">${c}</li>`).join('')}</ul>
          <p class="demo-note"></p>`;
      },
      mount(el) {
        const seg = $('.seg', el), thumb = $('.seg-thumb', el);
        let cur = 'safe';
        const place = () => { const b = $('[aria-checked="true"]', seg); thumb.style.left = b.offsetLeft + 'px'; thumb.style.width = b.offsetWidth + 'px'; };
        function set(p, animate = true) {
          cur = p;
          $$('[data-profile]', seg).forEach(b => b.setAttribute('aria-checked', b.dataset.profile === p ? 'true' : 'false'));
          place();
          $$('.checks li', el).forEach(li => {
            const on = li.dataset.in.split(' ').includes(p), was = !li.classList.contains('off');
            li.classList.toggle('off', !on);
            if (animate && on && !was) { li.classList.remove('flash'); void li.offsetWidth; li.classList.add('flash'); }
          });
          $('.demo-note', el).textContent = `${t().sp.notes[p]} ${t().sp.safeMode}`;
        }
        seg.addEventListener('click', e => { const b = e.target.closest('[data-profile]'); if (b) set(b.dataset.profile); });
        seg.addEventListener('keydown', e => {
          if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
          const order = ['safe', 'fast', 'full'];
          const n = order[(order.indexOf(cur) + (e.key === 'ArrowRight' ? 1 : -1) * dir() + 3) % 3];
          set(n); $(`[data-profile="${n}"]`, seg).focus();
        });
        const ro = new ResizeObserver(place);
        ro.observe(seg);
        set('safe', false);
        return () => ro.disconnect();
      },
    },

    'architecture': {
      html() {
        const s = t().ar;
        return `<h4>${s.title}</h4><p class="demo-sub">${s.sub}</p>
          <div class="flow flow-arch"><svg class="flow-wires" aria-hidden="true"></svg>
            <ol class="flow-nodes">${['user', 'ui', 'api', 'engine', 'db'].map(n => `<li class="flow-node" data-node="${n}"><b>${s.nodes[n]}</b></li>`).join('')}</ol>
            <span class="flow-packet" aria-hidden="true"></span></div>
          <p class="arch-status" aria-hidden="true"></p>`;
      },
      mount(el) {
        const f = makeFlow($('.flow', el), [['user', 'ui'], ['ui', 'api'], ['api', 'engine'], ['api', 'db']]);
        return loopFlow(f, ['user', 'ui', 'api', 'engine', 'api', 'db', 'api', 'ui', 'user'], () => t().ar.steps, $('.arch-status', el));
      },
    },

    'hosting-flow': {
      html() {
        const s = t().hf;
        return `<h4>${s.title}</h4><p class="demo-sub">${s.sub}</p>
          <div class="flow flow-line" style="--n:4"><svg class="flow-wires" aria-hidden="true"></svg>
            <ol class="flow-nodes">${['visitor', 'cdn', 'nginx', 'app'].map((n, i) => `<li class="flow-node" data-node="${n}"><b>${s.nodes[i]}</b></li>`).join('')}</ol>
            <span class="flow-packet" aria-hidden="true"></span></div>
          <p class="arch-status" aria-hidden="true"></p>`;
      },
      mount(el) {
        const f = makeFlow($('.flow', el), [['visitor', 'cdn'], ['cdn', 'nginx'], ['nginx', 'app']]);
        return loopFlow(f, ['visitor', 'visitor', 'cdn', 'nginx', 'app', 'visitor'], () => t().hf.steps, $('.arch-status', el));
      },
    },
  };

  /* ------------------------------------------------------------------
     Viewer (lightbox) with a FLIP transition from the clicked image
     ------------------------------------------------------------------ */
  const viewer = $('#viewer'), vImg = $('.viewer-frame img', viewer), vCap = $('.viewer-cap', viewer), vCount = $('.viewer-count', viewer);
  let vGroup = [], vIdx = 0, vOpener = null;
  async function vRender() {
    const item = vGroup[vIdx];
    vImg.src = item.dataset.viewSrc;
    vImg.alt = item.dataset.viewCaption || '';
    try { await vImg.decode(); } catch { /* shows when loaded */ }
    vCap.textContent = item.dataset.viewCaption || '';
    vCount.textContent = vGroup.length > 1 ? `${vIdx + 1} / ${vGroup.length}` : '';
    $('.viewer-prev').hidden = $('.viewer-next').hidden = vGroup.length < 2;
  }
  async function vOpen(el) {
    vOpener = el;
    const scope = el.closest('#projectView') || document;
    vGroup = $$(`[data-view-group="${el.dataset.viewGroup}"]`, scope);
    vIdx = Math.max(0, vGroup.indexOf(el));
    viewer.hidden = false;
    root.style.overflow = 'hidden';
    await vRender();
    $('.viewer-close').focus();
    if (motionOK) {
      gsap.fromTo('.viewer-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.45 });
      const from = $('img', el) || el;
      const a = from.getBoundingClientRect(), b = vImg.getBoundingClientRect();
      if (a.width && b.width) gsap.from(vImg, { x: a.left - b.left, y: a.top - b.top, scaleX: a.width / b.width, scaleY: a.height / b.height, transformOrigin: '0 0', duration: 0.8, ease: 'expo.out', clearProps: 'transform' });
    }
  }
  function openViewerFor(imgEl) {
    const fake = document.createElement('button');
    fake.dataset.viewSrc = imgEl.getAttribute('src');
    fake.dataset.viewCaption = imgEl.alt;
    vOpener = null; vGroup = [fake]; vIdx = 0;
    viewer.hidden = false; root.style.overflow = 'hidden';
    vRender();
  }
  async function vClose() {
    if (motionOK) { await gsap.to(['.viewer-backdrop', vImg], { opacity: 0, duration: 0.3 }); gsap.set(['.viewer-backdrop', vImg], { clearProps: 'all' }); }
    viewer.hidden = true;
    if (pv.hidden) root.style.overflow = '';
    if (vOpener) vOpener.focus({ preventScroll: true });
  }
  async function vStep(d) {
    vIdx = (vIdx + d + vGroup.length) % vGroup.length;
    if (motionOK) { await gsap.to(vImg, { opacity: 0, x: -30 * d * dir(), duration: 0.2 }); await vRender(); gsap.fromTo(vImg, { opacity: 0, x: 30 * d * dir() }, { opacity: 1, x: 0, duration: 0.45, ease: 'expo.out', clearProps: 'all' }); }
    else vRender();
  }
  document.addEventListener('click', e => { const el = e.target.closest('[data-view-src]'); if (el) vOpen(el); });
  $('.viewer-close').addEventListener('click', vClose);
  $('.viewer-backdrop').addEventListener('click', vClose);
  $('.viewer-prev').addEventListener('click', () => vStep(-dir()));
  $('.viewer-next').addEventListener('click', () => vStep(dir()));
  document.addEventListener('keydown', e => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') { e.stopPropagation(); vClose(); }
    else if (e.key === 'ArrowRight') vStep(dir());
    else if (e.key === 'ArrowLeft') vStep(-dir());
    else if (e.key === 'Tab') {
      const f = $$('.viewer-btn:not([hidden])', viewer), i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  }, true);

  /* ------------------------------------------------------------------
     Navigation, progress, tone
     ------------------------------------------------------------------ */
  const nav = $('.nav');
  const navLinks = $$('.nav-links a');
  const navBar = $('.nav-links');
  const navInd = $('.nav-ind');
  // The red pill slides to the section in view; on phones the row scrolls to keep it visible.
  function moveIndicator() {
    const a = navLinks.find(x => x.getAttribute('aria-current') === 'true');
    if (!a) { navInd.style.opacity = 0; return; }
    navInd.style.opacity = 1;
    navInd.style.left = a.offsetLeft + 'px';
    navInd.style.width = a.offsetWidth + 'px';
    if (navBar.scrollWidth > navBar.clientWidth) {
      navBar.scrollTo({ left: a.offsetLeft - (navBar.clientWidth - a.offsetWidth) / 2, behavior: motionOK ? 'smooth' : 'auto' });
    }
  }
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id === 'all-work' ? 'work' : e.target.id;
    navLinks.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'true' : 'false'));
    moveIndicator();
  }), { rootMargin: '-45% 0px -50% 0px' });
  addEventListener('resize', moveIndicator);
  ['top', 'work', 'all-work', 'experience', 'skills', 'about', 'contact'].forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });
  let ticking = false;
  function onScroll() {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    $('.progress').style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
    // The nav switches to its dark treatment over any section marked data-tone="dark".
    const line = nav.offsetHeight / 2;
    root.classList.toggle('nav-dark', $$('[data-tone="dark"]').some(w => { const r = w.getBoundingClientRect(); return r.top <= line && r.bottom > line; }));
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  $('#copyEmail').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('shathaalrshoudi@gmail.com'); $('#copyStatus').textContent = t().copyOk; }
    catch { $('#copyStatus').textContent = t().copyFail; }
  });

  /* ------------------------------------------------------------------
     Motion: scroll- and load-driven animation, rebuilt on language switch
     ------------------------------------------------------------------ */
  let mm = null, introPlayed = false;

  // Split the English name into letters inside a clipping line, so each letter can rise into view.
  // Arabic stays whole (splitting would break letter joining) and rises line by line.
  function splitName() {
    const h1 = $('.hero-name');
    const lines = $$('.hn-line', h1);
    h1.setAttribute('aria-label', h1.textContent.replace(/\s+/g, ' ').trim());
    lines.forEach(line => {
      line.setAttribute('aria-hidden', 'true');
      const text = line.textContent;
      const inner = lang === 'ar' ? `<span class="hn-ch">${esc(text)}</span>` : [...text].map(c => `<span class="hn-ch">${esc(c)}</span>`).join('');
      line.innerHTML = `<span class="hn-clip">${inner}</span>`;
    });
  }

  // The opening: a short ink-and-red curtain (first visit per session), then the hero builds itself.
  function openingSequence() {
    const overlay = $('.intro');
    const withCurtain = !!overlay && root.classList.contains('intro-on') && performance.now() < 3800;
    if (!withCurtain) { if (overlay) overlay.remove(); root.classList.remove('intro-on'); }
    splitName();
    const D = dir();
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    let at = 0.05;
    if (withCurtain) {
      try { sessionStorage.setItem('introSeen', '1'); } catch { /* storage unavailable */ }
      tl.fromTo('.intro-mark', { scale: 0.55, rotate: -12, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 0.8 }, 0)
        .fromTo('.intro-line i', { scaleX: 0 }, { scaleX: 1, duration: 0.95, ease: 'power2.inOut' }, 0.2)
        .fromTo('.intro-name', { opacity: 0, y: 10, letterSpacing: '.3em' }, { opacity: 1, y: 0, letterSpacing: '.04em', duration: 0.9 }, 0.3)
        .to('.intro-core', { opacity: 0, y: -24, duration: 0.45, ease: 'power2.in' }, 1.15)
        .to('.intro-ink', { clipPath: 'inset(0 0 100% 0)', duration: 0.85, ease: 'expo.inOut' }, 1.3)
        .to('.intro-red', { clipPath: 'inset(0 0 100% 0)', duration: 0.85, ease: 'expo.inOut' }, 1.44)
        .add(() => { overlay.remove(); root.classList.remove('intro-on'); onScroll(); }, 2.3);
      at = 1.6;
      // Any interaction fast-forwards the curtain so visitors are never held up.
      const skip = () => { tl.timeScale(6); ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev => removeEventListener(ev, skip)); };
      ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev => addEventListener(ev, skip, { passive: true }));
    }
    tl.from('.nav', { yPercent: -110, duration: 1 }, at)
      .from('.nav-links a, .nav-tools > *', { opacity: 0, y: -10, duration: 0.7, stagger: 0.04 }, at + 0.2)
      .from('.status', { opacity: 0, y: 18, duration: 0.9 }, at + 0.1)
      .fromTo('.hn-ch', { yPercent: 118, rotate: 8 * D }, { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.032, ease: 'expo.out' }, at + 0.15)
      .fromTo('.hero-title', { clipPath: D === 1 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0% 0 0%)', duration: 1, ease: 'power3.inOut', clearProps: 'clipPath' }, at + 0.55)
      .from('.hero-line, .hero-actions > *, .hero-facts > div', { opacity: 0, y: 26, duration: 1, stagger: 0.07 }, at + 0.75)
      .from('.wall', { opacity: 0, scale: 1.08, duration: 1.8, ease: 'expo.out', clearProps: 'scale' }, at + 0.1)
      .from('.wall-item', { opacity: 0, yPercent: 24, duration: 1.3, stagger: 0.07 }, at + 0.3)
      .add(() => moveIndicator(), at + 0.6);
  }

  // The hero stays alive: the red light follows the pointer and the image wall tilts toward it.
  function heroPointer() {
    if (!motionOK || !mqFine.matches) return;
    const hero = $('.hero'), wall = $('#wall');
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      hero.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
      hero.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      wall.style.setProperty('--ty', ((x - 0.5) * 8).toFixed(2) + 'deg');
      wall.style.setProperty('--tx', ((0.5 - y) * 5).toFixed(2) + 'deg');
    });
    hero.addEventListener('pointerleave', () => {
      ['--gx', '--gy'].forEach(v => hero.style.removeProperty(v));
      ['--tx', '--ty'].forEach(v => wall.style.removeProperty(v));
    });
  }

  function buildMotion() {
    if (!motionOK) return;
    mm = gsap.matchMedia();
    mm.add('(min-width: 0px)', () => {
      if (!introPlayed) { introPlayed = true; openingSequence(); }
      // One shared language: showcase titles settle once from condensed; section bars draw in.
      $$('.sc-title').forEach(h => {
        gsap.fromTo(h, { fontStretch: '78%', opacity: 0.2 }, { fontStretch: '104%', opacity: 1, duration: 1.3, ease: 'expo.out', clearProps: 'fontStretch,opacity', scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
      });
      $$('.sh-title').forEach(h => {
        gsap.fromTo(h, { '--bar': 0 }, { '--bar': 1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
      });
      // Technical stages unmask; identity panels open.
      $$('.sc-interface .stage').forEach(s => gsap.fromTo(s, { clipPath: 'inset(0 0 100% 0 round 22px)' }, { clipPath: 'inset(0 0 0% 0 round 22px)', duration: 1.2, ease: 'power3.inOut', clearProps: 'clipPath', scrollTrigger: { trigger: s, start: 'top 85%', once: true } }));
      $$('.sc-wash').forEach(w => {
        gsap.fromTo(w, { clipPath: 'inset(6% 5% 6% 5% round 30px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', ease: 'none', scrollTrigger: { trigger: w, start: 'top 95%', end: 'top 40%', scrub: 0.6 } });
        const rack = $('.rack', w);
        if (rack) {
          rack.classList.remove('ready');
          gsap.fromTo(rack, { '--fan': 0, '--drop': '90px', opacity: 0 }, { '--fan': 1, '--drop': '0px', opacity: 1, duration: 1.5, ease: 'expo.out',
            scrollTrigger: { trigger: rack, start: 'top 88%', once: true }, onComplete: () => rack.classList.add('ready') });
        }
        const hero = $('.id-hero', w);
        if (hero) gsap.fromTo(hero, { yPercent: 8 }, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.from($$('.id-palette i', w), { scaleY: 0, duration: 0.9, stagger: 0.06, ease: 'expo.out', scrollTrigger: { trigger: w, start: 'top 60%', once: true } });
      });
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  /* ------------------------------------------------------------------
     Boot + language switch
     ------------------------------------------------------------------ */
  function renderAll() {
    renderWall();
    renderShowcases();
    renderLibrary();
    if (pvSlug) renderProject(bySlug[pvSlug]);
  }
  $('#langToggle').addEventListener('click', () => {
    if (mm) mm.revert();
    lang = lang === 'ar' ? 'en' : 'ar';
    store.set('lang', lang);
    applyStatic();
    // The name is plain text again after the swap, so it no longer needs its split-letter labels.
    $('.hero-name').removeAttribute('aria-label');
    $$('.hn-line').forEach(l => l.removeAttribute('aria-hidden'));
    renderAll();
    buildMotion();
    onScroll();
    moveIndicator();
  });

  if (store.get('lang') === 'ar') { lang = 'ar'; applyStatic(); }
  const savedView = store.get('libView');
  if (savedView === 'grid' || savedView === 'list') {
    $('#library').dataset.view = savedView;
    $$('.views button').forEach(b => b.setAttribute('aria-pressed', b.dataset.view === savedView ? 'true' : 'false'));
  }
  renderAll();
  buildMotion();
  heroPointer();
  onScroll();
  if (location.hash.startsWith('#/work/')) route();
  if (document.fonts) document.fonts.ready.then(() => { moveIndicator(); if (hasGSAP) ScrollTrigger.refresh(); });
  if (hasGSAP) addEventListener('load', () => ScrollTrigger.refresh());
})();
