/* ==========================================================================
   CareMed AI - Core Application Logic & Interactivity
   Global Drug Database Catalog, 81 Turkish Provinces, Refakatçi Dynamic Sync Fix
   ========================================================================== */

const STORAGE_KEY = 'caremed_elderly_app_v5';

// All 81 Provinces of Turkey
const turkey81Provinces = [
  "İstanbul", "Ankara", "İzmir", "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Antalya", "Artvin",
  "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı",
  "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun",
  "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

// Global Drug Database Catalog (Prescription & OTC Drugs)
const globalDrugDatabase = [
  { id: 1001, name: 'Coraspin 100mg', cat: 'Kardiyoloji / Tansiyon', active: 'Asetilsalisilik Asit', color: 'Beyaz', shape: 'Yuvarlak Tablet', usage: 'Sabah 1 Tok (Mide koruyucu ile)' },
  { id: 1002, name: 'Glucophage 850mg', cat: 'Diyabet / Şeker', active: 'Metformin HCl', color: 'Kırmızı', shape: 'Oval Kapsül', usage: 'Sabah 1, Akşam 1 Tok' },
  { id: 1003, name: 'Beloc ZOK 50mg', cat: 'Kalp Ritim Düzenleyici', active: 'Metoprolol', color: 'Beyaz', shape: 'Küçük Oval', usage: 'Sabah 1 Aç Karnına' },
  { id: 1004, name: 'Parol 500mg', cat: 'Ağrı Kesici & Ateş Düşürücü', active: 'Parasetamol', color: 'Beyaz', shape: 'Uzun Tablet', usage: 'İhtiyaç Halinde 1 Tablet Tok' },
  { id: 1005, name: 'Synthroid 50mcg', cat: 'Tiroit Düzenleyici', active: 'Levotiroksin Sodyum', color: 'Sarı', shape: 'Yuvarlak Tablet', usage: 'Sabah Aç (Kahvaltıdan 30 dk önce)' },
  { id: 1006, name: 'Ecopirin 150mg', cat: 'Kan Sulandırıcı', active: 'Asetilsalisilik Asit', color: 'Pembe', shape: 'Yuvarlak Tablet', usage: 'Öğle 1 Tok Karnına' },
  { id: 1007, name: 'Nexium 40mg', cat: 'Gastroenteroloji / Mide Koruyucu', active: 'Esomeprazol', color: 'Mor', shape: 'Oval Kapsül', usage: 'Sabah Aç Karnına' },
  { id: 1008, name: 'Lipitor 20mg', cat: 'Kolesterol Düzenleyici', active: 'Atorvastatin', color: 'Beyaz', shape: 'Oval Tablet', usage: 'Gece Yatmadan Önce 1 Tablet' },
  { id: 1009, name: 'Crestor 10mg', cat: 'Kolesterol Düşürücü', active: 'Rozuvastatin', color: 'Pembe', shape: 'Yuvarlak Tablet', usage: 'Akşam Yemekten Sonra' },
  { id: 1010, name: 'Augmentin 1000mg', cat: 'Enfeksiyon / Antibiyotik', active: 'Amoksisilin + Klavulanik Asit', color: 'Beyaz', shape: 'Büyük Tablet', usage: '12 Saatte Bir 1 Tok' },
  { id: 1011, name: 'Majezik 100mg', cat: 'Romatizma & Ağrı Kesici', active: 'Flurbiprofen', color: 'Mavi', shape: 'Oval Tablet', usage: 'Tok Karnına Bol Su İle' },
  { id: 1012, name: 'Coumadin 5mg', cat: 'Antikoagülan / Kan Sulandırıcı', active: 'Varfarin Sodyum', color: 'Şeftali', shape: 'Yuvarlak Tablet', usage: 'Doktorun Belirlediği Saatte Tok' },
  { id: 1013, name: 'Janumet 50/1000mg', cat: 'Tip-2 Diyabet Kombinasyon', active: 'Sitagliptin + Metformin', color: 'Kırmızı', shape: 'Oval Kapsül', usage: 'Günde 2 Defa Yemekle Birlikte' },
  { id: 1014, name: 'Ventolin Inhaler 100mcg', cat: 'Solunum / Astım - KOAH', active: 'Salbutamol', color: 'Mavi', shape: 'İnhaler Sprey', usage: 'Nefes Darlığında 2 Doz Çekim' },
  { id: 1015, name: 'Osteocare Calcium D3', cat: 'Vitamin & Kemik Desteği', active: 'Kalsiyum + Magnezyum + Vit D3', color: 'Beyaz', shape: 'Büyük Oval', usage: 'Akşam Yemekten Sonra 1 Tablet' }
];

// i18n Dictionary
const i18nDict = {
  tr: {
    brandSub: "Akıllı Yaşlı İlaç & Eczane Ekosistemi",
    voiceBtnText: "Sesli Asistan",
    loginBtnText: "Giriş Yap / E-Devlet",
    settingsBtnText: "Ayarlar",
    seniorModeBtn: "Yaşlı Modu",
    familyModeBtn: "Refakatçi Paneli",
    activePatientLabel: "Aktif Hasta:",
    vitalsBtnText: "Tansiyon / Şeker Ölçümü Ekle",
    actionScanTitle: "ESP32 İlaç Kutusu Tara",
    actionScanSub: "Kutuyu kameraya göster, reçeteyi otomatik eklesin!",
    actionVerifyTitle: "Hap Rengi & Şekli Doğrula",
    actionVerifySub: "Avucundaki hapı göster, yanlış ilaç içmeyi önlesin!",
    actionPharmTitle: "Eczane & Nöbetçi Bul",
    actionPharmSub: "Biten ilaçlar için en yakın eczaneye ilet",
    timelineTitle: "Bugünkü İlaç Takvimi",
    timelineHint: "Sesle veya butonla içildi (+) işaretleyin",
    inventoryTitle: "Evdeki İlaç Stokları",
    pharmacySectionTitle: "81 İl & İlçeler Nöbetçi Eczane Arama Filtresi",
    pharmacySectionSub: "İl, ilçe, mahalle veya serbest arama yapabilirsiniz (Örn: 'Ankara Mamak' veya 'İzmir Karşıyaka')",
    aiTitle: "Sağlık Asistanlarınız (Özel AI Danışmanı)",
    aiDisclaimer: "Yapay zeka asistanları bilgilendirme amaçlıdır. Acil durumlarda lütfen 112'yi arayınız veya yakındaki hastaneye başvurunuz.",
    sendBtnText: "Gönder",
    voiceListeningPrompt: 'Sizi dinliyorum... "İlacımı içtim", "Eczane bul", "Profil değiştir" diyebilirsiniz.'
  },
  en: {
    brandSub: "Smart Elderly Care & Pharmacy Ecosystem",
    voiceBtnText: "Voice Assistant",
    loginBtnText: "Sign In / E-Gov",
    settingsBtnText: "Settings",
    seniorModeBtn: "Elderly View",
    familyModeBtn: "Caregiver View",
    activePatientLabel: "Active Patient:",
    vitalsBtnText: "Add Blood Pressure / Sugar",
    actionScanTitle: "ESP32 Box Scan",
    actionScanSub: "Show pill box to camera for auto OCR prescription!",
    actionVerifyTitle: "Pill Color & Shape Check",
    actionVerifySub: "Scan pill in palm to prevent wrong medicine dosage!",
    actionPharmTitle: "Find Duty Pharmacy",
    actionPharmSub: "Route low stock meds directly to nearest pharmacy",
    timelineTitle: "Today's Medication Schedule",
    timelineHint: "Mark taken (+) via voice or green button",
    inventoryTitle: "Home Medicine Inventory",
    pharmacySectionTitle: "81 Provinces Duty Pharmacy & Filter",
    pharmacySectionSub: "Filter by city, district, neighborhood or search (e.g., 'Ankara Mamak')",
    aiTitle: "Personalized AI Health Assistants",
    aiDisclaimer: "AI assistants are for guidance only. In emergency call 112 / ER.",
    sendBtnText: "Send",
    voiceListeningPrompt: 'Listening... You can say "I took my pill", "Find pharmacy".'
  }
};

const phoneticMap = [
  { regex: /Glucophage/gi, replacement: 'Glikofaj' },
  { regex: /Beloc ZOK/gi, replacement: 'Belok Zok' },
  { regex: /Synthroid/gi, replacement: 'Sintroid' },
  { regex: /Coraspin/gi, replacement: 'Koraspin' },
  { regex: /Osteocare/gi, replacement: 'Osteokeyr' },
  { regex: /CareMed/gi, replacement: 'Keyr Med' }
];

const cityDistrictsMap = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Fatih', 'Şişli', 'Maltepe', 'Pendik', 'Ümraniye'],
  'Ankara': ['Çankaya', 'Yenimahalle', 'Keçiören', 'Mamak', 'Etimesgut', 'Sincan'],
  'İzmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli', 'Gaziemir'],
  'Bursa': ['Osmangazi', 'Nilüfer', 'Yıldırım'],
  'Antalya': ['Muratpaşa', 'Konyaaltı', 'Kepez']
};

