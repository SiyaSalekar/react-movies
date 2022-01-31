import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import LinkInClass from "../components/LinkInClass";

import { SERVER_HOST } from "../config/global_constants";

export default class EditMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      year: "",
      runtime: "",
      posterUrl: "",
      plot: "",
      actors: "",
      genres: [],
      allGenre: ["Action",
                       "Comedy",
                       "Drama",
                       "Crime",
                       "Music",
                       "Adventure",
                       "Fantasy",
                       "History",
                       "Horror",
                       "Mystery",
                       "Romance",
                       "Thriller",
                       "Western"],
      director: "",
      redirectToDisplayAllMovies: false,
    };
  }

  componentDidMount() {
    this.inputToFocus.focus();

    axios
      .get(`${SERVER_HOST}/movies/${this.props.match.params.id}`)
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({
              title: res.data.title,
              year: res.data.year,
              runtime: res.data.runtime,
              genres: res.data.genres,
              director: res.data.director,
              actors: res.data.actors,
              posterUrl: res.data.posterUrl,
              plot: res.data.plot,
            });
          }
        } else {
          console.log(`Record not found`);
        }
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleGenreChange = (e) => {
    const genre = e.target.nextSibling.textContent;
    const isChecked = e.target.checked;

    if (isChecked) {
      this.setState((prevState) => ({
        genres: [...prevState.genres, genre],
      }));
    } else {
      const newGenre = this.state.genres.filter((g) => g !== genre);
      this.setState({ genres: newGenre });
    }

    console.log(this.state.genres);
  };
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ wasSubmittedAtLeastOnce: true });

    const formInputsState = this.validate();

    if (Object.keys(formInputsState).every((index) => formInputsState[index])) {
      const movieObject = {
        title: this.state.title,
        year: this.state.year,
        runtime: this.state.runtime,
        genres: this.state.genres,
        director: this.state.director,
        posterUrl: this.state.posterUrl,
        plot: this.state.plot,
        actors: this.state.actors,
      };

      axios
        .put(`${SERVER_HOST}/movies/${this.props.match.params.id}`, movieObject)
        .then((res) => {
          if (res.data) {
            if (res.data.errorMessage) {
              console.log(res.data.errorMessage);
            } else {
              console.log(`Record updated`);
              this.setState({ redirectToDisplayAllMovies: true });
            }
          } else {
            console.log(`Record not updated`);
          }
        });
    }
  };

  validateTitle() {
    const pattern = /^[0-9a-zA-Z\s]+$/;
    return pattern.test(String(this.state.title));
  }

  validateYear() {
    const year = parseInt(this.state.year);
    //  const today = new Date()
    return year >= 1950 && year<=2023;
  }

  validateRuntime() {
    const pattern = /^[0-9]/;
    return pattern.test(String(this.state.runtime));
  }

  validateGenres() {
    const pattern = /^[A-Za-z,]+$/;
    return pattern.test(String(this.state.genres));
  }
  validateDirector(){
      const pattern = /^[0-9a-zA-Z\s]+$/;
      return pattern.test(String(this.state.director));
  }
  validate() {
    return {
      title: this.validateTitle(),
      year: this.validateYear(),
      runtime: this.validateRuntime(),
      genres: this.validateGenres(),
      director:this.validateDirector()
    };
  }

  render() {

let errorMessage = "";
    if (this.state.wasSubmittedAtLeastOnce) {
      errorMessage = (
        <div className="error">
          Movie Details are incorrect
          <br />
        </div>
      );
    }
    let titleErrorMessage = "";
    let yearErrorMessage = "";
    let runtimeErrorMessage = "";
    let genresErrorMessage = "";
    let directorErrorMessage = "";

    if (!this.validateTitle()) {
      titleErrorMessage = (
        <div className="error">
          Title must be a String
          <br />
        </div>
      );
    }
    if (!this.validateYear()) {
      yearErrorMessage = (
        <div className="error">
        Year must be greater than 1950 and less than current year
          <br />
        </div>
      );
    }
    if (!this.validateRuntime()) {
      runtimeErrorMessage = (
        <div className="error">
          Runtime must be only numbers
          <br />
        </div>
      );
    }
    if (!this.validateGenres()) {
      genresErrorMessage = (
        <div className="error">
          Include atleast one genre
        </div>
      );
    }
    if (!this.validateDirector()) {
          directorErrorMessage = (
            <div className="error">
              Director must be a String
              <br />
            </div>
          );
        }

    return (
      <div className="form-add-container">
        {this.state.redirectToDisplayAllMovies ? (
          <Redirect to="/DisplayAllMovies" />
        ) : null}

        <Form>
          <Form.Group controlId="title">
            <Form.Label className="add-in">Title</Form.Label>
            <Form.Control
              ref={(input) => {
                this.inputToFocus = input;
              }}
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            {titleErrorMessage}
          </Form.Group>

          <Form.Group controlId="plot">
            <Form.Label  className="add-in">Plot</Form.Label>
            <Form.Control
              ref={(input) => {
                this.inputToFocus = input;
              }}
              type="text"
              name="plot"
              value={this.state.plot}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="actors">
            <Form.Label className="add-in">Actors</Form.Label>
            <Form.Control
              ref={(input) => {
                this.inputToFocus = input;
              }}
              type="text"
              name="actors"
              value={this.state.actors}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="posterURL">
            <Form.Label className="add-in">Poster</Form.Label>
            <Form.Control
              type="text"
              name="posterUrl"
              value={this.state.posterUrl}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="year">
            <Form.Label className="add-in">Year</Form.Label>
            <Form.Control
              type="text"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
            />
            {yearErrorMessage}
          </Form.Group>

          <Form.Group controlId="runtime">
            <Form.Label className="add-in">Runtime</Form.Label>
            <Form.Control
              type="text"
              name="runtime"
              value={this.state.runtime}
              onChange={this.handleChange}
            />
            {runtimeErrorMessage}
          </Form.Group>

          <Form.Group controlId="genres">
            <Form.Label className="add-in">Genres</Form.Label>
            {/* <Form.Control type="text" name="genres" value={this.state.genres} onChange={this.handleGenreChange} /> */}
            {this.state.allGenre.map((genre) => (
              <Form.Check
                type="checkbox"
                className="genres-list"
                id={`default-checkbox`}
                label={genre}
                checked = {this.state.genres.some(a => a === genre)}
                onChange={this.handleGenreChange}
              />
            ))}
            {
                this.state.genres.map(g => <div className="gen">{g}</div>)
            }
            {genresErrorMessage}
          </Form.Group>
          <Form.Group controlId="director">
            <Form.Label className="add-in">Director</Form.Label>
            <Form.Control
              type="text"
              name="director"
              value={this.state.director}
              onChange={this.handleChange}
            />
            {directorErrorMessage}
          </Form.Group>

          {errorMessage}

          <LinkInClass
            value="Update"
            className="in-card-button-add"
            onClick={this.handleSubmit}
          />

          <Link className="in-card-button-cancel" to={"/DisplayAllMovies"}>
            Cancel
          </Link>
        </Form>
      </div>
    );
  }
}