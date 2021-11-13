import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

//CSS import
import './movie-card.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        
        return (

        <Card className="bg-dark text-white">
            <Card.Img src={movie.Imageurl}/>
            <Card.ImgOverlay>
                <Card.Title className='display-4'>{movie.Title}</Card.Title>
                <Link to={`/movies/${movie._id}`}>
                <Button variant="link">Open</Button>
                </Link>
            </Card.ImgOverlay>    
        </Card>
        );
    }}

//Validating entries

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Imageurl: PropTypes.string.isRequired,
    }).isRequired,

};