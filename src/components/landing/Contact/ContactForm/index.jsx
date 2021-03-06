import React from 'react';
import axios from 'axios';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import Recaptcha from 'react-google-recaptcha';
import * as Yup from 'yup';
import { Button, Input } from 'components/common';
import { Error, Center, InputField } from './styles';

export default () => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      message: '',
      success: false,
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().required('Full name field is required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Email field is required'),
    })}
    onSubmit={async ({ name, email, message }, { setSubmitting, resetForm, setFieldValue }) => {
      // try {
      //   await axios({
      //     method: 'POST',
      //     url: `${process.env.GATSBY_PORTFOLIO_FORMIK_ENDPOINT}`,
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     data: JSON.stringify({
      //       name,
      //       email,
      //       message,
      //     }),
      //   });
      //   setSubmitting(false);
      //   setFieldValue('success', true);
      //   setTimeout(() => resetForm(), 6000);
      // } catch (err) {
      //   setSubmitting(false);
      //   setFieldValue('success', false);
			// 	alert('Something went wrong, please try again!') // eslint-disable-line
      // }
      setFieldValue('success', true);
    }}
  >
    {({ values, touched, errors, setFieldValue, isSubmitting }) => (
      <Form>
        <InputField>
          <Input
            as={FastField}
            type="text"
            name="name"
            component="input"
            aria-label="name"
            placeholder="Full name*"
            error={touched.name && errors.name}
          />
          <ErrorMessage component={Error} name="name" />
        </InputField>
        <InputField>
          <Input
            id="email"
            aria-label="email"
            component="input"
            as={FastField}
            type="email"
            name="email"
            placeholder="Email*"
            error={touched.email && errors.email}
          />
          <ErrorMessage component={Error} name="email" />
        </InputField>
        <InputField>
          <Input
            as={FastField}
            component="textarea"
            aria-label="message"
            id="message"
            rows="8"
            type="text"
            name="message"
            placeholder="Message (Optional)"
            error={touched.message && errors.message}
          />
          <ErrorMessage component={Error} name="message" />
        </InputField>
        {values.name && values.email && (
          <InputField>
            {/* <FastField
              component={Recaptcha}
              sitekey={process.env.GATSBY_PORTFOLIO_RECAPTCHA_KEY}
              name="recaptcha"
              onChange={value => setFieldValue('recaptcha', value)}
            /> */}
          </InputField>
        )}
        {values.success && (
          <InputField>
            <Center>
              <h3>Thank you for subscribing to our newsletter!</h3>
            </Center>
          </InputField>
        )}
        <Center>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Center>
      </Form>
    )}
  </Formik>
);
