import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {SHELF_NAMES} from './BookShelfConfig'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const {book, onChangeShelf} = this.props
    const backgroundImage = book.imageLinks ? book.imageLinks.smallThumbnail : ''
    const title = book.title
    const authors = book.authors ? book.authors.join(', ') : ''
    const currShelf = book.shelf ? book.shelf : 'none'
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{
                 width: 128,
                 height: 193,
                 backgroundImage: `url("${backgroundImage}")`
               }}/>
          <div className="book-shelf-changer">
            <select value={currShelf}
                    onChange={(event) => onChangeShelf(book, event.target.value)}>
              <option value="" disabled>Move to...</option>
              {
                Object.keys(SHELF_NAMES)
                  .map(shelfId => {
                    return <option key={shelfId} value={shelfId}>{SHELF_NAMES[shelfId]['label']}</option>
                  })
              }
              <option key='none' value='none'>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book
