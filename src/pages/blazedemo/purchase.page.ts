import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base.page';
import { PassengerDetails, FlightDetails } from '../../utils/ui/types';
import { ConfirmationPage } from './confirmation.page';

export class PurchasePage extends BasePage {
    private readonly nameInput: Locator;
    private readonly addressInput: Locator;
    private readonly cityInput: Locator;
    private readonly stateInput: Locator;
    private readonly zipInput: Locator;
    private readonly cardTypeSelect: Locator;
    private readonly creditCardNumberInput: Locator;
    private readonly cardMonthInput: Locator;
    private readonly cardYearInput: Locator;
    private readonly nameOnCardInput: Locator;
    private readonly purchaseButton: Locator;
    
    private readonly totalCostContainer: Locator;
    private readonly flightNumberContainer: Locator;

    private readonly pageTitle = 'BlazeDemo Purchase';

    constructor(page: Page) {
        super(page);
        
        this.nameInput = page.locator('input[name="inputName"]');
        this.addressInput = page.locator('input[name="address"]');
        this.cityInput = page.locator('input[name="city"]');
        this.stateInput = page.locator('input[name="state"]');
        this.zipInput = page.locator('input[name="zipCode"]');
        this.cardTypeSelect = page.locator('select[name="cardType"]');
        this.creditCardNumberInput = page.locator('input[name="creditCardNumber"]');
        this.cardMonthInput = page.locator('input[name="creditCardMonth"]');
        this.cardYearInput = page.locator('input[name="creditCardYear"]');
        this.nameOnCardInput = page.locator('input[name="nameOnCard"]');
        this.purchaseButton = page.locator('input[type="submit"]');

        this.totalCostContainer = page.locator('p').filter({ hasText: 'Total Cost' });
        this.flightNumberContainer = page.locator('p').filter({ hasText: 'Flight Number' });
    }

    async validatePage(): Promise<void> {
        await this.validateTitle(this.pageTitle);
    }

    async getFlightDetails(): Promise<FlightDetails> {
        const flightNumberText = await this.flightNumberContainer.innerText();
        const totalCostText = await this.totalCostContainer.innerText();

        return {
            flightNumber: flightNumberText.split(' ').pop() ?? '',
            price: totalCostText.split(' ').pop() ?? ''
        };
    }

    async fillPassengerDetails(details: Partial<PassengerDetails>): Promise<void> {
        if (details.firstName) await this.nameInput.fill(details.firstName);
        if (details.address) await this.addressInput.fill(details.address);
        if (details.city) await this.cityInput.fill(details.city);
        if (details.state) await this.stateInput.fill(details.state);
        if (details.zipCode) await this.zipInput.fill(details.zipCode);
        
        if (details.cardType) await this.cardTypeSelect.selectOption(details.cardType);
        if (details.cardNumber) await this.creditCardNumberInput.fill(details.cardNumber);
        if (details.cardMonth) await this.cardMonthInput.fill(details.cardMonth);
        if (details.cardYear) await this.cardYearInput.fill(details.cardYear);
        
        if (details.nameOnCard) await this.nameOnCardInput.fill(details.nameOnCard);
    }

    async submitPurchase(): Promise<ConfirmationPage> {
        await this.purchaseButton.click();
        return new ConfirmationPage(this.page);
    }


}
