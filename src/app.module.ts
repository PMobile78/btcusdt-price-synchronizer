import {Module} from '@nestjs/common';
import {join} from "path";
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ExchangeModule} from './exchange/exchange.module';
import {ScheduleModule} from '@nestjs/schedule';
import {TasksModule} from './exchange/tasks/tasks.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT) || 5432,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: false
            })
        }),
        ScheduleModule.forRoot(),
        ConfigModule.forRoot(),
        ExchangeModule,
        TasksModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        }),],
})
export class AppModule {
}
