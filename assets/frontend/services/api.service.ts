import axios from 'axios';

export const apiURL = '/api/';

// export const apiClient = new ApolloClient({
//     uri: '/',
//     cache: new InMemoryCache()
// });

export class ApiService {
    // public static query<T>(query: string): Promise<ApolloQueryResult<T>> {
    //     return apiClient.query({
    //         query: gql`${query}`
    //     });
    // }
    public static async get<T>(url: string): Promise<T> {

        if (url.slice(0, 1) === '/') {
            url = url.slice(1);
        }

        return axios
            .get<T>(apiURL + url)
            .then(response => response.data)
            .catch(reason => {
                throw new Error('Data retrieval failed. ' + reason);
            });
    }

    public static async getResource<T>(resourceId: string): Promise<T> {
        return axios
            .get<T>(resourceId)
            .then(response => response.data)
            .catch(reason => {
                throw new Error('Data retrieval failed. ' + reason);
            });
    }
}
