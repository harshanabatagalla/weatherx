import React, { useState } from 'react';
import { TextField, Button, Container, Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import '../styles/login.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false); // Move this line here

    const handleLogin = (event) => {
        event.preventDefault();
        const correctUsername = process.env.REACT_APP_USERNAME;
        const correctPassword = process.env.REACT_APP_PASSWORD;

        if (username === correctUsername && password === correctPassword) {
            navigate('/weather');
        } else {
            setOpen(true);
            console.log(process.env.REACT_APP_USERNAME);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs" className="center-container">
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Incorrect Credentials
                </Alert>
            </Snackbar>
            <Dialog open={true} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="log">
                    <div className='headding-txt'>
                        Login to Your Weather App
                    </div>
                    <form onSubmit={handleLogin}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        required
                    />
                    <Button
                        variant="contained"
                        type='submit'
                        color="warning"
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Login
                    </Button>
                    </form>
                </div>
            </Dialog>
        </Container>
    );
};

export default Login;
