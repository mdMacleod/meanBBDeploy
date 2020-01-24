console.log('****CONTROLLERS*****');


const Pet = require('../models/pet.js');


module.exports = {
    index: function (req, res) {
        console.log("*****CONTROLLER******")
        Pet.find({}, null, {sort: {type: 1}})
            .then(data => res.json({ pets: data }))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },

    show: function (req, res) {
        console.log('**CONTROLLER GETONE ***', req.params)
        Pet.findOne({ _id: req.params.id})
            .then(pet => res.json({pet: pet}))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },

    create: function (req, res) {
        console.log(req.body);
        Pet.find({name: req.body.name})
        .then( pet => {
            if (pet.length > 0) {
                return Promise.reject ({unique: "That pet already exists!"})
            }
            return Pet.create(req.body)
        })

            .then(data => { console.log(data); res.json(data) })


            .catch(err => {
                console.log("****ERRROR HERE****");
                console.log(err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                console.log("***ERRORS HERE ***", err)
                res.json({ errors: err });
            });
    },

    update: function (req, res) {
        console.log(req.body);
        Pet.findOne({ _id: req.body._id })
            .then(pet => {
                pet.name = req.body.name;
                pet.type = req.body.type;
                pet.description = req.body.description;
                pet.skillOne = req.body.skillOne;
                pet.skillTwo = req.body.skillTwo;
                pet.skillThree = req.body.skillThree;

                return pet.save();
            })
            .then(saveResult => res.json(saveResult))
            .catch(err => {
                console.log("****ERRROR HERE****");
                console.log(err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json({errors: err});
            });
    },


    upvote: function(req, res) {
        console.log("UPVOTE_CONTROLLER", req.body);
        Pet.findOne({_id: req.body.id})
        .then(pet =>{ (console.log(pet))
                    pet.vote += 1;
                    console.log("**UPDATED_PET_BEFORE_SAVE", pet)
                    return pet.save({suppressWarning: true});
        })
        .then(saveresult => res.json(saveresult))
        .catch(err => {
            console.log("****ERRROR HERE****");
            console.log(err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.json({errors: err.errors});
        });
    },

    // downvote: function(req, res) {
    //     // console.log("UPVOTE_CONTROLLER", req.body);
    //     Author.findOne({_id: req.body.authid})
    //     .then(author =>{ (console.log(author))
    //         const quotes = author.quotes;
    //         // console.log("***QUOTES_IN_UPVOTE_CONTROLLER", quotes);
    //         for (var key of quotes){
    //             console.log(key);
    //             if (key._id == req.body.quoteid && key.vote > 0){
    //                 key.vote -= 1;
    //                 console.log("**UPDATED_QUOTE_BEFORE_SAVE", key)
    //                 return author.save({suppressWarning: true});
    //             }
    //         }
    //     })
    //     .then(saveresult => res.json(saveresult))
    //     .catch(err => {
    //         console.log("****ERRROR HERE****");
    //         console.log(err);
    //         for (var key in err.errors) {
    //             req.flash('registration', err.errors[key].message);
    //         }
    //         res.json({errors: err.errors});
    //     });
    // },

    destroy: function (req, res) {
        console.log("Destroy_CONTROLLER", req.params);
        Pet.findOne({_id: req.params.id})
        .then(pet =>{ (console.log( "***FOUND_DESTROY_PET***", pet))
            pet.remove()
        })
        .then(saveresult => res.json(saveresult))
        .catch(err => {
            console.log("****ERRROR HERE****");
            console.log(err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.json({errors: err.errors});
        });
    },
}
