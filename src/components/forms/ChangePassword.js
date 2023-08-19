import { useState, useEffect } from "react";
import Modal from "../UI/Modal"
import FormInput from "./FormInput";
const ChangePassword = (props) => {
    const [ timer, setTimer ] = useState(null);
    const [ user, setuser ] = useState(props.profileInfo ? props.profileInfo : null);
    const [ errors, setErrors ] = useState({});

    const [ formValues, setFormValues ] = useState({
        securityQuestion: props.bType !== "forgotPasswordLogin" ? user.securityQuestion.question : null,
        currentPassword: null,
        email: props.bType !== "forgotPasswordLogin" ? user.email : null,
        newPassword: null,
        confirmPassword: null,
        inputAnswer: null,
    })
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };
    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    }, [ timer ]);

    useEffect(() => {

        console.log("email: " + formValues.email);
    }, [ formValues.email ]);

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [ name ]: value,
        }));

        clearTimeout(timer); // Clear the previous timer

        // Use debounce to delay the email check
        const emailExists = debounce(async (email) => {
            const emailExists = await checkEmailAndSetSecurityQuestion(email);
            if (!emailExists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "User not found",
                }));
            }
        }, 1000);

        // Start the timer for email check
        const emailTimer = setTimeout(() => {
            emailExists(value); // Execute the debounce function after 1000ms
        }, 1000);

        // Set the timer reference
        setTimer(emailTimer);
    };
    const handleEmailChangeDebounced = debounce(handleEmailChange, 1000);

    const checkEmailAndSetSecurityQuestion = async (email) => {
        if (email !== null && email !== "") {
            const user = await checkEmailExists(email);

            if (!user) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "User not found",
                }));
                setFormValues((prevValues) => ({
                    ...prevValues,
                    securityQuestion: null,
                }));
                return false;
            }
            if (user.securityQuestion && user.securityQuestion.question) {
                setuser(user);
                setFormValues((prevValues) => ({
                    ...prevValues,
                    securityQuestion: user.securityQuestion.question,
                }));
                return true;
            }
        }
        return false;
    };
    const checkEmailExists = async (email) => {
        try {
            const response = await fetch("http://localhost:3001/users/checkEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();
            return data.user;
        } catch (error) {
            console.error("Email existence check failed:", error);
            return null;
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [ name ]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const { email, newPassword } = formValues; // Assuming these are the values you want to send to the backend
            // Make a POST request to your backend route
            const response = await fetch('http://localhost:3001/users/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: newPassword,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Password updated successfully
                    console.log('Password updated successfully');
                    props.onClose()
                } else {
                    // User not found
                    console.log('User not found');
                }
            } else {
                // Handle non-OK response
                console.error('Password update failed:', response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Password update failed:', error);
        }

    };

    const showForgotPassword = (
        <>
            <fieldset disabled>
                <FormInput
                    placeholder={ formValues.securityQuestion ? formValues.securityQuestion : "provide a valid user email" }
                    name="question"
                    label="Security Question"
                    type="text"
                />
            </fieldset>
            <FormInput
                type="text"
                placeholder="write your answer"
                name="inputAnswer"
                value={ formValues.inputAnswer }
                onChange={ handleInputChange }
                pattern={ user ? user.securityQuestion.answer : '' }
                errorMessage="Wrong answer!"
                label="answer"
                required={ true }
            />


        </>
    )



    const showForgotPasswordLogin = (
        <>
            <FormInput
                type="email"
                label="email"
                placeholder="enter your email"
                name="email"
                value={ formValues.email }
                onChange={ handleEmailChange }
                errorMessage={ errors.email || "invalid email!" }
                required={ true }
            />

            { showForgotPassword && showForgotPassword }
        </>
    )
    const showChangePassword = (
        <>
            <FormInput
                type="password"
                placeholder="Current Password"
                name="currentPassword"
                onChange={ handleInputChange }
                pattern={ user ? user.password : '' }
                errorMessage="incorrect password!"
                required={ true }
                label="Current Password"


            />

        </>
    )

    const whatToShow =
        props.bType === "changePassword" ? showChangePassword
            : props.bType === "forgotPassword" ? showForgotPassword
                : showForgotPasswordLogin;


    return (
        <Modal >
            <div className="d-flex flex-row justify-content-end p-1 w-100 p-3 s">
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    dal
                    onClick={ props.onClose }
                ></button>
            </div>

            <form className="form-check " onSubmit={ submitHandler }>
                <p className="text-center display-7">change Password</p>
                { whatToShow }
                <FormInput
                    type="password"
                    placeholder="enter new Password"
                    name="newPassword"
                    onChange={ handleInputChange }
                    pattern={ `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$` }
                    errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
                    required={ true }
                    label="New Password"

                />

                <FormInput type="password"
                    placeholder="enter password again"
                    name="confirmPassword"
                    onChange={ handleInputChange }
                    pattern={ formValues.newPassword }
                    errorMessage="Password do not match"
                    required={ true }
                    label="Conffirm Password"
                />


                <div className="d-flex justify-content-center  mt-4">
                    <button className=" btn btn-primary btn-sm" type="submit" >
                        Submit
                    </button></div>

            </form>
        </Modal>)

}
export default ChangePassword;