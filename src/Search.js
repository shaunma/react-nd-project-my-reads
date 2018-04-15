import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from "prop-types"
import Book from "./Book"
import _ from 'lodash'

class Search extends Component {

  static THROTTLE_WAIT = 500

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    shelvedBooks: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    query: '',
    results: []
  }

  clear = () => {
    this.setState({
      query: '',
      results: []
    })
  }

  updateQuery = (query) => {
    if (query === '') {
      this.clear()
      return
    }

    this.setState({
      query: query
    })
    this.doSearch(query)
  }

  doSearch = _.throttle(query => {
    BooksAPI.search(query)
      .then(res => {
        const results = res.error ? [] : res
        this.setState({
          results: results
        })
      })
  }, Search.THROTTLE_WAIT)

  render() {
    const {results} = this.state
    const {onChangeShelf, shelvedBooks} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              results.map(result => {
                let bookOnShelf = shelvedBooks.find(sb => sb.id === result.id)
                return (
                  <li key={result.id}>
                    <Book
                      book={bookOnShelf ? bookOnShelf : result}
                      onChangeShelf={onChangeShelf}
                    />
                  </li>
                )
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
