import React from "react";
import { useFormik } from "formik";

function Form({ setSearchterm }) {
  const initialValues = {
    searchTerm: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    try {
      console.log("values", values);
      setSearchterm(values.searchTerm);
    } catch (e) {
      console.log(e);
    } finally {
      onSubmitProps.setSubmitting(false);
      onSubmitProps.resetForm();
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="searchTerm"
          value={formik.values.searchTerm}
          onChange={formik.handleChange}
        />
        <button type="submit">Search Artist</button>
      </form>
    </div>
  );
}

export default Form;