const cityWeatherMap = {
  'İstanbul': '28°C Güneşli ☀️',
  'Ankara': '24°C Parçalı Bulutlu ⛅',
  'İzmir': '32°C Sıcak 🔥',
  'Bursa': '26°C Az Bulutlu 🌤️',
  'Antalya': '35°C Nemli & Sıcak ☀️'
};

const defaultInitialState = {
  lang: 'tr',
  theme: 'light',
  activePatientId: 1,
  currentView: 'senior',
  voiceAssistActive: false,
  isMuted: false,
  is2FAEnabled: false,
  activeAIPersona: 'doctor',
  esp32Mode: 'ocr',
  selectedCity: 'all',
  selectedDistrict: 'all',

  caregivers: [
    { id: 1, name: 'Mehmet Yılmaz', relation: 'Oğul / Evlat', phone: '0532 111 22 33' }
  ],

  patients: {
    1: {
      id: 1,
      name: 'Ahmet Yılmaz',
      gender: 'Erkek',
      age: 74,
      relation: 'Baba',
      illnesses: 'Hipertansiyon, Tip-2 Diyabet',
      inventory: [
        { id: 1, name: 'Coraspin 100mg', purpose: 'Tansiyon & Kan Sulandırıcı', count: 4, alertThreshold: 5, totalBox: 30, color: 'Beyaz', shape: 'Yuvarlak Tablet' },
        { id: 2, name: 'Glucophage 850mg', purpose: 'Diyabet / Şeker', count: 18, alertThreshold: 10, totalBox: 60, color: 'Kırmızı', shape: 'Oval Kapsül' }
      ],
      doses: [
        { id: 101, medId: 1, medName: 'Coraspin 100mg', time: '08:30', period: 'Sabah', detail: '1 Tablet (Tok Karnına)', taken: true, takenTime: '08:30' },
        { id: 102, medId: 2, medName: 'Glucophage 850mg', time: '08:30', period: 'Sabah', detail: '1 Kapsül (Aç Karnına)', taken: true, takenTime: '08:32' }
      ]
    },
    2: {
      id: 2,
      name: 'Fatma Yılmaz',
      gender: 'Kadın',
      age: 71,
      relation: 'Anne',
      illnesses: 'Tiroit, Osteoporoz',
      inventory: [
        { id: 201, name: 'Synthroid 50mcg', purpose: 'Tiroit Düzenleyici', count: 15, alertThreshold: 7, totalBox: 30, color: 'Sarı', shape: 'Yuvarlak Tablet' }
      ],
      doses: [
        { id: 20101, medId: 201, medName: 'Synthroid 50mcg', time: '07:30', period: 'Sabah', detail: '1 Tablet (Aç Karnına)', taken: true, takenTime: '07:30' }
      ]
    }
  },

  pharmacies: [
    { id: 1, name: 'Kadıköy Şifa Eczanesi', city: 'İstanbul', district: 'Kadıköy', neighborhood: 'Moda', isDuty: true, distance: '0.4 km', phone: '0216 345 67 89', address: 'Moda Cad. No: 42/A Kadıköy İstanbul', stocks: { 'Coraspin 100mg': 'Var', 'Glucophage 850mg': 'Var' } },
    { id: 2, name: 'Mamak Nöbetçi Eczanesi', city: 'Ankara', district: 'Mamak', neighborhood: 'Merkez', isDuty: true, distance: '0.9 km', phone: '0312 368 11 22', address: 'Mamak Cad. No: 104 Mamak Ankara', stocks: { 'Coraspin 100mg': 'Var', 'Glucophage 850mg': 'Var' } },
    { id: 3, name: 'Karşıyaka Çarşı Eczanesi', city: 'İzmir', district: 'Karşıyaka', neighborhood: 'Çarşı', isDuty: true, distance: '0.5 km', phone: '0232 364 88 99', address: 'Karşıyaka Çarşı No: 18 Karşıyaka İzmir', stocks: { 'Coraspin 100mg': 'Var' } }
  ],

  activityLogs: []
};

let state = {};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromLocalStorage();
  applyThemeUI();
  applyTranslations();
  initLiveClock();
  populate81Cities();
  populateDistrictOptions();
  renderPatientDropdown();
  renderActivePatientView();
  renderGlobalMedDatabase();
  filterPharmacies();
  initAnalyticsChart();
  initSpeechRecognition();
});

