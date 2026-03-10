/* Extracted from becomeaffiliate.html */

function togglePw(id) {
    const el = document.getElementById(id);
    el.type = el.type === 'password' ? 'text' : 'password';
  }

  let progressVal = 0;
  function updateProgress() {
    const filled = [
      document.getElementById('fullName'),
      document.getElementById('email'),
    ].filter(el => el && el.value.trim() !== '').length;
    const steps = document.querySelectorAll('.prog-step');
    if (filled >= 1) { steps[0].classList.add('done'); steps[1].classList.add('active'); }
    if (filled >= 2) { steps[1].classList.add('done'); steps[2].classList.add('active'); }
  }

  function submitForm() {
    const agreed = document.getElementById('agreeTerms').checked;
    if (!agreed) {
      alert('Please agree to the Terms & Conditions before submitting.');
      return;
    }
    document.getElementById('successOverlay').classList.add('show');
  }

  // ── CATEGORIES DROPDOWN ──
  function toggleCat() {
    const trigger = document.getElementById('catTrigger');
    const menu = document.getElementById('catMenu');
    trigger.classList.toggle('open');
    menu.classList.toggle('open');
  }

  function showPanel(id) {
    document.querySelectorAll('.cat-sidebar-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.querySelectorAll('.cat-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + id).classList.add('active');
  }

  document.addEventListener('click', function(e) {
    const wrap = document.querySelector('.cat-dropdown-wrap');
    if (wrap && !wrap.contains(e.target)) {
      const trigger = document.getElementById('catTrigger');
      const menu = document.getElementById('catMenu');
      if (trigger) trigger.classList.remove('open');
      if (menu) menu.classList.remove('open');
    }
  });