# Code Review: Littlefoot.js

## Team 06: Sin Nombre

---

### 1. Functionality

#### Review Criteria:

- Does the code implement the intended functionality?
- Are all the requirements met?
- Are edge cases and potential error scenarios handled appropriately?
- Is the code’s behavior consistent with the project’s specifications?

#### Analysis:

- Littlefoot.js successfully implements its core functionality of creating interactive footnote popups.
- The library replaces traditional end-of-article footnotes with tappable buttons that display content in popover dialogs below the relevant context.
- Its interface is responsive and styled for both desktop and mobile devices, ensuring a consistent UI/UX across multiple platforms.
- The code allows customization via various options, such as activation delay, dismissal behavior, and hover interactions.
- It also supports multiple footnotes on a single page and handles duplicate footnotes depending on the configuration options.
- The library is very versatile and follows a framework agnostic approach, as it integrates well with vanilla javascript as well as frameworks like Gatsby and CMS like WordPress.
- It can be downloaded and used locally, or can be imported from a CDN, thus providing flexibility.
- It provides theming support through CSS custom properties, allowing for easy visual customization.
- Littlefoot.js is a lightweight solution, with the latest version (4.0.0) having a bundle size of under 1MB.
- Littlefoot.js properly handles footnote activation, dismissal, and styling, fulfilling its primary purpose of enhancing the footnote reading experience
- Cross-browser compatibility is achieved, as the library supports modern browsers including Chrome, Firefox, Safari, and Edge.
- The code meets accessibility requirements by implementing proper ARIA attributes and keyboard navigation.
- The library meets the requirement of being framework-agnostic, working well with vanilla JavaScript and various content management systems.
- Performance requirements are addressed through efficient code and minimal DOM manipulation.

### 2. Readability and Maintainability

#### Review Criteria:

- Is the code well-organized and easy to read?
- Are naming conventions consistent and descriptive?
- Is the code properly indented and formatted?
- Are comments used appropriately to explain complex or non-obvious code segments?

#### Analysis:

- The overall code structure is reasonably well-organized, making it intuitive for individuals familiar with similar directory structures to navigate and understand the flow of the application.
- Documentation quality is below industry standards, with a noticeable lack of comprehensive comments or explanations for critical sections of the codebase.
- Naming conventions throughout the code are consistent and descriptive, but they fall short of being self-explanatory, meaning additional documentation or comments are still required for clarity.
- Code formatting is uniform and consistent due to the implementation of linting tools and automatic code formatters, contributing to a cleaner, more professional codebase.
- There is an absence of inline comments and function-level documentation, which may hinder understanding, especially for new contributors or developers unfamiliar with the project.

### 3. Code Structure and Design

#### Review Criteria:

- Does the code follow established design patterns and architectural guidelines?
- Is the code modular and maintainable?
- Are functions and classes of reasonable size and complexity?
- Does the code adhere to the principles of separation of concerns and single responsibility?

#### Analysis:

- The code follows established design patterns and architectural guidelines.
- It uses a modular structure with separate files for different concerns.
- The code employs functional programming concepts and implements a factory pattern in the littlefoot function.
- The codebase demonstrates good modularity and maintainability.
- Functions and components are well-organized into separate files with clear responsibilities.
- The use of TypeScript enhances type safety and readability.
- The codebase demonstrates good separation of concerns.
- Each file focuses on distinct aspects: use-cases.ts handles footnote interactions, littlefoot.ts serves as the main entry point, and settings.ts manages configuration options.

### 4. Performance and Efficiency

#### Review Criteria:

- Are there any potential performance bottlenecks or inefficiencies?
- Is memory usage optimized?
- Are algorithms and data structures appropriate and efficient?
- Are there any opportunities for caching or parallelization?

#### Analysis:

- All footnotes would be stored in an array (line 45 in use-cases.ts).
- On page load, littlefoot then applies all settings and attaches event listeners to each footnote.
- This means that when a user opens a page for the first time, if there are many footnotes to be initialized, the user could possibly experience some latency before the page is fully loaded.
- Similarly, a large amount of footnotes could cause memory usage issues as they would all be in memory despite being hidden from the user.
- However, it is reasonable to assume that it would be difficult to reach an amount such that end users would experience memory or latency issues.

