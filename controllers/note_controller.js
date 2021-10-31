const mongoose = require("mongoose");
const Note = require('../model/notes_model');


exports.note_create = (req, res, next) => {

  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  });
  note.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created note successfully",
        data: result
      });
    })
}

exports.note_update = (req, res, next) => {
  const id = req.params.id;
  Note.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: "updated successfully",
        data: {
          id: result.id,
          title: result.title,
          description: result.description,
          visibility: result.visibility,
          date: result.date,
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}


exports.note_delete = (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  Note.find({
      _id: id,
    })
    .exec()
    .then(doc => {
      if (doc[0]) {
        console.log(doc)
        Note.findByIdAndRemove({
            _id: doc[0]._id
          })
          .exec()
          .then(result => {
            res.status(202).json({
              message: "Deleted note successfully",
              data: result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });

      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

}