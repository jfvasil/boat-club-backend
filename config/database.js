const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MongoDB_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
        
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    
  }
}

module.exports = connectDB

