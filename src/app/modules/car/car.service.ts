import status from 'http-status';
import AppError from '../../errors/AppError';
import { TCar } from './car.interface';
import { Car } from './car.model';

// create car service
const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
// get all car service
const getAllCarIntoDB = async () => {
  const result = await Car.find();
  return result;
};

// get a car service
const getACarIntoDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};
// update car service
const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const updatedCar = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedCar) {
    throw new AppError(status.NOT_FOUND, 'Car not found');
  }

  return updatedCar;
};
// delete car service
const deleteCarIntoDB = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarIntoDB,
  updateCarIntoDB,
  deleteCarIntoDB,
  getACarIntoDB,
};