// --- LocalStorage Persistence Handlers ---
function saveStateToLocalStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('LocalStorage Save Error:', e);
  }
}

function loadStateFromLocalStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch (e) {
      state = JSON.parse(JSON.stringify(defaultInitialState));
    }
  } else {
    state = JSON.parse(JSON.stringify(defaultInitialState));
    saveStateToLocalStorage();
  }
}

function resetAppData() {
  if (confirm("⚠️ VERİLERİ SIFIRLA:\nTüm kayıtlar varsayılan sürüme döndürülecektir. Onaylıyor musunuz?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = JSON.parse(JSON.stringify(defaultInitialState));
    saveStateToLocalStorage();
    location.reload();
  }
}

// Populate 81 Provinces Dropdown
function populate81Cities() {
  const citySelect = document.getElementById('citySelect');
  if (!citySelect) return;
  citySelect.innerHTML = '<option value="all">Tüm İller (81 Şehir)</option>';

  turkey81Provinces.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.innerText = c;
    if (c === state.selectedCity) opt.selected = true;
    citySelect.appendChild(opt);
  });
}

// Populate Global Drug Database Catalog
function renderGlobalMedDatabase(queryStr = '') {
  const container = document.getElementById('globalMedResultsGrid');
  if (!container) return;
  container.innerHTML = '';

  const q = queryStr.toLowerCase().trim();
  const filtered = globalDrugDatabase.filter(d => {
    if (!q) return true;
    return d.name.toLowerCase().includes(q) || d.active.toLowerCase().includes(q) || d.cat.toLowerCase().includes(q);
  });

  filtered.forEach(drug => {
    const card = document.createElement('div');
    card.className = 'global-med-card';
    card.innerHTML = `
      <div>
        <div class="global-med-header">
          <span class="global-med-name">${drug.name}</span>
          <span class="global-med-cat">${drug.cat}</span>
        </div>
        <div class="global-med-detail" style="margin-top: 8px;">
          <p><strong>Etken Madde:</strong> ${drug.active}</p>
          <p><strong>Görsel:</strong> ${drug.color} ${drug.shape}</p>
          <p><strong>Kullanım Şekli:</strong> ${drug.usage}</p>
        </div>
      </div>
      <button class="btn-add-global-med" onclick="addDrugFromGlobalCatalog(${drug.id})">
        <i class="fa-solid fa-plus"></i> Hastaya Ekle
      </button>
    `;
    container.appendChild(card);
  });
}

function searchGlobalMedDatabase() {
  const q = document.getElementById('globalMedSearchInput').value;
  renderGlobalMedDatabase(q);
}

function addDrugFromGlobalCatalog(drugId) {
  const patient = state.patients[state.activePatientId];
  if (!patient) {
    alert("⚠️ Lütfen önce bir hasta profili seçiniz veya ekleyiniz.");
    return;
  }

  const drug = globalDrugDatabase.find(d => d.id === drugId);
  if (!drug) return;

  const newId = Date.now();
  patient.inventory.push({
    id: newId,
    name: drug.name,
    purpose: drug.cat,
    count: 30,
    alertThreshold: 5,
    totalBox: 30,
    color: drug.color,
    shape: drug.shape
  });

  patient.doses.push({
    id: newId + 1,
    medId: newId,
    medName: drug.name,
    time: '08:30',
    period: 'Sabah',
    detail: drug.usage,
    taken: false,
    takenTime: null
  });

  saveStateToLocalStorage();
  renderDosesTimeline();
  renderInventoryGrid();
  renderRefakatciPatientsGrid();

  alert(`✨ ${drug.name} ilacı ${patient.name} profiline başarıyla eklendi!`);
  speakText(`${drug.name} ilacı ${patient.name} reçetesine eklendi.`);
  addRefakatciLog(`[${patient.name}] Yeni İlaç Eklendi: ${drug.name}`);
}

// --- Theme Toggle ---
function toggleDarkLightTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveStateToLocalStorage();
  applyThemeUI();
}

function applyThemeUI() {
  const isDark = state.theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  document.body.classList.toggle('light-theme', !isDark);

  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// --- i18n Language Switcher ---
function switchLanguage(lang) {
  state.lang = lang;
  saveStateToLocalStorage();
  applyTranslations();

  document.getElementById('langTrBtn').classList.toggle('active', lang === 'tr');
  document.getElementById('langEnBtn').classList.toggle('active', lang === 'en');
}

function applyTranslations() {
  const lang = state.lang || 'tr';
  const dict = i18nDict[lang] || i18nDict.tr;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerText = dict[key];
  });
}

function initLiveClock() {
  const updateClock = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const el = document.getElementById('clockTimeStr');
    if (el) el.innerText = timeStr;
  };
  updateClock();
  setInterval(updateClock, 1000);
}

