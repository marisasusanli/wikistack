const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

db.authenticate().then(() => {
  console.log('Connected to DB successfully');
});

function generateSlug(title) {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('pages', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

// if the slug field is left blank - replace with random string
// variable page passed into beforeValidate is the instance of Page
Page.beforeValidate((page) => {
  if (!page.slug) {
    page.slug = generateSlug(page.title);
  }
});

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

// adds a column called "authorId" to the "pages" table
// column contains the id of the user associated with that page
// do a {force : true} save to drop/add the tables again
Page.belongsTo(User, { as: 'author' });

User.hasMany(Page, { foreignKey: 'authorId' });

module.exports = {
  db,
  Page,
  User,
};
