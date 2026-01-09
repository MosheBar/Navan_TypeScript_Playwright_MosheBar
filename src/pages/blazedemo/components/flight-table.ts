import { Locator, Page } from '@playwright/test';
import { extractNumericValue } from '../../../utils/common';
import { GenericTable } from '../../../utils/ui/generic-table';

export interface FlightRow {
    price: number;
    priceText: string;
    flightNumber: string;
    select: () => Promise<void>;
}

export class FlightTable extends GenericTable<FlightRow> {
    private readonly priceSelector = 'input[name="price"]';
    private readonly flightSelector = 'input[name="flight"]';
    private readonly selectButtonSelector = 'input[type="submit"]';

    constructor(page: Page) {
        super(page.locator('table.table tbody tr'));
    }

    protected async mapRow(row: Locator): Promise<FlightRow> {
        const flightNumber = await row.locator(this.flightSelector).inputValue();
        const priceText = await row.locator(this.priceSelector).inputValue();

        return {
            price: extractNumericValue(priceText),
            priceText,
            flightNumber,
            select: async () => await row.locator(this.selectButtonSelector).click()
        };
    }
}
