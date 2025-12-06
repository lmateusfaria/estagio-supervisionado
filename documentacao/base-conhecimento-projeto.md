# Base de Conhecimento - Sistema SMD (Sistema de Manuais Digitais)

## 📋 Visão Geral do Projeto

### Objetivo Principal
Sistema web para digitalizar e gerenciar processos manuais em pequenas e médias empresas (PMEs), substituindo formulários físicos por fluxos de documentos eletrônicos inteligentes.

### Proposta de Valor
- **Eliminar papel**: Transformar processos manuais em digitais
- **Centralizar dados**: Todas informações em um único sistema
- **Garantir integridade**: Rastreabilidade e versionamento de documentos
- **Facilitar análise**: Preparação para BI e Big Data

---

## 🏗️ Arquitetura do Sistema

### Stack Tecnológico

#### Backend
- **Linguagem**: Java 17
- **Framework**: Spring Boot
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **API**: RESTful

#### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Roteamento**: React Router DOM 7.8.2
- **Estilização**: 
  - Tailwind CSS 3.4.17 (utility-first CSS framework)
  - Material-UI (MUI) 7.3.1 (componentes prontos)
  - Emotion (CSS-in-JS)
- **Animações**: Framer Motion 12.23.12
- **Ícones**: Lucide React 0.542.0
- **HTTP Client**: Axios 1.11.0
- **Fonte**: Roboto (via @fontsource/roboto)

### Estrutura de Pastas

#### Backend (`_backend/`)
```
src/main/java/br/com/systemmanualdigital/
├── config/          # Configurações (Security, Swagger, CORS, etc)
├── domains/         # Entidades de domínio
│   ├── doc/        # Documento, Campo
│   ├── dtos/       # Data Transfer Objects
│   ├── enums/      # StatusDocumento, TipoUsuario
│   ├── flow/       # FluxoDocumentos
│   └── user/       # Usuario, Administrador, Gestor, Colaborador
├── repositories/    # Acesso a dados (JPA)
├── resources/       # Controllers REST
├── security/        # JWT, filtros de autenticação
└── services/        # Lógica de negócio
```

#### Frontend (`_frontend/`)
```
src/
├── api/            # Configuração Axios (api.jsx, authApi.jsx)
├── assets/         # Imagens, ícones
├── components/     # Componentes reutilizáveis
│   ├── navbar/    # Navbar, DashboardNavbar
│   ├── sidebar/   # Sidebar
│   └── card/      # StatCard
├── context/        # Gerenciamento de estado (AuthContext, UiContext)
├── pages/          # Páginas da aplicação
│   ├── home/      # HomePage (landing page)
│   ├── login/     # LoginPage
│   ├── dashboard/ # DashboardPage
│   ├── usuarios/  # CRUD de usuários
│   ├── fluxos/    # CRUD de fluxos
│   ├── documentos/# CRUD de documentos
│   ├── relatorios/# RelatoriosPage
│   └── config/    # ConfigPage
├── App.jsx         # Roteamento principal
├── main.jsx        # Entry point
└── index.css       # Estilos globais + Tailwind directives
```

---

## 🎨 Design System Atual

### Paleta de Cores (Tailwind Config)
```javascript
primary: {
  500: '#22c55e', // Verde vibrante
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
}

secondary: {
  500: '#10b981', // Emerald
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
}

accent: {
  500: '#f59e0b', // Laranja (chamada de atenção)
  600: '#d97706',
}
```

### Tema Visual
- **Conceito**: Sustentabilidade, digitalização, processos verdes
- **Tons dominantes**: Verde/Emerald (simboliza crescimento, eco-friendly, modernidade)
- **Tipografia**: Roboto (clean, moderna, legível)
- **Efeitos**: 
  - Glassmorphism (backdrop-blur, transparências)
  - Gradientes animados
  - Sombras suaves
  - Hover states com scale transform

### Animações (Framer Motion)
- **Hero section**: Fade in + slide from top
- **Cards**: Hover scale (1.05)
- **Gradientes**: Animação lenta (12s) de background-position

---

## 📊 Modelo de Dados

### Entidades Principais

#### 1. Usuario (Herança)
```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
- id: Long
- nome: String
- email: String (único)
- senha: String (criptografada)
- tiposUsuario: Set<TipoUsuario>
- fluxosCriados: List<FluxoDocumentos>
- fluxosAtualizados: List<FluxoDocumentos>
```

**Tipos de Usuário**:
- `Administrador`: Acesso total ao sistema
- `Gestor`: Gerencia fluxos e documentos
- `Colaborador`: Preenche documentos

#### 2. FluxoDocumentos
```java
@Entity
- id: Long
- nome: String (obrigatório)
- descricaoFluxo: String (obrigatório)
- versaoDoc: Integer (obrigatório)
- documentos: List<Documento>
- criadoPor: Usuario
- atualizadoPor: Usuario
```

