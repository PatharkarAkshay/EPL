import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import classes from './MatchesHeld.css';

class MatchesHeld extends Component {
    displayFunction = (element) => {
        return <Row><Col xs="5">{element.team1.code}</Col>
                    <Col xs="1" className={classes.reverse}>{element.score1}</Col>
                    <Col xs="1" className={classes.reverse}>{element.score2}</Col>
                    <Col xs="5">{element.team2.code}</Col></Row>
    }
  render() { 
    return (
        <div>
            {
            this.props.rounds.map((day, i) =>  (<Container key={i} className={classes.MatchesHeld}>
                                                    <Row>
                                                        <Col xs="12"><p className={classes.reverse}>{day.name}</p></Col>
                                                    </Row>
                                                    {
                                                        day.matches.map((match, index) => {
                                                            return this.displayFunction(match)
                                                        })
                                                    }
                                                </Container>))
            }
        </div>
    )
}
}

export default MatchesHeld;