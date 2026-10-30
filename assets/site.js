// Bonelli Advogados: menu do celular e formulário de contato (envia pelo WhatsApp).
(function () {
  var botao = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (botao && menu) {
    botao.addEventListener('click', function () {
      var aberto = botao.getAttribute('aria-expanded') === 'true';
      botao.setAttribute('aria-expanded', String(!aberto));
      menu.classList.toggle('aberto', !aberto);
    });
    menu.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) {
        botao.setAttribute('aria-expanded', 'false');
        menu.classList.remove('aberto');
      }
    });
  }

  var form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      var v = function (id) { return (document.getElementById(id).value || '').trim(); };
      var linhas = [
        'Olá! Vim pelo site da Bonelli Advogados.',
        'Nome: ' + v('nome'),
        'Telefone: ' + v('telefone'),
        v('email') ? 'E-mail: ' + v('email') : '',
        'Assunto: ' + v('assunto'),
        '',
        v('mensagem')
      ].filter(function (l, i) { return l !== '' || i === 5; });
      var url = 'https://wa.me/5511984940996?text=' + encodeURIComponent(linhas.join('\n'));
      var aba = window.open(url, '_blank', 'noopener');
      if (!aba) { window.location.href = url; }
    });
  }
})();
