import React, { FC } from 'react';

import { Button } from '@mui/material';
const templateItems = ['weather', 'map'] as const;
export type TTemplate = typeof templateItems[number];

interface INavigationProps {
  template: TTemplate;
  setTemplate: (temaplte: TTemplate) => void;
}

const Navigation: FC<INavigationProps> = ({ template, setTemplate }) => {
  const handleSetSelectedTemplate = (template: TTemplate) => () => {
    setTemplate(template);
  };

  return (
    <>
      {templateItems.map((item, idx) => (
        <Button
          onClick={handleSetSelectedTemplate(item)}
          variant={template === item ? 'outlined' : 'text'}
          key={`${item}_${idx}`}
        >
          {item}
        </Button>
      ))}
    </>
  );
};

export default React.memo(Navigation);
