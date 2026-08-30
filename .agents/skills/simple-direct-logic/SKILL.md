---
name: simple-direct-logic
description: Use quando precisar escrever ou revisar código para manter lógicas, métodos e fluxos simples, diretos e fáceis de entender, evitando complexidade desnecessária e abstrações prematuras.
---

# Lógica Simples e Direta

Use esta skill quando criar ou revisar código e a prioridade for clareza, previsibilidade e manutenção fácil.

## Objetivo

Escrever soluções diretas. O caminho preferido é o que resolve o problema com o menor número de passos, sem arrodeios, sem camadas extras e sem abstrações que não tragam ganho real.

## Regras

- Prefira métodos pequenos e com uma responsabilidade unica e clara.
- Prefira fluxo linear e explícito.
- Utilize `if` e `else` somente para verificações de integridade ou de estado.
- Use `if` e `else` para validar entradas, garantir pré-condições e decidir exibição baseada em estado, como escolher qual componente renderizar a partir de um `enum`.
- Dê prioridade a hooks React para manuseio de estado antes de criar lógica própria no componente.
- Para selecionar meio de execução a partir de um valor passado, prefira `strategy maps` em vez de `if`/`else`.
- `strategy maps` devem concentrar a decisão e apontar diretamente para a implementação correta.
- Use `if`, `return` e composição simples antes de pensar em padrões mais complexos.
- Evite nested profundo, lógica espalhada e condicionais difíceis de seguir.
- Não crie classes, helpers, factories, strategies ou genéricos se uma função simples resolver.
- Reaproveite código existente quando isso não aumentar acoplamento ou confusão.
- Só extraia abstração quando houver repetição real ou benefício claro de manutenção.

## Forma de escrever

- Um método deve ser fácil de ler de cima para baixo.
- Cada passo deve deixar claro o que está sendo feito.
- Se uma regra puder ser expressa com poucos comandos diretos, escolha essa forma.
- Se a solução parecer "bonita" mas difícil de entender, simplifique.

## Sinais de alerta

- Muitas camadas de indireção.
- Métodos longos com várias responsabilidades.
- Condições aninhadas sem necessidade.
- Tipos, interfaces ou estruturas criadas antes da necessidade real.
- Soluções genéricas para um problema específico.

## Critério final

Se duas abordagens funcionarem, escolha a mais simples, a mais legível e a mais fácil de manter por outra pessoa.
