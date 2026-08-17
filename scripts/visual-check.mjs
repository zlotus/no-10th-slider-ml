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

const results = { routes: {}, scaling: {}, fullscreen: false }

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

await openAndCapture('#/1/4', 'sample-a-final.png')
await openAndCapture('#/4/10', 'sample-b-final.png')
await openAndCapture('#/17/7', 'sample-c-final.png')

await page.goto(`${baseUrl}/#/4/5`, { waitUntil: 'networkidle' })
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(80)
if (page.url().endsWith('#/4/6') === false) throw new Error(`ArrowRight did not advance step: ${page.url()}`)
await page.keyboard.press('ArrowLeft')
await page.waitForTimeout(80)
if (page.url().endsWith('#/4/5') === false) throw new Error(`ArrowLeft did not rewind step: ${page.url()}`)
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
  await page.setViewportSize({ width, height })
  await page.goto(`${baseUrl}/#/4/10`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(120)
  const rect = await page.locator('.stage').boundingBox()
  results.scaling[`${width}x${height}`] = rect
  if (!rect || rect.width > width + 1 || rect.height > height + 1) {
    throw new Error(`Stage overflow at ${width}x${height}: ${JSON.stringify(rect)}`)
  }
}

await browser.close()

if (consoleErrors.length || failedRequests.length) {
  throw new Error(JSON.stringify({ consoleErrors, failedRequests }, null, 2))
}

console.log(JSON.stringify({ ...results, consoleErrors, failedRequests, outputDirectory }, null, 2))
