# 🧠 Jogo da Memória com Emojis

Um jogo da memória feito com **HTML, CSS e JavaScript puro**, sem frameworks e sem nenhuma biblioteca de fora. É só abrir no navegador e jogar!

> 🎉 **Parabéns ao autor do projeto original** pela ideia divertida e pela base tão bem pensada. Esta versão nasceu dela, com carinho e respeito pelo visual e pela essência do jogo. Veja os créditos no final.

---

## 🎮 Como jogar

1. Clique em uma carta para virá-la e ver o emoji escondido.
2. Clique em uma segunda carta.
3. Se os dois emojis forem **iguais**, você encontrou um par e as cartas ficam abertas.
4. Se forem **diferentes**, as cartas tremem e viram de volta. Tente lembrar onde cada bichinho estava!
5. Encontre os **8 pares** para vencer.

O cronômetro começa na sua primeira jogada. Quanto menos jogadas e menos tempo, melhor o seu resultado. 🏆

---

## ✨ O que o jogo tem

- **16 cartas** (8 pares de bichinhos) com efeito de virar em 3D.
- **Contador de jogadas**: cada tentativa de formar um par conta como 1 jogada.
- **Cronômetro**: mostra quanto tempo você está levando.
- **Recorde**: guarda a sua melhor partida, mesmo se você fechar o navegador.
- **Animações**: um "pulinho" quando você acerta e uma tremidinha quando erra.
- **Tela de vitória** com confete de emojis e o resumo da sua partida.
- **Botão RESET GAME**: embaralha e começa de novo, sem recarregar a página.
- **Funciona no celular**: o tabuleiro se ajusta ao tamanho da tela.
- **Acessível**: dá para jogar só com o teclado e o jogo funciona com leitores de tela.

---

## 🛠️ Tecnologias usadas

| Tecnologia | Para que serve neste projeto |
|---|---|
| **HTML** | Monta a estrutura da página: título, placar, tabuleiro, botão e a janela de vitória. |
| **CSS** | Cuida do visual: cores, gradiente, o efeito de virar a carta e as animações. |
| **JavaScript** | É o "cérebro" do jogo: embaralha, confere os pares, conta jogadas e tempo. |

---

## 🔍 Como funciona (explicação simples)

### `index.html`: a estrutura
É o esqueleto da página. Ele tem o título, as três caixinhas do placar (**Jogadas**, **Tempo** e **Recorde**), o espaço onde as cartas aparecem, o botão de reset e a janelinha que aparece quando você vence. As cartas **não** estão escritas aqui: o JavaScript cria todas.

### `src/styles/main.css`: o visual
- Cada carta tem **duas faces**: a de trás (cinza, com um "?") e a da frente (branca, com o emoji).
- Quando a carta recebe a classe `boxOpen`, ela gira 180° e mostra a frente. É isso que cria o efeito de virar.
- Quando o par está certo, a carta ganha a classe `boxMatch` e fica destacada em rosa.
- Quando o par está errado, ela ganha a classe `boxWrong` e dá uma tremidinha.
- As animações são desligadas automaticamente para quem pede menos movimento no sistema.

### `src/styles/reset.css`: o ponto de partida
Zera as margens e os espaçamentos padrão do navegador, para o visual ficar igual em todo lugar.

### `src/scripts/engine.js`: a lógica do jogo
Passo a passo do que acontece:

1. **Criar o tabuleiro**: pega os 8 emojis, duplica cada um (para formar os pares), embaralha e cria as 16 cartas na tela.
2. **Clicar numa carta**: o jogo ignora o clique se a carta já estiver aberta ou se ele ainda estiver conferindo um par. Na primeira jogada, o cronômetro começa.
3. **Duas cartas abertas**: a jogada é contada e, depois de meio segundo, o jogo compara os dois emojis.
4. **Par certo**: as cartas ficam abertas e marcadas como encontradas.
5. **Par errado**: as cartas tremem e viram de volta.
6. **Todos os pares encontrados**: o cronômetro para, o jogo vê se você bateu o recorde e mostra a tela de vitória.
7. **Reset**: as cartas viram de volta, o jogo embaralha de novo e zera jogadas e tempo.

**Sobre o recorde:** vale a partida com menos jogadas. Se houver empate, vale a de menor tempo. Ele fica salvo no seu navegador, por isso cada pessoa ou aparelho tem o seu.

---

## 📚 O que dá para aprender com este projeto

- Criar elementos na página com JavaScript (`createElement`).
- Reagir a cliques e ao teclado (`addEventListener`).
- Usar `setTimeout` e `setInterval` para controlar o tempo.
- Embaralhar uma lista do jeito certo (algoritmo **Fisher-Yates**).
- Guardar dados no navegador com `localStorage`.
- Fazer animações e o efeito 3D com CSS (`transform`, `perspective`, `keyframes`).
- Pensar em acessibilidade: teclado, leitor de tela e `prefers-reduced-motion`.

---

## ▶️ Como rodar

Não precisa instalar nada.

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no seu navegador.

Se você usa o **VS Code**, também pode abrir a pasta e clicar em **Go Live** (extensão *Live Server*).

---

## 📁 Estrutura do projeto

```
├── index.html            # estrutura da página
├── README.md             # este arquivo
└── src
    ├── scripts
    │   └── engine.js     # lógica do jogo
    └── styles
        ├── reset.css     # zera estilos padrão do navegador
        └── main.css      # visual e animações
```

---

## 🚀 O que foi melhorado em relação ao original

**Mantido do original:** o fundo rosa, o gradiente roxo, as cartas cinza que viram brancas, a fonte monospace, os 8 bichinhos e o botão **RESET GAME**.

**Corrigido:**
- Clicar duas vezes na mesma carta não conta mais como um par.
- Não dá mais para clicar em cartas já encontradas nem durante a conferência.
- O embaralhamento ficou realmente aleatório.
- O reset não recarrega mais a página.

**Novo:**
- Contador de jogadas, cronômetro e recorde.
- Animações de acerto e erro.
- Tela de vitória com confete, no lugar do `alert`.
- Layout responsivo e acessibilidade.

---

## 🙌 Créditos

Este projeto é uma versão melhorada do **js-emoji-memory-game**.



---

## 👨‍💻 Autor desta versão

Feito por **Vinícius Cruz dos Santos**

[![GitHub](https://img.shields.io/badge/GitHub-Viniciuscruzdossantos-181717?logo=github)](https://github.com/Viniciuscruzdossantos)