function toggleAudioMute() {
  state.isMuted = !state.isMuted;
  saveStateToLocalStorage();
  updateAudioMuteUI();

  if (state.isMuted && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}

function updateAudioMuteUI() {
  const btn = document.getElementById('muteAudioBtn');
  const icon = document.getElementById('muteIcon');
  const setBtn = document.getElementById('settingsMuteToggleBtn');

  if (state.isMuted) {
    if (btn) btn.classList.add('muted');
    if (icon) icon.className = 'fa-solid fa-volume-xmark';
    if (setBtn) setBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> Ses Kapalı (Açmak İçin Tıklayın)`;
  } else {
    if (btn) btn.classList.remove('muted');
    if (icon) icon.className = 'fa-solid fa-volume-high';
    if (setBtn) setBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Seslendirme Aktif (Kapatmak İçin Tıklayın)`;
  }
}

function phoneticizeForTTS(text) {
  let result = text;
  if (state.lang === 'tr') {
    phoneticMap.forEach(item => { result = result.replace(item.regex, item.replacement); });
  }
  return result;
}

function speakText(text) {
  if (state.isMuted || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const phoneticText = phoneticizeForTTS(text);
  const utterance = new SpeechSynthesisUtterance(phoneticText);
  utterance.lang = state.lang === 'en' ? 'en-US' : 'tr-TR';

  const patient = state.patients[state.activePatientId];
  const gender = patient ? patient.gender : 'Erkek';
  const voices = window.speechSynthesis.getVoices();
  let selectedVoice = null;

  if (voices.length > 0) {
    if (gender === 'Kadın') {
      selectedVoice = voices.find(v => (v.lang.includes('tr') || v.lang.includes('en')) && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zeynep') || v.name.toLowerCase().includes('zira')));
    } else {
      selectedVoice = voices.find(v => (v.lang.includes('tr') || v.lang.includes('en')) && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('tolga') || v.name.toLowerCase().includes('gunduz')));
    }
  }

  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.pitch = gender === 'Kadın' ? 1.35 : 0.70;
  utterance.rate = gender === 'Kadın' ? 0.92 : 0.88;

  window.speechSynthesis.speak(utterance);
}

function renderPatientDropdown() {
  const dropdown = document.getElementById('patientSelectDropdown');
  if (!dropdown) return;
  dropdown.innerHTML = '';

  const patientIds = Object.keys(state.patients);
  if (patientIds.length === 0) {
    dropdown.innerHTML = '<option value="">(Kayıtlı Hasta Yok)</option>';
    return;
  }

  patientIds.forEach(id => {
    const p = state.patients[id];
    const option = document.createElement('option');
    option.value = id;
    option.selected = Number(id) === state.activePatientId;
    option.innerText = `${p.name} (${p.age} Yaş - ${p.gender})`;
    dropdown.appendChild(option);
  });
}

function handlePatientSelectChange(patientIdStr) {
  const patientId = Number(patientIdStr);
  if (!state.patients[patientId]) return;
  state.activePatientId = patientId;

  saveStateToLocalStorage();
  renderActivePatientView();

  const patient = state.patients[patientId];
  speakText(`Aktif hasta değiştirildi: ${patient.name}`);
}

function renderActivePatientView() {
  const patient = state.patients[state.activePatientId];

  if (!patient || Object.keys(state.patients).length === 0) {
    document.getElementById('welcomeHeading').innerHTML = `<i class="fa-regular fa-sun"></i> Kayıtlı Hasta Bulunmamaktadır`;
    document.getElementById('activePatientNameStr').innerText = `Lütfen Ayarlar menüsünden yeni bir hasta profili ekleyiniz.`;
    document.getElementById('medsTimeline').innerHTML = '<p style="padding: 20px; color: var(--text-muted);">İlaç takvimi için hasta ekleyiniz.</p>';
    document.getElementById('inventoryGrid').innerHTML = '';
    updateFamilyHeaderStats();
    renderRefakatciPatientsGrid();
    return;
  }

  document.getElementById('welcomeHeading').innerHTML = `<i class="fa-regular fa-sun"></i> Günaydın, ${patient.name}!`;
  document.getElementById('activePatientNameStr').innerText = `${patient.name} (${patient.age} Yaş - Cinsiyet: ${patient.gender})`;
  document.getElementById('activePatientTag').innerText = patient.name;
  document.getElementById('aiActivePatientNameTag').innerText = patient.name;

  renderDosesTimeline();
  renderInventoryGrid();
  renderRefakatciLogs();
  updateFamilyHeaderStats();
  renderRefakatciPatientsGrid();
}

function switchViewMode(mode) {
  state.currentView = mode;
  document.getElementById('seniorView').classList.toggle('active', mode === 'senior');
  document.getElementById('familyView').classList.toggle('active', mode === 'family');
  
  document.getElementById('seniorModeBtn').classList.toggle('active', mode === 'senior');
  document.getElementById('familyModeBtn').classList.toggle('active', mode === 'family');

  saveStateToLocalStorage();

  if (mode === 'family') {
    renderRefakatciPatientsGrid();
    setTimeout(() => { initAnalyticsChart(); }, 100);
  }
}

// --- Location & District Filter Handlers ---
function populateDistrictOptions() {
  const citySelect = document.getElementById('citySelect');
  const districtSelect = document.getElementById('districtSelect');
  if (!citySelect || !districtSelect) return;

  const currentCity = state.selectedCity || 'all';
  citySelect.value = currentCity;

  districtSelect.innerHTML = '<option value="all">Tüm İlçeler</option>';
  if (currentCity !== 'all' && cityDistrictsMap[currentCity]) {
    cityDistrictsMap[currentCity].forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.innerText = d;
      if (d === state.selectedDistrict) opt.selected = true;
      districtSelect.appendChild(opt);
    });
  }

  updateWeatherDisplay(currentCity);
}

function handleLocationChange() {
  const city = document.getElementById('citySelect').value;
  const district = document.getElementById('districtSelect').value;

  state.selectedCity = city;
  state.selectedDistrict = district;
  saveStateToLocalStorage();

  populateDistrictOptions();
  filterPharmacies();
}

function updateWeatherDisplay(city) {
  const weatherWidget = document.getElementById('weatherTextStr');
  if (weatherWidget) {
    if (city === 'all') {
      weatherWidget.innerText = `Türkiye: 27°C Açık ☀️`;
    } else {
      weatherWidget.innerText = `${city}: ${cityWeatherMap[city] || '26°C Güneşli'}`;
    }
  }
}

