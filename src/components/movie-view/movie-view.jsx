import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';

//CSS import
import './movie-view.scss';
import { Col, Row, Button } from 'react-bootstrap';


export class MovieView extends React.Component {

    keypressCallback(event){
        console.log(event.key);
    }

    componentDidMount(){
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.keypressCallback);
    }

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
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant="link">Director</Button>
                        </Link>
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button variant="link">Genre</Button>
                        </Link>
                        <Button onClick={() => { onBackClick(null);}}>
                        Back</Button>
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