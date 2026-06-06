## 🚗 Classic Cars — Plataforma Fullstack de Anúncios de Veículos Clássicos

O Classic Cars é uma aplicação web fullstack desenvolvida com o objetivo de conectar entusiastas de carros antigos, permitindo a publicação, visualização, aprovação e gerenciamento de anúncios de veículos clássicos.

A plataforma foi projetada com foco em experiência do usuário (UX), interface moderna (UI), segurança e responsividade, garantindo uma navegação intuitiva tanto em dispositivos desktop quanto mobile.

---

## 👨‍🎓 Equipe de Desenvolvimento

- Gabriel Santos Palermo  
- 

---

## 🎨 Protótipo de Alta Fidelidade

O design da aplicação foi previamente estruturado por meio de um protótipo de alta fidelidade no Figma, garantindo consistência visual e melhor planejamento da experiência do usuário.

Acesse o protótipo:

https://www.figma.com/design/vsJXjxCLbSegDUO5xikCH8/Projeto-D.-Full-Stack?node-id=0-1&t=IEGOBK5DmvrIGoR8-1

---

# 🚀 Tecnologias Utilizadas

## Front-end
- Next.js  
- React.js  
- TypeScript  
- Tailwind CSS  

## Back-end
- NestJS  
- Prisma ORM  
- SQLite  

## Segurança
- JWT Authentication  
- Bcrypt (criptografia de senhas)  
- Guards e rotas protegidas  

---

# 📌 Funcionalidades da Plataforma

## 👤 Usuários
- Cadastro de usuários  
- Login autenticado com JWT  
- Persistência de sessão  
- Controle de permissões  

---

## 🚘 Anúncios
- Criação de anúncios  
- Upload e persistência de imagens  
- Visualização detalhada dos veículos  
- Aprovação de anúncios pelo administrador  
- Exclusão de anúncios  
- Sistema de status:
  - Pendente
  - Aprovado
  - Rejeitado

---

## 🛠️ Administração
- Painel administrativo  
- Aprovação/Rejeição de anúncios  
- Gerenciamento completo das publicações  
- Controle de anúncios pendentes  
- Exclusão de anúncios publicados  

---

## 💬 Interações
- Sistema de mensagens para contato  
- Sistema de curtidas  
- Insights de anúncios  

---

# 🔐 Autenticação e Controle de Acesso

A aplicação implementa autenticação baseada em JWT, garantindo segurança nas rotas protegidas e controle de acesso entre usuários comuns e administradores.

---

## 👤 Visitantes
Usuários não autenticados podem:

- Visualizar anúncios disponíveis  
- Navegar pela plataforma  
- Consultar informações básicas dos veículos  

---

## 🔑 Usuários Autenticados
Após realizar login, o usuário possui acesso às funcionalidades completas:

- Criar anúncios  
- Visualizar anúncios detalhados  
- Interagir com veículos  
- Gerenciar anúncios próprios  

---

## 🛠️ Administrador

O administrador possui permissões elevadas para gerenciamento da plataforma.

### Credenciais de acesso:
- Usuário: `admin`
- Senha: `1234`

### Funcionalidades administrativas:
- Aprovação de anúncios  
- Rejeição de anúncios  
- Exclusão de publicações  
- Controle de anúncios pendentes  
- Monitoramento geral da plataforma  

---

# 🧩 Estrutura do Projeto

O desenvolvimento foi organizado em entregas evolutivas:

---

## 🟢 D1 — Kickoff

- Definição do tema e escopo  
- Criação do protótipo no Figma  
- Configuração inicial do ambiente  
- Inicialização do projeto com Next.js + TypeScript + Tailwind  

---

## 🟡 D2 — The Shell

- Estruturação de rotas  
- Layouts persistentes  
- Componentização da aplicação  
- Organização inicial da arquitetura  

---

## 🔵 D3 — UI Milestone

