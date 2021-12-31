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
            <Link to={`/movies/${movie._id}`}>
                <Card.Img src={movie.Imageurl} alt={movie.Title}/>
                    <Card.ImgOverlay>
                        <Card.Title className="text-center">{movie.Title}</Card.Title>        
                    </Card.ImgOverlay>    
            </Link>
        </Card>
        );
    }}
