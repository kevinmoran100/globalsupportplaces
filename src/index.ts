#!/usr/bin/env node

/**
 * Module dependencies.
 */
require("dotenv").config();
import http from "http";
import createError from "http-errors";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import globalPostgreConnection from "./helpers/postgress";
import globalRedisConnection from "./helpers/redis";
import { IndexRouter } from "./routes";
import { PlacesRouter } from "./routes/api/places.router";

const app = express();

app.use(express.json({verify:(req: any,res,buf)=>{req.rawBody=buf}}));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.NODE_PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Conectar a la base de datos e iniciar
 */
globalPostgreConnection.connect().then(() => {
  server.listen(port, () => {
    console.log(`App listening in port: ${port}`);
  });
});

globalRedisConnection.connect().then(()=>{
  console.log('Redis connected');
})

server.on("error", onError);
server.on("listening", onListening);

// Rutas
const indexRouter = new IndexRouter();
const placesRouter = new PlacesRouter();
app.use("/", indexRouter.router);
app.use("/api/places", placesRouter.router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler api
app.use("/api", (err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // Logging.error(err);
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send({ message: err.message || "Algo salío mal" });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  const lport = parseInt(val, 10);

  if (isNaN(lport)) {
    // named pipe
    return val;
  }

  if (lport >= 0) {
    // lport number
    return lport;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      // console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case "EADDRINUSE":
      // console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
  // debug('Listening on ' + bind);
}
