
---
name: playwright-framework
description: "Use when creating, reviewing, or extending Playwright TypeScript automation in this framework. Covers page objects, actions, smart actions, self-healing locators, waits, retries, Allure reporting, and web-first verification practices."
argument-hint: "Describe the Playwright page, test, action, or verification you want to implement"
---

# Playwright Automation Framework

## Purpose

Use this skill when working on the Playwright + TypeScript automation framework in this repository. Follow the existing page-object model, shared utilities, Allure reporting conventions, and condition-based synchronization patterns.

The framework provides:

- Playwright browser automation with TypeScript.
- Page objects and reusable widgets under `src/pages/**`.
- Shared actions, waits, retries, verifications, and locator healing under `qaa-playwright-utils/utils/**`.
- Allure-compatible reporting through `AllureLogger`.
- Fluent test/spec construction through the repository's builder and fixtures.

## Spec Authoring Contract

When creating or extending a test specification, use the repository's builder DSL. Import `describe`, `test`, `expect`, hooks, and `step` from `src/fixtures/testBuilder.ts`; do not import them directly from `@playwright/test` or `testFixtures`.

Before writing a new step body:

1. Read the applicable spec template and follow its header rules.
2. Search `src/pages/**`, widgets, fixtures, and shared services for an existing method.
3. Reuse existing page-object and fixture methods instead of adding selectors or inline browser interactions to the spec.
4. Keep each business action or assertion inside a named `step()` with meaningful wording.

The spec layer may use existing page objects, fixture methods, test data, test tags, and shared service singletons. It must not create or modify page objects, widgets, or `src/fixtures/testFixtures.ts` as part of test generation.

### Gherkin and BDD Mapping

Preserve the source wording and map constructs as follows:

| Gherkin | Playwright spec |
| --- | --- |
| `Feature: X` and its description | `describe('X', ...)` with the feature description retained verbatim in JSDoc above it |
| `Background:` | A named `beforeEach` containing one `step()` per Gherkin line |
| Common leading steps shared by every scenario | Hoist them into the existing `beforeEach`; do not duplicate them inside each test |
| `Scenario: X` | `test('X').tags(...).id('...').it(async ({ fixtures }) => ...)` |
| `Given`, `When`, `Then`, `And`, `But` | One `await step('<original keyword and wording>', async () => { ... })` |
| Docstrings and data tables | Typed constants in `src/data/testData.ts` |

Every Gherkin line must be represented exactly once. Preserve feature descriptions, scenario names, step keywords, and step wording; do not paraphrase, merge, or silently drop steps.

### Tags and Test IDs

- Map tags to constants from `src/constants/testTags.ts`, for example `.tags(TAG.SMOKE, TAG.NEGATIVE)`.
- Hoist feature-level tags and tags present on every scenario into one `commonTags` array, then spread it before scenario-specific tags.
- If a required tag is missing, confirm with the user before adding it. If the user declines, omit it and report the skipped tag.
- Map a JIRA tag such as `@TESTCOE-123` to `.id('TESTCOE-123')`.
- If no JIRA ID is supplied, use `TESTCOE-000` and explicitly flag the placeholder in the report.

### Scenario Outlines and Examples

Convert each `Scenario Outline` to its own typed data array in `src/data/testData.ts` and one loop in the spec:

```ts
for (const row of DATA.stockOrder.createFromCatalog) {
test(`Create a stock order from the catalog - ${row.vin}`).it(async ({ fixtures }) => {
await step(`And the user enters the VIN number "${row.vin}"`, async () => {
await fixtures.catalog.enterVin(row.vin);
});
});
}
```

Rules for Examples data:

- Create one typed array per `Scenario Outline`; never merge unrelated outline tables.
- Key each row by the Examples header, converted to camelCase. Map by header name, never by column position.
- Replace every `<placeholder>` in both step titles and step bodies with the matching row field.
- Keep surrounding wording, punctuation, and quotes unchanged when substituting placeholders.
- Include distinguishing row values in generated test titles so every test title is unique.
- Apply tags, IDs, and leading-step hoisting per outline. A hoisted step may reference `row` only when its value is valid for that row and scenario.

### Missing Page-Object Capability

Do not add page-object methods while generating a spec. If a required capability does not exist, keep the step and add a handover body:

```ts
await step('When the user opens the account menu', async () => {
// TODO(page-object handover): NavigationPage.openAccountMenu() - add the user-facing interaction
abort('Not implemented: When the user opens the account menu');
});
```

Import `abort` from `src/fixtures/testBuilder.ts`. The handover must include the suggested page-object method signature and what it needs to do. Selectors must never be placed in the spec. Backend or test-data setup should use the existing service singletons from `qaa-playwright-utils`.

### Spec Validation and Reporting

After generating or changing a spec:

