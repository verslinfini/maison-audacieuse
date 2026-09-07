(function () {
  var q = new URLSearchParams(window.location.search);
  if (q.get('etat') === 'avant') { document.documentElement.className += ' etat-avant'; }
  var entete = document.getElementById('entete');
  var seuil = 120;
  var maj = function () { entete.dataset.solide = window.scrollY > seuil ? 'oui' : 'non'; };
  maj();
  window.addEventListener('scroll', maj, { passive: true });



  // La largeur de mise en page depasse largement celle de l'ecran physique :
  // signature du mode « version pour ordinateur ». screen.width reste la
  // largeur reelle en pixels CSS, clientWidth passe a 980.
  var avis = document.querySelector('.avis-bureau');
  var testerVue = function () {
    var ecran = Math.min(screen.width || 9999, screen.height || 9999);
    var grossier = !window.matchMedia || matchMedia('(pointer: coarse)').matches;
    var force = grossier && ecran < 560 && document.documentElement.clientWidth > ecran * 1.4;
    document.documentElement.classList.toggle('vue-bureau', force);
    if (avis) { avis.hidden = !force; }
  };
  testerVue();
  window.addEventListener('resize', testerVue);
  window.addEventListener('orientationchange', testerVue);

  var barre = document.querySelector('.barre-mobile');
  var zone = document.querySelector('[data-zone-chaude]');
  if (barre && zone) {
    // La barre ne s'efface plus : elle change de teinte en entrant dans
    // l'ecran terracotta, et la garde jusqu'en bas.
    var enAttente = false;
    var majTeinte = function () {
      enAttente = false;
      var haut = window.innerHeight - (barre.offsetHeight || 66);
      barre.dataset.chaud = zone.getBoundingClientRect().top < haut ? 'oui' : 'non';
    };
    var planifier = function () {
      if (enAttente) { return; }
      enAttente = true;
      requestAnimationFrame(majTeinte);
    };
    majTeinte();
    window.addEventListener('scroll', planifier, { passive: true });
    window.addEventListener('resize', planifier);
    window.addEventListener('orientationchange', planifier);
    window.addEventListener('load', planifier);
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(planifier); }
    if ('ResizeObserver' in window) { new ResizeObserver(planifier).observe(document.body); }
  }

  var infolettre = document.getElementById('infolettre');
  if (infolettre) { infolettre.addEventListener('submit', function (e) { e.preventDefault(); }); }

  var bouton = document.getElementById('menu-bouton');
  var menu = document.getElementById('menu-mobile');
  bouton.addEventListener('click', function () {
    var ouvert = bouton.getAttribute('aria-expanded') === 'true';
    bouton.setAttribute('aria-expanded', String(!ouvert));
    menu.hidden = ouvert;
  });
})();
