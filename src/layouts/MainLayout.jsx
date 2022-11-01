import PropTypes from 'prop-types';
import LoggedInUser from '../LoggedInUser';

MainLayout.propTypes = {
    header: PropTypes.node,
    children: PropTypes.node
};

export default function MainLayout({ header, children }) {
    return (
        <>
            <header>
                <div className="header">
                    {header}
                    <LoggedInUser />
                </div>
            </header>
            <main id="content">{children}</main>
        </>
    );
}
