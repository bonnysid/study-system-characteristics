import { FC } from 'react';
import * as ST from './styled';
import { Button, ButtonVariant, Icon, Input } from '@src/components';
import { FormikProvider, useFormik } from 'formik';
import { xCaptions } from '@src/utils/calculateStudy';

type Props = {
  isOpen: boolean;
  close: () => void;
  initialValues: number[];
  onSave: (values: number[]) => void;
}

export const XSettingsModal: FC<Props> = ({ close, isOpen, onSave, initialValues }) => {
  const form = useFormik<{ x: number[] }>({
    initialValues: {
      x: initialValues,
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
    onSave(form.values.x.map(Number));
  }

  return (
    <ST.StyledModal open={isOpen} onClose={close} closeOnDocumentClick={false}>
      <FormikProvider value={form}>
        <ST.ModalHeader>
          <ST.ModalHeaderTop>
            <ST.Title>
              Настройки параметров
            </ST.Title>
          </ST.ModalHeaderTop>
          <Button variant={ButtonVariant.DANGER} onClick={close}>
            <Icon type="close"/>
          </Button>
        </ST.ModalHeader>
        <ST.ModalContent>
          <ST.Column>
            {xCaptions.map((key, i) => (
              <Input
                key={key}
                name={`x.${i}`}
                type="number"
                value={form.values.x[i]}
                onChange={form.handleChange}
                caption={key}
              />
            ))}
          </ST.Column>
        </ST.ModalContent>
        <ST.ModalFooter>
          <Button text={'Сохранить'} onClick={handleSave} />
        </ST.ModalFooter>
      </FormikProvider>
    </ST.StyledModal>
  )
}
