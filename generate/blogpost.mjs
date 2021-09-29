import slugify from '@sindresorhus/slugify'
import axios from 'axios'
import dotenv from 'dotenv'
import fakeUa from 'fake-useragent'
import fs from 'fs'
import inquirer from 'inquirer'
import jsToYaml from 'json-to-pretty-yaml'
import mkdirp from 'mkdirp'
import { createRequire } from 'module'
import opn from 'opn'
import ora from 'ora'
import path, { dirname } from 'path'
import prettier from 'prettier'
import tinify from 'tinify'
import { fileURLToPath } from 'url'
import util from 'util'




// Get the root path to our project (Like `__dirname`).
const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url)

dotenv.config({
  path: path.join(root, '.env'),
})
const fromRoot = (...p) => path.join(root, '..', ...p)

tinify.key = process.env.TINY_PNG_API_KEY

const padLeft0 = n => n.toString().padStart(2, '0')
const formatDate = d =>
  `${d.getFullYear()}-${padLeft0(d.getMonth() + 1)}-${padLeft0(d.getDate())}`

const listify = a =>
  a && a.trim().length
    ? a
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    : null

async function generateBlogPost() {
  const {title, description, tags, isPublished} = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Title',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
    },
    {
      type: 'input',
      name: 'tags',
      message: 'Tags (comma separated)',
    },
    {
      type: 'confirm',
      name: 'isPublished',
      message: 'Do you want to publish?',
    },
    // {
    //   type: 'input',
    //   name: 'keywords',
    //   message: 'Keywords (comma separated)',
    // },
  ])
  console.log(tags)
  const slug = slugify(title)
  const destination = fromRoot('/content/blog', slug)
  mkdirp.sync(destination)

  const bannerCredit = await getBannerPhoto(title, destination)

  const yaml = jsToYaml.stringify(
    removeEmpty({
      title,
      date: formatDate(new Date()),
      author: 'Ojo Oluwasetemi Stephen 00S',
      description: `_${description}_`,
      tags: listify(tags),
      // keywords: listify(keywords),
      isPublished,
      isDraft: !isPublished,
      banner: './images/banner.jpg',
      bannerCredit,
    }),
  )
  const markdown = prettier.format(`---\n${yaml}\n---\n`, {
    ...require('../prettier.config'),
    parser: 'mdx',
  })

  fs.writeFileSync(path.join(destination, 'index.mdx'), markdown)

  console.log(`${destination.replace(process.cwd(), '')} is all ready for you`)
}

async function getBannerPhoto(title, destination) {

  const imagesDestination = path.join(destination, 'images')

  await opn(`https://unsplash.com/search/photos/${encodeURIComponent(title)}`, {
    wait: false,
  })

  const {unsplashPhotoId} = await inquirer.prompt([
    {
      type: 'input',
      name: 'unsplashPhotoId',
      message: `What's the Unsplash Photo ID for the banner for this post?`,
    },
  ])
  mkdirp.sync(imagesDestination)

  if (unsplashPhotoId) {
    const source = await tinify
      .fromUrl(
        `https://unsplash.com/photos/${unsplashPhotoId}/download?force=true`,
      )
      .resize({
        method: 'scale',
        width: 2070,
      })

    const spinner = ora('compressing the image with tinypng.com').start()
    await util
      .promisify(source.toFile)
      .call(source, path.join(imagesDestination, 'banner.jpg'))
    spinner.text = 'compressed the image with tinypng.com'
    spinner.stop()
    const bannerCredit = await getPhotoCredit(unsplashPhotoId)
    return bannerCredit
  }
  return null
}

async function getPhotoCredit(unsplashPhotoId) {
  const response = await axios({
    url: `https://unsplash.com/photos/${unsplashPhotoId}`,
    headers: {'User-Agent': fakeUa()},
  })
  const {
    groups: {name},
  } = response.data.match(/Photo by (?<name>.*?) on Unsplash/) || {
    groups: {name: 'Unknown'},
  }
  return `Photo by [${name}](https://unsplash.com/photos/${unsplashPhotoId})`
}

function removeEmpty(obj) {
  return Object.entries(obj).reduce((o, [key, value]) => {
    if (value) {
      o[key] = value
    }
    return o
  }, {})
}

generateBlogPost()

/* eslint no-console:0 */
