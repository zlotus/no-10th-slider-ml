import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { execFileSync } from 'node:child_process'
import { chromium } from 'playwright-core'

const baseUrl = process.env.SLIDE_PREVIEW_URL ?? 'http://127.0.0.1:4173'
const outputDirectory = resolve(process.env.VISUAL_OUTPUT_DIR ?? 'visual-check-output')
await mkdir(outputDirectory, { recursive: true })

const executablePath = process.env.CHROMIUM_PATH ?? execFileSync('which', ['chromium'], { encoding: 'utf8' }).trim()
const browser = await chromium.launch({ executablePath, headless: true })
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
const page = await context.newPage()
const consoleErrors = []
const failedRequests = []
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text())
})
page.on('requestfailed', (request) => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText ?? 'failed'}`))

const chapterSlides = [
  [1, 4],
  [2, 6],
  [3, 6],
  [4, 10],
  [5, 7],
  [6, 6],
  [7, 7],
  [8, 6],
  [9, 7],
  [10, 5],
  [11, 7],
  [12, 6],
  [13, 7],
  [14, 7],
  [15, 7],
  [16, 7],
  [17, 7],
]

const results = { routes: {}, scaling: {}, fullscreen: false, chapterTransitions: 0, stepChecks: 0 }

async function openAndCapture(hash, filename) {
  await page.goto(`${baseUrl}/${hash}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(550)
  await page.screenshot({ path: resolve(outputDirectory, filename), fullPage: true })
  results.routes[hash] = await page.evaluate(() => ({
    hash: window.location.hash,
    title: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
    stage: document.querySelector('.stage')?.getBoundingClientRect().toJSON(),
  }))
}

for (const [slide, maxStep] of chapterSlides) {
  await openAndCapture(`#/${slide}/${maxStep}`, `slide-${String(slide).padStart(2, '0')}-final.png`)
}

for (const [slide, step] of [[3, 3], [5, 4], [6, 3], [7, 4], [8, 4], [9, 4], [11, 3], [12, 3], [13, 4], [14, 4], [15, 4], [16, 4], [17, 4]]) {
  await openAndCapture(`#/${slide}/${step}`, `slide-${String(slide).padStart(2, '0')}-step-${String(step).padStart(2, '0')}.png`)
}

for (let index = 0; index < chapterSlides.length; index += 1) {
  const [slide, maxStep] = chapterSlides[index]
  const testStep = Math.max(0, Math.floor(maxStep / 2))
  await page.goto(`${baseUrl}/#/${slide}/${testStep}`, { waitUntil: 'networkidle' })
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(60)
  if (page.url().endsWith(`#/${slide}/${testStep + 1}`) === false) throw new Error(`ArrowRight did not advance slide ${slide}: ${page.url()}`)
  await page.keyboard.press('ArrowLeft')
  await page.waitForTimeout(60)
  if (page.url().endsWith(`#/${slide}/${testStep}`) === false) throw new Error(`ArrowLeft did not rewind slide ${slide}: ${page.url()}`)
  results.stepChecks += 1

  if (index < chapterSlides.length - 1) {
    const [nextSlide] = chapterSlides[index + 1]
    await page.goto(`${baseUrl}/#/${slide}/${maxStep}`, { waitUntil: 'networkidle' })
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(60)
    if (page.url().endsWith(`#/${nextSlide}/0`) === false) throw new Error(`Slide ${slide} did not continue to ${nextSlide}: ${page.url()}`)
    results.chapterTransitions += 1
  }
}

await page.keyboard.press('Home')
await page.waitForTimeout(80)
if (page.url().endsWith('#/1/0') === false) throw new Error(`Home did not go to first slide: ${page.url()}`)
await page.keyboard.press('End')
await page.waitForTimeout(80)
if (page.url().endsWith('#/17/0') === false) throw new Error(`End did not go to last slide: ${page.url()}`)
await page.keyboard.press('Space')
await page.waitForTimeout(80)
if (page.url().endsWith('#/17/1') === false) throw new Error(`Space did not advance step: ${page.url()}`)

try {
  await page.keyboard.press('f')
  await page.waitForTimeout(150)
  results.fullscreen = await page.evaluate(() => Boolean(document.fullscreenElement))
  if (results.fullscreen) await page.keyboard.press('Escape')
} catch (error) {
  results.fullscreen = `unsupported by headless Chromium: ${String(error)}`
}

for (const [width, height] of [[1440, 900], [1200, 1200], [2560, 1080]]) {
  for (const slide of [12, 16, 17]) {
    const maxStep = slide === 12 ? 6 : 7
    await page.setViewportSize({ width, height })
    await page.goto(`${baseUrl}/#/${slide}/${maxStep}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(120)
    const rect = await page.locator('.stage').boundingBox()
    results.scaling[`${width}x${height}-slide-${slide}`] = rect
    if (!rect || rect.width > width + 1 || rect.height > height + 1) {
      throw new Error(`Stage overflow at ${width}x${height}, slide ${slide}: ${JSON.stringify(rect)}`)
    }
  }
}

await browser.close()

if (consoleErrors.length || failedRequests.length) {
  throw new Error(JSON.stringify({ consoleErrors, failedRequests }, null, 2))
}

console.log(JSON.stringify({ ...results, consoleErrors, failedRequests, outputDirectory }, null, 2))
