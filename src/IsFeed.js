import { useLocation } from 'react-router-dom';

export default function IsFeed() {
    const location = useLocation();

    return location.pathname === '/feed';
}