- Desenvolvimento completo da interface  
- Responsividade  
- Integração entre páginas  
- Validação de formulários  
- Melhorias de UX/UI  

---

## 🟣 D4 — Data Core

### Banco de Dados
- Modelagem DER  
- Relacionamentos entre entidades  
- Estruturação do banco SQLite  

### Back-end
- Implementação do NestJS  
- Integração Prisma ORM  
- Criação das entidades  
- Endpoints REST  

### Endpoints implementados
#### Usuários
- Criar usuário  
- Login autenticado  
- Listar usuários  

#### Anúncios
- Criar anúncio  
- Buscar anúncios  
- Buscar anúncio por ID  
- Atualizar status  
- Excluir anúncio  

#### Mensagens
- Criar mensagens  
- Listar mensagens  

---

## 🔴 D5 — Security & Fullstack Integration

Nesta etapa foi realizada a integração completa entre Front-end e Back-end.

### 🔐 Segurança
- Implementação de JWT Authentication  
- Proteção de rotas com Guards  
- Criptografia de senhas com bcrypt  
- Controle de permissões  

### 🌐 Integração Fullstack
- Integração real entre Next.js e NestJS  
- Consumo de APIs REST  
- Persistência de dados no banco  
- Sistema completo de autenticação  

### 🚘 Sistema de anúncios
- Criação real de anúncios  
- Aprovação administrativa  
- Persistência de imagens  
- Integração completa entre Home, Admin e Detalhes do anúncio  

### 🛠️ Painel Administrativo
- Aprovação/Rejeição de anúncios  
- Exclusão de anúncios  
- Controle de status das publicações  
- Gerenciamento completo da plataforma

---

## 🔶 D6 — Final SaaS

Nesta etapa foi realizada a consolidação da plataforma, implementando funcionalidades avançadas de gerenciamento, monitoramento e experiência do usuário.

### 🚘 Gerenciamento de Anúncios
- Página "Meus Anúncios" integrada ao banco de dados
- Visualização dos anúncios criados pelo usuário autenticado
- Exclusão de anúncios pelo proprietário
- Exibição de informações completas dos veículos
- Controle de status dos anúncios (Pendente, Aprovado e Rejeitado)
- Cálculo automático do tempo de publicação

### 👍 Sistema de Curtidas
- Implementação de curtidas em anúncios
- Persistência das curtidas durante a navegação
- Atualização dinâmica da interface
- Integração com os relatórios de Insights

### 📊 Dashboard e Insights
- Insights do Usuário
- Total de anúncios publicados
- Total de curtidas recebidas
- Média de curtidas por anúncio
- Indicadores de desempenho dos anúncios
- Classificação de anúncios positivos e negativos
- Dashboard Administrativo
- Total de anúncios cadastrados
- Quantidade de anúncios aprovados
- Quantidade de anúncios pendentes
- Quantidade de anúncios rejeitados
- Total de usuários cadastrados
- Taxa de aprovação da plataforma
- Monitoramento geral da aplicação

### 🛠️ Melhorias Administrativas
- Aprovação de anúncios em tempo real
- Rejeição de anúncios
- Exclusão de anúncios com tratamento de relacionamentos no banco de dados
- Gerenciamento centralizado das publicações
- Controle completo do ciclo de vida dos anúncios

### 🔗 Integração Completa Fullstack
- Comunicação entre Front-end e Back-end via API REST
- Persistência de dados utilizando Prisma ORM e SQLite
- Integração entre autenticação, anúncios, mensagens e painel administrativo
- Atualização automática das informações entre usuários e administradores

### ✅ Resultado Final

Ao final do D6, a plataforma passou a operar como uma aplicação Fullstack completa, permitindo:

- Cadastro e autenticação de usuários
- Criação e gerenciamento de anúncios
- Aprovação administrativa
- Sistema de curtidas
- Dashboard de Insights
- Persistência de dados em banco de dados
- Controle de acesso por perfis de usuário
- Integração completa entre Front-end e Back-end

---
