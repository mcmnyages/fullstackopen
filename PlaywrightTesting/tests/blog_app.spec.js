const {
    test,
    expect,
    beforeEach,
    describe
} = require('@playwright/test')

const {
    loginWith,
    createBlog,
    likeBlog,
    getBlog
} = require('./helper')

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

        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Second User',
                username: 'seconduser',
                password: 'password2'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(
            page.getByRole('button', { name: 'login' })
        ).toBeVisible()

        await expect(
            page.getByText('Log in to application')
        ).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')

            await expect(
                page.getByText('Test User logged in')
            ).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'testuser', 'wrongpass')

            await expect(
                page.getByText('Wrong username or password')
            ).toBeVisible()
        })
    })

    describe('When logged in', () => {
        test('a new blog can be created', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')

            await createBlog(
                page,
                'New Blog by Playwright',
                'Test User',
                'www.myurl.com'
            )

            await expect(
                page.getByText('New Blog by Playwright', { exact: true })
            ).toBeVisible()
        })

        test('a blog can be liked', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')

            await expect(
                page.getByText('Test User logged in')
            ).toBeVisible()

            await createBlog(
                page,
                'New Blog by Playwright',
                'Test User',
                'www.myurl.com'
            )

            const blog = getBlog(page, 'New Blog by Playwright')

            await blog.getByRole('button', { name: 'view' }).click()

            await expect(
                blog.getByText('likes 0')
            ).toBeVisible()

            await blog.getByRole('button', { name: 'like' }).click()

            await expect(
                blog.getByText('likes 1')
            ).toBeVisible()
        })

        test('the creator of the blog can delete the blog', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')

            await expect(
                page.getByText('Test User logged in')
            ).toBeVisible()

            await createBlog(
                page,
                'Blog to be Deleted',
                'Test User',
                'www.myurl.com'
            )

            await expect(
                page.getByText('Blog to be Deleted', { exact: true })
            ).toBeVisible()

            page.on('dialog', async dialog => {
                await dialog.accept()
            })

            const blog = getBlog(page, 'Blog to be Deleted')

            await blog.getByRole('button', { name: 'Delete' }).click()

            await expect(
                page.getByText('Blog to be Deleted', { exact: true })
            ).not.toBeVisible()
        })

        test('only the creator can see the delete button', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')

            await expect(
                page.getByText('Test User logged in')
            ).toBeVisible()

            await createBlog(
                page,
                'Test User Blog',
                'Test User',
                'www.myurl.com'
            )

            const blog = getBlog(page, 'Test User Blog')

            await expect(
                blog.getByRole('button', { name: 'delete' })
            ).toBeVisible()

            await page.getByRole('button', { name: 'logout' }).click()

            await loginWith(page, 'seconduser', 'password2')

            await expect(
                page.getByText('Second User logged in')
            ).toBeVisible()

            await expect(
                page.getByRole('button', { name: 'Delete' })
            ).not.toBeVisible()
        })

        test('blogs are ordered according to likes', async ({ page }) => {
            await loginWith(page, 'testuser', 'password')

            await createBlog(
                page,
                'Blog One',
                'Author One',
                'https://example.com/one'
            )

            await createBlog(
                page,
                'Blog Two',
                'Author Two',
                'https://example.com/two'
            )

            await createBlog(
                page,
                'Blog Three',
                'Author Three',
                'https://example.com/three'
            )

            await likeBlog(getBlog(page, 'Blog One'), 1)
            await likeBlog(getBlog(page, 'Blog Two'), 3)
            await likeBlog(getBlog(page, 'Blog Three'), 2)

            const blogs = page.getByTestId('blog')

            await expect(blogs.nth(0)).toContainText('Blog Two')
            await expect(blogs.nth(1)).toContainText('Blog Three')
            await expect(blogs.nth(2)).toContainText('Blog One')
        })

    })
})
