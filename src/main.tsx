import { render } from 'preact'
import App from './App'
import './index.css'

// Banc de test de fluidité : ?ab=nohdr,nobg,... désactive des éléments.
const ab = new URLSearchParams(location.search).get('ab')
if (ab) {
  for (const f of ab.split(',')) document.documentElement.classList.add('ab-' + f.trim())
  const box = document.createElement('div')
  box.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:99999;font:600 13px/1.35 ui-monospace,monospace;background:#111;color:#fff;padding:10px 12px;border-radius:10px;pointer-events:none;white-space:pre'
  document.body.appendChild(box)
  let last = performance.now(), small = 0, big = 0, worst = 0, scrolling = 0
  addEventListener('scroll', () => { scrolling = performance.now() }, { passive: true })
  const tick = (t: number) => {
    const dt = t - last; last = t
    if (t - scrolling < 300) {
      if (dt > 70) big++; else if (dt > 34) small++
      if (dt > worst) worst = dt
    }
    box.textContent = `TEST : ${ab}\nPetits accrocs : ${small}\nGros gels : ${big}\nPire : ${Math.round(worst)} ms`
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
  addEventListener('keydown', (e) => { if (e.key === 'r') { small = big = worst = 0 } })
}

render(<App />, document.getElementById('root')!)
