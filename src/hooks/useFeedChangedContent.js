import { useState } from 'react';
import { appToast } from '../utils';

export const useFeedChangedContent = () => {
    const [latestTakenAt, setLatestTakenAt] = useState(null);

    return {
        checkIfUpToDate: (data) => {
            const userData = data && data.length && data[0] ? data[0] : data;
            const takenAt = userData?.photos[0]?.takenAt;
            if (latestTakenAt && takenAt === latestTakenAt) {
                appToast("You're up to date.");
            }
            setLatestTakenAt(takenAt);
        }
    };
};
