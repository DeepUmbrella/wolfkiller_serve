import { Injectable } from '@nestjs/common';

@Injectable()
export class MachineService {
  constructor() {}

  checkMachine(machineId: string): boolean {
    return true; // Replace with your machine checking logic
  }

  requestMachine(machineId: string): void {}
}