function filterPharmacies() {
  const selectedCity = document.getElementById('citySelect').value;
  const selectedDistrict = document.getElementById('districtSelect').value;
  const selectedNeighborhood = document.getElementById('neighborhoodSelect').value;
  const selectedMed = document.getElementById('medSelectFilter').value;
  const query = document.getElementById('pharmacySearchInput').value.trim().toLowerCase();

  const container = document.getElementById('pharmacyList');
  container.innerHTML = '';

  const filtered = state.pharmacies.filter(p => {
    if (selectedCity !== 'all' && p.city !== selectedCity) return false;
    if (selectedDistrict !== 'all' && p.district !== selectedDistrict) return false;
    if (selectedNeighborhood !== 'all' && p.neighborhood !== selectedNeighborhood) return false;

    if (query) {
      const fullText = `${p.name} ${p.city} ${p.district} ${p.neighborhood} ${p.address}`.toLowerCase();
      const terms = query.split(' ');
      const matchesAllTerms = terms.every(term => fullText.includes(term));
      if (!matchesAllTerms) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="padding: 20px; color: var(--text-muted); width: 100%;">Arama kriterlerinize uygun nöbetçi eczane bulunamadı.</p>`;
    return;
  }

  filtered.forEach(p => {
    const stockInfo = selectedMed !== 'all' ? (p.stocks[selectedMed] || 'Sorunuz') : 'Stok Var';
    const isDutyClass = p.isDuty ? 'duty-active' : '';

    const card = document.createElement('div');
    card.className = `pharmacy-card-item ${isDutyClass}`;
    card.innerHTML = `
      ${p.isDuty ? `<span class="duty-badge"><i class="fa-solid fa-moon"></i> NÖBETÇİ ECZANE</span>` : ''}
      <div class="pharmacy-name">${p.name}</div>
      <div class="pharmacy-address"><i class="fa-solid fa-location-dot"></i> ${p.address} (${p.distance})</div>
      <div class="stock-status-tag">
        <i class="fa-solid fa-boxes-stacked"></i> Stok Durumu: 
        <strong style="color: ${stockInfo === 'Var' ? 'var(--success)' : 'var(--warning)'}">${stockInfo}</strong>
      </div>
      <button class="btn-send-prescription" onclick="sendToPharmacyModal('${p.name}', '${selectedMed !== 'all' ? selectedMed : 'Biten İlaçlar'}')">
        <i class="fa-solid fa-paper-plane"></i> Reçeteyi Gönder
      </button>
    `;
    container.appendChild(card);
  });
}

function sendToPharmacyModal(pharmacyName, medName) {
  const patient = state.patients[state.activePatientId];
  const pName = patient ? patient.name : 'Hasta';
  alert(`✅ BİLDİRİM İLETİLDİ:\nHasta: ${pName}\n"${medName}" ilacınız ${pharmacyName} sistemine iletildi.`);
  addRefakatciLog(`[${pName}] Eczane Siparişi Verildi: ${medName} -> ${pharmacyName}`);
}

function scrollToPharmacies() {
  document.getElementById('pharmacySection').scrollIntoView({ behavior: 'smooth' });
}

function renderDosesTimeline() {
  const patient = state.patients[state.activePatientId];
  if (!patient) return;
  const container = document.getElementById('medsTimeline');
  container.innerHTML = '';

  patient.doses.forEach(dose => {
    const card = document.createElement('div');
    card.className = `dose-card ${dose.taken ? 'taken' : ''}`;
    card.innerHTML = `
      <div class="dose-time">
        <span class="time-badge">${dose.time}</span>
        <span class="period-text"><strong>${dose.period}</strong></span>
      </div>
      <div class="dose-info">
        <h4>${dose.medName}</h4>
        <p><i class="fa-solid fa-circle-info"></i> ${dose.detail} ${dose.taken ? `• <em>Alındı (${dose.takenTime})</em>` : ''}</p>
      </div>
      <div>
        ${dose.taken 
          ? `<button class="btn-take-dose completed"><i class="fa-solid fa-check"></i> İçildi (+)</button>`
          : `<button class="btn-take-dose" onclick="markDoseTaken(${dose.id})"><i class="fa-solid fa-plus"></i> İçtim (+)</button>`
        }
      </div>
    `;
    container.appendChild(card);
  });

  updateAdherenceHeader();
}

function markDoseTaken(doseId) {
  const patient = state.patients[state.activePatientId];
  if (!patient) return;
  const dose = patient.doses.find(d => d.id === doseId);
  if (!dose || dose.taken) return;

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  dose.taken = true;
  dose.takenTime = timeStr;

  const invItem = patient.inventory.find(i => i.id === dose.medId);
  if (invItem && invItem.count > 0) invItem.count--;

  saveStateToLocalStorage();
  renderDosesTimeline();
  renderInventoryGrid();
  renderRefakatciPatientsGrid();
  addRefakatciLog(`[${patient.name}] ${dose.medName} ilacını saat ${timeStr}'de içti.`);

  speakText(`Aferin ${patient.name}! ${dose.medName} ilacınızı aldığınızı kaydettim.`);
}

function renderInventoryGrid() {
  const patient = state.patients[state.activePatientId];
  if (!patient) return;
  const container = document.getElementById('inventoryGrid');
  container.innerHTML = '';

  patient.inventory.forEach(item => {
    let stockClass = 'stock-ok';
    let stockText = 'Stok Yeterli';
    if (item.count === 0) {
      stockClass = 'stock-empty';
      stockText = 'TÜKENDİ!';
    } else if (item.count <= item.alertThreshold) {
      stockClass = 'stock-low';
      stockText = `AZALDI! (${item.count} Kalan)`;
    }

    const pct = Math.min(100, Math.round((item.count / item.totalBox) * 100));

    const card = document.createElement('div');
    card.className = 'inv-card';
    card.innerHTML = `
      <div class="inv-header">
        <span class="inv-title">${item.name}</span>
        <span class="stock-badge ${stockClass}">${stockText}</span>
      </div>
      <p style="font-size: 14px; color: var(--text-muted);">${item.purpose} | <strong>${item.color || 'Beyaz'} ${item.shape || 'Tablet'}</strong></p>
      <div class="stock-progress-bar">
        <div class="progress-fill" style="width: ${pct}%;"></div>
      </div>
      <div class="inv-actions">
        <span style="font-size: 14px; font-weight: 700;">${item.count} / ${item.totalBox} Adet</span>
        <button class="btn-refill-trigger" onclick="orderRefill('${item.name}')">
          <i class="fa-solid fa-truck-ramp-box"></i> Eczaneye Gönder
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function orderRefill(medName) {
  document.getElementById('medSelectFilter').value = medName;
  filterPharmacies();
  scrollToPharmacies();
  speakText(`${medName} ilacı için en yakın nöbetçi eczaneler listelendi.`);
}

// --- Auth Modal ---
function openAuthModal(tab) {
  document.getElementById('authModal').classList.add('active');
  switchAuthTab(tab || 'tc');
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
}

function switchAuthTab(tab) {
  document.getElementById('tabTcLoginBtn').classList.toggle('active', tab === 'tc');
  document.getElementById('tabEDevletBtn').classList.toggle('active', tab === 'edevlet');
  document.getElementById('authTcSection').classList.toggle('hidden', tab !== 'tc');
  document.getElementById('authEDevletSection').classList.toggle('hidden', tab !== 'edevlet');
}

function processTcLogin() {
  const tc = document.getElementById('loginTcInput').value.trim();
  if (tc.length !== 11) {
    alert("Lütfen 11 haneli T.C. Kimlik numaranızı giriniz.");
    return;
  }
  closeAuthModal();
  alert(`🔑 T.C. Kimlik (${tc}) Oturumu Açıldı.`);
}

function simulateEDevletLogin() {
  closeAuthModal();
  alert("🇹🇷 E-DEVLET KAPI İLE GİRİŞ BAŞARILI.");
}

function toggle2FA() {
  state.is2FAEnabled = !state.is2FAEnabled;
  saveStateToLocalStorage();

  const btn = document.getElementById('toggle2faBtn');
  if (btn) {
    btn.innerHTML = state.is2FAEnabled 
      ? `<i class="fa-solid fa-shield-check"></i> 2FA AKTİF (Kapatmak İçin Tıklayın)`
      : `<i class="fa-solid fa-lock"></i> 2FA Aktif Et`;
  }
}

// --- Settings Modal ---
function openSettingsModal(tab) {
  document.getElementById('settingsModal').classList.add('active');
  switchSettingsTab(tab || 'profiles');
  renderSettingsLists();
}

function closeSettingsModal() {
  document.getElementById('settingsModal').classList.remove('active');
}

function switchSettingsTab(tab) {
  document.getElementById('setTabProfilesBtn').classList.toggle('active', tab === 'profiles');
  document.getElementById('setTabCaregiversBtn').classList.toggle('active', tab === 'caregivers');
  document.getElementById('setTabAudioBtn').classList.toggle('active', tab === 'audio');
  document.getElementById('setTabSecurityBtn').classList.toggle('active', tab === 'security');

  document.getElementById('settingsProfilesSection').classList.toggle('hidden', tab !== 'profiles');
  document.getElementById('settingsCaregiversSection').classList.toggle('hidden', tab !== 'caregivers');
  document.getElementById('settingsAudioSection').classList.toggle('hidden', tab !== 'audio');
  document.getElementById('settingsSecuritySection').classList.toggle('hidden', tab !== 'security');
}

function renderSettingsLists() {
  const patList = document.getElementById('registeredPatientsListView');
  if (patList) {
    patList.innerHTML = '';
    const patientIds = Object.keys(state.patients);
    if (patientIds.length === 0) {
      patList.innerHTML = '<li style="color: var(--text-muted);">Kayıtlı hasta bulunmamaktadır.</li>';
    } else {
      patientIds.forEach(id => {
        const p = state.patients[id];
        const li = document.createElement('li');
        li.innerHTML = `
          <span><i class="fa-solid fa-user"></i> <strong>${p.name}</strong> (${p.age} Yaş - ${p.gender})</span>
          <button style="background:#fee2e2; color:#dc2626; border:none; padding:4px 8px; border-radius:6px; cursor:pointer;" onclick="deletePatient(${p.id})">Sil</button>
        `;
        patList.appendChild(li);
      });
    }
  }

  const careList = document.getElementById('registeredCaregiversListView');
  if (careList) {
    careList.innerHTML = '';
    (state.caregivers || []).forEach(c => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span><i class="fa-solid fa-user-nurse"></i> <strong>${c.name}</strong> (${c.relation} - ${c.phone})</span>
        <button style="background:#fee2e2; color:#dc2626; border:none; padding:4px 8px; border-radius:6px; cursor:pointer;" onclick="deleteCaregiver(${c.id})">Sil</button>
      `;
      careList.appendChild(li);
    });
  }
}

function handleCreatePatientSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('newPatName').value.trim();
  const gender = document.getElementById('newPatGender').value;
  const age = Number(document.getElementById('newPatAge').value);
  const relation = document.getElementById('newPatRelation').value.trim();
  const med = document.getElementById('newPatMed').value.trim();
  const illness = document.getElementById('newPatIllness').value.trim();

  const newId = Date.now();
  state.patients[newId] = {
    id: newId,
    name: name,
    gender: gender,
    age: age,
    relation: relation,
    illnesses: illness || 'Genel Takip',
    inventory: [
      { id: newId + 1, name: med || 'Tansiyon İlacı', purpose: 'Günlük Kullanım', count: 30, alertThreshold: 5, totalBox: 30, color: 'Beyaz', shape: 'Tablet' }
    ],
    doses: [
      { id: newId + 2, medId: newId + 1, medName: med || 'Tansiyon İlacı', time: '08:30', period: 'Sabah', detail: '1 Tablet (Tok Karnına)', taken: false, takenTime: null }
    ]
  };

  state.activePatientId = newId;
  saveStateToLocalStorage();

  renderPatientDropdown();
  renderActivePatientView();
  renderSettingsLists();
  closeSettingsModal();

  alert(`✨ HASTA PROFİLİ EKLENDİ!\n${name} (${gender}) sisteme eklendi.`);
  speakText(`Yeni hasta ${name} kaydedildi.`);
}

function deletePatient(patientId) {
  if (confirm(`" ${state.patients[patientId].name} " profilini silmek istediğinize emin misiniz?`)) {
    delete state.patients[patientId];
    const remainingIds = Object.keys(state.patients);
    if (remainingIds.length > 0) {
      state.activePatientId = Number(remainingIds[0]);
    } else {
      state.activePatientId = null;
    }
    saveStateToLocalStorage();
    renderPatientDropdown();
    renderActivePatientView();
    renderSettingsLists();
  }
}

function handleCreateCaregiverSubmit(event) {
  event.preventDefault();
  if (!state.caregivers) state.caregivers = [];

  if (state.caregivers.length >= 2) {
    alert("⚠️ REFAKATÇİ LİMİTİ (MAX 2):\nSistemde maksimum 2 refakatçi tanımlanabilir. Lütfen yenisini eklemek için birini siliniz.");
    return;
  }

  const name = document.getElementById('newCareName').value.trim();
  const phone = document.getElementById('newCarePhone').value.trim();
  const relation = document.getElementById('newCareRelation').value.trim();

  state.caregivers.push({ id: Date.now(), name: name, phone: phone, relation: relation });
  saveStateToLocalStorage();
  renderSettingsLists();
  updateFamilyHeaderStats();
  alert(`✅ Refakatçi ${name} eklendi! (${state.caregivers.length}/2)`);
}

function deleteCaregiver(caregiverId) {
  state.caregivers = state.caregivers.filter(c => c.id !== caregiverId);
  saveStateToLocalStorage();
  renderSettingsLists();
  updateFamilyHeaderStats();
}

// --- Dynamic Refakatçi Patient Cards Renderer & Header Stats FIX ---
function renderRefakatciPatientsGrid() {
  const container = document.getElementById('familyPatientsGrid');
  if (!container) return;
  container.innerHTML = '';

  const patientIds = Object.keys(state.patients);
  if (patientIds.length === 0) {
    container.innerHTML = '<p style="padding: 20px; color: var(--text-muted); width: 100%;">Kayıtlı hasta bulunmamaktadır.</p>';
    return;
  }

  patientIds.forEach(id => {
    const p = state.patients[id];
    const totalDoses = p.doses.length;
    const takenDoses = p.doses.filter(d => d.taken).length;
    const pct = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;

    const card = document.createElement('div');
    card.className = 'family-patient-card';
    card.innerHTML = `
      <div class="family-patient-header">
        <span class="family-patient-name"><i class="fa-solid fa-user"></i> ${p.name} (${p.age})</span>
        <span class="family-patient-relation">${p.relation} • ${p.gender}</span>
      </div>
      <p style="font-size: 14px; color: var(--text-muted);"><strong>Rahatsızlıklar:</strong> ${p.illnesses || 'Genel Takip'}</p>
      <div class="family-patient-stats">
        <span>Bugünkü Dozlar: <strong>${takenDoses} / ${totalDoses}</strong></span>
        <span style="color: ${pct === 100 ? 'var(--success)' : 'var(--warning)'}">Uyum: <strong>%${pct}</strong></span>
      </div>
      <button class="btn-primary-block" style="font-size: 13px; padding: 8px;" onclick="switchPatient(${p.id}); switchViewMode('senior');">
        <i class="fa-solid fa-eye"></i> Hastanın Detaylı Ekranına Git
      </button>
    `;
    container.appendChild(card);
  });
}

function updateFamilyHeaderStats() {
  const patientIds = Object.keys(state.patients);
  const patientNames = patientIds.length > 0 
    ? patientIds.map(id => state.patients[id].name).join(' & ')
    : 'Kayıtlı Hasta Bulunmamaktadır';

  const elStr = document.getElementById('familyActivePatientsStr');
  if (elStr) elStr.innerText = patientNames;

  const elCnt = document.getElementById('familyPatientCountVal');
  if (elCnt) elCnt.innerText = `${patientIds.length} Kayıtlı Hasta`;

  const careStr = document.getElementById('familyCaregiversListStr');
  if (careStr) {
    careStr.innerText = (state.caregivers && state.caregivers.length > 0)
      ? state.caregivers.map(c => `${c.name} (${c.relation})`).join(', ')
      : 'Kayıtlı Refakatçi Bulunmamaktadır';
  }
}

// --- AI Personas ---
function switchAIPersona(persona) {
  state.activeAIPersona = persona;
  document.getElementById('docTabBtn').classList.toggle('active', persona === 'doctor');
  document.getElementById('nurseTabBtn').classList.toggle('active', persona === 'nurse');

  const avatar = document.querySelector('.chat-header .avatar-icon');
  const title = document.getElementById('personaTitle');
  const desc = document.getElementById('personaDesc');

  if (persona === 'doctor') {
    avatar.className = 'avatar-icon doc-avatar';
    avatar.innerHTML = '<i class="fa-solid fa-user-doctor"></i>';
    title.innerText = 'Dr. AI Sağlık Danışmanı';
    desc.innerText = 'Resmi medikal teşhis, tıbbi prospektüs ve klinik etkileşim danışmanı';
  } else {
    avatar.className = 'avatar-icon doc-avatar nurse-avatar';
    avatar.innerHTML = '<i class="fa-solid fa-user-nurse"></i>';
    title.innerText = 'Hemşire AI Kullanım Asistanı';
    desc.innerText = 'Sıcak samimi rehberlik, aç/tok karnına püf noktaları ve içme motivasyonu';
  }
}

function handleChatKeyPress(e) { if (e.key === 'Enter') sendChatMessage(); }

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const chatContainer = document.getElementById('chatMessages');
  const patient = state.patients[state.activePatientId];
  const pName = patient ? patient.name : 'Hasta';

  const userMsg = document.createElement('div');
  userMsg.className = 'message user-msg';
  userMsg.innerHTML = `<div class="msg-content">${text}</div>`;
  chatContainer.appendChild(userMsg);

  input.value = '';
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    let responseText = "";
    const medsList = patient ? patient.inventory.map(i => i.name).join(', ') : 'Reçeteli ilaçlar';

    if (state.activeAIPersona === 'doctor') {
      if (text.toLowerCase().includes('aç') || text.toLowerCase().includes('tok')) {
        responseText = `🏥 Dr. AI Klinik Değerlendirmesi: Sayın ${pName}, tıbbi prospektüs veritabanına göre ilaçlarınız (${medsList}) mide mukozası koruması için tok karnına bol su ile tüketilmelidir.`;
      } else {
        responseText = `🏥 Dr. AI Tıbbi Tavsiyesi: Sayın ${pName}, (${patient ? patient.illnesses : 'Kayıtlı Sağlık Geçmişi'}) teşhisiniz göz önüne alınarak, reçetenizdeki ${medsList} dozajına uymanız hayati önem taşır.`;
      }
    } else {
      if (text.toLowerCase().includes('aç') || text.toLowerCase().includes('tok')) {
        responseText = `👩‍⚕️ Hemşire Asistanınız: ${pName} Amcam/Teyzem benim, güzelce kahvaltını yap, 1 bardak ılık suyla hapını yut ve ilacı içtikten sonra sakın 15 dakika uzanma dik otur tamam mı!`;
      } else {
        responseText = `👩‍⚕️ Hemşire Asistanınız: ${pName} ilacını içtikten sonra dinlen, bol sıvı tüketmeyi unutma. Ben her doz saatinde sana hatırlatma yapacağım!`;
      }
    }

    const aiMsg = document.createElement('div');
    aiMsg.className = 'message ai-msg';
    aiMsg.innerHTML = `<div class="msg-content">${responseText}</div>`;
    chatContainer.appendChild(aiMsg);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    speakText(responseText);
  }, 700);
}

