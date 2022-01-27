import { Story, Meta } from '@storybook/react/types-6-0';
import Preloader from '.';

export default {
  title: 'Preloader',
  component: Preloader,
} as Meta;

export const Default: Story = () => <Preloader />;
