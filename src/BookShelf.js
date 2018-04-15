import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from "./Book"

class BookShelf extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object),
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const {label, books, onChangeShelf} = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{label}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {
              books.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onChangeShelf={onChangeShelf}
                  />
                </li>
              ))
            }

          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
