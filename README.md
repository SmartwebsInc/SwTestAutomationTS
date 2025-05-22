# SwTestAutomationTS - Playwright Test Automation Framework

This repository contains an end-to-end test automation framework built with Playwright and TypeScript. It is designed to test a web application with various modules such as Accounting, Violations, Work Orders, and more.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)

## 📋 Prerequisites

To work with this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v16 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended editor)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd SwTestAutomationTS
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will also install Playwright and the Chromium browser through the postinstall script.

3. **Set up environment variables**

   Create a `.env` file in the root directory

4. **Run the setup to install browsers**

   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Basic Test Execution

Run all tests in headless mode:

```bash
npx playwright test
```

Run tests in a specific file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests that match a specific title (using grep):

```bash
npx playwright test -g "login test"
```

### UI Mode

Open Playwright's UI mode for interactive testing:

```bash
npx playwright test --ui
```

### Debugging

Run tests with debugging enabled:

```bash
npx playwright test --debug
```

Run tests with headed browsers (to see the browser window):

```bash
npx playwright test --headed
```

### Parallelization

Control the number of parallel workers:

```bash
npx playwright test --workers=3
```

Run tests sequentially (one at a time):

```bash
npx playwright test --workers=1
```

### Test Retries

Run tests with retry attempts for flaky tests:

```bash
npx playwright test --retries=2
```

### Combined Options

You can combine multiple options:

```bash
npx playwright test --repeat-each 1 --workers 3 -g "QWERTY"
```

## 🤝 Contributing

To contribute to this project, please follow these steps:

1. **Update your local repository**

   ```bash
   git pull origin main
   ```

2. **Create a new branch for your feature**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit them**

   ```bash
   # Before committing, run the linter to fix common issues
   npm run lint:fix

   git add .
   git commit -m "Add descriptive message about your changes"
   ```

4. **Push your branch to the remote repository**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

   - Go to the repository on GitHub
   - Click on "Pull Requests" > "New Pull Request"
   - Select your branch and provide a clear description of your changes
   - Request a review from team members

6. **Address review comments**
   - Make any requested changes
   - Run `npm run lint:fix` again if needed
   - Push additional commits to the same branch

Once your PR is approved, it will be merged into the main branch.

## ✏️ Writing Tests

### Page Object Model

All tests must follow the Page Object Model (POM) pattern:

- Create reusable page objects in `e2e` folder
- Keep selectors and page interactions encapsulated within page classes
- Tests should only interact with pages through their public methods

### Test Independence

Tests must be completely independent from each other:

- No test should depend on the state from a previous test
- Each test should set up its own preconditions
- Clean up any created data after test completion

### Stability Requirements

Tests must be stable and not flaky:

- Tests should pass consistently when run multiple times
- All tests must pass when run with maximum parallelization (20 workers)
- Minimal amount of Explicit Wait

### Test Structure

Structure your tests with proper organization:

```typescript
test.describe('Feature name', () => {
    test.beforeEach(async ({ page }) => {
        // Setup code
    });

    test('should perform specific action successfully', async ({ page }) => {
        // Arrange
        // Act
        // Assert
        await test.step('If test is complex add steps', async () => {
        }
    });
});
```
