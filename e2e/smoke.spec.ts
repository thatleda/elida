import { expect, test } from '@playwright/test'

test('home page renders the hero and sections', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('#who')).toBeVisible()
  await expect(page.locator('#previously')).toBeVisible()
  await expect(page.locator('#contact')).toBeVisible()
})

test('navigates from the ramblings index to an article', async ({ page }) => {
  await page.goto('/ramblings')

  const firstEntry = page.locator('.index a').first()
  const title = await firstEntry.textContent()
  await firstEntry.click()

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title!.trim())
  await expect(page.getByRole('link', { name: /back to the index/i })).toBeVisible()
})

test('the language switch moves between / and /de/', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Deutsch/ }).click()

  await expect(page).toHaveURL(/\/de$/)
  await expect(page.locator('#who-title')).toHaveText('Wer?')
})

test('the theme toggle persists across reloads', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /color mode/i }).click()

  const theme = page.locator('html')
  await expect(theme).toHaveAttribute('data-theme', 'light')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})
