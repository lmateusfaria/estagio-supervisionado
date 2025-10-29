# Sistema de Digitalização e Gerenciamento de Processos Manuais

## 📄 Descrição do Projeto
Este projeto visa desenvolver um sistema web para digitalizar e gerenciar processos manuais em pequenas e médias empresas (PMEs). A solução busca substituir formulários físicos por fluxos de documentos eletrônicos inteligentes, centralizando dados, assegurando a integridade das informações e facilitando a análise de indicadores-chave por meio de ferramentas de Business Intelligence e Big Data.

## 🚀 Funcionalidades
Criação de formulários digitais configuráveis para diversos processos empresariais.

Controle de versão e status dos documentos (não preenchido, em andamento, finalizado, alterado).

Gerenciamento de usuários com diferentes níveis de permissão (administrador, gestor, colaborador).

Comunicação entre cliente e servidor por meio de APIs RESTful.

Integração futura com sistemas de OCR, dispositivos IoT e plataformas de análise de dados como Power BI.

## 🛠️ Tecnologias Utilizadas
Back-end: Java 17

Front-end: React.js

Banco de Dados: PostgreSQL

Autenticação: Firebase

APIs: RESTful

## 📌 Status do Projeto
Em desenvolvimento. As funcionalidades estão sendo implementadas conforme o planejamento estabelecido.

## 👥 Contribuidores

@lmateusfaria
@Matheushgq



## 📝 Fluxo Atual do Sistema (Front + Back)

O sistema já permite o cadastro, edição, listagem e exclusão (CRUD) das principais entidades: **Usuário**, **Fluxo** e **Documento**.

### 🔒 Autenticação
O login é realizado via Banco de Dados(Postgres), protegendo as rotas do sistema. Usuários autenticados acessam o painel, enquanto não autenticados são redirecionados para o login.

### 👤 Usuários
- Cadastro, edição, listagem e exclusão de usuários (administrador, gestor, colaborador) funcionando.
- Formulário responsivo, com campos validados e visual padronizado.

### 🔄 Fluxos
- Cadastro, edição, listagem e exclusão de fluxos de documentos.
- Cada fluxo pode ter vários documentos vinculados.
- Visualização detalhada do fluxo, com botões de ação e navegação intuitiva.

### 📄 Documentos
- Documentos só podem ser criados a partir de um fluxo (não existe cadastro avulso).
- Cadastro, edição, listagem e exclusão de documentos vinculados a um fluxo.
- Formulário de documento responsivo, com campos principais (nome, arquivo, versão, status, descrição).
- Visualização detalhada do documento, incluindo seus campos dinâmicos (campos ainda em fase de testes).

### 🧩 Campos Dinâmicos dos Documentos
- O backend já suporta a estrutura de campos dinâmicos associados a cada documento.
- O frontend exibe os campos de um documento e permite edição básica, mas a criação/edição dinâmica de campos ainda está em fase de testes e ajustes.

### 🔗 Integração Frontend + Backend
- Toda comunicação é feita via APIs RESTful.
- O frontend consome endpoints protegidos, enviando o token de autenticação.
- O backend está em Java 17 (Spring Boot), com banco PostgreSQL.

### 📱 Responsividade e UX
- Todas as telas principais seguem padrão mobile first, com visual moderno e inputs padronizados.
- Navegação fluida entre entidades, feedback visual (snackbar/alertas) e formulários centralizados.

### ⚠️ Pontos pendentes
- Testar e finalizar a experiência de criação/edição dos campos dinâmicos dos documentos.
- Ajustes finos de UX e possíveis melhorias de performance.

---
**Resumo:**
O sistema já está funcional para o gerenciamento de usuários, fluxos e documentos, com integração completa entre frontend e backend. Falta apenas finalizar e validar a manipulação dos campos dinâmicos dos documentos para concluir o escopo principal da fase beta.