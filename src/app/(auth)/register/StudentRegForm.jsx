import { Grid } from "@mui/material";
import { Field, Form, Formik } from "formik";
import TextInput from "../../components/forms/TextInput";
import AutoCompleteTextInput from "../../components/forms/AutoCompleteTextInput";
import DatePickerField from "../../components/forms/DatePickerField";
import GenderOptionField from "../../components/forms/GenderOptionField";
import ButtonPrimary from "../../components/ButtonPrimary";
import { studentRegValidation } from "@/app/validators";
import { regions } from "@/app/utils/constant";
import RenderCircularProgress from "@/app/components/RenderCircularProgress";

const StudentRegForm = ({handleSubmit, loading}) => {
  return (
    <Formik
      initialValues={{
        name: "",        
        dob: null,
        password: "",
        password_confirmation: "",
        gender: null,
        region: "",
        address: "",
      }}
      validationSchema={studentRegValidation}
      onSubmit={(values) => handleSubmit(values)
    }
    >
      {(formikProps) => {
        return (
          <Form>
            <Grid container spacing={2.5} p={'40px'}>
              <Grid item xs={6}>
                <Field
                  name="name"
                  type="text"
                  height="35px"
                  value={formikProps.values.name}
                  onChange={formikProps.handleChange("name")}
                  onBlur={formikProps.handleBlur("name")}
                  component={TextInput}
                  placeholder="Username"
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="region"
                  type="number"
                  height="35px"
                  value={
                    formikProps.values.region
                      ? regions.find(
                          (region) =>
                            region.region === formikProps.values.region
                        )?.regionName
                      : null
                  }
                  component={AutoCompleteTextInput}
                  onChange={(event, value) => {
                    const selectedRegion = regions.find(
                      (region) => region.regionName === value
                    );
                    const regionId = selectedRegion
                      ? selectedRegion.regionId
                      : "";
                    formikProps.setFieldValue("region", regionId);
                  }}
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="password"
                  type="password"
                  height="35px"
                  value={formikProps.values.password}
                  onChange={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                  component={TextInput}
                  placeholder="New Password"
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="password_confirmation"
                  type="password"
                  height="35px"
                  value={formikProps.values.password_confirmation}
                  onChange={formikProps.handleChange("password_confirmation")}
                  onBlur={formikProps.handleBlur("password_confirmation")}
                  component={TextInput}
                  placeholder="Confirmed Password"
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="dob"
                  height="35px"
                  value={formikProps.values.dob}
                  onChange={(newValue) => {
                    formikProps.setFieldValue("dob", newValue);
                  }}
                  component={DatePickerField}
                  // placeholder={"Date of Birth"}
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="gender"
                  type="radio"
                  height="35px"
                  value={formikProps.values.gender}
                  onChange={(event) =>
                    formikProps.setFieldValue("gender", event.target.value)
                  }
                  component={GenderOptionField}
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="address"
                  type="text"
                  // validate={isRequired}
                  height="35px"
                  value={formikProps.values.address}
                  onChange={formikProps.handleChange("address")}
                  onBlur={formikProps.handleBlur("address")}
                  component={TextInput}
                  placeholder="Enter your address"
                  {...formikProps}
                />
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <ButtonPrimary
                  type="submit"
                  //disabled={formikProps.isSubmitting}
                  size="large"
                  textColor="#fff"
                  width="142px"
                  height="48px"
                  lineHeight="48px"
                >
                  {loading ? <RenderCircularProgress size="1.5rem"/> : `Sign up`}
                </ButtonPrimary>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StudentRegForm;
