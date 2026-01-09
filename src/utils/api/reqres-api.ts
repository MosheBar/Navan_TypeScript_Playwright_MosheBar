import { APIRequestContext } from '@playwright/test';
import { mockApiPost } from './mock-api-client';
import { JobTitle, ApiResponse } from './types';

export class ReqResApi {
    
    constructor(private request: APIRequestContext) {}

    private readonly baseApiUrl = 'https://reqres.in/api';
    private readonly createUsersUrl = `${this.baseApiUrl}/users`;
    private readonly apiKey = "reqres_2eb7d0b33fd8431fae3990a6841245b3";

    /**
     * Creates a new user in the system. 
     * 
     * @param payload - Object containing the user's name and job title.
     * @param useMock - Set to `true` to attempt a mock API call. Default is `false`.
     * @returns A Promise resolving to the standardized ApiResponse.
     */
    async createUser(payload: { name: string, job?: JobTitle | string }, useMock: boolean = false): Promise<ApiResponse> {
        let response: ApiResponse;
        if (useMock) {
            response = await mockApiPost(this.createUsersUrl, payload, {
                id: '999',
                createdAt: new Date().toISOString()
            });
        }else{
            const responseApi = await this.request.post(this.createUsersUrl, {
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    "x-api-key": this.apiKey
                }
            });

            response = {
                status: responseApi.status(),
                ok: responseApi.ok(),
                json: await responseApi.json()
            };

        }
        return response;        
    }
}
