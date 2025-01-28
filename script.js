document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('ageForm');
  const content = document.getElementById('content');

  // Load saved form data from localStorage:
  const savedData = JSON.parse(localStorage.getItem('formData'));
  if (savedData) {
    document.getElementById('firstName').value = savedData.firstName || '';
    document.getElementById('lastName').value = savedData.lastName || '';
    document.getElementById('birthdate').value = savedData.birthdate || '';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const birthdate = new Date(document.getElementById('birthdate').value);

    if (!firstName || !lastName || isNaN(birthdate.getTime())) {
      content.textContent = 'Please fill out all of the fields correctly.';
      return;
    }

    // Save form data to localStorage:
    const formData = {
      firstName: firstName,
      lastName: lastName,
      birthdate: document.getElementById('birthdate').value,
    };
    localStorage.setItem('formData', JSON.stringify(formData));

    // Age calculation:
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    const isOver19 = age > 19 || (age === 19 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

    // Displaying content:
    if (isOver19) {
      content.textContent = `Hello, ${firstName} ${lastName}.`;
    } else {
      content.textContent = 'Sorry, you must be over the age of 19 to see this content.';
    }
  });
});
