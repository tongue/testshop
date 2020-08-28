# projectName

This is a repository containing all web sites and web apps that Wayout has.

## Good to know

This repository uses `yarn workspaces` ([more information](https://classic.yarnpkg.com/en/docs/workspaces/)) to share code between different projects.
This essentially means that all the `node_modules` gets downloaded to the root, even though the subfolders have their own `package.json`.

## Getting started

```bash
cd project-root-folder
yarn
```

### Development

You can choose to either start all dev environments or only the ones you want

- `yarn dev:storybook` - starts storybook development environment
- `yarn dev:domain` - starts the domain development environment
- `yar dev` - starts all development environments

- ### Build

- `yarn build:storybook` - starts storybook development environment
- `yarn build:domain` - starts the domain development environment
