import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Autocomplete from '@material-ui/lab/Autocomplete';


const styles = {
  textField: {
    width: '100%',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginRight: '5px',
  },
  errorMessageText: {
    color: 'red',
  },
  helperLink: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};


function Form({
  classes, submit, cancel, types, sims, values: { name, email, password, confirmPassword },
  errors,
  touched,
  handleChange,
  isValid,
  setFieldTouched
}) {

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
      };


  const typeOptions = {
    options: types,
  };
  const simNumbers = (sims && sims.length > 0)?sims.map((item) => item.number.toString()): [];
  const simOptions = {
    options: simNumbers,
  };

  const [newSim, setNewSim] = React.useState(false);

  return (
    <div>
      <form onSubmit={submit}>
        <Grid container spacing={1}>
          <Grid item sm={2} md={2} />
          <Grid item sm={8} md={8}>
            <Grid container spacing={1}>
              <Grid item md={4} xs={12}>
                <TextField
                  id="uid"
                  label="UID"
                  className={classes.textField}
                  margin="normal"
                  helperText={touched.uid ? errors.uid : ""}
                  error={touched.uid && Boolean(errors.uid)}
                  onChange={change.bind(null, "uid")}
                />
                <TextField
                  id="imei"
                  label="IMEI"
                  className={classes.textField}
                  type="email"
                  margin="normal"
                  helperText={touched.imei ? errors.imei : ""}
                  error={touched.imei && Boolean(errors.imei)}
                  onChange={change.bind(null, "imei")}
                />
                <TextField
                  id="mac"
                  label="MAC"
                  className={classes.textField}
                  margin="normal"
                  helperText={touched.mac ? errors.mac : ""}
                  error={touched.mac && Boolean(errors.mac)}
                  onChange={change.bind(null, "mac")}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Autocomplete
                  {...typeOptions}
                  id="deviceType"
                  autoComplete
                  includeInputInList
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Device Type"
                      className={classes.textField}
                      margin="normal"
                      helperText={touched.deviceType ? errors.deviceType : ""}
                      error={touched.deviceType && Boolean(errors.deviceType)}
                      onChange={change.bind(null, "deviceType")}
                    />
                  )}
                />
              </Grid>
              {!newSim && (
                <Grid item md={4} xs={12}>
                  <Autocomplete
                    {...simOptions}
                    id="sim"
                    autoComplete
                    includeInputInList
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="SIM"
                        margin="normal"
                        helperText={
                          <Link
                            onClick={() => {
                              setNewSim(true);
                            }}
                            className={classes.helperLink}
                          >
                            add new SIM
                          </Link>
                        }
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              )}
              {newSim && (
                <Grid item md={4} xs={12}>
                  <TextField
                    id="number"
                    label="Mobile Number"
                    type="number"
                    className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    id="provider"
                    label="SIM Provider"
                    className={classes.textField}
                    margin="normal"
                  />
                  <TextField
                    id="simIMEI"
                    label="SIM IMEI"
                    className={classes.textField}
                    helperText={
                      <Link
                        onClick={() => {
                          setNewSim(false);
                        }}
                        className={classes.helperLink}
                      >
                        choose existing SIM
                      </Link>
                    }
                    margin="normal"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <div className={classes.actionBar}>
                  <Button
                    onClick={cancel}
                    color="primary"
                    variant="contained"
                    className={classes.button}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.button}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2} md={2} />
        </Grid>
      </form>
    </div>
  );
}

export default withStyles(styles)(Form);
