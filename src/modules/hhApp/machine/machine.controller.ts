import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { MachineService } from './machine.service';

@Controller('machine')
export class MachineController {
  constructor(private machineService: MachineService) {}

  @Get('get_permission')
  async checkMachine(@Query('mac_id') mac_id: string) {
    if (!mac_id) {
      return { result: 'fail' };
    }

    const registered = await this.machineService.checkMachine(mac_id);
    return { result: registered ? 'success' : 'fail' };
  }
  @Post('set_permission')
  requestMachine(@Body('mac_id') mac_id: string) {
    return this.machineService.requestMachine(mac_id);
  }

  @Get('apply_machine')
  applyMachine(@Body('mac_id') mac_id: string) {
    return this.machineService.applyMachine(mac_id);
  }
  @Post('apply_machine')
  updateMachine(@Body('mac_id') mac_id: string, @Body('apply_reason') apply_reason: any) {
    return this.machineService.updateMachine(mac_id, apply_reason);
  }

  @Get('get_machine_list')
  async getMachineList() {
    return this.machineService.getMachineList();
  }

  @Post('update_machine_status')
  async updateMachineState(@Body('mac_id') mac_id: string, @Body('enable') enable: boolean) {
    return this.machineService.updateMachineState(mac_id, enable);
  }
  @Post('remove_machine')
  async removeMachine(@Body('mac_id') mac_id: string) {
    return this.machineService.removeMachine(mac_id);
  }
}
