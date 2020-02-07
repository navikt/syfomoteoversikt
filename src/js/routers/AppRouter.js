import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import MineMoterContainer from '../containers/MineMoterContainer';
import EnhetensMoterContainer from '../containers/EnhetensMoterContainer';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/syfomoteoversikt" component={MineMoterContainer} />
        <Route path="/syfomoteoversikt/minemoter" component={MineMoterContainer} />
        <Route path="/syfomoteoversikt/enhetensmoter" component={EnhetensMoterContainer} />
        <Route path="/" component={MineMoterContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.object.isRequired,
};

export default AppRouter;
