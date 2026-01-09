import { test as base } from '@playwright/test';
import { BlazedemoPage } from '../pages/blazedemo/blazedemo.page';
import { ReservePage } from '../pages/blazedemo/reserve.page';
import { PurchasePage } from '../pages/blazedemo/purchase.page';
import { ConfirmationPage } from '../pages/blazedemo/confirmation.page';

type MyFixtures = {
    blazeDemo: {
        blazeDemoPage: BlazedemoPage;
        reservePage: ReservePage;
        purchasePage: PurchasePage;
        confirmationPage: ConfirmationPage;
    };
};

export const test = base.extend<MyFixtures>({
    blazeDemo: async ({ page }, use) => {
        const blazeDemoPage = new BlazedemoPage(page);
        const reservePage = new ReservePage(page);
        const purchasePage = new PurchasePage(page);
        const confirmationPage = new ConfirmationPage(page);

        await blazeDemoPage.navigate();
        
        await use({
            blazeDemoPage,
            reservePage,
            purchasePage,
            confirmationPage
        });
    },
});

export { expect } from '@playwright/test';

