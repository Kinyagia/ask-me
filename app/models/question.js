import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.attr(),
  content: DS.attr(),
  responses: DS.hasMany('response', {async:true})

});
