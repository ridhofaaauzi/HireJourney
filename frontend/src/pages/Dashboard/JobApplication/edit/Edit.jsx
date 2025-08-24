import React, { useState } from "react";
import { toast } from "react-toastify";
import useJobs from "../../../../hooks/JobApplication/UseJobs";
import useJobForm from "../../../../hooks/JobApplication/UseJobForm";
import JobForm from "../../../../components/JobForm";

const Edit = ({ job, onClose }) => {
  const { updateJob } = useJobs();
  const { form, errors, handleChange, validateForm } = useJobForm(job);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      const firstErrorKey = Object.keys(clientErrors)[0];
      toast.error(clientErrors[firstErrorKey][0]);
      return;
    }

    setLoading(true);
    try {
      let appliedAt = form.applied_at
        ? new Date(form.applied_at).toISOString().slice(0, 19).replace("T", " ")
        : null;

      await updateJob(job.id, { ...form, applied_at: appliedAt });
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to update job!");
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
      mode="edit"
    />
  );
};

export default Edit;
