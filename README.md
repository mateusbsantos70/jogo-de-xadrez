# ♟️ Xadrez JS - Jogo de Xadrez em JavaScript Puro

Um jogo de xadrez completo desenvolvido com HTML, CSS e JavaScript vanilla, sem dependências externas. Implementa as regras essenciais do xadrez com uma interface intuitiva e responsiva.

![Xadrez JS](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎮 Demonstração

Jogue diretamente no navegador! Basta abrir o arquivo `index.html` em qualquer navegador moderno.

## ✨ Características

### Regras Implementadas
- ✅ **Movimentos válidos** para todas as peças (Rei, Rainha, Torre, Bispo, Cavalo e Peão)
- ✅ **Sistema de turnos** alternados entre brancas e pretas
- ✅ **Detecção de xeque** em tempo real
- ✅ **Xeque-mate** com verificação automática de fim de jogo
- ✅ **Promoção do peão** ao alcançar a última linha
- ✅ **Prevenção de movimentos ilegais** que colocam o próprio rei em xeque
- ✅ **Captura de peças** adversárias

### Interface
- 🎨 Design limpo e moderno
- 🖱️ Interface intuitiva com indicadores visuais
- 💚 Destaque de movimentos válidos em verde
- 💛 Indicação da peça selecionada
- 📊 Contador de peças em tempo real
- 🔄 Botão de reiniciar jogo
- ❓ Modal de ajuda com instruções

## 🚀 Como Usar

### Instalação

1. Clone este repositório:
```bash
git clone https://github.com/xadrez/xadrez-js.git
```

2. Navegue até o diretório:
```bash
cd xadrez-js
```

3. Abra o arquivo `index.html` no seu navegador preferido

**Ou simplesmente baixe o arquivo `index.html` e abra-o diretamente!**

## 🎯 Como Jogar

1. **Selecione uma peça**: Clique em qualquer peça da sua cor (brancas começam)
2. **Veja os movimentos**: As casas válidas ficarão destacadas em verde
3. **Mova a peça**: Clique na casa de destino desejada
4. **Promoção**: Quando um peão alcançar a última linha, escolha a peça para promoção
5. **Xeque e Xeque-mate**: O jogo alertará automaticamente sobre xeques e detectará o xeque-mate

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com Grid Layout e Flexbox
- **JavaScript (ES6+)** - Lógica do jogo e interatividade

## 📋 Regras Especiais

### ✅ Implementadas
- Movimento especial do peão (dois quadrados no primeiro movimento)
- Captura diagonal do peão
- Promoção do peão
- Verificação de xeque
- Xeque-mate

### ❌ Não Implementadas (futuras melhorias)
- Roque (grande e pequeno)
- En Passant
- Empate por afogamento
- Empate por repetição de posição
- Regra dos 50 movimentos

## 🎨 Personalização

### Modificar cores do tabuleiro
No arquivo HTML, localize o CSS e altere as classes `.clara` e `.escura`:

```css
.clara {
    background-color: #f0d9b5; /* Casas claras */
}

.escura {
    background-color: #b58863; /* Casas escuras */
}
```

### Alterar tamanho do tabuleiro
Ajuste o tamanho das casas modificando o grid:

```css
#tabuleiro {
    grid-template-columns: repeat(8, 80px); /* Largura */
    grid-template-rows: repeat(8, 80px);    /* Altura */
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

### Ideias para contribuição
- Implementar Roque
- Implementar En Passant
- Adicionar IA para jogar contra o computador
- Sistema de histórico de movimentos
- Modo de análise de partida
- Temas visuais alternativos
- Sons e animações

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ♟️ por [mateus batista, igor Mateus]

## 🐛 Encontrou um bug?

Abra uma [issue](https://github.com/seu-usuario/xadrez-js/issues) descrevendo o problema encontrado.

## ⭐ Gostou do projeto?

Deixe uma estrela no repositório! Isso ajuda muito! ⭐

---

**Divirta-se jogando xadrez!** ♟️👑
