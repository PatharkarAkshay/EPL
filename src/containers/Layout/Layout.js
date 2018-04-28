import React, { Component } from 'react';
import axios from 'axios';

import classes from './Layout.css';
import Aux from '../../hoc/Auxiliary';
import { Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import PointsTable from '../../components/PointsTable/PointsTable';
import MatchsHeld from '../../components/MatchesHeld/MatchesHeld';

class Layout extends Component {
    state = {
        rounds : [],
        pointsArray : []
    }
    componentDidMount () {
        axios.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json')
            .then(response => {
                this.setState({rounds: response.data.rounds})
                //console.log(this.state.rounds);
                let teams = { };
                function tally(match){
                    if( match.score1 > match.score2) {
                        teams[match.team1.key].win += 1;
                        teams[match.team1.key].points +=3;
                        teams[match.team1.key].played +=1;
                        teams[match.team1.key].gf += match.score1;
                        teams[match.team1.key].ga += match.score2;
                        
                        teams[match.team2.key].lose += 1;
                        teams[match.team2.key].played += 1;
                        teams[match.team2.key].gf += match.score2;
                        teams[match.team2.key].ga += match.score1;
                        
                    } else if( match.score1 < match.score2 ) {
                        teams[match.team2.key].win += 1;
                        teams[match.team2.key].points += 3;
                        teams[match.team2.key].played += 1;
                        teams[match.team2.key].gf += match.score2;
                        teams[match.team2.key].ga += match.score1;
                        
                        teams[match.team1.key].lose += 1;
                        teams[match.team1.key].played += 1;
                        teams[match.team1.key].gf += match.score1;
                        teams[match.team1.key].ga += match.score2;
                        
                    } else {
                        teams[match.team1.key].draw += 1;
                        teams[match.team1.key].points += 1;
                        teams[match.team1.key].played += 1;
                        teams[match.team1.key].gf += match.score1;
                        teams[match.team1.key].ga += match.score2;
                        
                        teams[match.team2.key].draw += 1;
                        teams[match.team2.key].points += 1;
                        teams[match.team2.key].played += 1;
                        teams[match.team2.key].gf += match.score2;
                        teams[match.team2.key].ga += match.score1;
                        
                    }
                }

                response.data.rounds.forEach((day, i) => {
                    //console.log(`Day ${i+1}`, day);
                    day.matches.forEach(match => {
                        //console.log(match);
                        if(match.team1.key in teams) {
                            if(match.team2.key in teams) {
                                tally(match)
                            } else {
                                teams[match.team2.key] = {
                                    win : 0,
                                    lose : 0,
                                    draw : 0,
                                    points : 0,
                                    played : 0,
                                    gf : 0,
                                    ga : 0,
                                    
                                }
                                tally(match);
                            }
                        } else {
                            teams[match.team1.key] = {
                                win: 0,
                                lose: 0,
                                draw: 0,
                                points : 0,
                                played : 0,
                                gf : 0,
                                ga : 0,
                                
                              }
                              if (match.team2.key in teams) {
                                  tally(match);
                              } else {
                                  teams[match.team2.key] = {
                                        win: 0,
                                        lose: 0,
                                        draw: 0,
                                        points : 0,
                                        played : 0,
                                        gf : 0,
                                        ga : 0,
                                        
                                }
                                tally(match);                 
                            }
                        }
                    })
                })
                //console.log(teams);
                let teamArray = [];
                for (let team in teams) {
                    //console.log(team);
                    if (teams.hasOwnProperty(team)) {
                        teamArray.push({key: team, win: teams[team].win, lose: teams[team].lose, draw: teams[team].draw, points: teams[team].points, played: teams[team].played, gf: teams[team].gf, ga: teams[team].ga}) 
                    }
                }
                //console.log(teamArray);
                this.setState(() => ({
                    pointsArray: teamArray,
                }))
                //console.log(this.state.pointArray);
            })
            .catch((error) => {
                console.log('Error ', error);
            });
    }

    render () {
        return(
            <Aux>
                <div className={classes.Layout}>
                    <h1>EPL STATS</h1>
                    <h3>2016/17</h3>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/points-table" exact render={ (props) => <PointsTable {...props} pointsArray = {this.state.pointsArray} /> } />
                    <Route path="/matchs-held" exact render={ (props) => <MatchsHeld {...props} rounds = {this.state.rounds} /> } />
                </div>
                <footer>
                    <h3>About</h3>
                    <p>We bring you the complete stats of 2016-17 EPL season</p>
                    <h3>Social</h3>
                    {/*<i class="fa fa-facebook" aria-hidden="true"></i>
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                    <i class="fa fa-paw" aria-hidden="true"></i>*/}
                </footer>
            </Aux>
        );
    }
}

export default Layout;