'use strict'
const School = use('App/Models/School');
const Class = use('App/Models/Class');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with classes
 */
class ClassController {
  /**
   * Show a list of all classes.
   * GET classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { page, size } = request.pagination;
    const { school_id } = request.get()

    const classObj = Class.query();

    if (school_id) {
      classObj.where("school_id", school_id);
    }

    return classObj
      .with("school")
      .paginate(page, size);
  }

  /**
   * Create/save a new class.
   * POST classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { name, school_id } = request.all();

      const school = await School.findBy("id", school_id);

      if (!school) {
        return response.notFound();
      }

      const classObj = await Class.create({ name, school_id });
  
      return classObj;
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Display a single class.
   * GET classes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try {
      const { id } = params;
      const classObj = await Class.find(id);

      if (!classObj) {
        return response.notFound();
      }

      return classObj;
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Update class details.
   * PUT or PATCH classes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const { id } = params;
      const newClass = request.all();

      if (newClass.school_id) {
        const school = await School.find(newClass.school_id);
  
        if (!school) {
          return response.notFound();
        }
      }

      const classObj = await Class.find(id);

      if (!classObj) {
        return response.notFound();
      }

      classObj.merge(newClass);
      await classObj.save();

      return classObj;
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Delete a class with id.
   * DELETE classes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    try {
      const { id } = params;

      const classObj = await Class.find(id);

      if (!classObj) {
        return response.notFound();
      }

      await classObj.delete();

      return response.ok(classObj);
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }
}

module.exports = ClassController