#### 3. Documento
```java
@Entity
- id: Long
- nome: String
- arquivo: String (caminho/URL)
- versaoDocumento: Integer
- statusDocumento: StatusDocumento
- descricao: String
- campos: List<Campo> (campos dinâmicos)
- usuario: Usuario
- fluxoDocumentos: FluxoDocumentos
```

**Status do Documento**:
- `NAO_PREENCHIDO`
- `EM_ANDAMENTO`
- `FINALIZADO`
- `ALTERADO`

#### 4. Campo (Dinâmico)
```java
@Entity
- id: Long
- nomeCampo: String
- tipoCampo: String (text, number, date, etc.)
- valorCampo: String
- obrigatorio: Boolean
- documento: Documento
```

---

## 🔐 Autenticação e Segurança

### Fluxo de Autenticação (JWT)
1. **Login**: `POST /api/auth/login`
   - Recebe: `{ email, senha }`
   - Retorna: `{ token, user: { id, nome, email, tiposUsuario } }`

2. **Token JWT**: Armazenado no `localStorage`
   - Enviado em todas requisições: `Authorization: Bearer <token>`

3. **Proteção de Rotas**:
   - `ProtectedRoute`: Verifica autenticação, redireciona para `/login` se não autenticado
   - `PublicRoute`: Redireciona para `/dashboard` se já autenticado

### Configuração de Segurança (Backend)
- **SecurityConfig.java**: Define endpoints públicos (`/api/auth/**`) e protegidos
- **JWTAuthenticationFilter**: Intercepta requisições, valida token
- **JWTUtils**: Gera e valida tokens JWT

---

## 📡 API REST - Endpoints Principais

### Autenticação
```
POST   /api/auth/login          # Login
POST   /api/auth/register       # Registro (se habilitado)
```

### Usuários
```
GET    /api/usuarios            # Lista todos usuários
GET    /api/usuarios/{id}       # Busca usuário por ID
POST   /api/usuarios            # Cria novo usuário
PUT    /api/usuarios/{id}       # Atualiza usuário
DELETE /api/usuarios/{id}       # Remove usuário
```

### Fluxos
```
GET    /api/fluxos              # Lista todos fluxos
GET    /api/fluxos/{id}         # Busca fluxo por ID
POST   /api/fluxos              # Cria novo fluxo
PUT    /api/fluxos/{id}         # Atualiza fluxo
DELETE /api/fluxos/{id}         # Remove fluxo (se sem documentos)
GET    /api/fluxos/{id}/documentos  # Lista documentos do fluxo
```

### Documentos
```
GET    /api/documentos          # Lista todos documentos
GET    /api/documentos/{id}     # Busca documento por ID
POST   /api/documentos          # Cria novo documento
PUT    /api/documentos/{id}     # Atualiza documento
DELETE /api/documentos/{id}     # Remove documento
```

---

## 🎯 Funcionalidades Implementadas

### ✅ Completas
1. **Autenticação JWT**: Login/logout funcional
2. **CRUD Usuários**: Cadastro, edição, listagem, exclusão
3. **CRUD Fluxos**: Cadastro, edição, listagem, exclusão, visualização detalhada
4. **CRUD Documentos**: Cadastro (vinculado a fluxo), edição, listagem, visualização detalhada
5. **Proteção de Rotas**: Frontend valida autenticação
6. **Interface Responsiva**: Mobile-first design
7. **Navegação entre Entidades**: Fluxo → Documentos → Detalhes

### ⚠️ Em Desenvolvimento/Testes
1. **Campos Dinâmicos**: Backend suporta, frontend exibe, mas criação/edição em ajustes
2. **Upload de Arquivos**: Estrutura presente, integração em teste
3. **Relatórios**: Página existe, funcionalidade a implementar
4. **Dashboard Analytics**: Estatísticas básicas, expansão prevista

### 🔮 Planejadas
1. **OCR**: Digitalização automática de documentos físicos
2. **IoT**: Integração com dispositivos
3. **Power BI**: Integração para análise de dados
4. **Notificações**: Sistema de alertas e aprovações
5. **Histórico de Versões**: Auditoria completa de mudanças

---

## 🎨 Componentes UI Existentes

### Material-UI (MUI)
- `Button`: Botões de ação
- `TextField`: Inputs de formulário
- `Select`, `MenuItem`: Dropdowns
- `Dialog`: Modais de confirmação
- `Snackbar`, `Alert`: Notificações toast
- `CircularProgress`: Loading spinners
- `List`, `ListItem`, `ListItemText`: Listas

### Lucide React (Ícones)
- `FileText`: Documentos
- `TrendingUp`: Crescimento/produtividade
- `Users`: Colaboração
- Mais ícones disponíveis: https://lucide.dev

### Framer Motion
- `motion.div`, `motion.h1`, `motion.p`: Elementos animados
- `whileHover`: Animações on hover
- `initial`, `animate`, `transition`: Controle de animações
- `variants`: Orquestração de animações em grupo

---

