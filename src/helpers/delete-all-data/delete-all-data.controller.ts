import {Controller, Delete, HttpCode} from '@nestjs/common';
import {AllDataService} from "./delete-all-data.service";

@Controller('testing')
export class AllDataController {

    constructor(private allDataService: AllDataService) {}

    @Delete('all-data')
    @HttpCode(204)
    async delete(){
       await this.allDataService.deleteAllData()
    }

}