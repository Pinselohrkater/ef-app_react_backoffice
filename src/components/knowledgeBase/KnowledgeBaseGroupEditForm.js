import React from 'react';
import { withFormik } from 'formik';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import yup from 'yup';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';

import Grid from 'material-ui/Grid';

const formValidationSchema = yup.object().shape({
    Name: yup.string().label("Name").required()
});

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
            {errorMessage ? <Paper>
                {errorMessage}

            </Paper> : null}


            <Grid container spacing={24} alignItems="flex-end">
                <Grid item xs={12} md={1}>

                    <TextField
                        autoFocus
                        label="Order"
                        onChange={handleChange}
                        fullWidth={true}
                        onBlur={handleBlur}
                        name="Order"
                        value={values.Order}
                        helperText={errors.Order}
                        error={(errors.Order != null)}
                        type="number"

                    />
                </Grid>
                <Grid item xs={2} md={1}>
                    <center>
                        <Icon className="fa">{String.fromCharCode(parseInt(values.FontAwesomeIconCharacterUnicodeAddress, 16))}</Icon>
                    </center>
                </Grid>
                <Grid item xs={10} md={1}>

                    <TextField
                        autoFocus
                        label="Icon"
                        onChange={handleChange}
                        fullWidth={true}
                        onBlur={handleBlur}
                        name="FontAwesomeIconCharacterUnicodeAddress"
                        value={values.FontAwesomeIconCharacterUnicodeAddress}
                        helperText={errors.FontAwesomeIconCharacterUnicodeAddress}
                        error={(errors.FontAwesomeIconCharacterUnicodeAddress != null)}
                    />
                </Grid>

                <Grid item xs={12} md={3}>

                    <TextField
                        autoFocus
                        label="Name"
                        onChange={handleChange}
                        fullWidth={true}
                        onBlur={handleBlur}
                        name="Name"
                        value={values.Name}
                        helperText={errors.Name}
                        error={(errors.Name != null)}
                    />
                </Grid>

                <Grid item xs={12} md={4}>

                    <TextField
                        autoFocus
                        label="Name"
                        onChange={handleChange}
                        fullWidth={true}
                        onBlur={handleBlur}
                        name="Description"
                        value={values.Description}
                        helperText={errors.Description}
                        error={(errors.Description != null)}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="raised"
                        fullWidth={true}
                        type="submit" disabled={!canSubmit} color="primary"
                        style={{minWidth: 0}}
                    >
                        Save
                        </Button>
                </Grid>
            </Grid>


        </form>
    );

const KnowledgeBaseGroupEditForm = withFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: formValidationSchema,
    mapPropsToValues: (props) =>
        ({
            Name: props.Name || "",
            Description: props.Description || "",
            Order: props.Order || 0,
            FontAwesomeIconCharacterUnicodeAddress: props.FontAwesomeIconCharacterUnicodeAddress || ""
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
    errorMessage: PropTypes.string
};



export default KnowledgeBaseGroupEditForm;