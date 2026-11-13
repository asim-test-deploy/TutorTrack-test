import { useState } from "react";
import RoleSelection from "../signup/RoleSelection";
import SignupProgress from "../signup/SignupProgress";
import TeacherBasicDetails from "../signup/teacher/TeacherSignup";
import TeacherQualification from "../signup/teacher/TeacherQualification";
import AccountDetails from "../signup/common/AccountDetails";
import TeacherSignupConfirmation from "../signup/teacher/TeacherSignupConfirmation.jsx";
import { register } from "../../services/authService.js";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    qualification: "",
    specialization: "",
    institution: "",
    otherQualification: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    const registrationDetails = { ...formData };
    delete registrationDetails.confirmPassword;

    try {
      await register({
        ...registrationDetails,
        role: selectedRole,
      });
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We could not create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-enter min-h-[calc(100vh-4rem)] bg-[#faf9f6] px-5 py-12 sm:px-8 sm:py-16">
      <SignupProgress currentStep={step} />
      {step === 1 && (
        <RoleSelection
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          onContinue={() => setStep(2)}
        />
      )}

      {step === 2 && selectedRole === "teacher" && (
        <TeacherBasicDetails
          formData={formData}
          onChange={handleChange}
          onBack={() => setStep(1)}
          onContinue={() => setStep(3)}
        />
      )}

      {step === 3 && selectedRole === "teacher" && (
        <TeacherQualification
          formData={formData}
          onChange={handleChange}
          onBack={() => setStep(2)}
          onContinue={() => setStep(4)}
        />
      )}

      {step === 4 && selectedRole === "teacher" && (
        <AccountDetails
          formData={formData}
          onChange={handleChange}
          onBack={() => setStep(3)}
          onContinue={() => setStep(5)}
        />
      )}

      {step === 5 && selectedRole === "teacher" && (
        <TeacherSignupConfirmation
          formData={formData}
          onBack={() => setStep(4)}
          onSubmit={handleSignup}
          isSubmitting={isSubmitting}
          submitError={submitError}
          isSubmitted={isSubmitted}
        />
      )}
    </main>
  );
}
