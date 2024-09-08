import { useHistory } from 'react-router-dom';

export function useRedirectToHome() {
    const history = useHistory();

    return () => history.push('/home');
}
