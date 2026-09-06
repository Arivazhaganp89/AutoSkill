import { describe, test, beforeEach, step } from '../../../fixtures/testBuilder';
import { TAG } from '../../../constants/testTags';
import { LOGIN_CREDENTIALS, VEHICLE } from '../../../data/testData';

describe('Shop Switch Confirmation Modal UI', () => {
    beforeEach('Background: Login and add a product to the worksheet', async ({ loginPage, catalogLookUpPage }) => {
        await step('Given User is on the Landing page', async () => {
            await loginPage.launch();
            await loginPage.loginByRole(LOGIN_CREDENTIALS.superUser);
        });
        await step('And User has added a product to the worksheet', async () => {
            await catalogLookUpPage.enterVin(VEHICLE.vin);
            await catalogLookUpPage.clickGoButton();
        });
    });

    test('Verify error toast and shop context after Shop Selection API failure')
        .tags(TAG.REGRESSION, TAG.SMOKE)
        .id('PROTEST-6456')
        .id('PROTEST-6461')
        .it(async ({ shopSwitchPage }) => {
            let previousShopName: string;
            await step('Given User is on a GCP page with the shop selector in the header', async () => {
                previousShopName = await shopSwitchPage.getSelectedShopName();
            });
            await step('When User attempts to switch to a different shop', async () => {
                await shopSwitchPage.clickShopSelectionInput();
            });
            await step('And Shop Selection API returns a failure response', async () => {
                await shopSwitchPage.mockShopSelectionApiFailure();
                await shopSwitchPage.selectAnotherShop();
            });
            await step('Then error toast should display the shop selection failure message', async () => {
                await shopSwitchPage.verifyShopSelectionFailureToastMessage();
            });
            await step('And the toast should include a close icon', async () => {
                await shopSwitchPage.verifyShopSelectionFailureToastCloseIcon();
            });
            await step('And the previously selected shop should remain displayed in the header', async () => {
                await shopSwitchPage.verifySelectedShop(previousShopName);
            });
            await step('And shop context should not be changed', async () => {
                await shopSwitchPage.verifyShopContextUnchanged(previousShopName);
            });
        });
        });
});

