import { useHistory } from 'react-router-dom';

export function goToHome() {
    const history = useHistory();
    return () => history.push('/home');
}

export function goToNotes () {
    const history = useHistory();
    return () => history.push('/notes');
};

export function goToAddNotes () {
    const history = useHistory();
    return () => history.push('/AddNote');
};