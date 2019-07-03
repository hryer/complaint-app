import { combineReducers } from 'redux';
import {auth} from './auth';

export default combineReducers({ 
  auth
  // auth:require('./auth').auth,
});