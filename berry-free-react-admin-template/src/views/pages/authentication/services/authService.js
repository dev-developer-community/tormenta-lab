import api from 'config/api';

export default async function authenticate(token) {
    return api.get('?id_token=', token);
}
