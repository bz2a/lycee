// --- CONFIGURATION ---
// ✅ تم تحديث الرابط هنا بآخر نسخة قدمتها
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxzL8U7V8RC2IbCld7upfWwXfqDyWCLZhDAMpGrqIVRkanr-FAFgJtFsUKpAZR5vK30eQ/exec";

// --- DOM ELEMENTS ---
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const academicYearSelect = document.getElementById('academicYear');
const specializationContainer = document.getElementById('specializationContainer');
const specializationSelect = document.getElementById('specialization');
const otherLangContainer = document.getElementById('otherLangContainer');
const otherLangDetailsInput = document.getElementById('otherLangDetails');
const illnessYesRadio = document.getElementById('illnessYes');
const illnessNoRadio = document.getElementById('illnessNo');
const illnessDetailsContainer = document.getElementById('illnessDetailsContainer');
const successMessageDiv = document.getElementById('successMessage');
const langIndicator = document.getElementById('langIndicator');

// --- LANGUAGE & DATA SETUP ---
const languages = ['ar', 'fr', 'en'];
let currentLangIndex = 0;

const translations = {
    ar: { form_title: "منصة التسجيل وإعادة التسجيل للسنة الدراسية الجديدة", form_subtitle: "ثانوية علي بن ربيعة الخاصة", full_name: "الاسم الكامل", dob: "تاريخ الميلاد", student_phone: "رقم هاتف التلميذ", guardian_phone: "رقم هاتف الولي", email: "البريد الإلكتروني", address: "عنوان السكن", previous_school: "المؤسسة التعليمية السابقة", guardian_relationship: "صلة الولي بالتلميذ (مثال: أب، أم، عم، خال...)", academic_year: "السنة الدراسية", select_option: "-- اختر السنة --", year_1as: "الأولى ثانوي (1AS)", year_2as: "الثانية ثانوي (2AS)", year_3as: "الثالثة ثانوي (3AS)", specialization: "التخصص", select_option_spec: "-- اختر التخصص --", chronic_illness_q: "هل يعاني التلميذ من مرض مزمن؟", yes: "نعم", no: "لا", chronic_illness_details: "يرجى تحديد نوع المرض", register_btn: "تسجيل", success_message: "🎉 شكراً لتسجيلك في ثانوية علي بن ربيعة الخاصة", fill_all_fields: "يرجى ملء جميع الحقول الإلزامية.", submit_error: "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.", sending: "جاري الإرسال...", other_lang_details: "يرجى تحديد اللغة الأخرى" },
    fr: { form_title: "Inscription d'un nouvel élève", form_subtitle: "Lycée Privé Ali Ben Rabiaa", full_name: "Nom complet", dob: "Date de naissance", student_phone: "Téléphone de l'élève", guardian_phone: "Téléphone du tuteur", email: "Adresse e-mail", address: "Adresse de résidence", previous_school: "Établissement scolaire précédent", guardian_relationship: "Lien de parenté avec l'élève (Ex: Père, Mère, Oncle...)", academic_year: "Année scolaire", select_option: "-- Choisissez l'année --", year_1as: "Première Année (1AS)", year_2as: "Deuxième Année (2AS)", year_3as: "Troisième Année (3AS)", specialization: "Spécialité", select_option_spec: "-- Choisissez la spécialité --", chronic_illness_q: "L'élève souffre-t-il d'une maladie chronique ?", yes: "Oui", no: "Non", chronic_illness_details: "Veuillez spécifier la maladie", register_btn: "Inscrire", success_message: "🎉 Merci pour votre inscription au Lycée Privé Ali Ben Rabiaa", fill_all_fields: "Veuillez remplir tous les champs obligatoires.", submit_error: "Une erreur est survenue. Veuillez réessayer.", sending: "Envoi en cours...", other_lang_details: "Veuillez préciser l'autre langue" },
    en: { form_title: "New Student Registration", form_subtitle: "Ali Ben Rabiaa Private High School", full_name: "Full Name", dob: "Date of Birth", student_phone: "Student's Phone Number", guardian_phone: "Guardian's Phone Number", email: "Email Address", address: "Home Address", previous_school: "Previous School", guardian_relationship: "Guardian's Relationship to Student (e.g., Father, Mother, Uncle...)", academic_year: "Academic Year", select_option: "-- Select Year --", year_1as: "1st Year (1AS)", year_2as: "2nd Year (2AS)", year_3as: "3rd Year (3AS)", specialization: "Specialization", select_option_spec: "-- Select Specialization --", chronic_illness_q: "Does the student have a chronic illness?", yes: "Yes", no: "No", chronic_illness_details: "Please specify the illness", register_btn: "Register", success_message: "🎉 Thank you for registering at Ali Ben Rabiaa Private High School", fill_all_fields: "Please fill in all required fields.", submit_error: "An error occurred during submission. Please try again.", sending: "Sending...", other_lang_details: "Please specify the other language" }
};

