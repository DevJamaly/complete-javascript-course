'use strict';

//=====================DEFAULT PARAMETERS=====================
const bookings = [];

//You can assign default value to parameters with '='
//We can also use expression to calculate it not just literals !
//If using argument values to calculate paramter default then it has to be declared after the parameter whose argument we will use! it cannot be decalred before that
//We cannot skip parameters with default value on function calls. So if 2 and 3rd are default value parameters then i cannot only provide an arguemnt for 3rd and skip the 2nd
function createBooking(
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers,
) {
  //This is the old ES5 way of doing things
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH514', 5);
createBooking('LH516', 2);
// createBooking('LH123',,1000); // wont work, you cannot skip arguments
createBooking('LH123', undefined, 1000); // instead we can do this

//=====================ARGUEMNTS:VALUE vs REFERENCE=====================
