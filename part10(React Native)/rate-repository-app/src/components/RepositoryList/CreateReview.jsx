import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import FormTextInput from '../FormikTextInput'; 
import Text from '../Text';
import theme from '../../theme';
import {useCreateReview} from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner's username is required"),
  repositoryName: yup
    .string()
    .required("Repository's name is required"),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormTextInput name="ownerName" placeholder="Repository owner's username" />
          <FormTextInput name="repositoryName" placeholder="Repository's name" />
          <FormTextInput name="rating" placeholder="Rating between 0 and 100" keyboardType="numeric" />
          <FormTextInput name="text" placeholder="Review" multiline />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      if (data && data.createReview) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;