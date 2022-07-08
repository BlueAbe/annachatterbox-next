const dataForm = document.querySelector(".newsletter__form");
const firstName = document.querySelector("#name");
const email = document.querySelector("#email");
const button = document.querySelector(".newsletter__button");
const buttonText = document.querySelector(".button__text");
// type is either 'password' or 'data'
const updateSettings = async (data) => {
  console.log(data);
  try {
    const url = "https://annachatterbox.herokuapp.com/api/newsletters";
    buttonText.innerHTML = "Going...";
    const res = await axios.post(url, data);
    if (res.status === 200) {
      console.log("success");
      buttonText.innerHTML = "You are in !";
    }
    console.log(process.env.MAIL_USER);
    console.log(process.env.MAIL_PASS);
  } catch (err) {
    console.log(err.response.data.error.message);
    buttonText.innerHTML = "You are out";
    if (err.response.data.error.message == "This attribute must be unique")
      buttonText.innerHTML = "It's Ready";
  }
};
if (dataForm) {
  dataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = { data: { name: firstName.value, email: email.value } };
    updateSettings(form);
  });
}
