import { Locator } from '@playwright/test';

/**
 * Abstract class for handling table structures.
 * @template T The type of data extracted from each row.
 */
export abstract class GenericTable<T> {
    
    /**
     * @param locators Object containing locators for rows and headers.
     * @param locators.headers Locator for table headers (e.g., 'thead th').
     * @param locators.rows Locator that matches ALL rows in the table (e.g., 'tr').
     */
    constructor(protected locators: { headers?: Locator, rows?: Locator }) {}

    /**
     * Retrieves the text content of all headers.
     */
    async getHeaders(): Promise<string[]> {
        if (!this.locators.headers) {
            throw new Error('Headers locator was not provided.');
        }

        try {
            await this.locators.headers.first().waitFor({ state: 'attached', timeout: 5000 });
        } catch {
            return [];
        }
        return await this.locators.headers.allInnerTexts();
    }

    protected abstract mapRow(row: Locator): Promise<T>;

    async getRows(): Promise<T[]> {
        if (!this.locators.rows) {
            throw new Error('Rows locator was not provided.');
        }

        try {
            await this.locators.rows.first().waitFor({ state: 'attached', timeout: 5000 });
        } catch (e) {
            return [];
        }

        const rows = await this.locators.rows.all();

        return await Promise.all(rows.map(row => this.mapRow(row)));
    }
}
