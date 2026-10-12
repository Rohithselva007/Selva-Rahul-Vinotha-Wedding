(function () {
    'use strict';

    var body = document.body;
    var book = document.getElementById('book');
    var wrap = document.getElementById('bw');
    var leaves = [].slice.call(book.querySelectorAll('.leaf'));
    var N = leaves.length;
    var idx = 0;
    var zTimer;
    var swiped = false;

    var prevBtn = document.getElementById('prev');
    var nextBtn = document.getElementById('next');
    var dotsEl = document.getElementById('dots');
    var hint = document.getElementById('hint');
    var statusEl = document.getElementById('status');
    var toggle = document.getElementById('tg');
    var dots = [];

    /* ---------- Page dots ---------- */
    leaves.forEach(function (leaf, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'dot';
        b.setAttribute('aria-label', 'Page ' + (i + 1) + ': ' + leaf.getAttribute('data-title'));
        b.addEventListener('click', function () { go(i); });
        dotsEl.appendChild(b);
        dots.push(b);
    });

    /* ---------- Page turning ---------- */
    function zNormal(i) { return i < idx ? i + 1 : N - i; }

    function go(n, instant) {
        n = Math.max(0, Math.min(N - 1, n));
        if (n === idx && !instant) return;

        var forward = n > idx;
        idx = n;

        var changed = [];
        leaves.forEach(function (l, i) {
            if ((i < idx) !== l.classList.contains('flipped')) changed.push(i);
        });
        if (!forward) changed.reverse();

        changed.forEach(function (i, k) {
            var l = leaves[i];
            l.style.transitionDelay = instant ? '0s' : (k * 0.09) + 's';
            l.style.zIndex = N + 5 + (forward ? i : N - i);   // turning leaf rides on top
            l.classList.toggle('flipped', i < idx);
        });

        leaves.forEach(function (l, i) {
            if (changed.indexOf(i) < 0) l.style.zIndex = zNormal(i);
            var current = i === idx;
            l.inert = !current;                               // only the visible page is focusable
            if (current) l.removeAttribute('aria-hidden'); else l.setAttribute('aria-hidden', 'true');
        });

        clearTimeout(zTimer);
        zTimer = setTimeout(function () {
            leaves.forEach(function (l, i) { l.style.zIndex = zNormal(i); l.style.transitionDelay = ''; });
        }, 1150 + changed.length * 90);

        updateUI();
    }

    function updateUI() {
        wrap.classList.toggle('open', idx > 0);
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === N - 1;
        dots.forEach(function (d, i) { d.setAttribute('aria-current', i === idx ? 'true' : 'false'); });
        statusEl.textContent = 'Page ' + (idx + 1) + ' of ' + N + ': ' + leaves[idx].getAttribute('data-title');
        if (idx > 0) hint.classList.add('gone');
        try { history.replaceState(null, '', idx ? '#p' + (idx + 1) : location.pathname + location.search); } catch (e) { /* file:// etc. */ }
    }

    prevBtn.addEventListener('click', function () { go(idx - 1); });
    nextBtn.addEventListener('click', function () { go(idx + 1); });
    document.getElementById('again').addEventListener('click', function () { go(0); });

    /* tap the page: right half = next, left half = previous (links/buttons keep working) */
    book.addEventListener('click', function (e) {
        if (swiped) { swiped = false; return; }
        if (e.target.closest('a, button')) return;
        var sel = window.getSelection && window.getSelection().toString();
        if (sel) return;
        if (idx === 0) { go(1); return; }
        var r = leaves[idx].getBoundingClientRect();
        go(e.clientX - r.left > r.width / 2 ? idx + 1 : idx - 1);
    });

    /* swipe */
    var sx = 0, sy = 0, tracking = false;
    book.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; tracking = true; swiped = false; });
    book.addEventListener('pointerup', function (e) {
        if (!tracking) return;
        tracking = false;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            swiped = true;
            go(dx < 0 ? idx + 1 : idx - 1);
        }
    });
    book.addEventListener('pointercancel', function () { tracking = false; });

    /* keyboard */
    document.addEventListener('keydown', function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        switch (e.key) {
            case 'ArrowRight': case 'PageDown': go(idx + 1); break;
            case 'ArrowLeft': case 'PageUp': go(idx - 1); break;
            case 'Home': go(0); break;
            case 'End': go(N - 1); break;
        }
    });

    /* ---------- Language ---------- */
    function setLang(ta) {
        body.classList.toggle('ta', ta);
        document.documentElement.lang = ta ? 'ta' : 'en';
        toggle.textContent = ta ? 'English' : 'தமிழ்';
        toggle.setAttribute('aria-label', ta ? 'Switch language to English' : 'Switch language to Tamil');
        buildWhatsAppLinks();
        tick();
    }
    toggle.addEventListener('click', function () {
        var ta = !body.classList.contains('ta');
        setLang(ta);
        try { localStorage.setItem('wedding-lang', ta ? 'ta' : 'en'); } catch (e) { /* storage unavailable */ }
    });

    /* ---------- WhatsApp (message follows the chosen language) ---------- */
    var MESSAGES = {
        en: {
            hello: 'Hello! I am writing about the wedding of Selva Rahul & Vinotha on 25 October 2026.',
            yes: 'Hello! Thank you for the invitation to the wedding of Selva Rahul & Vinotha on 25 October 2026. I will be attending. 🙏',
            no: 'Hello! Thank you for the invitation to the wedding of Selva Rahul & Vinotha on 25 October 2026. Unfortunately I will not be able to attend, but I wish the couple all the happiness. 🙏'
        },
        ta: {
            hello: 'வணக்கம்! 25 அக்டோபர் 2026 அன்று நடைபெறும் செல்வராகுல் & வினோதா திருமணம் தொடர்பாக எழுதுகிறேன்.',
            yes: 'வணக்கம்! 25 அக்டோபர் 2026 அன்று நடைபெறும் செல்வராகுல் & வினோதா திருமணத்திற்கு அழைத்தமைக்கு நன்றி. நான் கண்டிப்பாக வருகிறேன். 🙏',
            no: 'வணக்கம்! 25 அக்டோபர் 2026 அன்று நடைபெறும் செல்வராகுல் & வினோதா திருமணத்திற்கு அழைத்தமைக்கு நன்றி. என்னால் வர இயலாது, மணமக்களுக்கு என் வாழ்த்துகள். 🙏'
        }
    };
    function buildWhatsAppLinks() {
        var lang = body.classList.contains('ta') ? 'ta' : 'en';
        [].forEach.call(document.querySelectorAll('a[data-wa]'), function (a) {
            var text = MESSAGES[lang][a.getAttribute('data-msg')] || MESSAGES[lang].hello;
            a.href = 'https://wa.me/' + a.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
        });
    }

    /* ---------- Countdown (IST) ---------- */
    var target = new Date('2026-10-25T10:30:00+05:30').getTime();
    var cd = document.getElementById('cd');
    var labels = { en: ['DAYS', 'HRS', 'MIN', 'SEC'], ta: ['நாள்', 'மணி', 'நிமி', 'விநா'] };
    var timer;
    function tick() {
        var d = target - Date.now();
        var ta = body.classList.contains('ta');
        if (d <= 0) {
            cd.innerHTML = '<div style="padding:2cqw 5cqw;font-size:4.6cqw">' + (ta ? 'ஆசீர்வதியுங்கள் 🙏' : 'Blessings 🙏') + '</div>';
            clearInterval(timer);
            return;
        }
        var v = [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60];
        var n = labels[ta ? 'ta' : 'en'];
        cd.innerHTML = v.map(function (x, i) { return '<div>' + x + '<span>' + n[i] + '</span></div>'; }).join('');
    }

    /* ---------- Petals ---------- */
    var petals = document.getElementById('petals');
    for (var i = 0; i < 12; i++) {
        var p = document.createElement('i');
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (10 + Math.random() * 10) + 's';
        p.style.animationDelay = (-Math.random() * 14) + 's';
        petals.appendChild(p);
    }

    /* ---------- Init ---------- */
    var saved = null;
    try { saved = localStorage.getItem('wedding-lang'); } catch (e) { /* ignore */ }
    setLang(saved === 'ta');
    timer = setInterval(tick, 1000);

    var m = /^#p(\d+)$/.exec(location.hash);
    var start = m ? Math.min(N - 1, Math.max(0, parseInt(m[1], 10) - 1)) : 0;
    idx = -1;                       // force first render
    leaves.forEach(function (l, i) { l.style.zIndex = N - i; });
    go(start, true);
    requestAnimationFrame(function () {
        requestAnimationFrame(function () { book.classList.remove('no-anim'); });
    });
})();
