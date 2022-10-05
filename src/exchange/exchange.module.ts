import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ExchangeResolver} from './exchange.resolver';
import {ExchangeService} from './exchange.service';
import {BtcUsdtHistory} from './entities/history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BtcUsdtHistory])],
    providers: [ExchangeResolver, ExchangeService],
})
export class ExchangeModule {
}
