import {Injectable, Logger} from '@nestjs/common';
import {Interval} from '@nestjs/schedule';
import {ExchangeService} from '../exchange.service'

@Injectable()
export class TasksService {
    constructor(private readonly exchangeService: ExchangeService) {
    }

    private readonly logger = new Logger(TasksService.name);

    @Interval(3600000)
    async handleInterval() {
        this.logger.debug('Called every 1 hour');
        await this.exchangeService.btcUsdtRateStore()
    }
}
