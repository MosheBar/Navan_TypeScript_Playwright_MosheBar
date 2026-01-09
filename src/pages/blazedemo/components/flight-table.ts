import { Locator, Page } from '@playwright/test';
import { extractNumericValue } from '../../../utils/common';

export interface FlightRow {
    price: number;
    priceText: string;
    flightNumber: string;
    select: () => Promise<void>;
}

export class FlightTable {
    private readonly rows: Locator;
    private readonly priceSelector = 'input[name="price"]';
    private readonly flightSelector = 'input[name="flight"]';
    private readonly selectButtonSelector = 'input[type="submit"]';

    constructor(page: Page) {
        this.rows = page.locator('table.table tbody tr');
    }

    async parseAllRows(): Promise<FlightRow[]> {
        await this.rows.first().waitFor();
        const rowElements = await this.rows.all();
        const flightRows: FlightRow[] = [];

        for (const row of rowElements) {
            const flightNumber = await row.locator(this.flightSelector).inputValue();
            const priceText = await row.locator(this.priceSelector).inputValue();
            
            flightRows.push({
                price: extractNumericValue(priceText),
                priceText,
                flightNumber,
                select: async () => await row.locator(this.selectButtonSelector).click()
            });
        }

        return flightRows;
    }
}
