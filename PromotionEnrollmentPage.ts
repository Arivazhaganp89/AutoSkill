
import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { smartClick } from '../../../qaa-playwright-utils/utils/actions';
import { Verifications } from '../../../qaa-playwright-utils/utils/verifications';
/**
* Page object for Promotion Enrollment page.
*/
export class PromotionEnrollmentsPage extends BasePage {
/**
* Creates a PromotionEnrollmentsPage instance.
* @param {Page} page - Playwright page instance.
* @param {string} promotionId - Promotion identifier used in the enrollment route.
*/
constructor(page: Page, promotionId: string) {
super(page, `/fcop/promotions#/enroll/${promotionId}`);
}
/// region- Promotions Navigation-----------------------
/** Gets the Promotions navigation title. */
get promotionsNavigationTitle(): Locator {
return this.page.getByText('Promotions', { exact: true });
}
/** Gets the Current Promotions navigation link. */
get currentPromotionsLink(): Locator {
return this.page.getByRole('link', { name: /Current Promotions|Promos/, exact: true });
}
/** Gets the Past Promotions navigation link. */
get pastPromotionsLink(): Locator {
return this.page.getByRole('link', { name: /Past Promotions|Past Promos/, exact: true });
}
/** Gets the Current Promotions navigation item. */
get currentPromotionsNavigationItem(): Locator {
return this.currentPromotionsLink.locator('..');
}
/** Gets the Past Promotions navigation item. */
get pastPromotionsNavigationItem(): Locator {
return this.pastPromotionsLink.locator('..');
}
/// region- Promotion Enrollment Content-----------------------
/** Gets the Promotion Enrollment page title. */
get promotionEnrollmentPageTitle(): Locator {
return this.page.getByText("O'Reilly Pro Promotion Enrollment", { exact: true });
}
/** Gets the promotion name. */
get promotionName(): Locator {
return this.page.getByRole('heading', { name: 'BA Promotions', exact: true });
}
/** Gets the promotion active date. */
get promotionActiveDate(): Locator {
return this.page.getByText('Active:', { exact: false }).getByText('September 3 - September 11', { exact: true });
}
/// region- Shipping Address-----------------------
/** Gets the Shipping Address section heading. */
get shippingAddressHeading(): Locator {
return this.page.getByRole('heading', { name: 'Shipping Address', exact: true });
}
/** Gets the shipping address. */
get shippingAddress(): Locator {
return this.page.locator('address');
}
/** Gets the current USPS mailing address notice. */
get currentMailingAddressNotice(): Locator {
return this.page.getByText('Your current USPS mailing address on file is above.', { exact: false });
}
/// region- E-mail Address-----------------------
/** Gets the E-mail Address section heading. */
get emailAddressHeading(): Locator {
return this.page.getByRole('heading', { name: 'E-mail Address', exact: true });
}
/** Gets the current e-mail address. */
get emailAddress(): Locator {
return this.emailAddressHeading.locator('..').getByText('test@test.com', { exact: true });
}
/** Gets the Edit E-mail link. */
get editEmailLink(): Locator {
return this.page.getByRole('link', { name: 'Edit E-mail', exact: true });
}
/// region- Enrollment Actions-----------------------
/** Gets the Back link. */
get backLink(): Locator {
return this.page.getByRole('link', { name: 'Back', exact: true });
}
/** Gets the Enroll button. */
get enrollButton(): Locator {
return this.page.getByRole('button', { name: 'Enroll', exact: true });
}
/** Gets the enrollment terms and conditions message. */
get enrollmentTermsMessage(): Locator {
return this.page.getByText('By clicking enroll you agree to the terms and conditions.', { exact: false });
}
/** Gets the gift card delivery notice. */
get giftCardDeliveryNotice(): Locator {
return this.page.getByText('Promotions containing gift cards will be delivered to the customer address on file.', { exact: false });
}
/// region- Modal-----------------------
/** Gets the enrollment modal. */
get enrollmentModal(): Locator {
return this.page.getByRole('dialog');
}
/** Gets the enrollment modal Close button. */
get enrollmentModalCloseButton(): Locator {
return this.enrollmentModal.getByRole('button', { name: 'Close', exact: true });
}
/// region- Actions-----------------------
/** Clicks the Current Promotions navigation link. */
async clickCurrentPromotions(): Promise<void> {
await smartClick(this.page, this.currentPromotionsLink, {
description: 'Current Promotions navigation link',
});
}
/** Clicks the Past Promotions navigation link. */
async clickPastPromotions(): Promise<void> {
await smartClick(this.page, this.pastPromotionsLink, {
description: 'Past Promotions navigation link',
});
}
/** Clicks the Edit E-mail link. */
async clickEditEmail(): Promise<void> {
await smartClick(this.page, this.editEmailLink, {
description: 'Edit E-mail link',
});
}
/** Clicks the Back link. */
async clickBack(): Promise<void> {
await smartClick(this.page, this.backLink, {
description: 'Back link',
});
}
/** Clicks the Enroll button. */
async clickEnroll(): Promise<void> {
await smartClick(this.page, this.enrollButton, {
description: 'Enroll button',
});
}
/** Closes the enrollment modal. */
async closeEnrollmentModal(): Promise<void> {
await smartClick(this.page, this.enrollmentModalCloseButton, {
description: 'Enrollment modal Close button',
});
}
/// region- Verifications-----------------------
/** Verifies that the Promotions navigation title is displayed. */
async verifyPromotionsNavigationTitle(): Promise<void> {
await Verifications.verifyVisible(
this.promotionsNavigationTitle,
'Promotions navigation title',
);
}
/** Verifies that the Current Promotions navigation link is displayed. */
async verifyCurrentPromotionsLink(): Promise<void> {
await Verifications.verifyVisible(
this.currentPromotionsLink,
'Current Promotions navigation link',
);
}
/** Verifies that the Past Promotions navigation link is displayed. */
async verifyPastPromotionsLink(): Promise<void> {
await Verifications.verifyVisible(
this.pastPromotionsLink,
'Past Promotions navigation link',
);
}
/** Verifies that the Promotion Enrollment page title is displayed. */
async verifyPromotionEnrollmentPageTitle(): Promise<void> {
await Verifications.verifyVisible(
this.promotionEnrollmentPageTitle,
"O'Reilly Pro Promotion Enrollment page title",
);
}
/** Verifies that the promotion name is displayed. */
async verifyPromotionName(): Promise<void> {
await Verifications.verifyVisible(
this.promotionName,
'Promotion name',
);
}
/** Verifies that the promotion active date is displayed. */
async verifyPromotionActiveDate(): Promise<void> {
await Verifications.verifyVisible(
this.promotionActiveDate,
'Promotion active date',
);
}
/** Verifies that the Shipping Address section is displayed. */
async verifyShippingAddressHeading(): Promise<void> {
await Verifications.verifyVisible(
this.shippingAddressHeading,
'Shipping Address section heading',
);
}
/** Verifies that the shipping address is displayed. */
async verifyShippingAddress(): Promise<void> {
await Verifications.verifyVisible(
this.shippingAddress,
'Shipping address',
);
}
/** Verifies that the current USPS mailing address notice is displayed. */
async verifyCurrentMailingAddressNotice(): Promise<void> {
await Verifications.verifyVisible(
this.currentMailingAddressNotice,
'Current USPS mailing address notice',
);
}
/** Verifies that the E-mail Address section is displayed. */
async verifyEmailAddressHeading(): Promise<void> {
await Verifications.verifyVisible(
this.emailAddressHeading,
'E-mail Address section heading',
);
}
/** Verifies that the e-mail address is displayed. */
async verifyEmailAddress(): Promise<void> {
await Verifications.verifyVisible(
this.emailAddress,
'E-mail address',
);
}
/** Verifies that the Edit E-mail link is displayed. */
async verifyEditEmailLink(): Promise<void> {
await Verifications.verifyVisible(
this.editEmailLink,
'Edit E-mail link',
);
}
/** Verifies that the Back link is displayed. */
async verifyBackLink(): Promise<void> {
await Verifications.verifyVisible(
this.backLink,
'Back link',
);
}
/** Verifies that the Enroll button is displayed. */
async verifyEnrollButton(): Promise<void> {
await Verifications.verifyVisible(
this.enrollButton,
'Enroll button',
);
}
/** Verifies that the enrollment terms and conditions message is displayed. */
async verifyEnrollmentTermsMessage(): Promise<void> {
await Verifications.verifyVisible(
this.enrollmentTermsMessage,
'Enrollment terms and conditions message',
);
}
/** Verifies that the gift card delivery notice is displayed. */
async verifyGiftCardDeliveryNotice(): Promise<void> {
await Verifications.verifyVisible(
this.giftCardDeliveryNotice,
'Gift card delivery notice',
);
}
/** Verifies that the enrollment modal is hidden. */
async verifyEnrollmentModalHidden(): Promise<void> {
await Verifications.verifyHidden(
this.enrollmentModal,
'Enrollment modal',
);
}
}