const specializationsData = { "1AS": { "common_science": { ar: "🔬 جذع مشترك علوم وتكنولوجيا", fr: "🔬 Tronc commun sciences et technologie", en: "🔬 Common Core Science & Tech" }, "common_arts": { ar: "📚 جذع مشترك آداب", fr: "📚 Tronc commun lettres", en: "📚 Common Core Arts" } }, "2AS": { "exp_sciences": { ar: "🧪 علوم تجريبية", fr: "🧪 Sciences expérimentales", en: "🧪 Experimental Sciences" }, "math": { ar: "📐 رياضيات", fr: "📐 Mathématiques", en: "📐 Mathematics" }, "mech_eng": { ar: "⚙️ تقني رياضي (هندسة ميكانيكية)", fr: "⚙️ Tech Math (Génie mécanique)", en: "⚙️ Math Tech (Mechanical Eng.)" }, "elec_eng": { ar: "🔌 تقني رياضي (هندسة كهربائية)", fr: "🔌 Tech Math (Génie électrique)", en: "🔌 Math Tech (Electrical Eng.)" }, "civil_eng": { ar: "🏗️ تقني رياضي (هندسة مدنية)", fr: "🏗️ Tech Math (Génie civil)", en: "🏗️ Math Tech (Civil Eng.)" }, "proc_eng": { ar: "🧪 تقني رياضي (هندسة الطرائق)", fr: "🧪 Tech Math (Génie des procédés)", en: "🧪 Math Tech (Process Eng.)" }, "philosophy": { ar: "🧠 آداب وفلسفة", fr: "🧠 Lettres et philosophie", en: "🧠 Arts & Philosophy" }, "lang_es": { ar: "🇪🇸 لغات أجنبية (إسبانية)", fr: "🇪🇸 Langues étrangères (Espagnol)", en: "🇪🇸 Foreign Languages (Spanish)" }, "lang_de": { ar: "🇩🇪 لغات أجنبية (ألمانية)", fr: "🇩🇪 Langues étrangères (Allemand)", en: "🇩🇪 Foreign Languages (German)" }, "lang_other": { ar: "🌐 لغات أجنبية (أخرى)", fr: "🌐 Langues étrangères (Autre)", en: "🌐 Foreign Languages (Other)" }, "management": { ar: "💼 تسيير واقتصاد", fr: "💼 Gestion et économie", en: "💼 Management & Economics" } }, "3AS": { "exp_sciences": { ar: "🧪 علوم تجريبية", fr: "🧪 Sciences expérimentales", en: "🧪 Experimental Sciences" }, "math": { ar: "📐 رياضيات", fr: "📐 Mathématiques", en: "📐 Mathematics" }, "mech_eng": { ar: "⚙️ تقني رياضي (هندسة ميكانيكية)", fr: "⚙️ Tech Math (Génie mécanique)", en: "⚙️ Math Tech (Mechanical Eng.)" }, "elec_eng": { ar: "🔌 تقني رياضي (هندسة كهربائية)", fr: "🔌 Tech Math (Génie électrique)", en: "🔌 Math Tech (Electrical Eng.)" }, "civil_eng": { ar: "🏗️ تقني رياضي (هندسة مدنية)", fr: "🏗️ Tech Math (Génie civil)", en: "🏗️ Math Tech (Civil Eng.)" }, "proc_eng": { ar: "🧪 تقني رياضي (هندسة الطرائق)", fr: "🧪 Tech Math (Génie des procédés)", en: "🧪 Math Tech (Process Eng.)" }, "philosophy": { ar: "🧠 آداب وفلسفة", fr: "🧠 Lettres et philosophie", en: "🧠 Arts & Philosophy" }, "lang_es": { ar: "🇪🇸 لغات أجنبية (إسبانية)", fr: "🇪🇸 Langues étrangères (Espagnol)", en: "🇪🇸 Foreign Languages (Spanish)" }, "lang_de": { ar: "🇩🇪 لغات أجنبية (ألمانية)", fr: "🇩🇪 Langues étrangères (Allemand)", en: "🇩🇪 Foreign Languages (German)" }, "lang_other": { ar: "🌐 لغات أجنبية (أخرى)", fr: "🌐 Langues étrangères (Autre)", en: "🌐 Foreign Languages (Other)" }, "management": { ar: "💼 تسيير واقتصاد", fr: "💼 Gestion et économie", en: "💼 Management & Economics" } } };

