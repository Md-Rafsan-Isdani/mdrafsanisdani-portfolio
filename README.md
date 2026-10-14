# Md Rafsan Isdani — Portfolio

**Live site:** [mdrafsanisdani-portfolio.vercel.app](https://mdrafsanisdani-portfolio.vercel.app/#home)

The personal portfolio of **Md Rafsan Isdani** — Mechatronics, Robotics & Automation Engineer (MS, Michigan Technological University) and author of literary fiction as **Rafsan Isdani**.

The site is a walk through a moonlit winter forest. One main road runs through the woods, and each section of the portfolio is a house at the end of its own branch road. The four novels live deep in the forest, each in a landscape drawn from its story.

---

## The journey

| Stop | Where it is | What's inside |
|---|---|---|
| **Home** | The trailhead | Name, title and education, then the map of the land |
| **About** | First right — an easy road to a cottage | Background and education |
| **Journey** | On the left — a stony path that becomes a fine road | Education, work and leadership |
| **Skills** | A plank road to the workshop | Automation, robotics, programming, design and AI |
| **Projects** | Over a bridge to an engineering hall | Research and engineering projects |
| **Hobbies** | A road with tire tracks to a log lodge | Beyond engineering |
| **Books** | The crossroads deep in the forest | Four roads to four book houses |
| **Contact** | The end of the main road | Get in touch |

**The book houses**

- *Amber Windows* — an old mountain village with a wooden church and haystacks
- *The Ocean of Cold Roses* — a cottage on the shore, with roses and a lighthouse
- *Iridescent Eyes* — Kharun, a settlement in red canyon walls
- *Alam al Qarib* — a domed house beyond a stone threshold

---

## Two ways to read the site

- **Forest view** — the 3D experience. Scroll to walk the main road; take a branch at any signpost.
- **Simple page** — every section on one ordinary page. Switch at any time with the button in the top bar; the choice is remembered.

The simple page is also used automatically if a device can't run the 3D view.

### Getting around

- **Scroll** walks the road; the dots on the right jump between stops.
- **Menu** goes straight to any section.
- **Map** (or press **M**) shows the whole forest; choose a place to travel there.
- **Esc** skips a journey, leaves a house, or closes the map.
- Visitors who prefer reduced motion get instant transitions instead of camera travel.

---

## Built with

- HTML, CSS and plain JavaScript — no build step
- [Three.js](https://threejs.org/) (r170), loaded from the jsDelivr CDN
- Fonts: Cormorant Garamond, DM Sans and JetBrains Mono (Google Fonts)

The 3D world is generated in code when the page loads — terrain, trees, houses, lanterns, snow and sky. There are no 3D model files to download.

---

## Project structure

```
index.html            page content (every section, written out in full)
style.css             styles for the forest view and the simple page
script.js             the road, the houses, the map and the 3D world
profile.jpg           portrait (About)
images/
  book-amber-windows.jpg
  book-ocean-of-cold-roses.jpg
  book-iridescent-eyes.jpg
  book-alam-al-qarib.jpg
```

---

## Run it locally

The site uses JavaScript modules, so open it through a local server rather than double-clicking `index.html`:

```bash
# from the project folder
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

The site is deployed on **Vercel** as a static site. Push to the connected GitHub repository and Vercel publishes it automatically — no build command or environment variables are needed.

---

## Contact

- LinkedIn: [md-rafsan-isdani-128462199](https://linkedin.com/in/md-rafsan-isdani-128462199)
- Email: [misdani@mtu.edu](mailto:misdani@mtu.edu)
- Goodreads: [Rafsan Isdani](https://www.goodreads.com/author/show/72481745.Md_Rafsan_Isdani)

---

## License

The code is released under the [MIT License](LICENSE).

The written content, book covers and photographs are © 2026 Md Rafsan Isdani, all rights reserved, and are not covered by the MIT License.
