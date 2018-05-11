import Input from './Input';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../reducer/TodoReducer';

export default connect(null, mapDispatchToProps)(Input);
