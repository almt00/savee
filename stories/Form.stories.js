import { Input_storybook } from '../components/elements/Form';

export default {
  title: 'Input',
  component: Input_storybook,
  argTypes: {
    color: { control: { type: 'color', presetColors: ['red', 'green'] } },
  },
};

const Template = args => <Input_storybook {...args} />;
/**This Input appears as the default one presented to the user, both in the register and the login of the app.*/
export const Default = Template.bind({});
Default.args = {
  backgroundColor: 'white',
  color: 'black',
  border: '1px solid',
  label: 'Simple field',
  placeholder: 'Placeholder',
};
/**This Input is presented once the user has selected it to insert info.*/
export const Disabled = Template.bind({});
Disabled.args = {
  backgroundColor: 'lightgrey',
  color: 'lightgrey',
  border: '1px solid',
  label: 'Simple field',
  placeholder: 'Placeholder',
};
/**This Input is presented to the user if the info doesn´t comply whit the required parameters of the field.*/
export const Error = Template.bind({});
Error.args = {
  backgroundColor: 'pink',
  color: 'red',
  border: '1px solid',
  label: 'Simple field',
  placeholder: 'Placeholder',
};


