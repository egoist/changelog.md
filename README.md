<h1 align="center">
changelog.md
</h1>

<p align="center"><a href="https://npmjs.com/package/changelog.md"><img src="https://img.shields.io/npm/v/changelog.md.svg?style=flat" alt="NPM version"></a> <a href="https://npmjs.com/package/changelog.md"><img src="https://img.shields.io/npm/dm/changelog.md.svg?style=flat" alt="NPM downloads"></a> <a href="https://circleci.com/gh/EGOIST/changelog.md"><img src="https://img.shields.io/circleci/project/egoist/changelog.md/master.svg?style=flat" alt="Build Status"></a> <a href="https://github.com/egoist/donate"><img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat" alt="donate"></a></p>

<p align="center">
<img src="./media/preview.png" alt="preview" width="700">
</p>

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

Besides choosing `ignore` in prompts to exclude commits from changelog, the commit message that starts with `ignore: ` will also be excluded.

You can also use format like `type: message` to pre-define commit type, they will be converted to the commit type we use:

|semantic type|description|commit type|0.y.z|
|---|---|---|---|
|chore|changes to build process|ignore||
|docs|documentation only changes|ignore||
|feat|a new feature|minor|patch|
|fix|bug fix|patch||
|refactor|code refactor|patch||
|style|code style changes|ignore||
|test|add missing tests|ignore||
|breaking|introduce breaking changes|major|minor|
|perf|performance improvements|patch||
|tweaks|don't know how to describe|ignore||

**Note**: in 0.y.z versions, major changes will affect `y`, other changes and patches will affect `z`. So in such situation you can never reach `1.0.0` do you? Then just explicitly specific the version for your next release, like: `changelog 1.0.0`

For `tweaks: message`, a message with only `tweaks` or `tweak` will also be ignored.

You don't have to use these types in your commit message since you can set them one by one when actually running `changelog` (only for CHANGELOG.md, will not update the commit itself).

### Work with npm publish

```bash
# made some changes to your code...
$ git commit -am "change the world"
$ npm test
$ changelog
$ git push --follow-tags
$ npm publish
```

## Projects using this

- [SAO](https://github.com/egoist/sao): ⚔️ Futuristic scaffolding tool.
- [docute](https://github.com/egoist/docute): 📜 Effortlessly documentation done right.
- welcome to add your project here...

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
