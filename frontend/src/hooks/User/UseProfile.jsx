import { useEffect, useState } from "react";
import { useUserContext } from "../../context/User/UserContext";

const useProfile = () => {
  const { user, getProfile, updateProfile, loading } = useUserContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const data = await getProfile();
        if (data) {
          setForm((prev) => ({
            ...prev,
            name: data.name || "",
            email: data.email || "",
          }));
        }
      } else {
        setForm((prev) => ({
          ...prev,
          name: user.name || "",
          email: user.email || "",
        }));
      }
    };
    fetchUser();
  }, [user, getProfile]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    const filteredData = Object.fromEntries(
      Object.entries(form).filter(([_, value]) => value !== "")
    );

    try {
      await updateProfile(filteredData);
    } catch (err) {
      if (typeof err === "object") {
        setErrors(err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    errors,
    loading,
    submitting,
    handleChange,
    handleSubmit,
  };
};

export default useProfile;
