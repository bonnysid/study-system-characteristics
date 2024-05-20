import { FC, JSX, useState } from 'react';
import * as ST from './styled';
import { Button, ButtonVariant, Icon, Input } from '@src/components';
import { FieldArray, FormikProvider, useFormik } from 'formik';

type Props = {
  isOpen: boolean;
  close: () => void;
  initialValues: number[][];
  onSave: (values: number[][]) => void;
}

export type SettingsForm = {
  values: number[][];
}

export const SettingsModal: FC<Props> = ({ close, isOpen, onSave, initialValues }) => {
  const form = useFormik<SettingsForm>({
    initialValues: {
      values: initialValues,
    },

    onSubmit: async (values) => {
      try {
        console.log(values)
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleSave = () => {
    onSave(form.values.values.map(it => it.map(Number)));
  }

  return (
    <ST.StyledModal open={isOpen} onClose={close} closeOnDocumentClick={false}>
      <FormikProvider value={form}>
        <ST.ModalHeader>
          <ST.ModalHeaderTop>
            <ST.Title>
              Настройки матрицы
            </ST.Title>
          </ST.ModalHeaderTop>
          <Button variant={ButtonVariant.DANGER} onClick={close}>
            <Icon type="close"/>
          </Button>
        </ST.ModalHeader>
        <ST.ModalContent>
          <ST.Grid>
            <ST.Text />
            {form.values.values.map((_, i) => (
              <ST.Text>x{i + 1}</ST.Text>
            ))}
            {
              form.values.values.reduce((res, it, indexRow) => {
                const other = it.map((col, indexCol) => (
                  <Input
                    key={`${indexRow}-${indexCol}`}
                    name={`values.${indexRow}.${indexCol}`}
                    value={col}
                    type="number"
                    onChange={form.handleChange}
                  />
                ));

                return [...res, <ST.Text>x{indexRow + 1}</ST.Text>, ...other];
              }, [] as JSX.Element[])
            }
          </ST.Grid>
        </ST.ModalContent>
        <ST.ModalFooter>
          <Button text={'Сохранить'} onClick={handleSave} />
        </ST.ModalFooter>
      </FormikProvider>
    </ST.StyledModal>
  )
}
