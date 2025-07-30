---
title: 튜토리얼 인트로 - ko
sidebar_position: 1
---
# 튜토리얼 인트로

**도큐사우루스를 5분 안에!** 알아볼 수 있어요.

## 첫 시작

**새로운 사이트 만들기**부터 시작해요.

또는 **당장 도큐사우루스를 사용**해볼 수 있는데, 이 링크로 가능해요. **[docusaurus.new](https://docusaurus.new)**.

### 시작을 위해 무엇이 필요할까요?

* [Node.js](https://nodejs.org/en/download/) version 18.0 또는 그 이상의 버전이 필요해요.:

  * When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.