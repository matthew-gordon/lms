//deprecated - added user_id field to badges table

// 'use strict';
//
// exports.up = function(knex, Promise) {
//   return knex.schema.createTable('users_badges', (table) => {
//     table.increments();
//     table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
//     table.integer('badge_id').notNullable().references('id').inTable('badges').onDelete('CASCADE');
//   });
// };
//
// exports.down = function(knex, Promise) {
//   return knex.schema.dropTable('users_badges');
// };
