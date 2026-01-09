# Navan TypeScript Playwright Exam

This repository contains the advanced automation solution for the "TravelCorp Booking Engine" exam. It demonstrates an implementation using **Playwright** with strict **TypeScript** typing, **Encapsulation**, and **SOLID principles**.

## Architecture
- **Framework**: Playwright + TypeScript
- **Design Patterns**: 
  - **Page Object Model (POM)** (Strict separation of selectors and actions)
  - **Dependency Injection** via Playwright Fixtures
  - **Factory/Wrapper Pattern** for API calls
- **Reporting**: Playwright HTML Reporter

## Project Structure
```text
├── src/
│   ├── fixtures/       # Test fixtures (DI for Page Objects)
│   ├── pages/          # Page Objects (Encapsulated, Private Properties)
│   │   ├── base.page.ts
│   │   └── blazedemo/  # Specific UI Application Pages
│   └── utils/          # Shared utilities (Mock Clients, Types)
├── tests/
│   ├── api/            # Backend API Tests (Policy Logic)
│   └── ui/             # E2E UI Tests (BlazeDemo Flow)
└── playwright.config.ts
```

## Setup
1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Install Browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests
- **Run All Tests:**
  ```bash
  npm test
  ```
- **Run UI Tests Only:**
  ```bash
  npm run test:ui
  ```
- **Run API Tests Only:**
  ```bash
  npm run test:api
  ```
- **View Report:**
  ```bash
  npm run report
  ```
