const path = require('path')
const fs = require('fs')

var uniqid = require('uniqid');
// Heres the routings 
module.exports = (app) => {

    // get - /api/notes reads db.json and returns all saved notes in JSON.
    app.get('/api/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../db/db.json'));
    });
  
    // post - /api/notes receives a new note and saves it on the body, 
    // adds it to file - db.json- returns the new note! 
    app.post('/api/notes', (req, res) => {
      let db = fs.readFileSync('db/db.json');
      db = JSON.parse(db);
      res.json(db);
      // creates body for the note
      let userNote = {
        title: req.body.title,
        text: req.body.text,
        // creates a unique id per each note
        id: uniqid(),
      };
      // pushs the note to the db.json file
      db.push(userNote);
      fs.writeFileSync('db/db.json', JSON.stringify(db));
      res.json(db);
  
    });
  
  
    // DELETE - /api/notes/:id receives a query parameter that contains the id of the note for deletion
    app.delete('/api/notes/:id', (req, res) => {
      // reads notes from the db.json file
      let db = JSON.parse(fs.readFileSync('db/db.json'))
      // removes notes with the id
      let deleteNotes = db.filter(item => item.id !== req.params.id);
      // Rewrites the note to db.json file
      fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
      res.json(deleteNotes);
      
    })
  };