const express = require('express');
const router = express.Router();


// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', async(req,res) => {
    res.send('Get all contacts');
});


// @route  POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', async(req,res) => {
    res.send('Add new contact');
});


// @route   PUT api/contacts/:id
// @desc    Edit a contact
// @access  Private
router.put('/:id', async(req,res) => {
    res.send('Update a contact');
});


// @route   DELETE api/contacts
// @desc    Add new contact
// @access  Private
router.delete('/:id', async(req,res) => {
    res.send('Delete a contact');
});


module.exports = router;