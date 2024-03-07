import mongoose from "mongoose";


let isConnected = false
export async function ConnectDb() {

    if(!process.env.MONGODB_URL) return console.log('No MONGODB Url in env')

    if(isConnected) return console.log('Already connected')
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true
        console.log('Connected to mongodb')
    } catch (error) {
        throw new Error('Failed to connect: '+error)
    }
    
}