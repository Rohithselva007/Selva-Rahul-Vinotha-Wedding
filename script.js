 var b = document.body, t = document.getElementById('tg');
        t.onclick = function () { b.classList.toggle('ta'); t.textContent = b.classList.contains('ta') ? 'English' : 'தமிழ்' };
        var p = document.getElementById('p');
        for (var i = 0; i < 14; i++) { var e = document.createElement('i'); e.style.left = Math.random() * 100 + '%'; e.style.animationDuration = (9 + Math.random() * 9) + 's'; e.style.animationDelay = (-Math.random() * 12) + 's'; p.appendChild(e) }
        var T = new Date('2026-10-25T10:30:00+05:30').getTime();
        function tick() {
            var d = T - Date.now(), c = document.getElementById('cd');
            if (d <= 0) { c.innerHTML = '<div style="font-size:18px;padding:10px 20px">Blessings 🙏</div>'; return }
            var v = [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60], n = ['DAYS', 'HRS', 'MIN', 'SEC'];
            c.innerHTML = v.map(function (x, i) { return '<div>' + x + '<span>' + n[i] + '</span></div>' }).join('')
        }
        tick(); setInterval(tick, 1000);


var WA_NUMBER = '917358853013';
var rsvpName = document.getElementById('gn');
function waLink(yes) {
    var ta = document.body.classList.contains('ta');
    var n = (rsvpName.value || '').trim();
    var msg;
    if (ta) {
        msg = '\u0bb5\u0ba3\u0b95\u0bcd\u0b95\u0bae\u0bcd! ' + (n ? '\u0ba8\u0bbe\u0ba9\u0bcd ' + n + '. ' : '') +
            (yes ? '\u0b9a\u0bc6\u0bb2\u0bcd\u0bb5\u0bb0\u0bbe\u0b95\u0bc1\u0bb2\u0bcd & \u0bb5\u0bbf\u0ba9\u0bcb\u0ba4\u0bbe \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0ba3\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0ba8\u0bbf\u0b9a\u0bcd\u0b9a\u0baf\u0bae\u0bcd \u0bb5\u0bb0\u0bc1\u0b95\u0bbf\u0bb1\u0bc7\u0ba9\u0bcd. \ud83d\ude4f'
                 : '\u0bae\u0ba9\u0bcd\u0ba9\u0bbf\u0b95\u0bcd\u0b95\u0bb5\u0bc1\u0bae\u0bcd, \u0b8e\u0ba9\u0bcd\u0ba9\u0bbe\u0bb2\u0bcd \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0ba3\u0ba4\u0bcd\u0ba4\u0bbf\u0bb1\u0bcd\u0b95\u0bc1 \u0bb5\u0bb0 \u0b87\u0baf\u0bb2\u0bbe\u0ba4\u0bc1. \u0bb5\u0bbe\u0bb4\u0bcd\u0ba4\u0bcd\u0ba4\u0bc1\u0b95\u0bb3\u0bcd! \ud83d\ude4f');
    } else {
        msg = 'Hello! ' + (n ? 'This is ' + n + '. ' : '') +
            (yes ? 'I will be attending Selva Rahul & Vinotha\'s wedding on 25 Oct 2026. \ud83d\ude4f'
                 : 'Sorry, I won\'t be able to attend the wedding on 25 Oct 2026. Wishing you both a lifetime of happiness! \ud83d\ude4f');
    }
    return 'https://api.whatsapp.com/send?phone=' + WA_NUMBER + '&text=' + encodeURIComponent(msg);
}
function refreshRsvp() {
    document.getElementById('wa-yes').href = waLink(true);
    document.getElementById('wa-no').href = waLink(false);
    rsvpName.placeholder = document.body.classList.contains('ta') ? '\u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0baa\u0bc6\u0baf\u0bb0\u0bcd' : 'Your name';
}
rsvpName.addEventListener('input', refreshRsvp);
document.getElementById('tg').addEventListener('click', refreshRsvp);
['wa-yes', 'wa-no'].forEach(function (id) { document.getElementById(id).addEventListener('click', refreshRsvp); });
refreshRsvp();
