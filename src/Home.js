// Home component

import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {

  }

  render() {

    // Array of books currently reading
    const currentlyReading = this.props.currentlyReading;
    // Array of books that want to read
    const wantToRead = this.props.wantToRead;
    // Array of books already read
    const read = this.props.read;

    // Function to update book shelf
    const handleChange = (event, id) => {
      this.props.updateShelf(id, event);
    }

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>My Reads App</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 185, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event) => { handleChange(event.target.value, book.id) }}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 185, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event) => { handleChange(event.target.value, book.id) }}>
                              <option value="none" disabled>Move to...</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 185, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event) => { handleChange(event.target.value, book.id) }}>
                              <option value="none" disabled>Move to...</option>
                              <option value="read">Read</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Home
