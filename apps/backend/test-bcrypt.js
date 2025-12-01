// test-bcrypt.js
const bcrypt = require('bcryptjs');

async function run(){
  const plain = 'secret123';
  const hash = await bcrypt.hash(plain, 10);
  console.log('hash:', hash);
  const ok = await bcrypt.compare(plain, hash);
  console.log('compare result (should be true):', ok);
}
run();
