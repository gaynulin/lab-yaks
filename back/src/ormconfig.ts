import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "123456",
    database: "yaks",
    port: 2345,
    // host: "db",
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,

    synchronize: false,

    migrationsRun: false,
    logging: true,
    logger: 'file',

    entities: [
        __dirname + "/entity/**/*entity{.ts,.js}",
    ],
    migrations: [
        __dirname + "/migration/**/*{.ts,.js}",
    ],
    subscribers: [
        __dirname + "/subscriber/**/*{.ts,.js}"
    ],
}

export default config;
