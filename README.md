# MyReads Project

## To Run
Tested with Node v8.9.x

* `nvm use`
* `npm install`
* `npm start`

## Design
This React application has 4 components:
1. App - The overall container component that maintains the application state.
1. BookShelf - A container for books.
1. Book - A book itself.
1. Search - The search page.

The component hierarchy is shown in the following diagram:

```
App -----> Search
 |           |
 V           |
Bookshelf    |
 |           |
 V           |
Book   <-----+
```

## Additional notes
* Books are ordered by title.
* Search rate is throtted to 500ms between API calls.
