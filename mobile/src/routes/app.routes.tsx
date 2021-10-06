import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import { DrawerContentComponent } from '~/components/drawer';

// Screens
import { DashboardScreen } from '~/screens/app/dashboard/index';
import { ProfileScreen } from '~/screens/app/perfil';
import { NewJobScreen } from '~/screens/app/jobs/novo';
import { RequestsJobsScreen } from '~/screens/app/jobs/meus/publicados';
import { JobHistoryScreen } from '~/screens/app/jobs/meus/historico';
import { JobDetailsScreen } from '~/screens/app/jobs/detalhes';
import { NotificationScreen } from '~/screens/app/notificacao';
import { HelpScreen } from '~/screens/app/help';
import { ProfileAvaliacaoScreen } from '~/screens/app/perfil/avaliacao';
import { UserAddressScreen } from '~/screens/app/perfil/endereco';

// Others
import { AppRoutes as Routes } from '~/constants/routes';
import { UpdateAddressScreen } from '~/screens/app/perfil/endereco/update';
import { MyRequestsAndHistoryScreens } from '~/screens/app/jobs/meus';
import { CandidatosScreen } from '~/screens/app/jobs/meus/candidatos';

const { Navigator, Screen } = createDrawerNavigator();

export const AppRoutes: React.FC = () => (
  <Navigator
    initialRouteName={Routes.DashboardRouter}
    drawerContent={(props) => <DrawerContentComponent {...props} />}
    screenOptions={{ swipeEnabled: false }}
  >
    {/* DASHBOARD - PUBLICAR - DETALHES */}
    <Screen name={Routes.DashboardRouter} component={DashboardScreen} />
    <Screen name={Routes.NewJobRouter} component={NewJobScreen} />
    <Screen name={Routes.JobsDetailsRouter} component={JobDetailsScreen} />

    {/* PERFIL NO GERAL */}
    <Screen name={Routes.ProfileRouter} component={ProfileScreen} />
    <Screen name={Routes.ProfileAddressRouter} component={UserAddressScreen} />
    <Screen
      name={Routes.ProfileUpdateAddressRouter}
      component={UpdateAddressScreen}
    />
    <Screen
      name={Routes.ProfileAvaliationRouter}
      component={ProfileAvaliacaoScreen}
    />

    {/* HISTÓRICO E PEDIDOS */}
    <Screen
      name={Routes.MyRequestsAndHistoryRouter}
      component={MyRequestsAndHistoryScreens}
    />
    <Screen name={Routes.MyJobsRouter} component={RequestsJobsScreen} />
    <Screen name={Routes.JobsHistoryRouter} component={JobHistoryScreen} />

    {/* CANDIDATOS */}
    <Screen name={Routes.CandidatesRouter} component={CandidatosScreen} />

    {/* OUTROS */}
    <Screen name={Routes.NotificationRouter} component={NotificationScreen} />
    <Screen name={Routes.HelpScreenRouter} component={HelpScreen} />
  </Navigator>
);
