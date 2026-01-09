import { test, expect } from '../../src/fixtures/test.fixture';
import { TravelCity } from '../../src/utils/ui/types';
import { extractNumericValue } from '../../src/utils/common';
import { generateRandomPassenger } from '../../src/utils/ui/data-generator';

test.describe('TravelCorp Booking Engine - UI Flow', () => {
    const successMessage = 'Thank you for your purchase today!';

    test('Happy Path - Purchase the cheapest flight', async ({ blazeDemo }) => {
        await blazeDemo.blazeDemoPage.validatePage();
        await blazeDemo.blazeDemoPage.searchFlights(TravelCity.Boston, TravelCity.London);
        const reservePage = await blazeDemo.blazeDemoPage.clickFindFlights();

        await reservePage.validatePage();
        const flightDetails = await reservePage.selectCheapestFlight();
        expect(flightDetails.price).toBeTruthy(); 

        await blazeDemo.purchasePage.validatePage();

        const flightDetailsFromPurchasePage = await blazeDemo.purchasePage.getFlightDetails();
        expect(flightDetailsFromPurchasePage.flightNumber).toBeTruthy();
        expect(flightDetailsFromPurchasePage.price).toBeTruthy();

        await blazeDemo.purchasePage.fillPassengerDetails(generateRandomPassenger());
        const confirmationPage = await blazeDemo.purchasePage.submitPurchase();

        await confirmationPage.validatePage();
        const headerText = await confirmationPage.getHeaderText();
        expect(headerText).toBe(successMessage);
        
        const confirmationDetails = await confirmationPage.getBookingDetails();
        expect(confirmationDetails.id).toBeTruthy();
        expect(confirmationDetails.amount).toBeTruthy();
        expect(extractNumericValue(confirmationDetails.amount)).toBeCloseTo(extractNumericValue(flightDetailsFromPurchasePage.price), 2);
    });

});
