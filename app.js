document.getElementById('loan-form').addEventListener('submit',
    e => {
        document.getElementById('results').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        setTimeout(calculateResults, 2000);
        e.preventDefault();
    });

function calculateResults(e) {
    console.log('Calculating...');

    let amount = document.getElementById('amount');
    let interest = document.getElementById('interest');
    let years = document.getElementById('years');
    let monthlyPayment = document.getElementById('monthly-payment');
    let totalPayment = document.getElementById('total-payment');
    let totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterested = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterested, calculatedPayments);
    const monthly = (principal * x * calculatedInterested) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please check your numbers.');
    }
    document.getElementById('loading').style.display = 'none';
}

function clearError() {
    document.querySelector('.alert').remove();
}

function showError(msg) {
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    let error = document.createElement('div');
    error.className = 'alert alert-danger'
    error.appendChild(document.createTextNode(msg))

    card.insertBefore(error, heading);

    setTimeout(clearError, 3000);
}
