import React, { Component} from 'react';
import PropTypes from 'prop-types';

const Summary = class extends Component {
    render() {
        const { ingredients, steps, title  } = this.props;

        return (
            <div className="summary">
                <h1>{title}</h1>
                <p>
                    <span>재료 {ingredients} 종류 | </span>
                    <span>총 {steps}</span>
                </p>
            </div>
        );
    }

    static propTypes = {
        ingredients: PropTypes.number,
        steps: PropTypes.number,
        title: PropTypes.string
    }

    static defaultProps = {
        ingredients: 0,
        steps: 0,
        title: ''
    }
    
}

export default Summary;