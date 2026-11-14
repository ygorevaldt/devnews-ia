# CLAUDE.md

Orientações para o Claude Code ao trabalhar neste repositório.

## Sobre o projeto

O devnews-ia é uma implementação do [TabNews](https://www.tabnews.com.br) para o [curso.dev](https://curso.dev), construída com agentes de IA. É um projeto acadêmico: em caso de dúvida sobre o comportamento esperado de uma funcionalidade, o TabNews é a referência.

## Stack

- Next.js com App Router: as rotas ficam em `src/app/`
- React
- TypeScript em modo `strict`
- npm como gerenciador de pacotes

As versões e os scripts disponíveis estão em `package.json`.

## Estrutura

- `src/app/`: rotas, layouts e estilos globais, seguindo as convenções de arquivo do App Router.
- `src/components/`: componentes reutilizáveis. São Server Components por padrão; use `"use client"` apenas quando o componente precisar do navegador.
- `src/lib/`: acesso a dados e funções sem interface, como as chamadas à API do TabNews.
- Importe a partir de `src/` com o alias `@/`, como em `@/lib/tabnews`.
- `next.config.ts` ativa `experimental.inlineCss`: o CSS é embutido no HTML para não bloquear a renderização. Mantenha o CSS global enxuto.

## Comandos

```bash
npm install        # instala as dependências
npm run dev        # inicia o servidor de desenvolvimento
npm run build      # gera o build de produção
npm run start      # serve o build de produção
npx tsc --noEmit   # verifica os tipos
```

## Convenções

- Interface, textos e mensagens de commit em português do Brasil.
- Mensagens de commit na terceira pessoa do presente, como em `Adiciona página inicial`.
- Componentes de página e de layout são exportados com `export default function`.

## Atenção

- Esta versão do Next.js pode divergir do que você conhece. Antes de usar uma API do framework, consulte a documentação instalada em `node_modules/next/dist/docs/`.
- `LayoutProps` e os demais tipos de rota são gerados pelo Next.js em `.next/types/`, e `next-env.d.ts` também é gerado. Nenhum deles é versionado, então a verificação de tipos depende de `npm run dev`, `npm run build` ou `npx next typegen` terem sido executados antes.
- A versão do Next.js é fixada de forma exata por decisão do projeto. Não atualize dependências sem pedido explícito.
- Por ser um projeto acadêmico, vulnerabilidades conhecidas em dependências não são uma preocupação. Não sugira atualizações por esse motivo.

## Manutenção desta documentação

**Mantenha este arquivo sempre alinhado à realidade do projeto.** Sempre que uma mudança tornar algo aqui incorreto ou incompleto (stack, comandos, estrutura, convenções), atualize este arquivo na mesma tarefa.

- `CLAUDE.md` e `AGENTS.md` têm o mesmo conteúdo: ao alterar um, aplique a alteração ao outro. A única diferença é que `AGENTS.md` não menciona nenhuma ferramenta de IA específica.
- Registre aqui, e não apenas na memória do Claude Code, os fatos duradouros que qualquer pessoa ou agente precise conhecer.
- Inclua apenas informações duradouras. Não registre o que envelhece rápido, como status de tarefas, progresso, números de versão ou listas que podem ser obtidas do próprio código.
