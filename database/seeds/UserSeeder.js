'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const admin = new User()
    admin.username = 'Luis'
    admin.email = 'admin@admin.com'
    admin.password = '12345678'
    await admin.save();
  }
}

module.exports = UserSeeder
