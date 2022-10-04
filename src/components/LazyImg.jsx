import { Skeleton } from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

LazyImg.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    alt: PropTypes.string,
    threshold: PropTypes.number,
    wrapper: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
};

export default function LazyImg({
    width,
    height,
    alt = null,
    threshold = 0,
    wrapper: Wrapper = Fragment,
    ...props
}) {
    const [visible, setVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const placeholderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry], obs) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold,
            }
        );

        if (placeholderRef?.current)
            observer.observe(placeholderRef.current);

        return () => {
            observer?.disconnect();
        };
    }, [threshold]);

    return (
        <>
            {!loaded && (
                <Skeleton
                    className="skeleton"
                    animation="pulse"
                    variant="rect"
                    ref={placeholderRef}
                    width={width}
                    height={height}
                    sx={{ animationDuration: '0.6s', margin: 'auto .3em' }}
                />
            )}
            {visible && (
                <Wrapper>
                    <Tooltip placement="top" title={alt || ''}>
                        <img
                            {...props}
                            style={
                                loaded
                                    ? { width, height }
                                    : { width: 0, height: 0 }
                            }
                            alt={alt || ''}
                            onLoad={() => setLoaded(true)}
                        />
                    </Tooltip>
                </Wrapper>
            )}
        </>
    );
}
