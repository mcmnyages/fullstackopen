import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  const inputStyle = [style];

  return <NativeTextInput style={inputStyle} {...props} />;
};

export default TextInput;