import { ActionSheetOptions, useActionSheet } from '@expo/react-native-action-sheet';
import { StyleSheet } from 'react-native';
import { Button } from '@/components/Button/Button';

export type CustomActiveSheetOptionsProps = {
  option: string;
  onPress: () => void;
}[];

type CustomActiveSheetProps = Partial<ActionSheetOptions> & {
  label: string;
  optionsList: CustomActiveSheetOptionsProps;
};

export function CustomActiveSheet(props: CustomActiveSheetProps) {
  const { label, optionsList, title, ...otherProps } = props;
  const { showActionSheetWithOptions } = useActionSheet();
  const CancelOptions: CustomActiveSheetOptionsProps = [{ option: 'Cancel', onPress: () => {} }];
  const allOptions = [CancelOptions[0].option, ...optionsList.map(item => item.option)];

  const onPressHandler = () => {
    showActionSheetWithOptions(
      {
        title,
        showSeparators: true,
        options: allOptions,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 0,
        containerStyle: styles.containerStyle,
        ...otherProps,
      },
      (selectedIndex?: number) => {
        if (!selectedIndex) return;
        optionsList[selectedIndex - 1]?.onPress();
      },
    );
  };

  return <Button title={label} onPress={onPressHandler} />;
}

const styles = StyleSheet.create({
  containerStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 30,
    marginTop: '35%',
  },
});