// Vitals & ESP32 Modals
function openVitalsModal() { document.getElementById('vitalsModal').classList.add('active'); }
function closeVitalsModal() { document.getElementById('vitalsModal').classList.remove('active'); }
function handleSaveVitals(e) {
  e.preventDefault();
  const sys = document.getElementById('vitalsSys').value;
  const dia = document.getElementById('vitalsDia').value;
  closeVitalsModal();
  alert(`✅ Ölçüm Kaydedildi: Tansiyon ${sys}/${dia} mmHg`);
  addRefakatciLog(`🩺 Ölçüm Kaydı: Tansiyon ${sys}/${dia} mmHg`);
}

function openESP32Modal(mode) {
  state.esp32Mode = mode || 'ocr';
  document.getElementById('esp32Modal').classList.add('active');
  switchESP32Mode(state.esp32Mode);
}
function closeESP32Modal() { document.getElementById('esp32Modal').classList.remove('active'); }
function switchESP32Mode(mode) {
  state.esp32Mode = mode;
  document.getElementById('ocrModeBtn').classList.toggle('active', mode === 'ocr');
  document.getElementById('pillModeBtn').classList.toggle('active', mode === 'pill');
  document.getElementById('ocrSamplesGroup').classList.toggle('hidden', mode !== 'ocr');
  document.getElementById('pillSamplesGroup').classList.toggle('hidden', mode !== 'pill');
  document.getElementById('scanResultContainer').classList.add('hidden');
}

