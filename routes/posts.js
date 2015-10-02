var express = require('express');
var router = express.Router();
var postsStore = require('../postsStore');

/*

REST API - CRUDS

CREATE  HTTP  POST    /
READ    HTTP  GET     /:id
UPDATE  HTTP  PUT     /:id
DELETE  HTTP  DELETE  /:id
SEARCH  HTTP  GET     /
NEXT_ID HTTP  GET     /next

*/

// Optionally validate params
// router.param('id', /^\d+$/);


// CREATE
router.post('/', function(req, res) {

  res.send('need to return JSON with an ID');

  postsStore.add(req.body);
  res.status(200).send(req.body);

});

// READ
router.get('/:id', function(req, res) {

  res.send('need to return JSON with a single post');

  res.status(200).send(postsStore.get(req.params.id));

});

// NEXT ID
router.get('/next/', function(req, res) {
  res.status(200).send(postsStore.getNextId());
});

// UPDATE
router.put('/:id', function(req, res) {

  // res.send('need to return 204 once updated');
  res.status(204).send(postsStore.update(req.params.id, req.body));

});

// DELETE
router.delete('/:id', function(req, res) {

  // res.send('need to return 204 once deleted');
  postsStore.del(req.params.id);
  res.status(204).send('Deleted');

});

// SEARCH
router.get('/', function(req, res) {

  // res.send('need to return JSON with a list of posts');
  res.status(200).send(postsStore.get());

});


module.exports = router;
