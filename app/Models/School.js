'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class School extends Model {
    classes() {
        return this.hasMany('App/Models/Class')
    }
}

module.exports = School
