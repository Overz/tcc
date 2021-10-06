# Desenvolvimento

Nesta seção serão apresentadas a construção do sistema propriamente dito, que visa suprir as necessidades do usuário pelo sistema proposto. Inicia-se expondo o levantamento de requisitos, diagramas UML, prototipação das telas, e a construção da API.

## Levantamento de Requisitos

O levantamento de requisitos funcionais e não funcionais deu-se através da prototipação das telas e o planejamento das funcionalidades, baseando-se nos aplicativos já existentes no mercado, em especial a Play Store, afim de limitar e definir o escopo do projeto. Segue abaixo o conjunto de Requisitos Funcionais (RF) e requisitos não funcionais (RNF):

### - Requisitos Funcionais

- **RF01**: Cadastrar um novo usuario com informações(dados pessoais e endereços);
- **RF02**: Cadastrar um novo trabalho com informações(dados necessários);
- **RF04**: Validar se o email, cpf ou telefone ja existem no banco;
- **RF05**: Mostrar as informações do trabalho publicado ao consultar;
- **RF07**: Filtrar por Area de trabalho / Cidade;
- **RF08**: Realizar navegação entre as telas;
- **RF09**: Candidatar-se ao emprego;
- **RF10**: Aceitar Candidados as vagas de empregos;
- **RF11**: API;

### - Requisitos Não Funcionais

- **RNF01**: Botões coloridos;
- **RNF02**: Imagem de fundo;
- **RNF03**: Logo do sistema;
- **RNF04**: Foto de perfil;
- **RNF05**: Geolocalização;
- **RNF06**: Esconder parcialmente as informações de quem esta publicando um emprego;
- **RNF07**: Mostrar a geolocalização do trabalho publicado;
- **RNF08**: Limitar os caracteres digitados em alguns lugares;
- **RNF09**: Esconder o campo senha ao cadastrar;
- **RNF10**: Permitir contato ao aceitar o candidado ao trabalho;
- **RNF11**: Mapa indicando a posição atual do usuario;
- **RNF12**: Cor nas notificações;
- **RNF13**: Receber notificação;
- **RNF14**: Exibir ajuda quando o usuario ao abrir algumas telas pela primeira vez;
- **RNF15**: MySQL Database;
- **RNF16**: Filtrar os trabalhos;
- **RNF17**: Atualizar a lista ao publicar um novo trabalho;
- **RNF18**: Chat interno;

## Especificações do Software

Partindo dos requisitos funcionais e não funcionais, prosseguiu-se com a modelagem da aplicação, seguindo os padrões propostos pela Linguagem de Modelagem Unificada (UML), é importante ressaltar que apesar de boa parte da análise ter sido realizada antes da etapa de desenvolvimento, o processo de codificação e testes com TDD exigiu que os modelos fossem revisados e atualizados para melhor limitação do escopo do projeto, logo essa atividade pode ser considerada paralela as demais. Por motivos de complexidade e grandeza, será exibido somente diagramas de Caso de Uso, Entidade e Relacionamento e Diagrama de Classe que exibe apenas as models do sistema.

### Diagrama de Caso de Uso

O Diagrama de Caso de Uso propõe uma visão geral do sistema, com o conjunto de funcionalidades limitadas pelo escopo.

![use-case](../img/caso-de-uso.svg)

Fonte: Autor (2021).

### Diagrama de Entidade e Relacionamento

Este diagrama foi planejado para que fosse possível modelar o Banco de Dados, uma parte importante para o sistema. Representação dos relacionamentos no Banco de Dados.

Utilizou-se da linguagem de marcação dbml para gerar os diagramas através de sites como dbdiagram e dbdocs, compilando o código localmente e enviando os dados utilizando as funcionalidades do pacote dbdocs disponível do NPM (Node Package Manager) ou no Yarn Package Manager.

![eer](../img/entidade-relacionamento.png)

Fonte: Autor (2021)

## Construção do Software

Estabelecido o modelo da aplicação, requisitos, funcionalidades e etc, iniciou-se o processo de elaboração do código. Para armazenar os códigos foi utilizado a plataforma Microsoft Azure criando um projeto privado, nesta plataforma podem ser feitas sprints, planejamento de tarefas em kambam, anotações, como também integração com repositórios, Docker Hub, sites de estatisticas, testes integrados pela plataforma, entrega de artefatos e muito mais, podendo manter organização inteira com projetos separados.

O sistema foi dividido em Frontend e Backend, sendo o Frontend criado em React Native, e o Backend uma API REST com NodeJS em Typescript. Uma vez selecionado a plataforma, foram definidas as ferramentas de desenvolvimento para codificação, utilizou-se a IDE denominada Microsoft Visual Studio Code (VSCode), na sua versão latest, software livre disponibilizado pela Microsoft.

Para subir a infraestrutura (Banco de dados, SGBD, Backend), utilizou-se o Docker, especificamente o Docker-Compose, ferramenta gratuita disponibilizada pela Docker, que virtualiza os sistemas em um ambiente isolado a nível de SO, sem se preocupar com a configuração da maquina local subindo vários sistemas ao mesmo tempo de maneira rápida e simples.

Foi definido o banco de dados MySQL por ser simples, segundo o site db-engines (Maio, 2021) indica o MySQL sendo o 2º mais popular.

Adminer, um SGBD Web, que realiza conexões com diversos bancos de dados, desde banco de dados SQL a NoSQL, rodando via Docker sem a necessidade de instalação, simples, rápido e gratuito.

NodeJS com Typescript (um Superset do Javascript) no Backend por ser uma linguagem pratica e simples que implementa as funcionalidades mais atuais do ECMA Script (uma associação global para definição de linguagens via Script voltada para o Javascript), facilitando a construção de sistemas em especial API's, trazendo maior consistencia e solidez para o projeto através de definições de tipos estáticos.

Para as questões associadas ao front-end da aplicação, além das tecnologias essenciais como html, css e javascript utilizou-se o React Native, uma linguagem de marcação com com Javascript para Mobile por facilitar o desenvolvimento Mobile, utilizando frameworks como Expo que entrega a configuração pronta para uso, de fácil entendimento e ágil, podendo rodar em multiplataformas ou codificar PWA's.

Conceitos de TDD com Jest para validação do código no Backend, sendo um framework voltado para testes, ágil e rápido, limitando possíveis problemas na aplicação.

Ferramenta para versionamento do código, foi escolhido o Git desenvolvido por Linus Torvalds e para a elaboração dos diagramas presentes utilizou-se da plataforma Drawio, um site de diagramação, e plugins integrados com a IDE para geração de diagramas UML's.

A prototipação das telas foram feitas através do Whimsical, uma plataforma que permite criar mockup's de telas, fluxo gramas, anotações e mind-map, de maneira rápida e fácil armazenando todo o esboço pela núvem.

<!-- ![der](../img/der.svg) -->
