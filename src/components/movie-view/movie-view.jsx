import React from 'react';
import PropTypes from 'prop-types';

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
                            <img src={movie.Imageurl} alt={movie.Title} width='360px' height='500px'/>
                        </div>
                            <hr/>
                        <div className='movie-description my-5'>
                            <span className="label">Description: </span>
                            <span className="content">{movie.Description}</span>
                        </div>
                        <Button onClick={() => { onBackClick(null);}}>
                        Back</Button>
                    </div>
            );
    }


}

//<button onClick={() => { onBackClick(null);}}>Back</button>

//Validating entries

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Imageurl: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};