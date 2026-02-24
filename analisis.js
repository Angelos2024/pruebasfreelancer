
 (() => {
   // Diccionarios: carga modular y reemplazable (griego: master + unificado; hebreo: unificado)
  const DICT_URL = './diccionario/masterdiccionario.json';
  const DICT_G_UNIFICADO_URL = './diccionario/diccionarioG_unificado.min.json';
  const HEBREW_DICT_URL = './diccionario/diccionario_unificado.min.json';
  const DIC_HEBREW_INDEX_URL = './dic/diccionario_index_by_lemma.json';
  const DIC_HEBREW_ENTRIES_URL = './dic/diccionario_entries.jsonl';
   const SEARCH_INDEX = {
     es: './search/index-es.json',
     gr: './search/index-gr.json',
     he: './search/index-he.json'
   };
   const TEXT_BASE = './search/texts';
  const LXX_FILES = [
    'lxx_rahlfs_1935_1Chr.json',
    'lxx_rahlfs_1935_1Esdr.json',
    'lxx_rahlfs_1935_1Kgs.json',
    'lxx_rahlfs_1935_1Macc.json',
    'lxx_rahlfs_1935_1Sam.json',
    'lxx_rahlfs_1935_2Chr.json',
    'lxx_rahlfs_1935_2Esdr.json',
    'lxx_rahlfs_1935_2Kgs.json',
    'lxx_rahlfs_1935_2Macc.json',
    'lxx_rahlfs_1935_2Sam.json',
    'lxx_rahlfs_1935_3Macc.json',
    'lxx_rahlfs_1935_4Macc.json',
    'lxx_rahlfs_1935_Amos.json',
    'lxx_rahlfs_1935_Bar.json',
    'lxx_rahlfs_1935_BelOG.json',
    'lxx_rahlfs_1935_BelTh.json',
    'lxx_rahlfs_1935_DanOG.json',
    'lxx_rahlfs_1935_DanTh.json',
    'lxx_rahlfs_1935_Deut.json',
    'lxx_rahlfs_1935_Eccl.json',
    'lxx_rahlfs_1935_EpJer.json',
    'lxx_rahlfs_1935_Esth.json',
    'lxx_rahlfs_1935_Exod.json',
    'lxx_rahlfs_1935_Ezek.json',
    'lxx_rahlfs_1935_Gen.json',
    'lxx_rahlfs_1935_Hab.json',
    'lxx_rahlfs_1935_Hag.json',
    'lxx_rahlfs_1935_Hos.json',
    'lxx_rahlfs_1935_Isa.json',
    'lxx_rahlfs_1935_Jdt.json',
    'lxx_rahlfs_1935_Jer.json',
    'lxx_rahlfs_1935_Job.json',
    'lxx_rahlfs_1935_Joel.json',
    'lxx_rahlfs_1935_Jonah.json',
    'lxx_rahlfs_1935_JoshA.json',
    'lxx_rahlfs_1935_JoshB.json',
    'lxx_rahlfs_1935_JudgA.json',
    'lxx_rahlfs_1935_JudgB.json',
    'lxx_rahlfs_1935_Lam.json',
    'lxx_rahlfs_1935_Lev.json',
    'lxx_rahlfs_1935_Mal.json',
    'lxx_rahlfs_1935_Mic.json',
    'lxx_rahlfs_1935_Nah.json',
    'lxx_rahlfs_1935_Num.json',
    'lxx_rahlfs_1935_Obad.json',
    'lxx_rahlfs_1935_Odes.json',
    'lxx_rahlfs_1935_Prov.json',
    'lxx_rahlfs_1935_Ps.json',
    'lxx_rahlfs_1935_PsSol.json',
    'lxx_rahlfs_1935_Ruth.json',
    'lxx_rahlfs_1935_Sir.json',
    'lxx_rahlfs_1935_Song.json',
    'lxx_rahlfs_1935_SusOG.json',
    'lxx_rahlfs_1935_SusTh.json',
    'lxx_rahlfs_1935_TobBA.json',
    'lxx_rahlfs_1935_TobS.json',
    'lxx_rahlfs_1935_Wis.json',
    'lxx_rahlfs_1935_Zech.json',
    'lxx_rahlfs_1935_Zeph.json',
  ];
 const LXX_TO_HEBREW_SLUG = {
    Gen: 'genesis',
    Exod: 'exodo',
    Lev: 'levitico',
    Num: 'numeros',
    Deut: 'deuteronomio',
    JoshA: 'josue',
    JoshB: 'josue',
    JudgA: 'jueces',
    JudgB: 'jueces',
    Ruth: 'rut',
    '1Sam': '1_samuel',
    '2Sam': '2_samuel',
    '1Kgs': '1_reyes',
    '2Kgs': '2_reyes',
    '1Chr': '1_cronicas',
    '2Chr': '2_cronicas',
    '1Esdr': 'esdras',
    '2Esdr': 'nehemias',
    Esth: 'ester',
    Job: 'job',
    Ps: 'salmos',
    Prov: 'proverbios',
    Eccl: 'eclesiastes',
    Song: 'cantares',
    Isa: 'isaias',
    Jer: 'jeremias',
    Lam: 'lamentaciones',
    Ezek: 'ezequiel',
    DanOG: 'daniel',
    DanTh: 'daniel',
    Hos: 'oseas',
    Joel: 'joel',
    Amos: 'amos',
    Obad: 'abdias',
    Jonah: 'jonas',
    Mic: 'miqueas',
    Nah: 'nahum',
    Hab: 'habacuc',
    Zeph: 'sofonias',
    Hag: 'hageo',
    Zech: 'zacarias',
    Mal: 'malaquias'
  };
  const HEBREW_SLUG_TO_LXX = Object.entries(LXX_TO_HEBREW_SLUG).reduce((acc, [lxx, slug]) => {
    if (!acc[slug]) acc[slug] = [];
    acc[slug].push(lxx);
    return acc;
  }, {});
   const stopwords = new Set([
    'de', 'la', 'el', 'los', 'las', 'y', 'o', 'a', 'en', 'por', 'para',
    'un', 'una', 'unos', 'unas', 'del', 'al', 'que', 'se', 'con', 'como',
    'su', 'sus', 'es', 'son', 'lo', 'una', 'uno', 'tambien'
  ]);
  const greekStopwords = new Set([
    'και', 'δε', 'ο', 'η', 'το', 'του', 'της', 'των', 'τω', 'τον', 'την',
    'εις', 'εν', 'αυτος', 'αυτη', 'αυτο', 'ου', 'μη', 'γαρ', 'δε',
    'ως', 'επι', 'προς', 'δια', 'μετα', 'κατα', 'εκ', 'υπο'
  ]);
  const hebrewStopwords = new Set([
    'ו', 'ה', 'את', 'יהוה', 'אלהים', 'אשר', 'כל', 'על', 'אל', 'ב', 'ל', 'מ', 'עם', 'כי'
  ]);
 
   const TORAH = ['genesis', 'exodo', 'levitico', 'numeros', 'deuteronomio'];
   const HISTORICAL = [
     'josue', 'jueces', 'rut', '1_samuel', '2_samuel', '1_reyes', '2_reyes',
     '1_cronicas', '2_cronicas', 'esdras', 'nehemias', 'ester', 'hechos'
   ];
   const WISDOM = ['job', 'salmos', 'proverbios', 'eclesiastes', 'cantares'];
   const PROPHETS = [
     'isaias', 'jeremias', 'lamentaciones', 'ezequiel', 'daniel', 'oseas', 'joel', 'amos',
     'abdias', 'jonas', 'miqueas', 'nahum', 'habacuc', 'sofonias', 'hageo',
     'zacarias', 'malaquias'
   ];
   
   const GOSPELS = ['mateo', 'marcos', 'lucas', 'juan'];
   const ACTS = ['hechos'];
   const LETTERS = [
     'romanos', '1_corintios', '2_corintios', 'galatas', 'efesios', 'filipenses',
     'colosenses', '1_tesalonicenses', '2_tesalonicenses', '1_timoteo',
     '2_timoteo', 'tito', 'filemon', 'hebreos', 'santiago', '1_pedro',
     '2_pedro', '1_juan', '2_juan', '3_juan', 'judas'
   ];
   const APOCALYPSE = ['apocalipsis'];
  const NT_BOOKS = new Set([...GOSPELS, ...ACTS, ...LETTERS, ...APOCALYPSE]);
 
   const langLabels = {
     es: 'RVR1960',
     gr: 'RKANT',
    he: 'Hebreo',
    lxx: 'LXX'
   };
 
const state = {
   dict: null,
   dictMap: new Map(),
   dictGUnificado: null,
   dictGUnificadoMap: new Map(),
   hebrewDict: null,
   hebrewDictMap: new Map(),
   dicHebrewIndex: null,
   dicHebrewEntriesById: new Map(),
     indexes: {},
     textCache: new Map(),
    lxxFileCache: new Map(),
    lxxBookCache: new Map(),
    lxxVerseCache: new Map(),
  lxxBookStatsCache: new Map(),
    lxxSearchCache: new Map(),
     filter: 'todo',
    last: null,
     isLoading: false
    };
  const jsonCache = new Map();
  const failedJsonRequests = new Map();
  const JSON_RETRY_COOLDOWN_MS = 15000;
 
   const queryInput = document.getElementById('queryInput');
   const analyzeBtn = document.getElementById('analyzeBtn');
   const lemmaTags = document.getElementById('lemmaTags');
   const lemmaSummary = document.getElementById('lemmaSummary');
  const lemmaCorrespondence = document.getElementById('lemmaCorrespondence');
   const lemmaExamples = document.getElementById('lemmaExamples');
  const deepLexicalAnalysis = document.getElementById('deepLexicalAnalysis');
  const resultsLoadingIndicator = document.getElementById('resultsLoadingIndicator');
  const resultsLoadingStage = document.getElementById('resultsLoadingStage');
  const analysisResultsSection = document.getElementById('analysisResultsSection');
  const lemmaSummaryPanel = document.getElementById('lemmaSummaryPanel');
const occurrenceDonutMount = document.getElementById('occurrenceDonutMount');
  const occurrenceDonut = window.AnalisisOccurrenceDonut?.create(occurrenceDonutMount)
  
  const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));
  function scrollToLemmaSummary() {
    if (!lemmaSummaryPanel) {
      analysisResultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const topbar = document.querySelector('.topbar');
    const topbarHeight = topbar ? topbar.getBoundingClientRect().height : 0;
    const top = window.scrollY + lemmaSummaryPanel.getBoundingClientRect().top - topbarHeight - 12;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  }

  function setLoading(isLoading) {
    state.isLoading = isLoading;
  
   if (resultsLoadingIndicator) resultsLoadingIndicator.hidden = !isLoading;
    if (resultsLoadingStage) resultsLoadingStage.hidden = !isLoading;
    if (deepLexicalAnalysis) deepLexicalAnalysis.hidden = isLoading;
   if (analyzeBtn) analyzeBtn.disabled = isLoading;
  }
 
function normalizeGreek(text) {
    return String(text || '')
      .replace(/[··.,;:!?“”"(){}\[\]<>«»]/g, '')
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }
  
  function transliterateGreek(text) {
    const map = {
      α: 'a', β: 'b', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'e', θ: 'th',
      ι: 'i', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p',
      ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'u', φ: 'f', χ: 'ch', ψ: 'ps', ω: 'o'
    };
    const normalized = String(text || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    return normalized.split('').map((char) => map[char] || char).join('');
  }
  function buildGreekSearchKeys(normalized) {
    if (!normalized) return [];
    const variants = new Set();
    const chars = normalized.split('');
    const swapMap = {
      β: 'υ',
      υ: 'β'
    };
    const walk = (index, current) => {
      if (index >= chars.length) {
        variants.add(current);
        return;
      }
      const ch = chars[index];
      const swap = swapMap[ch];
      walk(index + 1, `${current}${ch}`);
      if (swap) {
        walk(index + 1, `${current}${swap}`);
      }
    };
    walk(0, '');
    return [...variants];
  }
 function escapeHtml(text) {
    return String(text ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
   function normalizeHebrew(text) {
     return String(text || '')
      .replace(/[\u200C-\u200F\u202A-\u202E]/g, '')
       .replace(/[\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C7]/g, '')
       .replace(/[\s\u05BE\-\u2010-\u2015\u2212]/g, '')
       .replace(/[׃.,;:!?()"“”'׳״]/g, '');
   }
 
function normalizeSpanish(text) {
    return String(text || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9ñ]/g, '');
  }

  function normalizeSpanishWord(text) {
    return normalizeSpanish(text);
  }
  function tokenizeSpanishWords(text) {
    return String(text || '')
      .split(/[^\p{L}\p{N}ñÑ]+/u)
      .map((token) => normalizeSpanishWord(token))
      .filter(Boolean);
  }
  function tokenizeGreekWords(text) {
    return String(text || '')
      .split(/[^\p{Script=Greek}\p{N}]+/u)
      .map((token) => normalizeGreek(token))
      .filter(Boolean);
  }
  function tokenizeHebrewWords(text) {
    return String(text || '')
      .replace(/[\u05BE\-\u2010-\u2015\u2212]/g, ' ')
      .split(/\s+/)
      .map((token) => normalizeHebrew(token))
      .filter(Boolean);
  }
  function hasTokenSequence(tokens, queryTokens) {
    if (!queryTokens.length || queryTokens.length > tokens.length) return false;
    for (let i = 0; i <= tokens.length - queryTokens.length; i += 1) {
      let matches = true;
      for (let j = 0; j < queryTokens.length; j += 1) {
        if (tokens[i + j] !== queryTokens[j]) {
          matches = false;
          break;
        }
      }
      if (matches) return true;
    }
    return false;
  }
  function tokenizeQueryForExactSearch(rawQuery, lang) {
    if (lang === 'gr' || lang === 'lxx') return tokenizeGreekWords(rawQuery);
    if (lang === 'he') return tokenizeHebrewWords(rawQuery);
    return tokenizeSpanishWords(rawQuery);
  }
  function tokenizeVerseForExactSearch(verseText, lang) {
    if (lang === 'gr' || lang === 'lxx') return tokenizeGreekWords(verseText);
    if (lang === 'he') return tokenizeHebrewWords(verseText);
    return tokenizeSpanishWords(verseText);
  }
  async function filterRefsByExactSequence(refs, lang, rawQuery) {
    const queryTokens = tokenizeQueryForExactSearch(rawQuery, lang);
    if (queryTokens.length < 2) return refs;
    const output = [];
    for (const ref of refs) {
      const [book, chapterRaw, verseRaw] = String(ref || '').split('|');
      const chapter = Number(chapterRaw);
      const verse = Number(verseRaw);
      if (!book || !Number.isFinite(chapter) || !Number.isFinite(verse)) continue;
      const verses = await loadChapterText(lang, book, chapter);
      const verseText = verses?.[verse - 1] || '';
      const verseTokens = tokenizeVerseForExactSearch(verseText, lang);
      if (hasTokenSequence(verseTokens, queryTokens)) output.push(ref);
    }
    return output;
  }
  
  function getHebrewDefinition(entry) {
    return entry?.definitions?.short || entry?.strong_detail?.definicion || entry?.descripcion || '';
  }
  function normalizeTransliteration(text) {
    return normalizeSpanish(text).replace(/ñ/g, 'n');
  }

  function buildTranslitVariants(text) {
    const base = normalizeTransliteration(text);
    if (!base) return [];
    const variants = new Set([base]);
    variants.add(base.replace(/u/g, 'v'));
    variants.add(base.replace(/v/g, 'u'));
    variants.add(base.replace(/y/g, 'i'));
    variants.add(base.replace(/i/g, 'y'));
    variants.add(base.replace(/au/g, 'av'));
    variants.add(base.replace(/ou/g, 'ov'));
    return [...variants].filter(Boolean);
  }
  function getNormalizedQuery(lang, query) {
    if (lang === 'gr' || lang === 'lxx') return normalizeGreek(query);
    if (lang === 'he') return normalizeHebrew(query);
    return normalizeSpanish(query);
  }

  function buildTokenRegex(token, lang) {
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (lang === 'es') {
      const accentMap = {
        a: '[aáàâäãå]',
        e: '[eéèêë]',
        i: '[iíìîï]',
        o: '[oóòôöõ]',
        u: '[uúùûü]',
        n: '[nñ]'
      };
      const pattern = escaped.split('').map((ch) => accentMap[ch] || ch).join('');
      return new RegExp(pattern, 'giu');
    }

    const letters = [];
    for (const ch of escaped) {
      if (ch === '\\') continue;
      if (lang === 'gr' && ch === 'σ') {
        letters.push('[σς]');
      } else {
        letters.push(ch);
      }
    }
    const pattern = letters.map((letter) => `${letter}\\p{M}*`).join('');
    return new RegExp(pattern, 'giu');
  }

  function highlightText(text, query, lang) {
    const raw = String(text ?? '');
    const normalizedQuery = String(query ?? '').trim();
    if (!raw || !normalizedQuery) return escapeHtml(raw);

    const safe = escapeHtml(raw);
    const normalized = getNormalizedQuery(lang, normalizedQuery);
    const tokens = normalized.split(' ').map((token) => token.trim()).filter((token) => token.length >= 2);
    if (!tokens.length) return safe;

    let output = safe;
   if (tokens.length > 1) {
      const phrasePattern = tokens.map((token) => buildTokenRegex(token, lang).source).join('\\s+');
      const phraseRe = new RegExp(phrasePattern, 'giu');
      return output.replace(phraseRe, (match) => `<mark>${match}</mark>`);
    }
    for (const token of tokens) {
      const re = buildTokenRegex(token, lang);
      output = output.replace(re, (match) => `<mark>${match}</mark>`);
    }
    return output;
  }
function detectLang(text) {
    const sample = String(text || '');
    if (/[\u0590-\u05FF]/.test(sample)) return 'he';
    if (/[\u0370-\u03FF\u1F00-\u1FFF]/.test(sample)) return 'gr';
    return 'es';
  }

  function normalizeByLang(text, lang) {
    if (lang === 'gr') return normalizeGreek(text);
    if (lang === 'he') return normalizeHebrew(text);
    return normalizeSpanish(text);
  }
function getGreekRefs(normalized, index) {
    if (!normalized) return [];
    const keys = buildGreekSearchKeys(normalized);
    const refs = [];
    const seen = new Set();
    keys.forEach((key) => {
      const matches = index.tokens?.[key] || [];
      matches.forEach((ref) => {
        if (seen.has(ref)) return;
        seen.add(ref);
        refs.push(ref);
      });
    });
    return refs;
  }
   function getHebrewRefs(normalized, index) {
    if (!normalized) return [];
    const direct = index.tokens?.[normalized] || [];
    if (direct.length) return direct;

    const refs = [];
    const seen = new Set();
    Object.entries(index.tokens || {}).forEach(([token, matches]) => {
      if (!token || token === normalized) return;
      if (!token.endsWith(normalized) && !token.includes(normalized)) return;
     const prefixLen = token.length - normalized.length;
      if (prefixLen < 0 || prefixLen > 3) return;
     (matches || []).forEach((ref) => {
        if (seen.has(ref)) return;
        seen.add(ref);
        refs.push(ref);
      });
    });
    return refs;
  }
  async function loadJson(url) {
   const failedRequest = failedJsonRequests.get(url);
    if (failedRequest && (Date.now() - failedRequest.timestamp) < JSON_RETRY_COOLDOWN_MS) {
      throw failedRequest.error;
    }

   if (jsonCache.has(url)) return jsonCache.get(url);
    const promise = fetch(url, { cache: 'force-cache' }).then((res) => {
      if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
      return res.json();
    });
    jsonCache.set(url, promise);
    try {
    failedJsonRequests.delete(url);
      return await promise;
    } catch (error) {
      jsonCache.delete(url);
const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
      const isNetworkError = offline || error instanceof TypeError;
      const normalizedError = isNetworkError
        ? new Error(
          `Error de red cargando ${url}. Revisa si el navegador está en modo Offline (DevTools), ` +
          'si el servidor local está activo y si no hay un bloqueador/proxy interrumpiendo peticiones locales.'
        )
        : error;

      failedJsonRequests.set(url, { timestamp: Date.now(), error: normalizedError });
      throw normalizedError;
    }
  }

  // Carga diccionario griego principal (master). Índices por lemma, forma y entrada impresa.
  async function loadDictionary() {
    if (state.dict) return state.dict;
    const data = await loadJson(DICT_URL);
    state.dict = data;
    const map = new Map();
    (data.items || []).forEach((item) => {
      const lemmaKey = normalizeGreek(item.lemma);
      const formKey = normalizeGreek(item['Forma flexionada del texto']);
      const printed = item['Printed_entry'] || item.entrada_impresa || '';
      const printedKey = printed ? normalizeGreek(printed.split(/\s/)[0] || printed) : '';
      if (lemmaKey && !map.has(lemmaKey)) map.set(lemmaKey, item);
      if (formKey && !map.has(formKey)) map.set(formKey, item);
      if (printedKey && printedKey.length >= 2 && !map.has(printedKey)) map.set(printedKey, item);
    });
    state.dictMap = map;
    return data;
  }

  // Carga diccionario griego unificado (modular: puede reemplazarse por otra URL).
  async function loadDictionaryGUnificado() {
    if (state.dictGUnificado) return state.dictGUnificado;
    try {
      const data = await loadJson(DICT_G_UNIFICADO_URL);
      state.dictGUnificado = Array.isArray(data) ? data : (data?.items || []);
      const map = new Map();
      (state.dictGUnificado || []).forEach((item) => {
        const lemmaKey = normalizeGreek(item?.lemma || item?.Forma_lexica || '');
        const formKey = normalizeGreek(item?.['Forma flexionada del texto'] || item?.forma || item?.lemma || '');
        const printed = item?.['Printed_entry'] || item?.entrada_impresa || '';
        const printedKey = printed ? normalizeGreek(String(printed).split(/\s/)[0] || printed) : '';
        if (lemmaKey && !map.has(lemmaKey)) map.set(lemmaKey, item);
        if (formKey && !map.has(formKey)) map.set(formKey, item);
        if (printedKey && printedKey.length >= 2 && !map.has(printedKey)) map.set(printedKey, item);
      });
      state.dictGUnificadoMap = map;
    } catch (e) {
      state.dictGUnificado = [];
      state.dictGUnificadoMap = new Map();
    }
    return state.dictGUnificado;
  }

  // Encuentra entrada griega por lemma o por Printed_entry/entrada_impresa (datos completos).
  function findGreekEntry(lemma) {
    if (!lemma) return null;
    const normalized = normalizeGreek(lemma);
    let entry = state.dictMap?.get(normalized) ?? state.dictGUnificadoMap?.get(normalized) ?? null;
    if (entry) return entry;
    const items = state.dict?.items || [];
    for (const e of items) {
      if (normalizeGreek(e.lemma) === normalized) return e;
      const printed = e['Printed_entry'] || e.entrada_impresa || '';
      if (printed && (printed.includes(lemma) || normalizeGreek(printed).includes(normalized))) return e;
    }
    const unif = state.dictGUnificado || [];
    for (const e of unif) {
      if (normalizeGreek(e?.lemma || e?.Forma_lexica) === normalized) return e;
      const printed = e?.['Printed_entry'] || e?.entrada_impresa || '';
      if (printed && (String(printed).includes(lemma) || normalizeGreek(printed).includes(normalized))) return e;
    }
    return null;
  }

  // Encuentra entrada hebrea por lemma o forma (datos completos).
  function findHebrewEntry(lemma) {
    if (!lemma) return null;
    const normalized = normalizeHebrew(lemma);
    let entry = state.hebrewDictMap?.get(normalized) ?? null;
    if (entry) return entry;
    const items = state.hebrewDict || [];
    for (const e of items) {
      if (normalizeHebrew(e?.lemma || e?.hebreo || e?.palabra) === normalized) return e;
      if (normalizeHebrew(e?.forma) === normalized) return e;
      if ((e?.forms || []).some((f) => normalizeHebrew(f) === normalized)) return e;
      if ((e?.formas || []).some((f) => normalizeHebrew(f) === normalized)) return e;
    }
    return null;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value != null && value !== '') el.textContent = String(value);
  }

  // Resuelve entrada griega: primero master, luego unificado (modular y reemplazable).
  async function resolveGreekDictMap() {
    await loadDictionary();
    await loadDictionaryGUnificado();
    return {
      get(normalizedKey) {
        return state.dictMap.get(normalizedKey) ?? state.dictGUnificadoMap.get(normalizedKey) ?? null;
      },
      get entries() {
        const combined = new Map(state.dictMap);
        state.dictGUnificadoMap.forEach((v, k) => { if (!combined.has(k)) combined.set(k, v); });
        return combined;
      }
    };
  }
  // Búsqueda griego desde español: solo por equivalencias/definición (transliteración desactivada).
  async function findGreekEntryFromSpanish(term) {
    if (!term) return null;
    await loadDictionary();
    const normalizedEs = normalizeSpanish(term);
    if (!normalizedEs) return null;
    const items = state.dict?.items || [];
    for (const item of items) {
      const def = (item.definicion || '').toLowerCase();
      if (def && def.includes(normalizedEs)) return item;
    }
    return null;
  }
  // Diccionario hebreo: URL reemplazable para cargar otro léxico (p. ej. nuevo diccionario hebreo).
  async function loadHebrewDictionary() {
    if (state.hebrewDict) return state.hebrewDict;
    const data = await loadJson(HEBREW_DICT_URL);
    state.hebrewDict = Array.isArray(data) ? data : (data?.items ?? []);
    try {
      const dicData = await loadJson('./dic/hebrew_dictionary.json');
      const extra = Array.isArray(dicData) ? dicData : (dicData?.items ?? []);
      if (extra.length) state.hebrewDict = [...(state.hebrewDict || []), ...extra];
    } catch (e) {
      // ./dic/hebrew_dictionary.json opcional
    }
    const map = new Map();
    (state.hebrewDict || []).forEach((item) => {
     const keys = [
        item?.palabra,
        item?.lemma,
        item?.hebreo,
        item?.forma,
        ...(item?.forms || []),
        ...(item?.formas || []),
        ...(item?.hebreos || [])
      ]
        .map((token) => normalizeHebrew(token || ''))
        .filter(Boolean);
      keys.forEach((key) => {
        if (!map.has(key)) map.set(key, item);
      });
    });
    state.hebrewDictMap = map;
    return state.hebrewDict;
  }

  // Dic folder (nuevo diccionario hebreo): index by lemma + entries by id.
  async function loadDicHebrewDictionary() {
    if (state.dicHebrewIndex !== null) return;
    try {
      const indexData = await loadJson(DIC_HEBREW_INDEX_URL);
      state.dicHebrewIndex = indexData && typeof indexData === 'object' ? indexData : {};
    } catch (e) {
      state.dicHebrewIndex = {};
    }
    try {
      const res = await fetch(DIC_HEBREW_ENTRIES_URL, { cache: 'force-cache' });
      if (!res.ok) return;
      const text = await res.text();
      const byId = new Map();
      (text || '').split(/\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        try {
          const entry = JSON.parse(trimmed);
          const id = entry?.id;
          if (id) byId.set(id, entry);
        } catch (err) { /* skip bad lines */ }
      });
      state.dicHebrewEntriesById = byId;
    } catch (e) {
      state.dicHebrewEntriesById = new Map();
    }
  }

  function getHebrewEntryFromDic(normalizedLemma) {
    if (!state.dicHebrewIndex || !normalizedLemma) return null;
    const ids = state.dicHebrewIndex[normalizedLemma];
    if (!Array.isArray(ids) || !ids.length) return null;
    const firstId = ids[0];
    return state.dicHebrewEntriesById.get(firstId) || null;
  }

  // Extrae todos los campos de una entrada de diccionario de forma dinámica (sin hardcodear nombres).
  function extractAllDictionaryFields(entry) {
    if (!entry || typeof entry !== 'object') return {};
    const out = {};
    const keys = Object.keys(entry);
    for (const key of keys) {
      const v = entry[key];
      if (v === null || v === undefined) continue;
      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        try {
          out[key] = JSON.stringify(v);
        } catch (e) {
          out[key] = String(v);
        }
      } else if (Array.isArray(v)) {
        try {
          out[key] = JSON.stringify(v);
        } catch (e) {
          out[key] = String(v);
        }
      } else {
        out[key] = v;
      }
    }
    return out;
  }

  // Fusiona dos entradas en un solo objeto con todas las claves; valor preferido de A, luego B.
  function mergeDictionaryEntries(entryA, entryB) {
    const fieldsA = extractAllDictionaryFields(entryA);
    const fieldsB = extractAllDictionaryFields(entryB);
    const allKeys = new Set([...Object.keys(fieldsA), ...Object.keys(fieldsB)]);
    const merged = {};
    for (const k of allKeys) {
      const a = fieldsA[k];
      const b = fieldsB[k];
      if (a !== undefined && a !== null && a !== '') merged[k] = a;
      else if (b !== undefined && b !== null && b !== '') merged[k] = b;
      else merged[k] = '—';
    }
    return merged;
  }

  // Renderiza la entrada completa del diccionario hebreo (Dictionary B) en #dictB-container.
  function renderHebrewDictionary(entry) {
    const container = document.getElementById('dictB-container');
    if (!container) return;
    container.innerHTML = '';

    function addField(label, value) {
      if (value == null || value === '') return;
      const str = Array.isArray(value)
        ? (value.length ? value.join(', ') : '')
        : (typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value));
      if (!str) return;
      const row = document.createElement('div');
      row.className = 'dict-row small';
      const title = document.createElement('strong');
      title.textContent = label + ': ';
      const content = document.createElement('span');
      content.textContent = str;
      row.appendChild(title);
      row.appendChild(content);
      container.appendChild(row);
    }

    const knownKeys = [
      'lemma', 'printed_entry', 'construct_forms', 'suffix_forms', 'plural_forms',
      'morphology', 'definition', 'meanings', 'usage', 'phraseology', 'description'
    ];

    addField('Lemma', entry.lemma || entry.Lema || entry.lema);
    addField('Printed entry', entry.printed_entry || entry.Printed_entry || entry.entrada_impresa || entry.headword_line);
    addField('Construct forms', entry.construct_forms || entry.construct || entry.construct_state);
    addField('Suffix forms', entry.suffix_forms);
    addField('Plural forms', entry.plural_forms);
    addField('Morphology', entry.morphology || entry.morfologia || entry.morfologia_impresa);
    addField('Definition', entry.definition || entry.definicion);
    addField('Meanings', entry.meanings);
    addField('Usage', entry.usage);
    addField('Phraseology', entry.phraseology);
    addField('Description', entry.description || entry.descripcion || entry.text);
    addField('Forms', entry.forms || entry.formas);
    addField('Transliteration', entry.transliteration || entry.transliteracion);

    Object.keys(entry || {}).forEach((key) => {
      if (knownKeys.includes(key) || key === 'forms' || key === 'formas' || key === 'transliteration' || key === 'transliteracion') return;
      const lower = key.toLowerCase();
      if (['lemma', 'printed_entry', 'construct_forms', 'suffix_forms', 'plural_forms', 'morphology', 'definition', 'meanings', 'usage', 'phraseology', 'description'].some((k) => lower === k || lower === k.replace('_', ' '))) return;
      addField(key, entry[key]);
    });
  }

  // Formatea Dictionary B (Hebrew): morfología completa (Est. cstr., sufijos, plurales) y contenido semántico completo sin truncar.
  function formatHebrewLexiconArticle(fields) {
    if (!fields || typeof fields !== 'object') return '';

    const getStr = (key) => {
      const v = fields[key];
      if (v === undefined || v === null) return '';
      return String(v).trim();
    };
    const getArray = (key) => {
      const v = fields[key];
      if (Array.isArray(v)) return v;
      if (typeof v === 'string') {
        try {
          const parsed = JSON.parse(v);
          return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          return v ? [v] : [];
        }
      }
      return [];
    };

    const text = getStr('text');
    const headwordLine = getStr('headword_line');
    const headwordTokens = getArray('headword_tokens');
    const gloss = getStr('gloss_es') || getStr('definition') || getStr('definicion') || getStr('descripcion');
    const lemma = getStr('lemma');
    const transliteration = getStr('transliteration') || getStr('transliteracion');
    const formas = getArray('formas');
    const glosas = getArray('glosas');
    const morfs = getArray('morfs') || getArray('morphs');

    const parts = [];

    // Encabezado: lemma, transliteration, definición breve
    parts.push('<div class="mb-2">');
    if (lemma) parts.push(`<div class="small"><strong>Lema</strong> <span class="hebrew">${escapeHtml(lemma)}</span></div>`);
    if (transliteration) parts.push(`<div class="small"><strong>Transliteración</strong> ${escapeHtml(transliteration)}</div>`);
    if (gloss) parts.push(`<div class="small"><strong>Definición</strong> ${escapeHtml(gloss)}</div>`);
    parts.push('</div>');

    // A. Morfología completa: Estado constructo (Est. cstr.), formas con sufijos, plurales (tal como en el diccionario)
    const constructForms = [];
    const suffixForms = [];
    const pluralForms = [];
    const headwordLower = (headwordLine || '').toLowerCase();
    const hasEstCstr = /Est\.?\s*cstr\.?|estado\s*constructo|constructo/i.test(headwordLine || '');

    if (headwordLine) {
      const segments = headwordLine.split(/\s*[;,\]\[]\s*/).filter(Boolean);
      for (const seg of segments) {
        const s = seg.trim();
        if (!s) continue;
        if (/\bc\.?\s*suf\.?|suf\.|suffix\b/i.test(s) || (s.includes('suf') && !/cstr|construct|pl\.|plural/i.test(s))) suffixForms.push(s);
        else if (/\bcstr\.?|construct|Est\.\s*cstr\.?/i.test(s) || /construct/i.test(s)) constructForms.push(s);
        else if (/\bpl\.?|plural|P1\.|P\.\s*1\b/i.test(s)) pluralForms.push(s);
        else if (/[\u0590-\u05FF]/.test(s)) {
          if (suffixForms.length > 0 && !pluralForms.length) suffixForms.push(s);
          else if (pluralForms.length > 0) pluralForms.push(s);
          else if (constructForms.length > 0) constructForms.push(s);
          else constructForms.push(s);
        }
      }
      if (constructForms.length === 0 && suffixForms.length === 0 && pluralForms.length === 0 && headwordLine)
        constructForms.push(headwordLine);
    }
    if (formas.length) {
      formas.forEach((f) => {
        const str = String(f).trim();
        if (!str) return;
        if (/\bc\.?\s*suf\.?|suf\./i.test(str)) suffixForms.push(str);
        else if (/\bcstr\.?|construct/i.test(str)) constructForms.push(str);
        else if (/\bpl\.?|plural/i.test(str)) pluralForms.push(str);
        else if (/[\u0590-\u05FF]/.test(str)) suffixForms.push(str);
        else constructForms.push(str);
      });
    }

    const anyMorph = constructForms.length || suffixForms.length || pluralForms.length || headwordLine || headwordTokens.length;
    if (anyMorph) {
      parts.push('<div class="mb-2"><div class="fw-semibold small mb-1">Formas morfológicas</div><div class="ms-2">');
      if (hasEstCstr || constructForms.length) {
        parts.push(`<div class="small mb-1"><strong>Estado constructo (Est. cstr.)</strong> <span class="hebrew">${constructForms.length ? escapeHtml(constructForms.join(', ')) : (headwordLine ? escapeHtml(headwordLine) : '—')}</span></div>`);
      }
      if (suffixForms.length) parts.push(`<div class="small mb-1"><strong>Formas con sufijos</strong> <span class="hebrew">${escapeHtml(suffixForms.join(', '))}</span></div>`);
      if (pluralForms.length) parts.push(`<div class="small mb-1"><strong>Formas de plural</strong> <span class="hebrew">${escapeHtml(pluralForms.join(', '))}</span></div>`);
      if (headwordTokens.length && !constructForms.length && !suffixForms.length && !pluralForms.length)
        parts.push(`<div class="small mb-1"><strong>Formas</strong> <span class="hebrew">${escapeHtml(headwordTokens.join(', '))}</span></div>`);
      if (headwordLine && (constructForms.length || suffixForms.length || pluralForms.length)) parts.push(`<div class="small muted mb-1">${escapeHtml(headwordLine)}</div>`);
      parts.push('</div></div>');
    }

    // Sentidos semánticos: A. B. 1. 2. 3. a) b) con referencias bíblicas
    if (text) {
      const phraseologyIdx = text.search(/\bFraseología\./i);
      const phraseology = phraseologyIdx >= 0 ? text.slice(phraseologyIdx).trim() : '';
      const bodyText = phraseologyIdx >= 0 ? text.slice(0, phraseologyIdx).trim() : text;

      const sections = [];
      const majorSplit = bodyText.split(/\n(?=[A-Z]\.\s)/).filter(Boolean);
      if (majorSplit.length === 0) {
        if (bodyText) sections.push({ type: 'intro', content: bodyText });
      } else {
        for (let i = 0; i < majorSplit.length; i++) {
          const block = majorSplit[i].trim();
          const topMatch = block.match(/^([A-Z]\.)\s+([^\n]+)/);
          if (!topMatch) {
            if (block) sections.push({ type: 'intro', content: block });
            continue;
          }
          const sectionTitle = topMatch[1] + ' ' + topMatch[2].trim();
          const sectionBody = block.slice(topMatch[0].length).trim();
          const subs = [];
          const numRe = /\n(\d+)\.\s+([\s\S]*?)(?=\n\d+\.\s|\n[A-Z]\.\s|$)/g;
          let last = 0;
          let numM;
          while ((numM = numRe.exec(sectionBody)) !== null) {
            if (numM.index > last) subs.push({ type: 'p', content: sectionBody.slice(last, numM.index).trim() });
            const numContent = numM[2].trim();
            const letterRe = /\n([a-z]\))\s+([^\n]+(?:\n(?!\d+\.\s|[a-z]\)\s)[^\n]*)*)/g;
            const letterMatches = [];
            let letterLast = 0;
            let letterM;
            while ((letterM = letterRe.exec('\n' + numContent)) !== null) {
              const sliceStart = letterLast > 0 ? letterLast - 1 : 0;
              if (letterM.index > letterLast) letterMatches.push({ type: 'p', content: numContent.slice(sliceStart, letterM.index - 1).trim() });
              letterMatches.push({ type: 'letter', letter: letterM[1], content: letterM[2].trim() });
              letterLast = letterM.index + letterM[0].length;
            }
            if (letterMatches.length > 0) {
              const firstPart = letterLast <= 1 ? '' : numContent.slice(0, letterLast - 1).trim();
              subs.push({ type: 'num', num: numM[1], content: firstPart || null, children: letterMatches });
            } else {
              subs.push({ type: 'num', num: numM[1], content: numContent, children: null });
            }
            last = numM.index + numM[0].length;
          }
          if (last < sectionBody.length) subs.push({ type: 'p', content: sectionBody.slice(last).trim() });
          sections.push({ type: 'major', title: sectionTitle, subs });
        }
      }

      if (sections.length || bodyText) {
        const bodyHtml = [];
        for (const sec of sections) {
          if (sec.type === 'intro' && sec.content) bodyHtml.push(`<div class="small mb-1">${escapeHtml(sec.content)}</div>`);
          else if (sec.type === 'major') {
            bodyHtml.push(`<div class="fw-semibold small mt-2 mb-1">${escapeHtml(sec.title)}</div>`);
            for (const sub of sec.subs) {
              if (sub.type === 'p' && sub.content) bodyHtml.push(`<div class="small ms-2 mb-1">${escapeHtml(sub.content)}</div>`);
              else if (sub.type === 'num') {
                if (sub.children && sub.children.length) {
                  if (sub.content) bodyHtml.push(`<div class="small ms-3 mb-1"><strong>${escapeHtml(sub.num)}.</strong> ${escapeHtml(sub.content)}</div>`);
                  for (const ch of sub.children) {
                    if (ch.type === 'p' && ch.content) bodyHtml.push(`<div class="small ms-4 mb-1">${escapeHtml(ch.content)}</div>`);
                    else if (ch.type === 'letter') bodyHtml.push(`<div class="small ms-4 mb-1">${escapeHtml(ch.letter)} ${escapeHtml(ch.content)}</div>`);
                  }
                } else bodyHtml.push(`<div class="small ms-3 mb-1"><strong>${escapeHtml(sub.num)}.</strong> ${escapeHtml(sub.content || '')}</div>`);
              }
              else if (sub.type === 'letter') bodyHtml.push(`<div class="small ms-4 mb-1">${escapeHtml(sub.letter)} ${escapeHtml(sub.content)}</div>`);
            }
          }
        }
        if (bodyHtml.length === 0 && bodyText) bodyHtml.push(`<div class="small">${escapeHtml(bodyText)}</div>`);
        const senseHtml = bodyHtml.join('');
        parts.push('<div class="mb-2"><div class="fw-semibold small mb-1">Sentidos y uso</div><div class="ms-2">');
        parts.push(senseHtml);
        parts.push('</div></div>');
      }

      if (phraseology) {
        parts.push('<div class="mb-2"><div class="fw-semibold small mb-1">Fraseología</div><div class="ms-2">');
        parts.push(`<div class="small">${escapeHtml(phraseology)}</div>`);
        parts.push('</div></div>');
      }
    }

    // Si no hubo text pero sí otras claves (unificado), mostrar campos restantes como bloque
    const shown = new Set(['text', 'headword_line', 'headword_tokens', 'gloss_es', 'lemma', 'transliteration', 'transliteracion', 'definition', 'definicion', 'descripcion', 'formas', 'glosas', 'morfs', 'morphs']);
    const restKeys = Object.keys(fields || {}).filter((k) => !shown.has(k) && fields[k] !== undefined && fields[k] !== null && String(fields[k]).trim() !== '' && String(fields[k]) !== '—');
    if (restKeys.length && !text) {
      parts.push('<div class="small mt-2">');
      restKeys.sort().forEach((k) => { parts.push(`<div><strong>${escapeHtml(k)}</strong> ${escapeHtml(String(fields[k]))}</div>`); });
      parts.push('</div>');
    }

    return parts.join('');
  }

   async function loadIndex(lang) {
     if (state.indexes[lang]) return state.indexes[lang];
     const data = await loadJson(SEARCH_INDEX[lang]);
     state.indexes[lang] = data;
     return data;
   }
 
   async function loadChapterText(lang, book, chapter) {
     const key = `${lang}/${book}/${chapter}`;
     if (state.textCache.has(key)) return state.textCache.get(key);
     const url = `${TEXT_BASE}/${lang}/${book}/${chapter}.json`;
     const data = await loadJson(url);
     state.textCache.set(key, data);
     return data;
   }
 
  async function loadLxxFile(file) {
    if (state.lxxFileCache.has(file)) return state.lxxFileCache.get(file);
    const res = await fetch(`./LXX/${file}`);
    if (!res.ok) throw new Error(`No se pudo cargar ${file}`);
    const data = await res.json();
    state.lxxFileCache.set(file, data);
    return data;
  }
async function loadLxxBookData(bookCode) {
    if (state.lxxBookCache.has(bookCode)) return state.lxxBookCache.get(bookCode);
    for (const file of LXX_FILES) {
      try {
        const data = await loadLxxFile(file);
        if (data?.text?.[bookCode]) {
          state.lxxBookCache.set(bookCode, data);
          return data;
        }
      } catch (error) {
        continue;
      }
    }
    state.lxxBookCache.set(bookCode, null);
    return null;
  }

  async function loadLxxVerseTokens(bookCode, chapter, verse) {
    const key = `${bookCode}|${chapter}|${verse}`;
    if (state.lxxVerseCache.has(key)) return state.lxxVerseCache.get(key);
    const data = await loadLxxBookData(bookCode);
    const tokens = data?.text?.[bookCode]?.[chapter]?.[verse] || null;
    state.lxxVerseCache.set(key, tokens);
    return tokens;
  }
  async function loadLxxBookStats(bookCode) {
    if (state.lxxBookStatsCache.has(bookCode)) return state.lxxBookStatsCache.get(bookCode);
    const data = await loadLxxBookData(bookCode);
    const verseFreq = new Map();
    let totalVerses = 0;
    const chapters = data?.text?.[bookCode] || {};
    Object.values(chapters).forEach((verses) => {
      Object.values(verses || {}).forEach((tokens) => {
        totalVerses += 1;
        const verseLemmas = new Set();
        (tokens || []).forEach((token) => {
          const normalized = normalizeGreek(token?.lemma || token?.w || '');
          if (!normalized || greekStopwords.has(normalized)) return;
          verseLemmas.add(normalized);
        });
        verseLemmas.forEach((lemma) => {
          verseFreq.set(lemma, (verseFreq.get(lemma) || 0) + 1);
        });
      });
    });
    const stats = { totalVerses, verseFreq };
    state.lxxBookStatsCache.set(bookCode, stats);
    return stats;
  }

  async function rankGreekCandidatesByLxxStats(counts, samples, usedBooks) {
    if (!counts.size) return null;
    let totalVerses = 0;
    const verseFreq = new Map();
    for (const bookCode of usedBooks) {
      const stats = await loadLxxBookStats(bookCode);
      totalVerses += stats.totalVerses;
      stats.verseFreq.forEach((count, lemma) => {
        verseFreq.set(lemma, (verseFreq.get(lemma) || 0) + count);
      });
    }
    if (!totalVerses) return pickBestCandidate(counts, samples);
    const ranked = [...counts.entries()].map(([lemma, hits]) => {
      const df = verseFreq.get(lemma) || 0;
      const score = hits * Math.log((totalVerses + 1) / (df + 1));
      return { lemma, hits, score };
    }).sort((a, b) => (b.score - a.score) || (b.hits - a.hits));
    const best = ranked[0];
    if (!best) return null;
    return {
      normalized: best.lemma,
      lemma: samples.get(best.lemma) || best.lemma,
      count: best.hits
    };
  }
  function transliterateHebrew(word) {
    if (!word) return '—';
    const consonants = {
      'א': '',
      'ב': 'b',
      'ג': 'g',
      'ד': 'd',
      'ה': 'h',
      'ו': 'v',
      'ז': 'z',
      'ח': 'j',
      'ט': 't',
      'י': 'y',
      'כ': 'k',
      'ך': 'k',
      'ל': 'l',
      'מ': 'm',
      'ם': 'm',
      'נ': 'n',
      'ן': 'n',
      'ס': 's',
      'ע': '\'',
      'פ': 'p',
      'ף': 'p',
      'צ': 'ts',
      'ץ': 'ts',
      'ק': 'q',
      'ר': 'r',
      'ש': 'sh',
      'ת': 't'
    };
    const vowelMap = {
      '\u05B0': 'e',
      '\u05B1': 'e',
      '\u05B2': 'a',
      '\u05B3': 'a',
      '\u05B4': 'i',
      '\u05B5': 'e',
      '\u05B6': 'e',
      '\u05B7': 'a',
      '\u05B8': 'a',
      '\u05B9': 'o',
      '\u05BB': 'u',
      '\u05C7': 'o'
    };
    const decomposed = word.normalize('NFD');
    let output = '';
     for (let i = 0; i < decomposed.length; i += 1) {
      const char = decomposed[i];
      if (!consonants.hasOwnProperty(char)) {
        const vowel = vowelMap[char];
        if (vowel) output += vowel;
        continue;
      }
      let consonant = consonants[char];
      let j = i + 1;
      let vowel = '';
      let hasShinDot = false;
      let hasSinDot = false;
      while (j < decomposed.length && /[\u0591-\u05C7]/.test(decomposed[j])) {
        if (decomposed[j] === '\u05C1') hasShinDot = true;
        if (decomposed[j] === '\u05C2') hasSinDot = true;
        vowel = vowelMap[decomposed[j]] || '';
        j += 1;
      }
      if (char === 'ש') {
        consonant = hasSinDot ? 's' : 'sh';
      }
      if (char === 'ו' && vowel) {
        consonant = '';
      }
      output = `${consonant}${vowel}`;
    }
    return output.replace(/''/g, '\'').trim() || '—';
  }

  function getGreekTransliterationFromEntry(entry, fallbackLemma) {
    const raw =
      entry?.['Forma lexica'] ||
      entry?.Forma_lexica ||
      entry?.translit ||
      entry?.transliteracion ||
      entry?.transliteration ||
      '';
    const trimmed = String(raw).trim();
    if (trimmed && trimmed !== '—' && trimmed !== '-') return trimmed;

    const source = (entry?.lemma || fallbackLemma || '').trim();
    if (!source) return '';

    const auto = transliterateGreek(source);
    return auto && auto !== '—' ? auto : '';
  }

  function getHebrewTransliterationFromEntry(entry, fallbackWord) {
    if (!entry && !fallbackWord) return '';
    const raw =
      entry?.translit ||
      entry?.transliteracion ||
      entry?.strong_detail?.transliteracion ||
      '';
    const trimmed = String(raw).trim();
    if (trimmed && trimmed !== '—' && trimmed !== '-') return trimmed;

    const word = (entry?.lemma || entry?.hebreo || entry?.palabra || fallbackWord || '').trim();
    if (!word) return '';

    const auto = transliterateHebrew(word);
    return auto && auto !== '—' ? auto : '';
  }

  async function buildLxxMatches(normalizedGreek, maxRefs = 40) {
    if (!normalizedGreek) return { refs: [], texts: new Map() };
    if (state.lxxSearchCache.has(normalizedGreek)) return state.lxxSearchCache.get(normalizedGreek);
    const refs = [];
    const texts = new Map();
    for (const file of LXX_FILES) {
      if (refs.length >= maxRefs) break;
      try {
        const data = await loadLxxFile(file);
        const text = data?.text || {};
        for (const [book, chapters] of Object.entries(text)) {
          for (const [chapter, verses] of Object.entries(chapters || {})) {
            for (const [verse, tokens] of Object.entries(verses || {})) {
              const hit = (tokens || []).some((token) => {
                const lemmaKey = normalizeGreek(token?.lemma || '');
                const wordKey = normalizeGreek(token?.w || '');
                return lemmaKey === normalizedGreek || wordKey === normalizedGreek;
              });
              if (!hit) continue;
              const ref = `${book}|${chapter}|${verse}`;
              if (!texts.has(ref)) {
                const verseText = (tokens || []).map((token) => token.w).join(' ');
                refs.push(ref);
                texts.set(ref, verseText);
              }
              if (refs.length >= maxRefs) break;
            }
            if (refs.length >= maxRefs) break;
          }
          if (refs.length >= maxRefs) break;
        }
      } catch (error) {
        continue;
      }
    }
    const payload = { refs, texts };
    state.lxxSearchCache.set(normalizedGreek, payload);
    return payload;
  }

   function pickBestCandidate(counts, samples) {
    if (!counts.size) return null;
    const [best, count] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    return {
      normalized: best,
      lemma: samples.get(best) || best,
      count
    };
  }

  function cleanGreekToken(token) {
    return String(token || '').replace(/[··.,;:!?“”"(){}\[\]<>«»]/g, '');
  }

  async function buildGreekCandidateFromHebrewRefs(refs) {
    if (!refs.length) return null;
    const counts = new Map();
    const samples = new Map();
   const usedBooks = new Set();
    for (const ref of refs.slice(0, 40)) {
      const [slug, chapterRaw, verseRaw] = ref.split('|');
      const chapter = Number(chapterRaw);
      const verse = Number(verseRaw);
      const lxxCodes = HEBREW_SLUG_TO_LXX[slug] || [];
      for (const lxxCode of lxxCodes) {
        const tokens = await loadLxxVerseTokens(lxxCode, chapter, verse);
        if (!tokens) continue;
       usedBooks.add(lxxCode);
        const verseLemmas = new Set();
        tokens.forEach((token) => {
          const lemma = token?.lemma || token?.w || '';
          const normalized = normalizeGreek(lemma);
          if (!normalized) return;
          if (greekStopwords.has(normalized)) return;
         verseLemmas.add(normalized);
          if (!samples.has(normalized) && token?.lemma) samples.set(normalized, token.lemma);
        });
        verseLemmas.forEach((lemma) => {
          counts.set(lemma, (counts.get(lemma) || 0) + 1);
        });
      }
    }
   return rankGreekCandidatesByLxxStats(counts, samples, usedBooks);
  }

  async function buildGreekCandidateFromGreekRefs(refs) {
    if (!refs.length) return null;
    const counts = new Map();
    const samples = new Map();
   const usedBooks = new Set();
    for (const ref of refs.slice(0, 40)) {
      const [book, chapterRaw, verseRaw] = ref.split('|');
      const chapter = Number(chapterRaw);
      const verse = Number(verseRaw);
      try {
        const verses = await loadChapterText('gr', book, chapter);
        const verseText = verses?.[verse - 1] || '';
        const tokens = verseText.split(/\s+/).filter(Boolean);
        tokens.forEach((token) => {
          const cleaned = cleanGreekToken(token);
          const normalized = normalizeGreek(cleaned);
          if (!normalized || greekStopwords.has(normalized)) return;
          counts.set(normalized, (counts.get(normalized) || 0) + 1);
          if (!samples.has(normalized)) samples.set(normalized, cleaned);
        });
      } catch (error) {
        continue;
      }
    }
    return pickBestCandidate(counts, samples);
  }

  async function buildGreekCandidateFromLxxRefs(refs) {
    if (!refs.length) return null;
    const counts = new Map();
    const samples = new Map();
    const usedBooks = new Set();
    for (const ref of refs.slice(0, 40)) {
      const [book, chapterRaw, verseRaw] = ref.split('|');
      const chapter = Number(chapterRaw);
      const verse = Number(verseRaw);
      const tokens = await loadLxxVerseTokens(book, chapter, verse);
      if (!tokens) continue;
      usedBooks.add(book);
      const verseLemmas = new Set();
      tokens.forEach((token) => {
        const lemma = token?.lemma || token?.w || '';
        const normalized = normalizeGreek(lemma);
        if (!normalized || greekStopwords.has(normalized)) return;
        verseLemmas.add(normalized);
        if (!samples.has(normalized) && token?.lemma) samples.set(normalized, token.lemma);
      });
     verseLemmas.forEach((lemma) => {
        counts.set(lemma, (counts.get(lemma) || 0) + 1);
      });
    }
    return rankGreekCandidatesByLxxStats(counts, samples, usedBooks);
  }

  function extractPos(entry) {
     if (!entry) return '—';
     const raw = entry.entrada_impresa || entry['Printed_entry'] || '';
     if (!raw) return '—';
     const parts = raw.split('.');
     if (parts.length < 2) return raw.trim();
     return parts[1].trim() || '—';
   }
 
   function shortDefinition(text) {
     if (!text) return '';
     const trimmed = text.replace(/\s/g, ' ').trim();
     const split = trimmed.split('. ');
     return split[0] || trimmed;
   }
 
   function keywordList(text) {
     if (!text) return [];
     const cleaned = text
       .replace(/[()]/g, ' ')
       .replace(/[^a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]/g, ' ')
       .toLowerCase();
     const words = cleaned.split(/\s/).filter(Boolean);
     const keywords = [];
     for (const word of words) {
       if (stopwords.has(word)) continue;
       if (!keywords.includes(word)) keywords.push(word);
       if (keywords.length >= 6) break;
     }
    return keywords;
  }

  function extractSpanishTokensFromDefinition(definition) {
    if (!definition) return [];
    const cleaned = definition
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zñ\s]/g, ' ');
    const words = cleaned.split(/\s+/).filter((word) => word.length >= 3);
    const extraStopwords = new Set([
      'lit', 'nt', 'lxx', 'pl', 'sg', 'adj', 'adv', 'pron', 'conj', 'prep',
      'part', 'indecl', 'num', 'prop', 'pers', 'rel', 'dem', 'interj', 'fig',
      'met', 'art'
    ]);
    const tokens = [];
    words.forEach((word) => {
      if (stopwords.has(word) || extraStopwords.has(word)) return;
      if (!tokens.includes(word)) tokens.push(word);
    });
    return tokens;
  }
 
  function splitRefsByTestament(refs) {
    const ot = [];
    const nt = [];
    refs.forEach((ref) => {
      const [book] = ref.split('|');
      if (NT_BOOKS.has(book)) {
        nt.push(ref);
      } else {
        ot.push(ref);
      }
    });
    return { ot, nt };
  }

function mapOtRefsToLxxRefs(refs) {
    return refs
      .flatMap((ref) => {
        const [book, chapter, verse] = ref.split('|');
        const lxxCodes = HEBREW_SLUG_TO_LXX[book] || [];
        return lxxCodes.map((code) => `${code}|${chapter}|${verse}`);
      })
      .filter(Boolean);
  }
function mapLxxRefsToHebrewRefs(refs) {
    return refs
      .map((ref) => {
        const [book, chapter, verse] = ref.split('|');
        const slug = LXX_TO_HEBREW_SLUG[book];
        if (!slug) return null;
        return `${slug}|${chapter}|${verse}`;
      })
      .filter(Boolean);
  }

  async function buildHebrewCandidateFromRefs(refs) {
    const counts = new Map();
    const samples = new Map();
    const limitedRefs = refs.slice(0, 40);
    for (const ref of limitedRefs) {
      const [book, chapterRaw, verseRaw] = ref.split('|');
      const chapter = Number(chapterRaw);
      const verse = Number(verseRaw);
      try {
        const verses = await loadChapterText('he', book, chapter);
        const verseText = verses?.[verse - 1] || '';
        const tokens = verseText.split(/\s/).filter(Boolean);
        tokens.forEach((token) => {
          const cleaned = token.replace(/[׃,:;.!?()"“”]/g, '');
          const normalized = normalizeHebrew(cleaned);
          if (!normalized || hebrewStopwords.has(normalized)) return;
          counts.set(normalized, (counts.get(normalized) || 0) + 1);
          if (!samples.has(normalized)) samples.set(normalized, cleaned);
        });
      } catch (error) {
        continue;
      }
    }
    const candidate = pickBestCandidate(counts, samples);
    if (!candidate) return null;
    const word = candidate.lemma || candidate.normalized;
    return {
      normalized: candidate.normalized,
      word,
      transliteration: transliterateHebrew(word),
      count: candidate.count
    };
  }

   async function buildHebrewCandidateFromLxxRefs(refs) {
    const mappedRefs = refs
      .map((ref) => {
        const [book, chapter, verse] = ref.split('|');
        const slug = LXX_TO_HEBREW_SLUG[book];
        if (!slug) return null;
        return `${slug}|${chapter}|${verse}`;
      })
      .filter(Boolean);
    return buildHebrewCandidateFromRefs(mappedRefs);
  }

  function groupForBook(book) {
     const slug = LXX_TO_HEBREW_SLUG[book] || book;
     if (TORAH.includes(slug)) return { key: 'torah', label: 'Torah' };
    if (HISTORICAL.includes(slug)) return { key: 'historicos', label: 'Históricos' };
     if (WISDOM.includes(slug)) return { key: 'sabiduria', label: 'Sabiduría' };
     if (PROPHETS.includes(slug)) return { key: 'profetas', label: 'Profetas' };
     if (GOSPELS.includes(slug)) return { key: 'evangelios', label: 'Evangelios' };
     if (LETTERS.includes(slug)) return { key: 'cartas', label: 'Cartas' };
     if (APOCALYPSE.includes(slug)) return { key: 'apocalipsis', label: 'Apocalipsis' };
     return { key: 'otros', label: 'Otros' };
   }

  function prettyBookLabel(book) {
     return (book || '').replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
   }

   function buildBookCountRows(refs) {
     const counts = new Map();
     refs.forEach((ref) => {
       const [book] = String(ref || '').split('|');
       if (!book) return;
       const slug = LXX_TO_HEBREW_SLUG[book] || book;
       counts.set(slug, (counts.get(slug) || 0) + 1);
     });
     return [...counts.entries()]
       .map(([book, count]) => ({ book, label: prettyBookLabel(book), count }))
       .sort((a, b) => b.count - a.count);
   }
   function formatRef(book, chapter, verse) {
     const bookLabel = prettyBookLabel(book);
    return `${bookLabel} ${chapter}:${verse}`;
   }
 
    function classForLang(lang) {
    if (lang === 'gr' || lang === 'lxx') return 'greek';
     if (lang === 'he') return 'hebrew';
     return 'mono';
   }
 
   function renderTags(tags) {
     lemmaTags.innerHTML = '';
     tags.forEach((tag) => {
       const span = document.createElement('span');
       span.className = 'tag';
       span.innerHTML = tag;
       lemmaTags.appendChild(span);
     });
   }
 
   function renderExamples(cards) {
     lemmaExamples.innerHTML = '';
     cards.forEach((card) => {
       const div = document.createElement('div');
       div.className = 'example-card';
       div.innerHTML = card;
       lemmaExamples.appendChild(div);
     });
   }
 
  function renderCorrespondence(cards) {
    lemmaCorrespondence.innerHTML = '';
    if (!cards.length) {
      lemmaCorrespondence.innerHTML = '<div class="small muted">Sin correspondencias disponibles.</div>';
      return;
    }
    cards.forEach((card) => {
      const div = document.createElement('div');
      div.className = 'example-card';
      div.innerHTML = card;
      lemmaCorrespondence.appendChild(div);
   });
  }

  function renderSingleWordInputError(term) {
    renderTags([
      `Entrada: <span class="fw-semibold">${escapeHtml(term)}</span>`,
      'Estado: <span class="fw-semibold text-danger">Error de validación</span>'
    ]);
    lemmaSummary.innerHTML = '<div class="lemma-summary-block"><div class="summary-line"><span class="muted">Solo se aceptan entradas de una sola palabra en el análisis textual.</span></div></div>';
    renderCorrespondence([]);
    renderExamples([]);
    occurrenceDonut?.setData({ es: [], he: [], gr: [] });
    deepLexicalAnalysis.innerHTML = '<div class="col-12"><div class="small muted">Corrige la consulta: usa una sola palabra (sin frases).</div></div>';
  }
 
  async function buildSamplesForRefs(refs, lang, max = 3, preloadedTexts = null) {
    const samples = [];
    for (const ref of refs.slice(0, max)) {
      const [book, chapterRaw, verseRaw] = ref.split('|');
      const chapter = Number(chapterRaw);
      const verse = Number(verseRaw);
      let verseText = '';
      if (preloadedTexts?.has?.(ref)) {
        verseText = preloadedTexts.get(ref) || '';
      } else {
        try {
          const verses = await loadChapterText(lang, book, chapter);
          verseText = verses?.[verse - 1] || '';
        } catch (error) {
          verseText = 'Texto no disponible.';
        }
      }
      samples.push({
        ref: formatRef(book, chapter, verse),
        text: verseText
      });
    }
    return samples;
  }

  // Transliteración desactivada: no se muestra en las tarjetas de correspondencia.
  function buildCorrespondenceCard({ title, word, transliteration, samples, lang, highlightQuery }) {
    const wordLine = word
      ? `<div class="${classForLang(lang)} fw-semibold">${highlightText(word, highlightQuery, lang)}</div>`
      : '<div class="muted">—</div>';
    const sampleLines = samples?.length
      ? samples.map((sample) => `<div class="small">${escapeHtml(sample.ref)} · ${highlightText(sample.text, highlightQuery, lang)}</div>`).join('')
      : '<div class="small muted">Sin ejemplos.</div>';
    return `
      <div class="fw-semibold">${title}</div>
      ${wordLine}
      <div class="mt-1 d-grid gap-1">${sampleLines}</div>
    `;
  }

  function cleanHebrewToken(token) {
    return String(token || '')
      .replace(/[׃.,;:!?"“”(){}\[\]<>«»]/g, '')
      .replace(/[\u05BE\-\u2010-\u2015\u2212]/g, ' ');
  }

   function tokenizeGreekText(text) {
    return String(text || '')
      .split(/\s+/)
      .map((token) => cleanGreekToken(token))
      .filter(Boolean);
  }

    function tokenizeHebrewText(text) {
    return String(text || '')
      .split(/\s+/)
      .flatMap((token) => cleanHebrewToken(token).split(/\s+/))
      .filter(Boolean);
  }

  function describeMorphTag(tag) {
    const raw = String(tag || '').trim();
    if (!raw) return '—';
    const posMap = {
      N: 'Sustantivo',
      V: 'Verbo',
      A: 'Adjetivo',
      D: 'Adverbio',
      P: 'Preposición',
      C: 'Conjunción',
      T: 'Artículo',
      I: 'Interjección',
      X: 'Partícula',
      M: 'Numeral',
      RP: 'Pronombre personal',
      RA: 'Pronombre/artículo',
      RD: 'Pronombre demostrativo',
      RI: 'Pronombre interrogativo',
      RR: 'Pronombre relativo'
    };
    const caseMap = { N: 'Nominativo', G: 'Genitivo', D: 'Dativo', A: 'Acusativo', V: 'Vocativo' };
    const numMap = { S: 'Singular', P: 'Plural', D: 'Dual' };
    const genMap = { M: 'Masculino', F: 'Femenino', N: 'Neutro' };
    const tenseMap = { P: 'Presente', I: 'Imperfecto', F: 'Futuro', A: 'Aoristo', X: 'Perfecto', Y: 'Pluscuamperfecto' };
    const voiceMap = { A: 'Activa', M: 'Media', P: 'Pasiva' };
    const moodMap = { I: 'Indicativo', S: 'Subjuntivo', O: 'Optativo', M: 'Imperativo', N: 'Infinitivo', P: 'Participio' };

    const nounMatch = raw.match(/^([A-Z]{1,2})\.([NGDAV])([SPD])([MFN])$/);
    if (nounMatch) {
      const [, posCode, caseCode, numCode, genCode] = nounMatch;
      const parts = [posMap[posCode] || posCode, caseMap[caseCode], numMap[numCode], genMap[genCode]].filter(Boolean);
      return `${parts.join(' · ')} (${raw})`;
    }

    const pronounMatch = raw.match(/^([A-Z]{1,2})\.([NGDAV])([SP])([MFN]?)$/);
    if (pronounMatch) {
      const [, posCode, caseCode, numCode, genCode] = pronounMatch;
      const parts = [posMap[posCode] || posCode, caseMap[caseCode], numMap[numCode], genMap[genCode]].filter(Boolean);
      return `${parts.join(' · ')} (${raw})`;
    }

    const verbMatch = raw.match(/^V\.([PIFAXY])([AMP])([ISOMNP])([123]?)([SPD]?)$/);
    if (verbMatch) {
      const [, tenseCode, voiceCode, moodCode, personCode, numCode] = verbMatch;
      const person = personCode ? `${personCode}ª persona` : '';
      const parts = ['Verbo', tenseMap[tenseCode], voiceMap[voiceCode], moodMap[moodCode], person, numMap[numCode]].filter(Boolean);
      return `${parts.join(' · ')} (${raw})`;
    }

    return posMap[raw] ? `${posMap[raw]} (${raw})` : raw;
  }
  function buildGreekLexicalRoot(normalizedLemma) {
    const endings = ['ων','ους','ουσ','οις','αις','ειν','εις','ας','ης','ος','οι','αι','ον','ην','ου','ω'];
    for (const ending of endings) {
      if (normalizedLemma.endsWith(ending) && normalizedLemma.length - ending.length >= 3) {
        return normalizedLemma.slice(0, -ending.length);
      }
    }
    return normalizedLemma.slice(0, Math.min(4, normalizedLemma.length));
  }

          function buildHebrewLexicalRoot(baseLemma) {
    const consonants = normalizeHebrew(baseLemma || '');
    return consonants.slice(0, Math.min(3, consonants.length || 0));
  }

  // --- Distribución contextual automática eliminada: no se usan reglas heurísticas de contexto. ---

  async function buildDeepLexicalModules({ lang, normalizedLemma, displayLemma, grRefs, heRefs, lxxRefs, greekNormalizedLemma, hebrewNormalizedLemma }) {
    const formStats = new Map();
    const lexicalCandidates = new Map();

    const pushForm = (form, source, morph = '', count = 1) => {
      const key = `${source}::${form}::${morph}`;
      const current = formStats.get(key) || { form, source, morph, count: 0 };
      current.count += count;
      formStats.set(key, current);
    };

    if (lang === 'gr' || lxxRefs.length) {
      const grIndex = await loadIndex('gr');
      await loadDictionary();
      await loadDictionaryGUnificado();
      const greekEntries = [
        ...(Array.isArray(state.dict?.items) ? state.dict.items : []),
        ...(Array.isArray(state.dictGUnificado) ? state.dictGUnificado : [])
      ];
      const seenForms = new Set();
      greekEntries.forEach((item) => {
        if (normalizeGreek(item?.lemma || '') !== normalizedLemma) return;
        const form = item?.['Forma flexionada del texto'] || item?.forma || item?.lemma || '';
        const normalizedForm = normalizeGreek(form);
        if (!normalizedForm || seenForms.has(normalizedForm)) return;
        seenForms.add(normalizedForm);
        const refs = grIndex.tokens?.[normalizedForm] || [];
        const count = refs.length;
        if (!count) return;
        pushForm(form, 'RKANT (base completa)', '', count);
      });

      for (const file of LXX_FILES) {
        try {
          const data = await loadLxxFile(file);
          Object.entries(data?.text || {}).forEach(([bookCode, chapters]) => {
            Object.values(chapters || {}).forEach((verses) => {
              Object.values(verses || {}).forEach((tokens) => {
                (tokens || []).forEach((token) => {
                  if (normalizeGreek(token?.lemma || '') !== normalizedLemma) return;
                  const form = token?.w || token?.lemma || '';
                  const morph = token?.morph || '';
                  pushForm(form, 'LXX (base completa)', morph, 1);
                });
              });
            });
          });
        } catch (error) {
          continue;
        }
      }
    }

    if (lang === 'he') {
      await loadHebrewDictionary();
      const heIndex = await loadIndex('he');
      const formSet = new Set([
        hebrewStopwords.has(displayLemma) ? '' : displayLemma,
        ...(state.hebrewDictMap.get(normalizedLemma)?.forms || []),
        ...(state.hebrewDictMap.get(normalizedLemma)?.formas || [])
      ].filter(Boolean));
      formSet.forEach((form) => {
        const normalizedForm = normalizeHebrew(form);
        const refs = heIndex.tokens?.[normalizedForm] || [];
        const count = refs.length;
        if (!count) return;
        formStats.set(`Hebreo (base completa)::${form}::`, { form, source: 'Hebreo (base completa)', morph: '', count });
      });
    }

    if (lang === 'es') {
      const esIndex = await loadIndex('es');
      const normalizedEs = normalizeSpanish(displayLemma);
      const refs = esIndex.tokens?.[normalizedEs] || [];
      const count = refs.length;
      if (count) {
        formStats.set(`Español (base completa)::${displayLemma}::`, {
          form: displayLemma,
          source: 'Español (base completa)',
          morph: '',
          count
        });
      }
    }

    const networkLang = lang === 'he' ? 'he' : 'gr';
    if (networkLang === 'gr') {
      await loadDictionary();
      await loadDictionaryGUnificado();
      const grIndex = await loadIndex('gr');
      const root = buildGreekLexicalRoot(normalizedLemma);
      const greekEntries = [
        ...(Array.isArray(state.dict?.items) ? state.dict.items : []),
        ...(Array.isArray(state.dictGUnificado) ? state.dictGUnificado : [])
      ];
      greekEntries.forEach((item) => {
        const lemmaNorm = normalizeGreek(item?.lemma || '');
        if (!lemmaNorm || lemmaNorm === normalizedLemma || lemmaNorm.length < 3) return;
        if (!lemmaNorm.startsWith(root) && !lemmaNorm.includes(root)) return;
        const total = (grIndex.tokens?.[lemmaNorm] || []).length;
        if (!total) return;
        if (!lexicalCandidates.has(lemmaNorm)) {
          lexicalCandidates.set(lemmaNorm, { lemma: item.lemma || item.Forma_lexica || lemmaNorm, count: total });
        }
      });
    } else {
      await loadHebrewDictionary();
      const heIndex = await loadIndex('he');
      const root = buildHebrewLexicalRoot(displayLemma);
      (state.hebrewDict || []).forEach((item) => {
        const lemma = item?.strong_detail?.lemma || item?.hebreo || '';
        const normalized = normalizeHebrew(lemma);
        if (!normalized || normalized === normalizedLemma) return;
        if (!normalized.startsWith(root) && !normalized.includes(root)) return;
        const total = (heIndex.tokens?.[normalized] || []).length || Number(item?.stats?.tokens || 0);
        if (!total) return;
        if (!lexicalCandidates.has(normalized)) {
          lexicalCandidates.set(normalized, { lemma, count: total });
        }
      });
    }

    const forms = [...formStats.values()].sort((a, b) => b.count - a.count);
    const sourceOrder = ['LXX (base completa)', 'Hebreo (base completa)', 'RKANT (base completa)', 'Español (base completa)'];
    const sourceLabels = {
      'LXX (base completa)': 'LXX',
      'Hebreo (base completa)': 'Hebreo',
      'RKANT (base completa)': 'RKANT',
      'Español (base completa)': 'RVR1960'
    };
    const formsBySource = sourceOrder.map((source) => {
      const rows = forms.filter((item) => item.source === source);
      const total = rows.reduce((acc, row) => acc + row.count, 0);
      return { source, label: sourceLabels[source] || source, rows, total };
    }).filter((item) => item.rows.length);

    const network = [...lexicalCandidates.values()].sort((a, b) => b.count - a.count).slice(0, 20);
    const totalOccurrences = forms.reduce((acc, row) => acc + row.count, 0);

    // Dictionary comparison: extract all fields dynamically (no hardcoded keys).
    const greekKey = greekNormalizedLemma ?? (lang === 'gr' ? normalizedLemma : null);
    let dictionaryA = {};
    if (greekKey) {
      await loadDictionary();
      await loadDictionaryGUnificado();
      const greekEntry = findGreekEntry(greekKey) || state.dictMap.get(greekKey) || state.dictGUnificadoMap.get(greekKey) || null;
      dictionaryA = greekEntry ? mergeDictionaryEntries(greekEntry, null) : {};
    }

    const hebrewKey = hebrewNormalizedLemma ?? (lang === 'he' ? normalizedLemma : null);
    let dictionaryB = {};
    if (hebrewKey) {
      await loadHebrewDictionary();
      await loadDicHebrewDictionary();
      const entryUnificado = findHebrewEntry(hebrewKey) || state.hebrewDictMap.get(hebrewKey) || null;
      const entryDic = getHebrewEntryFromDic(hebrewKey) || null;
      dictionaryB = mergeDictionaryEntries(entryUnificado, entryDic);
    }

    return {
      forms,
      formsBySource,
      network,
      totalOccurrences,
      dictionaryA: { label: 'Dictionary A – Greek', fields: dictionaryA },
      dictionaryB: { label: 'Dictionary B – Hebrew', fields: dictionaryB }
    };
  }
  function renderDeepLexicalAnalysis(modules) {
    deepLexicalAnalysis.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'col-12';

    if (!modules || (!modules.totalOccurrences && !(modules.forms || []).length)) {
     wrapper.innerHTML = '<div class="small muted">No hay datos suficientes para generar el análisis léxico profundo.</div>';
      deepLexicalAnalysis.appendChild(wrapper);
      return;
    }

    const correspondence = modules?.meta?.correspondence || {};
    const esWord = correspondence.es || '—';
    const heWord = correspondence.he || '—';
    const grWord = correspondence.gr || '—';
    const inputLemma = modules?.meta?.inputLemma || '—';
    const dictionarySource = modules?.meta?.dictionarySource || '—';

    const formsBySourceRows = (modules.formsBySource || []).map((group) => {
      const formsRows = group.rows.map((item) => `
        <tr>
          <td>${escapeHtml(item.form)}</td>
          <td>${item.count}</td>
          <td>${escapeHtml(describeMorphTag(item.morph || ''))}</td>
        </tr>
   `).join('');
      return `
        <details class="mb-2">
          <summary class="fw-semibold">${escapeHtml(group.label)} <span class="small muted">(${group.total} coincidencias)</span></summary>
          <div class="table-responsive mt-2">
            <table class="table table-sm align-middle">
              <thead><tr><th>Forma</th><th>Frecuencia</th><th>Morfología</th></tr></thead>
              <tbody>${formsRows || '<tr><td colspan="3" class="small muted">Sin coincidencias.</td></tr>'}</tbody>
            </table>
          </div>
        </details>
      `;
    }).join('');

    const networkRows = modules.network?.length
      ? modules.network.map((item) => `<li><span class="fw-semibold">${escapeHtml(item.lemma)}</span> <span class="small muted">(${item.count} ocurrencias)</span></li>`).join('')
      : '<li class="small muted">No se detectaron lemas relacionados desde la base local.</li>';

    const dictA = modules.dictionaryA || { label: 'Dictionary A – Greek', fields: {} };
    const dictB = modules.dictionaryB || { label: 'Dictionary B – Hebrew', fields: {} };

    const KEY_FIELD_NAMES = new Set([
      'lemma', 'transliteration', 'transliteracion', 'definition', 'definicion', 'definición',
      'root', 'raiz', 'pos', 'strong', 'strong_number', 'strong number',
      'forma lexica', 'Forma lexica', 'entrada_impresa', 'Printed_entry', 'printed_entry',
      'Forma flexionada del texto', 'morfologia', 'morphology', 'morfología'
    ]);
    const LARGE_FIELD_NAMES = new Set([
      'formas', 'glosas', 'morphs', 'morfs', 'stats', 'tokens', 'forms', 'forma', 'formas flexionadas'
    ]);
    const keyOrder = ['lemma', 'transliteration', 'transliteracion', 'Forma lexica', 'forma lexica', 'Printed_entry', 'entrada_impresa', 'Forma flexionada del texto', 'definition', 'definicion', 'definición', 'root', 'raiz', 'pos', 'strong', 'strong_number', 'morfologia', 'morphology', 'morfología'];

    const isKeyField = (k) => {
      const lower = String(k).toLowerCase().trim();
      return KEY_FIELD_NAMES.has(k) || KEY_FIELD_NAMES.has(lower) || keyOrder.some((key) => key.toLowerCase() === lower);
    };
    const isLargeField = (k) => {
      const lower = String(k).toLowerCase().trim();
      return LARGE_FIELD_NAMES.has(k) || LARGE_FIELD_NAMES.has(lower);
    };

    const renderOneField = (k, v) => {
      const display = (v === undefined || v === null || v === '') ? '—' : String(v);
      return `<div class="small"><strong>${escapeHtml(k)}</strong> ${escapeHtml(display)}</div>`;
    };

    const renderKeyFields = (fields) => {
      const keys = Object.keys(fields || {}).filter((k) => isKeyField(k) && !isLargeField(k));
      const ordered = keyOrder.filter((k) => keys.includes(k));
      const rest = keys.filter((k) => !keyOrder.includes(k)).sort();
      const finalKeys = [...new Set([...ordered, ...rest])];
      if (!finalKeys.length) return '<div class="small muted">—</div>';
      return finalKeys.map((k) => renderOneField(k, fields[k])).join('');
    };

    const renderCollapsibleExtraFields = (fields) => {
      const rest = Object.keys(fields || {}).filter((k) => isLargeField(k) || !isKeyField(k));
      const keys = rest.sort();
      if (!keys.length) return '';
      const inner = keys.map((k) => renderOneField(k, fields[k])).join('');
      return `<details class="analysis-details mt-2" style="margin-left: 0.5rem;"><summary class="fw-semibold small">Ver formas flexionadas</summary><div class="details-inner mt-1">${inner}</div></details>`;
    };

    const renderDictBlock = (dict) => {
      const fields = dict.fields || {};
      const isHebrew = (dict.label || '').indexOf('Hebrew') !== -1;
      if (isHebrew) {
        const articleHtml = formatHebrewLexiconArticle(fields);
        return `
          <div class="fw-semibold small">${escapeHtml(dict.label)}</div>
          <div class="ms-2 mt-1">${articleHtml || '<div class="small muted">—</div>'}</div>
        `;
      }
      const keyPart = renderKeyFields(fields);
      const collapsiblePart = renderCollapsibleExtraFields(fields);
      return `
        <div class="fw-semibold small">${escapeHtml(dict.label)}</div>
        <div class="ms-2 mt-1">${keyPart}</div>
        ${collapsiblePart ? `<div class="ms-2">${collapsiblePart}</div>` : ''}
      `;
    };

    const comparisonBlock = `
      <div class="mb-3">
        <div class="fw-semibold mb-2">Comparación de diccionarios</div>
        <div class="mb-2">${renderDictBlock(dictA)}</div>
        <div>
          <div class="fw-semibold small">${escapeHtml(dictB.label)}</div>
          <div id="dictB-container" class="ms-2 mt-1"></div>
        </div>
      </div>
    `;

    wrapper.innerHTML = `
      <div class="mb-2">
        <div class="fw-semibold">Correspondencias idiomáticas</div>
        <div class="small">Correspondencias: ${escapeHtml(esWord)} – ${escapeHtml(heWord)} – ${escapeHtml(grWord)}</div>
      </div>
      <div class="mb-2">
        <div class="small"><strong>Lema introducido</strong> ${escapeHtml(inputLemma)}</div>
        <div class="small"><strong>Fuente del diccionario</strong> ${escapeHtml(dictionarySource)}</div>
      </div>
      ${comparisonBlock}
      <div class="small muted mb-2">Total de ocurrencias en la base: ${modules.totalOccurrences}</div>
      <details class="analysis-details" open>
        <summary>Formas flexionadas por fuente</summary>
        <div class="details-inner">
          <p class="small muted mb-2">Forma · Frecuencia · Morfología simple por corpus (LXX, Hebreo, RKANT, RVR1960).</p>
          <div class="table-responsive">${formsBySourceRows || '<div class="small muted">Sin coincidencias.</div>'}</div>
        </div>
      </details>
      <details class="analysis-details" open>
        <summary>Red léxica derivada desde la base</summary>
        <div class="details-inner">
          <ul class="mb-0">${networkRows}</ul>
        </div>
      </details>
    `;

    deepLexicalAnalysis.appendChild(wrapper);
    const dictBContainer = document.getElementById('dictB-container');
    if (dictBContainer) dictBContainer.innerHTML = formatHebrewLexiconArticle(dictB.fields || {}) || '<div class="small muted">—</div>';
  }

  async function buildSummary(term, lang, entry, hebrewEntry, refs, highlightQueries = {}) {
    const lemma = entry?.lemma || term;
    const normalized = lang === 'gr' ? normalizeGreek(lemma || term) : (lang === 'he' ? normalizeHebrew(term) : term);
    const pos = lang === 'he' ? (hebrewEntry?.strong_detail?.pos || hebrewEntry?.morfologia_impresa || extractPos(hebrewEntry)) : extractPos(entry);
    const hebrewDefinition = getHebrewDefinition(hebrewEntry);
    const definition = lang === 'he' ? hebrewDefinition : (entry?.definicion || entry?.definicion_corta || '');
    const defShort = definition ? shortDefinition(definition) : '';
    const keywords = keywordList(definition);
    const root = lang === 'gr' ? buildGreekLexicalRoot(normalized) : (lang === 'he' ? buildHebrewLexicalRoot(term) : '');
    const morphLabel = lang === 'gr' ? describeMorphTag(entry?.morph || '') : (lang === 'he' ? (hebrewEntry?.morfologia_impresa || hebrewEntry?.morfologia || '') : '');

    const summaryLines = [];
    summaryLines.push(`<div class="summary-line"><strong>Lema introducido</strong> ${escapeHtml(term)}</div>`);
    if (lang === 'gr' && entry) {
      const translit = entry['Forma lexica'] || entry.Forma_lexica || '';
      if (translit) summaryLines.push(`<div class="summary-line"><strong>Transliteración</strong> ${escapeHtml(translit)}</div>`);
      const printed = entry['Printed_entry'] || entry.entrada_impresa || '';
      if (printed) summaryLines.push(`<div class="summary-line"><strong>Entrada impresa</strong> ${escapeHtml(printed)}</div>`);
      const inflected = entry['Forma flexionada del texto'] || '';
      if (inflected) summaryLines.push(`<div class="summary-line"><strong>Forma flexionada</strong> ${escapeHtml(inflected)}</div>`);
    }
    if (lang === 'he' && hebrewEntry) {
      const translit = hebrewEntry.transliteration || hebrewEntry.transliteracion || hebrewEntry.forma || '';
      if (translit) summaryLines.push(`<div class="summary-line"><strong>Transliteración</strong> ${escapeHtml(translit)}</div>`);
      const construct = hebrewEntry.construct || hebrewEntry.construct_state || '';
      if (construct) summaryLines.push(`<div class="summary-line"><strong>Constructo</strong> ${escapeHtml(construct)}</div>`);
      const forms = Array.isArray(hebrewEntry.forms) ? hebrewEntry.forms.join(', ') : (hebrewEntry.forms || hebrewEntry.formas || '');
      if (forms) summaryLines.push(`<div class="summary-line"><strong>Formas</strong> ${escapeHtml(String(forms))}</div>`);
    }
    if (root && root !== normalized) summaryLines.push(`<div class="summary-line"><strong>Raíz</strong> ${escapeHtml(root)}</div>`);
    if (pos && pos !== '—') summaryLines.push(`<div class="summary-line"><strong>Categoría gramatical</strong> ${escapeHtml(String(pos))}</div>`);
    if (morphLabel) summaryLines.push(`<div class="summary-line"><strong>Morfología</strong> ${escapeHtml(String(morphLabel))}</div>`);
    if (defShort) summaryLines.push(`<div class="summary-line"><strong>Significado</strong> ${escapeHtml(defShort)}</div>`);
    if (definition && definition !== defShort) summaryLines.push(`<div class="summary-line">${escapeHtml(definition)}</div>`);

    let sampleRef = null;
    let sampleText = '';
    let sampleEs = '';
    if (refs.length) {
      const [book, chapterRaw, verseRaw] = refs[0].split('|');
      const chapter = Number(chapterRaw);
      const verse = Number(verseRaw);
      sampleRef = formatRef(book, chapter, verse);
      try {
        const verses = await loadChapterText(lang, book, chapter);
        sampleText = verses?.[verse - 1] || '';
        if (lang !== 'es') {
          const versesEs = await loadChapterText('es', book, chapter);
          sampleEs = versesEs?.[verse - 1] || '';
        }
      } catch (error) {
        sampleText = '';
        sampleEs = '';
      }
    }
    if (summaryLines.length <= 1) summaryLines.push('<div class="summary-line"><span class="muted">No se encontró definición directa en el diccionario cargado.</span></div>');
    const summaryQuery = highlightQueries.es || (lang === 'es' ? term : '');
    lemmaSummary.innerHTML = `<div class="lemma-summary-block">${summaryLines.join('')}</div>`;
    const cards = [];
    const primaryQuery = highlightQueries[lang] || term;
    const spanishQuery = highlightQueries.es || '';
    if (sampleRef && sampleText) {
      cards.push(`
        <div class="fw-semibold">Ejemplo en ${langLabels[lang]}</div>
        <div class="small muted">${sampleRef}</div>
        <div class="${classForLang(lang)}">${highlightText(sampleText, primaryQuery, lang)}</div>
      `);
    }
    if (sampleEs) {
      cards.push(`
        <div class="fw-semibold">Traducción RVR1960</div>
        <div class="small muted">Ejemplo contextual</div>
        <div>${highlightText(sampleEs, spanishQuery, 'es')}</div>
      `);
    }
    if (keywords.length) {
      cards.push(`
        <div class="fw-semibold">Campos semánticos</div>
        <div class="small muted">${keywords.join(', ')}</div>
      `);
    }
    renderExamples(cards);
  }
 
  async function analyze() {
    if (state.isLoading) return;
    const term = queryInput.value.trim();
    if (!term) {
      return;
    }
   const queryTokens = tokenizeQueryForExactSearch(term, detectLang(term));
    if (queryTokens.length > 1) {
      renderSingleWordInputError(term);
      return;
    }
    scrollToLemmaSummary();
   setLoading(true);
    await nextFrame();
      try {
    const lang = detectLang(term);
    const normalized = normalizeByLang(term, lang);
 
     let entry = null;
       let hebrewEntry = null;
    if (lang === 'gr') {
      await loadDictionary();
      await loadDictionaryGUnificado();
      entry = findGreekEntry(term) || null;
      } else if (lang === 'he') {
      await loadHebrewDictionary();
      hebrewEntry = findHebrewEntry(term) || null;
    }
 
    const indexPromise = loadIndex(lang);
    const index = await indexPromise;
    const isMultiWordQuery = queryTokens.length > 1;
    let refs = lang === 'gr'
     ? getGreekRefs(normalized, index)
      : (lang === 'he' ? getHebrewRefs(normalized, index) : (index.tokens?.[normalized] || []));
       if (isMultiWordQuery) {
      const seed = index.tokens?.[queryTokens[0]] || [];
      refs = await filterRefsByExactSequence(seed, lang, term);
    }
   const initialLxxMatches = lang === 'gr' && normalized
      ? await buildLxxMatches(normalized, 70)
      : { refs: [], texts: new Map() };
    const hasInitialGreekMatches = refs.length || initialLxxMatches.refs.length;

    if (!refs.length && !(lang === 'gr' && hasInitialGreekMatches)) {
      renderTags([
        `Lema: <span class="fw-semibold">${escapeHtml(term)}</span>`,
        'POS: —'
       ]);
      lemmaSummary.innerHTML = '<div class="lemma-summary-block"><div class="summary-line"><span class="muted">No se encontraron ocurrencias en los índices disponibles.</span></div></div>';
      renderCorrespondence([]);
       lemmaExamples.innerHTML = '';
      occurrenceDonut?.setData({ es: [], he: [], gr: [] });
      deepLexicalAnalysis.innerHTML = '<div class="col-12"><div class="small muted">No hay ocurrencias para construir el análisis léxico profundo.</div></div>';
      state.last = { term, lang, refs: [], lexicalModules: null };
     return;
     }
 
   
    const esIndexPromise = loadIndex('es');
    const grIndexPromise = loadIndex('gr');
    const heIndexPromise = loadIndex('he');
    const esIndex = await esIndexPromise;
   let esSearchTokens = [];
    if (lang === 'es') {
      esSearchTokens = isMultiWordQuery ? [] : [normalized].filter(Boolean);
    } else if (entry?.definicion) {
      esSearchTokens = extractSpanishTokensFromDefinition(entry.definicion);
 } else if (lang === 'he' && getHebrewDefinition(hebrewEntry)) {
      esSearchTokens = extractSpanishTokensFromDefinition(getHebrewDefinition(hebrewEntry));
    } else {
      esSearchTokens = [normalizeSpanish(term)].filter(Boolean);
    }
     const esDisplayWord = lang === 'es' ? term : (esSearchTokens[0] || term);
    let greekEntry = entry;
    let greekTerm = null;
    let greekCandidate = null;
    if (lang === 'es') {
      greekEntry = await findGreekEntryFromSpanish(term);
      if (greekEntry?.lemma) {
        greekTerm = normalizeGreek(greekEntry.lemma);
      }
    }
    const summaryHighlightQueries = {
      es: esDisplayWord,
      [lang]: lang === 'gr' ? (entry?.lemma || term) : term
    };
const summaryRefs = lang === 'gr' && !refs.length ? initialLxxMatches.refs : refs;
    await buildSummary(term, lang, entry || greekEntry, hebrewEntry, summaryRefs, summaryHighlightQueries);
    const esRefs = [];
    const esSeen = new Set();
        const directEsRefs = [];
    if (lang === 'gr') {
      refs.forEach((ref) => directEsRefs.push(ref));
      mapLxxRefsToHebrewRefs(initialLxxMatches.refs).forEach((ref) => directEsRefs.push(ref));
    } else if (lang === 'he') {
      refs.forEach((ref) => directEsRefs.push(ref));
    }
    directEsRefs.forEach((ref) => {
      if (esSeen.has(ref)) return;
      esSeen.add(ref);
      esRefs.push(ref);
    });
    esSearchTokens.forEach((token) => {
      const matches = esIndex.tokens?.[token] || [];
      matches.forEach((ref) => {
        if (esSeen.has(ref)) return;
        esSeen.add(ref);
        esRefs.push(ref);
      });
    });
       if (lang === 'es' && isMultiWordQuery) {
      const phraseRefs = await filterRefsByExactSequence(index.tokens?.[queryTokens[0]] || [], 'es', term);
      phraseRefs.forEach((ref) => {
        if (esSeen.has(ref)) return;
        esSeen.add(ref);
        esRefs.push(ref);
      });
    }
    const { ot: esOtRefs, nt: esNtRefs } = splitRefsByTestament(esRefs);

    if (lang === 'gr') {
      greekTerm = normalized;
    } else if (lang === 'es') {
      if (!greekTerm) {
        const ntCandidate = esNtRefs.length ? await buildGreekCandidateFromGreekRefs(esNtRefs) : null;
        const otLxxRefs = esOtRefs.length ? mapOtRefsToLxxRefs(esOtRefs) : [];
        const otCandidate = otLxxRefs.length ? await buildGreekCandidateFromLxxRefs(otLxxRefs) : null;
        if (ntCandidate && otCandidate) {
          greekCandidate = ntCandidate.count >= otCandidate.count ? ntCandidate : otCandidate;
        } else {
          greekCandidate = ntCandidate || otCandidate;
        }
        if (greekCandidate) {
          greekTerm = greekCandidate.normalized;
          await loadDictionary();
          await loadDictionaryGUnificado();
          greekEntry = findGreekEntry(greekTerm) || greekEntry;
        }
      }
    } else if (lang === 'he') {
      greekCandidate = await buildGreekCandidateFromHebrewRefs(refs);
      if (greekCandidate) {
        greekTerm = greekCandidate.normalized;
        await loadDictionary();
        await loadDictionaryGUnificado();
        greekEntry = findGreekEntry(greekTerm) || greekEntry;
      }
    }


    const greekLemma = greekEntry?.lemma || greekCandidate?.lemma || (lang === 'gr' ? term : '—');
const greekTranslit = greekEntry?.['Forma lexica'] || (greekTerm ? transliterateGreek(greekLemma || term) : '—');
     const grIndex = await grIndexPromise;
   const grRefs = greekTerm ? getGreekRefs(greekTerm, grIndex) : [];
   const lxxMatchesPromise = greekTerm
      ? (lang === 'gr' && greekTerm === normalized
          ? Promise.resolve(initialLxxMatches)
          : buildLxxMatches(greekTerm, 70))
      : Promise.resolve({ refs: [], texts: new Map() });
    const lxxMatches = await lxxMatchesPromise;

    let hebrewCandidate = null;
    if (lang === 'he') {
      hebrewCandidate = {
        normalized,
        word: term,
        transliteration: transliterateHebrew(term)
      };
     } else if (lang === 'es') {
     if (greekTerm && lxxMatches.refs.length) {
        hebrewCandidate = await buildHebrewCandidateFromLxxRefs(lxxMatches.refs);
      }
      if (!hebrewCandidate && esOtRefs.length) {
        hebrewCandidate = await buildHebrewCandidateFromRefs(esOtRefs);
      }
    } else if (lxxMatches.refs.length) {
      hebrewCandidate = await buildHebrewCandidateFromLxxRefs(lxxMatches.refs);
    }
    const heIndex = await heIndexPromise;
    const heRefs = hebrewCandidate ? getHebrewRefs(hebrewCandidate.normalized, heIndex) : [];
       occurrenceDonut?.setData({
      es: buildBookCountRows(esRefs),
      he: buildBookCountRows(heRefs),
      gr: buildBookCountRows([...grRefs, ...lxxMatches.refs])
    });

    deepLexicalAnalysis.innerHTML = '<div class="col-12"><div class="small muted">Construyendo módulos de análisis...</div></div>';
    const lexicalModules = await buildDeepLexicalModules({
      lang,
      normalizedLemma: lang === 'he' ? normalizeHebrew(term) : normalizeGreek(greekLemma !== '—' ? greekLemma : term),
      displayLemma: lang === 'he' ? term : (greekLemma !== '—' ? greekLemma : term),
      grRefs,
      heRefs,
      lxxRefs: lxxMatches.refs,
      greekNormalizedLemma: greekTerm || (lang === 'gr' ? normalizeGreek(greekLemma !== '—' ? greekLemma : term) : null),
      hebrewNormalizedLemma: lang === 'he' ? normalizeHebrew(term) : (hebrewCandidate ? hebrewCandidate.normalized : null)
    });

    const getCountBySource = (sourceKey) => {
      const group = (lexicalModules.formsBySource || []).find((g) => g.source === sourceKey);
      return group ? group.total : 0;
    };
    const rkantCount = getCountBySource('RKANT (base completa)');
    const lxxCount = getCountBySource('LXX (base completa)');
    const hebreoCount = getCountBySource('Hebreo (base completa)');
    const rvrCount = getCountBySource('Español (base completa)');

    const posTag = lang === 'gr'
      ? extractPos(entry)
      : (lang === 'he' ? (hebrewEntry?.strong_detail?.pos || extractPos(hebrewEntry)) : '—');

    const lemmaLabel = lang === 'gr' ? (entry?.lemma || term) : term;

    let translitLabel = '';
    if (lang === 'gr') {
      translitLabel = getGreekTransliterationFromEntry(entry || greekEntry, lemmaLabel);
    } else if (lang === 'he') {
      const hebrewSource = hebrewEntry?.lemma || hebrewEntry?.hebreo || hebrewEntry?.palabra || term;
      translitLabel = getHebrewTransliterationFromEntry(hebrewEntry, hebrewSource);
    } else if (lang === 'es') {
      translitLabel = term || '';
    }
    if (!translitLabel) translitLabel = '—';

    renderTags([
      `Lema: <span class="fw-semibold">${escapeHtml(lemmaLabel)}</span>`,
      `Transliteración: ${escapeHtml(String(translitLabel))}`,
      `POS: ${escapeHtml(String(posTag))}`,
      `RKANT: ${rkantCount}`,
      `LXX: ${lxxCount}`,
      `Hebreo: ${hebreoCount}`,
      `RVR1960: ${rvrCount}`
    ]);
       const highlightQueries = {
      gr: greekLemma !== '—' ? greekLemma : (lang === 'gr' ? term : ''),
      lxx: greekLemma !== '—' ? greekLemma : (lang === 'gr' ? term : ''),
      he: hebrewCandidate?.word || (lang === 'he' ? term : ''),
      es: esDisplayWord
    };
    // Correspondencias español ↔ hebreo ↔ español: se priorizan equivalencias por corpus (LXX/RKANT/RVR). Para equivalencias semánticas puede integrarse equivalencias_trilingue.min.json.
    const cards = [];
    const samplesTasks = [];
    if (greekTerm && grRefs.length) {
samplesTasks.push(
        buildSamplesForRefs(grRefs, 'gr', 3).then((grSamples) => {
          cards.push(buildCorrespondenceCard({
            title: 'RKANT (NT)',
            word: greekLemma,
            transliteration: greekTranslit,
            samples: grSamples,
            lang: 'gr',
           highlightQuery: highlightQueries.gr
          }));
        })
      );
     }
    if (greekTerm && lxxMatches.refs.length) {
      samplesTasks.push(
        buildSamplesForRefs(lxxMatches.refs, 'lxx', 3, lxxMatches.texts).then((lxxSamples) => {
          cards.push(buildCorrespondenceCard({
            title: 'LXX (AT)',
            word: greekLemma,
            transliteration: greekTranslit,
            samples: lxxSamples,
            lang: 'lxx',
           highlightQuery: highlightQueries.lxx
          }));
        })
      );
    }
   if (hebrewCandidate && heRefs.length) {
    samplesTasks.push(
        buildSamplesForRefs(heRefs, 'he', 3).then((heSamples) => {
          cards.push(buildCorrespondenceCard({
            title: 'Hebreo (AT)',
            word: hebrewCandidate.word,
            transliteration: hebrewCandidate.transliteration,
            samples: heSamples,
            lang: 'he',
           highlightQuery: highlightQueries.he
          }));
        })
      );
    }
    if (esOtRefs.length) {
      samplesTasks.push(
        buildSamplesForRefs(esOtRefs, 'es', 3).then((esOtSamples) => {
          cards.push(buildCorrespondenceCard({
            title: 'RVR1960 (AT)',
            word: esDisplayWord,
            transliteration: '',
            samples: esOtSamples,
            lang: 'es',
           highlightQuery: highlightQueries.es
          }));
        })
      );
    }
    if (esNtRefs.length) {
     samplesTasks.push(
        buildSamplesForRefs(esNtRefs, 'es', 3).then((esNtSamples) => {
          cards.push(buildCorrespondenceCard({
            title: 'RVR1960 (NT)',
            word: esDisplayWord,
            transliteration: '',
            samples: esNtSamples,
            lang: 'es',
           highlightQuery: highlightQueries.es
          }));
        })
      );
    }
       await Promise.all(samplesTasks);
    renderCorrespondence(cards);

    const correspondence = {
      es: esDisplayWord || '—',
      he: hebrewCandidate?.word || (lang === 'he' ? term : '—'),
      gr: greekLemma !== '—' ? greekLemma : (lang === 'gr' ? term : '—')
    };

    let dictionarySource = '—';
    if (lang === 'he' || hebrewEntry) {
      dictionarySource = 'dic/ (nuevo diccionario hebreo)';
    } else if (lang === 'gr' || greekEntry) {
      const hasMaster = greekTerm && state.dictMap?.has?.(greekTerm);
      const hasUnified = greekTerm && state.dictGUnificadoMap?.has?.(greekTerm);
      if (hasMaster && hasUnified) {
        dictionarySource = 'masterdiccionario.json / diccionarioG_unificado.min.json';
      } else if (hasMaster) {
        dictionarySource = 'masterdiccionario.json';
      } else if (hasUnified) {
        dictionarySource = 'diccionarioG_unificado.min.json';
      } else {
        dictionarySource = 'masterdiccionario.json / diccionarioG_unificado.min.json';
      }
    }

    lexicalModules.meta = {
      correspondence,
      inputLemma: term,
      dictionarySource
    };

    renderDeepLexicalAnalysis(lexicalModules);
    state.last = { term, lang, refs, lexicalModules };
        } catch (error) {
      console.error('Error en el análisis:', error);
    } finally {
      setLoading(false);
    }
   }
 
   function handleFilterClick(event) {
     const button = event.target.closest('button[data-filter]');
     if (!button) return;
     state.filter = button.dataset.filter || 'todo';
     document.querySelectorAll('button[data-filter]').forEach((btn) => {
       if (btn.dataset.filter === state.filter) {
         btn.classList.add('btn-primary');
         btn.classList.remove('btn-soft');
       } else {
         btn.classList.remove('btn-primary');
         btn.classList.add('btn-soft');
       }
     });

  // Los filtros rápidos no alteran el módulo léxico profundo actual.
   }
 

 
   analyzeBtn?.addEventListener('click', analyze);
   queryInput?.addEventListener('keydown', (event) => {
     if (event.key === 'Enter') {
       event.preventDefault();
       analyze();
     }
   });
 
   document.body.addEventListener('click', handleFilterClick);

  // Mantiene las secciones del resumen del lema siempre visibles
  // y desactiva el comportamiento desplegable de los <details>.
  const staticDetails = document.querySelectorAll('#lemmaSummaryPanel details.lexicon-details');
  staticDetails.forEach((detailsEl) => {
    detailsEl.open = true;
    const summaryEl = detailsEl.querySelector('summary');
    if (!summaryEl) return;
    summaryEl.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
})();
