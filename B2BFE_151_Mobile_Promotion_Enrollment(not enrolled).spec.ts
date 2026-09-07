import { describe, test, beforeEach, step } from '../../../fixtures/testBuilder';
import { TAG } from '../../../constants/testTags';
import { LOGIN_CREDENTIALS } from '../../../data/testData';

describe('[UI] Promotions Details Page - Promotion Enrollment (not enrolled)', () => {
beforeEach('Background: Login as a PRO user', async ({ loginPage }) => {
await step('Given I am a logged-in PRO user and not enrolled in the promotion', async () => {
await loginPage.launch();
await loginPage.loginByRole(LOGIN_CREDENTIALS.superUser);
});
});
test('Mobile-Verify Promotion Enrollment page displays all required elements')
.tags(TAG.REGRESSION, TAG.SMOKE)
.id('PROTEST-6809')
.it(async ({ currentPromotionsPage, promotionEnrollmentPage }) => {
let enrollmentPage: ReturnType<typeof promotionEnrollmentPage>;
let promotionName: string;
await step('Given User is on the Promotion Enrollment page', async () => {
promotionName = await currentPromotionsPage.clickFirstNotEnrolledPromotion();
const promotionId = currentPromotionsPage.getPromotionIdFromUrl();
enrollmentPage = promotionEnrollmentPage(promotionId);
});
await step('Then promo image, promo name, active dates, and short description are displayed', async () => {
await enrollmentPage.verifyPromotionName(promotionName);
await enrollmentPage.verifyPromotionActiveDate();
});
await step('And Shipping Address section displays the current address', async () => {
await enrollmentPage.verifyShippingAddress();
await enrollmentPage.verifyCurrentMailingAddressNotice();
});
await step('And E-mail Address section displays the current email', async () => {
await enrollmentPage.verifyEmailAddress();
});
await step('And "Edit E-mail" link is displayed', async () => {
await enrollmentPage.verifyEditEmailLink();
});
await step('And "Back" link and "Enroll" button are displayed', async () => {
await enrollmentPage.verifyBackLink();
await enrollmentPage.verifyEnrollButton();
});
await step('And enroll helper text is displayed', async () => {
await enrollmentPage.verifyEnrollmentTermsMessage();
});
});
test('Mobile-Verify User can navigate back from Promotion Enrollment page')
.tags(TAG.REGRESSION)
.id('PROTEST-6810')
.it(async ({ currentPromotionsPage, promotionEnrollmentPage }) => {
let enrollmentPage: ReturnType<typeof promotionEnrollmentPage>;
await step('Given User is on the Promotion Enrollment page', async () => {
await currentPromotionsPage.clickFirstNotEnrolledPromotion();
const promotionId = currentPromotionsPage.getPromotionIdFromUrl();
enrollmentPage = promotionEnrollmentPage(promotionId);
});
await step('When User selects the "Back" link', async () => {
await enrollmentPage.clickBack();
});
await step('Then User is returned to the previous promotions list or detail page', async () => {
await currentPromotionsPage.verifyPromotionsNavigationItemHighlighted('Current Promotions');
});
});
test('Mobile-Verify User can successfully enroll in a promotion')
.tags(TAG.REGRESSION)
.id('PROTEST-6811')
.it(async ({ currentPromotionsPage, promotionEnrollmentPage, promotionDetailsPage }) => {
let enrollmentPage: ReturnType<typeof promotionEnrollmentPage>;
let detailsPage: ReturnType<typeof promotionDetailsPage>;
let promotionId = '';
await step('Given User is on the Promotion Enrollment page with required information available', async () => {
await currentPromotionsPage.clickFirstNotEnrolledPromotion();
promotionId = currentPromotionsPage.getPromotionIdFromUrl();
enrollmentPage = promotionEnrollmentPage(promotionId);
});
await step('When User selects the available gift card', async () => {
await enrollmentPage.selectFirstAvailableGiftCard();
});
await step('When User selects the "Enroll" button', async () => {
await enrollmentPage.clickEnroll();
detailsPage = promotionDetailsPage(promotionId);
});
await step('And User is shown the enrolled Promotion Details page', async () => {
await detailsPage.verifyUnenrollButtonDisplayed();
});
});
test('Mobile-Verify Promotion Enrollment page displays correctly in Spanish')
.tags(TAG.REGRESSION)
.id('PROTEST-6812')
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


