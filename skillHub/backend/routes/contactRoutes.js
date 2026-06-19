const express =
require("express");

const router =
express.Router();

const {
  saveMessage
}
=
require(
  "../controllers/contactController"
);

router.post(
  "/",
  saveMessage
);

module.exports = router;