function cycleLanguage() { currentLangIndex = (currentLangIndex + 1) % languages.length; changeLanguage(languages[currentLangIndex]); }
function changeLanguage(lang) { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; langIndicator.textContent = lang.toUpperCase(); document.querySelectorAll('[data-lang-key]').forEach(el => { const key = el.getAttribute('data-lang-key'); if (translations[lang] && translations[lang][key]) { el.innerHTML = translations[lang][key]; } }); updateAcademicYearOptions(lang); updateSpecializationOptions(academicYearSelect.value, lang); }
function updateSpecializationOptions(year, lang) { specializationSelect.innerHTML = ''; const defaultOption = document.createElement('option'); defaultOption.value = ""; defaultOption.textContent = translations[lang].select_option_spec; specializationSelect.appendChild(defaultOption); if (year && specializationsData[year]) { specializationContainer.style.display = 'block'; for (const key in specializationsData[year]) { const option = document.createElement('option'); option.value = key; option.textContent = specializationsData[year][key][lang]; specializationSelect.appendChild(option); } } else { specializationContainer.style.display = 'none'; } }
function updateAcademicYearOptions(lang) { academicYearSelect.querySelectorAll('option').forEach(opt => { const key = opt.getAttribute('data-lang-key'); if (key && translations[lang][key]) { opt.textContent = translations[lang][key]; } }); }

academicYearSelect.addEventListener('change', () => { updateSpecializationOptions(academicYearSelect.value, document.documentElement.lang); otherLangContainer.style.display = 'none'; });
specializationSelect.addEventListener('change', () => { if (specializationSelect.value === 'lang_other') { otherLangContainer.style.display = 'block'; otherLangDetailsInput.required = true; } else { otherLangContainer.style.display = 'none'; otherLangDetailsInput.required = false; } });
illnessYesRadio.addEventListener('change', () => { if (illnessYesRadio.checked) illnessDetailsContainer.style.display = 'block'; });
illnessNoRadio.addEventListener('change', () => { if (illnessNoRadio.checked) illnessDetailsContainer.style.display = 'none'; });

form.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    if (!form.checkValidity()) { 
        alert(translations[document.documentElement.lang].fill_all_fields); 
        return; 
    } 
    
    submitBtn.disabled = true; 
    submitBtn.textContent = translations[document.documentElement.lang].sending; 
    
    const formData = new FormData(form); 
    formData.set('academicYear', academicYearSelect.options[academicYearSelect.selectedIndex].text); 
    formData.set('specialization', specializationSelect.options[specializationSelect.selectedIndex].text); 
    
    // إرسال البيانات باستخدام FormData مع no-cors mode
    fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: formData 
    })
    .then(() => {
        // مع no-cors mode، لا يمكننا قراءة الاستجابة، لذا نفترض النجاح
        form.style.display = 'none'; 
        successMessageDiv.style.display = 'block'; 
    })
    .catch(error => { 
        console.error('Error!', error.message); 
        alert(translations[document.documentElement.lang].submit_error + '\n' + error.message); 
        submitBtn.disabled = false; 
        submitBtn.textContent = translations[document.documentElement.lang].register_btn; 
    }); 
});

document.addEventListener('DOMContentLoaded', () => { changeLanguage('ar'); });