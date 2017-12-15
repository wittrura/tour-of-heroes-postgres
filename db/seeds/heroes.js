
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('heroes').del()
    .then(function () {
      // Inserts seed entries
      return knex('heroes').insert([
        {name: 'Batman'},
        {name: 'Wolverine'},
        {name: 'Mintberry Crunch'},
        {name: 'Tupperware'},
        {name: 'Dogwelder'},
        {name: 'Vibe'},
        {name: 'Leather Boy'}
      ]);
    });
};
