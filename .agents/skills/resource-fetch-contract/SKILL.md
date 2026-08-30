---
name: resource-fetch-contract
description: Use quando criar ou revisar fetch de dados na API para garantir um service proprio por resource, um metodo unico de responsabilidade unica por fetch e uso minimo de Promise.all.
---

# Contrato de Fetch por Resource

Use esta skill quando a tarefa envolver buscar dados da API em screens, hooks, services ou fluxos de carregamento.

## Objetivo

Manter cada fetch simples, previsivel e isolado por resource. A UI e o fluxo de dados devem chamar um service proprio do resource e um metodo unico de carga para cada entidade.

## Regras

- Para cada resource, use o service proprio daquele resource.
- Cada resource deve ter um metodo de responsabilidade unica para fetch.
- Siga o padrao `loadNomeDoResource` para esses metodos.
- Exemplos: `loadTasks`, `loadProjects`, `loadEvents`.
- Se a tela precisar de varios resources, crie um metodo separado para cada um.
- Priorize sempre chamadas diretas e separadas antes de pensar em agrupar requests.
- Use `Promise.all` somente em caso de extrema necessidade.
- Se houver alternativa com metodos de responsabilidade unica, essa alternativa deve ser preferida.
- Nao crie um metodo agregador so para buscar varios resources ao mesmo tempo sem necessidade real.
- Nao misture fetch de resources diferentes dentro do mesmo metodo se isso puder ser separado.
- Deve haver somente 1 `useEffect` por componente, podendo existir mais de um apenas em casos de extrema necessidade, mas a prioridade continua sendo 1 `useEffect` por componente.
- Os metodos `load` devem ser instanciados fora do `useEffect`; a unica responsabilidade do `useEffect` deve ser chama-los.
- Nunca use `then.catch`; priorize sempre `try/catch`.

## Forma esperada

- `loadTasks` busca apenas tasks.
- `loadProjects` busca apenas projects.
- `loadEvents` busca apenas events.
- Cada metodo delega para o service correspondente.
- A orquestracao deve ficar simples e explicita.
- Os `load` devem ser criados antes do `useEffect` e apenas executados dentro dele.
- O fluxo de erro deve ser tratado com `try/catch`, nunca com encadeamento `then/catch`.

## Sinais de violacao

- Um unico metodo buscando tasks, projects e events juntos sem necessidade forte.
- Uso de `Promise.all` por conveniencia ou economia de linhas.
- Services genericos demais para varios resources diferentes.
- Lojas, hooks ou componentes escondendo fetchs misturados em uma unica funcao.

## Critério final

Se a solucao puder ser escrita com metodos separados e responsabilidades claras, essa deve ser a escolha padrao. `Promise.all` so entra quando a concorrencia for realmente indispensavel.
