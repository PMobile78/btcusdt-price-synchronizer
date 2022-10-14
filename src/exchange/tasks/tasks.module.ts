import {Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {ExchangeService} from '../exchange.service'
import {TypeOrmModule} from '@nestjs/typeorm';
import {BtcUsdtHistory} from '../entities/history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BtcUsdtHistory])],
    providers: [TasksService, ExchangeService],
})
export class TasksModule {
}
