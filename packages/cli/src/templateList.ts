export const TEMPLATE_LIST = [{
  name: 'vite-react-ts',
  repoURL: 'https://github.com/xingmolu/react-ts-vite/archive/refs/heads/main.zip',
  useage: (appName) => {
    return `cd ${appName} && npm install && npm run dev`
  }
}, {
  name: 'node-ts',
  repoURL: 'https://github.com/jsynowiec/node-typescript-boilerplate/archive/refs/heads/main.zip',
  useage: (appName) => {
    return `cd ${appName} && npm install && npm run dev`
  }
}, {
  name: 'next-web',
  repoURL: 'https://github.com/Blazity/next-enterprise/archive/refs/heads/main.zip',
  useage: (appName) => {
    return `cd ${appName} && yarn install --frozen-lockfile && yarn dev`
  }
}];