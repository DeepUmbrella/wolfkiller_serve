import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, baseUrl, originalUrl } = req;
    const requestIp = req.header('x-forwarded-for') || req.socket.remoteAddress;
    const requestDate = new Date();
    //日期
    const DD = String(requestDate.getDate()).padStart(2, '0'); // 获取日
    const MM = String(requestDate.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
    const yyyy = requestDate.getFullYear(); // 获取年

    // 时间
    const hh = String(requestDate.getHours()).padStart(2, '0'); //获取当前小时数(0-23)
    const mm = String(requestDate.getMinutes()).padStart(2, '0'); //获取当前分钟数(0-59)
    const ss = String(requestDate.getSeconds()).padStart(2, '0'); //获取当前秒数(0-59)
    const today = yyyy + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
    console.log({ method, originalUrl, requestDate: today, requestIp });
    next();
  }
}
