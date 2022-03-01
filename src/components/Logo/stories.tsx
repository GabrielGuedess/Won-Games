import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Logo, { LogoProps } from '.';

export default {
  title: 'Logo',
  component: Logo,
  decorators: [withDesign],
} as Meta;

export const Default: Story<LogoProps> = args => <Logo {...args} />;

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8KXr60mZZqL6kqecp1ZeeP/Won-Games-English?node-id=54%3A106',
  },
};
