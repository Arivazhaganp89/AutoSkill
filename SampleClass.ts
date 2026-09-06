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
*
* @param {Page} page - Playwright page instance.
* @param {string} path - Relative route for the Current Promotions page.
*/
constructor(page: Page, path = '/fcop/promotions#/') {
super(page, path);
}

/// region- Promotions Navigation-----------------------

/** Promotions sidebar title. */
get promotionsTitle(): Locator {
return this.page.getByText('Promotions', { exact: true }).first();
}

/** Current Promotions navigation link. */
get currentPromotionsLink(): Locator {
return this.page.getByRole('link', { name: /Current Promotions/ });
}

/** Past Promotions navigation link. */
get pastPromotionsLink(): Locator {
return this.page.getByRole('link', { name: /Past Promotions|Past Promos/ });
}

/** Current Promotions navigation item. */
get currentPromotionsNavigationItem(): Locator {
return this.currentPromotionsLink.locator('xpath=..');
}

/** Current Promotions count. */
get currentPromotionsCount(): Locator {
return this.currentPromotionsLink.locator('span').last();
}

/// region- Current Promotions Content-----------------------

/** O'Reilly Pro Promotions page title. */
get currentPromotionsPageTitle(): Locator {
return this.page.getByText("O'Reilly Pro Promotions", { exact: true });
}

/** All promotion preview cards. */
get promotionCards(): Locator {
return this.page.locator('.promotion-preview');
}

/** All promotion title links. */
get promotionTitleLinks(): Locator {
return this.promotionCards.locator('a.font-weight-bold');
}

/** All Enroll Now buttons. */
get enrollNowButtons(): Locator {
return this.promotionCards.getByRole('link', { name: 'Enroll Now' });
}

/** All Enrolled status containers. */
get enrolledPromotionStatuses(): Locator {
return this.promotionCards.locator('.available-promo-enrollment-status').filter({
hasText: 'Enrolled',
});
}

/// region- Promotion Card Details-----------------------

/**
* Gets a promotion card by promotion name.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The matching promotion card.
*/
getPromotionCard(promotionName: string): Locator {
return this.promotionCards.filter({
has: this.page.getByText(promotionName, { exact: true }),
});
}

/**
* Gets the promotion title link by promotion name.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The matching promotion title link.
*/
getPromotionTitleLink(promotionName: string): Locator {
return this.getPromotionCard(promotionName).locator('a.font-weight-bold');
}

/**
* Gets the Enroll Now button for a specific promotion.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The matching Enroll Now button.
*/
getEnrollNowButton(promotionName: string): Locator {
return this.getPromotionCard(promotionName).getByRole('link', {
name: 'Enroll Now',
});
}

/**
* Gets the active date for a specific promotion.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The promotion active date.
*/
getPromotionActiveDate(promotionName: string): Locator {
return this.getPromotionCard(promotionName).locator('.text-xs').first();
}

/**
* Gets the Available Rewards section for a specific promotion.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The Available Rewards section.
*/
getAvailableRewardsSection(promotionName: string): Locator {
return this.getPromotionCard(promotionName).locator('.my-3.py-3');
}

/**
* Gets the qualifying purchases value for a specific promotion.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The qualifying purchases value.
*/
getQualifyingPurchasesValue(promotionName: string): Locator {
return this.getPromotionCard(promotionName)
.locator('.promo-progress')
.getByText('Qualifying Purchases:', { exact: false })
.locator('strong.value-text');
}

/**
* Gets the amount to next reward value for a specific promotion.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The amount to next reward value.
*/
getAmountToNextRewardValue(promotionName: string): Locator {
return this.getPromotionCard(promotionName)
.locator('.promo-progress')
.getByText('Amount to next reward:', { exact: false })
.locator('strong.value-text');
}

/**
* Gets the promotion progress bar for a specific promotion.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The promotion progress bar.
*/
getPromotionProgressBar(promotionName: string): Locator {
return this.getPromotionCard(promotionName).locator('.promo-progress-bar');
}

