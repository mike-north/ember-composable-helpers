import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('intersect', 'Integration | Helper | {{intersect}}', {
  integration: true
});

test('It takes the intersection of the given arrays', function(assert) {
  this.set('array1', ['foo', 'bar']);
  this.set('array2', ['foo', 'baz']);
  this.set('array3', ['qux', 'foo']);

  this.render(hbs`
    {{~#each (intersect array1 array2 array3) as |word|~}}
      {{~word~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'foo', 'intersect shows words common to all arrays');
});

test('It watches for changes', function(assert) {
  this.set('array1', emberArray(['foo', 'bar']));
  this.set('array2', emberArray(['foo', 'baz']));
  this.set('array3', emberArray(['qux', 'foo']));

  this.render(hbs`
    {{~#each (intersect array1 array2 array3) as |word|~}}
      {{~word~}}
    {{~/each~}}
  `);

  run(() => this.get('array2').pushObject('bar'));
  run(() => this.get('array3').pushObject('bar'));

  assert.equal(this.$().text().trim(), 'foobar', 'bar is added');
});