## 🌐 Contextos React

### AuthContext
```javascript
Provê:
- user: Objeto do usuário logado
- isAuthenticated: Boolean
- login(email, password): Função de login
- logout(): Função de logout
- loading: Estado de carregamento
```

### UiContext
```javascript
Provê:
- Estado de UI (se necessário)
- Configurações de tema
- Preferências do usuário
```

---

## 🚀 Como Executar o Projeto

### Backend
```bash
cd _backend
./mvnw spring-boot:run
# Roda em http://localhost:8080
```

### Frontend
```bash
cd _frontend
npm install
npm run dev
# Roda em http://localhost:5173
```

### Banco de Dados
- PostgreSQL rodando localmente
- Configurações em `application.properties` ou `application-dev.properties`

---

## 📱 Padrões de UI/UX

### Mobile-First
- Breakpoints: `sm:`, `md:`, `lg:` (Tailwind)
- Layout flexível: `flex-col` → `sm:flex-row`
- Padding/margin responsivos: `p-4` → `md:p-6`

### Feedback ao Usuário
- **Snackbar**: Mensagens de sucesso/erro
- **Loading states**: `CircularProgress` durante requisições
- **Dialog de confirmação**: Antes de deletar

### Navegação
- **Navbar**: Logo + links principais
- **Sidebar**: Navegação interna (Dashboard)
- **Breadcrumbs**: Contexto de onde o usuário está

---

## 🎯 Princípios de Design

### Cores
- **Verde**: Positivo, sustentável, aprovado
- **Vermelho**: Erro, exclusão, cancelamento
- **Amarelo/Laranja**: Atenção, warning
- **Azul**: Informação, neutro

### Espaçamento
- **Padding interno**: 4, 6, 8 (Tailwind units)
- **Gap entre elementos**: 2, 3, 4, 6
- **Margem entre seções**: 8, 12, 16

### Tipografia
- **Headings**: `text-2xl` → `md:text-3xl` (responsivo)
- **Body**: `text-sm` → `md:text-base`
- **Weight**: `font-semibold` para títulos, `font-normal` para texto

---

## 🔧 Configurações Importantes

### Tailwind Config
- **Dark mode**: `class` (preparado para tema escuro)
- **Animação customizada**: `animate-gradient-slow`
- **Cores customizadas**: Primary, Secondary, Accent, Neutral
- **Border radius**: Até `4xl` (2rem)
- **Shadows**: Neumorphic, Glass

### Vite Config
- Plugin React com Fast Refresh
- Porta padrão: 5173
- Proxy para backend (se necessário): adicionar em `vite.config.js`

---

## 📝 Boas Práticas do Projeto

### Código
1. **Componentização**: Componentes pequenos, reutilizáveis
2. **Hooks customizados**: Para lógica compartilhada
3. **Separação de concerns**: UI, lógica, API separados
4. **Nomenclatura clara**: `fetchUsuarios`, `handleSubmit`, `isLoading`

### API
1. **Axios interceptors**: Para adicionar token automaticamente
2. **Tratamento de erros**: Try/catch em todas requisições
3. **Loading states**: Sempre mostrar feedback visual

### Performance
1. **Lazy loading**: Componentes de rota (se necessário)
2. **Memoização**: `useMemo`, `useCallback` para otimizações
3. **Debounce**: Em buscas e filtros

---

## 🐛 Problemas Conhecidos

### Em Investigação
1. Campos dinâmicos: Interface de criação/edição precisa de refinamento
2. Upload de arquivos: Integração completa backend/frontend

### Limitações Atuais
1. Sem suporte offline
2. Sem cache de dados
3. Relatórios não implementados

---

## 📚 Recursos e Documentação

### Tecnologias
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Material-UI](https://mui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Spring Boot](https://spring.io/projects/spring-boot)

### Padrões
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [RESTful API Design](https://restfulapi.net/)

---

## 🎓 Aprendizados e Insights

### Decisões de Design
1. **Tailwind + MUI**: Combinar utilities com componentes prontos
2. **Framer Motion**: Animações fluidas sem complexidade
3. **JWT no localStorage**: Simples, porém seguro para MVP
4. **Herança em Usuarios**: Flexibilidade para diferentes permissões

### Melhorias Futuras
1. **TypeScript**: Tipagem estática para maior segurança
2. **React Query**: Cache e sincronização de dados
3. **Zustand/Redux**: Gerenciamento de estado global
4. **Testes**: Jest, React Testing Library, Cypress
5. **CI/CD**: Automação de deploy
6. **Docker**: Containerização completa

---

## 📊 Status do Projeto

**Fase Atual**: Beta (funcionalidades core implementadas)

**Próximos Passos**:
1. Finalizar campos dinâmicos
2. Implementar upload de arquivos completo
3. Desenvolver relatórios básicos
4. Testes de usabilidade
5. Otimizações de performance

---

*Documento atualizado em: Dezembro 2025*
*Versão: 1.0*
