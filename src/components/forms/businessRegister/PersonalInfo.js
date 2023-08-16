import { React, useEffect, useState } from "react";
import { Input, Label } from "reactstrap";
import Select from "react-select";

const PersonalInfo = (props) => {

  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [enteredAnswer, setEnteredAnswer] = useState(null)

  const handleAnswer = (event) => {
    setEnteredAnswer(event.target.value);
    props.handleAnswerChange(event.target.value); // Call the provided function with the value
  };

  const handleQuestion = (selectedOption) => {
    setSelectedQuestion(selectedOption);
    props.handleQuestionChange(selectedOption.value); // Call the provided function with the value
  };


  const securityQuestions = [
    {
      label: "What is your mother's maiden name?",
      value: "What is your mother's maiden name?",
    },
    {
      label: "What was the name of your first pet?",
      value: "What was the name of your first pet?",
    },
    {
      label: "What is your favorite book?",
      value: "What is your favorite book?",
    },
    {
      label: "In what city were you born?",
      value: "In what city were you born?",
    },
  ];

  const inputs = [
    {
      id: 1,
      name: "fullname",
      type: "text",
      placeholder: "Full Name",
      label: "Full Name",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
    },
    {
      id: 5,
      name: "phoneNumber",
      type: "text",
      placeholder: "phoneNumber",
      label: "personal_phone",

    },
  ];
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <>
      <p className="text-center display-6">Personal Information</p>
      <form>
        {inputs.map((input) => (
          <div key={input.id}>
            <Label className="mt-2 mb-0" for={input.name}>
              {input.label}
            </Label>
            <Input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={props.formInput[input.name]}
              onChange={props.handleChange}
              invalid={props.errors[input.name] !== undefined}
            />
            {props.errors[input.name] && (
              <p
                style={{
                  fontSize: "12px",
                  color: "red",
                }}
              >
                {props.errors[input.name]}
              </p>
            )}
          </div>
        ))}

        <Label for="security question" >Security question</Label>
        <Select
          name="question"
          options={securityQuestions}
          autoFocus={true}
          className="custom-select text-center form-control form-select-sm"
          placeholder="Choose a security question"
          value={selectedQuestion}
          onChange={(selectedOption) =>
            handleQuestion(selectedOption)

          }
          aria-errormessage={props.errors["securityQuestion"] !== undefined}

        />
        {props.errors["securityQuestion"] && (
          <p
            style={{
              fontSize: "12px",
              color: "red",
            }}
          >
            {props.errors["securityQuestion"]}
          </p>
        )}
        <Label for="securityAnswer">Security answer</Label>
        <Input
          name="answer"
          type="text"
          placeholder="Your answer"
          label="Security answer"
          required={true}
          value={enteredAnswer}
          onChange={handleAnswer}
          invalid={props.errors["securityAnswer"] !== undefined}

        />
        {props.errors["securityAnswer"] && (
          <p
            style={{
              fontSize: "12px",
              color: "red",
            }}
          >
            {props.errors["securityAnswer"]}
          </p>
        )}
      </form>
    </>
  );
};

export default PersonalInfo;
