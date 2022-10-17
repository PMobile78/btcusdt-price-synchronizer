import {Field, ObjectType, Int, ID} from '@nestjs/graphql';

@ObjectType()
export class currentRateResponse {
    @Field()
    rate!: number;
}

@ObjectType()
export class btcUsdtRateHistoryResponse {
    @Field(type => [btcUsdtRateHistory])
    history: btcUsdtRateHistory[];

    @Field()
    count: number;
}

@ObjectType()
export class btcUsdtRateHistory {
    @Field(type => ID)
    id!: number;

    @Field()
    rate: number;

    @Field()
    date: string;
}

