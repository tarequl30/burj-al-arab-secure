import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';
import { Button } from '@material-ui/core';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

        const handleDateChange = (date) => {
            setSelectedDate(date);
        };

        const handleBooking = () => {
            const newBooking = {...loggedInUser, ...selectedDate}
            fetch('/http://localhost:5000/addBooking', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newBooking)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        }
    const {bedType} = useParams();
    return (
        <div style={{textAlign: 'center'}}>
            <h1> hei ,{loggedInUser.displayName}! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Button onClick={handleBooking} variant="contained" color="primary" > Book Now</Button>
    </MuiPickersUtilsProvider>
        </div>
    );
};

export default Book;