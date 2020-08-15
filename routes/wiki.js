const express = require('express');
const router = express.Router();

const { Page, User } = require('../models');
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage,
} = require('../views');

// localhost:3000/wiki/
router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

// router.post('/', (req, res, next) => {
//   res.json(req.body);
// });

router.post('/', async (req, res, next) => {
  // initally get an error here bc there is no page slug in the form
  // need to add a hook to index.js file to create a slug
  try {
    const page = await Page.create(req.body);

    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

// localhost:3000/wiki/add/
router.get('/add', (req, res, send) => {
  res.send(addPage());
});

// router.get('/:slug', (req, res, next) => {
//   res.send(`hit dynamic route at ${req.params.slug}`);
// });

// localhost:3000/wiki/:slug/ - this code needs to go below /add
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    const author = await page.getAuthor();

    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
