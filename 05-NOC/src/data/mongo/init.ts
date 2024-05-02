import mongoose from "mongoose";


interface MongoConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: MongoConnectionOptions) {
        const { mongoUrl,dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName,
            });
            console.log('MongoDB connected');
            
        } catch (error) {
            console.log('MongoDB connection error');
            throw error;               
        }

    }
    

}