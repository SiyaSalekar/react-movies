const mongoose = require(`mongoose`)

let movieSchema = new mongoose.Schema(
      {
           posterUrl: {type: String},
           title: {type: String,required:true,unique:true},
           year: {type: Number},
           runtime: {type: Number},
           genres: {type: Array},
           director: {type: String,required:true},
           actors: {type: String},
           plot: {type: String}

      },
   {
       collection: `movies`
   })

module.exports = mongoose.model(`movies`, movieSchema)