1. Run `npx tsc --noEmit` and resolve type errors.
2. Run `npx playwright test --list --project=chromium` to confirm generated titles, tags, and IDs.
3. Do not execute the tests unless the user asks.
4. Report created or modified files, placeholder IDs, added or skipped tags, and every page-object handover with its suggested method signature.

Spec-generation quality checks:

- No `page.locator(...)` or other selectors appear in the spec.
- No files under `src/pages/**` or `src/fixtures/` are modified during spec generation.
- Imports use the builder, data, tag, service, and page-object APIs permitted by the repository template.
- Shared leading steps are hoisted once and are not repeated in tests.

## Core Rules

1. Prefer existing page-object methods and shared utilities before adding new code.
2. Keep selectors inside page objects or widgets. Tests should express business behavior, not locator details.
3. Prefer Playwright's default locators, especially role, label, text, and test-id locators.
4. Use web-first assertions and condition-based waits. Do not add fixed sleeps to hide synchronization problems.
5. Add Allure logging to new framework methods. Do not add duplicate logging around existing actions, waits, or verifications that already log.
6. Add JSDoc for public getters and reusable public methods.
7. Never use `force: true` to bypass actionability failures. An element that cannot be acted on is a test or application finding.
8. Keep mobile page objects and mobile widgets separate from desktop page objects and widgets.

## Locator and Self-Healing Strategy

Use a `Locator` whenever one reliable locator is available. When a controlled fallback is required, pass a `LocatorStrategy[]` to a smart action:

```ts
const submitButton = [
{ name: 'submit test id', selector: '[data-testid="submit"]' },
{ name: 'submit role', selector: (page) => page.getByRole('button', { name: 'Submit' }) },
];
```

`resolveSelfHealing` tries strategies in order and returns the first visible, stable element. The total timeout defaults to 15 seconds and is divided across strategies. The winning strategy is logged so fallback usage can be diagnosed and promoted to a stable primary locator later.

Self-healing rules:

- Provide at least one strategy.
- Put the preferred locator first.
- Use meaningful strategy names.
- Require stability by default; disable it only when there is a clear reason.
- Treat repeated fallback use as a locator maintenance signal, not as a reason to keep adding fallbacks indefinitely.

## Actions

Use the basic `Actions` helper for low-level operations when a page-object method needs them. Every action is wrapped in an Allure step.

Available operations include:

- `doubleClick(locator, description?)`
- `rightClick(locator, description?)`
- `hover(locator, description)`
- `focus(locator, description?)`
- `press(locator, key, description?)`
- `appendTextWithInterval(locator, text, description?)`
- `selectByLabel(locator, label, description?)`
- `selectByValue(locator, value, description?)`
- `selectByIndex(locator, index, description?)`
- `getSelectedOption(locator, description?)`
- `scrollToTop(page)`
- `scrollToBottom(page)`
- `scrollToElement(locator, description?)`
- `uploadFile(locator, filePath, description?)`

Use `appendTextWithInterval` only when append semantics are needed. For standard inputs it preserves the existing value; for editable non-input elements it falls back to sequential key presses.

## Smart Actions

Smart actions resolve plain locators or self-healing targets, verify actionability, perform the action, and report the result.

### `smartClick`

Use `smartClick(page, target, options?)` to:

1. Resolve the target.
2. Verify it is visible and enabled.
3. Click using Playwright actionability checks.
4. Optionally verify the expected result and retry the click.

Important options:

- `description`: human-readable report label.
- `expectAfter`: async verification of the click result.
- `attempts`: retry limit when `expectAfter` is provided; default is 2.
- `clickOptions`: Playwright click options.

### `smartFill`

Use `smartFill(page, target, value, options?)` to verify visibility and editability before filling. It clears existing content atomically and verifies the resulting value by default.

Important options:

- `description`: human-readable report label.
- `secret`: masks the value in reports; use for passwords, tokens, and other secrets.
- `verify`: disable only when value verification is inappropriate.
- `pressAfter`: press a key such as `Enter` or `Tab` after filling.

Never log secret values in clear text.

### `smartSelect`

Use `smartSelect(page, target, by, options?)` only for native `<select>` elements. It supports:

```ts
{ value: 'option-value' }
{ label: 'Visible option label' }
{ index: 0 }
```

The helper verifies visibility, enabled state, and the selected value by default. For custom dropdowns, compose smart clicks in the page object instead of using `selectOption`.

## Retries and Synchronization

### Retry actions

Use retries only for legitimate non-atomic flows where an action can succeed but its asynchronous side effect is not immediately observable. Do not use retries to conceal broken locators or race conditions.

- `retryUntil(action, until, options?)`: runs an action, verifies the result, and repeats when verification fails.
- `waitForCondition(probe, predicate, options?)`: polls a value until the predicate accepts it.
- `waitForCount(locator, predicate, options?)`: polls a locator count until the predicate accepts it.

