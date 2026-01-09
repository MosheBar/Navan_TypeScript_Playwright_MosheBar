export enum JobTitle {
    Manager = 'Manager',
    Intern = 'Intern',
    CTO = 'CTO'
}

export interface ApiResponse {
    status: number;
    ok: boolean;
    json: any;
}
