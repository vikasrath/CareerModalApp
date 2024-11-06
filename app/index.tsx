import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema
const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  gender: Yup.string().required('Please select a gender'),
  acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms'),
});

export default function index() {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        gender: '',
        acceptTerms: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        console.log(values);
        
        }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
          />
          {errors.username && touched.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            keyboardType="email-address"
          />
          {errors.email && touched.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}

          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            <RadioButton
              value="male"
              status={values.gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('gender', 'male')}
            />
            <Text>Male</Text>

            <RadioButton
              value="female"
              status={values.gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('gender', 'female')}
            />
            <Text>Female</Text>
          </View>
          {errors.gender && touched.gender && (
            <Text style={styles.error}>{errors.gender}</Text>
          )}

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={values.acceptTerms ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}
            />
            <Text>I accept the terms and conditions</Text>
          </View>
          {errors.acceptTerms && touched.acceptTerms && (
            <Text style={styles.error}>{errors.acceptTerms}</Text>
          )}

          <Button title="Submit" onPress={()=>handleSubmit()} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});
