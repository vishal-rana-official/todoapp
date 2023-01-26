const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');

// Rout 1:                       add a new note using a post request , login required

router.post('/addnote', fetchuser, async (req, res) => {
    const { title, description } = req.body;
    const note = new Note({
        title, description, user: req.id
    })
    const savednote = await note.save();
    console.log(note)
    res.json(savednote);
})

// Route 2:                     route for fetching notes of a specified user using get request, login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.id });
    res.json(notes);
})

//  Route 3:                  update a existing note using put request , login required

router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description } = req.body;
    // create a new note
    const newnote = {};
    if (title) { newnote.title = title };
    if (description) { newnote.description = description };
    let note = await Note.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
    res.json({note});


})


//  Route 4:                  delete a existing note using delete request , login required

router.delete('/delete/:id', fetchuser, async (req, res) => {
    let note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"note has been deleted"});
})


module.exports = router;