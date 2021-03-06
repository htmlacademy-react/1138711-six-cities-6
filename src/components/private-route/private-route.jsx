import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {AuthorizationStatus} from '../../common/const';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../redux/selectors';


const PrivateRoute = ({render, path, exact, authorizationStatus}) => {

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={`/login`} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state)
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
