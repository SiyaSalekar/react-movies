import React, { Component } from 'react';
import MovieTableRow from './MovieTableRow';

export default class MoviesTable extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {movies: this.props.movies};
    }


    render() 
    {
        return (
                <table>
                  
                  <tbody>
                    {this.props.movies.map((movie) => <MovieTableRow key={movie.id} movie={movie}/>)}

                  </tbody>
                </table>

               );
    }
}