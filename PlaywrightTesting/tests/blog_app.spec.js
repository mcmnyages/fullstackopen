const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Test User',
                username: 'testuser',
                password: 'password'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
        await expect(page.getByText('Log in to application')).toBeVisible();
    })

    test('user can login', async ({ page }) => {
        await page.getByLabel('username').fill('testuser')
        await page.getByLabel('password').fill('password')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('login fails with wrong username or password', async ({ page }) => {
        await page.getByLabel('username').fill('testuser')
        await page.getByLabel('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
})