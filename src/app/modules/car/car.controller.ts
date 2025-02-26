import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';

// create car controller
const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Car created successfully.',
    data: result,
  });
});

// get all car controller
const getAllCar = catchAsync(async (req, res) => {
  const { meta, result } = await CarServices.getAllCarIntoDB(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Cars retrieved successfully.',
    data: result,
    meta,
  });
});
// get a car controller
const getACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getACarIntoDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'A Car retrieved successfully.',
    data: result,
  });
});

// update car controller
const updateCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const car = req.body;
  const result = await CarServices.updateCarIntoDB(id, car);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Car updated successfully.',
    data: result,
  });
});
// update car controller
const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarIntoDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Car Deleted successfully.',
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCar,
  getACar,
  updateCar,
  deleteCar,
};
