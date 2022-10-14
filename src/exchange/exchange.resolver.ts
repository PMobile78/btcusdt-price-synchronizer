import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {currentRateArgs, btcUsdtRateHistoryArgs} from './dto/exchange.args';
import {currentRateResponse, btcUsdtRateHistoryResponse, btcUsdtRateHistory} from './models/exchange.model';
import {ExchangeService} from './exchange.service';

@Resolver()
export class ExchangeResolver {
    constructor(private readonly exchangeService: ExchangeService) {
    }

    @Query(() => currentRateResponse)
    async currentRate(
        @Args() data: currentRateArgs,
    ): Promise<currentRateResponse | Error> {
        return await this.exchangeService.currentRate(data);
    }

    @Query(() => btcUsdtRateHistoryResponse)
    async btcUsdtRateHistory(
        @Args() data: btcUsdtRateHistoryArgs,
    ): Promise<btcUsdtRateHistoryResponse | Error> {
        return await this.exchangeService.btcUsdtRateHistory(data);
    }

    @Mutation(() => btcUsdtRateHistory)
    async btcUsdtRateStore(): Promise<btcUsdtRateHistory> {
        return await this.exchangeService.btcUsdtRateStore();
    }
}
