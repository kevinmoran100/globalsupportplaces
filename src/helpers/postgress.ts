import { Sequelize } from "sequelize/types";
import { PlaceModel } from "../models/sequelize/place.model";
import fs from "fs";

export interface SequelizeConnection {
  Place: any;
  Sequelize: any;
  sequelize: any;
}

/**
 * Manage the postgres Connection
 */
export class PostgreConnection {
  private host: string;
  private user: string;
  private password: string;
  private port: number;
  conection: any;

  constructor(host: string, user: string, password: string, port: number = 3306) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.port = port;
  }

  /**
   * Create a new conection to postgress
   */
  connect() {
    return new Promise((resolve, reject)=>{
        const Sequelize = require("sequelize");
        const sequelize = new Sequelize('places', this.user, this.password, {
            host: this.host,
            port: this.port,
            dialect: "postgres",
            operatorsAliases: false as any,
            pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
            },
            logging: false
        });
        sequelize.authenticate()
          .then(() => {
            const modelPlaces = new PlaceModel().register(sequelize);
            this.conection = {
              sequelize: sequelize,
              Place: modelPlaces,
            };
            return sequelize.sync();
          })
          .then((result) => {
            resolve(true);
            console.log(`Connected postgres`);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    })
  }
}

export default new PostgreConnection(
  process.env.POSTGRES_HOST || 'localhost',
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  parseInt(process.env.PORT) || 5432
);
