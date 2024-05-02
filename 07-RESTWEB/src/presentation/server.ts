
import express, { Router } from 'express';
import path from 'path';

interface options {
    port: number;
    public_path?: string;
    routes: Router;
}


export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;


    constructor(private options: options) {
        const { port, public_path = 'public', routes: routes } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }


    async start() {
        console.log('Server is running ');

        //*Middlewares
        this.app.use(express.json()); //? raw
        this.app.use(express.urlencoded({ extended: true })); //? x-www-form-urlencoded


        //*Public Folder    
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes);


        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;

        });


        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);

        });
    }


}