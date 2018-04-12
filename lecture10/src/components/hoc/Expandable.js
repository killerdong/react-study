import React, {Component} from 'react';

export default ComposedComponent => class extends Component {
    constructor(props) {
        super(props);
        const collapsed = props.hidden && props.hidden === true ? true : false;
        this.state = { collapsed };
        this.expandCollapes = this.expandCollapes.bind(this);
    }

    expandCollapes() {
        let collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    render() {
        return <ComposedComponent
                expandCollapes={this.expandCollapes}
                {...this.state}
                {...this.props}
                />
    }
}