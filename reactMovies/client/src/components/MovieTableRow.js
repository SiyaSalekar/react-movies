import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class MovieTableRow extends Component
{   
    render() 
    {
        return (
        <div class="movie_card" id="bright">
          <div class="info_section">
            <div class="movie_header">
             <img class="locandina" src={this.props.movie.posterUrl} alt=""/>
              <h1>{this.props.movie.title}</h1>
              <h4>{this.props.movie.year}, {this.props.movie.director}</h4>
              <span class="minutes">{this.props.movie.runtime} min</span>
              <p class="type">{this.props.movie.genres}</p>
            </div>
            <div class="movie_desc">
              <p class="text">{this.props.movie.plot}</p>
            </div>
            <div class="movie_social">
              <ul>
                <li><i class="material-icons"><Link className="in-card-button" to={"/EditMovie/" + this.props.movie._id}>Edit</Link></i></li>
                <li><i class="material-icons"><Link className="in-card-button" to={"/DeleteMovie/" + this.props.movie._id}>Delete</Link></i></li>
              </ul>
            </div>
          </div>
        </div>
     )
    }
}

