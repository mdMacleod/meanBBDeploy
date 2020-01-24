console.log('***PET_MODEL***');


const mongoose = require('mongoose')
    const PetSchema = new mongoose.Schema({
        name: { type: String, required: [true, "Pets must have a full name"], minlength: [3, "Author's full name must have at least 6 characters"] },
        type: {type: String, required: [true, "You must give a pet species"], minlength: [3, "Please give the full length species name of your pet"]},
        description:{type: String, required: [true, "Pet must have a description"], minlength: [3, "Please give the full length species name of your pet"]},
        vote: {type: Number, default: 0},
        skillOne: {type: String },
        skillTwo: {type: String},
        skillThree: {type: String}
    }, { timestamps: true });

    
    const Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet
