import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom'
import _ from 'lodash'

import './App.css'
import BookShelf from "./BookShelf"
import Search from "./Search"
import * as BooksAPI from './BooksAPI'
import {SHELF_NAMES} from './BookShelfConfig'

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        const booksSortedByTitle = _.sortBy(books, 'title')
        this.setState({books: booksSortedByTitle})
      })
  }

  changeShelf = (book, newShelfId) => {
    const isBookNew = book.shelf === undefined
    if (isBookNew) {
      const newBooks = this.state.books
      newBooks.push(book)

      this.setState({
        books: _.sortBy(newBooks, 'title')
      })
    }
    book.shelf = newShelfId

    BooksAPI.update(book, newShelfId)
      .then(() => {
        this.setState({
          books: this.state.books.map(book => {
            if (book.id === book) {
              return _.tap(book, (book) => {
                book.shelf = newShelfId
              })
            }
            return book;
          })
        })
      })
  }


  render() {
    const {books} = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {
                Object.keys(SHELF_NAMES).map(shelfId => (
                  <BookShelf key={shelfId}
                             id={shelfId}
                             label={SHELF_NAMES[shelfId]['label']}
                             books={books.filter(book => book.shelf === shelfId)}
                             onChangeShelf={this.changeShelf}
                  />
                ))
              }
            </div>
            <div className="open-search">
              <Link to='/search'>Add a Book</Link>
            </div>
          </div>
        )}/>

        <Route path='/search' render={() => (
          <Search
            onChangeShelf={this.changeShelf}
            shelvedBooks={books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
