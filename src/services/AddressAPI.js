import axios from 'axios';
import static_ from './fake';
const API_KEY = "It-g1OVsZkKu4A6OJ0eANw13746"; // I know, it should be here.
const ADDRESS_URL = "https://api.getAddress.io/find/";
export default {
    getAddressesByPostalCode: postcode => {
        return new Promise((resolve, reject) => {
            //resolve(static_);return;
            axios.get(ADDRESS_URL + postcode + `?api-key=${API_KEY}`)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error.message);
                });
        });
    },
}