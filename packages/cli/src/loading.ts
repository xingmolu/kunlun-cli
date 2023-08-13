import ora from 'ora';
import print from './print';

export default function withLoading(
  promiseFn: () => Promise<any>,
  { text, successText, failText, startText }: { text: string; successText: string; failText: string; startText?: string }
) {
  return new Promise((resolve, reject) => {
    const spinner = ora(text).start();
    startText && print.info(startText);

    promiseFn()
      .then((result) => {
        spinner.succeed(`✅ ${successText}`);
        resolve(result);
      })
      .catch((err) => {
        spinner.fail(`❎ ${failText}`);
        reject(err);
      });
  });
}
