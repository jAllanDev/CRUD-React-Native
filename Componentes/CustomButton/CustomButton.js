import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import Styles from './Style'
function CustomButton({ title, onPress, style }) {
return (
<TouchableOpacity onPress={onPress} style={[Styles.button,
style]}>
<Text style={Styles.buttonText}>{title}</Text>
</TouchableOpacity>
);
}
export default CustomButton;