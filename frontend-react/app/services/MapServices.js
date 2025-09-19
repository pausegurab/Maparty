import api from '../api.js'

class MapService {

    getLocations(){
        return api.get('/map/ubicacions')
        .then((res) => {
            const coordinates = res.data.ubicacions.map((ubicacion) => ubicacion.location.coordinates);
            return coordinates;
        })
    }
}

export default new MapService()