`retryUntil` defaults to three attempts. `waitForCondition` and `waitForCount` default to a 15-second timeout.

### Wait strategies

Use waits to synchronize before an action. Use verifications to assert behavior after an action.

Element waits:

- `waitForVisible`
- `waitForHidden`
- `waitForAttached`
- `waitForDetached`
- `waitForEnabled`
- `waitForText`
- `waitForStable`
- `waitForLoaderToFinish`

Page and navigation waits:

- `waitForUrl`
- `waitForDomReady`
- `waitForPageCondition`
- `waitForNetworkIdle`

Network waits:

- `waitForResponseTo`
- `waitForRequestTo`

For request and response synchronization, register the wait before triggering the action:

```ts
const response = await waitForResponseTo(
page,
/\/api\/cart/,
() => cartPage.addItem(),
);
```

Use `waitForNetworkIdle` sparingly because polling SPAs may never become idle. Prefer a matching response wait or a wait tied to the actual UI state.

`waitForStable` uses repeated bounding-box polling to detect when animations or transitions have stopped. All waits are condition-based and must not use fixed delays.

## Allure Logging

`AllureLogger` is the framework's reporting helper:

- `indent(name, body)`: creates a collapsible Allure step around async work.
- `logMessage(message)`: records a zero-duration diagnostic step and writes to the console.
- `attach(name, content, contentType?)`: attaches JSON, text, snapshots, payloads, or other diagnostic content.

Calls are safe outside an Allure run and degrade to console logging. New reusable methods should wrap meaningful work in `AllureLogger.indent`. Existing utilities already provide logging, so callers should not add duplicate wrapper steps.

## Verifications

Use `Verifications` for reusable business-level assertions. They are built on Playwright's auto-retrying `expect` and are logged as Allure steps.

Available checks include:

- `verifyVisible`
- `verifyHidden`
- `verifyText`
- `verifyContainsText`
- `verifyAttribute`
- `verifyTitle`
- `verifyUrl`
- `verifyAccessibilitySnapshot`
- `verifyDownload`
- `verifyDownloadedFileExists`
- `verifyCheckedState`
- `verifySelectedOption`
- `verifySelectedOptionText`
- `verifyEnabled`
- `verifyDisabled`
- `verifyTrue`

Accessibility snapshot verification attaches the actual ARIA snapshot to Allure before comparing it with the expected snapshot. Download verification checks both download failure state and resolved file path when required.

## Page Objects and Tests

Page objects should own selectors and UI interactions. Test specifications should call page-object methods and describe outcomes.

When adding a page-object method:

1. Use the strongest available Playwright locator.
2. Compose existing smart actions, waits, and verifications where appropriate.
3. Add an Allure step only when the method introduces a new meaningful operation; do not duplicate utility logging.
4. Add JSDoc for public getters.
5. Keep the method focused on one business interaction or state transition.
6. Avoid exposing implementation-only selectors to tests.

For downloads, network events, loaders, animations, and SPA transitions, synchronize with the observable condition that represents the desired state.

## Data and Secrets

- Keep reusable test data in the repository's data modules rather than scattering literals across tests.
- Use the framework's environment configuration and service utilities for setup data.
- Mask passwords, tokens, and other secrets in Allure output.
- Never commit credentials or hard-code environment-specific secrets.

## Review Checklist

Before completing a change, confirm:

- The implementation uses existing framework utilities where applicable.
- Selectors remain in page objects or widgets.
- No fixed `waitForTimeout` calls were added.
- No `force: true` was added to bypass a real actionability issue.
- New actions and page-object methods have useful Allure reporting.
- Existing utility logging was not duplicated.
- Public getters and reusable methods have JSDoc.
- Native and custom dropdowns use the correct interaction strategy.
- Mobile code remains isolated from desktop code.
- New behavior is validated with the narrowest relevant Playwright test or typecheck.

## Do's and Don'ts

### Do

1. Use Playwright's default locators. If they are not suitable, use another clear and reliable locator strategy.
2. Add an Allure logger for new methods.
3. Always add JSDoc for getters.
4. Prefer condition-based synchronization and web-first assertions.
5. Give locators, waits, retries, and actions meaningful descriptions.

### Don't

1. Do not add an Allure logger when an existing verification, wait strategy, or action already provides the logging.
2. Do not use fixed sleeps to paper over synchronization issues.
3. Do not put selectors in test specifications.
4. Do not use `force: true` to bypass actionability checks.
5. Do not use `selectOption` for custom, non-native dropdowns.
6. Do not use broad network-idle waits when a specific UI or network condition is available.
7. Do not add extra `*` in JSDoc, as it will increase the code size.

   Example:

   ```ts
   /**
    * Verifies that the specified promotion displays progress tracking.
    *
    * @param promotionName - Name of the promotion to verify.
    */
   ```
8. Do not add empty lines between methods, getters, or test steps, as this will increase the code size.



