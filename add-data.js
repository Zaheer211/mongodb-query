
const Project = require('./db').Project;
const Thread = require('./db').Thread;

module.exports = {

    // Generate [count] random projects with different customFields
    addProjects: function (count = 100) {
        return new Promise(async (resolve, reject) => {
            try {
                const projects = getRandomData(count);
                const docs = await Project.insertMany(projects);
                resolve(docs);

            } catch (err) {
                reject(err);
            }
        })
    },

    // Generate [count] random threads with different customFields
    addThreads: function (count = 100) {
        return new Promise(async (resolve, reject) => {
            try {
                const threads = getRandomData(count);
                const docs = await Thread.insertMany(threads);
                resolve(docs);

            } catch (err) {
                reject(err);
            }
        })
    },

}

function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        const customFields = [];
        // To generate random number of customFields with value randomly as string or array
        // If j is even, value is string, else value is array
        for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
            if (j % 2 == 0) {
                customFields.push({
                    name: 'Field ' + j,
                    value: 'Value ' + j
                });
            } else {

                let arr = [];
                for (let k = 0; k < getRandomIntInRange(1, 5); k++) {
                    arr.push('v-' + k);
                }

                customFields.push({
                    name: 'Field ' + j,
                    value: arr
                });
            }
        }
        data.push({
            title: 'Some title ' + i,
            description: 'Description ' + i,
            customFields: customFields
        });
    }
}