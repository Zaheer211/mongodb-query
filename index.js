

const express = require('express');
const app = express();
app.use(express.json());


const {
    addProjects, addThreads,
    deleteProjects, deleteThreads,
    getProjectsCount, getThreadsCount,
    getProjectsCountV2, getThreadsCountV2
} = require('./data');

app.get('/add-random-projects', async (req, res) => {
    try {
        const count = req.query.count || 100;
        const projects = await addProjects(count);
        res.status(200).json({ success: true, message: `Added ${count} random projects` });
    } catch (err) {
        res.status(500).send
    }
});

app.get('/add-random-threads', async (req, res) => {
    try {
        const count = req.query.count || 100;
        const threads = await addThreads(count);
        res.status(200).json({ success: true, message: `Added ${count} random threads` });
    } catch (err) {
        res.status(500).send
    }
});

app.get('/stats', async (req, res) => {
    try {
        let searchTerm = req.query.searchTerm;
        const projectsCount = await getProjectsCountV2(searchTerm);
        const threadsCount = await getThreadsCountV2(searchTerm);
        const result = {
            [searchTerm]: `${projectsCount || '0'} projects and ${threadsCount || '0'} threads`,
        }
        res.status(200).json({ success: true, result });
    } catch (err) {
        res.status(500).send
    }
});

app.get('/delete-projects', async (req, res) => {
    try {
        await deleteProjects();
        res.status(200).json({ success: true, message: `Deleted all projects` });
    } catch (err) {
        res.status(500).send
    }
});

app.get('/delete-threads', async (req, res) => {
    try {
        await deleteThreads();
        res.status(200).json({ success: true, message: `Deleted all threads` });
    } catch (err) {
        res.status(500).send
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

