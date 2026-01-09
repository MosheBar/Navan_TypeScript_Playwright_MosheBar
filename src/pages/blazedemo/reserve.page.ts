import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { FlightDetails } from '../../utils/ui/types';
import { FlightTable } from './components/flight-table';

export class ReservePage extends BasePage {
    private readonly flightTable: FlightTable;
    private readonly pageTitle = 'BlazeDemo - reserve';

    constructor(page: Page) {
        super(page);
        this.flightTable = new FlightTable(page);
    }

    async validatePage(): Promise<void> {
        await this.validateTitle(this.pageTitle);
    }

    async selectCheapestFlight(click: boolean = true): Promise<FlightDetails> {
        const rows = await this.flightTable.parseAllRows();

        if (rows.length === 0) {
            throw new Error('No flights found in the table');
        }

        // Sort by price ascending
        const cheapestFlight = rows.sort((a, b) => a.price - b.price)[0];

        if (click) {
            await cheapestFlight.select();
        }

        return {
            price: `$${cheapestFlight.priceText}`, 
            flightNumber: cheapestFlight.flightNumber
        };
    }
}
