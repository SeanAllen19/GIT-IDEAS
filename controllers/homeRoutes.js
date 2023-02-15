const router = require("express").Router();
const { User, Notes, Tags } = require("../models");
const axios = require("axios");
const withAuth = require("../utils/auth");
// global array of objects for holding onto search results
var resultObject = [];

// render homepage template
router.get("/", async (req, res) => {
  try {
    res.status(200).render("homepage", {
      homepage: true,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// makes a search query to github and pushes desired results into global variable before taking the user to the /results page
router.get("/search/:query", async (req, res) => {
  try {
    // empty out array of results objects for new search
    resultObject = [];
    const searchTerm = req.params.query;
    const queryStr = `https://api.github.com/search/repositories?q=${searchTerm}&per_page=10`;

    const results = await axios.get(queryStr);

    results.data.items.forEach((item) => {
      if (item.license) {
        resultObject.push({
          id: item.id,
          fullName: item.full_name,
          link: item.html_url,
          description: item.description,
          language: item.language,
          license: item.license.name,
          stargazers_count: item.stargazers_count,
          repoInfo: JSON.stringify({
            fullName: item.full_name,
            link: item.html_url,
            description: item.description,
            language: item.language,
            license: item.license.name,
            stargazers_count: item.stargazers_count,
          }),
        });
      } else {
        resultObject.push({
          id: item.id,
          fullName: item.full_name,
          link: item.html_url,
          description: item.description,
          language: item.language,
          stargazers_count: item.stargazers_count,
          repoInfo: JSON.stringify({
            fullName: item.full_name,
            link: item.html_url,
            description: item.description,
            language: item.language,
            stargazers_count: item.stargazers_count,
          }),
        });
      }
    });

    res.status(200).redirect("/results");
  } catch (err) {
    res.status(500).json(err);
  }
});

// renders search results within the global resultObject onto searchResults page
router.get("/results", async (req, res) => {
  try {
    const renderObject = {
      resultObject,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    };

    if (req.session.logged_in) {
      const userTags = await Tags.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });

      // const tags = userTags.map((tag) =>tag.get({ plain: true }));
      renderObject.tags = userTags.map((tag) => tag.get({ plain: true }));
    }

    res.status(200).render("searchResults", renderObject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// render login template
router.get("/login", async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// displays all of the current user's tags
router.get("/tagmanager", withAuth, async (req, res) => {
  try {
    const userData = await Tags.findAll({
      where: { user_id: req.session.user_id },
    });

    const tags = userData.map((tag) => tag.get({ plain: true }));

    res.status(200).render("tagManager", {
      tags,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// displays all of the current user's notes and makes all of the user's tags available for note editing
router.get("/saved", withAuth, async (req, res) => {
  try {
    const userNotes = await Notes.findAll({
      include: [{ model: Tags }],
      where: {
        user_id: req.session.user_id,
      },
    });

    const notes = userNotes.map((note) => note.get({ plain: true }));

    const userTags = await Tags.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const tags = userTags.map((tag) => tag.get({ plain: true }));

    res.status(200).render("savedNotes", {
      tags,
      notes,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ! Future development ! finds all notes in the database along with associated tag data and username
router.get("/explore", withAuth, async (req, res) => {
  try {
    const notesData = await Notes.findAll({
      include: [
        { model: Tags },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!notesData.length) {
      res.status(404).json({ message: 'No notes found' });
      return;
    };

    const notes = notesData.map((notes) => notes.get({ plain: true }));

    res.status(200).render('explore', {
    notes,
    logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
