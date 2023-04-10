import {Button, PrimaryButton, SecondaryButton, SuccessButton, LargeButton} from "../components/elements/Button";

export default {
    title: "Components/Elements/Button",
    component: Button,
    argtypes: {handleClick: {action: "Primeira Tentativa"}}
}

const Template = args => <Button {...args}/>


export const Primary = ()=> <PrimaryButton>Botão!</PrimaryButton>;

export const Secondary = ()=> <SecondaryButton>Click me!</SecondaryButton>;

export const Success = ()=> <SuccessButton>Click me!</SuccessButton>;

export const Large = ()=> <LargeButton>I am Large</LargeButton>

export const Button_test = Template.bind({})

Button_test.args = {
    backgroundColor: "blue",
    label: "Press me I am blue",
    size: "md"
}
Primary.args = {
    backgroundColor: "red",
    label: "Press me I am primary",
    size: "md"
}