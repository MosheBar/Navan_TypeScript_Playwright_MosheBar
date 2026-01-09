import { test, expect } from '../../src/fixtures/test.fixture';
import { TravelCity } from '../../src/utils/ui/types';
import { PurchasePage } from '@pages/blazedemo/purchase.page';
import { extractNumericValue } from '../../src/utils/common';

test.describe('TravelCorp Booking Engine - UI Flow', () => {
    const successMessage = 'Thank you for your purchase today!';

    test('Happy Path - Purchase the cheapest flight', async ({ blazedemoPage }) => {
        await blazedemoPage.searchFlights(TravelCity.Boston, TravelCity.London);
        const reservePage = await blazedemoPage.clickFindFlights();

        await reservePage.validatePage();
        const flightDetails = await reservePage.selectCheapestFlight();
        expect(flightDetails.price).toBeTruthy(); 

        const purchasePage = new PurchasePage(blazedemoPage.page);
        await purchasePage.validatePage();

        const flightDetailsFromPurchasePage = await purchasePage.getFlightDetails();
        expect(flightDetailsFromPurchasePage.flightNumber).toBeTruthy();
        expect(flightDetailsFromPurchasePage.price).toBeTruthy();

        await purchasePage.fillPassengerDetails({
            firstName: 'John Doe',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            cardType: 'Visa',
            cardNumber: '1234567890123456',
            cardMonth: '11',
            cardYear: '2025',
            nameOnCard: 'John Doe'
        });
        const confirmationPage = await purchasePage.submitPurchase();

        await confirmationPage.validatePage();
        const headerText = await confirmationPage.getHeaderText();
        expect(headerText).toBe(successMessage);
        
        const confirmationDetails = await confirmationPage.getBookingDetails();
        expect(confirmationDetails.id).toBeTruthy();
        expect(confirmationDetails.amount).toBeTruthy();
        expect(extractNumericValue(confirmationDetails.amount)).toBeCloseTo(extractNumericValue(flightDetailsFromPurchasePage.price), 2);
    });

});
