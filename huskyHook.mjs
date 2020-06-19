import spawn from 'cross-spawn';

import gitBranchIs from 'git-branch-is';

(async () => {
  const develop = 'develop';
  const master = 'master';

  if ((await gitBranchIs(develop)) || (await gitBranchIs(master))) {
    spawn('yarn', ['check-code'], { stdio: 'inherit' });
  } else {
    return true;
  }
})();
