import { connect } from 'react-redux';
import { mapStateToProps } from '../reducer/TodoReducer';
import Todos from './Todos';

export default connect(mapStateToProps)(Todos);