function simulateScan(medName, medType, countStr, doseTiming) {
  const text = document.getElementById('scanStatusText');
  text.innerText = "ESP32 Kamerası Kutuyu Okuyor...";
  setTimeout(() => {
    state.scannedTemp = { name: medName, type: medType, countStr: countStr, timing: doseTiming };
    document.getElementById('scannedInfoContent').innerHTML = `<p><strong>İlaç:</strong> ${medName}</p><p><strong>Tür:</strong> ${medType}</p>`;
    document.getElementById('scanResultContainer').classList.remove('hidden');
    text.innerText = "✅ İlaç Algılandı!";
  }, 900);
}

function verifyPillScan(color, shape, medName, isCorrectMatch) {
  const text = document.getElementById('scanStatusText');
  text.innerText = `${color} ${shape} Hap Doğrulanıyor...`;
  setTimeout(() => {
    state.verifiedPillTemp = { color, shape, medName, isCorrectMatch };
    const resCard = document.getElementById('scanResultContainer');
    const info = document.getElementById('scannedInfoContent');
    const btn = document.getElementById('btnConfirmESP32');

    if (isCorrectMatch) {
      resCard.className = "scan-result-card";
      info.innerHTML = `<p style="color:var(--success); font-weight:800;">✅ DOĞRU İLAÇ: ${color} ${shape} (${medName})</p>`;
      btn.className = "btn-confirm-add";
      btn.innerText = "Onayla: İlacı İçtim (+)";
    } else {
      resCard.className = "scan-result-card pill-error";
      info.innerHTML = `<p style="color:var(--danger); font-weight:800;">🚨 TEHLİKE: YANLIŞ HAP! LÜTFEN YUTMAYIN!</p>`;
      btn.className = "btn-confirm-add btn-danger-confirm";
      btn.innerText = "Dur! Yanlış İlacı İptal Et";
    }
    resCard.classList.remove('hidden');
  }, 900);
}

