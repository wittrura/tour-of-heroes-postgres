const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  knex('hero')
    .orderBy('id')
    .then((heroes) => {
      res.status(200).json({data: heroes});
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  let newHero = req.body;
  knex('hero')
    .insert({ name: newHero.name}, '*')
    .then((hero) => {
      res.status(200).json({data: hero[0]});
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  knex('hero')
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

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  let deletedHero;
  // GET hero to be deleted for returning
  knex('hero')
    .where({
      id: id
    })
    .first()
    .then((hero) => {
      deletedHero = hero;
      // delete hero after it's been stored
      knex('hero')
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

router.patch('/:id', (req, res, next) => {
  let id = req.params.id;
  let updatedHero = req.body;
  knex('hero')
    .where({
      id: id
    })
    .first()
    .then((hero) => {
      if (!hero) {
        return next();
      }
      return knex('hero').where({ id: id }).update(updatedHero, '*');
    })
    .then((hero) => {
      res.status(200).json({data: hero[0]});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
