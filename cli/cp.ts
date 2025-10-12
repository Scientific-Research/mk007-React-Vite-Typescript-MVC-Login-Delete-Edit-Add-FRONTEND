import fs from 'fs';
import process from 'process';

const name = process.argv[2];

if (name === undefined) {
  console.log('SCRIPT: cp');
  console.log('NAME: create page');
  console.log('-------------------------');
  console.log('EXAMPLE: npm run cp Info');
  console.log('RESULT: creates page /src/components/PageInfo.tsx');
  process.exit();
} else {
  const content = `
    export const Page${name} = () => {
        return (
            <>
                <p>Welcome to the ${name} page.</p>
            </>
        );
    };
        `;
  (() => {
    fs.writeFile(`./src/components/Page${name}.tsx`, content.trim(), () => {});
  })();
}
