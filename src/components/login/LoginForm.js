import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from 'material-ui/TextField';
import { withFormik } from 'formik';
import yup from 'yup';

// import { grey500, red500, white } from 'material-ui/styles/colors';

const red500 = "red";

const formValidationSchema = yup.object().shape({
    regNo: yup.number().label("Registration Number").required().positive().integer(),
    username: yup.string().label("Username").required(),
    password: yup.string().label("Password").required(),
});


const styles = {
    checkRemember: {
        style: {
            float: 'left',
            maxWidth: 180,
            paddingTop: 5,
            fontSize: 14
        }
    },
    loginBtn: {
        float: 'right',
        marginTop: '10px'
    },
    errorMessage: {
        padding: '10px',
        backgroundColor: red500,
        color: "white",
        fontSize: 12,
        marginBottom: '10px'
    }
};

const InnerForm = ({
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    canSubmit,
    errorMessage
  }) => (
        <form onSubmit={handleSubmit}>
            {errorMessage ? <Paper style={styles.errorMessage}>
                {errorMessage}

            </Paper> : null}

            <TextField
                autoFocus
                label="Nickname"
                fullWidth={true}
                onChange={handleChange}
                onBlur={handleBlur}
                name="username"
                value={values.username}
                helperText={errors.username}
                error={(errors.username != null)}
            />

            <TextField
                label="Registration Number"
                onChange={handleChange}
                fullWidth={true}
                onBlur={handleBlur}
                //type="number"
                name="regNo"
                value={values.regNo}
                helperText={errors.regNo}
                error={(errors.regNo != null)}
            />


            <TextField
                label="Password"
                fullWidth={true}
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                helperText={errors.password}
                error={(errors.password != null)}
                name="password"
            />

            <TextField
                style={{display:'none'}}
                label="Access Token (Optional)"
                fullWidth={true}
                onChange={handleChange}
                onBlur={handleBlur}
                name="accessToken"
                value={values.accessToken}
                helperText={errors.accessToken}
                error={(errors.accessToken != null)}
            />            

            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            style={styles.checkRemember.style}
                            checked={values.isPersistent}
                            name="isPersistent"
                            color="primary"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />}
                    label="Remember me" />

                <Button variant="raised" type="submit" disabled={!canSubmit}
                    color="primary"
                    style={styles.loginBtn}
                >Login</Button>
            </div>
        </form>
    );

const LoginForm = withFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: formValidationSchema,
    mapPropsToValues: (props) =>
        ({
            regNo: props.regNo || "",
            username: props.username || "",
            password: props.password || "",
            accessToken: props.accessToken || "",
            isPersistent: props.isPersistent || true
        }),
    handleSubmit: (values, { props }) => {
        props.onSubmit(values);
    }
})(InnerForm);


InnerForm.propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    canSubmit: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired
};



export default LoginForm;