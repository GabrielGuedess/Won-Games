import { useEffect, useState } from 'react';
import xor from 'lodash/xor';
import { Close } from '@styled-icons/material-outlined/Close';
import { FilterList } from '@styled-icons/material-outlined/FilterList';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Heading from 'components/Heading';
import Radio from 'components/Radio';

import { ParsedUrlQueryInput } from 'querystring';

import * as S from './styles';

type Field = {
  label: string;
  name: string;
};

export type ItemProps = {
  title: string;
  name: string;
  type: string;
  fields: Field[];
};

type Values = ParsedUrlQueryInput;

export type ExploreSidebarProps = {
  items: ItemProps[];
  initialValues?: Values;
  onFilter: (values: Values) => void;
};

const ExploreSidebar = ({
  items,
  onFilter,
  initialValues = {},
}: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilter(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleFilterMenu = () => {
    setIsOpen(false);
  };

  const handleRadio = (name: string, value: boolean | string) => {
    setValues(state => ({ ...state, [name]: value }));
  };

  const handleCheckbox = (name: string, value: string) => {
    const currentList = (values[name] as []) || [];

    setValues(state => ({ ...state, [name]: xor(currentList, [value]) }));
  };

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.Overlay aria-hidden={isOpen} />
      <S.IconWrapper>
        <FilterList aria-label="open filters" onClick={() => setIsOpen(true)} />
        <Close aria-label="close filters" onClick={() => setIsOpen(false)} />
      </S.IconWrapper>

      <S.Content>
        {items.map(item => (
          <S.Items key={item.title}>
            <Heading lineBottom lineColor="secondary" size="small">
              {item.title}
            </Heading>

            {item.type === 'checkbox' &&
              item.fields.map(({ label, name }) => (
                <Checkbox
                  key={name}
                  label={label}
                  labelFor={name}
                  name={name}
                  isChecked={(values[item.name] as string[])?.includes(name)}
                  onCheck={() => handleCheckbox(item.name, name)}
                />
              ))}

            {item.type === 'radio' &&
              item.fields.map(({ label, name }) => (
                <Radio
                  id={name}
                  value={name}
                  key={name}
                  label={label}
                  labelFor={name}
                  name={item.name}
                  defaultChecked={String(name) === String(values[item.name])}
                  onChange={() => handleRadio(item.name, name)}
                />
              ))}
          </S.Items>
        ))}
      </S.Content>

      <S.Footer>
        <Button fullWidth size="medium" onClick={handleFilterMenu}>
          Filter
        </Button>
      </S.Footer>
    </S.Wrapper>
  );
};

export default ExploreSidebar;
