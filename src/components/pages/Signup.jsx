import { useState } from "react";
import RoleSelection from "../signup/common/RoleSelection.jsx";
import SignupProgress from "../signup/SignupProgress";
import TeacherBasicDetails from "../signup/teacher/TeacherSignup";
import TeacherQualification from "../signup/teacher/TeacherQualification";
import AccountDetails from "../signup/common/AccountDetails";
import TeacherSignupConfirmation from "../signup/teacher/TeacherSignupConfirmation.jsx";
import StudentBasicDetails from "../signup/student/StudentBasicDetails.jsx";
import StudentSignupConfirmation from "../signup/student/StudentSignupConfirmation.jsx";
import { register } from "../../services/authService.js";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");

  const [teacherFormData, setTeacherFormData] = useState({
    name: "",
    age: "",
    gender: "",
    qualification: "",
    specialization: "",
    institution: "",
    otherQualification: "",
  });
  const [studentFormData, setStudentFormData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
    grade: "",
    educationBoard: "",
  });
  const [accountFormData, setAccountFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = selectedRole === "student" ? 4 : 5;

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email" || name === "password" || name === "confirmPassword") {
      setAccountFormData((currentFormData) => ({
        ...currentFormData,
        [name]: value,
      }));
      return;
    }

    const setRoleFormData =
      selectedRole === "student" ? setStudentFormData : setTeacherFormData;
    setRoleFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    const registrationDetails = {
      ...(selectedRole === "student" ? studentFormData : teacherFormData),
      ...accountFormData,
    };
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

  const roleFormData = {
    ...(selectedRole === "student" ? studentFormData : teacherFormData),
    ...accountFormData,
  };

  return (
    <main className="page-enter min-h-[calc(100vh-4rem)] bg-[#faf9f6] px-5 py-12 sm:px-8 sm:py-16">
      {step > 1 && (
        <SignupProgress currentStep={step} totalSteps={totalSteps} />
      )}
      {step === 1 && (
        <RoleSelection
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          onContinue={() => setStep(2)}
        />
      )}

      {step === 2 && selectedRole === "teacher" && (
        <TeacherBasicDetails
          formData={roleFormData}
          onChange={handleChange}
          onBack={() => setStep(1)}
          onContinue={() => setStep(3)}
        />
      )}

      {step === 2 && selectedRole === "student" && (
        <StudentBasicDetails
          formData={roleFormData}
          onChange={handleChange}
          onBack={() => setStep(1)}
          onContinue={() => setStep(3)}
        />
      )}

      {step === 3 && selectedRole === "teacher" && (
        <TeacherQualification
          formData={roleFormData}
          onChange={handleChange}
          onBack={() => setStep(2)}
          onContinue={() => setStep(4)}
        />
      )}

      {step === 4 && selectedRole === "teacher" && (
        <AccountDetails
          formData={roleFormData}
          onChange={handleChange}
          onBack={() => setStep(3)}
          onContinue={() => setStep(5)}
        />
      )}

      {step === 3 && selectedRole === "student" && (
        <AccountDetails
          formData={roleFormData}
          onChange={handleChange}
          onBack={() => setStep(2)}
          onContinue={() => setStep(4)}
        />
      )}

      {step === 5 && selectedRole === "teacher" && (
        <TeacherSignupConfirmation
          formData={roleFormData}
          onBack={() => setStep(4)}
          onSubmit={handleSignup}
          isSubmitting={isSubmitting}
          submitError={submitError}
          isSubmitted={isSubmitted}
        />
      )}

      {step === 4 && selectedRole === "student" && (
        <StudentSignupConfirmation
          formData={roleFormData}
          onBack={() => setStep(3)}
          onSubmit={handleSignup}
          isSubmitting={isSubmitting}
          submitError={submitError}
          isSubmitted={isSubmitted}
        />
      )}
    </main>
  );
}
