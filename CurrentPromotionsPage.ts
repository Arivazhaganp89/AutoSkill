import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { smartClick } from '../../../qaa-playwright-utils/utils/actions';
import { Verifications } from '../../../qaa-playwright-utils/utils/verifications';
/**
* Page object for Current Promotions page.
*/
export class CurrentPromotionsPage extends BasePage {
/**
* Creates a CurrentPromotionsPage instance.
* @param {Page} page - Playwright page instance.
* @param {string} path - Relative route for the Current Promotions page.
*/
constructor(page: Page, path = '/fcop/promotions#/') {
super(page, path);
}
/// region- Promotions Navigation-----------------------
/** Gets the Promotions sidebar title. */
get promotionsTitle(): Locator {
return this.page.getByText('Promotions', { exact: true }).first();
}
/** Gets the Current Promotions navigation link. */
get currentPromotionsLink(): Locator {
return this.page.getByRole('link', { name: 'Current Promotions', exact: true });
}
/** Gets the Past Promotions navigation link. */
get pastPromotionsLink(): Locator {
return this.page.getByRole('link', { name: /Past Promotions|Past Promos/ });
}
/// region- Current Promotions Content-----------------------
/** Gets the Current Promotions section. */
get currentPromotionsSection(): Locator {
return this.page.locator('.promo-tracker');
}
/** Gets all promotion title links. */
get promotionTitleLinks(): Locator {
return this.currentPromotionsSection.getByRole('link');
}
/** Gets all Enroll Now buttons. */
get enrollNowButtons(): Locator {
return this.currentPromotionsSection.getByRole('button', { name: 'Enroll Now', exact: true });
}
/// region- first not-enrolled-----------------------
/** Gets the first not-enrolled promotion card. */
get firstNotEnrolledPromotionCard(): Locator {
return this.currentPromotionsSection
.locator('.promo-tracker-item')
.filter({ hasText: /Enroll Now|Participar ahora/ })
.first();
}
/** Gets the enrollment link from the first not-enrolled promotion card. */
get firstNotEnrolledPromotionLink(): Locator {
return this.firstNotEnrolledPromotionCard.getByRole('link', {
name: /^(Enroll Now|Participar ahora)$/,
});
}
/** Gets the first not-enrolled promotion title. */
get firstNotEnrolledPromotionTitle(): Locator {
return this.firstNotEnrolledPromotionCard.locator('a').first();
}
/** Gets the first Enroll Now link. */
get firstEnrollNowLink(): Locator {
return this.firstNotEnrolledPromotionCard.getByRole('link', {
name: 'Enroll Now',
exact: true,
});
}
/// region- Promotion Card Details-----------------------
/**
* Gets a promotion card by promotion name.
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The matching promotion card.
*/
getPromotionCard(promotionName: string): Locator {
return this.currentPromotionsSection.getByRole('link', { name: promotionName, exact: true }).locator('..').locator('..').locator('..');
}
/**
* Gets the promotion title link by promotion name.
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The matching promotion title link.
*/
getPromotionTitleLink(promotionName: string): Locator {
return this.currentPromotionsSection.getByRole('link', {
name: promotionName,
exact: true,
});
}
/** Gets the first not-enrolled promotion card. */
get firstNotEnrolledPromotion(): Locator {
return this.currentPromotionsSection
.locator('.promo-tracker-item')
.filter({
has: this.page.getByRole('link', {
name: 'Enroll Now',
exact: true,
}),
})
.first();
}
/**
* Gets the Enroll Now button for a specific promotion.
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The matching Enroll Now button.
*/
getEnrollNowButton(promotionName: string): Locator {
return this.getPromotionCard(promotionName).getByRole('button', {
name: 'Enroll Now',
exact: true,
});
}
/**
* Gets the active date information for a specific promotion.
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The promotion active date information.
*/
getPromotionActiveDate(promotionName: string): Locator {
return this.getPromotionCard(promotionName).getByText('Active:', {
exact: false,
});
}
/**
* Gets the amount to next reward information for a specific promotion.
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The amount to next reward information.
*/
getAmountToNextReward(promotionName: string): Locator {
return this.getPromotionCard(promotionName).getByText('Amount to next reward:', {
exact: false,
});
}
/**
* Gets the qualifying purchases information for a specific promotion.
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The qualifying purchases information.
*/
getQualifyingPurchases(promotionName: string): Locator {
return this.getPromotionCard(promotionName).getByText('Qualifying Purchases:', {
exact: false,
});
}
/**
* Gets the promotion progress value for a specific promotion.
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The promotion progress value.
*/
getPromotionProgress(promotionName: string): Locator {
return this.getPromotionCard(promotionName).getByText(/^\$\d[\d,]*(\.\d{2})? of \$\d[\d,]*(\.\d{2})?$/);
}
/**
* Gets the Ending Soon status for a specific promotion.
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The Ending Soon status.
*/
getEndingSoonStatus(promotionName: string): Locator {
return this.getPromotionCard(promotionName).getByText('ENDING SOON', {
exact: true,
});
}
/**
* Gets a promotions navigation item.
* @param {string} navigationName - The name of the promotions navigation item.
*/
getPromotionsNavigationItem(navigationName: string): Locator {
return this.page.getByRole('link', {
name: new RegExp(navigationName),
});
}
/// region- Spanish Localization Getters-----------------------
/** Gets the Spanish current promotions navigation item. */
get currentPromotionsNavigationItemInSpanish(): Locator {
return this.page.getByRole('link', {
name: /Promociones actuales/,
});
}
/** Gets the Spanish past promotions navigation item. */
get pastPromotionsNavigationItemInSpanish(): Locator {
return this.page.getByRole('link', {
name: /Promociones anteriores/,
});
}
/// region- Actions-----------------------
/**
* Clicks the Current Promotions navigation link.
*/
async clickCurrentPromotions(): Promise<void> {
await smartClick(this.page, this.currentPromotionsLink, {
description: 'Current Promotions navigation link',
});
}
/**
* Clicks the Past Promotions navigation link.
*/
async clickPastPromotions(): Promise<void> {
await smartClick(this.page, this.pastPromotionsLink, {
description: 'Past Promotions navigation link',
});
}
/**
* Clicks a promotion by promotion name.
* @param {string} promotionName - The name of the promotion.
*/
async clickPromotion(promotionName: string): Promise<void> {
await smartClick(this.page, this.getPromotionTitleLink(promotionName), {
description: `${promotionName} promotion`,
});
}
/**
* Clicks the first not-enrolled promotion and returns its name.
* @returns {Promise<string>} The selected promotion name.
*/
async clickFirstNotEnrolledPromotion(): Promise<string> {
const promotionName = await this.firstNotEnrolledPromotionLink.innerText();
await smartClick(this.page, this.firstNotEnrolledPromotionLink, {
description: 'first not-enrolled promotion',
});
return promotionName;
}
/**
* Clicks the Enroll Now button for a specific promotion.
* @param {string} promotionName - The name of the promotion.
*/
async clickEnrollNow(promotionName: string): Promise<void> {
await smartClick(this.page, this.getEnrollNowButton(promotionName), {
description: `${promotionName} Enroll Now button`,
});
}
/**
* Gets the promotion ID from the current URL.
*
* @returns {string} The promotion ID.
*/
getPromotionIdFromUrl(): string {
const match = this.page.url().match(/#\/(?:enroll|details)\/([^/?#]+)/);
if (!match) {
throw new Error(`Unable to extract promotion ID from URL: ${this.page.url()}`);
}
return match[1];
}
/// region- Verifications-----------------------
/**
* Verifies that the Current Promotions section is displayed.
*/
async verifyCurrentPromotionsSection(): Promise<void> {
await Verifications.verifyVisible(this.currentPromotionsSection, 'Current Promotions section');
}
/**
* Verifies that the Promotions sidebar title is displayed.
*/
async verifyPromotionsTitle(): Promise<void> {
await Verifications.verifyVisible(this.promotionsTitle, 'Promotions sidebar title');
}
/**
* Verifies that the Current Promotions navigation link is displayed.
*/
async verifyCurrentPromotionsLink(): Promise<void> {
await Verifications.verifyVisible(this.currentPromotionsLink, 'Current Promotions navigation link');
}
/**
* Verifies that the Past Promotions navigation link is displayed.
*/
async verifyPastPromotionsLink(): Promise<void> {
await Verifications.verifyVisible(this.pastPromotionsLink, 'Past Promotions navigation link');
}
/**
* Verifies that a specific promotion is displayed.
* @param {string} promotionName - The expected promotion name.
*/
async verifyPromotionDisplayed(promotionName: string): Promise<void> {
await Verifications.verifyVisible(this.getPromotionTitleLink(promotionName), `${promotionName} promotion`);
}
/**
* Verifies that the Enroll Now button is displayed for a specific promotion.
* @param {string} promotionName - The name of the promotion.
*/
async verifyEnrollNowButtonDisplayed(promotionName: string): Promise<void> {
await Verifications.verifyVisible(this.getEnrollNowButton(promotionName), `${promotionName} Enroll Now button`);
}
/**
* Verifies that the active date information is displayed for a specific promotion.
* @param {string} promotionName - The name of the promotion.
*/
async verifyPromotionActiveDateDisplayed(promotionName: string): Promise<void> {
await Verifications.verifyVisible(this.getPromotionActiveDate(promotionName), `${promotionName} active date`);
}
/**
* Verifies that the amount to next reward information is displayed.
* @param {string} promotionName - The name of the promotion.
*/
async verifyAmountToNextRewardDisplayed(promotionName: string): Promise<void> {
await Verifications.verifyVisible(this.getAmountToNextReward(promotionName), `${promotionName} amount to next reward`);
}
/**
* Verifies that the qualifying purchases information is displayed.
* @param {string} promotionName - The name of the promotion.
*/
async verifyQualifyingPurchasesDisplayed(promotionName: string): Promise<void> {
await Verifications.verifyVisible(this.getQualifyingPurchases(promotionName), `${promotionName} qualifying purchases`);
}
/**
* Verifies that the promotion progress value is displayed.
* @param {string} promotionName - The name of the promotion.
*/
async verifyPromotionProgressDisplayed(promotionName: string): Promise<void> {
await Verifications.verifyVisible(this.getPromotionProgress(promotionName), `${promotionName} promotion progress`);
}
/**
* Verifies that the specified promotion displays the expected amount to next reward.
* @param {string} promotionName - The name of the promotion.
* @param {string} expectedAmount - The expected amount to next reward.
*/
async verifyAmountToNextReward(promotionName: string, expectedAmount: string): Promise<void> {
await Verifications.verifyContainsText(this.getAmountToNextReward(promotionName), expectedAmount, `${promotionName} amount to next reward`);
}
/**
* Verifies that the specified promotion displays the expected qualifying purchases value.
* @param {string} promotionName - The name of the promotion.
* @param {string} expectedValue - The expected qualifying purchases value.
*/
async verifyQualifyingPurchases(promotionName: string, expectedValue: string): Promise<void> {
await Verifications.verifyContainsText(this.getQualifyingPurchases(promotionName), expectedValue, `${promotionName} qualifying purchases`);
}
/**
* Verifies that the specified promotion displays the expected progress value.
* @param {string} promotionName - The name of the promotion.
* @param {string} expectedProgress - The expected promotion progress.
*/
async verifyPromotionProgress(promotionName: string, expectedProgress: string): Promise<void> {
await Verifications.verifyText(this.getPromotionProgress(promotionName), expectedProgress, `${promotionName} promotion progress`);
}
/**
* Verifies that the specified promotion displays the Ending Soon status.
* @param {string} promotionName - The name of the promotion.
*/
async verifyEndingSoonDisplayed(promotionName: string): Promise<void> {
await Verifications.verifyVisible(this.getEndingSoonStatus(promotionName), `${promotionName} Ending Soon status`);
}
/**
* Verifies that a promotions navigation item is highlighted.
* @param {string} navigationName - The name of the promotions navigation item.
*/
async verifyPromotionsNavigationItemHighlighted(navigationName: string): Promise<void> {
await Verifications.verifyAttribute(this.getPromotionsNavigationItem(navigationName), 'aria-current', 'page', `${navigationName} navigation item`);
}
}