### 5. Error Handling and Logging

#### Review Criteria:

- Does the code include proper error handling mechanisms?
- Are exceptions used appropriately and caught at the correct level?
- Is logging implemented for debugging and troubleshooting purposes?
- Are error messages clear, descriptive, and actionable?

#### Analysis:

- Since there is no user input, there shouldn’t be any unexpected errors as they would mostly happen in development.

### 6. Security

#### Review Criteria:

- Does the code follow secure coding practices?
- Are there any potential security vulnerabilities?
- Is user input validated and sanitized properly?
- Are authentication and authorization mechanisms implemented correctly?

#### Analysis:

- The code does not handle sensitive data or require authentication and authorization mechanisms.
- Its primary focus is on footnote functionality, with no interaction involving user inputs that would necessitate extensive security measures.
- While TypeScript adds a layer of type safety, there are no specific validations or sanitizations related to security within the codebase.

### 7. Test Coverage

#### Review Criteria:

- Does the code include appropriate unit tests or integration tests?
- Is the test coverage sufficient for the critical functionality and edge cases?
- Are the tests passing and up-to-date?
- Is the test code well-structured, readable, and maintainable?

#### Analysis:

- Use-cases-test.ts seems to be similar to integration tests, the others like unit tests.

- Can’t tell through a cursory read but given the 96% code coverage almost everything seems to be covered by the test suite. In fact, one could argue (as Atlassian does) that 96% is TOO much, being costly without providing extra quality assurance.
- The test script runs both Vitest tests and Cypress tests concurrently:
  "test": "concurrently 'npm run test:vitest' 'npm run test:cypress'"
- If this script is hooked into a pre-commit process, it ensures that all tests must pass before code can be committed.
- The use of helper functions like testSettings, testAdapter, and testFootnote promotes code reuse and clarity.
- The code uses TypeScript's type definitions effectively, such as Partial<UseCaseSettings<Test>>
  Naming of tests is generally detailed with some exceptions (“'footnote resizing', handles empty footnotes reasonably”), but lack of comments doesn’t help.

### 8. Code Reuse and Dependencies

#### Review Criteria:

- Is the code properly reusing existing libraries, frameworks, or components?
- Are dependencies managed correctly and up-to-date?
- Are any unnecessary dependencies or duplicate code segments removed?
- Are dependencies secure, actively maintained, and of sufficient quality?

#### Analysis:

- Usage of existing libraries

  - Tool: purpose
  - Rollup: bundling
  - PostCSS: CSS processing
  - Typescript: type checking
  - Vitest: unit testing
  - Cypress: e2e testing
  - Concurrently: running multiple scripts simultaneously
  - Cssnano: minimize CSS
  - Postcss-preset-env: minimize CSS
  - Biome: linting
  - Commitizen: standardizing commit msgs

- The dependencies are listed separately as devDependencies (for development) and dependencies (for production)
- The use of (caret) allows packages to update automatically in case of patches/security updates without having to worry about the application breaking due to major updates to a certain dependency.
- No unnecessary dependencies or duplicate code segments removed
- Dependencies:
  - postcss <8.4.31

### 9. Compliance with Coding Standards

#### Review Criteria:

- Does the code comply with company or project-specific coding standards and guidelines?
- Are any linters or static analysis tools used to enforce coding standards?

#### Analysis:

- Biome is used to ensure code complies with company or project-specific coding standards and guidelines
- Coding standards:
  - npm run lint: Lint the entire codebase.
  - npm run format: Auto-fix code formatting issues.
  - npm run pretest: Lint before running tests.
  - Lint-staged also runs Biome on staged files during commits.

### 10. Documentation

#### Review Criteria:

- Are inline comments used effectively to explain complex or non-obvious code segments?
- Do functions, methods, and classes have descriptive comments or docstrings?
- Is there high-level documentation for complex modules or components?
- Is documentation regularly updated?

#### Analysis:

- No inline comments
- No descriptive comments or docstrings?
- No high-level documentation for complex modules or components?
- Changelog and README are updated every few months.
