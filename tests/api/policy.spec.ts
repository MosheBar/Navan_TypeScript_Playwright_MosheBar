import { test, expect } from '@playwright/test';
import { ReqResApi } from '../../src/utils/api/reqres-api';
import { JobTitle } from '../../src/utils/api/types';

test.describe('Policy Engine API Tests', () => {

    const policyError = 'Policy Violation: Job title is either missing or unrecognized.';
    function printPolicyDecision(job: string | undefined) {
        if (job === JobTitle.Manager) {
            console.log('Policy: Business Class Allowed');
        } else if (job === JobTitle.Intern) {
            console.log('Policy: Economy Only');
        } else {
            console.log('Policy: Standard (Unknown/Missing Job Title)'); 
            throw new Error(policyError);
        }
    }

    test('Scenario A (Manager): Create user as Manager and verify policy', async ({ request }) => {
        const api = new ReqResApi(request);
        const payload = {
            name: 'Avdia',
            job: JobTitle.Manager
        };
        
        const response = await api.createUser(payload);

        expect(response.status).toBe(201);
        expect(response.json.name).toBe(payload.name);
        expect(response.json.job).toBe(payload.job);
        expect(response.json.id).toBeDefined(); 
        expect(response.json.createdAt).toBeDefined();

        printPolicyDecision(response.json.job);
    });

    test('Scenario B (Junior): Create user as Intern and verify policy', async ({ request }) => {
        const api = new ReqResApi(request);
        const payload = {
            name: 'Bob',
            job: JobTitle.Intern
        };

        const response = await api.createUser(payload);

        expect(response.status).toBe(201);
        printPolicyDecision(response.json.job);
    });

    test('Negative Test: Create user without job title', async ({ request }) => {
        const api = new ReqResApi(request);
        const payload = {
            name: 'Charlie'
        };

        const response = await api.createUser(payload);
        
        expect(response.status).toBe(201);
        
        expect(response.json.job).toBeUndefined(); 

        // printPolicyDecision(response.json.job);
        expect(() => printPolicyDecision(response.json.job)).toThrow(policyError);
    });

    test('Negative Test: Create user with new job title', async ({ request }) => {
        const api = new ReqResApi(request);
        const payload = {
            name: 'Dani',
            job: 'BlaBla'
        };

        const response = await api.createUser(payload);
        
        expect(response.status).toBe(201);

        // printPolicyDecision(response.json.job);
        expect(() => printPolicyDecision(response.json.job)).toThrow(policyError);
    });

});
