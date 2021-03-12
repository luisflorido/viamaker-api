'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Env = use("Env");

const API_VERSION = Env.get("API_VERSION");

Route.on('/').render('welcome')

Route.group(() => {
    Route.on('/').render('welcome')

    Route.post('login', 'AuthController.login')
    
    Route
        .resource('schools', 'SchoolController')
        .middleware(
            new Map([
            [["index", "store", "show", "destroy"], ["auth"]],
            [["index"], ["pagination"]],
            ])
        );
        
    Route
        .resource('classes', 'ClassController')
        .middleware(
            new Map([
            [["index", "store", "show", "destroy"], ["auth"]],
            [["index"], ["pagination"]],
            ])
        );

    Route
        .resource('students', 'StudentController')
        .middleware(
            new Map([
            [["index", "store", "show", "destroy"], ["auth"]],
            [["index"], ["pagination"]],
            ])
        );
}).prefix(API_VERSION)
