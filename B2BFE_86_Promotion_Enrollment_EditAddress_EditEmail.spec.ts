import { describe, test, beforeEach, step } from '../../../fixtures/testBuilder';
import { TAG } from '../../../constants/testTags';
import { LOGIN_CREDENTIALS, PROMOTION_ENROLLMENT_DATA } from '../../../data/testData';

describe('[UI] Promotions Details Page - Promotion Enrollment (not enrolled)', () => {
beforeEach('Background: Login as a PRO user', async ({ loginPage }) => {
await step('Given I am a logged-in PRO user and not enrolled in the promotion', async () => {
await loginPage.launch();
await loginPage.loginByRole(LOGIN_CREDENTIALS.superUser);
});
});
test('Verify Promotion Enrollment page displays address and email details')
.tags(TAG.REGRESSION,TAG.SMOKE)
.id('PROTEST-7015')
.it(async ({ currentPromotionsPage, promotionEnrollmentPage }) => {
let enrollmentPage: ReturnType<typeof promotionEnrollmentPage>;
let promotionName: string;
await step('Given User is on the Promotion Enrollment page', async () => {
promotionName = await currentPromotionsPage.clickFirstNotEnrolledPromotion();
const promotionId = currentPromotionsPage.getPromotionIdFromUrl();
enrollmentPage = promotionEnrollmentPage(promotionId);
});
await step('Then promotion image, name, active dates, and category are displayed', async () => {
await enrollmentPage.verifyPromotionName(promotionName);
await enrollmentPage.verifyPromotionActiveDate();
});
await step('And saved shipping address is displayed in read-only format', async () => {
await enrollmentPage.verifyShippingAddress();
});
await step('And "Edit Address" link is displayed', async () => {
await enrollmentPage.verifyEditAddressLink();
});
await step('And saved email address is displayed in read-only format', async () => {
await enrollmentPage.verifyEmailAddress();
});
await step('And "Edit E-mail" link is displayed', async () => {
await enrollmentPage.verifyEditEmailLink();
});
await step('And "Enroll" button is displayed', async () => {
await enrollmentPage.verifyEnrollButton();
});
});

test('Verify User can edit and save shipping address')
.tags(TAG.REGRESSION)
.id('PROTEST-7016')
.id('PROTEST-7018')
.it(async ({ currentPromotionsPage, promotionEnrollmentPage, promotionDetailsPage }) => {
let enrollmentPage: ReturnType<typeof promotionEnrollmentPage>;
let detailsPage: ReturnType<typeof promotionDetailsPage>;
let promotionId = '';
await step('Given User is on the Promotion Enrollment page', async () => {
await currentPromotionsPage.clickFirstNotEnrolledPromotion();
promotionId = currentPromotionsPage.getPromotionIdFromUrl();
enrollmentPage = promotionEnrollmentPage(promotionId);
});
await step('When User selects "Edit Address"', async () => {
await enrollmentPage.clickEditAddress();
});
await step('Then editable address fields are displayed', async () => {
await enrollmentPage.verifyEditableAddressFields();
});
await step('When User enters valid address details', async () => {
await enrollmentPage.enterStreetAddress(PROMOTION_ENROLLMENT_DATA.shippingAddress.streetAddress);
await enrollmentPage.enterCity(PROMOTION_ENROLLMENT_DATA.shippingAddress.city);
await enrollmentPage.selectState(PROMOTION_ENROLLMENT_DATA.shippingAddress.state);
await enrollmentPage.enterZipCode(PROMOTION_ENROLLMENT_DATA.shippingAddress.zipCode);
});
await step('And User selects "Enroll"', async () => {
await enrollmentPage.clickEnroll();
detailsPage = promotionDetailsPage(promotionId);
});
await step('Then the email saved message is displayed', async () => {
await enrollmentPage.verifyShippingAddressSavedMessage();
});
await step('Then enrollment is completed successfully', async () => {
await detailsPage.verifyUnenrollButtonDisplayed();
});
});
test('Verify User can edit email address')
.tags(TAG.REGRESSION)
.id('PROTEST-7017')
.id('PROTEST-7018')
.it(async ({ currentPromotionsPage, promotionEnrollmentPage, promotionDetailsPage }) => {
let enrollmentPage: ReturnType<typeof promotionEnrollmentPage>;
let detailsPage: ReturnType<typeof promotionDetailsPage>;
let promotionId = '';
await step('Given User is on the Promotion Enrollment page', async () => {
await currentPromotionsPage.clickFirstNotEnrolledPromotion();
promotionId = currentPromotionsPage.getPromotionIdFromUrl();
enrollmentPage = promotionEnrollmentPage(promotionId);
});
await step('When User selects "Edit E-mail"', async () => {
await enrollmentPage.clickEditEmail();
});
await step('Then the email field is displayed', async () => {
await enrollmentPage.verifyEditableEmailAddressField();
});
await step('And the email helper text is displayed', async () => {
await enrollmentPage.verifyEmailAddressHelperText();
});
await step('When User enters an invalid email address', async () => {
await enrollmentPage.enterEmailAddress(PROMOTION_ENROLLMENT_DATA.email.dummyEmailAddress);
});
await step('Then the email field validation is displayed', async () => {
await enrollmentPage.verifyEmailAddressValidationMessage();
});
await step('When User enters a valid email address', async () => {
await enrollmentPage.enterEmailAddress(PROMOTION_ENROLLMENT_DATA.email.updatedEmailAddress);
});
await step('When User selects the available gift card', async () => {
await enrollmentPage.selectFirstAvailableGiftCard();
});
await step('When User selects the "Enroll" button', async () => {
await enrollmentPage.clickEnroll();
detailsPage = promotionDetailsPage(promotionId);
});
await step('Then the email saved message is displayed', async () => {
await enrollmentPage.verifyEmailAddressSavedMessage();
});
await step('And User is shown the enrolled Promotion Details page', async () => {
await detailsPage.verifyUnenrollButtonDisplayed();
});
});
test('Test-Verify Promotion Enrollment page displays correctly in Spanish')
.tags(TAG.REGRESSION)
.id('PROTEST-7019')
.it(async ({ currentPromotionsPage, promotionEnrollmentPage, navigationPage }) => {
let enrollmentPage: ReturnType<typeof promotionEnrollmentPage>;
await step('Given User has selected Spanish locale', async () => {
await navigationPage.clickFooterLink('Language Toggle');
await navigationPage.setLanguage('Spanish');
});
await step('And User is on the Promotion Enrollment page', async () => {
await currentPromotionsPage.clickFirstNotEnrolledPromotion();
const promotionId = currentPromotionsPage.getPromotionIdFromUrl();
enrollmentPage = promotionEnrollmentPage(promotionId);
});
await step('Then promotion details and all user-facing labels are displayed in Spanish', async () => {
await enrollmentPage.verifyPromotionEnrollmentTitleInSpanish();
await enrollmentPage.verifyGiftCardHeadingInSpanish();
});
await step('And Shipping Address and E-mail Address sections are displayed in Spanish', async () => {
await enrollmentPage.verifyShippingAddressHeadingInSpanish();
await enrollmentPage.verifyEmailAddressHeadingInSpanish();
});
await step('And "Edit Address", "Edit E-mail", "Back", and "Enroll" controls are displayed in Spanish', async () => {
await enrollmentPage.verifyEditEmailLinkInSpanish();
await enrollmentPage.verifyBackLinkInSpanish();
await enrollmentPage.verifyEnrollButtonInSpanish();
});
await step('And helper text is displayed in Spanish', async () => {
await enrollmentPage.verifyShippingHelperTextInSpanish();
await enrollmentPage.verifyEnrollmentTermsMessageInSpanish();
await enrollmentPage.verifyGiftCardDeliveryNoticeInSpanish();
});
});
});
