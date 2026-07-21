/* ============================================================
   ميثاق — script.js
   ملاحظة للإنترن: الملف يحتوي على تعليقات INTERN-TASK تشير إلى
   أجزاء ناقصة أو بها خلل مقصود. اقرأ كل تعليق قبل التعديل، ولا
   تغيّر أسماء الدوال أو الـ id/class المستخدمة في HTML و CSS.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  setActiveNavLink();
  initNavToggle();
  initBackToTop();
  initFaqAccordion();
  initContactForm();
  initCounters();
});

/* السنة في الفوتر — هذه الدالة تعمل بشكل صحيح، استخدمها كمرجع
   لفهم أسلوب بقية الدوال */
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* تمييز الرابط النشط في القائمة حسب الصفحة الحالية */
function setActiveNavLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
}

/* INTERN-TASK #1 — قائمة الموبايل
   الزر .nav-toggle موجود في كل صفحة، لكن لا يوجد أي كود هنا
   يفتح أو يغلق القائمة .main-nav على الشاشات الصغيرة.
   المطلوب:
   1) عند الضغط على الزر، إضافة/إزالة كلاس (مثلاً "open") على
      .main-nav بحيث تظهر كقائمة منسدلة على الموبايل.
   2) التأكد من عمل الإغلاق عند اختيار رابط من القائمة. */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
  // TODO: أكمل منطق الفتح/الإغلاق هنا
}

/* INTERN-TASK #6 — زر "العودة للأعلى"
   الزر موجود بالتنسيق الكامل في CSS (.back-top) لكنه مخفي دائمًا
   لأن display تبقى none. المطلوب:
   1) الاستماع لحدث scroll على window.
   2) إظهار الزر عند تجاوز مسافة تمرير معينة (مثلاً 400px) وإخفاؤه
      دون ذلك.
   3) عند الضغط عليه، التمرير السلس لأعلى الصفحة. */
function initBackToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  // TODO: أكمل منطق الإظهار/الإخفاء + التمرير لأعلى
}

/* INTERN-TASK #5 — أكورديون الأسئلة/الخدمات (services.html)
   ملاحظة الخلل: الكود الحالي يستخدم querySelector فيفتح العنصر
   الأول فقط بغض النظر على أي سؤال ضغط المستخدم. المطلوب تصحيحها
   لتعمل مع كل عنصر بشكل مستقل. */
function initFaqAccordion() {
  const item = document.querySelector('.faq-item'); // خطأ: يجب المرور على كل العناصر
  if (!item) return;
  const q = item.querySelector('.faq-q');
  q.addEventListener('click', () => {
    item.classList.toggle('open');
  });
}

/* INTERN-TASK #4 — نموذج التواصل (contact.html)
   حاليًا الدالة تمنع إعادة تحميل الصفحة فقط، وتُظهر رسالة نجاح
   دائمًا حتى لو الحقول فارغة أو البريد غير صحيح. المطلوب:
   1) التحقق أن الاسم والبريد والرسالة غير فارغة.
   2) التحقق أن البريد الإلكتروني بصيغة صحيحة.
   3) عند وجود خطأ: إظهار #formStatus بصنف "error" ونص واضح.
   4) عند النجاح فقط: إظهار #formStatus بصنف "success" وتفريغ
      الحقول. */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', handleContactSubmit);
}

function handleContactSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  // TODO: أضف التحقق من الحقول قبل اعتبار الإرسال ناجحًا
  status.textContent = 'تم إرسال طلبك بنجاح، سيتواصل معك فريق ميثاق خلال يومي عمل.';
  status.className = 'form-status success';
}

/* INTERN-TASK #8 — عدّاد الإحصاءات في القسم .stats
   الأرقام حاليًا نصوص ثابتة في HTML. المطلوب استخدام
   IntersectionObserver لتشغيل عدّاد تصاعدي (من 0 إلى الرقم
   المستهدف الموجود في data-target) في أول مرة يظهر فيها القسم
   على الشاشة فقط. */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;
  // TODO: أكمل منطق IntersectionObserver + العدّاد التصاعدي هنا
}
