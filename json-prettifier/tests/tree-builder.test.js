const { test } = require('node:test');
const assert = require('node:assert/strict');
const { buildTree } = require('../modules/tree-builder.js');

test('root string primitive — type, value, no children, not collapsed', () => {
  const node = buildTree('hello');
  assert.equal(node.type, 'string');
  assert.equal(node.value, 'hello');
  assert.equal(node.children, null);
  assert.equal(node.childCount, null);
  assert.equal(node.collapsed, false);
});

test('empty object — type object, empty children array, childCount 0, not collapsed', () => {
  const node = buildTree({});
  assert.equal(node.type, 'object');
  assert.deepEqual(node.children, []);
  assert.equal(node.childCount, 0);
  assert.equal(node.collapsed, false);
});

test('empty array — type array, empty children array, childCount 0, not collapsed', () => {
  const node = buildTree([]);
  assert.equal(node.type, 'array');
  assert.deepEqual(node.children, []);
  assert.equal(node.childCount, 0);
  assert.equal(node.collapsed, false);
});

test('shallow object — root and depth-1 children are not collapsed', () => {
  const node = buildTree({ a: 1, b: 'x' });
  assert.equal(node.collapsed, false);
  assert.equal(node.children[0].node.collapsed, false);
  assert.equal(node.children[1].node.collapsed, false);
});

test('mixed primitive types — number, boolean, null classified correctly with no children', () => {
  const numNode  = buildTree(42);
  const boolNode = buildTree(false);
  const nullNode = buildTree(null);

  assert.equal(numNode.type, 'number');
  assert.equal(numNode.children, null);

  assert.equal(boolNode.type, 'boolean');
  assert.equal(boolNode.children, null);

  assert.equal(nullNode.type, 'null');
  assert.equal(nullNode.children, null);
  assert.equal(nullNode.value, null);
});

test('nested array of objects — each item is an individually collapsible object node', () => {
  const node = buildTree([{ id: 1 }, { id: 2 }]);
  assert.equal(node.type, 'array');
  assert.equal(node.childCount, 2);
  // depth-1 array items start expanded
  assert.equal(node.children[0].type, 'object');
  assert.equal(node.children[0].collapsed, false);
  assert.equal(node.children[1].type, 'object');
  assert.equal(node.children[1].collapsed, false);
  // depth-2 key values are collapsed
  assert.equal(node.children[0].children[0].node.collapsed, false); // number primitive
  assert.equal(node.children[0].children[0].key, 'id');
});

test('array childCount matches number of items', () => {
  const node = buildTree([10, 20, 30, 40]);
  assert.equal(node.childCount, 4);
});

test('object childCount matches number of keys', () => {
  const node = buildTree({ x: 1, y: 2, z: 3 });
  assert.equal(node.childCount, 3);
});

test('deep object — nodes at depth 2+ start collapsed', () => {
  const node = buildTree({ a: { b: { c: 1 } } });
  const depth1 = node.children[0].node;           // { b: { c: 1 } }
  const depth2 = depth1.children[0].node;          // { c: 1 }
  assert.equal(depth1.collapsed, false);
  assert.equal(depth2.collapsed, true);
});
