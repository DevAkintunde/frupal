import React from "react";

import { Authorization as Authorizer } from "./Authorization";

export const Authorization = {
  title: "Authorization",
  component: Authorizer,
};

const Template = (args) => <Authorization {...args} />;

export const Container = Template.bind({});
Container.args = {
  label: "HTML Element",
};
