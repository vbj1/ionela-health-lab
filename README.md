# Ionela Health Lab (IHL)

Site de prezentare pentru **Ionela Health Lab**: antrenor personal și nutriție pentru femei, cu accent pe antrenamentele de forță la sală, în Brașov și online.

**Site live:** https://vbj1.github.io/ionela-health-lab/
**Instagram:** [@ionela_health_lab](https://www.instagram.com/ionela_health_lab/)

## Ce conține
- Hero cu portret, bandă „Forță · Tonifiere · Mobilitate · Nutriție · Consecvență"
- Despre Ionela, secțiunea **În sală**, programe, rezultate, galerie de nutriție
- Pachete, pași, FAQ și formular de contact (demo, nu trimite încă nicăieri)
- Limbă RO / EN, design „liquid glass", meniu jos pe mobil
- Animații cu [Motion](https://motion.dev) (respectă `prefers-reduced-motion`)

## Structură
```
index.html     structura paginii
styles.css     stiluri și design tokens
app.js         traduceri RO/EN, reveal la scroll, contor, formular demo
motion.js      animații Motion (hero, sală, galerie, parallax)
assets/        favicon și assets/photos/ (poze)
docs/          brand-guidelines.md (culori, fonturi, ton)
```

## Rulare locală
Site static, fără build. Din folderul proiectului:

```bash
python -m http.server 8000
```

Apoi deschide http://localhost:8000. (`motion.js` e modul ES, deci nu merge deschis direct din `file://`.)

## Publicare (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.

## De completat
- Adresa sălii, orarul, telefon / WhatsApp
- Prețurile reale (acum „La cerere")
- Trimiterea reală a formularului de contact
- Acordul clientei pentru poza 2024/2025 din secțiunea Rezultate
