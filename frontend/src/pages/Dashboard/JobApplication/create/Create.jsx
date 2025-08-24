import React, { useState } from "react";
import { toast } from "react-toastify";
import useJobs from "../../../../hooks/JobApplication/UseJobs";
import useJobForm from "../../../../hooks/JobApplication/UseJobForm";
import JobForm from "../../../../components/JobForm";

const Create = ({ onClose }) => {
  const { createJob } = useJobs();
  const { form, errors, handleChange, validateForm } = useJobForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      let appliedAt = form.applied_at
        ? new Date(form.applied_at).toISOString().slice(0, 19).replace("T", " ")
        : null;

      await createJob({ ...form, applied_at: appliedAt });
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to add job!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobForm
      form={form}
      errors={errors}
      handleChange={handleChange}
      loading={loading}
      onSubmit={handleSubmit}
      onClose={onClose}
      mode="create"
    />
  );
};

export default Create;
