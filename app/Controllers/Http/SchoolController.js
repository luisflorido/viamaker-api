'use strict'
const School = use('App/Models/School');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with schools
 */
class SchoolController {
  /**
   * Show a list of all schools.
   * GET schools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { page, size } = request.pagination;

    const schools = await School.query()
      .paginate(page, size);

    return schools;
  }

  /**
   * Create/save a new school.
   * POST schools
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { name, cnpj } = request.all();

      const school = await School.create({ name, cnpj });
  
      return school;
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Display a single school.
   * GET schools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try {
      const { id } = params;
      const school = await School.find(id);

      if (!school) {
        return response.notFound()
      }

      return school;
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Update school details.
   * PUT or PATCH schools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const { id } = params;
      const { name, cnpj } = request.all();

      const school = await School.find(id);

      if (!school) {
        return response.notFound()
      }

      school.merge({ name, cnpj });
      await school.save();

      return school;
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Delete a school with id.
   * DELETE schools/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const { id } = params;

      const school = await School.find(id);

      if (!school) {
        return response.notFound()
      }

      await school.delete();

      return response.ok(school);
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }
}

module.exports = SchoolController
