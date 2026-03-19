const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    const result = await mongodb.getDatabase().collection('Contacts').find();
    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
};

const getSingleContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
        .getDatabase()
        .collection('Contacts')
        .find({ _id: contactId });

    const contacts = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
};



const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  // validação simples
  if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const response = await mongodb.getDatabase().collection('Contacts').insertOne(contact);
  console.log(req.body);
  if (response.acknowledged) {
    res.status(201).json({ id: response.insertedId });
  } else {
    res.status(500).json(response.error || 'Error creating contact');
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb.getDatabase().collection('Contacts').replaceOne(
    { _id: contactId },
    contact
  );

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: "Error updating contact" });
  }
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().collection('Contacts').deleteOne({
    _id: contactId
  });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json({ message: "Error deleting contact" });
  }
};


module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};
