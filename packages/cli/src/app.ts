/**
 * cli 入口，支持以下命令
 * kunlun-cli init xxxx
 * 让用户现在可用模版，选择完后下载模板文件到本地
 */


import fs from 'fs';
import print from './print';
import path from 'path';
import downloadTemplate from './download';
// import withLoading from './loading';
import * as compressing from 'compressing';

interface IParams {
  appName: string;
  templateName: string;
  version: string;
  description: string;
  repoURL: string;
}


async function createAppWithTemplate(params: IParams) {
  const root = getProjectPath(params.appName);
  downloadTemplate({
    url: params.repoURL,
    targetDir: root,
  }).then((file) => {
    return compressing.zip.uncompress(file, root, {
      strip: 1,
    });
  }).then(() => {
    print.success('uncompress done');
    // 获取文件后缀为.zip的文件名
    const zipName = fs.readdirSync(root).filter((name) => /\.zip$/.test(name))[0];
    // 删除下载的源文件
    fs.unlinkSync(path.join(root, zipName));
  }).catch((err) => {
    print.error(err);
  });
}

function validate(appName: string) {
  if (!appName) {
    // print.error('Please enter the project name');
    return 'plaese enter the project name'
  }
  // 验证是否存在同名文件夹
  if (fs.existsSync(appName)) {
    return `The folder ${appName} is already exist, please try another name`;
    // process.exit(1);
  }
  return true;
}

function getProjectPath(appName: string) {
  return path.join(process.cwd(), appName);
}

export { validate, getProjectPath, createAppWithTemplate  };