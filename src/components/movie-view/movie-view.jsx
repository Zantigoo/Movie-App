import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';

//CSS import
import './movie-view.scss';
import { Col, Row, Button } from 'react-bootstrap';


export class MovieView extends React.Component {

    constructor(props) {
        super(props);
    }

    addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://flixir.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST'
    })
        .then(response => {
            alert(`Added to Favorites`)
        })
        .catch(function (error) {
            console.log(error);
        });
};

    render() {
        const { movie, onBackClick } = this.props;

        return (
                    <div className='movie-view jumbotron-fluid'>
                        <div className='movie-title display-4'>
                            <span className='content'>{movie.Title}</span>
                        </div>
                            <hr/>
                        <div className='movie-image text-center'>
                            <img src={movie.Imageurl} alt={movie.Title} width='50%' height='70%'/>
                        </div>
                            <hr/>
                        <div className='movie-description my-5'>
                            <span className="label">Description: </span>
                            <span className="content">{movie.Description}</span>
                        </div>
                        <div className='movie-director my-5'>
                            <span className="label">Director : </span>
                            <Link to={`/directors/${movie.Director.Name}`} className="content">{movie.Director.Name}</Link>
                        </div>
                        <div className='movie-genre my-5'>
                            <span className="label">Genre : </span>
                            <Link to={`/genres/${movie.Genre.Name}`} className="content">{movie.Genre.Name}</Link>
                        </div>
 
                        <Button variant="outline-warning" onClick={() => { onBackClick(null);}}>
                        Back</Button>

                        <Button variant="outline-primary" className="btn-outline-primary mx-5" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>
                    </div>
            );
    }


}



//Validating entries

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Imageurl: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};