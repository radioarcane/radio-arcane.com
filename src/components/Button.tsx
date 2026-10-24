import React, { type ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

type BaseProps = {
   variant?: 'primary' | 'secondary';
   size?: 'xs' | 'sm';
   children: React.ReactNode;
};

type AnchorProps = BaseProps & {
   as: 'a';
} & ComponentPropsWithoutRef<'a'>;

type ButtonProps = BaseProps & {
   as?: 'button'; // Set as optional so button is the fallback default
} & ComponentPropsWithoutRef<'button'>;

type PolymorphicButtonProps = AnchorProps | ButtonProps;

export default function Button({
   as: Component = 'button',
   size,
   variant: _variant,
   className,
   ...props
}: PolymorphicButtonProps) {
   const classes = [styles.btn];

   switch (size) {
      case 'xs':
         classes.push(styles.btnXs);
         break;

      case 'sm':
         classes.push(styles.btnSm);
         break;
      default:
         break;
   }

   if (className) {
      classes.push(className);
   }

   /* eslint-disable @typescript-eslint/no-explicit-any */
   const Element = Component as any;

   return <Element {...props} className={classes.join(' ')} />;
}
