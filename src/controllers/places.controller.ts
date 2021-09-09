import globalPostgreConnection from "../helpers/postgress";
import globalRedisConnection from "../helpers/redis";
import { IPlace } from '../models/sequelize/place.model';

/**
 * Controller For Placer
*/
export class PlacesController {
    /**
     * Route for create a place
     * @param req 
     * @param res 
     * @param next 
     */
    create = (req, res, next) => {
        const model = globalPostgreConnection.conection.Place;
        model
          .create(req.body)
          .then((place: IPlace) => {
            globalRedisConnection.geo.addLocation(place.name, {latitude: place.latitude, longitude: place.longitude}, function(err, reply){
              console.log('added Location',reply);
              if(!err){
                res.status(200).send(place);
              }
              else{
                console.log(err);
              }
            });
          })
          .catch((err: any) => {
            console.log(err);
          });
    };

    /**
     * Route for get all places
     * @param req 
     * @param res 
     * @param next 
     */
    getAll = (req, res, next) => {
        const model = globalPostgreConnection.conection.Place;
        model
          .findAll({})
          .then((elements) => {
            res.status(200).send(elements);
          })
          .catch((err: any) => {
            console.log(err);
          });
    };

    /**
     * Route for delete a place
     * @param req 
     * @param res 
     * @param next 
     */
    delete = (req, res, next) => {
      const model = globalPostgreConnection.conection.Place;
      const id = req.params.id;
      model
        .destroy({
          where: { id },
        })
        .then((num) => {
          if (num !== 1) console.log(`Cannot delete Place with id=${id}. Maybe Place was not found or req.body is empty!`);
          else res.status(200).send({
            message: "Place deleted.",
          });
        })
        .catch((err: any) => {
          console.log(err);
        });
    };

    /**
     * Route for get the distance between two places
     * @param req 
     * @param res 
     * @param next 
     */
    distance = (req, res, next) => {
      const placeOne = req.query.placeOne;
      const placeTwo = req.query.placeTwo;
      const unit = req.query.unit;
      globalRedisConnection.geo.distance(placeOne, placeTwo,{units: unit}, function(err, reply){
        if(!err){
          res.status(200).send({
            distance: reply,
            unit: unit
          });
        }
        else{
          console.log(err);
        }
      });
    }
}

export default new PlacesController();
