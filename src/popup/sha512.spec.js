
const tap = require('tap')
const test = tap.test

const hashes = require('./sha512.js')
const sha512 = hashes.sha512

test('sha512', t => {
  t.equals(sha512('test'), 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff')
  t.equals(sha512('blahblah'), 'b8dfd29b2dd922fd494fb63a427e519dfaabc4489a4ade985c8eaaaef051a0f5272fd75ddda34211039997f8896b5f3693cd92eb75ea2bf786884aa0e31b9b36')
  t.end()
})
