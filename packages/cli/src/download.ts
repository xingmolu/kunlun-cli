import download from 'download';
import * as compressing from 'compressing';
// import print from './print';
import withLoading from './loading';
/**
 * 下载远程项目模板的方法
 */
export default function downloadTemplate({ url, targetDir = './' }: { url: string; targetDir?: string }): Promise<any> {
  // print.info('download start, please wait...');
  // 通过get方法下载
  return withLoading(download.bind({}, url, targetDir), {
    text: 'download start, please wait...',
    successText: 'download done',
    failText: 'download fail',
  });
  // return download(url, targetDir)
  //   .on('end', () => {
  //     print.success('download done');
  //   })
  //   .then((stream) => {
  //     return compressing.zip.uncompress(stream, './');
  //   })
  //   .catch((err) => {
  //     print.error(err);
  //   });
}

