import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { BookingConfirmation } from '../../utils/ui/types';

export class ConfirmationPage extends BasePage {
    private readonly heroUnit: Locator;
    private readonly pageHeader: Locator;
    private readonly pageTitle = 'BlazeDemo Confirmation';

    constructor(page: Page) {
        super(page);
        this.heroUnit = page.locator('.hero-unit');
        this.pageHeader = this.heroUnit.locator('h1');
    }

    async validatePage(): Promise<void> {
        await this.validateTitle(this.pageTitle);
        await expect(this.pageHeader).toBeVisible();
    }

    async getHeaderText(): Promise<string> {
        return await this.pageHeader.innerText();
    }

    async getBookingDetails(): Promise<BookingConfirmation> {
        return {
            id: await this.getTextByRowLabel('Id'),
            status: await this.getTextByRowLabel('Status'),
            amount: await this.getTextByRowLabel('Amount'),
            cardNumber: await this.getTextByRowLabel('Card Number'),
            expiration: await this.getTextByRowLabel('Expiration'),
            authCode: await this.getTextByRowLabel('Auth Code'),
            date: await this.getTextByRowLabel('Date')
        };
    }

    private async getTextByRowLabel(label: string): Promise<string> {
        return await this.heroUnit.locator('tr')
            .filter({ hasText: label })
            .locator('td')
            .nth(1)
            .innerText();
    }
}
