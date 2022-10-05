import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {BtcUsdtHistory} from './entities/history.entity';
import {ExchangeService} from './exchange.service';
import {Repository} from 'typeorm';

const historyArray = [
        {
            count: 2,
            history: [
                {
                    id: 1,
                    rate: 19581.80795865621,
                    date: 1664820384,
                },
                {
                    id: 2,
                    rate: 19590.399500608128,
                    date: 1664820690,
                }
            ]
        }
    ]
;
const currentRate = {
    rate: 19581.80795865621
}

describe('UserService', () => {
    let service: ExchangeService;
    let repository: Repository<BtcUsdtHistory>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExchangeService,
                {
                    provide: getRepositoryToken(BtcUsdtHistory),
                    useValue: {
                        findAndCount: jest.fn().mockResolvedValue(historyArray),
                        save: jest.fn().mockResolvedValue(currentRate),
                    },
                },
            ],
        }).compile();

        service = module.get<ExchangeService>(ExchangeService);
        repository = module.get<Repository<BtcUsdtHistory>>(getRepositoryToken(BtcUsdtHistory));
    });

    describe('btcUsdtRateHistory()', () => {
        it('should return an array of rates', async () => {
            const history = await service.btcUsdtRateHistory({take: 2, skip: 0});
            expect([history.history]).toEqual(historyArray);
        });
    });

    describe('btcUsdtRateStore()', () => {
        it('should successfully insert one rate', () => {
            service.currentRate = jest.fn().mockReturnValue(currentRate)
            expect(
                service.btcUsdtRateStore(),
            ).resolves.toEqual(currentRate);
        });
    });

    describe('btcUsdtRateStore()', () => {
        it('should return an error', () => {
            service.currentRate = jest.fn().mockReturnValue({
                rate: ''
            })
            expect(
                service.btcUsdtRateStore(),
            ).rejects.toThrow('Something wrong during getting a rate.');
        });
    });

    describe('currentRate()', () => {
        it('should return an empty rate because of wrong API_KEY', () => {
            process.env.API_KEY = '123';
            expect(
                service.currentRate({symbolFirst: "BTC", symbolSecond: "USDT"}),
            ).resolves.toEqual({
                rate: ''
            });
        });
    });

});
