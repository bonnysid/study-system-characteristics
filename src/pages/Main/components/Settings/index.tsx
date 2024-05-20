import { FC, useState } from 'react';
import * as ST from './styled';
import { Button, Icon, Input, Modal } from '@src/components';
import { useModalControls } from '@src/hooks';
import { SettingsForm, SettingsModal } from '@pages/Main/components/Settings/SettingsModal';
import { ParametrsSettingsModal } from '@pages/Main/components/Settings/ParametrsSettingsModal';
import { ICalculateArgs } from '@src/utils/calculateStudy';
import { XSettingsModal } from '@pages/Main/components/Settings/XSettingsModal';

type Props = {
  currentSettings: number[][];
  x: number[];
  params: ICalculateArgs;
  onSave: (values: number[][]) => void;
  onSaveX: (values: number[]) => void;
  onSaveParametrs: (params: ICalculateArgs) => void;
}

const Settings: FC<Props> = ({ onSave, currentSettings, onSaveParametrs, params, onSaveX, x }) => {
  const { open, isOpen, close } = useModalControls();
  const parametrsModal = useModalControls();
  const xModal = useModalControls();

  const handleSave = (value: number[][]) => {
    onSave(value);
    close();
  }

  const handleSaveParams = (values: ICalculateArgs) => {
    onSaveParametrs(values);
    parametrsModal.close();
  }

  const handleSaveX = (values: number[]) => {
    onSaveX(values);
    xModal.close();
  }

  return (
    <ST.Wrapper>
      <Button text="Настройки матрицы" onClick={open} />
      <Button text="Настройки параметров" onClick={parametrsModal.open} />
      <Button text="Настройки X" onClick={xModal.open} />
      {isOpen && (
        <SettingsModal close={close} isOpen={isOpen} onSave={handleSave} initialValues={currentSettings} />
      )}
      {parametrsModal.isOpen && (
        <ParametrsSettingsModal isOpen={parametrsModal.isOpen} close={parametrsModal.close} initialValues={params} onSave={handleSaveParams} />
      )}
      {xModal.isOpen && (
        <XSettingsModal isOpen={xModal.isOpen} close={xModal.close} initialValues={x} onSave={handleSaveX} />
      )}
    </ST.Wrapper>
  );
}

export { Settings };

