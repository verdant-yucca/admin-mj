import { FC } from 'react';
import { useNavigate } from 'react-router';

import { HistoryGate } from '@/shared/model/history';

export const HistoryGateConnector: FC = () => {
    const navigate = useNavigate();

    return <HistoryGate navigate={navigate} />;
};
