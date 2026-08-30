---
name: presentational-component-contract
description: Use quando criar ou revisar componentes para garantir que eles apenas exibam dados e chamem funções, deixando o tratamento de dados para métodos do próprio componente.
---

# Contrato de Componente Presentacional

Use esta skill quando o foco for manter componentes simples, previsíveis e fáceis de manter.

## Objetivo

O componente deve ser uma camada de exibição. Ele não deve concentrar lógica de negócio, regra de decisão complexa ou tratamento espalhado no JSX.

## Regras

- Componentes nunca devem definir lógica de negócio.
- Componentes devem somente exibir dados e chamar funções.
- Dê prioridade a uma estrutura de componente limpa e pequena.
- O manuseio de dados deve ficar em métodos do próprio componente.
- O JSX deve permanecer declarativo e direto.
- Evite colocar transformação, filtragem, ordenação, cálculo ou decisão complexa inline na renderização.
- Se houver necessidade de preparar dados, faça isso em métodos do componente e depois use o resultado na UI.
- Se uma regra de negócio sair do campo visual, mova a responsabilidade para fora do componente.
- Para estilização dê sempre prioridade para os valores predefinidos do Tailwindcss

## Forma esperada

- Métodos do componente tratam dados.
- O corpo visual do componente apenas consome o resultado desses métodos.
- A estrutura do componente deve permanecer pequena, clara e fácil de escanear.
- A UI não deve esconder lógica em expressões longas ou condicionais complexas.

## Sinais de violação

- JSX com cálculos, filtros ou mapeamentos complexos embutidos.
- Condições longas dentro da renderização.
- Lógica de regra de negócio misturada com marcação.
- Componentes que fazem mais do que exibir e delegar ações.

## Critério final

Se o comportamento puder ser quebrado entre tratamento de dados e exibição, mantenha o tratamento nos métodos do componente e deixe a renderização apenas com a apresentação.
