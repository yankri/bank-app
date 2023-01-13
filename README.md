# till-project

VueJs application based on criteria received via Dropbox folder.

## Run the application

```sh
npm install
npm run dev
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

## Potential Improvements
- In a real world app, add secure authentication into the application
- Handle math with currency safe calculations to prevent floating point math errors
- Add error handling and error notifications
- Keep header fixed and only scroll page under it
- Further abstract various CSS properties to be more reusable, e.g. create color variables, shared classes, etc.
- Improve reusability and modularization of components to be used throughout
- For accounts with larger numbers of transactions than the sample data, improve transactions list view:
    1. Create a paginated table (or infinite scroll table) with server batched data.
    2. Load more transactions at once and scroll the div/page
    3. Show most recent transactions on "Dashboard" view and create a new page to view all transactions, utilizing one of the above solutions on that page
- Additional component unit testing and further automated tests
- Improve balance calculation algorithms for the running balance on transactions as well as for the current balance displayed in the card
- Improve account trend chart to more accurately reflect debits/credits and have a 0 baseline
- Make Cypress tests dynamic to check values and not hard code values from the sample data