const dataForm = document.querySelector(".newsletter__form");
const firstName = document.querySelector("#name");
const email = document.querySelector("#email");
const button = document.querySelector(".newsletter__button");
const buttonText = document.querySelector(".button__text");

const updateSettings = async (data) => {
  try {
    const url = "/api/invitation";
    buttonText.innerHTML = "Going...";
    const res = await axios.post(url, data);
    if (res.status === 200) {
      buttonText.innerHTML = "You are in !";
    }
  } catch (err) {
    if (err.response.data.data.message == "This e-mail has been registered")
      buttonText.innerHTML = "It's Ready";
    else buttonText.innerHTML = "You are out";
  }
};
if (dataForm) {
  dataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = { data: { name: firstName.value, email: email.value } };
    updateSettings(form);
  });
}
