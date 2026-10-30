// Bonelli Advogados: menu do celular, formulário de contato (envia pelo WhatsApp),
// medição de contatos para o Google Ads e aviso de cookies.
(function () {
  var TAG = 'AW-18543540122';
  var CONVERSAO = {
    whatsapp: 'qfGiCJ2A2K4dEJrvn4pF',
    ligar: 'oCbuCKCA2K4dEJrvn4pF',
    formulario: 'JZ1dCKOA2K4dEJrvn4pF'
  };

  function conversao(nome) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: TAG + '/' + CONVERSAO[nome] });
    }
  }

  // Cliques em ligar e em WhatsApp, em qualquer página.
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) conversao('ligar');
    else if (href.indexOf('wa.me/') !== -1) conversao('whatsapp');
  });

  // Menu do celular.
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

  // Formulário de contato: monta a mensagem e abre o WhatsApp do escritório.
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
      conversao('formulario');
      var url = 'https://wa.me/5511984940996?text=' + encodeURIComponent(linhas.join('\n'));
      var aba = window.open(url, '_blank', 'noopener');
      if (!aba) { window.location.href = url; }
    });
  }

  // Aviso de cookies: só libera os cookies de anúncio depois do "Aceitar".
  var escolha = null;
  try { escolha = localStorage.getItem('bonelli-cookies'); } catch (e) {}
  if (escolha === null) {
    var aviso = document.createElement('div');
    aviso.className = 'cookies';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML = '<p>Usamos cookies para saber quantas pessoas entram em contato com o escritório pelo site.</p>' +
      '<div class="cookies-botoes"><button type="button" data-escolha="sim" class="btn btn-ouro">Aceitar</button>' +
      '<button type="button" data-escolha="nao" class="btn btn-linha">Recusar</button></div>';
    aviso.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-escolha]');
      if (!b) return;
      var sim = b.getAttribute('data-escolha') === 'sim';
      try { localStorage.setItem('bonelli-cookies', sim ? 'sim' : 'nao'); } catch (e) {}
      if (sim && typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', analytics_storage: 'granted' });
      }
      aviso.remove();
    });
    document.body.appendChild(aviso);
  }
})();
