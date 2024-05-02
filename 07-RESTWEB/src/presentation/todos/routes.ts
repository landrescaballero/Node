import { Router } from "express";
import { ToDosController } from "./controller";




export class ToDosRoutes {

    static get routes(): Router {
        const router = Router();
        const todosController = new ToDosController();

        //* Get methods
        router.get('/', todosController.getToDos);
        router.get('/:id', todosController.getToDoById);

        //* Post methods
        router.post('/', todosController.createToDo);

        //* Put methods
        router.put('/:id', todosController.updateTodo);

        //* Delete methods
        router.delete('/:id', todosController.deleteTodo);

        return router;
    }

}