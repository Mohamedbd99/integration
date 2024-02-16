//------------BD Config -------------//
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL);
mongoose.connection.on('connected',()=>{
    console.log('bdd connexion oooooook ');
});

mongoose.connection.on('error',(err)=>{
    console.error('bdd connexion not ok ');
});
