# Styles

## ScrollView

Cuidado ao utilizar o `ScrollView`, existem duas propriedades dele de estilos `styles` e `contentContainerStyle`,
**styles** funciona normalmente, com o padrão de `flex: 1`, mas ao utilizar o este flex na outra propriedade
o scrollview estica os componentes do tamanho da tela ou mais e paraliza o scroll de para ir e vir.
Utilize `flexGrow: 1` para ajustar este valor.
