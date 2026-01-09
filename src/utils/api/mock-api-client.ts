import { ApiResponse } from "./types";

/**
 * @param url - The virtual URL (for logging)
 * @param payload - The request body (will be echoed in response usually)
 * @param responseOverrides - Additional fields to merge into the response JSON
 * @param status - HTTP status code (default 201)
 */
export async function mockApiPost(url: string, payload: any, responseOverrides: any = {}, status = 201): Promise<ApiResponse> {
    console.log(`[MOCK] POST ${url} with payload:`, JSON.stringify(payload));
    
    const responseBody = {
        ...payload,
        ...responseOverrides
    };

    return {
        status,
        ok: status >= 200 && status < 300,
        json: responseBody 
    };
}
