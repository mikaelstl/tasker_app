---
name: mock-service-bridge
description: Crie ou refatore camadas de service mock para que os componentes consumam apenas services e nunca precisem saber se os dados vêm de mocks ou da API real.
---

# Ponte de Service Mock

Use esta skill ao criar ou alterar services mock em `src/service/mock/` ou ao conectá-los na árvore de componentes.

## Objetivo

Manter a UI agnóstica à origem dos dados. Os componentes devem chamar `useServices()` e trabalhar apenas com o contrato do service, enquanto `ServicesProvider` decide se a implementação é real ou mock.

## Estrutura obrigatória

1. Preserve a mesma interface do service real em `src/service/modules/*/*.service.ts`.
2. Mantenha o estado compartilhado em memória em `src/service/mock/data.ts`.
3. Leia o contexto de autenticação e organização em `src/service/mock/request-context.ts`.
4. Exponha o mock em `src/providers/ServicesProvider/index.tsx` atrás de `dotenv.USE_MOCKS`.
5. Consuma o service somente via `useServices()` em screens, components, hooks e providers.

## Regras do service mock

- Construa registros com os helpers `createMock*()` e retorne respostas com `createMockResponse()`.
- Use `createMockId()` para novas entidades e mantenha IDs estáveis e previsíveis.
- Valide acesso com `requireMockCurrentAccount()` e `requireMockOrgRequest()` em vez de duplicar checagens em cada service.
- Mantenha filtros de consulta e formatos de retorno alinhados com o service real.
- Quando uma entidade mudar, atualize também as dependências em memória. Exemplo: ao excluir um projeto, remova tarefas, comentários, eventos, membros e estatísticas derivadas relacionadas.

## Regras de conexão com componentes

- Não importe mock services diretamente nos componentes.
- Não faça bifurcação na UI para "mock vs real".
- Se um componente precisar de novos dados, primeiro estenda o contrato do service e depois atualize as implementações real e mock.
- Mantenha os fluxos de auth e sessão inalterados; `AuthProvider` deve continuar usando apenas `AccountService`.

## Ao adicionar um novo mock service

1. Defina ou atualize a interface do service.
2. Adicione a implementação mock em `src/service/mock/<module>/<module>.mock.ts`.
3. Registre o mock em `ServicesProvider`.
4. Atualize qualquer seed e referência cruzada em `mockData`.
5. Confirme que o componente consumidor continua dependendo apenas de `useServices()`.

## Arquivos de referência

- `context/contexto_logica_mock_data.md`
- `context/contexto_schema_relacoes_e_mocks.md`
- `src/service/mock/data.ts`
- `src/service/mock/request-context.ts`
- `src/providers/ServicesProvider/index.tsx`
- `src/hooks/useServices.ts`
