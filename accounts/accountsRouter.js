const express = require('express');

// db access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

// get list of accounts
router.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })
});

// get account by id
router.get('/:id', (req, res) => {

    db('accounts')
        .where({ id: req.params.id })
        .then(account => {
            if (account.id) {
                res.status(200).json(account);
            }
            else {
                res.status(404).json({ error: "Invalid account ID." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })
});

// post to create new account
router.post('/', (req, res) => {

    db('accounts').insert(req.body, 'id')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            res.status(400).json({ error: "That account could not be created." });
        })

});

// put to edit account
router.put('/:id', (req, res) => {

    const id = req.params.id;
    const changes = req.body;

    db('accounts').where({ id }).update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(400).json({ error: "The account could not be updated." });
        })
});

// delete an account
router.delete('/:id', (req, res) => {

    const id = req.params.id;

    db('accounts')
        .where({ id })
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(400).json({ error: "Account could not be deleted" });
        })
});

module.exports = router;