import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AdminResolver } from './modules/admin/admin.resolver';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { UserResolver } from './modules/user/user.resolver';
import { CardModule } from './modules/card/card.module';
import { PerkModule } from './modules/perk/perk.module';
import { PlayerModule } from './modules/player/player.module';
import { CardResolver } from './modules/card/card.resolver';
import { PlayerResolver } from './modules/player/player.resolver';
import { PerkResolver } from './modules/perk/perk.resolver';
import { ProjectModule } from './modules/project/project.module';
import { TagModule } from './modules/tag/tag.module';
import { ProjectResolver } from './modules/project/project.resolver';
import { TagResolver } from './modules/tag/tag.resolver';
import { ConfigModule } from '@nestjs/config';
import configs from './config/index';

const mongoHost = process.env.USING_DOCKER == 'true' ? 'mongo' : 'localhost';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://${process.env.MG_USER}:${process.env.MG_PASS}@${mongoHost}:27017`, //For Docker use container name
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: false,
      logging: false,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations_typeorm',
      cli: {
        migrationsDir: 'src/migration',
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configs],
    }),
    AdminModule,
    AuthModule,
    UserModule,
    CardModule,
    PerkModule,
    PlayerModule,
    ProjectModule,
    TagModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cors: {
        origin: '*',
        credentials: true,
      },
      include: [AppModule],
      autoSchemaFile: 'src/schema/schema.graphql',
      debug: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  providers: [
    AdminResolver,
    CardResolver,
    PlayerResolver,
    PerkResolver,
    UserResolver,
    ProjectResolver,
    TagResolver,
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule {}
