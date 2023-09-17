// Here are the dependencies 
const path = require('path');
const fs = require('fs')

// This npm package allows unique ids to be created!
var uniqid = require('uniqid');

// Here is the routing
module.exports = (app) => {

  // GET /api/notes should read the db.json file, returning any saved notes in JSON.
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // POST /api/notes should make a new note to save on the request body, 
  // add it to the db.json file, then return the new note. 
  app.post('/api/notes', (req, res) => {
    let db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);
    // this is the body for the note
    let userNote = {
      title: req.body.title,
      text: req.body.text,
      // creates unique id for each and every note
      id: uniqid(),
    };
    // pushs created note to be written into db.json
    db.push(userNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });


  // DELETE- /api/notes/:id receives a query parameter that contains the id of a note.
  app.delete('/api/notes/:id', (req, res) => {
    // reading notes form db.json
    let db = JSON.parse(fs.readFileSync('db/db.json'))
    // removing note with id
    let deleteNotes = db.filter(item => item.id !== req.params.id);
    // Rewriting note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
    
  })
};