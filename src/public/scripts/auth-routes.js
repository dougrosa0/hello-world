const express = require('express');
const router = express.Router();

router.get('/auth-status', (req, res) => {
  res.json({
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    userId: req.oidc.user?.sub
  });
});

module.exports = router; 