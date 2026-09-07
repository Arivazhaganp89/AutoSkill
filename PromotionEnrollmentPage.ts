import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { smartClick, smartFill, smartSelect } from '../../../qaa-playwright-utils/utils/actions';
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
/**
* Gets the promotion name.
* @param {string} expectedPromotionName - The expected promotion name.
*/
getPromotionName(expectedPromotionName: string): Locator {
return this.page.getByRole('heading', {
name: expectedPromotionName,
exact: true,
});
}
/** Gets the promotion active date. */
get promotionActiveDate(): Locator {
return this.page.locator('div.text-xs').filter({ hasText: 'Active:' });
}
/// region- Shipping Address-----------------------
/** Gets the Shipping Address section heading. */
get shippingAddressHeading(): Locator {
return this.page.getByText('Shipping Address', { exact: true });
}
/** Gets the current shipping address. */
get shippingAddress(): Locator {
return this.page.locator('address');
}
/** Gets the current shipping city. */
get currentShippingCity(): Locator {
return this.page.locator('.current-city');
}

/** Gets the current shipping state. */
get currentShippingState(): Locator {
return this.page.locator('.current-state');
}

/** Gets the current shipping ZIP code. */
get currentShippingZip(): Locator {
return this.page.locator('.current-zip');
}
/** Gets the current USPS mailing address notice. */
get currentMailingAddressNotice(): Locator {
return this.page.getByText(
"Your current USPS mailing address on file is above. If this is incorrect, please contact your O'Reilly Auto Parts sales representative. We cannot ship to P.O. Boxes.",
{ exact: true }
);
}
/**
* Gets the shipping address saved confirmation message.
* @returns {Locator} The shipping address saved confirmation message.
*/
get shippingAddressSavedMessage(): Locator {
return this.page.getByText('Shipping address saved.', {
exact: true,
});
}
/// region- E-mail Address-----------------------
/** Gets the E-mail Address section heading. */
get emailAddressHeading(): Locator {
return this.page.getByText('E-mail Address', { exact: true });
}
/** Gets the current e-mail address. */
get emailAddress(): Locator {
return this.emailAddressHeading.locator('..').getByText('test@test.com', { exact: true });
}
/** Gets the Edit E-mail link. */
get editEmailLink(): Locator {
return this.page.getByRole('link', { name: 'Edit E-mail', exact: true });
}
/**
* Gets the editable E-mail Address field.
* @returns {Locator} The editable E-mail Address field.
*/
get editableEmailAddressField(): Locator {
return this.page.locator('#emailAddress');
}
/**
* Gets the E-mail address saved confirmation message.
* @returns {Locator} The E-mail address saved confirmation message.
*/
get emailAddressSavedMessage(): Locator {
return this.page.getByText('E-mail address saved.', {
exact: true,
});
}
/**
* Gets the E-mail Address validation message.
* @returns {Locator} The E-mail Address validation message.
*/
get emailAddressValidationMessage(): Locator {
return this.page.getByText('The E-mail Address field must be a valid email', { exact: true });
}
/**
* Gets the E-mail Address helper text.
* @returns {Locator} The E-mail Address helper text.
*/
get emailAddressHelperText(): Locator {
return this.page.getByText('Any edits made here will be made to the e-mail address tied to your user preferences.', { exact: true });
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
/// region-Edit Address-----------
/**
* Gets the Edit Address link.
* @returns {Locator} The Edit Address link.
*/
get editAddressLink(): Locator {
return this.page.getByRole('link', {
name: 'Edit Address',
exact: true,
});
}
/**
* Gets the Attention To field.
* @returns {Locator} The Attention To field.
*/
get attentionToField(): Locator {
return this.page.locator('#editAddressAttnTo');
}
/**
* Gets the Street Address field.
* @returns {Locator} The Street Address field.
*/
get streetAddressField(): Locator {
return this.page.locator('#editAddressStreet');
}
/**
* Gets the City field.
* @returns {Locator} The City field.
*/
get cityField(): Locator {
return this.page.locator('#editAddressCity');
}
/**
* Gets the State field.
* @returns {Locator} The State field.
*/
get stateField(): Locator {
return this.page.locator('#editAddressState');
}
/**
* Gets the Zip Code field.
* @returns {Locator} The Zip Code field.
*/
get zipCodeField(): Locator {
return this.page.locator('#editAddressZip');
}
/// region- Spanish Localization Getters-----------------------
/** Promotion enrollment page title in Spanish. */
get promotionEnrollmentTitleInSpanish(): Locator {
return this.page.getByText("Participar en esta promoción O'Reilly Pro", { exact: true });
}
/**
* Gets the gift card heading in Spanish.
* @returns {Locator} The gift card heading displayed in Spanish.
*/
get giftCardHeadingInSpanish(): Locator {
return this.page.locator('h2').filter({
hasText: /Tarjeta de regalo:|Seleccione una tarjeta de regalo/,
});
}
/** Shipping Address heading displayed in Spanish. */
get shippingAddressHeadingInSpanish(): Locator {
return this.page.getByRole('heading', {
name: /^Dirección de envío/,
});
}
/** Shipping address helper text in Spanish. */
get shippingHelperTextInSpanish(): Locator {
return this.page.getByText(
"Esta es la dirección de correo de USPS que aparece en nuestro archivo. Si esta dirección es incorrecta contacte a su representante de ventas de O'Reilly Auto Parts.*",
{ exact: true }
);
}
/** E-mail Address heading displayed in Spanish. */
get emailAddressHeadingInSpanish(): Locator {
return this.page.getByText('Dirección de correo electrónico', {
exact: true,
});
}
/** Edit email link in Spanish. */
get editEmailLinkInSpanish(): Locator {
return this.page.getByRole('link', {
name: 'Cambiar la dirección de correo electrónico',
exact: true,
});
}
/** Back link in Spanish. */
get backLinkInSpanish(): Locator {
return this.page.getByRole('link', {
name: 'Volver atrás',
exact: true,
});
}
/** Enroll button in Spanish. */
get enrollButtonInSpanish(): Locator {
return this.page.getByRole('button', {
name: 'Participar',
exact: true,
});
}
/** Enrollment terms message in Spanish. */
get enrollmentTermsMessageInSpanish(): Locator {
return this.page.getByText('*Al hacer click en participar aceptas los terminos y condiciones.', { exact: true });
}
/** Gift card delivery notice in Spanish. */
get giftCardDeliveryNoticeInSpanish(): Locator {
return this.page.getByText(
"*Las tarjetas de regalo de las promociones serán enviadas a la dirección del cliente que aparece en el archivo. Si necesita actualizar su dirección, contacte a su tienda local O'Reilly.",
{ exact: true }
);
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
/// region -gift card selection-----------------
/**
* Gets the available gift cards.
* @returns {Locator} The available gift cards.
*/
get availableGiftCards(): Locator {
return this.page.locator('a.gift-card, img.gift-card');
}
/**
* Enters the specified E-mail Address.
* @param {string} emailAddress - The E-mail Address to enter.
*/
async enterEmailAddress(emailAddress: string): Promise<void> {
await smartFill(this.page, this.editableEmailAddressField, emailAddress, {
description: 'E-mail Address',
});
}
/**
* Selects the first available gift card.
* @returns {Promise<void>} Resolves when the first available gift card is selected.
*/
async selectFirstAvailableGiftCard(): Promise<void> {
await smartClick(this.page, this.availableGiftCards.first(), {
description: 'first available gift card',
});
}
/**
* Opens the editable shipping address fields.
* @returns {Promise<void>} Resolves when the Edit Address link is selected.
*/
async clickEditAddress(): Promise<void> {
await smartClick(this.page, this.editAddressLink, {
description: 'Edit Address',
});
}
/**
* Enters the Attention To value.
* @param {string} attentionTo - The Attention To value to enter.
*/
async enterAttentionTo(attentionTo: string): Promise<void> {
await smartFill(this.page, this.attentionToField, attentionTo, {
description: 'Attention To',
});
}
/**
* Enters the Street Address.
* @param {string} streetAddress - The Street Address to enter.
*/
async enterStreetAddress(streetAddress: string): Promise<void> {
await smartFill(this.page, this.streetAddressField, streetAddress, {
description: 'Street Address',
});
}
/**
* Enters the City.
* @param {string} city - The City to enter.
*/
async enterCity(city: string): Promise<void> {
await smartFill(this.page, this.cityField, city, {
description: 'City',
});
}
/**
* Selects the specified State.
* @param {string} state - The State label to select.
*/
async selectState(state: string): Promise<void> {
await smartSelect(
this.page,
this.stateField,
{ label: state },
{
description: 'State',
}
);
}
/**
* Enters the Zip Code.
* @param {string} zipCode - The Zip Code to enter.
*/
async enterZipCode(zipCode: string): Promise<void> {
await smartFill(this.page, this.zipCodeField, zipCode, {
description: 'Zip Code',
});
}
/// region- Verifications-----------------------
/** Verifies that the Promotions navigation title is displayed. */
async verifyPromotionsNavigationTitle(): Promise<void> {
await Verifications.verifyVisible(this.promotionsNavigationTitle, 'Promotions navigation title');
}
/** Verifies that the Current Promotions navigation link is displayed. */
async verifyCurrentPromotionsLink(): Promise<void> {
await Verifications.verifyVisible(this.currentPromotionsLink, 'Current Promotions navigation link');
}
/** Verifies that the Past Promotions navigation link is displayed. */
async verifyPastPromotionsLink(): Promise<void> {
await Verifications.verifyVisible(this.pastPromotionsLink, 'Past Promotions navigation link');
}
/** Verifies that the Promotion Enrollment page title is displayed. */
async verifyPromotionEnrollmentPageTitle(): Promise<void> {
await Verifications.verifyVisible(this.promotionEnrollmentPageTitle, "O'Reilly Pro Promotion Enrollment page title");
}
/**
/**
* Verifies that the promotion name is displayed.
* @param {string} expectedPromotionName - The expected promotion name.
*/
async verifyPromotionName(expectedPromotionName: string): Promise<void> {
await Verifications.verifyVisible(this.getPromotionName(expectedPromotionName), 'Promotion name');
}
/** Verifies that the promotion active date is displayed. */
async verifyPromotionActiveDate(): Promise<void> {
await Verifications.verifyVisible(this.promotionActiveDate, 'Promotion active date');
}
/** Verifies that the Shipping Address section is displayed. */
async verifyShippingAddressHeading(): Promise<void> {
await Verifications.verifyVisible(this.shippingAddressHeading, 'Shipping Address section heading');
}
/** Verifies that the current shipping address is displayed with city, state, and ZIP code. */
async verifyShippingAddress(): Promise<void> {
await Verifications.verifyVisible(this.shippingAddress, 'Shipping address');
await Verifications.verifyVisible(this.currentShippingCity, 'Current shipping city');
await Verifications.verifyVisible(this.currentShippingState, 'Current shipping state');
await Verifications.verifyVisible(this.currentShippingZip, 'Current shipping ZIP code');
}
/** Verifies that the current USPS mailing address notice is displayed. */
async verifyCurrentMailingAddressNotice(): Promise<void> {
await Verifications.verifyVisible(this.currentMailingAddressNotice, 'Current USPS mailing address notice');
}
/** Verifies that the E-mail Address section is displayed. */
async verifyEmailAddressHeading(): Promise<void> {
await Verifications.verifyVisible(this.emailAddressHeading, 'E-mail Address section heading');
}
/** Verifies that the e-mail address is displayed. */
async verifyEmailAddress(): Promise<void> {
await Verifications.verifyVisible(this.emailAddress, 'E-mail address');
}
/** Verifies that the Edit E-mail link is displayed. */
async verifyEditEmailLink(): Promise<void> {
await Verifications.verifyVisible(this.editEmailLink, 'Edit E-mail link');
}
/** Verifies that the Back link is displayed. */
async verifyBackLink(): Promise<void> {
await Verifications.verifyVisible(this.backLink, 'Back link');
}
/** Verifies that the Enroll button is displayed. */
async verifyEnrollButton(): Promise<void> {
await Verifications.verifyVisible(this.enrollButton, 'Enroll button');
}
/** Verifies that the enrollment terms and conditions message is displayed. */
async verifyEnrollmentTermsMessage(): Promise<void> {
await Verifications.verifyVisible(this.enrollmentTermsMessage, 'Enrollment terms and conditions message');
}
/** Verifies that the gift card delivery notice is displayed. */
async verifyGiftCardDeliveryNotice(): Promise<void> {
await Verifications.verifyVisible(this.giftCardDeliveryNotice, 'Gift card delivery notice');
}
/** Verifies that the enrollment modal is hidden. */
async verifyEnrollmentModalHidden(): Promise<void> {
await Verifications.verifyHidden(this.enrollmentModal, 'Enrollment modal');
}
/**
* Verifies that the editable E-mail Address field is displayed.
* @returns {Promise<void>} Resolves when the editable E-mail Address field is visible.
*/
async verifyEditableEmailAddressField(): Promise<void> {
await Verifications.verifyVisible(this.editableEmailAddressField, 'Editable E-mail Address field');
}
/**
* Verifies that the E-mail address saved confirmation message is displayed.
* @returns {Promise<void>} Resolves when the E-mail address saved confirmation message is visible.
*/
async verifyEmailAddressSavedMessage(): Promise<void> {
await Verifications.verifyVisible(this.emailAddressSavedMessage, 'E-mail address saved confirmation message');
}
/**
* Verifies that the E-mail Address validation message is displayed.
* @returns {Promise<void>} Resolves when the E-mail Address validation message is visible.
*/
async verifyEmailAddressValidationMessage(): Promise<void> {
await Verifications.verifyVisible(this.emailAddressValidationMessage, 'E-mail Address validation message');
}

/// region- Spanish Localization Verifications-----------------------
/**
* Verifies that the promotion enrollment title is displayed in Spanish.
* @returns {Promise<void>} Resolves when the promotion enrollment title is displayed.
*/
async verifyPromotionEnrollmentTitleInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.promotionEnrollmentTitleInSpanish, 'Promotion enrollment title in Spanish');
}
/**
* Verifies that the gift card heading is displayed in Spanish.
* @returns {Promise<void>} Resolves when the gift card heading is displayed.
*/
async verifyGiftCardHeadingInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.giftCardHeadingInSpanish, 'Gift card heading in Spanish');
}
/**
* Verifies that the shipping address heading is displayed in Spanish.
* @returns {Promise<void>} Resolves when the shipping address heading is displayed.
*/
async verifyShippingAddressHeadingInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.shippingAddressHeadingInSpanish, 'Shipping address heading in Spanish');
}
/**
* Verifies that the shipping helper text is displayed in Spanish.
* @returns {Promise<void>} Resolves when the shipping helper text is displayed.
*/
async verifyShippingHelperTextInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.shippingHelperTextInSpanish, 'Shipping helper text in Spanish');
}
/**
* Verifies that the email address heading is displayed in Spanish.
* @returns {Promise<void>} Resolves when the email address heading is displayed.
*/
async verifyEmailAddressHeadingInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.emailAddressHeadingInSpanish, 'Email address heading in Spanish');
}
/**
* Verifies that the edit email link is displayed in Spanish.
* @returns {Promise<void>} Resolves when the edit email link is displayed.
*/
async verifyEditEmailLinkInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.editEmailLinkInSpanish, 'Edit email link in Spanish');
}
/**
* Verifies that the back link is displayed in Spanish.
* @returns {Promise<void>} Resolves when the back link is displayed.
*/
async verifyBackLinkInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.backLinkInSpanish, 'Back link in Spanish');
}
/**
* Verifies that the enroll button is displayed in Spanish.
* @returns {Promise<void>} Resolves when the enroll button is displayed.
*/
async verifyEnrollButtonInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.enrollButtonInSpanish, 'Enroll button in Spanish');
}
/**
* Verifies that the enrollment terms message is displayed in Spanish.
* @returns {Promise<void>} Resolves when the enrollment terms message is displayed.
*/
async verifyEnrollmentTermsMessageInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.enrollmentTermsMessageInSpanish, 'Enrollment terms message in Spanish');
}
/**
* Verifies that the gift card delivery notice is displayed in Spanish.
* @returns {Promise<void>} Resolves when the gift card delivery notice is displayed.
*/
async verifyGiftCardDeliveryNoticeInSpanish(): Promise<void> {
await Verifications.verifyVisible(this.giftCardDeliveryNoticeInSpanish, 'Gift card delivery notice in Spanish');
}
/**
* Verifies the Edit Address link is displayed.
* @returns {Promise<void>} Resolves when the Edit Address link is visible.
*/
async verifyEditAddressLink(): Promise<void> {
await Verifications.verifyVisible(this.editAddressLink, 'Edit Address link');
}
/**
* Verifies that the E-mail Address helper text is displayed.
* @returns {Promise<void>} Resolves when the E-mail Address helper text is visible.
*/
async verifyEmailAddressHelperText(): Promise<void> {
await Verifications.verifyVisible(this.emailAddressHelperText, 'E-mail Address helper text');
}
/**
* Verifies that the editable shipping address fields are displayed.
* @returns {Promise<void>} Resolves when all editable shipping address fields are visible.
*/
async verifyEditableAddressFields(): Promise<void> {
await Verifications.verifyVisible(this.attentionToField, 'Attention To field');
await Verifications.verifyVisible(this.streetAddressField, 'Street Address field');
await Verifications.verifyVisible(this.cityField, 'City field');
await Verifications.verifyVisible(this.stateField, 'State field');
await Verifications.verifyVisible(this.zipCodeField, 'Zip Code field');
}
/**
* Verifies that the shipping address saved confirmation message is displayed.
* @returns {Promise<void>} Resolves when the shipping address saved confirmation message is visible.
*/
async verifyShippingAddressSavedMessage(): Promise<void> {
await Verifications.verifyVisible(this.shippingAddressSavedMessage, 'Shipping address saved confirmation message');
}
}
