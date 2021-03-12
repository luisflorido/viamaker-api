'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassSchema extends Schema {
  up () {
    this.create('classes', (table) => {
      table.increments()
      table.string('name')
      table
        .integer("school_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("schools")
      table.timestamps()
    })
  }

  down () {
    this.drop('classes')
  }
}

module.exports = ClassSchema
