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
                       "Fantasy",
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
    return year >= 1950;
  }

  validateRuntime() {
    const pattern = /^[0-9]/;
    return pattern.test(String(this.state.runtime));
  }

  validateGenres() {
    const pattern = /^[A-Za-z,]+$/;
    return pattern.test(String(this.state.genres));
  }

  validate() {
    return {
      title: this.validateTitle(),
      year: this.validateYear(),
      runtime: this.validateRuntime(),
      genres: this.validateGenres(),
    };
  }

  render() {
    // let errorMessage = ""

    let titleErrorMessage = "";
    let yearErrorMessage = "";
    let runtimeErrorMessage = "";
    let genresErrorMessage = "";
    //                if(this.state.wasSubmittedAtLeastOnce)
    //                {
    //                    errorMessage = <div className="error">Movie Details are incorrect<br/></div>;
    //                }

    if (!this.validateTitle()) {
      titleErrorMessage = (
        <div className="error">
          Title must contain only letters
          <br />
        </div>
      );
    }
    if (!this.validateYear()) {
      yearErrorMessage = (
        <div className="error">
          Year must contain only numbers
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
          Genre must be only letters <br />
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
            <Form.Label>Title</Form.Label>
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
            <Form.Label>Plot</Form.Label>
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
            <Form.Label>Actors</Form.Label>
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
            <Form.Label>Poster</Form.Label>
            <Form.Control
              type="text"
              name="posterUrl"
              value={this.state.posterUrl}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="text"
              name="year"
              value={this.state.year}
              onChange={this.handleChange}
            />
            {yearErrorMessage}
          </Form.Group>

          <Form.Group controlId="runtime">
            <Form.Label>Runtime</Form.Label>
            <Form.Control
              type="text"
              name="runtime"
              value={this.state.runtime}
              onChange={this.handleChange}
            />
            {runtimeErrorMessage}
          </Form.Group>

          <Form.Group controlId="genres">
            <Form.Label>Genres</Form.Label>
            {/* <Form.Control type="text" name="genres" value={this.state.genres} onChange={this.handleGenreChange} /> */}
            {this.state.allGenre.map((genre) => (
              <Form.Check
                type="checkbox"
                id={`default-checkbox`}
                label={genre}
                checked = {this.state.genres.some(a => a === genre)}
                onChange={this.handleGenreChange}
              />
            ))}
            {
                this.state.genres.map(g => <div>{g}</div>)
            }
            {/* {genresErrorMessage} */}
          </Form.Group>
          <Form.Group controlId="director">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              name="director"
              value={this.state.director}
              onChange={this.handleChange}
            />
            {genresErrorMessage}
          </Form.Group>

          <LinkInClass
            value="Update"
            className="add-form-add-button"
            onClick={this.handleSubmit}
          />

          <Link className="add-form-button" to={"/DisplayAllMovies"}>
            Cancel
          </Link>
        </Form>
      </div>
    );
  }
}