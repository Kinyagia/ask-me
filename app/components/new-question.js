import Ember from 'ember';

export default Ember.Component.extend({
  addNewQuestion: false,

  actions: {
    questionFormShow(){
      this.set('addNewQuestion', true);
    },

    saveQuestion1(){
      var params = {
        user: this.get('user'),
        content: this.get('content')
      };
      this.set('addNewQuestion', false);
      this.sendAction('saveQuestion2', params);

    }
  }
});
