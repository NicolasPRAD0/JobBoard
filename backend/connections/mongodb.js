const mongoose = require('mongoose');


mongoose
.connect("mongodb+srv://alexvdbe:GK5zjsFS3T0o0gmk@jobboard.1kqnn2v.mongodb.net/?retryWrites=true&w=majority")
.catch(e => console.log('Connection Error:' + e.message))

const db = mongoose.connection;
module.exports = db