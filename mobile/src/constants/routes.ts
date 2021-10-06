/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum AppRoutes {
  /**
   * Tela Primaria do App
   */
  SplashRouter = 'SplashRouter',
  /**
   * Tela de Cadastro
   */
  SignUpRouter = 'SignUpRouter',
  /**
   * Tela de Login
   */
  SignInRouter = 'SignInRouter',
  /**
   * Tela de Informar os Conhecimentos
   * ao Cadastrar
   */
  AboutRouter = 'AboutRouter',
  /**
   * Tela Principal do App
   */
  DashboardRouter = 'DashboardRouter',
  /**
   * Tela que mostra os Dados do Perfil do Usuario
   */
  ProfileRouter = 'ProfileIndexRouter',
  /**
   * Tela que mostra o Endereço no Perfil do Usuario
   */
  ProfileAddressRouter = 'ProfileAddressRouter',
  /**
   * Tela para cadastrar/editar os endereços do Usuario
   */
  ProfileUpdateAddressRouter = 'ProfileUpdateAddressRouter',
  /**
   * Tela informativa das avaliações do usuario
   */
  ProfileAvaliationRouter = 'ProfileAvaliationRouter',
  /**
   * Tela para criar a conta
   * finalizando com email e senha
   */
  CreateAccoutRouter = 'CreateAccountRouter',
  /**
   * Rota para ativar a conta a primeira vez
   */
  ActivationAccountRouter = 'ActivationAccountRouter',
  /**
   * Rota de reativar a conta ou recuperar a senha
   */
  ForgotPasswordRouterEmail = 'ForgotPasswordRouter_Email',
  ForgotPasswordRouterSenha = 'ForgotPasswordRouter_Senha',
  /**
   * Rota de pagamento, onde ficam os cartões
   */
  CardRouter = 'CardRouter',
  /**
   * Rota para criar um novo trabalho
   */
  NewJobRouter = 'NewJobRouter',
  /**
   * Rota onde estão os trabalhos publicados pelo usuario
   */
  MyJobsRouter = 'MyJobsRouter',
  /**
   * Rota do historico de trabalhos feitos
   */
  JobsHistoryRouter = 'JobHistory',
  /**
   * Detalhes do trabalho selecionado na dashboard
   */
  JobsDetailsRouter = 'JobsDetailsRouter',
  /**
   * Tela de notificações do usuario
   */
  NotificationRouter = 'NotificationRouter',
  /**
   * Tela de Ajuda, outras opções de informações e etc
   */
  HelpScreenRouter = 'HelpScreenRouter',
  /**
   * Tela de navegação entre histórico e pedidos
   */
  MyRequestsAndHistoryRouter = 'MyRequestsHistoryRouter',
  /**
   * Tela que lista os candidatos ao trabalho
   */
  CandidatesRouter = 'CandidateRouter',
}
