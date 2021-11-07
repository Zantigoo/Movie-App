import React from 'react';
import PropTypes from 'prop-types';

//CSS import
import './movie-card.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;
        
        return (

        <Card className="bg-dark text-white">
            <Card.Img src={movie.Imageurl} alt={movie.Title} />
            <Card.ImgOverlay>
                <Card.Title className='display-4'>{movie.Title}</Card.Title>
                <Button onClick={() => onMovieClick(movie)}
                variant="primary">Open</Button>
            </Card.ImgOverlay>
            
        </Card>

            /*<Card>
              <Card.Img variant="top" src={movie.Imageurl} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <button onClick={() => onMovieClick(movie)}
                variant="link">Open</button>
              </Card.Body>
            </Card>*/
          );
    }
}

//Validating entries

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Imageurl: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};