import React from 'react';
import PropTypes from 'prop-types';

import './director-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {

    const { director, onBackClick } = this.props;

    return (
        <Row>
          <Col>
            <div className="director-view">
              <div className="director-name">
                <span className="name">Name: </span>
                <span className="value">{director.Name}</span>
              </div><br/>

              <div className="director-bio">
                <span className="bio">Bio: </span>
                <span className="value">{director.Bio}</span>
              </div><br/>

              <div className="director-birth">
                <span className="birthyear">BirthYear: </span>
                <span className="value">{director.Birthyear}</span>
              </div><br/>

              <div className="director-button-div">
                <Button className="director-button mt-3" variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
              </div>
              
            </div>
          </Col>
        </Row>
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.number.isRequired
    }).isRequired,
  })
};
