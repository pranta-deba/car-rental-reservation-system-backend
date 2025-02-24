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
  const result = await CarServices.getAllCarIntoDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Cars retrieved successfully.',
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

export const CarControllers = {
  createCar,
  getAllCar,
  updateCar,
};
