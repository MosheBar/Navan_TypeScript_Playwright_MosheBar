import { APIRequestContext } from '@playwright/test';
import { mockApiPost } from './mock-api-client';
import { JobTitle, ApiResponse } from './types';

export class ReqResApi {
    
    constructor(private request: APIRequestContext) {}

    private readonly baseApiUrl = 'https://reqres.in/api';
    private readonly createUsersUrl = `${this.baseApiUrl}/users`;

    /**
     * Creates a new user in the system. 
     * Defaults to a mock implementation to bypass external API 403 restrictions.
     * 
     * @param payload - Object containing the user's name and job title.
     * @param useMock - Set to `false` to attempt a real API call. Default is `true`.
     * @returns A Promise resolving to the standardized ApiResponse.
     */
    async createUser(payload: { name: string, job?: JobTitle | string }, useMock: boolean = true): Promise<ApiResponse> {
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
                    'Content-Type': 'application/json'
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
