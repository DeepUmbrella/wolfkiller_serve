import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';

@Module({
  imports: [],
  providers: [MachineService],
  exports: [],
})
export class MachineModule {}
