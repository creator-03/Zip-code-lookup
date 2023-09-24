const zipcodeInput = document.getElementById("zipcodeInput");
const resetButton = document.getElementById("resetButton");
const notification = document.getElementById("notification");
const result = document.getElementById("result");
const cityElement = document.getElementById("city");
const stateElement = document.getElementById("state");
const countryElement = document.getElementById("country");

zipcodeInput.addEventListener("submit", async (e) => {
  e.preventDefault();
  const zipcode = document.getElementById("zipcode").value.trim();
  if (!isValidZipcode(zipcode)) {
    notification.textContent = "Please enter 5 digits zipcode!";
    result.style.display = "none";
    return;
  }

  try {
    const response = await fetch(`https://ziptasticapi.com/${zipcode}`);
    if (response.status === 200) {
      const data = await response.json();
      displayLocationData(data);
    } else {
      notification.textContent = "Error fetching data";
      result.style.display = "none";
    }
  } catch (error) {
    console.error(error);
    notification.textContent = "An error occurred";
    result.style.display = "none";
  }
});

resetButton.addEventListener("click", () => {
  zipcodeInput.reset();
  notification.textContent = "";
  result.style.display = "none";
});

function isValidZipcode(zipcode) {
  const usZipcodePattern = /^\d{5}$/;
  return usZipcodePattern.test(zipcode);
}

function displayLocationData(data) {
  cityElement.textContent = data.city;
  stateElement.textContent = data.state;
  countryElement.textContent = data.country;
  result.style.display = "block";
  notification.textContent = "";
}
