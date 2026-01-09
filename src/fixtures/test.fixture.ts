import { test as base } from '@playwright/test';
import { BlazedemoPage } from '../pages/blazedemo/blazedemo.page';
import { ReservePage } from '../pages/blazedemo/reserve.page';
import { PurchasePage } from '../pages/blazedemo/purchase.page';
import { ConfirmationPage } from '../pages/blazedemo/confirmation.page';

type MyFixtures = {
    blazedemoPage: BlazedemoPage;
};

export const test = base.extend<MyFixtures>({
    blazedemoPage: async ({ page }, use) => {
        const blazedemoPage = new BlazedemoPage(page);
        await blazedemoPage.navigate();
        await blazedemoPage.validatePage();
        await use(blazedemoPage);
    },
});

export { expect } from '@playwright/test';
