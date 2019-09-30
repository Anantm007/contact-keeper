const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async(req,res) => {
    try {
        // Search for logged in users contacts
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
});


// @route  POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [auth,
    check('name', "Name is required").not().isEmpty()

], async(req,res) => {
    // Check for erros
    const errors = validationResult(req);
    
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array() });
    }

    // Destructure the body
    const {name, email, phone, type} = req.body;

    // Create new contact
    try {
        const newContact = new Contact({
            name,
            email,
            phone, type,
            user: req.user.id
        });

        // Sace conatact to the database
        const contact = await newContact.save();
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
        
    }
});


// @route   PUT api/contacts/:id
// @desc    Edit a contact
// @access  Private
router.put('/:id', auth, async(req,res) => {
    // Destructure the contacts body
    const {name, email, phone, type} = req.body;

    // Create an object of new values
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type= type;
    
    // find the contact
    try
    {

        let contact = await Contact.findById(req.params.id)

        if(!contact)
        return res.status(404).json({msg: "Contact not found"});
    
        // Make sure user owns the contact
        if(contact.user.toString() !== req.user.id)
        return res.status(401).json({'msg': "Not Authorized"});
    
        // Update the contact
        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true});
    
        res.json(contact);
    } catch(err)
    {
        console.error(err.message);
        res.staus(500).send("Server Error");
    }
});


// @route   DELETE api/contacts
// @desc    Add new contact
// @access  Private
router.delete('/:id', auth, async(req,res) => {
    try {
     
    const contact = await Contact.findById(req.params.id)
    
    // Check if the contact exists or not
    if(!contact)
    return res.status(404).json({msg: "Contact not found"});

        // Make sure user owns the contact
        if(contact.user.toString() !== req.user.id)
        return res.status(401).json({'msg': "Not Authorized"});
    
        await Contact.findByIdAndDelete(req.params.id);

        res.json({msg: "Contact Removed"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;