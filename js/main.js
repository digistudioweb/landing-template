// ClimaTech — JS

(function () {
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  if (!navToggle || !primaryNav) return;

  function setMenuOpen(isOpen) {
    primaryNav.classList.toggle('is-open', isOpen);
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  }

  navToggle.addEventListener('click', () => {
    setMenuOpen(!primaryNav.classList.contains('is-open'));
  });

  // Fecha o menu ao escolher um link (útil no mobile)
  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });
})();

document.getElementById('footer-year').textContent = new Date().getFullYear();

// Formulário de orçamento: validação acessível + envio via WhatsApp
(function () {
  const WHATSAPP_NUMBER = '5511912345678';

  const form = document.getElementById('quoteForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate(value) {
        if (!value.trim()) return 'Digite seu nome.';
        if (value.trim().length < 2) return 'Digite um nome válido.';
        return '';
      },
    },
    whatsapp: {
      input: document.getElementById('whatsapp'),
      error: document.getElementById('whatsapp-error'),
      validate(value) {
        const digits = value.replace(/\D/g, '');
        if (!digits) return 'Digite seu número de WhatsApp.';
        if (digits.length < 8) return 'Digite um número de WhatsApp válido, com DDD.';
        return '';
      },
    },
    service: {
      input: document.getElementById('service'),
      error: document.getElementById('service-error'),
      validate(value) {
        if (!value) return 'Selecione um tipo de serviço.';
        return '';
      },
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate(value) {
        if (!value.trim()) return 'Escreva uma mensagem.';
        if (value.trim().length < 10) return 'Conte um pouco mais (mínimo 10 caracteres).';
        return '';
      },
    },
  };

  function setFieldError(field, message) {
    field.error.textContent = message;
    field.error.hidden = !message;
    field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateField(key) {
    const field = fields[key];
    const message = field.validate(field.input.value);
    setFieldError(field, message);
    return !message;
  }

  // Limpa o erro assim que a pessoa corrige o campo
  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    const eventName = field.input.tagName === 'SELECT' ? 'change' : 'input';
    field.input.addEventListener(eventName, () => {
      if (field.input.getAttribute('aria-invalid') === 'true') {
        validateField(key);
      }
    });
  });

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.hidden = false;
    statusEl.classList.remove('form-status--success', 'form-status--error');
    statusEl.classList.add(type === 'success' ? 'form-status--success' : 'form-status--error');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let firstInvalid = null;
    Object.keys(fields).forEach((key) => {
      const isValid = validateField(key);
      if (!isValid && !firstInvalid) {
        firstInvalid = fields[key].input;
      }
    });

    if (firstInvalid) {
      showStatus('Verifique os campos destacados abaixo antes de enviar.', 'error');
      firstInvalid.focus();
      return;
    }

    const { name, whatsapp, service, message } = fields;
    const text = [
      `Olá! Meu nome é ${name.input.value.trim()}.`,
      `Serviço desejado: ${service.input.value}.`,
      `Mensagem: ${message.input.value.trim()}`,
      `Meu WhatsApp: ${whatsapp.input.value.trim()}`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');

    showStatus('Pronto! Abrimos o WhatsApp com sua mensagem — é só enviar por lá.', 'success');
    form.reset();
    Object.keys(fields).forEach((key) => setFieldError(fields[key], ''));
  });
})();
