import { Request, Response } from "express";
import { prisma } from "../../data/postgre";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";



// const todos = [
//     { id: 1, content: 'get milk', completedAt: new Date() },
//     { id: 2, content: 'hunt a deer', completedAt: null },
//     { id: 3, content: 'check traps', completedAt: new Date() },
// ];

export class ToDosController {
    //* Dependency Injection
    constructor() { }


    public getToDos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getToDoById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(parseInt(id))) return res.status(400).json({ message: `Invalid id. ${id} is not a number` });
        // const todo = todos.find(todo => todo.id === parseInt(id));
        // (todo)
        //     ? res.json(todo)
        //     : res.status(404).json({ message: `Todo with id = ${id} not found` });
        const todo = await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        });
        (!todo) 
        ? res.status(404).json({ message: `Todo with id = ${id} not found` })
        : res.json(todo);
    }


    public createToDo = async (req: Request, res: Response) => {
        // //* Impl with prisma postgre
        // const { content } = req.body;
        // if (!content) return res.status(400).json({ message: 'Content is required' });

        // const todo = await prisma.todo.create({
        //     data: { content }
        // });

        // // const newTodo = { id: todos.length + 1, content, completedAt: null };
        // // todos.push(newTodo);
        // res.json(todo);
        
        //* Impl with DTO
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ message: error });

        const todo = await prisma.todo.create({
            data:  createTodoDto!
        });

        res.json(todo);
    }


    public updateTodo = async (req: Request, res: Response) => {
        //* Impl with arrays
        // const { id } = req.params;
        // if (isNaN(parseInt(id))) return res.status(400).json({ message: `Invalid id. ${id} is not a number` });

        // const todo = todos.find(todo => todo.id === parseInt(id));
        // if (!todo) return res.status(404).json({ message: `Todo with id = ${id} not found` });

        // const { content, completedAt } = req.body;
        
        // todo.content = content || todo.content;
        // (completedAt === 'null')
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date(completedAt || todo.completedAt);


        // //* Impl with Prisma Postgre
        // const { id } = req.params;
        // if (isNaN(parseInt(id))) return res.status(400).json({ message: `Invalid id. ${id} is not a number` });

        // const todo =  await prisma.todo.findUnique({
        //     where: { id: parseInt(id) }
        // });
        // if (!todo) return res.status(404).json({ message: `Todo with id = ${id} not found` });

        // const { content, completedAt } = req.body;

        // todo.content = content || todo.content;
        // (completedAt === 'null')
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date(completedAt || todo.completedAt);

        // const updateTodo = await prisma.todo.update({
        //     where: { id: parseInt(id) },
        //     data: { content: todo.content, completedAt: todo.completedAt }
        // });

        // res.json({ message: 'updateTodo', updateTodo });



        //* Impl with Prisma Postgre and DTO
        const { id } = req.params;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
        if (error) return res.status(400).json({ message: error });


        const todo =  await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        });


        if (!todo) return res.status(404).json({ message: `Todo with id = ${id} not found` });


        const updateTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: updateTodoDto!.values
        });

        res.json({ message: 'updateTodo', updateTodo });
    }


    public deleteTodo = async (req: Request, res: Response) => {
        // const { id } = req.params;
        // if (isNaN(parseInt(id))) return res.status(400).json({ message: `Invalid id. ${id} is not a number` });

        // const todo = todos.find(todo => todo.id === parseInt(id));
        // if (!todo) return res.status(404).json({ message: `Todo with id = ${id} not found` });

        // const index = todos.indexOf(todo);
        // todos.splice(index, 1);

        // res.json({ message: 'deleteTodo', todo });
        const { id } = req.params;
        if (isNaN(parseInt(id))) return res.status(400).json({ message: `Invalid id. ${id} is not a number` });

        const todo =  await prisma.todo.findUnique({
            where: { id: parseInt(id) }
        });
        if (!todo) return res.status(404).json({ message: `Todo with id = ${id} not found` });

        const deleteTodo = await prisma.todo.delete({
            where: { id: parseInt(id) }
        });


        res.json({ message: 'deleteTodo', deleteTodo });
    }
}
