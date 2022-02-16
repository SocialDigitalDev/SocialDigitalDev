##  💻  Social Digital Commerce

Repositório com os arquivos HTML, CSS e JS das lojas VTEX e TRAY

## Quality Assurance

Abaixo o documento tem como objetivo estabelecer etapas de um processo de Quality Assurance (Q.A) para as lojas VTEX, que contempla todos os recursos inclusos em um projeto de loja padrão.

O projeto padrão toma como exemplo a loja https://www.planetgirlsstore.com.br.

Siga as etapas testando abaixo:

### REGRESSIVO DESKTOP

### CABEÇALHO
#### 1 - Links

Verificar layout desejado em 1920x1080, 1366x768, 1280x768. Verificar possíveis quebras.

1.a - Clicar em todos os items do menu. Verificar se são clicáveis.
1.b - Testar o link do logo
1.c - Testar todos os links de departamento do menu
1.d - Testar todos os sublinks de categoria do menu

#### 2 - Busca
##### 2.1 - Teste de Digitação.

Verificar layout desejado em 1920x1080, 1366x768, 1280x768. Verificar possíveis quebras.

2.1.a - Caso haja ícone de busca, verificar se está clicável, clicar e verificar se o campo de busca abre e fecha.
2.1.b - Digitar nome de produto na Busca, correta e incorretamente. Testar teclando enter, clicando no botão buscar
2.1.c - Verificar se o produto digitado na busca aparece na lista do auto-complete
2.1.d - Digitar qualquer coisa que não esteja contido na loja. Testar teclando enter, clicando no botão buscar

##### 2.2 - Teste dos links do Auto-Complete.

Verificar layout desejado em 1920x1080, 1366x768, 1280x800. Verificar possíveis quebras.

2.2.a - Digitar nome de produto na busca. Verificar se o auto-complete está abrindo.
2.2.b - Verificar se o auto-complete traz demais produtos. Clicar nos links e verificar direcionamento à PDP.

#### 3 - Minha Conta
##### 3.1 - Teste de links deslogado.

Verificar layout desejado em 1920x1080, 1366x768, 1280x800. Verificar possíveis quebras.

3.1.a - Caso haja apenas um ícone, clicar no ícone de Minha Conta. Verificar se abre uma janela com uma chamada para entrar ou cadastrar-se.
3.1.b - Clicar na chamada de entrar ou cadastrar-se, verificar se abre o processo padrão da VTEX de login/cadastro.
3.1.c - Concluir processo padrão da VTEX de login/cadastro, verificar se é direcionado para a home pós conclusão.

##### 3.2 - Teste de links logado.

Verificar layout desejado em 1920x1080, 1366x768, 1280x800. Verificar possíveis quebras.

3.2.a - Clicar em Minha Conta, verificar se é direcionado para dentro de Minha Conta.
3.2.b - Clicar em Meus Pedidos, verificar se é direcionado para dentro de Minha Conta em Meus Pedidos.
3.2.c - Clicar em Sair, verificar se o site desloga.

#### 4 - MiniCart
##### 4.1 - Teste de abertura e layout.

Verificar layout desejado em 1920x1080, 1366x768, 1280x800. Verificar possíveis quebras.

4.1.a - Clicar no MiniCart, verificar se a tela escurece e abre um sidebar contendo o layout padrão para o minicart.
4.1.b - Clicar em Voltar para verificar se o minicart fecha e a tela volta a clarear.
4.1.c - Abrir novamente o MiniCart e clicar em continuar comprando. O efeito deve ser o mesmo do botão voltar.

##### 4.2 - Teste de adição, atualização de quantidade e remoção de produtos do minicart.

4.2.a - Clicar em comprar, seja na vitrine com a função de compra rápida ou na PDP, verificar se o carrinho abre sem escurecer a tela, e fecha após 5 segundos.
4.2.b - Abrir o MiniCart, clicar no botão de adição de quantidade e verificar se foi adicionada a quantidade.
4.2.c - Clicar no botão de subtração de quantidade e verificar se foi subtraída a quantidade.
4.2.d - Clicar no botão de remoção do produto do carrinho e verificar se o produto foi removido.
4.2.e - Clicar no botão de subtração de quantidade até zerar e verificar se o produto foi removido.

##### 4.3 - Teste de finalização de compra.

4.3.a - Com produtos adicionados, clicar no botão de finalizar compra. Verificar se é direcionado ao checkout com os produtos e quantidades corretas contidas no MiniCart.

### HOME

### BANNER PRINCIPAL

#### 1 - Imagem e link

Verificar layout desejado em 1920x1080, 1366x768, 1280x800. Verificar possíveis quebras.

1.a - Verificar a imagem, se está em qualidade alta e se é Largura Total. Normalmente resolução 1920x600 é o menor tamanho.
1.b - Clicar na imagem, verificar se está direcionando a algum link.

#### 2 - Carrossel

Verificar layout desejado em 1920x1080, 1366x768, 1280x800. Verificar possíveis quebras.

2.a - Caso haja mais de um banner configurado, verificar se o carrossel é carregado. Devem aparecer setas e botões de navegação, ambos, ou um ou outro.
2.b - Clicar nos botões de seta, verificar se o slide passa de acordo com o efeito 
