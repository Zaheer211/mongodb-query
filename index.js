

const express = require('express');
const app = express();

// const projects = [
//     {
//         title: 'Project 1',
//         description: 'Description for project 1',
//         customFields: [
//             { name: 'Field 1', value: 'Value 1' },
//             { name: 'Field 2', value: 'Value 2' },
//             { name: 'Field 3', value: ['v-1', 'v-2', 'v-3'] }
//         ],
//     },
//     {
//         title: 'Project 2',
//         description: 'Description for project 2',
//         customFields: [
//             { name: 'Field a', value: 'Value 1' },
//             { name: 'Field 2', value: 'Value 2' },
//             { name: 'Field d', value: ['a-1', 'a-2', 'a-3'] }
//         ],
//     },
//     {
//         title: 'Project 3',
//         description: 'Description for project 3',
//         customFields: [
//             { name: 'Field a', value: 'Value 1' },
//             { name: 'Field b', value: 'Value 2' },
//             { name: 'Field c', value: ['c-1', 'v-2', 'c-3'] },
//             { name: 'Field d', value: ['d-1', 'd-2', 'd-3'] }
//         ],
//     },
// ];


app.get('/', (req, res) => {

    // Project.insertMany(projects).then((docs) => {
    //     console.log('Projects inserted:', docs.length);
    //     res.send('Projects inserted:' + docs.length);
    // }).catch((err) => {
    //     console.error(err);
    // });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});



// Write a query to get following stats,
// Projects count where v-2 is present in customFields array in any object
// Project.countDocuments({ 'customFields.value': 'v-2' }).then((count) => {
//     console.log('Projects count with v-2:', count);
// }).catch((err) => {
//     console.error(err);
// });

