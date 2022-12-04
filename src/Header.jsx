import PropTypes from 'prop-types';
import LoadingSpinner from './components/LoadingSpinner';

Header.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.node
};

export default function Header({ isFetching, children }) {
    if (isFetching)
        return (
            <div className="loading-div">
                <LoadingSpinner />
            </div>
        );

    return <div id="header">{children}</div>;
}
