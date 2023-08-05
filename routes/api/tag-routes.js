const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
// find all tags  
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(tagData)
  }
  catch (err) {
    console.log(err)
    res.status(500).json ({error: 'Server Error'})
  }
});

router.get('/:id', async (req, res) => {
// find a single tag by its `id`
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(tagsData)
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }  
});

router.post('/', async (req, res) => {
// create a new tag
  try {
    const tagsData = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(tagsData)
  }
  catch(err) {
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
// update a tag's name by its `id` value
  try {
    const tagsData = await Tag.update ({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id:req.params.id
      }
    })
    res.status(200).json("Successfully Updated")
  }
  catch (err) {
    console.log(err)
  }
});

router.delete('/:id', async (req, res) => {
// delete on tag by its `id` value
  try {
    const tagsData = await Tag.destroy ({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json("Successfully Deleted")
  }
  catch (err) {
    console.log(err)
  }
});

module.exports = router;
