console.log('****MONGOOSE****');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pet', { useNewUrlParser: true, useUnifiedTopology: true });
