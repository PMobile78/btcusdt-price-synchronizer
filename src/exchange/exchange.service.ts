import {Injectable, Logger} from '@nestjs/common';
import {currentRateArgs, btcUsdtRateHistoryArgs} from './dto/exchange.args';
import {btcUsdtRateHistoryResponse, currentRateResponse, btcUsdtRateHistory} from "./models/exchange.model";
import {BtcUsdtHistory} from "./entities/history.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

const https = require('https');

@Injectable()
export class ExchangeService {
    constructor(
        @InjectRepository(BtcUsdtHistory)
        private readonly btcUsdtHistoryRepository: Repository<BtcUsdtHistory>,
    ) {
    }

    private readonly logger = new Logger(ExchangeService.name);

    async currentRate(data: currentRateArgs): Promise<currentRateResponse> {
        let options = {
            "method": "GET",
            "hostname": "rest.coinapi.io",
            "path": `/v1/exchangerate/${data.symbolFirst}/${data.symbolSecond}`,
            "headers": {'X-CoinAPI-Key': process.env.API_KEY}
        };
        try {
            let rate: string | undefined = await new Promise((resolve, reject) => {
                let request = https.request(options, function (response) {
                    let chunks = [];
                    response.on('data', function (chunk) {
                        chunks.push(chunk);
                    });
                    response.on('end', () => {
                        resolve(JSON.parse(chunks.toString()).rate);
                    });
                });
                request.on('error', (err) => {
                    reject(err);
                });
                request.end();
            });
            let result = rate ? rate : '';
            return {
                rate: result
            };
        } catch (error) {
            this.logger.error(error);
            throw Error(error);
        }
    }

    async btcUsdtRateHistory(data: btcUsdtRateHistoryArgs): Promise<btcUsdtRateHistoryResponse> {
        let [result, total] = await this.btcUsdtHistoryRepository.findAndCount({
            take: data.take,
            skip: data.skip,
        });
        return {
            history: result,
            count: total
        }
    }

    async btcUsdtRateStore(): Promise<btcUsdtRateHistory> {
        let result = await this.currentRate({symbolFirst: "BTC", symbolSecond: "USDT"});
        if (!result.rate) {
            throw Error('Something wrong during getting a rate.')
        }
        const btcUsdt = new BtcUsdtHistory();
        btcUsdt.rate = result.rate;
        btcUsdt.date = Math.floor(Date.now() / 1000);
        return await this.btcUsdtHistoryRepository.save(btcUsdt);
    }
}