/**
* Gets the Enrolled status for a specific promotion.
*
* @param {string} promotionName - The name of the promotion.
* @returns {Locator} The Enrolled status.
*/
getEnrolledStatus(promotionName: string): Locator {
return this.getPromotionCard(promotionName).getByText('Enrolled', {
exact: true,
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
*
* @param {string} promotionName - The name of the promotion.
*/
async clickPromotion(promotionName: string): Promise<void> {
await smartClick(this.page, this.getPromotionTitleLink(promotionName), {
description: `${promotionName} promotion`,
});
}

/**
* Clicks the Enroll Now button for a specific promotion.
*
* @param {string} promotionName - The name of the promotion.
*/
async clickEnrollNow(promotionName: string): Promise<void> {
await smartClick(this.page, this.getEnrollNowButton(promotionName), {
description: `${promotionName} Enroll Now button`,
});
}

/// region- Verifications-----------------------

/**
* Verifies that the Current Promotions page title is displayed.
*/
async verifyCurrentPromotionsPageTitle(): Promise<void> {
await Verifications.verifyVisible(
this.currentPromotionsPageTitle,
"O'Reilly Pro Promotions page title"
);
}

/**
* Verifies that the Promotions sidebar title is displayed.
*/
async verifyPromotionsTitle(): Promise<void> {
await Verifications.verifyVisible(
this.promotionsTitle,
'Promotions sidebar title'
);
}

/**
* Verifies that the Current Promotions link is displayed.
*/
async verifyCurrentPromotionsLink(): Promise<void> {
await Verifications.verifyVisible(
this.currentPromotionsLink,
'Current Promotions navigation link'
);
}

/**
* Verifies that the Past Promotions link is displayed.
*/
async verifyPastPromotionsLink(): Promise<void> {
await Verifications.verifyVisible(
this.pastPromotionsLink,
'Past Promotions navigation link'
);
}

/**
* Verifies that the Current Promotions navigation item is active.
*/
async verifyCurrentPromotionsIsActive(): Promise<void> {
await Verifications.verifyTrue(
await this.currentPromotionsNavigationItem.evaluate((element) =>
element.classList.contains('active')
),
'Current Promotions navigation item should be active'
);
}

/**
* Verifies that at least one promotion card is displayed.
*/
async verifyPromotionCardsDisplayed(): Promise<void> {
await Verifications.verifyTrue(
(await this.promotionCards.count()) > 0,
'At least one promotion card should be displayed'
);
}

/**
* Verifies that a specific promotion is displayed.
*
* @param {string} promotionName - The expected promotion name.
*/
async verifyPromotionDisplayed(promotionName: string): Promise<void> {
await Verifications.verifyVisible(
this.getPromotionTitleLink(promotionName),
`${promotionName} promotion`
);
}

/**
* Verifies that a promotion displays the expected active date.
*
* @param {string} promotionName - The name of the promotion.
* @param {string} expectedActiveDate - The expected active date.
*/
async verifyPromotionActiveDate(
promotionName: string,
expectedActiveDate: string
): Promise<void> {
await Verifications.verifyText(
this.getPromotionActiveDate(promotionName),
`Active: ${expectedActiveDate}`,
`${promotionName} active date`
);
}

/**
* Verifies that the Available Rewards section is displayed.
*
* @param {string} promotionName - The name of the promotion.
*/
async verifyAvailableRewardsDisplayed(
promotionName: string
): Promise<void> {
await Verifications.verifyVisible(
this.getAvailableRewardsSection(promotionName),
`${promotionName} Available Rewards section`
);
}

/**
* Verifies that the Enroll Now button is displayed.
*
* @param {string} promotionName - The name of the promotion.
*/
async verifyEnrollNowButtonDisplayed(
promotionName: string
): Promise<void> {
await Verifications.verifyVisible(
this.getEnrollNowButton(promotionName),
`${promotionName} Enroll Now button`
);
}

/**
* Verifies that a promotion is displayed as Enrolled.
*
* @param {string} promotionName - The name of the promotion.
*/
async verifyPromotionIsEnrolled(
promotionName: string
): Promise<void> {
await Verifications.verifyVisible(
this.getEnrolledStatus(promotionName),
`${promotionName} Enrolled status`
);
}

/**
* Verifies the qualifying purchases value for a promotion.
*
* @param {string} promotionName - The name of the promotion.
* @param {string} expectedValue - The expected qualifying purchases value.
*/
async verifyQualifyingPurchasesValue(
promotionName: string,
expectedValue: string
): Promise<void> {
await Verifications.verifyText(
this.getQualifyingPurchasesValue(promotionName),
expectedValue,
`${promotionName} qualifying purchases value`
);
}

/**
* Verifies the amount to next reward value for a promotion.
*
* @param {string} promotionName - The name of the promotion.
* @param {string} expectedValue - The expected amount to next reward value.
*/
async verifyAmountToNextRewardValue(
promotionName: string,
expectedValue: string
): Promise<void> {
await Verifications.verifyText(
this.getAmountToNextRewardValue(promotionName),
expectedValue,
`${promotionName} amount to next reward value`
);
}

/**
* Verifies that the promotion progress bar is displayed.
*
* @param {string} promotionName - The name of the promotion.
*/
async verifyPromotionProgressBarDisplayed(
promotionName: string
): Promise<void> {
await Verifications.verifyVisible(
this.getPromotionProgressBar(promotionName),
`${promotionName} promotion progress bar`
);
}
}
