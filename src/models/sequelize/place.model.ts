import Sequelize from "sequelize";

/**
 * Interface to manage the information of the Place
 */
export interface IPlace{
    name: string;
    latitude: number; 
    longitude: number;
}

/**
 * Model for sequelize
 */
export class PlaceModel{
    register(sequelize: any){
        const place = sequelize.define('place', {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            latitude: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            longitude: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            }
        });
        return place;
    }
}
