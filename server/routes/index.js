import express from 'express';
import * as controllers from "../controllers/index.js";
import bodyParser from 'body-parser';

const router = express.Router();

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false })

router.route("/protected").get(controllers.getAllTodos);
router.route("/users").get(controllers.getAllTodos);
router.route("/registration").post(jsonParser, controllers.registerUser);
router.route("/login").post(jsonParser, controllers.checkUser);
router.route("/usersID").get(controllers.getTodos)
    .put(controllers.updateTodo)
    .delete(controllers.deleteTodo);
export default router;