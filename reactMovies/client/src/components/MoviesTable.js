import React, { Component, useState, useEffect } from "react";
import MovieTableRow from "./MovieTableRow";

export default function MovieTable({ movies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies,setFilteredMovies] = useState([])

  useEffect(()=>{
    setFilteredMovies(movies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())))
  },[searchQuery])

  useEffect(()=>{
    console.log(movies,"here");
    setFilteredMovies(movies);
  },[movies])

  return (
    <table>
      <div className = "search">Search
      <input className="search-input" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} /></div>
      <tbody>
        {filteredMovies.map((movie) => (
          <MovieTableRow key={movie.id} movie={movie} />
        ))}
      </tbody>
    </table>
  );
}

// export default class MoviesTable extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movies: this.props.movies,
//       searchQuery: "",
//       filteredMovies: [],
//     };
//   }

//   handleSearch = (e) => {
//     // this.setState({searchQuery:e.target.value})
//     const newMovies = this.state.movies.filter((m) =>
//       m.title.toLowerCase().includes(e.target.value.toLowerCase())
//     );

//     this.setState({filteredMovies:[...newMovies]})
//   };

//   render() {
//     return (
//       <table>
//         <input value={this.state.searchQuery} onChange={this.handleSearch} />
//         <tbody>
//           {this.state.filteredMovies.map((movie) => (
//             <MovieTableRow key={movie.id} movie={movie} />
//           ))}
//         </tbody>
//       </table>
//     );
//   }
// }
