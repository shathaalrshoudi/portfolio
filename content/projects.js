/* ==========================================================================
   Portfolio content — every project on the site comes from this file.
   See content/HOW-TO-ADD-A-PROJECT.md for the full guide.

   Quick reference
   - Text fields take { en: '...', ar: '...' }. A plain string is used for both.
   - featured: 0 = library only. 1, 2, 3… = shown in "Selected work" in that order.
   - categories: any of the ids in `categories` below.
   - cover: the image used in the library and at the top of the project page.
     Leave it out to get a typographic cover.
   - media paths are relative to the site root: assets/projects/<slug>/...
   - blocks: the project page, top to bottom. Types:
       text      { title, body }
       list      { title, items: [ {en, ar}, ... ] }
       gallery   { layout: 'row' | 'series' | 'grid' | 'rack' | 'stack' | 'deck', items, caption, grid }
       zoom      { src, alt, caption }               large image you can inspect up close
       video     { src, poster, caption }
       logo      { src, caption }                     SVG mark that draws itself
       palette   { colors: ['#hex', ...], caption }
       demo      { name }                             interactive component (see js/site.js DEMOS)
       note      { body }                             small print
   ========================================================================== */

window.PORTFOLIO = {
  /* The hero image wall: your strongest visuals, in two columns (odd = left, even = right).
     Each links to its project. Keep it to 6–10 images. */
  hero: [
    { src: 'assets/projects/heart-conference/badge-speaker.webp', slug: 'heart-conference' },
    { src: 'assets/projects/autopent/05-dashboard.webp', slug: 'autopent' },
    { src: 'assets/projects/bukayriyah-health-expo/poster.webp', slug: 'bukayriyah-health-expo' },
    { src: 'assets/projects/mission-academy-platform/guide-cover.webp', slug: 'mission-academy-platform' },
    { src: 'assets/projects/autopent/03-results.webp', slug: 'autopent' },
    { src: 'assets/projects/bls-campaign/makkah.webp', slug: 'bls-campaign' },
    { src: 'assets/projects/bukayriyah-health-expo/passport-cover.webp', slug: 'bukayriyah-health-expo' },
    { src: 'assets/projects/heart-conference/badge-photographer.webp', slug: 'heart-conference' },
  ],

  categories: [
    { id: 'software', en: 'Software development', ar: 'تطوير البرمجيات' },
    { id: 'it', en: 'IT & systems', ar: 'تقنية المعلومات والأنظمة' },
    { id: 'security', en: 'Cybersecurity', ar: 'الأمن السيبراني' },
    { id: 'identity', en: 'Visual identity', ar: 'الهوية البصرية' },
    { id: 'ui', en: 'UI/UX design', ar: 'تصميم واجهات المستخدم' },
  ],

  projects: [
    /* ------------------------------------------------------------------ */
    {
      slug: 'mission-academy-platform',
      featured: 1,
      year: '2026',
      title: { en: 'Internal Employee Platform', ar: 'منصة الموظفين الداخلية' },
      client: { en: 'Mission Academy', ar: 'أكاديمية ميشن' },
      categories: ['software', 'it', 'security'],
      role: { en: 'Developed and deployed the platform', ar: 'طوّرت المنصة ونشرتها' },
      summary: {
        en: 'A secure internal platform where Mission Academy’s team runs its work: tasks, training courses, marketing, relationships, finance, messaging and HR. Every page is governed by role-based permissions, and it serves 30+ employees.',
        ar: 'منصة داخلية آمنة يدير بها فريق أكاديمية ميشن عمله: المهام، والدورات التدريبية، والتسويق، والعلاقات، والمالية، والرسائل، والموارد البشرية. كل صفحة فيها محكومة بصلاحيات حسب الدور، ويستخدمها أكثر من 30 موظفًا.',
      },
      tools: ['Python', 'Flask', 'SQLite', 'Authentication', 'Role-based access control'],
      outcomes: [
        { en: 'In daily use by 30+ employees', ar: 'يستخدمها يوميًا أكثر من 30 موظفًا' },
        { en: 'Documented in a 38-page employee guide (V39.3)', ar: 'موثّقة في دليل للموظفين من 38 صفحة (الإصدار V39.3)' },
      ],
      color: '#2F5BD3',
      cover: { src: 'assets/projects/mission-academy-platform/guide-cover.webp', alt: 'Mission Academy employee guide cover', fit: 'contain', bg: '#DCE2EC' },
      showcase: { kind: 'interface', demo: 'permission-model' },
      wall: ['assets/projects/mission-academy-platform/guide-permissions.webp'],
      blocks: [
        { type: 'text',
          title: { en: 'What it does', ar: 'ما الذي تقدّمه' },
          body: {
            en: 'The platform brings the academy’s operations into one place. Staff add and follow up tasks with priorities and statuses, build training courses with recurring runs and accreditation, keep files in a content library, track marketing events and leads, manage speakers, marketers and partners, record finances, message each other, and handle HR requests. The home page shows each person only the cards and shortcuts their account is allowed to use.',
            ar: 'تجمع المنصة عمليات الأكاديمية في مكان واحد. يضيف الموظفون المهام ويتابعونها بالأولوية والحالة، ويبنون الدورات التدريبية بنسخ تنفيذ متكررة واعتمادات، ويحفظون الملفات في مكتبة المحتوى، ويتابعون الفعاليات التسويقية والعملاء المحتملين، ويديرون المتحدثين والمسوقين والشركاء، ويسجّلون القيود المالية، ويتراسلون داخليًا، ويتعاملون مع طلبات الموارد البشرية. وتعرض الصفحة الرئيسية لكل موظف البطاقات والاختصارات التي يسمح بها حسابه فقط.',
          } },
        { type: 'demo', name: 'permission-model' },
        { type: 'list',
          title: { en: 'Security built in', ar: 'أمان من الأساس' },
          items: [
            { en: 'Every page has its own permission: hidden, view only, or edit. Sensitive areas such as finance add finer permissions inside the page.', ar: 'لكل صفحة صلاحية مستقلة: مخفي، أو اطلاع، أو تعديل. وتضيف الأقسام الحساسة مثل المالية صلاحيات أدق داخل الصفحة.' },
            { en: 'The home page never loads data for modules an account can’t access.', ar: 'لا تحمّل الصفحة الرئيسية بيانات أي قسم لا يملك الحساب صلاحية عليه.' },
            { en: 'Temporary or weak passwords must be changed at first sign-in; new passwords need 10+ characters with letters and numbers.', ar: 'يجب تغيير كلمة المرور المؤقتة أو الضعيفة عند أول دخول، وتتطلب كلمة المرور الجديدة 10 أحرف على الأقل تجمع الحروف والأرقام.' },
            { en: 'There is no self-service password reset: the system administrator issues a temporary password.', ar: 'لا توجد استعادة ذاتية لكلمة المرور؛ يصدر مسؤول النظام كلمة مرور مؤقتة.' },
            { en: 'Global search returns results only from sections the account is allowed to see.', ar: 'لا يعرض البحث العام إلا نتائج الأقسام المسموح بها للحساب.' },
          ] },
        { type: 'demo', name: 'request-flow' },
        { type: 'gallery', layout: 'stack',
          caption: { en: 'Pages from the platform’s employee guide, version V39.3.', ar: 'صفحات من دليل الموظفين للمنصة، الإصدار V39.3.' },
          items: [
            { src: 'assets/projects/mission-academy-platform/guide-cover.webp', alt: 'Employee guide cover', caption: { en: 'Cover: employee guide, V39.3', ar: 'الغلاف: دليل الموظفين، V39.3' } },
            { src: 'assets/projects/mission-academy-platform/guide-contents.webp', alt: 'Guide contents', caption: { en: 'Contents: 17 sections, from sign-in to HR', ar: 'المحتويات: 17 قسمًا من الدخول إلى الموارد البشرية' } },
            { src: 'assets/projects/mission-academy-platform/guide-permissions.webp', alt: 'Guide page: permissions and privacy', caption: { en: 'Why each employee sees different pages: hidden, view or edit', ar: 'لماذا يرى كل موظف صفحات مختلفة: مخفي أو اطلاع أو تعديل' } },
            { src: 'assets/projects/mission-academy-platform/guide-permission-centre.webp', alt: 'Guide page: setting an employee’s permissions', caption: { en: 'Setting an employee’s permissions, page by page', ar: 'ضبط صلاحيات الموظف صفحةً بصفحة' } },
            { src: 'assets/projects/mission-academy-platform/guide-sign-in.webp', alt: 'Guide page: signing in securely', caption: { en: 'Secure sign-in and forced password change', ar: 'الدخول الآمن وإلزام تغيير كلمة المرور' } },
            { src: 'assets/projects/mission-academy-platform/guide-home.webp', alt: 'Guide page: home page and navigation', caption: { en: 'Home page and navigation by permission', ar: 'الصفحة الرئيسية والتنقل حسب الصلاحية' } },
            { src: 'assets/projects/mission-academy-platform/guide-tasks.webp', alt: 'Guide page: adding and following up tasks', caption: { en: 'Adding a task: link, assignee, priority, status', ar: 'إضافة مهمة: الربط والإسناد والأولوية والحالة' } },
            { src: 'assets/projects/mission-academy-platform/guide-users.webp', alt: 'Guide page: users and permissions', caption: { en: 'Adding users with a temporary password and role', ar: 'إضافة المستخدمين بكلمة مرور مؤقتة ودور' } },
          ] },
        { type: 'note', body: {
          en: 'Screens of the live system aren’t shown because the platform is internal to Mission Academy. The interactive models above follow the behaviour documented in its guide and use no real data.',
          ar: 'لا تُعرض شاشات النظام الفعلي لأن المنصة داخلية خاصة بأكاديمية ميشن. النماذج التفاعلية أعلاه تتبع السلوك الموثّق في الدليل ولا تستخدم أي بيانات حقيقية.',
        } },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'autopent',
      featured: 2,
      year: '2026',
      title: { en: 'AutoPent', ar: 'AutoPent' },
      client: { en: 'Graduation project, Qassim University', ar: 'مشروع التخرج، جامعة القصيم' },
      categories: ['security', 'software'],
      role: { en: 'Team lead of a five-student team, supervised by Prof. Suliman Alsuhaibani', ar: 'قائدة فريق من خمسة طلاب، بإشراف أ.د. سليمان السحيباني' },
      summary: {
        en: 'A bilingual web security tool that scans a target URL, classifies the risk, explains every finding in plain language and recommends a fix, with scan history, comparisons, scheduled scans and PDF reports.',
        ar: 'أداة أمن ويب ثنائية اللغة تفحص الرابط المستهدف، وتصنّف الخطورة، وتشرح كل نتيجة بلغة واضحة وتقترح طريقة إصلاحها، مع سجل للفحوصات، ومقارنات، وفحوصات مجدولة، وتقارير PDF.',
      },
      tools: ['Python', 'Flask', 'SQLite', 'Requests', 'BeautifulSoup'],
      outcomes: [
        { en: '80% faster scanning (team-reported)', ar: 'فحص أسرع بنسبة 80% (حسب تقييم الفريق)' },
        { en: '70% less manual effort (team-reported)', ar: 'جهد يدوي أقل بنسبة 70% (حسب تقييم الفريق)' },
      ],
      color: '#3FD1C2',
      cover: { src: 'assets/projects/autopent/03-results.webp', alt: 'AutoPent scan results with a risk score' },
      showcase: { kind: 'interface', demo: 'scan-steps' },
      wall: ['assets/projects/autopent/04-findings.webp', 'assets/projects/autopent/05-dashboard.webp'],
      blocks: [
        { type: 'demo', name: 'scan-steps' },
        { type: 'demo', name: 'scan-profiles' },
        { type: 'demo', name: 'architecture' },
        { type: 'video', src: 'assets/projects/autopent/video/autopent-promo.mp4', poster: 'assets/projects/autopent/video/autopent-promo-poster.webp',
          caption: { en: 'Project promo.', ar: 'الفيديو التعريفي للمشروع.' } },
        { type: 'video', src: 'assets/projects/autopent/video/autopent-walkthrough.mp4', poster: 'assets/projects/autopent/video/autopent-walkthrough-poster.jpg',
          caption: { en: 'Screen recording of a real scan.', ar: 'تسجيل شاشة لفحص حقيقي.' } },
        { type: 'gallery', layout: 'row',
          caption: { en: 'Official project poster, Department of Computer Science, Qassim University.', ar: 'ملصق المشروع الرسمي، قسم علوم الحاسب، جامعة القصيم.' },
          items: [{ src: 'assets/projects/autopent/project-poster.webp', alt: 'AutoPent project poster' }] },
        { type: 'note', body: {
          en: 'Screens come from a real recording of the tool. The targets shown are public test sites built to be vulnerable (OWASP Juice Shop and testphp.vulnweb.com). The 80% and 70% figures are the team’s own evaluation results, as reported on the project poster.',
          ar: 'الشاشات مأخوذة من تسجيل حقيقي للأداة. والأهداف المعروضة مواقع اختبار عامة مصممة لتكون معرضة للثغرات (OWASP Juice Shop وtestphp.vulnweb.com). نسبتا 80% و70% من تقييم الفريق كما وردتا في ملصق المشروع.',
        } },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'heart-conference',
      featured: 3,
      year: '2026',
      title: { en: 'World Heart Day Conference', ar: 'مؤتمر اليوم العالمي للقلب' },
      client: { en: 'Qalb Association for Heart Patients’ Care, Unaizah', ar: 'جمعية قلب لرعاية مرضى القلب، عنيزة' },
      categories: ['identity'],
      role: { en: 'Visual identity and conference materials', ar: 'الهوية البصرية ومواد المؤتمر' },
      summary: {
        en: 'The identity for a two-day scientific conference on World Heart Day (29–30 September 2026). The mark joins a hand, a heart and a pulse line; around it sits a colour-coded badge system for six attendee roles, a pattern, a media wall, an entrance arch and the programme.',
        ar: 'هوية مؤتمر علمي يمتد يومين في اليوم العالمي للقلب (29–30 سبتمبر 2026). يجمع الشعار يدًا وقلبًا وخط نبض، ويحيط به نظام بطاقات ملوّن لستة أدوار، ونمط، وجدار إعلامي، وبوابة دخول، وبرنامج المؤتمر.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#4B8C97',
      palette: ['#1A3C6C', '#29567A', '#4B8C97', '#358F8D', '#7FB0B5', '#DAE8EA'],
      tone: { bg: '#10263F', fg: '#EEF4F5' },
      cover: { src: 'assets/projects/heart-conference/logo.webp', alt: 'World Heart Day conference logo', fit: 'contain', bg: '#F1F6F7' },
      showcase: {
        kind: 'identity',
        logo: 'assets/projects/heart-conference/logo.svg',
        rack: ['badge-vip', 'badge-participant', 'badge-speaker', 'badge-organizer', 'badge-photographer', 'badge-exhibitor']
          .map(n => ({ src: `assets/projects/heart-conference/${n}.webp`, alt: n.replace('badge-', '') + ' badge' })),
      },
      wall: ['assets/projects/heart-conference/badge-speaker.webp', 'assets/projects/heart-conference/badge-photographer.webp'],
      blocks: [
        { type: 'logo', src: 'assets/projects/heart-conference/logo.svg',
          caption: { en: 'The final mark: a hand over the heart, continuing into a pulse line.', ar: 'الشعار النهائي: يد على القلب تمتد إلى خط نبض.' } },
        { type: 'gallery', layout: 'grid',
          caption: { en: 'Four directions explored before the final mark, each with lockup, symbol and one-colour versions.', ar: 'أربعة اتجاهات استُكشفت قبل الشعار النهائي، لكل منها نسخة رأسية ورمز ونسخة أحادية اللون.' },
          items: [1, 2, 3, 4].map(i => ({ src: `assets/projects/heart-conference/exploration-${i}.webp`, alt: `Logo exploration ${i}` })) },
        { type: 'gallery', layout: 'rack',
          caption: { en: 'One badge layout, six roles, each with its own colour so staff can recognise a role at a glance.', ar: 'تصميم بطاقة واحد لستة أدوار، لكل دور لونه ليتعرّف المنظمون على الدور من النظرة الأولى.' },
          items: ['vip', 'participant', 'speaker', 'organizer', 'photographer', 'exhibitor']
            .map(n => ({ src: `assets/projects/heart-conference/badge-${n}.webp`, alt: `${n} badge` })) },
        { type: 'palette', colors: ['#1A3C6C', '#29567A', '#4B8C97', '#358F8D', '#7FB0B5', '#DAE8EA'],
          caption: { en: 'Colours sampled from the mark and badges.', ar: 'ألوان مأخوذة من الشعار والبطاقات.' } },
        { type: 'gallery', layout: 'row',
          caption: { en: 'Media wall, entrance arch and the pattern built from the mark.', ar: 'الجدار الإعلامي، وبوابة الدخول، والنمط المبني من الشعار.' },
          items: [
            { src: 'assets/projects/heart-conference/media-wall.webp', alt: 'Conference media wall' },
            { src: 'assets/projects/heart-conference/entrance-arch.webp', alt: 'Conference entrance arch' },
            { src: 'assets/projects/heart-conference/pattern.webp', alt: 'Identity pattern' },
          ] },
        { type: 'gallery', layout: 'series',
          caption: { en: 'Programme layouts for the two conference days.', ar: 'تصاميم برنامج يومي المؤتمر.' },
          items: [1, 2, 3].map(i => ({ src: `assets/projects/heart-conference/programme-${i}.webp`, alt: `Conference programme, version ${i}` })) },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'bukayriyah-health-expo',
      featured: 4,
      year: '2026',
      title: { en: 'Al-Bukayriyah Health Expo', ar: 'معرض البكيرية الصحي' },
      client: { en: 'Mission Academy', ar: 'أكاديمية ميشن' },
      categories: ['identity'],
      role: { en: 'Branding and event materials', ar: 'الهوية ومواد الفعالية' },
      summary: {
        en: 'Branding for a three-day public health expo, built around the line “Your health, a lifestyle” and a pulse line. Visitors carried a health passport through a nine-station route, so the passport, venue map, badges and poster were designed as one system.',
        ar: 'هوية معرض صحي عام يمتد ثلاثة أيام، مبنية حول عبارة «صحتك.. أسلوب حياة» وخط نبض. حمل الزوار جوازًا صحيًا عبر مسار من تسع محطات، فصُمّم الجواز ومخطط المكان والبطاقات والملصق كنظام واحد.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#35889F',
      palette: ['#034352', '#2A6A88', '#35889F', '#60A971', '#9ECB77', '#BFDCF3'],
      tone: { bg: '#062C36', fg: '#EEF6F2' },
      cover: { src: 'assets/projects/bukayriyah-health-expo/poster.webp', alt: 'Al-Bukayriyah Health Expo poster' },
      showcase: {
        kind: 'identity',
        hero: { src: 'assets/projects/bukayriyah-health-expo/poster.webp', alt: 'Al-Bukayriyah Health Expo main poster' },
        rack: [
          { src: 'assets/projects/bukayriyah-health-expo/badge-vip.webp', alt: 'VIP badge' },
          { src: 'assets/projects/bukayriyah-health-expo/badge-participant.webp', alt: 'Participant badge' },
          { src: 'assets/projects/bukayriyah-health-expo/badge-photographer.webp', alt: 'Photographer badge' },
        ],
      },
      wall: ['assets/projects/bukayriyah-health-expo/passport-cover.webp', 'assets/projects/bukayriyah-health-expo/badge-vip.webp'],
      blocks: [
        { type: 'gallery', layout: 'rack',
          caption: { en: 'Main poster and attendee badges.', ar: 'الملصق الرئيسي وبطاقات الحضور.' },
          items: [
            { src: 'assets/projects/bukayriyah-health-expo/poster.webp', alt: 'Main poster' },
            { src: 'assets/projects/bukayriyah-health-expo/badge-vip.webp', alt: 'VIP badge' },
            { src: 'assets/projects/bukayriyah-health-expo/badge-participant.webp', alt: 'Participant badge' },
            { src: 'assets/projects/bukayriyah-health-expo/badge-photographer.webp', alt: 'Photographer badge' },
          ] },
        { type: 'gallery', layout: 'stack',
          caption: { en: 'The health passport: cover and the health-data spread visitors filled in at each station.', ar: 'الجواز الصحي: الغلاف وصفحة البيانات الصحية التي يكملها الزائر في كل محطة.' },
          items: [
            { src: 'assets/projects/bukayriyah-health-expo/passport-cover.webp', alt: 'Health passport cover' },
            { src: 'assets/projects/bukayriyah-health-expo/passport-inside.webp', alt: 'Health passport inside spread' },
          ] },
        { type: 'zoom', src: 'assets/projects/bukayriyah-health-expo/venue-map.webp', alt: 'Venue map of the nine-station health passport route',
          caption: { en: 'Venue map for the nine-station health passport route, made with the Public Health Authority (Wiqaya). Move across it to read the detail.', ar: 'مخطط مسار الجواز الصحي بمحطاته التسع، بالتعاون مع هيئة الصحة العامة (وقاية). مرّر المؤشر لقراءة التفاصيل.' } },
        { type: 'palette', colors: ['#034352', '#2A6A88', '#35889F', '#60A971', '#9ECB77', '#BFDCF3'],
          caption: { en: 'Colours sampled from the poster and badges.', ar: 'ألوان مأخوذة من الملصق والبطاقات.' } },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'mission-academy-it',
      featured: 0,
      year: '2026',
      title: { en: 'Email, Access & Hosting', ar: 'البريد والصلاحيات والاستضافة' },
      client: { en: 'Mission Academy', ar: 'أكاديمية ميشن' },
      categories: ['it', 'security'],
      role: { en: 'IT Specialist', ar: 'أخصائية تقنية معلومات' },
      summary: {
        en: 'Organization-wide email administration for 30+ employees and managers, and configuration and testing of application hosting with AWS Lightsail, Nginx and Cloudflare.',
        ar: 'إدارة البريد الإلكتروني على مستوى المنظمة لأكثر من 30 موظفًا ومديرًا، وإعداد استضافة التطبيقات واختبارها باستخدام AWS Lightsail وNginx وCloudflare.',
      },
      tools: ['Zoho Mail', 'AWS Lightsail', 'Nginx', 'Cloudflare', 'DNS'],
      outcomes: [{ en: 'Email and access for 30+ employees and managers', ar: 'البريد والصلاحيات لأكثر من 30 موظفًا ومديرًا' }],
      color: '#5E5E5A',
      cover: { type: 'type', text: { en: 'Email, access & hosting', ar: 'البريد والصلاحيات والاستضافة' } },
      blocks: [
        { type: 'list',
          title: { en: 'Email administration', ar: 'إدارة البريد الإلكتروني' },
          items: [
            { en: 'Zoho Mail accounts for 30+ employees and managers', ar: 'حسابات Zoho Mail لأكثر من 30 موظفًا ومديرًا' },
            { en: 'Domain settings', ar: 'إعدادات النطاق' },
            { en: 'Access permissions and shared mailboxes', ar: 'صلاحيات الوصول وصناديق البريد المشتركة' },
            { en: 'Email security policies', ar: 'سياسات أمان البريد الإلكتروني' },
          ] },
        { type: 'demo', name: 'hosting-flow' },
        { type: 'list',
          title: { en: 'Application hosting', ar: 'استضافة التطبيقات' },
          items: [
            { en: 'Configured and tested hosting on AWS Lightsail with Nginx', ar: 'إعداد الاستضافة واختبارها على AWS Lightsail مع Nginx' },
            { en: 'DNS settings through Cloudflare', ar: 'إعدادات DNS عبر Cloudflare' },
            { en: 'Deployment support and troubleshooting', ar: 'دعم النشر وحل المشكلات' },
          ] },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'bls-campaign',
      featured: 0,
      year: '',
      title: { en: 'Basic Life Support Course Campaign', ar: 'حملة دورات الإنعاش القلبي الأساسي' },
      client: { en: 'Saudi Heart Association, via Mission Academy', ar: 'جمعية القلب السعودية عبر أكاديمية ميشن' },
      categories: ['identity'],
      role: { en: 'Campaign design', ar: 'تصميم الحملة' },
      summary: {
        en: 'One layout carries the campaign from city to city. Each edition swaps the skyline, landmark and venue details while the structure stays fixed.',
        ar: 'تصميم واحد يحمل الحملة من مدينة إلى أخرى؛ تتغيّر الواجهة العمرانية والمَعلم وتفاصيل المكان، ويبقى الهيكل ثابتًا.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#0B337B',
      palette: ['#0B337B', '#7588AC', '#B7BBC8', '#E2E6EF'],
      cover: { src: 'assets/projects/bls-campaign/riyadh.webp', alt: 'BLS campaign poster, Riyadh edition' },
      wall: ['assets/projects/bls-campaign/makkah.webp'],
      blocks: [
        { type: 'gallery', layout: 'series', grid: true,
          caption: { en: 'Riyadh, Makkah, Buraydah and a two-city edition. Turn on the grid to see the shared structure.', ar: 'الرياض ومكة المكرمة وبريدة ونسخة لمدينتين. فعّل الشبكة لترى الهيكل المشترك.' },
          items: ['riyadh', 'makkah', 'buraydah', 'two-cities'].map(c => ({ src: `assets/projects/bls-campaign/${c}.webp`, alt: `BLS poster, ${c.replace('-', ' ')} edition` })) },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'mission-academy-brand',
      featured: 0,
      year: '2026',
      title: { en: 'Mission Academy Brand Guidelines', ar: 'دليل الهوية البصرية لأكاديمية ميشن' },
      client: { en: 'Mission Academy', ar: 'أكاديمية ميشن' },
      categories: ['identity'],
      role: { en: 'Brand guidelines', ar: 'دليل الهوية' },
      summary: {
        en: 'A 50-page brand system covering strategy, the logo system, colour, typography, grid, patterns and iconography, and applications from business cards to signage and the website.',
        ar: 'نظام هوية من 50 صفحة يغطي الاستراتيجية، ونظام الشعار، والألوان، والخطوط، والشبكة، والأنماط، والأيقونات، والتطبيقات من بطاقات العمل إلى اللوحات والموقع.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#102C7B',
      palette: ['#102C7B', '#2B9DA5', '#CABA79', '#333D51'],
      cover: { src: 'assets/projects/mission-academy-brand/page-01.webp', alt: 'Mission Academy brand guidelines cover' },
      blocks: [
        { type: 'gallery', layout: 'deck',
          caption: { en: 'Selected pages from the guidelines, version 1.0.', ar: 'صفحات مختارة من الدليل، الإصدار 1.0.' },
          items: [1, 2, 3, 5, 16, 17, 20, 25, 27, 28, 29, 31, 32, 41, 42, 43, 44, 45, 47, 50]
            .map(p => ({ src: `assets/projects/mission-academy-brand/page-${String(p).padStart(2, '0')}.webp`, alt: `Brand guidelines page ${p}` })) },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'pediatric-osce',
      featured: 0,
      year: '2026',
      title: { en: 'Pediatric OSCE Preparation (PediaQ)', ar: 'التحضير لاختبار OSCE في طب الأطفال (PediaQ)' },
      client: { en: 'Mission Academy', ar: 'أكاديمية ميشن' },
      categories: ['identity'],
      role: { en: 'Course identity and posters', ar: 'هوية الدورة وملصقاتها' },
      summary: {
        en: 'Identity and posters for a pediatric OSCE preparation course: the speaker line-up, a free lecture announcement and bilingual course material.',
        ar: 'هوية وملصقات لدورة التحضير لاختبار OSCE في طب الأطفال: قائمة المتحدثين، وإعلان محاضرة مجانية، ومحتوى الدورة بالعربية والإنجليزية.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#23548F',
      cover: { src: 'assets/projects/pediatric-osce/speakers-updated.webp', alt: 'Pediatric OSCE speakers poster' },
      wall: ['assets/projects/pediatric-osce/speakers-updated.webp'],
      blocks: [
        { type: 'gallery', layout: 'series', items: [
          { src: 'assets/projects/pediatric-osce/speakers-updated.webp', alt: 'Pediatric OSCE speakers poster' },
          { src: 'assets/projects/pediatric-osce/lecture-poster.webp', alt: 'Pediatric OSCE free lecture poster' },
          { src: 'assets/projects/pediatric-osce/material-en.webp', alt: 'Course material in English' },
          { src: 'assets/projects/pediatric-osce/material-ar.webp', alt: 'Course material in Arabic' },
        ] },
        { type: 'gallery', layout: 'row',
          caption: { en: 'First edition of the speakers poster.', ar: 'النسخة الأولى من ملصق المتحدثين.' },
          items: [{ src: 'assets/projects/pediatric-osce/speakers-first-edition.webp', alt: 'First edition speakers poster' }] },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'family-medicine-osce',
      featured: 0,
      year: '2026',
      title: { en: 'Family Medicine OSCE Preparation', ar: 'التحضير لاختبار OSCE في طب الأسرة' },
      client: { en: 'Saudi Society of Family and Community Medicine', ar: 'الجمعية السعودية لطب الأسرة والمجتمع' },
      categories: ['identity'],
      role: { en: 'Poster set', ar: 'مجموعة ملصقات' },
      summary: {
        en: 'A poster set for a Family Medicine OSCE preparation course: the speaker line-up and course details in Arabic and English.',
        ar: 'مجموعة ملصقات لدورة التحضير لاختبار OSCE في طب الأسرة: قائمة المتحدثين وتفاصيل الدورة بالعربية والإنجليزية.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#646041',
      cover: { src: 'assets/projects/family-medicine-osce/speakers.webp', alt: 'Family Medicine OSCE speakers poster' },
      blocks: [
        { type: 'gallery', layout: 'series', items: [
          { src: 'assets/projects/family-medicine-osce/speakers.webp', alt: 'Speakers poster' },
          { src: 'assets/projects/family-medicine-osce/details-en.webp', alt: 'Course details in English' },
          { src: 'assets/projects/family-medicine-osce/details-ar.webp', alt: 'Course details in Arabic' },
        ] },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'mission-academy-programs',
      featured: 0,
      year: '2026',
      title: { en: 'Program Posters', ar: 'ملصقات البرامج' },
      client: { en: 'Mission Academy', ar: 'أكاديمية ميشن' },
      categories: ['identity'],
      role: { en: 'Poster design', ar: 'تصميم الملصقات' },
      summary: {
        en: 'Posters for Mission Academy programs: a pharmacy intern bootcamp, an AI-focused research opportunity, a mental health first aid course and a call for abstracts for the 1st Waqaya Health Promotion Forum.',
        ar: 'ملصقات لبرامج أكاديمية ميشن: معسكر صيادلة الامتياز، وفرصة بحثية في الذكاء الاصطناعي، ودورة الإسعافات النفسية الأولية، ودعوة تقديم الأبحاث لملتقى وقاية الأول للتعزيز الصحي.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#003CB9',
      cover: { src: 'assets/projects/mission-academy-programs/research-opportunity.webp', alt: 'Research opportunity poster' },
      blocks: [
        { type: 'gallery', layout: 'series', items: [
          { src: 'assets/projects/mission-academy-programs/pharmacy-bootcamp.webp', alt: 'Pharmacy intern bootcamp poster' },
          { src: 'assets/projects/mission-academy-programs/research-opportunity.webp', alt: 'Research opportunity poster' },
          { src: 'assets/projects/mission-academy-programs/mental-health-first-aid.webp', alt: 'Mental health first aid course poster' },
          { src: 'assets/projects/mission-academy-programs/waqaya-forum.webp', alt: 'Waqaya forum call for abstracts' },
        ] },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'tour-campaigns',
      featured: 0,
      year: '2025',
      title: { en: 'Tour Brand Campaigns', ar: 'حملات علامة تور' },
      client: { en: 'Tour', ar: 'تور' },
      categories: ['identity'],
      role: { en: 'Social campaign design', ar: 'تصميم الحملات الاجتماعية' },
      summary: {
        en: 'Bilingual social campaigns for a stay-booking brand: a seasonal sale, Saudi National Day and short video ads.',
        ar: 'حملات اجتماعية ثنائية اللغة لعلامة حجز إقامات: عرض موسمي، واليوم الوطني السعودي، وإعلانات فيديو قصيرة.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#9F1D43',
      cover: { src: 'assets/projects/tour-campaigns/national-day.webp', alt: 'Tour Saudi National Day poster' },
      wall: ['assets/projects/tour-campaigns/national-day.webp'],
      blocks: [
        { type: 'gallery', layout: 'series', items: [
          { src: 'assets/projects/tour-campaigns/sale.webp', alt: 'Seasonal sale poster' },
          { src: 'assets/projects/tour-campaigns/national-day.webp', alt: 'Saudi National Day poster' },
          { type: 'video', src: 'assets/projects/tour-campaigns/video-1.mp4', poster: 'assets/projects/tour-campaigns/video-1-poster.webp', alt: 'Short video ad' },
          { type: 'video', src: 'assets/projects/tour-campaigns/video-2.mp4', poster: 'assets/projects/tour-campaigns/video-2-poster.webp', alt: 'Short video ad' },
        ] },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'ninja-ads',
      featured: 0,
      year: '',
      title: { en: 'Ninja Ad Creatives', ar: 'إعلانات نينجا' },
      client: { en: 'Ninja', ar: 'نينجا' },
      categories: ['identity'],
      role: { en: 'Ad design', ar: 'تصميم الإعلانات' },
      summary: {
        en: 'Playful, on-brand social ads for a delivery service, highlighting delivery speed and a discount code.',
        ar: 'إعلانات اجتماعية مرحة متسقة مع هوية خدمة توصيل، تبرز سرعة التوصيل وكود الخصم.',
      },
      tools: ['Adobe Illustrator'],
      outcomes: [],
      color: '#287384',
      cover: { src: 'assets/projects/ninja-ads/discount.webp', alt: 'Ninja discount ad' },
      blocks: [
        { type: 'gallery', layout: 'series', items: [
          { src: 'assets/projects/ninja-ads/discount.webp', alt: 'Discount ad' },
          { src: 'assets/projects/ninja-ads/order-journey.webp', alt: 'How your order arrives ad' },
        ] },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'thob-app',
      featured: 0,
      year: '',
      title: { en: 'Thob, Mobile App UI', ar: 'ثوب: واجهة تطبيق جوال' },
      client: { en: 'Concept', ar: 'فكرة تطبيق' },
      categories: ['ui'],
      role: { en: 'UI/UX design in Figma', ar: 'تصميم الواجهات وتجربة المستخدم في Figma' },
      summary: {
        en: 'An e-commerce concept for traditional menswear, with onboarding, browsing, product detail and checkout designed end to end in Figma.',
        ar: 'فكرة متجر إلكتروني للأزياء الرجالية التقليدية، صُمّمت فيها مراحل التعريف والتصفح وتفاصيل المنتج والدفع كاملة في Figma.',
      },
      tools: ['Figma'],
      outcomes: [],
      color: '#63646D',
      cover: { src: 'assets/projects/thob-app/screens.webp', alt: 'Thob app screens' },
      blocks: [
        { type: 'zoom', src: 'assets/projects/thob-app/screens.webp', alt: 'Thob app screens: onboarding, browse, product detail and cart',
          caption: { en: 'Onboarding, browse, product detail and cart.', ar: 'التعريف، والتصفح، وتفاصيل المنتج، والسلة.' } },
      ],
    },

    /* ------------------------------------------------------------------ */
    {
      slug: 'earlier-coursework',
      featured: 0,
      year: '2022–24',
      title: { en: 'Earlier Coursework', ar: 'مشاريع دراسية سابقة' },
      client: { en: 'Qassim University', ar: 'جامعة القصيم' },
      categories: ['software', 'security'],
      role: { en: 'Developer', ar: 'مطوّرة' },
      summary: {
        en: 'Three projects from my degree: a Java desktop system, an encrypted messaging app and a relational database.',
        ar: 'ثلاثة مشاريع من دراستي: نظام سطح مكتب بـ Java، وتطبيق مراسلة مشفّر، وقاعدة بيانات علائقية.',
      },
      tools: ['Java', 'OOP', 'Cryptography', 'SQL'],
      outcomes: [],
      cover: { type: 'type', text: { en: 'Earlier coursework', ar: 'مشاريع دراسية' } },
      blocks: [
        { type: 'list',
          title: { en: 'Projects', ar: 'المشاريع' },
          items: [
            { en: 'Car Rental Management System (2024): a Java desktop application with a graphical interface for vehicle bookings and daily rental operations.', ar: 'نظام إدارة تأجير السيارات (2024): تطبيق سطح مكتب بـ Java بواجهة رسومية لحجوزات السيارات وعمليات التأجير اليومية.' },
            { en: 'Secure Message Application (2023): an encrypted messaging app applying cryptography concepts for secure, reliable communication.', ar: 'تطبيق المراسلة الآمن (2023): تطبيق مراسلة مشفّر يطبّق مفاهيم التشفير لتواصل آمن وموثوق.' },
            { en: 'Hospital Database System (2022): a relational database for hospital records and patient management.', ar: 'نظام قاعدة بيانات المستشفى (2022): قاعدة بيانات علائقية لسجلات المستشفى وإدارة المرضى.' },
          ] },
      ],
    },
  ],
};
