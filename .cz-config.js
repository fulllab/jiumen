module.exports = {
  types: [
    {
      value: 'feat',
      name: 'feat:     New features'
    },
    {
      value: 'fix',
      name: 'fix:      Bug fixes'
    },
    {
      value: 'docs',
      name: 'docs:     Document changes'
    },
    {
      value: 'style',
      name: 'style:    Code formatting (does not affect functionality, e.g. formatting corrections such as spaces, semicolons, etc.)'
    },
    {
      value: 'refactor',
      name: 'refactor: Code refactoring (excluding bug fixes, feature additions)'
    },
    {
      value: 'perf',
      name: 'perf:     Performance optimisation'
    },
    {
      value: 'test',
      name: 'test:     Adding and modifying test cases'
    },
    {
      value: 'build',
      name: 'build:    Build process, external dependency changes (e.g. upgrading npm packages, modifying webpack configuration, etc.)'
    },
    {
      value: 'ci',
      name: 'ci:       Repair and renovation CI Placement, script'
    },
    {
      value: 'chore',
      name: 'chore:    Changes to build process or supporting tools and libraries (does not affect source files, test cases)'
    },
    {
      value: 'revert',
      name: 'revert:   revert commit'
    }
  ],

  scopes: [
    ['components', 'components'],
    ['hooks', 'hooks'],
    ['utils', 'utils'],
    ['styles', 'styles'],
    ['deps', 'Project Dependency'],
    ['auth', 'Modifications to auth'],
    ['other', 'other'],
    ['custom', 'None of the above? I want to customize!']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),

  messages: {
    type: 'Make sure this submission follows the specification! \n Select the type of submission you want to make.',
    scope: '\nSelect a scope (optional):',
    customScope: 'Please enter a custom scope:',
    subject: 'Fill in a short and concise description of the change: \n',
    body: 'Fill in a more detailed description of the change (optional). Use "|" for line breaks: \n',
    breaking: 'List non-compatible major changes (optional): \n',
    footer: 'List all ISSUES CLOSED for the change (optional). Example: #31, #34: \n',
    confirmCommit: 'confirmed?'
  },

  allowBreakingChanges: ['feat', 'fix'],

  subjectLimit: 100,
  breaklineChar: '|'
}
