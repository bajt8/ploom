# Ploom E-commerce Test Automation

Automated testing suite for the Ploom e-commerce platform using Playwright. This project implements end-to-end tests for adding and removing items to the cart.

## 🚀 Features

- **Market-Specific Testing**: Supports multiple markets with market-specific configurations
- **Product Management Tests**: 
  - Add to cart functionality
  - Remove from cart functionality
- **Resource Verification**:
  - Broken links detection
  - Image loading verification

## 🛠️ Tech Stack

- [Playwright](https://playwright.dev/) - Modern web testing framework
- TypeScript - For type-safe test implementation
- Page Object Model - For maintainable test structure

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/bajt8/ploom.git
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🏃‍♂️ Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test testCase1.spec.ts
```

Run tests for specific market:
```bash
npx playwright test --project=uk
```

## 📁 Project Structure

<pre>
project-root/
│
├── src/
│   ├── pages/          # Page Object Models
│   ├── config/         # Market configurations
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
│
├── tests/
│   └── testCases/      # Test specifications
│
└── playwright.config.ts
</pre>

## 🧪 Test Cases

1. **Test Case 1**: Add to Cart
   - Verifies product can be added to cart
   - Checks mini cart quantity updates
   - Validates cart page state

2. **Test Case 2**: Remove from Cart
   - Verifies product removal functionality
   - Validates empty cart state
   - Checks mini cart updates

3. **Test Case 3**: Resource Verification
   - Checks for broken links
   - Validates product images

## 🚀 Future Improvements

### Reporting & Analytics
- [ ] Integrate Allure Report for better test visualization
  - Test execution history
  - Detailed test steps
  - Screenshots and video captures
  - Failure analysis
- [ ] Add HTML reporter for offline viewing
- [ ] Implement custom dashboard for test metrics

### CI/CD Integration
- [ ] Add GitHub Actions workflows
  - Automated test execution on PR
  - Scheduled test runs
  - Market-specific test execution
  - Test result publishing
- [ ] Implement parallel test execution
- [ ] Add Docker support for consistent test environment

### Test Coverage
- [ ] Add API testing layer
- [ ] Implement visual regression testing
- [ ] Add performance testing metrics
- [ ] Expand market coverage
- [ ] Add accessibility testing

### Code Quality
- [ ] Add ESLint configuration
- [ ] Implement Prettier for code formatting
- [ ] Add Husky for pre-commit hooks
- [ ] Improve TypeScript strict mode coverage

### Test Data Management
- [ ] Implement test data factories
- [ ] Create mock service workers for offline testing
- [ ] Add data cleanup procedures

### Documentation
- [ ] Add JSDoc documentation
- [ ] Create test case documentation generator

### Monitoring & Maintenance
- [ ] Add test flakiness detection
- [ ] Implement retry mechanisms for unstable tests
- [ ] Add test execution time monitoring
- [ ] Create automated dependency updates

### Development Experience
- [ ] Add VS Code debugging configurations
- [ ] Create custom Playwright snippets
- [ ] Add test generators
- [ ] Improve error messages and debugging info
