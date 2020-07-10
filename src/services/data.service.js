import axios from "axios";
import { constants } from "../constants/constants";

function getUsers(signal) {
    return axios.get(`${ constants.API }/users`, signal)
}

function getSingleUser(userId, signal) {
    return axios.get(`${ constants.API }/albums?userId=${userId}`, signal)
}

function getAlbum(albumId, signal) {
    return axios.get(`${ constants.API }/photos?albumId=${albumId}`, signal)
}

export const dataServices = {
    getUsers,
    getSingleUser,
    getAlbum
}