function confirmESP32Action() {
  const patient = state.patients[state.activePatientId];
  if (!patient) { closeESP32Modal(); return; }

  if (state.esp32Mode === 'ocr' && state.scannedTemp) {
    const newId = Date.now();
    patient.inventory.push({ id: newId, name: state.scannedTemp.name, purpose: state.scannedTemp.type, count: 30, alertThreshold: 5, totalBox: 30, color: 'Beyaz', shape: 'Tablet' });
    patient.doses.push({ id: newId + 1, medId: newId, medName: state.scannedTemp.name, time: '20:00', period: 'Akşam', detail: state.scannedTemp.timing, taken: false, takenTime: null });
    saveStateToLocalStorage();
    renderDosesTimeline();
    renderInventoryGrid();
    renderRefakatciPatientsGrid();
    closeESP32Modal();
    alert(`✨ ${state.scannedTemp.name} ilacı eklendi!`);
  } else if (state.esp32Mode === 'pill' && state.verifiedPillTemp) {
    if (state.verifiedPillTemp.isCorrectMatch) {
      const pendingDose = patient.doses.find(d => !d.taken);
      if (pendingDose) markDoseTaken(pendingDose.id);
    }
    closeESP32Modal();
  }
}

// Voice Engine
function initSpeechRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    state.speechRecognition = new SR();
    state.speechRecognition.lang = state.lang === 'en' ? 'en-US' : 'tr-TR';
    state.speechRecognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase();
      document.getElementById('voiceRecognizedText').innerText = `Algılanan Ses: "${transcript}"`;
      handleVoiceCommand(transcript);
    };
  }
}

function toggleVoiceAssist() {
  const btn = document.getElementById('voiceAssistBtn');
  const bar = document.getElementById('voiceFeedbackBar');
  state.voiceAssistActive = !state.voiceAssistActive;
  btn.classList.toggle('listening', state.voiceAssistActive);
  bar.classList.toggle('hidden', !state.voiceAssistActive);

  if (state.voiceAssistActive && state.speechRecognition) {
    try { state.speechRecognition.start(); } catch(e) {}
  } else if (!state.voiceAssistActive && state.speechRecognition) {
    try { state.speechRecognition.stop(); } catch(e) {}
  }
}

function startVoiceChatInput() { toggleVoiceAssist(); }
function handleVoiceCommand(cmd) {
  const patient = state.patients[state.activePatientId];
  if (!patient) return;

  if (cmd.includes('içtim') || cmd.includes('aldım') || cmd.includes('took')) {
    const pendingDose = patient.doses.find(d => !d.taken);
    if (pendingDose) markDoseTaken(pendingDose.id);
  } else if (cmd.includes('eczane') || cmd.includes('pharmacy')) {
    scrollToPharmacies();
  } else {
    document.getElementById('chatInput').value = cmd;
    sendChatMessage();
  }
}

function triggerSOS() {
  const patient = state.patients[state.activePatientId];
  const pName = patient ? patient.name : 'Hasta';
  speakText(`Acil durum uyarısı başlatıldı.`);
  alert(`🚨 SOS ACİL DURUM TETİKLENDİ:\nHasta: ${pName}\n112 Acil Yardım ve Refakatçi Uyarıldı.`);
  addRefakatciLog(`🚨 ACİL DURUM (SOS): [${pName}] 112 Uyarıldı.`);
}

function addRefakatciLog(message) {
  if (!state.activityLogs) state.activityLogs = [];
  const now = new Date();
  const timeStr = `Bugün ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  state.activityLogs.unshift({ time: timeStr, text: message });
  saveStateToLocalStorage();
  renderRefakatciLogs();
}

function renderRefakatciLogs() {
  const list = document.getElementById('activityLogList');
  if (!list) return;
  list.innerHTML = '';
  if (!state.activityLogs || state.activityLogs.length === 0) {
    list.innerHTML = '<li>Henüz bildirim kaydı yok.</li>';
    return;
  }
  state.activityLogs.slice(0, 10).forEach(log => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="log-time">${log.time}</span><span class="log-text">${log.text}</span>`;
    list.appendChild(li);
  });
}

function updateAdherenceHeader() {
  const patient = state.patients[state.activePatientId];
  if (!patient) return;
  const total = patient.doses.length;
  const taken = patient.doses.filter(d => d.taken).length;
  const statusEl = document.getElementById('overallAdherenceStatus');

  if (taken === total) {
    statusEl.innerHTML = `<span class="status-pill status-good"><i class="fa-solid fa-circle-check"></i> Tüm Dozlar İçildi (${taken}/${total})</span>`;
  } else {
    statusEl.innerHTML = `<span class="status-pill status-good" style="background: var(--warning-bg); color: var(--warning);"><i class="fa-solid fa-clock"></i> Bugün ${taken}/${total} Doz Tamamlandı</span>`;
  }
}

function initAnalyticsChart() {
  const ctx = document.getElementById('adherenceChart');
  if (!ctx) return;
  if (window.myAdherenceChart) window.myAdherenceChart.destroy();

  const patientIds = Object.keys(state.patients);
  const colors = ['#0284c7', '#0d9488', '#7c3aed', '#d97706'];

  const datasets = patientIds.map((id, idx) => {
    const p = state.patients[id];
    return {
      label: `${p.name} (%)`,
      data: [100, 90, 85, 100, 100, 95, 100],
      backgroundColor: colors[idx % colors.length],
      borderRadius: 6
    };
  });

  window.myAdherenceChart = new Chart(ctx, {
    type: 'bar',
    data: { labels: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'], datasets: datasets },
    options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
  });
}
