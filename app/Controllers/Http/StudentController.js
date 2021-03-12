'use strict'
const Class = use('App/Models/Class');
const Student = use('App/Models/Student');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { page, size } = request.pagination;
    const { class_id } = request.get()

    const students = Student.query()
      
    if (class_id) {
      students.where("class_id", class_id);
    }

    return students
      .with("class")
      .paginate(page, size);
  }

  /**
   * Create/save a new student.
   * POST students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { name, class_id } = request.all();

      const classObj = await Class.findBy("id", class_id);

      if (!classObj) {
        return response.notFound();
      }

      const student = await Student.create({ name, class_id });
  
      return student;
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Display a single student.
   * GET students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try {
      const { id } = params;
      const student = await Student.find(id);

      if (!student) {
        return response.notFound();
      }

      return student;
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Update student details.
   * PUT or PATCH students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const { id } = params;
      const newStudent = request.all();

      if (newStudent.class_id) {
        const classObj = await Class.find(newStudent.class_id);
  
        if (!classObj) {
          return response.notFound();
        }
      }

      const student = await Student.find(id);

      if (!student) {
        return response.notFound();
      }

      student.merge(newStudent);
      await student.save();

      return student;
    } catch (e) {
      console.log(e)
      return response.internalServerError({ message: e})
    }
  }

  /**
   * Delete a student with id.
   * DELETE students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const { id } = params;

      const student = await Student.find(id);

      if (!student) {
        return response.notFound();
      }

      await student.delete();

      return response.ok(student);
    } catch (e) {
      return response.internalServerError({ message: e})
    }
  }
}

module.exports = StudentController
