import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newSignUp } from "src/Features/userSlice";
import { simpleValidationCheck } from "src/Functions/componentsFunctions";
import s from "./LogInForm.module.scss";
import { toast } from "react-toastify";

const LogInForm = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { signedUpUsers } = useSelector((state) => state.user);
  const emailOrPhone = useRef("moamalalaapro1@gmail.com");
  const password = useRef("moamalalaapro123");

  async function login(e) {
    const inputs = e.target.querySelectorAll("input");
    e.preventDefault();

    const isFormValid = simpleValidationCheck(inputs);
    if (!isFormValid) return;

    const dataByEmail = filterLoginByEmailOrPhone();
    const isCorrectLoginData = checkLoginPassword(dataByEmail);

    const formDataObj = new FormData(e.target);
    const formData = {};

    for (let pair of formDataObj.entries()) {
      formData[pair[0]] = pair[1];
    }


    let obj = {
      email: formData.emailOrPhone,
      password: formData.Password,
    }


    let res = await fetch('https://api.freeapi.app/api/v1/users/login', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(res => res.json())

    console.log(res, "==res");
    if (res.statusCode == 200) {
      dispatch(newSignUp(signedUpUsers));
      navigateTo("/", { replace: true });
    }
    else {
      toast.error(res.message)
    }
   
  }

  function filterLoginByEmailOrPhone() {
    return signedUpUsers?.filter(
      (user) => user.emailOrPhone === emailOrPhone.current
    );
  }

  function checkLoginPassword(filteredUsersData) {
    const isPasswordValid = filteredUsersData[0]?.password === password.current;
    return isPasswordValid;
  }

  return (
    <form className={s.form} onSubmit={login}>
      <h2>Log in to Exclusive</h2>
      <p>Enter your details below</p>

      <div className={s.inputs}>
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone Number"
          onChange={(e) => (emailOrPhone.current = e.target.value)}
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={(e) => (password.current = e.target.value)}
        />
      </div>

      <div className={s.buttons}>
        <button type="submit" className={s.loginBtn}>
          Log In
        </button>

        <a href="#">Forget Password?</a>
      </div>
    </form>
  );
};
export default LogInForm;
