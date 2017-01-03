# changelog.md

[![NPM version](https://img.shields.io/npm/v/changelog.md.svg?style=flat)](https://npmjs.com/package/changelog.md) [![NPM downloads](https://img.shields.io/npm/dm/changelog.md.svg?style=flat)](https://npmjs.com/package/changelog.md) [![Build Status](https://img.shields.io/circleci/project/egoist/changelog.md/master.svg?style=flat)](https://circleci.com/gh/EGOIST/changelog.md) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate)

## How does it work

- Get last version from git tag, if no tags it defaults to `0.0.0`
- Get the commits since last version
  - Prompt user to enter the type of each commit
  - Infer the new version from the types of all commits
- Generate markdown string from commits and prompt answers
- Create or prepend to `CHANGELOG.md` and update `package.json` version field
- Commits changes and create new git tag

## Install

```bash
$ yarn global add changelog.md
```

## Usage

```bash
$ changelog
```

## Recipes

### Commit types

- patch: Bug fixes
- minor: Backward-compatible updates
- major: Introducing breaking changes
- ignore: Do not include this commit in changelog

Besides choosing `ignore` in prompts to exclude commits in changelog, the commit message that starts with `[skip]` `[ignore]` `[skip $foo]` `[ignore $foo]` will also be excluded.

### Work with npm publish

```bash
# made some changes to your code...
$ git add -am "change the world"
$ npm test
$ changelog
$ git push --follow-tags
$ npm publish
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**changelog.md** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/changelog.md/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
