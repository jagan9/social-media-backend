import React from 'react';
import { Paper, Container, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import logo1 from '../Media/logo1.jpg';
import { Redirect } from 'react-router-dom';
import avatar from '../Media/dummy-avatar.jpg';

function Signup(props) {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [emailerror, setEmailerror] = React.useState(null);
    const [nameerror, setNameerror] = React.useState(null);
    const [passerror, setPasserror] = React.useState(null);
    const [password, setPassword] = React.useState("");


    const submit = () => {
        let validData = true;

        if (email.length === 0) {
            validData = false;
            setEmailerror("email required");
        } else {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
                validData = true;
                setEmailerror(null);
            } else {
                validData = false;
                setEmailerror("enter valid email")
            }
        }

        if (name.length < 3) {
            validData = false;
            setNameerror("please enter name");
        } else {
            validData = true;
            setNameerror(null);
        }

        if (password.length < 5) {
            validData = false;
            setPasserror("must be 5 characters");
        } else {
            validData = true;
            setPasserror(null);
        }

        if (validData) {
            const userDetails = {
                name: name,
                email: email,
                password: password,
                img: avatar,
                bio: "available"
            };
            props.RegisterUser(userDetails);
        }

    }
    return (
        <Container style={{
            marginTop: "50px",
            maxWidth: "500px",
            textAlign: "center"
        }}
        >
            <Paper style={{
                padding: "10px 20px 40px 20px"
            }}
                elevation={3}>
                <img
                    alt="logo"
                    style={{
                        objectFit: "cover",
                        height: "70px",
                        paddingTop: "20px"
                    }}
                    src={logo1} />

                <TextField error={nameerror !== null} helperText={nameerror} onChange={(e) => setName(e.target.value)} style={{ marginBottom: "10px" }} fullWidth label="enter name" margin="dense" value={name} />
                <TextField error={emailerror !== null} helperText={emailerror} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: "10px" }} fullWidth label="enter email" margin="dense" type="email" value={email} />
                <TextField error={passerror !== null} helperText={passerror} onChange={(e) => setPassword(e.target.value)} fullWidth type="password" label="enter password" margin="dense" value={password} /><br /><br />
                <div style={{ color: "red" }}>{props.data.userError}</div>
                <Button onClick={() => submit()} variant="contained" fullWidth color="primary" style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "17px",
                    marginBottom: "10px"
                }}>Sign up</Button>
                <Link to="/login">
                    Already had an Account
                </Link>
                {props.data.loggedIn && <Redirect to="/" />}
            </Paper>
        </Container>
    )
}

export default Signup;

