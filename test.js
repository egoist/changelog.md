import test from 'ava'
import changelogMd from './'

test('main', t => {
  t.is(typeof changelogMd, 'function')
})