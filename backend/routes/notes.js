const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');


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
      console.log({ errorMessage: error.message })
   }
})


//! ROUTE-2
// Adding a new notes : POST "/api/notes/addnote". no login required
router.post('/addnote', fetchuser, [
   body('title', 'title required').isLength({ min: 3 }),
   body('description', 'minimum description length required 5 char').isLength({ min: 7 })
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
      console.log({ errorMessage: error.message })
   }

})

//! ROUTE-3
// Updating a new notes : GET "/api/notes/addnote". no login required
router.get('/api/notes/updatenote',fetchuser,(req,res)=>{
   try {
      
   } catch (error) {
      
   }
})
module.exports = router;