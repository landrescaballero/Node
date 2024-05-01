import { envs } from "./config/plugins/envs.plugin";
import { ServerApp } from "./presentation/server-app";

//Funcion anonima autoinvocable
(async()=>{
    main();
})();

function main(){
    ServerApp.start();
    // console.log(envs);
}