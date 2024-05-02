import { Router } from "express";
import { ToDosRoutes } from "./todos/routes";




export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/todos', ToDosRoutes.routes);
        return router;
    }

}