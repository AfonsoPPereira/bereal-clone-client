import PropTypes from 'prop-types';

LoadingContent.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};

export default function LoadingContent({ isFetching, children }) {
    return <div style={{ opacity: isFetching ? 0.6 : 1 }}>{children}</div>;
}
