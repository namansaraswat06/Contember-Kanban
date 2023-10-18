import * as React from "react";
import { Menu } from "@contember/admin";

export const Navigation = () => (
  <Menu>
    <Menu.Item>
      <Menu.Item title="Kanban View" to="index" />
      <Menu.Item title="Tabular View" to="tabular" />
    </Menu.Item>
  </Menu>
);
