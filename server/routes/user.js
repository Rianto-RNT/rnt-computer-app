const express = require('express')

const router = express.Router()

router.get('/user', (req, res) => {
    res.json({
      success: true,
      data: 'Hit it!!! user API endpoint',
    });
  });

  module.exports = router;