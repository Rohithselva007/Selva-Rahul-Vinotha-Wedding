(function () {
    'use strict';

    var body = document.body;
    var toggle = document.getElementById('tg');

    /* ---------- Language toggle (remembered per device) ---------- */
    function setLang(ta) {
        body.classList.toggle('ta', ta);
        document.documentElement.lang = ta ? 'ta' : 'en';
        toggle.textContent = ta ? 'English' : 'தமிழ்';
        toggle.setAttribute('aria-label', ta ? 'Switch language to English' : 'Switch language to Tamil');
        buildWhatsAppLinks();
    }

    toggle.addEventListener('click', function () {
        var ta = !body.classList.contains('ta');
        setLang(ta);
        try { localStorage.setItem('wedding-lang', ta ? 'ta' : 'en'); } catch (e) { /* storage unavailable */ }
    });

    /* ---------- WhatsApp links (message follows the chosen language) ---------- */
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
        var links = document.querySelectorAll('a[data-wa]');
        for (var i = 0; i < links.length; i++) {
            var a = links[i];
            var text = MESSAGES[lang][a.getAttribute('data-msg')] || MESSAGES[lang].hello;
            a.href = 'https://wa.me/' + a.getAttribute('data-wa') + '?text=' + encodeURIComponent(text);
        }
    }

    /* ---------- Falling petals ---------- */
    var petals = document.getElementById('petals');
    for (var i = 0; i < 14; i++) {
        var p = document.createElement('i');
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (9 + Math.random() * 9) + 's';
        p.style.animationDelay = (-Math.random() * 12) + 's';
        petals.appendChild(p);
    }

    /* ---------- Countdown (IST, 25 Oct 2026, 10:30) ---------- */
    var target = new Date('2026-10-25T10:30:00+05:30').getTime();
    var cd = document.getElementById('cd');
    var labels = {
        en: ['DAYS', 'HRS', 'MIN', 'SEC'],
        ta: ['நாள்', 'மணி', 'நிமி', 'விநா']
    };
    var timer;

    function tick() {
        var d = target - Date.now();
        var ta = body.classList.contains('ta');
        if (d <= 0) {
            cd.innerHTML = '<div style="font-size:18px;padding:10px 20px">' + (ta ? 'ஆசீர்வதியுங்கள் 🙏' : 'Blessings 🙏') + '</div>';
            clearInterval(timer);
            return;
        }
        var v = [
            Math.floor(d / 864e5),
            Math.floor(d / 36e5) % 24,
            Math.floor(d / 6e4) % 60,
            Math.floor(d / 1e3) % 60
        ];
        var n = labels[ta ? 'ta' : 'en'];
        cd.innerHTML = v.map(function (x, i) {
            return '<div>' + x + '<span>' + n[i] + '</span></div>';
        }).join('');
    }

    /* ---------- Init ---------- */
    var saved = null;
    try { saved = localStorage.getItem('wedding-lang'); } catch (e) { /* ignore */ }
    setLang(saved === 'ta');
    tick();
    timer = setInterval(tick, 1000);
})();
