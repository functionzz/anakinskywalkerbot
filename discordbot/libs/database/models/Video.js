import db from "../index.js";
import {Model, DataTypes, Sequelize} from "sequelize";

class Video extends Model {
    static associate() {

    }
}

Video.init(
    {
        videoLink: {
            type: DataTypes.STRING,
            unique: true,
        }
    },
    {
        paranoid: true,
        sequelize: db,
        modelName: "Video",
    }

)

export default Video;