'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('users_badges', (table) => {
    table.increments();
    table.integer('user_id').notNullable().references('github_id').inTable('users').onDelete('CASCADE');
    table.integer('badge_id').notNullable().references('id').inTable('badges').onDelete('CASCADE');
    table.boolean('is_complete').notNullable().defaultTo(false);
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users_badges');
};
