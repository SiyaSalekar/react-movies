import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MovieTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
      rating: 0,
    };
  }

  toggleModal = () =>{
    this.setState(prevState => ({modalState: !prevState.modalState}))
  }

  handleRating = (e) =>{
    this.setState({rating:e.target.value})
  }

  render() {
    return (
      <div class="movie_card" id="bright">
        <div class="info_section">
          <div class="movie_header">
            <img class="locandina" src={this.props.movie.posterUrl} alt=""/>
            <div className="rated">{this.state.rating}/5 Rating</div>
            <h1>{this.props.movie.title}</h1>
            <h4>
              {this.props.movie.year}, {this.props.movie.director}
            </h4>
            <span class="minutes">{this.props.movie.runtime} min</span>
            <p class="type">{this.props.movie.genres}</p>
          </div>
          <div class="rating" style={{display:`${this.state.modalState?'block':'none'}`}}>
            <div className="rate-quote">RATE THIS MOVIE:</div>
            <br/>
            <input type="number" onChange={this.handleRating} min={0} max={5} value={this.state.rating}/>
            <button className="rate-close" onClick={this.toggleModal}>close</button>
          </div>

          <div class="movie_desc">
            <p class="text">{this.props.movie.plot}</p>
          </div>
          <div class="movie_social">
            <ul>
              <li>
                <i class="material-icons">
                  <Link
                    className="in-card-button"
                    to={"/EditMovie/" + this.props.movie._id}
                  >
                    Edit
                  </Link>
                </i>
              </li>
              <li>
                <i class="material-icons">
                  <Link className="in-card-button"
                    to={"/DeleteMovie/" + this.props.movie._id}>
                    Delete
                  </Link>
                </i>
              </li>
              <li>
                <i class="material-icons">
                  <button className="in-card-button" onClick={this.toggleModal}>
                    Rate movie
                  </button>
                </i>
              </li>

            </ul>
          </div>
        </div>
      </div>
    );
  }
}
