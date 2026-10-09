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