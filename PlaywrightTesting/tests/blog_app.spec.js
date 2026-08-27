const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')
            await expect(page.getByText('Test User logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'testuser', 'wrongpass')
            await expect(page.getByText('Wrong username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        test('a new blog can be created', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')
            await createBlog(page, 'New Blog by Playwright', 'Test User', 'www.myurl.com')
            await expect(page.getByText('New Blog by Playwright', { exact: true })).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')
            await expect(page.getByText('Test User logged in')).toBeVisible()
            await createBlog(page, 'New Blog by Playwright', 'Test User', 'www.myurl.com')
            await page.getByRole('button', { name: 'view' }).click()
            await expect(page.getByText('likes 0')).toBeVisible()
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText('likes 1')).toBeVisible()

        })

        test('the creator of the blog can delete the blog', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')
            await expect(page.getByText('Test User logged in')).toBeVisible()
            await createBlog(page, 'Blog to be Deleted', 'Test User', 'www.myurl.com')
            await expect(page.getByText('Blog to be Deleted', { exact: true })).toBeVisible()
            
            page.on('dialog',async dialog=>{
                await dialog.accept()
            })
            await page.getByRole('button', { name: 'Delete' }).click()
            await expect(page.getByText('Blog to be Deleted',{exact:true})).not.toBeVisible()

        })
    })
})