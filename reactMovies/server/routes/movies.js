const router = require("express").Router()

const moviesModel = require("../models/movies")

// read all records

router.get(`/movies`, (req, res) =>
{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
  res.setHeader("Access-Control-Allow-Origin","*")

    moviesModel.find((error, data) =>
    {
        res.json(data)
    })
})


// Read one record
router.get(`/movies/:id`,  (req, res) =>
{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
  res.setHeader("Access-Control-Allow-Origin","*")
    moviesModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})


// Add new record
router.post(`/movies`, (req, res) =>
{

  // validate input
      const today = new Date();
      if(!/^[a-zA-Z]+$/.test(req.body.model))
      {
          res.json({errorMessage:`Title must be a string`});
      }
      else if(!/^[a-zA-Z]+$/.test(req.body.colour))
      {
          res.json({errorMessage:`Director must be a string`});
      }

      else if(req.body.year < 1990)
            {
                res.json({errorMessage:`Year must be greater than 1950`});
            }


      else // input is valid
      {
            moviesModel.create(req.body, (error, data) =>
            {
                res.json(data)
            })
      }
})


// Update one record
router.put(`/movies/:id`, (req, res) =>
{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
  res.setHeader("Access-Control-Allow-Origin","*")

    moviesModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
    {
        res.json(data)
    })
})


// Delete one record
router.delete(`/movies/:id`, (req, res) =>
{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
  res.setHeader("Access-Control-Allow-Origin","*")

    moviesModel.findByIdAndRemove(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})


router.delete(`/movies`, (req, res) =>
{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
  res.setHeader("Access-Control-Allow-Origin","*")

    moviesModel.deleteMany((error, data) =>
    {
        res.json(data)
    })
})




module.exports = router
