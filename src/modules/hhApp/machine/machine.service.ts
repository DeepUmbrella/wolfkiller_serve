import { Injectable } from '@nestjs/common';
import { Machine } from '@entities/machine.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MachineService {
  private tempLock = false;

  private tempApplyList: { mac_id: string; createDate: string }[] = [];

  constructor(
    @InjectRepository(Machine)
    private machineRepository: Repository<Machine>,
  ) {}

  async checkMachine(mac_id: string) {
    return await this.machineRepository.findOne({ where: { mac_id, enable: true } });
  }

  async updateMachineState(mac_id: string, enable: boolean) {
    return await this.machineRepository.update({ mac_id }, { enable });
  }

  async removeMachine(mac_id: string) {
    return await this.machineRepository.delete({ mac_id });
  }

  async getMachineList(page: number = 1, pageSize: number = 20) {
    const res = {
      page: page,
      result: [],
      total: 0,
    };

    if (page < 1) {
      page = 1;
    }
    const total = await this.machineRepository.count();
    const skip = (page - 1) * pageSize;

    if (skip >= total) {
      return res;
    }
    res.total = total;
    res.result = await this.machineRepository.find({ skip: skip, take: pageSize });
    return res;
  }

  requestMachine(mac_id: string) {
    if (this.tempLock) {
      return { result: 'fail', message: 'tempLock' };
    }

    this.tempLock = true;
    if (!(this.tempApplyList.length < 10)) {
      this.tempApplyList.pop();
    }
    this.tempApplyList.unshift({ mac_id, createDate: new Date().toUTCString() });

    this.tempLock = false;
    return { result: 'success' };
  }

  async updateMachine(mac_id: string, apply_reason: 'apply' | 'reject') {
    if (apply_reason === 'apply') {
      if (await this.machineRepository.findOne({ where: { mac_id } })) {
        this.machineRepository.update({ mac_id }, { enable: true });
      } else {
        try {
          const machine = new Machine();
          machine.mac_id = mac_id;
          machine.enable = true;
          await this.machineRepository.insert(machine);
        } catch (error) {}
      }
    }
    return this.applyMachine(mac_id);
  }

  applyMachine(mac_id?: string) {
    if (!mac_id) {
      return {
        result: this.tempApplyList.map((item, index) => ({ ...item, id: index })),
        message: 'success',
        total: this.tempApplyList.length,
      };
    }
    if (this.tempLock) {
      return { result: [], message: 'tempLock', total: 0 };
    }
    this.tempLock = true;
    this.tempApplyList = this.tempApplyList.filter((item) => item.mac_id !== mac_id);

    this.tempLock = false;
    return {
      result: this.tempApplyList.map((item, index) => ({ ...item, id: index })),
      message: 'success',
      total: this.tempApplyList.length,
    };
  }
}
