import { FC } from 'react';
import * as ST from './styled';
import { Button, ButtonVariant, Icon, Input } from '@src/components';
import { FormikProvider, useFormik } from 'formik';
import { calculateArgsCaptions, ICalculateArgs } from '@src/utils/calculateStudy';

type Props = {
  isOpen: boolean;
  close: () => void;
  initialValues: ICalculateArgs;
  onSave: (values: ICalculateArgs) => void;
}

export const ParametrsSettingsModal: FC<Props> = ({ close, isOpen, onSave, initialValues }) => {
  const form = useFormik<ICalculateArgs>({
    initialValues: initialValues,

    onSubmit: async (values) => {
      try {
        console.log(values)
      } catch (e) {
        console.log(e);
      }
    },
  });

  const handleSave = () => {
    onSave(form.values);
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
            {Object.keys(calculateArgsCaptions).map((key) => (
              <Input
                key={key}
                name={`${key}`}
                type="number"
                value={form.values[key as keyof ICalculateArgs]}
                onChange={form.handleChange}
                caption={`${key}: ${calculateArgsCaptions[key as keyof ICalculateArgs]}`}
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
