import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
// Import react router for using urls
import { Route } from 'react-router-dom'
// Import react loading to display a loading component
import ReactLoading from 'react-loading'
// import components for Search and Home components
import Search from './Search.js'
import Home from './Home.js'


class BooksApp extends React.Component {

  // State attributes to manage my books colection distributed on shelf, searched, all and a boolean loading indicator
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    searchedBooks: [],
    allBooks: [],
    loading: false
  }

  // Function to fetch my books and change the state clasifiyng on currently reading, wanto to read and read
  fetchAllBooks = () => {

    this.setState({ loading: true })

    BooksAPI.getAll().then((result) => {
      this.setState({
        allBooks: result,
        currentlyReadingBooks: result.filter((book) => { return book.shelf === 'currentlyReading' }),
        wantToReadBooks: result.filter((book) => { return book.shelf === 'wantToRead' }),
        readBooks: result.filter((book) => { return book.shelf === 'read' }),
        loading: false
      });
    });
  }

  // Function to search books by a query string
  searchBooks = (query) => {

    this.setState({ loading: true })

    BooksAPI.search(query, 20).then((result) => {
      console.log(result);
      if (result && result.length > 0) {

        result.map((book) => {

          let next = true;

          let book2;

          for (let i = 0; i < this.state.allBooks.length && next; i++) {

            book2 = this.state.allBooks[i];

            if (book.title === book2.title) {
              book.shelf = book2.shelf;
              next = false;
            }
          }

          if (next) {
            book.shelf = 'none';
          }

          return book;
        });

        this.setState({
          searchedBooks: result,
          loading: false
        });
      } else {
        this.setState({
          searchedBooks: [],
          loading: false
        });
      }
    });
  }

  componentDidMount() {

    // Load my books on first app display
    this.fetchAllBooks()

  }

  render() {

    // Function to update book shelf
    const updateShelf = (id, shelf) => {

      this.setState({ loading: true })

      BooksAPI.update({ id: id }, shelf).then(() => {
        this.fetchAllBooks()
      })
    }

    return (
      <div className="app ">
        {this.state.loading &&
          <ReactLoading type="spin" color="#444" className="overlay-box" />
        }
        <Route exact path="/" render={() => (
          <Home
            currentlyReading={this.state.currentlyReadingBooks}
            wantToRead={this.state.wantToReadBooks}
            read={this.state.readBooks}
            updateShelf={updateShelf} />
        )} />
        <Route path="/search" render={() => (
          <Search searchedBooks={this.state.searchedBooks}
            searchBooks={this.searchBooks}
            updateShelf={updateShelf}
          />)} />
      </div>
    )
  }
}

export default BooksApp