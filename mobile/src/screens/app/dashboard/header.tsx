import React from 'react';
import { View, Text } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Context
import { useJob } from '~/contexts/job';

// Others
import { styles } from './styles';

export const DashboardHeader: React.FC<{
  changeColor?: string;
  onDrawer: () => void;
  onFilter: () => void;
}> = ({ onDrawer, onFilter, changeColor }) => {
  const { currentJobs } = useJob();

  return (
    <>
      <View style={styles.dashboardHeader}>
        <TouchableOpacity onPress={onDrawer}>
          <Feather name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.dashboardHeaderText}>
          Trampos: {currentJobs || 0}
        </Text>

        <TouchableOpacity onPress={onFilter}>
          <Ionicons
            name="ios-filter"
            size={30}
            color={changeColor || 'black'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </>
  );
};
