import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getTest(): any {
    //return this.appService.test();
    return this.appService.getLotMapCpv();
  }

  @Get('tenders')
  getTenders(): any{
    return this.appService.getAllTenders();
  }
}
