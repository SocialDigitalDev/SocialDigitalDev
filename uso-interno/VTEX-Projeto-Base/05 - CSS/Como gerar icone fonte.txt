Acessa o site ICOMOON (https://icomoon.io/app/#/select)

Subir os arquivos SVG clicando no botão Import Icons e selecione os arquivos svg

Após renomear os icones faça o download do pack de fontes.

Apos download feito, extrair os arquivos e dentro da pasta /fonts procurar o arquivo 
LOJA-icons.woff e renomerar ele para LOJA-fonts.woff.css e subir na VTEX.
Fazer a chamada da font dentro do style.css
/**************************************/
@font-face {
    font-family: 'LOJA-icons';
    src: url(/arquivos/LOJA-icons.css);
    src: url(/arquivos/LOJA-icons.css#iefix) format('embedded-opentype'), url(/arquivos/LOJA-icons.woff.css) format('woff');
    font-weight: normal;
    font-style: normal;
}
/**************************************/
