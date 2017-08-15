// Book Search component

import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'


class Search extends React.Component {

  // Added a query attribute to manage the user input
  state = {
    query: ''
  }

  // Function to update the state of the user input, and execute the search
  updateQuery(query) {
    this.setState({ query: query });
    this.props.searchBooks(query.trim());
  }

  render() {

    // Array of searched books
    const books = this.props.searchedBooks;

    // Function to update book shelf
    const handleChange = (event, id) => {
      this.props.updateShelf(id, event);
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* 
                  NOTES: We display the same grid as in the main page using the searched books,
                   and handling the shelf respect to the books already added to my collection 
                */}
            {books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 185, backgroundImage: 'url(' + book.imageLinks.smallThumbnail + ')' }}></div>
                    <div className="book-shelf-changer">

                      {book.shelf === 'none' &&
                        <select onChange={(event) => { handleChange(event.target.value, book.id) }}>
                          <option value="none" disabled>Move to...</option>
                          <option value="none">None</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                        </select>
                      }
                      {book.shelf === 'currentlyReading' &&
                        <select onChange={(event) => { handleChange(event.target.value, book.id) }}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      }
                      {book.shelf === 'wantToRead' &&
                        <select onChange={(event) => { handleChange(event.target.value, book.id) }}>
                          <option value="none" disabled>Move to...</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      }
                      {book.shelf === 'read' &&
                        <select onChange={(event) => { handleChange(event.target.value, book.id) }}>
                          <option value="none" disabled>Move to...</option>
                          <option value="read">Read</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="none">None</option>
                        </select>
                      }

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
    )
  }
}

export default Search