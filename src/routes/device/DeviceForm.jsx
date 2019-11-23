
import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import Form from "./Form";
import Paper from "@material-ui/core/Paper";
import * as yup from 'yup';

const validationSchema= yup.object({
    uid: yup.string("Enter UID").required("UID is manditory"),
    imei: yup.string("Enter imei").email('Please enter correct email id'),
    mac: yup.string("Enter mac"),
    deviceType: yup.string("Select Device Type"),
})

const styles = {
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  container: {
    maxWidth: "200px"
  }
};

class DeviceForm extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
   
    render() {
      const classes = this.props;
      const values = { uid:"", imei:"", mac:"", deviceType:"" }
      return (
        <React.Fragment>
             <div className={classes.container}>
            <Paper elevation={1} className={classes.paper}>
              <h1>Form</h1>
              <Formik
                render={props => <Form {...props} />}
                initialValues={values}
                validationSchema={validationSchema}
              />
            </Paper>
          </div>
        </React.Fragment>
      );
    }
   }
   
   export default withStyles(styles)(DeviceForm);