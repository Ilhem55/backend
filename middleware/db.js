
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Marwa:wadia123..@cluster0.gt1tz.mongodb.net/tennis', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));