const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include:[{
      model: Product, 
      attributes: ['id', 'product_name' ]
    }]
  })
  .then(Tagsdata => res.json(Tagsdata))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where:{
      id: req.params.id
    }, 
    include: [
      {
        model: Product, 
        attributes: ['product_name', 'price', 'stock']
      }]
  })
  .then(Tagsdata => {
    if (!Tagsdata) {
      res.status(404).json({message: 'Tag does not exist'});
      return;
    }
    res.json(Tagsdata);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name})
  .then(Tagsdata => res.json(Tagsdata))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {tag_name: req.body.tag_name},
    {
      where: {
      id: req.params.id
    }
    })
    .then(Tagsdata => {
      if (!Tagsdata) {
        res.status(404).json({ message: 'Tag does not exist' });
        return;
      }
      res.json(Tagsdata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(Tagsdata => {
    if (!Tagsdata) {
      res.status(404).json({ message: 'Tag does not exist' });
      return;
    }
    res.json(Tagsdata);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
