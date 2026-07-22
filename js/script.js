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
 

function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;
 
  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };
 
  const openMenu = () => {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  };
 
  toggle.setAttribute('aria-expanded', 'false');
 
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
 
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
 
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== toggle) {
      closeMenu();
    }
  });
}
 

function initBackToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
 
  const SCROLL_THRESHOLD = 400;
 
  const toggleVisibility = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  };
 
  toggleVisibility(); // ضبط الحالة الأولية عند تحميل الصفحة
  window.addEventListener('scroll', toggleVisibility);
 
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
 
/* INTERN-TASK #5 — أكورديون الأسئلة/الخدمات (services.html) (تم الحل)
   تم استخدام querySelectorAll مع forEach بحيث يعمل كل عنصر بشكل
   مستقل، بدل الاعتماد على أول عنصر فقط. */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;
 
  items.forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}
 /* INTERN-TASK #4 — نموذج التواصل (contact.html) (تم الحل)
   1) التحقق من أن الاسم والبريد والرسالة غير فارغة.
   2) التحقق من صيغة البريد الإلكتروني.
   3) عند الخطأ: إظهار #formStatus بصنف "error" ونص واضح.
   4) عند النجاح فقط: إظهار #formStatus بصنف "success" وتفريغ الحقول. */

// === بيانات بوت التلجرام ===
const BOT_TOKEN ='8310989380:AAFtSuKL5viup1K7ruKz68XQ_aO3n1loQR8';
const CHAT_ID = '-5373762180';

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', handleContactSubmit);
}

async function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('[type="submit"]');

  const nameField = form.querySelector('[name="fullName"]');
  const emailField = form.querySelector('[name="email"]');
  const messageField = form.querySelector('[name="message"]');

  const name = (nameField?.value || '').trim();
  const email = (emailField?.value || '').trim();
  const message = (messageField?.value || '').trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const showError = (text) => {
    status.textContent = text;
    status.className = 'form-status error';
  };

  const showSuccess = (text) => {
    status.textContent = text;
    status.className = 'form-status success';
  };

  if (!name || !email || !message) {
    showError('يرجى تعبئة جميع الحقول: الاسم، البريد الإلكتروني، والرسالة.');
    return;
  }

  if (!emailPattern.test(email)) {
    showError('يرجى إدخال بريد إلكتروني صحيح.');
    return;
  }

  // تجهيز نص الرسالة اللي هتتبعت للتلجرام
  const telegramText =
    `📩 رسالة جديدة من نموذج التواصل\n` +
    `الاسم: ${name}\n` +
    `البريد: ${email}\n` +
    `الرسالة: ${message}`;

  const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    if (submitBtn) submitBtn.disabled = true;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: telegramText
      })
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.description || 'فشل الإرسال');
    }

    // نجاح: عرض رسالة النجاح وتفريغ الحقول
    showSuccess('تم إرسال رسالتك بنجاح، شكرًا لتواصلك معنا.');
    form.reset();

  } catch (err) {
    console.error('Telegram send error:', err);
    showError('حدث خطأ أثناء إرسال الرسالة، حاول مرة أخرى لاحقًا.');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', initContactForm);
  // نجاح: إظهار رسالة النجاح وتفريغ الحقول
  status.textContent = 'تم إرسال طلبك بنجاح، سيتواصل معك فريق ميثاق خلال يومي عمل.';
  status.className = 'form-status success';
  form.reset();

 
[{
	"resource": "/c:/Users/asus/Desktop/mithaq-main/js/script.js",
	"owner": "typescript",
	"code": "8017",
	"severity": 8,
	"message": "Signature declarations can only be used in TypeScript files.",
	"source": "ts",
	"startLineNumber": 163,
	"startColumn": 10,
	"endLineNumber": 163,
	"endColumn": 22
}]