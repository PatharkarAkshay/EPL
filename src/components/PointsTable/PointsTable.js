import React, { Component } from 'react';
import classes from './PointsTable.css';

class PointsTable extends Component {   
    
    render () {
        this.props.pointsArray.sort(function(a, b) {
            return b.points - a.points
        })
        console.log(this.props.pointsArray)
        const arrayDisplay = this.props.pointsArray.map((element,index) => 
            <tr key={element.key}>
                  <td>{index+1}</td>
                  <td>{element.key.toUpperCase()}</td>
                  <td>{element.played}</td>
                  <td>{element.win}</td>
                  <td>{element.lose}</td>
                  <td>{element.draw}</td>
                  <td>{element.gf}</td>
                  <td>{element.ga}</td>
                  <td>{element.points}</td>
            </tr>
        );
        
        return (
                <table className={classes.PointsTable}>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Team</th>
                                <th>Played</th>
                                <th>Won</th>
                                <th>Lost</th>
                                <th>Draw</th>
                                <th>GF</th>
                                <th>GA</th>
                                
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* sortOnPoints(this.props.pointsArray) */}
                            { arrayDisplay }
                        </tbody>
                </table>
        );
    }
}

export default PointsTable;