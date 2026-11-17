import SignupReview from "../common/SignupReview.jsx";
import SignupSuccess from "../common/SignupSuccess.jsx";

const detailItems = [
  { label: "Name", value: (formData) => formData.name },
  { label: "Email", value: (formData) => formData.email },
  { label: "Age", value: (formData) => formData.age },
  { label: "Gender", value: (formData) => formData.gender },
  { label: "Country", value: (formData) => formData.country },
  { label: "Class / Grade", value: (formData) => formData.grade },
  {
    label: "Education Board",
    value: (formData) => formData.educationBoard,
  },
];

export default function StudentSignupConfirmation({
  formData,
  onBack,
  onSubmit,
  isSubmitting = false,
  submitError = "",
  isSubmitted = false,
}) {
  if (isSubmitted) {
    return <SignupSuccess accountType="student" />;
  }

  return (
    <SignupReview
      formData={formData}
      detailItems={detailItems}
      accountType="student"
      onBack={onBack}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submitError={submitError}
    />
  );
}
