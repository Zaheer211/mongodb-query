const { get } = require('mongoose');

const Project = require('./db').Project;
const Thread = require('./db').Thread;

module.exports = {

    // Get stats of projects where fieldValue is present in customFields array
    // This assumes that we need to get stats from any customField where value is fieldValue
    getProjectsCount: function (fieldValue) {
        return new Promise(async (resolve, reject) => {
            try {
                const count = await Project.countDocuments({ 'customFields.value': fieldValue });
                resolve(count);
            } catch (err) {
                reject(err);
            }
        })
    },

    // Get stats of threads where fieldValue is present in customFields array
    // This assumes that we need to get stats from any customField where value is fieldValue
    getThreadsCount: function (fieldValue) {
        return new Promise(async (resolve, reject) => {
            try {
                const count = await Thread.countDocuments({ 'customFields.value': fieldValue });
                resolve(count);
            } catch (err) {
                reject(err);
            }
        })
    },

    // This is for the case when customFields.value is an array of objects and we need to get stats for nestedField-value
    getProjectsCountV2: function (fieldValue) {
        return new Promise(async (resolve, reject) => {
            try {
                const stats = await Project.aggregate([
                    // Unwind the customFields array
                    { $unwind: "$customFields" },
                    // Unwind the value array within customFields
                    { $unwind: { path: "$customFields.value", preserveNullAndEmptyArrays: true } },
                    // Match documents where the value field contains the specified nestedFieldValue as an array element
                    {
                        $match: {
                            $or: [
                                { "customFields.value": fieldValue },
                                { "customFields.value.name": fieldValue },
                                { "customFields.value.data": fieldValue }
                            ]
                        }
                    },
                    // Group by project ID to count unique projects
                    { $group: { _id: "$_id", count: { $sum: 1 } } },
                    // Count the total number of projects
                    { $group: { _id: null, totalCount: { $sum: 1 } } }
                ]);
                resolve(stats[0]?.totalCount);
            } catch (err) {
                reject(err);
            }
        })
    },

    // This is for the case when customFields.value is an array of objects and we need to get stats for nestedField-value
    getThreadsCountV2: function (fieldValue) {
        return new Promise(async (resolve, reject) => {
            try {
                const stats = await Thread.aggregate([
                    // Unwind the customFields array
                    { $unwind: "$customFields" },
                    // Unwind the value array within customFields
                    { $unwind: { path: "$customFields.value", preserveNullAndEmptyArrays: true } },
                    // Match documents where the value field contains the specified nestedFieldValue as an array element
                    {
                        $match: {
                            $or: [
                                { "customFields.value": fieldValue },
                                { "customFields.value.name": fieldValue },
                                { "customFields.value.data": fieldValue }
                            ]
                        }
                    },
                    // Group by project ID to count unique projects
                    { $group: { _id: "$_id", count: { $sum: 1 } } },
                    // Count the total number of projects
                    { $group: { _id: null, totalCount: { $sum: 1 } } }
                ]);
                resolve(stats[0]?.totalCount);
            } catch (err) {
                reject(err);
            }
        })
    },

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

    // Delete all projects
    deleteProjects: function () {
        return new Promise(async (resolve, reject) => {
            try {
                await Project.deleteMany({});
                resolve();
            } catch (err) {
                reject(err);
            }
        })
    },

    // Delete all threads
    deleteThreads: function () {
        return new Promise(async (resolve, reject) => {
            try {
                await Thread.deleteMany({});
                resolve();
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
        for (let j = 0; j < Math.floor(Math.random() * 10) + 1; j++) {
            if (j % 2 == 0) {
                customFields.push({
                    name: 'Field ' + j,
                    value: 'Value ' + j
                });
            } else {

                let arr = [];
                for (let k = 1; k <= getRandomIntInRange(1, 5); k++) {
                    arr.push({ name: 'module-' + k, data: 'data-' + k });
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
    return data;
}