import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.findRecord('question', params.question_id);
  },

  actions: {
    update(question, params) {
      Object.keys(params).forEach(function(key) {
        if (params[key] !== undefined) {
          question.set(key, params[key]);
        }
      });
      question.save();
      this.transitionTo('question');
    },
    saveResponse(params) {
        var newResponse = this.store.createRecord('response', params);
        var question =params.question;
        question.get('responses').addObject(newResponse);
        newResponse.save().then(function(){
          return question.save();
        });
        this.transitionTo('question', question);
      },

    destroyQuestion(question) {
      var response_deletions = question.get('responses').map(function(response){
        return response.destroyRecord();
      });
      Ember.RSVP.all(response_deletions).then(function(){
        return question.destroyRecord();
      });

      this.transitionTo('index');
    },
    destroyResponse(response){
      response.destroyRecord();
      this.transitionTo('question');
    }
  }
});
