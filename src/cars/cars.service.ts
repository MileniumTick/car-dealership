import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto/';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuidv4(),
    //   brand: 'Toyota',
    //   model: 'Corola',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car)
      throw new NotFoundException(`Not found car whit this id: '${id}'`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    this.cars.push({
      id: uuidv4(),
      ...createCarDto,
    });

    return this.cars[this.cars.length - 1];
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Car id is not valid');
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
        };

        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const carDB = this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);

    return carDB;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
