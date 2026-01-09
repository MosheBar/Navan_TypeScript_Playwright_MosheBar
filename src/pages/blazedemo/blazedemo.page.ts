import { Page, Locator, expect } from '@playwright/test';
import { ReservePage } from './reserve.page';
import { BasePage } from '../base.page';
import { TravelCity } from '../../utils/ui/types';

export class BlazedemoPage extends BasePage {
    private readonly fromPortSelect: Locator;
    private readonly toPortSelect: Locator;
    private readonly findFlightsButton: Locator;
    private readonly pageTitle = 'BlazeDemo';
    private readonly pageUrl = 'https://blazedemo.com/';

    constructor(page: Page) {
        super(page);
        this.fromPortSelect = page.locator('select[name="fromPort"]');
        this.toPortSelect = page.locator('select[name="toPort"]');
        this.findFlightsButton = page.locator('input[type="submit"]');
    }

    async validatePage(): Promise<void> {
        await this.validateTitle(this.pageTitle);
    }

    async navigate(url?: string): Promise<void> {
        await super.navigate(url ?? this.pageUrl);
        await this.fromPortSelect.waitFor();
    }

    async searchFlights(from: TravelCity, to: TravelCity): Promise<void> {
        if (from) {
            await this.fromPortSelect.selectOption(from);
        }
        if (to) {
            await this.toPortSelect.selectOption(to);
        }
    }

    async clickFindFlights(): Promise<ReservePage> {
        await this.findFlightsButton.click();
        return new ReservePage(this.page);
    }
}
