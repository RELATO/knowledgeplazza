import stat = require('./stat');
import checkQuestion = require('./check-question');
import battles = require('./battles');
import battleStat = require('./battle-stat');
import questions = require('./questions');
import questionCategories = require('./question-categories');
import groups = require('./groups');
import archiveItem = require('./archive-item');
import authentication = require('./authentication');
import user = require('./user');

module.exports = function() {
  const app = this;

  app.configure(authentication);
  app.configure(user);
  app.configure(archiveItem);
  app.configure(groups);
  app.configure(questionCategories);
  app.configure(questions);
  app.configure(battles);
  app.configure(checkQuestion);
  app.configure(stat);
  app.configure(battleStat);
};
