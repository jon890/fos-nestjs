import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2';
import mysql, { Pool } from 'mysql2/promise';
import databaseConfig from 'src/config/database.config';

@Injectable()
export class DrizzleService implements OnModuleInit {
  private pool: Pool;
  public db: MySql2Database;
  private logger = new Logger(DrizzleService.name);

  constructor(
    @Inject(databaseConfig.KEY)
    private readonly dbConfig: ReturnType<typeof databaseConfig>,
  ) {}

  onModuleInit() {
    this.pool = mysql.createPool({
      host: this.dbConfig.url,
      port: this.dbConfig.port,
      user: this.dbConfig.user,
      password: this.dbConfig.password,
      database: this.dbConfig.database,
      connectionLimit: this.dbConfig.connectionLimit,
    });

    this.db = drizzle(this.pool, {
      mode: 'default',
    });

    this.logger.log('Drizzle service initialized');
  }
}
