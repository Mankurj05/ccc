const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/LibraryDB'
)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log(error);
});