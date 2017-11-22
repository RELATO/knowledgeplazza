import app from './app';
import express = require('express');
import path = require('path');

const port = process.env.PORT || 8080;
const host = process.env.IP || 'localhost';

// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.normalize(__dirname + "/../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.normalize(__dirname + "/../dist/index.html"));
});

const server = app.listen(port, host);

server.on('listening', () => {
  console.log(`Feathers application started on ${host}:${port}`);
});

// log errors
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

process.on('uncaughtException', err => {
  console.error(err);
});

this.app = app;
