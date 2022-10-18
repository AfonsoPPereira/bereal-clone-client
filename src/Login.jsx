import ReactCodeInput from 'react-code-input';
import Button from '@mui/material/Button';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { appToast } from './utils';
import Cookies from 'universal-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import { Input } from '@mui/material';
import { usePublicFetch } from './hooks/usePublicFetch';
import AuthUserContext from './context/AuthUserContext';

export default function Login() {
    const cookies = new Cookies();
    const { requestCode, login } = usePublicFetch();
    const [, setAuthUser] = useContext(AuthUserContext);

    const [loading, setLoading] = useState(false);
    const [stage, setStage] = useState(0);

    const keyInput = useRef(null);
    const phoneInput = useRef(null);
    const codeInput = useRef(null);

    const jumpStepsToStage = (step = 1) => setStage((state) => state + step);

    const handleSubmitApiKey = async (event) => {
        event.preventDefault();

        setLoading(true);
        localStorage.setItem('be-real-api-key', keyInput.current.value);
        setLoading(false);

        jumpStepsToStage();
    };

    const handleSubmitPhone = useCallback(
        async (event) => {
            event?.preventDefault();

            setLoading(true);

            try {
                await requestCode(phoneInput.current.value.replaceAll(' ', ''));
                jumpStepsToStage();
            } catch (error) {
                appToast('Could not send phone verification', 'error');
            }

            setLoading(false);
        },
        [requestCode]
    );

    const handleSubmitCode = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await login(codeInput.current.state.value);

            setStage(0);

            setAuthUser(cookies.get('bereal-user-info'));

            appToast('User successfully logged in!');
        } catch (error) {
            appToast('Login error. Possible wrong code', 'error');
        }

        setLoading(false);
    };

    const getCurrentLocale = useMemo(() => {
        try {
            return Intl.DateTimeFormat().resolvedOptions().locale.split('-').pop().toLowerCase();
        } catch (error) {
            return '';
        }
    }, []);

    const GoBackButton = () => {
        return (
            <Button variant="outlined" color="secondary" onClick={() => jumpStepsToStage(-1)}>
                Go back
            </Button>
        );
    };

    if (loading) {
        return <CircularProgress disableShrink />;
    }

    if (!stage) {
        return (
            <form className="login-form" onSubmit={handleSubmitApiKey}>
                <div className="login-form-div">
                    <Input
                        type="text"
                        style={{ display: 'none' }}
                        autoComplete="username"
                        name="username"
                        value="api-key"
                    />
                    <Input
                        autoFocus={true}
                        inputRef={keyInput}
                        type="password"
                        placeholder="Enter API Key"
                        defaultValue={localStorage.getItem('be-real-api-key')}
                        autoComplete="current-password"
                        required
                    />
                </div>
                <Button variant="outlined" type="submit">
                    Submit API Key
                </Button>
            </form>
        );
    }

    if (stage === 1) {
        return (
            <form className="login-form" onSubmit={handleSubmitPhone}>
                <div className="login-form-div">
                    <PhoneInput
                        inputProps={{
                            autoFocus: true,
                            required: true,
                            ref: phoneInput,
                            autoComplete: 'on'
                        }}
                        placeholder="Enter phone number"
                        country={getCurrentLocale}
                        enableSearch
                        countryCodeEditable={false}
                        onEnterKeyPress={() => {
                            if (!loading) handleSubmitPhone();
                        }}
                    />
                </div>
                <Button variant="outlined" type="submit">
                    Request Phone Verification
                </Button>
                <GoBackButton />
            </form>
        );
    }

    return (
        <form className="login-form" onSubmit={handleSubmitCode}>
            <div className="login-form-div">
                <label>Insert code:</label>
                <ReactCodeInput
                    autoFocus={true}
                    ref={codeInput}
                    type="number"
                    fields={6}
                    name="code"
                    pattern="^\d{6}$"
                />
            </div>
            <Button variant="outlined" type="submit">
                Send Phone Verification and Login
            </Button>
            <GoBackButton />
        </form>
    );
}
