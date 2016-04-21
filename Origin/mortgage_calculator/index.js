var periods = {
	monthly: 12,
	bimonthly: 6
}


// populate select box.
$(document).ready(function(){
	var $select = $("#period")
	var periodNames = Object.keys(periods);

	periodNames.map(function(i){
		var $option = $('<option></option>');
		$option.text(i);
		$option.val(periods[i]);

		$select.append($option);
	})
});


function calculatePeriodPayment(loanBalance, interestRate, loanTerm, paymentsPerYear){
	// divided the annual interest rate by the number payments per year.
	var interestRateMonthly = interestRate / paymentsPerYear;
	// convert the interest rate from a percentage to a decimal
	var interestRateMonthlyDecimal = interestRateMonthly * .01;
	// calculate the numerator of the fraction, i.e., r(r+1)^n
	var ratePlusOne = interestRateMonthlyDecimal + 1;
	console.log(ratePlusOne)
	// get the total number of payments by multiplying # of years by payments per year.
	var loanTermMonths = loanTerm * paymentsPerYear;
	var PlusOneNthPower = Math.pow(ratePlusOne, loanTermMonths);
	var numerator = PlusOneNthPower * interestRateMonthlyDecimal;

	// calculate denominator (r+1)^n - 1
	var denominator = PlusOneNthPower - 1;

	var divide = numerator/denominator;

	var payment = loanBalance * divide;

	return payment;
}


function showPaymentForPeriod(){
	var loanBalance = $("#loan-balance").val();
	var interestRate = $("#interest-rate").val();
	var loanTerm = $("#loan-term").val();
	var period = $("#period").val()
	var periodName = $('#period :selected').text();

	var periodPayment = calculatePeriodPayment(loanBalance, interestRate, loanTerm, period)

	// round the period payment to the second decimal points
	var periodPaymentRounded = periodPayment.toFixed(2);
	$('p').remove();
	var $p = $('<p></p>');

	// append message telling user to make sure inputs are all numbers if output is not a number
	var notNum = isNaN(periodPaymentRounded)
	if (notNum){
		$p.text("One or more of the inputs is not a number.")
	} else {
	$p.text('Your ' + periodName + ' payment is $' + periodPaymentRounded + '.');
	}
	$('body').append($p);
}
