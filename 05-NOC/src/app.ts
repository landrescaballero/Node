
import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation/server-app";

//Funcion anonima autoinvocable
(async()=>{
    main();
})();

async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });


    const prisma = new PrismaClient();
    //* Crear un registro en postgres
    // const newLog = await prisma.logModel.create({
    //     data:{
    //         level: 'HIGH',
    //         message: 'Log de prueba',
    //         origin: 'App.ts',
    //     }
    // });
    // console.log(newLog);
    //* Crear consulta donde level sea HIGH 
    // const logs = await prisma.logModel.findMany({
    //     where:{
    //         level: 'HIGH'
    //     }
    // })
    // console.log(logs);



    //* Crear una colección = tables, documento = row
    // const newLog = await LogModel.create({
    //     message: 'Log de prueba',
    //     origin: 'App.ts',
    //     level: 'low',
    // });

    // await newLog.save();
    // console.log('log saved:', newLog);
    
    // const logs = await LogModel.find();
    // console.log(logs[0].message);
    
    ServerApp.start();
    // console.log(envs);
}