import { ServerApp } from "./presentation/server-app";

//Funcion anonima autoinvocable
(async()=>{
    main();
})();

function main(){
    ServerApp.start();

}