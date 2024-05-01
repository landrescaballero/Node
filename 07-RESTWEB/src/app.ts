import { envs } from "./config/envs.plugin";
import { Server } from "./presentation/server";




(async () => {
    main();
})();

function main() {

    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
    });

    server.start();
}