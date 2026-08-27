const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()

  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)

  await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, content) => {
  await page.getByRole('button', { name: 'new note' }).click()
  await page.getByRole('textbox').fill(content)
  await page.getByRole('button', { name: 'save' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page
    .getByRole('button', { name: /create new blog/i })
    .click()

  await page
    .getByPlaceholder('write blog title here')
    .fill(title)

  await page
    .getByPlaceholder('write blog author here')
    .fill(author)

  await page
    .getByPlaceholder('write blog url here')
    .fill(url)

  await page.getByRole('button', { name: 'create' }).click()

  await page
    .getByText(`a new blog ${title} by ${author} added`)
    .waitFor({ state: 'visible' })

  await page
    .getByRole('button', { name: /create new blog/i })
    .waitFor({ state: 'visible' })
}

const getBlog = (page, title) => {
  return page.getByTestId('blog').filter({
    hasText: title
  })
}

const likeBlog = async (blogLocator, times) => {
  await blogLocator
    .getByRole('button', { name: 'view' })
    .click()

  for (let i = 0; i < times; i++) {
    await blogLocator
      .getByRole('button', { name: 'like' })
      .click()

    await blogLocator
      .getByText(`likes ${i + 1}`)
      .waitFor({ state: 'visible' })
  }
}

module.exports = {
  loginWith,
  createNote,
  createBlog,
  getBlog,
  likeBlog
}
