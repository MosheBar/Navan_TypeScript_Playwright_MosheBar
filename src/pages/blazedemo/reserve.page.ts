import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { FlightDetails } from '../../utils/ui/types';
import { extractNumericValue } from '../../utils/common';

export class ReservePage extends BasePage {
    private readonly tableRows: Locator;
    private readonly pageTitle = 'BlazeDemo - reserve';
    private readonly tablePrice = 'input[name="price"]';
    private readonly tableFlightNumber = 'input[name="flight"]';
    private readonly tableSelectFlight = 'input[type="submit"]';

    constructor(page: Page) {
        super(page);
        this.tableRows = page.locator('table.table tbody tr');
    }

    async validatePage(): Promise<void> {
        await this.validateTitle(this.pageTitle);
    }

    async selectCheapestFlight(click: boolean = true): Promise<FlightDetails> {
        await this.tableRows.first().waitFor();

        const rows = await this.tableRows.all();
    
        let minPrice = Number.MAX_VALUE;
        let winningRow: Locator | null = null;
        let capturedPriceText = '';
        let capturedFlightNumber = '';

        for (const row of rows) {
            const flightValue = await row.locator(this.tableFlightNumber).inputValue();
            const priceValue = await row.locator(this.tablePrice).inputValue();
            const price = extractNumericValue(priceValue);

            if (price < minPrice) {
                minPrice = price;
                winningRow = row;
                capturedPriceText = priceValue;
                capturedFlightNumber = flightValue;
            }
        }

        if (!winningRow) {
            throw new Error('No flights found in the table');
        }

        if (click && winningRow){
            await winningRow.locator(this.tableSelectFlight).click();
        }
        return {
            price: `$${capturedPriceText}`, 
            flightNumber: capturedFlightNumber
        };
    }
}
