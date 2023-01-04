# NEXT TEMPLATE (08/2022) 🎯

## Prerequisites 🔨

To run locally you need to have **Node.js** and **yarn**

## Installing dependencies 📦

### App 📂

In order to install project dependencies for the App run the following command from the project root:

```
yarn install
```

## Running the project 🚀

```
yarn dev
```

Run the project locally on mobile device or tablet:

```
yarn dev

http://192.168.1.13:8000/ or whatever ip address the project assigns
P.S. Watch out that your mobile/tablet device is on same network as your computer

```

The project will start automatically on a localhost with port 3000.

## CSS build 📦

The CSS project build is based on emotion. The CSS compiles automatically when project is run.

## CSS usage

Project ships with basic CSS styling. Expand with necessary utils and variation, but keep shared base styles. For example `button.styles.ts` includes `primary` and `secondary` both of which include `${root}` button style. Unlike vanilla CSS, inheritance is preferred here instead of concatenation. For example, instead of:

```
<div css={[button.root, button.primary, button.primaryAlt]}>
```

This is preferred:

```
<div css={button.primaryAlt}>
```

where `primaryAlt` internaly inherits `button.root` and `button.primary`.

Folder `styles` holds only shared global css styling. Component-specific CSS styles should be next to the component file in the modules/ui folders.

CSS custom properties are preferred to JS variables. For best dev experience use `vunguyentuan.vscode-css-variables` extension. You can start typing `--` and autocomplete will find existing variables and on select insert `var()` around them.

## Deployment 🗳️

The app should be hosted on Vercel. No further info for now.

## Additional notices 📎

-   Ensure that no sensitive data is commited to the repository such as:
-   env files
-   service account files

## Environment variables ✨

```
| Env Variable                               | Value                 |
| ------------------------------------------ | --------------------- |
| NEXT_API_KEY_HERE                          | apiKey                |


```

## Folder structure 📁

Some folder are prepopulated with examples. You can delete them if you don't need them.

```
next-template
 ┣ 📂.github
 ┃  ┗ 📂workflows
 ┣ 📂cypress
 ┣ 📂fixtures
 ┣ 📂modules
 ┃  ┗ 📂moduleA
 ┃    ┗ 📂components
 ┃    ┗ 📂hooks
 ┃    ┗ 📂models
 ┃    ┗ 📂store
 ┃    ┗ 📂utils
 ┣ 📂pages
 ┃  ┗ 📂api
 ┃  ┗ 📂pageA
 ┃  ┗ 📜_app.tsx
 ┃  ┗ 📜index.tsx
 ┣ 📂public
 ┃  ┗ 📂assets
 ┣ 📂shared
 ┃  ┗ 📂hooks
 ┃  ┗ 📂utils
 ┣ 📂storybook
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂ui

```

## Cypress 🧪

Cypress is test automation tool used for functional testing of web apps by automating browser actions.
With Cypress we can create:

```
 - Unit tests
 - Integration tests
 - End to End tests
```

## Fixtures 📄

Fixtures folder is used for storing .json files used for local testing or mock database.

## Modules 🗃️

In this folder store modules for the app. One feature is one module. Every module should include 4folders:

```
 - components - folder for components.
 - hooks - folder for hooks.
 - models - folder for models.
 - store - folder for store(recoil).
```

Also you can have folders: styles, utils, services, http for module. It depends on project.

## Pages 🔖

In pages folder store all your pages:

```typescript
 - todo - index.tsx is used as default page. Route to it is /todo. - [uid].tsx is used as page. Route to it  is /todo/[uid].
 - api - create API routes here. Any file inside the folder `pages/api` is mapped to `/api/[filename]` and it will be treated as an API endpoint instead of a `page`. API routes support dynamic routes, and follow the same file naming rules used for pages.
 - \_app.tsx - root component of the app.
 - 404.tsx - not found page.
 - index.tsx - page that is rendered when user visits root of your application.
```

Useful links 🔗

https://nextjs.org/docs/api-routes/introduction
https://nextjs.org/docs/routing/introduction
https://nextjs.org/docs/advanced-features/module-path-aliases

## Public 📚

In public/assets folder store:

```
 - Favicons are small 16x16px icon that serves as branding for your website. They are located in tabs,   - bookmarks, toolbar apps, etc.
 - Fonts
 - Icons are used to store svg icons in project. Store 16x16 and 24x24 versions of same icon.
 - Images
```

## Shared 🔓

```
 - Hooks are methods that are shared throughout project, here is example of few of them, delete the ones you don't need.
 - Providers examples: FirebaseAuthProvider, NetworkStatusProvider, and so on.
 - Utils is used for storing utility methods
```

## Storybook 📖

Storybook is a development environment tool that is used as a playground for UI components. It allows developers to create and test components in isolation. It runs outside of the app so project dependencies won't affect the behaviour of components.

## Styles 🖌️

Styles predefined in these files are not must use. Customize files and create/delete as you need per project.
This is just style guide how you should use @emotion.

## Types ⚒️

Types folder is used for storing global types.

```
 P.S. Watch out what to store in types folder. If something doesn't have to be global store it in folder of that module.
```

## UI 💻

UI folder is used for storing shared components.

## Docker

Build an image

```
docker build --build-arg NEXT_PUBLIC_VERCEL_ENV=production \
--build-arg NEXT_PUBLIC_SUPPORT_EMAIL=value \
--build-arg NEXT_PUBLIC_API_URL=value \
--build-arg NEXT_PUBLIC_ORG_ID=value \
--build-arg NEXT_PUBLIC_LOADING_DURATION=value -t someTag .
```

Run

```
 docker run -p 80:3000 someTag
```
