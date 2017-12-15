const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  if (req.query.name) {
    // for query string, to search by name
    let query = `%${req.query.name}%`.toLowerCase();
    knex('heroes')
      .whereRaw("LOWER(name) LIKE ?", query)
      // .select('name')
      .then((heroes) => {
        res.status(200).json({data: heroes});
      })
      .catch((err) => {
        next(err);
      });
  } else {
    // return all heroes
    knex('heroes')
    .orderBy('id')
    .then((heroes) => {
      res.status(200).json({data: heroes});
    })
    .catch((err) => {
      next(err);
    });
  }
});

// POST new hero
router.post('/', (req, res, next) => {
  let newHero = req.body;
  knex('heroes')
    .insert({ name: newHero.name}, '*')
    .then((hero) => {
      res.status(200).json({data: hero[0]});
    })
    .catch((err) => {
      next(err);
    });
});

// GET hero by id
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  knex('heroes')
    .where({
      id: id
    })
    .first()
    .then((hero) => {
      if (!hero) {
        return next();
      }
      res.status(200).json({data: hero});
    })
    .catch((err) => {
      next(err);
    });
});

// DELETE hero by id
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  let deletedHero;
  // GET hero to be deleted for returning
  knex('heroes')
    .where({
      id: id
    })
    .first()
    .then((hero) => {
      deletedHero = hero;
      // delete hero after it's been stored
      knex('heroes')
      .where({
        id: id
      })
      .first()
      .delete()
      .then(() => {
        res.status(200).json({data: deletedHero});
      })
      .catch((err) => {
        next(err);
      });
    })
    .catch((err) => {
      next(err);
    });
});

// PATCH hero by id
router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  let updatedHero = req.body;
  knex('heroes')
    .where({
      id: id
    })
    .first()
    .then((hero) => {
      if (!hero) {
        return next();
      }
      return knex('heroes').where({ id: id }).update(updatedHero, '*');
    })
    .then((hero) => {
      res.status(200).json({data: hero[0]});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
