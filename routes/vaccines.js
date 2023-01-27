const express = require('express')
const multer = require('multer');

const router = express.Router()
const Vaccine = require('../models/vaccines')
const auth = require("../middleware/auth");



//Getting all vaccines
router.get('/', async (req, res) => {
  try {
    const vaccines = await Vaccine.find()
    res.status(200).json(vaccines)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



//Adding a vaccine
router.post('/', auth, async (req, res) => {
  console.log(req.body)
    const vaccine = new Vaccine({
      name: req.body.name,
      company_email: req.body.company_email,
      company_contact: req.body.company_contact,
      number_of_dose: req.body.number_of_dose,
    })
    try {
      const newVaccine = await vaccine.save()
      res.status(201).json(newVaccine)
    } catch (err) {
      console.error(err)
      res.status(400).json(err.message)
    }
  
  })

//Updating a vaccine

router.patch('/:id', getVaccine, async (req, res) => {

  if(req.body.name !== null){
    res.vaccine.name = req.body.name
  }

  if(req.body.company_email !== null){
    res.vaccine.company_email = req.body.company_email
  }

  if(req.body.company_contact !== null){
    res.vaccine.company_contact = req.body.company_contact
  }

  if(req.body.number_of_dose !== null){
    res.vaccine.number_of_dose = req.body.number_of_dose
  }

  try {
    const updatedVaccine = await res.vaccine.save()
    res.status(201).json(updatedVaccine)
  } catch (err) {
    res.status(400).json(err.message)
  }
})

//Deleting a vaccine
router.delete('/:id', getVaccine, async (req, res) => {
  try {
    await res.vaccine.remove()
    await res.json({ message: 'Deleted successfully.' })
  } catch (err) {
    res.status(500).json({ message: 'failed to delete contact' })
  }
})


async function getVaccine(req, res, next) {
  let vaccine
  try {
    vaccine = await Vaccine.findById(req.params.id)
    if (vaccine === null) {
      return res.status(400).json({ message: 'Cannot find vaccine' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.vaccine = vaccine
  next()
}


  module.exports = router