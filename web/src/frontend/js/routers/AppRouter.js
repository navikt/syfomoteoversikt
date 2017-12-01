import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import DineMoterContainer from '../containers/DineMoterContainer';
import EnhetensMoterContainer from '../containers/EnhetensMoterContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/moteoversikt" component={DineMoterContainer} />
        <Route path="/moteoversikt/dinemoter" component={DineMoterContainer} />
        <Route path="/moteoversikt/enhetensmoter" component={EnhetensMoterContainer} />
        <Route path="/" component={DineMoterContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
