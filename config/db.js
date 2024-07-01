const mongoose =require('mongoose')

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongo Db connected ${conn.connection.host}`.cyan.underline)//dice el host al que se conecto
    } catch (error) {
        console.error(error)
        process.exit(1)//si hay error cierra la aplicacion
    }
}

module.exports = connectDB
