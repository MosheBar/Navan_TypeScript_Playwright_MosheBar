import { Page, expect } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    abstract validatePage(): Promise<void>;

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async validateTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }
}
