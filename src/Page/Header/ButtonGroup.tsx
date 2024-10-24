import { Button, Dropdown, Space } from 'antd';
import type { ButtonProps } from 'antd';
import React from 'react';

export interface ButtonItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: ButtonProps['type'];
}

export interface HeaderButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  onClick?: (
    key: string,
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>
  ) => void;
  items?: ButtonItem[];
}

export const HeaderButtonGroup: React.FC<HeaderButtonGroupProps> = props => {
  const { items = [], onClick = () => {}, ...otherProps } = props;

  if (items.length <= 2) {
    return (
      <Space align="end" size={12} {...otherProps}>
        {items.map(({ key, label, ...btnProps }) => (
          <Button key={key} onClick={e => onClick(key, e)} {...btnProps}>
            {label}
          </Button>
        ))}
      </Space>
    );
  }
  const [{ key: firstKey, label: firstLabel, ...btnProps }, ...menuItems] = items;
  return (
    <Dropdown.Button
      key={firstKey}
      onClick={e => onClick(firstKey, e)}
      {...btnProps}
      menu={{
        onClick: ({ key, domEvent }) => onClick(key, domEvent),
        items: menuItems.map(({ key, label, icon, danger, disabled }) => ({
          key,
          label,
          icon,
          danger,
          disabled,
        })),
      }}
      overlayStyle={{
        minWidth: 100,
      }}
      {...otherProps}
    >
      {firstLabel}
    </Dropdown.Button>
  );
};
