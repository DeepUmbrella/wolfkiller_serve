import { Controller, Get, Session, Header, Post, Body } from '@nestjs/common';
import { MachineService } from './machine.service';

@Controller('machine')
export class MachineController {
  constructor(private machineService: MachineService) {}

  @Get('get_permission')
  @Header('Content-Type', 'image/svg+xml')
  @Header('Cache-Control', 'none')
  checkMachine(@Session() session: any) {
    return this.machineService.checkMachine(session.machineId);
  }
  @Post('set_permission')
  requestMachine(@Body() body: any, @Session() session: any) {
    return this.machineService.requestMachine(body.machineId);
  }
}
