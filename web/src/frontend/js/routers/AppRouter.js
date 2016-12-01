import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import MoteContainer from '../containers/MoteContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/moteoversikt" component={MoteContainer} />
        <Route path="/" component={MoteContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
