import { useState } from "react";

const useJobForm = (initialValues = {}) => {
  const [form, setForm] = useState({
    company_name: initialValues.company_name || "",
    position: initialValues.position || "",
    type: initialValues.type || "Full Time",
    source: initialValues.source || "",
    applied_at: initialValues.applied_at
      ? new Date(initialValues.applied_at).toISOString().slice(0, 16)
      : "",
    status: initialValues.status || "Applied",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.company_name.trim())
      newErrors.company_name = ["Company name is required"];
    if (!form.position.trim()) newErrors.position = ["Position is required"];
    if (!form.source.trim()) newErrors.source = ["Source is required"];
    if (!form.applied_at) newErrors.applied_at = ["Applied date is required"];

    setErrors(newErrors);
    return newErrors;
  };

  return { form, setForm, errors, setErrors, handleChange, validateForm };
};

export default useJobForm;
