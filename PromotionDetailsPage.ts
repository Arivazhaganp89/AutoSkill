import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { smartClick } from '../../../qaa-playwright-utils/utils/actions';
import { Verifications } from '../../../qaa-playwright-utils/utils/verifications';

/**
* Page object for Promotion Details page.
*/
export class PromotionDetailsPage extends BasePage {
/**
* Creates a PromotionDetailsPage instance.
* @param {Page} page - Playwright page instance.
* @param {string} promotionId - Promotion identifier used in the page route.
*/
constructor(page: Page, promotionId: string) {
super(page, `/fcop/promotions#/details/${promotionId}`);
}

/// region- Promotion Details Content-----------------------
/**
* Gets the promotion name heading.
* @returns {Locator} The promotion name heading.
*/
get promotionName(): Locator {
return this.page.getByRole('heading', { name: 'BA Promotions', exact: true });
}
/**
* Gets the promotion active date container.
* @returns {Locator} The promotion active date container.
*/
get promotionActiveDate(): Locator {
return this.page.getByText('Active:', { exact: true }).locator('..');
}
/**
* Gets the promotion description.
* @returns {Locator} The promotion description.
*/
get promotionDescription(): Locator {
return this.page.getByText('Welcome Promos', { exact: true });
}
/**
* Gets the Unenroll button.
* @returns {Locator} The Unenroll button.
*/
get unenrollButton(): Locator {
return this.page.getByRole('button', { name: 'Unenroll', exact: true });
}

/// region- Terms & Conditions-----------------------
/**
* Gets the Terms & Conditions tab.
* @returns {Locator} The Terms & Conditions tab.
*/
get termsAndConditionsTab(): Locator {
return this.page.getByRole('link', { name: 'Terms & Conditions', exact: true });
}
/**
* Gets the First Promos section.
* @returns {Locator} The First Promos section.
*/
get firstPromosSection(): Locator {
return this.page.getByText('First Promos', { exact: true });
}
/**
* Gets the Show Terms & Conditions link.
* @returns {Locator} The Show Terms & Conditions link.
*/
get showTermsAndConditionsLink(): Locator {
return this.page.getByRole('link', {
name: 'Show Terms & Conditions',
exact: true,
});
}
/**
* Gets the Terms & Conditions content.
* @returns {Locator} The Terms & Conditions content.
*/
get termsAndConditionsContent(): Locator {
return this.page.locator('.tnc-content');
}
/**
* Gets the Terms & Conditions heading.
* @returns {Locator} The Terms & Conditions heading.
*/
get termsAndConditionsHeading(): Locator {
return this.page.getByText(
'First Call Promo Official Rules and Terms and Conditions',
{ exact: true },
);
}

/// region- Modal-----------------------
/**
* Gets the modal close button.
* @returns {Locator} The modal close button.
*/
get modalCloseButton(): Locator {
return this.page.getByRole('button', { name: 'Close', exact: true }).last();
}

/// region- Actions-----------------------
/**
* Clicks the Unenroll button.
*/
async clickUnenroll(): Promise<void> {
await smartClick(this.page, this.unenrollButton, {
description: 'Unenroll button',
});
}
/**
* Clicks the Terms & Conditions tab.
*/
async clickTermsAndConditionsTab(): Promise<void> {
await smartClick(this.page, this.termsAndConditionsTab, {
description: 'Terms & Conditions tab',
});
}
/**
* Expands the Terms & Conditions content.
*/
async clickShowTermsAndConditions(): Promise<void> {
await smartClick(this.page, this.showTermsAndConditionsLink, {
description: 'Show Terms & Conditions link',
});
}
/**
* Closes the modal.
*/
async closeModal(): Promise<void> {
await smartClick(this.page, this.modalCloseButton, {
description: 'Modal close button',
});
}

/// region- Verifications-----------------------
/**
* Verifies that the specified promotion name is displayed.
* @param {string} expectedPromotionName - Expected promotion name.
*/
async verifyPromotionName(expectedPromotionName: string): Promise<void> {
await Verifications.verifyText(
this.promotionName,
expectedPromotionName,
'Promotion name',
);
}
/**
* Verifies that the specified active date is displayed.
* @param {string} expectedActiveDate - Expected promotion active date.
*/
async verifyPromotionActiveDate(expectedActiveDate: string): Promise<void> {
await Verifications.verifyText(
this.promotionActiveDate,
`Active: ${expectedActiveDate}`,
'Promotion active date',
);
}
/**
* Verifies that the specified promotion description is displayed.
* @param {string} expectedDescription - Expected promotion description.
*/
async verifyPromotionDescription(expectedDescription: string): Promise<void> {
await Verifications.verifyText(
this.promotionDescription,
expectedDescription,
'Promotion description',
);
}
/**
* Verifies that the Unenroll button is displayed.
*/
async verifyUnenrollButtonDisplayed(): Promise<void> {
await Verifications.verifyVisible(
this.unenrollButton,
'Unenroll button',
);
}
/**
* Verifies that the Terms & Conditions tab is displayed.
*/
async verifyTermsAndConditionsTabDisplayed(): Promise<void> {
await Verifications.verifyVisible(
this.termsAndConditionsTab,
'Terms & Conditions tab',
);
}
/**
* Verifies that the First Promos section is displayed.
*/
async verifyFirstPromosSectionDisplayed(): Promise<void> {
await Verifications.verifyVisible(
this.firstPromosSection,
'First Promos section',
);
}
/**
* Verifies that the Show Terms & Conditions link is displayed.
*/
async verifyShowTermsAndConditionsDisplayed(): Promise<void> {
await Verifications.verifyVisible(
this.showTermsAndConditionsLink,
'Show Terms & Conditions link',
);
}
/**
* Verifies that the Terms & Conditions heading is displayed.
*/
async verifyTermsAndConditionsHeadingDisplayed(): Promise<void> {
await Verifications.verifyVisible(
this.termsAndConditionsHeading,
'Terms & Conditions heading',
);
}
/**
* Verifies that the Terms & Conditions content is displayed.
*/
async verifyTermsAndConditionsContentDisplayed(): Promise<void> {
await Verifications.verifyVisible(
this.termsAndConditionsContent,
'Terms & Conditions content',
);
}
}
