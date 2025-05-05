const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();

app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.use((req, res, next) => {
    req.setTimeout(10000);
    res.setTimeout(10000);
    next();
});

app.use(express.json());
const CONNECT_PORT = 7050;

app.use(bodyParser.json());

/*
 * @breif: this is the route that handles a subprocess call to the control.py function, it takes
            in a request which is a POST request from the front end, with a valid JSON that has an articles text
            which then gets processed via a model class class in the control.py subprocess, and returns 
 * 
 * @returns: extracted sentences from the text highlighting key points
 */

app.post('/process', (req, res) => {
    const text = req.body.article_text;
    if (!text || typeof text !== 'string') {
        console.error('Invalid request body:', req.body);
        return res.status(400).json({ error: 'Invalid or missing article_text in request body' });
    }
    console.log('Accepted POST request with valid JSON: Beginning extraction...');
    const process = spawn('python3', ['../control.py']);
    let output = '';
    let errorOutput = '';
    const inputData = JSON.stringify({ text });
    process.stdin.write(inputData);
    process.stdin.end();
    process.stdout.on('data', (data) => {
        output += data.toString();
    });
    process.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });
    process.on('close', (code) => {
        console.log('Finished Extraction...');
        console.log('Python process exited with code:', code);
        if (code !== 0) {
            console.error('Python error output:', errorOutput);
            return res.status(500).json({ error: 'Failed to process text', details: errorOutput });
        }
        try {
            const result = JSON.parse(output);
            console.log('Python output parsed:', result);
            res.json(result);
        } catch (e) {
            console.error('Failed to parse Python output:', output, 'Error:', e.message);
            res.status(500).json({ error: 'Invalid response from processing', details: output });
        }
    });
});

app.listen(CONNECT_PORT, () => {
    console.log(`HTTP server running at http://localhost:${CONNECT_PORT}`);
});

module.exports = app;