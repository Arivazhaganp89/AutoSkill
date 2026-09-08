import { expect, type Locator, type Page } from '@playwright/test';
import { AllureLogger } from '../../../qaa-playwright-utils/utils/allureLogger';
import { resolveSelfHealing, type LocatorStrategy } from '../../../qaa-playwright-utils/utils/selfHealingLocator';
import { Verifications } from '../../../qaa-playwright-utils/utils/verifications';

/**
* Base page object. Page objects own locators + user actions;
* assertions live in tests via qaa-playwright-utils/utils/verifications.ts.
*/
export abstract class BasePage {
/**
* Create a page object bound to the given Playwright page and path.
* @param {Page} page - Playwright page this page object operates on.
* @param {string} path - Path relative to baseURL, e.g. '/' or '/docs/intro'.
*/
protected constructor(
readonly page: Page,
protected readonly path: string,
) {}

/** Navigate to this page and wait for it to be ready (override isLoaded for page-specific readiness). */
async open(): Promise<void> {
await AllureLogger.indent(`Open ${this.constructor.name} (${this.path})`, async () => {
await this.page.goto(this.path);
});
}

/**
* Resolve an element through ordered fallback strategies (self-healing).
* @param {LocatorStrategy[]} strategies - Ordered locator strategies to try until one resolves.
* @returns {Promise<Locator>} The Locator produced by the first strategy that resolves.
*/
protected healingLocator(strategies: LocatorStrategy[]): Promise<Locator> {
return resolveSelfHealing(this.page, strategies);
}

/** Wait for the DOM to be parsed after a navigation-triggering action. */
protected async waitForReady(): Promise<void> {
await this.page.waitForLoadState('domcontentloaded');
}

/**
* Assert the URL contains the fragment (strings are escaped -> "contains" semantics).
* @param {string | RegExp} expected - Substring (escaped for "contains" matching) or RegExp the current URL must satisfy.
*/
async verifyUrlContains(expected: string | RegExp): Promise<void> {
await AllureLogger.indent(`Verify URL contains ${expected}`, async () => {
const pattern = typeof expected === 'string' ? new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) : expected;
await Verifications.verifyUrl(this.page, pattern);
});
}

/**
* Assert numeric value (or locator count) is greater than the expected threshold.
* @param {number | Locator} value - Numeric value or locator whose count is checked.
* @param {string} [valueName] - Label used in the assertion message.
* @param {number} [expected] - Minimum threshold that must be exceeded.
*/
async verifyGreaterThanZero(value: number | Locator, valueName = 'value', expected = 0): Promise<void> {
await AllureLogger.indent(`Verify ${valueName} is greater than ${expected}`, async () => {
const rowCount = typeof value === 'number' ? value : await value.count();
expect(rowCount, `${valueName} should be greater than ${expected} (actual: ${rowCount})`).toBeGreaterThan(expected);
});
}

/**
* Verify that an input-like control has a value.
* @param {Locator} locator - Input-like control to inspect.
* @param {string} [description] - Label used in the assertion message.
*/
async verifyInputNotEmpty(locator: Locator, description = 'input field'): Promise<void> {
await AllureLogger.indent(`Verify ${description} is not empty`, async () => {
await expect(locator, `Expected ${description} to have a value.`).not.toHaveValue('');
});
}

/**
* Verify that an input-like control has no value.
* @param {Locator} locator - Input-like control to inspect.
* @param {string} [description] - Label used in the assertion message.
*/
async verifyEmpty(locator: Locator, description = 'input field'): Promise<void> {
await AllureLogger.indent(`Verify ${description} is empty`, async () => {
await expect(locator, `Expected ${description} to be empty.`).toHaveValue('');
});
}

/**
* Assert that a value is not null.
* @param {unknown} actual - Value to inspect.
* @param {string} description - Label used in the assertion message.
*/
async verifyNotNull(actual: unknown, description: string): Promise<void> {
await AllureLogger.indent(`Verify ${description} is not null`, () => {
expect(actual, description).not.toBeNull();
return Promise.resolve();
});
}

/**
* Assert that text matches the expected pattern.
* @param {string | null} actual - Text value to inspect.
* @param {RegExp} expected - Pattern the text must match.
* @param {string} description - Label used in the assertion message.
*/
async verifyMatches(actual: string | null, expected: RegExp, description: string): Promise<void> {
await AllureLogger.indent(`Verify ${description} matches ${expected}`, () => {
expect(actual, description).toMatch(expected);
return Promise.resolve();
});
}
}
