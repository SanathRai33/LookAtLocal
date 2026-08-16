const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const rentalService = require("./rental.service");

const createRental = asyncHandler(async (req, res) => {
  const rental = await rentalService.createRental({
    userId: req.user.id,
    data: req.body,
    files: req.files || [],
  });

  return ApiResponse.success(
    res,
    201,
    "Rental listing created successfully",
    rental,
  );
});

const getRentals = asyncHandler(async (req, res) => {
  const result = await rentalService.getRentals(req.user?.id, req.query);

  return ApiResponse.success(res, 200, "Rentals fetched successfully", result);
});

const getRentalById = asyncHandler(async (req, res) => {
  const rental = await rentalService.getRentalById(
    req.params.rentalId,
    req.user?.id,
  );

  return ApiResponse.success(res, 200, "Rental fetched successfully", rental);
});

const getMyRentals = asyncHandler(async (req, res) => {
  const rentals = await rentalService.getMyRentals(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "My rentals fetched successfully",
    rentals,
  );
});

const updateRental = asyncHandler(async (req, res) => {
  const rental = await rentalService.updateRental({
    rentalId: req.params.rentalId,
    userId: req.user.id,
    data: req.body,
    files: req.files || [],
  });

  return ApiResponse.success(
    res,
    200,
    "Rental listing updated successfully",
    rental,
  );
});

const deleteRental = asyncHandler(async (req, res) => {
  await rentalService.deleteRental(req.params.rentalId, req.user.id);

  return ApiResponse.success(res, 200, "Rental listing deleted successfully");
});

module.exports = {
  createRental,
  getRentals,
  getRentalById,
  getMyRentals,
  updateRental,
  deleteRental,
};