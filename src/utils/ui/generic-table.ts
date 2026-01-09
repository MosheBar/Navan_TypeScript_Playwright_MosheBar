import { Locator } from '@playwright/test';

/**
 * Abstract class for handling table structures.
 * @template T The type of data extracted from each row.
 */
export abstract class GenericTable<T> {
    
    /**
     * @param rowsLocator The locator that matches ALL rows in the table (e.g., 'tr').
     */
    constructor(protected rowsLocator: Locator) {}

    protected abstract mapRow(row: Locator): Promise<T>;

    async getAllRows(): Promise<T[]> {
        try {
            await this.rowsLocator.first().waitFor({ state: 'attached', timeout: 5000 });
        } catch (e) {
            return [];
        }

        const rows = await this.rowsLocator.all();

        return await Promise.all(rows.map(row => this.mapRow(row)));
    }
}
