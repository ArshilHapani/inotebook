const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { request } = require('express');


//! ROUTE-1
// Fetching all notes : GET "/api/notes/fetchallnotes". no login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user.id })
      res.send(notes);
   } catch (error) {
      res.status(500).send({
         message: "internal server error",
      })
      console.log({ errorMessage: error.message });
   }
})


//! ROUTE-2
// Adding a new notes : POST "/api/notes/addnote". no login required
router.post('/addnote', fetchuser, [
   body('title', 'title required').isLength({ min: 3 }),
   body('description', 'minimum description length required 5 char').isLength({ min: 5 })
], async (req, res) => {
   try {
      const { title, description, tag } = req.body;

      //If there are errors in validation controls then return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
         title,
         description,
         tag,
         user: req.user.id
      })
      await note.save();
      const notes = await Note.find({ user: req.user.id })
      res.send(notes);
   } catch (error) {
      res.status(500).send({
         message: "internal server error",
      })
      console.log({ errorMessage: error.message },error);
   }

})

//! ROUTE-3
// Updating a new notes : PUT "/api/notes/addnote".  login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
   try {
      const { title, description, tag } = req.body;
      //Create a new note object
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      //Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
         return request.status(404).send("NotFound");
      }
      //Allow updation to the valid user
      if (note.user.toString() !== req.user.id) {
         return request.status(401).send("InvalidUser");
      }
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json(note);
   } catch (error) {
      res.status(500).send({
         message: "internal server error",
      })
      console.log({ errorMessage: error.message });
   }
})

//! ROUTE-4
// Deleting a existing notes : DELETE "/api/notes/deletenote".  login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   try {
      //Finding the user and verifying them
      //Find the note to be delete and delete it 
      let note = await Note.findById(req.params.id);
      if (!note) {
         return request.status(404).send("NotFound");
      }
      //Allow deletion to the valid user
      if (note.user.toString() !== req.user.id) {
         return request.status(401).send("InvalidUser");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({"Note" :"deleted","note":note});
   } catch (error) {
      res.status(500).send({
         message: "internal server error",
      })
      console.log({ errorMessage: error.message });
   }
})


module.exports = router;