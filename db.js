
const db_url = process.env.DB_URL || 'mongodb://localhost:27017/test';
const mongoose = require('mongoose');

mongoose.connect(db_url);
mongoose.set('debug', true);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Connected to MongoDB');
});

const Schema = mongoose.Schema;

// In the below schema, we have array of customFields where we can add any dynamic fields, value can be a string, array of string

const projectSchema = new Schema({
    title: String,
    description: String,
    customFields: [{ name: String, value: mongoose.Schema.Types.Mixed }],
});

const threadSchema = new Schema({
    title: String,
    description: String,
    customFields: [{ name: String, value: mongoose.Schema.Types.Mixed }],
});

const Project = mongoose.model('Project', projectSchema);
const Thread = mongoose.model('Thread', threadSchema);

module.exports = {
    Project,
    Thread
};

