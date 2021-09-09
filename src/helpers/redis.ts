/**
 * Manage the connection to redis
 */
export class RedisConnection {
  private host: string;
  private password: string;
  private port: number;
  conection: any;
  geo: any;

  constructor(host: string, password: string, port: number = 6379) {
    this.host = host;
    this.password = password;
    this.port = port;
  }

  /**
   * Create a connection to Redis
   */
  connect() {
    return new Promise((resolve, reject)=>{
      const redis = require('redis');
      this.conection = redis.createClient({
          host: this.host,
          port: this.port,
      });
      // Create the geo package reference
      this.geo = require('georedis').initialize(this.conection);
      this.conection.on('error', err => {
          console.log('Error ' + err);
      });
      this.conection.on('connect', function() {
        console.log('Connected!');
      });
      resolve(true);
    })
  }
}

export default new RedisConnection(
  process.env.REDISHOST || 'localhost',
  '',
  parseInt(process.env.PORT) || 6379
);
