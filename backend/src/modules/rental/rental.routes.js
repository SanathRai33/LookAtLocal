const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const upload = require('../../middlewares/upload.middleware')

const {
  createRentalSchema,
  updateRentalSchema,
  rentalIdSchema,
  getRentalsSchema,
} = require("./rental.validation");

const {
  createRental,
  getRentals,
  getRentalById,
  getMyRentals,
  updateRental,
  deleteRental,
} = require("./rental.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", upload.array("images", 5), validate(createRentalSchema), createRental);
router.get("/", validate(getRentalsSchema), getRentals);
router.get("/my-listings", validate(getRentalsSchema), getMyRentals);
router.get("/:rentalId", validate(rentalIdSchema), getRentalById);
router.patch("/:rentalId", upload.array("images", 5), validate(updateRentalSchema), updateRental);
router.delete("/:rentalId", validate(rentalIdSchema), deleteRental);

module.exports = router;
