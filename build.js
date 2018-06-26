const s = require('shelljs');

s.rm('-rf', 'build');
s.mkdir('build');
s.cp('.env', 'build/.env');
s.cp('-R', 'public', 'build/public');
s.mkdir('-p', 'build/src/common/swagger');
s.cp('src/common/swagger/Api.yaml', 'build/src/common/swagger/Api.yaml');
