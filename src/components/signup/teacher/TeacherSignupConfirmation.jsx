import SignupReview from "../common/SignupReview.jsx";
import SignupSuccess from "../common/SignupSuccess.jsx";

const detailItems = [
  { label: "Name", value: (formData) => formData.name },
  { label: "Email", value: (formData) => formData.email },
  { label: "Age", value: (formData) => formData.age },
  { label: "Gender", value: (formData) => formData.gender },
  {
    label: "Qualification",
    value: (formData) =>
      formData.qualification === "Other"
        ? formData.otherQualification
        : formData.qualification,
  },
  { label: "Specialization", value: (formData) => formData.specialization },
  { label: "Institution", value: (formData) => formData.institution },
];

export default function TeacherSignupConfirmation({
  formData,
  onBack,
  onSubmit,
  isSubmitting = false,
  submitError = "",
  isSubmitted = false,
}) {
  if (isSubmitted) {
    return <SignupSuccess accountType="teacher" />;
  }

  return (
    <SignupReview
      formData={formData}
      detailItems={detailItems}
      accountType="teacher"
      onBack={onBack}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      submitError={submitError}
    />
  );
}
