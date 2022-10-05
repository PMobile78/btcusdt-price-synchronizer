import {ArgsType, Field, Int} from '@nestjs/graphql';
import {Max, Min, MaxLength} from 'class-validator';

@ArgsType()
export class currentRateArgs {
    @Field()
    @MaxLength(10)
    symbolFirst: string

    @Field()
    @MaxLength(10)
    symbolSecond: string
}

@ArgsType()
export class btcUsdtRateHistoryArgs {
    @Field(type => Int)
    @Min(0)
    skip = 0;

    @Field(type => Int)
    @Min(1)
    @Max(50)
    take = 25;
}
