import _ = require('lodash');

export function calculateQuestionCategories(app) {
    return app.service('questions').find({paginate: false}).then(function(data) {
        let categories = data.map(question => {
            return {name: question.category};
        });

        // get only categories with unique names
        categories = _.uniqBy(categories, 'name');

        return categories;
    });
};
