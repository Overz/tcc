import React from 'react';
import { View, Modal, ModalProps } from 'react-native';
import { styles } from './styles';

interface ModalComponentProps extends ModalProps {
  width?: number | string;
  height?: number | string;
  onRequestClose: () => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  visible,
  children,
  width,
  height,
  onRequestClose,
}) => (
  <Modal
    transparent
    animationType="fade"
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <View style={styles.container}>
      <View style={[styles.content, { width, height }]}>{children}</View>
    </View>
  </Modal>
);
