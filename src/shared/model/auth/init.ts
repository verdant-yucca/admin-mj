import { sample } from 'effector';
import { authEffects, authEvents, authStores } from './index';
import { historyEvents } from '../history';
import { APP_ROUTE } from '../../constants/routes';

sample({
    clock: authEvents.loginFn,
    target: authEffects.loginFx
});

authEvents.setIsAuthFn.watch(() => historyEvents.push(APP_ROUTE.root));
