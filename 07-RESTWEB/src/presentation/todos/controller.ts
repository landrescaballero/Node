import { Request, Response } from "express";


const todos = [
    { id: 1, content: 'get milk', completedAt: new Date() },
    { id: 2, content: 'hunt a deer', completedAt: null },
    { id: 3, content: 'check traps', completedAt: new Date() },
];

export class ToDosController {
    //* Dependency Injection
    constructor() { }


    public getToDos = async (req: Request, res: Response) => {
        return res.json(todos);
    }

    public getToDoById = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(parseInt(id))) return res.status(400).json({ message: `Invalid id. ${id} is not a number` });
        const todo = todos.find(todo => todo.id === parseInt(id));
        (todo)
            ? res.json(todo)
            : res.status(404).json({ message: `Todo with id = ${id} not found` });
    }


    public createToDo = async (req: Request, res: Response) => {
        const { content } = req.body;
        if (!content) return res.status(400).json({ message: 'Content is required' });
        const newTodo = { id: todos.length + 1, content, completedAt: null };
        todos.push(newTodo);
        res.json(newTodo);
    }


    public updateTodo = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(parseInt(id))) return res.status(400).json({ message: `Invalid id. ${id} is not a number` });

        const todo = todos.find(todo => todo.id === parseInt(id));
        if (!todo) return res.status(404).json({ message: `Todo with id = ${id} not found` });
        
        const { content, completedAt } = req.body;
        todo.content = content || todo.content;
        (completedAt === 'null')
        ? todo.completedAt = null
        : todo.completedAt = new Date(completedAt || todo.completedAt);
        
        
        
        //!Ojo
        todo.content = content;
        
        
        res.json({ message: 'updateTodo', todo });
    }
    
    
    public deleteTodo = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (isNaN(parseInt(id))) return res.status(400).json({ message: `Invalid id. ${id} is not a number` });
    
        const todo = todos.find(todo => todo.id === parseInt(id));
        if (!todo) return res.status(404).json({ message: `Todo with id = ${id} not found` });
        
        const index = todos.indexOf(todo);
        todos.splice(index, 1);

        res.json({ message: 'deleteTodo', todo });
    }
}
