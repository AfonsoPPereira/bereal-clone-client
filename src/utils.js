import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function appToast (msg, type = 'success', options = {}) {
    return toast(msg, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        pauseOnFocusLoss: false,
        progress: undefined,
        ...options,
        type
    });
}
