var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    products: [
      {name: 'Produs',
      price: '0.00'}
    ],
    buyers: [
      {
        name: 'Eu',
        products: [1],
        owner: true
      },
      {
        name: 'Tu',
        products: [1],
        owner: false
      }
    ]
  });
});

module.exports = router;
