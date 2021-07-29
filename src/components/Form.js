import React from "react";
import { useFormik } from "formik";
const initialValues = {
  searchTerm: "",
};

const onSubmit = (values, onSubmitProps) => {
  try {
    console.log(values);
  } catch (e) {
    console.log(e);
  } finally {
    onSubmitProps.setSubmitting(false);
  }
};
function Form(props) {
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
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Form;
