import { Button_storybook } from '../components/elements/Button';

export default {
  title: 'Button',
  component: Button_storybook,
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    border: {control: 'select', options: ['solid', 'none']},
    handleClick: { action: 'handleClick' },
  },
};

const Template = args => <Button_storybook {...args} />;
/** This Primary button is important because is the first button users will see once they reach de landing page. */
export const Primary = Template.bind({});
Primary.args = {
  backgroundColor: '#FFFFFF',
  color: "black",
  label: "Button",
  border: "1px solid",
  size: 'md',
};
/**The Secondary button has a gray background for contrast, and has no border. */
export const Secondary = Template.bind({});
Secondary.args = {
  backgroundColor: '#EBEBEB',
  color: "royalblue",
  label: "Button",
  border: "none",
  size: 'md',
};
/**The Transparent button is a third version of the Primary button. */
export const Transparent = Template.bind({});
Transparent.args = {
  backgroundColor: 'none',
  color: "royalblue",
  label: "Button",
  border: "none",
  size: 'md',
};
/**The Solid button is important to validate user choices, an navegate in the app.  */
export const Solid = Template.bind({});
Solid.args = {
  backgroundColor: '#35A361',
  color: "#FFFFFF",
  label: "Button",
  border: "none",
  size: 'md',
};
/**As usual, the Danger button has the purpose of alert the user of a irreversible action he can perform inside the app, such as delete a record of a task ou a pre-programed routine.*/
export const Danger = Template.bind({});
Danger.args = {
  backgroundColor: '#D63535',
  color: "White",
  label: "Button",
  border: "none",
  size: 'md',
};



